/**
 * @namespace _W.Meta.Bind.ProductFormDI
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
    var ProductFormDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductFormDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["prt_id"] = {caption: "상품번호", value: ""};
            this.prop["sto_id"] = "S00001";
            this.prop["prtName"] = {
                caption: "상품명",
                selector: "#prtName",
                getter: function() { return $("#prtName").val(); },
                setter: function(val) { $("#prtName").val(val); }
            };
            this.prop["type_cd"] = {
                caption: "상품타입",
                selector: "input[name=type_cd]",
                getter: function() { return $("input[name=type_cd]:checked").val(); },
                setter: function(val) { 
                    if (val === "RE" ) $("#type_RE").prop("checked", "checked");
                    if (val === "DE" ) $("#type_DE").prop("checked", "checked");
                }
            };
            this.prop["state_cd"] = {
                caption: "상품상태", 
                selector: ["input[name=state_cd]"],
                getter: function() { return $("input[name=state_cd]:checked").val(); },
                setter: function(val) { 
                    if (val === "SS" ) $("#state_SS").prop("checked", "checked");
                    if (val === "RS" ) $("#state_RS").prop("checked", "checked");
                    if (val === "DS" ) $("#state_DS").prop("checked", "checked");
                    if (val === "DH" ) $("#state_DH").prop("checked", "checked");
                }
            };
            this.prop["begin_dt"] = {
                caption: "판매시작일",
                isNotNull: true, 
                selector: "#begin_dt",
                constraints: [
                    { regex: /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/, msg: "날짜형식으로 입력해주세요 (2001-01-01) ", code: 150, return: true}
                ],
                getter: function() { return $("#begin_dt").val(); },
                setter: function(val) { $("#begin_dt").val(val); }
            };
            this.prop["close_dt"] = {
                caption: "판매종료일", 
                selector: "#close_dt",
                constraints: [
                    { regex: /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/, msg: "날짜형식으로 입력해주세요 (2001-01-01) ", code: 150, return: true}
                ],
                getter: function() { return $("#close_dt").val(); },
                setter: function(val) { $("#close_dt").val(val); }
            };
            this.prop["kind_cd"] = {
                caption: "상품종류", 
                selector: ["input[name=kind_cd]"],
                getter: function() { return $("input[name=kind_cd]:checked").val(); },
                setter: function(val) { 
                    if (val === "NEW" ) $("#kind_NEW").prop("checked", "checked");
                    if (val === "POP" ) $("#kind_POP").prop("checked", "checked");
                    if (val === "REC" ) $("#kind_REC").prop("checked", "checked");
                    if (val === "XXX" ) $("#kind_XXX").prop("checked", "checked");
                }
            };
            this.prop["stock_it"] = {
                caption: "재고수", 
                selector: "#stock_it",
                getter: function() { return $("#stock_it").val(); },
                setter: function(val) { $("#stock_it").val(val); }
            };
            this.prop["keyword"] = {
                caption: "키워드", 
                selector: "#keyword",
                getter: function() { return $("#keyword").val(); },
                setter: function(val) { $("#keyword").val(val); }
            };
            this.prop["recommRange"] = {
                caption: "추천개월수", 
                selector: "#recommRange",
                getter: function() { return $("#recommRange").val(); },
                setter: function(val) { $("#recommRange").val(val); }
            };
            this.prop["contents"] = {
                caption: "상품설명", 
                selector: "#contents",
                getter: function() { return $("#contents").val(); },
                setter: function(val) { $("#contents").val(val); }
            };

            this.mapping = {
                prt_id: {
                    read: ["valid", "bind"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                sto_id: {
                    create: ["valid", "bind"]
                },
                type_cd: {
                    create: ["valid", "bind"],
                    read: ["output"]
                },
                prtName: {
                    create: ["valid", "bind"],
                    read: ["output"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },                
                state_cd: {
                    create: ["valid", "bind"],
                    read: ["output"],
                    update: ["valid", "bind"],
                    delete: ["valid", "bind"]
                },
                begin_dt: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                close_dt: {
                    read: ["output"],
                    update: ["valid", "bind"],
                    create: ["valid", "bind"]
                },
                kind_cd: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                stock_it: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                keyword: {
                    read: ["output"],
                    update: ["bind"],
                    create: ["bind"]
                },
                recommRange: {
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
        util.inherits(ProductFormDI, _super);
    
        // 데코레이션 메소드
        ProductFormDI.prototype.preRegister = function(p_this) {
            BaseFormDI.prototype.preRegister.call(this, p_this);
        };
        ProductFormDI.prototype.preCheck = function(p_this) {
            if (BaseFormDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                             // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;    
        };
        ProductFormDI.prototype.preReady = function(p_this) {
            BaseFormDI.prototype.preReady.call(this, p_this);
            if (this.prop.mode === "EDIT")  {
                $("#meb_id").prop("readonly", "");
                p_this.read.execute();        // 수정모드 시 실행(execute)
            }
        };

        return ProductFormDI;
    
    }(BaseFormDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseFormDI;
    } else {
        global._W.Meta.Bind.ProductFormDI = ProductFormDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));