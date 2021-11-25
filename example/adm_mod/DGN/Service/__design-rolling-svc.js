/**
 * @namespace _W.Meta.Bind.DesignRollingService
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
    var page = new PageView("page", 5);

    var DesignRollingService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function DesignRollingService(p_this, p_suffix) {
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
            p_this.rolling  = new BindCommandLookupAjax(p_this);

            // 모델 속성 설정
            p_this.baseUrl      = "/Admin/adm_mod/DGN/Design_RollingImage.C.asp";
            p_this.rolling.url  = "/Admin/adm_mod/DGN/Design_Rolling.C.asp";
            p_this.read.outputOption = 3;
            p_this.baseAjaxSetup.type = "POST";

            // prop 속성 설정
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      "",
                __formUrl:      "",
                __mode:         getParamsToJSON(location.href).mode,
                // view
                _temp_roll:     { selector: { key: "#s-temp-roll"+ SUFF,        type: "html" } },
                _area_roll:     { selector: { key: "#s-area-roll"+ SUFF,        type: "html" } },

                _temp_list:     { selector: { key: "#s-temp-list"+ SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ SUFF,        type: "html" } },
                _area_page:     { selector: { key: "#s-area-page"+ SUFF,        type: "html" } },
                _txt_totalView: { selector: { key: "#s-txt-totalView"+ SUFF,    type: "html" } },
                _btn_search:    { selector: { key: "#s-btn-search"+ SUFF,       type: "html" } },
                _btn_reset:     { selector: { key: "#s-btn-reset"+ SUFF,        type: "html" } },
                _txt_pageSize:  { selector: { key: "#s-txt-pageSize"+ SUFF,     type: "value" } },
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
                roll_idx:       { selector: { key: "#s-area-roll"+ SUFF,        type: "value" } },
                img_idx:        "",
                title:          { 
                    selector: { key: "#m-title"+ SUFF,        type: "value" },
                    isNotNull: true,
                },
                pcUrl:          { 
                    selector: { key: "#m-pcUrl"+ SUFF,  type: "value" },
                    isNotNull: true,
                },
                mUrl:           { selector: { key: "#m-mUrl"+ SUFF,  type: "value" } },
                pcLink:         { 
                    selector: { key: "#m-pcLink"+ SUFF,  type: "value" },
                    isNotNull: true,                    
                },
                mLink:          { selector: { key: "#m-mLink"+ SUFF,  type: "value" } },
                active_yn:      { 
                    getter: function() { return $("input[name=m-active_yn]:checked").val(); },
                    setter: function(val) { 
                        if (val === "Y" ) $("input[name=m-active_yn][value=Y]").prop("checked", "checked");
                        if (val === "N" ) $("input[name=m-active_yn][value=N]").prop("checked", "checked");
                    },
                    isNotNull: true,                    
                },
            };
            // mapping 설정
            this.mapping = {
                cmd:            { Array:    "bind" },
                keyword:        { list:     "bind" },
                page_size:      { list:     "bind" },
                page_count:     { list:     "bind" },
                sort_cd:        { list:     "bind" },
                roll_idx:       { Array:    "bind" },
                img_idx:        { read:     "bind",             delete:     "bind",            update: "bind" },
                title:          { read:     "output",           create:     ["valid", "bind"], update:  ["valid", "bind"], },
                pcUrl:          { read:     "output",           create:     ["valid", "bind"], update:  ["valid", "bind"], },
                mUrl:           { read:     "output",           create:     "bind",            update:  "bind" },
                pcLink:         { read:     "output",           create:     ["valid", "bind"], update:  ["valid", "bind"], },
                mLink:          { read:     "output",           create:     "bind",            update:  "bind" },
                active_yn:      { read:     "output",           create:     "bind",            update:  "bind" },
            };
            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
            p_this.read.onExecute  = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };
            p_this.update.onExecute  = function(p_bindCommand) { p_this.items["cmd"].value = "UPDATE"; };
            p_this.delete.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "DELETE"; };
            p_this.list.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            p_this.rolling.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
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
                    Handlebars.registerHelper('state_mark', function (p_state_cd) {
                        if (p_state_cd === "R") return "문의접수";
                        if (p_state_cd === "W") return "답변대기";
                        if (p_state_cd === "F") return "답변완료";
                        if (p_state_cd === "D") return "답변삭제(숨김)";
                    });
                }
                p_this.items["_txt_totalView"].value    = row_total;
                p_this.items["_area_list"].value        = template(p_entity);
                p_this.items["_area_page"].value        = page.parser(row_total);
            };
            var template2 = null;
            p_this.rolling.cbOutput   = function(p_entity) {
                var row_total   = p_entity["row_total"];
                
                if ( template2 === null) {
                    template2    = Handlebars.compile( p_this.items["_temp_roll"].value ); 
                }
                p_this.items["_area_roll"].value        = template2(p_entity);
            };
            // cbEnd
            p_this.create.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("등록 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                location.href = p_this.prop["__listUrl"] +"?roll_idx=" + p_this.items["roll_idx"].value;
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
                location.href = p_this.prop["__listUrl"] +"?roll_idx=" + p_this.items["roll_idx"].value;
            };
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("목록조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
            };
            p_this.rolling.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("롤링조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                roll.items["roll_idx"].value    = getParamsToJSON(location.href).roll_idx;
                if (roll.items["roll_idx"].value > 0 )  p_this.list.execute();
            };
        }
        util.inherits(DesignRollingService, _super);
    
        // 데코레이션 메소드
        DesignRollingService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            console.log("----------------------------------");
            // 셀랙터 얻기
            var _btn_search     = p_this.items["_btn_search"].selector.key;
            var _btn_reset      = p_this.items["_btn_reset"].selector.key;
            var _txt_pageSize   = p_this.items["_txt_pageSize"].selector.key;
            
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
            $(_txt_pageSize).change(function () {
                page.page_size = p_this.items["_txt_pageSize"].value;
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
                location.href = url +"?roll_idx=" + p_this.items["roll_idx"].value;
            });        
            $(_txt_pageSize).change(function () {
                page.page_size = p_this.items["_txt_pageSize"].value;
                page.page_count = 1;
                p_this.list.execute();
            });
          
        };
        DesignRollingService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (true || p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }

            return true;
        };
        DesignRollingService.prototype.preReady = function(p_this) {
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
                
                p_this.items["img_idx"].value = ParamGet2JSON(location.href).img_idx;
            }  
        };

        return DesignRollingService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.DesignRollingService = DesignRollingService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));