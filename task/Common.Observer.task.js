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
    var result = [];        // 결과 확인 **사용시 초기화    
    
    var Observer;

    if (typeof module === "object" && typeof module.exports === "object") {     
        Observer                 = require("../src/observer");
    } else {
        Observer                 = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        var eventObj = {
            id: "OBJ",
            title: "이벤트 바인딩객체"
        };

        function EventTest() {
        
            this.__event    = new Observer(eventObj, this);
            
            this.id = "Class";

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
            /** @property */
            Object.defineProperty(this, "onParam", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "param");
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

        EventTest.prototype._onParam = function(param1, param2) {
            this.__event.publish("param", param1, param2);
        };

        


        //===============================================
        // 이벤트 발생
        var e = new EventTest();

        var event2 = function() { 
            console.log(" onClear ~~"); 
            result.push("onClear");  // Result 등록
        };

        var event3 = function() { 
            console.log(" onClear ~~"); 
            result.push("onClear");  // Result 등록
        };



        console.log("-----------------------------------------------------------------");
        console.log("onLoad, _onLoad() :: 속성과 메소드 추가로 이벤트  커스텀, 익명함수");
        result = [];
        var e = new EventTest();
        e.onLoad = function() { 
            console.log(" onLoad ~~");
            result.push("onLoad");  // Result 등록
        };
        e._onLoad(); // 테스크
        if (result.indexOf("onLoad") > -1 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        console.log("-----------------------------------------------------------------");
        console.log("onLoad, _onLoad() :: 속성과 메소드 추가로 이벤트  커스텀, 지정함수");
        result = [];
        var e = new EventTest();
        e.onClear = event2;
        e._onClear(); // 테스크
        if (result.indexOf("onClear") > -1 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        console.log("-----------------------------------------------------------------");
        console.log("subscribe(fn, 'code') :: 지역(code) 등록");
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2, 'code');
        e.__event.publish('code');
        if (result.indexOf("onClear") > -1 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("unsubscribe(fn, 'code') :: 지역(code) 해지");
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2, 'code');
        e.__event.unsubscribe(event2, 'code');
        e.__event.publish('code');
        if (result.indexOf("onClear") < 0 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("subscribe(fn) :: 전역 구독");
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2);
        e.__event.publish();
        if (result.indexOf("onClear") > -1 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("unsubscribe(fn) :: 전역 구독 해지");
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2);
        e.__event.unsubscribe(event2);
        e.__event.publish();
        if (result.indexOf("onClear") < 0 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("unsubscribeAll() :: 전역, 지역(code) 전체 해지");
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2);            // 전역
        e.__event.subscribe(event2, 'code');    // 지역
        e.__event.unsubscribeAll();
        e.__event.publish();
        e.__event.publish('code');
        if (result.indexOf("onClear") < 0 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("unsubscribeAll('code') :: 지역(code) 전체 해지");
        result = [];
        var e = new EventTest();
        e.__event.subscribe(event2, 'code');    // 지역
        e.__event.subscribe(event3, 'code');    // 지역
        e.__event.unsubscribeAll('code');
        e.__event.publish('code');
        if (result.indexOf("onClear") < 0 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("isMultiMode = false :: 싱글 구독 모드");
        result = [];
        var e = new EventTest();
        e.__event.isMultiMode = false;
        e.__event.subscribe(event2, 'code');    // 지역
        e.__event.subscribe(event3, 'code');    // 지역
        e.__event.publish('code');
        if (result.length == 1 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("_onParam(p1, p2) => publish(p1, p2) 시점에 파라메터 처리 ");
        result = [];
        var e = new EventTest();
        e.onParam = function(p1, p2) { 
            console.log(" onParam ~~");
            result.push(p1);  // Result 등록
            result.push(p2);  // Result 등록
            result.push(this.id);  // Result 등록
        };
        e._onParam("P1", "P2"); // 테스크
        if (result.indexOf("P1") > -1 && 
            result.indexOf("P2") > -1 && 
            result.indexOf("OBJ") > -1 &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("TODO:: isDebug 필요성 여부");

        console.log("-----------------------------------------------------------------");
        console.log("TODO:: propagation = false :: 이벤트 전파 금지??");
        
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
        global._W.Task.Observer = run();
    }

}(this));