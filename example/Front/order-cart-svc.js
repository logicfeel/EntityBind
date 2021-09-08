/**
 * namespace _W.Meta.Bind.OrderCartService
 */
 (function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    var util;
    var BindCommandAjax;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
        BindCommandAjax     = global._W.Meta.Bind.BindCommandAjax;
    } else if (typeof module.exports === 'object'){     // node
        // util                = require('util');
        // BindCommandAjax     = require('./bind-command-ajax');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    if (typeof BindCommandAjax === 'undefined') throw new Error('[BindCommandAjax] module load fail...');
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var OrderCartService  = (function (_super) {
        /**
         * 주문 :: 장바구니 서비스
         * @constructs _W.Service.Front.OrderCartService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function OrderCartService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 장바구니 정보
             * @type {Object}
             */
            this.cartInfo = {};
            
            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/ORD/Order_Cart.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */
             this.prop = {
                // inner
                __orderURL:         "",
                // view
                _temp_list:         { selector: { key: "#s-temp-list"+ _SUFF,                        type: "html" } },
                _area_list:         { selector: { key: "#s-area-list"+ _SUFF,                        type: "html" } },
                _checkbox:          { selector: { key: "input:checkbox[name=s-cartPrt"+ _SUFF +"][row_count]",  type: "value" } },
                _cart_count:        { selector: { key: "#s-cartCount"+ _SUFF,                        type: "html" } },
                _productTotal:      { 
                    selector: { key: "#s-prdouctTotal"+ _SUFF,                     type: "html" },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },
                },
                _deliveryTotal:     { 
                    selector: { key: "#s-deliveryTotal"+ _SUFF,                    type: "html" }, 
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },
                },
                _cartTotal:         { 
                    selector: { key: "#s-cartTotal"+ _SUFF,                        type: "html" },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null }, 
                },
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

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
             this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        // _this.bindModel.fn.moveList();  // 개선함
                    },
                },
                read_baseDeli:       {
                    outputOption: 3,
                    url: '/Front/frt_mod/PRT/Product_BaseDelivery.C.asp',
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    }
                },
                order:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'ORDER'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        location.href = _this.bindModel.prop["__orderURL"];
                    }
                },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    cbValid: function(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                        _this.bindModel.fn.procList();
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log('[Service] list.cbOutput() : 목록출력');

                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            // 헬퍼 등록 : _this 사용, 특수한 경우!!
                            Handlebars.registerHelper('sum_prt', function () {
                                return numberWithCommas(this.discount_mn * this.qty_it);
                            });
                            Handlebars.registerHelper('comma_num', function (p_nmber) {
                                return numberWithCommas(p_nmber);
                            });
                            Handlebars.registerHelper('method_msg', function (p_method_cd) {
                                var msg = "";
                                var base_msg    = _this.bindModel.items["base_cd"].value === "U" ? "미만 무료" : "이상 무료";
                                var base_mn     = _this.bindModel.items["base_mn"].value;
                                if (p_method_cd === 'FREE') msg = "무료";
                                if (p_method_cd === 'EACH') msg = "개별배송비";
                                if (p_method_cd === 'BASE') {
                                    msg = numberWithCommas(base_mn) + "원" +  base_msg;
                                }
                                return msg;
                            });
                            _template  = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_cart_count'].value      = row_total;
                        _this.bindModel.items['_area_list'].value       = _template(entity);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
            };

            /**
             * 속성의 매핑
             * @type {Object}
             */
             this.mapping = {
                cmd:                { Array:  ["bind"] },    // 전역설정
                page_size:          { list:   ["bind"] },
                crt_idx:            { list:   ["valid", "bind"],    order:  ["valid", "bind"],   delete: ["valid", "bind"] },
                state_cd:           { list:   ["bind"],             create: ["valid", "bind"] },
                arr_prt_opt_qty:    { create: ["valid", "bind"],    order:  ["valid", "bind"],   delete: ["valid", "bind"] },
                meb_idx:            { create: ["bind"] },
                client_id:          { create: ["bind"] },
                sto_id:             { read_baseDeli: ["bind"] },
                deli_mn:            { read_baseDeli: ["output"] },
                base_mn:            { read_baseDeli: ["output"] },
                base_cd:            { read_baseDeli: ["output"] },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
             this.fn = {
                procCart: function () { 
                    _this.bindModel.fn.procCreate('P'); 
                },
                procOrder: function () { 
                    _this.bindModel.fn.procCreate('R'); 
                },
                procCreate: function (p_state_cd) { 
                    var state_cd = p_state_cd ? p_state_cd : "P";
                    var arr_prt_opt_qty = [];        // 1&1&1|1&2&10'
                    var cartInfo = _this.bindModel.cartInfo;

                    for(var prop in cartInfo) {
                        if (cartInfo.hasOwnProperty(prop)) {
                            arr_prt_opt_qty.push(cartInfo[prop].prt_id  + "&" + cartInfo[prop].opt_idx + "&" + cartInfo[prop].qty_it);
                        }
                    }
                    if (arr_prt_opt_qty.length === 0) {
                        return alert('선택한 상품이 없습니다.');
                    }
                    _this.bindModel.items["state_cd"].value = state_cd;
                    _this.bindModel.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                    _this.bindModel.create.execute();
                },
                procAllOrder: function () {    // 전체 상품 주문
                    var _checkbox       = _this.bindModel.items["_checkbox"].selector.key;
                    var arr_prt_opt_qty = [];
                    $(_checkbox).each(function() {
                            arr_prt_opt_qty.push(this.value);
                    });
                    _this.bindModel.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                    _this.bindModel.order.execute();
                },
                procChkOrder: function () {    // 전체 상품 주문
                    var _checkbox       = _this.bindModel.items["_checkbox"].selector.key;
                    var arr_prt_opt_qty = [];
                    $(_checkbox).each(function() {
                        if(this.checked) arr_prt_opt_qty.push(this.value);
                    });
                    if (arr_prt_opt_qty.length === 0) return alert('선택된 상품이 없습니다.');
    
                    _this.bindModel.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
                    _this.bindModel.items["arr_prt_opt_qty"].value
                    _this.bindModel.order.execute();
                },
                procChkDelete: function () {    // 전체 상품 주문
                    var _checkbox       = _this.bindModel.items["_checkbox"].selector.key;
                    var arr_prt_opt_qty = [];
                    $(_checkbox).each(function() {
                        if(this.checked) arr_prt_opt_qty.push(this.value);
                    });
                    if (arr_prt_opt_qty.length === 0) return alert('선택된 상품이 없습니다.');

                    _this.bindModel.items["state_cd"].value = 'R';
                    _this.bindModel.delete.execute();
                },
                procDelete: function () { 
                    _this.bindModel.delete.execute(); 
                },
                procList: function() { 
                    _this.bindModel.list.execute(); 
                },
                viewCheckSum: function(p_entity) {   
                    var _checkbox       = _this.bindModel.items["_checkbox"].selector.key;
                    var table;
                    var row_count = [];
                    $(_checkbox).each(function() {
                        if(this.checked) row_count.push($(this).attr("row_count") - 1);
                        table = p_entity.select(null, row_count);  // 선택 복제
                    });
                    _this.bindModel.fn.viewSum(table);
                },
                viewSum: function(p_entity) {
                    var total_deli_mn = 0, total_qty_mn = 0, total_prt_mn = 0, total_mn = 0;
                    var isBase = false; // 상점기준 배송비 여부
                    var deli_mn     = _this.bindModel.items["deli_mn"].value;
                    var base_mn     = _this.bindModel.items["base_mn"].value;
                    var base_cd     = _this.bindModel.items["base_cd"].value;
    
                    for (var i = 0; typeof p_entity !== "undefined" && i < p_entity.rows.count ; i++) {
                        total_prt_mn += p_entity.rows[i].discount_mn * p_entity.rows[i].qty_it;
                        total_qty_mn += p_entity.rows[i].qty_it;
                        if (p_entity.rows[i].method_cd === "EACH") total_deli_mn += p_entity.rows[i].deli_mn;
                        if (p_entity.rows[i].method_cd === "BASE") isBase = true;
                    }
                    if (isBase && base_cd === "O" && total_prt_mn <= base_mn) total_deli_mn += deli_mn;   // 미만시 배송비 적용 (이상 무료)
                    if (isBase && base_cd === "U" && total_prt_mn > base_mn) total_deli_mn += deli_mn;   // 이상시 배송비 적용 (미만 무료)
    
                    total_mn = total_prt_mn + total_deli_mn;
                    _this.bindModel.items["_cart_count"].value       = total_qty_mn;
                    _this.bindModel.items["_deliveryTotal"].value    = total_deli_mn;
                    _this.bindModel.items["_productTotal"].value     = total_prt_mn;
                    _this.bindModel.items["_cartTotal"].value        = total_mn;
                    _this.bindModel.items["_orderTotal"].value = total_mn;
                },
            };
        }
        util.inherits(OrderCartService, _super);

        OrderCartService.prototype.preReady = function(p_bindModel) {
            BaseService.prototype.preReady.call(this, p_bindModel);
            p_bindModel.read_baseDeli.execute();    // 기본배송비
        };

        return OrderCartService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.OrderCartService = OrderCartService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));