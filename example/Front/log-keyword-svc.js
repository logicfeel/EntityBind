(function(global) {

    'use strict';
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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

    //==============================================================
    // 4. 모듈 구현    
    var page = new PageView('page', 10);

    var LogKeywordService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.Front.LogKeywordService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function LogKeywordService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/LOG/Log_Keyword.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                // view
                // bind
                cmd:            '',
                keyword:        '',
                position_cd:    '',
                vst_idx:        '',
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE'; },
                },
            }

            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                cmd:            { Array:    'bind' },
                keyword:        { create:   'bind' },   
                position_cd:    { create:   'bind' },   
                vst_idx:        { create:   'bind' },   
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
            };
        }
        util.inherits(LogKeywordService, _super);
    
        return LogKeywordService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.LogKeywordService = LogKeywordService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));