/**
 * Object : 폴리필
 *      - Object.prototype.isImplementOf() : [protected] 구현 여부
 *      - Object.prototype._implements() : 인터페이스(클래스 포함) 등록 *다중상속*
*/

if ((typeof Object.prototype._implements === "undefined") ||
    (typeof Object.prototype.isImplementOf === "undefined")) {

    (function(global) {

        "use strict";

        //==============================================================
        // 1. 모듈 | 네임스페이스 선언 (폴리필)
        
        //==============================================================
        // 2. 모듈 가져오기 (node | web)

        //==============================================================
        // 3. 모듈 의존성 검사

        //==============================================================
        // 4. 모듈 구현    
        /**
         * 인터페이스 객체 유무 검사
         * @function  
         * @param {Function} p_imp 
         */
        var isImplementOf = function(p_imp) {
            for (var i = 0; i < this._interface.length; i++) {
                if (this._interface[i] === p_imp) return true;
            }
            return false;
        };    

        /**
         * 등록된 인터페이스의 prototype과 프로퍼티는 구현되어야 함
         * 인터페이스(클래스) 등록
         * @protected
         * @function 
         * @param {Function} a_imps 함수형 인터페이스 목록
         */
        var _implements = function _implements(a_imps) {
            this._interface = this._interface || [];

            var typeName;
            var obj;    
        
            for(var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "function") {
                    this._interface.push(arguments[i]);
                    this._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                } else {
                    throw new Error("함수타입민 가능합니다.");
                }
                    
                obj = new arguments[i];
        
                for(var p in obj) {
                    typeName = (typeof obj[p] === "function") ? "Method" : "Property";
                    
                    if (!(p in this) && !Object.prototype.hasOwnProperty(p)) {
                        console.warn("Warning!! 인터페이스 구현 해야함. " + arguments[i].name + " :: (" + typeName + ") " + p);
                    }
                }
            }
        };

        //==============================================================
        // 5. 모듈 내보내기 (node | web)
        Object.prototype._implements = _implements;
        Object.prototype.isImplementOf = isImplementOf;

    }(this));
}