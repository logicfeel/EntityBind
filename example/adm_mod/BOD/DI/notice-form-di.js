/**
 * @namespace _W.Meta.Bind.NoticeFormDI
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
    var NoticeFormDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function NoticeFormDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["ntc_idx"] = {caption: "일련번호", value: ""};
            this.prop["sto_id"] = "S00001";
            this.prop["title"] = {
                caption: "제목",
                selector: "#title",
                getter: function() { return $("#title").val(); },
                setter: function(val) { $("#title").val(val); }
            };
            this.prop["writer"] = {
                caption: "작성자",
                selector: "#writer",
                getter: function() { return $("#writer").val(); },
                setter: function(val) { $("#writer").val(val); }
            };
            this.prop["top_yn"] = {
                caption: "상단공지유무", 
                selector: ["input[name=top_yn]", "#top_Y", "#top_N"],
                getter: function() { return $("input[name=top_yn]:checked").val(); },
                setter: function(val) { 
                    if (val === "Y" ) $("#top_Y").prop("checked", "checked");
                    if (val === "N" ) $("#top_N").prop("checked", "checked");
                }
            };
            this.prop["popup_yn"] = {
                caption: "팝업공지유무", 
                selector: ["input[name=popup_yn]", "#popup_Y", "#popup_N"],
                getter: function() { return $("input[name=popup_yn]:checked").val(); },
                setter: function(val) { 
                    if (val === "Y" ) $("#popup_Y").prop("checked", "checked");
                    if (val === "N" ) $("#popup_N").prop("checked", "checked");
                }
            };
            this.prop["contents"] = {
                caption: "공지내용", 
                selector: "#contents",
                getter: function() { return $("#contents").val(); },
                setter: function(val) { $("#contents").val(val); }
            };

            this.mapping = {
                ntc_idx: {
                    read: ["valid", "bind"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                sto_id: {
                    create: ["valid", "bind"]
                },
                title: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                writer: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                top_yn: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                popup_yn: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                contents: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                }
            };
        }
        util.inherits(NoticeFormDI, _super);
    
        // 데코레이션 메소드
        NoticeFormDI.prototype.preRegister = function(p_this) {
            BaseFormDI.prototype.preRegister.call(this, p_this);
        };
        NoticeFormDI.prototype.preCheck = function(p_this) {
            if (BaseFormDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        NoticeFormDI.prototype.preReady = function(p_this) {
            BaseFormDI.prototype.preReady.call(this, p_this);
            if (this.prop.mode === "EDIT")  {
                $("#adm_id").prop("readonly", "");
                p_this.read.execute();        // 수정모드 시 실행(execute)
            }
        };

        return NoticeFormDI;
    
    }(BaseFormDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseFormDI;
    } else {
        global._W.Meta.Bind.NoticeFormDI = NoticeFormDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));