
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
    Class: {
        rename: "BOD_Event_Cls",
        method: {
            read: { 
                alias: "ReadJson",
                params: {
                    evt_idx: '12'
                },
                param: ['evt_idx', 'title']
            },
            create: { 
                alias: "CreateJSon",
                params: [ this.Class.method.params.evt_idx ]    // this 가 전역을 가르킴
            },
        },
    }
}


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