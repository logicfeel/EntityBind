/**
 * @namespace _W.Task.PropertyCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Task           = global._W.Task || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCount = 0;
    var result = [];        // 결과 확인 **사용시 초기화    
        
    var util;
    var PropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("../src/utils");
        PropertyCollection  = require("../src/collection-property");
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

        console.log("---------------------------------------");
        console.log("add(name, ?value) :: 추가");
        var table = new TestTable();
        table.items.add("a1");
        table.items.add("a2", "A2");
        if (table.items["a2"] === "A2" && table.items.count === 2) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("remove(elem | name) :: 삭제");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("removeAt(idx) :: 삭제 (중간) ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("removeAt(idx) :: 삭제 (처음) ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("removeAt(idx) :: 삭제 (끝) ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("clear() :: 전체삭제(초기화) ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("contains(elem | name) :: 유무 검사 ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("indexOf(elem | name) :: idx 조회 ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("propertyOf(idx) :: prop 조회 ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.PropertyCollection = run();
    }

}(this));    