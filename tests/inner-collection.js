

console.log("=============  배열 컬렉션 테스트  ================")
var ArrayTest  = (function (_super) {
    
    function ArrayTest() {
        _super.call(this, this);

        this.speed = 0;
    }
    util.inherits(ArrayTest, _super);


    return ArrayTest;

}(ArrayCollection));

var a = new ArrayTest();
a.isDebug = true;

// 등록
a.add("AAA");
a.add(100);
a.add("BBB");
a.add("CCC");

// 검사
console.log("contains(100) :   true  == " + a.contains(100));
console.log("contains('AAA') : true  == " + a.contains("AAA"));
console.log("contains(200) :   false == " + a.contains(200));
console.log("contains('DDD') : false == " + a.contains("DDD"));
// 삭제
a.remove(100);

// 삭제 인덱스
a.removeAt(2);

// 전체삭제
a.clear();



console.log("=============  속성 컬렉션 테스트  ================")
var PropTest  = (function (_super) {
    
    function PropTest() {
        _super.call(this, this);

        this.speed = 0;
    }
    util.inherits(PropTest, _super);


    return PropTest;

}(PropertyCollection));

var p = new PropTest();
p.isDebug = true;

// 등록
p.add("AAA", 100);
p.add("BBB");
p.add("CCC");

// 검사
console.log("contains('AAA') : true  == " + p.contains("AAA"));
console.log("contains('BBB') : true  == " + p.contains("BBB"));
console.log("contains(100) :   false == " + p.contains(100));
console.log("contains('DDD') : false == " + p.contains("DDD"));
console.log("this.count : 3 == " + p.count);
console.log("this.count : [100, , ] == " + p.list.toString());
// 삭제
p.remove("AAA");

// 삭제 인덱스
p.removeAt(2);

// 전체삭제
p.clear();
