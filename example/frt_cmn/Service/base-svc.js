/**
 * @namespace _W.Meta.Bind.BaseService
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
    var IBindModel;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModel    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        IBindModel          = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function BaseService(p_this) {
            _super.call(this);
            

            this.cbFail = function(p_result, p_item) {          // 전역 실패 콜백
                console.warn("실패 :: Value=\"%s\", Code=\"%s\", Message=\"%s\" ", p_result.value, p_result.code, p_result.msg);
                alert("실패 :: " + p_result.msg);
                if (p_item.selector.key.length > 0 ) $(p_item.selector.key).focus();
            };
            this.cbError = function(p_msg, p_status) {          // 전역 오류 콜백
                console.warn("오류 :: Status=\"%s\" , Message=\"%s\" ", p_status, p_msg);
                alert("오류 :: " + p_msg);
            };
            this.cbResult = function(p_result) {
                var entity = p_result["table"] || p_result["entity"] || p_result["tables"] || p_result["entities"];
                if (typeof entity["return"] === "undefined") entity["return"] = -100;
                return entity;
            };
            this.cbBaseValid = function(p_valid) {
                console.log("cbBaseValid 콜백. ");
                return true;
            };
            this.cbBaseBind = function(p_ajaxSetup) {
                console.log("cbBaseBind 콜백. ");
            };
            this.cbBaseEnd = function(p_result, p_state, p_xhr) {
                console.log("cbBaseEnd 콜백. ");
            };
            this.cbBaseOutput = function(p_entity) {
                console.log("cbBaseOutput 콜백. ");
            };
            this.onExecute = function(p_bindCommand) {          // 실행시 이벤트 등록
                console.log("onExecute 이벤트. ");
            };
            this.onExecuted = function(p_bindCommand) {         // 실행끝 이벤트 등록
                console.log("onExecuted 이벤트.. ");
            };
        }
        util.inherits(BaseService, _super);
    
        // 데코레이션 메소드  
        BaseService.prototype.preRegister = function(p_this) {
            console.log("preRegister : 이벤트 및 설정 등록 ");
        };
        BaseService.prototype.preCheck = function(p_this) {   // 2.검사
            console.log("preCheck : 화면 유효성 검사 ");
            return true;
        };
        BaseService.prototype.preReady = function(p_this) {
            console.log("preReady : 준비완료 ");
        };

        return BaseService;
    
    }(IBindModel));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global._W.Meta.Bind.BaseService = BaseService;
        global.BaseService = BaseService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));