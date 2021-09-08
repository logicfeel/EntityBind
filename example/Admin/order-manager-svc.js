(function(global) {

    'use strict';
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
    } else if (typeof module.exports === 'object'){     // node
        // util                = require('util');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현 
    
    Handlebars.registerHelper('comma_num', function (p_nmber) {
        return numberWithCommas(p_nmber);
    });

    var OrderManagerService  = (function (_super) {
        /**
         * 주문 :: 관리 서비스
         * @constructs _W.Service.Admin.OrderManagerService
         * @extends _W.Service.Admin.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function OrderManagerService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 동기화 함수
             * @type {Object}
             */
            this.sync = {
                read: $.Deferred(),
                pay: $.Deferred(),
                deli: $.Deferred(),
                prt: $.Deferred(),
                corp: $.Deferred(),
            };

            /**
             * 배송 데이터
             * @type {Object}
             */
            this.deliData = null;

            /**
             * 우편번호 팝업 
             * @type {Function}
             * @param {String} sel_zip 우편번호 셀렉터
             * @param {String} sel_addr1 주소 샐렉터
             * @param {String} sel_addr2 세부주소 셀렉터
             */
            this.cbPostcode = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Admin/adm_mod/ORD/Order.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                __listUrl:      '',
                __mode:         '',
                // view
                _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,                   type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list'+ _SUFF,                   type: 'html' } },
                _btn_RW_update: { selector: { key: '[name=s-btn_RW'+_SUFF+'][deli_idx]',    type: 'html' } },
                _btn_TW_update: { selector: { key: '[name=s-btn_TW'+_SUFF+'][deli_idx]',    type: 'html' } },
                _btn_TF_update: { selector: { key: '[name=s-btn_TF'+_SUFF+'][deli_idx]',    type: 'html' } },
                _btn_DK_update: { selector: { key: '[name=s-btn_DK'+_SUFF+'][deli_idx]',    type: 'html' } },
                _btn_DR_update: { selector: { key: '[name=s-btn_DR'+_SUFF+'][deli_idx]',    type: 'html' } },
                _btn_DS_update: { selector: { key: '[name=s-btn_DS'+_SUFF+'][deli_idx]',    type: 'html' } },
                _btn_DF_update: { selector: { key: '[name=s-btn_DF'+_SUFF+'][deli_idx]',    type: 'html' } },
                _btn_deli:      { selector: { key: '[name=s-btn_deli'+_SUFF+'][deli_idx]',  type: 'html' } },
                _btn_zip:       { selector: { key: '[name=s-btn_zip'+_SUFF+'][deli_idx]',   type: 'html' } },
                _btn_PF_update: { selector: { key: '#s-btn_PF'+_SUFF,                       type: 'html' } },
                _btn_RF_update: { selector: { key: '#s-btn_RF'+_SUFF,                       type: 'html' } },
                _btn_PC_update: { selector: { key: '#s-btn_PC'+_SUFF,                       type: 'html' } },
                _btn_update:    { selector: { key: '#s-btn_update'+_SUFF,                   type: 'html' } },
                _btn_pay:       { selector: { key: '#s-btn_pay'+_SUFF,                   type: 'html' } },

                // bind
                cmd:            '',
                ord_id:         { selector: { key: '#m-ord_id'+_SUFF,                       type: 'text' } },
                ord_state_cd:   '',
                ord_state:      { selector: { key: '#m-ord_state'+_SUFF,                    type: 'text' } },
                meb_id:         { selector: { key: '#m-meb_id'+_SUFF,                       type: 'text' } },
                orderName:      { selector: { key: '#m-orderName'+_SUFF,                    type: 'value' } },
                orderTel:       { selector: { key: '#m-orderTel'+_SUFF,                     type: 'value' } },
                email:          { selector: { key: '#m-email'+_SUFF,                        type: 'value' } },
                ord_memo:       { selector: { key: '#m-ord_memo'+_SUFF,                     type: 'value' } },
                order_mn:       {
                    selector: { key: '#m-order_mn'+_SUFF,                                   type: 'text' },
                    setFilter: function (val) { return numberWithCommas(val)  + ' 원'; },
                },
                pay_state_cd:   '',
                pay_mn:         {   // 단방향!
                    selector: { key: '#m-pay_mn'+_SUFF,                                     type: 'text' },
                    setFilter: function (val) { return numberWithCommas(val)  + ' 원'; },
                },
                pay_state:      { selector: { key: '#m-pay_state'+_SUFF,                    type: 'text' }, },
                usePoint_it:    {   // 단방향!
                    selector: { key: '#m-usePoint_it'+_SUFF,                                type: 'text' },
                    setFilter: function (val) { return numberWithCommas(val)  + ' 원'; },
                },
                pay_method:     { selector: { key: '#m-pay_method'+_SUFF,                   type: 'text' } },
                bak_info:       { selector: { key: '#m-bak_info'+_SUFF,                     type: 'text' } },
                depositor:      { selector: { key: '#m-depositor'+_SUFF,                    type: 'value' } },
                pay_memo:       { selector: { key: '#m-pay_memo'+_SUFF,                     type: 'value' } },
                deli_idx:       '',
                recipient:      {
                    selector: { key: '[name=m-recipient'+_SUFF+'][deli_idx]',               type: 'value' },
                    constraints: [ { regex: /./, msg: '받는사람(수령인) 입력해주세요.', code: 150, return: true} ],
                },
                tel:            {
                    selector: { key: '[name=m-tel'+_SUFF+'][deli_idx]',                     type: 'value' },
                    constraints: [ { regex: /./, msg: '받는사람 연락처를 입력해주세요.', code: 150, return: true} ],
                },
                zipcode:        {
                    selector: { key: '[name=m-zipcode'+_SUFF+'][deli_idx]',                 type: 'value' },
                    constraints: [ { regex: /./, msg: '우편번호를 입력해주세요.', code: 150, return: true} ],
                },
                addr1:          {
                    selector: { key: '[name=m-addr1'+_SUFF+'][deli_idx]',                   type: 'value' },
                    constraints: [ { regex: /./, msg: '주소를 입력해주세요.', code: 150, return: true} ],
                },
                addr2:          {
                    selector: { key: '[name=m-addr2'+_SUFF+'][deli_idx]',                   type: 'value' },
                    constraints: [ { regex: /./, msg: '세부 주소를 입력해주세요.', code: 150, return: true} ],
                },
                deli_memo:      {
                    selector: { key: '[name=m-deli_memo'+_SUFF+'][deli_idx]',               type: 'value' },

                },
                dco_idx:        {
                    selector: { key: '[name=m-dco_idx'+_SUFF+'][deli_idx]',                 type: 'value' },
                    constraints: [ { regex: /./, msg: '택배사를 선택해 주세요.', code: 150, return: true} ],
                },
                invoice:        {
                    selector: { key: '[name=m-invoice'+_SUFF+'][deli_idx]',                 type: 'value' },
                    constraints: [{ regex: /^[0-9]*$/, msg: '송장번호를 입력해주세요.', code: 150, return: true}],
                },
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                read:       {   // 주문정보 조회
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_res) {
                        var entity = p_res['table'] || p_res['entity'] || p_res['tables'] || p_res['entities'];
                        if (p_res['return'] < 0) {
                            _this.bindModel.sync.read.reject(new Error('주문정보 로딩이 실패하였습니다.'));
                        } else {
                            _this.bindModel.sync.read.resolve(entity);
                        }
                    },
                },
                read_pay:   {   // 결제정보 조회
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ_PAY'; },
                    cbEnd: function(p_res) {
                        var entity = p_res['table'] || p_res['entity'] || p_res['tables'] || p_res['entities'];
                        if (p_res['return'] < 0) {
                            _this.bindModel.sync.pay.reject(new Error('결제정보 로딩이 실패하였습니다.'));
                        } else {
                            _this.bindModel.sync.pay.resolve(entity);
                        }
                    },
                },
                list_prt:   {   // 상품 목록
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST_PRT'; },
                    cbEnd: function(p_res) {
                        var entity = p_res['table'] || p_res['entity'] || p_res['tables'] || p_res['entities'];
                        if (p_res['return'] < 0) {
                            _this.bindModel.sync.prt.reject(new Error('상품 로딩이 실패하였습니다.'));
                        } else {
                            _this.bindModel.sync.prt.resolve(entity);
                        }
                    },
                },
                list_deli:  {   // 배송지 목록
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST_DELI'; },
                    cbEnd: function(p_res) {
                        var entity = p_res['table'] || p_res['entity'] || p_res['tables'] || p_res['entities'];
                        if (p_res['return'] < 0) {
                            _this.bindModel.sync.deli.reject(new Error('배송정보 로딩이 실패하였습니다.'));
                        } else {
                            _this.bindModel.sync.deli.resolve(entity);
                        }
                    },
                },
                list_corp:  {   // 택배사 목록
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST_CORP'; },
                    cbEnd: function(p_res) {
                        var entity = p_res['table'] || p_res['entity'] || p_res['tables'] || p_res['entities'];
                        if (p_res['return'] < 0) {
                            _this.bindModel.sync.corp.reject(new Error('택배사 로딩이 실패하였습니다.'));
                        } else {
                            _this.bindModel.sync.corp.resolve(entity);
                        }
                    },
                },
                update:     {   // 주문정보 수정
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE'; },
                    cbValid: function(p_entity) { return confirm('주문정보를 수정 하시겠습니까 ?'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('주문번호 수정 처리가 실패 하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_pay: {   // 결제정보 수정
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_PAY'; },
                    cbValid: function(p_entity) { return confirm('결제정보를 수정 하시겠습니까 ?'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('결제정보 수정 처리가 실패 하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_deli:{   // 배송정보 수정
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_DELI'; },
                    cbValid: function(p_entity) { return confirm('배송정보를 수정하시겠습니까?'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('배송정보 수정 처리가 실패 하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_RW:  {   // 상태 변경 :: 취소(환불대기)
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_RW'; },
                    cbValid: function(p_entity) { return confirm('주문을 취소하고 환불대기 처리하시겠습니까? \n동일 주문에 대한 모든 배송지 상태가 변경됩니다.'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_TW:  {   // 상태 변경 :: 취소(반품대기)
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_TW'; },
                    cbValid: function(p_entity) { return confirm('주문을 취소하고 반품대기 처리하시겠습니까? \n동일 주문에 대한 모든 배송지 상태가 변경됩니다.'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_TF:  {   // 상태 변경 :: 반품완료
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_TF'; },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_DK:  {   // 상태 변경 :: 배송확인
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_DK'; },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_DR:  {   // 상태 변경 :: 배송준비
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_DR'; },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_DS:  {   // 상태 변경 :: 배송발송(송장입력)
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_DS'; },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_DF:  {   // 상태 변경 :: 배송완료
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_DF'; },
                    cbValid: function(p_entity) { return confirm('배송완료 처리하겠습니까.?'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_RF:  {   // 상태 변경 :: 환불완료
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_RF'; },
                    cbValid: function(p_entity) { return confirm('환불(무통장입금/PG취소) 처리 하시겠습니까 ?'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_PF:  {   // 상태 변경 :: 결제완료(승인)
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_PF'; },
                    cbValid: function(p_entity) { return confirm('결제완료(입금/승인) 처리 하시겠습니까 ?'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
                update_PC:  {   // 상태 변경 :: 주문취소
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE_PC'; },
                    cbValid: function(p_entity) { return confirm('주문을 취소 하시겠습니까 ?'); },
                    cbEnd: function(p_res) {
                        if (p_res['return'] < 0) return alert('상태변경이 실패하였습니다. Code : ' + entity['return']);
                        _this.bindModel.fn.loadExecute();
                    },
                },
            }

            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                _temp_list:     { Array:        'etc' },    // 묶음의 용도
                _area_list:     { Array:        'etc' },    // 묶음의 용도
                cmd:            { Array:        'bind' },
                ord_id:         { Array:        ['valid', 'bind'] },
                ord_state_cd:   { read:         'output' },
                ord_state:      { read:         'output' },
                meb_id:         { read:         'output' },
                orderName:      { read:         'output',   update:     ['valid', 'bind'] },
                orderTel:       { read:         'output',   update:     ['bind'] },
                email:          { read:         'output',   update:     ['bind'] },
                ord_memo:       { read:         'output',   update:     ['bind'] },
                order_mn:       { read:         'output' },
                pay_state_cd:   { read_pay:     'output' },
                pay_mn:         { read_pay:     'output' },
                pay_state:      { read_pay:     'output' },
                usePoint_it:    { read_pay:     'output' },
                pay_method:     { read_pay:     'output' },
                bak_info:       { read_pay:     'output' },
                depositor:      { read_pay:     'output',   update_pay: ['valid', 'bind'] },
                pay_memo:       { read_pay:     'output',   update_pay: ['bind'] },
                deli_idx:       { Array:        ['valid', 'bind'] },
                recipient:      { update_deli:  ['valid', 'bind'] },
                tel:            { update_deli:  ['valid', 'bind'] },
                zipcode:        { update_deli:  ['valid', 'bind'] },
                addr1:          { update_deli:  ['valid', 'bind'] },
                addr2:          { update_deli:  ['valid', 'bind'] },
                deli_memo:      { update_deli:  ['bind'] },
                dco_idx:        { update_deli:  ['bind'],   update_DS:  ['valid', 'bind'] },
                invoice:        { update_deli:  ['bind'],   update_DS:  ['valid', 'bind'] },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                // 로드 데이터
                loadExecute: function () { 
	                if (global.isLog) console.log('[Service] <fn> loadExecute()');
                    _this.bindModel.fn._initView(); // 초기화(동기화)

                    var READ = _this.bindModel.sync.read;
                    var PAY = _this.bindModel.sync.pay;
                    var DELI = _this.bindModel.sync.deli;
                    var PRT = _this.bindModel.sync.prt;
                    var CORP = _this.bindModel.sync.corp;

                    _this.bindModel.read.execute(); 
                    _this.bindModel.read_pay.execute(); 
                    _this.bindModel.list_prt.execute(); 
                    _this.bindModel.list_deli.execute(); 
                    _this.bindModel.list_corp.execute(); 
                    // 동기화
                    $.when(READ, PAY, DELI, PRT, CORP).done(function (rRead, rPay, rDeli, rPrt, rCorp) {
                        var deli_idx;   // PK
                        // 데이터 구성
                        for (var i = 0; i < rDeli.rows.length; i++) {
                            rDeli.rows[i].product = [];
                            deli_idx = rDeli.rows[i].deli_idx;
                            // 택배사 join
                            rDeli.rows[i].corp = rCorp.rows;
                            // 상품 join
                            for(var ii = 0; ii < rPrt.rows.length; ii++) {
                                if (deli_idx === rPrt.rows[ii].deli_idx) {
                                    rDeli.rows[i].product.push(rPrt.rows[ii]);
                                }
                            }
                        }
                        // ordData 설정
                        _this.bindModel.deliData = rDeli;
                        // 템플릿 파싱 설정
                        _this.bindModel.fn._viewTemplate(rDeli);

                    }).fail(function(error) {
                        alert(error);
                        console.log(error);
                    });
                },
                // 목록 이동
                moveList: function() {
                    var rtnURL = getParamsToJSON(location.href).rtnURL;
                    var url = _this.bindModel.prop['__listUrl'];
                    if (typeof rtnURL === 'undefined' || rtnURL.length === 0) rtnURL = url;
                    location.href = rtnURL;
                },
                // 배송지 보기
                _viewTemplate: function (p_entity) { 
                    if (_template === null) {
                        _template  = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                    }
                    _this.bindModel.items['_area_list'].value       = _template(p_entity);
                    _this.bindModel.fn._setButton();
                },
                // 버튼 설정
                _setButton: function () {

                    var deliData = _this.bindModel.deliData;
                    var deli_idx  = null;
                    var deli_state_cd = null;
                    var selector = '';
                    var ord_state_cd = _this.bindModel.items['ord_state_cd'].value;
                    var pay_state_cd = _this.bindModel.items['pay_state_cd'].value;

                    for (var i = 0; i <deliData.rows.length; i++) {

                        deli_idx        = deliData.rows[i].deli_idx;
                        deli_state_cd   = deliData.rows[i].state_cd;

                        // 배송대기, 배송확인, 배송준비 & 결제승인 >> 취소(환불대기) [버튼표시]                        
                        if (['DW', 'DK', 'DR'].indexOf(deli_state_cd) > -1 && pay_state_cd === 'PF') {
                            selector = '[name=s-btn_RW'+_SUFF+'][deli_idx='+deli_idx+']';
                            $(selector).css('display', '');
                            $(selector).click(function () {
                                _this.bindModel.items['deli_idx'].value = deli_idx;
                                _this.bindModel.update_RW.execute();                                                           
                            });
                        }
                        // 배송준비, 배송발송, 배송완료 & 주문완료 >> 취소(반품대기) [버튼표시]                        
                        if (['DR', 'DS', 'DF'].indexOf(deli_state_cd) > -1 && ord_state_cd == 'OF') {
                            selector = '[name=s-btn_TW'+_SUFF+'][deli_idx='+deli_idx+']';
                            $(selector).css('display', '');
                            $(selector).click(function () {
                                _this.bindModel.items['deli_idx'].value = deli_idx;
                                _this.bindModel.update_TW.execute();                                                           
                            });
                        }
                        // 반품대기 & 반품취소대기 >> 반품완료 [버튼표시]                        
                        if (['TW'].indexOf(deli_state_cd) > -1 && ord_state_cd == 'CT') {
                            selector = '[name=s-btn_TF'+_SUFF+'][deli_idx='+deli_idx+']';
                            $(selector).css('display', '');
                            $(selector).click(function () {
                                _this.bindModel.items['deli_idx'].value = deli_idx;
                                _this.bindModel.update_TF.execute();                                                           
                            });
                        }
                        // 배송대기 & 결제승인 & 주문완료 >> 배송확인 [버튼표시]                        
                        if (['DW'].indexOf(deli_state_cd) > -1  && pay_state_cd === 'PF' && ord_state_cd == 'OF') {
                            selector = '[name=s-btn_DK'+_SUFF+'][deli_idx='+deli_idx+']';
                            $(selector).css('display', '');
                            $(selector).click(function () {
                                _this.bindModel.items['deli_idx'].value = deli_idx;
                                _this.bindModel.update_DK.execute();                                                           
                            });
                        }
                        // 배송확인 & 결제승인 & 주문완료 >> 배송준비 [버튼표시]                        
                        if (['DK'].indexOf(deli_state_cd) > -1  && pay_state_cd === 'PF' && ord_state_cd == 'OF') {
                            selector = '[name=s-btn_DR'+_SUFF+'][deli_idx='+deli_idx+']';
                            $(selector).css('display', '');
                            $(selector).click(function () {
                                _this.bindModel.items['deli_idx'].value = deli_idx;
                                _this.bindModel.update_DR.execute();                                                           
                            });
                        }
                        // 배송확인 & 배송준비 & 결제승인 & 주문완료 >> 배송발송 [버튼표시]                        
                        if (['DK', 'DR'].indexOf(deli_state_cd) > -1  && pay_state_cd === 'PF' && ord_state_cd == 'OF') {
                            selector = '[name=s-btn_DS'+_SUFF+'][deli_idx='+deli_idx+']';
                            $(selector).css('display', '');
                            $(selector).click(function () {
                                _this.bindModel.items['deli_idx'].value = deli_idx;
                                _this.bindModel.items['dco_idx'].value = $('[name=m-dco_idx'+_SUFF+'][deli_idx='+deli_idx+']').val() || '';
                                _this.bindModel.items['invoice'].value = $('[name=m-invoice'+_SUFF+'][deli_idx='+deli_idx+']').val();
                                _this.bindModel.update_DS.execute();                                                           
                            });
                        }
                        // 배송발송 & 결제승인 & 주문완료 >> 배송완료 [버튼표시]                        
                        if (['DS'].indexOf(deli_state_cd) > -1 && pay_state_cd === 'PF' && ord_state_cd == 'OF') {
                            selector = '[name=s-btn_DF'+_SUFF+'][deli_idx='+deli_idx+']';
                            $(selector).css('display', '');
                            $(selector).click(function () {
                                _this.bindModel.items['deli_idx'].value = deli_idx;
                                _this.bindModel.update_DF.execute();                                                           
                            });
                        }
                        // 배송정보 수정
                        $('[name=s-btn_deli'+_SUFF+'][deli_idx='+deli_idx+']').click(function(e){
                            _this.bindModel.items['deli_idx'].value = deli_idx;
                            _this.bindModel.items['recipient'].value     = $('[name=m-recipient'+_SUFF+'][deli_idx='+deli_idx+']').val();
                            _this.bindModel.items['tel'].value           = $('[name=m-tel'+_SUFF+'][deli_idx='+deli_idx+']').val();
                            _this.bindModel.items['zipcode'].value       = $('[name=m-zipcode'+_SUFF+'][deli_idx='+deli_idx+']').val();
                            _this.bindModel.items['addr1'].value         = $('[name=m-addr1'+_SUFF+'][deli_idx='+deli_idx+']').val();
                            _this.bindModel.items['addr2'].value         = $('[name=m-addr2'+_SUFF+'][deli_idx='+deli_idx+']').val();
                            _this.bindModel.items['deli_memo'].value     = $('[name=m-deli_memo'+_SUFF+'][deli_idx='+deli_idx+']').val();
                            _this.bindModel.items['dco_idx'].value       = $('[name=m-dco_idx'+_SUFF+'][deli_idx='+deli_idx+']').val() || '';
                            _this.bindModel.items['invoice'].value       = $('[name=m-invoice'+_SUFF+'][deli_idx='+deli_idx+']').val();
                            _this.bindModel.update_deli.execute();                                                           
                        });
                        // 우편번호 검색
                        $('[name=s-btn_zip'+_SUFF+'][deli_idx='+deli_idx+']').click(function(e){
                            _this.bindModel.fn.postCode(deli_idx);
                        });
                        // 송장번호 입력 뷰
                        if (['DW'].indexOf(deli_state_cd) < 0) {
                            $('[name=s-area_invoice'+_SUFF+'][deli_idx='+deli_idx+']').css('display', '');
                        }
                    }

                    // 주문대기, 주문전 >> 주문취소 [버튼표시]
                    if (ord_state_cd === 'OW' || ord_state_cd === '') {
                        $('#s-btn_PC'+_SUFF).css('display', '');
                    }
                    // 결제대기 >> 결제완료 [버튼표시]
                    if (pay_state_cd === 'PW') {
                        $('#s-btn_PF'+_SUFF).css('display', '');
                    }
                    // 환불대기 >> 환불완료 [버튼표시]
                    if (pay_state_cd === 'RW') {
                        $('#s-btn_RF'+_SUFF).css('display', '');
                    }
                    // 주문취소가 아니면 >> 주문정보수정 [버튼표시]
                    if (ord_state_cd !== 'OC') {
                        $('#s-btn_update'+_SUFF).css('display', '');
                    }
                    // 주문취소가 아니면 >> 결제정보수정 [버튼표시]
                    if (ord_state_cd !== 'OC') {
                        $('#s-btn_pay'+_SUFF).css('display', '');
                    }
                },
                // 우편번호 콜백함수 호출
                postCode: function(p_deli_idx) {
                    var zip = '[name=m-zipcode'+_SUFF+'][deli_idx='+p_deli_idx+']';
                    var addr1 = '[name=m-addr1'+_SUFF+'][deli_idx='+p_deli_idx+']';
                    var addr2 = '[name=m-addr2'+_SUFF+'][deli_idx='+p_deli_idx+']';
                    _this.bindModel.cbPostcode(zip, addr1, addr2);
                },
                // 초기화 : 동기화, 기본 버튼
                _initView: function() {
                    // 동기화
                    _this.bindModel.sync = {
                        read: $.Deferred(),
                        pay: $.Deferred(),
                        deli: $.Deferred(),
                        prt: $.Deferred(),
                        corp: $.Deferred(),
                    };
                    // 일반 버튼
                    $('#s-btn_PC'+_SUFF).css('display', 'none');
                    $('#s-btn_PF'+_SUFF).css('display', 'none');
                    $('#s-btn_RF'+_SUFF).css('display', 'none');
                    $('#s-btn_update'+_SUFF).css('display', 'none');
                    $('#s-btn_pay'+_SUFF).css('display', 'none');
                },
            };
        }
        util.inherits(OrderManagerService, _super);

        /**
         * 전처리
         * @param {BindModelAjax} p_bindModel 소유 바인드 모델
         */
        OrderManagerService.prototype.preRegister = function(p_bindModel) {
            BaseService.prototype.preRegister.call(this, p_bindModel);
            if (global.isLog) console.log("[Service] preRegister() : 사전등록 ");

            var _btn_update = p_bindModel.items["_btn_update"].selector.key;
            var _btn_pay = p_bindModel.items["_btn_pay"].selector.key;
            var _btn_PF_update = p_bindModel.items["_btn_PF_update"].selector.key;
            var _btn_RF_update = p_bindModel.items["_btn_RF_update"].selector.key;
            var _btn_PC_update = p_bindModel.items["_btn_PC_update"].selector.key;
            
            // 버튼 등록
            $(_btn_update).click(function () {
                p_bindModel.update.execute();                                                           
            });
            $(_btn_pay).click(function () {
                p_bindModel.update_pay.execute();                                                           
            });
            $(_btn_PF_update).click(function () {
                p_bindModel.update_PF.execute();                                                           
            });
            $(_btn_RF_update).click(function () {
                p_bindModel.update_RF.execute();                                                           
            });
            $(_btn_PC_update).click(function () {
                p_bindModel.update_PC.execute();                                                           
            });
        };

        return OrderManagerService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.OrderManagerService = OrderManagerService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));