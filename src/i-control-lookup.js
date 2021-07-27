/**
 * namespace _W.Interface.ILookupControl
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var ILookupControl  = (function () {
        /**
         * @constructs _W.Interface.ILookupControl
         * @interface
         */
        function ILookupControl() {
        }
    
        /**
         * 유무 검사
         * @abstract
         */
        ILookupControl.prototype.contains  = function() {
            throw new Error('[ contains() ] Abstract method definition, fail...');
        };

        return ILookupControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ILookupControl;
    } else {
        global._W.Interface.ILookupControl = ILookupControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));