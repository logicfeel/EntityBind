
var util = require("../src/utils");
var BC = require("../src/base-collections");

// 전역으로 로딩후 테스트
global.util = util;
global.ArrayCollection = BC.ArrayCollection;
global.PropertyCollection = BC.PropertyCollection;


var run = require("./test-collection-inner");

console.log("-End-");



