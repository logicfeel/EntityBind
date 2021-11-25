/**
 * @namespace _W.Meta.Bind.OrderListService
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
    if (typeof PageView === "undefined") throw new Error("[PageView] module load fail...");     // 전역에 선언됨
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var page = new PageView("page", 10);

    var OrderListService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function OrderListService(p_this) {
            _super.call(this);

            var _this = this;
            
            // command 생성
            p_this.list         = new BindCommandLookupAjax(p_this, p_this._baseEntity);

            // 내부 속성 설정
            p_this.prop["__isGetLoad"] = true;  // 페이지 연결방식 
            p_this.prop["__listURL"] = "";
            // 모델 속성
            this.prop["cmd"] = "LIST";
            this.prop["state_cd"] = "";
            this.prop["state_arr"] = {
                getter: function() { 
                    var state_arr = ",";

                    $("input:checkbox[name='deli_state']").each(function(){
                        if($(this).is(":checked") == true) {
                            state_arr += $(this).val() + ",";
                        }
                    });
                    return state_arr;
                },
            };
            this.prop["keyword"] = {
                getter: function() { return $("#keyword").val(); },
            };
            this.prop["page_size"] = {
                getter: function() { return page.page_size; }
            };
            this.prop["page_count"] = {
                getter: function() { return page.page_count; } 
            };
            this.prop["sort_cd"] = "";
            // mapping
            this.mapping = {
                cmd:            { Array: ["bind"] },
                state_cd:       { list: ["valid", "bind"] },
                state_arr:      { list: ["valid", "bind"] },
                keyword:        { list: ["valid", "bind"] },
                page_size:      { list: ["valid", "bind"] },
                page_count:     { list: ["valid", "bind"] },
                sort_cd:        { list: ["valid", "bind"] },
            };

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // cbBind
            p_this.list.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : list ");
            };
            // cbOutput
            var template                = Handlebars.compile( $("#list-template").html() );
    
            Handlebars.registerHelper('date_cut', function (p_date) {
                return p_date.substring(0, 10);
            });
            Handlebars.registerHelper('comma_num', function (p_nmber) {
                return numberWithCommas(p_nmber) + " 원";
            });
            Handlebars.registerHelper('code_br', function (p_text, p_code) {
                return new Handlebars.SafeString(p_text.replace(p_code, '<br>'));
            });
            Handlebars.registerHelper("bold", function(text) {
            var result = "<b>" + Handlebars.escapeExpression(text) + "</b>";
            return new Handlebars.SafeString(result);
            });
            p_this.list.cbOutput  = function(p_entity) {
                var row_total   = p_entity.table["row_total"];

                $("#totalView").html(row_total);
                $("#list-body").html("");
                $('#list-body').append( template(p_entity.table) );
                $("#CPage").html(page.parser(row_total));
            };
            // cbEnd
            p_this.list.cbEnd  = function(p_res) {
                var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                var result = entity["return"];

                if (result < 0) return alert("조회 처리가 실패 하였습니다. Code : " + result);
            };
        }
        util.inherits(OrderListService, _super);
    
        // 데코레이션 메소드
        OrderListService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);

            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            $("#keyword").val( decodeURI(getArgs("" /*서버측값*/, getParamsToJSON(location.href).keyword )) );        
            page.page_count = Number( getArgs("" /*서버측값*/, getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_this.prop["__isGetLoad"] === true) {
                // page.callback = goPage;                                  // 2-1) GET 방식     
                page.callback = page.goPage.bind(p_this.list.bind);         // 2-2) GET 방식 (bind)    
            } else {
                page.callback = p_this.list.execute.bind(p_this.list);      // 1) 콜백 방식
            }

            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $("#btn_Search").click(function () {
                page.page_count = 1;
                bm.list.execute();
            });
            $("#btn_Reset").click(function () {
                $("form").each(function() {
                    this.reset();
                });
            });
            $("#page_size").change(function () {
                page.page_size = $("#page_size").val();
                page.page_count = 1;
                bm.list.execute();
            });
        };
        OrderListService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        OrderListService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return OrderListService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.OrderListService = OrderListService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));