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
         * @extends _W.Service.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         * @example
         * var faq = new BindModelAjax(new BoardFaqService());
         *    
         * // 속성 설정
         * faq.prop["__listUrl"] = "FAQ_Frm.asp";
         * faq.items["page_size"].value = 3;
         * faq.prop["__isGetLoad"] = false;
         * // 이벤트 바인딩
         * $("#btn_Search").click(faq.fn.search);
         * $("#btn_Reset").click(faq.fn.reset);
         * $("#changePagesize").change(faq.fn.changePagesize);
         * // 초기화  
         * $(document).ready(function () {
         *  faq.init();
         *  faq.fn.procList();
         * });
         */
        function BoardFaqService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || "";  // 접미사
            var _this       = this;
            var _template   = null;

            this.bindModel  = null;             // TODO: IBindModel 에 구현 해야함

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = "/Admin/adm_mod/BOD/Board_FAQ.C.asp";

            /**
             * prop 속성
             * @type {Object}
             * @property {Boolean} __isGetLoad 페이징 이동방식 (GET, AJAX) = true
             * @property {String} __listUrl 목록 페이지 경로
             * @property {String} __formUrl 폼 페이지 경로
             * @property {ItemDOM} _temp_list 목록 템플릿
             * @property {Object} _temp_list.selector #s-temp-list : html
             * @property {ItemDOM} _area_list 목록 템플릿 붙는 영역
             * @property {Object} _area_list.selector #s-area-list : html
             * @property {ItemDOM} _area_page 페이지 템플릿 붙는 영역
             * @property {Object} _area_page.selector #s-area-page : html
             * @property {ItemDOM} _txt_totalCnt 목록 전체 갯수
             * @property {Object} _txt_totalCnt.selector #s-txt-totalCnt : html
             * @property {ItemDOM} cmd 처리 명령 코드
             * @property {ItemDOM} keyword 목록조회 검색 키워드
             * @property {Object} keyword.selector #m-keyword : value
             * @property {ItemDOM} page_size 목록조회 크기
             * @property {Object} page_size.selector select[name=m-page_size] : value
             * @property {ItemDOM} page_count 목록조회 페이지 번호
             * @property {ItemDOM} sort_cd 목록조회 정렬 코드
             * @property {ItemDOM} faq_idx 일련번호
             * @property {ItemDOM} question 질문
             * @property {Object} question.selector #m-question : value
             * @property {ItemDOM} answer 답변
             * @property {Object} answer.selector #m-answer : value
             * @property {ItemDOM} typeCode 구분자
             * @property {Object} typeCode.selector #m-typeCode : value
             * @property {ItemDOM} rank_it 정렬 순서
             * @property {Object} rank_it.selector #m-rank_it : value
             * @property {ItemDOM} create_dt 등록일자
             * @property {Object} create_dt.selector ##m-create_dt : value\
             */
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      "",
                __formUrl:      "",
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ _SUFF,       type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ _SUFF,       type: "html" } },
                _area_page:     { selector: { key: "#s-area-page"+ _SUFF,       type: "html" } },
                _txt_totalCnt:  { selector: { key: "#s-txt-totalCnt"+ _SUFF,    type: "html" } },
                // bind
                cmd:            "",
                keyword:        { selector: { key: "#m-keyword"+ _SUFF,         type: "value" } },
                page_size:      {
                    setter: function(val) { page.page_size = val; },
                    selector: { key: "select[name=m-page_size]"+ _SUFF,         type: "value" },
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
                rank_it:        { selector: { key: "#m-rank_it"+ _SUFF,         type: "value" } },
                create_dt:      { selector: { key: "#m-create_dt"+ _SUFF,       type: "value" } },
            };

            /**
             * 명령들
             * @type {Object}
             * @property {BindCommandAjax} create 등록 명령
             * @property {Function} create.onExecute 등록 실행전 콜백
             * @property {Function} create.cbEnd  등록 완료 콜백
             * @property {BindCommandAjax} read 조회 명령
             * @property {Number} read.outputOption 조회 출력 옵션 = 3
             * @property {Function} read.onExecute 조회 실행전 콜백
             * @property {Function} read.cbEnd 등록 완료 콜백
             * @property {BindCommandAjax} update 수정 명령
             * @property {Function} update.onExecute 수정 실행전 콜백
             * @property {Function} update.cbEnd 수정 완료 콜백
             * @property {BindCommandAjax} delete 삭제 명령
             * @property {Function} delete.onExecute 삭제 실행전 콜랙
             * @property {Function} delete.cbValid 삭제 검사 콜백
             * @property {Function} delete.cbEnd 삭제 완료 콜백
             * @property {BindCommandAjax} list 목록조회 명령
             * @property {Number} list.outputOption 목록조회 옵션 = 1
             * @property {Function} list.onExecute 목록조회 실행전 콜백 
             * @property {Function} list.cbOutput 목록조회 출력 콜랙
             * @property {Function} list.cbEnd 목록조회 완료 콜백
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
             * @type {Object}
             * @property {prop} cmd
             * @property {bind} cmd.Array 전체
             * @property {prop} keyword
             * @property {prop} page_size
             * @property {bind} page_size.list 목록
             * @property {prop} page_count
             * @property {bind} page_count.list 목록
             * @property {prop} faq_idx
             * @property {bind} faq_idx.read 조회
             * @property {bind} faq_idx.delete 삭제
             * @property {bind} faq_idx.update 수정
             * @property {prop} question
             * @property {output} question.read 조회
             * @property {bind} question.delete 삭제
             * @property {bind} question.update 수정
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
             * @type {Object}
             * @property {Function} searchList 목록 검색
             * @property {Function} fnchangePagesize 목록 페이지 크기 변경
             * @property {Param} fnchangePagesize.p_num 목록 크기(파라메터)
             * @property {Function} resetForm 입력양식 초기화
             * @property {Function} moveList 목록 화면 이동
             * @property {Function} moveForm 입력폼 화면 이동
             * @property {Function} procCreate 등록 처리
             * @property {Function} procRead 조회 처리
             * @property {Function} procUpdate 수정 처리
             * @property {Function} procDelete 삭제 처리
             * @property {Function} procList 목록 조회 처리
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