/**
 * @namespace _W.Meta.Bind.AccountEditDI
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
    var BaseEditDI;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        BaseEditDI          = global._W.Meta.Bind.BaseEditDI;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseEditDI === "undefined") throw new Error("[BaseEditDI] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var AccountEditDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function AccountEditDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["acc_idx"] = {caption: "일련번호", value: ""};
            this.prop["adm_id"] = {
                caption: "관리자ID",
                selector: "#adm_id",
                setter: function(val) { $("#adm_id").text(val); }
            };
            this.prop["passwd"] = {
                caption: "비밀번호",
                selector: "#passwd",
                getter: function() { return $("#passwd").val(); },
                setter: function(val) { $("#passwd").val(val); }
            };
            this.prop["admName"] = {
                caption: "관리자명", 
                selector: "#admName",
                getter: function() { return $("#admName").val(); },
                setter: function(val) { $("#admName").val(val); }
            };
            this.prop["use_yn"] = {
                caption: "사용유무", 
                selector: ["input[name=using_yn]", "#using_Y", "#using_N"],
                getter: function() { return $("input[name=using_yn]:checked").val(); },
                setter: function(val) { 
                    if (val === "Y" ) $("#using_Y").prop("checked", "checked");
                    else $("#using_N").prop("checked", "checked");
                }
            };

            this.mapping = {
                acc_idx: {
                    read: ["valid", "bind"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                adm_id: {
                    read: "output"
                },
                passwd: {
                    read: ["output"],
                    update: ["valid", "bind"]
                },
                admName: {
                    read: ["output"],
                    update: ["valid", "bind"]
                },
                use_yn: {
                    read: ["output"],
                    update: ["valid", "bind"]
                }
            };
        }
        util.inherits(AccountEditDI, _super);
    
        // 데코레이션 메소드
        AccountEditDI.prototype.preRegister = function(p_this) {
            BaseEditDI.prototype.preRegister.call(this, p_this);
        };
        AccountEditDI.prototype.preCheck = function(p_this) {
            if (BaseEditDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        AccountEditDI.prototype.preReady = function(p_this) {
            BaseEditDI.prototype.preReady.call(this, p_this);
            p_this.read.execute();
        };

        return AccountEditDI;
    
    }(BaseEditDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseEditDI;
    } else {
        global._W.Meta.Bind.AccountEditDI = AccountEditDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));