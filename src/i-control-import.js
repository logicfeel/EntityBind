/**
 * namespace _W.Interface.IImportControl
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
    var IImportControl  = (function () {
        /**
         * @constructs _W.Interface.IImportControl
         * @interface
         */
        function IImportControl() {
        }
    
        /**
         * 입력 : 전체
         * @abstract
         */
        IImportControl.prototype.read  = function() {
            throw new Error('[ read() ] Abstract method definition, fail...');
        };
    
        return IImportControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IImportControl;
    } else {
        global._W.Interface.IImportControl = IImportControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));