/**
 * 설명
 */
(function(global) {

    "use strict";

    //--------------------------------------------------------------
    // 1. 의존 모듈 선언
    
    //--------------------------------------------------------------
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
    } else {
        global._W = global._W || {};
    }

    //--------------------------------------------------------------
    // 3. 의존성 검사

    //--------------------------------------------------------------
    // 4. 모듈 구현    
    
    // 옵서버 클래스
    var Observer = (function () {
        function Observer(pThis, pOnwer) {

            this.isDebug = true;

            this._this = pThis;
            
            this._onwer = pOnwer;
            
            this.subscribers = {    // 전역 구독자
                any: []
            };
        }

        // 구독 신청
        Observer.prototype.subscribe = function(p_code, p_fn) {
            
            var subscribers = null;
            
            p_code = p_code || 'any';
            if (typeof this.subscribers[p_code] === "undefined") {
                this.subscribers[p_code] = [];
            }
            subscribers = this.subscribers[p_code] ;
            subscribers.push(p_fn);
        };

        // 구독 해제
        Observer.prototype.unsubscribe = function(p_code, p_fn) {
            p_code = p_code || "any";
            if (this.subscribers[p_code]) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (p_fn === this.subscribers[p_code][i]) {
                        this.subscribers[p_code].splice(i, 1);
                    }
                }
            }
        };

        // 구독 함수 호출
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || "any";
            if (p_code in this.subscribers) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    this.subscribers[p_code][i].call(this._this, this._onwer);
                }
            }
            
            if (this.isDebug) {
                console.log("publish() 이벤트 발생 [" + this._this.constructor.name + "] type:" + p_code);
            }
            
        };
        return Observer;
    }(Observer));

    //--------------------------------------------------------------
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = Observer;
    } else {
        global._W.Observer = Observer;
    }

}(this));