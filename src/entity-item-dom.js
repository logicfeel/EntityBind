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
        Item                = require("./entity-item").Item;
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
        function ItemDOM(p_name, p_entity, p_option) {
            _super.call(this, p_name, p_entity, p_option);

            var __domType       = null;
            var __isReadOnly    = false;
            var __isHide        = false;
            var __element       = null;

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

            /** @property {element} */
            Object.defineProperty(this, "element", 
            {
                get: function() { return __element; },
                set: function(newValue) { 
                    if(typeof newValue !== "object") throw new Error("Only [element] type 'object' can be added");
                    __element = newValue;
                },
                configurable: true,
                enumerable: true
            });

            if (typeof p_option === "object" ) {
                for(var prop in p_option) {
                    if (p_option.hasOwnProperty(prop) && ["domType", "isReadOnly", "isHide", "element"].indexOf(prop)) {
                        this[prop] = p_option[prop];
                    }
                }
            } 
        }
        util.inherits(ItemDOM, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        ItemDOM.prototype.getTypes  = function() {
                    
            var type = ["ItemDOM"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        ItemDOM.prototype.clone  = function() {
                    
            var top = _super.prototype.clone.call(this);
            var clone = new ItemDOM(this.name);

            for(var prop in top) {
                if (top.hasOwnProperty(prop)) {
                    if (top[prop]) clone[prop] = top[prop];
                }
            }

            if (this.domType) clone["domType"]          = this.domType;     // 참조값
            if (this.isReadOnly) clone["isReadOnly"]    = this.isReadOnly;
            if (this.isHide) clone["isHide"]            = this.isHide;
            
            return clone;
        };

        /**
         * 상위 Item.value 의 특성을 오버라이딩함
         * @param {Function} p_getter 
         * @param {Function} p_setter 
         */
        ItemDOM.prototype.defineValueProperty  = function(p_getter, p_setter) {
            p_getter = p_getter || function() { return this.value };
            p_setter = p_setter || function(val) { this.value = val };

            // 유효성 검사
            if (typeof p_getter !== "function") throw new Error("Only [p_getter] type 'function' can be added");
            if (typeof p_setter !== "function") throw new Error("Only [p_setter] type 'function' can be added");

            Object.defineProperty(this, "value", 
            {
                get: p_getter,
                set: p_setter,
                configurable: true,
                enumerable: true
            });
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