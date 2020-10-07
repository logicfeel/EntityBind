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
    var BindModel;
    var BindCommandRead;
    var BindCommandDelete;
    var EntityTable;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandRead     = require("./bind-command-read");
        BindCommandDelete   = require("./bind-command-delete");
        EntityTable         = require("./entity-table").EntityTable;
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        BindCommandDelete   = global._W.Meta.Bind.BindCommandDelete;
        EntityTable         = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof BindCommandDelete === "undefined") throw new Error("[BindCommandDelete] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadDel  = (function (_super) {
        /**
         * @class
         */
        function BindModelReadDel() {
            _super.call(this);

            /** @public 마스터 아이템 (실 동록위치) */
            this.first      = new EntityTable("first");

            /** @public Command */
            this.read       = new BindCommandRead(this, this.first);
            this.delete     = new BindCommandDelete(this, this.first);
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
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadDel;
    } else {
        global._W.Meta.Bind.BindModelReadDel = BindModelReadDel;
    }

}(this));