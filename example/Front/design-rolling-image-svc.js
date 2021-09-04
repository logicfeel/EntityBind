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
    var DesignRollingImageService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.Front.DesignRollingImageService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function DesignRollingImageService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/DGN/Design_RollingImage.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                // view
                _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,       type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list'+ _SUFF,       type: 'html' } },
                // bind
                cmd:            '',
                page_size:      0,
                page_count:     1,              
                sort_cd:        '',
                img_idx:        '',
                roll_idx:       '',
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log("[Service] list.cbOutput() : 목록출력");

                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            _template    = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_area_list'].value       = _template(entity);
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
                cmd:            { Array:    'bind' },
                page_size:      { list:     'bind' },
                page_count:     { list:     'bind' },
                sort_cd:        { list:     'bind' },
                roll_idx:       { Array:    "bind" },                
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };
        }
        util.inherits(DesignRollingImageService, _super);
    
        return DesignRollingImageService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.DesignRollingImageService = DesignRollingImageService;
        global.page = page;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));