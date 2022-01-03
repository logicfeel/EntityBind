# Meta 사용법

> Auto 의 sub 교체 (객체방식, 상속방식)



### Auto 정의 (객체 생성후 sub 오버라이딩 방식)
```javascript
// auto.js
var Automation = require('Automation'); // 메타 최상위
var A1 = require('A1_FAQ');
var A2 = require('A2_FAQ');
/**
 * A1의 sub 타입을 교체함
 * 실행시 타입검사에 충돌 검사함 
 * TODO:: sub_mod 같이 이름은 뭐로 할지 정해야함
 */
A1.sub['sub_mod'] = A2;
// exports default
exports class A_FAQ extends Automation {
    constructor() {
        super();
        // 속성 설정
        this.clone = false;
        this.template = new T_FAQ();
        // 추가
        this.sub.add(A1);
    }
    init() {    
        // 초기화
    }
    update() {  
        // 업데이트
    }
    preinstall() {  
        // 설치전 후킹
    }
    install() { 
        // 설치
    }
}
```

### Auto 정의 (상속후 sub 오버라이딩 방식)
```javascript
// auto.js
var Automation = require('Automation'); // 메타 최상위
var A1 = require('A1_FAQ');
var A2 = require('A2_FAQ');
// exports default
exports class A_FAQ extends A1 {
    constructor() {
        super();
        this.sub['sub_mod'] = A2;
        /**
         * 실행시 타입 검사함, 툴에서 검사 할 수도 있음
         * - 타입만 바꾸는건 비효율적임
         */
    }
    init() {    
        // 초기화
    }
    update() {  
        // 업데이트
    }
    preinstall() {  
        // 설치전 후킹
    }
    install() { 
        // 설치
    }
}
```