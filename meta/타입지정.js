

(function(global) {



    // var _implements = function(args) {

    //     var typeName;
    //     var obj;    
    //     var _interface = [];

    //     Object.defineProperty(this, '_interface', {
    //         enumerable: false,
    //         configurable: true,
    //         get: function() { 
    //             return _interface;
    //         }
    //     });
    //     // this._interface = this._interface || [];
    
    //     for(var i = 0; i < arguments.length; i++) {
    //         if (typeof arguments[i] === 'function') {
    //             // 중복 제거
    //             if (this._interface.indexOf(arguments[i]) < 0) {
    //                 this._interface.push(arguments[i]);
    //                 this._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
    //             }
    //         } else {
    //             throw new Error('함수타입만 가능합니다.');
    //         }
                
    //         obj = new arguments[i];
    
    //         for(var p in obj) {
    //             typeName = (typeof obj[p] === 'function') ? 'Method' : 'Property';
                
    //             if (!(p in this) && !Object.prototype.hasOwnProperty(p)) {
    //                 console.warn('Warning!! 인터페이스 구현 해야함. ' + arguments[i].name + ' :: (' + typeName + ') ' + p);
    //             }
    //         }
    //     }
    // };


    var _type = null;

    Object.defineProperty(Object.prototype, '___type',
    {
        enumerable: false,
        configurable: true,
        get: function() { 
            return _type;
        },
        set: function(val) { 
            return _type = val;
        }
    });

}());

var obj = {};
var str = "AA";
var num = 100;
// var nulll = null;
// var unde;
// var aa = aa || 3;
obj.___type = 'O'
str.___type = 'S'


var vvv = 10;              // 값 설정
vvv.___type = "숫자";       // 타입
// vvv.___type("숫자");       // 타입

var obj2 = {
    aaa: 11,
    bbb: 22,
    ccc: function(a) {}
}

/**
 * 타입을 지정한 것은 다른 값을 삽입하면 오류가 나오게 처리
 *  - typeof vars
 *  - typeof(vars)
 * 우선순위
 *  - function 이면 instanceof 로 검사
 *  -     
 */

let user = { // 서드파티 코드에서 가져온 객체
    name: "John"
};

let id = Symbol.for("type");

let user2 = {};
  
user[id] = 100;

user2[id] = 200;


const obj3 = {
    abc: 23,
    sub: {
        val: 19,
        [Symbol.for('mySymbol')]: 10    
    },
    [Symbol.for('mySymbol')]: 1
};
  
console.log(obj3[Symbol.for('mySymbol')])  


let nnn = 10;

nnn[Symbol.for('mySymbol')] = 20 

// nnn = 10;

console.log(1)