/**
 * @namespace _W.Task.Row
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
        require("../src/object-implement"); // _implements() : 폴리필  
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
    
        console.log("---------------------------------------------------------------------------");
        console.log("new Row() :: 생성  ");
        console.log("new Row(entity) :: 생성 ");
        var table = new EntityTable("T1");
        table.items.addValue("i1", "V1");
        table.items.addValue("i2", "V2");
        var row = new Row();
        var row2 = new Row(table);
        table.rows.add(row);
        table.rows.add(row2);
        if (row.count === 0 &&
            row2.count > 0 &&
            table.rows[0].count === 0 &&
            table.rows[1].count > 0 &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("RowCollection.add(Row() :: 등록 ");
        var table = new EntityTable("T1");
        table.items.addValue("i1", "V1");
        table.items.addValue("i2", "V2");
        table.rows.add();
        if (table.rows[0].count === 2 &&
            table.rows[0]["i1"] === "" &&
            table.rows[0]["i2"] === "" &&
            table.rows[0]["i3"] !== "" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("RowCollection.add(Row(row) :: 등록 ");
        var table = new EntityTable("T1");
        table.items.addValue("i1", "V1");
        table.items.addValue("i2", "V2");
        var row = new Row(table);
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        if (table.rows[0].count === 2 &&
            table.rows[0]["i1"] === "R1" &&
            table.rows[0]["i2"] === "R2" &&
            table.rows[0]["i3"] !== "" &&
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
        global._W.Task.Row = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
