var util = require("./src/utils");

////////////////////////////////////////////////////////
// 1. 일반 클래스 선언
var Animal  = (function () {
    /**
     * @description 부모 클래스..
     * @param {*} p_param 
     */
    function Animal(p_param) {

        this.isDebug = false;       // 디버깅 플래그

        this.param = p_param;
    }

    /**
     * @description 기술
     * @param {String} p_name 이름
     * @summary 설명
     */
    Animal.prototype.move  = function(p_name) {
        
        var subscribers = null;         // 호이스트 지역변수 선언
        
        p_name = p_name || "any";       // 필수값 설정

        if (typeof p_name === "undefined") throw new Error("p_fn param request fail...");
        
        console.log("부모 move() 호출 :" + p_name);
    };
    ///////////////////////////
    // 구현... 메소드

    return Animal;

}());

////////////////////////////////////////////////////////
// 1-1. 일반 클래스 선언 : 단순
var Animal  = (function () {
    function Animal() {

    }

    Animal.prototype.move  = function(p_name) {
    };

    return Animal;
}());


////////////////////////////////////////////////////////
// 2. 상속 클래스 선언
var Dog  = (function (_super) {
    
    function Dog(p_param) {
        _super.call(this, p_param);

        this.speed = 0;
        // this.parent = _super;
    }
    util.inherits(Dog, _super);     // 상속(대상, 부모)    

    Dog.prototype.subMove  = function(p_name) {
        // this.super.move();   // 오류
        // this.move();                    // 자동적으로 가능함
        // Dog.prototype.move();           // 가능함 => 비추천
        Dog.super.prototype.move.call(this, p_name);    // 부모메소드 호출 : 데코리이션 패턴
        _super.prototype.move.call(this, p_name);       // 부모메소드 호출 : **추천**
        console.log("자식 subMove() 호출");
    };
    ///////////////////////////
    // 구현... 메소드

    return Dog;

}(Animal));     // 부모 클래스 전달

////////////////////////////////////////////////////////
// 2.1 상속 클래스 : 단순
var Dog2  = (function (_super) {
    
    function Dog2() {
        _super.call(this);
    }
    util.inherits(Dog2, _super);     // 상속(대상, 부모)    

    Dog2.prototype.subMove  = function(p_name) {
    };

    return Dog2;
}(Animal));



module.exports = {
    Animal: Animal,
    Dog: Dog
};