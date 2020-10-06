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
    // var item;
    // var Item;
    // var ItemCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        Observer            = require("./observer");
        MetaObject          = require("./meta-object");
        // item                = require("./entity-item");
        // Item                = item.Item;
        // ItemCollection      = item.ItemCollection;
    } else {
        util                = global._W.Common.Util;
        Observer            = global._W.Common.Observer;
        MetaObject          = global._W.Meta.MetaObject;
        // Item                = global._W.Meta.Entity.Item;
        // ItemCollection      = global._W.Meta.Entity.ItemCollection;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    // if (typeof Item === "undefined") throw new Error("[Item] module load fail...");
    // if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");

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

            /** @event */
            Object.defineProperty(this, "onExecute", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "execute");
                }
            });

            Object.defineProperty(this, "onExecuted", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "executed");
                }
            });
        }
        util.inherits(BaseBind, _super);

        /** @protected @event */
        BaseBind.prototype._onExecute = function() {
            this.__event.publish("execute"); 
        };

        /** @protected @event */
        BaseBind.prototype._onExecuted = function() {
            this.__event.publish("executed"); 
        };

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @abstract
         */
        BaseBind.prototype.add = function() {
            throw new Error("[ add() ] Abstract method definition, fail...");
        };

        return BaseBind;
    
    }(MetaObject));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseBind;
    } else {
        global._W.Meta.Bind.BaseBind = BaseBind;
        
        // HACK:: 웹 로딩 방식으로 우회를 위해 추가함
        global._W.Meta.Bind.BindModel = function(){};   
        global._W.Meta.Bind.BindCommand = function(){};
    }

}(this));