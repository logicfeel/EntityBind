/**
 * 모듈 테스트
 */
//===============================================
// 선언
var BindCommandView         = require("../src/bind-cmd-view");
var ItemCollection          = require("../src/item").ItemCollection;
var Item                    = require("../src/item").Item;

//===============================================
// 본문 1

function Entity() {
    
    this.entity = {
        items: new ItemCollection(this)
    };
    
    this.read = new BindCommandView(this, this.entity.items);
}

var e = new Entity();

//===============================================
// 테스크 1
console.log("---------------------------------------");
console.log("e.read.add(new Item('ITEM1'));");
e.read.add(new Item("ITEM1"));  // 전체추가
console.log("e.entity.items.count   1 ==> " + e.entity.items.count);
console.log("e.read.bind.count      1 ==> " + e.read.bind.count);
console.log("e.read.valid.count     1 ==> " + e.read.valid.count);
console.log("e.read.view.count      1 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("e.read.view.add(new Item('ITEM2'));");
e.read.view.add(new Item("ITEM2"));  // view 추가
console.log("e.entity.items.count   2 ==> " + e.entity.items.count);
console.log("e.read.bind.count      1 ==> " + e.read.bind.count);
console.log("e.read.valid.count     1 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("e.read.valid.add(e.entity.items['ITEM2']);");
e.read.valid.add(e.entity.items["ITEM2"]);  // valid 참조 추가
console.log("e.entity.items.count   2 ==> " + e.entity.items.count);
console.log("e.read.bind.count      1 ==> " + e.read.bind.count);
console.log("e.read.valid.count     2 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("e.read.valid.add(e.entity.items['ITEM2']);");
e.read.bind.add(new Item("ITEM2"));  // bind 참조 추가
console.log("e.entity.items.count   2 ==> " + e.entity.items.count);
console.log("e.read.bind.count      2 ==> " + e.read.bind.count);
console.log("e.read.valid.count     2 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("e.entity.items.add(new Item('ITEM3'));");
e.entity.items.add(new Item("ITEM3"));  // 엔티티에 추가
console.log("e.entity.items.count   3 ==> " + e.entity.items.count);
console.log("e.read.bind.count      2 ==> " + e.read.bind.count);
console.log("e.read.valid.count     2 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("e.entity.items.add(new Item('ITEM3'));");
e.entity.items.add(new Item("ITEM3"));  // 엔티티에 추가 (중복)
console.log("e.entity.items.count   3 ==> " + e.entity.items.count);
console.log("e.read.bind.count      2 ==> " + e.read.bind.count);
console.log("e.read.valid.count     2 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("e.read.valid.add(e.entity.items['ITEM2']);");
e.read.bind.add(new Item("ITEM2"));  // bind 참조 추가 (중복)
console.log("e.entity.items.count   3 ==> " + e.entity.items.count);
console.log("e.read.bind.count      2 ==> " + e.read.bind.count);
console.log("e.read.valid.count     2 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록
console.log("e.entity.items.count   4 ==> " + e.entity.items.count);
console.log("e.read.bind.count      3 ==> " + e.read.bind.count);
console.log("e.read.valid.count     3 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록 (중복)
console.log("e.entity.items.count   4 ==> " + e.entity.items.count);
console.log("e.read.bind.count      3 ==> " + e.read.bind.count);
console.log("e.read.valid.count     3 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);

console.log("---------------------------------------");
console.log("new Item('ITEM4'),['bind', 'xxx']);");
e.read.add(new Item("ITEM4"),["bbb", "xxx"]);  // 지정명칭 :: 오류발생
console.log("e.entity.items.count   4 ==> " + e.entity.items.count);
console.log("e.read.bind.count      3 ==> " + e.read.bind.count);
console.log("e.read.valid.count     3 ==> " + e.read.valid.count);
console.log("e.read.view.count      2 ==> " + e.read.view.count);


console.log("-End-");