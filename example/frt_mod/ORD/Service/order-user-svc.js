/**
 * namespace _W.Meta.Bind.OrderUserService
 */
 (function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
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
    Handlebars.registerHelper('line_or', function (p_val) {
        return p_val.replace("||", "<br/>");
    });
    Handlebars.registerHelper("if", function(conditional, options) {
        if (conditional) return options.fn(this);
        else return options.inverse(this);
    });
    Handlebars.registerHelper('grade_mark', function (p_val) {
        var mark = "";
        for (var i = 0; i < p_val; i++ ) mark += "★";
        return mark;
    });

    var OrderUserService  = (function (_super) {
        /**
         * 주문 :: 회원 서비스
         * @constructs _W.Service.Front.OrderUserService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function OrderUserService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/ORD/Order_User.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */  
             this.prop = {
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ _SUFF,            type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ _SUFF,            type: "html" } },
                _txt_totalView: { selector: { key: "#s-txt-totalView"+ _SUFF,        type: "html" } },
                _btn_opinion:   { selector: { key: "[name=s-btn-opinion"+_SUFF+"][row_count]",  type: "html" } },
                _btn_op_view:   { selector: { key: "[name=s-btn-op_view"+_SUFF+"][row_count]",  type: "html" } },
                _btn_create:    { selector: { key: "[name=s-btn-create"+_SUFF+"][row_count]",   type: "html" } },
                _area_opinion:  { selector: { key: "[name=s-area-opinion"+_SUFF+"][row_count]", type: "html" } },
                _area_op_view:  { selector: { key: "[name=s-area-op_view"+_SUFF+"][row_count]", type: "html" } },
                _grade_cd:      { selector: { key: "[name=m-grade_cd"+_SUFF+"][row_count]",     type: "value" } },
                _ord_id:        { selector: { key: "[name=m-ord_id"+_SUFF+"][row_count]",       type: "value" } },
                _contents:      { selector: { key: "[name=m-contents"+_SUFF+"][row_count]",     type: "value" } },
                // bind
                cmd:            "",
                meb_idx:        "",
                state_PW:       { selector: { key: "#m-state_PW"+ _SUFF,             type: "text" } },
                state_PC:       { selector: { key: "#m-state_PC"+ _SUFF,             type: "text" } },
                state_RF:       { selector: { key: "#m-state_RF"+ _SUFF,             type: "text" } },
                state_PF:       { selector: { key: "#m-state_PF"+ _SUFF,             type: "text" } },
                state_DK:       { selector: { key: "#m-state_DK"+ _SUFF,             type: "text" } },
                state_DR:       { selector: { key: "#m-state_DR"+ _SUFF,             type: "text" } },
                state_DS:       { selector: { key: "#m-state_DS"+ _SUFF,             type: "text" } },
                state_DF:       { selector: { key: "#m-state_DF"+ _SUFF,             type: "text" } },
                state_TF:       { selector: { key: "#m-state_TF"+ _SUFF,             type: "text" } },
                page_size:      0,
                grade_cd:       { constraints: { regex: /.+/, msg: "점수를 선택해주세요.", code: 150, return: true} },
                ord_id:         "",
                orderName:      "",
                contents:       { constraints: { regex: /.+/, msg: "한줄을 입력해주세요.", code: 150, return: true} }
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
             this.command = {
                create_opinion:     {
                    url: '/Front/frt_mod/PRT/Product_Opinion.C.asp',
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE_ORDER'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        alert("한줄평이 등록되었습니다.");
                        _this.bindModel.items['ord_id'].value = ''; // 초기화  (전체목록)
                        _this.bindModel.list.execute();
                    },
                },
                read: {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    },
                },
                read_state: {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ_STATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    },
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log('[Service] list.cbOutput() : 목록출력');

                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            _template  = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_txt_totalView'].value = row_total;
                        _this.bindModel.items['_area_list'].value = _template(entity);
                    },
                },
            };

            /**
             * 속성의 매핑
             * @type {Object}
             */
             this.mapping = {
                cmd:            { Array: ["bind"] },    // 전역설정
                meb_idx:        { 
                    read_state:     ["bind"],      
                    list:           ["bind"],      
                    create_opinion: ["bind"], 
                },
                state_PW:       { read_state:       ["output"] },
                state_PC:       { read_state:       ["output"] },
                state_RF:       { read_state:       ["output"] },
                state_PF:       { read_state:       ["output"] },
                state_DK:       { read_state:       ["output"] },
                state_DR:       { read_state:       ["output"] },
                state_DS:       { read_state:       ["output"] },
                state_DF:       { read_state:       ["output"] },
                state_TF:       { read_state:       ["output"] },
                page_size:      { list:             ["bind"] },
                grade_cd:       { create_opinion:   ["valid", "bind"] },
                ord_id:         { create_opinion:   ["bind"],           list:      ["bind"],    read:      ["bind"]},
                orderName:      { list:             ["bind"],           read:      ["bind"]},
                contents:       { create_opinion:   ["valid", "bind"] },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
             this.fn = {
                resetForm: function () { 
                    $('form').each(function() {
                        this.reset();
                    });
                },
                procCreateOpinion: function () { 
                    var row_count = $(this).attr("row_count");
                    var _grade_cd       = _this.bindModel.items["_grade_cd"].selector.key;
                    var _ord_id         = _this.bindModel.items["_ord_id"].selector.key;
                    var _contents       = _this.bindModel.items["_contents"].selector.key;
                    _this.bindModel.items["grade_cd"].value  = $(_grade_cd +"[row_count="+ row_count +"]").val();
                    _this.bindModel.items["ord_id"].value    = $(_ord_id +"[row_count="+ row_count +"]").val();
                    _this.bindModel.items["contents"].value  = $(_contents +"[row_count="+ row_count +"]").val();
                    _this.bindModel.create_opinion.execute(); 
                },
                viewOpinion: function (p_row_count) { // 한줄평 확인
                    var row_count = (typeof p_meb_idx !== 'undefined') ? p_row_count : $(this).attr("row_count");
                    var _area_op_view   = _this.bindModel.items["_area_op_view"].selector.key;
                    $(_area_op_view + "[row_count="+ row_count +"]").toggle();
                },
                formOpinion: function (p_row_count) { // 한줄평 확인
                    var row_count = (typeof p_meb_idx !== 'undefined') ? p_row_count : $(this).attr("row_count");
                    var _area_opinion   = _this.bindModel.items["_area_opinion"].selector.key;
                    $(_area_opinion + "[row_count="+ row_count +"]").toggle();
                },
                procReadState: function (p_meb_idx) { 
                    if (typeof p_meb_idx !== 'undefined') _this.bindModel.items['meb_idx'].value = p_meb_idx;
                    _this.bindModel.read_state.execute(); 
                },
                procRead: function () { 
                    _this.bindModel.read.execute(); 
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };

        }
        util.inherits(OrderUserService, _super);
    
        return OrderUserService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.OrderUserService = OrderUserService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));