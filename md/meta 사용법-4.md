# Meta 사용법

> Meta 상속 후 확장 타입 정의

## Meta 정의
```javascript
// meta.js
var M_FAQ_super = require('M_FAQ'); // 메타 부모
// exports default
exports class M_FAQ extends M_FAQ_super {
    constructor() {
        super();
        // 동적 컬럼 추가 (순서 무관함)
        m.table['FAQ_Table'].addColumn('color');
    }
    write() {
        // 상위에 있어 있고 필요시 오버라이딩함
    }
}
```

