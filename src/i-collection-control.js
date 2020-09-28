/**
 * _W.Interface.IMarshal
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    var Util;
    var ICollection;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        Util                = require("./utils");
        ICollection         = require("./i-collection");
    } else {
        Util                = global._W.Util;
        ICollection         = global._W.Interface.ICollection;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof Util === "undefined") throw new Error("[Util] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IControlCollection  = (function (_super) {
        function IControlCollection() {
            _super.call(this);
        }
    
        IControlCollection.prototype.concat  = function() {
            throw new Error("에러:: 구현해야함.");
        };

        IControlCollection.prototype.copyTo  = function() {
            throw new Error("에러:: 구현해야함.");
        };

        IControlCollection.prototype.clone  = function() {
            throw new Error("에러:: 구현해야함.");
        };
    
        return IControlCollection;
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IControlCollection;
    } else {
        global._W.Interface.IControlCollection = IControlCollection;
    }
    
}(this));