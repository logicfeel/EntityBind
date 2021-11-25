/**
 * @namespace _W.Meta.Bind.ProductOptionService
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
    var ProductOptionService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductOptionService(p_this, p_suffix) {
            _super.call(this, p_this);
            
            // 접미사 설정
            var SUFF = p_suffix || "";  // 접미사
            p_this.SUFF = SUFF;

            // command 생성
            p_this.create   = new BindCommandEditAjax(p_this);
            p_this.update   = new BindCommandEditAjax(p_this);
            p_this.delete   = new BindCommandEditAjax(p_this);
            p_this.list     = new BindCommandLookupAjax(p_this);
            
            // 모델 속성 설정
            p_this.baseUrl      = "/Admin/adm_mod/PRT/Option.C.asp";

            // prop 속성 설정
            this.prop = {
                // inner
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ SUFF,        type: "html" } },
                _btn_insert:    { selector: { key: "#s-btn-insert"+ SUFF,       type: "html" } },
                // bind
                cmd:            "",
                page_size:      0,
                page_count:     "",
                sort_cd:        "",
                opt_idx:        { isNotNull: true },
                prt_id:         { isNotNull: true },
                default_yn:     { 
                    // selector:       { key: "input[id=m-default_yn"+ + SUFF +"]",    type: "prop.checked" },
                    getter:         function() { 
                        return $("input[id=m-default_yn"+ SUFF +"]:checked") ? "Y" : "N"; 
                    },
                    setter:         function(val) { 
                        $("input[id=m-default_yn"+ SUFF +"]").prop("checked", val === "Y" ? true : false); 
                    }
                },
                optName:        { 
                    selector:       { key: "#m-optName"+ SUFF,                      type: "value" },
                    isNotNull: true 
                },
                sell_mn:       { 
                    selector:       { key: "#m-sell_mn"+ SUFF,                      type: "value" },
                    isNotNull: true 
                },
                discount_mn:    { 
                    selector:       { key: "#m-discount_mn"+ SUFF,                  type: "value" },
                    isNotNull: true 
                },
                point_it:       { 
                    value:          "",
                    selector:       { key: "#m-point_it"+ SUFF,                     type: "value" },   
                }
            };
            // mapping 설정
            this.mapping = {
                cmd:            { Array:    "bind" },
                keyword:        { list:     "bind" },
                page_size:      { list:     "bind" },
                page_count:     { list:     "bind" },
                sort_cd:        { list:     "bind" },
                prt_id:         { create:   ["valid", "bind"],    update: ["valid", "bind"],      list: "bind",      delete: "bind" },
                opt_idx:        { update:   ["valid", "bind"],    delete: ["valid", "bind"] },
                default_yn:     { create:   ["valid", "bind"],    update: ["valid", "bind"] },
                fileName:       { create:   ["valid", "bind"],    update: ["valid", "bind"] },
                optName:        { create:   ["valid", "bind"],    update: ["valid", "bind"] },
                sell_mn:        { create:   "bind",               update: "bind" },
                discount_mn:    { create:   "bind",               update: "bind" },
                point_it:       { create:   "bind",               update: "bind" },
            };
            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.create.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "CREATE"; };
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
                    Handlebars.registerHelper('check_yn', function (p_value) {
                        if (p_value === "Y") return "checked";
                        else return "";
                    });
                }
                p_this.items["_area_list"].value    = template(p_entity);
            };
            // cbEnd
            p_this.create.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("등록 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                p_this.list.execute();
            };
            p_this.update.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("수정 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                alert("수정 처리가 되었습니다.");
                p_this.list.execute();
            };
            p_this.delete.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("삭제 처리가 실패 하였습니다. Result Code : " + p_entity["return"]);
                p_this.list.execute();
            };
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("목록조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
            };
            // onExecuted
            var initItem = function() {
                // 입력폼 초기화
                p_this.items["default_yn"].value = "N";
                p_this.items["optName"].value = "";
                p_this.items["sell_mn"].value = "";
                p_this.items["discount_mn"].value = "";
                p_this.items["point_it"].value = "0";
            };
            p_this.create.onExecuted = function(p_cmd, p_entity) {
                initItem();
            };
            p_this.update.onExecuted = function(p_cmd, p_entity) {
                initItem();
            };
        }
        
        util.inherits(ProductOptionService, _super);
    
        // 데코레이션 메소드
        ProductOptionService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            console.log("----------------------------------");
            // 셀랙터 얻기
            var _btn_insert     = p_this.items["_btn_insert"].selector.key;
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
            $(_btn_insert).click(function () {
                p_this.create.execute();
            });
        };
        ProductOptionService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (true || p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        ProductOptionService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return ProductOptionService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.ProductOptionService = ProductOptionService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));