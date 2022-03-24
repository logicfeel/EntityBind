
/**
 * 메타 스키마 최상위
 */
class MetaSchema {
    constructor() {

    }
}

/**
 * 1. 템플릿에 대한 스키마를 지정한다.
 */
// 구현방식 1
class schema extends MetaSchema {
    constructor() {
        super();
        // 구조 정의
        this.table.add('master', isExtend);
        this.view.add('inner', isExtend);
        this.sp.add('create', isExtend);
        this.sp.add('read', isExtend);

        // 내부 컬럼 등록
        this.view['inner'].column.add({ name: 'xml_yn', type: 'boolean', rank_it: 99 });
        this.view['inner'].column.add({ name: 'msgSave_yn', type: 'char', rank_it: 99 });
        // 내부 컬럼 등록 (참조)
        this.sp['read'].column.add(this.view['inner'].columns['xml_yn']);
        this.sp['read'].column.add(this.view['inner'].columns['msgSave_yn']);

        // 이벤트
        this.table['master']._onAdd = (col) => {
            this.sp['create'].params.add(col);  // 참조형식으로 등록
        };
    }
}
// 구현방식 2
class schema extends MetaSchema {
    constructor() {
        super();
        // 구조 정의
        this.model = {
            table: {
                master: { 
                    onAdd: (col) => {
                        this.sp['create'].params.add(col);  // 참조형식으로 등록
                    }
                }
            },
            view: {
                inner: {
                    columns: {
                        xml_yn: { type: 'boolean', rank_it: 99 },
                        msgSave_yn: { type: 'char', rank_it: 99 }
                    }
                }
            },
            sp: {
                create: {},
                read: {
                    params: ['view.inner.columns.xml_yn', 'view.inner.columns.msgSave_yn']
                }
            }
        };
    }
}

/**
 * 2. 스키마에 대한 템플릿 작성 : *.hbs
 * 상속여부??
 */
class MetaTemplate {
    constructor() {
        // 메타에 대한 스키마 지정
        this.shcema = SchemaCRUDL;  
        // 메타모델을 지정한다.
        this.meta = null;
        // 출판할 파일 설정
        // .....
    }
}

/**
 * 3. 메타모델을 작성한다.
 *  상속여부??
 */
class MetaModel {
    constructor() {
        // 메타 스키마 주입
        this.setSchema(new SchemaCRUDL());
        // 기본 컬럼 추가
        this.table['master'].column.add({ name: 'title' })

    }
    setSchema(s) {}
    static getObject() {}
}

/**
 * 템플릿을 출판한다.
 */
// 즉시 출판
var mt = MetaTemplate();
mt.compile(MetaModel.getObject());

// 템플릿 교체 방법



