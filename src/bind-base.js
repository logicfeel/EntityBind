/**
 * @namespace _W.Meta.Bind.BaseBind
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaObject;
    var Observer;
    var ItemCollection;
    var item;
    var Item;
    var ItemCollection;


    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        MetaObject          = require("./meta-object");
        Observer            = require("./observer");
        item                = require("./item");
        Item                = item.Item;
        ItemCollection      = item.ItemCollection;
    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.Bind.MetaObject;
        Observer            = global._W.Util.Observer;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
        Item                = global._W.Meta.Entity.Item;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");

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

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} a_cmds <선택> 추가할 아이템 명령
         */
        BaseBind.prototype.add = function(p_propType, p_item, a_cmds) {

            var cmds = [];

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type instances can be added");
            }
            if (typeof a_cmds !== "undefined" && !Array.isArray(a_cmds)) {
                throw new Error("Only [a_cmd] type Array can be added");
            }
            
            // 설정 대상 가져오기
            if (Array.isArray(a_cmds)) {
                for (var i = 0; i< a_cmds.length; i++) {
                    if (this[a_cmds[i]]) {
                        cmds.push(a_cmds[i]);
                    } else {
                        console.warn("Warning!! Param a_cmds 에 [" + a_cmds[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof p_propType && prop.substr(0, 1) !== "_") {
                        cmds.push(prop.toString());
                    }
                }
            }

            // 설정
            for (var i = 0; i < cmds.length; i++) {
                this[cmds[i]].add(p_item);
            }
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