/**
 * _W.Meta.Entity
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

    var util;
    var MetaElement;
    var PropertyCollection;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
        function Item() {
            _super.call(this, this);

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
         */
        function ItemCollection() {
            _super.call(this);
        }
        util.inherits(ItemCollection, _super);

        ItemCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === "undefined") throw new Error("There is no required value [p_name].");

            // p_value 값이 없거나, [Item] 인스턴스일 경우 삽입
            if (typeof p_value === "undefined" || p_value instanceof Item) {
                // 부모 호출
                _super.prototype.add.call(this, p_name, p_value);
            } else {
                console.warn("warning:: Only [Item] type instances can be added.")
            }
        };
        
        // TODO::
        
        return ItemCollection;
    
    }(PropertyCollection));


    //---------------------------------------
    var ItemRefCollection  = (function (_super) {
        /**
         * @class
         */
        function ItemRefCollection() {
            _super.call(this);
        }
        util.inherits(ItemRefCollection, _super);

        // TODO::
        // ItemRefCollection.prototype.add  = function() {};

        return ItemRefCollection;
    
    }(ItemCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports                          = Item;
        module.exports.ItemCollection           = ItemCollection;
        module.exports.ItemRefCollection        = ItemRefCollection;
    } else {
        global._W.Meta.Entity.Item              = Item;
        global._W.Meta.Entity.ItemCollection    = ItemCollection;
        global._W.Meta.Entity.ItemRefCollection = ItemRefCollection;
    }

}(this));