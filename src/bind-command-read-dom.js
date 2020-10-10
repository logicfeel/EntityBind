/**
 * @namespace _W.Meta.Bind.BindCommandReadDOM
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
    var BindCommandRead;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandRead     = require("./bind-command-read");
    } else {
        util                = global._W.Common.Util;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandReadDOM  = (function (_super) {
        /**
         * @class
         */
        function BindCommandReadDOM(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            // TODO:: jquery 등 외부 모듈을 이용하여, 검사 진행, 하지만 꼭 필요한지 사용시 재검토
        }
        util.inherits(BindCommandReadDOM, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandReadDOM.prototype.getTypes  = function() {
                
            var type = ["BindCommandReadDOM"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandReadDOM.prototype._execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execCallback();
        };
        
        BindCommandReadDOM.prototype._execCallback = function() {
            // TODO::
            console.log("*************");
            console.log("_execCallback()");
            this._execView();
        };

        // TODO:: 이 부분은 사용시 구현이 되어야함.
        BindCommandReadDOM.prototype._execView = function() {
            // TODO::
            console.log("*************");
            console.log("_execView()");
            for(var i = 0; i < this._output.count; i++) {
                for (var ii = 0; ii < this._output[i].items.count; ii++) {
                    console.log("output["+ i +"] : " + this._output[i].items[ii].name);
                }
            }
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

        return BindCommandReadDOM;
    
    }(BindCommandView));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandReadDOM;
    } else {
        global._W.Meta.Bind.BindCommandReadDOM = BindCommandReadDOM;
    }

}(this));