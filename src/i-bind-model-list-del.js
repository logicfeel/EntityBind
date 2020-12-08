/**
 * @namespace _W.Interface.IBindModelListDel
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
    var IBindModelList;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModelList      = require("./i-bind-model-list");
    } else {
        util                = global._W.Common.Util;
        IBindModelList      = global._W.Interface.IBindModelList;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelList === "undefined") throw new Error("[IBindModelList] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelListDel  = (function (_super) {
        function IBindModelListDel() {
            _super.call(this);

            this.delete = null;
        }
        util.inherits(IBindModelListDel, _super);

        return IBindModelListDel;
    }(IBindModelList));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelListDel;
    } else {
        global._W.Interface.IBindModelListDel = IBindModelListDel;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));