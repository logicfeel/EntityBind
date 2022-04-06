
/**
 * 
 * [ ] BaseCollection.js : BaseCollection
 * 
 * CodeType.js : CodeType, CodeValue, CodeTable, CodeTableCollection
 * 
 * [ ] Items.js : Item, ItemCollection
 * 
 * [ ] BindCommands.js : BindCommand, InternalCommand, ViewCommand
 *
 * [ ] UpdateCmd.js : UpdateCmd
 * [ ] CreateCmd.js : CreateCmd
 * [ ] DeleteCmd.js : DeleteCmd
 * [ ] ListCmd.js : ListCmd
 * [ ] ReadCmd.js : ReadCmd
 * 
 * [ ] BindModel.js : BindModel
 * 
 * [ ] ListModel.js : ListModel
 * [ ] FormModel.js : FormModel
 * [ ] ReadDelModel.js : ReadDeleteModel
 * 
 * 나중에 하나로 묶어서 사용
 * BindModule.1.0.js
 *  
 */


(function(G) {

    function aaa() {
        console.log('aaa');    
    }
    console.log('inner');

    bbb();

}(this));


//(function(G) {

    function bbb() {
        console.log('bbb');    
    }
    console.log('inner2');

//}(this));

var _value;

function _setPropertie(pIdx) {

    var obj = {
        get: function() { return _value; },
        set: function(newValue) { _value = newValue;},
        enumerable: true,
        configurable: true
    };
    return obj;        
}

function AAA(){
    
    var index = 1;

    Object.defineProperty(this, [index], _setPropertie(index));
    Object.defineProperty(this, "one", _setPropertie(index));
}


var aaa = new AAA();


///////////////////////////////
// 옵서버 테스트
var Observer = require("./src/observer");

var o = new Observer(this, this)

var f1 = function(){
    console.log("chage 되성요..");
};

// o.subscribe("change", f1);

o.subscribe(f1);

o.subscribe(function(){
    console.log("chage 되성요2..");
}, "change");

// o.unsubscribe("change", f1);
// o.unsubscribe();
// o.unsubscribeAll();
// o.unsubscribeAll("change");

o.publish("change");
o.publish();

var Animal = require("./template-클래스").Animal;
var Dog = require("./template-클래스").Dog;


var d = new Dog("도그");

// d.move();
// d.subMove();
d.subMove("뭘까요");


///////////////////////////////
// 컬렉션 테스트
var BaseCollection = require("./src/base-collection");

var b = new BaseCollection();

b.add("AAA", 10);
b.add("BBB", 20);

var get_set = 100;

var getter = function() {return get_set};
var setter = function(newValue) { get_set = newValue };

b.regProperty("CCC", getter, setter);

b.regProperty("DDD");

b.delProperty("DDD");


b.remove("AAA");

b.clear();

///////////////////////////////
// 컬렉션 이벤트 테스트
var cf = function(){
    console.log("event add 되성..");
};

b.onAdd = cf;

b.add("EEE");
b.add("FFF");

//*********************************/
// IIFE 사용시 순서가 중요함 로딩과 관련있음
console.log('-End-');

module.exports = {
    
}
