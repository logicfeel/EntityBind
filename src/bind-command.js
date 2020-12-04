/**
 * @namespace _W.Meta.Bind.BindCommand
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
    var BaseCollection;
    var BaseBind;
    var item;
    var Item;
    var Entity;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      = require("./collection-base");
        BaseBind            = require("./bind-base");
        item                = require("./entity-item");
        Item                = item.Item;
        Entity              = require("./entity-base");
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
        BaseBind            = global._W.Meta.Bind.BaseBind;
        Entity              = global._W.Meta.Entity.Entity;
        Item                = global._W.Meta.Entity.Item;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommand  = (function (_super) {
        /**
         * @abstract 바인드 명령 (상위)
         * @class
         */
        function BindCommand(p_bindModel, p_baseEntity) {
            _super.call(this);
            
            var __propagation   = true;

            if (p_bindModel && !(p_bindModel.instanceOf("BindModel"))) throw new Error("Only [p_bindModel] type 'BindModel' can be added");
            if (p_baseEntity && !(p_baseEntity.instanceOf("Entity"))) throw new Error("Only [p_baseEntity] type 'Entity' can be added");

            /** @protected 소유자 */
            this._model = p_bindModel;

            this._baseEntity = p_baseEntity;

            /** @property */
            Object.defineProperty(this, "eventPropagation", {
                enumerable: true,
                configurable: true,
                set: function(p_bool) {
                    if (typeof p_bool !== "boolean") throw new Error("Only [p_bool] type 'Boolean' can be added");
                    // this.__event.propagation = p_bool;
                    __propagation = p_bool;
                },
                get: function() { return __propagation; }
                // get: function() { return this.__event.propagation; }
            });            
        }
        util.inherits(BindCommand, _super);
    

        /** @virtual */
        BindCommand.prototype.execute = function() {
            throw new Error("[ execute() ] Abstract method definition, fail...");
        };

        /** @override */
        BindCommand.prototype._onExecute = function() {
            
            _super.prototype._onExecute.call(this);                         // 자신에 이벤트 발생
            if (this.eventPropagation) this._model._onExecute();    // 모델에 이벤트 추가 발생
        };

        /** @override */
        BindCommand.prototype._onExecuted = function() {
            _super.prototype._onExecuted.call(this);
            if (this.eventPropagation) this._model._onExecuted();
        };

        // /** @override */
        // BindCommand.prototype._onFail = function(p_msg) {
        //     _super.prototype._onFail.call(this, p_msg);
        //     if (this.eventPropagation) this._model._onFail(p_msg);
        // };        

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommand.prototype.getTypes  = function() {
                    
            var type = ["BindCommand"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String> | String} p_entities <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.add = function(p_item, p_entities) {

            var entities = [];     // 파라메터 변수
            var property = [];      // 속성
            var collection;

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [p_item] type 'Item' can be added");
            }
            if (typeof p_entities !== "undefined" && (!(Array.isArray(p_entities) || typeof p_entities === "string"))) {
                throw new Error("Only [p_entities] type 'Array | string' can be added");
            } 

            // 초기화 설정
            if (Array.isArray(p_entities)) entities = p_entities;
            else if (typeof p_entities === "string") entities.push(p_entities);
            
            // baseEntity 에 아이템 없으면 등록
            if (!this._baseEntity.items.contains(p_item))  {
                this._baseEntity.items.add(p_item);
            } {

            }

            // 설정 대상 가져오기
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
            // 설정
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
         * @param {String} p_name
         * @param {Object | String | Number | Boolean} p_value
         * @param {?Array<String> | String} p_entities <선택> 추가할 아이템 명령
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
         * @param {String | Array} p_names 
         * @param {?String | Array<String>} p_entities 
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
                    // throw new Error("baseEntity에 [" + itemName + "] 아이템이 없습니다.");
                    console.warn("baseEntity에 [" + itemName + "] 아이템이 없습니다.");
                }
            }
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

}(this));