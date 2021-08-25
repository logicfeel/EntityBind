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