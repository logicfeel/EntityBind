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
    if (typeof PageView === "undefined") throw new Error("[PageView] module load fail...");     // basee에 선언됨
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var page = new PageView("page", 3);

    var BoardFaqService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.BoardFaqService
         * @extends _W.Service.BaseServiceW
         * @param {String} p_suffix 셀렉터 접미사
         */
        function BoardFaqService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || "";  // 접미사
            var _this       = this;
            var _template   = null;

            this.bindModel  = null;             // TODO: IBindModel 에 구현 해야함

            /**
             * 기본 콜백 경로
             */
            this.baseUrl = "/Admin/adm_mod/BOD/Board_FAQ.C.asp";

            /**
             * prop 속성
             * # innner 속성 
             * - __isGetLoad : 페이징 이동방식 (GET, AJAX)
             * - __listUrl : 목록 페이지 경로
             * - __formUrl : 폼 페이지 경로
             *
             *  # view 속성
             * - _temp_list : 목록 템플릿 
             * - _area_list : 목록 템플릿 붙일 영역
             * - _area_page : 페이지 템플릿 붙일 영역
             * - _txt_totalCnt : 목록 전체 갯수
             *
             * # bind 속성 
             * - cmd : 명령
             * - keyword : 목록 검색 키워드
             * - page_size : 목록 페이지 크기
             * - page_count : 목록 페이지 번호
             * - sort_cd : 정렬
             * - faq_idx : 일련번호
             * - question : 질문
             * - answer : 답변
             * - typeCode : 타입코드
             * - rank_it : 순번
             * - create_dt : 등록일자.
             */
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      "",
                __formUrl:      "",
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ _SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ _SUFF,        type: "html" } },
                _area_page:     { selector: { key: "#s-area-page"+ _SUFF,        type: "html" } },
                _txt_totalCnt:  { selector: { key: "#s-txt-totalCnt"+ _SUFF,    type: "html" } },
                // bind
                cmd:            "",
                keyword:        { selector: { key: "#m-keyword"+ _SUFF,          type: "value" } },
                page_size:      {
                    setter: function(val) { page.page_size = val; },
                    selector: { key: "select[name=m-page_size]"+ _SUFF,    type: "value" },
                },
                page_count:     {   /** 값을 외부에서 관리함! */
                    getter: function() { return page.page_count; },
                    setter: function(val) { return page.page_count = val; }
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
             * - create : 등록
             * - read : 조회
             * - update : 수정
             * - delete : 삭제
             * - list : 목록
             */
            this.command = {
                create:         {
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items["cmd"].value = "CREATE"; 
                    },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("등록 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                        location.href = _this.bindModel.prop["__listUrl"];
                    },
                },
                read:           {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items["cmd"].value = "READ"; 
                    },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                    }
                },
                update:         {
                    onExecute: function(p_bindCommand) { 
                        _this.bindModel.items["cmd"].value = "UPDATE"; 
                    },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("수정 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                        alert("수정 처리가 되었습니다.");
                        _this.bindModel.read.execute();
                    }
                },
                delete:         {
                    onExecute: function(p_bindCommand) { 
                        p_this.bindModel.items["cmd"].value = "DELETE"; 
                    },
                    cbValid: function(p_valid) { 
                        return confirm("삭제 하시겠습니까.?"); 
                    },
                    cbEnd: function(p_entity) {
                        if (p_entity["return"] < 0) return alert("삭제 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                        location.href = _this.bindModel.prop["__listUrl"];
                    }
                },
                list:           {
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
             * 속성의 매핑
             */
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
             * 공개 함수
             * - searchList() : 목록 검색
             * - changePagesize(e) : 목록 페이지 크기 변경
             * - resetForm() : 폼 초기화
             * - moveList() : 목록 화면 이동
             * - moveForm() : 폼 화면 이동
             * - procList() : 목록 조회 처리
             * - procRead() : 조회 처리
             * - procCreate() : 등록 처리
             * - procUpdate() : 수정 처리
             * - procDelete() : 삭제 처리
             * - procList() : 목록 조회 처리
             */
            this.fn = {
                
                searchList: function() {
                    page.page_count = 1;
                    _this.bindModel.list.execute();
                },
                changePagesize: function(e) {
                    page.page_size = _this.bindModel.items["page_size"].value;
                    page.page_count = 1;
                    _this.bindModel.list.execute();
                },
                resetForm: function () { 
                    $("form").each(function() {
                        this.reset();
                    });
                },
                moveList: function() {
                    var url = _this.bindModel.prop["__listUrl"];
                    location.href = url;
                },
                moveForm: function(p_faq_idx) {
                    var url = _this.bindModel.prop["__formUrl"];
                    location.href = url +"?faq_idx="+ p_faq_idx;
                },
                procRead: function (p_faq_idx) { 
                    _this.bindModel.items["faq_idx"].value = ParamGet2JSON(location.href).faq_idx;
                    _this.bindModel.read.execute(); 
                },
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procUpdate: function () { 
                    _this.bindModel.update.execute(); 
                },
                procDelete: function () { 
                    _this.bindModel.delete.execute(); 
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };
        }
        util.inherits(BoardFaqService, _super);
    
        /**
         * 전처리 :: 등록 
         * 데코레이션 패턴 : 상위 메소드 호출함
         * @param {BindModelAjax} p_bindModel 
         */
        BoardFaqService.prototype.preRegister = function(p_bindModel) {
            BaseService.prototype.preRegister.call(this, p_bindModel);
            console.log("----------------------------------");
            
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_bindModel.items["keyword"].value = decodeURI(getArgs("", getParamsToJSON(location.href).keyword ));
            p_bindModel.items["page_count"].value  = Number( getArgs("", getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_bindModel.prop["__isGetLoad"] === true) {
                /**
                 * # 2가지 중 선택하여 사용
                 * page.callback = goPage;                                      // 2-1) GET 방식
                 * page.callback = page.goPage.bind(p_bindModel.list.bind);     // 2-2) GET 방식 (bind)    
                 */
                page.callback = page.goPage.bind(p_bindModel.list.bind);
            } else {
                page.callback = p_bindModel.list.execute.bind(p_bindModel.list);      // 1) 콜백 방식
            }
        };

        /**
         * 전치리 :: 검사
         * 데코레이션 패턴 : 상위 메소드 호출함
         * @param {BindModelAjax} p_bindModel 
         * @returns {Boolean}
         */
        BoardFaqService.prototype.preCheck = function(p_bindModel) {
            if (BaseService.prototype.preCheck.call(this, p_bindModel)) {
                if (true || p_bindModel.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        
        /**
         * 전처리 :: 준비
         * 데코레이션 패턴 : 상위 메소드 호출함
         * @param {BindModelAjax} p_bindModel 
         */
        BoardFaqService.prototype.preReady = function(p_bindModel) {
            BaseService.prototype.preReady.call(this, p_bindModel);
            console.log("__________preReady__________");
        };

        return BoardFaqService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module !== "object") {                   // Web
        global.BoardFaqService = BoardFaqService;
        global.page = page;
    } else if (typeof module.exports === "object"){     // node
        // module.exports = BaseService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));