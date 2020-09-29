/**
 * _W.Interface.IMarshal
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    var util;
    var ICollection;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        ICollection         = require("./i-collection");
    } else {
        util                = global._W.Common.Util;
        ICollection         = global._W.Interface.ICollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IPropertyCollection  = (function (_super) {
        function IPropertyCollection() {
            _super.call(this);
        }
        util.inherits(IPropertyCollection, _super);

        IPropertyCollection.prototype.propertyOf  = function() {
            throw new Error("[ propertyOf() ] Abstract method definition, fail...");
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