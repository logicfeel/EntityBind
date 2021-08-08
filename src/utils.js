/**
 * namespace _W.Common.Util
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};
    global._W.Common.Util   = global._W.Common.Util || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    

    /**
     * inherits(대상, 부모) : 상속
     * @function
     * @memberof _W.Common.Util
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
     * 배열 깊이 얻기
     * @param {*} p_elem 
     * @param {*} p_depts 
     * @memberof _W.Common.Util
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
     * createGUID GUID 생성
     * @memberof _W.Common.Util
     */
    var createGUID = function() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+'000000000').substr(2,8);  
            return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 셀렉터의 유효성 검사 : 대상을 모두 검사하여 결과를 리턴한다.
     * 주의!! DOM(web) 에서만 작동한다.
     * @param {String | Object | Array<Object>} p_obj 
     * @returns {String} 없는 셀렉터, 통화하면 null 리턴
     * @memberof _W.Common.Util
     */
    var validSelector = function(p_obj, p_isJQuery) {
        
        var selectors = [];

        // 입력형식에 따른 배열에 삽입
        if (typeof p_obj === 'string') selectors.push(p_obj);
        else if (typeof p_obj === 'array') {
            selectors = p_obj;
        } else if (typeof p_obj === 'object') {
            for(var prop in p_obj) {
                if (p_obj.hasOwnProperty(prop)) {
                    if (Array.isArray(p_obj[prop])) {
                        selectors = selectors.concat(p_obj[prop]);
                    } else { 
                        selectors.push(p_obj[prop]);
                    }
                }
            }
        }

        if (typeof document === 'object' && typeof document.querySelector === 'function') {     
            // 유효성 검사
            for(var i = 0; selectors.length > i; i++) {
                if (typeof selectors[i] !== 'string') throw new Error('Only [selectors] type "string" can be added');

                // if (document.querySelector(selectors[i]) === null) {
                //     return selectors[i];
                // }
                if (p_isJQuery === true) {
                    if (jQuery(selectors[i]).length === 0) {
                        return selectors[i];
                    }
                } else {
                    if (document.querySelector(selectors[i]) === null) {
                        return selectors[i];
                    }
                }
            }
        } else {
            throw new Error('[document.querySelector] module load fail...');
        }

        return null;
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.inherits = inherits;
        module.exports.getArrayLevel = getArrayLevel;
        module.exports.createGUID = createGUID;
    } else {
        global._W.Common.Util.inherits = inherits;
        global._W.Common.Util.getArrayLevel = getArrayLevel;
        global._W.Common.Util.createGUID = createGUID;
        global._W.Common.Util.validSelector = validSelector;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));