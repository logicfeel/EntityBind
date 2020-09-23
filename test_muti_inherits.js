/// <reference path="./test_muti_inherits.d.ts" />


var util = require("./src/utils");

// import * as util from './src/utils';

// <reference no-default-lib="false"/>

// "use strict";



function AAA() {
}

/**
 * adsfasfsaf
 * @param {*} name 
 */
AAA.prototype.a1 = function(name) {
    //throw new Error("구현");
    console.log("AAA 메소드");
};


function BBB() {
}

BBB.prototype.b1 = function() {
    throw new Error("구현");
};

/// var CCC;
function CCC() {
    AAA.call(this);
}
util.inherits(CCC, AAA);


CCC.prototype.c1 = function() {
    console.log("CCCC 메소드");
};


var c = new CCC();

var CCC;

c.c1();
c.a1(); // 인텔리센스 안됨

///////////////////////////
var a = new AAA();

a.a1();



console.log("-END-");