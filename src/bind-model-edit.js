/**
 * @namespace _W.Meta.Bind.BindModelEdit
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
    var IBindModelEdit;

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        util                        = require("./utils");
        BindModel                   = require("./bind-model");
        BindCommandCreate           = require("./bind-command-create");
        BindCommandRead             = require("./bind-command-read");
        BindCommandUpdate           = require("./bind-command-update");
        BindCommandDelete           = require("./bind-command-delete");
        EntityTable                 = require("./entity-table").EntityTable;
        PropertyCollection          = require("./collection-property");
        IBindModelEdit              = require("./i-bind-model-edit");
    } else {
        util                        = global._W.Common.Util;
        BindModel                   = global._W.Meta.Bind.BindModel;
        BindCommandCreate           = global._W.Meta.Bind.BindCommandCreate;
        BindCommandRead             = global._W.Meta.Bind.BindCommandRead;
        BindCommandUpdate           = global._W.Meta.Bind.BindCommandUpdate;
        BindCommandDelete           = global._W.Meta.Bind.BindCommandDelete;
        EntityTable                 = global._W.Meta.Entity.EntityTable;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        IBindModelEdit               = global._W.Interface.IBindModelEdit;
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
    if (typeof IBindModelEdit === "undefined") throw new Error("[IBindModelEdit] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelEdit  = (function (_super) {
        /**
         * @class
         */
        function BindModelEdit() {
            _super.call(this);

            var __firest    = new EntityTable("first");
            
            // var __create    = new BindCommandCreate(this, this.first);
            // var __read      = new BindCommandRead(this, this.first);
            // var __update    = new BindCommandUpdate(this, this.first);
            // var __delete    = new BindCommandDelete(this, this.first);
            var __read      = null;
            var __update    = null;
            var __delete    = null;

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

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelEdit);
        }
        util.inherits(BindModelEdit, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelEdit.prototype.getTypes  = function() {
                    
            var type = ["BindModelEdit"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelEdit;
    
    }(BindModel));
    
        
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelEdit;
    } else {
        global._W.Meta.Bind.BindModelEdit = BindModelEdit;
    }

}(this));