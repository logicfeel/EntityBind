/**
 * @namespace _W.Meta.Bind.BindCommandView
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
    var BindCommand;
    var ItemRefCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommand         = require("./bind-cmd");
        ItemRefCollection   = require("./item").ItemRefCollection;
    } else {
        util                = global._W.Common.Util;
        BindCommand         = global._W.Meta.Bind.BindCommand;
        ItemRefCollection   = global._W.Meta.Bind.ItemRefCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof ItemRefCollection === "undefined") throw new Error("[ItemRefCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandView  = (function (_super) {
        /**
         * @class
         */
        function BindCommandView(p_onwer) {
            _super.call(this, p_onwer);

            /** @public  */
            this.valid = new ItemRefCollection(this, p_onwer.entity.items);

            this.bind = new ItemRefCollection(this, p_onwer.entity.items);

            this.view = new ItemRefCollection(this, p_onwer.entity.items);
            
        }
        util.inherits(BindCommandView, _super);
    
        BindCommandView.prototype.execute = function() {
            if (this.execValid()) this.execBind();
        };

        /** @virtual */
        BindCommandView.prototype.execValid = function() {
            throw new Error("[ execValid() ] Abstract method definition, fail...");
        };

        /** @virtual */
        BindCommandView.prototype.execBind = function() {
            throw new Error("[ execBind() ] Abstract method definition, fail...");
        };
        
        /** @virtual */
        BindCommandView.prototype.execCallback = function() {
            throw new Error("[ execCallback() ] Abstract method definition, fail...");
        };

        /** @virtual */
        BindCommandView.prototype.execView = function() {
            throw new Error("[ execView() ] Abstract method definition, fail...");
        };

        return BindCommandView;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandView;
    } else {
        global._W.Meta.Bind.BindCommandView = BindCommandView;
    }

}(this));