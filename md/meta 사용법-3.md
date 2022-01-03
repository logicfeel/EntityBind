# Meta 사용법

> Meta 정의 및 타입 정의

## Meta 정의
```javascript
// meta.js
var MetaModel = require('MetaModel'); // 메타 최상위
var Sub_1 = require('Super_1');
// exports default
exports class M_FAQ extends MetaModel {
    constructor() {
        super();
        this.read('meta.json'); // 객체 메타 로딩
        // 추가
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
## Meta 타입 정의
```typescript
// meta.d.ts
declare class M_FAQ extends MetaModel {
    constructor();
    
    sub: object[];
    /**
     * TODO:: 타입스크립트의 저의 방식을 검토하여 작성해야야 함
     **/

    write(): void;
}
```
