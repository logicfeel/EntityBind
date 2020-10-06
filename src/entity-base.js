/**
 * @namespace _W.Meta.Entity.Entity
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Entity   = global._W.Meta.Entity || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaElement;
    var IPropertyCollection;
    var IGroupControl;
    var IAllControl;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필
        
        util                    = require("./utils");
        MetaElement             = require("./meta-element");
        IGroupControl           = require("./i-control-group");
        IAllControl             = require("./i-control-all");
    } else {
        util                    = global._W.Common.Util;
        MetaElement             = global._W.Meta.MetaElement;
        IGroupControl           = global._W.Interface.IGroupControl;
        IAllControl             = global._W.Interface.IAllControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof IAllControl === "undefined") throw new Error("[IAllControl] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var Entity  = (function (_super) {
        /**
         * @abstract @class
         */
        function Entity(p_name) {
            _super.call(this, p_name);

            var __items = [];
            /**
             * TODO::
             * @implements
             */
            Object.defineProperty(this, "count", 
            {
                get: function() { return __items.length; },
                configurable: true,
                enumerable: true
            });
            Object.defineProperty(this, "list", 
            {
                get: function() { return __items; },
                configurable: true,
                enumerable: true
            });

            /**
             * @abstract 상속에서 생성해야함
             */
            this.items = null;
            this.rows = null;

             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(Entity, _super);

        /**
         * @abstract IGroupControl
         */
        Entity.prototype.merge  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        Entity.prototype.copyTo  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        
        /**
         * @abstract IAllControl
         */
        Entity.prototype.clone  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        Entity.prototype.load  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        Entity.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        Entity.prototype.select  = function() {
            throw new Error("[ select() ] Abstract method definition, fail...");
        };

        Entity.prototype.newRow  = function() {
            // TODO::
        };
        Entity.prototype.clearRow  = function() {
            // TODO::
        };

        return Entity;
    
    }(MetaElement));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = Entity;
    } else {
        global._W.Meta.Entity.Entity = Entity;
    }

}(this));