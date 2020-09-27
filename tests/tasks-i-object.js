

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


var Animal  = (function () {
    function Animal() {
        
        this._implements(IObject, IDog);      // 인터페이스 구현함
    }

    Animal.prototype.move  = function(p_name) {
    };

    Animal.prototype.getGUID  = function() {
        // return this.__interface[0].prototype.getGUID.call(this);
        return this._interface["IObject"].prototype.getGUID.call(this);
    };

    return Animal;
}());


var a = new Animal();

// console.log("getGUID() " + a.getGUID());

console.log("-End-");
