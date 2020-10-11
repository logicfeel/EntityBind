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
    var BaseBind;
    var ItemCollection;
    var PropertyObjectCollection;
    var PropertyFunctionCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                        = require("./utils");
        BaseBind                    = require("./bind-base");
        ItemCollection              = require("./entity-item").ItemCollection;
        PropertyObjectCollection    = require("./collection-property-object");
        PropertyFunctionCollection  = require("./collection-property-function");        
    } else {
        util                        = global._W.Common.Util;
        BaseBind                    = global._W.Meta.Bind.BaseBind;
        ItemCollection              = global._W.Meta.Entity.ItemCollection;
        PropertyObjectCollection    = global._W.Collection.PropertyObjectCollection;
        PropertyFunctionCollection  = global._W.Collection.PropertyFunctionCollection;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");
    if (typeof PropertyObjectCollection === "undefined") throw new Error("[PropertyObjectCollection] module load fail...");
    if (typeof PropertyFunctionCollection === "undefined") throw new Error("[PropertyFunctionCollection] module load fail...");
    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel() {
            _super.call(this);

            var __attrs         = new PropertyObjectCollection(this);
            var __mode          = new PropertyFunctionCollection(this);
            var __cbRegister    = function() {};
            var __cbValid       = function() {return true};
            var __cbResume      = function() {};

            /** @property {attrs} */
            Object.defineProperty(this, "attrs", 
            {
                get: function() { return __attrs; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [attrs] type 'PropertyObjectCollection' can be added");
                    __attrs = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {mode} */
            Object.defineProperty(this, "mode", 
            {
                get: function() { return __mode; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [mode] type 'PropertyFunctionCollection' can be added");
                    __mode = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbRegister} */
            Object.defineProperty(this, "cbRegister", 
            {
                get: function() { return __cbRegister; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbRegister] type 'Function' can be added");
                    __cbRegister = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /** @property {cbValid} */
            Object.defineProperty(this, "cbValid", 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [cbValid] type 'Function' can be added");
                    __cbValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbResume} */
            Object.defineProperty(this, "cbResume", 
            {
                get: function() { return __cbResume; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [cbResume] type 'Function' can be added");
                    __cbResume = newValue;
                },
                configurable: true,
                enumerable: true
            });
        }
        util.inherits(BindModel, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModel.prototype.getTypes  = function() {
                    
            var type = ["BindModel"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @method */
        BindModel.prototype.init = function() {
            this.cbRegister.call(this);
            if (this.cbValid.call(this)) {
                this.cbResume.call(this)
            }
        };

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} p_cmds <선택> 추가할 아이템 명령
         */
        BindModel.prototype.add = function(p_item, p_cmds) {

            var cmds = [];

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type instances can be added");
            }
            if (typeof p_cmds !== "undefined" && !Array.isArray(p_cmds)) {
                throw new Error("Only [a_cmd] type Array can be added");
            }
            
            // 설정 대상 가져오기
            if (Array.isArray(p_cmds)) {
                for (var i = 0; i< p_cmds.length; i++) {
                    if (this[p_cmds[i]]) {
                        cmds.push(p_cmds[i]);
                    } else {
                        console.warn("Warning!! Param p_cmds 에 [" + p_cmds[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    
                    if (this[prop].instanceOf("BindCommand") && prop.substr(0, 1) !== "_") {
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