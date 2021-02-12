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
            p_this.create       = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 회원가입
            p_this.over         = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 아이디 중복 확인  REVIEW:: SP흐름이 모호함
            
            // 내부 속성 설정
            this.prop["__finishURL"] = "finish.asp";
            
            // 셀렉터 검사 임의 지정
            // this.prop["__checkSelectorList"] = { 
            //     selector: [
            //         function() { return p_this.prop["__list_template"] },
            //         function() { return p_this.prop["__list_body"] },
            //     ]
            // };
            // 모델 속성
            // this.prop["check_Meb_id"] = {
            //     selector: "#meb_id",
            //     getter: function() { return $("#check_Meb_id").val(); },
            //     constraints: [
            //         { regex: /\D/, msg: "아이디 중복검사를 먼저해주세요.", code: 150, return: false},
            //     ]
            // };

            this.prop["sto_id"] = "S00001";
            this.prop["meb_id"] = {
                selector: "#meb_id",
                getter: function() { return $("#meb_id").val(); },
                constraints: [
                    { regex: /......+/, msg: "아이디를 6자리 이상 입력해주세요.", code: 150, return: true},
                    { regex: /^[a-z]+[a-z0-9]{5,19}$/g, msg: "영문자와 숫자로만 입력해주세요.", code: 150, return: true},
                ],
                isNotNull: true,
            };
            this.prop["passwd"] = {
                selector: "#passwd",
                getter: function() { return $("#passwd").val(); },
                constraints: [
                    { regex: /......+/, msg: "비밀번호를 6자리 이상 입력해주세요.", code: 150, return: true},
                ],
                isNotNull: true,
            };
            this.prop["mebName"] = {
                selector: "#mebName",
                getter: function() { return $("#mebName").val(); },
                constraints: [
                    { regex: /..+/, msg: "2자 이상 이름을 정확하게 입력해주세요.", code: 150, return: true}
                ],
                isNotNull: true,
            };
            this.prop["nickname"] = {       // REVIEW:: 닉네임으로 임의 변경해서 사용함 email 추가해야함
                selector: "#email",
                getter: function() { return $("#email").val(); },
                constraints: [{ regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true}],
            };
            this.prop["hp"] = {
                selector: "#hp",
                getter: function() { return $("#hp").val(); },
                constraints: [{ regex: /^\d{3}\d{3,4}\d{4}$/, msg: "휴대폰 번호를 정확히 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["zipcode"] = {
                selector: "#zipcode",
                getter: function() { return $("#zipcode").val(); },
            };
            this.prop["addr1"] = {
                selector: "#addr1",
                getter: function() { return $("#addr1").val(); },
            };
            this.prop["addr2"] = {
                selector: "#addr2",
                getter: function() { return $("#addr2").val(); },
            };

            // mapping
            this.mapping = {
                check_Meb_id:   { create: ["valid", "bind"] },
                sto_id:         { create: ["valid", "bind"] },
                meb_id:         { create: ["valid", "bind"], over:   ["valid", "bind"] },
                passwd:         { create: ["valid", "bind"] },
                mebName:        { create: ["valid", "bind"] },
                nickname:       { create: ["valid", "bind"] },
                hp:             { create: ["valid", "bind"] },
                zipcode:        { create: ["valid", "bind"] },
                addr1:          { create: ["valid", "bind"] },
                addr2:          { create: ["valid", "bind"] },
            };
        }
        util.inherits(MemberCreateService, _super);
    
        // 데코레이션 메소드
        MemberCreateService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.over.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "OVER"; };
            // cbBind  :: 검사 영역 (삭제가능)
            if (typeof p_this.create !== "undefined" && p_this.create.cbBind === null) {
                p_this.create.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : create ");
                };
            }
            if (typeof p_this.over !== "undefined" && p_this.over.cbBind === null) {
                p_this.over.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : over ");
                };
            }
            // cbEnd
            if (typeof p_this.create !== "undefined" && p_this.create.cbEnd === null) {
                p_this.create.cbEnd  = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result < 0) return alert("회원 등록 처리가 실패 하였습니다. Result Code : " + result);

                    location.href = p_this.prop["__finishURL"] + "?meb_idx" + p_this.items["meb_id"];
                };
            }
            if (typeof p_this.over !== "undefined" && p_this.over.cbEnd === null) {
                p_this.over.cbEnd  = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result >= 0) return alert("중복된 아이디 입니다. Result Code : " + result);
                };
            }
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $("#btn_create").click(function () {
                p_this.create.execute();
            });
            $("#btn_ID_Check").click(function () {
                p_this.over.execute();
            });
        };
        MemberCreateService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        MemberCreateService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

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