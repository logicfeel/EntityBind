# Meta 사용법

> Meta sub, super 있는 경우, meta-lock.json 생성함

## Meta 정의
```javascript
// meta.js
var MetaModel = require('MetaModel'); // 메타 최상위
var Super_1 = require('Super_1');
var Sub_1 = require('Super_1');
// exports default
exports class M_FAQ extends MetaModel {
    constructor() {
        super();
        this.read('meta.json'); // 객체 메타 로딩
        // 추가
        this.super.add(new Super_1());
        this.sub.add(new Sub_1());
        /**
         * super, sub 는 위치를 알아야 하므로 json 형태로 로딩 안됨 
         */
    }
    write() {
        // 상위에 있어 있고 필요시 오버라이딩함
    }
}
```
## 명령 실행
```c
auto meta --write
```