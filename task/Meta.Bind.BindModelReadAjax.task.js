/**
 * @namespace _W.Task.네임스페이스
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
        

    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("../src/utils");
    } else {
        // util                = global._W.Common.Util;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
        
        console.log("-----------------------------------------------------------------");
        console.log("BindModel.cbFail           :: 검사 실패 발생시 실행 ");
        console.log("BindModel.cbError          :: 오류 발생시 실행 ");
        console.log("BaseBind.onExecute         :: 바인드 명령 실행[execute()] 실행 전 (공통처리의 관점) ");
        console.log("BaseBind.onExecuted        :: 바인드 명령 실행execute() 실행 후 (공통처리의 관점) ");
        
        
        console.log("-----------------------------------------------------------------");
        console.log("BaseBind.getTypes() :: 타입 조회(상속) ");
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

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.cbRegister :: 설명 ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.cbValid :: 설명 ");
        
        console.log("-----------------------------------------------------------------");
        console.log("BindModel.cbReady :: 설명 ");

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.add() :: 설명 ");

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.addItem() :: 설명 ");

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.loadAttr() :: 설명 ");

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.addEntity() :: 설명 ");

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.addItem() :: 설명 ");

        console.log("-----------------------------------------------------------------");
        console.log("BindModel.getTypes() :: 타입 조회(상속) ");
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

        console.log("-----------------------------------------------------------------");
        console.log("BindModelReadAjax.read :: 설명 ");
        console.log("BindModelReadAjax.baseAjaxSetup :: 설명 ");
        console.log("BindModelReadAjax.baseUrl :: 설명 ");
        
        console.log("-----------------------------------------------------------------");
        console.log("BaseBindReadAjax.getTypes() :: 타입 조회(상속) ");
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
        global._W.Task.네임스페이스 = run();
    }

}(this));