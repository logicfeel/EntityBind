/**
 * namespace _W.Meta.Bind.OrderRegisterService
 */
 (function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    var util;
    // var BindCommandAjax;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
        // BindCommandAjax     = global._W.Meta.Bind.BindCommandAjax;
    } else if (typeof module.exports === 'object'){     // node
        // util                = require('util');
        // BindCommandAjax     = require('./bind-command-ajax');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    // if (typeof BindCommandAjax === 'undefined') throw new Error('[BindCommandAjax] module load fail...');
    // if (typeof PageView === 'undefined') throw new Error('[PageView] module load fail...');     // 전역에 선언됨
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var OrderRegisterService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function OrderRegisterService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/ORD/Order_Register.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */  
             this.prop = {
                // view
                // bind
                cmd:            '',
                crt_idx:        { 
                    selector:       { key: '#m-crt_idx'+ _SUFF,                 type: 'value' } 
                },
                order_mn:       { 
                    selector:       { key: '#m-order_mn'+ _SUFF,                type: 'value' },
                    constraints:    { regex: /\D/, msg: '결제금액은 숫자만 입력해야함', code: 150, return: false},
                },
                orderName:      { 
                    selector:       { key: '#m-orderName'+ _SUFF,               type: 'value' },
                    constraints:    { regex: /./, msg: '주문자명을 입력해주세요.', code: 150, return: true}, 
                },
                orderTel:       { 
                    selector:       { key: '#m-orderTel'+ _SUFF,                type: 'value' },
                    constraints:    { regex: /^\d{3}-?\d{3,4}-?\d{4}$/, msg: '휴대폰 번호를 정확히 입력해주세요.', code: 150, return: true}, 
                },
                email:          { 
                    selector:       { key: '#m-email'+ _SUFF,                   type: 'value' },
                    constraints:    { 
                        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 
                        msg: '이메일 형식을 맞지 않습니다.', code: 150, return: true 
                    },
                    isNullPass:     true,
                },
                recipient:      { 
                    selector:       { key: '#m-recipient'+ _SUFF,               type: 'value' },
                    constraints:    { regex: /./, msg: '받으시는분 입력해주세요.', code: 150, return: true },
                },
                zipcode:        { 
                    selector:       { key: '#m-zipcode'+ _SUFF,                 type: 'value' },
                    constraints:    { regex: /./, msg: '우편번호를 입력해주세요.', code: 150, return: true },
                },
                addr1:          { 
                    selector:       { key: '#m-addr1'+ _SUFF,                   type: 'value' },
                    constraints:    { regex: /./, msg: '주소를 입력해주세요.', code: 150, return: true }, 
                },
                addr2:          { 
                    selector:       { key: '#m-addr2'+ _SUFF,                   type: 'value' },
                    constraints:    { regex: /./, msg: '주소를 입력해주세요.', code: 150, return: true },
                },
                tel:            { 
                    selector:       { key: '#m-tel'+ _SUFF,                     type: 'value' },
                    constraints:    { regex: /^\d{3}-?\d{3,4}-?\d{4}$/, msg: '받으시는분 연락처 정확히 입력해주세요.', code: 150, return: true },
                },
                memo:           { 
                    selector:       { key: '#m-memo'+ _SUFF,                    type: 'value' } 
                },
                choice_cd:      { 
                    selector:       { key: '#m-choice_cd'+ _SUFF,               type: 'value' } 
                },
                pay_method_cd:  { 
                    selector:       { key: 'input[name=m-method_cd'+_SUFF+']',  type: 'value' },
                    setFilter: function(val) { 
                        $('input[name=m-method_cd'+_SUFF+'][value='+ val + ']').prop('checked', true);
                    },
                    getFilter: function (val) {
                        return $('input[name=m-method_cd'+_SUFF+']:checked').val();
                    },
                    constraints:    { regex: /[PB]/, msg: '결제 수단을 선택해 주세요.', code: 150, return: true },
                },
                usePoint_it:    0,
                pay_mn:         { 
                    selector:       { key: '#m-pay_mn'+ _SUFF,                  type: 'value' } 
                },
                ord_id:         '',
                pg_yn:          '',
                bak_idx:        { 
                    selector:       { key: '#m-bak_idx'+ _SUFF,       type: 'value' },
                    constraints:    { regex: /\d+/, msg: '입금은행을 선택해 주세요.', code: 150, return: true},
                },
                depositor:      { 
                    selector:       { key: '#m-depositor'+ _SUFF,       type: 'value' },
                    constraints:    { regex: /./, msg: '입금자명을 입력해 주세요.', code: 150, return: true},
                },
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
             this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items['cmd'].value = 'CREATE'; 
                        if (_this.bindModel.items["pay_method_cd"].value === "B") {
                            // 아이템 설정
                            _this.bindModel.create.setItem(["bak_idx", "depositor"], ["valid", "bind"]);
                        } else {
                            // 아이템 해제
                            _this.bindModel.create.release(["bak_idx", "depositor"]);
                        }
                    },
                    cbEnd: function(p_result) {
                        var entity = p_result['table'];
                        var ord_id = entity['ord_id'];
                        var pay_method_cd = order.items['pay_method_cd'].value;

                        if (p_result['return'] < 0) return alert(' 임시주문 처리가 실패 하였습니다. Result Code : ' + p_result['return']);
                        if (typeof ord_id === 'undefined' || ord_id === '' || ord_id === null) return alert('주문번호 생성오류가 발생하였습니다. 관리자에게 문의 하세요.');
                        // 결제방식에 따라 분기
                        if (pay_method_cd === 'B' ) {
                            order.items['pg_yn'].value = 'N';
                            order.items['ord_id'].value = ord_id;
                            order.finish.execute();
                        } else if (pay_method_cd === 'P') {
                            order.items['pg_yn'].value = 'Y';
                        } else {
                            return alert('주문정보 임시저장후 결제방식 지정에 오류가 발생하였습니다. \n관리자에게 문의 하세요.');
                        }
                    },
                },
                finish:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'FINISH'; },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('주문완료 처리가 실패 하였습니다. Code : ' + p_result['return']);
                        // _this.bindModel.fn.moveList();  // 개선함
                    },
                },
            };

            /**
             * 속성의 매핑
             * @type {Object}
             */
             this.mapping = {
                cmd:            { Array: ['bind'] },    // 전역설정
                crt_idx:        { create: ['valid', 'bind'] },
                order_mn:       { create: ['valid', 'bind'] },
                orderName:      { create: ['valid', 'bind'] },
                orderTel:       { create: ['valid', 'bind'] },
                email:          { create: ['valid', 'bind'] },
                recipient:      { create: ['valid', 'bind'] },
                zipcode:        { create: ['valid', 'bind'] },
                addr1:          { create: ['valid', 'bind'] },
                addr2:          { create: ['valid', 'bind'] },
                tel:            { create: ['valid', 'bind'] },
                memo:           { create: ['bind'] },
                choice_cd:      { create: ['valid', 'bind'] },
                pay_mn:         { create: ['valid', 'bind'] },
                pay_method_cd:  { create: ['valid', 'bind'] },
                usePoint_it:    { create: ['valid', 'bind'] },
                ord_id:         { finish: ['valid', 'bind'] },
                pg_yn:          { finish: ['bind'] }
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
             this.fn = {
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procFinish: function () { 
                    _this.bindModel.finish.execute(); 
                },
            };

        }
        util.inherits(OrderRegisterService, _super);
    
        return OrderRegisterService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.OrderRegisterService = OrderRegisterService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));