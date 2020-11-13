/**
 * @namespace _W.Task.Observer
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
    
    var Observer;
    // var IObject;

    if (typeof module === "object" && typeof module.exports === "object") {     
    // require("./object-implement"); // _implements() : 폴리필
    // 
        Observer                 = require("../src/observer");
    //     IObject              = require("");
    } else {
        Observer                 = global._W.Task.Observer;
    //     IObject              = global._W.Common.IObject;
    }

    //==============================================================
    // 3. 테스트
    function run() {

        var errorCount = 0;

        function EventTest() {
        
            this.__event    = new Observer(this, this);
        
            /** @property 등록 */
            Object.defineProperty(this, "onExecute", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "execute");
                }
            });
            /** @property */
            Object.defineProperty(this, "onExecuted", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "executed");
                }
            });    
        }
        /** @event 발생 */
        EventTest.prototype._onExecute = function() {
            this.__event.publish("execute"); 
        };
        /** @event */
        EventTest.prototype._onExecuted = function() {
            this.__event.publish("executed"); 
        };

        //===============================================
        // 이벤트 발생
        var e = new EventTest();
        e.onExecute = function() {console.log(" onExecute()~~"); };

        var event2 = function() {console.log(" onExecute2()~~"); };
        e.onExecuted = event2;

        console.log("---------------------------------------");
        console.log("이벤트 발생");
        e._onExecute(); // 발생
        e._onExecuted(); // 발생

        console.log("---------------------------------------");
        console.log("지정이벤트의 지정 함수 해지후 이벤트 발생");
        e.__event.unsubscribe('execute');               // 작동안함 : 맞는것임
        e.__event.unsubscribe(event2, 'executed');      // 지정 이벤트만 제거
        e._onExecute(); // 발생
        e._onExecuted(); // 발생

        console.log("---------------------------------------");
        console.log("지정이벤트의 모든 함수 제거후  이벤트 발생");
        e.onExecuted = event2;                          // 테스트를 위해 재등록
        e.__event.unsubscribeAll("executed");
        e._onExecute(); // 발생
        e._onExecuted(); // 발생


        console.log("---------------------------------------");
        console.log("전체이벤트 해지후 이벤트 발생");
        e.onExecuted = event2;                  // 테스트를 위해 재등록
        e.__event.unsubscribeAll();
        e._onExecute(); // 발생
        e._onExecuted(); // 발생


        console.log("---------------------------------------");
        console.log("멀티모드(기본)");

        var event22 = function() {console.log(" onExecute22()~~"); };
        e.onExecuted = event2;
        e.onExecuted = event22;
        e._onExecuted(); // 발생

        console.log("싱글모드");
        e.__event.isMultiMode = false;
        e.__event.unsubscribeAll();
        e.onExecuted = event2;
        e.onExecuted = event22;
        e.onExecuted = event2;
        e._onExecuted(); // 발생    

        errorCount = 10;
        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.Observer = run();
    }

}(this));