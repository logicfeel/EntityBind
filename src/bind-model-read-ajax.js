const BindCommandReadAjax = require("./bind-command-read-ajax");

/**
 * @namespace _W.Meta.Bind.BindModelReadAjax
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
    var BindModelRead;
    var BindCommandRead;
    var EntityTable;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModelRead       = require("./bind-model-read");
        BindCommandRead     = require("./bind-command-read");
        EntityTable         = require("./entity-table").EntityTable;
    } else {
        util                = global._W.Common.Util;
        BindModelRead       = global._W.Meta.Bind.BindModelRead;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        EntityTable         = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelRead === "undefined") throw new Error("[BindModelRead] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadAjax  = (function (_super) {
        /**
         * @class
         */
        function BindModelReadAjax() {
            _super.call(this);

            var __g_ajaxSetup = {
                url: "",
                method: "POST"
            };

            /** @property {ajaxSetup} */
            Object.defineProperty(this, "g_ajaxSetup", 
            {
                get: function() { return __g_ajaxSetup; },
                configurable: true,
                enumerable: true
            });

            /** @property {url} */
            Object.defineProperty(this, "g_url", 
            {
                get: function() { return __g_ajaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [url] type 'string' can be added");
                    __g_ajaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            }); 

            /** @property {method} */
            Object.defineProperty(this, "g_method",
            {
                get: function() { return __g_ajaxSetup.method; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [method] type 'string' can be added");
                    __g_ajaxSetup.method = newValue;
                },
                configurable: true,
                enumerable: true
            });             

            /** @override */
            this.read = new BindCommandReadAjax(this, this.first);
        }
        util.inherits(BindModelReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelReadAjax;
    
    }(BindModelRead));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadAjax;
    } else {
        global._W.Meta.Bind.BindModelReadAjax = BindModelReadAjax;
    }

}(this));