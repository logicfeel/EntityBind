/**
 * namespace Array.isArray : 배열 유무 (폴리필 웹전용)
 */
if (typeof Array.isArray === 'undefined') {

    (function(global) {
        
        'use strict';

        //==============================================================
        // 1. 모듈 네임스페이스 선언
        
        //==============================================================
        // 2. 모듈 가져오기 (node | web)

        //==============================================================
        // 3. 모듈 의존성 검사

        //==============================================================
        // 4. 모듈 구현    
        var isArray = function(pValue) {
            if (typeof Array.isArray === 'function') {
                return Array.isArray(pValue);
            } else {
                return Object.prototype.toString.call(pValue) === '[object Array]';
            }
        };

        //==============================================================
        // 5. 모듈 내보내기 (node | web)
        Arrary.isArray = isArray;

    }(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
}