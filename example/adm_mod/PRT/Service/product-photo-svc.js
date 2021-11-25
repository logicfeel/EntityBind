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
    if (typeof PageView === 'undefined') throw new Error('[PageView] module load fail...');     // 전역에 선언됨
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    

    // 핼퍼 등록
    Handlebars.registerHelper('selected', function( /* dynamic arguments */) {
        var options = arguments[arguments.length-1];
        var args = Array.prototype.slice.call(arguments, 0,arguments.length-1)
        var str = '';
        if (args[0] === args[1]) str =  new Handlebars.SafeString('selected');
        return str;
    });                          

                                
    var ProductPhotoService  = (function (_super) {
        /**
         * 상품 :: 사진 서비스
         * @constructs _W.Service.Admin.ProductPhotoService
         * @extends _W.Service.Admin.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function ProductPhotoService(p_suffix) {
            _super.call(this);

            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Admin/adm_mod/PRT/Product_Image.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                // view
                _temp_list:     { selector: { key: '#s-temp-photo'+ _SUFF,          type: 'html' } },
                _area_list:     { selector: { key: '#s-area-photo'+ _SUFF,          type: 'html' } },
                _img_idx:       { selector: { key: '[name=s-img_idx'+_SUFF+'][row_count]',     type: 'value' } },
                _fileName:      { selector: { key: '[name=s-fileName'+_SUFF+'][row_count]',    type: 'value' } },
                _position_cd:   { selector: { key: '[name=s-position_cd'+_SUFF+'][row_count]', type: 'value' } },
                _rank_it:       { selector: { key: '[name=s-rank_it'+_SUFF+'][row_count]',     type: 'value' } },
                // bind
                cmd:            '',
                page_size:      0,
                page_count:     1,              
                sort_cd:        '',
                prt_id:         { isNotNull: true },
                img_idx:        { isNotNull: true },
                fileName:       { 
                    selector:       { key: '#m-fileName'+ _SUFF,        type: 'value' },
                    isNotNull: true,
                },
                position_cd:    { 
                    selector:       { key: '#m-position_cd'+ _SUFF,     type: 'value' },
                    isNotNull: true,
                },
                rank_it:       { 
                    value:          '',
                    selector:       { key: '#m-rank_it'+ _SUFF,         type: 'value' },   
                },
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
                        if (global.isLog) console.log("[Service] list.cbOutput() : 목록출력");

                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            _template = Handlebars.compile( _this.bindModel.items['_temp_list'].value );
                        }
                        _this.bindModel.items['_area_list'].value = _template(entity);
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
                prt_id:         { create:   ['valid', 'bind'],    list: 'bind' },
                img_idx:        { update:   ['valid', 'bind'],    delete: ['valid', 'bind'] },
                fileName:       { create:   ['valid', 'bind'],    update: ['valid', 'bind'] },
                position_cd:    { create:   ['valid', 'bind'],    update: ['valid', 'bind'] },
                rank_it:        { create:   'bind',               update: 'bind' },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                resetForm: function () { 
                    _this.bindModel.items['fileName'].value = '';
                    _this.bindModel.items['position_cd'].value = 'B';
                    _this.bindModel.items['rank_it'].value = '99';
                },
                procRead: function (p_prt_id) { 
                    _this.bindModel.items['prt_id'].value = ParamGet2JSON(location.href).prt_id;
                    _this.bindModel.read.execute(); 
                },
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procUpdate: function (p_row) { 
                    _this.bindModel.items['fileName'].value      = $('[name=s-fileName'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['position_cd'].value   = $('[name=s-position_cd'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['rank_it'].value       = $('[name=s-rank_it'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['img_idx'].value       = $('[name=s-img_idx'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.update.execute(); 
                },
                procDelete: function (p_row) { 
                    _this.bindModel.items['img_idx'].value       = $('[name=s-img_idx'+_SUFF+'][row_count='+ p_row +']').val();;
                    _this.bindModel.delete.execute(); 
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };
        }
        util.inherits(ProductPhotoService, _super);
    
        return ProductPhotoService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.ProductPhotoService = ProductPhotoService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));