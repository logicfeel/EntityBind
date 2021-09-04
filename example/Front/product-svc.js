/**
 * @namespace _W.Meta.Bind.ProductService
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
    var BindCommandLookupAjax;
    var BindCommandEditAjax     =_W.Meta.Bind.BindCommandEditAjax;
    
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseService === "undefined") throw new Error("[BaseService] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var ProductService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductService(p_this, p_suffix) {
            _super.call(this);

            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;
            
            // command 생성
            p_this.read         = new BindCommandLookupAjax(p_this);
            p_this.list_option  = new BindCommandLookupAjax(p_this);
            p_this.list_image   = new BindCommandLookupAjax(p_this);

            // 모델 속성 설정
            p_this.read.url         = "/Front/frt_mod/PRT/Product.C.asp";
            p_this.list_option.url  = "/Front/frt_mod/PRT/Product_Option.C.asp";
            p_this.list_image.url   = "/Front/frt_mod/PRT/Product_Image.C.asp";

            p_this.read.outputOption = 3;

            // 사용자 속성
            p_this.optionInfo   = {};   // 전체 옵션
            p_this.cartInfo     = {};   // 선택 옵션

            // prop 속성 설정
            this.prop = {
                // view
                _temp_option:       { selector: { key: "#s-temp-option"+ SUFF,          type: "html" } },
                _area_option:       { selector: { key: "#s-area-option"+ SUFF,          type: "html" } },
                _temp_option_view:  { selector: { key: "#s-temp-option-view"+ SUFF,     type: "html" } },
                _area_option_view:  { selector: { key: "#s-area-option-vlew"+ SUFF,     type: "html" } },
                _temp_image:        { selector: { key: "#s-temp-image"+ SUFF,           type: "html" } },
                _area_image:        { selector: { key: "#s-area-image"+ SUFF,           type: "html" } },
                _sellTotal:         { selector: { key: "#s-txt-sellTotal"+ SUFF,        type: "html" } },
                _decountTotal:      { selector: { key: "#s-txt-decountTotal"+ SUFF,     type: "html" } },
                _productTotal:      { selector: { key: "#s-txt-productTotal"+ SUFF,     type: "html" } },
                _option:            { selector: { key: "[name=s-option"+SUFF+"]",       type: "attr.row_count" } },
                _productSum:        { selector: { key: "[name=s-productSum"+SUFF+"]",   type: "attr.row_count" } },
                _qty:               { selector: { key: "[name=s-qty"+SUFF+"]",          type: "attr.row_count" } },
                _txt_sell:          { selector: { key: "#s-txt-sell"+ SUFF,             type: "text" } },
                _txt_discount:      { selector: { key: "#s-txt-discount"+ SUFF,         type: "text" } },
                _txt_point_it:      { selector: { key: "#s-txt_point_it"+ SUFF,         type: "text" } },
                _txt_deli_mn:       { selector: { key: "#s-txt_deli_mn"+ SUFF,          type: "text" } },
                _txt_deli_msg:      { selector: { key: "#s-txt_deli_msg"+ SUFF,         type: "text" } },
                // bind
                cmd:                "",
                prt_id:             "",
                prtName:            { selector: { key: "#m-prtName"+ SUFF,              type: "html" } },
                sell_mn:            0,
                discount_mn:        0,
                point_it:           0,
                method_cd:          "",
                deli_mn:            "",
                base_mn:            "",
                base_cd:            "",
                optName:            { selector: { key: "#m-optName"+ SUFF,              type: "text" } },
                contents:           { selector: { key: "#m-contents"+ SUFF,             type: "html" } },
                fileName:           { selector: { key: "#m-fileName"+ SUFF,             type: "attr.src" } },
                state_cd:            "",
                state_info:         { selector: { key: "#s-state_info"+ SUFF,         type: "text" } },
            };
            
            // mapping 설정 
            this.mapping = {
                cmd:                { Array: ["bind"] },    // 전역설정
                prt_id:             { read:  ["bind"],      list_option: "bind",        list_image: "bind" },
                prtName:            { read:  ["output"] },
                sell_mn:            { read:  ["output"] },
                discount_mn:        { read:  ["output"] },
                point_it:           { read:  ["output"] },
                method_cd:          { read:  ["output"] },
                deli_mn:            { read:  ["output"] },
                base_mn:            { read:  ["output"] },
                base_cd:            { read:  ["output"] },
                optName:            { read:  ["output"] },
                contents:           { read:  ["output"] },
                fileName:           { read:  ["output"] },
                state_cd:           { read:  ["output"] },
                state_info:         { read:  ["output"] },
            };

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.read.onExecute           = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            p_this.list_option.onExecute    = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            p_this.list_image.onExecute     = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            // cbOutput
            var template = null;
            p_this.list_option.cbOutput  = function(p_entity) {
                var row;

                if ( template === null) {
                    template = Handlebars.compile( p_this.items["_temp_option"].value );
                    Handlebars.registerHelper('comma_num', function (p_nmber) {
                        return numberWithCommas(p_nmber);
                    });
                }
                p_this.items["_area_option"].value = template(p_entity);
                // 엔티티 구성
                for (var i = 0; i < p_entity.rows.length; i++) {
                    row = p_entity.rows[i];
                    p_this.optionInfo[row["row_count"]] = { 
                        row_count: row["row_count"],
                        prt_id: row["prt_id"],
                        opt_idx: row["opt_idx"],
                        optName: row["optName"],
                        sell_mn: row["sell_mn"],
                        discount_mn: row["discount_mn"],
                        point_it: row["point_it"],
                        qty_it: 1 
                    };    
                }
            };
            p_this.list_image.cbOutput  = function(p_entity) {
                var template = Handlebars.compile( p_this.items["_temp_image"].value );
                p_this.items["_area_image"].value = template(p_entity);
            };
            // cbEnd
            p_this.read.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                p_this.items["_txt_sell"].value     =  numberWithCommas(p_this.items["sell_mn"].value);
                p_this.items["_txt_discount"].value =  numberWithCommas(p_this.items["discount_mn"].value);
                p_this.items["_txt_point_it"].value =  numberWithCommas(p_this.items["point_it"].value);
                p_this.items["_txt_deli_mn"].value  =  numberWithCommas(p_this.items["deli_mn"].value);
                p_this.items["_txt_deli_msg"].value =  method_msg(p_this.items["method_cd"].value);
            };
            // 내부 함수
            function method_msg(p_method_cd) {
                var msg = "";
                var base_msg    = p_this.items["base_cd"].value === "U" ? "미만 무료" : "이상 무료";
                var base_mn     = p_this.items["base_mn"].value;

                if (p_method_cd === 'FREE') msg = "무료";
                if (p_method_cd === 'EACH') msg = "개별배송비";
                if (p_method_cd === 'BASE') {
                    msg = numberWithCommas(base_mn) + "원" +  base_msg;
                }
                return msg;
            }
        }
        util.inherits(ProductService, _super);
    
        // 데코레이션 메소드
        ProductService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            // 셀랙터 얻기
            var _area_option_view = p_this.items["_area_option_view"].selector.key;
            var _area_option = p_this.items["_area_option"].selector.key;
            var _sellTotal = p_this.items["_sellTotal"].selector.key;
            var _decountTotal = p_this.items["_decountTotal"].selector.key;
            var _productTotal = p_this.items["_productTotal"].selector.key;
            var _option = p_this.items["_option"].selector.key;
            var _productSum = p_this.items["_productSum"].selector.key;
            var _qty = p_this.items["_qty"].selector.key;

            // 인스턴스 함수 등록
            var template = null;
            p_this._addOption = function(p_row_count) {

                if ( template === null) {
                    template = Handlebars.compile( p_this.items["_temp_option_view"].value );
                }
                // 처음 등록시
                if (typeof p_this.cartInfo[p_row_count] === "undefined") {
                    p_this.cartInfo[p_row_count] = p_this.optionInfo[p_row_count];
                    $(_area_option_view).append(template(p_this.optionInfo[p_row_count]));
                    $(_area_option).val("").attr("selected", "selected");
                    p_this._sumTotal();
                }
            };
            p_this._sumTotal =function() {
                var qty_it = 1;
                var sell_mn = 0;
                var discount_mn = 0;
                var prt_mn = 0;
        
                for(var prop in this.cartInfo) {
                    if (this.cartInfo.hasOwnProperty(prop)) {
                        qty_it = this.cartInfo[prop].qty_it;
                        sell_mn = sell_mn + this.cartInfo[prop].sell_mn * qty_it;
                        discount_mn = discount_mn + this.cartInfo[prop].discount_mn  * qty_it;
                    }
                }
                prt_mn = prt_mn + discount_mn;
                $(_sellTotal).text(numberWithCommas(sell_mn));
                $(_decountTotal).text(numberWithCommas(sell_mn - discount_mn) );
                $(_productTotal).text(numberWithCommas(prt_mn));
            };
            p_this._removeOption = function(p_row_count) {
                $(_option +"[row_count="+ p_row_count +"]").remove(); 
                delete this.cartInfo[p_row_count];
                this._sumTotal();
            };
            p_this._editQty = function(p_row_count, p_value) {
                cartInfo[p_row_count].qty_it = p_value;
                this._sumTotal();;
            }
            p_this._plusQty = function(p_row_count){
                var qty = $(_qty +"[row_count="+ p_row_count +"]").val();
                var discount_mn = this.cartInfo[p_row_count].discount_mn;

                qty++;
                $(_qty +"[row_count="+ p_row_count +"]").val(qty);
                $(_productSum +"[row_count="+ p_row_count +"]").text(numberWithCommas(discount_mn * qty));
                this.cartInfo[p_row_count].qty_it = qty;
                this._sumTotal();
            };
            p_this._minusQty = function(p_row_count){
                var qty = $(_qty +"[row_count="+ p_row_count +"]").val();
                var discount_mn = this.cartInfo[p_row_count].discount_mn;

                qty--;
                if (qty > 0 )  {
                    $(_qty +"[row_count="+ p_row_count +"]").val(qty);
                    $(_productSum +"[row_count="+ p_row_count +"]").text(numberWithCommas(discount_mn * qty));
                     this.cartInfo[p_row_count].qty_it = qty;
                     this._sumTotal();
                }
            };
            console.log("----------------------------------");
        };
        ProductService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        ProductService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return ProductService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.ProductService = ProductService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));