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
    var BindModel;
    var BindCommandRead;
    var EntityTable;
    var BindCommandReadAjax;
    var IBindModelRead;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandRead     = require("./bind-command-read");
        EntityTable         = require("./entity-table").EntityTable;
        BindCommandReadAjax = require("./bind-command-read-ajax");
        IBindModelRead      = require("./i-bind-model-read");
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        BindCommandReadAjax = global._W.Meta.Bind.BindCommandReadAjax;
        IBindModelRead      = global._W.Interface.IBindModelRead;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof BindCommandReadAjax === "undefined") throw new Error("[BindCommandReadAjax] module load fail...");
    if (typeof IBindModelRead === "undefined") throw new Error("[IBindModelRead] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadAjax  = (function (_super) {
        /**
         * @class
         */
        function BindModelReadAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI);

            var __baseAjaxSetup = {
                url: "",
                type: "POST"
            };

            if (p_itemType) this.itemType = p_itemType;

            // Entity 추가 및 baseEntity 설정
            this.baseEntity = this.addEntity('first');

            

            /** @override */
            this.read = new BindCommandReadAjax(this, this.baseEntity);

            
            /** @property {baseAjaxSetup} */
            Object.defineProperty(this, "baseAjaxSetup", 
            {
                get: function() { return __baseAjaxSetup; },
                configurable: true,
                enumerable: true
            });

            /** @property {baseUrl} */
            Object.defineProperty(this, "baseUrl", 
            {
                get: function() { return __baseAjaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [baseUrl] type 'string' can be added");
                    __baseAjaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /**
             * @interface IBindModelRead 인터페이스 선언
             */
            this._implements(IBindModelRead);                        
        }
        util.inherits(BindModelReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelReadAjax;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadAjax;
    } else {
        global._W.Meta.Bind.BindModelReadAjax = BindModelReadAjax;
    }

}(this));