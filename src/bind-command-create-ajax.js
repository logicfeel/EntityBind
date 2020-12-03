/**
 * @namespace _W.Meta.Bind.BindCommandCreate
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
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-command-internal");
    } else {
        util                = global._W.Common.Util;
        BindCommandInternal = global._W.Meta.Bind.BindCommandInternal;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandInternal === "undefined") throw new Error("[BindCommandInternal] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandCreateAjax  = (function (_super) {``
        /**
         * @class
         */
        function BindCommandCreateAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

        }
        util.inherits(BindCommandCreateAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandCreateAjax.prototype.getTypes  = function() {
                    
            var type = ["BindCommandCreateAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandCreateAjax.prototype.execValid = function() {
             // TODO::
             console.log("*************");
             console.log("_execValid()");
             for(var i = 0; i < this.valid.items.count; i++) {
                 console.log("valid : " + this.valid.items[i].name);
             }
             return true;
        };

        BindCommandCreateAjax.prototype.execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execSuccess();
        };
        
        BindCommandCreateAjax.prototype.execSuccess = function() {
             // TODO::
             console.log("*************");
             console.log("_execSuccess()");
 
             this._onExecuted();  // "실행 종료" 이벤트 발생
        };


        return BindCommandCreateAjax;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandCreateAjax;
    } else {
        global._W.Meta.Bind.BindCommandCreateAjax = BindCommandCreateAjax;
    }

}(this));