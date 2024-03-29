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