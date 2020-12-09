/**
 * 모듈 테스트
 */
//===============================================
// 선언
var BindModelRead           = require("../src/bind-model-read");
var ItemCollection          = require("../src/entity-item").ItemCollection;
var Item                    = require("../src/entity-item").Item;

//===============================================
// 본문 1

var e = new BindModelRead();


//===============================================
// 테스크 1
console.log("---------------------------------------------------------------------------");
console.log("e.read.add(new Item('ITEM1'));");
e.read.add(new Item("ITEM1"));  // 전체추가
console.log("e.first.items.count        1 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   1 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    1 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("e.read.view.items.add(new Item('ITEM2'));");
e.read.view.items.add(new Item("ITEM2"));  // view 추가
console.log("e.first.items.count        2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   1 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("e.read.valid.items.add(e.first.items['ITEM2']);");
e.read.valid.items.add(e.first.items["ITEM2"]);  // valid 참조 추가
console.log("e.first.items.count        2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   2 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("e.read.valid.items.add(e.first.items['ITEM2']);");
e.read.bind.items.add(new Item("ITEM2"));  // bind 참조 추가
console.log("e.first.items.count        2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   2 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("e.first.items.add(new Item('ITEM3'));");
e.first.items.add(new Item("ITEM3"));  // 엔티티에 추가
console.log("e.first.items.count        3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   2 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("e.first.items.add(new Item('ITEM3'));");
e.first.items.add(new Item("ITEM3"));  // 엔티티에 추가 (중복)
console.log("e.first.items.count        3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   2 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("e.read.valid.items.add(e.first.items['ITEM2']);");
e.read.bind.items.add(new Item("ITEM2"));  // bind 참조 추가 (중복)
console.log("e.first.items.count        3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   2 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록
console.log("e.first.items.count        4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   3 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록 (중복)
console.log("e.first.items.count        4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   3 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);

console.log("---------------------------------------------------------------------------");
console.log("new Item('ITEM4'),['bind', 'xxx']);");
e.read.add(new Item("ITEM4"),["bbb", "xxx"]);  // 지정명칭 :: 오류발생
console.log("e.first.items.count        4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count    3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count   3 ==> " + e.read.valid.items.count);
console.log("e.read.view.items.count    2 ==> " + e.read.view.items.count);


console.log("-End-");