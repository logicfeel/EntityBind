
/**
 * 사용할때 타입을 지정하면 다른 타입은 등록안됨
 */

 var _interface = []; 
Object.defineProperty(Object.prototype, '_T', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: null
});

Object.defineProperty(Number.prototype, '_T', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: null
});
// var _implements = function _implements(type) {
    
//     var typeName = type;

//     Object.defineProperty(this, '_TYPE', {
//         enumerable: false,
//         configurable: false,
//         get: function() { 
//             return typeName;
//         },
//         set: function(v) { 
//             typeName = v;
//         },
//     });

//     // typeName = type;
// };
// var isImplementOf = function(p_imp) {
//     for (var i = 0; i < this._interface.length; i++) {
//         if (this._interface[i] === p_imp) return true;
//     }
//     return false;
// };  

// Object.defineProperty(Object.prototype, '_setType',
// {
//     value: _implements,
//     enumerable: false
// });
// Object.defineProperty(Object.prototype, '_setValue',
// {
//     value: isImplementOf,
//     enumerable: false
// });

class AAA {

}

var aaa = 1;
var bbb = 2;

aaa._T = "AAA";



var bbb = {
    aaa: "a",
    // _T: "string"
    ccc: {
        aaa: 2,
        _T: 'number'
    }
}
bbb._T = "BBB"

var ccc = {
    ddd: 'D'
}

// 타입 선언
// ccc._setType('object');
// ccc.ddd._setType('string');

// 타입 검사 후 삽입
// ccc.setValue('aaa')


console.log(1)