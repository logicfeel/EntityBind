/**
 * @namespace _W.Meta.Entity.Row
 * @namespace _W.Meta.Entity.RowCollection
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
    var MetaObject;
    var PropertyCollection;
    var ArrayCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        MetaObject          = require("./meta-object");
        PropertyCollection  = require("./collection-property");
        ArrayCollection     = require("./collection-array");
    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ArrayCollection     = global._W.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof ArrayCollection === "undefined") throw new Error("[ArrayCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var Row  = (function (_super) {
        /**
         * @abstract @class
         */
        function Row(p_entity) {
            _super.call(this, p_entity);
            
            var __entity        = null;
            var itemName;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaObject && p_entity.instanceOf("Entity")) {
                __entity    = p_entity;

                for (var i = 0; i < __entity.items.count; i++) {
                    itemName = __entity.items[i].name;
                    _super.prototype.add.call(this, itemName, null);
                }
            }

            /** @property {entity} */
            Object.defineProperty(this, "entity", 
            {
                get: function() { return __entity; },
                configurable: true,
                enumerable: true
            });            
        }
        util.inherits(Row, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Row.prototype.getTypes  = function() {
                    
            var type = ["Row"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * @param {Object} p_filter 필터객체
         */
        Row.prototype.copy = function(p_filter) {
          
            var clone = new Row(this.entity);
            
            if (this.value) clone["value"] = this.value;
        };
        
        Row.prototype.clone  = function() {
          
            var clone = new Row(this.entity);
            var itemName;

            for (var i = 0; i < this.entity.items.count; i++) {
                itemName = this.entity.items[i].name;
                clone[itemName] = this[itemName];
            }

            return clone;
        };
        
        return Row;
    
    }(PropertyCollection));
    
    //---------------------------------------
    var RowCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function RowCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Row;   // 컬렉션타입 설정
        }
        util.inherits(RowCollection, _super);

        /**
         * 
         * @param {String | Item} p_row 
         * @returns {Item} 등록한 아이템
         */
        RowCollection.prototype.add  = function(p_row) {

            var i_value;

            if (typeof p_row === "undefined") {      
                i_value = new Row(this._onwer);
            } else if (p_row instanceof Row) {
                i_value = p_row;
            } else {
                throw new Error("Row | Row object [p_row].");
            }

            return _super.prototype.add.call(this, i_value);
        };

        return RowCollection;
        
    }(ArrayCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.Row = Row;
        module.exports.RowCollection = RowCollection;
    } else {
        global._W.Meta.Entity.Row = Row;
        global._W.Meta.Entity.RowCollection = RowCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));