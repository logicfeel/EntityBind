/**
 * _W.Interface.IObject
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    require("./object-implement.slim"); // 폴리필
    global._W   = global._W || {};

    var util;
    var IObject;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        util        = require("./utils");
        IObject     = require("./i-object");

    } else {
        util        = global._W.util;
        IObject     = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IObject === "undefined") throw new Error("[IObject] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IMarshal  = (function (_super) {
        function IMarshal() {
            _super.call(this);
        }
    
        IMarshal.prototype.getObject  = function() {
            throw new Error("에러:: 구현해야함.");
        };
    
        return IMarshal;
    }(IObject));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IMarshal;
    } else {
        global._W.Interface.IMarshal = IMarshal;
    }
    
}(this));