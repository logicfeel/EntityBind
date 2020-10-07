/**
 * 모듈 테스트
 */
//===============================================
// 선언
var BindCommandRead         = require("../src/bind-command-read");
// var ItemCollection          = require("../src/entity-item").ItemCollection;
var Item                    = require("../src/entity-item").Item;
var util                    = require("../src/utils");
var BindModel               = require("../src/bind-model");
var EntityTable             = require("../src/entity-table").EntityTable;
//===============================================
// 본문 1

function TestBindModel() {
    
    this.first = new EntityTable("first");
    
    this.read = new BindCommandRead(this, this.first);
}
util.inherits(TestBindModel, BindModel)

var e = new TestBindModel();

//===============================================
// 테스크 1
console.log("---------------------------------------");
console.log("e.read.add(new Item('ITEM1'));");
e.read.add(new Item("ITEM1"));  // 전체추가
console.log("e.first.items.count            1 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       1 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  1 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("e.read.view.item.add(new Item('ITEM2'));");
e.read._output[0].items.add(new Item("ITEM2"));  // view 추가
console.log("e.first.items.count            2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       1 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("e.read.valid.add(e.first.items['ITEM2']);");
e.read.valid.items.add(e.first.items["ITEM2"]);  // valid 참조 추가
console.log("e.first.items.count            2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("e.read.valid.add(e.first.items['ITEM2']);");
e.read.bind.items.add(new Item("ITEM2"));  // bind 참조 추가
console.log("e.first.items.count            2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("e.first.items.add(new Item('ITEM3'));");
e.first.items.add(new Item("ITEM3"));  // 엔티티에 추가
console.log("e.first.items.count            3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("e.first.items.add(new Item('ITEM3')); //  중복 발생");
e.first.items.add(new Item("ITEM3"));  // 엔티티에 추가 (중복)
console.log("e.first.items.count            3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("e.read.valid.add(e.first.items['ITEM2']); // 중복 발생");
e.read.bind.items.add(new Item("ITEM2"));  // bind 참조 추가 (중복)
console.log("e.first.items.count            3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록
console.log("e.first.items.count            4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);  // 중복 발생");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록 (중복)
console.log("e.first.items.count            4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("new Item('ITEM4'),['bbb', 'xxx']);     // 오류 발생");
e.read.add(new Item("ITEM4"),["bbb", "xxx"]);  // 지정명칭 :: 오류발생
console.log("e.first.items.count            4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
console.log("e.read.bind.items.add(new Item('ITEM5'));");
e.read.bind.items.add(new Item("ITEM5"));  // 엔티티에 추가
console.log("e.first.items.count            5 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        4 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("---------------------------------------");
e.read.execute();
console.log("*************");
console.log("first.items");
for(var i = 0; i < e.first.items.count; i++) {
    console.log("first : " + e.first.items[i].name);
}

console.log("IObject            true    ==> " + e.first.items[0].instanceOf("IObject")  );
console.log("Item               타입들   ==> " + e.first.items[0].getTypes()  );
console.log("BindCommandRead    타입들   ==> " + e.read.getTypes()  );

console.log(e.prototype)

console.log("-End-");

