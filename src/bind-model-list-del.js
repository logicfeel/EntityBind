/**
 * @namespace _W.Meta.Bind.BindModelListDel
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
    var BindModelList;
    var BindCommandList;
    var EntityTable;
    var IBindModelListDel;

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        util                = require("./utils");
        BindModelList       = require("./bind-model-list");
        BindCommandList     = require("./bind-command-list");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelListDel   = require("./i-bind-model-list-del");
    } else {
        util                = global._W.Common.Util;
        BindModelList       = global._W.Meta.Bind.BindModelList;
        BindCommandList     = global._W.Meta.Bind.BindCommandList;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelListDel   = global._W.Interface.IBindModelListDel;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelList === "undefined") throw new Error("[BindModelList] module load fail...");
    if (typeof BindCommandList === "undefined") throw new Error("[BindCommandList] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelListDel === "undefined") throw new Error("[IBindModelListDel] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelListDel  = (function (_super) {
        /**
         * @class
         */
        function BindModelListDel() {
            _super.call(this);

            var __delete    = null;

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
            this._implements(IBindModelListDel);              
        }
        util.inherits(BindModelListDel, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelListDel.prototype.getTypes  = function() {
                    
            var type = ["BindModelListDel"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelListDel.prototype.init = function() {
            // TODO::
        };

        return BindModelListDel;
    
    }(BindModelList));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelListDel;
    } else {
        global._W.Meta.Bind.BindModelListDel = BindModelListDel;
    }

}(this));