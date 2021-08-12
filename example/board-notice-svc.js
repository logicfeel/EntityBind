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
    var page = new PageView('page', 10);

    var BoardNoticeService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.Admin.BoardNoticeService
         * @extends _W.Service.Admin.BaseService
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
            this.baseUrl = '/Admin/adm_mod/BOD/Board_Notice.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      '',
                __formUrl:      '',
                __mode:         '',
                // view
                _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,       type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list'+ _SUFF,       type: 'html' } },
                _area_page:     { selector: { key: '#s-area-page'+ _SUFF,       type: 'html' } },
                _txt_totalCnt: { selector: { key: '#s-txt-totalCnt'+ _SUFF,     type: 'text' } },
                // bind
                cmd:            '',
                keyword:        { selector: { key: '#m-keyword'+ _SUFF,         type: 'value' } },
                page_size:      {
                    selector:   { key: 'select[name=m-page_size'+_SUFF+']',     type: 'value' },
                    setter:     function(val) { page.page_size = val; },
                },
                page_count:     {   /** 값을 외부에서 관리함! */
                    getter: function() { return page.page_count; },
                    setter: function(val) { return page.page_count = val; }
                },              
                sort_cd:        '',
                ntc_idx:        '',
                title:          { 
                    selector: { key: '#m-title'+ _SUFF,        type: 'value' },
                    isNotNull: true,
                },
                writer:         { selector: { key: '#m-writer'+ _SUFF,       type: 'value' } },
                contents:       { selector: { key: '#m-contents'+ _SUFF,     type: 'value' } },
                create_dt:      { selector: { key: '#m-create_dt'+ _SUFF,    type: 'text' } },
                // state_cd:      { 
                //     selector: { key: 'input[name=m-state_cd'+_SUFF+'][type=radio]:checked',  type: 'value' },
                //     setter: function(val) { 
                //         $('input[name=m-state_cd'+_SUFF+'][value='+ val + ']').prop('checked', true);
                //     },
                //     isNotNull: true,
                // },
                top_yn:      { 
                    selector: { key: 'input[name=m-top_yn'+_SUFF+'][type=radio]:checked',  type: 'value' },
                    setter: function(val) { 
                        $('input[name=m-top_yn'+_SUFF+'][value='+ val + ']').prop('checked', true);
                    },
                    isNotNull: true,
                },
                popup_yn:      { 
                    selector: { key: 'input[name=m-popup_yn'+_SUFF+'][type=radio]:checked',  type: 'value' },
                    setter: function(val) { 
                        $('input[name=m-popup_yn'+_SUFF+'][value='+ val + ']').prop('checked', true);
                    },
                    isNotNull: true,
                },
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        _this.bindModel.fn.moveList();  // 개선함
                    },
                },
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    }
                },
                update:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        alert('수정 처리가 되었습니다.');
                        _this.bindModel.read.execute();
                    }
                },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    cbValid: function(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                        _this.bindModel.fn.moveList();  // 개선함
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items['cmd'].value = 'LIST'; 
                    },
                    cbOutput: function(p_result) {
                        var entity = p_result['table'];
                        
                        var row_total   = entity['row_total'];
                        if (_template === null) {
                            _template    = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                            Handlebars.registerHelper('date_cut', function (p_date) {
                                return p_date.substring(0, 10);
                            });
                        }
                        _this.bindModel.items['_txt_totalCnt'].value    = row_total;
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
                ntc_idx:        { read:     'bind',     delete:     'bind',            update:  'bind' },
                title:          { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], },
                writer:         { read:     'output',   create:     'bind',            update:  'bind' },
                contents:       { read:     'output',   create:     'bind',            update:  'bind' },
                // state_cd:       { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], },
                top_yn:         { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], list:     'bind'},
                popup_yn:       { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], list:     'bind'},
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                searchList: function() {
                    page.page_count = 1;
                    _this.bindModel.list.execute();
                },
                changePagesize: function(e) {
                    page.page_size = _this.bindModel.items['page_size'].value;
                    page.page_count = 1;
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
                moveEdit: function(p_ntc_idx) {
                    var url = _this.bindModel.prop['__formUrl'];
                    location.href = url +'?mode=EDIT&ntc_idx='+ p_ntc_idx;
                },
                moveForm: function() {
                    var url = _this.bindModel.prop['__formUrl'];
                    location.href = url;
                },
                procRead: function (p_ntc_idx) { 
                    _this.bindModel.items['ntc_idx'].value = ParamGet2JSON(location.href).ntc_idx;
                    _this.bindModel.read.execute(); 
                },
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procUpdate: function () { 
                    _this.bindModel.update.execute(); 
                },
                procDelete: function () { 
                    _this.bindModel.delete.execute(); 
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
            if (this.isLog) console.log('______________ preRegister()');
            
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_bindModel.items['keyword'].value = decodeURI(getArgs('', getParamsToJSON(location.href).keyword ));
            p_bindModel.items['page_count'].value  = Number( getArgs('', getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_bindModel.prop['__isGetLoad'] === true) {
                page.callback = page.goPage.bind(p_bindModel.list.bind);            // 2-2) GET 방식 (bind)    
            } else {
                page.callback = p_bindModel.list.execute.bind(p_bindModel.list);    // 1) 콜백 방식
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