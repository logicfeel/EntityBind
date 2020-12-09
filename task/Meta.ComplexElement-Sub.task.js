/**
 * @namespace _W.Task.ComplexElement_Sub
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
    var result = [];        // 결과 확인 **사용시 초기화    
    var isCallback = global.isCallback === false ? false : true;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("../src/object-implement"); // _implements() : 폴리필
        // util                = require("../src/utils");
    } else {
        // util                = global._W.Common.Util;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log("---------------------------------------------------------------------------");
        console.log("ComplexElement_Sub :: 설명 ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        //#################################################
        if (errorCount > 0) {
            console.warn("Error Sub SUM : %dEA", errorCount);    
        }
        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.ComplexElement_Sub = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
