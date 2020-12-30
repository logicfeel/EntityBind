/**
 * @namespace _W.Meta.Bind.BaseFormDI
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
    var IBindModelForm;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelForm    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        IBindModelForm      = global._W.Interface.IBindModelForm;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelForm === "undefined") throw new Error("[IBindModelForm] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseFormDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function BaseFormDI() {
            _super.call(this);
            
            var params = ParamGet2JSON(location.href);          // admin_common.js

            this.prop["mode"]       = params.mode;
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
        util.inherits(BaseFormDI, _super);
        // 정적 메소드
        BaseFormDI.createMode = function() {
                $("#btn_Update").hide();
                $("#btn_Delete").hide();
                $("#btn_Insert").show();
                $("#btn_Reset").show();
        };
        BaseFormDI.editMode = function() {
                $("#adm_id").prop("readonly", "");
                $("#btn_Insert").hide();
                $("#btn_Update").show();
                $("#btn_Delete").show();
                $("#btn_Reset").hide();
        };
        // 가상 메소드
        BaseFormDI.prototype.preRegister = function() {
            console.log("preRegister : 이벤트 및 설정 등록 ");

            var _this = this;   // jqeury 함수 내부에서 this 접근시 사용

            this.delete.cbValid = function() {          // delete
                return confirm("삭제 하시겠습니까 ?");
            };
            this.delete.cbEnd = function(p_result) {
                location.href = _this.first.items["listURL"].value;
            };    
            this.update.cbValid = function() {          // update
                return confirm("수정 하시겠습니까 ?");
            };
            this.update.cbEnd = function(p_result, p_status, p_xhr) {
                var entity = p_result["table"] ||  p_result["entity"];
                var code = entity["return"];

                if (code >= 0) { 
                    alert("정상 수정되었습니다.");
                } else {
                    alert("수정 실패 하였습니다. Code : " + code);
                }
            };
            this.create.cbEnd   = function(p_result, p_status, p_xhr) {          // create
                var entity = p_result["table"] ||  p_result["entity"];
                var code = entity["return"];

                if (code >= 0) { 
                    alert("정상 수정되었습니다.");
                } else {
                    alert("수정 실패 하였습니다. Code : " + code);
                }
            };
            
            $("#btn_Update").click(function () {
                _this.update.execute();
            });
            $("#btn_Insert").click(function () {
                _this.create.execute();
            });
            $("#btn_Delete").click(function () {
                _this.delete.execute();
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
        BaseFormDI.prototype.preCheck = function() {   // 2.검사
            console.log("preCheck : 화면 유효성 검사 ");

            if (typeof this.prop.mode === "undefined" || this.prop.mode === "") {
                Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(mode)", "A");
                return false;
            }
            if (!(this.prop.mode === "CREATE" || this.prop.mode == "EDIT")) {
                Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(INSERT/UPDATE)", "A");
                return false;
            }
            return true;
        };
        BaseFormDI.prototype.preReady = function() {
            console.log("preReady : 준비완료 ");
            
            if (this.prop.mode === "CREATE") {
                BaseFormDI.createMode();
            } else if (this.prop.mode === "EDIT") {
                BaseFormDI.editMode();
            }    
        };
        
        return BaseFormDI;
    
    }(IBindModelForm));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseFormDI;
    } else {
        global._W.Meta.Bind.BaseFormDI = BaseFormDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));