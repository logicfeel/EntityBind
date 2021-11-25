/**
 * @namespace _W.Meta.Bind.MemberAccountService
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
    var MemberAccountService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */ 
        function MemberAccountService(p_this, p_suffix) {
            _super.call(this);

            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;
            
            // command 생성
            p_this.read_id      = new BindCommandLookupAjax(p_this);
            p_this.read_pw      = new BindCommandLookupAjax(p_this);
            
            // 모델 속성 설정
            p_this.baseUrl      = "/Front/frt_mod/MEB/Member_Account.C.asp";

            // p_this.read_id.outputOption = 3; 
            // p_this.read_pw.outputOption = 3; 

            // prop 속성 설정
            this.prop = {
                // inner
                // view
                _btn_findPW:    { selector: { key: "#s-btn-findPW"+ SUFF,       type: "html" } },
                _btn_findID:    { selector: { key: "#s-btn-findID"+ SUFF,       type: "html" } },
                // bind
                cmd:            "",
                meb_idx:        "",
                meb_id:         { 
                    selector:       { key: "#m-meb_id"+ SUFF,        type: "value" },
                    constraints:    [
                        { regex: /......+/, msg: "아이디를 6자리 이상 입력해주세요.", code: 150, return: true},
                        { regex: /^[a-z]+[a-z0-9]{5,19}$/g, msg: "영문자와 숫자로만 입력해주세요.", code: 150, return: true},
                    ],
                },
                // txt_meb_id:    { 
                //     selector:       { key: "#s-txt-meb_id"+ SUFF,    type: "text" },
                // },
                // txt_passwd:    { 
                //     selector:       { key: "#s-txt-passwd"+ SUFF,    type: "text" },
                // },
                email:          { 
                    selector:       { key: "#m-email"+ SUFF,       type: "value" },
                    constraints:    { 
                        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 
                        msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true 
                    },
                    isNullPass:     true
                },
                mebName:        {
                    selector:       { key: "#m-mebName"+ SUFF,      type: "value" },
                    constraints:    { regex: /..+/, msg: "2자 이상 이름을 정확하게 입력해주세요.", code: 150, return: true}
                },
            };            
            // mapping 설정
            this.mapping = {
                cmd:            { Array:  ["bind"] },
                mebName:        { read_pw: ["valid", "bind"], read_id: ["valid", "bind"]  },
                email:          { read_id: ["valid", "bind"], },
                meb_id:         { read_pw: ["valid", "bind"], },
                txt_meb_id:     { read_id: ["output"], },
                txt_passwd:     { read_pw: ["output"], },
            };

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.read_id.onExecute     = function(p_bindCommand) { p_this.items["cmd"].value = "FIND_ID"; };
            p_this.read_pw.onExecute       = function(p_bindCommand) { p_this.items["cmd"].value = "FIND_PW"; };
        }
        util.inherits(MemberAccountService, _super);
    
        // 데코레이션 메소드
        MemberAccountService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            // 셀렉터 얻기
            var _btn_findPW = p_this.items["_btn_findPW"].selector.key;
            var _btn_findID = p_this.items["_btn_findID"].selector.key;

            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $(_btn_findPW + this.SUFF).click(function () {
                p_this.read_pw.execute();
            });
            $(_btn_findID + this.SUFF).click(function () {
                p_this.read_id.execute();
            });

            console.log("----------------------------------");
        };
        MemberAccountService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        MemberAccountService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return MemberAccountService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.MemberAccountService = MemberAccountService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));