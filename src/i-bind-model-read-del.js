/**
 * @namespace _W.Interface.IBindModelReadDel
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModelRead;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModelRead      = require("./i-bind-model-read");
    } else {
        util                = global._W.Common.Util;
        IBindModelRead      = global._W.Interface.IBindModelRead;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelRead === "undefined") throw new Error("[IBindModelRead] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelReadDel  = (function (_super) {
        function IBindModelReadDel() {
            _super.call(this);

            this.delete = null;
        }
        util.inherits(IBindModelReadDel, _super);

        return IBindModelReadDel;
    }(IBindModelRead));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelReadDel;
    } else {
        global._W.Interface.IBindModelReadDel = IBindModelReadDel;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));