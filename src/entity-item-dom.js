/**
 * @namespace _W.Meta.Entity.ItemDOM
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
    var Item;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        Item                = require("./entity-item");
    } else {
        util                = global._W.Common.Util;
        Item                = global._W.Meta.Entity.Item;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var ItemDOM  = (function (_super) {
        /**
         * @class
         */
        function ItemDOM() {
            _super.call(this);

            var __domType       = null;
            var __isReadOnly    = false;
            var __isHide        = false;
            var __refElement    = null;
            var __refValue      = null;

            /** @property {domType} */
            Object.defineProperty(this, "domType", 
            {
                get: function() { return __domType; },
                set: function(newValue) { 
                    // TODO:: 자료종류 {input: {type: "text"...}} 만들어야함
                    if(typeof newValue !== "object") throw new Error("Only [domType] type 'object' can be added");
                    __domType = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {isReadOnly} */
            Object.defineProperty(this, "isReadOnly", 
            {
                get: function() { return __isReadOnly; },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isReadOnly] type 'boolean' can be added");
                    __isReadOnly = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {isHide} */
            Object.defineProperty(this, "isHide", 
            {
                get: function() { return __isHide; },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isHide] type 'boolean' can be added");
                    __isHide = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {refElement} */
            Object.defineProperty(this, "refElement", 
            {
                get: function() { return __refElement; },
                set: function(newValue) { 
                    if(typeof newValue !== "object") throw new Error("Only [refElement] type 'object' can be added");
                    __refElement = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {refValue} */
            Object.defineProperty(this, "refValue", 
            {
                get: function() { return __refValue; },
                set: function(newValue) { 
                    __refValue = newValue;
                },
                configurable: true,
                enumerable: true
            });

        }
        util.inherits(ItemDOM, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        ItemDOM.prototype.getTypes  = function() {
                    
            var type = ["ItemDOM"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override */
        ItemDOM.prototype.getObject = function() {
            // TODO::
        };

        ItemDOM.prototype.toEntityColumn = function() {
            // TODO::
        };

        return ItemDOM;
    
    }(Item));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ItemDOM;
    } else {
        global._W.Meta.Entity.ItemDOM = ItemDOM;
    }

}(this));