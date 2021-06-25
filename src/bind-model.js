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
    var BindCommandAjax;

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
        BindCommandAjax         = require("./bind-command-ajax");
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
        BindCommandAjax         = global._W.Meta.Bind.BindCommandAjax;
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
    if (typeof BindCommandAjax === "undefined") throw new Error("[BindCommandAjax] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel()  {
            _super.call(this);

            var __prop          = new PropertyCollection(this);
            var __fn            = new PropertyFunctionCollection(this);
            var __mapping       = new PropertyCollection(this);
            
            var __cbFail        = function() { console.warn("바인딩 실패하였습니다."); };
            var __cbError       = function() { console.error("바인딩 오류가 발생 하였습니다."); };
            var __cbBaseValid   = null;
            var __cbBaseBind    = null;
            var __cbBaseResult  = null;
            var __cbBaseOutput  = null;
            var __cbBaseEnd     = null;

            var __itemType      = Item;

            this.__preRegister    = function() {};
            this.__preCheck       = function() {return true};
            this.__preReady       = function() {};

            // DI 인터페이스 구현 검사
            // if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModel))  {
            //     throw new Error("Only [p_objectDI] type 'IBindModel' can be added");
            // }
            
            /** @property {prop} */
            Object.defineProperty(this, "prop", 
            {
                get: function() { return __prop; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyCollection)) throw new Error("Only [prop] type 'PropertyCollection' can be added");
                    __prop = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {fn} */
            Object.defineProperty(this, "fn", 
            {
                get: function() { return __fn; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyFunctionCollection)) throw new Error("Only [fn] type 'PropertyFunctionCollection' can be added");
                    __fn = newValue;
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
            /** @property {itemType} */
            Object.defineProperty(this, "itemType", 
            {
                get: function() { return __itemType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error("Only [itemType] type 'Item' can be added");
                    __itemType = newValue;
                    this._baseEntity.items.itemType = newValue;
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

            /** @property {cbBaseValid} */
            Object.defineProperty(this, "cbBaseValid", 
            {
                get: function() { return __cbBaseValid; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbBaseValid] type 'Function' can be added");
                    __cbBaseValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbBaseBind} */
            Object.defineProperty(this, "cbBaseBind", 
            {
                get: function() { return __cbBaseBind; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbBaseBind] type 'Function' can be added");
                    __cbBaseBind = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /** @property {cbResult} */
            Object.defineProperty(this, "cbBaseResult", 
            {
                get: function() { return __cbBaseResult; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbBaseResult] type 'Function' can be added");
                    __cbBaseResult = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbBaseOutput} */
            Object.defineProperty(this, "cbBaseOutput", 
            {
                get: function() { return __cbBaseOutput; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbBaseOutput] type 'Function' can be added");
                    __cbBaseOutput = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbBaseEnd} */
            Object.defineProperty(this, "cbBaseEnd", 
            {
                get: function() { return __cbBaseEnd; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbBaseEnd] type 'Function' can be added");
                    __cbBaseEnd = newValue;
                },
                configurable: true,
                enumerable: true
            });


            // 예약어 등록
            this._symbol = this._symbol.concat(["__preRegister", "__preCheck", "__preReady"]);
            this._symbol = this._symbol.concat(["prop", "mode", "mapping"]);
            this._symbol = this._symbol.concat(["itemType", "cbFail", "cbError"]);
            this._symbol = this._symbol.concat(["cbBaseResult", "cbBaseValid", "cbBaseBind", "cbBaseOutput", "cbBaseEnd"]);
            this._symbol = this._symbol.concat(["getTypes", "init", "preRegister", "preCheck", "preReady", "addEntity"]);
            this._symbol = this._symbol.concat(["add", "addItem", "loadProp", "setMapping", "preReady", "addEntity"]);
            this._symbol = this._symbol.concat(["addCommand", "setService"]);
            
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
            this.preRegister.call(this, this);
            if (this.preCheck.call(this, this)) {
                this.preReady.call(this, this)
            }
        };

        BindModel.prototype.preRegister = function(p_this) {
            return this.__preRegister.call(this, p_this);
        };

        BindModel.prototype.preCheck = function(p_this) {
            return this.__preCheck.call(this, p_this);
        };
        BindModel.prototype.preReady = function(p_this) {
            return this.__preReady.call(this, p_this);
        };
        
        BindModel.prototype.addEntity = function(p_name) {

            var entity;

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            
            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(" [" + p_name + "] is a Symbol word");   
            }            

            // 이름 중복 검사
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
            // 4.설정(등록) OR item 등록
            if (typeof p_cmds === "undefined") {
                this._baseEntity.items.add(p_item); // 기본(_baseEntity)엔티티만 등록
            } else {
                for (var i = 0; i < property.length; i++) {
                    this[property[i]].add(p_item, p_entities);
                }
            }
        };

        /**
         * p_name으로 아이템을 p_entitys(String | String)에 다중 등록한다.
         * @param {string} p_name
         * @param {object | String | number | boolean} p_obj 
         * @param {?array<string> | string} p_entities <선택> 추가할 아이템 명령
         */
// POINT::
        BindModel.prototype.addItem = function(p_name, p_obj, p_cmds, p_entities) {

            var item;
            var property = {};

            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            if (typeof p_obj === 'object') {
                property = p_obj;
            } else {
                property = { value: p_obj };
            }
            
            item = new this.itemType(p_name, null, property);

            this.add(item, p_cmds, p_entities);
        };

        // BindModel.prototype.addItem = function(p_name, p_value, p_cmds, p_entities) {

        //     var item;
        //     var property = {};

        //     // 유효성 검사
        //     if (typeof p_name !== "string") {
        //         throw new Error("Only [p_name] type 'string' can be added");
        //     }

        //     item = this._baseEntity.items.addValue(p_name, p_value);

        //     this.add(item, p_cmds, p_entities);
        // };



        /**
         * 속성을 baseEntiey 또는 지정 Entity에  등록(로딩)한다.
         * @param {?string | ?array<string>} p_prop 
         * @param {?string} p_entity 
         */
        BindModel.prototype.loadProp = function(p_prop, p_entity) {

            var prop = [];
            var entity;
            var propName;

            // 1.초기화
            if (Array.isArray(p_prop)) prop = prop.concat(p_prop);      // Array의 경우
            else if (typeof p_prop === "string") prop.push(p_prop);       // String의 경우
            else prop = this.prop.properties;                             // 없을 경우 (전체 가져옴)

            // 2.유효성 검사
            if (typeof p_prop !== "undefined" && (!Array.isArray(p_prop) || typeof p_prop === "string")) {
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
            for(var i = 0; prop.length > i; i++) {
                propName = prop[i];
                if (typeof propName === "string" && typeof this.prop[propName] !== "undefined"
                    && propName.indexOf("__") < 0 ) {  // __이름으로 제외 조건 추가
                    if(["number", "string", "boolean"].indexOf(typeof this.prop[propName]) > -1) {
                        entity.items.addValue(propName, this.prop[propName]);
                    } else if (this.prop[propName]  !== null && typeof this.prop[propName] === "object"){
                        entity.items.add(new this.itemType(propName, entity, this.prop[propName]))
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
                        if (prop === "Array") {          // 'Array' 전체 등록 속성 추가
                            this.add(item, [], mappingCollection[i][prop]);
                        } else if (mappingCollection[i].hasOwnProperty(prop)) {
                            this.add(item, prop, mappingCollection[i][prop]);
                        }
                    }
                } else {
                    console.warn("entity에 지정된 [%s] BindCommand 가 없습니다. ");
                }
            }
        };

        BindModel.prototype.addCommand  = function(p_name, p_option, p_entities) {

            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(" [" + p_name + "] is a Symbol word");   
            }            
            
            // 중복 검사
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            // 생성
            this[p_name] = new BindCommandAjax(this, p_option, p_entities);

            return this[p_name];
        };

        BindModel.prototype.setService  = function(p_service, p_isLoadProp) {

            var propObject;
            var propSubObject;
            var command;

            p_isLoadProp = p_isLoadProp || true;       // 기본값

            // 유효성 검사
            if (typeof p_service !== 'object') throw new Error("Only [p_service] type 'object' can be added");

            // command 등록
            if (typeof p_service["command"] !== "undefined" && p_service["prop"] !== null) {
                propObject = p_service["command"];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {

                        // 예약어 검사
                        if (this._symbol.indexOf(prop) > -1) {
                            throw new Error(" [" + prop + "] is a Symbol word");   
                        }            

                        // 중복 검사
                        if (typeof this[prop] !== "undefined") throw new Error("에러!! command 이름 중복 : " + prop);

                        // command 등록 및 설정
                        command = this.addCommand(prop);
                        if (typeof propObject["outputOption"] === "number") command.outputOption = propObject["outputOption"];
                        if (typeof propObject["onExecute"] === "function")  command.onExecute = propObject["onExecute"];
                        if (typeof propObject["onExecuted"] === "function") command.onExecute = propObject["onExecuted"];
                        if (typeof propObject["cbValid"] === "function")    command.onExecute = propObject["cbValid"];
                        if (typeof propObject["cbBind"] === "function")     command.onExecute = propObject["cbBind"];
                        if (typeof propObject["cbResult"] === "function")   command.onExecute = propObject["cbResult"];
                        if (typeof propObject["cbOutput"] === "function")   command.onExecute = propObject["cbOutput"];
                        if (typeof propObject["cbEnd"] === "function")      command.onExecute = propObject["cbEnd"];
                    }
                }
            }
            
            // prop 등록
            if (typeof p_service["prop"] !== "undefined" && p_service["prop"] !== null) {
                propObject = p_service["prop"];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                        //__prop.add(prop, propObject[prop]);
                        // get/sett 형식의 기능 추가        REVIEW:: 확인필요 get/set 의 필요성, 중복 및 혼선의 이슈
                        if (typeof propObject[prop] === "object" 
                            && (typeof propObject[prop].get === "function" || typeof propObject[prop].set === "function")) {
                            this.prop.add(prop, "", propObject[prop]);    
                        } else {
                            this.prop.add(prop, propObject[prop]);
                        }
                    }
                }
            }
            
            // fn 등록
            if (typeof p_service["fn"] !== "undefined" && p_service["fn"] !== null) {
                propObject = p_service["fn"];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                        this.fn.add(prop, propObject[prop]);
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
            
            // pre 메소드 등록
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
            
            // fail, error 등록
            if (typeof p_service["cbFail"] === "function") {
                this.cbFail = p_service["cbFail"];
            }
            if (typeof p_service["cbError"] === "function") {
                this.cbError = p_service["cbError"];
            }
            
            // base 등록
            if (typeof p_service["cbBaseValid"] === "function") {
                this.cbBaseValid = p_service["cbBaseValid"];
            }
            if (typeof p_service["cbBaseBind"] === "function") {
                this.cbBaseBind = p_service["cbBaseBind"];
            }
            if (typeof p_service["cbBaseResult"] === "function") {
                this.cbResult = p_service["cbBaseResult"];
            }
            if (typeof p_service["cbBaseOutput"] === "function") {
                this.cbBaseOutput = p_service["cbBaseOutput"];
            }
            if (typeof p_service["cbBaseEnd"] === "function") {
                this.cbBaseEnd = p_service["cbBaseEnd"];
            }

            // execute 이벤트 등록
            if (typeof p_service["onExecute"] === "function") {
                this.onExecute = p_service["onExecute"];    // 복수 등록
            }
            if (typeof p_service["onExecuted"] === "function") {
                this.onExecuted = p_service["onExecuted"];  // 복수 등록
            }
            
            // 속성(prop)을 아이템으로 로딩 ("__"시작이름 제외)
            if (p_isLoadProp === true) {
                this.loadProp();
            }  
        };

        // BindModel.prototype.setService  = function(p_service, p_isLoadProp) {

        //     var propObject;

        //     p_isLoadProp = p_isLoadProp || true;       // 기본값

        //     // 유효성 검사
        //     if (!(p_service instanceof IBindModel)) throw new Error("Only [p_service] type 'IBindModel' can be added");

        //     // command 등록
        //     for (var prop in p_service) {
        //         if (p_service.hasOwnProperty(prop)) {
        //             if (typeof p_service[prop] === "function" && p_service[prop].name ==="BindCommandEditAjax") {
        //                 this[prop] = new BindCommandEditAjax(this, this._baseEntity);
        //             }
        //             if (typeof p_service[prop] === "function" && p_service[prop].name ==="BindCommandLookupAjax") {
        //                 this[prop] = new BindCommandLookupAjax(this, this._baseEntity);
        //             }
        //         }
        //     }            
            
        //     // prop 등록
        //     if (typeof p_service["prop"] !== "undefined" && p_service["prop"] !== null) {
        //         propObject = p_service["prop"];
        //         for(var prop in propObject) {
        //             if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {

        //                 //__prop.add(prop, propObject[prop]);
        //                 // get/sett 형식의 기능 추가
        //                 if (typeof propObject[prop] === "object" 
        //                     && (typeof propObject[prop].get === "function" || typeof propObject[prop].set === "function")) {
        //                     this.prop.add(prop, "", propObject[prop]);    
        //                 } else {
        //                     this.prop.add(prop, propObject[prop]);
        //                 }
        //             }
        //         }
        //     }
            
        //     // mode 등록
        //     if (typeof p_service["mode"] !== "undefined" && p_service["mode"] !== null) {
        //         propObject = p_service["mode"];
        //         for(var prop in propObject) {
        //             if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
        //                 this.mode.add(prop, propObject[prop]);
        //             }
        //         }
        //     }
        //     if (typeof p_service["mapping"] !== "undefined" && p_service["mapping"] !== null) {
        //         propObject = p_service["mapping"];
        //         for(var prop in propObject) {
        //             if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
        //                 this.mapping.add(prop, propObject[prop]);
        //             }
        //         }
        //     }
        //     if (typeof p_service["preRegister"] === "function") {
        //         // __preRegister = p_service["preRegister"];
        //         this.preRegister = p_service["preRegister"];
        //     }
        //     if (typeof p_service["preCheck"] === "function") {
        //         // __preCheck = p_service["preCheck"];
        //         this.preCheck = p_service["preCheck"];
        //     }
        //     if (typeof p_service["preReady"] === "function") {
        //         // __preReady = p_service["preReady"];
        //         this.preReady = p_service["preReady"];
        //     }
        //     if (typeof p_service["cbFail"] === "function") {
        //         this.cbFail = p_service["cbFail"];
        //     }
        //     if (typeof p_service["cbError"] === "function") {
        //         this.cbError = p_service["cbError"];
        //     }
            
        //     if (typeof p_service["cbResult"] === "function") {
        //         this.cbResult = p_service["cbResult"];
        //     }
        //     if (typeof p_service["cbBaseValid"] === "function") {
        //         this.cbBaseValid = p_service["cbBaseValid"];
        //     }
        //     if (typeof p_service["cbBaseBind"] === "function") {
        //         this.cbBaseBind = p_service["cbBaseBind"];
        //     }
        //     if (typeof p_service["cbBaseOutput"] === "function") {
        //         this.cbBaseOutput = p_service["cbBaseOutput"];
        //     }
        //     if (typeof p_service["cbBaseEnd"] === "function") {
        //         this.cbBaseEnd = p_service["cbBaseEnd"];
        //     }

        //     if (typeof p_service["onExecute"] === "function") {
        //         this.onExecute = p_service["onExecute"];
        //     }
        //     if (typeof p_service["onExecuted"] === "function") {
        //         this.onExecuted = p_service["onExecuted"];
        //     }
            
            
        //     // 속성(prop)을 아이템으로 로딩 ("__"시작이름 제외)
        //     if (p_isLoadProp === true) {
        //         this.loadProp();
        //     }  
        // };

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