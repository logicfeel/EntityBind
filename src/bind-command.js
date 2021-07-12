/**
 * namespace _W.Meta.Bind.BindCommand
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
    var MetaObject;
    var BaseCollection;
    var BaseBind;
    var Item;
    var Entity;
    var entityView;
    var EntityView;
    var EntityViewCollection;


    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("./utils");
        MetaObject              = require("./meta-object");
        BaseCollection          = require("./collection-base");
        BaseBind                = require("./bind-base");
        Item                    = require("./entity-item").Item;
        Entity                  = require("./entity-base");
        entityView              = require("./entity-view");
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
    } else {
        util                    = global._W.Common.Util;
        MetaObject              = global._W.Meta.MetaObject;
        BaseCollection          = global._W.Collection.BaseCollection;
        BaseBind                = global._W.Meta.Bind.BaseBind;
        Entity                  = global._W.Meta.Entity.Entity;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
        Item                    = global._W.Meta.Entity.Item;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof EntityViewCollection === "undefined") throw new Error("[EntityViewCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommand  = (function (_super) {
        /**
         * 바인드 명령 (상위)
         * @constructs _W.Meta.Bind.BindCommand
         * @abstract
         * @extends _W.Meta.Bind.BaseBind
         * @param {*} p_bindModel 
         * @param {*} p_baseEntity 
         */
        function BindCommand(p_bindModel, p_baseEntity) {
            _super.call(this);
            
            p_baseEntity = p_baseEntity || p_bindModel._baseEntity;     // 기본값

            /**
             * 모델
             * @protected  
             */
            this._model = p_bindModel;          // 최상위 설정
            /**
             * 기본 요소
             * @protected
             */
            this._baseEntity = p_baseEntity;    // 최상위 설정

            this._output = new EntityViewCollection(this, this._baseEntity);
            this.addOutput("output");

            var __propagation   = true;

            var __valid     = new EntityView("valid", this._baseEntity);
            var __bind      = new EntityView("bind", this._baseEntity);

            var __cbValid       = null;
            var __cbBind        = null;
            var __cbResult      = null;
            var __cbEnd         = null;
            var __cbOutput      = null;
            var __outputOption  = 0;     // 0: 제외(edit),  1: View 오버로딩 , 2: 있는자료만 , 3: 존재하는 자료만          

            
            if (p_bindModel && !(p_bindModel instanceof MetaObject && p_bindModel.instanceOf("BindModel"))) {
                throw new Error("Only [p_bindModel] type 'BindModel' can be added");
            }
            if (p_baseEntity && !(p_bindModel instanceof MetaObject && p_baseEntity.instanceOf("Entity"))) {
                throw new Error("Only [p_baseEntity] type 'Entity' can be added");
            }
            

            
            Object.defineProperty(this, "eventPropagation", {
                enumerable: true,
                configurable: true,
                set: function(p_bool) {
                    if (typeof p_bool !== "boolean") throw new Error("Only [p_bool] type 'Boolean' can be added");
                    __propagation = p_bool;
                },
                get: function() { return __propagation; }
            }); 
            
            Object.defineProperty(this, "valid", 
            {
                get: function() { return __valid; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __valid = newValue;
                },
                configurable: true,
                enumerable: true
            });


            Object.defineProperty(this, "bind", 
            {
                get: function() { return __bind; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __bind = newValue;
                },
                configurable: true,
                enumerable: true
            });
            

            Object.defineProperty(this, "outputOption", 
            {
                get: function() { return __outputOption; },
                set: function(newValue) { 
                    if (!(typeof newValue === "number")) throw new Error("Only [outputOption] type 'number' can be added");
                    __outputOption = newValue;
                },

                configurable: true,
                enumerable: true
            });
            
            Object.defineProperty(this, "cbValid", 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbValid] type 'Function' can be added");
                    __cbValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "cbBind", 
            {
                get: function() { return __cbBind; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbBind] type 'Function' can be added");
                    __cbBind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "cbResult", 
            {
                get: function() { return __cbResult; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbResult] type 'Function' can be added");
                    __cbResult = newValue;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "cbOutput", 
            {
                get: function() { return __cbOutput; },
                set: function(newValue) { 
                    if (typeof newValue  !== "function") throw new Error("Only [cbOutput] type 'Function' can be added");
                    __cbOutput = newValue;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "cbEnd", 
            {
                get: function() { return __cbEnd; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbEnd] type 'Function' can be added");
                    __cbEnd = newValue;
                },
                configurable: true,
                enumerable: true
            });    

            // 예약어 등록
            this._symbol = this._symbol.concat(["_model", "eventPropagation"]);
            this._symbol = this._symbol.concat(["valid", "bind"]);
            this._symbol = this._symbol.concat(["cbValid", "cbBind", "cbResult", "cbOutput", "cbEnd"]);
            this._symbol = this._symbol.concat(["_output", "outputOption", "cbOutput"]);
            this._symbol = this._symbol.concat(["execute", "_onExecute", "_onExecuted", "getTypes", "add", "addItem", "setItem"]);
            this._symbol = this._symbol.concat(["addOutput"]);


        }
        util.inherits(BindCommand, _super);
    

        /** @virtual */
        BindCommand.prototype.execute = function() {
            throw new Error("[ execute() ] Abstract method definition, fail...");
        };

        /** @override */
        BindCommand.prototype._onExecute = function(p_bindCommand) {
            _super.prototype._onExecute.call(this, p_bindCommand);               // 자신에 이벤트 발생
            
            if (this.eventPropagation) this._model._onExecute(p_bindCommand);    // 모델에 이벤트 추가 발생
        };

        /** @override */
        BindCommand.prototype._onExecuted = function(p_bindCommand, p_result) {
            _super.prototype._onExecuted.call(this, p_bindCommand, p_result);
            if (this.eventPropagation) this._model._onExecuted(p_bindCommand, p_result);
        };

        /** 
         * 상속 클래스에서 오버라이딩 필요!!
         * @override  
         */
        BindCommand.prototype.getTypes  = function() {
                    
            var type = ["BindCommand"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?array<string> | string} p_entities <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.add = function(p_item, p_entities) {

            var entities = [];     // 파라메터 변수
            var property = [];      // 속성
            var collection;

            // 1.유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [p_item] type 'Item' can be added");
            }
            if (typeof p_entities !== "undefined" && (!(Array.isArray(p_entities) || typeof p_entities === "string"))) {
                throw new Error("Only [p_entities] type 'Array | string' can be added");
            } 

            // 2.초기화 설정
            if (Array.isArray(p_entities)) entities = p_entities;
            else if (typeof p_entities === "string") entities.push(p_entities);
            
            // baseEntity 에 아이템 없으면 등록
            if (!this._baseEntity.items.contains(p_item))  {
                this._baseEntity.items.add(p_item);
            }

            // 3.설정 대상 가져오기
            if (entities.length > 0) {
                for (var i = 0; i < entities.length; i++) {
                    
                    if (typeof entities[i] !== "string") throw new Error("Only [String] type instances can be added");
                   
                    // 속성 유무 검사
                    if (this[entities[i]]) {
                        property.push(entities[i]);
                    } else {
                        console.warn("Warning!! Param p_entities 에 [" + entities[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // 공개(public) Entity 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof Entity && prop.substr(0, 1) !== "_") {
                        property.push(prop.toString());
                    }
                }
            }

            // 4.컬렉션 추가(등록)
            for (var i = 0; i < property.length; i++) {
                if (this[property[i]] instanceof Entity ){
                    collection = this[property[i]].items;
                } else {
                    console.warn("Warning!! [" + property[i] + "]속성이 this 에 없습니다. ");
                }
                collection.add(p_item);
            }
        };

        /**
         * p_name으로 아이템을 p_entitys(String | String)에 다중 등록한다.
         * @param {string} p_name
         * @param {object | string | number | boolean} p_value
         * @param {?array<string> | string} p_entities <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.addItem = function(p_name, p_value, p_entities) {

            var item;
            
            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            item = this._baseEntity.items.addValue(p_name, p_value);

            this.add(item, p_entities);
        };

        /**
         * 예시>
         * e.read.setEntity(['idx', 'addr'], 'valid');
         * @param {string | array} p_names 
         * @param {?string | array<string>} p_entities 
         */
        BindCommand.prototype.setItem = function(p_names, p_entities) {

            var names = [];     // 파라메터 변수
            var itemName;
            var item;

            // 초기화
            if (Array.isArray(p_names)) names = p_names;
            else if (typeof p_names === "string") names.push(p_names);

            // 유효성 검사
            if (names.length === 0) throw new Error("Only [p_names] type 'Array | string' can be added");

            // 아이템 검사 및 등록 함수 this.add(..) 호출
            for(var i = 0; names.length > i; i++) {
                itemName = names[i]; 
                item = this._model._baseEntity.items[itemName];
                if (typeof item !== "undefined") {
                    this.add(item, p_entities);
                } else {
                    console.warn("baseEntity에 [" + itemName + "] 아이템이 없습니다.");
                }
            }
        };

        /**
         * 예시>
         * e.read.release(['idx', 'addr'], 'valid');
         * @param {string | array} p_names 
         * @param {?string | array<string>} p_entities 
         */
        BindCommand.prototype.release = function(p_names, p_entities) {

            var names = [];         // 파라메터 변수
            var entities = [];      // 파라메터 변수
            var property = [];      // 속성
            var itemName;
            var item;


            // 초기화
            if (Array.isArray(p_names)) names = p_names;
            else if (typeof p_names === "string") names.push(p_names);

            // 1. 유효성 검사
            if (names.length === 0) throw new Error("Only [p_names] type 'Array | string' can be added");
            if (typeof p_entities !== "undefined" && (!(Array.isArray(p_entities) || typeof p_entities === "string"))) {
                throw new Error("Only [p_entities] type 'Array | string' can be added");
            } 

            // 2.초기화 설정
            if (Array.isArray(p_entities)) entities = p_entities;
            else if (typeof p_entities === "string") entities.push(p_entities);
            
            // 3.설정 대상 가져오기
            if (entities.length > 0) {
                for (var i = 0; i < entities.length; i++) {
                    
                    if (typeof entities[i] !== "string") throw new Error("Only [String] type instances can be added");
                   
                    // 속성 유무 검사
                    if (this[entities[i]]) {
                        property.push(entities[i]);
                    } else {
                        console.warn("Warning!! Param p_entities 에 [" + entities[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // 공개(public) Entity 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof Entity && prop.substr(0, 1) !== "_") {
                        property.push(prop.toString());
                    }
                }
            }

            // 아이템 검사 및 아이템 해제
            for(var i = 0; names.length > i; i++) {
                itemName = names[i]; 
                item = this._model._baseEntity.items[itemName];

                if (typeof item !== "undefined") {
                    for (var ii = 0; property.length > ii; ii++) {
                        this[property[ii]].items.remove(item);
                    }

                } else {
                    console.warn("baseEntity에 [" + itemName + "] 아이템이 없습니다.");
                }
            }
        };

        BindCommand.prototype.addOutput = function(p_name) {

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            
            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(" [" + p_name + "] is a Symbol word");   
            }            

            // 이름 중복 검사
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            // this._output.add("default", this._baseEntity);            // 등록방법 2
            this._output.add(new EntityView(p_name, this._baseEntity));  // 등록방법 1
            this[p_name] = this._output[p_name];
        };


        return BindCommand;
    
    }(BaseBind));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommand;
    } else {
        global._W.Meta.Bind.BindCommand = BindCommand;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));