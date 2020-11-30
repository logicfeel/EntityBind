/**
 * @namespace _W.Task.implement
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
    var util;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("../src/object-implement"); // _implements() : 폴리필

        util                = require("../src/utils");
    } else {
        util                = global._W.Common.Util;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        function IDog () {
            this.member = null;
        }
        IDog.prototype.getSound = function() {
        };
        // IDog.prototype.setSound = function() {
        // };

        function IPat () {
            this.love = null;
        }

        function Animal() {
            
            this.member = "Success";

            this._implements(IDog);      // 인터페이스 구현함
        }
        Animal.prototype.getSound  = function() {
            return "Success";
        };

        console.log("-----------------------------------------------------------------");
        console.log("this._implements(interface) :: 인터페이스 선언, 기본");
        var a = new Animal();
        if (a.getSound() === "Success" && a.member === "Success") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("-----------------------------------------------------------------");
        console.log("this._implements(interface) :: 인터페이스 선언, 다중선언");

        console.log("-----------------------------------------------------------------");
        console.log("this._implements(interface) :: 인터페이스 상속");

        console.log("-----------------------------------------------------------------");
        console.log("this._implements(interface) :: 인터페이스 상속 + 선언");

        console.log("-----------------------------------------------------------------");
        console.log("Object.isImplementOf(interface) :: 인터페이스 타입 검사");

        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.Object_implement = run();
    }

}(this));    