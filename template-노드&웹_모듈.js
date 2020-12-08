/**
 * @namespace _W.
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    // global._W                = global._W || {};
    // global._W.Meta           = global._W.Meta || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    // var util;
    // var IObject;

    // if (typeof module === "object" && typeof module.exports === "object") {     
    // require("./object-implement"); // _implements() : 폴리필
    // 
    //     util                 = require("util");
    //     IObject              = require("");
    // } else {
    //     util                 = global._W.Common.Util;
    //     IObject              = global._W.Common.IObject;
    // }

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
        module.exports = modules;
    } else {
        global._W.Meta = modules;
    }

// }(this));
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
