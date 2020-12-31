/**
 * @namespace _W.Meta.Bind.BindModelReadDelAjax
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
    var IBindModelReadDel;
    var BindModelAjax;
    var BindCommandEditAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        IBindModelReadDel       = require("./i-bind-model-read-del");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
    } else {
        util                    = global._W.Common.Util;
        IBindModelReadDel       = global._W.Interface.IBindModelReadDel;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelReadDel === "undefined") throw new Error("[IBindModelReadDel] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadDelAjax  = (function (_super) {
        /** @class */
        function BindModelReadDelAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);
            
            // DI 인터페이스 구현 검사
            // if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelReadDel))  {
            //     throw new Error("Only [p_objectDI] type 'IBindModelReadDel' can be added");
            // }
            
            this.read   = new BindCommandLookupAjax(this, this._baseEntity);
            this.delete = new BindCommandEditAjax(this, this._baseEntity);


            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadProp();
            }

            /** @implements IBindModelReadDel 인터페이스 구현 */
            this._implements(IBindModelReadDel);                    
        }
        util.inherits(BindModelReadDelAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadDelAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadDelAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelReadDelAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadDelAjax;
    } else {
        global._W.Meta.Bind.BindModelReadDelAjax = BindModelReadDelAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));