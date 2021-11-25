/**
 * @namespace _W.Meta.Bind.OrderCartService
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
    var BaseService;
    var BindCommandLookupAjax;
    var BindCommandEditAjax;

    // var accountFrmURL;          // 수정화면 경로(참조)

    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BaseService             = global._W.Meta.Bind.BaseService;
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
    var OrderCartService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function OrderCartService(p_this, p_suffix) {
            _super.call(this);

            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;

            // command 생성
            p_this.create       = new BindCommandEditAjax(p_this);      // 장바구니 등록
            p_this.list         = new BindCommandLookupAjax(p_this);    // 장바구니 목록
            p_this.order        = new BindCommandEditAjax(p_this);      // 선택 상품 주문준비
            p_this.delete       = new BindCommandEditAjax(p_this);      // 선택 상품 삭제
            p_this.read_deli    = new BindCommandLookupAjax(p_this);    
            

            // 모델 속성 설정
            p_this.baseUrl          = "/Front/frt_mod/ORD/Order_Cart.C.asp";
            p_this.read_deli.url    = "/Front/frt_mod/PRT/Product_BaseDelivery.C.asp";

            p_this.read_deli.outputOption = 3; 

            // prop 속성 설정
            this.prop = {
                // inner
                __orderURL:         "",
                // view
                _temp_list:         { selector: { key: "#s-temp-list"+ SUFF,                        type: "html" } },
                _area_list:         { selector: { key: "#s-area-list"+ SUFF,                        type: "html" } },
                _btn_allOrder:      { selector: { key: "#s-btn-allOrder"+ SUFF,                     type: "html" } },
                _btn_chkOrder:      { selector: { key: "#s-btn-chkOrder"+ SUFF,                     type: "html" } },
                _btn_chkDelete:     { selector: { key: "#s-btn-chkDelete"+ SUFF,                    type: "html" } },
                _checkbox:          { selector: { key: "input:checkbox[name=s-cartPrt"+ SUFF +"]",  type: "value" } },
                _checkbox_row:      { selector: { key: "input:checkbox[name=s-cartPrt"+ SUFF +"]",  type: "attr.row_count" } },
                _btn_delete:        { selector: { key: "[name=s-btn-delete"+ SUFF +"]",             type: "value" } },

                
                _cart_count:        { selector: { key: "#s-cartCount"+ SUFF,                        type: "html" } },
                _productTotal:      { selector: { key: "#s-prdouctTotal"+ SUFF,                     type: "html" } },
                _deliveryTotal:     { selector: { key: "#s-deliveryTotal"+ SUFF,                    type: "html" } },
                _cartTotal:         { selector: { key: "#s-cartTotal"+ SUFF,                        type: "html" } },
                _orderTotal:        "",
                // bind
                cmd:                "",
                page_size:          0,
                crt_idx:            "",
                state_cd:           "P",
                arr_prt_opt_qty:    "",     // 상품코드 & 옵션 & 수량 | ... 문자열
                meb_idx:            "",
                client_id:          "",
                sto_id:             "S00001",
                deli_mn:            "",
                base_mn:            "",
                base_cd:            "",
            };
            // mapping 설정
            this.mapping = {
                cmd:                { Array:  ["bind"] },    // 전역설정
                page_size:          { list:   ["bind"] },
                crt_idx:            { list:   ["valid", "bind"],    order:  ["valid", "bind"],   delete: ["valid", "bind"] },
                state_cd:           { list:   ["bind"],             create: ["valid", "bind"] },
                arr_prt_opt_qty:    { create: ["valid", "bind"],    order:  ["valid", "bind"],   delete: ["valid", "bind"] },
                meb_idx:            { create: ["bind"] },
                client_id:          { create: ["bind"] },
                sto_id:             { read_deli: ["bind"] },
                deli_mn:            { read_deli: ["output"] },
                base_mn:            { read_deli: ["output"] },
                base_cd:            { read_deli: ["output"] },
            };
            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.list.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            p_this.order.onExecute  = function(p_bindCommand) { p_this.items["cmd"].value = "ORDER"; };
            p_this.delete.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "DELETE"; };
            p_this.read_deli.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            // cbValid
            p_this.delete.cbValid   = function(p_valid) {
                return confirm("선택된 상품을 장바구니에서 삭제 하시겠습니까.?");
            };
            // cbOutput
            var template = null;
            p_this.list.cbOutput   = function(p_entity) {
                var row_total   = p_entity["row_total"];
                
                if ( template === null) {
                    template    = Handlebars.compile( p_this.items["_temp_list"].value ); 
                    Handlebars.registerHelper('sum_prt', function () {
                        return numberWithCommas(this.discount_mn * this.qty_it);
                    });
                    Handlebars.registerHelper('comma_num', function (p_nmber) {
                        return numberWithCommas(p_nmber);
                    });
                    Handlebars.registerHelper('method_msg', function (p_method_cd) {
                        var msg = "";
                        var base_msg    = p_this.items["base_cd"].value === "U" ? "미만 무료" : "이상 무료";
                        var base_mn     = p_this.items["base_mn"].value;

                        if (p_method_cd === 'FREE') msg = "무료";
                        if (p_method_cd === 'EACH') msg = "개별배송비";
                        if (p_method_cd === 'BASE') {
                            msg = numberWithCommas(base_mn) + "원" +  base_msg;
                        }
                        return msg;
                    });
                }
                p_this.items["_cart_count"].value = row_total;
                p_this.items["_area_list"].value = template(p_entity);

                // 바인딩 이벤트 
                var _btn_delete     = p_this.items["_btn_delete"].selector.key;

                $(_btn_delete).click(function () {   // 선택 상품 삭제
                    p_this.items["arr_prt_opt_qty"].value = $(this).val();
                    p_this.delete.execute();
                });
            };
            // cbEnd
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
            };
            p_this.order.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("주문 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                location.href = p_this.prop["__orderURL"];
            };
            p_this.delete.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("삭제 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                p_this.list.execute();
            };
        }
        util.inherits(OrderCartService, _super);
    
        // 데코레이션 메소드
        OrderCartService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            // 셀렉터 얻기
            var _btn_allOrder   = p_this.items["_btn_allOrder"].selector.key;
            var _btn_chkOrder   = p_this.items["_btn_chkOrder"].selector.key;
            var _btn_chkDelete  = p_this.items["_btn_chkDelete"].selector.key;
            var _checkbox       = p_this.items["_checkbox"].selector.key;
            var _cart_count     = p_this.items["_cart_count"].selector.key;
            var _productTotal   = p_this.items["_productTotal"].selector.key;
            var _deliveryTotal  = p_this.items["_deliveryTotal"].selector.key;
            var _cartTotal      = p_this.items["_cartTotal"].selector.key;
            var _orderTotal     = p_this.items["_orderTotal"].selector.key;
            
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $(_btn_allOrder).click(function () {      // 전체 상품 주문
                var arr_prt_opt_qty = [];

                $(_checkbox).each(function() {
                        arr_prt_opt_qty.push(this.value);
                });
                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                p_this.order.execute();
            });
            $(_btn_chkOrder).click(function () {    // 선택 상품 주문
                var arr_prt_opt_qty = [];

                $(_checkbox).each(function() {
                    if(this.checked) arr_prt_opt_qty.push(this.value);
                });
                if (arr_prt_opt_qty.length === 0) return alert('선택된 상품이 없습니다.');

                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                p_this.order.execute();
            });
            $(_btn_chkDelete).click(function () {   // 선택 상품 삭제
                var arr_prt_opt_qty = [];

                $(_checkbox).each(function() {
                    if(this.checked) arr_prt_opt_qty.push(this.value);
                });
                if (arr_prt_opt_qty.length === 0) return alert('선택된 상품이 없습니다.');

                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                p_this.delete.execute();
            });
            //--------------------------------------------------------------
            // 6. 사용자 함수 등록
            // 체크된 상품 합계 가격 보기
            p_this._viewCheckTotal = function(p_entity) {   
                var table;
                var row_count = [];
                $(_checkbox).each(function() {
                    if(this.checked) row_count.push($(this).attr("row_count") - 1);
                    table = p_entity.select(null, row_count);  // 선택 복제
                });
                this._viewTotal(table);
            };
            // 상품 합계 가격 보기
            p_this._viewTotal = function(p_entity) {
                var total_deli_mn = 0, total_qty_mn = 0, total_prt_mn = 0, total_mn = 0;
                var isBase = false; // 상점기준 배송비 여부
                var deli_mn     = p_this.items["deli_mn"].value;
                var base_mn     = p_this.items["base_mn"].value;
                var base_cd     = p_this.items["base_cd"].value;

                for (var i = 0; typeof p_entity !== "undefined" && i < p_entity.rows.count ; i++) {
                    total_prt_mn += p_entity.rows[i].discount_mn * p_entity.rows[i].qty_it;
                    total_qty_mn += p_entity.rows[i].qty_it;
                    if (p_entity.rows[i].method_cd === "EACH") total_deli_mn += p_entity.rows[i].deli_mn;
                    if (p_entity.rows[i].method_cd === "BASE") isBase = true;
                }
                if (isBase && base_cd === "O" && total_prt_mn <= base_mn) total_deli_mn += deli_mn;   // 미만시 배송비 적용 (이상 무료)
                if (isBase && base_cd === "U" && total_prt_mn > base_mn) total_deli_mn += deli_mn;   // 이상시 배송비 적용 (미만 무료)

                total_mn = total_prt_mn + total_deli_mn;
                p_this.items["_cart_count"].value       = total_qty_mn;
                p_this.items["_deliveryTotal"].value    = numberWithCommas(total_deli_mn);
                p_this.items["_productTotal"].value     = numberWithCommas(total_prt_mn);
                p_this.items["_cartTotal"].value        = numberWithCommas(total_mn);
                p_this.items["_orderTotal"].value = total_mn;
            };
            console.log("----------------------------------");
        };
        OrderCartService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        OrderCartService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
            p_this.read_deli.execute();
        };

        return OrderCartService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.OrderCartService = OrderCartService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));