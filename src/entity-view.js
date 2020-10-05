/**
 * @namespace _W.Meta.Entity.EntityView
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
    var ItemRefCollection;
    var PropertyCollection;
    var ArrayCollection;
    var IGroupControl;
    var IAllControl;


    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        ItemRefCollection   = require("./entity-item").ItemRefCollection;
        PropertyCollection  = require("./collection-property");
        ArrayCollection     = require("./collection-array");
        IGroupControl       = require("./i-control-group");
        IAllControl         = require("./i-control-all");

    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        ItemRefCollection   = global._W.Meta.Entity.ItemRefCollection;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ArrayCollection     = global._W.Collection.ArrayCollection;
        IGroupControl       = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof ItemRefCollection === "undefined") throw new Error("[ItemRefCollection] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof ArrayCollection === "undefined") throw new Error("[ArrayCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var EntityView  = (function (_super) {
        /**
         * @abstract @class
         */
        function EntityView(p_name, p_baseCollection) {
            _super.call(this, p_name);

            /**
             * @abstract 상속에서 생성해야함
             */
            this.items = new ItemRefCollection(this, p_baseCollection);
            this.rows = null;
            
             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(EntityView, _super);

        EntityView.prototype._regRefer  = function() {
            // TODO::
        };

        EntityView.prototype.merge  = function() {
            // TODO::
        };
        
        EntityView.prototype.copyTo  = function() {
            // TODO::
        };
        
        EntityView.prototype.clone  = function() {
            // TODO::
        };
        
        EntityView.prototype.load  = function() {
            // TODO::
        };
        
        EntityView.prototype.clear  = function() {
            // TODO::
        };

        EntityView.prototype.select  = function() {
            // TODO::
        };

        return EntityView;
    
    }(Entity));
    
    //---------------------------------------
    var EntityViewCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function EntityViewCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(EntityViewCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        EntityViewCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new Item(i_name);
            } else if (p_object instanceof Item) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | EntityView object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        /**
         * EntityView 타입만 들어가게 제약조건 추가
         * @override
         */
        EntityViewCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof EntityView) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [EntityView] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


        // TODO::
        
        return EntityViewCollection;
    
    }(PropertyCollection));

    //---------------------------------------
    var OutputCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function OutputCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(OutputCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        OutputCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new EntityView(i_name);
            } else if (p_object instanceof EntityView) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | EntityView object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            return _super.prototype.add.call(this, i_value);
        };
        
        /**
         * EntityView 타입만 들어가게 제약조건 추가
         * @override
         */
        OutputCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof EntityView) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [EntityView] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


        // TODO::
        
        return OutputCollection;
    
    }(ArrayCollection));
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.EntityView = EntityView;
        module.exports.EntityViewCollection = EntityViewCollection;
        module.exports.OutputCollection = OutputCollection;
    } else {
        global._W.Meta.Entity.EntityView = EntityView;
        global._W.Meta.Entity.EntityViewCollection = EntityViewCollection;
        global._W.Meta.Entity.OutputCollection = OutputCollection;
    }

}(this));