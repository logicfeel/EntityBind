/**
 * 인터페이스 전체
 */
(function(global) {
    "use strict";
    //==============================================================
    // 1. 모듈 및 네임스페이스 선언
    global._W   = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    var IObject             = require("./i-object");
    var IMarshal            = require("./i-marshal");
    var ICollection         = require("./i-collection");
    var IPropertyCollection = require("./i-collection-property");
    var IControlCollection  = require("./i-collection-control");
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.IObject              = IObject;
        module.exports.IMarshal             = IMarshal;
        module.exports.ICollection          = ICollection;
        module.exports.IPropertyCollection  = IPropertyCollection;
        module.exports.IControlCollection   = IControlCollection;
    } else {
        global._W.IObject                   = IObject;
        global._W.IMarshal                  = IMarshal;
        global._W.ICollection               = ICollection;
        global._W.IPropertyCollection       = IPropertyCollection;
        global._W.IControlCollection        = IControlCollection;
    }

}(this));    