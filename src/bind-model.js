/**
 * @namespace _W.Meta.Bind.BindModel
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
    var ItemCollection;
    var BindCommand;
    var BaseBind;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseBind            = require("./bind-base");
        ItemCollection      = require("./entity-item").ItemCollection;
        BindCommand         = require("./bind-command");
    } else {
        util                = global._W.Common.Util;
        BaseBind            = global._W.Meta.Bind.BaseBind;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
        BindCommand         = global._W.Meta.Bind.BindCommand;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel() {
            _super.call(this);

        }
        util.inherits(BindModel, _super);
    
        /** @virtual */
        BindModel.prototype.init = function() {
            throw new Error("[ init() ] Abstract method definition, fail...");
        };

/**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} a_cmds <선택> 추가할 아이템 명령
         */
        BindModel.prototype.add = function(p_item, a_cmds) {

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
                    if (this[prop] instanceof BindCommand && prop.substr(0, 1) !== "_") {
                        cmds.push(prop.toString());
                    }
                }
            }

            // 설정
            for (var i = 0; i < cmds.length; i++) {
                this[cmds[i]].add(p_item);
            }
        };

        return BindModel;
    
    }(BaseBind));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModel;
    } else {
        global._W.Meta.Bind.BindModel = BindModel;
    }

}(this));