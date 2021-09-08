/**
 * namespace _W.Meta.Bind.MemberAccountService
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
    var MemberAccountService  = (function (_super) {
        /**
         * 회원 :: 계정 서비스
         * @constructs _W.Service.Front.MemberAccountService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function MemberAccountService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/MEB/Member_Account.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */  
             this.prop = {
                // inner
                // view
                // bind
                cmd:            "",
                meb_idx:        "",
                meb_id:         { 
                    selector:       { key: "#m-meb_id"+ _SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "아이디를 6자리 이상 입력해주세요.", code: 150, return: true},
                        { regex: /^[a-z]+[a-z0-9]{5,19}$/g, msg: "영문자와 숫자로만 입력해주세요.", code: 150, return: true},
                    ],
                },
                email:          { 
                    selector:       { key: "#m-email"+ _SUFF,       type: "value" },
                    constraints:    { 
                        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 
                        msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true 
                    },
                    isNullPass:     true
                },
                mebName:        {
                    selector:       { key: "#m-mebName"+ _SUFF,      type: "value" },
                    constraints:    { regex: /..+/, msg: "2자 이상 이름을 정확하게 입력해주세요.", code: 150, return: true}
                },
                txt_meb_id:     { alias: 'meb_id' },
                txt_passwd:     { alias: 'pass' }, // pass 는 앞자리 가림
            };     

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
             this.command = {
                find_id:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'FIND_ID'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('아이디 조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    },
                },
                find_pw:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'FIND_PW'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('비밀번호 조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    },
                },
            };

            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                cmd:            { Array:  ["bind"] },
                mebName:        { find_pw: ["valid", "bind"], find_id: ["valid", "bind"]  },
                email:          { find_id: ["valid", "bind"], },
                meb_id:         { find_pw: ["valid", "bind"], },
                txt_meb_id:     { find_id: ["output"], },
                txt_passwd:     { find_pw: ["output"], },
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
                procReadID: function () { 
                    _this.bindModel.find_id.execute(); 
                },
                procReadPW: function () { 
                    _this.bindModel.find_pw.execute(); 
                },
            };

        }
        util.inherits(MemberAccountService, _super);
    
        return MemberAccountService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.MemberAccountService = MemberAccountService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));