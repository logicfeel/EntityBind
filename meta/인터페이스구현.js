


/***
 * 객체의 타입 비교
 * @param org 원본 객체
 * @param tar 비교 객체
 */
function equalType(org, tar){
            
    var typeName = ""

    for (var key in org) {
        if (org.hasOwnProperty(key)){
            typeName = (typeof org[key] === 'function') ? 'Method' : 'Property';
            
            if (!(key in tar)) {
                console.warn('Warning!! 대상 없음 ' + key + ' :: (' + typeName + ') ');
                return false;
            }
            if (typeof org[key] === 'object' && org[key] !== null) {
                if (tar[key] === null) {
                    console.warn('Warning!! null 타입. ' + key + ' :: (' + typeName + ') ');
                    return false;                    
                }
                if (equalType(org[key], tar[key]) === false) return false;
            }
            if (org[key] !== null && !(typeof org[key] === typeof tar[key])) {  /** 원본 null 비교 안함 */
                console.warn('Warning!! 타입 다름. ' + key + ' :: (' + typeName + ') ');
                return false;
            }
        }
    }
    return true;
}


var a = {
    a: 1,
    b: "@",
    c: true,
    obj: {
        obj_a: 1,
        aa: 3,
    },
    f: function() {},
    g: null,
    obj2: {},
}
var b ={
    a: 1,
    b: "b",
    B: null,
    c: false,
    obj: {
        obj_a: 10,
        aa: 3,
        c:3
    },
    // obj: null,
    f: function() {},
    g: "a",
    obj2: {a:2},
}

equalType(a, b)


// equalType(1, 2)

console.log(1)