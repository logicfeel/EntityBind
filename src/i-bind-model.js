/**
 * namespace _W.Interface.IBindModel
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IBindModel  = (function () {
        /**
         * 바인드모델 인터페이스
         * @constructs _W.Interface.IBindModel
         * @interface
         */
        function IBindModel() {

            /**
             * 속성(아이템)
             * @member
             */
            this.prop       = {};
            
            /**
             * 함수
             * @member
             */
            this.fn         = {};

            /** 
             * 매핑
             * @member  
             */
            this.mapping    = {};

            /**
             * 기본 검사 콜백
             * @member
             */
            this.cbBaseValid    = null;
            
            /**
             * 기본 바인드 콜백
             * @member
             */
            this.cbBaseBind     = null;
            
            /**
             * 기본 결과 콜백
             * @member
             */
            this.cbBaseResult   = null;
            
            /**
             * 기본 출력 콜백
             * @member
             */
            this.cbBaseOutput   = null;
            
            /**
             * 기본 종료 콜백
             * @member
             */
            this.cbBaseEnd      = null;

            /**
             * 실행전 이벤트
             * @member
             */
            this.onExecute  = null;
            
            /**
             * 실행후 이벤트
             * @member
             */
            this.onExecuted = null;

            /**
             * 실패 콜백
             * @member
             */
            this.cbFail = function() {};
            
            /**
             * 에러 콜백
             * @member
             */
            this.cbError = function() {};
        }
        /**
         * 사전 등록
         */
        IBindModel.prototype.preRegister = function() {};
        
        /**
         * 사전 검사
         */
        IBindModel.prototype.preCheck = function() { return true };

        /**
         * 사전 준비
         */
        IBindModel.prototype.preReady = function() {};

        // IBindModel.prototype.cbFail = function() {};
        // IBindModel.prototype.cbError = function() {};

        return IBindModel;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModel;
    } else {
        global._W.Interface.IBindModel = IBindModel;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));