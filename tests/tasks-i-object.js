

var IObject = require("../src/i-object");
var util = require("../src/utils");


var Animal  = (function () {
    function Animal() {
        
        this._implements(IObject);
    }

    Animal.prototype.move  = function(p_name) {
    };

    Animal.prototype.getGUID  = function() {
        // return this.__implements[0].prototype.getGUID.call(this);
        return this.__implements["IObject"].prototype.getGUID.call(this);

    };

    return Animal;
}());


var a = new Animal();
console.log("getGUID() " + a.getGUID());

console.log("-End-");
