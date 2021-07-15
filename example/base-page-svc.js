/**
 * namespace _W.Meta.Bind.BaseService
 */
 (function(global) {
    "use strict";

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModel;

    if (typeof module !== "object") {                   // Web
        util                = global._W.Common.Util;
        IBindModel          = global._W.Interface.IBindModel;
    } else if (typeof module.exports === "object"){     // node
        // util                = require("./utils");
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseService  = (function (_super) {
        /**
         * 상위 서비스 클래스
         * 인터페이스를 상속함 (구현) 추상 구현의 이슈로 구현이 아니고 상속함
         * @constructs _W.Service.BaseService
         * @extends _W.Interface.IBindModel
         * @param {String} p_suffix 
         */
        function BaseService(p_suffix) {
            _super.call(this);
            
            /**
             * 실패시 콜백
             * @param {*} p_result 
             * @param {*} p_item 
             */
            this.cbFail = function(p_result, p_item) {          // 전역 실패 콜백
                console.warn("실패 :: Value=\"%s\", Code=\"%s\", Message=\"%s\" ", p_result.value, p_result.code, p_result.msg);
                Msg("ALERT", "실패", p_result.msg);
            };
            
            /**
             * 오류 발생시 콜백
             * @param {*} p_msg 
             * @param {*} p_status 
             */
            this.cbError = function(p_msg, p_status) {          // 전역 오류 콜백
                console.warn("오류 :: Status=\"%s\" , Message=\"%s\" ", p_status, p_msg);
                Msg("ALERT", "오류", p_msg);
            };
            
            /**
             * 공통 : 콜백 결과 처리
             * @param {*} p_result 
             * @returns {Object}
             */
            this.cbBaseResult = function(p_result) {
                var entity = p_result["table"] || p_result["entity"] || p_result["tables"] || p_result["entities"];
                if (typeof entity["return"] === "undefined") entity["return"] = -100;
                return entity;
            };

            /**
             * 공통 : 검사 콜백
             * @param {*} p_valid 
             * @returns {Boolean}
             */
            this.cbBaseValid = function(p_valid) {
                console.log("cbBaseValid 콜백. ");
                return true;
            };
            
            /**
             * 공통 : 바인딩 전 콜백 (서버전송전)
             * @param {*} p_ajaxSetup 
             */
            this.cbBaseBind = function(p_ajaxSetup) {
                console.log("cbBaseBind 콜백. ");
            };
            
            /**
             * 공통 : 처리 완료 콜백
             * @param {*} p_result 
             * @param {*} p_state 
             * @param {*} p_xhr 
             */
            this.cbBaseEnd = function(p_result, p_state, p_xhr) {
                console.log("cbBaseEnd 콜백. ");
            };
            
            /**
             * 공통 : 출력 콜백 (옵션 = 1, 2, 3)
             * @param {*} p_entity 
             */
            this.cbBaseOutput = function(p_entity) {
                console.log("cbBaseOutput 콜백. ");
            };

            /**
             * 실행전 이벤트
             * @event
             * @param {*} p_bindCommand 
             */
            
            this.onExecute = function(p_bindCommand) {          // 실행시 이벤트 등록
                console.log("onExecute 이벤트. ");
                $(".mLoading").show();
            };

            /**
             * 실행끝 이벤트 등록
             * @event
             * @param {*} p_bindCommand 
             */
            this.onExecuted = function(p_bindCommand) {         // 실행끝 이벤트 등록
                console.log("onExecuted 이벤트.. ");
                $(".mLoading").hide();
            };
        }
        util.inherits(BaseService, _super);
    
        /**
         * 전처리 :: 등록 
         * @param {BindModelAjax} p_bindModel 
         */
        BaseService.prototype.preRegister = function(p_bindModel) {
            console.log("preRegister : 이벤트 및 설정 등록 ");
        };

        /**
         * 전치리 :: 검사
         * @param {BindModelAjax} p_bindModel 
         * @returns {Boolean}
         */
        BaseService.prototype.preCheck = function(p_bindModel) {   // 2.검사
            console.log("preCheck : 화면 유효성 검사 ");
            return true;
        };

        /**
         * 전처리 :: 준비
         * @param {BindModelAjax} p_bindModel 
         */
        BaseService.prototype.preReady = function(p_bindModel) {
            console.log("preReady : 준비완료 ");
        };

        return BaseService;
    
    }(IBindModel));


    var PageView  = (function () {
        /**
         * 페이지 처리 클래스
         * @constructs _W.Service.PageView
         * @param {*} p_instance 
         * @param {*} p_page_size 
         * @param {*} p_page_group 
         * @param {*} p_isOuterBlock 
         * @param {*} p_isNextBlock 
         */
        function PageView(p_instance, p_page_size, p_page_group, p_isOuterBlock, p_isNextBlock) {
            
            // 유효성 검사
            
            this.instanceName   = p_instance || "page";     // 인스턴스명
            this.callback       = null;                     // null 로 설정되면 GET 방식으로 처리

            this.page_size      = p_page_size || 10;        // 페이지 표시 row수
            this.page_group     = p_page_group || 5;        // 페이지 그룹수
            this.page_count     = 1;                        // 페이지 번호 [선택]
            this.row_total      = -1;                       // 전체 row 수

            this.isOuterBlock   = p_isOuterBlock || true;   // 첫/끝 블럭 표시 유무
            this.isNextBlock    = p_isNextBlock || true;    // 이전/다음 블럭 표시 유무

            /**
             * 예약어
             * - {{PAGE_COUNT}} : 대상의 페이지 번호로 파싱
             * - {{INSTANCE}} : 인스턴스 객체명
             */
            // 첫 블럭
            this.ctx_move_block_first = "<a class='btnNormal' href=\"javascript:{{INSTANCE}}.MOVE({{PAGE_COUNT}})\" alt='첫페이지'><span>처음</span></a> ";
            // 끝 블럭
            this.ctx_move_block_last = "<a class='btnNormal' href=\"javascript:{{INSTANCE}}.MOVE({{PAGE_COUNT}})\"><span>마지막</span></a> ";
            // 이전 블럭
            this.ctx_move_block_before = "<a class='btnNormal' href=\"javascript:{{INSTANCE}}.MOVE({{PAGE_COUNT}})\"><span>이전</span></a> ";
            // 다음 블럭
            this.ctx_move_block_after = "<a class='btnNormal' href=\"javascript:{{INSTANCE}}.MOVE({{PAGE_COUNT}})\"><span>다음</span></a> ";
            // 이전 페이지
            this.ctx_move_page_before = "<a class='btnNormal' href=\"javascript:{{INSTANCE}}.MOVE({{PAGE_COUNT}})\"><span>&lt;</span></a></li> ";
            // 다음 페이지
            this.ctx_move_page_after = "<a class='btnNormal' href=\"javascript:{{INSTANCE}}.MOVE({{PAGE_COUNT}})\"><span>&gt;</span></a> ";
            // 선택 페이지
            this.ctx_number_choice = "<a class='btnCtrl'  href='#'><span>{{PAGE_COUNT}}</span></a> ";
            // 페이지
            this.ctx_number = "<a class='btnNormal' href=\"javascript:{{INSTANCE}}.MOVE({{PAGE_COUNT}})\"><span>{{PAGE_COUNT}}</span></a> ";
        }
        /**
         * 이동
         * @param {*} p_page_count 
         */
        PageView.prototype.MOVE  = function(p_page_count) {
            // 쿠키 로 페이지 설정
            // if (typeof setCookie === "function" ) setCookie('page_count', p_page_count, 1);
            
            this.page_count = p_page_count || this.page_count;
            if (typeof this.callback === "function") this.callback.call(this, p_page_count);
        };

        /**
         * GET 방식 페이지 이동
         * @param {*} p_page_count 
         */
        PageView.prototype.goPage  = function(p_page_count) {
            
            var entity = this;  // REVIEW:: 
            var params = "";
            var val = "";
            
            for (var i = 0; i < entity.items.count; i++) {
                val = entity.items[i].value === null || entity.items[i].value === undefined ? "" : entity.items[i].value;
                if (entity.items[i].name === "page_count") val = p_page_count;
                params += entity.items[i].name +'='+ val +'&'
            }
            location.href = "?" + params;
        };

        /**
         * 페이지 파싱
         * @param {*} p_row_total 
         * @param {*} p_page_count 
         * @returns {String}
         */
        PageView.prototype.parser  = function(p_row_total, p_page_count) {
            p_row_total = p_row_total || 0;

            var outContext = "";
            var totalPage = 0; 	// 총 페이지수
            var blockPage = 0;

            this.page_count = p_page_count || this.page_count;
            // this.page_size = p_page_size || this.page_size;
            
            totalPage = Math.ceil(p_row_total / this.page_size); 	// 총 페이지수
            blockPage = Math.floor((this.page_count - 1) / this.page_group);
            blockPage = blockPage * this.page_group + 1;

            if (p_row_total <= 0) {
                this.page_count = 1; // 결과 없을 경우 초기화
                return "";
            }

            // -3.첫 블럭
            if (this.page_count != 1 && this.isOuterBlock) {
            // if (this.isOuterBlock) {
                this.ctx_move_block_first = this.ctx_move_block_first.replace(/{{INSTANCE}}/g, this.instanceName);
                outContext = outContext.concat(this.ctx_move_block_first.replace(/{{PAGE_COUNT}}/g, 1));
            }
            // -2.이전 블럭
            if (blockPage > this.page_group) {
                this.ctx_move_block_before = this.ctx_move_block_before.replace(/{{INSTANCE}}/g, this.instanceName);
                outContext = outContext.concat(this.ctx_move_block_before.replace(/{{PAGE_COUNT}}/g, (blockPage - 1)));
            }
            // -1.이전 페이지
            if (this.page_count > 1 && this.isNextBlock) {
            // if (this.isNextBlock) {
                this.ctx_move_page_before = this.ctx_move_page_before.replace(/{{INSTANCE}}/g, this.instanceName);
                outContext = outContext.concat(this.ctx_move_page_before.replace(/{{PAGE_COUNT}}/g, (this.page_count - 1)));
            }
            // 0.페이지 번호
            for (var i = 1; i <= this.page_group; i++, blockPage++) {
                
                if (blockPage === totalPage) i = this.page_group + 1;
                
                // 선택 페이지
                if (blockPage === this.page_count) { 
                    this.ctx_number_choice = this.ctx_number_choice.replace(/{{INSTANCE}}/g, this.instanceName);
                    outContext = outContext.concat(this.ctx_number_choice.replace(/{{PAGE_COUNT}}/g, this.page_count));
                // 기타 페이지
                } else {														
                    this.ctx_number = this.ctx_number.replace(/{{INSTANCE}}/g, this.instanceName);
                    outContext = outContext.concat(this.ctx_number.replace(/{{PAGE_COUNT}}/g,blockPage));
                }
            }
            // 1.다음 페이지
            if (this.page_count < totalPage && this.isNextBlock) {
            // if (this.isNextBlock) {
                this.ctx_move_page_after = this.ctx_move_page_after.replace(/{{INSTANCE}}/g, this.instanceName);
                outContext = outContext.concat(this.ctx_move_page_after.replace(/{{PAGE_COUNT}}/g, (this.page_count < totalPage ? this.page_count + 1 : totalPage)));
            }
            // 2.다음 블럭
            if ((blockPage - 1) < totalPage) {
                this.ctx_move_block_after = this.ctx_move_block_after.replace(/{{INSTANCE}}/g, this.instanceName);
                outContext = outContext.concat(this.ctx_move_block_after.replace(/{{PAGE_COUNT}}/g, blockPage));
            }
            // 3.끝 블럭
            if (this.page_count < totalPage && this.isOuterBlock) {
            // if (this.isOuterBlock) {
                this.ctx_move_block_last = this.ctx_move_block_last.replace(/{{INSTANCE}}/g, this.instanceName);
                outContext = outContext.concat(this.ctx_move_block_last.replace(/{{PAGE_COUNT}}/g, totalPage));
            }

            return outContext;
        };

        return PageView;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module !== "object") {                   // Web
        global._W.Meta.Bind.BaseService = BaseService;
        global.BaseService = BaseService;
        global.PageView = PageView;
    } else if (typeof module.exports === "object"){     // node
        // module.exports = BaseService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));