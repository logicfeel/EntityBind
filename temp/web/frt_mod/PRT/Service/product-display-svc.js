/**
 * @namespace _W.Meta.Bind.ProductDisplayService
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
    // var accountFrmURL;          // 수정화면 경로(참조)

    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseService === "undefined") throw new Error("[BaseService] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var ProductDisplayService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductDisplayService(p_this, p_suffix) {
            _super.call(this, p_this);
            
            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;

            // command 생성
            p_this.list     = new BindCommandLookupAjax(p_this);
            p_this.read     = new BindCommandLookupAjax(p_this);
            
            // 모델 속성 설정
            p_this.baseUrl = "/Front/frt_mod/PRT/Product_Display.C.asp";
            p_this.read.outputOption = 3;

            // prop 속성 설정
            this.prop =     {
                // inner
                __isGetLoad:    true,
                __frmURL:       "",
                // view
                _temp_list:     { selector: { key: "#s-temp-display"+ SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-display"+ SUFF,        type: "html" } },
                // bind
                cmd:            "",
                sort_cd:        "",
                dsp_id:         "",
                dspName:        { selector: { key: "#m-dspName"+ SUFF,             type: "html" } },
            };
            // mapping 설정
            this.mapping =  {
                cmd:            { Array: ["bind"] },
                dsp_id:         { read:  ["valid", "bind"],    list:  ["valid", "bind"] },   
                dspName:        { read:  ["output"] },   
            };
            //--------------------------------------------------------------
            // 4. 콜백 함수 구현
            // onExecute
            p_this.read.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            p_this.list.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "SUB"; };
            // cbOutput
            var template = null;
            p_this.list.cbOutput  = function(p_entity) {
                var row_total   = p_entity["row_total"];
                if ( template === null) {
                    template = Handlebars.compile( p_this.items["_temp_list"].value );
                }
                p_this.items["_area_list"].value = template(p_entity);
            };
            // cbEnd
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패하였습니다. Result Code : " + p_entity["return"]);
            };
            
        }
        util.inherits(ProductDisplayService, _super);
    
        // 데코레이션 메소드
        ProductDisplayService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            console.log("----------------------------------");
        };
        ProductDisplayService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };

        return ProductDisplayService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.ProductDisplayService = ProductDisplayService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));