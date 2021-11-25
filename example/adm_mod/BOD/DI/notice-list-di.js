/**
 * @namespace _W.Meta.Bind.NoticeListDI
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
    var BaseDI;
    var accountFrmURL;          // 수정화면 경로(참조)
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        BaseDI              = global._W.Meta.Bind.BaseDI;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseDI === "undefined") throw new Error("[BaseDI] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var NoticeListDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function NoticeListDI() {
            _super.call(this);
            
            var _this = this;
            
            /**
             * 프로퍼티 get/set 의 방식으로 적용한 경우
             */
            var _key2 = "KEY2";
            Object.defineProperty(this.prop, "__key2", {   
                get: function() { return _key2; },
                set: function(newVal) { 
                    _key2 = newVal; 
                },
                enumerable: true
            });

            var _key3 = "KEY3";
            this.prop["__key3"] = { 
                get: function() { 
                    return _key3;
                },
                set: function(val) { 
                    return _key3 = val; 
                }
            };


            // 업무 속성
            this.prop["regURL"] = {};                    // 등록화면 경로

            var __keyword = "KEY";
            
            this.prop["__frmURL"] = "";                  // 등록화면 경로

            this.prop["__keyword_id"] = "#keyword";


            // this.prop["__keyword_id"] = "#keyword";

            // this.prop["__frmURL"] = {
            //     getter: function() { return accountFrmURL; },
            //     setter: function(val) { accountFrmURL = val; }
            // };
            this.prop["page_size"]  = {};
            this.prop["page_count"] = {};
            // 검색/조회 조건
            this.prop["keyword"] = { 
                caption: "검색어",
                selector: function() { 
                    // return _this.prop["__key3"]
                    // return _key2;
                    return _key3;                           // 내부 속성을 참조한 경우
                },
                // selector: _this.prop["__key2"],
                getter: function() { 
                    return $(_this.prop["__key2"]).val();   // defineProperty 정의후 사용한 경우
                }
            };
            this.prop["sort_cd"] = "";
            // 레코드
            this.prop["create_dt"] = {caption: "등록일자"};
            this.prop["title"] = {caption: "제목"};
            this.prop["writer"] = {caption: "작성자"};
            this.prop["state_cd"] = {caption: "상태"};
            this.prop["top_yn"] = {caption: "상위공지유무"};
            this.prop["popup_yn"] = {caption: "팝업유무"};
            this.prop["ntc_idx"] = {caption: "일련번호"};
            
            this.mapping = {
                keyword: { list: "bind"},
                page_size: { list: "bind"},
                page_count: { list: "bind"},
                sort_cd: { list: "bind"}
            };
        }
        util.inherits(NoticeListDI, _super);
    
        // 데코레이션 메소드
        NoticeListDI.prototype.preRegister = function(p_this) {
            BaseDI.prototype.preRegister.call(this, p_this);
            // cbBind
            if (typeof p_this.list !== "undefined" && p_this.list.cbBind === null) {
                p_this.list.cbBind   = function(p_ajaxSetup) {
                    console.log("cbBind : list ");
                };
            }
            // cbEnd
            if (typeof p_this.list !== "undefined" && p_this.list.cbEnd === null) {
                p_this.list.cbEnd   = function(p_res) {
                    var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
                    var result = entity["return"];
    
                    if (result < 0) alert("조회 처리가 실패 하였습니다. Code : " + result);
                };
            }
        };
        NoticeListDI.prototype.preCheck = function(p_this) {
            if (BaseDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector(p_this.first.items)) {                     // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        NoticeListDI.prototype.preReady = function(p_this) {
            BaseDI.prototype.preReady.call(this, p_this);
            p_this.list.execute();                                // 준비완료 후 실행(execute)
        };

        return NoticeListDI;
    
    }(BaseDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseDI;
    } else {
        global._W.Meta.Bind.NoticeListDI = NoticeListDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));