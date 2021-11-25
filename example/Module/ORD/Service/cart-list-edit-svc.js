/**
 * @namespace _W.Meta.Bind.CartListEditService
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
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;
    var BindCommandEditAjax     =_W.Meta.Bind.BindCommandEditAjax;

    // var accountFrmURL;          // 수정화면 경로(참조)

    
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
    var CartListEditService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function CartListEditService(p_this) {
            _super.call(this);

            var _this = this;
            
            // command 생성
            p_this.list     = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 장바구니 목록
            p_this.order    = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 선택 상품 주문준비
            p_this.delete   = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 선택 상품 삭제
            
            // 내부 속성 설정
            this.prop["__list_template"] = "#cart-list-template";;
            this.prop["__list_body"] ="#cart-list-body";
            this.prop["__orderURL"] = "order.asp";
            // 셀렉터 검사 임의 지정
            this.prop["__checkSelectorList"] = { 
                selector: [
                    function() { return p_this.prop["__list_template"] },
                    function() { return p_this.prop["__list_body"] },
                ]
            };
            // 모델 속성
            this.prop["page_size"]  = "0";
            this.prop["crt_idx"] = "";
            this.prop["state_cd"] = "P";            // 장바구니
            this.prop["arr_prt_opt_qty"] = "";      // 상품코드 & 옵션 & 수량 | ... 문자열
            // mapping
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
        util.inherits(CartListEditService, _super);
    
        // 데코레이션 메소드
        CartListEditService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);

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
                    var row_total = 0
                    
                    row_total   = p_entity.table["row_total"];
                    $(p_this.prop["__list_body"]).html("");
                    $(p_this.prop["__list_body"]).append( template(p_entity.table) );
                };
            }
            // cbEnd
            if (typeof p_this.list !== "undefined" && p_this.list.cbEnd === null) {
                p_this.list.cbEnd  = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result < 0) return alert("조회 처리가 실패 하였습니다. Code : " + result);
                };
            }
            if (typeof p_this.order !== "undefined" && p_this.order.cbEnd === null) {
                p_this.order.cbEnd  = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    
                    if (result < 0) return alert("주문 처리가 실패 하였습니다. Result Code : " + result);
                    
                    location.href = p_this.prop["__orderURL"];
                };
            }
            if (typeof p_this.delete !== "undefined" && p_this.delete.cbEnd === null) {
                p_this.delete.cbEnd  = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result < 0) return  alert("삭제 처리가 실패 하였습니다. Result Code : " + result);

                    p_this.list.execute();
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
        CartListEditService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        CartListEditService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
            p_this.list.execute();                                // 준비완료 후 실행(execute)
        };

        return CartListEditService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.CartListEditService = CartListEditService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));