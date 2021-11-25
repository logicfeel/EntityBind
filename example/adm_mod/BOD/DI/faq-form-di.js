/**
 * @namespace _W.Meta.Bind.FAQFormDI
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
    var FAQFormDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function FAQFormDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["faq_idx"] = {caption: "일련번호", value: ""};
            this.prop["sto_id"] = "S00001";
            this.prop["adm_id"] = {
                caption: "질문",
                selector: "#question",
                getter: function() { return $("#question").val(); },
                setter: function(val) { $("#question").val(val); }
            };
            this.prop["rank_it"] = {
                caption: "순서",
                selector: "#rank_it",
                getter: function() { return $("#rank_it").val(); },
                setter: function(val) { $("#rank_it").val(val); }
            };
            this.prop["typeCode"] = {
                caption: "코드타입",
                selector: "#typeCode",
                getter: function() { return $("#typeCode").val(); },
                setter: function(val) { $("#typeCode").val(val); }
            };
            this.prop["question"] = {
                caption: "질문", 
                selector: "#question",
                getter: function() { return $("#question").val(); },
                setter: function(val) { $("#question").val(val); }
            };
            this.prop["answer"] = {
                caption: "답변내용", 
                selector: "#answer",
                getter: function() { return $("#answer").val(); },
                setter: function(val) { $("#answer").val(val); }
            };

            this.mapping = {
                faq_idx: {
                    read: ["valid", "bind"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                sto_id: {
                    create: ["valid", "bind"]
                },
                rank_it: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                typeCode: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                question: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                answer: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                }
            };
        }
        util.inherits(FAQFormDI, _super);
    
        // 데코레이션 메소드
        FAQFormDI.prototype.preRegister = function(p_this) {
            BaseFormDI.prototype.preRegister.call(this, p_this);
        };
        FAQFormDI.prototype.preCheck = function(p_this) {
            if (BaseFormDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        FAQFormDI.prototype.preReady = function(p_this) {
            BaseFormDI.prototype.preReady.call(this, p_this);
            if (this.prop.mode === "EDIT")  {
                $("#adm_id").prop("readonly", "");
                this.read.execute();        // 수정모드 시 실행(execute)
            }
        };

        return FAQFormDI;
    
    }(BaseFormDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseFormDI;
    } else {
        global._W.Meta.Bind.FAQFormDI = FAQFormDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));