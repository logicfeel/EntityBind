/**
 * @namespace _W.Service
 */
(function(global) {
    "use strict";
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandAjax;

    if (typeof module !== "object") {                   // Web
        util                = global._W.Common.Util;
        BindCommandAjax     = global._W.Meta.Bind.BindCommandAjax;
    } else if (typeof module.exports === "object"){     // node
        util                = require("util");
        BindCommandAjax     = require("./bind-command-ajax");
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseService === "undefined") throw new Error("[BaseService] module load fail...");
    if (typeof BindCommandAjax === "undefined") throw new Error("[BindCommandAjax] module load fail...");
    if (typeof PageView === "undefined") throw new Error("[PageView] module load fail...");     // 전역에 선언됨
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var page = new PageView("page", 10);

    var BoardFAQService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @constructs _W.Service.BoardFAQService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function BoardFAQService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || "";  // 접미사
            var _this       = this;
            var _template   = null;

            this.bindModel  = null;     // 인터페이스에 정의됨

            /**
             * 기본 경로
             */
            this.baseUrl = "/Admin/adm_mod/BOD/Board_FAQ.C.asp";

            /**
             * # _temp_list (기본셀렉터: #s-temp-list)
             * - 템플릿 목록의 셀렉터 
             * # keyword (기본셀렉터: #m-keyword)
             * - 검색 키워드 
             * # sort
             * - 정력방식
             * @example
             * // 이벤트 바인딩
             * $('#btn_Search').click(faq.fn.search);
             * $('#btn_Reset').click(faq.fn.reset);
             */
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      "",
                __formUrl:      "",
                __mode:         getParamsToJSON(location.href).mode,
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ _SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ _SUFF,        type: "html" } },
                _area_page:     { selector: { key: "#s-area-page"+ _SUFF,        type: "html" } },
                _txt_totalView: { selector: { key: "#s-txt-totalView"+ _SUFF,    type: "html" } },
                _txt_pageSize:  { selector: { key: "#s-txt-pageSize"+ _SUFF,     type: "value" } },
                // bind
                cmd:            "",
                keyword:        { selector: { key: "#m-keyword"+ _SUFF,          type: "value" } },
                page_size:      {
                    getter: function() { return page.page_size; },
                    setter: function(val) { page.page_size = val; }
                },
                page_count:     {
                    getter: function() { return page.page_count; },
                    setter: function(val) { page.page_count = val; }
                },              
                sort_cd:        "",
                faq_idx:        "",
                question:       { selector: { key: "#m-question"+ _SUFF,        type: "value" } },
                answer:         { selector: { key: "#m-answer"+ _SUFF,          type: "value" } },
                typeCode:       { selector: { key: "#m-typeCode"+ _SUFF,        type: "value" } },
                rank_it:        { selector: { key: "#m-rank_it"+ _SUFF,        type: "value" } },
                create_dt:      { selector: { key: "#m-create_dt"+ _SUFF,       type: "value" } },
            };

            /** 
             * 명령들
             * # create : 등록
             * - onExecute : 실행전
             * - cbEnd: 실행종료
             * # read : 조회
             * - outputOption = 3 : 출력옵션
             */
            this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items["cmd"].value = "CREATE"; },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("등록 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                        location.href = _this.bindModel.prop["__listUrl"];
                    },
                },
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items["cmd"].value = "READ"; },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                    }
                },
                update:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items["cmd"].value = "UPDATE"; },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("수정 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                        alert("수정 처리가 되었습니다.");
                        _this.bindModel.read.execute();
                    }
                },
                delete:     {
                    onExecute: function(p_bindCommand) { p_this.bindModel.items["cmd"].value = "DELETE"; },
                    cbValid: function(p_valid) { return confirm("삭제 하시겠습니까.?"); },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("삭제 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                        location.href = _this.bindModel.prop["__listUrl"];
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items["cmd"].value = "LIST"; 
                    },
                    cbOutput: function(p_entity) {
                        var row_total   = p_entity["row_total"];
                        if (_template === null) {
                            _template    = Handlebars.compile( _this.bindModel.items["_temp_list"].value ); 
                            Handlebars.registerHelper('sum_prt', function () {
                                return numberWithCommas(this.discount_mn * this.qty_it);
                            });
                            Handlebars.registerHelper('comma_num', function (p_nmber) {
                                return numberWithCommas(p_nmber);
                            });
                        }
                        _this.bindModel.items["_txt_totalView"].value    = row_total;
                        _this.bindModel.items["_area_list"].value        = _template(p_entity);
                        _this.bindModel.items["_area_page"].value        = page.parser(row_total);
                    },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("목록조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                    }
                },
            }

            /**
             * @typedef PropertiesHash
             * @type {object}
             * @property {string} id - an ID.
             * @property {string} name - your name.
             * @property {number} age - your age.
             */

            /** @type {PropertiesHash} */
            this.mapping = {
                cmd:            { Array:    "bind" },
                keyword:        { list:     "bind" },
                page_size:      { list:     "bind" },
                page_count:     { list:     "bind" },
                sort_cd:        { list:     "bind" },
                faq_idx:        { read:     "bind",     delete:     "bind",            update:  "bind" },
                question:       { read:     "output",   create:     "bind",            update:  "bind" },
                answer:         { read:     "output",   create:     "bind",            update:  "bind" },
                typeCode:       { read:     "output",   create:     "bind",            update:  "bind" },
                rank_it:        { read:     "output",   create:     "bind",            update:  "bind" },
                create_dt:      { read:     "output",   create:     "bind",            update:  "bind" },
            };

            /**
             * ddd
             * @member _W.Service.BoardFAQService#fn
             * @type {list | search}
             */
            this.fn = {
                changePagesize: function(e) {
                    page.page_size = _this.bindModel.items["_txt_pageSize"].value;
                    page.page_count = 1;
                    _this.bindModel.list.execute();
                },
                search: function() {
                    page.page_count = 1;
                    _this.bindModel.list.execute();
                },
                moveList: function() {
                    var url = _this.bindModel.prop["__listUrl"];
                    location.href = url;
                },
                reset: function () { 
                    $("form").each(function() {
                        this.reset();
                    });
                },
                create: function () { _this.bindModel.create.execute(); },
                read: function () { 
                    _this.bindModel.items["faq_idx"].value = ParamGet2JSON(location.href).faq_idx;
                    _this.bindModel.read.execute(); 
                },
                update: function () { _this.bindModel.update.execute(); },
                delete: function () { _this.bindModel.delete.execute(); },
                list2: function () { 
                    // _this.bm.list.execute(); 
                    _this.bindModel.list.execute(); 
                    // bm.list.execute(); 
                },
            };
        }
        util.inherits(BoardFAQService, _super);
    
        /**
         * 전처리 등록 (데코레이션 패턴)
         * @param {*} p_bindModel 
         */
        BoardFAQService.prototype.preRegister = function(p_bindModel) {
            BaseService.prototype.preRegister.call(this, p_bindModel);
            console.log("----------------------------------");
            
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_bindModel.items["keyword"].value = decodeURI(getArgs("", getParamsToJSON(location.href).keyword ));
            page.page_count = Number( getArgs("", getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_bindModel.prop["__isGetLoad"] === true) {
                // page.callback = goPage;                                  // 2-1) GET 방식     
                page.callback = page.goPage.bind(p_bindModel.list.bind);         // 2-2) GET 방식 (bind)    
            } else {
                page.callback = p_this.bindModel.list.execute.bind(p_bindModel.list);      // 1) 콜백 방식
            }
          
        };

        BoardFAQService.prototype.preCheck = function(p_bindModel) {
            if (BaseService.prototype.preCheck.call(this, p_bindModel)) {
                if (true || p_bindModel.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        
        BoardFAQService.prototype.preReady = function(p_bindModel) {
            BaseService.prototype.preReady.call(this, p_bindModel);
        };

        return BoardFAQService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     

    } else {
        global.BoardFAQService = BoardFAQService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));