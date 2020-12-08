/**
 * @namespace _W.Interface.IBindModel
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IBindModel  = (function () {
        function IBindModel() {

            this.attr      = null;
            this.mode       = null;

            this.cbRegister = null;
            this.cbValid    = null;
            this.cbReady    = null;

            this.onExecute  = null;
            this.onExecuted = null;

            this.cbFail     = null;
            this.cbError    = null;

            this.onExecute  = null;
            this.onExecuted = null;
        }
        
        return IBindModel;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModel;
    } else {
        global._W.Interface.IBindModel = IBindModel;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));