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
    var IBindModel;
    var BindCommandLookupAjax;
    var BindCommandEditAjax;
    var ItemDOM;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        BindModel               = require("./bind-model");
        PropertyCollection      = require("./collection-property");
        IBindModel              = require("./i-bind-model");        
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
        ItemDOM                 = require("./entity-item-dom");
    } else {
        util                    = global._W.Common.Util;
        BindModel               = global._W.Meta.Bind.BindModel;
        PropertyCollection      = global._W.Collection.PropertyCollection;
        IBindModel              = global._W.Interface.IBindModel;        
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
        ItemDOM                 = global._W.Meta.Entity.ItemDOM;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");
    if (typeof ItemDOM === "undefined") throw new Error("[ItemDOM] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelAjax  = (function (_super) {
        /**
         * @class
         */
        function BindModelAjax(p_itemType) {
            _super.call(this);
            
            p_itemType = p_itemType || ItemDOM; // 기본값

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

            // 예약어 등록
            this._symbol = this._symbol.concat(["items", "baseAjaxSetup", "baseUrl"]);
            this._symbol = this._symbol.concat(["getTypes", "checkSelector", "setService"]);
        }
        util.inherits(BindModelAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelAjax.prototype.checkSelector  = function(p_collection) {
            
            var collection = p_collection || this.prop;
            var failSelector = null;
            var selectors = [];
            var selector = "";

            // 유효성 검사
            if (!(collection instanceof PropertyCollection)) throw new Error("Only [p_collection] type 'PropertyCollection' can be added");

            // 검사
            // for (var i = 0; collection.count > i; i++) {
            //     if (typeof collection[i].selector !== "undefined") {
            //         selectors = [];
            //         if (Array.isArray(collection[i].selector)) 
            //             selectors = collection[i].selector;
            //         else   
            //             selectors.push(collection[i].selector)
                    
            //         for (var ii = 0; ii < selectors.length; ii++) {
            //             selector  = typeof selectors[ii] === "function" ? selectors[ii].call(this) : selectors[ii];

            //             if (typeof selector === "string" && selector.length > 0) failSelector = util.validSelector(selector);
                        
            //             if (failSelector !== null) {
            //                 console.warn("selector 검사 실패 : %s ", failSelector);
            //                 return false;
            //             }
            //         }
            //     }
            // }            
            for (var i = 0; collection.count > i; i++) {
                if (typeof collection[i].selector !== "undefined") {
                        selector = collection[i].selector.key;

                        if (typeof selector === "string" && selector.length > 0) failSelector = util.validSelector(selector);
                        
                        if (failSelector !== null) {
                            console.warn("selector 검사 실패 : %s ", failSelector);
                            return false;
                        }
                }
            }
            
            return true;
        };

        BindModelAjax.prototype.listSelector  = function(p_isLog) {
            
            var collection = this.items;
            var obj;
            var selector;
            var selectors = [];

            for (var i = 0; collection.count > i; i++) {
                selector = collection[i].selector;
                if (typeof selector !== "undefined" && typeof selector.key === "string" && selector.key.length > 0) {
                        obj = { 
                            item: collection[1].name, 
                            key: collection[i].selector.key, 
                            type: collection[i].selector.type,
                            check: util.validSelector(selector.key) === null ? true : false
                        };
                        selectors.push(obj);
                }
            }
            // 정렬
            selectors.sort(function(a, b) {
                if (a.check > b.check) {
                    return 1;
                } else {
                    return -1;
                }
            });
            if (p_isLog === true) {
                for (var i = 0; i < selectors.length > 0; i++ ) {
                    if (selectors[i].check === true) {
                        console.log("item: %s, key: %s, type: %s ", selectors[i].item, selectors[i].key, selectors[i].type);
                    } else {
                        console.warn("item: %s, key: %s, type: %s [Fail]", selectors[i].item, selectors[i].key, selectors[i].type);
                    }
                }
            }
            
            return selectors;
        };

        BindModelAjax.prototype.setService  = function(p_service, p_isLoadProp) {

            var propObject;

            p_isLoadProp = p_isLoadProp || true;       // 기본값

            // 유효성 검사
            if (!(p_service instanceof IBindModel)) throw new Error("Only [p_service] type 'IBindModel' can be added");

            // command 등록
            for (var prop in p_service) {
                if (p_service.hasOwnProperty(prop)) {
                    if (typeof p_service[prop] === "function" && p_service[prop].name ==="BindCommandEditAjax") {
                        this[prop] = new BindCommandEditAjax(this, this._baseEntity);
                    }
                    if (typeof p_service[prop] === "function" && p_service[prop].name ==="BindCommandLookupAjax") {
                        this[prop] = new BindCommandLookupAjax(this, this._baseEntity);
                    }
                }
            }            
            
            // prop 등록
            if (typeof p_service["prop"] !== "undefined" && p_service["prop"] !== null) {
                propObject = p_service["prop"];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {

                        //__prop.add(prop, propObject[prop]);
                        // get/sett 형식의 기능 추가
                        if (typeof propObject[prop] === "object" 
                            && (typeof propObject[prop].get === "function" || typeof propObject[prop].set === "function")) {
                            this.prop.add(prop, "", propObject[prop]);    
                        } else {
                            this.prop.add(prop, propObject[prop]);
                        }
                    }
                }
            }
            
            // mode 등록
            if (typeof p_service["mode"] !== "undefined" && p_service["mode"] !== null) {
                propObject = p_service["mode"];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                        this.mode.add(prop, propObject[prop]);
                    }
                }
            }
            if (typeof p_service["mapping"] !== "undefined" && p_service["mapping"] !== null) {
                propObject = p_service["mapping"];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                        this.mapping.add(prop, propObject[prop]);
                    }
                }
            }
            if (typeof p_service["preRegister"] === "function") {
                // __preRegister = p_service["preRegister"];
                this.preRegister = p_service["preRegister"];
            }
            if (typeof p_service["preCheck"] === "function") {
                // __preCheck = p_service["preCheck"];
                this.preCheck = p_service["preCheck"];
            }
            if (typeof p_service["preReady"] === "function") {
                // __preReady = p_service["preReady"];
                this.preReady = p_service["preReady"];
            }
            if (typeof p_service["cbFail"] === "function") {
                this.cbFail = p_service["cbFail"];
            }
            if (typeof p_service["cbError"] === "function") {
                this.cbError = p_service["cbError"];
            }
            
            if (typeof p_service["cbResult"] === "function") {
                this.cbResult = p_service["cbResult"];
            }
            if (typeof p_service["cbBaseValid"] === "function") {
                this.cbBaseValid = p_service["cbBaseValid"];
            }
            if (typeof p_service["cbBaseBind"] === "function") {
                this.cbBaseBind = p_service["cbBaseBind"];
            }
            if (typeof p_service["cbBaseOutput"] === "function") {
                this.cbBaseOutput = p_service["cbBaseOutput"];
            }
            if (typeof p_service["cbBaseEnd"] === "function") {
                this.cbBaseEnd = p_service["cbBaseEnd"];
            }

            if (typeof p_service["onExecute"] === "function") {
                this.onExecute = p_service["onExecute"];
            }
            if (typeof p_service["onExecuted"] === "function") {
                this.onExecuted = p_service["onExecuted"];
            }
            
            
            // 속성(prop)을 아이템으로 로딩 ("__"시작이름 제외)
            if (p_isLoadProp === true) {
                this.loadProp();
            }  
        };

        return BindModelAjax;
    
    }(BindModel));
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelAjax;
    } else {
        global._W.Meta.Bind.BindModelAjax = BindModelAjax;
        global.BindModelAjax = BindModelAjax;        // 힌트
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));