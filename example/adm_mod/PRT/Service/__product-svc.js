/**
 * @namespace _W.Meta.Bind.ProductService
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

    var ProductService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductService(p_this, p_suffix) {
            _super.call(this, p_this);
            
            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;

            // command 생성
            p_this.create   = new BindCommandEditAjax(p_this);
            p_this.read     = new BindCommandLookupAjax(p_this);
            p_this.update   = new BindCommandEditAjax(p_this);
            p_this.delete   = new BindCommandEditAjax(p_this);
            p_this.list     = new BindCommandLookupAjax(p_this);
            
            // 모델 속성 설정
            p_this.baseUrl      = "/Admin/adm_mod/PRT/Product.C.asp";
            p_this.read.outputOption = 3;

            // prop 속성 설정
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      "",
                __formUrl:      "",
                __mode:         getParamsToJSON(location.href).mode,
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ SUFF,        type: "html" } },
                _area_page:     { selector: { key: "#s-area-page"+ SUFF,        type: "html" } },
                _txt_total:     { selector: { key: "#s-total"+ SUFF,            type: "html" } },
                _btn_search:    { selector: { key: "#s-btn-search"+ SUFF,       type: "html" } },
                _btn_reset:     { selector: { key: "#s-btn-reset"+ SUFF,        type: "html" } },
                _pageSize:      { selector: { key: "#s-pageSize"+ SUFF,         type: "value" } },
                _btn_insert:    { selector: { key: "#s-btn-insert"+ SUFF,       type: "html" } },
                _btn_update:    { selector: { key: "#s-btn-update"+ SUFF,       type: "html" } },
                _btn_delete:    { selector: { key: "#s-btn-delete"+ SUFF,       type: "html" } },
                _btn_list:      { selector: { key: "#s-btn-list"+ SUFF,         type: "html" } },
                // bind
                cmd:            "",
                keyword:        { selector: { key: "#m-keyword"+ SUFF,          type: "value" } },
                page_size:      {
                    getter:         function() { return page.page_size; },
                    setter:         function(val) { page.page_size = val; }
                },
                page_count:     {
                    getter:         function() { return page.page_count; },
                    setter:         function(val) { page.page_count = val; }
                },              
                sort_cd:        "",
                prt_id:         "",
                sto_id:         "S00001",       // 단일상점
                prtName:        { 
                    selector: { key: "#m-prtName"+ SUFF,        type: "value" },
                    isNotNull: true,
                },
                type_cd:        { 
                    getter: function() { return $("input[name=m-type_cd]:checked").val(); },
                    setter: function(val) { 
                        if (val === "DE" ) $("input[name=m-type_cd][value=DE]").prop("checked", "checked");
                        if (val === "RE" ) $("input[name=m-type_cd][value=RE]").prop("checked", "checked");
                    },
                },
                state_cd:      { 
                    getter: function() { return $("input[name=m-state_cd]:checked").val(); },
                    setter: function(val) { 
                        if (val === "SS" ) $("input[name=m-state_cd][value=SS]").prop("checked", "checked");
                        if (val === "RS" ) $("input[name=m-state_cd][value=RS]").prop("checked", "checked");
                        if (val === "DS" ) $("input[name=m-state_cd][value=DS]").prop("checked", "checked");
                        if (val === "DH" ) $("input[name=m-state_cd][value=DH]").prop("checked", "checked");
                    }
                },
                stock_it:       { selector: { key: "#m-stock_it"+ SUFF,         type: "value" } },
                brd_idx:        { selector: { key: "#m-brd_idx"+ SUFF,          type: "value" } },
                recommRange:    { selector: { key: "#m-recommRange"+ SUFF,      type: "value" } },
                kind_cd:        { 
                    getter: function() { return $("input[name=m-kind_cd]:checked").val(); },
                    setter: function(val) { 
                        if (val === "XXX" ) $("input[name=m-kind_cd][value=XXX]").prop("checked", "checked");
                        if (val === "NEW" ) $("input[name=m-kind_cd][value=NEW]").prop("checked", "checked");
                        if (val === "POP" ) $("input[name=m-kind_cd][value=POP]").prop("checked", "checked");
                        if (val === "REC" ) $("input[name=m-kind_cd][value=REC]").prop("checked", "checked");
                    }
                },
                begin_dt:       { 
                    selector: { key: "#m-begin_dt"+ SUFF,     type: "value" },
                    constraints: [
                        { regex: /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/, msg: "날짜형식으로 입력해주세요 (2001-01-01) ", code: 150, return: true}
                    ],
                    isNullPass:     true

                },
                close_dt:       { 
                    selector: { key: "#m-close_dt"+ SUFF,     type: "value" },
                    constraints: [
                        { regex: /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/, msg: "날짜형식으로 입력해주세요 (2001-01-01) ", code: 150, return: true}
                    ],
                    isNullPass:     true
                },
                contents:       { selector: { key: "#m-contents"+ SUFF,     type: "value" } },
                method_cd:      { 
                    getter: function() { return $("input[name=m-method_cd]:checked").val(); },
                    setter: function(val) { 
                        if (val === "FREE" ) $("input[name=m-method_cd][value=FREE]").prop("checked", "checked");
                        if (val === "EACH" ) $("input[name=m-method_cd][value=EACH]").prop("checked", "checked");
                        if (val === "BASE" ) $("input[name=m-method_cd][value=BASE]").prop("checked", "checked");
                    }
                },
                deli_mn:        { selector: { key: "#m-deli_mn"+ SUFF,      type: "value" } },
                default_cd:     { selector: { key: "#m-default_cd"+ SUFF,   type: "value" } },  // 확장시 수정
                choice_bt:      { selector: { key: "#m-choice_bt"+ SUFF,    type: "value" } },  // 확장시 수정
                under_mn:       { selector: { key: "#m-under_mn"+ SUFF,     type: "value" } },
                underBase_mn:   { selector: { key: "#m-underBase_mn"+ SUFF, type: "value" } },
            };
            // mapping 설정
            this.mapping = {
                cmd:            { Array:    "bind" },
                // WARN:: 검색어와 내용을 같이 사용
                keyword:        { list:     "bind",             read: "output",               update: "bind",            create: "bind" },   
                page_size:      { list:     "bind" },
                page_count:     { list:     "bind" },
                sort_cd:        { list:     "bind" },
                prt_id:         { read: ["valid", "bind"],      update: ["valid", "bind"],  delete: ["valid", "bind"]  },
                sto_id:         { create: ["valid", "bind"] },
                type_cd:        { create: ["valid", "bind"],    read: "output" },
                prtName:        { create: ["valid", "bind"],    read: "output",             update: ["valid", "bind"],  delete: ["valid", "bind"] },                
                state_cd:       { create: ["valid", "bind"],    read: "output",             update: ["valid", "bind"],  delete: ["valid", "bind"] },
                begin_dt:       { read: "output",               update: ["valid", "bind"],  create: ["valid", "bind"] },
                close_dt:       { read: "output",               update: ["valid", "bind"],  create: ["valid", "bind"] },
                kind_cd:        { read: "output",               update: "bind",             create: "bind" },
                stock_it:       { read: "output",               update: "bind",             create: "bind" },
                recommRange:    { read: "output",               update: "bind",             create: "bind" },
                contents:       { read: "output",               update: "bind",             create: "bind" },
                method_cd:      { read: "output",               update: "bind",             create: "bind" },
                deli_mn:        { read: "output",               update: "bind",             create: "bind" },
            };
            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.read.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            p_this.update.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "UPDATE"; };
            p_this.delete.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "DELETE"; };
            p_this.list.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            // cbValid
            p_this.delete.cbValid   = function(p_valid) {
                return confirm("삭제 하시겠습니까.?");
            };
            // cbOutput
            var template = null;
            p_this.list.cbOutput   = function(p_entity) {
                var row_total   = p_entity["row_total"];
                
                if ( template === null) {
                    template    = Handlebars.compile( p_this.items["_temp_list"].value ); 
                    Handlebars.registerHelper('type_code', function (p_value) {
                        if (p_value === "DE") return "배송";
                        else return "기타";
                    });
                    Handlebars.registerHelper('kind_code', function (p_value) {
                        if (p_value === "NEW") return "신상";
                        if (p_value === "REC") return "추천";
                        if (p_value === "POP") return "인기";
                        return "일반"
                    });
                    Handlebars.registerHelper('state_code', function (p_value) {
                        if (p_value === "SS") return "판매(전시중)";
                        if (p_value === "RS") return "예약(전시중)";
                        if (p_value === "DS") return "재고없음(전시중)";
                        if (p_value === "DH") return "판매중지(전시중지)";
                        return ""
                    });
                }
                p_this.items["_txt_total"].value    = row_total;
                p_this.items["_area_list"].value    = template(p_entity);
                p_this.items["_area_page"].value    = page.parser(row_total);
            };
            // cbEnd
            p_this.create.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("등록 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                location.href = p_this.prop["__listUrl"];
            };
            p_this.read.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
            };
            p_this.update.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("수정 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                
                alert("수정 처리가 되었습니다.");
                // location.href = p_this.prop["__listUrl"];
                p_this.read.execute();
            };
            p_this.delete.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("삭제 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                location.href = p_this.prop["__listUrl"];
            };
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("목록조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
            };
        }
        util.inherits(ProductService, _super);
    
        // 데코레이션 메소드
        ProductService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            console.log("----------------------------------");
            // 셀랙터 얻기
            var _btn_search     = p_this.items["_btn_search"].selector.key;
            var _btn_reset      = p_this.items["_btn_reset"].selector.key;
            var _pageSize       = p_this.items["_pageSize"].selector.key;
            
            var _btn_insert     = p_this.items["_btn_insert"].selector.key;
            var _btn_update     = p_this.items["_btn_update"].selector.key;
            var _btn_delete     = p_this.items["_btn_delete"].selector.key;
            var _btn_list       = p_this.items["_btn_list"].selector.key;

            //--------------------------------------------------------------    
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_this.items["keyword"].value = decodeURI(getArgs("", getParamsToJSON(location.href).keyword ));
            page.page_count = Number( getArgs("", getParamsToJSON(location.href).page_count, page.page_count) );
            // page 콜백 함수 설정 (방식)
            if (p_this.prop["__isGetLoad"] === true) {
                // page.callback = goPage;                                  // 2-1) GET 방식     
                page.callback = page.goPage.bind(p_this.list.bind);         // 2-2) GET 방식 (bind)    
            } else {
                page.callback = p_this.list.execute.bind(p_this.list);      // 1) 콜백 방식
            }

            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $(_btn_search).click(function () {
                page.page_count = 1;
                p_this.list.execute();
            });
            $(_pageSize).change(function () {
                page.page_size = p_this.items["_pageSize"].value;
                page.page_count = 1;
                p_this.list.execute();
            });
            $(_btn_reset).click(function () {
                $("form").each(function() {
                    this.reset();
                });
            });
            $(_btn_insert).click(function () {
                p_this.create.execute();
            });
            $(_btn_update).click(function () {
                p_this.update.execute();
            });    
            $(_btn_delete).click(function () {
                p_this.delete.execute();
            });
            $(_btn_list).click(function () {
                var url = p_this.prop["__listUrl"];
                location.href = url;
            });        
            $(_pageSize).change(function () {
                page.page_size = p_this.items["_pageSize"].value;
                page.page_count = 1;
                p_this.list.execute();
            });
          
        };
        ProductService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (true || p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }

            return true;
        };
        ProductService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);

            var _btn_insert     = p_this.items["_btn_insert"].selector.key;
            var _btn_update     = p_this.items["_btn_update"].selector.key;
            var _btn_delete     = p_this.items["_btn_delete"].selector.key;
            var _btn_reset      = p_this.items["_btn_reset"].selector.key;

            if (p_this.prop["__mode"] === "CREATE") {
                $(_btn_update).hide();
                $(_btn_delete).hide();
                $(_btn_insert).show();
                $(_btn_reset).show();
            } else if (p_this.prop["__mode"] === "EDIT") {
                $(_btn_insert).hide();
                $(_btn_update).show();
                $(_btn_delete).show();
                $(_btn_reset).hide();
                
                p_this.items["prt_id"].value = ParamGet2JSON(location.href).prt_id;
            }  
        };

        return ProductService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.ProductService = ProductService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));