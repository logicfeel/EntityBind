
var Util = require("../src/utils");
var BC = require("../src/base-collections");

// 전역으로 로딩후 테스트
global.Util = Util;
global.ArrayCollection = BC.ArrayCollection;
global.PropertyCollection = BC.PropertyCollection;


var run = require("./inner-collection");

console.log("-End-");


