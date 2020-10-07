/// <reference no-default-lib="true" />

/// <reference path="./@types/test_muti_inherits.d.ts" />

(function(global) {

"use strict";
// const { ModuleKind } = require("typescript");

var util = require("./src/utils");





// import * as util from './src/utils';

// <reference no-default-lib="false"/>




//////////////////////////
var BBB  = (function (_super) {
    
    function BBB() {
    }

    BBB.prototype.b1 = function(name) {
        console.log("a1 메소드");
    };

    return BBB;
}());

// var BBB = function () {
// }
// BBB.prototype.b1 = function(name) {
//     //throw new Error("구현");
// };

//////////////////////////
var AAA  = (function (_super) {
    
    function AAA() {
    }

    AAA.prototype.a1 = function(name) {
        //throw new Error("구현");
        console.log("a1 메소드");
    };
    
    AAA.prototype._a1 = function(name) {
        //throw new Error("구현");
        console.log("_a1 메소드");
    };

    AAA.prototype._a2 = function(name) {
        //throw new Error("구현");
        console.log("_a2 메소드");
    };

    return AAA;
}());

// var AAA = function AAA() {
// }
// AAA.prototype.a1 = function(name) {
//     //throw new Error("구현");
//     console.log("a1 메소드");
// };

// AAA.prototype._a1 = function(name) {
//     //throw new Error("구현");
//     console.log("_a1 메소드");
// };
// AAA.prototype._a2 = function(name) {
//     //throw new Error("구현");
//     console.log("_a2 메소드");
// };



//////////////////////////
var CCC  = (function (_super) {
    
    function CCC() {
        _super.call(this);
    }
    util.inherits(CCC, _super);     // 상속(대상, 부모)    
    CCC.prototype.c1  = function(p_name) {
        console.log("c1 메소드");
    };

    return CCC;
}(AAA));
// var CCC = function() {
//     AAA.call(this);
// }
// util.inherits(CCC, AAA);


// CCC.prototype.c1 = function(name) {
//     console.log("CCCC 메소드");
// };


var c = new CCC();

var CCC;

c.c1();
c.a1(); // 인텔리센스 안됨

///////////////////////////
var a = new AAA();

a.a1();

a._a1();
a._a2();

var b = new BBB();

b.b1();

// console.log("-END-");

module.exports = {
    AAA: AAA, 
    BBB: BBB, 
    CCC: CCC
};
// module.exports = AAA;


}(this));