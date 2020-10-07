/**
 * @namespace _W.Meta.Bind.BindCommandDelete
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
    var BindCommandDelete  = (function (_super) {
        /**
         * @class
         */
        function BindCommandDelete(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

        }
        util.inherits(BindCommandDelete, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandDelete.prototype.getTypes  = function() {
                    
            var type = ["BindCommandDelete"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandDelete.prototype.execValid = function() {
            // TODO::
            console.log("*************");
            console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        BindCommandDelete.prototype.execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execCallback();
        };
        
        BindCommandDelete.prototype.execCallback = function() {
            // TODO::
            console.log("*************");
            console.log("_execCallback()");

            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

        return BindCommandDelete;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandDelete;
    } else {
        global._W.Meta.Bind.BindCommandDelete = BindCommandDelete;
    }

}(this));