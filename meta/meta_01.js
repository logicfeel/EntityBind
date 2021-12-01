
/// 메타의 정적 데이터
var metaData = {

};



/**
 * 가공할려는 대상이 있어야 함
 *  => 대산은 import, export 로 찾아냄
 * 
 */

// import
var meta = require('meta.js');


// export는 어떻게?

/**
 * ES6 클래싀 정의 문법
 */
class UserProfile extends myClass {
    constructor() {

    }

	userName() {
		console.log(this.name);
	}
}

const profile = new UserProfile('영희', 22);

// meta JSON 샘플
const meta = {
    entity: {},
    sp: {}
};

/**
 * meta model JSON 샘플 - a
 * 장점::
 *  - 객체와 가장 가까운 구조를 가진다.
 * 단점::
 *  - JSON 문법이 너무 길어진다.
 */
var metaModel = {
    models: {
        BOD_Event: {
            type: "Entity",
            items: {
                evt_idx: {
                    dataType: "int"
                },
                title: {
                    dataType: "varchar",
                    size: 10
                }
            }
        },
        BOD_Notice_SP_C: {
            type: "Operation",
        },

    }
};

/**
 * meta model JSON 샘플 - b
 * 장점::
 *  - 추상계층을 삽입되어 있다
 *  - mapping 을 사용할 수 있다.
 * 단점:: 
 *  - 
 */
 var metaModel = {
    entity: {
        BOD_Event: {
            items: {
                evt_idx: {
                    dataType: "int"
                },
                title: {
                    dataType: "varchar",
                    size: 10
                }
            }
        },
    },
    operation: {
        BOD_Notice_SP_C: {
            params: {
                title           //// 선언은 가능하나..... 복잡도가 높아짐 또.... 동적 추가는??
            }
        },
    },
    mapping: {

    }
};


/**
 * meta model JSON 샘플 - c
 * 
 */
 var metaModel = {
    BOD_Event: {
        type: "Entity", /** 0, 1, 2 로 변경 가능할까? */
        items: {
            evt_idx: {
                dataType: "int"
            },
            title: {
                dataType: "varchar",
                size: 10
            }
        }
    },
    BOD_Notice_SP_C: {
        type: "Operation",
        params: {
            evt_idx: {
                dataType: "int"
            },
            title: {
                dataType: "varchar",
                size: 10
            }
        }
    },
};

/**
 * meta model JSON 샘플 - d
 */
var metaModel = {
    items: {
        evt_idx: {
            dataType: "int"
        },
        title: {
            dataType: "varchar",
            size: 10
        }
    },
    entity: {
        BOD_Event: {
            type: "Table",
        },
        BOD_Notice_SP_C: {
            type: "Operation",
            params: {
                evt_idx: { name: "e_idx" } /** 이름 매핑시 병칭으로 변경  alias vs name  */
            }
        },
        Class: {
            name: "BOD_Event_Cls",
            method: {
                read: {
                    name: "ReadJson",
                }
            }
        }
    },
    mapping: {
        evt_idx: { BOD_Event: 'items',  BOD_Notice_SP_C: 'params', Class: ['attr', 'method.read'] },
        evt_idx: { BOD_Event: 'items',  BOD_Notice_SP_C: 'params', Class: ['attr', 'read'] },
        title: { BOD_Event: 'items',  BOD_Notice_SP_C: 'params' },    /** [] 로 대체 가능 */
    },
};

// 이슈!! operation 순서가 있음....

/**
 * meta model JSON 샘플 - e
 *  - 조건
 *  + 엔티티가 여러개 있을 수 있음
 *  + 오퍼레이션은 순서가 있음
 *  + 아이템은 JSON >>  (객체주입기법이 아님)
 *      + 그러면 중복의 문제가 ?? >> meta-lock.json 과 분리하여 해결!!
 */
var metaModel = {
    class: {
        rename: "BOD_Event_Cls",
        items: {
            evt_idx: {},
            title: {}
        },
        attr: ['title'],
        method: {
            read: {
                alias: "ReadJson",
                params: {
                    evt_idx: '12'
                },
            },
            read: {
                alias: "ReadJson",
                param: ['evt_idx', 'title']
            },
            create: {
                alias: "CreateJSon",
                params: [ this.Class.method.params.evt_idx ]    // this 가 전역을 가르킴
            },
        },
    },
    entity: {
        BOD_Event: {
            type: "table",
            items: {
                evt_idx: {
                    dataType: "int"
                },
                title: {
                    dataType: "varchar",
                    size: 10
                }
            }
        },
    },
    
};

/**
 * meta model JSON 샘플 - f
 */
var metaModel = {
    BOD_Event: {
        type: "table",
        item: {
            faq_idx: { type: "int", caption: "일련번호" },
            question: { type: "nvarchar", size: 1000, caption: "질문" },
            answer: { type: "nvarchar", size: 1000, caption: "답변" },
            create_dt: { type: "smalldatetime", caption: "등록일자" },
            rank_it: { type: "smallint", caption: "순서" },
            typeCode: { type: "varchar", size: 5, caption: "질문타입" },
            __ADD: "",  /** 동적으로 추가되는 위치 */
        },
        add: "추가타입에 관련된 조건 및 옵션을 정의한다.item_name=__ADD " /** 코드명령 규칙도 표현 */
    },
    BOD_Event_SP_C: {
        type: "operation",
        param: [
            'question', 
            'answer',
            'typeCode',
            'rank_it',
            '__ADD',
            { name: 'msgSave_yn', type: "char", size: 1 },
            { name: 'msgPrint_yn', type: "char", size: 1 },
        ],
    },
    BOD_Event_SP_R: {
        type: "operation",
        param: [
            'faq_idx', 
            { name: 'xml_yn', type: "char", size: 1 },
            { name: 'msgSave_yn', type: "char", size: 1 },
            { name: 'msgPrint_yn', type: "char", size: 1 },
        ],
        output: ["question", "answer", "typeCode", "rank_it", '__ADD', "create_dt" ], /** 다수출력시 2차원 배열사용 */
    },
    BOD_Event_SP_U: {
        type: "operation",
        param: [
            'faq_idx', 
            'question', 
            'answer',
            'typeCode',
            'rank_it',
            '__ADD',
            { name: 'msgSave_yn', type: "char", size: 1 },
            { name: 'msgPrint_yn', type: "char", size: 1 },
        ],
    },
    BOD_Event_SP_D: {
        type: "operation",
        param: [
            'faq_idx', 
            { name: 'xml_yn', type: "char", size: 1 },
            { name: 'msgSave_yn', type: "char", size: 1 },
            { name: 'msgPrint_yn', type: "char", size: 1 },
        ],
    },
    BOD_Event_SP_L: {
        type: "operation",
        param: [
            { name: 'keyword', type: "char", size: 1 },
            { name: 'page_size', type: "int", default: 10 },
            { name: 'page_count', type: "int", default: 1 },
            { name: 'sort_cd', type: "int", default: NULL },
            { name: 'row_total', type: "int", default: 0,  output: true },
            { name: 'xml_yn', type: "char", size: 1 },
            { name: 'msgSave_yn', type: "char", size: 1 },
            { name: 'msgPrint_yn', type: "char", size: 1 },
        ],
        output: [ "rouw_count", "create_dt", "question", "answer", "rank_it", "faq_idx", '__ADD' ]
    },

};


/**
 * meta model JSON 샘플 - g 
 * super, sub 추가
 */
 var metaModel = {
    name: "BOD_Event",
    entity: {
        BOD_Event: {
            type: "table",
            item: {
                faq_idx: { type: "int", caption: "일련번호" },
                question: { type: "nvarchar", size: 1000, caption: "질문" },
                answer: { type: "nvarchar", size: 1000, caption: "답변" },
                create_dt: { type: "smalldatetime", caption: "등록일자" },
                rank_it: { type: "smallint", caption: "순서" },
                typeCode: { type: "varchar", size: 5, caption: "질문타입" },
                __ADD: "",  /** 동적으로 추가되는 위치 */
            },
            add: "추가타입에 관련된 조건 및 옵션을 정의한다.item_name=__ADD " /** 코드명령 규칙도 표현 */
        },
        BOD_Event_SP_C: {
            type: "operation",
            param: [
                'question', 
                'answer',
                'typeCode',
                'rank_it',
                '__ADD',
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_R: {
            type: "operation",
            param: [
                'faq_idx', 
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
            output: ["BOD_Event.question", "answer", "typeCode", "rank_it", '__ADD', "create_dt" ], 
            /** 
             * - 다수출력시 2차원 배열사용 
             * - BOD_Event.question : 엔티티를 지정함
             * */
        },
        BOD_Event_SP_U: {
            type: "operation",
            param: [
                'faq_idx', 
                'question', 
                'answer',
                'typeCode',
                'rank_it',
                '__ADD',
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_D: {
            type: "operation",
            param: [
                'faq_idx', 
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_L: {
            type: "operation",
            param: [
                { name: 'keyword', type: "char", size: 1 },
                { name: 'page_size', type: "int", default: 10 },
                { name: 'page_count', type: "int", default: 1 },
                { name: 'sort_cd', type: "int", default: NULL },
                { name: 'row_total', type: "int", default: 0,  output: true },
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
            output: [ "rouw_count", "create_dt", "question", "answer", "rank_it", "faq_idx", '__ADD' ]
        },
        BOD_FAQ_Cls: {
            type: "class",
            attr: [ 
                "rouw_count", 
                "create_dt", 
                "question",
                "answer",
                "rank_it", 
                "faq_idx",
                '__ADD' ],
            /**
             * - 자체 정의 속성 사용시 배열로 표시
             * - 이름은 자동 검색 알고니즘이 적용됨
             * - meta-lock.json 에는 전체이름이 표기됨!
             */
            method: {
                create : {
                    alias: "Create",
                    param: [],
                    ref: [ "BOD_Event.BOD_Event_C" ]
                    /**
                     * - 타입 : 배열 | 배열<문자열>
                     * - 모듈명.엔티티명
                     */
                },
                read: {
                    rename: "Read",
                    ref: "BOD_Event_R"
                },
                update: {
                    rename: "Update",
                    ref: "BOD_Event_U"
                },
                delete: {
                    rename: "Delete",
                    ref: "BOD_Event_D"
                },
                list: {
                    rename: "List",
                    ref: "BOD_Event_L"
                },
                check: {}
            }
        }
    },
    super: ['STO_Base'],    /** 상위로 의존성을 받는것 메타모듈명 */
    sub: ['PRT_Base'],      /** 단일 의존관계가 있는것 메타모듈명 */
};


/**
 * meta model JSON 샘플 - g'
 * table, view(가상), opeation, class 추가
 */
 var metaModel = {
    name: "BOD_Event",
    table: {
        BOD_Event: {
            item: {
                faq_idx: { type: "int", caption: "일련번호" },
                question: { type: "nvarchar", size: 1000, caption: "질문" },
                answer: { type: "nvarchar", size: 1000, caption: "답변" },
                create_dt: { type: "smalldatetime", caption: "등록일자" },
                rank_it: { type: "smallint", caption: "순서" },
                typeCode: { type: "varchar", size: 5, caption: "질문타입" },
                __ADD: "",  /** 동적으로 추가되는 위치 */
            },
            add: "추가타입에 관련된 조건 및 옵션을 정의한다.item_name=__ADD " /** 코드명령 규칙도 표현 */
        },
    },
    operation: {
        BOD_Event_SP_C: {
            type: "operation",
            param: [
                'question', 
                'answer',
                'typeCode',
                'rank_it',
                '__ADD',
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_R: {
            type: "operation",
            param: [
                'faq_idx', 
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
            output: ["BOD_Event.question", "answer", "typeCode", "rank_it", '__ADD', "create_dt" ], 
            /** 
             * - 다수출력시 2차원 배열사용 
             * - BOD_Event.question : 엔티티를 지정함
             * */
        },
        BOD_Event_SP_U: {
            type: "operation",
            param: [
                'faq_idx', 
                'question', 
                'answer',
                'typeCode',
                'rank_it',
                '__ADD',
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_D: {
            type: "operation",
            param: [
                'faq_idx', 
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_L: {
            type: "operation",
            param: [
                { name: 'keyword', type: "char", size: 1 },
                { name: 'page_size', type: "int", default: 10 },
                { name: 'page_count', type: "int", default: 1 },
                { name: 'sort_cd', type: "int", default: NULL },
                { name: 'row_total', type: "int", default: 0,  output: true },
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
            output: [ "rouw_count", "create_dt", "question", "answer", "rank_it", "faq_idx", '__ADD' ]
        },
        
    },
    super: ['STO_Base'],    /** 상위로 의존성을 받는것 */
    sub: ['STO_Base'],  /** 단일 의존관계가 있는것 */
};


/**
 * meta model JSON 샘플 - h
 * method는 배열 [] 표시
 */
 var metaModel = {
    name: "BOD_Event",
    entity: {
        BOD_Event: {
            type: "table",
            item: {
                faq_idx: { type: "int", caption: "일련번호" },
                question: { type: "nvarchar", size: 1000, caption: "질문" },
                answer: { type: "nvarchar", size: 1000, caption: "답변" },
                create_dt: { type: "smalldatetime", caption: "등록일자" },
                rank_it: { type: "smallint", caption: "순서" },
                typeCode: { type: "varchar", size: 5, caption: "질문타입" },
            },
            addition: {
                keyword: "__ADD__",
                etc: "추가타입에 관련된 조건 및 옵션을 정의한다.item_name=__ADD " 
            }
            
            /** 코드명령 규칙도 표현 */
        },
        BOD_Event_SP_C: {
            type: "operation",
            tag: ["CREATE"],
            param: [
                'question', 
                'answer',
                'typeCode',
                'rank_it',
                '__ADD__',
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_R: {
            type: "operation",
            tag: ["READ"],
            param: [
                'faq_idx', 
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
            output: ["BOD_Event.question", "answer", "typeCode", "rank_it", '__ADD__', "create_dt" ], 
            /** 
             * - 다수출력시 2차원 배열사용 
             * - BOD_Event.question : 엔티티를 지정함
             * */
        },
        BOD_Event_SP_U: {
            type: "operation",
            tag: "UPDATE",
            param: [
                'faq_idx', 
                'question', 
                'answer',
                'typeCode',
                'rank_it',
                '__ADD__',
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_D: {
            type: "operation",
            tag: "DELETE",
            param: [
                'faq_idx', 
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
        },
        BOD_Event_SP_L: {
            type: "operation",
            tag: "LIST",
            param: [
                { name: 'keyword', type: "char", size: 1 },
                { name: 'page_size', type: "int", default: 10 },
                { name: 'page_count', type: "int", default: 1 },
                { name: 'sort_cd', type: "int", default: NULL },
                { name: 'row_total', type: "int", default: 0,  output: true },
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
            ],
            output: [ "rouw_count", "create_dt", "question", "answer", "rank_it", "faq_idx", '__ADD' ]
        },
        BOD_FAQ_Cls: {
            type: "class",
            item: {
                faq_idx: { ref: "faq_idx" },
                question: { ref: "question" },
                answer: { ref: "answer" },
                create_dt: { ref: "create_dt" },
                rank_it: { ref: "rank_it" },
                typeCode: { ref: "typeCode" },
                __ADD: { ref: "__ADD" },  /** 동적으로 추가되는 위치 */
            },
            /**
             * - 자체 정의 속성 사용시 배열로 표시
             * - 이름은 자동 검색 알고니즘이 적용됨
             * - meta-lock.json 에는 전체이름이 표기됨!
             */
            method: {
                create: {
                    name: "Create",
                    param: [],
                    ref: [ "BOD_Event.BOD_Event_C" ]
                    /**
                     * - 타입 : 배열 | 배열<문자열>
                     * - 모듈명.엔티티명
                     */
                },
                Read: {
                    rename: "Read",
                    ref: "BOD_Event_R"
                },
                Update: {
                    ref: "BOD_Event_U"
                },
                Delete: {
                    ref: "BOD_Event_D"
                },
                List: {
                    param: ['create_dt', ''],
                    ref: "BOD_Event_L"
                },
            }
            /**
             * 배열 형식 
             *  - 단점 : 사용시 참조에 모호성이 있음
             * 객체 형식 !! 이방식이 맞을듯
             *  - 단점 : 오버로드 표현시 별칭을 사용해야함
             */
        }
    },
    super: ['STO_Base'],    /** 상위로 의존성을 받는것 메타모듈명 */
    sub: ['PRT_Base'],      /** 단일 의존관계가 있는것 메타모듈명 */
};


// ####################################################
this.mapping = {
    _temp_list:     { list:     'etc' },    // 묶음의 용도
    _area_list:     { list:     'etc' },    // 묶음의 용도
    _area_page:     { list:     'etc' },    // 묶음의 용도
    cmd:            { Array:    'bind' },
    keyword:        { list:     'bind' },
    page_size:      { list:     'bind' },
    page_count:     { list:     'bind' },
    sort_cd:        { list:     'bind' },
    ntc_idx:        { read:     'bind',     delete:     'bind',            update:  'bind' },
    title:          { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], },
    writer:         { read:     'output',   create:     'bind',            update:  'bind' },
    contents:       { read:     'output',   create:     'bind',            update:  'bind' },
    // state_cd:       { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], },
    top_yn:         { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], list:     'bind'},
    popup_yn:       { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], list:     'bind'},
};