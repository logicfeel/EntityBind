
var common = require("../src/utils");
var Meta = require("../src/metas");



var Dog2  = (function (_super) {
    
    function Dog2() {
        _super.call(this);
    }
    common.inherits(Dog2, _super);     // 상속(대상, 부모)    

    Dog2.prototype.subMove  = function(p_name) {
    };
    /**
     * 추상 클래스 구현
     * @override
     */
    Dog2.prototype.getObject  = function() {
        console.log("getObject()구현.")
    };


    return Dog2;

}(Meta.MetaObject));     // 부모 클래스 전달


var Dog3  = (function (_super) {
    
    function Dog3() {
        _super.call(this);
    }
    common.inherits(Dog3, _super);     // 상속(대상, 부모)    

    Dog3.prototype.subMove  = function(p_name) {
    };

    /**
     * 추상 클래스 구현
     * @override
     */
    Dog3.prototype.getObject  = function() {
        console.log("getObject()구현.");
    };

    return Dog3;

}(Meta.MetaElement));     // 부모 클래스 전달



var d = new Dog2();

console.log("d.getGUID() : " + d.getGUID());
console.log("d.getGUID() : " + d.getGUID());
console.log("d.getGUID().length : " + d.getGUID().length);


var e = new Dog3();

console.log("-End-");