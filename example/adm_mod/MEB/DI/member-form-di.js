/**
 * @namespace _W.Meta.Bind.MemberFormDI
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
    var MemberFormDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function MemberFormDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["meb_idx"] = {caption: "일련번호", value: ""};
            this.prop["sto_id"] = "S00001";
            this.prop["meb_id"] = {
                caption: "아이디",
                selector: "#meb_id",
                getter: function() { return $("#meb_id").val(); },
                setter: function(val) { $("#meb_id").val(val); }
            };
            this.prop["passwd"] = {
                caption: "비밀번호",
                selector: "#passwd",
                getter: function() { return $("#passwd").val(); },
                setter: function(val) { $("#passwd").val(val); }
            };
            this.prop["nickname"] = {
                caption: "닉네임", 
                selector: "#nickname",
                getter: function() { return $("#nickname").val(); },
                setter: function(val) { $("#nickname").val(val); }
            };
            this.prop["mebName"] = {
                caption: "이름", 
                selector: "#mebName",
                getter: function() { return $("#mebName").val(); },
                setter: function(val) { $("#mebName").val(val); }
            };
            this.prop["state_cd"] = {
                caption: "상태", 
                selector: ["input[name=state_cd]", "#state_W", "#state_A", "#state_S", "#state_O"],
                getter: function() { return $("input[name=state_cd]:checked").val(); },
                setter: function(val) { 
                    if (val === "W" ) $("#state_W").prop("checked", "checked");
                    if (val === "A" ) $("#state_A").prop("checked", "checked");
                    if (val === "S" ) $("#state_S").prop("checked", "checked");
                    if (val === "O" ) $("#state_O").prop("checked", "checked");
                }
            };
            this.prop["hp"] = {
                caption: "핸드폰", 
                selector: "#hp",
                getter: function() { return $("#hp").val(); },
                setter: function(val) { $("#hp").val(val); }
            };
            this.prop["tel"] = {
                caption: "연락처", 
                selector: "#tel",
                getter: function() { return $("#tel").val(); },
                setter: function(val) { $("#tel").val(val); }
            };
            this.prop["zipcode"] = {
                caption: "우편번호", 
                selector: "#zipcode",
                getter: function() { return $("#zipcode").val(); },
                setter: function(val) { $("#zipcode").val(val); }
            };
            this.prop["addr1"] = {
                caption: "주소", 
                selector: "#addr1",
                getter: function() { return $("#addr1").val(); },
                setter: function(val) { $("#addr1").val(val); }
            };
            this.prop["addr2"] = {
                caption: "세부주소", 
                selector: "#addr2",
                getter: function() { return $("#addr2").val(); },
                setter: function(val) { $("#addr2").val(val); }
            };
            this.prop["joinComment"] = {
                caption: "가입의견", 
                selector: "#joinComment",
                getter: function() { return $("#joinComment").val(); },
                setter: function(val) { $("#joinComment").val(val); }
            };
            this.prop["memo"] = {
                caption: "관리자 메모", 
                selector: "#memo",
                getter: function() { return $("#memo").val(); },
                setter: function(val) { $("#memo").val(val); }
            };

            this.mapping = {
                meb_idx: {
                    read: ["valid", "bind"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                sto_id: {
                    create: ["valid", "bind"]
                },
                meb_id: {
                    read: "output",
                    create: ["valid", "bind"]
                },
                passwd: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                nickname: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                mebName: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                state_cd: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                hp: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                tel: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                zipcode: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                addr1: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                addr2: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                joinComment: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                memo: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                }
            };
        }
        util.inherits(MemberFormDI, _super);
    
        // 데코레이션 메소드
        MemberFormDI.prototype.preRegister = function(p_this) {
            BaseFormDI.prototype.preRegister.call(this, p_this);
        };
        MemberFormDI.prototype.preCheck = function(p_this) {
            if (BaseFormDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        MemberFormDI.prototype.preReady = function(p_this) {
            BaseFormDI.prototype.preReady.call(this, p_this);
            if (this.prop.mode === "EDIT")  {
                $("#meb_id").prop("readonly", "");
                p_this.read.execute();        // 수정모드 시 실행(execute)
            }
        };

        return MemberFormDI;
    
    }(BaseFormDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseFormDI;
    } else {
        global._W.Meta.Bind.MemberFormDI = MemberFormDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));