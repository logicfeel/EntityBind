/**
 * @namespace _W.Meta.Bind.AccountFormDI
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
    var BaseFormDI;

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        BaseFormDI          = global._W.Meta.Bind.BaseFormDI;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseFormDI === "undefined") throw new Error("[BaseFormDI] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var AccountFormDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function AccountFormDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["acc_idx"] = {caption: "일련번호", value: ""};
            this.prop["sto_id"] = "S00001";
            this.prop["adm_id"] = {
                caption: "관리자ID",
                selector: "#adm_id",
                getter: function() { return $("#adm_id").val(); },
                setter: function(val) { $("#adm_id").val(val); }
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
                sto_id: {
                    create: ["valid", "bind"]
                },
                adm_id: {
                    read: "output",
                    create: ["valid", "bind"]
                },
                passwd: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                admName: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                use_yn: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                }
            };
        }
        util.inherits(AccountFormDI, _super);
    
        // 데코레이션 메소드
        AccountFormDI.prototype.preRegister = function(p_this) {
            BaseFormDI.prototype.preRegister.call(this, p_this);
        };
        AccountFormDI.prototype.preCheck = function(p_this) {
            if (BaseFormDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        AccountFormDI.prototype.preReady = function(p_this) {
            BaseFormDI.prototype.preReady.call(this, p_this);
            if (this.prop.mode === "EDIT")  {
                $("#adm_id").prop("readonly", "");
                p_this.read.execute();        // 수정모드 시 실행(execute)
            }
        };

        return AccountFormDI;
    
    }(BaseFormDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseFormDI;
    } else {
        global._W.Meta.Bind.AccountFormDI = AccountFormDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));