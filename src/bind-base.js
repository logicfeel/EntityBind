/**
 * @namespace _W.Meta.Bind.BaseBind
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
    var Observer;
    var MetaObject;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        Observer            = require("./observer");
        MetaObject          = require("./meta-object");
    } else {
        util                = global._W.Common.Util;
        Observer            = global._W.Common.Observer;
        MetaObject          = global._W.Meta.MetaObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseBind  = (function (_super) {
        /**
         * @abstract @class 추상클래스
         */
        function BaseBind() {
            _super.call(this);

            /** @private */
            this.__event    = new Observer(this, this);

            /** @property */
            Object.defineProperty(this, "onExecute", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "execute");
                }
            });

            /** @property */
            Object.defineProperty(this, "onExecuted", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "executed");
                }
            });

            /** @property */
            Object.defineProperty(this, "onFail", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "fail");
                }
            });

            /** @property */
            Object.defineProperty(this, "eventPropagation", {
                enumerable: true,
                configurable: true,
                set: function(p_bool) {
                    if (!(p_bool instanceof Boolean)) throw new Error("Only [p_bool] type 'Boolean' can be added");
                    this.__event.propagation = p_bool;
                },
                get: function() { return this.__event.propagation; }
            });
        }
        util.inherits(BaseBind, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BaseBind.prototype.getTypes  = function() {
                    
            var type = ["BaseBind"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @event */
        BaseBind.prototype._onExecute = function() {
            this.__event.publish("execute"); 
        };

        /** @event */
        BaseBind.prototype._onExecuted = function() {
            this.__event.publish("executed"); 
        };

        /** @event */
        BaseBind.prototype._onFail = function(p_msg) {
            this.__event.publish("fail", p_msg); 
        };        

        return BaseBind;
    
    }(MetaObject));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseBind;
    } else {
        global._W.Meta.Bind.BaseBind = BaseBind;
    }

}(this));