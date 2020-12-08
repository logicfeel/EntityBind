/**
 * @namespace _W.Interface.IBindModelCreate
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
    var IBindModel;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModel          = require("./i-bind-model");
    } else {
        util                = global._W.Common.Util;
        IBindModel          = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelCreate  = (function (_super) {
        function IBindModelCreate() {
            _super.call(this);

            this.create = null;
        }
        util.inherits(IBindModelCreate, _super);

        return IBindModelCreate;
    }(IBindModel));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelCreate;
    } else {
        global._W.Interface.IBindModelCreate = IBindModelCreate;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));