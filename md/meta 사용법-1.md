# Meta 사용법

> Meta, Template, Auto 의 기본 사용법을 정의


## Meta 정의
```javascript
// meta.js
var MetaModel = require('MetaModel'); // 메타 최상위
// exports default
exports class M_FAQ extends MetaModel {
    constructor() {
        super();
        this.read('meta.json'); // 객체 메타 로딩
    }
}
```

### Template 정의
```javascript
// template.js
var AutoTemplate = require('AutoTemplate'); // 메타 최상위
var M_FAQ = require('M_FAQ');           // 메타 클래스
// exports default
exports class T_FAQ extends AutoTemplate {
    // 방법-1
    constructor() {     
        super();
        // 속성 설정
        var m = new M_FAQ();
        // 동적 컬럼 추가 (순서 무관함)
        m.table['FAQ_Table'].addColumn('color');
        // 'MODEL'에 매칭
        this.data['MODEL'] = m;
    }
    // 방법-2
    constructor() {     
        super();
        this.data['MODEL'] = new M_FAQ();
    }
    publish() { // 출판 : 'auto template'

    }
    addColumnFAQ(item) {    // 사용자화
        this.data['MODEL'].add(item);
    }
}
```

### Auto 정의
```javascript
// auto.js
var Automation = require('Automation'); // 메타 최상위
var T_FAQ = require('T_FAQ');           // 템플릿 클래스
// exports default
exports class A_FAQ extends Automation {
    constructor() {
        super();
        // 속성 설정
        this.clone = false;
        this.template = new T_FAQ();
        // 추가
        this.extension.add(web_ext);    // 확장자
        this.sub.add(A1);    // Auto
        this.sub.add(A2);    // Auto
    }
    init() {    // 초기화

    }
    update() {  // 업데이트
        
    }
    preinstall() {  // 설치전 후킹

    }
    install() { // 설치

    }
}
```
