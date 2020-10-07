/**
 * @namespace _W.Meta.MetaObject
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IObject;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필
        
        IObject             = require("./i-object");
    } else {
        IObject             = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof IObject === "undefined") throw new Error("[IObject] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var MetaObject  = (function () {
        /**
         * @class 메타 최상위 클래스 (실체)
         */
        function MetaObject() {
            this.__GUID = null;

            // 구현할 인터페이스 선언
            this._implements(IObject);
        }
        
        /** @virtual 상속 클래스에서 오버라이딩 필요!! **/
        MetaObject.prototype.getTypes  = function() {
            
            var type = ["MetaObject"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 상위 클래스 또는 인터페이스 구현 여부 
         * @param {String} p_name 클래스, Function 이름
         * @returns {Boolean}
         */
        MetaObject.prototype.instanceOf  = function(p_name) {

            var arr = this.getTypes();
    
            if (typeof p_name !== "string") throw new Error("Only [p_name] type name 'string' can be added");
        
            if (this._interface) {
                for (var i = 0; i < this._interface.length; i++) {
                    arr.push(this._interface[i].name);
                }
            }
        
            return arr.indexOf(p_name) > -1;
        };



        return MetaObject;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = MetaObject;
    } else {
        global._W.Meta.MetaObject = MetaObject;
    }

}(this));