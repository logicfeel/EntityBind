(function(global) {

    'use strict';
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandAjax;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
        BindCommandAjax     = global._W.Meta.Bind.BindCommandAjax;
    } else if (typeof module.exports === 'object'){     // node
        // util                = require('util');
        // BindCommandAjax     = require('./bind-command-ajax');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    if (typeof BindCommandAjax === 'undefined') throw new Error('[BindCommandAjax] module load fail...');
    if (typeof PageView === 'undefined') throw new Error('[PageView] module load fail...');     // 전역에 선언됨
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    Handlebars.registerHelper('date_cut', function (p_date) {
        return p_date.substring(0, 10);
    });

    var page = new PageView('page', 10);

    var BoardNoticeService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.Front.BoardNoticeService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function BoardNoticeService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/BOD/Board_Notice.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      '',
                __formUrl:      '',
                __viewUrl:      '',
                __mode:         '',
                // view
                _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,       type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list'+ _SUFF,       type: 'html' } },
                _area_page:     { selector: { key: '#s-area-page'+ _SUFF,       type: 'html' } },
                _txt_sumCnt:    { selector: { key: '#s-txt-sumCnt'+ _SUFF,      type: 'html' } },
                // bind
                cmd:            '',
                keyword:        { selector: { key: '#m-keyword'+ _SUFF,         type: 'value' } },
                page_size:      {
                    selector:   { key: 'select[name=m-page_size'+_SUFF+']',     type: 'value' },
                    getter: function () { return page.page_size; },
                    setter: function (val) { page.page_size = val; },
                },
                page_count:     {   /** 값을 외부에서 관리함! */
                    getter: function () { return page.page_count; },
                    setter: function (val) { return page.page_count = val; }
                },              
                sort_cd:        '',
                ntc_idx:        '',
                title:          { selector: { key: '#m-title'+ _SUFF,           type: 'text' } },
                writer:         { selector: { key: '#m-writer'+ _SUFF,          type: 'text' } },
                contents:       { selector: { key: '#m-contents'+ _SUFF,        type: 'html' } },
                create_dt:      { selector: { key: '#m-create_dt'+ _SUFF,       type: 'text' } },
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log("[Service] list.cbOutput() : 목록출력");
                        
                        var entity = p_result['table'];
                        var row_total   = entity['row_total'];
                        
                        if (_template === null) {
                            _template = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_txt_sumCnt'].value      = row_total;
                        _this.bindModel.items['_area_list'].value       = _template(entity);
                        _this.bindModel.items['_area_page'].value       = page.parser(row_total);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
            }

            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                _temp_list:     { list:     'etc' },    // 묶음의 용도
                _area_list:     { list:     'etc' },    // 묶음의 용도
                _area_page:     { list:     'etc' },    // 묶음의 용도
                cmd:            { Array:    'bind' },
                keyword:        { list:     'bind' },
                page_size:      { list:     'bind' },
                page_count:     { list:     'bind' },
                sort_cd:        { list:     'bind' },
                ntc_idx:        { read:     'bind' },
                title:          { read:     'output' },
                writer:         { read:     'output' },
                contents:       { read:     'output' },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                searchList: function() {
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                changePagesize: function(e) {
                    _this.bindModel.items['page_size'].value = this.value;
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                resetForm: function () { 
                    $('form').each(function() {
                        this.reset();
                    });
                },
                moveList: function() {
                    var url = _this.bindModel.prop['__listUrl'];
                    location.href = url;
                },
                moveView: function(p_ntc_idx) {
                    var url = _this.bindModel.prop['__viewUrl'];
                    location.href = url + '?ntc_idx=' + p_ntc_idx;
                },
                procRead: function (p_ntc_idx) { 
                    _this.bindModel.items['ntc_idx'].value = ParamGet2JSON(location.href).ntc_idx;
                    _this.bindModel.read.execute(); 
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };
        }
        util.inherits(BoardNoticeService, _super);
    
        /**
         * 전처리 :: 등록 
         * 데코레이션 패턴 : 상위 메소드 호출함
         * @param {BindModelAjax} p_bindModel 서비스 소유자
         */
        BoardNoticeService.prototype.preRegister = function(p_bindModel) {
            BaseService.prototype.preRegister.call(this, p_bindModel);
            if (global.isLog) console.log("[Service] preRegister() : 사전등록 ");
            
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_bindModel.items['keyword'].value = decodeURI(getArgs('', getParamsToJSON(location.href).keyword ));
            p_bindModel.items['page_count'].value  = Number( getArgs('', getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_bindModel.prop['__isGetLoad'] === true) {
                /**
                 * # 2가지 중 선택하여 사용
                 * page.callback = goPage;                                      // 2-1) GET 방식
                 * page.callback = page.goPage.bind(p_bindModel.list.bind);     // 2-2) GET 방식 (bind)    
                 */
                page.callback = page.goPage.bind(p_bindModel.list.bind);
            } else {
                page.callback = p_bindModel.list.execute.bind(p_bindModel.list);      // 1) 콜백 방식
            }
        };

        return BoardNoticeService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.BoardNoticeService = BoardNoticeService;
        global.page = page;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));