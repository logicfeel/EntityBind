/**
 * @namespace _W.Meta.Bind.MemberMypageService
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
    var MemberMypageService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function MemberMypageService(p_this) {
            _super.call(this);

            var _this = this;
            
            //--------------------------------------------------------------
	        // 1. Command 정의 및 생성
            p_this.read_point         = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 포인트 조회
            p_this.read_state         = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 주문상테 조회
            p_this.list_order         = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 주문 목록
            p_this.create_opinion     = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 한줄평
            //--------------------------------------------------------------    
	        // 2. 객체 설정 (등록)
            p_this.baseUrl              = "/Front/frt_mod/ORD/Order_User.C.asp";
            p_this.read_point.url       = "/Front/frt_mod/POT/Point_Member.C.asp";
            bm.create_opinion.url       = "/Front/frt_mod/PRT/Opinion.C.asp";
            //--------------------------------------------------------------    
	        // 3. 아이템 등록 및 설정(추가)
            this.prop["cmd"] = "";
            this.prop["meb_idx"] = "";
            this.prop["total_it"] = { setter: function(val) { return $("#total_it").text(numberWithCommas(val)); }, };
            this.prop["state_PW"] = { setter: function(val) { return $("#state_PW").text(val); }, };
            this.prop["state_PC"] = { setter: function(val) { return $("#state_PC").text(val + "건"); }, };
            this.prop["state_RF"] = { setter: function(val) { return $("#state_RF").text(val + "건"); }, };
            this.prop["state_PF"] = { setter: function(val) { return $("#state_PF").text(val); }, };
            this.prop["state_DK"] = { setter: function(val) { return $("#state_DK").text(val); }, };
            this.prop["state_DR"] = { setter: function(val) { return $("#state_DR").text(val); }, };
            this.prop["state_DS"] = { setter: function(val) { return $("#state_DS").text(val); }, };
            this.prop["state_DF"] = { setter: function(val) { return $("#state_DF").text(val); }, };
            this.prop["state_TF"] = { setter: function(val) { return $("#state_TF").text(val + "건"); }, };
            this.prop["page_size"] = "0";
            // this.prop["prt_id"] =  {
            //     constraints: [ { regex: /.+/, msg: "상품코드 정보가 없습니다. (관리자에게 문의 바랍니다.)", code: 150, return: true},],
            //     isNotNull: true,
            // };
            this.prop["grade_cd"] = {
                constraints: [ { regex: /.+/, msg: "점수를 선택해주세요.", code: 150, return: true},],
                isNotNull: true,
            };
            this.prop["ord_id"] = "";
            this.prop["contents"] = {
                constraints: [ { regex: /.+/, msg: "한줄을 입력해주세요.", code: 150, return: true},],
                isNotNull: true,
            };
            // mapping
            this.mapping = {
                cmd:            { Array: ["bind"] },    // 전역설정
                meb_idx:    { 
                    read_point: ["bind"],      
                    read_state: ["bind"],      
                    list_order: ["bind"],      
                    create_opinion: ["bind"], 
                },
                total_it:       { read_point: ["output"] },
                state_PW:       { read_state: ["output"] },
                state_PC:       { read_state: ["output"] },
                state_RF:       { read_state: ["output"] },
                state_PF:       { read_state: ["output"] },
                state_DK:       { read_state: ["output"] },
                state_DR:       { read_state: ["output"] },
                state_DS:       { read_state: ["output"] },
                state_DF:       { read_state: ["output"] },
                state_TF:       { read_state: ["output"] },
                page_size:      { list_order: ["bind"] },
                grade_cd:       { create_opinion: ["valid", "bind"] },
                ord_id:         { create_opinion: ["bind"] },
                contents:       { create_opinion: ["valid", "bind"] },

            };

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.read_point.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };          // Point.C.asp
            p_this.read_state.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "READ_STATE"; };    // OrderUser.C.asp
            p_this.list_order.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };          // OrderUser.C.asp
            p_this.create_opinion.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE_ORDER"; };
            // cbBind  :: 검사 영역 (삭제가능)
            p_this.read_point.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : read_point ");
            };

            p_this.read_state.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : read_state ");
            };
            p_this.list_order.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : list_order ");
            };
            p_this.create_opinion.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : create_opinion ");
            };
            // cbOutput
            var template                = Handlebars.compile( $("#list-template").html() );

            Handlebars.registerHelper('date_cut', function (p_date) {
                return p_date.substring(0, 10);
            });
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
            p_this.list_order.cbOutput  = function(p_entity) {
                var row_total   = p_entity.table["row_total"];
                var entity = p_entity.table;

                $("#totalView").html(row_total);
                $("#list-body").html("");
                $('#list-body').append( template(p_entity.table) );

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
            p_this.create_opinion.cbEnd  = function(p_res) {
                var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                var result = entity["return"];

                if (result < 0) return alert("등록 처리가 실패 하였습니다. Result Code : " + result);
                
                alert("한줄평이 등록되었습니다.");
                p_this.list_order.execute();
            };
            //--------------------------------------------------------------    
            // 5. 이벤트 등록

        }
        util.inherits(MemberMypageService, _super);
    
        // 데코레이션 메소드  (빼도 동작에 상관없음)
        // MemberMypageService.prototype.preRegister = function(p_this) {
        //     BaseService.prototype.preRegister.call(this, p_this);
        // };
        // MemberMypageService.prototype.preCheck = function(p_this) {
        //     if (BaseService.prototype.preCheck.call(this, p_this)) {
        //         if (p_this.checkSelector()) {
        //         console.log("preCheck : 선택자 검사 => 'Success' ");
        //             return true;
        //         }
        //     }
        //     return false;
        // };
        // MemberMypageService.prototype.preReady = function(p_this) {
        //     BaseService.prototype.preReady.call(this, p_this);
        // };

        return MemberMypageService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.MemberMypageService = MemberMypageService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));