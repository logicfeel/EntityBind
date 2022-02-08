# Auto 사용법 : 사례

> 독립적인 Meta 사용


## Meta 정의
```javascript
// ------------------------------------
// 모듈 추가 방법
// 방법 1>
this.mod.add('part1', m1);
this.mod.add('part1', m1, 1);
this.mod.add('part1', m1, 2);
// 방법 2>
this.mod.add('part1', m1);
this.sub.add('part2', m2);
this.super.add('part2', m2);
// 방법 3> 
this.add('part1', m1, 0);
this.sub('part2', m1);
this.super('part2', m1);
// 방법 4> => 적합후보
this.mod.add('part1', m1, [opt]);
this.mod.sub('part2', m2);
this.mod.super('part3', m3);
// ------------------------------------
// 모듈의 접근 방법
// 방법 1> 
var m1 = this.mod['part1'];                 // part1 조회
var m2 = this.mod['part1']['part2'];        // part1 - part2 조회
var m3 = this.select('part3');              // part3 조회[복수]
var m4 = this.mod['part1'].select('part4'); // part1 하위의 part4 조회[복수]
// 방법 2> => 적합후보
var m1 = this.mod['part1'];                 // part1
var m2 = this.mod['part2'].mod['part2'];    // part2 - part2
var m3 = this.select('part3');              // part3 조회[복수]
var m4 = this.mod['part1'].select('part4'); // part1 하위의 part4 조회[복수]
// 방법 3> 
var m1 = this.mod['part1'].owner;                   // part1 조회
var m2 = this.mod['part1']['part2'].owner;          // part1 - part2 조회
var m3 = this.select('part3');                      // part3 조회[복수]
var m4 = this.mod['part1'].owner.select('part4');   // part1 하위의 part4 조회[복수]

// 엔트리 모듈
var e = this.entry;

// 템플릿
var t0 = this.template
var t1 = this.mod['part1'].template;
var t2 = this.mod['part2'].mod['part2'].template;

// 템플릿 part
var p0 = this.template.part['layout/base'];             // .hbs 는 생략됨
var p1 = this.mod['part1'].template.part['layout/base'];

// 원시소스
var s1 = this.src['include/common.js'];                 // 원시소스
var s2 = this.mod['part1'].src['include/common.js'];    // part1의 원시소스

// 메타 접근
var m1 = this.meta;
if (this.meta === this.template.meta) return true;      // 같음       
var m2 = this.mod['part1'].meta;
var m3 = this.mod['part1'].mod['part2'].meta;

// 확장자
this.ext.add(asp);
this.ext.add(html);
this.ext.add(sql);
this.ext.remove(sql);
var e1 = this.ext.indexOf(sql);

```