/**
 * @namespace _W.Meta.Bind.BindModelReadDelDel
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
    var BindModelRead;
    var BindCommandRead;
    var BindCommandDelete;
    var EntityTable;
    var IBindModelReadDel;

    if (typeof module === "object" && typeof module.exports === "object") {   
        require("./object-implement"); // _implements() : 폴리필
          
        util                = require("./utils");
        BindModelRead       = require("./bind-model-read");
        BindCommandRead     = require("./bind-command-read");
        BindCommandDelete   = require("./bind-command-delete");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelReadDel   = require("./i-bind-model-read-del");
    } else {
        util                = global._W.Common.Util;
        BindModelRead       = global._W.Meta.Bind.BindModelRead;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        BindCommandDelete   = global._W.Meta.Bind.BindCommandDelete;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelReadDel   = global._W.Interface.IBindModelReadDel;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelRead === "undefined") throw new Error("[BindModelRead] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof BindCommandDelete === "undefined") throw new Error("[BindCommandDelete] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelReadDel === "undefined") throw new Error("[IBindModelReadDel] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadDel  = (function (_super) {
        /**
         * @class
         */
        function BindModelReadDel() {
            _super.call(this);

            var __delete    = new BindCommandDelete(this, this.first);

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
            this._implements(IBindModelReadDel);                    
        }
        util.inherits(BindModelReadDel, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadDel.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadDel"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelReadDel.prototype.init = function() {
            // TODO::
        };

        return BindModelReadDel;
    
    }(BindModelRead));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadDel;
    } else {
        global._W.Meta.Bind.BindModelReadDel = BindModelReadDel;
    }

}(this));