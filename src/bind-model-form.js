/**
 * @namespace _W.Meta.Bind.BindModelForm
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
    var BindModel;
    var BindCommandCreate;
    var BindCommandRead;
    var BindCommandUpdate;
    var BindCommandDelete;
    var EntityTable;
    var PropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                        = require("./utils");
        BindModel                   = require("./bind-model");
        BindCommandCreate           = require("./bind-command-create");
        BindCommandRead             = require("./bind-command-read");
        BindCommandUpdate           = require("./bind-command-update");
        BindCommandDelete           = require("./bind-command-delete");
        EntityTable                 = require("./entity-table").EntityTable;
        PropertyCollection          = require("./collection-property");
        
    } else {
        util                        = global._W.Common.Util;
        BindModel                   = global._W.Meta.Bind.BindModel;
        BindCommandCreate           = global._W.Meta.Bind.BindCommandCreate;
        BindCommandRead             = global._W.Meta.Bind.BindCommandRead;
        BindCommandUpdate           = global._W.Meta.Bind.BindCommandUpdate;
        BindCommandDelete           = global._W.Meta.Bind.BindCommandDelete;
        EntityTable                 = global._W.Meta.Entity.EntityTable;
        PropertyCollection          = global._W.Collection.PropertyCollection;

    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandCreate === "undefined") throw new Error("[BindCommandCreate] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof BindCommandUpdate === "undefined") throw new Error("[BindCommandUpdate] module load fail...");
    if (typeof BindCommandDelete === "undefined") throw new Error("[BindCommandDelete] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelForm  = (function (_super) {
        /**
         * @class
         */
        function BindModelForm() {
            _super.call(this);

            var __firest    = new EntityTable("first");
            var __create    = new BindCommandCreate(this, this.first);
            var __read      = new BindCommandRead(this, this.first);
            var __update    = new BindCommandUpdate(this, this.first);
            var __delete    = new BindCommandDelete(this, this.first);

            /** @property {first} */
            Object.defineProperty(this, "first", 
            {
                get: function() { return __firest; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityTable)) throw new Error("Only [first] type 'EntityTable' can be added");
                    __firest = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {create} */
            Object.defineProperty(this, "create", 
            {
                get: function() { return __create; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [create] type 'BindCommand' can be added");
                    __create = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {read} */
            Object.defineProperty(this, "read", 
            {
                get: function() { return __read; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [read] type 'BindCommand' can be added");
                    __read = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {update} */
            Object.defineProperty(this, "update", 
            {
                get: function() { return __update; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [update] type 'BindCommand' can be added");
                    __update = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {delete} */
            Object.defineProperty(this, "delete", 
            {
                get: function() { return __delete; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [delete] type 'BindCommand' can be added");
                    __delete = newValue;
                },
                configurable: true,
                enumerable: true
            });
        }
        util.inherits(BindModelForm, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelForm.prototype.getTypes  = function() {
                    
            var type = ["BindModelForm"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelForm.prototype.init = function() {
            // TODO::
        };

        return BindModelForm;
    
    }(BindModel));
    

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
        module.exports = BindModelForm;
    } else {
        global._W.Meta.Bind.BindModelForm = BindModelForm;
    }

}(this));