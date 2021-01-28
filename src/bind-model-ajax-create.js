/**
 * @namespace _W.Meta.Bind.BindModelCreateAjax
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
    var IBindModelCreate;
    var BindModelAjax;
    var BindCommandEditAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        IBindModelCreate        = require("./i-bind-model-create");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
    } else {
        util                    = global._W.Common.Util;
        IBindModelCreate        = global._W.Interface.IBindModelCreate;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelCreate === "undefined") throw new Error("[IBindModelCreate] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelCreateAjax  = (function (_super) {
        /** @class */
        function BindModelCreateAjax(p_objectDI, p_isLoadProp, p_itemType) {
            _super.call(this, p_objectDI, false, p_itemType);
            
            // DI 인터페이스 구현 검사
            // if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelCreate))  {
            //     throw new Error("Only [p_objectDI] type 'IBindModelCreate' can be added");
            // }
            
            this.create = new BindCommandEditAjax(this, this._baseEntity);

            // 속성 자동 로딩
            if (p_isLoadProp) {
                this.loadProp();
            }

            /** @implements IBindModelCreate 인터페이스 구현 */
            this._implements(IBindModelCreate);
        }
        util.inherits(BindModelCreateAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelCreateAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelCreateAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelCreateAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelCreateAjax;
    } else {
        global._W.Meta.Bind.BindModelCreateAjax = BindModelCreateAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));