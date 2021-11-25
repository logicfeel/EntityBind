/**
 * @namespace _W.Meta.Bind.OpinionService
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
    var BindCommandEditAjax     =_W.Meta.Bind.BindCommandEditAjax;
    
    
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
    var page = new PageView("page", 5);

    var OpinionService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function OpinionService(p_this) {
            _super.call(this);
            
            var _this = this;

            // command 생성
            p_this.list         = new BindCommandLookupAjax(p_this, p_this._baseEntity);
            p_this.create       = new BindCommandEditAjax(p_this, p_this._baseEntity);      // 한줄평
            // 내부 속성 설정
            p_this.prop["__isGetLoad"] = true;  // 페이지 연결방식 
            p_this.prop["__frmURL"] = "";
            p_this.prop["__keyword"] = "#keyword";
            p_this.prop["__opinion_list_template"] = "#opinion-list-template";
            p_this.prop["__opinion_list_body"] = "#opinion-list-body";
            p_this.prop["__CPage"] = "#CPage";
            p_this.prop["__checkSelectors"] = {     // 셀렉터 검사 임의 지정
                selector: [
                    function() { return p_this.prop["__opinion_list_template"] },
                    function() { return p_this.prop["__opinion_list_body"] },
                    function() { return p_this.prop["__CPage"] },
                ]
            };
            // 콜백 속성
            this.prop["cmd"] = "";
            // 모델 속성
            this.prop["prt_id"] = "";
            this.prop["page_size"]  = {
                getter : function() { return page.page_size; },
                setter : function(val) { page.page_size = val; }
            };
            this.prop["page_count"] = {
                getter: function() { return page.page_count; },
                setter: function(val) { page.page_count = val; }
            };
            this.prop["keyword"] = { 
                caption: "검색어",
                selector: function() { return p_this.prop["__keyword"]; },
                getter: function() { return $(p_this.prop["__keyword"]).val();}
            };
            this.prop["sort_cd"] = "";
            // 레코드
            // mapping
            this.mapping = {
                cmd:            { Array: ["bind"] },    // 전역설정
                prt_id:         { list: "bind"},
                keyword:        { list: "bind"},
                page_size:      { list: "bind"},
                page_count:     { list: "bind"},
                sort_cd:        { list: "bind"},
            };
            //--------------------------------------------------------------    
            // 2. 객체 설정 (등록)
            p_this.baseUrl = "/Front/frt_mod/PRT/Opinion.C.asp";

            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.list.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };

            // cbBind
            p_this.list.cbBind   = function(p_ajaxSetup) {
                console.log("cbBind : list ");
            };
            // cbEnd
            p_this.list.cbEnd  = function(p_res) {
                var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                var result = entity["return"];

                if (result < 0) return alert("조회 처리가 실패 하였습니다. Code : " + result);
            };
            // cbOutput
            var template                = Handlebars.compile( $("#opinion-list-template").html() );
            Handlebars.registerHelper('date_cut', function (p_date) {
                return p_date.substring(0, 10);
            });
            Handlebars.registerHelper('grade_mark', function (p_date) {
                var mark = "";
                p_date = typeof p_date !== "number" ? p_date : 5;

                for (var i = 0; p_date > i; i++) {
                    mark += "★";
                }
                return mark;
            });
            // ★
            p_this.list.cbOutput  = function(p_entity) {
                var row_total   = p_entity.table["row_total"];

                $("#totalView").html(row_total);
                $("#opinion-list-body").html("");
                $('#opinion-list-body').append( template(p_entity.table) );
                $("#CPage").html(page.parser(row_total));
            };

        }
        util.inherits(OpinionService, _super);
    
        // 데코레이션 메소드
        OpinionService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            //--------------------------------------------------------------    
            // 2. 객체 설정 (등록)
            var keyword = this.prop["__keyword"];

            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            $(keyword).val( decodeURI(getArgs("" /*서버측값*/, getParamsToJSON(location.href).keyword )) );        
            page.page_count = Number( getArgs("" /*서버측값*/, getParamsToJSON(location.href).page_count, page.page_count) );
            // TODO:: 외부 검사 추가 필요 또는 _W.Util 에 추가 여부 : getArgs(), getParamsToJSON()

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
                p_this.list.execute();
            });
            $("#page_size").change(function () {
                page.page_size = $("#page_size").val();
                page.page_count = 1;
                p_this.list.execute();
            });

        };
        OpinionService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        OpinionService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return OpinionService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.OpinionService = OpinionService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));