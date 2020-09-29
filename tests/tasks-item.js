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


var i = new Item();

//===============================================
// 테스크

entity.items.add("abc", i);
entity.items.add("abc");

console.log("entity.count 2 ==> " + entity.items.count);

// 경고 발생
entity.items.add("abc", 12);

// 에러 발생
// entity.items.add();


console.log("-End-");