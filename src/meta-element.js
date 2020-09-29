/**
 * _W.Meta
 *      - MetaElement
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    require("./object-implement"); // _implements() : 폴리필

    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

    var util;
    var MetaObject;
    var IMarshal;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        MetaObject          = require("./meta-object");
        IMarshal            = require("./i-marshal");

    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        IMarshal            = global._W.Meta.IMarshal;

    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof IMarshal === "undefined") throw new Error("[IMarshal] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var MetaElement  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function MetaElement() {
            _super.call(this);
            
            /**
             * @interface IMarshal 인터페이스 선언
             */
            this._implements(IMarshal);            
        }
        util.inherits(MetaElement, _super);
    
        /**
         * @method 객체 얻기 : 추상메소드
         */
        MetaElement.prototype.getObject  = function(p_context) {
            // throw new Error("[ getObject() ] Abstract method definition, fail...");

            var obj     = {};

            for (var prop in this) {
                if (this[prop] instanceof MetaElement) {
                    obj[prop] = this[prop].getObject(p_context);
                } else if (typeof this[prop] !== "function" && prop.substr(0, 1) !== "_") {
                    obj[prop] = this[prop];
                }
            }
            return obj;                        
        };

        return MetaElement;
    
    }(MetaObject));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = MetaElement;
    } else {
        global._W.Meta.ArrayCollection = MetaElement;
    }

}(this));