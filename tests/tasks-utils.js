/**
 * 모듈 테스트
 */
//===============================================
// 선언
var util = require("../src/utils");

//===============================================
// 본문
function Parent() {

}
Parent.prototype.top = function() {
    return "메소드 호출 : top() ";
};

function Chlid() {
    Parent.call(this);
}
util.inherits(Chlid, Parent);
Chlid.prototype.down = function() {
    return "메소드 호출 : down() ";
};

var c = new Chlid();

//===============================================
// 테스크

console.log("GUID => " + util.createGUID());
console.log("3 => " + util.getArrayLevel([[[0]]]));
console.log("상속 체크");
console.log("top() => " + c.top());
console.log("down() => " + c.down());

console.log("-End-");