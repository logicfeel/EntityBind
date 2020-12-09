/**
 * @namespace _W.Meta.Bind.BindModelEditAjax
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
    var IBindModelEdit;
    var BindModelAjax;
    var BindCommandLookupAjax;
    var BindCommandEditAjax;

    if (typeof module === "object" && typeof module.exports === "object") {
        util                    = require("./utils");
        IBindModelEdit          = require("./i-bind-model-edit");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
    } else {
        util                    = global._W.Common.Util;
        IBindModelEdit          = global._W.Interface.IBindModelEdit;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelEdit === "undefined") throw new Error("[IBindModelEdit] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelEditAjax  = (function (_super) {
        /** @class */
        function BindModelEditAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);
            
            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelEdit))  {
                throw new Error("Only [p_objectDI] type 'IBindModelEdit' can be added");
            }
            
            this.read   = new BindCommandLookupAjax(this, this._baseEntity);
            this.update = new BindCommandEditAjax(this, this._baseEntity);
            this.delete = new BindCommandEditAjax(this, this._baseEntity);

            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @implements IBindModelEdit 인터페이스 구현 */
            this._implements(IBindModelEdit);              

        }
        util.inherits(BindModelEditAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelEditAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelEditAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelEditAjax;
    
    }(BindModelAjax));
    
        
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelEditAjax;
    } else {
        global._W.Meta.Bind.BindModelEditAjax = BindModelEditAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));