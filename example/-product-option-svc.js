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
    if (typeof PageView === 'undefined') throw new Error('[PageView] module load fail...');     // 전역에 선언됨
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var ProductOptionService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.Admin.ProductOptionService
         * @extends _W.Service.Admin.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function ProductOptionService(p_suffix) {
            _super.call(this);

            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Admin/adm_mod/PRT/Product_Option.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                // view
                _temp_list:     { selector: { key: '#s-temp-option'+ _SUFF,             type: 'html' } },
                _area_list:     { selector: { key: '#s-area-option'+ _SUFF,             type: 'html' } },
                _img_idx:       { selector: { key: '[name=s-opt_idx'+_SUFF+'][row_count]',      type: 'value' } },
                _img_idx:       { selector: { key: '[name=s-default_yn'+_SUFF+'][row_count]',   type: 'value' } },
                _img_idx:       { selector: { key: '[name=s-optName'+_SUFF+'][row_count]',      type: 'value' } },
                _fileName:      { selector: { key: '[name=s-sell_mn'+_SUFF+'][row_count]',      type: 'value' } },
                _position_cd:   { selector: { key: '[name=s-discount_mn'+_SUFF+'][row_count]',  type: 'value' } },
                _rank_it:       { selector: { key: '[name=s-point_it'+_SUFF+'][row_count]',     type: 'value' } },
                // bind
                cmd:            '',
                page_size:      0,
                page_count:     1,              
                sort_cd:        '',
                opt_idx:        { isNotNull: true },
                prt_id:         { isNotNull: true },
                default_yn:     { 
                    selector: { key: '[id=m-default_yn'+ _SUFF +'][type=checkbox]:checked',    type: 'value' },
                    setter:         function(val) { 
                        $('input[id=m-default_yn'+ _SUFF +']').prop('checked', val === 'Y' ? true : false); 
                    }
                },
                optName:        { 
                    selector:       { key: '#m-optName'+ _SUFF,                         type: 'value' },
                    isNotNull: true 
                },
                sell_mn:       { 
                    selector:       { key: '#m-sell_mn'+ _SUFF,                         type: 'value' },
                    constraints:    { regex: /\D/, msg: "판매가는  숫자만 입력해야 합니다.", code: 150, return: false},
                    // isNotNull: true,
                },
                discount_mn:    { 
                    selector:       { key: '#m-discount_mn'+ _SUFF,                     type: 'value' },
                    constraints:    { regex: /\D/, msg: "활인가는  숫자만 입력해야 합니다.", code: 150, return: false},
                    // isNotNull: true,
                },
                point_it:       { 
                    selector:       { key: '#m-point_it'+ _SUFF,                        type: 'value' },
                    constraints:    { regex: /\D/, msg: "포인트  숫자만 입력해야 합니다.", code: 150, return: false},   
                    // 필요 한지 검토
                    //value:          '',
                }
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
                        _this.bindModel.list.execute();
                    },
                    onExecuted: function(p_bindCommand, p_entity) { _this.bindModel.fn.resetForm(); },
                },
                update:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        alert('수정 처리가 되었습니다.');
                        _this.bindModel.list.execute();
                    },
                    onExecuted: function(p_bindCommand, p_entity) { _this.bindModel.fn.resetForm(); },
                },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    cbValid: function(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                        _this.bindModel.list.execute();
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        var entity = p_result['table'];
                        
                        var row_total   = entity['row_total'];
                        if (_template === null) {
                            _template    = Handlebars.compile( _this.bindModel.items['_temp_list'].value );
                            // 핼퍼 등록
                            Handlebars.registerHelper('check_yn', function (p_value) {
                                if (p_value === 'Y') return 'checked';
                                else return '';
                            });
                        }
                        _this.bindModel.items['_area_list'].value      = _template(entity);
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
                _temp_list:     { list:     'etc' },    // 묶음의 용도
                _area_list:     { list:     'etc' },    // 묶음의 용도
                cmd:            { Array:    'bind' },
                page_size:      { list:     'bind' },
                page_count:     { list:     'bind' },
                sort_cd:        { list:     'bind' },
                prt_id:         { create:   ['valid', 'bind'],    update: ['valid', 'bind'],      list: 'bind',      delete: 'bind' },
                opt_idx:        { update:   ['valid', 'bind'],    delete: ['valid', 'bind'] },
                default_yn:     { create:   ['valid', 'bind'],    update: ['valid', 'bind'] },
                optName:        { create:   ['valid', 'bind'],    update: ['valid', 'bind'] },
                sell_mn:        { create:   ['valid', 'bind'],    update: ['valid', 'bind'] },
                discount_mn:    { create:   ['valid', 'bind'],    update: ['valid', 'bind'] },
                point_it:       { create:   ['valid', 'bind'],    update: ['valid', 'bind'] },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                resetForm: function () { 
                    _this.bindModel.items['default_yn'].value = 'N';
                    _this.bindModel.items['optName'].value = '';
                    _this.bindModel.items['sell_mn'].value = '';
                    _this.bindModel.items['discount_mn'].value = '';
                    _this.bindModel.items['point_it'].value = '0';
                },
                procRead: function (p_prt_id) { 
                    _this.bindModel.items['prt_id'].value = ParamGet2JSON(location.href).prt_id;
                    _this.bindModel.read.execute(); 
                },
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procUpdate: function (p_row) { 
                    _this.bindModel.items['default_yn'].value  = $('[name=s-default_yn'+_SUFF+'][row_count='+ p_row +']').prop('checked') ? 'Y' : 'N';
                    _this.bindModel.items['optName'].value     = $('[name=s-optName'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['sell_mn'].value     = $('[name=s-sell_mn'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['discount_mn'].value = $('[name=s-discount_mn'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['point_it'].value    = $('[name=s-point_it'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['opt_idx'].value     = $('[name=s-opt_idx'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.update.execute(); 
                },
                procDelete: function (p_row) { 
                    _this.bindModel.items['opt_idx'].value     = $('[name=s-opt_idx'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.delete.execute(); 
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };
        }
        util.inherits(ProductOptionService, _super);
    
        return ProductOptionService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.ProductOptionService = ProductOptionService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));