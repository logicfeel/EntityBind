/**
 * @namespace _W.Meta.Bind.BindModelAjax
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
    var BindModel;
    var PropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        BindModel               = require("./bind-model");
        PropertyCollection      = require("./collection-property");
    } else {
        util                    = global._W.Common.Util;
        BindModel               = global._W.Meta.Bind.BindModel;
        PropertyCollection      = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelAjax  = (function (_super) {
        /**
         * @class
         */
        function BindModelAjax(p_objectDI, p_itemType) {
            _super.call(this, p_objectDI);

            var __baseAjaxSetup = {
                url: "",
                type: "GET"
            };

            // Entity 추가 및 baseEntity 설정
            this._baseEntity = this.addEntity('first');

            // 참조 추가
            this.items = this._baseEntity.items; 

            if (typeof p_itemType === "function") {
                this.itemType = p_itemType;
                this._baseEntity.items.itemType = this.itemType;
            }

            /** @property {baseAjaxSetup} */
            Object.defineProperty(this, "baseAjaxSetup", 
            {
                get: function() { return __baseAjaxSetup; },
                configurable: true,
                enumerable: true
            });

            /** @property {baseUrl} */
            Object.defineProperty(this, "baseUrl", 
            {
                get: function() { return __baseAjaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [baseUrl] type 'string' can be added");
                    __baseAjaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            });
        }
        util.inherits(BindModelAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        // BindModelAjax.prototype.checkSelector  = function(p_collection) {
            
        //     var collection = p_collection || this.prop;
        //     var failSelector;

        //     // 유효성 검사
        //     if (!(collection instanceof PropertyCollection)) throw new Error("Only [p_collection] type 'PropertyCollection' can be added");

        //     // 검사
        //     for (var i = 0; collection.count > i; i++) {
        //         if (typeof collection[i].selector !== "undefined") {
        //             failSelector = util.validSelector(collection[i].selector);
        //             if (failSelector !== null) {
        //                 console.warn("selector 검사 실패 : %s ", failSelector);
        //                 return false;
        //             }
        //         }
        //     }
            
        //     return true;
        // };
        BindModelAjax.prototype.checkSelector  = function(p_collection) {
            
            var collection = p_collection || this.prop;
            var failSelector = null;
            var selectors = [];
            var selector = "";

            // 유효성 검사
            if (!(collection instanceof PropertyCollection)) throw new Error("Only [p_collection] type 'PropertyCollection' can be added");

            // 검사
            for (var i = 0; collection.count > i; i++) {
                if (typeof collection[i].selector !== "undefined") {
                    selectors = [];
                    if (Array.isArray(collection[i].selector)) 
                        selectors = collection[i].selector;
                    else   
                        selectors.push(collection[i].selector)
                    
                    for (var ii = 0; ii < selectors.length; ii++) {
                        selector  = typeof selectors[ii] === "function" ? selectors[ii].call(this) : selectors[ii];

                        if (typeof selector === "string" && selector.length > 0) failSelector = util.validSelector(selector);
                        
                        if (failSelector !== null) {
                            console.warn("selector 검사 실패 : %s ", failSelector);
                            return false;
                        }
                    }
                }
            }
            
            return true;
        };


        return BindModelAjax;
    
    }(BindModel));
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelAjax;
    } else {
        global._W.Meta.Bind.BindModelAjax = BindModelAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));