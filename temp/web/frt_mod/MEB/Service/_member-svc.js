/**
 * @namespace _W.Meta.Bind.MemberCreateService
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
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;
    var BindCommandEditAjax     =_W.Meta.Bind.BindCommandEditAjax;

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
    var MemberCreateService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */ 
        function MemberCreateService(p_this) {
            _super.call(this);

            var _this = this;
            
            // command 생성
            p_this.over         = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 아이디 중복 확인  REVIEW:: SP흐름이 모호함

            p_this.create       = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 회원가입
            p_this.read         = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 회원가입
            p_this.update       = new BindCommandEditAjax(p_this, p_this._baseEntity);    // 회원가입

            p_this.baseUrl      = "/Front/frt_mod/MEB/Member.C.asp";
            p_this.over.url     = "/Front/frt_mod/MEB/Account.C.asp";

            p_this.read.outputOption = 3; 

            // 내부 속성
            this.prop["__finishURL"] = "finish.asp";
            // 콜백 속성
            this.prop["cmd"] = "";
            // 모델 속성
            this.prop["sto_id"] = "S00001";
            this.prop["meb_idx"] = { isNotNull: true };

            this.prop["meb_id"] = {
                selector: { key: "#meb_id", val: "value" },
                constraints: [
                    { regex: /......+/, msg: "아이디를 6자리 이상 입력해주세요.", code: 150, return: true},
                    { regex: /^[a-z]+[a-z0-9]{5,19}$/g, msg: "영문자와 숫자로만 입력해주세요.", code: 150, return: true},
                ],
                isNotNull: true,
            };
            this.prop["passwd"] = {
                selector: { key: "#passwd", val: "value" },
                constraints: [
                    { regex: /......+/, msg: "비밀번호를 6자리 이상 입력해주세요.", code: 150, return: true},
                ],
                isNotNull: true,
            };
            this.prop["newPasswd"] = {
                selector: { key: "#newPasswd", val: "value" },
                constraints: [
                    { regex: /......+/, msg: "비밀번호를 6자리 이상 입력해주세요.", code: 150, return: true},
                ],
            };
            this.prop["mebName"] = {
                selector: { key: "#mebName", val: "value" },
                constraints: [
                    { regex: /..+/, msg: "2자 이상 이름을 정확하게 입력해주세요.", code: 150, return: true}
                ],
                isNotNull: true,
            };
            this.prop["email"] = {
                selector: { key: "#email", val: "value" },
                constraints: [{ regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true}],
            };
            this.prop["hp"] = {
                selector: { key: "#email", val: "value" },
                constraints: [{ regex: /^\d{3}\d{3,4}\d{4}$/, msg: "휴대폰 번호를 정확히 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["zipcode"]    = { selector: { key: "#zipcode", val: "value" } };
            this.prop["addr1"]      = { selector: { key: "#addr1", val: "value" } };
            this.prop["addr2"]      = { selector: { key: "#addr2", val: "value" } };

            // mapping
            this.mapping = {
                cmd:            { Array: ["bind"] },
                check_Meb_id:   { create: ["valid", "bind"] },
                sto_id:         { create: ["valid", "bind"] },
                meb_idx:        { read:   ["valid", "bind"], update: ["valid", "bind"]  },
                meb_id:         { create: ["valid", "bind"], over:   ["valid", "bind"], read: ["output"]  },
                passwd:         { create: ["valid", "bind"]},
                newPasswd:      { update: ["valid", "bind"]},
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
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.over.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "OVER"; };
            p_this.read.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            p_this.update.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "UPDATE"; };
            // cbBind  :: 검사 영역 (삭제가능)
            p_this.create.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : create ");
            };
            p_this.over.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : over ");
            };
            // cbEnd
            p_this.create.cbEnd  = function(p_res) {
                var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                var result = entity["return"];

                if (result < 0) return alert("회원 등록 처리가 실패 하였습니다. Result Code : " + result);

                location.href = p_this.prop["__finishURL"] + "?meb_idx" + p_this.items["meb_id"];
            };
            p_this.over.cbEnd  = function(p_res) {
                var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                var result = entity["return"];

                if (result >= 0) return alert("중복된 아이디 입니다. Result Code : " + result);
            };
            p_this.read.cbEnd  = function(p_res) {
                var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                var result = entity["return"];

                if (result < 0) return alert("회원정보 조회가 실패하였습니다. Result Code : " + result);
            };
            p_this.update.cbEnd  = function(p_res) {
                var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                var result = entity["return"];

                if (result < 0) return alert("회원 수정 처리가 실패 하였습니다. Result Code : " + result);
                
                alert("회원정보가 수정되었습니다.");
                p_this.read.execute();
            };
        }
        util.inherits(MemberCreateService, _super);
    
        // 데코레이션 메소드
        MemberCreateService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $("#btn_create").click(function () {
                p_this.create.execute();
            });
            $("#btn_ID_Check").click(function () {
                p_this.over.execute();
            });
            $("#btn_update").click(function () {
                p_this.update.execute();
            });
        };
        // MemberCreateService.prototype.preCheck = function(p_this) {
        //     if (BaseService.prototype.preCheck.call(this, p_this)) {
        //         if (true || p_this.checkSelector()) {       // 셀렉터검사 비활성화
        //         console.log("preCheck : 선택자 검사 => 'Success' ");
        //             return true;
        //         }
        //     }
        //     return false;
        // };
        // MemberCreateService.prototype.preReady = function(p_this) {
        //     BaseService.prototype.preReady.call(this, p_this);
        // };

        return MemberCreateService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.MemberCreateService = MemberCreateService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));