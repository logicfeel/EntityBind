/**
 * @namespace _W.Meta.Bind.BindModelReadAjax
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
    var IBindModelRead;
    var BindModelAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        IBindModelRead          = require("./i-bind-model-read");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
    } else {
        util                    = global._W.Common.Util;
        IBindModelRead          = global._W.Interface.IBindModelRead;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelRead === "undefined") throw new Error("[IBindModelRead] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");

    
    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadAjax  = (function (_super) {
        /** @class */
        function BindModelReadAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);

            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelRead))  {
                throw new Error("Only [p_objectDI] type 'IBindModelCreate' can be added");
            }
            
            this.read = new BindCommandLookupAjax(this, this._baseEntity);

            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadProp();
            }

            /** @implements IBindModelRead 인터페이스 구현 */
            this._implements(IBindModelRead);              
        }
        util.inherits(BindModelReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelReadAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadAjax;
    } else {
        global._W.Meta.Bind.BindModelReadAjax = BindModelReadAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));