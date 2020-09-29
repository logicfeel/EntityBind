/**
 * 모듈 테스트
 */
//===============================================
// 선언
var ComplexElement = require("../src/meta-complex");

//===============================================
// 본문
var c = new ComplexElement();

//===============================================
// 테스크

console.log( c.getObject() );
console.log( c.count );


console.log("-End-");