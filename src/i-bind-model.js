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
             * @typedef {Object} IBindcommand
             * @property {Number} outputOption 출력방식 0 ~ 3
             * @property {Function} cbVaild 검사 콜백
             * @property {Function} cbBind 바인드 전 콜백
             * @property {Function} cbResult 결과 수신 콜백
             * @property {Function} cbOutput 출력 콜백
             * @property {Function} cbEnd 종료 콜백
             */

            /**
             * 제약조건
             * @typedef IConstraint
             * @property {Regex} regex 정규표현식
             * @property {String} msg 실패 메세지 
             * @property {String} code  실패시 리턴 코드
             * @property {Number} return 성공 조건
             */

            /**
             * 아이템 타입
             * @typedef {Object} IItem
             * @property {Number} size 크기
             * @property {Function} type
             * @property {Function} default
             * @property {Function} caption
             * @property {Function} isNotNull
             * @property {Function} isNullPass
             * @property {Function} callback
             * @property {Array | Function} constraints 제약조건
             * @property {Array} constraints.regex 제약조건
             * @property {Array} constraints.msg 제약조건
             * @property {String} constraints.code 실패시 리턴 코드
             * @property {Number} constraints.return 성공 조건
             */

            /**
             * 대상속성과 명령의 엔티티(검사, 바인딩, 출력)에 매핑한다
             * @typedef {Object} IMapping
             * @property {String} {command} 매핑할 명령 (command에 지정한 명칭)
             * @property {'Arrary'} {command} 전체 명령 (command에 지정한 명칭)
             * @property {'valid'} {command:mapping} 검사대상에 매핑 한다.
             * @property {'bind'} {command:mapping} 바인딩에 매핑한다.
             * @property {'output'} {command:mapping} 출력에 매핑한다.
             * @property {Arrary<'valid', 'output'>} {command:mapping} 검사와 출력에 매핑한다.
             * @property {'Arrary' | '[]'} {command:mapping} 검사와 바인딩 출력 모든곳에 매핑한다.
             * @example
             * this.mapping = {
             *      cmd:            { Array:    "bind" },
             *      keyword:        { list:     "bind" },
             *      faq_idx:        { read:     "bind",     delete:     "bind" }
             * };
             */
            /**
             * 속성(아이템)
             * @member
             */
            this.prop       = {};
            
            /**
             * 명령
             * @member
             * @type {Object.<String, IBindcommand>}
             */
             this.command       = {};

            /**
             * 함수
             * @member
             * @type {Object.<String, Function>}
             */
            this.fn         = {};

            /** 
             * 속성명(prop)에 매핑을 설정한다.
             * @member  
             * @type {Object.<String, Object>}  
             * @property {String} prop 매핑할 속성이름
             * @property {String} prop.command 매핑할 명령
             * @property {'Arrary'} prop.command 전체 명령
             * @property {Object} prop.command.mapping 매핑대상
             * @property {'valid'} {prop.command.mapping} 검사(엔티티)에 매핑 한다.
             * @property {'bind'} {prop.command.mapping} 바인딩(엔티티)에 매핑한다.
             * @property {'output'} {prop.command.mapping} 출력(엔티티)에 매핑한다.
             * @property {Arrary<'valid', 'output'>} {prop.command.mapping} 검사와 출력에 매핑한다.
             * @property {'Arrary' | '[]'} {prop.command.mapping} 모든곳에 매핑한다.(검사와 바인딩 출력)
             * @example
             * this.mapping = {
             *      cmd:            { Array:    "bind" },
             *      keyword:        { list:     "bind" },
             *      faq_idx:        { read:     "bind",     delete:     "bind" }
             * };

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
             * @type {Function}
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