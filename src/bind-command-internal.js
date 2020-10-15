/**
 * @namespace _W.Meta.Bind.BindCommandInternal
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                   = global._W || {};
    global._W.Meta              = global._W.Meta || {};
    global._W.Meta.Bind         = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommand;
    var EntityView;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommand             = require("./bind-command");
        EntityView              = require("./entity-view").EntityView;
    } else {
        util                    = global._W.Common.Util;
        BindCommand             = global._W.Meta.Bind.BindCommand;
        EntityView              = global._W.Meta.Entity.EntityView;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommandInternal  = (function (_super) {
        /**
         * @class
         */
        function BindCommandInternal(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __valid = new EntityView("valid", this.baseEntity);
            var __bind  = new EntityView("bind", this.baseEntity);

            /** @property {valid} */
            Object.defineProperty(this, "valid", 
            {
                get: function() { return __valid; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __valid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {bind} */
            Object.defineProperty(this, "bind", 
            {
                get: function() { return __bind; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __bind = newValue;
                },
                configurable: true,
                enumerable: true
            });            

        }
        util.inherits(BindCommandInternal, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandInternal.prototype.getTypes  = function() {
                    
            var type = ["BindCommandInternal"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandInternal.prototype.execute = function() {
            this._onExecute();  // "실행 시작" 이벤트 발생
            if (this._execValid()) this._execBind();
        };

        /** @virtual */
        BindCommandInternal.prototype._execValid = function() {
            
            var o_msg = {};

            console.log("*************");
            // console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                if (!(this.valid.items[i].valid(this.valid.items[i].refValue, o_msg))) {
                    this._onFail(o_msg);
                    return false;
                }
                // console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        /** @abstract */
        BindCommandInternal.prototype._execBind = function() {
            throw new Error("[ _execBind() ] Abstract method definition, fail...");
        };
        
        /** 
         * success(result,status,xhr)
         * @virtual 
         **/
        BindCommandInternal.prototype._execCallback = function(i_result, i_status, i_xhr) {
            // 처리 종료 콜백 호출
            if (typeof this.cbEnd === "function" ) this.cbEnd();
            
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };


        return BindCommandInternal;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandInternal;
    } else {
        global._W.Meta.Bind.BindCommandInternal = BindCommandInternal;
    }

}(this));