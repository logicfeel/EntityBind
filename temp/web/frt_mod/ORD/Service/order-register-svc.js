/**
 * @namespace _W.Meta.Bind.OrderRegisterService
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
    var OrderRegisterService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function OrderRegisterService(p_this) {
            _super.call(this);

            var _this = this;
            
            // command 생성
            p_this.create    = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 임시 주문 등록
            p_this.finish    = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 주문 완료
            
            p_this.baseUrl   = "/Front/frt_mod/ORD/Order_Register.C.asp";

            // prop 속성 설정
            this.prop = {
                cmd:            "",
                crt_idx:        { 
                    selector:       { key: "#crt_idx",       type: "value" } 
                },
                order_mn:       { 
                    selector:       { key: "#order_mn",      type: "value" },
                    constraints:    { regex: /\D/, msg: "결제금액은 숫자만 입력해야함", code: 150, return: false},
                },
                orderName:      { 
                    selector:       { key: "#orderName",      type: "value" },
                    constraints:    { regex: /./, msg: "주문자명을 입력해주세요.", code: 150, return: true}, 
                },
                orderTel:       { 
                    selector:       { key: "#orderTel",       type: "value" },
                    constraints:    { regex: /^\d{3}-?\d{3,4}-?\d{4}$/, msg: "휴대폰 번호를 정확히 입력해주세요.", code: 150, return: true}, 
                },
                email:          { 
                    selector:       { key: "#email",       type: "value" },
                    constraints:    { 
                        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 
                        msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true 
                    },
                    isNullPass: true,
                },
                recipient:      { 
                    selector:       { key: "#recipient",     type: "value" },
                    constraints:    { regex: /./, msg: "받으시는분 입력해주세요.", code: 150, return: true },
                },
                zipcode:        { 
                    selector:       { key: "#zipcode",       type: "value" },
                    constraints:    { regex: /./, msg: "우편번호를 입력해주세요.", code: 150, return: true },
                },
                addr1:          { 
                    selector:       { key: "#addr1",       type: "value" },
                    constraints:    { regex: /./, msg: "주소를 입력해주세요.", code: 150, return: true }, 
                },
                addr2:          { 
                    selector:       { key: "#addr2",       type: "value" },
                    constraints:    { regex: /./, msg: "주소를 입력해주세요.", code: 150, return: true },
                },
                tel:            { 
                    selector:       { key: "#tel",       type: "value" },
                    constraints:    { regex: /^\d{3}-?\d{3,4}-?\d{4}$/, msg: "받으시는분 연락처 정확히 입력해주세요.", code: 150, return: true },
                },
                memo:           { 
                    selector:       { key: "#memo",       type: "value" } 
                },
                choice_cd:      { 
                    selector:       { key: "#choice_cd",       type: "value" } 
                },
                pay_method_cd:  { 
                    selector:       { key: "input[name=method_cd]:checked",       type: "value" },
                    constraints:    { regex: /[PB]/, msg: "결제 수단을 선택해 주세요.", code: 150, return: true },
                },
                pay_mn:         { 
                    selector:       { key: "#order_mn",       type: "value" } 
                },
                ord_id:         "",
                pg_yn:          "",
                bak_idx:        { 
                    selector:       { key: "#bak_idx",       type: "value" },
                    constraints:    { regex: /\d+/, msg: "입금은행을 선택해 주세요.", code: 150, return: true},
                },
                depositor:      { 
                    selector:       { key: "#depositor",       type: "value" },
                    constraints:    { regex: /./, msg: "입금자명을 입력해 주세요.", code: 150, return: true},
                },
            };
            // mapping
            this.mapping = {
                cmd:            { Array: ["bind"] },    // 전역설정
                crt_idx:        { create: ["valid", "bind"] },
                order_mn:       { create: ["valid", "bind"] },
                orderName:      { create: ["valid", "bind"] },
                orderTel:       { create: ["valid", "bind"] },
                email:          { create: ["valid", "bind"] },
                recipient:      { create: ["valid", "bind"] },
                zipcode:        { create: ["valid", "bind"] },
                addr1:          { create: ["valid", "bind"] },
                addr2:          { create: ["valid", "bind"] },
                tel:            { create: ["valid", "bind"] },
                memo:           { create: "bind" },
                choice_cd:      { create: ["valid", "bind"] },
                pay_mn:         { create: ["valid", "bind"] },
                pay_method_cd:  { create: ["valid", "bind"] },
                ord_id:         { finish: ["valid", "bind"] },
                pg_yn:          { finish: "bind" }
            };
            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.finish.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "FINISH"; };
            // cbEnd
            p_this.create.cbEnd  = function(p_entity) {
                if (p_entity["result"] < 0) return alert(" 임시 주문 등록 처리가 실패 하였습니다. Result Code : " + p_entity["result"]);
            };
            p_this.finish.cbEnd  = function(p_res) {
                if (p_entity["result"] < 0) return alert("주문완료 처리가 실패 하였습니다. Result Code : " + p_entity["result"]);

                p_this.list.execute();
            };
        }
        util.inherits(OrderRegisterService, _super);
    
        // 데코레이션 메소드
        OrderRegisterService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $("#btn_order").click(function () {
                if (p_this.items["pay_method_cd"].value === "B") {
                    p_this.create.setItem(["bak_idx", "depositor"], ["valid", "bind"]);
                } else {
                    // 아이템 해제
                    p_this.create.release(["bak_idx", "depositor"]);
                }
                p_this.create.execute();
            });
        };
        OrderRegisterService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                }
            }
            return true;
        };
        // OrderRegisterService.prototype.preReady = function(p_this) {
        //     BaseService.prototype.preReady.call(this, p_this);
        // };

        return OrderRegisterService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.OrderRegisterService = OrderRegisterService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));