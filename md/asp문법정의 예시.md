```json

{
    "entry": ["func_block"],
    "func_block": {
        "begin": /Function/, 
        "end": /End/, 
        "body": "func_name" 
    },
    "include_block": {
        "begin": /<!--/,
        "end": /-->/
    },
    "param_block": {
        "begin": /{/,
        "end": /{/,
        "return": 2
    },
    "func_name": {
        "reg": /Function\s(\w+)/,
        "result": 1         // 캡처번호
    },
    "function_define": {
        /*
            - 정규식, 캡처번호[*], 매핑값
        */
    },
    // 블럭은 여러개가 있음
    "single_block": [
        {
            "reg": \<%\,
            "end": \%>\,
        },
        {
            "reg": \<!--\,
            "end": \-->\,
        },
    ],
    "multi_block": [
        {
            "reg": \{\,
            "end": \}\,
            "body": "multi_block"
        }
    ],
    // ---- 필수로 필요한 블럭
    "ENTRY": ["func_block", "class_block"], // class 블럭이 앞서야함
    "SKIP_BLOCK": [
        {
            "reg": \/\*\,
            "end": \\*/\,
        },
        { 
            "reg": \\\\.*\n\
        }
    ],

    "func_block": {
        "reg": /(?:Function|Sub)\s+(\w+)(\([\w\s,]*\))/,
        "group": {
            "1": "#Operation",
            "0": "params",
        },
        "end": \End [Function|Sub]\
    },
    "params": {
        "reg": /(\w+)\s(\w+)/,
        "group": {
            "1": "#Param.name",
            "2": "#Param.type",
        }
    },
    "class_block": {
        "reg": /Class\s+(\w+)/,
        "body": "func_block",
        "end": /End Class/
    },
    "include": {
        "reg": "/<!--#include *virtual=([^]*)-->/",
        "group": {
            "1": "#Depend"
        }
        
    }
        
    }

}

````