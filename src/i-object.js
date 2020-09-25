/**
 * _W.Interface.IObject
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    var util;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        util = require("./utils");
        require("./object-implement.slim"); // 폴리필
    } else {
        global._W = global._W || {};
        util = global._W.util || {};
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var IObject  = (function () {
        function IObject() {
        }
    
        IObject.prototype.getGUID  = function() {
            return util.createGUID();
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