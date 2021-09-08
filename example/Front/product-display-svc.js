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
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    

    // 핼퍼 등록
    Handlebars.registerHelper('comma_num', function (p_nmber) {
        return numberWithCommas(p_nmber);
    });  

    var ProductDisplayService  = (function (_super) {
        /**
         * 상품 진열 서비스
         * @constructs _W.Service.Front.ProductDisplayService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function ProductDisplayService(p_suffix) {
            _super.call(this);
            
            var _SUFF           = p_suffix || '';  // 접미사
            var _this           = this;
            var _template       = null;
            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/PRT/Product_Display.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                __isGetLoad:    true,
                // view
                _temp_disp:     { selector: { key: '#s-temp-disp'+ _SUFF,       type: 'html' } },
                _area_disp:     { selector: { key: '#s-area-disp'+ _SUFF,       type: 'html' } },
                // bind
                cmd:            '',
                dsp_id:         '',
                sort_cd:        '',
                dspName:        { selector: { key: '#m-dspName'+ _SUFF,         type: 'html' } },
                subName:        { selector: { key: '#m-subName'+ _SUFF,         type: 'html' } },
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
                        if (p_entity['return'] < 0) return alert('[진열카테고리]조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    }
                },
                sub:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'SUB'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log("[Service] sub.cbOutput() : 목록출력");
                        
                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            _template = Handlebars.compile( _this.bindModel.items['_temp_disp'].value ); 
                        }
                        _this.bindModel.items['_area_disp'].value   = _template(entity);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('[진열카테고리] 목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
            }

            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                _temp_disp:     { sub:  'etc' },    // 묶음의 용도
                _area_disp:     { sub:  'etc' },    // 묶음의 용도
                cmd:            { Array: 'bind' },
                dsp_id:         { read:  ['valid', 'bind'],    sub:  ['valid', 'bind'] },   
                dspName:        { read:  'output' },   
                subName:        { read:  'output' },
                sort_cd:        { sub:   'bind' },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                procRead: function () { 
                    _this.bindModel.read.execute();
                },
                procSubList: function () { 
                    _this.bindModel.sub.execute(); 
                },
                
            };
        }
        util.inherits(ProductDisplayService, _super);
    
        return ProductDisplayService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.ProductDisplayService = ProductDisplayService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));