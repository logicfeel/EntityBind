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
    var BaseCreateDI;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        BaseCreateDI    = global._W.Meta.Bind.BaseCreateDI;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCreateDI === "undefined") throw new Error("[BaseCreateDI] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var AccountCreateDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function AccountCreateDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["sto_id"] = "S00001";
            this.prop["adm_id"] = {
                caption: "관리자ID",
                selector: "#adm_id",
                getter: function() { return $("#adm_id").val(); }
            };
            this.prop["passwd"] = {
                caption: "비밀번호",
                selector: "#passwd",
                getter: function() { return $("#passwd").val(); }
            };
            this.prop["admName"] = {
                caption: "관리자명", 
                selector: "#admName",
                getter: function() { return $("#admName").val(); }
            };
            this.prop["use_yn"] = {
                caption: "사용유무", 
                selector: ["input[name=using_yn]", "#using_Y", "#using_N"],
                getter: function() { return $("input[name=using_yn]:checked").val(); }
            };

            this.mapping = {
                sto_id: { create: ["valid", "bind"] },
                adm_id: { create: ["valid", "bind"] },
                passwd: { create: ["valid", "bind"] },
                admName: { create: ["valid", "bind"] },
                // use_yn: { create: ["valid", "bind"] }
                use_yn: { create: ["bind"] }
            };
        }
        util.inherits(AccountCreateDI, _super);
    
        // 데코레이션 메소드
        AccountCreateDI.prototype.preRegister = function() {
            BaseCreateDI.prototype.preRegister.call(this);
        };
        AccountCreateDI.prototype.preCheck = function() {
            if (BaseCreateDI.prototype.preCheck.call(this)) {
                if (this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        AccountCreateDI.prototype.preReady = function() {
            BaseCreateDI.prototype.preReady.call(this);
        };

        return AccountCreateDI;
    
    }(BaseCreateDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseCreateDI;
    } else {
        global._W.Meta.Bind.AccountCreateDI = AccountCreateDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));