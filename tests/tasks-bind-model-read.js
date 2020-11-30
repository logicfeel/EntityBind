/**
 * 모듈 테스트
 */
//===============================================
// 선언
var Item                    = require("../src/entity-item").Item;
var BindModelRead           = require("../src/bind-model-read");
var EntityTable             = require("../src/entity-table").EntityTable;

// var view                    = require("./view.json");
// for (var prop in view) {
//     if (view.hasOwnProperty(prop)) console.log(prop);
// }


var e = new BindModelRead();

// 추가 참조 확인 엔티티테이블
var t = new EntityTable("second");

//===============================================
// 테스크 1
console.log("-----------------------------------------------------------------");
console.log("e.read.add(new Item('ITEM1'));");
e.read.add(new Item("ITEM1"));  // 전체추가
console.log("e.first.items.count            1 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       1 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  1 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("e.read.view.item.add(new Item('ITEM2'));");
e.read._output[0].items.add(new Item("ITEM2"));  // view 추가
console.log("e.first.items.count            2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       1 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("e.read.valid.add(e.first.items['ITEM2']);");
e.read.valid.items.add(e.first.items["ITEM2"]);  // valid 참조 추가
console.log("e.first.items.count            2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        1 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("e.read.valid.add(e.first.items['ITEM2']);");
e.read.bind.items.add(new Item("ITEM2"));  // bind 참조 추가
console.log("e.first.items.count            2 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("e.first.items.add(new Item('ITEM3'));");
e.first.items.add(new Item("ITEM3"));  // 엔티티에 추가
console.log("e.first.items.count            3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("e.first.items.add(new Item('ITEM3')); //  중복 발생");
e.first.items.add(new Item("ITEM3"));  // 엔티티에 추가 (중복)
console.log("e.first.items.count            3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("e.read.valid.add(e.first.items['ITEM2']); // 중복 발생");
e.read.bind.items.add(new Item("ITEM2"));  // bind 참조 추가 (중복)
console.log("e.first.items.count            3 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        2 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       2 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록
console.log("e.first.items.count            4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("new Item('ITEM4'),['bind', 'valid']);  // 중복 발생");
e.read.add(new Item("ITEM4"),["bind", "valid"]);  // 지정 명칭에 등록 (중복)
console.log("e.first.items.count            4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("new Item('ITEM4'),['bbb', 'xxx']);     // 오류 발생");
e.read.add(new Item("ITEM4"),["bbb", "xxx"]);  // 지정명칭 :: 오류발생
console.log("e.first.items.count            4 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        3 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);

console.log("-----------------------------------------------------------------");
console.log("e.read.bind.items.add(new Item('ITEM5'));");
e.read.bind.items.add(new Item("ITEM5"));  // 엔티티에 추가
console.log("e.first.items.count            5 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        4 ==> " + e.read.bind.items.count);
console.log("e.read.valid.items.count       3 ==> " + e.read.valid.items.count);
console.log("e.read._output[0].items.count  2 ==> " + e.read._output[0].items.count);
console.log("e.read.view.items.count        2 ==> " + e.read.view.items.count);

console.log("-----------------------------------------------------------------");
console.log("참조 추가 전");
console.log("e.first.items.count            5 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        4 ==> " + e.read.bind.items.count);
console.log("e.read.bind._refEntity.length  1 ==> " + e.read.bind._refEntity.length);

t.items.add("B1");
t.items.add("B2");
t.items.add("B3");
e.read.bind.items.add(t.items["B1"]);               // 바로 추가할 경우

console.log("외부객체 + 참조 없는 경우 :: [second] <=참조 [first] <=참조 [bind] 추가됨, _refEntity 변환없음 )");
console.log("e.first.items.count            6 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        5 ==> " + e.read.bind.items.count);
console.log("e.read.bind._refEntity.length  1 ==> " + e.read.bind._refEntity.length);

e.read.bind.items.add(t.items["B2"], t.items);          // 참조를 전달할 경우

console.log("외부객체 + 참조 있는 경우 :: [second] <=참조 [bind] 추가됨, _refEntity 변환됨 )");
console.log("e.first.items.count            6 ==> " + e.first.items.count);
console.log("e.read.bind.items.count        6 ==> " + e.read.bind.items.count);
console.log("e.read.bind._refEntity.length  2 ==> " + e.read.bind._refEntity.length);

// 중복의 경우 ?? 같은 흐름일단 확인 불필요...할듯..

console.log("-----------------------------------------------------------------");
console.log("이벤트");
e.onExecute = function() {console.log("공통 이벤트 시작 ~~");}
e.onExecuted = function() {console.log("공통 이벤트 종료 ~~");}

e.read.onExecute = function() {console.log("raed 이벤트 시작 ~~");}
e.read.onExecuted = function() {console.log("read 이벤트 종료 ~~");}

console.log("-----------------------------------------------------------------");
e.read.execute();
console.log("*************");
console.log("first.items");
for(var i = 0; i < e.first.items.count; i++) {
    console.log("first : " + e.first.items[i].name);
}

var abc = "A";
if (abc) console.log(".true");


console.log("-End-");