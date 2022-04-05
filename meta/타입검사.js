

// 클래스
function Class(make) {
    this.make = make;
}

// 함수
function func() {

}

var obj = { aaa: 1, bbb: {}}

var num = 1
var str = "S"
var boolean = false;
var undef = undefined;


// var kkk = 1 ? kkk = 2 : kkk = 3;

var kkk = 3;
kkk._TYPE = 'string';

var obj = {
    _TYPE: "object",
    abc: {
        _TYPE: "string"
    }
}

/**
 *  - 원시
 *  - 함수(클래스)
 *  - 함수
 *  - 객체
 */


function check(type, val) {
    if (type === 'undefined' && typeof val === 'undefined') return '정의안됨'
    else if (type === 'null'  && val === null) return '널'

    else if (type === 'number' && typeof val === 'number') return '수'
    else if (type === 'string' && typeof val === 'string') return '문자'
    else if (type === 'boolean' && typeof val === 'boolean') return '불리언'
    else if (type === 'function' && typeof val === 'function') return '함수'
    else if (typeof type === 'function' &&  val instanceof type) return '클래스'
    else if (type === 'object'  && typeof val !== 'function' && typeof val === 'object') return '객체'

    else return '-실패-'
}

console.log( check('undefined', ) )
console.log( check('number', 1) )
console.log( check('string', "S") )
console.log( check('boolean', true) )
console.log( check('function', func) )
console.log( check('function', Class) )
console.log( check(Class, new Class()) )
console.log( check(Class, Class) )  // 실패
console.log( check('null', null) )
console.log( check('object', {}) )
console.log( check('null', {}) )    // 실패



console.log(1)

