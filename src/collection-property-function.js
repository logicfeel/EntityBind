/**
 * @namespace _W.Collection.PropertyFunctionCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var PropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        PropertyCollection  = require("./collection-property");
    } else {
        util                = global._W.Common.Util;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    
    //==============================================================
    // 4. 모듈 구현    
     //---------------------------------------
     var PropertyFunctionCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function PropertyFunctionCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(PropertyFunctionCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        PropertyFunctionCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            if (!(p_value && typeof p_value !== "function")) throw new Error("p_name param request fail...");

            return _super.prototype.add.call(this, p_name, p_value);
        };
        
        /**
         * EntityTable 타입만 들어가게 제약조건 추가
         * @override
         */
        PropertyFunctionCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Function) {
                        this._element[p_idx] = newValue;
                    } else {
                        throw new Error("Only [Function] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


        // TODO::
        
        return PropertyFunctionCollection;
    
    }(PropertyCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = PropertyFunctionCollection;
    } else {
        global._W.Collection.PropertyFunctionCollection = PropertyFunctionCollection;
    }

}(this));