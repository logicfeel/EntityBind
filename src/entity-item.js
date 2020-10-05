/**
 * @namespace _W.Meta.Entity
 *      - Item
 *      - ItemCollection
 *      - ItemRefCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
         */
        function Item(p_name) {
            _super.call(this, p_name);

            this.default = null;
            this.caption = null;
            this.codeType = null;
        }
        util.inherits(Item, _super);

        // TODO::
        // Item.prototype.add  = function() {};

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
                i_value = new Item(i_name);
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
        
        /**
         * Item 타입만 들어가게 제약조건 추가
         * @override
         */
        ItemCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Item) {
                        this._items[p_idx] = newValue;
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
         * @param {?ItemCollection} p_base 참조기본 컬렉션
         */
        function ItemRefCollection(p_onwer, p_base) {
            _super.call(this, p_onwer);

            if (typeof p_base !== "undefined" && !(p_base instanceof ItemCollection)) {
                throw new Error("Error!! ItemCollection object [p_base].");
            }
            
            /**
             * @protected @member
             */
            this._baseCollection = p_base;
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
            } else if (this._baseCollection instanceof ItemCollection) {
                collection = this._baseCollection;
            }
            
            if (collection) {
                if (collection.contains(i_name)) {
                    item = collection[i_name];                      // 참조 가져옴
                } else {
                    item = collection.add(p_object);                // 참조 가져옴
                }
                
                // 의존성을 낮추기 위해서 검사후 등록
                // 오너 참조에 검사후 없을경우 등록하는 루틴 필요
                if (this._onwer.regRefer) {
                    this._onwer.regRefer(collection._onwer);
                }
            }
            
            item = item || p_object;

            return _super.prototype.add.call(this, item);           // 자신에 등록
        };


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