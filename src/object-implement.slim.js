/**
 * Object : 폴리필
 *  - Object.prototype._isImplementOf() : [protected] 구현 여부
 *  - Object.prototype._implements() : 인터페이스(클래스 포함) 등록 *다중상속*
  */
(function(global) {
    "use strict";
    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    /**
     * 인터페이스 객체 유무 검사
     * @function  
     * @param {*} p_imp 
     */
    var _isImplementOf = function(p_imp) {
        for (var i = 0; i < this.__implements.length; i++) {
            if (this.__implements[i] === p_imp) return true;
        }
        return false;
    };    

    /**
     * 등록된 인터페이스의 prototype과 프로퍼티는 구현되어야 함
     * 인터페이스(클래스) 등록
     * @function 
     * @param {Function} a_imps 함수형 인터페이스 목록
     */
    var _implements = function _implements(a_imps) {
        this.__implements = this.__implements || [];
    
        // var callerFuncName = arguments.callee.name;   // 현재 함수명
        var callerFuncName = "_implements";   // 현재 함수명
        var typeName;
        var obj;    
    
        for(var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === "function") {
                this.__implements.push(arguments[i]);
                this.__implements[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
            } else {
                throw new Error("함수타입민 가능합니다.");
            }
                
            obj = new arguments[i];
    
            for(var p in obj) {
                typeName = (typeof obj[p] === "function") ? "Method" : "Property";
                if (!(p in this) && p !== callerFuncName) {
                    console.log("Warning!! 인터페이스 구현 해야함. " + arguments[i].name + " :: (" + typeName + ") " + p);
                }
            }
        }
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    Object.prototype._implements     = _implements;
    Object.prototype._isImplementOf  = _isImplementOf;

}(this));