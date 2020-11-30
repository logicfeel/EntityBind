/**
 * @namespace _W.Task
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Task           = global._W.Task || {};
    
    //==============================================================
    // 2. 변수 선언
    var errorCount = 0;
    var tasks = [];  //{ns:..., file:.... }
    var result, task;
    var CLEAR;
    // CLEAR = true;   // 단순 로그

    //==============================================================
    // 3. 모듈 등록
    tasks.push({ns: "_W.Task.Observer"              , file: "./Common.Observer.task.js"});
    tasks.push({ns: "_W.Task.ArrayCollection"       , file: "./Collection.ArrayCollection.task.js"});
    tasks.push({ns: "_W.Task.PropertyCollection"    , file: "./Collection.PropertyCollection.task.js"});
    tasks.push({ns: "_W.Task.EntityTable"           , file: "./Meta.Entity.EntityTable.task.js"});
    tasks.push({ns: "_W.Task.EntityView"            , file: "./Meta.Entity.EntityView.task.js"});
    
    // tasks.push({ns: "_W.Task.Object_implement"      , file: "./Common.Object.implement.task.js"});


    //==============================================================
    // 4. 테스트 본문 :: run()
    function run() {
        

        for (var i = 0; i < tasks.length; i++) {
            task = typeof module === "object" ?  tasks[i].file : tasks[i].ns;
            console.log("=================================================================");
            console.log("단위 테스트 %s : %s", i, task);
            

            if (typeof module === "object" && typeof module.exports === "object") {     
                task = tasks[i].file;
                tasks[i].result = require(tasks[i].file);
            } else {
                task = tasks[i].ns;
                tasks[i].result = eval(tasks[i].ns);
            }

        }
        
        if (CLEAR) console.clear();

        console.log("*****************************************************************");
        console.log("통합 테스트 결과");
        console.log("*****************************************************************");
        for (var i = 0; i < tasks.length; i++) {            

            task = typeof module === "object" ?  tasks[i].file : tasks[i].ns;

            if (tasks[i].result === 0) {
                console.log("No: %s, Task: %s = Success", i, task);
            } else {
                console.warn("No: %s, Task : %s = Warning, ERR_COUNT = %s ", i, task, tasks[i].result);
                errorCount++;
            }
            console.log("_________________________________________________________________");
        }

        return errorCount;
    }
    
    //==============================================================
    // 5. 결과 : 에러 카운터 ('0'이면 정상)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.errorCount = run();
    }

}(this));