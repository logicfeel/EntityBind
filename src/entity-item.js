/**
 * @namespace _W.Meta.Entity.Item
 * @namespace _W.Meta.Entity.ItemCollection
 * @namespace _W.Meta.Entity.ItemRefCollection
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
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        MetaElement         = require("./meta-element");
        PropertyCollection  = require("./collection-property");
    } else {
        util                = global._W.Common.Util;
        MetaElement         = global._W.Meta.MetaElement;
        PropertyCollection  =  global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    var Item  = (function (_super) {
        /**
         * @class 
         * @param {String} p_name 아이템명
         * @param {Entity} p_entity 소유 Entity
         */
        function Item(p_name, p_entity, p_option) {
            _super.call(this, p_name);

            var __entity        = null;
            var __type          = "string";
            var __size          = 0;
            var __default       = null;
            var __caption       = "";
            var __isNotNull     = false;
            var __callback      = null;
            var __constraints   = [];
            var __codeType      = null;
            var __order         = 100;
            var __increase      = 100;      // order 의 자동 추가수
            var __value         = null;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity.instanceOf("Entity")) {
                __entity    = p_entity;
                __order     = __entity.items.count === 0 ? __order : __entity.items[__entity.items.count - 1].order + __increase;
            }

            /** @property {entity} */
            Object.defineProperty(this, "entity", 
            {
                get: function() { return __entity; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if (newValue && !newValue.instanceOf("Entity")) throw new Error("Only [entity] type 'Entity' can be added");
                    __entity = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {type} */
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

            /** @property {size} */
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

            /** @property {default} */
            Object.defineProperty(this, "default", 
            {
                get: function() { return __default; },
                set: function(newValue) { 
                    if(typeof newValue !== "undefined" && ["string", "number", "boolean"].indexOf(typeof newValue) < 0) throw new Error("Only [default] type 'string | boolea | number' can be added");
                    __default = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {caption} */
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

            /** @property {isNotNull} */
            Object.defineProperty(this, "isNotNull", 
            {
                get: function() { return __isNotNull; },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isNotNull] type 'boolean' can be added");
                    __isNotNull = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {callback} */
            Object.defineProperty(this, "callback", 
            {
                get: function() { return __callback; },
                set: function(newValue) { 
                    if(typeof newValue !== "function") throw new Error("Only [callback] type 'function' can be added");
                    __callback = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {constraints} */
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
                        if (typeof list[i].regex !== "object" || typeof list[i].msg !== "string") {
                            throw new Error("Only [constraints] type '{regex:object, msg:string, ?code:number}' can be added");
                        }
                    }
                    __constraints = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {codeType} */
            Object.defineProperty(this, "codeType", 
            {
                get: function() { return __codeType; },
                set: function(newValue) { __codeType = newValue; },
                configurable: true,
                enumerable: true
            });

            /** @property {order} */
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

            /** @property {increase} */
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
            
            /** @property {value} */
            Object.defineProperty(this, "value", 
            {
                get: function() { return __value; },
                set: function(newValue) { 
                    __value = newValue;
                },
                configurable: true,
                enumerable: true
            });


            // 아이템 옵션속성 추가
            if (typeof p_option === "object" ) {
                for(var prop in p_option) {
                    if (p_option.hasOwnProperty(prop)) {
                        this[prop] = p_option[prop];
                    }
                }
            } else if (["number", "string", "boolean"].indexOf(typeof p_option) > -1) {
                this.default = p_option;
            }

        }
        util.inherits(Item, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Item.prototype.getTypes  = function() {
                    
            var type = ["Item"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** @override */
        Item.prototype.getObject = function() {
            // TODO::
        };

        /**
         * @method
         */
        Item.prototype.setConstraint = function(i_regex, i_msg, i_code) {

            var constraint = {};

            if (!(i_regex instanceof RegExp)) throw new Error("Only [i_regex] type 'RegExp' can be added");
            if (!(typeof i_msg === "string")) throw new Error("Only [i_msg] type 'string' can be added");

            constraint.regex = i_regex;
            constraint.msg = i_msg;
            constraint.code = i_code;
            
            this.constraints.push(constraint);
        };

        
        /**
         * 
         * @param {*} p_value 
         * @param {*} r_result 
         * @param {Number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
         */
        Item.prototype.valid = function(p_value, r_result, p_option) {
            // 기본값
            p_option = p_option || 1;   
            r_result.msg = "";
            r_result.code = "";
            p_value = p_value || "";
            
            var result;

            if (!(typeof p_value === "string")) throw new Error("Only [p_value] type 'string' can be added");
            
            // 우선순위 높음
            for(var i = 0; this.constraints.length > i; i++) {
                result = p_value.match(this.constraints[i].regex);
                if (result !== null) {
                    r_result.msg   = this.constraints[i].msg;
                    r_result.code  = this.constraints[i].code;
                    return false;
                }
            }
            
            // Null 검사
            if ((p_option === 1 && this.isNotNull && p_value.trim().length <= 0) || 
                (p_option === 2 && p_value.trim().length <= 0)) {
                
                r_result.msg   = this.caption+"("+this.name+")은  공백을 입력할 수 없습니다.";
                r_result.code  = 0;
                return false;
            }
            return true;
        };

        return Item;
    
    }(MetaElement));

    //---------------------------------------
    var ItemCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function ItemCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(ItemCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        ItemCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new Item(i_name, this._onwer);
            } else if (p_object instanceof Item) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | Item object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };

        ItemCollection.prototype.addValue  = function(p_name, p_value) {

            var item;

            if (typeof p_name === "undefined") throw new Error("There is no required value [p_name].");
            if (typeof p_value === "undefined") throw new Error("There is no required value [p_name].");


            if (typeof p_name === "string") {      
                item = new Item(p_name, this._onwer, p_value);
            } else {
                throw new Error("string | Item object [p_object].");
            }

            return this.add(item);
        };

        /**
         * Item 타입만 들어가게 제약조건 추가
         * @override
         */
        ItemCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Item) {
                        this._element[p_idx] = newValue;
                    } else {
                        throw new Error("Only [Item] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


        // TODO::
        
        return ItemCollection;
    
    }(PropertyCollection));


    //---------------------------------------
    var ItemRefCollection  = (function (_super) {
        /**
         * @class
         * @constructor
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_refCollection 참조기본 컬렉션
         */
        function ItemRefCollection(p_onwer, p_refCollection) {
            _super.call(this, p_onwer);

            // if (typeof p_refCollection !== "undefined" && !(p_refCollection instanceof ItemCollection)) {
            if (p_refCollection && !(p_refCollection instanceof ItemCollection)) {
                throw new Error("Error!! ItemCollection object [p_refCollection].");
            }
            
            /**
             * @protected @member
             */
            this._refCollection = p_refCollection;
        }
        util.inherits(ItemRefCollection, _super);

        /**
         *  - base(all),    string | Itme, Collection   => Collection 에 생성후 자신에 등록 
         *  - base(N),      string | Itme               => this 에 생성후 자신에 등록
         *  - base(Y),      string | Item               => Base 에 생성후 자신에 등록
         * 
         *  TODO:: filter 옵션 : 충돌방지에 이용
         *  TODO:: 객체 비교는 string 이 아니고 값과 타입을 비교해야함 (그래야 참조를 사용)
         * 
         * @param {String, Item} p_object 
         * @param {?ItemCollection} p_refCollection
         */
        ItemRefCollection.prototype.add  = function(p_object, p_refCollection) {

            // string                       => 생성 및 자신에 등록
            // string <base>                => 생성 및 소유처에 등록
            // Item                         => 생성 및 자신에 등록
            // Item <base>                  => 생성 및 소유처에 등록
            // string, collection           => 참조만 등록
            // string, collection <base>    => 참조만 등록
            
            var item;
            var collection;
            var i_name = p_object instanceof Item ? p_object.name : null;

            if (p_object instanceof Item) {
                i_name = p_object.name;
            } else if (typeof p_object === "string") {
                i_name = p_object;
            } else {
                throw new Error("p_object string | Item instance param request fail...");
            }

            // TODO:: 이름 충돌검사

            if (p_refCollection instanceof ItemCollection) {
                collection = p_refCollection;
            } else if (this._refCollection instanceof ItemCollection) {
                collection = this._refCollection;
            }
            
            // 기본참조 컬렉션 또는 전달참조 컬렉션인 경우
            if (collection) {
                if (collection.contains(i_name)) {
                    item = collection[i_name];                      // 참조 가져옴
                } else {
                    item = collection.add(p_object);                // 참조 가져옴
                }
                
                // REVIEW:: 의존성을 낮추기 위해서 검사후 등록
                // 소유객체에 참조 등록 (중복제거됨)
                if (this._onwer._regRefer) {
                    this._onwer._regRefer(collection._onwer);
                }
            }
            
            item = item || p_object;

            return _super.prototype.add.call(this, item);           // 자신에 등록
        };

        // POINT::
        // ItemCollection.prototype.addValue  = function(p_name, p_value) {
        // };

        return ItemRefCollection;
    
    }(ItemCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.Item                     = Item;
        module.exports.ItemCollection           = ItemCollection;
        module.exports.ItemRefCollection        = ItemRefCollection;
    } else {
        global._W.Meta.Entity.Item              = Item;
        global._W.Meta.Entity.ItemCollection    = ItemCollection;
        global._W.Meta.Entity.ItemRefCollection = ItemRefCollection;
    }

}(this));