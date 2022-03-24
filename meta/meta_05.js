
var FAQ_Object = {
    table: {
        master: {
            name: 'BOD_FAQ',
            columns: {
                faq_idx: {},
                qustion: {},
                answer: {},
                rank_it: {},
                del_yn: {},
                create_dt: {}
            },
            _onAdd: (col) => { 
                sp.create.params.add(col); 
            }
            /**
             *  - 컬럼의 특성에 따라서 추가 이벤트를 발생한다.
             *  - 스키마의 성격을 가진다.
             *  - 어떤 컬럼을 추가하는지에 따라서 컬럼이 확장한다.
             *  - entity 설계 방식에 걸러내는 방식 참조
             */
        }
    },
    view: {
        list: {
            columns: {
                row_total: {},
                create_dt: {},
                question: {},
                answer: {},
                raink_it: {},
            }
        },
        inner: {
            msgSave_yn: { /** 직접입력 */ },
            msgPrint_yn: { /** 직접입력 */},
        }
    },
    sp: {
        create: {
            params: {
                qustion: {},
                answer: {},
                rank_it: {},
                msgSave_yn: { /** 내부 */ },
                msgPrint_yn: { /** 내부 */},                
            }
        },
        read: {
            params: {
                faq_idx: { /** PK */},
                xml_yn: { /** 출력이 있는경우 */},
                msgSave_yn: { /** 내부 */ },
                msgPrint_yn: { /** 내부 */},
            },
            output: [
                {
                    columns: {
                        /** 전체의 표현 */
                        faq_idx: {},
                        qustion: {},
                        answer: {},
                        rank_it: {},
                        del_yn: {},
                        create_dt: {}
                    }
                }
            ]
        },
        update: {
            params: {
                faq_idx: { /** PK */},
                qustion: {},
                answer: {},
                rank_it: {},
                msgSave_yn: { /** 내부 */ },
                msgPrint_yn: { /** 내부 */},
            },
        },
        delete: {
            params: {
                faq_idx: { /** PK */},
                msgSave_yn: { /** 내부 */ },
                msgPrint_yn: { /** 내부 */},
            }
        },
        list: {
            params: {
                keyword: {},
                page_size: {},
                page_count: {},
                sort_cd: {},
                row_total: { output: 1 },
                xml_yn: { /** 출력이 있는경우 */},
                msgSave_yn: { /** 직접입력 */ },
                msgPrint_yn: { /** 직접입력 */},
            },
        },
        /** 확장 예시 */
        create_main: {
            params: {
                /** 합집합이 구성되어야 함 */
            },
            call: [
                {
                    type: 'sp',
                    name: 'create'
                },
            ],
            return: { name: 'meb_idx' } /** 필요성은 확인필요 !! */
        }
    },
    group: {
        access: { /** 이용: Cls 전체 프로시저 접근 */
            sp: [
                {
                    type: 'sp',
                    name: 'create'
                },
                {
                    type: 'sp',
                    name: 'read'
                },
                {
                    type: 'sp',
                    name: 'update'
                },
                {
                    type: 'sp',
                    name: 'delete'
                },
                {
                    type: 'sp',
                    name: 'list'
                },
            ]
        },
        admin_C: { /** 이용: Admin C, Admin svc */
            sp: [
                {
                    type: 'sp',
                    name: 'create'
                },
                {
                    type: 'sp',
                    name: 'read'
                },
                {
                    type: 'sp',
                    name: 'update'
                },
                {
                    type: 'sp',
                    name: 'delete'
                },
                {
                    type: 'sp',
                    name: 'list'
                },
            ]
        },
        front_C: { /** 이용: Front C, Front svc */
            sp: [
                {
                    type: 'sp',
                    name: 'list'
                },
                {
                    type: 'sp',
                    name: 'list'
                },
            ]
        },
    }
};