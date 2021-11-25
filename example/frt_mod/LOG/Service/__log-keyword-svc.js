/**
 * @namespace _W.Meta.Bind.LogKeywordService
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandLookupAjax;
    var BindCommandEditAjax;

    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseService === "undefined") throw new Error("[BaseService] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    // var page = new PageView("page", 12);

    var LogKeywordService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function LogKeywordService(p_this, p_suffix) {
            _super.call(this, p_this);
            
            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;

            // command 생성
            p_this.create       = new BindCommandEditAjax(p_this);
            
            // 모델 속성 설정
            p_this.baseUrl = "/Front/frt_mod/LOG/Log_Keyword.C.asp";

            // prop 속성 설정
            this.prop = {
                // inner
                // view
                // bind
                cmd:            "",
                keyword:        { selector: { key: "#m-keyword"+ SUFF,                type: "val" } },
                position_cd:    "",
                vst_idx:        "",
            };
            
            // mapping 설정
            this.mapping = {
                cmd:            { Array:    "bind" },
                keyword:        { create:   "bind" },   
                position_cd:    { create:   "bind" },   
                vst_idx:        { create:   "bind" },   
            };
            //--------------------------------------------------------------
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
        }
        util.inherits(LogKeywordService, _super);
    
        // 데코레이션 메소드
        LogKeywordService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            console.log("----------------------------------");
        };
        LogKeywordService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };

        return LogKeywordService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.LogKeywordService = LogKeywordService;
        // global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));