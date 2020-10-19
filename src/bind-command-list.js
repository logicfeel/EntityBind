/**
 * @namespace _W.Meta.Bind.BindCommandList
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
    var BindCommandView;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandView     = require("./bind-command-view");
    } else {
        util                = global._W.Common.Util;
        BindCommandView     = global._W.Meta.Bind.BindCommandView;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandView === "undefined") throw new Error("[BindCommandView] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandList  = (function (_super) {
        /**
         * @class
         */
        function BindCommandList(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

        }
        util.inherits(BindCommandList, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandList.prototype.getTypes  = function() {
                
            var type = ["BindCommandList"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandList.prototype.execValid = function() {
            // TODO::
            console.log("*************");
            console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        BindCommandList.prototype.execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execSuccess();
        };
        
        BindCommandList.prototype.execSuccess = function() {
            // TODO::
            console.log("*************");
            console.log("_execSuccess()");
            this._execView();
        };

        BindCommandList.prototype.execView = function() {
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


        return BindCommandList;
    
    }(BindCommandView));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandList;
    } else {
        global._W.Meta.Bind.BindCommandList = BindCommandList;
    }

}(this));