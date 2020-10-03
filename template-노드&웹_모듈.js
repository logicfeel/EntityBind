/**
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    // global._W           = global._W || {};
    // global._W.Meta      = global._W.Meta || {};
    
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util             = require("util");
    } else {
        // util             = global._W.Common.Util;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    // if (typeof util === "undefined") throw new Error("[XXX] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    // util.inherits = (function () {
    // }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = namespace;
    } else {
        global._W.namespace = namespace;
    }

}(this));