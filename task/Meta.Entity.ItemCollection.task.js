/**
 * @namespace _W.Task.ItemCollection
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
        console.log("ItemTableCollection.add(name) :: 아이템 추가 (name) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        if (table.items.count === 2) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("ItemTableCollection.add(item) :: 아이템 추가 (item) ");
        var table = new EntityTable("T1");
        table.items.add(new Item("i1"));
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var table2 = new EntityTable("T2");
        table2.items.add(table.items["i2"]);
        table.items["i2"].caption = "C2";
        if (table.items.count === 2 &&
            table.items["i2"].caption === "C2" &&       // caption 변경함
            table.items["i2"].entity.name === "T1" &&
            table2.items.count === 1 && 
            table2.items["i2"].caption === "C1" &&       // caption 변경함
            table2.items["i2"].entity.name === "T2"
            ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("ItemTableCollection.addValue(name, value) :: 속성명 + 값 추가 (name) ");
        var table = new EntityTable("T1");
        table.items.addValue("i1", "V1");
        table.items.addValue("i2", "V2");
        if (table.items.count === 2 &&
            table.items["i1"].value === "V1" &&
            table.items["i2"].value === "V2"
            ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("new ItemViewCollection(onwer) :: 독립형 생성 ");

        console.log("-----------------------------------------------------------------");
        console.log("new ItemViewCollection(onwer, baseCollection) :: 참조형 생성 ");

        console.log("-----------------------------------------------------------------");
        console.log("ItemViewCollection.add(name) :: 뷰 아이템 추가, 독립적 (name) ");

        console.log("-----------------------------------------------------------------");
        console.log("ItemViewCollection.add(item) :: 뷰 아이템 추가, 독립적 (item) ");

        console.log("-----------------------------------------------------------------");
        console.log("ItemViewCollection.addValue(name, value) :: 속성명 + 값 추가 (name) ");

        console.log("-----------------------------------------------------------------");
        console.log("ItemViewCollection.addEntity(entity) :: 엔티티 전체 추가 ");

        
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
        global._W.Task.ItemCollection = run();
    }

}(this));