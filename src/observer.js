/**
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
    } else {
        global._W = global._W || {};
    }

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    
    // 클래스 정의
    var Observer = (function () {
        /**
         * @description 옵서버 클래스
         * @param {*} p_this 호출 대상(this) 지정
         * @param {*} p_onwer call 인수 목록 TODO:: 이부분 확인 필요
         */
        function Observer(p_this, p_onwer) {

            this.isDebug = false;

            this._this = p_this;
            
            this._onwer = p_onwer;
            
            this.subscribers = {        // 전역 구독자
                any: []
            };
        }

        /**
         * @description 구독 신청
         * @param {Function} p_fn [필수] 이벤트 콜백 함수
         * @param {String} p_code 이벤트 코드명 : 기본값 "any"
         * @summary 이벤트 "p_code"를 입력하지 않으면 전역(any)에 등록 된다.
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            var subscribers = null;
            
            if (typeof p_fn === "undefined") throw new Error("p_fn param request fail...");
            
            if (typeof this.subscribers[p_code] === "undefined") {
                this.subscribers[p_code] = [];
            }
            subscribers = this.subscribers[p_code];
            
            if  (typeof p_fn === "function") subscribers.push(p_fn);
        };
        
        /**
         * @description 구독 취소
         * @param {Function} p_fn [필수] 이벤트 콜백 함수
         * @param {String} p_code 이벤트 코드명 : 기본값 "any"
         * @summary 이벤트 "p_code"를 입력하지 않으면 전역(any)에서 취소 된다.
         */
        Observer.prototype.unsubscribe = function(p_fn, p_code) {
            p_code = p_code || "any";

            if (typeof p_fn === "undefined") throw new Error("p_fn param request fail...");

            if (this.subscribers[p_code]) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (this.subscribers[p_code][i] === p_fn) {
                        this.subscribers[p_code].splice(i, 1);
                    }
                }
            }
        };

        /**
         * @description 전체 구독 취소
         * @param {String} p_code 이벤트 코드명
         * @summary 
         *  - p_code 입력하면 해당 콜백함수들 구독 취소한다.
         *  - p_code 를 입력하지 않으면 전체 등록된 이벤트가 취소된다.
         */
        Observer.prototype.unsubscribeAll = function(p_code) {

            if (typeof p_code === "undefined") {     // 전체 구독 삭제
                this.subscribers = {any: []};
            } else {                        // 코드명 구독(함수) 전체 삭제
                delete this.subscribers[p_code];
            }
        };        

        /**
         * @description 구독 함수 호출
         * @param {String}} p_code 이벤트 코드명 : 기본값 "any"
         */
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || "any";
            
            if (p_code in this.subscribers) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (typeof this.subscribers[p_code][i] === "function") {
                        this.subscribers[p_code][i].call(this._this, this._onwer);  // REVIEW:: _onwer 인수 확인필요!
                    }
                }
            }
            
            if (this.isDebug) {
                console.log("publish() 이벤트 발생 [" + this._this.constructor.name + "] type:" + p_code);
            }
            
        };

        return Observer;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = Observer;
    } else {
        global._W.Observer = Observer;
    }

}(this));