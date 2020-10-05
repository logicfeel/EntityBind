/**
 * @namespace _W.Meta.Entity.Row
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
    var Entity;
    var PropertyCollection;
    var ArrayCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        PropertyCollection  = require("./collection-property");
        ArrayCollection     = require("./collection-array");
    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity;
        PropertyCollection  =  global._W.Collection.PropertyCollection;
        ArrayCollection     =  global._W.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof ArrayCollection === "undefined") throw new Error("[ArrayCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var Row  = (function (_super) {
        /**
         * @abstract @class
         */
        function Row() {
            _super.call(this, this);
        }
        util.inherits(Row, _super);

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
        }
        util.inherits(RowCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        RowCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new Item(i_name);
            } else if (p_object instanceof Item) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | Row object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        /**
         * Row 타입만 들어가게 제약조건 추가
         * @override
         */
        RowCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Row) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [Row] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


        // TODO::
        
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

}(this));