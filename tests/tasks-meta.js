
var Util = require("../src/utils");
var Meta = require("../src/meta-objects");



var Dog2  = (function (_super) {
    
    function Dog2() {
        _super.call(this);
    }
    Util.inherits(Dog2, _super);     // 상속(대상, 부모)    

    Dog2.prototype.subMove  = function(p_name) {
    };

    return Dog2;

}(Meta.MetaObject));     // 부모 클래스 전달



var d = new Dog2();


console.log("d.getGUID() : " + d.getGUID());

console.log("-End-");
