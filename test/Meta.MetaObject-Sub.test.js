/**
 * @namespace _W.Test.MetaObject_Sub
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Test           = global._W.Test || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCnt = 0;
    var result = [];        // 결과 확인 **사용시 초기화    
    var isCallback = global.isCallback === false ? false : true;
    var taskCnt = 0;

    if (typeof module === 'object' && typeof module.exports === 'object') {    
        require('../src/object-implement'); // _implements() : 폴리필 
        // util                = require('../src/utils');
    } else {
        // util                = global._W.Common.Util;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('MetaObject_Sub :: 설명 ');
        if (true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        //#################################################
        console.log('===========================================================================');
        if (errorCnt > 0) console.warn('Error Sub SUM : %dEA', errorCnt);    
        console.log('단위 테스트 [ %s EA]: SUCCESS', taskCnt);

        return {
            errorCnt: errorCnt,
            taskCnt: taskCnt
        };
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = run();
    } else {
        global._W.Test.MetaObject_Sub = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
