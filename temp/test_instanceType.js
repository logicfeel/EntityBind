

require("./src/object-implement"); // _implements() : 폴리필
var util = require("./src/utils");


//************************** */

function IObject() {
    this.I_aa = 100;
}

var IView = function () {
    this.I_bb = 100;
}

function IModel() {
    this.I_cc = 100;
}


//=======================================
function class_A(){
    this.A = "AA";
    this._implements(IModel);
}
// class_A.prototype.namespace = "class_A";

class_A.prototype.getType = function() {
    var type = ["Class_A"];
    return type;
};

class_A.prototype.instanceOf = function(p_name) {
    
    var arr = this.getType();
    
    if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");

    if (this._interface) {
        for (var i = 0; i < this._interface.length; i++) {
            arr.push(this._interface[i].name);
        }
    }

    return arr.indexOf(p_name) > -1;
}

//=======================================
function class_B(){
    class_A.call(this);
    this.super = class_A;

    this.B = "BB";

}
util.inherits(class_B, class_A);

// class_B.prototype.namespace = "class_B";
class_B.prototype.getType = function() {
    var type = ["Class_B"];
    var t = class_A.prototype.getType();
    return type.concat(t);
};


//=======================================
function class_C(){
    class_B.call(this);
    this.super = class_B;

    this.C = "CC";

    this._implements(IObject, IView);
}
util.inherits(class_C, class_B);
// class_C.prototype.namespace = "class_C";
class_C.prototype.getType = function() {
    var type = ["Class_C", "CCClass"];

    return type.concat(class_B.prototype.getType());
};

//=======================================

var c = new class_C();

c.A
c.B
c.C

var g = c.getType();

console.log(c.getType().indexOf("Class_I"));

console.log(g);

console.log(c.instanceOf("Class_C"));
console.log(c.instanceOf("Class_A"));
console.log(c.instanceOf("IClass"));
console.log(c.instanceOf("IObject"));
console.log(c.instanceOf("IModel"));

console.log("-End");