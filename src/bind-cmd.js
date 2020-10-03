/**
 * @namespace _W.Meta.Bind.BindCommand
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
    var BaseBind;
    var Observer;
    var item;
    var Item;
    var ItemCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseBind            = require("./bind-base");
        Observer            = require("./observer");
        item                = require("./item");
        Item                = item.Item;
        ItemCollection      = item.ItemCollection;
    } else {
        util                = global._W.Common.Util;
        BaseBind            = global._W.Meta.Bind.BaseBind;
        Observer            = global._W.Util.Observer;
        Item                = global._W.Meta.Entity.Item;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommand  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindCommand(p_onwer) {
            _super.call(this);

            // TODO:: p_onwer 타입 검사 추가
            // if (p_onwer instanceof BindModel)

            /** @private */
            // this.__event     = new Observer(this, this);

            /** @protected 소유자 */
            this._onwer = p_onwer;
            
            // /** @event */
            // Object.defineProperty(this, "onExecute", {
            //     enumerable: true,
            //     configurable: true,
            //     set: function(p_fn) {
            //         this.__event.subscribe(p_fn, "execute");
            //     }
            // });

            // Object.defineProperty(this, "onExecuted", {
            //     enumerable: true,
            //     configurable: true,
            //     set: function(p_fn) {
            //         this.__event.subscribe(p_fn, "executed");
            //     }
            // });
        }
        util.inherits(BindCommand, _super);
    
        /** @virtual */
        BindCommand.prototype.execute = function() {
            throw new Error("[ execute() ] Abstract method definition, fail...");
        };

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} a_cmds <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.add = function(p_item, a_cmds) {
            _super.prototype.add.call(this, ItemCollection, p_item, a_cmds);

            // var cmds = [];

            // // 유효성 검사
            // if (!(p_item instanceof Item)) throw new Error("Only [Item] type instances can be added");
            // if (typeof a_cmds !== "undefined" && !Array.isArray(a_cmds)) throw new Error("Only [a_cmd] type Array can be added");
            
            // // 설정 대상 가져오기
            // if (Array.isArray(a_cmds)) {
            //     for (var i = 0; i< a_cmds.length; i++) {
            //         if (this[a_cmds[i]]) {
            //             cmds.push(a_cmds[i]);
            //         } else {
            //             console.warn("Warning!! Param a_cmds 에 [" + a_cmds[i] + "]가 없습니다. ");
            //         }
            //     }
            // } else {
            //     // public ItemCollection 프로퍼티 검사
            //     for (var prop in this) {
            //         if (this[prop] instanceof ItemCollection && prop.substr(0, 1) !== "_") {
            //             cmds.push(prop.toString());
            //         }
            //     }
            // }

            // // 설정
            // for (var i = 0; i < cmds.length; i++) {
            //     this[cmds[i]].add(p_item);
            // }
        };

        return BindCommand;
    
    }(BaseBind));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommand;
    } else {
        global._W.Meta.Bind.BindCommand = BindCommand;
    }

}(this));