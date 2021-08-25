/**
 * @namespace _W.Test.Util
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

    var util

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        util                = require('../src/utils');
    } else {
        util                = global._W.Common.Util;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('Util.inherits(super, target) :: 상속 ');
        var Super  = (function (_super) {
            function Super(p_name) {
                this.name = p_name;
            }
            Super.prototype.m2 = function() { return 'C2'; };
            return Super;
        }());
        var CoClass  = (function (_super) {
            function CoClass(p_name) {
                _super.call(this, p_name);   
            }
            util.inherits(CoClass, _super); 
            CoClass.prototype.m1 = function() { return 'C1'; }
            return CoClass;
        }(Super));

        var c = new CoClass('NM');
        if (c.m1() === 'C1' &&
            c.m2() === 'C2' && 
            c.name === 'NM' &&
            true) {
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('Util.getArrayLevel(elem, deps) :: 배열 깊이  (첫번째 배열 깊이만 검사함) ');
        var arr = [1,2];
        var arr2 = [
            [10],
            2,
            [[100], 20]
        ];
        var arr3 = [
            [[100], 20],
            [10],
            2
        ];
        var arr4 = [
            2
            [[100], 20],
            [10]
        ];
        if (
                util.getArrayLevel(arr) === 1 &&
                util.getArrayLevel(arr2) === 2 &&
                util.getArrayLevel(arr3) === 3 &&
                util.getArrayLevel(arr4) === 1 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Util.createGUID() :: GUID 생성 ');
        var guid = util.createGUID();
        if (
                guid.length === 36 &&
                guid.match(/-/g).length === 4 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Util.validSelector(obj.string) :: 셀렉터 유무 검사 ');

        console.log('---------------------------------------------------------------------------');
        console.log('Util.validSelector(obj.array<string>) :: 셀렉터 유무 검사 ');

        console.log('---------------------------------------------------------------------------');
        console.log('Util.validSelector(string) :: 셀렉터 유무 검사 ');

        console.log('---------------------------------------------------------------------------');
        console.log('Util.validSelector(array<string>) :: 셀렉터 유무 검사 ');


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
        global._W.Test.Util = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));