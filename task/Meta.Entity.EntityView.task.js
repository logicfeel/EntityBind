/**
 * @namespace _W.Task.EntityView
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
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        Row                     = require("../src/entity-row").Row;
        Item                    = require("../src/entity-item").Item;
        EntityView              = require("../src/entity-view").EntityView;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log("-----------------------------------------------------------------");
        console.log("clone() :: 복제 (일반 뷰) ");
        var view = new EntityView("T1");
        view.items.add("i1");
        view.items.add("i2");
        view.items["i2"].caption = "C1";
        var row = view.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        view.rows.add(row);
        var view2 = view.clone();
        if (view.name === "T1" && view.items.count === 2 && view.rows.count === 1 && 
            view.items["i2"].caption === "C1" &&
            view.rows[0]["i1"] === "R1" && view.rows[0]["i2"] === "R2" && 
            view2.name === "T1" && view2.items.count === 2 && view2.rows.count === 1 && 
            view2.items["i2"].caption === "C1" && 
            view2.rows[0]["i1"] === "R1" && view2.rows[0]["i2"] === "R2" ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log(" Item 참조 ");
        var view = new EntityView("T1");        // 일반 뷰
        view.items.add("i1");
        view.items.add("i2");
        view.items["i2"].caption = "C1";
        var row = view.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        view.rows.add(row);
        
        var view2 = new EntityView("T2", view); // 참조 뷰
        view2.items.add(view.items["i1"]);
        view2.items.add(view.items["i2"]);
        view2.items["i2"].caption = "C2";

        if (view.name === "T1" && view.items.count === 2 && view.rows.count === 1 && 
            view.items["i2"].caption === "C2" &&
            view.rows[0]["i1"] === "R1" && view.rows[0]["i2"] === "R2" && 
            view2.name === "T2" && view2.items.count === 2 && view2.rows.count === 0 && 
            view2.items["i2"].caption === "C2" ) {
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
        global._W.Task.EntityView = run();
    }

}(this));