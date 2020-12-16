/**
 * @namespace _W.Meta.Bind.BindModel
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
    var BaseBind;
    var ItemCollection;
    var PropertyCollection;
    var PropertyFunctionCollection;
    var IBindModel;
    var Entity;
    var EntityTable;
    var Item;
    var MetaObject;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                        = require("./utils");
        BaseBind                    = require("./bind-base");
        ItemCollection              = require("./entity-item").ItemCollection;
        PropertyCollection          = require("./collection-property");
        PropertyFunctionCollection  = require("./collection-property-function");        
        IBindModel                  = require("./i-bind-model");        
        Entity                      = require("./entity-base");
        EntityTable                 = require("./entity-table").EntityTable;
        Item                        = require("./entity-item").Item;
        MetaObject                  = require("./meta-object");
    } else {
        util                        = global._W.Common.Util;
        BaseBind                    = global._W.Meta.Bind.BaseBind;
        ItemCollection              = global._W.Meta.Entity.ItemCollection;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        PropertyFunctionCollection  = global._W.Collection.PropertyFunctionCollection;        
        IBindModel                  = global._W.Interface.IBindModel;        
        Entity                      = global._W.Meta.Entity.Entity;        
        EntityTable                 = global._W.Meta.Entity.EntityTable;        
        Item                        = global._W.Meta.Entity.Item;        
        MetaObject                  = global._W.Meta.MetaObject;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof PropertyFunctionCollection === "undefined") throw new Error("[PropertyFunctionCollection] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel(p_objectDI)  {
            _super.call(this);

            var __attr          = new PropertyCollection(this);
            var __mode          = new PropertyFunctionCollection(this);
            var __mapping       = new PropertyCollection(this);

            var __cbRegister    = function() {};
            var __cbCheck       = function() {return true};
            var __cbReady       = function() {};
            var __cbFail        = function() { console.warn("바인딩 실패하였습니다."); };
            var __cbError       = function() { console.error("바인딩 오류가 발생 하였습니다."); };
            var __itemType      = Item;

            var propObject;

            /** @property {attr} */
            Object.defineProperty(this, "attr", 
            {
                get: function() { return __attr; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyCollection)) throw new Error("Only [attr] type 'PropertyCollection' can be added");
                    __attr = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {mode} */
            Object.defineProperty(this, "mode", 
            {
                get: function() { return __mode; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyFunctionCollection)) throw new Error("Only [mode] type 'PropertyFunctionCollection' can be added");
                    __mode = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {mapping} */
            Object.defineProperty(this, "mapping", 
            {
                get: function() { return __mapping; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyCollection)) throw new Error("Only [mapping] type 'PropertyCollection' can be added");
                    __mapping = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbRegister} */
            Object.defineProperty(this, "cbRegister", 
            {
                get: function() { return __cbRegister; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbRegister] type 'Function' can be added");
                    __cbRegister = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /** @property {cbCheck} */
            Object.defineProperty(this, "cbCheck", 
            {
                get: function() { return __cbCheck; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbCheck] type 'Function' can be added");
                    __cbCheck = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbReady} */
            Object.defineProperty(this, "cbReady", 
            {
                get: function() { return __cbReady; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbReady] type 'Function' can be added");
                    __cbReady = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbFail} */
            Object.defineProperty(this, "cbFail", 
            {
                get: function() { return __cbFail; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbFail] type 'Function' can be added");
                    __cbFail = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbError} */
            Object.defineProperty(this, "cbError", 
            {
                get: function() { return __cbError; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbError] type 'Function' can be added");
                    __cbError = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {itemType} */
            Object.defineProperty(this, "itemType", 
            {
                get: function() { return __itemType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error("Only [itemType] type 'Item' can be added");
                    __itemType = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // DI 의존성 주입 : 객체를 비교하여 삽입
            if (p_objectDI instanceof IBindModel) {     // 가능
                
                // attr 등록
                if (typeof p_objectDI["attr"] !== "undefined" && p_objectDI["attr"] !== null) {
                    propObject = p_objectDI["attr"];
                    for(var prop in propObject) {
                        if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                            __attr.add(prop, propObject[prop]);
                        }
                    }
                }
                // mode 등록
                if (typeof p_objectDI["mode"] !== "undefined" && p_objectDI["mode"] !== null) {
                    propObject = p_objectDI["mode"];
                    for(var prop in propObject) {
                        if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                            __mode.add(prop, propObject[prop]);
                        }
                    }
                }
                if (typeof p_objectDI["mapping"] !== "undefined" && p_objectDI["mapping"] !== null) {
                    propObject = p_objectDI["mapping"];
                    for(var prop in propObject) {
                        if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                            __mapping.add(prop, propObject[prop]);
                        }
                    }
                }
                if (typeof p_objectDI["cbRegister"] === "function") {
                    __cbRegister = p_objectDI["cbRegister"];
                }
                if (typeof p_objectDI["cbCheck"] === "function") {
                    __cbCheck = p_objectDI["cbCheck"];
                }
                if (typeof p_objectDI["cbReady"] === "function") {
                    __cbReady = p_objectDI["cbReady"];
                }
                if (typeof p_objectDI["cbFail"] === "function") {
                    __cbFail = p_objectDI["cbFail"];
                }
                if (typeof p_objectDI["cbError"] === "function") {
                    __cbError = p_objectDI["cbError"];
                }

                if (typeof p_objectDI["onExecute"] === "function") {
                    this.onExecute = p_objectDI["onExecute"];
                }
                if (typeof p_objectDI["onExecuted"] === "function") {
                    this.onExecuted = p_objectDI["onExecuted"];
                }
            }

            /** @implements IBindModel 인터페이스 구현 */
            this._implements(IBindModel);
        }
        util.inherits(BindModel, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModel.prototype.getTypes  = function() {
                    
            var type = ["BindModel"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @method */
        BindModel.prototype.init = function() {
            this.cbRegister.call(this);
            if (this.cbCheck.call(this)) {
                this.cbReady.call(this)
            }
        };
        
        BindModel.prototype.addEntity = function(p_name) {

            var entity;

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            entity = new EntityTable(p_name);
            entity.items.itemType = this.itemType;    // 아이템타입 설정
            
            this[p_name] = entity;
            
            return entity;
        }

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?array<string>} p_cmds <선택> 추가할 아이템 명령
         * @param {?array<string> | string} p_entities <선택> 추가할 아이템 명령
         */
        BindModel.prototype.add = function(p_item, p_cmds, p_entities) {

            var cmds = [];
            var property = [];      // 속성

            // 1.유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type 'Item' can be added");
            }
            if (typeof p_cmds !== "undefined" && p_cmds !== null && (!(Array.isArray(p_cmds) || typeof p_cmds === "string"))) {
                throw new Error("Only [a_cmd] type 'Array | string' can be added");
            }
            
            // 2.초기화 설정
            if (Array.isArray(p_cmds)) cmds = p_cmds;
            else if (typeof p_cmds === "string" && p_cmds.length > 0) cmds.push(p_cmds);
            
            // 3.설정 대상 가져오기
            if (cmds.length > 0) {
                for (var i = 0; i< cmds.length; i++) {
                    
                    if (typeof cmds[i] !== "string") throw new Error("Only [String] type instances can be added");
                    
                    if (this[cmds[i]]) {
                        property.push(cmds[i]);
                    } else {
                        console.warn("Warning!! Param p_cmds 에 [" + cmds[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof MetaObject && this[prop].instanceOf("BindCommand") && prop.substr(0, 1) !== "_") {
                        property.push(prop.toString());
                    }
                }
            }
            // 4.설정(등록)
            for (var i = 0; i < property.length; i++) {
                this[property[i]].add(p_item, p_entities);
            }
        };

        /**
         * p_name으로 아이템을 p_entitys(String | String)에 다중 등록한다.
         * @param {string} p_name
         * @param {object | String | number | boolean} p_value 
         * @param {?array<string> | string} p_entities <선택> 추가할 아이템 명령
         */
        BindModel.prototype.addItem = function(p_name, p_value, p_cmds, p_entities) {

            var item;
            
            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            item = this._baseEntity.items.addValue(p_name, p_value);

            this.add(item, p_cmds, p_entities);
        };

        /**
         * 속성을 baseEntiey 또는 지정 Entity에  등록(로딩)한다.
         * @param {?string | ?array<string>} p_attr 
         * @param {?string} p_entity 
         */
        BindModel.prototype.loadAttr = function(p_attr, p_entity) {

            var attr = [];
            var entity;
            var propName;

            // 1.초기화
            if (Array.isArray(p_attr)) attr = attr.concat(p_attr);      // Array의 경우
            else if (typeof p_attr === "string") attr.push(p_attr);       // String의 경우
            else attr = this.attr.properties;                             // 없을 경우 (전체 가져옴)

            // 2.유효성 검사
            if (typeof p_attr !== "undefined" && (!Array.isArray(p_attr) || typeof p_attr === "string")) {
                throw new Error("Only [p_entities] type 'Array | string' can be added");
            }
            if (typeof p_entity !== "undefined" && typeof p_entity !== "string") {
                throw new Error("Only [p_entity] type 'string' can be added");
            }
            if (typeof p_entity !== "undefined" && typeof this[p_entity] === "undefined") {
                throw new Error(" BindModel에 ["+ p_entity +"]의 Entity가 없습니다. ");
            }

            entity = this[p_entity] || this._baseEntity;

            // 3.속성정보 등록
            for(var i = 0; attr.length > i; i++) {
                propName = attr[i];
                if (typeof propName === "string" && typeof this.attr[propName] !== "undefined") {
                    if(["number", "string", "boolean"].indexOf(typeof this.attr[propName]) > -1) {
                        entity.items.addValue(propName, this.attr[propName]);
                    } else if (this.attr[propName]  !== null && typeof this.attr[propName] === "object"){
                        entity.items.add(new this.itemType(propName, entity, this.attr[propName]))
                    }
                }
            }

            // 4.매핑
            this.setMapping(this.mapping, p_entity);
        };

        /**
         * 아이템을 매핑한다.
         * @param {ProperyCollection | object} p_mapping Item 에 매핑할 객체 또는 컬렉션
         * @param {?string} p_entity 대상 엔티티
         */
        BindModel.prototype.setMapping = function(p_mapping, p_entity) {
            
            var mappingCollection;
            var entity;
            var propName;
            var item;
            

            // 1.유효성 검사
            if (!(p_mapping instanceof PropertyCollection || typeof p_mapping === "object")) {
                throw new Error("Only [p_mapping] type 'PropertyCollection | object' can be added");
            }
            if (typeof p_entity !== "undefined" && typeof p_entity !== "string") {
                throw new Error("Only [p_entity] type 'string' can be added");
            }
            if (typeof p_entity !== "undefined" && typeof this[p_entity] === "undefined") {
                throw new Error(" BindModel에 ["+ p_entity +"]의 Entity가 없습니다. ");
            }

            entity = this[p_entity] || this._baseEntity;

            // 2. 임시 매핑 컬렉션에 등록
            if (p_mapping instanceof PropertyCollection) {
                mappingCollection = p_mapping;
            } else if (typeof p_mapping === "object") {
                mappingCollection = new PropertyCollection();
                for(var prop in p_mapping) {
                    if (p_mapping.hasOwnProperty(prop) && typeof p_mapping[prop] !== "undefined") {
                        mappingCollection.add(prop, p_mapping[prop]);
                    }
                }
            }

            // 3. 아이템 매핑
            for(var i = 0; mappingCollection.count > i; i++) {
                propName = mappingCollection.propertyOf(i);
                item = entity.items[propName];
                if (typeof item !== "undefined") {
                    for (var prop in mappingCollection[i]) {    // command 조회
                        if (mappingCollection[i].hasOwnProperty(prop)) {
                            this.add(item, prop, mappingCollection[i][prop]);
                        }
                    }
                } else {
                    console.warn("entity에 지정된 [%s] BindCommand 가 없습니다. ");
                }
            }
        };

        return BindModel;
    
    }(BaseBind));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModel;
    } else {
        global._W.Meta.Bind.BindModel = BindModel;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));