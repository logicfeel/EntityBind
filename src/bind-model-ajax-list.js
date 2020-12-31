/**
 * @namespace _W.Meta.Bind.BindModelListAjax
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
    var IBindModelList;
    var BindModelAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        IBindModelList          = require("./i-bind-model-list");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
    } else {
        util                    = global._W.Common.Util;
        IBindModelList          = global._W.Interface.IBindModelList;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelList === "undefined") throw new Error("[IBindModelList] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelListAjax  = (function (_super) {
        /** @class */
        function BindModelListAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);

            // DI 인터페이스 구현 검사
            // if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelList))  {
            //     throw new Error("Only [p_objectDI] type 'IBindModelList' can be added");
            // }

            this.list = new BindCommandLookupAjax(this, this._baseEntity);
            
            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadProp();
            }

            /** @implements IBindModelList 인터페이스 구현 */
            this._implements(IBindModelList);
        }
        util.inherits(BindModelListAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelListAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelListAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelListAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelListAjax;
    } else {
        global._W.Meta.Bind.BindModelListAjax = BindModelListAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));