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
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;
    var BindCommandEditAjax     =_W.Meta.Bind.BindCommandEditAjax;

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
        function OrderCartService(p_this) {
            _super.call(this);

            // command 생성
            p_this.create   = new BindCommandEditAjax(p_this);      // 장바구니 등록
            p_this.list     = new BindCommandLookupAjax(p_this);    // 장바구니 목록
            p_this.order    = new BindCommandEditAjax(p_this);      // 선택 상품 주문준비
            p_this.delete   = new BindCommandEditAjax(p_this);      // 선택 상품 삭제
            
            // 모델 속성 설정
            p_this.baseUrl      = "/Front/frt_mod/ORD/Order_Cart.C.asp";
            
            // prop 속성 설정
            this.prop = {
                // inner
                __orderURL:         "",
                // view
                _cart_template:     { selector: { key: "#cart-list-template",       type: "html" } },
                _cart_body:         { selector: { key: "#cart-list-body",           type: "html" } },
                _cart_total:        { selector: { key: "#option-total",             type: "html" } },
                // bind
                cmd:                "",
                page_size:          "0",
                crt_idx:            "",
                state_cd:           "P",
                arr_prt_opt_qty:    "",     // 상품코드 & 옵션 & 수량 | ... 문자열
                meb_idx:            "",
                client_id:          "",
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
            };
            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.list.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            p_this.order.onExecute  = function(p_bindCommand) { p_this.items["cmd"].value = "ORDER"; };
            p_this.delete.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "DELETE"; };
            // cbValid
            p_this.delete.cbValid   = function(p_valid) {
                return confirm("선택된 상품을 장바구니에서 삭제 하시겠습니까.?");
            };
            // cbOutput
            var template = null;
            p_this.list.cbOutput   = function(p_entity) {
                var row_total   = p_entity["row_total"];
                
                if ( template === null) {
                    template    = Handlebars.compile( p_this.items["_cart_template"].value ); 
                    Handlebars.registerHelper('sum_prt', function () {
                        return numberWithCommas(this.discount_mn * this.qty_it);
                    });
                    Handlebars.registerHelper('comma_num', function (p_nmber) {
                        return numberWithCommas(p_nmber);
                    });
                }
                p_this.items["_cart_total"].value = row_total;
                p_this.items["_cart_body"].value = template(p_entity);
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
            // onExecuted
            p_this.list.onExecuted = function(p_cmd, p_result) {
                // !! 템플릿 파싱후 이벤트를 등록해야함
                $('input[name=cartPrt]:checkbox').click(function(e){
                    $(this).next('label').toggleClass('on');
                });
            };
        }
        util.inherits(OrderCartService, _super);
    
        // 데코레이션 메소드
        OrderCartService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $("#btn_orderAll").click(function () {
                var arr_prt_opt_qty = [];

                $('input:checkbox[name=cartPrt]').each(function() {
                        arr_prt_opt_qty.push(this.value);
                });
                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');;
                p_this.order.execute();
            });
            $("#btn_orderCheck").click(function () {
                var arr_prt_opt_qty = [];

                $('input:checkbox[name=cartPrt]').each(function() {
                    if(this.checked) arr_prt_opt_qty.push(this.value);
                });
                if (arr_prt_opt_qty.length === 0) return alert('선택된 상품이 없습니다.');

                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                p_this.order.execute();
            });
            $("#btn_deleteCheck").click(function () {
                var arr_prt_opt_qty = [];

                $('input:checkbox[name=cartPrt]').each(function() {
                    if(this.checked) arr_prt_opt_qty.push(this.value);
                });
                if (arr_prt_opt_qty.length === 0) return alert('선택된 상품이 없습니다.');

                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                p_this.delete.execute();
            });
        };
        OrderCartService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        // OrderCartService.prototype.preReady = function(p_this) {
        //     BaseService.prototype.preReady.call(this, p_this);
        // };

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