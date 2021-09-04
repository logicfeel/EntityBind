/**
 * namespace _W.Meta.Bind.ProductQnaService
 */
 (function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    var util;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
    } else if (typeof module.exports === 'object'){     // node
        // util                = require('util');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    if (typeof PageView === 'undefined') throw new Error('[PageView] module load fail...');     // 전역에 선언됨
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    

    // 헬퍼 등록
    Handlebars.registerHelper('state_mark', function (p_state_cd) {
        if (p_state_cd === "R") return "문의접수";
        if (p_state_cd === "W") return "답변대기";
        if (p_state_cd === "F") return "답변완료";
        if (p_state_cd === "D") return "답변삭제(숨김)";
    });
    Handlebars.registerHelper('html_safe', function (p_value) {
        p_value = typeof p_value === "undefined" ? "" : p_value;
        return new Handlebars.SafeString(p_value); 
    });
    Handlebars.registerHelper('date_cut', function (p_date) {
        return p_date.substring(0, 10);
    });

    var page = new PageView('page', 5);

    var ProductQnaService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductQnaService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/PRT/Product_QnA.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */  
            this.prop = {
                // inner
                __isGetLoad:    false,
                __listUrl:      '',
                __formUrl:      '',
                __mode:         getParamsToJSON(location.href).mode,
                // view
                _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,       type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list'+ _SUFF,       type: 'html' } },
                _area_page:     { selector: { key: '#s-area-page'+ _SUFF,       type: 'html' } },
                _txt_sumCnt:    { selector: { key: '#s-txt-sumCnt'+ _SUFF,      type: 'text' } },
                // bind
                cmd:            '',
                keyword:        { selector: { key: '#m-keyword'+ _SUFF,         type: 'value' } },
                page_size:      {
                    selector: { key: 'select[name=m-page_size'+_SUFF+']',       type: 'value' },
                    getter: function() { return page.page_size; },
                    setter: function(val) { page.page_size = val; }
                },
                page_count:     {
                    getter: function() { return page.page_count; },
                    setter: function(val) { page.page_count = val; }
                },              
                sort_cd:        '',
                qna_idx:        '',
                prt_id:         '',
                prtName:        { selector: { key: '#m-prtName'+ _SUFF,         type: 'text' } },
                title:          { 
                    selector: { key: '#m-title'+ _SUFF,        type: 'value' },
                    isNotNull: true,
                },
                writer:         { selector: { key: '#m-writer'+ _SUFF,          type: 'value' } },
                meb_idx:        '',
                meb_id:         { selector: { key: '#m-meb_id'+ _SUFF,          type: 'text' } },
                passwd:         { selector: { key: '#m-passwd'+ _SUFF,          type: 'value' } },
                open_yn:        { 
                    selector: { key: 'input[name=m-open_yn'+_SUFF+'][type=radio]',  type: 'none' },
                    setFilter: function(val) { 
                        $('input[name=m-state_cd'+_SUFF+'][value='+ val + ']').prop('checked', true);
                    },
                    getFilter: function (val) {
                        return $('input[name=m-open_yn'+_SUFF+']:checked').val();
                    },
                },
                contents:       { selector: { key: '#m-contents'+ _SUFF,     type: 'html' } },
                answer:         { selector: { key: '#m-answer'+ _SUFF,     type: 'value' } },
                state_cd:        { 
                    selector: { key: 'input[name=m-state_cd'+_SUFF+'][type=radio]',  type: 'none' },
                    setFilter: function(val) { 
                        $('input[name=m-state_cd'+_SUFF+'][value='+ val + ']').prop('checked', true);
                    },
                    getFilter: function (val) {
                        return $('input[name=m-state_cd'+_SUFF+']:checked').val();
                    },
                },
                create_dt:      { selector: { key: '#m-create_dt'+ _SUFF,         type: 'html' } },
                answer_dt:      { selector: { key: '#m-answer_dt'+ _SUFF,         type: 'html' } },
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
                        // _this.bindModel.fn.moveList();  // 개선함
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
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log('[Service] list.cbOutput() : 목록출력');

                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            _template  = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_txt_sumCnt'].value      = row_total;
                        _this.bindModel.items['_area_list'].value       = _template(entity);
                        _this.bindModel.items['_area_page'].value       = page.parser(row_total);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
            };

            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                cmd:            { Array:    'bind' },
                keyword:        { list:     'bind' },
                page_size:      { list:     'bind' },
                page_count:     { list:     'bind' },
                sort_cd:        { list:     'bind' },
                qna_idx:        { read:     ['valid', 'bind'],  delete:     ['valid', 'bind'], update:  ['valid', 'bind'] },
                prt_id:         { create:   ['valid', 'bind'], },
                prtName:        { read:     'output',   },
                title:          { read:     'output',           create:     ['valid', 'bind'], update:  ['valid', 'bind'], },
                writer:         { read:     'output',           create:     'bind',            update:  'bind' },
                meb_idx:        { read:     'output',           create:     'bind', },
                meb_id:         { read:     'output',   },
                open_yn:        { read:     'output',           create:     'bind',            update:  'bind' },
                passwd:         { read:     'output',           create:     'bind',            update:  'bind' },
                contents:       { read:     'output',           create:     'bind',            update:  'bind' },
                answer:         { read:     'output',           update:     'bind' },
                state_cd:       { read:     'output',           update:     'bind' },
                create_dt:      { read:     'output',           update:     'bind' },
                answer_dt:      { read:     'output',           update:     'bind' },
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
                moveEdit: function(p_qna_idx) {
                    var url = _this.bindModel.prop['__formUrl'];
                    location.href = url +'?mode=EDIT&qna_idx='+ p_qna_idx;
                },
                moveForm: function() {
                    var url = _this.bindModel.prop['__formUrl'];
                    location.href = url;
                },
                procRead: function (p_qna_idx) { 
                    _this.bindModel.items['qna_idx'].value = getParamsToJSON(location.href).qna_idx;
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
        util.inherits(ProductQnaService, _super);
    
        // 데코레이션 메소드
        ProductQnaService.prototype.preRegister = function(p_bindModel ) {
            BaseService.prototype.preRegister.call(this, p_bindModel );
            if (global.isLog) console.log('[Service] preRegister() : 사전등록 ');
            
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

        return ProductQnaService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.ProductQnaService = ProductQnaService;
        global.page = page;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));