/**
 * 모듈 테스트
 */
//===============================================
// 선언
var Item                = require("../src/item");
var ItemCollection      = require("../src/item").ItemCollection;
var ItemRefCollection   = require("../src/item").ItemRefCollection;

//===============================================
// 본문
function TestEntity() {
    this.items = new ItemCollection();
}

var entity = new TestEntity();


var i = new Item("del_yn");

//===============================================
// 테스크

entity.items.add("aaa", i);
entity.items.add("bbb");

console.log("entity.count 2 ==> " + entity.items.count);

// 경고 발생
entity.items.add("ccc", 12);

console.log("entity.items['aaa'].name  del_yn ==> " + entity.items["aaa"].name);

console.log(entity.items["aaa"].getObject());
// 에러 발생
// entity.items.add();


console.log("-End-");