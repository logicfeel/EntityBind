/**
 * @namespace _W.Interface.IGroupControl
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
    var IGroupControl  = (function () {
        function IGroupControl() {
        }
    
        /**
         * 복제 : 전체
         */
        IGroupControl.prototype.merge  = function() {
            throw new Error("[ merge() ] Abstract method definition, fail...");
        };

        /**
         * 로드 : 전체
         */
        IGroupControl.prototype.copy  = function() {
            throw new Error("[ copyTo() ] Abstract method definition, fail...");
        };

        return IGroupControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IGroupControl;
    } else {
        global._W.Interface.IGroupControl = IGroupControl;
    }

}(this));