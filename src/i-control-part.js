/**
 * namespace _W.Interface.IPartControl
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
    var IPartControl  = (function () {
        /**
         * @constructs _W.Interface.IPartControl
         * @interface
         */
        function IPartControl() {
        }
    
        /**
         * 등록 : 부분
         * @abstract
         */
        IPartControl.prototype.add  = function() {
            throw new Error('[ add() ] Abstract method definition, fail...');
        };

        /**
         * 삭제 : 부분
         * @abstract
         */
        IPartControl.prototype.remove  = function() {
            throw new Error('[ remove() ] Abstract method definition, fail...');
        };
    
        return IPartControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IPartControl;
    } else {
        global._W.Interface.IPartControl = IPartControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));