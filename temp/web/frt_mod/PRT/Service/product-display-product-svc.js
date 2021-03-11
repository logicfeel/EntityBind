/**
 * @namespace _W.Meta.Bind.ProductDisplayProductService
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

    var ProductDisplayProductService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductDisplayProductService(p_this, p_suffix) {
            _super.call(this, p_this);
            
            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;
            
            // command 생성
            p_this.list     = new BindCommandLookupAjax(p_this);
            
            // 모델 속성 설정
            p_this.baseUrl = "/Front/frt_mod/PRT/Product_DisplayProduct.C.asp";

            // prop 속성 설정
            this.prop = {
                // inner
                __isGetLoad:    true,
                __frmURL:       "",
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ SUFF,        type: "html" } },
                _txt_totalView: { selector: { key: "#s-txt-totalView"+ SUFF,    type: "html" } },
                _area_page:     { selector: { key: "#s-area-page"+ SUFF,        type: "html" } },
                _btn_search:    { selector: { key: "#s-btn-search"+ SUFF,       type: "html" } },
                _btn_reset:     { selector: { key: "#s-btn-reset"+ SUFF,        type: "html" } },
                _txt_pageSize:  { selector: { key: "#s-txt-pageSize"+ SUFF,     type: "value" } },
                // bind
                cmd:            "",
                dsp_id:         "",
                keyword:        { selector: { key: "#m-keyword"+ SUFF,          type: "val" } },
                page_size:      {
                    getter:         function() { return page.page_size; },
                    setter:         function(val) { page.page_size = val; }
                },
                page_count:     {
                    getter:         function() { return page.page_count; },
                    setter:         function(val) { page.page_count = val; }
                },
                sort_cd:        "",
            };
            
            // mapping 설정
            this.mapping = {
                cmd:            { Array:    "bind" },
                dsp_id:         { list:     "bind" },   
                keyword:        { list:     "bind" },   
                page_size:      { list:     "bind" },   
                page_count:     { list:     "bind" },   
                sort_cd:        { list:     "bind" },   
            };
            //--------------------------------------------------------------
            // 4. 콜백 함수 구현
            // onExecute
            p_this.list.onExecute   = function(p_bindCommand) { p_this.items["cmd"].value = "LIST"; };
            // cbOutput
            var template = null;
            
            p_this.list.cbOutput  = function(p_entity) {
                var row_total   = p_entity["row_total"];
                
                if ( template === null) {
                    template = Handlebars.compile( p_this.items["_temp_list"].value );
                    
                    Handlebars.registerHelper('comma_num', function (p_nmber) {
                        return numberWithCommas(p_nmber);
                    });
                }
                p_this.items["_txt_totalView"].value = row_total;
                p_this.items["_area_list"].value = template(p_entity);
                p_this.items["_area_page"].value = page.parser(row_total);
            };
            // cbEnd
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패하였습니다. Result Code : " + p_entity["return"]);
            };
        }
        util.inherits(ProductDisplayProductService, _super);
    
        // 데코레이션 메소드
        ProductDisplayProductService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
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
            var _btn_search     = p_this.items["_btn_search"].selector.key;
            var _btn_reset      = p_this.items["_btn_reset"].selector.key;
            var _txt_pageSize   = p_this.items["_txt_pageSize"].selector.key;

            $(_btn_search).click(function () {
                page.page_count = 1;
                p_this.list.execute();
            });
            $(_btn_reset).click(function () {
                $("form").each(function() {
                    this.reset();
                });
            });
            $(_txt_pageSize).change(function () {
                page.page_size = p_this.items["_txt_pageSize"].value;
                page.page_count = 1;
                p_this.list.execute();
            });

        };
        ProductDisplayProductService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };

        return ProductDisplayProductService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.ProductDisplayProductService = ProductDisplayProductService;
        global.page = page;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));