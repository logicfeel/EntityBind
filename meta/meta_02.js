
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


//########################################################################
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
                etc: "추가타입에 관련된 조건 및 옵션을 정의한다." 
            },
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
            /** 다수 출력시 다차원 배열사용 */
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
            output: [ "rouw_count", "create_dt", "question", "answer", "rank_it", "faq_idx", '__ADD__' ]
        },
        BOD_FAQ_Cls: {
            type: "class",
            item: {
                rouw_count: { type: "char", size: 1 },
            },
            attr: [ 
                "rouw_count", 
                "create_dt", 
                "question",
                "answer",
                "rank_it", 
                "faq_idx",
                '__ADD__' 
            ],
            method: {
                create: {
                    name: "Create",
                    param: [],
                    call: [ "BOD_Event.BOD_Event_C" ]
                    /**  모듈명.엔티티명  */
                },
                Read: {
                    rename: "Read",
                    call: "BOD_Event_R"
                },
                Update: {
                    call: "BOD_Event_U"
                },
                Delete: {
                    call: "BOD_Event_D"
                },
                List: {
                    param: ['create_dt', ''],
                    call: "BOD_Event_L"
                },
                List2: {
                    call: "BOD_FAQ_Cls.List",
                    /** 내부의 호출을 참조하는 경우 */
                },
            }
        },
        BOD_FAQ_Admin_Callback: {
            type: "class",
            item: {     /** 내부적으로 사용하는것 */
                cmd: {},
                doctype: {},

            },
            attr: [     /** 데이터로 사용하는 것 */
                "question",
                "answer",
                "rank_it", 
                "faq_idx",
                { name: 'keyword', type: "int", default: 10 },
                { name: 'page_size', type: "int", default: 10 },
                { name: 'page_count', type: "int", default: 1 },
                { name: 'sort_cd', type: "int", default: NULL },
                { name: 'row_total', type: "int", default: 0,  output: true },
                { name: 'xml_yn', type: "char", size: 1 },
                { name: 'msgSave_yn', type: "char", size: 1 },
                { name: 'msgPrint_yn', type: "char", size: 1 },
                '__ADD__',
            ],
            method: {
                CREATE: {
                    call: "BOD_Event_C"
                },
                READ: {
                    call: "BOD_Event_R"
                },
                UPDATE: {
                    call: "BOD_Event_U"
                },
                DELET: {
                    call: "BOD_Event_D"
                },
                LIST: {
                    call: "BOD_Event_L"
                },
                
            }
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