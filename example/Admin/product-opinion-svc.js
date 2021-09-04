/**
 * @namespace _W.Meta.Bind.ProductOpinionService
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
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
    Handlebars.registerHelper('grade_mark', function (p_date) {
        var mark = '';
        p_date = typeof p_date !== 'number' ? p_date : 5;
        for (var i = 0; p_date > i; i++) mark += '★';
        return mark;
    });

    var page = new PageView('page', 10);

    var ProductOpinionService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductOpinionService(p_suffix) {
            _super.call(this);

            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Admin/adm_mod/PRT/Product_Opinion.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */ 
            this.prop = {
                // inner
                __isGetLoad:    true,
                __frmURL:       '',
                // view
                _temp_list:     { selector: { key: '#s-temp-list-opinion'+ _SUFF,       type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list-opinion'+ _SUFF,       type: 'html' } },
                _area_page:     { selector: { key: '#s-area-page-opinion'+ _SUFF,       type: 'html' } },
                _txt_sumCnt:    { selector: { key: '#s-txt-sumCnt-opinion'+ _SUFF,      type: 'html' } },
                // bind
                cmd:            '',
                prt_id:         '',
                opi_idx:        '',
                keyword:        { selector: { key: '#m-keyword',                        type: 'value' } },
                page_size:      {
                    selector: { key: 'select[name=m-page_size'+_SUFF+']',       type: 'value' },
                    getter:         function() { return page.page_size; },
                    setter:         function(val) { page.page_size = val; }
                },
                page_count:      {
                    getter:         function() { return page.page_count; },
                    setter:         function(val) { page.page_count = val; }
                },
                sort_cd:        '',
            };

            this.command = {
                // create:     {
                //     onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE'; },
                //     cbEnd: function(p_entity) {
                //         if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                //         _this.bindModel.fn.moveList();  // 개선함
                //     },
                // },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    cbValid: function(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                        _this.bindModel.fn.procList();  // 개선함
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

            // mapping 설정
            this.mapping = {
                cmd:            { Array:    ['bind'] },    // 전역설정
                prt_id:         { delete:   ['valid', 'bind'] },
                opi_idx:        { delete:   ['valid', 'bind'] },
                keyword:        { list:     ['bind'] },
                page_size:      { list:     ['bind'] },
                page_count:     { list:     ['bind'] },
                sort_cd:        { list:     ['bind'] },
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
                moveView: function(p_opi_idx) {
                    var url = _this.bindModel.prop['__viewUrl'];
                    location.href = url + '?opi_idx=' + p_opi_idx;
                },
                procRead: function (p_opi_idx) { 
                    _this.bindModel.items['opi_idx'].value = ParamGet2JSON(location.href).opi_idx;
                    _this.bindModel.read.execute(); 
                },
                procDelete: function (p_prt_id, p_opi_idx) { 
                    _this.bindModel.items['prt_id'].value = p_prt_id;
                    _this.bindModel.items['opi_idx'].value = p_opi_idx;
                    _this.bindModel.delete.execute(); 
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };

        }
        util.inherits(ProductOpinionService, _super);
    
        // 데코레이션 메소드
        ProductOpinionService.prototype.preRegister = function(p_bindModel) {
            BaseService.prototype.preRegister.call(this, p_bindModel);
            if (global.isLog) console.log("[Service] preRegister() : 사전등록 ");
            
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

        return ProductOpinionService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.ProductOpinionService = ProductOpinionService;
        global.page = page;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));