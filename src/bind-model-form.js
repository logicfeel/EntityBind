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
    var BindModelEdit;
    var BindCommandCreate;
    var BindCommandRead;
    var BindCommandUpdate;
    var BindCommandDelete;
    var EntityTable;
    var PropertyCollection;
    var IBindModelForm;

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        util                        = require("./utils");
        BindModelEdit               = require("./bind-model-edit");
        BindCommandCreate           = require("./bind-command-create");
        BindCommandRead             = require("./bind-command-read");
        BindCommandUpdate           = require("./bind-command-update");
        BindCommandDelete           = require("./bind-command-delete");
        EntityTable                 = require("./entity-table").EntityTable;
        PropertyCollection          = require("./collection-property");
        IBindModelForm              = require("./i-bind-model-form");
    } else {
        util                        = global._W.Common.Util;
        BindModelEdit               = global._W.Meta.Bind.BindModelEdit;
        BindCommandCreate           = global._W.Meta.Bind.BindCommandCreate;
        BindCommandRead             = global._W.Meta.Bind.BindCommandRead;
        BindCommandUpdate           = global._W.Meta.Bind.BindCommandUpdate;
        BindCommandDelete           = global._W.Meta.Bind.BindCommandDelete;
        EntityTable                 = global._W.Meta.Entity.EntityTable;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        IBindModelForm               = global._W.Interface.IBindModelForm;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelEdit === "undefined") throw new Error("[BindModelEdit] module load fail...");
    if (typeof BindCommandCreate === "undefined") throw new Error("[BindCommandCreate] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof BindCommandUpdate === "undefined") throw new Error("[BindCommandUpdate] module load fail...");
    if (typeof BindCommandDelete === "undefined") throw new Error("[BindCommandDelete] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IBindModelForm === "undefined") throw new Error("[IBindModelForm] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelForm  = (function (_super) {
        /**
         * @class
         */
        function BindModelForm() {
            _super.call(this);

            var __create    = null;

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

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelForm);              
        }
        util.inherits(BindModelForm, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelForm.prototype.getTypes  = function() {
                    
            var type = ["BindModelForm"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelForm;
    
    }(BindModelEdit));
    
        
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelForm;
    } else {
        global._W.Meta.Bind.BindModelForm = BindModelForm;
    }

}(this));