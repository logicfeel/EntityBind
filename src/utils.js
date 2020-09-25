/**
 * _W.Util.* 
 * 
 *  - inherits() : 상속
 *  - getArrayLevel() : 배열 깊이 얻기
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {
    } else {
        global._W           = global._W || {};
        global._W.Util      = global._W.Util || {};
    }

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    /**
     * inherits(대상, 부모) : 상속
     */
    var inherits = (function () {
        if (typeof Object.create === 'function') {
            // implementation from standard node.js 'Util' module
            return function(ctor, superCtor) {
                if (superCtor) {
                    ctor.super = superCtor
                    ctor.prototype = Object.create(superCtor.prototype, {
                        constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                        }
                    })
                }
            };
        } else {
            // old school shim for old browsers
            return function (ctor, superCtor) {
                if (superCtor) {
                    ctor.super = superCtor
                    var TempCtor = function () {}
                    TempCtor.prototype = superCtor.prototype
                    ctor.prototype = new TempCtor()
                    ctor.prototype.constructor = ctor
                }
            }
        }
    }());

    /**
     * @param {*} p_elem 
     * @param {*} p_depts 
     */
    var getArrayLevel = function (p_elem, p_depts) {
        
        var MAX     = 10;
        var level   = 0;
        
        p_depts = p_depts || 0;

        if (p_elem instanceof Array && MAX > p_depts) {
            level++;
            p_depts++;
            level = level + this.getArrayLevel(p_elem[0], p_depts);  // 재귀호출을 통해 깊이 얻기
        }
        return level;
    };
    
    /**
     * @function GUID 생성
     */
    var createGUID = function() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+"000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = {
            inherits: inherits,
            getArrayLevel: getArrayLevel,
            createGUID: createGUID
        };
    } else {
        global._W.Util.inherits = inherits;
        global._W.Util.getArrayLevel = getArrayLevel;
        global._W.Util.createGUID = createGUID;
    }

}(this));