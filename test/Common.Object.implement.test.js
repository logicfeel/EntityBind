/**
 * @namespace _W.Test.Object_implement
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
    var taskCnt = 0;

    var util;

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
        console.log('this._implements(interface) :: 인터페이스 선언 ');
        var ISuper  = (function (_super) {
            function ISuper() {
                this.m1 = function() { return 'I1'; };
            }
            return ISuper;
        }());

        var i = new ISuper();
        if (
                i.m1() === 'I1' && 
                true) {
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('this._implements(interface) :: 인터페이스 선언 <- 클래스 구현 ');
        var ISuper  = (function (_super) {
            function ISuper() {
                
            }
            ISuper.prototype.m1 = function() { return 'I1'; };
            return ISuper;
        }());
        var CoClass  = (function (_super) {
            function CoClass() {
                /** @implements */
                this._implements(ISuper);    
            }
            CoClass.prototype.m1 = function() { return 'C1'; }
            return CoClass;
        }());

        var c = new CoClass();
        if (
                c.m1() === 'C1' &&
                c._interface.length === 1 &&
                c.isImplementOf(ISuper) === true &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('this._implements(interface) :: 인터페이스 선언 <- 클래스 구현 : 인터페이스 타입검사(깊은) ');
        var ISuper  = (function (_super) {
            function ISuper() {
                this.str = "S"
                this.obj = {
                    n: 1,
                    sName: "s",
                    a: {ff: Function}
                }
                this.obj2 = null    // 어떤값이든 허용한다.
            }
            ISuper.prototype.m1 = function() { return 'I1'; };
            return ISuper;
        }());
        var CoClass  = (function (_super) {
            function CoClass() {
                this.str = ''
                this.obj = {
                    n: 1,
                    sName: '',
                    a: { ff: () => {}}
                }
                this.obj2 = {}  

                /** @implements */
                this._implements(ISuper);    
            }
            CoClass.prototype.m1 = function() { return 'C1'; }
            return CoClass;
        }());

        var c = new CoClass();
        if (
                c.m1() === 'C1' &&
                c._interface.length === 1 &&
                c.isImplementOf(ISuper) === true &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('this._implements(interface) :: 다중 인터페이스 선언 <- 클래스 구현 ');
        var ISuper  = (function (_super) {
            function ISuper() {
                this.m1 = function() { return 'I1'; };
            }
            return ISuper;
        }());
        var ISuper2  = (function (_super) {
            function ISuper2() {
                this.m2 = function() { return 'I2'; };
            }
            return ISuper2;
        }());
        var CoClass  = (function (_super) {
            function CoClass() {
                /** @implements */
                this._implements(ISuper, ISuper2);    
            }
            CoClass.prototype.m1 = function() { return 'C1'; }
            CoClass.prototype.m2 = function() { return 'C2'; }
            return CoClass;
        }());

        var c = new CoClass();
        if (
                c.m1() === 'C1' &&
                c.m2() === 'C2' && 
                c._interface.length === 2 &&
                c.isImplementOf(ISuper) === true &&
                c.isImplementOf(ISuper2) === true &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('this._implements(interface) :: 인터페이스 선언 <- 클래스 구현 + 클래스 상속 ');
        var ISuper  = (function (_super) {
            function ISuper() {
                this.m1 = function() { return 'I1'; };
            }
            return ISuper;
        }());
        var Super  = (function (_super) {
            function Super() {
            }
            Super.prototype.m2 = function() { return 'C2'; };
            return Super;
        }());
        var CoClass  = (function (_super) {
            function CoClass() {
                _super.call(this);

                /** @implements */
                this._implements(ISuper);    
            }
            util.inherits(CoClass, _super); 
            CoClass.prototype.m1 = function() { return 'C1'; }
            return CoClass;
        }(Super));

        var c = new CoClass();
        if (
                c.m1() === 'C1' &&
                c.m2() === 'C2' && 
                c._interface.length === 1 &&
                c.isImplementOf(ISuper) === true &&
                c.isImplementOf(ISuper2) === false &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('this._implements(interface) :: 인터페이스 선언 <- 인터페이스 선언 <- 클래스 구현 ');
        var ISuper  = (function (_super) {
            function ISuper() {
                // this.m1 = function() { return 'I1'; };
            }
            ISuper.prototype.m1 = function() { return 'I1'; };
            return ISuper;
        }());
        var ISub  = (function (_super) {
            function ISub() {
                // this.m2 = function() { return 'I2'; };
                /** @implements */
                this._implements(ISuper);
            }
            ISub.prototype.m1 = function() { return 'I1'; };
            ISub.prototype.m2 = function() { return 'I2'; };
            return ISub;
        }());

        var CoClass  = (function (_super) {
            function CoClass() {
                /** @implements */
                this._implements(ISub);    
            }
            CoClass.prototype.m1 = function() { return 'C1'; }
            CoClass.prototype.m2 = function() { return 'C2'; }
            return CoClass;
        }());

        var c = new CoClass();
        if (
                c.m1() === 'C1' &&
                c.m2() === 'C2' && 
                c._interface.length === 1 &&
                c.isImplementOf(ISuper) === false &&
                c.isImplementOf(ISub) === true &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('this._implements(interface) :: 인터페이스 선언 <- 인터페이스 상속 <- 클래스 구현 ');
        var ISuper  = (function (_super) {
            function ISuper() {
            }
            ISuper.prototype.m1 = function() { return 'I1'; };
            return ISuper;
        }());
        var ISub  = (function (_super) {
            function ISub() {
            }
            util.inherits(ISub, _super);   
            ISub.prototype.m2 = function() { return 'I2'; };
            return ISub;
        }(ISuper));

        var CoClass  = (function (_super) {
            function CoClass() {
                /** @implements */
                this._implements(ISub);    
            }
            CoClass.prototype.m1 = function() { return 'C1'; }
            CoClass.prototype.m2 = function() { return 'C2'; }
            return CoClass;
        }());

        var c = new CoClass();
        if (    
                c.m1() === 'C1' &&
                c.m2() === 'C2' && 
                c._interface.length === 1 &&
                c.isImplementOf(ISuper) === false &&
                c.isImplementOf(ISub) === true &&
                true) {
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
        global._W.Test.Object_implement = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));