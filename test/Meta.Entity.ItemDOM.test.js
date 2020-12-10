/**
 * @namespace _W.Test.ItemDOM
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Test           = global._W.Test || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCount = 0;
    var result = [];        // 결과 확인 **사용시 초기화    
    var isCallback = global.isCallback === false ? false : true;
        
    var Row;
    var ItemDOM;
    var EntityView;
    var EntityTable;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("../src/object-implement"); // _implements() : 폴리필
        Row                     = require("../src/entity-row").Row;
        ItemDOM                 = require("../src/entity-item-dom");
        EntityView              = require("../src/entity-view").EntityView;
        EntityTable             = require("../src/entity-table").EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        ItemDOM                    = global._W.Meta.Entity.ItemDOM;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log("---------------------------------------------------------------------------");
        console.log("clone() :: 복제 ");
        var table = new EntityTable("T1");
        var item = new ItemDOM("i1", table, {
            // Item 속성
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
            value: "V1",
            // ItemDOM 속성
            domType: { value: true },
            isReadOnly: true,
            isHide: true,
            element: { value: true }
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
            item2.domType.value === true &&
            item2.isReadOnly === true &&
            item2.isHide === true &&
            item2.element.value === true &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        console.log("---------------------------------------------------------------------------");
        console.log("getTypes() :: 타입 조회(상속) ");
        var item = new ItemDOM("i1");
        var types = item.getTypes();
        if (types.indexOf("ItemDOM") > -1 &&
            types[0] === "ItemDOM" &&
            types[1] === "Item" && 
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
        global._W.Test.ItemDOM = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
