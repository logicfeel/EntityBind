# Meta 사용법

> Template 외부 helper, part 수입

### Template 정의
```javascript
// template.js
var AutoTemplate = require('AutoTemplate'); // 메타 최상위
var M_FAQ = require('M_FAQ');           // 메타 클래스
var T_FAQ_out = require('T_FAQ_out');   // 외부 템플릿

// exports default
exports class T_FAQ extends AutoTemplate {
    // 방법-1 : 하나만 가져오는 경우
    constructor() {     
        super();
        this.data['MODEL'] = new M_FAQ();
        // 외부 수입
        this.import(new T_FAQ_out().part);  // 모든 부분 가져오기
    }
    // 방법-2 : 생성후 가져요기 (여러개를 가져올 경우)
    constructor() {     
        super();
        var t = new T_FAQ_out();

        this.data['MODEL'] = new M_FAQ();
        // 외부 수입
        this.import(t.part('layout'));  // 'layout 하위' 부분 가져오기
        this.import(t.part('page/top'));  // 'layout/top' 부분 가져오기
        this.import(t.helper);  // 모든 helper 가져오기
    }
    publish() { // 출판 : 'auto template'

    }
    addColumnFAQ(item) {    // 사용자화
        this.data['MODEL'].add(item);
    }
}
```
## 실행
```c
auto publish // 템플릿 출판(생성) 
```
