# Meta 사용법

> 독립적인 Meta 사용


## Meta 정의
```javascript
// meta.js
var MetaModel = require('MetaModel'); // 메타 최상위
// exports default
exports default class M_FAQ extends MetaModel {
    constructor() {
        super();
    }
}
```


```json
// meta.json
{
    "name": "BOD_Event",
    "table": {
        "BOD_Event": {
            "columns": {
                "faq_idx": { 
                    "type": "int", 
                    "caption": "일련번호" 
                },
                "question": { 
                    "type": "nvarchar", 
                    "size": 1000, 
                    "caption": "질문" 
                },
                "answer": { 
                    "type": "nvarchar", 
                    "size": 1000, 
                    "caption": "답변" 
                },
                "create_dt": { 
                    "type": "smalldatetime", 
                    "caption": "등록일자" 
                },
                "rank_it": { 
                    "type": "smallint", 
                    "caption": "순서" 
                },
                "typeCode": { 
                    "type": "varchar", 
                    "size": 5, 
                    "caption": "질문타입" 
                },
            },
            "addition": {
                "keyword": "__ADD__",
                "etc": "추가타입에 관련된 조건 및 옵션을 정의한다." 
            },
        },
    },
    //.....
}
```
