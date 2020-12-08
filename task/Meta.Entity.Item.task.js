/**
 * @namespace _W.Task.Item
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
    var isCallback = global.isCallback === false ? false : true;

    var Row;
    var Item;
    var EntityView;
    var EntityTable;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        Row                     = require("../src/entity-row").Row;
        Item                    = require("../src/entity-item").Item;
        EntityView              = require("../src/entity-view").EntityView;
        EntityTable             = require("../src/entity-table").EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log("-----------------------------------------------------------------");
        console.log("new Item(name, null, property)  :: 생성시 속성 설정 ");
        var item = new Item("i1", null, {
            type: "text",
            size: 100,
            default: "D1",
            caption: "C1",
            isNotNull: true,
            constraints: [
                { regex: /\D/, msg: "message", code: "C1", return: true },         // true : 충족조건
                { regex: /[0-9]{5}/, msg: "message", code: "C2", return: false }   // false : 통과조건
            ],   
            order: 1000,
            increase: 10,
            value: "V1"
        });
        if (item.type === "text" &&
            item.size === 100 &&
            item.default === "D1" &&
            item.caption === "C1" &&
            item.isNotNull === true &&
            item.constraints.length === 2 &&
            item.order === 1000 &&
            item.increase === 10 &&
            item.value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("Item.setConstraint(regex, msg, code, return) :: 제약조건 등록 ");
        var item = new Item("i1");
        item.setConstraint(/10/, "10 시작...", 100, true);
        item.setConstraint(/[0-9]{5}/, "5자리 이하만...", 200, false);
        item.setConstraint(/\D/, "5자리 이하만...", 300);   // return 기본값 = false
        if (item.constraints.length === 3 &&
            item.constraints[0].code === 100 &&
            item.constraints[1].code === 200 &&
            item.constraints[2].code === 300 &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("Item.valid(value, r_result) :: 제약조건 검사 ");
        var item = new Item("i1");
        item.isNotNull = false;
        item.setConstraint(/10/, "10 시작...", 100, true);
        item.setConstraint(/[0-9]{5}/, "5자리 이하만...", 200, false);
        item.setConstraint(/\D/, "숫자만...", 300);   // return 기본값 = false
        var result = {};
        if (item.valid("10", result) === true &&        // 성공
            item.valid("", result) === false &&         // 실패 : 10로 시작을 안해서
            item.valid("1000", result) === true &&      // 성공
            item.valid("10000", result) === false &&    // 실패 : 5자리 이상
            item.valid("100a", result) === false &&     // 실패 : 문자가 들어가서
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("Item.valid(value, r_result, 1) :: 제약조건 검사 (isNotNull 참조) ");
        var item = new Item("i1");
        item.isNotNull = false;
        var item2 = new Item("i2");
        item2.isNotNull = true;     // 공백허용 안함
        var result = {};
        var result2 = {};
        if (item.valid("", result, 1) === true &&        // 성공 : 공백 허용
            item2.valid("", result2, 1) === false &&      // 실패 : 공백 불가
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("Item.valid(value, r_result, 2) :: 제약조건 검사 (null검사 진행 ) ");
        var item = new Item("i1");
        item.isNotNull = false;
        var item2 = new Item("i2");
        item2.isNotNull = true;     // 공백허용 안함
        var result = {};
        var result2 = {};
        if (item.valid("", result, 2) === false &&        // 실패 : 공백 불가
            item2.valid("", result2, 2) === false &&      // 실패 : 공백 불가
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("Item.valid(value, r_result, 3) :: 제약조건 검사 (null검사 무시) ");
        var item = new Item("i1");
        item.isNotNull = false;
        var item2 = new Item("i2");
        item2.isNotNull = true;     // 공백허용 안함
        var result = {};
        var result2 = {};
        if (item.valid("", result, 3) === true &&        // 실패 : 공백 무시
            item2.valid("", result2, 3) === true &&      // 실패 : 공백 무시
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("Item.clone()  :: 복제 ");
        var table = new EntityTable("T1");
        var item = new Item("i1", table, {
            type: "text",
            size: 100,
            default: "D1",
            caption: "C1",
            isNotNull: true,
            constraints: [
                { regex: /\D/, msg: "message", code: "C1", return: true },         // true : 충족조건
                { regex: /[0-9]{5}/, msg: "message", code: "C2", return: false }   // false : 통과조건
            ],   
            order: 1000,
            increase: 10,
            value: "V1"
        });
        var item2 = item.clone();
        if (item2.entity.name === "T1" &&
            item2.type === "text" &&
            item2.size === 100 &&
            item2.default === "D1" &&
            item2.caption === "C1" &&
            item2.isNotNull === true &&
            item2.constraints.length === 2 &&
            item2.order === 1000 &&
            item2.increase === 10 &&
            item2.value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }


        console.log("-----------------------------------------------------------------");
        console.log("Item.getTypes() :: 타입 조회(상속) ");
        var item = new Item("i1");
        var types = item.getTypes();
        if (types.indexOf("Item") > -1 &&
            types[0] === "Item" && 
            types[1] === "MetaElement" && 
            types[2] === "MetaObject" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        //#################################################
        if (errorCount > 0) {
            console.warn("Error Sub SUM : %dEA", errorCount);    
        }
        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.Item = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));