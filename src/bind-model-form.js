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

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandCreate   = require("./bind-command-create");
        BindCommandRead     = require("./bind-command-read");
        BindCommandUpdate   = require("./bind-command-update");
        BindCommandDelete   = require("./bind-command-delete");
        EntityTable         = require("./entity-table").EntityTable;
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandCreate   = global._W.Meta.Bind.BindCommandCreate;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        BindCommandUpdate   = global._W.Meta.Bind.BindCommandUpdate;
        BindCommandDelete   = global._W.Meta.Bind.BindCommandDelete;
        EntityTable         = global._W.Meta.Entity.EntityTable;
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


    //==============================================================
    // 4. 모듈 구현    
    var BindModelForm  = (function (_super) {
        /**
         * @class
         */
        function BindModelForm() {
            _super.call(this);

            /** @public 마스터 아이템 (실 동록위치) */
            this.first      = new EntityTable("first");

            /** @public Command */
            this.create         = new BindCommandCreate(this, this.first);
            this.read           = new BindCommandRead(this, this.first);
            this.update         = new BindCommandUpdate(this, this.first);
            this.delete         = new BindCommandDelete(this, this.first);
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
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelForm;
    } else {
        global._W.Meta.Bind.BindModelForm = BindModelForm;
    }

}(this));