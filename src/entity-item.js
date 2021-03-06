/**
 * namespace _W.Meta.Entity.Item
 * namespace _W.Meta.Entity.ItemCollection
 * namespace _W.Meta.Entity.ItemViewCollection
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
    var MetaElement;
    var PropertyCollection;
    var Observer;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        MetaElement         = require("./meta-element");
        PropertyCollection  = require("./collection-property");
        Observer            = require("./observer");
    } else {
        util                = global._W.Common.Util;
        MetaElement         = global._W.Meta.MetaElement;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        Observer            = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    var Item  = (function (_super) {
        /**
         * 아이템
         * @constructs _W.Meta.Entity.Item
         * @extends _W.Meta.MetaElement
         * @param {String} p_name 아이템명
         * @param {Entity} p_entity 소유 Entity
         */
        function Item(p_name, p_entity, p_property) {
            _super.call(this, p_name);

            var __entity        = null;
            var __type          = "string";
            var __size          = 0;
            var __default       = null;
            var __caption       = "";
            var __isNotNull     = false;
            var __isNullPass    = false;
            var __callback      = null;
            var __constraints   = [];
            var __codeType      = null;
            var __order         = 100;
            var __increase      = 100;      // order 의 자동 추가수
            var __getter        = null;
            var __setter        = null;
            var __value         = null;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaElement && p_entity.instanceOf("Entity")) {
                __entity    = p_entity;
                __order     = __entity.items.count === 0 ? __order : __entity.items[__entity.items.count - 1].order + __increase;
            }

            /** @private */
            this.__event    = new Observer(this, this);

            Object.defineProperty(this, "__value", 
            {
                get: function() { return __value; },
                set: function(newValue) { 
                    // 직접 입력하면 안됨
                    // throw new Error("Only getter !! ");
                    __value = newValue;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "entity", 
            {
                get: function() { return __entity; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if (newValue && !(newValue instanceof MetaElement && newValue.instanceOf("Entity"))) {
                        throw new Error("Only [entity] type 'Entity' can be added");
                    }
                    __entity = newValue;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "type", 
            {
                get: function() { return __type; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if(typeof newValue !== "string") throw new Error("Only [type] type 'string' can be added");
                    __type = newValue;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "size", 
            {
                get: function() { return __size; },
                set: function(newValue) { 
                    if(typeof newValue !== "number") throw new Error("Only [size] type 'number' can be added");
                    __size = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "default", 
            {
                get: function() { return __default; },
                set: function(newValue) { 
                    if(typeof newValue !== "undefined" && newValue !== null &&  ["string", "number", "boolean"].indexOf(typeof newValue) < 0) throw new Error("Only [default] type 'string | boolea | number' can be added");
                    __default = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "caption", 
            {
                get: function() { return __caption; },
                set: function(newValue) { 
                    if(typeof newValue !== "string") throw new Error("Only [caption] type 'string' can be added");
                    __caption = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "isNotNull", 
            {
                // get: function() { 
                //     var isReturn;
                //     isReturn = __constraints.length > 0 ? true : __isNotNull;
                //     return isReturn; 
                // },
                get: function() { return __isNotNull },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isNotNull] type 'boolean' can be added");
                    __isNotNull = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "isNullPass", 
            {
                get: function() { return __isNullPass },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isNullPass] type 'boolean' can be added");
                    __isNullPass = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            Object.defineProperty(this, "callback", 
            {
                get: function() { return __callback; },
                set: function(newValue) { 
                    if(newValue !== null && typeof newValue !== "function") throw new Error("Only [callback] type 'function' can be added");
                    __callback = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "constraints", 
            {
                get: function() { return __constraints; },
                set: function(newValue) { 
                    var list = [];
                    
                    // 배열로 일반화
                    if (Array.isArray(newValue))  list = newValue;
                    else list.push(newValue);

                    // 유효성 검사
                    for(var i = 0; list.length > i; i++) {
                        if (!(typeof list[i] === "function" || (typeof list[i].regex === "object" && typeof list[i].msg === "string"))) {
                            throw new Error("Only [constraints] type 'function OR {regex:object, msg:string, ?code:number}' can be added");
                         }
                    }
                    __constraints = list;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "codeType", 
            {
                get: function() { return __codeType; },
                set: function(newValue) { __codeType = newValue; },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "order", 
            {
                get: function() { return __order; },
                set: function(newValue) { 
                    if(typeof newValue !== "number") throw new Error("Only [order] type 'number' can be added");
                    __order = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "increase", 
            {
                get: function() { return __increase; },
                set: function(newValue) { 
                    if(typeof newValue !== "number") throw new Error("Only [increase] type 'number' can be added");
                    __increase = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            Object.defineProperty(this, "value", 
            {
                get: function() { 
                    var __val;
                    if (typeof __getter === 'function' ) __val = __getter.call(this);
                    else __val = this.__value || this.default;
                    return __val; 
                },
                set:  function(val) { 
                    var __val, _val;
                    if (typeof __setter === 'function' ) _val = __setter.call(this, val);
                    
                    // settter 의 리턴이 여부
                    if (typeof _val !== 'undefined') __val = _val;
                    else __val = val; 

                    __val = __val === null ? '' : __val;  // null 등록 오류 처리
                    if(["number", "string", "boolean"].indexOf(typeof __val) < 0) {
                        throw new Error("Only [value] type 'number, string, boolean' can be added");
                    }
                    this.__value = __val;
                    // 이벤트 발생
                    this._onChanged();
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "getter", 
            {
                get: function() { return __getter; },
                set: function(val) { 
                    if(val !== null && typeof val !== "function") throw new Error("Only [getter] type 'function' can be added");
                    __getter = val;
                },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "setter", 
            {
                get: function() { return __setter; },
                set: function(val) { 
                    if(val !== null && typeof val !== "function") throw new Error("Only [setter] type 'function' can be added");
                    __setter = val;
                },
                configurable: true,
                enumerable: true
            });

            /** @event _W.Meta.Entity.Item#onChanged */
            Object.defineProperty(this, "onChanged", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "onChanged");
                }
            });
            

            //---------------------------------------------------
            // 아이템 옵션속성 추가
            if (typeof p_property === "object" ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    [   "entity", "type", "size", "default", "caption", 
                        "isNotNull", "isNullPass", "callback", "constraints", 
                        "codeType", "order", "increase", "value", "getter", "setter" 
                    ].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            } else if (["number", "string", "boolean"].indexOf(typeof p_property) > -1) {
                this['value'] = p_property;
            }

        }
        util.inherits(Item, _super);

        /**
         * @listens _W.Meta.Entity.Item#_onChanged
         */
        Item.prototype._onChanged = function() {
            this.__event.publish("onChanged", this.value);
        };

        /** @override **/
        Item.prototype.getTypes  = function() {
                    
            var type = ["Item"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** @override */
        Item.prototype.clone = function() {
            
            var clone = new Item(this.name);
            var constraints = [];

            if (this.entity) clone["entity"]            = this.entity;  // 참조값
            if (this.type) clone["type"]                = this.type;
            if (this.size) clone["size"]                = this.size;
            if (this.default) clone["default"]          = this.default;
            if (this.caption) clone["caption"]          = this.caption;
            if (this.isNotNull) clone["isNotNull"]      = this.isNotNull;
            if (this.isNullPass) clone["isNullPass"]     = this.isNullPass;
            if (this.callback) clone["callback"]        = this.callback;
            for (var i = 0; this.constraints.length > i; i++) {
                constraints.push(this.constraints[i]);
            }
            if (this.constraints) clone["constraints"]  = constraints;
            if (this.codeType) clone["codeType"]        = this.codeType;  // 참조값
            if (this.order) clone["order"]              = this.order;
            if (this.increase) clone["increase"]        = this.increase;
            if (this.value) clone["value"]              = this.value;
            if (this.getter) clone["getter"]            = this.getter;
            if (this.setter) clone["setter"]            = this.setter;

            return clone;
        };

        /** @override */
        Item.prototype.getObject = function() {
            // TODO::
        };

        /**
         * 제약조건 설정
         */
        Item.prototype.setConstraint = function(p_regex, p_msg, p_code, p_return) {
            p_return = p_return || false;

            var constraint = {};

            if (!(p_regex instanceof RegExp)) throw new Error("Only [p_regex] type 'RegExp' can be added");
            if (!(typeof p_msg === "string")) throw new Error("Only [p_msg] type 'string' can be added");

            constraint.regex = p_regex;
            constraint.msg = p_msg;
            constraint.code = p_code;
            constraint.return = p_return;
            
            this.constraints.push(constraint);
        };

// POINT:: 삭제 대기
        /**
         * @method
         */
        // Item.prototype.defineValueProperty = function(p_getter, p_setter) {

        //     // 타입검사 
        //     if(typeof p_getter !== "undefined" && typeof p_getter !== "function") {
        //         throw new Error("Only [p_getter] type 'function' can be added");
        //     }
        //     if(typeof p_setter !== "undefined" && typeof p_setter !== "function") {
        //         throw new Error("Only [p_getter] type 'function' can be added");
        //     }

        //     // 기본값 설정
        //     p_getter = p_getter || function() { return this.__value; };
        //     p_setter = p_setter || function(val) { this.__value = val; };

        //     /** @event */s
        //     Object.defineProperty(this, "value", {
        //         enumerable: true,
        //         configurable: true,
        //         get: p_getter,
        //         set: p_setter
        //     });
        // };
        
        /**
         * 검사
         * @param {string} p_value 
         * @param {object} r_result 메세지는 참조(객체)형 으로 전달
         * @param {number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
         */
        // Item.prototype.valid = function(p_value, r_result, p_option) {
        Item.prototype.valid = function(p_value, r_result) {
            // p_option = p_option || 1;   
            r_result.value = p_value;
            r_result.msg = "";
            r_result.code = "";
            p_value = p_value || "";
            
            var result;
            var value = null;

            // if (!(typeof p_value === "string")) throw new Error("Only [p_value] type 'string' can be added");
            p_value = typeof p_value === "number" ? String(p_value) : p_value;  // number 형 변환

            // 1. 기본값 얻기
            value = p_value === null || typeof p_value === "undefined" ? this.default : p_value;
            value = value.trim();

            // 2-1. 통과조건 검사
            if (false
                || (this.isNotNull === false && this.constraints.length === 0 ) 
                || (this.isNotNull === false && this.isNullPass === true && value.length === 0)
                || (this.isNotNull === true && this.constraints.length === 0 && value.length > 0)
            ){
                return true;
            }
            // 2-2. 실패조건 검사
            if (this.isNotNull === true && this.constraints.length === 0 && value.length === 0) {
                r_result.msg   = this.caption+"("+this.name+")은  공백을 입력할 수 없습니다.";
                r_result.code  = 0;
                return false;
            }

            // 2-3. 제약조건 검사
            for(var i = 0; this.constraints.length > i; i++) {

                if (typeof this.constraints[i] === "function") {
                    return this.constraints[i].call(this, this, p_value, r_result);     // 함수형 제약조건
                } else {
                    result = p_value.match(this.constraints[i].regex);
    
                    if ((this.constraints[i].return === false && result !== null) ||    // 실패 조건
                        (this.constraints[i].return === true && result === null)) {     // 성공 조건
       
                        r_result.msg   = this.constraints[i].msg;
                        r_result.code  = this.constraints[i].code;
                        return false;
                    }
                }
            }            
            // // 3. 결과(Null) 검사
            // if ((p_option === 1 && this.isNotNull === true && p_value.trim().length <= 0) || 
            //     (p_option === 2 && p_value.trim().length <= 0)) {
                
            //     r_result.msg   = this.caption+"("+this.name+")은  공백을 입력할 수 없습니다.";
            //     r_result.code  = 0;
            //     return false;
            // }
            return true;
        };

        return Item;
    
    }(MetaElement));

    //---------------------------------------
    var ItemCollection  = (function (_super) {
        /**
         * 아이템 컬렉션 (최상위)
         * @constructs _W.Meta.Entity.ItemCollection
         * @extends _W.Collection.PropertyCollection
         * @abstract
         * @param {*} p_onwer 소유자 
         */
        function ItemCollection(p_onwer) {
            _super.call(this, p_onwer);
            
            this.elementType = Item;    // 기본 컬렉션 타입
            
            Object.defineProperty(this, "itemType", 
            {
                get: function() { return this.elementType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error("Only [Item] type 'Item' can be added");
                    this.elementType = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            
        }
        util.inherits(ItemCollection, _super);
        
        /**
         * 유무 검사
         * @param {*} p_elem 
         * @returns {*} 
         */
        ItemCollection.prototype.contains = function(p_elem) {

            if (p_elem instanceof Item) {
                return this.indexOfName(p_elem.name) > -1;
            } else {
                return _super.prototype.contains.call(this, p_elem);
            }
        };

        /**
         * 아이템 추가 : 이름, 값
         * @param {*} p_name 
         * @param {*} p_value 
         * @returns {*}
         */
        ItemCollection.prototype.addValue  = function(p_name, p_value) {

            var item;
            var property = {};

            if (typeof p_name !== "string") throw new Error("There is no required value [p_name].");
            if(["number", "string", "boolean"].indexOf(typeof p_value) < 0) {
                throw new Error("Only [value] type 'number, string, boolean' can be added");
            }
            
            property = { value: p_value };

            item = new this.itemType(p_name, this._onwer, property);

            return this.add(item);
        };

        return ItemCollection;
    
    }(PropertyCollection));


    //---------------------------------------
    var ItemTableCollection  = (function (_super) {
        /**
         * 테이블 아이템 컬렉션
         * @constructs _W.Meta.Entity.ItemTableCollection
         * @extends _W.Meta.Entity.ItemCollection
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemTableCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(ItemTableCollection, _super);

        /**
         * @param {string | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        ItemTableCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new this.itemType(i_name, this._onwer);
            } else if (p_object instanceof this.itemType) {
                // EntityTable은 직접만 적용(참조형 아이템 소유 못함)
                i_name  = p_object.name;
                i_value = p_object.clone();
                i_value.entity = this._onwer;
            } else {
                throw new Error("string | Item object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            return _super.prototype.add.call(this, i_name, i_value);
        };

        return ItemTableCollection;
    
    }(ItemCollection));


    //---------------------------------------
    var ItemViewCollection  = (function (_super) {
        /**
         * @constructs _W.Meta.Entity.ItemViewCollection
         * @extends _W.Meta.Entity.ItemCollection
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemViewCollection(p_onwer, p_baseCollection) {
            _super.call(this, p_onwer);

            if (p_baseCollection && !(p_baseCollection instanceof ItemCollection)) {
                throw new Error("Error!! ItemCollection object [p_baseCollection].");
            }
            
            /** @protected */
            this._baseCollection = p_baseCollection;
        }
        util.inherits(ItemViewCollection, _super);

        /**
         *  - base(all),    string | Itme, Collection   => Collection 에 생성후 자신에 등록 
         *  - base(N),      string | Itme               => this 에 생성후 자신에 등록
         *  - base(Y),      string | Item               => Base 에 생성후 자신에 등록
         * 
         *   // string                       => 생성 및 자신에 등록
         *   // string <base>                => 생성 및 소유처에 등록
         *   // Item                         => 생성 및 자신에 등록
         *   // Item <base>                  => 생성 및 소유처에 등록
         *   // string, collection           => 참조만 등록
         *   // string, collection <base>    => 참조만 등록
         * 
         *  TODO:: filter 옵션 : 충돌방지에 이용
         *  TODO:: 객체 비교는 string 이 아니고 값과 타입을 비교해야함 (그래야 참조를 사용)
         * 
         * @param {String | Item} p_object 
         * @param {?ItemCollection} p_baseCollection
         */
        ItemViewCollection.prototype.add  = function(p_object, p_baseCollection) {
            
            var collection;
            var i_name;
            var i_value;

            if (p_object instanceof Item) {
                if (p_object.entity === null) p_object.entity = this._onwer;
                i_name = p_object.name;
                i_value = p_object;
            } else if (typeof p_object === "string") {
                i_name = p_object;
                i_value = new this.itemType(i_name, this._onwer);
            } else {
                throw new Error("p_object string | Item instance param request fail...");
            }

            // TODO:: 이름 충돌검사

            if (p_baseCollection instanceof ItemCollection) {            // 전달값으로 기본컬렉션 지정시
                collection = p_baseCollection;
            } else if (this._baseCollection instanceof ItemCollection) { // 기본컬렉션 존재시
                collection = this._baseCollection;
            }
            
            // 기본참조 컬렉션 또는 전달참조 컬렉션인 경우
            if (collection) {
                if (collection.contains(collection[i_name])) {
                    i_value = collection[i_name];                      // 참조 가져옴
                } else {
                    i_value = collection.add(p_object);                // 컬렉션에 등록
                }
                
                // REVIEW:: 의존성을 낮추기 위해서 검사후 등록
                // 소유객체에 참조 등록 (중복제거됨)
                if (this._onwer._regRefer) {
                    this._onwer._regRefer(collection._onwer);
                }
            }
            
            return _super.prototype.add.call(this, i_name, i_value);
        };

        /**
         * 엔티티 추가
         * @param {*} p_entity 
         */
        ItemViewCollection.prototype.addEntity  = function(p_entity) {
            if (typeof p_entity === "undefined" && !(p_entity instanceof MetaElement && p_entity.instanceOf("Entity"))) {
                throw new Error("Only [p_entity] type 'Entity' can be added");
            }

            for (var i = 0; p_entity.items.count > i; i++) {
                this.add(p_entity.items[i]);
            }
        };
        
        return ItemViewCollection;
    
    }(ItemCollection));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.Item                         = Item;
        module.exports.ItemCollection               = ItemCollection;
        module.exports.ItemViewCollection           = ItemViewCollection;
        module.exports.ItemTableCollection          = ItemTableCollection;

    } else {
        global._W.Meta.Entity.Item                  = Item;
        global._W.Meta.Entity.ItemCollection        = ItemCollection;
        global._W.Meta.Entity.ItemViewCollection    = ItemViewCollection;
        global._W.Meta.Entity.ItemTableCollection   = ItemTableCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));