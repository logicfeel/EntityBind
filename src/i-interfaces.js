/**
 * @namespace _W.Interface.IObject
 * @namespace _W.Interface.IMarshal
 * @namespace _W.Interface.ICollection
 * @namespace _W.Interface.IPropertyCollection
 * @namespace _W.Interface.IControlCollection
 */
(function(global) {
    
    "use strict";
    
    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IAllControl;
    var IExportControl;
    var IGroupControl;
    var IImportControl;
    var ILookupControl;
    var IPartControl;
    var IObject;
    var IMarshal;
    var ICollection;
    var IPropertyCollection;
    var IControlCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        IAllControl             = require("./i-control-all");
        IExportControl          = require("./i-control-export");
        IGroupControl           = require("./i-control-group");
        IImportControl          = require("./i-control-import");
        ILookupControl          = require("./i-control-lookup");
        IPartControl            = require("./i-control-part");
        IObject                 = require("./i-object");
        IMarshal                = require("./i-marshal");
        ICollection             = require("./i-collection");
        IPropertyCollection     = require("./i-collection-property");
        IControlCollection      = require("./i-collection-control");
    } else {
        IAllControl             = global._W.Interface.IAllControl;
        IExportControl          = global._W.Interface.IExportControl;
        IGroupControl           = global._W.Interface.IGroupControl;
        IImportControl          = global._W.Interface.IImportControl;
        ILookupControl          = global._W.Interface.ILookupControl;
        IPartControl            = global._W.Interface.IPartControl;
        IObject                 = global._W.Interface.IObject;
        IMarshal                = global._W.Interface.IMarshal;
        ICollection             = global._W.Interface.ICollection;
        IPropertyCollection     = global._W.Interface.IObject;
        IControlCollection      = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof IAllControl === "undefined") throw new Error("[IAllControl] module load fail...");
    if (typeof IExportControl === "undefined") throw new Error("[IExportControl] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof IImportControl === "undefined") throw new Error("[IImportControl] module load fail...");
    if (typeof ILookupControl === "undefined") throw new Error("[ILookupControl] module load fail...");
    if (typeof IPartControl === "undefined") throw new Error("[IPartControl] module load fail...");
    if (typeof IObject === "undefined") throw new Error("[IObject] module load fail...");
    if (typeof IMarshal === "undefined") throw new Error("[IMarshal] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");
    if (typeof IPropertyCollection === "undefined") throw new Error("[IPropertyCollection] module load fail...");
    if (typeof IControlCollection === "undefined") throw new Error("[IControlCollection] module load fail...");

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.IAllControl                  = IAllControl;
        module.exports.IExportControl               = IExportControl;
        module.exports.IGroupControl                = IGroupControl;
        module.exports.IImportControl               = IImportControl;
        module.exports.ILookupControl               = ILookupControl;
        module.exports.IPartControl                 = IPartControl;
        module.exports.IObject                      = IObject;
        module.exports.IMarshal                     = IMarshal;
        module.exports.ICollection                  = ICollection;
        module.exports.IPropertyCollection          = IPropertyCollection;
        module.exports.IControlCollection           = IControlCollection;
    } else {
        global._W.Interface.IAllControl             = IAllControl;
        global._W.Interface.IExportControl          = IExportControl;
        global._W.Interface.IGroupControl           = IGroupControl;
        global._W.Interface.IImportControl          = IImportControl;
        global._W.Interface.ILookupControl          = ILookupControl;
        global._W.Interface.IPartControl            = IPartControl;
        global._W.Interface.IObject                 = IObject;
        global._W.Interface.IMarshal                = IMarshal;
        global._W.Interface.ICollection             = ICollection;
        global._W.Interface.IPropertyCollection     = IPropertyCollection;
        global._W.Interface.IControlCollection      = IControlCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));