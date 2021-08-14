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
    var page = new PageView('page', 10);
    var page_prt = new PageView('page_prt', 10);

    // 핼퍼 등록
    Handlebars.registerHelper('type_code', function (p_value) {
        if (p_value === 'DE') return '배송';
        else return '기타';
    });
    Handlebars.registerHelper('kind_code', function (p_value) {
        if (p_value === 'NEW') return '신상';
        if (p_value === 'REC') return '추천';
        if (p_value === 'POP') return '인기';
        return '일반'
    });
    Handlebars.registerHelper('state_code', function (p_value) {
        if (p_value === 'SS') return '판매(전시중)';
        if (p_value === 'RS') return '예약(전시중)';
        if (p_value === 'DS') return '재고없음(전시중)';
        if (p_value === 'DH') return '판매중지(전시중지)';
        return ''
    });  

    var ProductDisplayPrtService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.Admin.ProductDisplayPrtService
         * @extends _W.Service.Admin.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function ProductDisplayPrtService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;
            var _template_prt  = null;
            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Admin/adm_mod/PRT/Product_DisplayPrt.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */            
            this.prop = {
                // inner
                __isGetLoad:    false,
                // view
                _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,       type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list'+ _SUFF,       type: 'html' } },
                _area_page:     { selector: { key: '#s-area-page'+ _SUFF,       type: 'html' } },
                _txt_totalCnt:  { selector: { key: '#s-txt-totalCnt'+ _SUFF,    type: 'text' } },
                _temp_prt:      { selector: { key: '#s-temp-prt'+ _SUFF,        type: 'html' } },
                _area_prt:      { selector: { key: '#s-area-prt'+ _SUFF,        type: 'html' } },
                _area_page_prt:     { selector: { key: '#s-area-page-prt'+ _SUFF,   type: 'html' } },
                _txt_totalPrtCnt:   { selector: { key: '#s-txt-totalPrtCnt'+ _SUFF, type: 'text' } },
                _show_prt_id:       { selector: { key: '[name=s-show_prt_id'+_SUFF+'][type=checkbox]',   type: 'value' } },
                _hide_prt_id:       { selector: { key: '[name=s-hide_prt_id'+_SUFF+'][type=checkbox]',   type: 'value' } },
                _dsp_id:            { selector: { key: 'select[name=m-dsp_id'+_SUFF+']',  type: 'html' } },
                _rank_it:           { selector: { key: '[name=s-rank_it'+_SUFF+'][row_count]',  type: 'value' } },
                _prt_id:            { selector: { key: '[name=s-prt_id'+_SUFF+'][row_count]',      type: 'value' } },
                // bind
                cmd:            '',
                keyword:        { selector: { key: '#m-keyword'+ _SUFF,         type: 'value' } },
                page_size:      {
                    selector: { key: 'select[name=m-page_size'+_SUFF+']',       type: 'value' },
                    setter: function(val) { page.page_size = val; },
                },
                page_count:     {   /** 값을 외부에서 관리함! */
                    getter: function() { return page.page_count; },
                    setter: function(val) { return page.page_count = val; }
                },
                // 중복이름의 이슈가 있음
                page_size_prt:      {
                    selector: { key: 'select[name=m-page_size_prt'+_SUFF+']',       type: 'value' },
                    setter: function(val) { page_prt.page_size = val; },
                    alias: 'page_size',
                },
                page_count_prt:     {   /** 값을 외부에서 관리함! */
                    getter: function() { return page_prt.page_count; },
                    setter: function(val) { return page_prt.page_count = val; },
                    alias: 'page_count',
                },              
                sort_cd:        '',
                prt_id:         { isNotNull: true },
                dsp_id:         { 
                    selector: { key: 'select[name=m-dsp_id'+_SUFF+']',  type: 'value' },
                    isNotNull: true,
                    value: 1,
                },
                rank_it:        { 
                    constraints:    { regex: /\D/, msg: "판매가는  숫자만 입력해야 합니다.", code: 150, return: false},
                    isNotNull: true,
                },
            };

            // this.onExecute = function(p_bindCommand) { 
            //     if (0 < _this.bindModel.bindCount) _this.bindModel.bindCount--; // 카운터 감소
            // },
            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE'; },
                    // cbValid: function(p_valid) { return confirm('진열  하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        
                        if (_this.bindModel.bindCount <= 0) {
                            _this.bindModel.fn.procList();
                        } else {
                            _this.bindModel.bindCount--; // 카운터 감소
                        }
                    },
                },
                update:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        alert('수정 처리가 되었습니다.');
                        _this.bindModel.fn.procList();
                    }
                },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    // cbValid: function(p_valid) { return confirm('진열 해제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                        
                        if (_this.bindModel.bindCount <= 0) {
                            _this.bindModel.fn.procList();
                        } else {
                            _this.bindModel.bindCount--; // 카운터 감소
                        }
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items['cmd'].value = 'LIST'; 
                    },
                    cbOutput: function(p_result) {
                        if (this.isLog) console.log("list.cbOutput() : 목록 출력 ");
                        
                        var entity = p_result['table'];
                        var row_total   = entity['row_total'];

                        if (_template === null) {
                            _template    = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_txt_totalCnt'].value    = row_total;
                        _this.bindModel.items['_area_list'].value       = _template(entity);
                        _this.bindModel.items['_area_page'].value       = page.parser(row_total);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('[진열상품] 목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
                list_prt:       {
                    outputOption: 1,
                    url: '/Admin/adm_mod/PRT/Product.C.asp',
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items['cmd'].value = 'LIST'; 
                    },
                    cbOutput: function(p_result) {
                        if (this.isLog) console.log("list_prt.cbOutput() : 목록 출력 ");

                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template_prt === null) {
                            _template_prt    = Handlebars.compile( _this.bindModel.items['_temp_prt'].value );
                        }
                        _this.bindModel.items['_txt_totalPrtCnt'].value = row_total;
                        _this.bindModel.items['_area_prt'].value        = _template_prt(entity);
                        _this.bindModel.items['_area_page_prt'].value   = page_prt.parser(row_total);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('[상품] 목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
                list_display:       {
                    outputOption: 1,
                    url: '/Admin/adm_mod/PRT/Product_Display.C.asp',
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items['cmd'].value = 'LIST'; 
                    },
                    cbOutput: function(p_result) {
                        if (this.isLog) console.log("list_display.cbOutput() : 목록 출력 ");

                        var entity = p_result['table'];
                        var _html = '';

                        for(var i = 0; i < entity.rows.length; i++){
                            _html = '<option value="' + entity.rows[i].dsp_id + '">' + entity.rows[i].dspNames.replace(/,/g, ' > ') + '</option';
                            $("select[name=m-dsp_id]").append(_html);
                        }
                        // TODO:: _dsp_id 사용방식으로 개선 필요
                        //_this.bindModel.items['_dsp_id'].value       = _html;
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('[카테고리] 목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
            }

            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                _temp_list:         { list:     'etc' },    // 묶음의 용도
                _area_list:         { list:     'etc' },    // 묶음의 용도
                _area_page:         { list:     'etc' },    // 묶음의 용도
                _txt_totalCnt:      { list:     'etc' },    // 묶음의 용도
                _temp_prt:          { list_prt: 'etc' },    // 묶음의 용도
                _area_prt:          { list_prt: 'etc' },    // 묶음의 용도
                _area_page_prt:     { list_prt: 'etc' },    // 묶음의 용도
                _txt_totalPrtCnt:   { list_prt: 'etc' },    // 묶음의 용도
                cmd:            { Array:    'bind' },
                keyword:        { list_prt: 'bind' },
                page_size:      { list:     'bind' },
                page_count:     { list:     'bind' },
                page_size_prt:  { list_prt: 'bind' },
                page_count_prt: { list_prt: 'bind' },
                sort_cd:        { list:     'bind' },
                rank_it:        { create:   ['valid', 'bind'], update:  ['valid', 'bind'] },
                prt_id:         { 
                    create:   ['valid', 'bind'], 
                    update:  ['valid', 'bind'], 
                    delete:  ['valid', 'bind'],
                },
                dsp_id:         { 
                    create:   ['valid', 'bind'], 
                    update:  ['valid', 'bind'], 
                    delete:  ['valid', 'bind'],  
                    list_display: 'bind', list: 'bind', 
                },
                
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
            this.fn = {
                searchPrtList: function() {
                    page.page_count = 1;
                    _this.bindModel.list_prt.execute();
                },
                changePagesize: function(e) {
                    page_prt.page_size = _this.bindModel.items['page_size_prt'].value;
                    page_prt.page_count = 1;
                    _this.bindModel.list_prt.execute();
                },
                resetForm: function () { 
                    $('form').each(function() {
                        this.reset();
                    });
                },
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procUpdate: function () { 
                    _this.bindModel.update.execute(); 
                },
                procUpdate: function (p_row) { 
                    _this.bindModel.items['prt_id'].value  = $('[name=s-prt_id'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.items['rank_it'].value     = $('[name=s-rank_it'+_SUFF+'][row_count='+ p_row +']').val();
                    _this.bindModel.update.execute(); 
                },
                procDelete: function () { 
                    _this.bindModel.delete.execute(); 
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
                procPrtList: function () { 
                    _this.bindModel.list_prt.execute(); 
                },
                procDisplayList: function () { 
                    _this.bindModel.list_display.execute(); 
                },
                changeDspId: function() {
                    if (_this.bindModel.items['dsp_id'].value > 0) {
                        _this.bindModel.list.execute();
                    } else {
                        // TODO:: reset list 함수로 뺄수 있음!!
                        _this.bindModel.items['_txt_totalCnt'].value    = 0;
                        _this.bindModel.items['_area_list'].value       = '';
                        _this.bindModel.items['_area_page'].value       = '';
                    }
                },
                showProduct: function() {

                    var checkCnt = $('[name=s-show_prt_id'+_SUFF+'][type=checkbox]:checked').length;
                    
                    if (_this.bindModel.items['dsp_id'].value > 0) {

                        if (checkCnt <= 0) {
                            return alert("선택된 항목이 없습니다.");
                        } 
                        
                        if (confirm("진열 하시겠습니까 ?")) {
                            // 중복 출력 제거
                            _this.bindModel.bindCount = checkCnt - 1;
                            $('[name=s-show_prt_id'+_SUFF+'][type=checkbox]:checked').each(function() {
                                _this.bindModel.items['prt_id'].value = this.value;
                                _this.bindModel.create.execute();
                            });
                        }
                    } else {
                        return alert("진열할 커테고리를 선택해 주세요.");
                    }
                },
                hideProduct: function() {
                    
                    var checkCnt = $('[name=s-hide_prt_id'+_SUFF+'][type=checkbox]:checked').length;

                    if (checkCnt <= 0) {
                        return alert("선택된 항목이 없습니다.");
                    }

                    if (confirm("진열 해제 하시겠습니까 ?")) {
                        // 중복 출력 제거
                        _this.bindModel.bindCount = checkCnt - 1;
                        $('[name=s-hide_prt_id'+_SUFF+'][type=checkbox]:checked').each(function() {
                            _this.bindModel.items['prt_id'].value = this.value;
                            _this.bindModel.delete.execute();
                        });
                    }
                },
            };
        }
        util.inherits(ProductDisplayPrtService, _super);
    
        /**
         * 전처리 :: 등록 
         * 데코레이션 패턴 : 상위 메소드 호출함
         * @param {BindModelAjax} p_bindModel 서비스 소유자
         */
        ProductDisplayPrtService.prototype.preRegister = function(p_bindModel) {
            BaseService.prototype.preRegister.call(this, p_bindModel);
            if (this.isLog) console.log('______________ preRegister()');
            
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_bindModel.items['keyword'].value = decodeURI(getArgs('', getParamsToJSON(location.href).keyword ));
            p_bindModel.items['page_count_prt'].value  = Number( getArgs('', getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_bindModel.prop['__isGetLoad'] === true) {
                page_prt.callback = page_prt.goPage.bind(p_bindModel.list_prt.bind);            // 2-2) GET 방식 (bind)            
            } else {
                page_prt.callback = p_bindModel.list.execute.bind(p_bindModel.list_prt);    // 1) 콜백 방식
            }
        };

        return ProductDisplayPrtService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.ProductDisplayPrtService = ProductDisplayPrtService;
        global.page = page;
        global.page_prt = page_prt;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));