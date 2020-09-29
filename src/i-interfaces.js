/**
 * 인터페이스 전체
 */
(function(global) {
    
    "use strict";
    
    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    var IObject;
    var IMarshal;
    var ICollection;
    var IPropertyCollection;
    var IControlCollection;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        IObject                 = require("./i-object");
        IMarshal                = require("./i-marshal");
        ICollection             = require("./i-collection");
        IPropertyCollection     = require("./i-collection-property");
        IControlCollection      = require("./i-collection-control");
    } else {
        IObject                 = global._W.Interface.IObject;
        IMarshal                = global._W.Interface.IMarshal;
        ICollection             = global._W.Interface.ICollection;
        IPropertyCollection     = global._W.Interface.IObject;
        IControlCollection      = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof IObject === "undefined") throw new Error("[IObject] module load fail...");
    if (typeof IMarshal === "undefined") throw new Error("[IMarshal] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");
    if (typeof IPropertyCollection === "undefined") throw new Error("[IPropertyCollection] module load fail...");
    if (typeof IControlCollection === "undefined") throw new Error("[IControlCollection] module load fail...");
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.IObject                      = IObject;
        module.exports.IMarshal                     = IMarshal;
        module.exports.ICollection                  = ICollection;
        module.exports.IPropertyCollection          = IPropertyCollection;
        module.exports.IControlCollection           = IControlCollection;
    } else {
        global._W.Interface.IObject                 = IObject;
        global._W.Interface.IMarshal                = IMarshal;
        global._W.Interface.ICollection             = ICollection;
        global._W.Interface.IPropertyCollection     = IPropertyCollection;
        global._W.Interface.IControlCollection      = IControlCollection;
    }

}(this));