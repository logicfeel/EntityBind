/**
 * @namespace _W.Meta.Bind.BindModelRead
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindModel;
    var BindCommandRead;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandRead     = require("./bind-cmd-read");
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelRead  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModelRead() {
            _super.call(this);

            /** @public 마스터 아이템 (실 동록위치) */
            this.read       = new BindCommandRead(this);
        }
        util.inherits(BindModelRead, _super);
    
        BindModelRead.prototype.init = function() {
            // TODO::
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