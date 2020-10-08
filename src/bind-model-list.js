/**
 * @namespace _W.Meta.Bind.BindModelList
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
    var BindCommandList;
    var EntityTable;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandList     = require("./bind-command-list");
        EntityTable         = require("./entity-table").EntityTable;
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandList     = global._W.Meta.Bind.BindCommandList;
        EntityTable         = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandList === "undefined") throw new Error("[BindCommandList] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelList  = (function (_super) {
        /**
         * @class
         */
        function BindModelList() {
            _super.call(this);

            var __firest    = new EntityTable("first");
            var __list      = new BindCommandList(this, this.first);

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

            /** @property {list} */
            Object.defineProperty(this, "list", 
            {
                get: function() { return __list; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [list] type 'BindCommand' can be added");
                    __list = newValue;
                },
                configurable: true,
                enumerable: true
            });
        }
        util.inherits(BindModelList, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelList.prototype.getTypes  = function() {
                    
            var type = ["BindModelList"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelList.prototype.init = function() {
            // TODO::
        };

        return BindModelList;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelList;
    } else {
        global._W.Meta.Bind.BindModelList = BindModelList;
    }

}(this));