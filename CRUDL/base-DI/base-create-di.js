/**
 * @namespace _W.Meta.Bind.BaseCreateDI
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
    var IBindModelCreate;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        IBindModelCreate    = global._W.Interface.IBindModelCreate;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelCreate === "undefined") throw new Error("[IBindModelCreate] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseCreateDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function BaseCreateDI() {
            _super.call(this);
            
            this.prop["listURL"]    = "";

            this.cbFail = function(p_result, p_item) {          // 전역 실패 콜백
                console.warn("실패 :: Value=\"%s\", Code=\"%s\", Message=\"%s\" ", p_result.value, p_result.code, p_result.msg);
                Msg("ALERT", "실패", p_result.msg);
                if (typeof p_item.selector[0] === "string") $(p_item.selector[0]).focus();
            };
            this.cbError = function(p_msg, p_status) {          // 전역 오류 콜백
                console.warn("오류 :: Status=\"%s\" , Message=\"%s\" ", p_status, p_msg);
                Msg("ALERT", "오류", p_msg);
            };
            this.onExecute = function(p_bindCommand) {          // 실행시 이벤트 등록
                console.log("onExecute 이벤트. ");
                $('.mLoading').show();
            };
            this.onExecuted = function(p_bindCommand) {         // 실행끝 이벤트 등록
                console.log("onExecuted 이벤트.. ");
                $('.mLoading').hide();
            };
        }
        util.inherits(BaseCreateDI, _super);
    
        // 가상 메소드  
        BaseCreateDI.prototype.preRegister = function() {
            console.log("preRegister : 이벤트 및 설정 등록 ");

            var _this = this;   // jqeury 함수 내부에서 this 접근시 사용

            this.create.cbEnd   = function(p_result, p_status, p_xhr) {          // create
                var entity = p_result["table"] ||  p_result["entity"];
                var code = entity["return"];

                if (code >= 0) { 
                    alert("정상 등록되었습니다.");
                    location.href = this._baseEntity.items["listURL"].value;
                } else {
                    alert("등록 실패 하였습니다. Code : " + code);
                }
            };
            
            $("#btn_Insert").click(function () {
                _this.create.execute();
            });
            $("#btn_List").click(function () {
                location.href = _this.first.items["listURL"].value;
            });
            $("#btn_Reset").click(function () {
                $("form").each(function() {
                    this.reset();
                });
            });
        };
        BaseCreateDI.prototype.preCheck = function() {   // 2.검사
            console.log("preCheck : 화면 유효성 검사 ");
            return true;
        };
        BaseCreateDI.prototype.preReady = function() {
            console.log("preReady : 준비완료 ");
        };

        return BaseCreateDI;
    
    }(IBindModelCreate));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseCreateDI;
    } else {
        global._W.Meta.Bind.BaseCreateDI = BaseCreateDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));