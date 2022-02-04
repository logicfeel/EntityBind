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
// 방법 1> => 적합후보
var m1 = this.mod['part1'];                 // part1 조회
var m2 = this.mod['part1']['part2'];        // part1 - part2 조회
var m3 = this.select('part3');              // part3 조회[복수]
var m4 = this.mod['part1'].select('part4'); // part1 하위의 part4 조회[복수]
// 방법 2>
var m1 = this.mod['part1'];                 // part1
var m2 = this.sub['part2'].sub['part2'];    // part2 - part2
var m3 = this.super['part3'].mod['part1'];  // part3 - part1
// 방법 1 이슈
var m2 = this.mod['part1'].mod['part2'];        // part1 - part2 조회

// 하위 모듈의 검색
// 복수 모듈이 검색될 수 있다.
var m1 = this.select('part1');              // 모듈 중 part1 이름을 모두 조회
var m2 = this.sub['part1'].select('part2'); // part1의 모듈중 part2

// 모듈 별칭은 모듈내에서 유일해야함

// 엔트리 모듈
var e = this.entry;


```