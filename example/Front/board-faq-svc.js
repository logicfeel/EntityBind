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

    //==============================================================
    // 4. 모듈 구현    
    var page = new PageView("page", 10);

    var BoardFaqService  = (function (_super) {
        /**
         * FAQ 게시판 서비스
         * @constructs _W.Service.Front.BoardFaqService
         * @extends _W.Service.Front.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         * @example
         * // 1단계 : 본문에 관련 스크립트 태그 삽입 (handlebars.js, _w-meta.*.js, base-svc.js, faq-svc.js)
         * // 2단계 : 사용할 command 기준으로 items들을 셀렉터 설정 (mapping 참조, validSelector() 검사)
         * // 3단계 : 스크립트 로딩 (하단은 목록 예시)
         * 
         * var faq = new BindModelAjax(new BoardFaqService());
         *    
         * // 속성 설정
         * faq.prop["__listUrl"]    = "FAQ_Frm.asp";
         * faq.prop["__isGetLoad"]  = false;
         * faq.items["page_size"].value = 3;
         * 
         * // 이벤트 바인딩
         * $("#btn_Search").click(faq.fn.search);
         * $("#btn_Reset").click(faq.fn.reset);
         * $("#changePagesize").change(faq.fn.changePagesize);
         * 
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

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = "/Front/frt_mod/BOD/Board_FAQ.C.asp";

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             * @property {Boolean} __isGetLoad 페이징 이동방식 (GET, AJAX) = true
             * @property {String} __listUrl 목록 페이지 경로
             * @property {String} __formUrl 폼 페이지 경로
             * @property {ItemDOM} _temp_list 목록 템플릿
             * @property {Object} _temp_list.selector #s-temp-list : html
             * @property {ItemDOM} _area_list 목록 템플릿 붙는 영역
             * @property {Object} _area_list.selector #s-area-list : html
             * @property {ItemDOM} _area_page 페이지 템플릿 붙는 영역
             * @property {Object} _area_page.selector #s-area-page : html
             * @property {ItemDOM} _txt_sumCnt 목록 전체 갯수
             * @property {Object} _txt_sumCnt.selector #s-txt-sumCnt : html
             * @property {ItemDOM} cmd 처리 명령 코드
             * @property {ItemDOM} keyword 목록조회 검색 키워드
             * @property {Object} keyword.selector #m-keyword : value
             * @property {ItemDOM} page_size 목록조회 크기
             * @property {Object} page_size.selector select[name=m-page_size] : value
             * @property {ItemDOM} page_count 목록조회 페이지 번호
             * @property {ItemDOM} sort_cd 목록조회 정렬 코드
             * @example
             * // prop 속성에만 연결됨, 이름규칙 '__'
             * faq.prop["__isGetLoad"] = false;
             * faq.prop["__listUrl"] = "List.html";
             * typeof faq.prop["faq_idx"] === "object"; // true
             * 
             * // items 속성에 연결됨
             * faq.items["faq_idx"].value = 1;  // faq_idx에 1 설정
             * faq.items["keyword"].selector.key === "#m-keyword"  // true
             */            
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      "",
                __formUrl:      "",
                __mode:         "",
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ _SUFF,       type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ _SUFF,       type: "html" } },
                _area_page:     { selector: { key: "#s-area-page"+ _SUFF,       type: "html" } },
                _txt_sumCnt:    { selector: { key: "#s-txt-sumCnt"+ _SUFF,      type: "html" } },
                // bind
                cmd:            "",
                keyword:        { selector: { key: "#m-keyword"+ _SUFF,         type: "value" } },
                page_size:      {
                    selector:   { key: 'select[name=m-page_size'+_SUFF+']',     type: 'value' },
                    getter: function () { return page.page_size; },
                    setter: function (val) { page.page_size = val; },
                },
                page_count:     {   /** 값을 외부에서 관리함! */
                    getter: function () { return page.page_count; },
                    setter: function (val) { return page.page_count = val; }
                },              
                sort_cd:        "",
                faq_idx:        "",
                question:       { 
                    selector: { key: "#m-question"+ _SUFF,        type: "value" },
                    constraints:    [
                        { regex: /..+/, msg: "질문을  2자 이상 입력해주세요.", code: 150, return: true },
                    ],
                },
                answer:         { 
                    selector: { key: "#m-answer"+ _SUFF,          type: "value" },
                    isNotNull: true,
                },
                typeCode:       { selector: { key: "#m-typeCode"+ _SUFF,        type: "value" } },
                rank_it:        { selector: { key: "#m-rank_it"+ _SUFF,         type: "value" } },
                create_dt:      { selector: { key: "#m-create_dt"+ _SUFF,       type: "text" } },
            };

            /**
             * 명령들
             * @type {Object}
             * @type {Object.<String, BindCommandAjax>}
             * @property {BindCommandAjax} list 목록조회 명령
             * @property {Number} list.outputOption 목록조회 옵션 = 1
             * @property {Function} list.onExecute 목록조회 실행전 콜백 
             * @property {Function} list.cbOutput 목록조회 출력 콜랙
             * @property {Function} list.cbEnd 목록조회 완료 콜백
             * @example
             * faq.create.execute();        // 등록 명령 처리
             * faq.create.bind.list         // 등록시 바인딩 목록
             * faq.list.outputOption === 1  // true
             */
            this.command = {
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items["cmd"].value = "LIST"; },
                    cbOutput: function(p_result) {
                        var entity = p_result['table'];
                        
                        var row_total   = entity["row_total"];
                        if (_template === null) {
                            _template    = Handlebars.compile( _this.bindModel.items["_temp_list"].value ); 
                        }
                        _this.bindModel.items["_txt_sumCnt"].value  = row_total;
                        _this.bindModel.items["_area_list"].value   = _template(entity);
                        _this.bindModel.items["_area_page"].value   = page.parser(row_total);
                    },
                    cbEnd: function(p_result) {
                        if (p_result["return"] < 0) return alert("목록조회 처리가 실패 하였습니다. Code : " + p_result["return"]);
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
             * @property {prop} sort_cd
             * @property {bind} sort_cd.list 조회
             */
            this.mapping = {
                _temp_list:     { list:     "etc" },    // 묶음의 용도
                _area_list:     { list:     "etc" },    // 묶음의 용도
                _area_page:     { list:     "etc" },    // 묶음의 용도
                cmd:            { Array:    "bind" },
                keyword:        { list:     "bind" },
                page_size:      { list:     "bind" },
                page_count:     { list:     "bind" },
                sort_cd:        { list:     "bind" },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             * @property {Function} searchList 목록 검색
             * @property {Function} changePagesize 목록 페이지 크기 변경
             * @property {Param} fnchangePagesize.p_num 목록 크기(파라메터)
             * @property {Function} resetForm 입력양식 초기화
             * @property {Function} moveList 목록 화면 이동
             * @property {Function} moveForm 입력폼 화면 이동
             * @property {Function} procCreate 등록 처리
             * @property {Function} procRead 조회 처리
             * @property {Function} procUpdate 수정 처리
             * @property {Function} procDelete 삭제 처리
             * @property {Function} procList 목록 조회 처리
             * @example
             * var faq = new BindModelAjax(new BoardFaqService());
             * ...
             * $("#btn_Search").click(faq.fn.search);   // 검색 버튼 연결
             * $("#btn_Reset").click(faq.fn.reset);     // 리셋 버튼 연결
             * $("#changePagesize").change(faq.fn.changePagesize);  // 체크리스트 연결
             */
            this.fn = {
                searchList: function() {
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                changePagesize: function(p_num) {
                    _this.bindModel.items['page_size'].value = this.value;
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                resetForm: function () { 
                    $("form").each(function() {
                        this.reset();
                    });
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
            if (global.isLog) console.log("[Service] preRegister() : 사전등록 ");
            
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_bindModel.items["keyword"].value = decodeURI(getArgs("", getParamsToJSON(location.href).keyword ));
            p_bindModel.items["page_count"].value  = Number( getArgs("", getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_bindModel.prop["__isGetLoad"] === true) {
                page.callback = page.goPage.bind(p_bindModel.list.bind);
            } else {
                page.callback = p_bindModel.list.execute.bind(p_bindModel.list);      // 1) 콜백 방식
            }
        };

        return BoardFaqService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     

    } else {
        global.BoardFaqService = BoardFaqService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));