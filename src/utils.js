/**
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {
        util = {};
    } else {
        global._W = global._W || {};
        util = global._W.util || {};
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === "undefined") throw new Error("[XXX] module  load fail...");

    //==============================================================
    // 4. 모듈 구현    
    /**
     * inherits(대상, 부모) : 상속
     */
    util.inherits = (function () {
        if (typeof Object.create === 'function') {
            // implementation from standard node.js 'util' module
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
    util.getArrayLevel = function (p_elem, p_depts) {
        var MAX     = 10;
        var level   = 0;
        
        p_depts = p_depts || 0;

        if (p_elem instanceof Array && MAX > p_depts) {
            level++;
            p_depts++;
            level = level + this.getArrayLevel(p_elem[0], p_depts);  // 재귀호출을 통해 깊이 얻기
        }
        return level;
    }
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = util;
    } else {
        global._W.util = util;
    }

}(this));