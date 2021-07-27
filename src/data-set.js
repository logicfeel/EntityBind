/**
 * namespace _W.Meta.Data.DataSet
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // util = require('util');
    } else {
        // global._W = global._W || {};
        // util = global._W.util || {};
    }

    //==============================================================
    // 3. 의존성 검사
    // if (typeof util === 'undefined') throw new Error('[XXX] module  load fail...');


    //==============================================================
    // 4. 모듈 구현    
    // util.inherits = (function () {
    // }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    // if (typeof module === 'object' && typeof module.exports === 'object') {     
    //     module.exports = namespace;
    // } else {
    //     global._W.namespace = namespace;
    // }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));