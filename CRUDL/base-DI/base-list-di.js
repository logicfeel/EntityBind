/**
 * @namespace _W.Meta.Bind.BaseListDI
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
    var IBindModelList;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelList    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        IBindModelList      = global._W.Interface.IBindModelList;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelList === "undefined") throw new Error("[IBindModelList] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseListDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function BaseListDI() {
            _super.call(this);
            
            this.attr["regURL"]        = "";                    // 등록화면 경로

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
        util.inherits(BaseListDI, _super);
        // 메소드
        BaseListDI.prototype.cbRegister = function() {
            console.log("cbRegister : 이벤트 및 설정 등록 ");
            
            var _this = this;   // jqeury 함수 내부에서 this 접근시 사용
            
            $("#btn_Search").click(function () {
                _this.list.execute();
            });
            $("#btn_Reset").click(function () {
                $("form").each(function() {
                    this.reset();
                });
            });
            $("#btn_Insert").click(function () {
                var regURL = _this.first.items["regURL"].value;
                location.href = regURL + "?mode=CREATE";
            });    
        };
        BaseListDI.prototype.cbCheck = function() {
            console.log("cbCheck : 화면 유효성 검사 ");
            return true;
        };
        BaseListDI.prototype.cbReady = function() {
            console.log("cbReady : 준비완료 ");
        };
        
        return BaseListDI;
    
    }(IBindModelList));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseListDI;
    } else {
        global._W.Meta.Bind.BaseListDI = BaseListDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));