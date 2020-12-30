/**
 * @namespace _W.Meta.Bind.AccountReadDelDI
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
    var BaseReadDelDI;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BaseReadDelDI           = global._W.Meta.Bind.BaseReadDelDI;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseReadDelDI === "undefined") throw new Error("[BaseReadDelDI] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var AccountReadDelDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function AccountReadDelDI() {
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
                setter: function(val) { $("#passwd").text(val); }
            };
            this.prop["admName"] = {
                caption: "관리자명", 
                selector: "#admName",
                setter: function(val) { $("#admName").text(val); }
            };
            this.prop["use_yn"] = {
                caption: "사용유무", 
                selector: ["#using_yn"],
                setter: function(val) { $("#using_yn").text( val === "Y" ? "정상" : "중지"); }
            };

            this.mapping = {
                acc_idx: {
                    read: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                adm_id: {read: "output" },
                passwd: {read: "output" },
                admName: {read: "output" },
                use_yn: {read: "output" }
            };
        }
        util.inherits(AccountReadDelDI, _super);
    
        // 데코레이션 메소드
        AccountReadDelDI.prototype.preRegister = function() {
            BaseReadDelDI.prototype.preRegister.call(this);
        };
        AccountReadDelDI.prototype.preCheck = function() {
            if (BaseReadDelDI.prototype.preCheck.call(this)) {
                if (this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        AccountReadDelDI.prototype.preReady = function() {
            BaseReadDelDI.prototype.preReady.call(this);
            this.read.execute();
        };

        return AccountReadDelDI;
    
    }(BaseReadDelDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseReadDelDI;
    } else {
        global._W.Meta.Bind.AccountReadDelDI = AccountReadDelDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));