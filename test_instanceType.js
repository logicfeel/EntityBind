


var util = require("./src/utils");



//=======================================
function class_A(){
    this.A = "AA";

    this.namespace = "class_A";
}
// class_A.prototype.namespace = "class_A";

class_A.prototype.getType = function() {
    var type = ["Class_A"];
    return type;
};

class_A.prototype.instanceOf = function(p_name) {
    if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
    return this.getType().indexOf(p_name) > -1;
}

//=======================================
function class_B(){
    class_A.call(this);
    this.super = class_A;

    this.B = "BB";

    this.namespace = "class_B";
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

    this.namespace = "class_C";
}
util.inherits(class_C, class_B);
// class_C.prototype.namespace = "class_C";
class_C.prototype.getType = function() {
    var type = ["Class_C", "IClass"];

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

console.log("-End");