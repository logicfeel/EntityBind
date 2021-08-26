/**
 * @namespace _W.Test.ArrayCollection
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
    var ArrayCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        util                = require('../src/utils');
        ArrayCollection     = require('../src/collection-array');
    } else {
        util                = global._W.Common.Util;
        ArrayCollection     = global._W.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
        var _super = ArrayCollection;   // 부모

        function TestCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(TestCollection, _super);

        function TestTable() {
            this.items = new TestCollection(this);
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.count, list :: 컬렉션, 속성 ');
        var table = new TestTable();
        table.items.add(100);
        table.items.add(200);
        if (
                table.items[0] === 100 && 
                table.items[1] === 200 && 
                table.items.count === 2 && 
                table.items.list[0] === 100 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
                
        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.add(value) :: 추가 ');
        var table = new TestTable();
        table.items.add('A1');
        if (table.items[0] === 'A1') {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.remove(elem) :: 삭제 ');
        var table = new TestTable();
        var val = 'VAL';
        table.items.add(val);
        table.items.remove(val);
        table.items.add('A1');
        table.items.remove('A1');
        if (table.items.count === 0) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.removeAt(idx) :: idx 삭제 (중간) ');
        var table = new TestTable();
        table.items.add('A1');
        table.items.add('A2');  // 삭제 위치
        table.items.add('A3');
        table.items.removeAt(1);
        if (
                table.items.count === 2 && 
                table.items[0] === 'A1' && 
                table.items[1] === 'A3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.removeAt(idx) :: idx 삭제 (처음) ');
        var table = new TestTable();
        table.items.add('A1');
        table.items.add('A2');  // 삭제 위치
        table.items.add('A3');
        table.items.removeAt(0);
        if (
                table.items.count === 2 && 
                table.items[0] === 'A2' && 
                table.items[1] === 'A3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.removeAt(idx) :: idx 삭제 (끝) ');
        var table = new TestTable();
        table.items.add('A1');
        table.items.add('A2');  // 삭제 위치
        table.items.add('A3');
        table.items.removeAt(2);
        if (
                table.items.count === 2 && 
                table.items[0] === 'A1' && 
                table.items[1] === 'A2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.clear() :: 전체 삭제(초기화) ');
        var table = new TestTable();
        table.items.add('A1');
        table.items.add('A2');
        table.items.add('A3');
        table.items.clear();
        if (
                table.items.count === 0 && 
                table.items[0] === undefined && 
                table.items[1] === undefined &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.contains(elem) :: 유무 검사 ');
        var table = new TestTable();
        table.items.add('A1');
        table.items.add('A2');
        table.items.add('A3');
        if (
                table.items.contains('A1') === true && 
                table.items.contains('A4') === false &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ArrayCollection.indexOf(elem) :: idx 조회 ');
        var table = new TestTable();
        table.items.add('A1');
        table.items.add('A2');
        table.items.add(100);
        table.items.add(2);
        if (
                table.items.indexOf('A1') === 0 && 
                table.items.indexOf(0) === -1 && 
                table.items.indexOf(100) === 2 && 
                table.items.indexOf(2) === 3 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        // console.log('---------------------------------------------------------------------------');
        // console.log('BaseCollection.regProperty(name, getter, setter) :: 정적속성 등록 ');
        // var table = new TestTable();
        // table.items.add('A1');
        // table.items.add('A2');
        // table.items.regProperty('cnt', function() {return this.count}, function(val) { this[0] = val; });
        // table.items.cnt = 100;
        // if (table.items.cnt === 2 && table.items[0] === 100) {
        //     console.log('Result = Success');
        // } else {
        //     console.warn('Result = Fail');
        //     errorCnt++;
        // }

        // console.log('---------------------------------------------------------------------------');
        // console.log('BaseCollection.delProperty(name) :: 정적속성 제거 ');
        // var table = new TestTable();
        // table.items.regProperty('cnt', function() {return this.count});
        // table.items.delProperty('cnt');
        // if (table.items.cnt === undefined) {
        //     console.log('Result = Success');
        // } else {
        //     console.warn('Result = Fail');
        //     errorCnt++;
        // }
        console.log('---------------------------------------------------------------------------');
        console.log('BaseCollection.elementType = function :: 값타입 설정 ');
        var table = new TestTable();
        var Class1  = function(p_name) {
            this.name = p_name;
        };
        table.items.elementType = Class1;  // 타입 (string, number, boolean, null 입력 불가)
        var s1 = new Class1('s1');
        var s2 = new Class1('s2');
        table.items.add(s1);
        table.items[0] = s2;
        table.items.add(s1);    
        if (
                table.items[1].name === 's1' &&     // 값으로 비교
                table.items[0] === s2 &&
                true) {   
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BaseCollection.onAdd :: 등록 이벤트 ');
        var table = new TestTable();
        result = [];
        table.items.onAdd = function(idx, val) {
            result.push(idx);
            result.push(val);
        };
        table.items.add('A1');
        if (
                result.indexOf('A1') > -1 && 
                result.indexOf(0) > -1 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BaseCollection.onRemove :: 삭제 이벤트 ');
        var table = new TestTable();
        result = [];
        table.items.onRemove = function(idx) {
            result.push(idx);
        };
        table.items.add('A1');
        table.items.add('A2');
        table.items.remove('A2');
        if (result.indexOf(1) > -1) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BaseCollection.onClear :: 초기화(전체삭제) 이벤트 ');
        var table = new TestTable();
        result = [];
        table.items.onClear = function() {
            result.push('CLEAR');
        };
        table.items.add('A1');
        table.items.add('A2');
        table.items.add('A3');
        table.items.clear();
        if (result.indexOf('CLEAR') > -1) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BaseCollection.onChanging :: 변경전(add/remove/removeAt/claer) 이벤트 ');
        console.log('BaseCollection.onChanged :: 변경후(add/remove/removeAt/claer) 이벤트 ');
        var table = new TestTable();
        result = [];
        table.items.onChanging = function() {
            result.push('CHANGE');
        };
        table.items.onChanged = function() {
            result.push('CHANGE');
        };
        table.items.add('A1');
        table.items.add('A2');
        table.items.add('A3');
        table.items.remove('A1');
        table.items.removeAt(0);
        if (
                result.length === 10 && 
                table.items.count === 1 &&
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
        global._W.Test.ArrayCollection = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * @namespace _W.Test.PropertyCollection
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
    var PropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        util                = require('../src/utils');
        PropertyCollection  = require('../src/collection-property');
    } else {
        util                = global._W.Common.Util;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        var _super = PropertyCollection;   // 부모

        function TestCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(TestCollection, _super);

        function TestTable() {
            this.items = new TestCollection(this);
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.add(name, ?value) :: 추가');
        var table = new TestTable();
        table.items.add('a1');
        table.items.add('a2', 'A2');
        if (
                table.items['a2'] === 'A2' && 
                table.items.count === 2 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.remove(elem) :: 삭제');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');
        table.items.remove(table.items['a2']);
        if (true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.removeAt(idx) :: 삭제 (중간) ');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');    // 삭제위치
        table.items.add('a3', 'A3');
        table.items.removeAt(1);
        if (
                table.items.count === 2 && 
                table.items[0] === 'A1' && 
                table.items['a1'] === 'A1' &&
                table.items[1] === 'A3' && 
                table.items['a3'] === 'A3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.removeAt(idx) :: 삭제 (처음) ');
        var table = new TestTable();
        table.items.add('a1', 'A1'); // 삭제위치
        table.items.add('a2', 'A2');    
        table.items.add('a3', 'A3');
        table.items.removeAt(0);
        if (
                table.items.count === 2 && 
                table.items[0] === 'A2' && table.items['a2'] === 'A2' &&
                table.items[1] === 'A3' && table.items['a3'] === 'A3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.removeAt(idx) :: 삭제 (끝) ');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');    
        table.items.add('a3', 'A3');    // 삭제위치
        table.items.removeAt(2);
        if (
                table.items.count === 2 && 
                table.items[0] === 'A1' && 
                table.items['a1'] === 'A1' &&
                table.items[1] === 'A2' && 
                table.items['a2'] === 'A2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.clear() :: 전체삭제(초기화) ');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');    
        table.items.add('a3', 'A3');
        table.items.clear();
        if (
                table.items.count === 0 && 
                table.items[0] === undefined && 
                table.items[1] === undefined &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.contains(elem) :: 유무 검사 ');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');    
        table.items.add('a3', 'A3');
        if (
                table.items.contains('A1') === true && 
                table.items.contains('A4') === false &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.indexOf(elem) :: idx 조회 ');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');    
        table.items.add('a3', 'A3');        
        if (
                table.items.indexOf('A1') === 0 && 
                table.items.indexOf(table.items['a3']) === 2 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.indexOfName(name) :: idx 조회 ');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');    
        table.items.add('a3', 'A3');        
        if (true && 
                table.items.indexOfName('a2') === 1 && 
                table.items.indexOfName('a4') === -1 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('PropertyCollection.propertyOf(idx) :: prop 조회 ');
        var table = new TestTable();
        table.items.add('a1', 'A1');
        table.items.add('a2', 'A2');    
        table.items.add('a3', 'A3');        
        if (
                table.items.propertyOf(1) === 'a2' && 
                table.items.propertyOf('a4') === undefined &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('BaseCollection.elementType = function :: 값타입 설정 ');
        var table = new TestTable();
        table.items.elementType = String;  // 타입
        var s1 = new String('s1');
        var s2 = new String('s2');
        table.items.add('a1', s1);
        table.items['a1'] = s2;
        table.items.add('a2', s1);    
        // table.items.add('a3', 'A3');        // new 통한 생성이 아니면 오류 !!
        // 인스턴스로 비교해야함
        if (
                table.items.propertyOf(1) === 'a2' && 
                table.items['a2'] === s1 &&
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
        global._W.Test.PropertyCollection = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
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
/**
 * @namespace _W.Test.Observer
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
    
    var Observer;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        Observer                 = require('../src/observer');
    } else {
        Observer                 = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        var eventObj = {
            id: 'OBJ',
            title: '이벤트 바인딩객체'
        };

        function EventTest() {
        
            this.__event    = new Observer(this, eventObj);
            
            this.id = 'Class';

            /** @property 등록 */
            Object.defineProperty(this, 'onLoad', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'load');
                }
            });
            /** @property */
            Object.defineProperty(this, 'onClear', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'clear');
                }
            });
            /** @property */
            Object.defineProperty(this, 'onParam', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'param');
                }
            });    
        }
        /** @event 발생 */
        EventTest.prototype._onLoad = function() {
            this.__event.publish('load'); 
        };
        /** @event */
        EventTest.prototype._onClear = function() {
            this.__event.publish('clear'); 
        };

        EventTest.prototype._onParam = function(param1, param2) {
            this.__event.publish('param', param1, param2);
        };

        //===============================================
        // 이벤트 발생
        var e = new EventTest();
        var event2 = function() { 
            console.log(' onClear ~~'); 
            result.push('onClear');  // Result 등록
        };
        var event3 = function() { 
            console.log(' onClear ~~'); 
            result.push('onClear');  // Result 등록
        };

        console.log('---------------------------------------------------------------------------');
        console.log('Observer.onLoad, _onLoad() :: 속성과 메소드 추가로 이벤트  커스텀, 익명함수');
        result = [];
        var e = new EventTest();
        e.onLoad = function() { 
            console.log(' onLoad ~~');
            result.push('onLoad');  // Result 등록
        };
        e._onLoad(); // 테스크
        if (result.indexOf('onLoad') > -1 ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('Observer.onLoad, _onLoad() :: 속성과 메소드 추가로 이벤트  커스텀, 지정함수');
        result = [];
        var e = new EventTest();
        e.onClear = event2;
        e._onClear(); // 테스크
        if (result.indexOf('onClear') > -1 ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('Observer.subscribe(fn, "code") :: 지역(code) 등록');
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2, 'code');
        e.__event.publish('code');
        if (result.indexOf('onClear') > -1 ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Observer.subscribe(fn) :: 전역 구독');
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2);
        e.__event.publish();
        if (result.indexOf('onClear') > -1 ) {
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Observer.unsubscribe(fn, "code") :: 지역(code) 해지');
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2, 'code');
        e.__event.unsubscribe(event2, 'code');
        e.__event.publish('code');
        if (result.indexOf('onClear') < 0 ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Observer.unsubscribe(fn) :: 전역 구독 해지');
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2);
        e.__event.unsubscribe(event2);
        e.__event.publish();
        if (result.indexOf('onClear') < 0 ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Observer.unsubscribeAll() :: 전역, 지역(code) 전체 해지');
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2);            // 전역
        e.__event.subscribe(event2, 'code');    // 지역
        e.__event.unsubscribeAll();
        e.__event.publish();
        e.__event.publish('code');
        if (result.indexOf('onClear') < 0 ) {
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Observer.unsubscribeAll("code") :: 지역(code) 전체 해지');
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2, 'code');    // 지역
        e.__event.subscribe(event3, 'code');    // 지역
        e.__event.unsubscribeAll('code');
        e.__event.publish('code');
        if (result.indexOf('onClear') < 0 ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Observer.isMultiMode = false :: 싱글 구독 모드');
        result = [];
        var e = new EventTest();
        e.__event.isMultiMode = false;
        e.__event.subscribe(event2, 'code');    // 지역
        e.__event.subscribe(event3, 'code');    // 지역
        e.__event.publish('code');
        if (result.length == 1 ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('_onParam(p1, p2) => Observer.publish(p1, p2) :: 시점에 파라메터 처리 ');
        result = [];
        var e = new EventTest();
        e.onParam = function(p1, p2) { 
            console.log(' onParam ~~');
            result.push(p1);  // Result 등록
            result.push(p2);  // Result 등록
            result.push(this.id);  // Result 등록
        };
        e._onParam('P1', 'P2'); // 테스크
        if (
                result.indexOf('P1') > -1 && 
                result.indexOf('P2') > -1 && 
                result.indexOf('OBJ') > -1 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('TODO:: Observer.isDebug 필요성 여부');

        console.log('---------------------------------------------------------------------------');
        console.log('TODO:: Observer.propagation = false :: 이벤트 전파 금지??');
        

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
        global._W.Test.Observer = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
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
/**
 * @namespace _W.Test.DOM_Node
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Test          = global._W.Test || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCnt = 0; 
    var result = [];        // 결과 확인 **사용시 초기화        
    var taskCnt = 0;

    var Observer;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        Observer                 = require('../src/observer');
    } else {
        Observer                 = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');

    //==============================================================
    // 4. 모듈 구현
    function run() {
        var eventObj = {
            id: 'OBJ',
            title: '이벤트 바인딩객체'
        };

        function EventTest() {
        
            this.__event    = new Observer(this, eventObj);
            
            this.id = 'Class';

            /** @property 등록 */
            Object.defineProperty(this, 'onLoad', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'load');
                }
            });
            /** @property */
            Object.defineProperty(this, 'onParam', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'param');
                }
            });    
        }
        /** @event 발생 */
        EventTest.prototype._onLoad = function() {
            this.__event.publish('load'); 
        };
        EventTest.prototype._onParam = function(param1, param2) {
            this.__event.publish('param', param1, param2);
        };

        result = [];
        var e = new EventTest();
        e.onParam = function(p1, p2) { 
            console.log('---------------------------------------------------------------------------');
            console.log('call onParam(p1="%s", p2="%s") ', p1, p2);
            result.push(p1);  // Result 등록
            result.push(p2);  // Result 등록
            result.push(this.id);  // Result 등록
        };
        e._onParam('P1', 'P2'); // 테스크
        if (
                result.indexOf('P1') > -1 && 
                result.indexOf('P2') > -1 && 
                result.indexOf('OBJ') > -1 &&
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
        module.exports = run();;
    } else {
        global._W.Test.DOM_Node = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * @namespace _W.Test.BindCommandAjax
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

    var util;        
    var Row;
    var Item;
    var EntityView;
    var EntityTable;
    var BindModelAjax;

    if (typeof module === 'object' && typeof module.exports === 'object') {  
        require('../src/object-implement'); // _implements() : 폴리필
        util                    = require('../src/utils');
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
        BindModelAjax           = require('../src/bind-model-ajax');
    } else {
        util                    = global._W.Common.Util;
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('cbValid        :: 검사시 실행 ');
            console.log('cbBind         :: 바인딩시 실행 ');
            console.log('cbOutput       :: 뷰 출력시 실행 [View 하위만] ');
            console.log('cbEnd          :: 실행 완료시 실행 (명령간 연결의 용도 + 서버측 결과) ');
            console.log('onExecute      :: 명령 엔티티 실행[execute()] 실행 전 ');
            console.log('onExecuted     :: 명령 엔티티 실행[execute()] 실행 후 ');
            var model = new BindModelAjax();
            model.result = [];
            model.addCommand('read', 1);
            model.read.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            // model.baseUrl = 'sample_row_single.json';                    // 오류 2
            // model.baseAjaxSetup.async = false;                           // 동기화로 변경
            model.read.onExecute = function() {
                this._model.result.push('read.onExecute');
            };
            model.onExecute = function() {
                this.result.push('onExecute');
            };
            model.read.cbValid = function() {
                this._model.result.push('cbValid');
                return true;
            };
            model.read.cbBind = function(p_ajaxSetup) {
                this._model.result.push('cbBind');
            };
            model.read.cbResult = function(p_result) {
                this._model.result.push('cbResult');
                return p_result;
            };
            model.read.cbOutput = function() {
                this._model.result.push('cbOutput');
            };
            model.read.cbEnd = function(p_result) {
                this._model.result.push('cbEnd');
            };
            model.read.onExecuted = function() {
                this._model.result.push('read.onExecuted');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('cbOutput, cbEnd, read.onExecuted, onExecuted :: 콜백 ');
                // 콜백에서 검사
                if (
                        this.result[0] === 'read.onExecute' && 
                        this.result[1] === 'onExecute' && 
                        this.result[2] === 'cbValid' && 
                        this.result[3] === 'cbBind' && 
                        this.result[4] === 'cbResult' && 
                        this.result[5] === 'cbOutput' && 
                        this.result[6] === 'cbEnd' && 
                        this.result[7] === 'read.onExecuted' && 
                        this.result[8] === 'onExecuted' && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
                model.result = [];    // 콜백 초기화
            };
            model.read.execute();
        }
        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('cbBaseValid        :: 검사시 실행 ');
            console.log('cbBaseBind         :: 바인딩시 실행 ');
            console.log('onBaseResult       :: 바인딩 결과로 실행 ');
            console.log('cbBaseOutput       :: 뷰 출력시 실행 [View 하위만] ');
            console.log('cbBaseEnd          :: 실행 완료시 실행 (명령간 연결의 용도 + 서버측 결과) ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = [];
            model.read.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.cbBaseValid = function() {
                this._model.result.push('cbBaseValid');
                return true;
            };
            model.cbBaseBind = function(p_ajaxSetup) {
                this._model.result.push('cbBaseBind');
            };
            model.cbBaseResult = function(p_result) {
                this._model.result.push('cbBaseResult');
                return p_result;
            };
            model.cbBaseOutput = function() {
                this._model.result.push('cbBaseOutput');
            };
            model.cbBaseEnd = function(p_result) {
                this._model.result.push('cbBaseEnd');
            };
     
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('cbBaseOutput, cbBaseEnd... :: 콜백 ');
                // 콜백에서 검사
                if (
                        this.result[0] === 'cbBaseValid' &&
                        this.result[1] === 'cbBaseBind' &&
                        this.result[2] === 'cbBaseResult' &&
                        this.result[3] === 'cbBaseOutput' &&
                        this.result[4] === 'cbBaseEnd' &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
                result = [];    // 콜백 초기화
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('cbBase.. cbValid 와 혼합사용');
            console.log('cbBase < cbValid 우선순위 높음');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = [];
            model.read.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.cbBaseValid = function() {
                this.result.push('cbBaseValid');
                return true;
            };
            model.cbBaseBind = function(p_ajaxSetup) {
                this.result.push('cbBaseBind');
            };
            model.cbBaseResult = function(p_result) {
                this.result.push('cbBaseResult');
                return p_result;
            };
            model.cbBaseOutput = function() {
                this.result.push('cbBaseOutput');
            };
            model.cbBaseEnd = function(p_result) {
                this.result.push('cbBaseEnd');
            };
            model.read.cbValid = function() {
                this._model.result.push('cbValid');
                return true;
            };
            model.read.cbBind = function(p_ajaxSetup) {
                this._model.result.push('cbBind');
            };
            model.read.cbResult = function(p_result) {
                this._model.result.push('cbResult');
                return p_result;
            };
            model.read.cbOutput = function() {
                this._model.result.push('cbOutput');
            };
            model.read.cbEnd = function(p_result) {
                this._model.result.push('cbEnd');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('cbBaseOutput, cbBaseEnd... :: 우선순위 콜백 ');
                // 콜백에서 검사
                if (
                        this.result[0] === 'cbValid' &&
                        this.result[1] === 'cbBind' &&
                        this.result[2] === 'cbResult' &&
                        this.result[3] === 'cbOutput' &&
                        this.result[4] === 'cbEnd' &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
                result = [];    // 콜백 초기화
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BaseBind.eventPropagation = false        :: 이벤트 전파 금지 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = []; 
            model.read.addItem('i1', 'V1');
            model.read.eventPropagation = false;
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.onExecute = function() {
                this._model.result.push('read.onExecute');
            };
            model.read.onExecuted = function() {
                this._model.result.push('read.onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('read.onExecuted, onExecuted :: 콜백 ');
                if (
                        this._model.result[0] === 'read.onExecute' && 
                        this._model.result[1] === 'read.onExecuted' && 
                        this._model.result.length === 2 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.onExecute = function() {
                this.result.push('onExecute');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 1) row 기준으로 가져옴 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (    this.output.items.count > 0 &&
                        this.output.rows.count > 0 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }
        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 2) 존재하는 아이템만 가져옴 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.addItem('sto_id', 'output');
            model.read.addItem('adm_id', 'output');
            model.read.outputOption = 2;    // 존재하는 컬럼만 가져오기
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (
                        this.output.items.count === 2 &&
                        this.output.rows.count === 1 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 3) 존재하는 아이템만 가져옴, + rows[0] value 설정 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.addItem('sto_id', 'output');
            model.read.addItem('adm_id', 'output');
            model.read.outputOption = 3;    // 존재하는 컬럼만 가져오기
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (
                        this.output.items.count === 2 &&
                        this.output.rows.count === 1 &&
                        this.output.items['sto_id'].value === 'S00001' &&
                        this.output.items['adm_id'].value === 'logicfeel' &&
                        this.output.rows.count === 1 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.addOutput(name) :: 출력(뷰) 엔티티 추가 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_entity_multi.json';       // 복수 엔티티
            model.read.addOutput('output2');
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (
                        this.output.items.count > 0 &&
                        this.output.rows.count > 0 &&
                        this.output2.items.count > 0 &&
                        this.output2.rows.count > 0 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }

        // console.log('---------------------------------------------------------------------------');
        // console.log('BindCommandAjax.addOutput(name) :: 출력(뷰) 엔티티 추가 ');
        // var model = new BindModelAjax();
        // model.addCommand('read', 1);
        // model.baseUrl = 'http://127.0.0.1:8080/json/sample_entity_multi.json';       // 복수 엔티티
        // model.read.addOutput('output2');

        // console.log('---------------------------------------------------------------------------');
        // console.log('BindCommandAjax.execute() :: 콜백 ');
        // if (
        //         this.output.items.count > 0 &&
        //         this.output.rows.count > 0 &&
        //         this.output2.items.count > 0 &&
        //         this.output2.rows.count > 0 &&
        //         true) {
        //     taskCnt++;
        //     console.log('Result = Success');
        // } else {
        //     errorCnt++;
        //     console.warn('Result = Fail');
        // }


        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.add(item) :: 전체 엔티티에 아이템 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');    // 참조 값으로 넘김
        model.create.add(i1);
        model.first.items['i1'].value = 'V1';
        model._baseEntity.items['i1'].value = 'V11';    // 실제 적용 위치
        i1.value = 'V111';
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V11' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V11' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V11' &&
                model._baseEntity.items['i1'].value === 'V11' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCount++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.add(item, entityName) :: [지정된] 엔티티에 아이템 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.add(i1, 'valid');
        model.first.items['i1'].value = 'V1';
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 0 &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCount++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.add(item, entityNames) :: [지정된] 엔티티[들]에 아이템 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.add(i1, ['valid', 'bind']);
        // model.create.add(i1, ['valid', 'bind']); 중복 추가 안됨
        model.first.items['i1'].value = 'V1';
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.addItem(name, value) :: 아이템 생성 및 [전체] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.create.addItem('i1', 'V1');
        // model.create.addItem('i1', 'V2');   // 중복되서 추가 안됨
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.addItem(name, value, entityName) :: 아이템 생성 및 [특정] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.addItem('i1', 'V1', 'valid');
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 0 &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.addItem(name, value, entityNames) :: 아이템 생성 및 [지정된] 엔티티[들]에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.addItem('i1', 'V1', ['valid', 'bind']);
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.setItem(name | names) :: baseEntity의 [지정한] 아이템을 [전체] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.first.items.add(new Item('i1'));
        model.first.items['i1'].value = 'V1';
        model.create.setItem('i1', ['valid', 'bind']);
            if (model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.setItem(names, entityName) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.first.items.add(new Item('i1'));
        model.first.items.add(new Item('i2'));
        model.first.items['i1'].value = 'V1';
        model.first.items['i2'].value = 'V2';
        model.create.setItem(['i1', 'i2'], 'valid');
        if (
                model.create.valid.items.count === 2 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i2'].value === 'V2' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 0 &&
                model.first.items.count === 2 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i2'].value === 'V2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.release(names, entityName) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티에 해제 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.items.add(new Item('i1'));
        model.items.add(new Item('i2'));
        model.items['i1'].value = 'V1';
        model.items['i2'].value = 'V2';
        model.create.setItem(['i1', 'i2'], ['valid', 'bind']);
        model.create.release('i2', 'bind');
        if (
                model.create.valid.items.count === 2 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i2'].value === 'V2' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.items.count === 2 &&
                model.items['i1'].value === 'V1' &&
                model.items['i2'].value === 'V2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.release(names, entityName) :: baseEntity의 [지정한] 아이템을 [전체] 엔티티에 해제 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.items.add(new Item('i1'));
        model.items.add(new Item('i2'));
        model.items['i1'].value = 'V1';
        model.items['i2'].value = 'V2';
        model.create.setItem(['i1', 'i2'], ['valid', 'bind']);
        model.create.release('i2');
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.items.count === 2 &&
                model.items['i1'].value === 'V1' &&
                model.items['i2'].value === 'V2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.setItem(names, entityNames) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티[들]에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.first.items.add(new Item('i1'));
        model.first.items.add(new Item('i2'));
        model.first.items.add(new Item('i3'));
        model.first.items['i1'].value = 'V1';
        model.first.items['i2'].value = 'V2';
        model.first.items['i3'].value = 'V3';
        model.create.setItem(['i1', 'i2'], ['valid', 'bind']);
        if (
                model.create.valid.items.count === 2 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i2'].value === 'V2' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 2 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i2'].value === 'V2' &&
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i3'].value === 'V3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 ');
       
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
        model. result = [];  
        model.create.cbValid = function() {
            this._model.result.push('Valid'); 
            return true;
        };
        var err = function(p) {
            this.result = [];
            console.warn('실패! ' + p);
            errorCount++;
        };
        model.cbFail = err;
        model.cbError = err;
        model.create.cbEnd = function(p_result) {
            if (p_result.entity['return'] !== 0) {
                errorCount++;
                console.warn('서버측 처리가 실패하였습니다.');
            }
        };
        model.create.addItem('i1', 'V1');
        model.create.execute();             // 실행
        if (
                model.result.indexOf('Valid') > -1 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('BindCommandAjax.getTypes() :: 타입 조회(상속) ');
        var model = new BindModelAjax();
        model.addCommand('read', 1);
        var types = model.read.getTypes();
        if (
                types.indexOf('BindCommandAjax') > -1 &&
                types[0] === 'BindCommandAjax' && 
                types[1] === 'BindCommand' && 
                types[2] === 'BaseBind' && 
                types[3] === 'MetaObject' &&
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
        global._W.Test.BindCommandAjax = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * @namespace _W.Test.BindModelAjax
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
        
    var util;        
    var CustomError;
    var Row;
    var Item;
    var ItemDOM;
    var EntityView;
    var EntityTable;
    var BindModelAjax;
    var IBindModel;

    if (typeof module === 'object' && typeof module.exports === 'object') {  
        require('../src/object-implement'); // _implements() : 폴리필
        util                    = require('../src/utils');
        CustomError             = require('../src/error-custom');
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        ItemDOM                 = require('../src/entity-item-dom');
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
        BindModelAjax           = require('../src/bind-model-ajax');
        IBindModel              = require('../src/i-bind-model');
    } else {
        util                    = global._W.Common.Util;
        CustomError             = global._W.Common.CustomError;
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        ItemDOM                 = global._W.Meta.Entity.ItemDOM;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        IBindModel              = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        function CreateDI(p_this) {
            IBindModel.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.prop = {
                i1: 'V1',
                i2: 'V2',
                i3: {
                    caption: 'C3', 
                    value: 'V3',
                    constraints: [
                        { regex: /\D/, msg: '숫자만 입력해야함...', code: 100},
                        { regex: /12/, msg: '12로 시작해야함...', code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: '5자리 미만 숫자만...', code: 300 }
                    ]
                }
            };

            this.cbFail = function(p_msg, p_code) {
                return 'cbFail';
            };
        
            this.cbError = function(p_msg, p_status) {
                return 'cbError';
            };
        
            this.onExecute = function() {       // 실행시 이벤트 등록
                return 'onExecute';
            };
            this.onExecuted = function() {      // 실행끝 이벤트 등록
                return 'onExecuted';
            };
        }
        util.inherits(CreateDI, IBindModel);

        CreateDI.prototype.preRegister = function() {
            return 'preRegister';
        };
        CreateDI.prototype.preCheck = function() {
            return 'preCheck';
        };
        CreateDI.prototype.preReady = function() {
            return 'preReady';
        };


        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BaseBind.onExecute         :: 바인드 명령 실행[execute()] 실행 전 (공통처리의 관점) ');
            console.log('BaseBind.onExecuted        :: 바인드 명령 실행execute() 실행 후 (공통처리의 관점) ');
            console.log('BindModel.cbFail           :: 검사 실패 발생시 실행 ');
            console.log('BindModel.cbError          :: 오류 발생시 실행 ');
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];        
            model.create.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
            };
            model.create.cbBind = function(p_ajax){
                console.log('call cbBind');
            };
            model.onExecute = function(pp) {
                this.result.push('onExecute');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('onExecute, onExecuted  :: 콜백 ');
                if (
                        this.result[0] === 'onExecute' &&                          // 처음
                        this.result[this.result.length - 1] === 'onExecuted' &&    // 마지막
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.create.execute();
        }


        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() ');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        var model = new BindModelAjax(Item);
        model.result = [];
        model.preRegister = function() {
            this.result.push('preRegister');
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        model.init();
        if (
                model.result[0] === 'preRegister' && 
                model.result[1] === 'preCheck' && 
                model.result[2] === 'preReady' && 
                model.result.length === 3 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() 에러 처리');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        var model = new BindModelAjax(Item);
        model.result = [];
        model.cbError = function(p_msg, p_status){
            this.result.push('cbError');
            console.log('err message = ' + p_msg);
        };        
        model.preRegister = function() {
            throw '에러 preRegister()';       // 에러 던지기
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        model.init();
        if (
                model.result[0] === 'cbError' && 
                model.result.length === 1 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() 에러 처리 : cbError 선언 없을 경우');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        var model = new BindModelAjax(Item);
        model.result = [];
        model.preRegister = function() {
            throw '에러 preRegister()';       // 에러 던지기
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        model.init();
        if (
                model.result.length === 0 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() 에러 처리 : cbError 선언 없을 경우 (외부로 에러 전달)');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        global.isThrow = true;
        var model = new BindModelAjax(Item);
        model.result = [];
        model.preRegister = function() {
            throw '에러 preRegister()';       // 에러 던지기
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        try {
            model.init();
        } catch (e) {
            model.error = true;     // 내부 예외처리로 무시됨
        }
        
        if (
                model.error === true &&
                model.result.length === 0 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        global.isThrow = false;

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.cbFail           :: 실패 발생시 실행 (검사) ');
        var model = new BindModelAjax(Item);
        model.addCommand('create');
        model.result = [];
        model.create.addItem('i1', '');
        model.create.valid.items['i1'].isNotNull = true;
        model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
        model.cbFail = function(p_msg, p_code){
            this.result.push('cbFail');
        };
        model.cbError = function(p_msg, p_status){
            this.result.push('cbError');
        };
        // model.create.cbValid = function() {
        //     return false;
        // };   // 리턴을 하지 않아 실패함
        model.create.execute();
        if (
                model.result[0] === 'cbFail' && 
                model.result.length === 1 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        if (isCallback ) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindModel.cbError          :: 오류 발생시 실행 (html) ');
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];
            model.create.addItem('i1', '');
            // model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.baseUrl = 'http://127.0.0.1:8080/';                 // 오류 1 : 403
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            // model.baseUrl = 'sample_row_single2.json';                // 오류 2
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
                console.log('err message = ' + p_msg);
            };
            model.onExecuted = function() {
                console.log('---------------------------------------------------------------------------');
                console.log('BindModel.cbError      :: 콜백 ');
                if (    
                        this.result[0] === 'cbError' && 
                        this.result.length === 1 && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };

            model.create.execute();
        }

        if (isCallback ) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindModel.cbError          :: 오류 발생시 실행 (local) ');
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];
            model.create.addItem('i1', '');
            // model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            // model.baseUrl = 'http://127.0.0.1:8080/';                 // 오류 1 : 403
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            model.baseUrl = 'sample_row_single2.json';                // 오류 2
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
                console.log('err message = ' + p_msg);
            };
            model.onExecuted = function() {
                console.log('---------------------------------------------------------------------------');
                console.log('BindModel.cbError      :: 콜백 ');
                if (    
                        this.result[0] === 'cbError' && 
                        this.result.length === 1 && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };

            model.create.execute();
        }

        if (isCallback ) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindModel.cbError          :: 오류 발생시 실행 (경로없음:404) ');
            // global.isLog = true;
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];
            model.create.addItem('i1', '');
            model.baseUrl = 'http://127.0.0.1:8080/abc/';                 // 오류 1 : 403
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
                console.log('err message = ' + p_msg);
            };
            model.onExecuted = function() {
                console.log('---------------------------------------------------------------------------');
                console.log('BindModel.cbError      :: 콜백 ');
                if (    
                        this.result[0] === 'cbError' && 
                        this.result.length === 1 && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };

            model.create.execute();
        }

        
        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item) :: 전체 cmd에 아이템 등록 (cmd 사용자 추가후) ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.add(new Item('i1'), []);
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, [], entity) :: 전체 cmd에 지정entity에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        // model.add(new Item('i1'), [], 'bind');           // 정상
        // model.add(new Item('i1'), undefined, 'bind');    // 정상
        // model.add(new Item('i1'), null, 'bind');
        model.add(new Item('i1'), '', 'bind');
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 0 &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, cmd) :: cmd 전체에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.add(new Item('i1'), 'create2');
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 0 &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, cmd, entity) :: 지정 cmd의 지정entity에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.add(new Item('i1'), 'create2', 'bind');
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 0 &&
                // create 2
                model.create2.valid.items.count === 0 &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, cmds) :: cmd 전체에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;        
        model.addCommand('create');
        model.addCommand('create2');
        model.addCommand('create3');
        model.add(new Item('i1'), ['create', 'create2']);
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // create 3
                model.create3.valid.items.count === 0 &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&               
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, obj) :: 아이템 생성 (객체형), ItemDOM 기본값, [전체] cmd에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', { 
            default: 10, 
            value: 'V1',
        }, []);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                model.first.items['i1'].default === 10 &&
                model.itemType.name === 'ItemDOM' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value) :: 아이템 생성 및 [전체] cmd에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', 'V1', []);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value, [], entity) :: 아이템 생성 및 [전체] cmd의 지정 entity에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', 'V1', [], 'bind');
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 0 &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value, cmd) :: 아이템 생성 및 [특정] cmd에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', 'V1', 'create2');
        if (    // create 
                model.create.valid.items.count === 0 &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value, cmds) :: 아이템 생성 및 [특정목록] cmd에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addCommand('create3');
        model.addItem('i1', 'V1', ['create', 'create2']);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // create 3
                model.create3.valid.items.count === 0 &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&               
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.setMapping(mapping: json) :: 메핑으로 부분 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.items.addValue('i1', 'V1');
        model.items.addValue('i2', 'V1');
        var mapping = {
            i1: {
                create: ['valid', 'bind'],
                create2: ['valid', 'bind']
            },
        };

        model.setMapping(mapping);
        if (// create 
            model.create.valid.items.count === 1 &&
            model.create.valid.items['i1'].value === 'V1' &&
            model.create.valid.items['i1'].entity.name === 'first' &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items['i1'].value === 'V1' &&
            model.create.bind.items['i1'].entity.name === 'first' &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items['i1'].value === 'V1' &&
            model.create2.valid.items['i1'].entity.name === 'first' &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items['i1'].value === 'V1' &&
            model.create2.bind.items['i1'].entity.name === 'first' &&
            true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.setMapping(mapping: json) :: 메핑으로 전체 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.items.addValue('i1', 'V1');
        model.items.addValue('i2', 'V1');
        var mapping = {
            i1: {
                Array: [],      
            },
        };
        model.setMapping(mapping);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addEntity(name) :: 모델에 엔티티 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addEntity('second');
        model.add(new Item('i1'), []);
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.second instanceof EntityTable &&
                model.second.items.count === 0 &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp() :: prop에 [모든] 속성을 first에 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.loadProp();
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp() :: prop에 [모든] 속성을 __시작이름 제외후 등록');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.prop.add('__i4', 'V4');
        model.loadProp();
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp(props) :: prop에 [특정] 속성을  [first] 엔티티에 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.loadProp(['i2', 'i3']);
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 2 &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp(props, entity) :: prop에 [특정] 속성을  [특정] 엔티티에 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addEntity('second');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.loadProp(['i2', 'i3'], 'second');
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 0 &&
                // second
                model.second.items.count === 2 &&
                model.second.items['i2'].value === 'V2' &&
                model.second.items['i2'].entity.name === 'second' &&
                model.second.items['i3'].caption === 'C3' &&
                model.second.items['i3'].entity.name === 'second' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModelAjax.baseAjaxSetup :: 설명 ');
        console.log('BindModelAjax.baseUrl :: 설명 ');
        var model = new BindModelAjax();
        model.baseUrl = 'URL';
        if (
                model.baseAjaxSetup.url === 'URL' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di) :: DI 주입 생성 ');
        var model = new BindModelAjax();
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ');
        var model = new BindModelAjax();
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ');
        var model = new BindModelAjax();
        model.itemType = ItemDOM;
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                model.first.items.count === 3 &&
                model.first.items['i1'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i1'] instanceof  ItemDOM &&
                model.first.items['i2'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i2'] instanceof  ItemDOM &&
                model.first.items['i3'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i3'] instanceof  ItemDOM &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
    
        console.log('---------------------------------------------------------------------------');
        console.log('BindModelAjax.getTypes() :: 타입 조회(상속) ');
        var creator = new BindModelAjax();
        var types = creator.getTypes();
        if (
                types[0] === 'BindModelAjax' && 
                types[1] === 'BindModel' && 
                types[2] === 'BaseBind' && 
                types[3] === 'MetaObject' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        function ReadDI() {
            IBindModel.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.prop = {
                i1: 'V1',
                i2: 'V2',
                i3: {
                    caption: 'C3', 
                    value: 'V3',
                    constraints: [
                        { regex: /\D/, msg: '숫자만 입력해야함...', code: 100},
                        { regex: /12/, msg: '12로 시작해야함...', code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: '5자리 미만 숫자만...', code: 300 }
                    ]
                }
            };

            this.preRegister = function() {
               return 'preRegister';
            };
        
            this.preCheck = function() {
                return 'preCheck';
            };
        
            this.preReady = function(model) {
                return 'preReady';
            };
        
            this.cbFail = function(p_msg, p_code) {
                return 'cbFail';
            };
        
            this.cbError = function(p_msg, p_status) {
                return 'cbError';
            };
        
            this.onExecute = function() {       // 실행시 이벤트 등록
                return 'onExecute';
            };
            this.onExecuted = function() {      // 실행끝 이벤트 등록
                return 'onExecuted';
            };
        }
        util.inherits(ReadDI, IBindModel);

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, []) :: 전체 cmd에 아이템 등록 (cmd 사용자 추가후) ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('read', 1);
        model.addCommand('read2', 1);
        model.add(new Item('i1'), []);
        model.first.items['i1'].value = 'V1';
        if (    // read 
                model.read.valid.items.count === 1 &&
                model.read.valid.items['i1'].value === 'V1' &&
                model.read.valid.items['i1'].entity.name === 'first' &&
                model.read.bind.items.count === 1 &&
                model.read.bind.items['i1'].value === 'V1' &&
                model.read.bind.items['i1'].entity.name === 'first' &&
                model.read.output.items.count === 1 &&
                model.read.output.items['i1'].value === 'V1' &&
                model.read.output.items['i1'].entity.name === 'first' &&
                // read 2
                model.read2.valid.items.count === 1 &&
                model.read2.valid.items['i1'].value === 'V1' &&
                model.read2.valid.items['i1'].entity.name === 'first' &&
                model.read2.bind.items.count === 1 &&
                model.read2.bind.items['i1'].value === 'V1' &&
                model.read2.bind.items['i1'].entity.name === 'first' &&
                model.read2.output.items.count === 1 &&
                model.read2.output.items['i1'].value === 'V1' &&
                model.read2.output.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item) :: 모델에만 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('read', 1);
        model.addCommand('read2', 1);
        model.add(new Item('i1'));
        model.first.items['i1'].value = 'V1';
        if (    // read 
                model.read.valid.items.count === 0 &&
                model.read.bind.items.count === 0 &&
                model.read.output.items.count === 0 &&
                // read 2
                model.read2.valid.items.count === 0 &&
                model.read2.bind.items.count === 0 &&
                model.read2.output.items.count === 0 &&
                // first
                model.first.items.count === 1 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di) :: DI 주입 생성 ');
        var model = new BindModelAjax();
        var cc  = new ReadDI(model);
        model.setService(cc, false);
        model.addCommand('read', 1);
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ');
        var model = new BindModelAjax();
        var cc  = new ReadDI(model);
        model.setService(cc, true);
        model.addCommand('read', 1);
        if (    
                model.prop.count === 3 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ');
        var model = new BindModelAjax();
        var cc  = new ReadDI(model);
        model.itemType = ItemDOM;
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                model.first.items.count === 3 &&
                model.first.items['i1'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i1'] instanceof  ItemDOM &&
                model.first.items['i2'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i2'] instanceof  ItemDOM &&
                model.first.items['i3'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i3'] instanceof  ItemDOM &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
    
        console.log('---------------------------------------------------------------------------');
        console.log('BindModelAjax.setService(service) :: 서비스 설정 ');
        var cc  = new ReadDI();
        var model = new BindModelAjax();
        model.setService(cc);
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(new service) :: 생성시 서비스 객체 주입 ');
        var model = new BindModelAjax( new ReadDI());
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax( {...} ) :: 생성시 객체 주입 (전체) ');
        var model = new BindModelAjax({
            prop: {
                i1: 'V1',
                i2: 'V2',
                i3: {
                    caption: 'C3', 
                    value: 'V3',
                    constraints: [
                        { regex: /\D/, msg: '숫자만 입력해야함...', code: 100},
                        { regex: /12/, msg: '12로 시작해야함...', code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: '5자리 미만 숫자만...', code: 300 }
                    ]
                }
            },
            command: {
                read: {
                    outputOption: 3,
                    cbValid: function() { return 'cbValid'; },
                    cbBind: function() { return 'cbBind'; },
                    cbResult: function() { return 'cbResult'; },
                    cbOutput: function() { return 'cbOutput'; },
                    cbEnd: function() { return 'cbEnd'; },
                }
            },
            preRegister: function() { return 'preRegister'; },
            preCheck: function() { return 'preCheck'; },
            preReady: function(model) { return 'preReady'; },
            cbFail: function(p_msg, p_code) { return 'cbFail'; },
            cbError: function(p_msg, p_status) { return 'cbError'; },
        });
        if (
                model.prop.count === 3 &&
                model.read.outputOption === 3 &&
                model.read.cbValid() === 'cbValid' &&
                model.read.cbBind() === 'cbBind' &&
                model.read.cbResult() === 'cbResult' &&
                model.read.cbOutput() === 'cbOutput' &&
                model.read.cbEnd() === 'cbEnd' &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax( {...} ) :: 생성시 객체 주입 : 에러발생 [내부 에러처리]');
        try {
            var model = new BindModelAjax({
                prop: {
                    i3: {
                        caption: 'C3', 
                        value: 'V3',
                        order: 'E',     // 에러 강제 발생
                    }
                },
            });
            model.error = false;
        } catch (e) {
            model.error = true;     // 내부 예외처리로 무시됨
        }
        model.result = [];
        if (
                model.prop.count === 1 &&
                model.error === false &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }        

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax( {...} ) :: 생성시 객체 주입 : 에러발생 [외부로 에러 전달]');
        global.isThrow = true;
        global.isLog = true;
        try {
            var model = new BindModelAjax({
                prop: {
                    i3: {
                        caption: 'C3', 
                        value: 'V3',
                        order: 'E',     // 에러 강제 발생
                    }
                },
            });
            model.error = false;
        } catch (e) {
            model.error = true;     // 내부 예외처리로 무시됨
        }
        model.result = [];
        if (
                model.prop.count === 1 &&
                model.error === true &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }        
        global.isThrow = false; // 해제
        global.isLog = false;

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax() :: 예외 ');
        try {
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.read.addItem('i1', '');
            model.items.i1.value = 'A';
            model.items.i1.order = 'E';     // 에러 발생!
        } catch (e) {
            model.error = true;
        }
        
        if (
                model.items.i1.value === 'A' &&
                model.error === true &&
                true) {
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax() :: 예외 ');
        try {
            var model = new BindModelAjax();
            model.baseUrl = 1;          // 에러 발생!
        } catch (e) {
            model.error = true;
        }
        
        if (
                model.error === true &&
                true) {
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
        global._W.Test.BindModelAjax = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : this));
/**
 * @namespace _W.Test.ComplexElement_Sub
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
        console.log('ComplexElement_Sub :: 설명 ');
        if (true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        //#################################################
        if (errorCnt > 0) {
            console.warn('Error Sub SUM : %dEA', errorCnt);    
        } else {
            console.log('===========================================================================');
            console.log('단위 테스트 [ %s EA]: OK', taskCnt);
        }

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
        global._W.Test.ComplexElement_Sub = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));

/**
 * @namespace _W.Test.EntityTable
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
        
    var Row;
    var Item;
    var EntityTable;


    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        EntityTable             = require('../src/entity-table').EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('Entity.newRow() :: Row 생성 ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i1'].value = 'R1';
        table.items['i2'].value = 'R2';
        var table2 = new EntityTable('T2');
        table2.items.add('ii1');
        table2.items.add(table.items['i2']); // 참조값 등록 (내부 복제됨)
        if (
                table.items['i1'].value === 'R1' && 
                table.items['i2'].value === 'R2' &&
                table.items['i1'].entity.name === 'T1' && 
                table.items['i2'].entity.name === 'T1' &&
                table2.items['ii1'].value === null && 
                table2.items['i2'].value === 'R2' &&
                table2.items['ii1'].entity.name === 'T2' && 
                table2.items['i2'].entity.name === 'T2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.newRow() :: Row 생성 ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items.add('i3');
        var row = table.newRow();
        row['i1'] = 'R1';
        if (
                row['i1'] !== undefined && 
                row['i2'] !== undefined && 
                row['i3'] !== undefined &&
                row[0] !== undefined && 
                row[1] !== undefined && 
                row[2] !== undefined && 
                row[0] === 'R1' && 
                row['i1'] === 'R1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.setValue(row) :: row  설정(단일) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items.add('i3');
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        row['i3'] = 'R3';
        table.setValue(row);
        if (
                table.items['i1'].value === 'R1' && 
                table.items['i2'].value === 'R2' && 
                table.items['i3'].value === 'R3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.setValue(row) :: row  설정(단일), 별칭 사용');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items.add('i3');
        table.items['i2'].alias = 'ii2';    // 별칭
        table.items['i3'].alias = 'ii3';    // 별칭
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        row['ii3'] = 'RR3';
        table.setValue(row);
        if (
                table.items['i1'].value === 'R1' && 
                table.items['i2'].value === '' &&     // 값 설정안됨
                table.items['i3'].value === 'RR3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.getValue() : Row :: row 얻기(단일) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items.add('i3');
        table.items['i1'].value = 'R1';
        table.items['i2'].value = 'R2';
        table.items['i3'].value = 'R3';
        var row = table.getValue();
        if (
                row['i1'] === 'R1' && 
                row['i2'] === 'R2' && 
                row['i3'] === 'R3' &&
                row[0] === 'R1' && 
                row[1] === 'R2' &&
                row[2] === 'R3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.getValue() : Row :: row 얻기(단일), 별칭 사용 ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items.add('i3');
        table.items['i2'].alias = 'ii2';    // 별칭
        table.items['i3'].alias = 'ii3';    // 별칭
        table.items['i1'].value = 'R1';
        table.items['i2'].value = 'R2';
        table.items['i3'].value = 'R3';
        var row = table.getValue();
        if (
                row['i1'] === 'R1' && 
                row['ii2'] === 'R2' && 
                row['ii3'] === 'R3' &&
                row[0] === 'R1' && 
                row[1] === 'R2' &&
                row[2] === 'R3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('Entity.select(filter) : Entity :: 언티티 조회(참조값), 필터  ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items.add('i3');
        table.items.addValue('i4', 'R4');       // 등록시 값 삽입
        table.items.addValue('i5', 'R5');       // 등록시 값 삽입
        var filter = {
            __except: ['i1'],                   // 제외
            i2: { __except: true },             // 제외
            i3: { caption: 'C3', value: 'R3' }  // 속성 오버라이딩(필터)
        };
        var table2 = table.select(filter);
        table.items['i3'].order = 200;          // 참조값 체크
        if (
                table.name === 'T1' && 
                table.items.count === 5 && 
                table.items['i4'].value === 'R4' && 
                table.items['i5'].value === 'R5' &&
                table.items['i3'].order === 200 && 
                table2.items['i3'].order === 300 &&
                table2.name === 'T1' &&
                table2.items.count === 3 && 
                table2.items['i3'].caption === 'C3' && 
                table2.items['i3'].value === 'R3' && 
                table2.items['i4'].value === 'R4' &&
                table2.items['i5'].value === 'R5' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.select(filter, start) : Entity :: 언티티 조회(참조값), 필터 + 레코드 레코드범위 ');
        var table = new EntityTable('T1');
        var filter = {
            __except: ['i1'],                   // 제외
            i2: { caption: 'C3' }  // 속성 오버라이딩(필터)
        };
        table.items.add('i1');
        table.items.add('i2');
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R10';
        row['i2'] = 'R20';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R100';
        row['i2'] = 'R200';
        table.rows.add(row);
        var table2 = table.select(filter, 1);
        if (
                table.items.count === 2 && 
                table.rows.count === 3 &&
                table.rows[0][0] === 'R1' && 
                table.rows[0]['i1'] === 'R1' &&
                table2.items.count === 1 && 
                table2.rows.count === 2 && 
                table2.rows[0][0] === 'R20' &&
                table2.rows[0]['i2'] === 'R20' && 
                table2.rows[1][0] === 'R200' && 
                table2.rows[1]['i2'] === 'R200' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('Entity.select(null, start, end) : Entity :: 언티티 조회(참조값), 레코드 레코드범위 ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R10';
        row['i2'] = 'R20';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R100';
        row['i2'] = 'R200';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R1000';
        row['i2'] = 'R2000';
        table.rows.add(row);
        var table2 = table.select(null, 1, 2);
        if (
                table.items.count === 2 && 
                table.rows.count === 4 &&
                table2.items.count === 2 && 
                table2.rows.count === 2 && 
                table2.rows[0][1] === 'R20' && 
                table2.rows[0]['i2'] === 'R20' && 
                table2.rows[1][1] === 'R200' && 
                table2.rows[1]['i2'] === 'R200' && 
                table2.rows[2] === undefined &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.select(null, [list]) : Entity :: 언티티 조회(참조값), 레코드 레코드범위 ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R10';
        row['i2'] = 'R20';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R100';
        row['i2'] = 'R200';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R1000';
        row['i2'] = 'R2000';
        table.rows.add(row);
        var table2 = table.select(null, [0, 2]);
        if (
                table.items.count === 2 && 
                table.rows.count === 4 &&
                table2.items.count === 2 && 
                table2.rows.count === 2 && 
                table2.rows[0][1] === 'R2' && 
                table2.rows[0]['i2'] === 'R2' && 
                table2.rows[1][1] === 'R200' && 
                table2.rows[1]['i2'] === 'R200' && 
                table2.rows[2] === undefined &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.copy(filter, start) : Entity :: 언티티 조회  ');
        var table = new EntityTable('T1');
        var filter = {
            __except: ['i1'],                   // 제외
            i2: { caption: 'C3' }  // 속성 오버라이딩(필터)
        };
        table.items.add('i1');
        table.items.add('i2');
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R10';
        row['i2'] = 'R20';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R100';
        row['i2'] = 'R200';
        table.rows.add(row);
        var table2 = table.copy(filter, 1);
        table.items['i2'].caption = 'C30';  // 덮어쓰기
        if (
                table.items.count === 2 && 
                table.rows.count === 3 &&
                table.rows[0][0] === 'R1' && 
                table.rows[0]['i1'] === 'R1' &&
                table.items['i2'] !== table2.items['i2'] && 
                table.items['i2'].caption === 'C30' && 
                table2.items['i2'].caption === 'C3' &&
                table2.items.count === 1 && 
                table2.rows.count === 2 && 
                table2.rows[0][0] === 'R20' && 
                table2.rows[0]['i2'] === 'R20' && 
                table2.rows[1][0] === 'R200' && 
                table2.rows[1]['i2'] === 'R200' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.merge(entity, option = 1) :: 엔티티 병합 (기존 item 유지, 원본 row > 타겟 row) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var row = table.newRow();
        row['i1'] = 'R10';
        row['i2'] = 'R20';
        table.rows.add(row);
        var table2 = new EntityTable('T2');
        table2.items.add('i2');
        table2.items.add('i3');
        table2.items['i2'].caption = 'C2';
        var row = table.newRow();
        row['i2'] = 'R22';
        row['i3'] = 'R33';
        table2.rows.add(row);
        table.merge(table2, 1);
        if (
                table.items.count === 3 && 
                table.rows.count === 2 &&
                table.items['i2'].caption === 'C1' &&   // 기존 유지 
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R2' && 
                table.rows[0]['i3'] === 'R33' &&
                table.rows[1]['i1'] === 'R10' && 
                table.rows[1]['i2'] === 'R20' && 
                table.rows[1]['i3'] === '' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.merge(entity, option = 2) :: 엔티티 병합 (기존 item 덮어쓰기, 원본 row < 타겟 row) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var table2 = new EntityTable('T2');
        table2.items.add('i2');
        table2.items.add('i3');
        table2.items['i2'].caption = 'C2';
        var row = table.newRow();
        row['i2'] = 'R22';
        row['i3'] = 'R33';
        table2.rows.add(row);
        var row = table.newRow();
        row['i2'] = 'R20';
        row['i3'] = 'R30';
        table2.rows.add(row);
        table.merge(table2, 2);
        if (
                table.items.count === 3 && 
                table.rows.count === 2 &&
                table.items['i2'].caption === 'C2' &&   // 덮어쓰기
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R22' && 
                table.rows[0]['i3'] === 'R33' &&
                table.rows[1]['i1'] === '' && 
                table.rows[1]['i2'] === 'R20' && 
                table.rows[1]['i3'] === 'R30' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.merge(entity, option = 3) :: 엔티티 병합 (row 안가져오기) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var table2 = new EntityTable('T2');
        table2.items.add('i2');
        table2.items.add('i3');
        table2.items['i2'].caption = 'C2';
        var row = table.newRow();
        row['i2'] = 'R22';
        row['i3'] = 'R33';
        table2.rows.add(row);
        var row = table.newRow();
        row['i2'] = 'R20';
        row['i3'] = 'R30';
        table2.rows.add(row);
        table.merge(table2, 3);
        if (
                table.items.count === 3 && table.rows.count === 1 && 
                table.items['i2'].caption === 'C1' &&
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R2' && 
                table.rows[0]['i3'] === '' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(Entity, option = 1) :: 로드 (row 기준, 채워진 Entity) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var table2 = new EntityTable('T2');
        table2.items.add('i2');
        table2.items.add('i3');
        table2.items['i2'].caption = 'C2';
        var row = table.newRow();
        row['i2'] = 'R22';
        row['i3'] = 'R33';
        table2.rows.add(row);
        var row = table.newRow();
        row['i2'] = 'R20';
        row['i3'] = 'R30';
        table2.rows.add(row);
        table.load(table2, 1);
        if (
                table.items.count === 3 && 
                table.rows.count === 3 &&
                table.items['i2'].caption === 'C1' &&
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R2' && 
                table.rows[0]['i3'] === '' &&
                table.rows[1]['i1'] === '' && 
                table.rows[1]['i2'] === 'R22' && 
                table.rows[1]['i3'] === 'R33' &&
                table.rows[2]['i1'] === '' && 
                table.rows[2]['i2'] === 'R20' && 
                table.rows[2]['i3'] === 'R30' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(Entity, option = 2) :: 로드 (row 기준, 채워진 Entity) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var table2 = new EntityTable('T2');
        table2.items.add('i2');
        table2.items.add('i3');
        table2.items['i2'].caption = 'C2';
        var row = table.newRow();
        row['i2'] = 'R22';
        row['i3'] = 'R33';
        table2.rows.add(row);
        var row = table.newRow();
        row['i2'] = 'R20';
        row['i3'] = 'R30';
        table2.rows.add(row);
        table.load(table2, 2);
        if (
                table.items.count === 2 && 
                table.rows.count === 3 &&
                table.items['i2'].caption === 'C1' &&
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R2' && 
                table.rows[0]['i3'] === undefined &&
                table.rows[1]['i1'] === '' && 
                table.rows[1]['i2'] === 'R22' &&
                table.rows[2]['i1'] === '' && 
                table.rows[2]['i2'] === 'R20' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(Entity, option = 1) :: 로드 (row 기준) ');
        var table = new EntityTable('T1');
        var table2 = new EntityTable('T2');
        table2.items.add('i2');
        table2.items.add('i3');
        table2.items['i2'].caption = 'C2';
        var row = table.newRow();
        row['i2'] = 'R22';
        row['i3'] = 'R33';
        table2.rows.add(row);
        var row = table.newRow();
        row['i2'] = 'R20';
        row['i3'] = 'R30';
        table2.rows.add(row);
        table.load(table2, 1);
        if (
                table.items.count === 2 && 
                table.rows.count === 2 &&
                table.items['i2'].caption === 'C2' &&
                table.rows[0]['i2'] === 'R22' && 
                table.rows[0]['i3'] === 'R33' &&
                table.rows[1]['i2'] === 'R20' && 
                table.rows[1]['i3'] === 'R30' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(Entity, option = 2) :: 로드 (존재하는 item의 row만 가져오기) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var table2 = new EntityTable('T2');
        table2.items.add('i2');
        table2.items.add('i3');
        table2.items['i2'].caption = 'C2';
        var row = table.newRow();
        row['i2'] = 'R22';
        row['i3'] = 'R33';
        table2.rows.add(row);
        var row = table.newRow();
        row['i2'] = 'R20';
        row['i3'] = 'R30';
        table2.rows.add(row);
        table.load(table2, 2);
        if (
                table.items.count === 2 && 
                table.rows.count === 2 &&
                table.items['i2'].caption === 'C1' &&
                table.rows[0]['i1'] === '' && 
                table.rows[0]['i2'] === 'R22' &&
                table.rows[1]['i1'] === '' && 
                table.rows[1]['i2'] === 'R20' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(JSON, option = 1) :: 로드 (row 기준, 채워진 Entity) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
            }            
        };
        table.load(table2, 1);
        if (
                table.items.count === 3 && 
                table.rows.count === 3 &&
                table.items['i2'].caption === 'C1' && 
                table.items['i2'].size === 10 &&
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R2' && 
                table.rows[0]['i3'] === '' &&
                table.rows[1]['i1'] === '' && 
                table.rows[1]['i2'] === 'R22' && 
                table.rows[1]['i3'] === 'R33' &&
                table.rows[2]['i1'] === '' && 
                table.rows[2]['i2'] === 'R20' && 
                table.rows[2]['i3'] === 'R30' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(JSON, option = 2) :: 로드 (존재하는 item의 row만 가져오기, 채워진 Entity)  ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
            }            
        };
        table.load(table2, 2);
        if (
                table.items.count === 2 && 
                table.rows.count === 3 &&
                table.items['i2'].caption === 'C1' && 
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R2' && 
                table.rows[0]['i3'] === undefined &&
                table.rows[1]['i1'] === '' && 
                table.rows[1]['i2'] === 'R22' &&
                table.rows[2]['i1'] === '' && 
                table.rows[2]['i2'] === 'R20' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(JSON, option = 1) :: 로드 (row 기준) ');
        var table = new EntityTable('T1');
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
            }            
        };
        table.load(table2, 1);
        if (
                table.items.count === 2 && 
                table.rows.count === 2 &&
                table.items['i2'].size === 10 && 
                table.items['i3'].size === 20 &&
                table.rows[0]['i2'] === 'R22' && 
                table.rows[0]['i3'] === 'R33' &&
                table.rows[1]['i2'] === 'R20' && 
                table.rows[1]['i3'] === 'R30' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Entity.load(JSON, option = 2) :: 로드 (존재하는 item의 row만 가져오기)  ');
        var table = new EntityTable('T1');
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
            }            
        };
        table.load(table2, 2);
        if (
                table.items.count === 0 && 
                table.rows.count === 0 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('Entity.clear() :: 초기화 ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        table.clear();
        if (
                table.items.count === 0 && 
                table.rows.count === 0 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('EntityTable.clone() : EntityTable :: 복제 ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var row = table.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        var table2 = table.clone();
        if (
                table.name === 'T1' && 
                table.items.count === 2 && 
                table.rows.count === 1 && 
                table.items['i2'].caption === 'C1' && 
                table.rows[0]['i1'] === 'R1' && 
                table.rows[0]['i2'] === 'R2' && 
                table2.name === 'T1' && 
                table2.items.count === 2 && 
                table2.rows.count === 1 && 
                table2.items['i2'].caption === 'C1' && 
                table2.rows[0]['i1'] === 'R1' && 
                table2.rows[0]['i2'] === 'R2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('EntityTable.getTypes() :: 타입 조회(상속) ');
        var table = new EntityTable('T1');
        var types = table.getTypes();
        if (
                types.indexOf('EntityTable') > -1 &&
                types[0] === 'EntityTable' && 
                types[1] === 'Entity' && 
                types[2] === 'MetaElement' && 
                types[3] === 'MetaObject' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('TODO:: EntityTable.getObject() :: 타입 얻기(JSON) ');
        if (true) {
            // console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
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
        global._W.Test.EntityTable = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * @namespace _W.Test.EntityView
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
        
    var Row;
    var Item;
    var EntityView;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        EntityView              = require('../src/entity-view').EntityView;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('new EntityView(이름, baseEntity) :: Item 참조 (생성시) ');
        var view = new EntityView('T1');        // 일반 뷰
        view.items.add('i1');
        view.items.add('i2');
        view.items['i2'].caption = 'C1';
        var row = view.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        view.rows.add(row);
        var view3 = new EntityView('T3');
        view3.items.addValue('i5','V5');
        var view2 = new EntityView('T2', view); // 참조 뷰
        view2.items.add(view.items['i1']);
        view2.items.add('i2');                  // 기존에 있는 속성명
        view2.items.add('i3');                  // 신규 속성명
        view2.items.addValue('i4', 'V4');       // 신규 속성명 + value
        view2.items.add('i5', view3.items);     // 참조로 등록
        view2.items['i2'].caption = 'C2';
        view2.items['i3'].caption = 'C3';

        if (
                view.name === 'T1' && 
                view.items.count === 4 && 
                view.rows.count === 1 && 
                view.items['i2'].caption === 'C2' && 
                view.items['i3'].caption === 'C3' &&
                view.items['i4'].value === 'V4' &&
                view.items._baseCollection === undefined &&
                view.items['i1'].entity.name === 'T1' && 
                view.items['i2'].entity.name === 'T1' &&
                view.rows[0]['i1'] === 'R1' && 
                view.rows[0]['i2'] === 'R2' && 
                view2._refEntities[0].name === 'T1' &&                                              // 참조 등록 검사
                view2._refEntities[1].name === 'T3' &&                                              // 참조 등록 검사
                view2.items['i2'].caption === 'C2' && 
                view2.items['i3'].caption === 'C3' &&
                view2.items['i4'].value === 'V4' &&
                view2.items._baseCollection._onwer.name === 'T1' &&
                view2.name === 'T2' && 
                view2.items.count === 5 && 
                view2.rows.count === 0 && 
                view2.items['i1'].entity.name === 'T1' && 
                view2.items['i2'].entity.name === 'T1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('EntityView.clone() :: 복제 (일반 뷰) ');
        var view = new EntityView('T1');
        view.items.add('i1');
        view.items.add('i2');
        view.items['i2'].caption = 'C1';
        var row = view.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        view.rows.add(row);
        var view2 = view.clone();
        if (
                view.name === 'T1' && view.items.count === 2 && view.rows.count === 1 && 
                view.items['i2'].caption === 'C1' &&
                view.rows[0]['i1'] === 'R1' && view.rows[0]['i2'] === 'R2' && 
                view2.name === 'T1' && view2.items.count === 2 && view2.rows.count === 1 && 
                view2.items['i2'].caption === 'C1' && 
                view2.rows[0]['i1'] === 'R1' && view2.rows[0]['i2'] === 'R2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('EntityView.getTypes() :: 타입 조회(상속) ');
        var table = new EntityView('T1');
        var types = table.getTypes();
        if (
                types.indexOf('EntityView') > -1 &&
                types[0] === 'EntityView' && 
                types[1] === 'Entity' && 
                types[2] === 'MetaElement' && 
                types[3] === 'MetaObject' &&
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
        global._W.Test.EntityView = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * @namespace _W.Test.Item
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

    var Row;
    var Item;
    var EntityView;
    var EntityTable;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {   
        require('../src/object-implement'); // _implements() : 폴리필  
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('new Item(name, null, property)  :: 생성시 속성 설정 ');
        var item = new Item('i1', null, {
            type: 'text',
            size: 100,
            default: 'D1',
            caption: 'C1',
            isNotNull: true,
            constraints: [
                { regex: /\D/, msg: 'message', code: 'C1', return: true },         // true : 충족조건
                { regex: /[0-9]{5}/, msg: 'message', code: 'C2', return: false }   // false : 통과조건
            ],   
            order: 1000,
            increase: 10,
            value: 'V1'
        });
        if (
                item.type === 'text' &&
                item.size === 100 &&
                item.default === 'D1' &&
                item.caption === 'C1' &&
                item.isNotNull === true &&
                item.constraints.length === 2 &&
                item.order === 1000 &&
                item.increase === 10 &&
                item.value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.onChanged(fn) :: 변경이벤트 ');
        var item = new Item('i1');
        var evt;
        item.onChanged = function(val) {evt = val};
        item.value = 10;
        if (
                item.value === 10 &&
                evt === 10. &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('Item.setConstraint(regex, msg, code, return) :: 제약조건 등록 ');
        var item = new Item('i1');
        item.setConstraint(/10/, '10 시작...', 100, true);
        item.setConstraint(/[0-9]{5}/, '5자리 이하만...', 200, false);
        item.setConstraint(/\D/, '5자리 이하만...', 300);   // return 기본값 = false
        if (
                item.constraints.length === 3 &&
                item.constraints[0].code === 100 &&
                item.constraints[1].code === 200 &&
                item.constraints[2].code === 300 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.getter :: value getter만 설정 ');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        // item.defineValueProperty(function() { return item_value; });
        item.getter = function() { return item_value; };
        if (
                item.value  === 10 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.setter :: value setter만 설정 ');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        // item.defineValueProperty(undefined, function(val) { item_value = val; });
        item.setter = function(val) { item_value = val; };
        item.value = 'V11';
        if (
                item.value  === 'V11' && 
                item_value  === 'V11' && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.defineValueProperty(?getter, ?setter) :: value getter/setter ');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        // item.defineValueProperty(function() { return item_value; }, function(val) { item_value = val; });
        item.getter = function() { return item_value; }
        item.setter = function(val) { item_value = val; };
        item.value = 'V11';
        if (
                item.value  === 'V11' && 
                item_value  === 'V11' && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.getter = func :: getter 만 설정 ');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        item.getter = function() { return item_value; };
        item.value = 'V11';
        if (
                item.value  === 10 && 
                item_value  === 10 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.getter = func :: setter 만 설정 ');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        item.setter = function(val) { item_value = val; };
        item.value = 'V11';
        if (
                item.value  === 'V11' && 
                item_value  === 'V11' && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.getter = func :: setter 만 설정 (내부와 외부 값 다른경우) ');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        item.setter = function(val) { item_value = val + 'R'; };
        item.value = 'V11';
        if (
                item.value  === 'V11' && 
                item_value  === 'V11R' && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('Item.getter = func :: setter 만 설정 (셋터리턴이 있는경우)');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        item.setter = function(val) { return item_value = val + 'R'; };
        item.value = 'V11';
        if (
                item.value  === 'V11R' && 
                item_value  === 'V11R' && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.getter = func :: getter/setter 설정 ');
        var item = new Item('i1');
        var item_value = 10;
        item.value = 'V1';
        item.getter = function() { return item_value; };
        item.setter = function(val) { item_value = val; };
        item.value = 'V11';
        if (
                item.value  === 'V11' && 
                item_value  === 'V11' && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.valid(value, r_result) :: 제약조건 검사 ');
        var item = new Item('i1');
        item.isNotNull = false;
        item.setConstraint(/10/, '10 시작...', 100, true);
        item.setConstraint(/[0-9]{5}/, '5자리 이하만...', 200, false);
        item.setConstraint(/\D/, '숫자만...', 300);   // return 기본값 = false
        var result = {};
        if (
                item.valid('10', result) === true &&        // 성공
                item.valid('', result) === false &&         // 실패 : 10로 시작을 안해서
                item.valid('1000', result) === true &&      // 성공
                item.valid('10000', result) === false &&    // 실패 : 5자리 이상
                item.valid('100a', result) === false &&     // 실패 : 문자가 들어가서
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.valid(value, r_result, 1) :: 제약조건 검사 (isNotNull 참조) ');
        var item = new Item('i1');
        item.isNotNull = false;
        var item2 = new Item('i2');
        item2.isNotNull = true;     // 공백허용 안함
        var result = {};
        var result2 = {};
        if (
                item.valid('', result) === true ||         // 성공 : 공백 허용
                item2.valid('', result2) === false ||     // 실패 : 공백 불가
                false) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.valid(value, r_result, 2) :: 제약조건 검사 (null검사 진행 ) ');
        console.log('Item.valid(value, r_result) :: 제약조건 검사 (isNullPass=true) ');
        var item = new Item('i1');
        item.isNotNull      = false;
        item.isNullPass     = true;
        var item2 = new Item('i2');
        item2.isNotNull     = true;     // 공백 불가
        item2.isNullPass    = true;     
        var result = {};
        var result2 = {};
        if (
                item.valid('', result) === true &&
                item2.valid('', result2) === false &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item.clone()  :: 복제 ');
        var table = new EntityTable('T1');
        var item = new Item('i1', table, {
            type: 'text',
            size: 100,
            default: 'D1',
            caption: 'C1',
            isNotNull: true,
            constraints: [
                { regex: /\D/, msg: 'message', code: 'C1', return: true },         // true : 충족조건
                { regex: /[0-9]{5}/, msg: 'message', code: 'C2', return: false }   // false : 통과조건
            ],   
            order: 1000,
            increase: 10,
            value: 'V1'
        });
        var item2 = item.clone();
        if (
                item2.entity.name === 'T1' &&
                item2.type === 'text' &&
                item2.size === 100 &&
                item2.default === 'D1' &&
                item2.caption === 'C1' &&
                item2.isNotNull === true &&
                item2.constraints.length === 2 &&
                item2.order === 1000 &&
                item2.increase === 10 &&
                item2.value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('Item.getTypes() :: 타입 조회(상속) ');
        var item = new Item('i1');
        var types = item.getTypes();
        if (
                types.indexOf('Item') > -1 &&
                types[0] === 'Item' && 
                types[1] === 'MetaElement' && 
                types[2] === 'MetaObject' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('Item :: 속성 + get/set + 생성자 예외 테스트 : try');
        var item = new Item('i1');
        item.result = true;
        item.result2 = true;
        try {
            item.order = 'A';   // 에러 수사만
        } catch {
            item.result = false;
        } finally {
            item.result2 = false;
        }
        
        if (
                item.result === false &&
                item.result2 === false &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('Item :: 속성 + get/set + 생성자 예외 테스트 : try');
        var item = new Item('i1');
        item.result = true;
        item.result2 = true;
        try {
            item.order = 10;
        } catch {
            item.result = false;
        } finally {
            item.result2 = false;
        }
        
        if (
                item.result === true &&
                item.result2 === false &&
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
        global._W.Test.Item = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * @namespace _W.Test.ItemCollection
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
        
    var Row;
    var Item;
    var EntityView;
    var EntityTable;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }
    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('ItemTableCollection.add(name) :: 아이템 추가 (name) ');
        var table = new EntityTable('T1');
        table.items.add('i1');
        table.items.add('i2');
        if (table.items.count === 2) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ItemTableCollection.add(item) :: 아이템 추가 (item) ');
        var table = new EntityTable('T1');
        table.items.add(new Item('i1'));
        table.items.add('i2');
        table.items['i2'].caption = 'C1';
        var table2 = new EntityTable('T2');
        table2.items.add(table.items['i2']);
        table.items['i2'].caption = 'C2';
        if (
                table.items.count === 2 &&
                table.items['i2'].caption === 'C2' &&       // caption 변경함
                table.items['i2'].entity.name === 'T1' &&
                table2.items.count === 1 && 
                table2.items['i2'].caption === 'C1' &&      // caption 변경함
                table2.items['i2'].entity.name === 'T2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ItemTableCollection.addValue(name, value) :: 속성명 + 값 추가 (name) ');
        var table = new EntityTable('T1');
        table.items.addValue('i1', 'V1');
        table.items.addValue('i2', 'V2');
        if (
                table.items.count === 2 &&
                table.items['i1'].value === 'V1' &&
                table.items['i2'].value === 'V2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new ItemViewCollection(onwer) :: 독립형 생성 ');
        console.log('ItemViewCollection.add(name, ?baseCollection) :: 독립 아이템추가, 기본컬렉션 지정 ');
        var view = new EntityView('T1');        // 독립형 생성
        view.items.add('i1');                   // 아이템 추가
        view.items.add('i2');
        view.items['i2'].caption = 'C1';
        var view2 = new EntityView('T2');       // 독립형 생성
        view2.items.add(view.items['i1']);      // 참조 아이템 추가
        view2.items.add('i2');                  
        view2.items.add('i3', view.items);      // 컬렉션 지정 추가
        view2.items['i1'].value = 'V1';
        view2.items['i2'].caption = 'C2';
        view2.items['i3'].caption = 'C3';
        if (
                view.name === 'T1' && 
                view.items.count === 3 &&
                view.items['i1'].value === 'V1' &&
                view.items['i2'].caption === 'C1' && 
                view.items['i3'].caption === 'C3' &&
                view2.name === 'T2' && 
                view2.items.count === 3 &&
                view2.items['i1'].value === 'V1' && 
                view2.items['i2'].caption === 'C2' &&
                view2.items['i3'].caption === 'C3' &&
                true ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new ItemViewCollection(onwer, baseCollection) :: 참조형 생성 ');
        console.log('ItemViewCollection.add(name, ?baseCollection) :: 독립 아이템추가, 기본컬렉션 지정 ');
        console.log('ItemViewCollection.addValue(name, value) :: 속성명 + 값 추가 (name) ');
        var view3 = new EntityView('T3');      // 독립형 생성
        var view = new EntityView('T1');        // 독립형 생성
        view.items.add('i1');                   // 아이템 추가
        view.items.add('i2');
        view.items.addValue('i3', 'V3');
        view.items['i1'].caption = 'C1';
        view.items['i2'].caption = 'C2';
        var view2 = new EntityView('T2', view);    // 참조형 생성
        view2.items.add(view.items['i1']);         // 중복 삽입 : 기존값 리턴
        view2.items.add('i2');                     // 중복 삽입 : 기존값 리턴
        view2.items.add('i3');                      
        view2.items.add('i4', view3.items);      // 참조형에 참조컬렉션 지정
        view2.items['i3'].caption = 'C3';       // 참조에 속성 덮어씀
        view2.items['i4'].caption = 'C4';
        if (
                view.name === 'T1' && 
                view.items.count === 3 &&
                view.items['i1'].caption === 'C1' &&
                view.items['i2'].caption === 'C2' && 
                view.items['i3'].caption === 'C3' &&
                view.items['i3'].value === 'V3' &&
                view2.name === 'T2' && 
                view2.items.count === 4 &&
                view2.items['i1'].caption === 'C1' && 
                view2.items['i2'].caption === 'C2' &&
                view2.items['i3'].caption === 'C3' &&
                view2.items['i3'].value === 'V3' &&
                view2.items['i4'].caption === 'C4' &&
                view3.name === 'T3' && 
                view3.items.count === 1 &&
                view3.items['i4'].caption === 'C4' &&
                true ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ItemViewCollection.addEntity(entity) :: 엔티티 전체 추가 ');
        var view = new EntityView('T1');
        view.items.addValue('i1', 'V1');
        view.items.addValue('i2', 'V2');
        var view2 = new EntityView('T2');
        view2.items.addEntity(view);
        // view2.items.add(view);

        if (
                view.name === 'T1' && 
                view.items.count === 2 &&
                view.items['i1'].value === 'V1' &&
                view.items['i2'].value === 'V2' && 
                view2.name === 'T2' && 
                view2.items.count === 2 &&
                view2.items['i1'].value === 'V1' && 
                view2.items['i2'].value === 'V2' &&
                true ) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('ItemViewCollection.initValue() :: 컬렉션 전체 값 초기화 ');
        var view = new EntityView('T1');
        view.items.addValue('i1', 'V1');
        view.items.addValue('i2', 'V2');
        view.items.initValue();
        if (
                view.name === 'T1' && 
                view.items.count === 2 &&
                view.items['i1'].value === '' &&
                view.items['i2'].value === '' && 
                true ) {
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
        global._W.Test.ItemCollection = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));

/**
 * @namespace _W.Test.ItemDOM
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
        
    var Row;
    var ItemDOM;
    var EntityView;
    var EntityTable;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
        Row                     = require('../src/entity-row').Row;
        ItemDOM                 = require('../src/entity-item-dom');
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        ItemDOM                    = global._W.Meta.Entity.ItemDOM;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('clone() :: 복제 ');
        var table = new EntityTable('T1');
        var item = new ItemDOM('i1', table, {
            // Item 속성
            type: 'text',
            size: 100,
            default: 'D1',
            caption: 'C1',
            isNotNull: true,
            constraints: [
                { regex: /\D/, msg: 'message', code: 'C1', return: true },         // true : 충족조건
                { regex: /[0-9]{5}/, msg: 'message', code: 'C2', return: false }   // false : 통과조건
            ],   
            order: 1000,
            increase: 10,
            value: 'V1',
            // ItemDOM 속성
            domType: { value: true },
            isReadOnly: true,
            isHide: true,
            element: { value: true },
            selector: 'btn_'
        });
        var item2 = item.clone();
        if (
                item2.entity.name === 'T1' &&
                item2.type === 'text' &&
                item2.size === 100 &&
                item2.default === 'D1' &&
                item2.caption === 'C1' &&
                item2.isNotNull === true &&
                item2.constraints.length === 2 &&
                item2.order === 1000 &&
                item2.increase === 10 &&
                item2.value === 'V1' &&
                item2.domType.value === true &&
                item2.isReadOnly === true &&
                item2.isHide === true &&
                item2.element.value === true &&
                item2.selector.key === 'btn_' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('getTypes() :: 타입 조회(상속) ');
        var item = new ItemDOM('i1');
        var types = item.getTypes();
        if (
                types.indexOf('ItemDOM') > -1 &&
                types[0] === 'ItemDOM' &&
                types[1] === 'Item' && 
                types[2] === 'MetaElement' && 
                types[3] === 'MetaObject' &&
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
        global._W.Test.ItemDOM = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));

/**
 * @namespace _W.Test.Row
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

    var Row;
    var Item;
    var EntityView;
    var EntityTable;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {   
        require('../src/object-implement'); // _implements() : 폴리필  
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log('---------------------------------------------------------------------------');
        console.log('new Row() :: 생성  ');
        console.log('new Row(entity) :: 생성 ');
        var table = new EntityTable('T1');
        table.items.addValue('i1', 'V1');
        table.items.addValue('i2', 'V2');
        var row = new Row();
        var row2 = new Row(table);
        table.rows.add(row);
        table.rows.add(row2);
        if (
                row.count === 0 &&
                row2.count > 0 &&
                table.rows[0].count === 0 &&
                table.rows[1].count > 0 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('RowCollection.add(Row() :: 등록 ');
        var table = new EntityTable('T1');
        table.items.addValue('i1', 'V1');
        table.items.addValue('i2', 'V2');
        table.rows.add();
        if (
                table.rows[0].count === 2 &&
                table.rows[0]['i1'] === '' &&
                table.rows[0]['i2'] === '' &&
                table.rows[0]['i3'] !== '' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('RowCollection.add(Row(row) :: 등록 ');
        var table = new EntityTable('T1');
        table.items.addValue('i1', 'V1');
        table.items.addValue('i2', 'V2');
        var row = new Row(table);
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table.rows.add(row);
        if (
                table.rows[0].count === 2 &&
                table.rows[0]['i1'] === 'R1' &&
                table.rows[0]['i2'] === 'R2' &&
                table.rows[0]['i3'] !== '' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCnt++;
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
        global._W.Test.Row = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));

/**
 * @namespace _W.Test.MetaElement_Sub
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
        console.log('MetaElement_Sub :: 설명 ');
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
        global._W.Test.MetaElement_Sub = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));

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

/**
 * @namespace _W.Test.Meta 메인 테스크 
 * 
 * 서버 실행
 *  - npx http-server                 : 서버 실행  (npx http-server -p 원하는 포트번호)  
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Test           = global._W.Test || {};
    
    //==============================================================
    // 2. 변수 선언
    var errorCnt = 0;
    var tasks = [];  //{ns:..., file:.... }
    var result, task;
    var isCallback      = false;
    var CLEAR           = false;
    var totalTaskCnt = 0;
    var totalFileCnt = 0;
    
    /* 단순 로그 보기 */
    // CLEAR = true;
    // global.isCallback = isCallback;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
    }
    
    //==============================================================
    // 3. 모듈 등록
    tasks.push({ns: '_W.Test.Object_implement'      , file: './Common.Object.implement.test.js'});
    tasks.push({ns: '_W.Test.Observer'              , file: './Common.Observer.test.js'});
    tasks.push({ns: '_W.Test.Util'                  , file: './Common.Util.test.js'});
    tasks.push({ns: '_W.Test.ArrayCollection'       , file: './Collection.ArrayCollection.test.js'});
    tasks.push({ns: '_W.Test.PropertyCollection'    , file: './Collection.PropertyCollection.test.js'});
    tasks.push({ns: '_W.Test.MetaObject_Sub'        , file: './Meta.MetaObject-Sub.test.js'});
    tasks.push({ns: '_W.Test.MetaElement_Sub'       , file: './Meta.MetaElement-Sub.test.js'});
    tasks.push({ns: '_W.Test.ComplexElement_Sub'    , file: './Meta.ComplexElement-Sub.test.js'});
    tasks.push({ns: '_W.Test.EntityTable'           , file: './Meta.Entity.EntityTable.test.js'});
    tasks.push({ns: '_W.Test.EntityView'            , file: './Meta.Entity.EntityView.test.js'});
    tasks.push({ns: '_W.Test.ItemCollection'        , file: './Meta.Entity.ItemCollection.test.js'});
    tasks.push({ns: '_W.Test.Item'                  , file: './Meta.Entity.Item.test.js'});
    tasks.push({ns: '_W.Test.ItemDOM'               , file: './Meta.Entity.ItemDOM.test.js'});
    tasks.push({ns: '_W.Test.Row'                   , file: './Meta.Entity.Row.test.js'});
    tasks.push({ns: '_W.Test.BindCommandAjax'       , file: './Meta.Bind.BindCommandAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindCommandEditAjax'   , file: './Meta.Bind.BindCommandEditAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindCommandLookupAjax' , file: './Meta.Bind.BindCommandLookupAjax.test.js'});
    tasks.push({ns: '_W.Test.BindModelAjax'         , file: './Meta.Bind.BindModelAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindModelReadAjax'     , file: './Meta.Bind.BindModelReadAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindModelDI'           , file: './Meta.Bind.BindModelDI.test.js'});
    tasks.push({ns: '_W.Test.DOM_Node'              , file: './Etc.DOM-Node.test.js'});

    //==============================================================
    // 4. 테스트 본문 :: run()
    function run() {
        
        for (var i = 0; i < tasks.length; i++) {
            task = typeof module === 'object' ?  tasks[i].file : tasks[i].ns;
            console.log('===========================================================================');
            console.log('단위 테스트 %s : %s', i, task);
            
            if (typeof module === 'object' && typeof module.exports === 'object') {     
                task = tasks[i].file;
                tasks[i].result = require(tasks[i].file);
            } else {
                task = tasks[i].ns;
                tasks[i].result = eval(tasks[i].ns + '.run()');
            }
        }
        
        if (CLEAR) console.clear();

        console.log('***************************************************************************');
        console.log('통합 테스트 결과');
        console.log('***************************************************************************');
        for (var i = 0; i < tasks.length; i++) {            

            task = typeof module === 'object' ?  tasks[i].file : tasks[i].ns;
            
            totalTaskCnt += typeof tasks[i].result.taskCnt === 'number' ? tasks[i].result.taskCnt : 0; // 전체 태스크 갯수
            totalFileCnt++;

            if (tasks[i].result.errorCnt > 0) {
                console.warn('No: %s, file : %s, ERR_COUNT: [ %s EA ] = Warning', totalFileCnt, task, tasks[i].result.errorCnt);
                errorCnt++;
            }
            console.log('No: %s, file: %s, task [ %s EA ] = Success', totalFileCnt, task, tasks[i].result.taskCnt);

            console.log('___________________________________________________________________________');
        }
        
        if (errorCnt > 0) console.warn('Total: file [ %s EA ], task [ %s EA ] = Error', totalFileCnt, errorCnt);
        console.log('Total: file [ %s EA ], task [ %s EA ] = Success', totalFileCnt, totalTaskCnt);

        // return errorCnt;
        return {
            errorCnt: errorCnt,
            taskCnt: totalTaskCnt
        };
    }
    
    //==============================================================
    // 5. 결과 : 에러 카운터 ('0'이면 정상)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = run();
    } else {
        global._W.Test.Meta = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));