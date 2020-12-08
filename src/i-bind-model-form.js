/**
 * @namespace _W.Interface.IBindModelForm
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
    var IBindModelEdit;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModelEdit      = require("./i-bind-model-edit");
    } else {
        util                = global._W.Common.Util;
        IBindModelEdit      = global._W.Interface.IBindModelEdit;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelEdit === "undefined") throw new Error("[IBindModelEdit] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelForm  = (function (_super) {
        function IBindModelForm() {
            _super.call(this);

            this.create = null;
        }
        util.inherits(IBindModelForm, _super);

        return IBindModelForm;
    }(IBindModelEdit));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelForm;
    } else {
        global._W.Interface.IBindModelForm = IBindModelForm;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));