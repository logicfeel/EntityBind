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
    var jquery;
    var ajax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("./utils");
        Item                    = require("./entity-item").Item;
    } else {
        util                    = global._W.Common.Util;
        Item                    = global._W.Meta.Entity.Item;
        jquery                  = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");
    if (typeof jquery === "undefined" && typeof module !== "object") throw new Error("[jquery] module load fail...");

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
            
            //var __selector      = [];
            var __selector      = { key: "", type: "value" };

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

            // /** @property {selector} */
            // Object.defineProperty(this, "selector", 
            // {
            //     get: function() { return __selector; },
            //     set: function(newValue) { 
            //         var values = [];
            //         if (Array.isArray(newValue)) values = newValue;
            //         else values.push(newValue);
            //         for (var i = 0; values.length > i; i++) {
            //             if(typeof values[i] !== "string" ) {  // 검사 
            //                 throw new Error("Only [selector] type 'string' can be added");
            //             }
            //         }
            //         __selector = __selector.concat(values);
            //     },
            //     configurable: true,
            //     enumerable: true
            // });
            /** @property {selector} */
            Object.defineProperty(this, "selector", 
            {
                // get: function() { 
                //     var _sel = [];
                //     var _str = "";
                //     for (var i = 0; this.__selector.length > i; i++) {
                //         _str  = typeof this.__selector[i] === "function" ? this.__selector[i].call(this) : this.__selector[i];
                //         _sel.push(_str);
                //     }
                //     return _sel; 
                // },
                // set: function(newValue) { 
                //     var values = [];
                //     var temp = "";
                //     if (Array.isArray(newValue)) values = newValue; // 배열로 넣으면 기존내용이 초기화됨
                //     else values.push(newValue);
                //     for (var i = 0; values.length > i; i++) {
                //         temp  = typeof values[i] === "function" ? values[i].call(this) : values[i];
                        
                //         if(typeof temp !== "string" ) {  // 검사 
                //             throw new Error("Only [selector] type 'string' can be added");
                //         }
                //     }
                //     this.__selector = this.__selector.concat(values);    // 기존에 추가됨
                // },
                /**
                 * type
                 *  - val | value   : 요소의 value 속성값
                 *  - text          : 요소의 텍스트값
                 *  - html          : 요소의 html값
                 *  - css.속성명    : css 의 속성값 (객체)
                 *  - prop.속성명   : 요소의 속성명값 (초기상태기준)
                 *  - attr.속성명   : 요소의 속성명값 (현재상태)
                 */
                get: function() { return __selector; },
                set: function(newValue) { 
                    var selector = { key: "", type: "value" };

                    if (typeof newValue === "string") {
                        selector.key = newValue;
                    } else if (typeof newValue === "object" && typeof newValue.key !== "undefined") {
                        selector = newValue;
                    } else {
                        throw new Error("Only [selector] type 'string | object.key' can be added");
                    }
                    __selector = selector;

                    // node 에서는 종료함
                    if (typeof module === "object") return;
                    
                    // value 값 설정
                    if (typeof selector.key === "string" && selector.key.length > 0) {
                        this.defineValueProperty(
                            function() {    // value getter
                                var key = this.selector.key;
                                var type = this.selector.type;
                                var option = type.indexOf(".") > -1 ? type.substr(type.indexOf(".") + 1) : "";
                                var value = "";

                                if (type === "value" || type === "val") {
                                    value = jQuery(key).val();
                                } else if (type === "text") {
                                    value = jQuery(key).text();
                                } else if (type === "html") {
                                    value = jQuery(key).html();
                                } else if (type.indexOf("prop") > -1) {
                                    value = jQuery(key).prop(option);
                                } else if (type.indexOf("attr") > -1) {
                                    value = jQuery(key).attr(option);
                                } else if (type.indexOf("css") > -1) {
                                    value = jQuery(key).css(option);
                                } else {
                                    console.warn("["+ key +"] selector의 type는[value, val, text, prop, attr, css] 이어야합니다. ");
                                }
                                return value;
                            }, 
                            function(val) { // value setter
                                var key = this.selector.key;
                                var type = this.selector.type;
                                var option = type.indexOf(".") > -1 ? type.substr(type.indexOf(".") + 1) : "";
                                var value = "";

                                if (type === "value" || type === "val") {
                                    jQuery(key).val(val);
                                } else if (type === "text") {
                                    jQuery(key).text(val);
                                } else if (type === "html") {
                                    jQuery(key).html(val);
                                } else if (type.indexOf("prop") > -1) {
                                    jQuery(key).prop(option, val);
                                } else if (type.indexOf("attr") > -1) {
                                    jQuery(key).attr(option, val);
                                } else if (type.indexOf("css") > -1) {
                                    jQuery(key).css(option, val);
                                } else {
                                    console.warn("["+ key +"] selector의 type는[value, val, text, prop, attr, css] 이어야합니다. ");
                                }
                            }
                        );
                    }
                },
                configurable: true,
                enumerable: true
            });

            
            if (typeof p_option === "object" ) {
                for(var prop in p_option) {
                    if (p_option.hasOwnProperty(prop) && 
                        ["domType", "isReadOnly", "isHide", "element", "selector"].indexOf(prop) > -1) {
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
            if (this.element) clone["element"]          = this.element;
            
            if (this.selector) clone["selector"]        = this.selector;
            // if (this.selector) clone.__selector        = this.__selector.concat([]); // 배열 + 함수형
            
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
        global.ItemDOM = ItemDOM;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));