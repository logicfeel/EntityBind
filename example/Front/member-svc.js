/**
 * namespace _W.Meta.Bind.MemberService
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
    var MemberService  = (function (_super) {
        /**
         * 회원 :: 서비스
         * @constructs _W.Service.Front.MemberService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function MemberService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/MEB/Member.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */  
             this.prop = {
                // inner
                __finishURL:    "finish.asp",
                // view
                // _btn_create:    { selector: { key: "#s-btn-create"+ SUFF,       type: "html" } },
                // _btn_checkID:   { selector: { key: "#s-btn-checkID"+ SUFF,       type: "html" } },
                // _btn_update:    { selector: { key: "#s-btn-update"+ SUFF,       type: "html" } },
                // bind
                cmd:            "",
                sto_id:         "S00001",
                meb_idx:        "",
                meb_id:         { 
                    selector:       { key: "#m-meb_id"+ _SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "아이디를 6자리 이상 입력해주세요.", code: 150, return: true},
                        { regex: /^[a-z]+[a-z0-9]{5,19}$/g, msg: "영문자와 숫자로만 입력해주세요.", code: 150, return: true},
                    ],
                },
                txt_meb_id:    { 
                    selector:       { key: "#s-txt-meb_id"+ _SUFF,    type: "text" },
                },
                passwd:         {
                    selector:       { key: "#m-passwd"+ _SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "비밀번호를 6자리 이상 입력해주세요.", code: 150, return: true },
                    ]
                },
                passwd2:         {
                    selector:       { key: "#m-passwd2"+ _SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "비밀번호 확인을 6자리 이상 입력해주세요.", code: 150, return: true },
                        function(p_item, p_value, r_result) { 
                            if (_this.bindModel.items.passwd.value !== p_value) {
                                r_result.msg = "비밀번호가 서로 다릅니다.";
                                return false;
                            }
                            return true;
                        },
                    ]
                },
                newPasswd:      {
                    selector:       { key: "#m-newPasswd"+ _SUFF,     type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "새 비밀번호를 6자리 이상 입력해주세요.", code: 150, return: true },
                    ],
                    isNullPass:     true
                },
                newPasswd2:      {
                    selector:       { key: "#m-newPasswd2"+ _SUFF,     type: "value" },
                    constraints:    [
                        function(p_item, p_value, r_result) { 
                            if (_this.bindModel.items.newPasswd.value !== p_value) {
                                r_result.msg = "비밀번호가 서로 다릅니다.";
                                return false;
                            }
                            return true;
                        },
                    ],
                },
                mebName:        {
                    selector:       { key: "#m-mebName"+ _SUFF,      type: "value" },
                    constraints:    { regex: /..+/, msg: "2자 이상 이름을 정확하게 입력해주세요.", code: 150, return: true}
                },
                email:          { 
                    selector:       { key: "#m-email"+ _SUFF,       type: "value" },
                    constraints:    { 
                        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 
                        msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true 
                    },
                    onchanged: function(val) {
                        console.log('email..');
                    },
                    // isNullPass:     true 이메일 필수로 수정
                },
                hp:             {
                    selector:       { key: "#m-hp"+ _SUFF,       type: "value" },
                    constraints:    { regex: /^\d{3}\d{3,4}\d{4}$/, msg: "휴대폰 번호를 정확히 입력해주세요.", code: 150, return: true }
                },
                zipcode:        {  selector:       { key: "#m-zipcode"+ _SUFF,       type: "value" } },
                addr1:          {  selector:       { key: "#m-addr1"+ _SUFF,         type: "value" } },
                addr2:          {  selector:       { key: "#m-addr2"+ _SUFF,         type: "value" } },
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
                    },
                },
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    },
                    onExecuted: function(p_bindCommand, p_result) {
                        _this.bindModel.items["txt_meb_id"].value =  _this.bindModel.items["meb_id"].value;
                    },
                },
                overlap:       {
                    outputOption: 3,
                    url: '/Front/frt_mod/MEB/Member_Account.C.asp',
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'OVER'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert("중복된 아이디 입니다. Result Code : " + p_entity["return"]);
                    }
                },
                update:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        alert('수정 처리가 되었습니다.');
                        _this.bindModel.read.execute();
                    }
                },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    cbValid: function(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                    }
                },
            };

            /**
             * 속성의 매핑
             * @type {Object}
             */
             this.mapping = {
                cmd:            { Array:  ["bind"] },
                sto_id:         { create: ["valid", "bind"] },
                meb_idx:        { read:   ["valid", "bind"], update: ["valid", "bind"]  },
                meb_id:         { create: ["valid", "bind"], overlap:["valid", "bind"], read: ["output"]  },
                passwd:         { create: ["valid", "bind"], },
                passwd2:        { create: ["valid", "bind"], },
                newPasswd:      { update: ["valid", "bind"], },
                newPasswd2:     { update: ["valid", "bind"], },
                mebName:        { create: ["valid", "bind"], update: ["valid", "bind"], read: ["output"]  },
                email:          { create: ["valid", "bind"], update: ["valid", "bind"], read: ["output"]  },
                hp:             { create: ["valid", "bind"], update: ["valid", "bind"], read: ["output"]  },
                zipcode:        { create: ["valid", "bind"], update: ["valid", "bind"], read: ["output"]  },
                addr1:          { create: ["valid", "bind"], update: ["valid", "bind"], read: ["output"]  },
                addr2:          { create: ["valid", "bind"], update: ["valid", "bind"], read: ["output"]  },
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
                procRead: function (p_meb_idx) { 
                    if (typeof p_meb_idx !== 'undefined') _this.bindModel.items['meb_idx'].value = p_meb_idx;
                    _this.bindModel.read.execute(); 
                },
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procUpdate: function () { 
                    _this.bindModel.update.execute(); 
                },
                procDelete: function () { 
                    _this.bindModel.delete.execute(); 
                },
                procOverlap: function () { 
                    _this.bindModel.overlap.execute(); 
                },
            };

        }
        util.inherits(MemberService, _super);
    
        return MemberService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.MemberService = MemberService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));