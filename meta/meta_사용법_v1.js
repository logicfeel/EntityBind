
class Automation {}

class AutoTemplate {}

/**
 * 하위 오토 설정
 */
var AutoGroup = require('위치');
var AutoSub = require('위치');
var AutoSuper = require('위치');

class AutoFAQ extends Automation {
    constructor() {
        super();
        // 오토 묶음 추가
        this.MOD.add('good', new AutoGroup());
        // sub 타입 추가 : 연관성 대상
        this.MOD.sub('good', new AutoSub());
        // sub 타입 추가 : 연관성 대상
        this.MOD.super('good', new AutoSuper());
    }
}

/**
 * 오토 재정의
 */
var AutoGroup = require('위치');
 
class AutoFAQ extends Automation {
    constructor() {
        super();
        var a = new AutoGroup();
        
        a.title = '타이틀';
        // 오토 재정의 : good 와 상속한 하위만 오버라이딩 할 수 있음!!
        this.MOD['good'] = a;
    }
}

/**
 * 오토를 상속하여  모듈의 재정의
 */
var rede = new require('재정의 오토');

class AutoEntryFAQ extends AutoFAQ {
    constructor() {
        super();
        // 오토 제거
        this.MOD['seq'] = null;
        // 오토 재설정 : 메타스키마를 존재시 기준으로 검사한다.
        this.MOD['seq'] = rede;
    }
}

/**
 * 오토 기본 생성 + 모델 스키마 설정
 */
 class AutoFAQ extends Automation {
    constructor() {
        super();
        // 정적 오토 [선택]
        this.isStatic = true;   
        // 템플릿 사용 [선택]
        this.template = new AutoTemplate(this);
        // 템플릿 스키마(타입) 설정 [선택]
        this.template.schema = MM_FAQ;
        // 템플릿 조각 가져오기
        this.template.part.add('page-one', {/** 외부객체 */});    
    }
}

/**
 * 오토 외부 템플릿 지정 
 * @memo 템플릿의 helper, part를 그대로 사용하는 경우
 */
import {OutTemplate} from "위치";

class AutoFAQ extends Automation {
    constructor() {
        super();
        // 외부 템플릿
        this.template = new OutTemplate(this);
    }
}

/**
 * 오토 템플릿에 메타모델 설정
 */
 class AutoFAQ extends Automation {
    constructor() {
        super();

        // 템플릿 사용 [선택]
        this.template = new OutTemplate(this);
        // 템플릿 모델 설정 : OutTemplate 에 schema 지정되어 있을시 검사함
        this.template.model = MM_FAQ.getInstance();
        // 확장컬럼 영역을 추가한다. : add 기본추가로 사용할려면 템플릿 제작에 많은 시간소요됨
        this.template.model.table['master'].columns.extend({ 
            name: 'add_Name', caption: '컬럼추가' 
        });
    }
}

/**
 * 즉시실행 : 템플릿으로 소스 생성
 */
var t = new require('외부 템플릿').Template;
var m = MM_FAQ.getInstance();
// 인스턴스 설정
m.table['FAQ'].columns.extend({ name: 'exter_col', caption: '확장컬럼' });
m.table['FAQ'].columns.extend({ name: 'exter_co2', caption: '확장컬럼' });
// 모델 설정
t.model = m;
// 'publish'폴더에 소스 생성
t.compile();