/**
 * @namespace _W.Meta.Bind.OrderUserService
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
    var OrderUserService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function OrderUserService(p_this) {
            _super.call(this);

            // command 생성
            p_this.read_state       = new BindCommandLookupAjax(p_this);    // 주문상테 조회
            p_this.list             = new BindCommandLookupAjax(p_this);    // 주문 목록
            p_this.create_opinion   = new BindCommandEditAjax(p_this);      // 한줄평

            // 모델 속성 설정
            p_this.read_state.outputOption = 3;
            p_this.baseUrl              = "/Front/frt_mod/ORD/Order_User.C.asp";
            p_this.create_opinion.url   = "/Front/frt_mod/PRT/Product_Opinion.C.asp";

            // prop 속성 설정
            this.prop = {
                // bind
                cmd:            "",
                meb_idx:        "",
                state_PW:       { selector: { key: "#state_PW",       type: "text" } },
                state_PC:       { selector: { key: "#state_PC",       type: "text" } },
                state_RF:       { selector: { key: "#state_RF",       type: "text" } },
                state_PF:       { selector: { key: "#state_PF",       type: "text" } },
                state_DK:       { selector: { key: "#state_DK",       type: "text" } },
                state_DR:       { selector: { key: "#state_DR",       type: "text" } },
                state_DS:       { selector: { key: "#state_DS",       type: "text" } },
                state_DF:       { selector: { key: "#state_DF",       type: "text" } },
                state_TF:       { selector: { key: "#state_TF",       type: "text" } },
                page_size:      0,
                grade_cd:       { constraints: { regex: /.+/, msg: "점수를 선택해주세요.", code: 150, return: true} },
                ord_id:         "",
                contents:       { constraints: { regex: /.+/, msg: "한줄을 입력해주세요.", code: 150, return: true} }
            };
            // mapping 설정
            this.mapping = {
                cmd:            { Array: ["bind"] },    // 전역설정
                meb_idx:    { 
                    read_state: ["bind"],      
                    list: ["bind"],      
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
                ord_id:         { create_opinion:   ["bind"] },
                contents:       { create_opinion:   ["valid", "bind"] },
            };

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.read_state.onExecute     = function(p_bindCommand) { p_this.items["cmd"].value = "READ_STATE"; };    // OrderUser.C.asp
            p_this.list.onExecute           = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };          // OrderUser.C.asp
            p_this.create_opinion.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE_ORDER"; };
            // cbOutput
            var template = null;
            p_this.list.cbOutput  = function(p_entity) {
                var row_total   = p_entity["row_total"];
                if ( template === null) {
                    template    = Handlebars.compile( $("#list-template").html() );

                    Handlebars.registerHelper('comma_num', function (p_nmber) {
                        return numberWithCommas(p_nmber);
                    });
                    Handlebars.registerHelper("if", function(conditional, options) {
                        if (conditional) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                    });
                }
                $("#totalView").html(row_total);
                $("#list-body").html("");
                $('#list-body').append( template(p_entity) );

                // 이벤트 등록
                $(".btn_opinion").click(function(e) {
                    var row_count = $(this).attr("row_count");
                    
                    $("#area_opinion_" + row_count).css("display", "");
                });
                $(".btn_qna_write").click(function(e) {
                    var row_count = $(this).attr("row_count");
                    
                    p_this.items["grade_cd"].value  = $("#grade_cd_" + row_count).val();
                    p_this.items["ord_id"].value    = $("#ord_id_" + row_count).val();
                    p_this.items["contents"].value  = $("#contents_" + row_count).val();
                    p_this.create_opinion.execute();
                });
            };
            // cbEnd
            p_this.create_opinion.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("등록 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                
                alert("한줄평이 등록되었습니다.");
                p_this.list.execute();
            };
        }
        util.inherits(OrderUserService, _super);
    
        // 데코레이션 메소드  (빼도 동작에 상관없음)
        OrderUserService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
        };
        OrderUserService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        // OrderUserService.prototype.preReady = function(p_this) {
        //     BaseService.prototype.preReady.call(this, p_this);
        // };

        return OrderUserService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.OrderUserService = OrderUserService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));