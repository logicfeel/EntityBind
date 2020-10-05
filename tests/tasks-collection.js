
var util = require("../src/utils");
var ArrayCollection = require("../src/collection-array");
var PropertyCollection = require("../src/collection-property");

// 전역으로 로딩후 테스트
global.Util = util;
global.ArrayCollection = ArrayCollection;
global.PropertyCollection = PropertyCollection;


var run = require("./inner-collection");



var arr  = [];

arr[0] = 100;
arr[1] = 200;


console.log("-End-");



