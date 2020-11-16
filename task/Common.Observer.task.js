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

    if (typeof module === "object" && typeof module.exports === "object") {     
        Observer                 = require("../src/observer");
    } else {
        Observer                 = global._W.Task.Observer;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        var errorCount = 0;

        function EventTest() {
        
            this.__event    = new Observer(this, this);
        
            /** @property 등록 */
            Object.defineProperty(this, "onLoad", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "load");
                }
            });
            /** @property */
            Object.defineProperty(this, "onClear", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "clear");
                }
            });    
        }
        /** @event 발생 */
        EventTest.prototype._onLoad = function() {
            this.__event.publish("load"); 
        };
        /** @event */
        EventTest.prototype._onClear = function() {
            this.__event.publish("clear"); 
        };

        
        var result = [];        // 결과 확인 **사용시 초기화

        //===============================================
        // 이벤트 발생
        var e = new EventTest();
        e.onLoad = function() { 
            console.log(" onLoad ~~");
            result.push("onLoad");  // 결과 등록
        };

        var event2 = function() { 
            console.log(" onClear ~~"); 
            result.push("onClear");  // 결과 등록
        };
        e.onClear = event2;

        console.log("---------------------------------------");
        console.log("이벤트 발생 :: 익명함수");
        result = [];
        e._onLoad(); // 테스크
        if (result.indexOf("onLoad") > -1 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        console.log("---------------------------------------");
        console.log("이벤트 발생 :: 지정함수");
        result = [];
        e._onClear(); // 테스크
        if (result.indexOf("onClear") > 0 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("지정이벤트의 지정 함수 해지후 이벤트 발생");
        e.__event.unsubscribe('load');               // 작동안함 : 맞는것임
        e.__event.unsubscribe(event2, 'clear');      // 지정 이벤트만 제거
        e._onLoad(); // 발생
        e._onClear(); // 발생

        console.log("---------------------------------------");
        console.log("지정이벤트의 모든 함수 제거후  이벤트 발생");
        e.onClear = event2;                          // 테스트를 위해 재등록
        e.__event.unsubscribeAll("clear");
        e._onLoad(); // 발생
        e._onClear(); // 발생


        console.log("---------------------------------------");
        console.log("전체이벤트 해지후 이벤트 발생");
        e.onClear = event2;                  // 테스트를 위해 재등록
        e.__event.unsubscribeAll();
        e._onLoad(); // 발생
        e._onClear(); // 발생


        console.log("---------------------------------------");
        console.log("멀티모드(기본)");

        var event22 = function() {console.log(" onLoad22()~~"); };
        e.onClear = event2;
        e.onClear = event22;
        e._onClear(); // 발생

        console.log("싱글모드");
        e.__event.isMultiMode = false;
        e.__event.unsubscribeAll();
        e.onClear = event2;
        e.onClear = event22;
        e.onClear = event2;
        e._onClear(); // 발생    

        // errorCount = 10;
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