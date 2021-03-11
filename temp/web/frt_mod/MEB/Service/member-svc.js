/**
 * @namespace _W.Meta.Bind.MemberService
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandLookupAjax;
    var BindCommandEditAjax;

    // var accountFrmURL;          // 수정화면 경로(참조)

    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseService === "undefined") throw new Error("[BaseService] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var MemberService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */ 
        function MemberService(p_this, p_suffix) {
            _super.call(this);

            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;
            
            // command 생성
            p_this.create       = new BindCommandEditAjax(p_this);      // 회원가입
            p_this.read         = new BindCommandLookupAjax(p_this);    // 회원가입
            p_this.update       = new BindCommandEditAjax(p_this);      // 회원가입
            
            p_this.over         = new BindCommandLookupAjax(p_this);    // 아이디 중복 확인  REVIEW:: SP흐름이 모호함
            
            // 모델 속성 설정
            p_this.baseUrl      = "/Front/frt_mod/MEB/Member.C.asp";
            p_this.over.url     = "/Front/frt_mod/MEB/Member_Account.C.asp";

            p_this.read.outputOption = 3; 

            // prop 속성 설정
            this.prop = {
                // inner
                __finishURL:    "finish.asp",
                // view
                _btn_create:    { selector: { key: "#s-btn-create"+ SUFF,       type: "html" } },
                _btn_checkID:   { selector: { key: "#s-btn-checkID"+ SUFF,       type: "html" } },
                _btn_update:    { selector: { key: "#s-btn-update"+ SUFF,       type: "html" } },
                // bind
                cmd:            "",
                sto_id:         "S00001",
                meb_idx:        "",
                meb_id:         { 
                    selector:       { key: "#m-meb_id"+ SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "아이디를 6자리 이상 입력해주세요.", code: 150, return: true},
                        { regex: /^[a-z]+[a-z0-9]{5,19}$/g, msg: "영문자와 숫자로만 입력해주세요.", code: 150, return: true},
                    ],
                },
                txt_meb_id:    { 
                    selector:       { key: "#s-txt-meb_id"+ SUFF,    type: "text" },
                },
                passwd:         {
                    selector:       { key: "#m-passwd"+ SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "비밀번호를 6자리 이상 입력해주세요.", code: 150, return: true },
                    ]
                },
                passwd2:         {
                    selector:       { key: "#m-passwd2"+ SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "비밀번호 확인을 6자리 이상 입력해주세요.", code: 150, return: true },
                        function(p_item, p_value, r_result) { 
                            if (p_this.items.passwd.value !== p_value) {
                                r_result.msg = "비밀번호가 서로 다릅니다.";
                                return false;
                            }
                            return true;
                        },
                    ]
                },
                newPasswd:      {
                    selector:       { key: "#m-newPasswd"+ SUFF,     type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "새 비밀번호를 6자리 이상 입력해주세요.", code: 150, return: true },
                    ],
                    isNullPass:     true
                },
                newPasswd2:      {
                    selector:       { key: "#m-newPasswd2"+ SUFF,     type: "value" },
                    constraints:    [
                        function(p_item, p_value, r_result) { 
                            if (p_this.items.newPasswd.value !== p_value) {
                                r_result.msg = "비밀번호가 서로 다릅니다.";
                                return false;
                            }
                            return true;
                        },
                    ],
                },
                mebName:        {
                    selector:       { key: "#m-mebName"+ SUFF,      type: "value" },
                    constraints:    { regex: /..+/, msg: "2자 이상 이름을 정확하게 입력해주세요.", code: 150, return: true}
                },
                email:          { 
                    selector:       { key: "#m-email"+ SUFF,       type: "value" },
                    constraints:    { 
                        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 
                        msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true 
                    },
                    isNullPass:     true
                },
                hp:             {
                    selector:       { key: "#m-hp"+ SUFF,       type: "value" },
                    constraints:    { regex: /^\d{3}\d{3,4}\d{4}$/, msg: "휴대폰 번호를 정확히 입력해주세요.", code: 150, return: true }
                },
                zipcode:        {  selector:       { key: "#m-zipcode"+ SUFF,       type: "value" } },
                addr1:          {  selector:       { key: "#m-addr1"+ SUFF,         type: "value" } },
                addr2:          {  selector:       { key: "#m-addr2"+ SUFF,         type: "value" } },
            };            
            // mapping 설정
            this.mapping = {
                cmd:            { Array:  ["bind"] },
                sto_id:         { create: ["valid", "bind"] },
                meb_idx:        { read:   ["valid", "bind"], update: ["valid", "bind"]  },
                meb_id:         { create: ["valid", "bind"], over:   ["valid", "bind"], read: ["output"]  },
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

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute     = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.over.onExecute       = function(p_bindCommand) { p_this.items["cmd"].value = "OVER"; };
            p_this.read.onExecute       = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            p_this.update.onExecute     = function(p_bindCommand) { p_this.items["cmd"].value = "UPDATE"; };
            // cbEnd
            p_this.create.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("회원 등록 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                location.href = p_this.prop["__finishURL"] + "?meb_idx" + p_this.items["meb_id"];
            };
            p_this.over.cbEnd  = function(p_entity) {
                if (p_entity["return"] >= 0) return alert("중복된 아이디 입니다. Result Code : " + p_entity["return"]);
            };
            p_this.read.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("회원정보 조회가 실패하였습니다. Result Code : " + p_entity["return"]);
            };
            p_this.update.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("회원 수정 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                alert("회원정보가 수정되었습니다.");
                p_this.read.execute();
            };
            // onExecuted
            p_this.read.onExecuted = function(p_bindCommand) { p_this.items["txt_meb_id"].value =  p_this.items["meb_id"].value; };
        }
        util.inherits(MemberService, _super);
    
        // 데코레이션 메소드
        MemberService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            var _btn_create = p_this.items["_btn_create"].selector.key;
            var _btn_checkID = p_this.items["_btn_checkID"].selector.key;
            var _btn_update = p_this.items["_btn_update"].selector.key;
            
            $(_btn_create + this.SUFF).click(function () {
                p_this.create.execute();
            });
            $(_btn_checkID + this.SUFF).click(function () {
                p_this.over.execute();
            });
            $(_btn_update + this.SUFF).click(function () {
                p_this.update.execute();
            });
        };
        MemberService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        // MemberService.prototype.preReady = function(p_this) {
        //     BaseService.prototype.preReady.call(this, p_this);
        // };

        return MemberService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.MemberService = MemberService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));