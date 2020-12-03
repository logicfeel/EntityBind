/**
 * @namespace _W.Meta.Bind.BindModelRead
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
    var BindCommand;
    var EntityTable;
    var IBindModelRead;
    
    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필

        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommand         = require("./bind-command");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelRead      = require("./i-bind-model-read");
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommand         = global._W.Meta.Bind.BindCommand;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelRead      = global._W.Interface.IBindModelRead;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelRead === "undefined") throw new Error("[IBindModelRead] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelRead  = (function (_super) {
        /**
         * @class
         */
        function BindModelRead(p_objectDI) {
            _super.call(this, p_objectDI);


            var __firest    = new EntityTable("first");

            var __read      = null;

            this._baseEntity = __firest;

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

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelRead);              
        }
        util.inherits(BindModelRead, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelRead.prototype.getTypes  = function() {
                    
            var type = ["BindModelRead"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelRead;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelRead;
    } else {
        global._W.Meta.Bind.BindModelRead = BindModelRead;
    }

}(this));