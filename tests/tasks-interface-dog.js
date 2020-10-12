
require("../src/object-implement"); // _implements() : 폴리필
var IObject = require("../src/i-object");
var util = require("../src/utils");



//=================================
function IDog () {

}
IDog.prototype.setSound = function() {
    return "Set";
};
IDog.prototype.getSound = function() {
    return "Set";
};

IDog.prototype.static = function() {
    return "SS";
};

//=================================
var Animal  = (function () {
    function Animal() {
        
        // var static = 1;
        this._implements(IObject, IDog);      // 인터페이스 구현함
    }
    Animal.static = function() {};  // 정적메소드  (통과됨)

    Animal.prototype.move  = function(p_name) {
    };

    Animal.prototype.getGUID  = function() {
        // return this.__interface[0].prototype.getGUID.call(this);
        return this._interface["IObject"].prototype.getGUID.call(this);
    };

    return Animal;
}());
//=================================
function ISteel () {
}
//=================================

// 1안
var a = new Animal();
console.log("a._isImplementOf(IDog)     True  = " + a.isImplementOf(IDog));
console.log("a._isImplementOf(ISteel)   False = " + a.isImplementOf(ISteel));

// 2안>
// Animal();  // 함수 호출의 경우도 인터페이스 구현에 포함됨


console.log("-End-");
