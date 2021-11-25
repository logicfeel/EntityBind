(function(global) {

    'use strict';
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
    // if (typeof PageView === 'undefined') throw new Error('[PageView] module load fail...');     // 전역에 선언됨
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    

    // 핼퍼 등록
    Handlebars.registerHelper('comma_num', function (p_nmber) {
        return typeof p_nmber === 'number' ? numberWithCommas(p_nmber) : 0;
    });

    var ProductDetailService  = (function (_super) {
        /**
         * 상품 :: 상품상세 서비스
         * @constructs _W.Service.Front.ProductDetailService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function ProductDetailService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;
            var _templateView = null;
            var _templatePhoto = null;
            
            // 사용자 속성
            this.optionInfo   = {};   // 전체 옵션
            this.cartInfo     = {};   // 선택 옵션

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/PRT/Product.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
             this.prop = {
                // view
                _temp_option:       { selector: { key: '#s-temp-option'+ _SUFF,          type: 'html' } },
                _area_option:       { selector: { key: '#s-area-option'+ _SUFF,          type: 'html' } },
                _temp_option_view:  { selector: { key: '#s-temp-option-view'+ _SUFF,     type: 'html' } },
                _area_option_view:  { selector: { key: '#s-area-option-vlew'+ _SUFF,     type: 'html' } },
                _temp_photo:        { selector: { key: '#s-temp-photo'+ _SUFF,           type: 'html' } },
                _area_photo:        { selector: { key: '#s-area-photo'+ _SUFF,           type: 'html' } },
                _sellTotal:         { 
                    selector: { key: '#s-txt-sellTotal'+ _SUFF,        type: 'html' },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },   // __value 내부값 사용
                    default: 0,
                },
                _decountTotal:      { 
                    selector: { key: '#s-txt-decountTotal'+ _SUFF,     type: 'html' },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },   // __value 내부값 사용
                    default: 0,
                },
                _productTotal:      { 
                    selector: { key: '#s-txt-productTotal'+ _SUFF,     type: 'html' },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },   // __value 내부값 사용
                    default: 0, 
                },
                _option:            { selector: { key: '[name=s-option'+_SUFF+'][row_count]',       type: 'value' } },
                _productSum:        { selector: { key: '[name=s-productSum'+_SUFF+'][row_count]',   type: 'value' } },
                _qty:               { selector: { key: '[name=s-qty'+_SUFF+'][row_count]',          type: 'value' } },
                _txt_deli_msg:      { selector: { key: '#s-txt_deli_msg'+ _SUFF,         type: 'text' } },
                // bind
                cmd:                '',
                prt_id:             '',
                prtName:            { selector: { key: '#m-prtName'+ _SUFF,              type: 'html' } },
                sell_mn:            {
                    selector: { key: '#s-txt-sell'+ _SUFF,             type: 'text' },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },   // __value 내부값 사용
                    default: 0,
                },
                discount_mn:        {
                    selector: { key: '#s-txt-discount'+ _SUFF,             type: 'text' },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },   // __value 내부값 사용
                    default: 0,
                },
                point_it:           {
                    selector: { key: '#s-txt-point_it'+ _SUFF,             type: 'text' },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },   // __value 내부값 사용
                    default: 0,
                },
                deli_mn:            {
                    selector: { key: '#s-txt-deli_mn'+ _SUFF,             type: 'text' },
                    setFilter: function(val) { return numberWithCommas(val); },
                    getFilter: function(val) { return null },   // __value 내부값 사용
                    default: 0,
                },
                method_cd:          '',
                base_mn:            '',
                base_cd:            '',
                optName:            { selector: { key: '#m-optName'+ _SUFF,             type: 'text' } },
                contents:           { selector: { key: '#m-contents'+ _SUFF,            type: 'html' } },
                fileName:           { selector: { key: '#m-fileName'+ _SUFF,            type: 'attr.src' } },
                state_cd:            '',
                state_info:         { selector: { key: '#s-state_info'+ _SUFF,          type: 'text' } },
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        
                        _this.bindModel.items['_txt_deli_msg'].value =  _this.bindModel.fn._methodCode( _this.bindModel.items['method_cd'].value);
                    }
                },
                list_option:       {
                    outputOption: 1,
                    url: '/Front/frt_mod/PRT/Product_Option.C.asp',
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log('[Service] list_option.cbOutput() : 목록출력');
                        
                        var entity = p_result['table'];
                        var row_total = entity['row_total'];
                        var row;
                        
                        if (_template === null) {
                            _template = Handlebars.compile( _this.bindModel.items['_temp_option'].value ); 
                        }
                        _this.bindModel.items['_area_option'].value       = _template(entity);
                        // 엔티티 구성
                        for (var i = 0; i < entity.rows.length; i++) {
                            row = entity.rows[i];
                            _this.bindModel.optionInfo[row['row_count']] = { 
                                row_count: row['row_count'],
                                prt_id: row['prt_id'],
                                opt_idx: row['opt_idx'],
                                optName: row['optName'],
                                sell_mn: row['sell_mn'],
                                discount_mn: row['discount_mn'],
                                point_it: row['point_it'],
                                qty_it: 1 
                            };    
                        }
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
                list_photo:       {
                    outputOption: 1,
                    url: '/Front/frt_mod/PRT/Product_Image.C.asp',
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log('[Service] list_photo.cbOutput() : 목록출력');
                        
                        var entity = p_result['table'];
                        var row_total   = entity['row_total'];
                        
                        if (_templatePhoto === null) {
                            _templatePhoto = Handlebars.compile( _this.bindModel.items['_temp_photo'].value ); 
                        }
                        _this.bindModel.items['_area_photo'].value = _templatePhoto(entity);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
            }

            /**
             * 속성의 매핑
             * @type {Object}
             */
             this.mapping = {
                cmd:                { Array: ['bind'] },    // 전역설정
                prt_id:             { read:  ['bind'],      list_option: 'bind',        list_photo: 'bind' },
                prtName:            { read:  ['output'] },
                sell_mn:            { read:  ['output'] },
                discount_mn:        { read:  ['output'] },
                point_it:           { read:  ['output'] },
                method_cd:          { read:  ['output'] },
                deli_mn:            { read:  ['output'] },
                base_mn:            { read:  ['output'] },
                base_cd:            { read:  ['output'] },
                optName:            { read:  ['output'] },
                contents:           { read:  ['output'] },
                fileName:           { read:  ['output'] },
                state_cd:           { read:  ['output'] },
                state_info:         { read:  ['output'] },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                searchList: function() {
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                changePagesize: function(e) {
                    _this.bindModel.items['page_size'].value = this.value;
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                resetForm: function () { 
                    $('form').each(function() {
                        this.reset();
                    });
                },
                moveList: function() {
                    var url = _this.bindModel.prop['__listUrl'];
                    location.href = url;
                },
                moveView: function(p_prt_id) {
                    var url = _this.bindModel.prop['__viewUrl'];
                    location.href = url + '?prt_id=' + p_prt_id;
                },
                procRead: function (p_prt_id) { 
                    _this.bindModel.items['prt_id'].value = getParamsToJSON(location.href).prt_id;
                    _this.bindModel.read.execute(); 
                },
                procOptionList: function () { 
                    _this.bindModel.list_option.execute(); 
                },
                procPhotoList: function () { 
                    _this.bindModel.list_photo.execute(); 
                },
                addOption: function(p_row_count) {
                    var row_count = typeof p_row_count === 'object' ? this.value : p_row_count;
                    var _area_option_view = _this.bindModel.items['_area_option_view'].selector.key;
                    var _area_option = _this.bindModel.items["_area_option"].selector.key;

                    if ( _templateView === null) {
                        _templateView = Handlebars.compile( _this.bindModel.items['_temp_option_view'].value );
                    }
                    // 처음 등록시 TODO:: 방식 개선, 롤링의 동적 셀렉트 참조
                    if (typeof _this.bindModel.cartInfo[row_count] === 'undefined') {
                        _this.bindModel.cartInfo[row_count] = _this.bindModel.optionInfo[row_count];
                        $(_area_option_view).append(_templateView(_this.bindModel.optionInfo[row_count]));
                        $(_area_option).val('').attr('selected', 'selected');
                        _this.bindModel.fn._sumTotal();
                    }
                },
                _sumTotal: function() {
                    var qty_it = 1;
                    var sell_mn = 0;
                    var discount_mn = 0;
                    var prt_mn = 0;
            
                    for(var prop in _this.bindModel.cartInfo) {
                        if (_this.bindModel.cartInfo.hasOwnProperty(prop)) {
                            qty_it = _this.bindModel.cartInfo[prop].qty_it;
                            sell_mn = sell_mn + _this.bindModel.cartInfo[prop].sell_mn * qty_it;
                            discount_mn = discount_mn + _this.bindModel.cartInfo[prop].discount_mn  * qty_it;
                        }
                    }
                    prt_mn = prt_mn + discount_mn;
                    _this.bindModel.items['_sellTotal'].value = sell_mn;
                    _this.bindModel.items['_decountTotal'].value = sell_mn - discount_mn;
                    _this.bindModel.items['_productTotal'].value = prt_mn;
                },
                removeOption: function(p_row_count) {
                    $('[name=s-option'+_SUFF+'][row_count='+ p_row_count +']').remove(); 
                    delete _this.bindModel.cartInfo[p_row_count];
                    _this.bindModel.fn._sumTotal();
                },
                editQty: function(p_row_count, p_value) {
                    cartInfo[p_row_count].qty_it = p_value;
                    _this.bindModel.fn._sumTotal();
                },
                plusQty: function(p_row_count) {
                    var qty = $('[name=s-qty'+_SUFF+'][row_count='+ p_row_count +']').val();
                    var discount_mn = _this.bindModel.cartInfo[p_row_count].discount_mn;
                    qty++;
                    $('[name=s-qty'+_SUFF+'][row_count='+ p_row_count +']').val(qty)
                    $('[name=s-productSum'+_SUFF+'][row_count='+ p_row_count +']').text(numberWithCommas(discount_mn * qty));
                    _this.bindModel.cartInfo[p_row_count].qty_it = qty;
                    _this.bindModel.fn._sumTotal();
                },
                minusQty: function(p_row_count) {
                    var qty = $('[name=s-qty'+_SUFF+'][row_count='+ p_row_count +']').val();
                    var discount_mn = _this.bindModel.cartInfo[p_row_count].discount_mn;
                    qty--;
                    if (qty > 0 )  {
                        $('[name=s-qty'+_SUFF+'][row_count='+ p_row_count +']').val(qty)
                        $('[name=s-productSum'+_SUFF+'][row_count='+ p_row_count +']').text(numberWithCommas(discount_mn * qty));
                        _this.bindModel.cartInfo[p_row_count].qty_it = qty;
                        _this.bindModel.fn._sumTotal();
                    }
                },
                _methodCode: function (p_method_cd) {     // 배송코드 변환
                    var msg = '';
                    var base_msg    =  _this.bindModel.items['base_cd'].value === 'U' ? '미만 무료' : '이상 무료';
                    var base_mn     =  _this.bindModel.items['base_mn'].value;
                    if (p_method_cd === 'FREE') msg = '무료';
                    if (p_method_cd === 'EACH') msg = '개별배송비';
                    if (p_method_cd === 'BASE') {
                        msg = numberWithCommas(base_mn) + '원' +  base_msg;
                    }
                    return msg;
                },
            };
        }
        util.inherits(ProductDetailService, _super);
    
        return ProductDetailService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.ProductDetailService = ProductDetailService;
        // global.page = page;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));