/**
 * _W.Interface.IMarshal
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    var common;
    var ICollection;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        common              = require("./utils");
        ICollection         = require("./i-collection");
    } else {
        common              = global._W.common;
        ICollection         = global._W.Interface.ICollection;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof common === "undefined") throw new Error("[common] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IPropertyCollection  = (function (_super) {
        function IPropertyCollection() {
            _super.call(this);
        }
    
        IPropertyCollection.prototype.propertyOf  = function() {
            throw new Error("에러:: 구현해야함.");
        };
    
        return IPropertyCollection;
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IPropertyCollection;
    } else {
        global._W.Interface.IPropertyCollection = IPropertyCollection;
    }
    
}(this));