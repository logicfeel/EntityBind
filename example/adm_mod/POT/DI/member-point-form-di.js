/**
 * @namespace _W.Meta.Bind.MemberPointFormDI
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
    var MemberPointFormDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function MemberPointFormDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["pot_id"] = {caption: "일련번호", value: ""};
            this.prop["sto_id"] = "S00001";
            this.prop["pointName"] = {
                caption: "포인트명",
                selector: "#pointName",
                getter: function() { return $("#pointName").val(); },
                setter: function(val) { $("#pointName").val(val); }
            };
            this.prop["identifier"] = {
                caption: "식별코드",
                selector: "#identifier",
                getter: function() { return $("#identifier").val(); },
                setter: function(val) { $("#identifier").val(val); }
            };
            this.prop["method_cd"] = {
                caption: "타입", 
                selector: ["input[name=method_cd]", "#method_F", "#method_P", "#method_E"],
                getter: function() { return $("input[name=method_cd]:checked").val(); },
                setter: function(val) { 
                    if (val === "F" ) $("#method_F").prop("checked", "checked");
                    if (val === "P" ) $("#method_P").prop("checked", "checked");
                    if (val === "E" ) $("#method_E").prop("checked", "checked");
                }
            };
            this.prop["use_yn"] = {
                caption: "사용유무", 
                selector: ["input[name=use_yn]", "#use_Y", "#use_N"],
                getter: function() { return $("input[name=use_yn]:checked").val(); },
                setter: function(val) { 
                    if (val === "Y" ) $("#use_Y").prop("checked", "checked");
                    else $("#use_N").prop("checked", "checked");
                }
            };
            this.prop["percent_it"] = {
                caption: "퍼센트", 
                selector: "#percent_it",
                getter: function() { return $("#percent_it").val(); },
                setter: function(val) { $("#percent_it").val(val); }
            };
            this.prop["point_it"] = {
                caption: "포인트", 
                selector: "#point_it",
                getter: function() { return $("#point_it").val(); },
                setter: function(val) { $("#point_it").val(val); }
            };
            this.prop["contents"] = {
                caption: "설명", 
                selector: "#contents",
                getter: function() { return $("#contents").val(); },
                setter: function(val) { $("#contents").val(val); }
            };

            this.mapping = {
                pot_id: {
                    read: ["valid", "bind"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                sto_id: {
                    create: ["valid", "bind"]
                },
                pointName: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                identifier: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                method_cd: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                use_yn: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                percent_it: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                point_it: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                contents: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                }

            };
        }
        util.inherits(MemberPointFormDI, _super);
    
        // 데코레이션 메소드
        MemberPointFormDI.prototype.preRegister = function(p_this) {
            BaseFormDI.prototype.preRegister.call(this, p_this);
        };
        MemberPointFormDI.prototype.preCheck = function(p_this) {
            if (BaseFormDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        MemberPointFormDI.prototype.preReady = function(p_this) {
            BaseFormDI.prototype.preReady.call(this, p_this);
            if (this.prop.mode === "EDIT")  {
                $("#meb_id").prop("readonly", "");
                p_this.read.execute();        // 수정모드 시 실행(execute)
            }
        };

        return MemberPointFormDI;
    
    }(BaseFormDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseFormDI;
    } else {
        global._W.Meta.Bind.MemberPointFormDI = MemberPointFormDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));