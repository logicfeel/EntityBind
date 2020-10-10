/**
 * @namespace _W.Meta.Entity.EntityTable
 * @namespace _W.Meta.Entity.EntityTableCollection
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
    var Entity;
    var PropertyCollection;
    var IGroupControl;
    var IAllControl;
    var RowCollection;
    var ItemCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        PropertyCollection  = require("./collection-property");
        IGroupControl       = require("./i-control-group");
        IAllControl         = require("./i-control-all");
        RowCollection       = require("./entity-row").RowCollection;
        ItemCollection      = require("./entity-item").ItemCollection;
    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        IGroupControl       = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;
        RowCollection       = global._W.Meta.Entity.RowCollection;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof RowCollection === "undefined") throw new Error("[RowCollection] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var EntityTable  = (function (_super) {
        /**
         * @abstract @class
         */
        function EntityTable(p_name) {
            _super.call(this, p_name);

            this.items = new ItemCollection(this);

            this.rows = new RowCollection(this);

            /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(EntityTable, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        EntityTable.prototype.getTypes  = function() {
            
            var type = ["EntityTable"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        EntityTable.prototype.merge  = function() {
            // TODO::
        };
        
        EntityTable.prototype.copyTo  = function() {
            // TODO::
        };
        
        EntityTable.prototype.clone  = function() {
            // TODO::
        };
        
        EntityTable.prototype.load  = function() {
            // TODO::
        };
        
        EntityTable.prototype.clear  = function() {
            // TODO::
        };

        EntityTable.prototype.select  = function() {
            // TODO::
        };

        return EntityTable;
    
    }(Entity));
    

     //---------------------------------------
     var EntityTableCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function EntityTableCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(EntityTableCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        EntityTableCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new Item(i_name, this._onwer);
            } else if (p_object instanceof Item) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | EntityTable object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        /**
         * EntityTable 타입만 들어가게 제약조건 추가
         * @override
         */
        EntityTableCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof EntityTable) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [EntityTable] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


        // TODO::
        
        return EntityTableCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.EntityTable = EntityTable;
        module.exports.EntityTableCollection = EntityTableCollection;
    } else {
        global._W.Meta.Entity.EntityTable = EntityTable;
        global._W.Meta.Entity.EntityTableCollection = EntityTableCollection;
    }

}(this));