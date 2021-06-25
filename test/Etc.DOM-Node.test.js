/**
 * @namespace _W.Test.DOM_Node
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Test          = global._W.Test || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCount = 0; 
    var result = [];        // 결과 확인 **사용시 초기화        

    var Observer;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("../src/object-implement"); // _implements() : 폴리필
        Observer                 = require("../src/observer");
    } else {
        Observer                 = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");

    //==============================================================
    // 4. 모듈 구현
    function run() {
        var eventObj = {
            id: "OBJ",
            title: "이벤트 바인딩객체"
        };

        function EventTest() {
        
            this.__event    = new Observer(this, eventObj);
            
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
        EventTest.prototype._onParam = function(param1, param2) {
            this.__event.publish("param", param1, param2);
        };

        result = [];
        var e = new EventTest();
        e.onParam = function(p1, p2) { 
            console.log("---------------------------------------------------------------------------");
            console.log("call onParam(p1='%s', p2='%s') ", p1, p2);
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

        //#################################################
        if (errorCount > 0) {
            console.warn("Error Sub SUM : %dEA", errorCount);    
        } else {
            console.log("===========================================================================");
            console.log("단위 테스트 : OK");
        }
        
        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();;
    } else {
        global._W.Test.DOM_Node = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));