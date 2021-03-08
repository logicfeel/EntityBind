/**
 * @namespace _W.Meta.Bind.ProductSearchService
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
    // var accountFrmURL;          // 수정화면 경로(참조)

    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseService === "undefined") throw new Error("[BaseService] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof PageView === "undefined") throw new Error("[PageView] module load fail...");     // 전역에 선언됨
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var page = new PageView("page", 12);

    var ProductSearchService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductSearchService(p_this) {
            _super.call(this, p_this);
            
            var _this = this;

            // command 생성
            p_this.list     = new BindCommandLookupAjax(p_this, p_this._baseEntity);
            
            // 모델 속성 설정
            p_this.baseUrl = "/Front/frt_mod/PRT/Product_DisplayProduct.C.asp";

            // prop 설정
            this.prop = {
                // inner 속성
                __isGetLoad:    true,
                __frmURL:       "",
                // view 속성
                _list_template: { selector: { key: "#list-template",            type: "html" } },
                _list_body:     { selector: { key: "#list-body",                type: "html" } },
                _totalView:     { selector: { key: "#totalView",                type: "html" } },
                _CPage:         { selector: { key: "#CPage",                    type: "html" } },
                // mapping 속성
                cmd:            "",
                keyword:        { selector: { key: "#keyword",                  type: "val" } },
                page_size:      {
                    getter : function() { return page.page_size; },
                    setter : function(val) { page.page_size = val; }
                },
                page_count:      {
                    getter: function() { return page.page_count; },
                    setter: function(val) { page.page_count = val; }
                },
                sort_cd:        "",
            };
            // mapping
            this.mapping = {
                cmd:            { Array:    "bind" },
                keyword:        { list:     "bind" },   
                page_size:      { list:     "bind" },   
                page_count:     { list:     "bind" },   
                sort_cd:        { list:     "bind" },   
            };
            //--------------------------------------------------------------
            // 4. 콜백 함수 구현
            // onExecute
            p_this.list.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "SEARCH"; };
            // cbEnd
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패하였습니다. Result Code : " + p_entity["return"]);
            };
        }
        util.inherits(ProductSearchService, _super);
    
        // 데코레이션 메소드
        ProductSearchService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            //--------------------------------------------------------------
            // 4. 콜백 함수 구현
            // cbOutput
            var template;
            
            if (typeof this.items["_list_template"].value !== "undefined") {
                template = Handlebars.compile( this.items["_list_template"].value );
            }
            Handlebars.registerHelper('comma_num', function (p_nmber) {
                return numberWithCommas(p_nmber);
            });
            p_this.list.cbOutput  = function(p_entity) {
                var row_total   = p_entity["row_total"];

                p_this.items["_totalView"].value = row_total;
                p_this.items["_list_body"].value = template(p_entity);
                p_this.items["_CPage"].value = page.parser(row_total);
            };
            //--------------------------------------------------------------    
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_this.items["keyword"].value = decodeURI(getArgs("" /*서버측값*/, getParamsToJSON(location.href).keyword ));
            page.page_count = Number( getArgs("" /*서버측값*/, getParamsToJSON(location.href).page_count, page.page_count) );
            //--------------------------------------------------------------    
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
            $("#btn_Reset").click(function () {
                $("form").each(function() {
                    this.reset();
                });
            });
            $("#btn_Insert").click(function () {
                var regURL = p_this.prop["__regURL"];

                location.href = regURL + "?mode=CREATE";
            });    
            $("#page_size").change(function () {
                page.page_size = $("#page_size").val();
                page.page_count = 1;
                p_this.list.execute();
            });

        };
        ProductSearchService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                } 
            }
            return true;
        };

        return ProductSearchService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.ProductSearchService = ProductSearchService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));