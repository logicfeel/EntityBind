

var util = require("./src/utils");



var AAA = require("./test_muti_inherits").AAA;
var BBB = require("./test_muti_inherits").BBB;
var CCC = require("./test_muti_inherits").CCC;

var c = new CCC();


c.a1();
c._a2();

c.c1();

var b = new BBB();
b.b1();

var a = new AAA();
a.a1();
a._a2();

console.log("END");