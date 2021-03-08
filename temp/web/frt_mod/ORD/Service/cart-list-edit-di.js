/**
 * @namespace _W.Meta.Bind.CartListEditDI
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
    var BaseDI;
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;
    var BindCommandEditAjax     =_W.Meta.Bind.BindCommandEditAjax;

    // var accountFrmURL;          // 수정화면 경로(참조)

    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BaseDI                  = global._W.Meta.Bind.BaseDI;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseDI === "undefined") throw new Error("[BaseDI] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var CartListEditDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function CartListEditDI() {
            _super.call(this);

            var _this = this;
            
            var __list_template = "#cart-list-template";
            var __list_body     = "#cart-list-body";
            var __orderURL      = "order.asp";
            var __prtCheckList  = "input[name=cartPrt]";

            //--------------------------------------------------------------    
            // 2. 객체 설정 (등록)
            this.list     = BindCommandLookupAjax;    // 장바구니 목록
            this.order    = BindCommandEditAjax;      // 선택 상품 주문준비
            this.delete   = BindCommandEditAjax;      // 선택 상품 삭제

            // p_this.list     = new BindCommandLookupAjax();    // 장바구니 목록
            // p_this.order    = new BindCommandEditAjax();      // 선택 상품 주문준비
            // p_this.delete   = new BindCommandEditAjax();      // 선택 상품 삭제

            // 셀렉터 검사 임의 지정
            this.prop["__checkSelectorList"] = { 
                selector: [
                    function() { return __list_template;},
                    function() { return __list_body;},
                    // function() { return __prtCheckList;},    // 처리 시점이 다름
                ]
            };
            // 공개 속성 설정
            this.prop["__list_template"] = { 
                get: function() { return __list_template;},
                set: function(val) { return __list_template = val;}
            };
            this.prop["__list_body"] = { 
                get: function() { return __list_body;},
                set: function(val) { return __list_body = val;}
            };
            this.prop["__orderURL"] = { 
                get: function() { return __orderURL;},
                set: function(val) { return __orderURL = val; }
            };
            // 모델 속성
            this.prop["page_size"]  = "0";
            this.prop["crt_idx"] = "";
            this.prop["state_cd"] = "P";            // 장바구니
            this.prop["arr_prt_opt_qty"] = "";      // 상품코드 & 옵션 & 수량 | ... 문자열

            this.mapping = {
                page_size: { list: "bind"},
                crt_idx: { 
                    list: ["valid", "bind"],
                    order: ["valid", "bind"],
                    delete: ["valid", "bind"],
                },
                state_cd: { list: "bind"},
                arr_prt_opt_qty: { 
                    order: ["valid", "bind"],
                    delete: ["valid", "bind"],
                },
            };
        }
        util.inherits(CartListEditDI, _super);
    
        // 데코레이션 메소드
        CartListEditDI.prototype.preRegister = function(p_this) {
            BaseDI.prototype.preRegister.call(this, p_this);

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.list.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            p_this.order.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "ORDER"; };
            p_this.delete.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "DELETE"; };

            // cbValid
            if (typeof p_this.delete !== "undefined" && p_this.delete.cbBind === null) {
                p_this.delete.cbValid   = function(p_valid) {
                    return confirm("선택된 상품을 장바구니에서 삭제 하시겠습니까.?");
                };
            }
            // cbBind  :: 검사 영역 (삭제가능)
            if (typeof p_this.list !== "undefined" && p_this.list.cbBind === null) {
                p_this.list.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : list ");
                };
            }
            if (typeof p_this.order !== "undefined" && p_this.order.cbBind === null) {
                p_this.order.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : order ");
                };
            }
            if (typeof p_this.delete !== "undefined" && p_this.delete.cbBind === null) {
                p_this.delete.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : delete ");
                };
            }
            // cbOutput
            if (typeof p_this.list !== "undefined" && p_this.list.cbOutput === null) {

                var template    = Handlebars.compile( $(p_this.prop["__list_template"]).html() ); 
    
                Handlebars.registerHelper('sum_prt', function () {
                    return numberWithCommas(this.discount_mn * this.qty_it);
                });
                Handlebars.registerHelper('comma_num', function (p_nmber) {
                    return numberWithCommas(p_nmber);
                });

                p_this.list.cbOutput   = function(p_entity) {

                    var row_total = 0, total_deli_mn = 0, total_qty_mn = 0, total_prt_mn = 0;
                    
                    row_total   = p_entity.table["row_total"];
                    $(p_this.prop["__list_body"]).html("");
                    $(p_this.prop["__list_body"]).append( template(p_entity.table) );
                    
                    for (var i = 0; i < p_entity.table.rows.length; i++) {
                        total_prt_mn += p_entity.table.rows[i].discount_mn * p_entity.table.rows[i].qty_it;
                        total_qty_mn += p_entity.table.rows[i].qty_it;
                    }
            
                    $("#totalGoodsCnt").html(total_qty_mn);
                    $("#totalDeliveryCharge").html(total_deli_mn);
                    $("#totalGoodsPrice").html(numberWithCommas(total_prt_mn));
                    $("#totalSettlePrice").html(numberWithCommas(total_prt_mn + total_deli_mn));
                };
            }
            // cbEnd
            if (typeof p_this.list !== "undefined" && p_this.list.cbEnd === null) {
                p_this.list.cbEnd  = function(p_res) {

                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result < 0) alert("조회 처리가 실패 하였습니다. Code : " + result);
                };
            }
            if (typeof p_this.order !== "undefined" && p_this.order.cbEnd === null) {
                p_this.order.cbEnd  = function(p_res) {

                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result >= 0) { 
                        location.href = p_this.prop["__orderURL"];
                    } else {
                        alert("주문 처리가 실패 하였습니다. Result Code : " + result);
                    }
                };
            }
            if (typeof p_this.delete !== "undefined" && p_this.delete.cbEnd === null) {
                p_this.delete.cbEnd  = function(p_res) {

                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result >= 0) { 
                        p_this.list.execute();
                    } else {
                        alert("삭제 처리가 실패 하였습니다. Result Code : " + result);
                    }
                };
            }
            // onExecuted
            p_this.list.onExecuted = function(p_cmd, p_result) {
                // !! 템플릿 파싱후 이벤트를 등록해야함
                $('input[name=cartPrt]:checkbox').click(function(e){
                    $(this).next('label').toggleClass('on');
                });
            };

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
                    if(this.checked){   //checked 처리된 항목의 값
                        arr_prt_opt_qty.push(this.value);
                    }
                });
                if (arr_prt_opt_qty.length === 0) {
                    alert('선택된 상품이 없습니다.');
                    return;
                }
                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                p_this.order.execute();
            });

            $("#btn_deleteCheck").click(function () {

                var arr_prt_opt_qty = [];

                $('input:checkbox[name=cartPrt]').each(function() {
                    if(this.checked){   //checked 처리된 항목의 값
                        arr_prt_opt_qty.push(this.value);
                    }
                });
                if (arr_prt_opt_qty.length === 0) {
                    alert('선택된 상품이 없습니다.');
                    return;
                }
                p_this.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                p_this.delete.execute();
            });

        };
        CartListEditDI.prototype.preCheck = function(p_this) {
            if (BaseDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        CartListEditDI.prototype.preReady = function(p_this) {
            BaseDI.prototype.preReady.call(this, p_this);
            p_this.list.execute();                                // 준비완료 후 실행(execute)
        };

        return CartListEditDI;
    
    }(BaseDI));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseDI;
    } else {
        global._W.Meta.Bind.CartListEditDI = CartListEditDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));