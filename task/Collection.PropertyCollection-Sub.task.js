/**
 * @namespace _W.Task.Object
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Task           = global._W.Task || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCount = 0; 
    var Observer;

    if (typeof module === "object" && typeof module.exports === "object") {     
        Observer                 = require("../src/observer");
    } else {
        Observer                 = global._W.Task.Object_implement;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log("-----------------------------------------------------------------");
        console.log("TODO:: 테스크 내용");

        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.Observer = run();
    }

}(this));    