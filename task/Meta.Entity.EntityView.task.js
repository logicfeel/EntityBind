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
    var isCallback = global.isCallback === false ? false : true;
        
    var Row;
    var Item;
    var EntityView;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("../src/object-implement"); // _implements() : 폴리필
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
    
        console.log("---------------------------------------------------------------------------");
        console.log("new EntityView(이름, baseEntity) :: Item 참조 (생성시) ");
        var view = new EntityView("T1");        // 일반 뷰
        view.items.add("i1");
        view.items.add("i2");
        view.items["i2"].caption = "C1";
        var row = view.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        view.rows.add(row);
        var view3 = new EntityView("T3");
        view3.items.addValue("i5","V5");
        var view2 = new EntityView("T2", view); // 참조 뷰
        view2.items.add(view.items["i1"]);
        view2.items.add("i2");                  // 기존에 있는 속성명
        view2.items.add("i3");                  // 신규 속성명
        view2.items.addValue("i4", "V4");       // 신규 속성명 + value
        view2.items.add("i5", view3.items);     // 참조로 등록
        view2.items["i2"].caption = "C2";
        view2.items["i3"].caption = "C3";

        if (view.name === "T1" && 
            view.items.count === 4 && 
            view.rows.count === 1 && 
            view.items["i2"].caption === "C2" && 
            view.items["i3"].caption === "C3" &&
            view.items["i4"].value === "V4" &&
            view.items._baseCollection === undefined &&
            view.items["i1"].entity.name === "T1" && 
            view.items["i2"].entity.name === "T1" &&
            view.rows[0]["i1"] === "R1" && 
            view.rows[0]["i2"] === "R2" && 
            view2._refEntities[0].name === "T1" &&                                              // 참조 등록 검사
            view2._refEntities[1].name === "T3" &&                                              // 참조 등록 검사
            view2.items["i2"].caption === "C2" && 
            view2.items["i3"].caption === "C3" &&
            view2.items["i4"].value === "V4" &&
            view2.items._baseCollection._onwer.name === "T1" &&
            view2.name === "T2" && 
            view2.items.count === 5 && 
            view2.rows.count === 0 && 
            view2.items["i1"].entity.name === "T1" && 
            view2.items["i2"].entity.name === "T1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("EntityView.clone() :: 복제 (일반 뷰) ");
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

        console.log("---------------------------------------------------------------------------");
        console.log("EntityView.getTypes() :: 타입 조회(상속) ");
        var table = new EntityView("T1");
        var types = table.getTypes();
        if (types.indexOf("EntityView") > -1 &&
            types[0] === "EntityView" && 
            types[1] === "Entity" && 
            types[2] === "MetaElement" && 
            types[3] === "MetaObject" &&
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
        global._W.Task.EntityView = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));