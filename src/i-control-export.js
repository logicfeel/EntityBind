/**
 * namespace _W.Interface.IExportControl
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
    var IExportControl  = (function () {
        /**
         * @constructs _W.Interface.IExportControl
         * @interface
         */
        function IExportControl() {
        }
    
        /**
         * 출력 : 전체
         * @abstract
         */
        IExportControl.prototype.write  = function() {
            throw new Error('[ write() ] Abstract method definition, fail...');
        };
    
        return IExportControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IExportControl;
    } else {
        global._W.Interface.IExportControl = IExportControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));