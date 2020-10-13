/**
 * @namespace _W.Meta.Bind.BindModelCreate
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
    var BindCommandRead;
    var EntityTable;
    var IBindModelCreate;
    
    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
         
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandRead     = require("./bind-command-read");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelCreate    = require("./i-bind-model-create");
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelCreate    = global._W.Interface.IBindModelCreate;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelCreate === "undefined") throw new Error("[IBindModelCreate] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelCreate  = (function (_super) {
        /**
         * @class
         */
        function BindModelCreate() {
            _super.call(this);


            var __firest    = new EntityTable("first");

            // var __create      = new BindCommandRead(this, __firest);
            var __create      = null;

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
                    if (!(newValue instanceof BindCommandRead)) throw new Error("Only [create] type 'BindCommandRead' can be added");
                    __create = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelCreate);              
        }
        util.inherits(BindModelCreate, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelCreate.prototype.getTypes  = function() {
                    
            var type = ["BindModelCreate"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelCreate;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelCreate;
    } else {
        global._W.Meta.Bind.BindModelCreate = BindModelCreate;
    }

}(this));