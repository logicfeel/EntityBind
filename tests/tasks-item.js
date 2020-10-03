/**
 * 모듈 테스트
 */
//===============================================
// 선언
var item                = require("../src/item");
var Item                = item.Item;
var ItemCollection      = item.ItemCollection;
var ItemRefCollection   = item.ItemRefCollection;

//===============================================
// 본문 1
function TestEntity() {
    this.items = new ItemCollection();
}

var entity = new TestEntity();

var i = new Item("del_yn");



//===============================================
// 테스크 1

entity.items.add("aaa", i);
entity.items.add("bbb");

console.log("entity.count 2 ==> " + entity.items.count);

// 경고 발생
entity.items.add("ccc", 12);

console.log("entity.items['aaa'].name  del_yn ==> " + entity.items["aaa"].name);

console.log(entity.items["aaa"].getObject());
// 에러 발생
// entity.items.add();

//===============================================
// 본문 2
function Entity() {
    this.items = new ItemCollection(this);
}

var e = new Entity();
var i1 = new Item("BBB");
var i2 = new Item("CCC");

//===============================================
// 테스크 2
e.items.add("AAA");
e.items.add(i1);
e.items.add(i2);
console.log("e.items.count      3 ==> " + e.items.count);

// e.items.add(11);    // 오류발생 : 등록타입 다름 에러발생
// e.items["BBB"] = "AA";  // 오류발생 : 입력 타입 다름

//===============================================
// 본문 3

function EntityRef() {
    this.items = new ItemRefCollection(this, e.items);
}

function Entity3() {
    this.items = new ItemCollection(this);
}

function EntityRef4() {
    this.items = new ItemRefCollection(this);
}

var e2 = new EntityRef();
var e3 = new Entity3();
var e4 = new EntityRef4();

//===============================================
// 테스크 3
e2.items.add("AAA");
console.log("e.items.count      3 ==> " + e.items.count);

e2.items.add("DDD");
console.log("e.items.count      4 ==> " + e.items.count);

e2.items.add(new Item("EEE"));
console.log("e.items.count      5 ==> " + e.items.count);
console.log("e2.items.count     3 ==> " + e2.items.count);

e2.items.add(new Item("FFF"), e3.items);
console.log("e.items.count      5 ==> " + e.items.count);
console.log("e2.items.count     4 ==> " + e2.items.count);
console.log("e3.items.count     1 ==> " + e3.items.count);

e4.items.add(new Item("GGG"));
console.log("e4.items.count     1 ==> " + e4.items.count);

console.log("-End-");