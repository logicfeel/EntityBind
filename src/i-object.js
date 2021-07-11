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
    var IObject  = (function () {
        /**
         * 최상위 객체 인터페이스
         * @interface Interface.IObject
         */
        function IObject() {
        }
        
        /**
         * 객체타입 얻기
         * @method Interface.IObject#getTypes
         */
        IObject.prototype.getTypes  = function() {
            throw new Error("[ getTypes() ] Abstract method definition, fail...");
        };
        
        /**
         * 인스턴스 검사
         * @method Interface.IObject#instanceOf
         * @returns {Boolean}
         */
        IObject.prototype.instanceOf  = function() {
            throw new Error("[ instanceOf() ] Abstract method definition, fail...");
        };
    
        return IObject;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IObject;
    } else {
        global._W.Interface.IObject = IObject;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));