/**
 * @namespace _W.Meta.Bind.OrderCreateService
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
    var OrderCreateService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function OrderCreateService(p_this) {
            _super.call(this);

            var _this = this;
            
            // command 생성
            p_this.create    = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 임시 주문 등록
            p_this.finish       = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 주문 완료
            
            // 내부 속성 설정
            // this.prop["__list_body"] ="#cart-list-body";
            // this.prop["__orderURL"] = "order.asp";
            
            // 셀렉터 검사 임의 지정
            // this.prop["__checkSelectorList"] = { 
            //     selector: [
            //         function() { return p_this.prop["__list_template"] },
            //         function() { return p_this.prop["__list_body"] },
            //     ]
            // };
            // 모델 속성
            this.prop["crt_idx"] = "";
            this.prop["crt_idx"] = {
                getter: function() { return $("#crt_idx").val(); } 
            };
            this.prop["order_mn"] = {
                selector: "#order_mn",
                getter: function() { return $("#order_mn").val(); },
                constraints: [{ regex: /\D/, msg: "결제금액은 숫자만 입력해야함", code: 150, return: false}],
                isNotNull: true,
            };
            this.prop["orderName"] = {
                selector: "#orderName",
                getter: function() { return $("#orderName").val(); },
                constraints: [{ regex: /./, msg: "주문자명을 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["orderTel"] = {
                selector: "#orderTel",
                getter: function() { return $("#orderTel").val(); },
                constraints: [{ regex: /^\d{3}-?\d{3,4}-?\d{4}$/, msg: "휴대폰 번호를 정확히 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["email"] = {
                selector: "#email",
                getter: function() { return $("#email").val(); },
                constraints: [{ 
                    regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, 
                    msg: "이메일 형식을 맞지 않습니다.", code: 150, return: true}
                ],
            };            
            this.prop["recipient"] = {
                selector: "#recipient",
                getter: function() { return $("#recipient").val(); },
                constraints: [{ regex: /./, msg: "받으시는분 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["zipcode"] = {
                selector: "#zipcode",
                getter: function() { return $("#zipcode").val(); },
                constraints: [{ regex: /./, msg: "우편번호를 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["addr1"] = {
                selector: "#addr1",
                getter: function() { return $("#addr1").val(); },
                constraints: [{ regex: /./, msg: "주소를 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["addr2"] = {
                selector: "#addr2",
                getter: function() { return $("#addr2").val(); },
                constraints: [{ regex: /./, msg: "주소를 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["tel"] = {
                selector: "#tel",
                getter: function() { return $("#tel").val(); },
                constraints: [{ regex: /^\d{3}-?\d{3,4}-?\d{4}$/, msg: "받으시는분 연락처 정확히 입력해주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["memo"] = {
                getter: function() { return $("#memo").val(); }
            };
            this.prop["choice_cd"] = {
                getter: function() { return $("#choice_cd").val(); }
            };

            this.prop["pay_method_cd"] = {
                getter: function() { return $("input[name=method_cd]:checked").val(); },
                constraints: [{ regex: /[PB]/, msg: "결제 수단을 선택해 주세요.", code: 150, return: true}],
                isNotNull: true,
            };

            this.prop["pay_mn"] = {
                getter: function() { return $("#order_mn").val(); }     // REVIEW:: 포인트 사용시 변경해야함
            };

            this.prop["ord_id"] = "";
            this.prop["pg_yn"]  = "";
            
            this.prop["bak_idx"] = {
                getter: function() { return $("#bak_idx").val(); },
                constraints: [{ regex: /\d+/, msg: "입금은행을 선택해 주세요.", code: 150, return: true}],
                isNotNull: true,
            };
            this.prop["depositor"] = {
                getter: function() { return $("#depositor").val(); },
                constraints: [{ regex: /./, msg: "입금자명을 입력해 주세요.", code: 150, return: true}],
                isNotNull: true,
            };

            // mapping
            this.mapping = {
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
        }
        util.inherits(OrderCreateService, _super);
    
        // 데코레이션 메소드
        OrderCreateService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.finish.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "FINISH"; };

            // cbBind  :: 검사 영역 (삭제가능)
            if (typeof p_this.create !== "undefined" && p_this.create.cbBind === null) {
                p_this.create.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : create ");
                };
            }
            if (typeof p_this.finish !== "undefined" && p_this.finish.cbBind === null) {
                p_this.finish.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : finish ");
                };
            }
            // cbEnd
            if (typeof p_this.create !== "undefined" && p_this.create.cbEnd === null) {
                p_this.create.cbEnd  = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result < 0) return alert(" 임시 주문 등록 처리가 실패 하였습니다. Result Code : " + result);
                };
            }
            if (typeof p_this.finish !== "undefined" && p_this.finish.cbEnd === null) {
                p_this.finish.cbEnd  = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];

                    if (result >= 0) return alert("주문완료 처리가 실패 하였습니다. Result Code : " + result);

                    p_this.list.execute();
                };
            }

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
        OrderCreateService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        OrderCreateService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return OrderCreateService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.OrderCreateService = OrderCreateService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));