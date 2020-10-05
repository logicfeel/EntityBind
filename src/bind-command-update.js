/**
 * @namespace _W.Meta.Bind.BindCommandUpdate
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-cmd-internal");
    } else {
        util                = global._W.Common.Util;
        BindCommandInternal = global._W.Meta.Bind.BindCommandInternal;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandInternal === "undefined") throw new Error("[BindCommandInternal] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandUpdate  = (function (_super) {
        /**
         * @class
         */
        function BindCommandUpdate(p_model) {
            _super.call(this, p_model);

        }
        util.inherits(BindCommandUpdate, _super);
    
        BindCommandUpdate.prototype.execValid = function() {
            // TODO::
        };

        BindCommandUpdate.prototype.execBind = function() {
            // TODO::
        };
        
        BindCommandUpdate.prototype.execCallback = function() {
            // TODO::
        };

        return BindCommandUpdate;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandUpdate;
    } else {
        global._W.Meta.Bind.BindCommandUpdate = BindCommandUpdate;
    }

}(this));