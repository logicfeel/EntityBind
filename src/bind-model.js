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

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필

        util                        = require("./utils");
        BaseBind                    = require("./bind-base");
        ItemCollection              = require("./entity-item").ItemCollection;
        PropertyCollection          = require("./collection-property");
        PropertyFunctionCollection  = require("./collection-property-function");        
        IBindModel                  = require("./i-bind-model");        
        Entity                      = require("./entity-base");
        EntityTable                 = require("./entity-table").EntityTable;
    } else {
        util                        = global._W.Common.Util;
        BaseBind                    = global._W.Meta.Bind.BaseBind;
        ItemCollection              = global._W.Meta.Entity.ItemCollection;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        PropertyFunctionCollection  = global._W.Collection.PropertyFunctionCollection;        
        IBindModel                  = global._W.Interface.IBindModel;        
        Entity                      = global._W.Meta.Entity.Entity;        
        EntityTable                 = global._W.Meta.Entity.EntityTable;        
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

    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel(p_objectDI) {
            _super.call(this);

            var __attr         = new PropertyCollection(this);
            var __mode          = new PropertyFunctionCollection(this);
            var __cbRegister    = function() {};
            var __cbValid       = function() {return true};
            var __cbReady       = function() {};

            var propObject;

            // DI 의존성 주입 : 객체를 비교하여 삽입
            if (p_objectDI instanceof IBindModel) {     // 가능
                // attr 등록
                if (typeof p_objectDI["attr"] !== "undefined" && p_objectDI["attr"] !== null) {
                    propObject = p_objectDI["attr"];
                    for(var prop in propObject) {
                        if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                            
                            // new Item // 테이블 로딩
                            if (typeof propObject[prop] !== "object") {
                                __attr.add(prop, propObject[prop]);
                            } else {
                                __attr.add(prop, propObject[prop]);
                            }
                            
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
                if (typeof p_objectDI["cbRegister"] === "function") {
                    __cbRegister = p_objectDI["cbRegister"];
                }
                if (typeof p_objectDI["cbValid"] === "function") {
                    __cbValid = p_objectDI["cbValid"];
                }
                if (typeof p_objectDI["cbReady"] === "function") {
                    __cbReady = p_objectDI["cbReady"];
                }
            }

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

            /** @property {cbRegister} */
            Object.defineProperty(this, "cbRegister", 
            {
                get: function() { return __cbRegister; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbRegister] type 'Function' can be added");
                    __cbRegister = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /** @property {cbValid} */
            Object.defineProperty(this, "cbValid", 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbValid] type 'Function' can be added");
                    __cbValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbReady} */
            Object.defineProperty(this, "cbReady", 
            {
                get: function() { return __cbReady; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbReady] type 'Function' can be added");
                    __cbReady = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
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
            if (this.cbValid.call(this)) {
                this.cbReady.call(this)
            }
        };

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} p_cmds <선택> 추가할 아이템 명령
         */
        BindModel.prototype.add = function(p_item, p_cmds) {

            var cmds = [];

            if (Array.isArray(p_cmds)) cmds = p_cmds;

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type 'Item' can be added");
            }
            if (typeof p_cmds !== "undefined" && !Array.isArray(p_cmds)) {
                throw new Error("Only [a_cmd] type 'Array | string' can be added");
            }
            
            // 설정 대상 가져오기
            if (Array.isArray(p_cmds)) {
                for (var i = 0; i< p_cmds.length; i++) {
                    if (this[p_cmds[i]]) {
                        cmds.push(p_cmds[i]);
                    } else {
                        console.warn("Warning!! Param p_cmds 에 [" + p_cmds[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    
                    if (this[prop].instanceOf("BindCommand") && prop.substr(0, 1) !== "_") {
                        cmds.push(prop.toString());
                    }
                }
            }

            // 설정
            for (var i = 0; i < cmds.length; i++) {
                this[cmds[i]].add(p_item);
            }
        };

        /**
         * p_name으로 아이템을 p_entitys(String | String)에 다중 등록한다.
         * @param {String} p_name
         * @param {Object | String | Number | Boolean} p_value 
         */
        BindModel.prototype.addItem = function(p_name, p_value, p_cmds) {

            var item;
            
            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            item = this.baseEntity.items.addValue(p_name, p_value);

            this.add(item, p_cmds);
        };

        /**
         * 속성을 baseEntiey 또는 지정 Entity에  등록(로딩)한다.
         * @param {?String | ?Array<String>} p_attr 
         * @param {?String} p_entity 
         */
        BindModel.prototype.loadAttr = function(p_attr, p_entity) {

            var __attr = [];
            var entity;
            var propName;

            // 최기화
            if (Array.isArray(p_attr)) __attr = __attr.concat(p_attr);  // Array의 경우
            else if (typeof p_attr === "string") __attr.push(p_attr);    // String의 경우
            else __attr = this.attr.properties;                           // 없을 경우 (전체 가져옴)

            // 유효성 검사
            if (typeof p_attr !== "undefined" && (!Array.isArray(p_attr) || typeof p_attr === "string")) {
                throw new Error("Only [p_entities] type 'Array | string' can be added");
            }

            if (typeof p_entity !== "undefined" && !(typeof this[p_entity] !== "undefined")) {
                throw new Error(" BindModel에 ["+ p_entity +"]의 Entity가 없습니다. ");
            }
            if (typeof p_entity !== "undefined" && !(p_entity instanceof Entity)) throw new Error("Only [p_entity] type 'Entity' can be added");

            entity = p_entity || this.baseEntity;

            // 속성목록을 등록
            for(var i = 0; __attr.length > i; i++) {
                propName = __attr[i];
                if (typeof propName === "string" && typeof this.attr[propName] !== "undefined") {
                    entity.items.addValue(propName, this.attr[propName]);
                }
            }
        };

        BindModel.prototype.addEntity = function(p_name) {

            var entity;

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            entity = new EntityTable(p_name);
            this[p_name] = entity;
            
            return entity;
        }

        return BindModel;
    
    }(BaseBind));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModel;
    } else {
        global._W.Meta.Bind.BindModel = BindModel;
    }

}(this));