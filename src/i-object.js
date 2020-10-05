/**
 * @namespace _W.Interface.IObject
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IObject  = (function () {
        function IObject() {
        }
    
        IObject.prototype.getGUID  = function() {
            throw new Error("에러:: 구현해야함.");
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

}(this));