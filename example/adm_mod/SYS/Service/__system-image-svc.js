/**
 * @namespace _W.Meta.Bind.SystemImageService
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
    if (typeof Handlebars === "undefined") throw new Error("[Handlebars] module load fail..."); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var SystemImageService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function SystemImageService(p_this, p_suffix) {
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
            p_this.baseUrl = "/Admin/adm_mod/SYS/System_Image.C.asp";

            // prop 속성 설정
            this.prop = {
                // inner
                __isGetLoad:    true,
                __frmURL:       "",
                // view
                _temp_list:     { selector: { key: "#s-temp-img"+ SUFF,         type: "html" } },
                _area_list:     { selector: { key: "#s-area-img"+ SUFF,         type: "html" } },
                _txt_totalView: { selector: { key: "#s-txt-totalView"+ SUFF,    type: "html" } },
                // 이미지 경로, 삭제버튼
                _btn_upload:    { selector: { key: "#s-btn-upload"+ SUFF,        type: "html" } },
                // bind
                cmd:            "",
                upfile:          { 
                    selector:       { key: "#m-upfile"+ SUFF,    type: "value" },
                    isNotNull:      true,
                },
                suffix:         "",
                prefix:         "",
                position_cd:    "",
                pos_idx:        "",
                sub_idx:        "",
                img_idx:        "",
                file_idx:       "",
                imgName:        "",
                orgName:        "",
                imgPath:        "",
                imgUrl:         "",
                width_it:       "",
                height_it:      "",
                size_it:        "",
                page_size:      "",
                page_count:     "",
                sort_cd:        "",
            };

            // mapping 설정
            this.mapping = {
                cmd:            { Array:    "bind" },
                upfile:         { create:   ["valid", "bind"] },          
                suffix:         { create:   ["bind"] },          
                prefix:         { create:   ["bind"] },          
                position_cd:    { create:   "bind",     read:   "bind",     list:       "bind" },
                pos_idx:        { create:   "bind",     read:   "bind",     list:       "bind" },
                sub_idx:        { create:   "bind",     read:   "bind",     list:       "bind" },
                img_idx:        { read:     "bind",     update: "bind",     list:       "bind",     delete:     "bind" },
                file_idx:       { read:     "bind",     update: "bind",     delete:     "bind" },
                imgName:        { read:     "output",   update: "bind" },
                orgName:        { read:     "output",   update: "bind" },
                imgPath:        { read:     "output",   update: "bind" },
                imgUrl:         { read:     "output",   update: "bind" },
                width_it:       { read:     "output",   update: "bind" },
                height_it:      { read:     "output",   update: "bind" },
                size_it:        { read:     "output",   update: "bind" },
                page_size:      { list:     "bind" },
                page_count:     { list:     "bind" },
                sort_cd:        { list:     "bind" },
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
            // cbBaseBind   !! 주의 this로 사용하였음          
            this.cbBaseBind  = function (p_ajaxSetup, p_command) {
                console.log('create.cbBaseBind');
                // !! 중요 !!
                // multipart/form-data 방식으로 변환
                var form = $('#fileUploadForm'+ SUFF)[0];
                var data = new FormData(form);
                var value;
        
                for (var i = 0; i < p_command.bind.items.count; i++) {
                    value = p_command.bind.items[i].value === null ? "" : p_command.bind.items[i].value;
                    data.append(p_command.bind.items[i].name, value);
                }
                p_ajaxSetup.data = data;
                p_ajaxSetup.enctype = "multipart/form-data";
                p_ajaxSetup.processData = false;
                p_ajaxSetup.contentType = false;
                p_ajaxSetup.type = "POST";
            };

            // cbEnd
            p_this.create.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("등록 처리가 실패 하였습니다. Code : " + p_entity["return"]);
                alert('이미지가 업로드되었습니다.');
                p_this.items["upfile"].value = "";  // 초기화
                p_this.list.execute();
            };
            p_this.read.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패하였습니다. Result Code : " + p_entity["return"]);
            };
            p_this.delete.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("삭제  처리가 실패하였습니다. Result Code : " + p_entity["return"]);
                alert('삭제 되었습니다.');
                p_this.list.execute();
            };
            p_this.list.cbEnd  = function(p_entity) {
                if (p_entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + p_entity["return"]);
            };
            // cbOutput
            var template = null;
            p_this.list.cbOutput  = function(p_entity) {
                var row_total   = p_entity["row_total"];
            
                if ( template === null) {
                    template = Handlebars.compile( p_this.items["_temp_list"].value );
                }
                p_this.items["_txt_totalView"].value = row_total;
                p_this.items["_area_list"].value = template(p_entity);
            };
            // delImage 사용자 함수
            p_this.delImage = function(p_img_idx, p_file_idx) {
                p_this.items["img_idx"].value   = p_img_idx;
                p_this.items["file_idx"].value  = p_file_idx;
                p_this.delete.execute();
            };
        }
        util.inherits(SystemImageService, _super);
    
        // 데코레이션 메소드
        SystemImageService.prototype.preRegister = function(p_this) {
            BaseService.prototype.preRegister.call(this, p_this);
            console.log("----------------------------------");
            var _btn_upload      = p_this.items["_btn_upload"].selector.key;

            $(_btn_upload).click(function () {
                // p_this.items["upfile"].value = $("#upfile").val();
                p_this.create.execute();
            });

        };
        SystemImageService.prototype.preCheck = function(p_this) {
            if (BaseService.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) console.log("preCheck : 선택자 검사 => 'Success' ");
            }
            return true;
        };
        SystemImageService.prototype.preReady = function(p_this) {
            BaseService.prototype.preReady.call(this, p_this);
        };

        return SystemImageService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.SystemImageService = SystemImageService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));