/**
 * 인터페이스 전체
 */
(function(global) {
    
    "use strict";
    
    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Collection    = global._W.Interface || {};

    var BaseCollection;
    var ArrayCollection;
    var PropertyCollection;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        BaseCollection          = require("./i-object");
        ArrayCollection         = require("./i-marshal");
        PropertyCollection      = require("./i-collection");
    } else {
        BaseCollection          = global._W.Collection.BaseCollection;
        ArrayCollection         = global._W.Collection.ArrayCollection;
        PropertyCollection      = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");
    if (typeof ArrayCollection === "undefined") throw new Error("[ArrayCollection] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");

    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.BaseCollection               = BaseCollection;
        module.exports.ArrayCollection              = ArrayCollection;
        module.exports.PropertyCollection           = PropertyCollection;
    } else {
        global._W.Collection.BaseCollection         = BaseCollection;
        global._W.Collection.ArrayCollection        = ArrayCollection;
        global._W.Collection.PropertyCollection     = PropertyCollection;
    }

}(this));