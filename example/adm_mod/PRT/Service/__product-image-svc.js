/**
 * @namespace _W.Meta.Bind.ProductImageService
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
    var ProductImageService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function ProductImageService(p_this, p_suffix) {
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
            p_this.baseUrl      = "/Admin/adm_mod/PRT/Image.C.asp";

            // prop 속성 설정
            this.prop = {
                // inner
                // view
                _temp_list:     { selector: { key: "#s-temp-list"+ SUFF,        type: "html" } },
                _area_list:     { selector: { key: "#s-area-list"+ SUFF,        type: "html" } },
                _btn_insert:    { selector: { key: "#s-btn-insert"+ SUFF,       type: "html" } },
                // bind
                cmd:            "",
                keyword:        "",
                page_size:      0,
                page_count:     "",
                sort_cd:        "",
                prt_id:         { isNotNull: true },
                img_idx:        { isNotNull: true },
                fileName:       { 
                    selector:       { key: "#m-fileName"+ SUFF,          type: "value" },
                    isNotNull: true 
                },
                position_cd:    { 
                    selector:       { key: "#m-position_cd"+ SUFF,       type: "value" },
                    isNotNull: true 
                },
                rank_it:       { 
                    value:          "",
                    selector:       { key: "#m-rank_it"+ SUFF,          type: "value" },   
                }
            };
            // mapping 설정
            this.mapping = {
                cmd:            { Array:    "bind" },
                keyword:        { list:     "bind" },
                page_size:      { list:     "bind" },
                page_count:     { list:     "bind" },
                sort_cd:        { list:     "bind" },
                prt_id:         { create:   ["valid", "bind"],    list: "bind" },
                img_idx:        { update:   ["valid", "bind"],    delete: ["valid", "bind"] },
                fileName:       { create:   ["valid", "bind"],    update: ["valid", "bind"] },
                position_cd:    { create:   ["valid", "bind"],    update: ["valid", "bind"] },
                rank_it:        { create:   "bind",               update: "bind" },
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
                    Handlebars.registerHelper('selected', function( /* dynamic arguments */) {
                        var options = arguments[arguments.length-1];
                        var args = Array.prototype.slice.call(arguments, 0,arguments.length-1)
                        var str = "";
                        if (args[0] === args[1]) str =  new Handlebars.SafeString("selected");
                        return str;
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
                p_this.items["fileName"].value = "";
                p_this.items["position_cd"].value = "B";
                p_this.items["rank_it"].value = "99";
            };
            p_this.create.onExecuted = function(p_cmd, p_entity) {
                initItem();
            };
            p_this.update.onExecuted = function(p_cmd, p_entity) {
                initItem();
            };
        }
        util.inherits(ProductImageService, _super);
    
        // 데코레이션 메소드
        ProductImageService.prototype.preRegister = function(p_this) {
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
        ProductImageService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (true || p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        ProductImageService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return ProductImageService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.ProductImageService = ProductImageService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));