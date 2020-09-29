/**
 * _W.Common.Extend : 전체
 */
(function(global) {
    
    "use strict";
    
    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    require("./object-implement");

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
    } else {
        require("./array-is_array.slim");
    }

}(this));