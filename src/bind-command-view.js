/**
 * @namespace _W.Meta.Bind.BindCommandView
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
    var BindCommand;
    var entityView;
    var EntityView;
    var EntityViewCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommand             = require("./bind-command");
        entityView              = require("./entity-view");
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
    } else {
        util                    = global._W.Common.Util;
        BindCommand             = global._W.Meta.Bind.BindCommand;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof EntityViewCollection === "undefined") throw new Error("[EntityViewCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandView  = (function (_super) {
        /**
         * @class
         */
        function BindCommandView(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            this._output = new EntityViewCollection(this, this._baseEntity);

            this._output.add(new EntityView("default", this._baseEntity));  // 등록방법 1
            // this._output.add("default", this._baseEntity);               // 등록방법 2
            
            /** @public  */
            this.valid  = new EntityView("valid", this._baseEntity);

            this.bind   = new EntityView("bind", this._baseEntity);

            this.view = this._output["default"];        // 참조 속성 설정 [0]
        }
        util.inherits(BindCommandView, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandView.prototype.getTypes  = function() {
                    
            var type = ["BindCommandView"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandView.prototype.execute = function() {
            this._onExecute();  // "실행 시작" 이벤트 발생
            if (this._execValid()) this._execBind();
        };

        /** @virtual */
        BindCommandView.prototype._execValid = function() {
            throw new Error("[ execValid() ] Abstract method definition, fail...");
        };

        /** @virtual */
        BindCommandView.prototype._execBind = function() {
            throw new Error("[ execBind() ] Abstract method definition, fail...");
        };
        
        /** @virtual */
        BindCommandView.prototype._execCallback = function() {
            throw new Error("[ execCallback() ] Abstract method definition, fail...");
        };

        /** @virtual */
        BindCommandView.prototype._execView = function() {
            throw new Error("[ _execView() ] Abstract method definition, fail...");
        };

        return BindCommandView;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandView;
    } else {
        global._W.Meta.Bind.BindCommandView = BindCommandView;
    }

}(this));