/**
 * @namespace _W.Meta.Bind.BindCommandList
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandView;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandView     = require("./bind-command-view");
    } else {
        util                = global._W.Common.Util;
        BindCommandView     = global._W.Meta.Bind.BindCommandView;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandView === "undefined") throw new Error("[BindCommandView] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandList  = (function (_super) {
        /**
         * @class
         */
        function BindCommandList(p_model) {
            _super.call(this, p_model);

        }
        util.inherits(BindCommandList, _super);
    
        BindCommandList.prototype.execValid = function() {
            // TODO::
        };

        BindCommandList.prototype.execBind = function() {
            // TODO::
        };
        
        BindCommandList.prototype.execCallback = function() {
            // TODO::
        };

        BindCommandList.prototype.execView = function() {
            // TODO::
        };


        return BindCommandList;
    
    }(BindCommandView));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandList;
    } else {
        global._W.Meta.Bind.BindCommandList = BindCommandList;
    }

}(this));