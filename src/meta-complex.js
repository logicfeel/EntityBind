/**
 * _W.Meta
 *      - ComplexElement
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    require("./object-implement"); // _implements() : 폴리필

    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

    var util;
    var MetaElement;
    var IPropertyCollection;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("./utils");
        MetaElement             = require("./meta-element");
        IPropertyCollection     = require("./i-collection-property");

    } else {
        util                    = global._W.Common.Util;
        MetaElement             = global._W.Meta.MetaElement;
        IPropertyCollection     = global._W.Meta.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof IPropertyCollection === "undefined") throw new Error("[IPropertyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var ComplexElement  = (function (_super) {
        /**
         * @class
         */
        function ComplexElement() {
            _super.call(this);

            var __items = [];
            /**
             * TODO::
             * @implements
             */
            Object.defineProperty(this, "count", 
            {
                get: function() { return __items.length; },
                configurable: true,
                enumerable: true
            });
            Object.defineProperty(this, "list", 
            {
                get: function() { return __items; },
                configurable: true,
                enumerable: true
            });

             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IPropertyCollection);                
        }
        util.inherits(ComplexElement, _super);

        // TODO::
        ComplexElement.prototype.add  = function() {};
        ComplexElement.prototype.remove  = function() {};
        ComplexElement.prototype.removeAt  = function() {};
        ComplexElement.prototype.clear  = function() {};
        ComplexElement.prototype.indexOf  = function() {};
        ComplexElement.prototype.contains  = function() {};
        ComplexElement.prototype.propertyOf  = function() {};

        return ComplexElement;
    
    }(MetaElement));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ComplexElement;
    } else {
        global._W.Meta.ComplexElement = ComplexElement;
    }

}(this));