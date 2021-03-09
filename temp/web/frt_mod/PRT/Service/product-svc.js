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
        function ProductService(p_this) {
            _super.call(this);
            
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
                // view 속성
                _opt_template:      { selector: { key: "#option-list-template",         type: "html" } },
                _opt_body:          { selector: { key: "#option-list-body",             type: "html" } },
                _opt_total:         { selector: { key: "#option-total",                 type: "html" } },
                _img_template:      { selector: { key: "#image-list-template",          type: "html" } },
                _img_body:          { selector: { key: "#image-list-body",              type: "html" } },
                _img_total:         { selector: { key: "#image-total",                  type: "html" } },
                _opt_view_template: { selector: { key: "#option-view-template",         type: "html" } },
                _opt_view_body:     { selector: { key: "#option-view-body",             type: "html" } },                
                // mapping 속성
                cmd:                "",
                prt_id:             "",
                prtName:            { selector: { key: "#prtName",                      type: "html" } },
                sell_mn:            { setter: function(val) { $("#sell_mn").html(numberWithCommas(val)); } },
                discount_mn:        { setter: function(val) { $("#discount_mn").html(numberWithCommas(val)); } },
                optName:            { selector: { key: "#optName",                      type: "html" } },
                contents:           { selector: { key: "#prt-contents",                 type: "html" } },
                fileName:           { selector: { key: "#prt_fileName",                 type: "attr.src" } },
            };
            
            // mapping 설정
            this.mapping = {
                cmd:                { Array: ["bind"] },    // 전역설정
                prt_id:             { read:  ["bind"],      list_option: "bind",        list_image: "bind" },
                prtName:            { read:  ["output"] },
                sell_mn:            { read:  ["output"] },
                discount_mn:        { read:  ["output"] },
                optName:            { read:  ["output"] },
                contents:           { read:  ["output"] },
                fileName:           { read:  ["output"] },
            };

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.read.onExecute           = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            p_this.list_option.onExecute    = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            p_this.list_image.onExecute     = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            // cbEnd
            p_this.read.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
            };
            // cbOutput
            var template = null;
            p_this.list_option.cbOutput  = function(p_entity) {
                var row_total   = p_entity["row_total"];
                var row;

                if ( template === null) {
                    template = Handlebars.compile( p_this.items["_opt_template"].value );

                    Handlebars.registerHelper('comma_num', function (p_nmber) {
                        return numberWithCommas(p_nmber);
                    });
                }
                p_this.items["_opt_total"].value = row_total;
                p_this.items["_opt_body"].value = template(p_entity);

                // 엔티티 구성
                for (var i = 0; i < p_entity.rows.length; i++) {
                    row = p_entity.rows[i];
                    p_this.optionInfo[row["opt_idx"]] = { 
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
                var row_total   = p_entity["row_total"];
                var template = Handlebars.compile( p_this.items["_img_template"].value );

                p_this.items["_img_total"].value = row_total;
                p_this.items["_img_body"].value = template(p_entity);
            };

        }
        util.inherits(ProductService, _super);
    
        // 데코레이션 메소드
        ProductService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            // 인스턴스 함수 등록
            var template = null;
            p_this._addOption = function(p_idx) {

                var selector = p_this.items["_opt_view_body"].selector.key;

                if ( template === null) {
                    template = Handlebars.compile( p_this.items["_opt_view_template"].value );
                }
                // 첫 등록시
                if (typeof p_this.cartInfo[p_idx] === "undefined") {
                    p_this.cartInfo[p_idx] = p_this.optionInfo[p_idx];
                    $(selector).append(template(p_this.optionInfo[p_idx]));
                    p_this._sumTotal();
                    $("#option-list-body").val("").attr("selected", "selected");
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
                        prt_mn = prt_mn + discount_mn;
                    }
                }
                $("#total_sell_mn").text(numberWithCommas(sell_mn));
                $("#total_discount_mn").text(numberWithCommas(sell_mn - discount_mn) );
                $("#total_prt_mn").text(numberWithCommas(prt_mn));
            };
            p_this._removeOption = function removeOption(p_idx) {
                $("#option_display_item_" + p_idx).remove(); 
                delete this.cartInfo[p_idx];
                this._sumTotal();
            };
            p_this._editQty = function editQty(p_idx, p_value) {
                cartInfo[p_idx].qty_it = p_value;
                this._sumTotal();;
            }
            p_this._plusQty = function plusQty(p_idx){
                var qty = $("#prt_qty_" + p_idx).val();
                var sell_mn = this.cartInfo[p_idx].sell_mn;
                var discount_mn = this.cartInfo[p_idx].discount_mn;

                qty++;
                $("#prt_qty_" + p_idx).val(qty);
                $("#option_prt_display_"+ p_idx).text(numberWithCommas(discount_mn * qty));
                this.cartInfo[p_idx].qty_it = qty;
                this._sumTotal();
            };
            p_this._minusQty = function minusQty(p_idx){
                var qty = $("#prt_qty_" + p_idx).val();
                var sell_mn = this.cartInfo[p_idx].sell_mn;
                var discount_mn = this.cartInfo[p_idx].discount_mn;

                qty--;
                if (qty > 0 )  {
                     $("#prt_qty_" + p_idx).val(qty);
                     $("#option_prt_display_"+ p_idx).text(discount_mn * qty);
                     this.cartInfo[p_idx].qty_it = qty;
                     this._sumTotal();
                }
            };

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