(function(global) {

    'use strict';
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
    } else if (typeof module.exports === 'object'){     // node
        // util                = require('util');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    if (typeof PageView === 'undefined') throw new Error('[PageView] module load fail...');     // 전역에 선언됨
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var page = new PageView('page', 10);

    var BoardFaqService  = (function (_super) {
        /**
         * 게시판 :: 자주하는질문(FAQ) 서비스
         * @constructs _W.Service.Admin.BoardFaqService
         * @extends _W.Service.Admin.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         * @example
         * // 1단계 : 본문에 관련 스크립트 태그 삽입 (handlebars.js, _w-meta.*.js, base-svc.js, faq-svc.js)
         * // 2단계 : 사용할 command 기준으로 items들을 셀렉터 설정 (mapping 참조, validSelector() 검사)
         * // 3단계 : 스크립트 로딩 (하단은 목록 예시)
         * 
         * var faq = new _W.BindModelAjax(new BoardFaqService());
         *    
         * // 속성 설정
         * faq.prop['__listUrl']    = 'FAQ_Frm.asp';
         * faq.prop['__isGetLoad']  = false;
         * faq.items['page_size'].value = 3;
         * 
         * // 이벤트 바인딩
         * $('#btn_Search').click(faq.fn.search);
         * $('#btn_Reset').click(faq.fn.reset);
         * $('#changePagesize').change(faq.fn.changePagesize);
         * 
         * // 초기화  
         * $(document).ready(function () {
         *  faq.init();
         *  faq.fn.procList();
         * });
         */
        function BoardFaqService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Admin/adm_mod/BOD/Board_FAQ.C.asp';

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
             * @property {Object} _txt_sumCnt.selector #s-txt-totalCnt : html
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
             * @property {Object} create_dt.selector ##m-create_dt : value
             * @example
             * // prop 속성에만 연결됨, 이름규칙 '__'
             * faq.prop['__isGetLoad'] = false;
             * faq.prop['__listUrl'] = 'List.html';
             * typeof faq.prop['faq_idx'] === 'object'; // true
             * 
             * // items 속성에 연결됨
             * faq.items['faq_idx'].value = 1;  // faq_idx에 1 설정
             * faq.items['keyword'].selector.key === '#m-keyword'  // true
             */            
            this.prop = {
                // inner
                __isGetLoad:    true,
                __listUrl:      '',
                __formUrl:      '',
                __mode:         '',
                // view
                _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,       type: 'html' } },
                _area_list:     { selector: { key: '#s-area-list'+ _SUFF,       type: 'html' } },
                _area_page:     { selector: { key: '#s-area-page'+ _SUFF,       type: 'html' } },
                _txt_sumCnt:    { selector: { key: '#s-txt-sumCnt'+ _SUFF,      type: 'text' } },
                // bind
                cmd:            '',
                keyword:        { selector: { key: '#m-keyword'+ _SUFF,         type: 'value' } },
                page_size:      {
                    selector:   { key: 'select[name=m-page_size'+_SUFF+']',     type: 'value' },
                    getter: function () { return page.page_size; },
                    setter: function (val) { page.page_size = val; },
                },
                page_count:     {   /** 값을 외부에서 관리함! */
                    getter: function () { return page.page_count; },
                    setter: function (val) { return page.page_count = val; }
                },              
                sort_cd:        '',
                faq_idx:        '',
                question:       { 
                    selector: { key: '#m-question'+ _SUFF,                      type: 'value' },
                    constraints:    [
                        { regex: /..+/, msg: '질문을  2자 이상 입력해주세요.', code: 150, return: true },
                    ],
                },
                answer:         { 
                    selector: { key: '#m-answer'+ _SUFF,                        type: 'value' },
                    isNotNull: true,
                },
                typeCode:       { selector: { key: '#m-typeCode'+ _SUFF,        type: 'value' } },
                rank_it:        { selector: { key: '#m-rank_it'+ _SUFF,         type: 'value' } },
                create_dt:      { selector: { key: '#m-create_dt'+ _SUFF,       type: 'text' } },
                
// __ADD__ 추가위치 : BOD_FAQ_Cls.item 기준
            };

            /**
             * 명령들
             * @type {Object}
             * @type {Object.<String, BindCommandAjax>}
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
             * @example
             * faq.create.execute();        // 등록 명령 처리
             * faq.create.bind.list         // 등록시 바인딩 목록
             * faq.list.outputOption === 1  // true
             */
            this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        _this.bindModel.fn.moveList();  // 개선함
                    },
                },
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    }
                },
                update:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        alert('수정 처리가 되었습니다.');
                        _this.bindModel.read.execute();
                    }
                },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    cbValid: function(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                        _this.bindModel.fn.moveList();  // 개선함
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log("[Service] list.cbOutput() : 목록출력");
                        
                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            _template = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_txt_sumCnt'].value  = row_total;
                        _this.bindModel.items['_area_list'].value   = _template(entity);
                        _this.bindModel.items['_area_page'].value   = page.parser(row_total);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
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
                _temp_list:     { list:     'etc' },    // 묶음의 용도
                _area_list:     { list:     'etc' },    // 묶음의 용도
                _area_page:     { list:     'etc' },    // 묶음의 용도
                _txt_sumCnt:    { list:     'etc' },    // 묶음의 용도
                cmd:            { Array:    'bind' },
                keyword:        { list:     'bind' },
                page_size:      { list:     'bind' },
                page_count:     { list:     'bind' },
                sort_cd:        { list:     'bind' },
                faq_idx:        { read:     'bind',     delete: 'bind',             update:  'bind' },
                question:       { read:     'output',   create: ['valid', 'bind'],  update:  ['valid', 'bind'] },
                answer:         { read:     'output',   create: ['valid', 'bind'],  update:  ['valid', 'bind'] },
                typeCode:       { read:     'output',   create: 'bind',             update:  'bind' },
                rank_it:        { read:     'output',   create: 'bind',             update:  'bind' },
                create_dt:      { read:     'output',   create: 'bind',             update:  'bind' },

// __ADD__ 추가위치 : 전당한 연산을 하면 가능할듯
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             * @property {Function} searchList 목록 검색
             * @property {Function} changePagesize 목록 페이지 크기 변경
             * @property {?Number} changePagesize.p_num 목록 크기(파라메터)
             * @property {Function} resetForm 입력양식 초기화
             * @property {Function} moveList 목록 화면 이동
             * @property {Function} moveForm 입력폼 화면 이동
             * @property {Function} procCreate 등록 처리
             * @property {Function} procRead 조회 처리
             * @property {Function} procUpdate 수정 처리
             * @property {Function} procDelete 삭제 처리
             * @property {Function} procList 목록 조회 처리
             * @example
             * var faq = new _W.BindModelAjax(new BoardFaqService());
             * ...
             * $('#btn_Search').click(faq.fn.searchList);   // 검색 버튼 연결
             * $('#btn_Reset').click(faq.fn.resetForm);     // 리셋 버튼 연결
             * $('#changePagesize').change(faq.fn.changePagesize);  // 체크리스트 연결
             */
            this.fn = {
                searchList: function() {
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                changePagesize: function(e) {
                    _this.bindModel.items['page_size'].value = this.value;
                    _this.bindModel.items['page_count'].value = 1;
                    _this.bindModel.list.execute();
                },
                resetForm: function () { 
                    $('form').each(function() {
                        this.reset();
                    });
                },
                moveList: function() {
                    var url = _this.bindModel.prop['__listUrl'];
                    location.href = url;
                },
                moveEdit: function(p_faq_idx) {
                    var url = _this.bindModel.prop['__formUrl'];
                    location.href = url +'?mode=EDIT&faq_idx='+ p_faq_idx;
                },
                moveForm: function() {
                    var url = _this.bindModel.prop['__formUrl'];
                    location.href = url;
                },
                procRead: function (p_faq_idx) { 
                    _this.bindModel.items['faq_idx'].value = ParamGet2JSON(location.href).faq_idx;
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
         * keyword, page_count 값을 받아서 설정한다.
         * @param {BindModelAjax} p_bindModel 소유한 바인드 모델
         */
        BoardFaqService.prototype.preRegister = function(p_bindModel) {
            BaseService.prototype.preRegister.call(this, p_bindModel);
            if (global.isLog) console.log("[Service] preRegister() : 사전등록 ");
            
            // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
            p_bindModel.items['keyword'].value = decodeURI(getArgs('', getParamsToJSON(location.href).keyword ));
            p_bindModel.items['page_count'].value  = Number( getArgs('', getParamsToJSON(location.href).page_count, page.page_count) );
            
            // page 콜백 함수 설정 (방식)
            if (p_bindModel.prop['__isGetLoad'] === true) {
                page.callback = page.goPage.bind(p_bindModel.list.bind);            // 2-2) GET 방식 (bind)    
            } else {
                page.callback = p_bindModel.list.execute.bind(p_bindModel.list);    // 1) 콜백 방식
            }
        };

        return BoardFaqService;
    
    }(BaseService));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     

    } else {
        global.BoardFaqService = BoardFaqService;
        global.page = page;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));