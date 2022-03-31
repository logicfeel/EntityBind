
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


/**
 * 오토 인터페이스 참조
 */

/**
 * ICrudl 인터페이스
 */
class ICrudl {
    constructor() {
        /** @type String */
        this.url = "";
    }
}
// 인터페이스 구현
class Auto_A extends Automation {
    constructor() {
        
        this.url = "www...";

        this._implements(ICrudl);
    }
}
class Auto_B extends Automation {
    constructor() {
        
        this.url = "WWW...";

        this._implements(ICrudl);
    }
}
// 인터페이스 사용
class Auto_C extends Automation {
    constructor() {
        this.MOD = new Auto_A();
        // 인터페이스 참조 부분 선언
        if (!this.auto.isImplementOf(ICrudl)) {
            this.refURL = this.MOD.url;
        }
    }
}
// 인터페이스 사용 교체 
class AutoMain extends Automation {
    constructor(){
        this.SUB = Auto_C.getInstance();
        // 인스턴스 하위 교체(내부적으로 인터페이스를 검사한다.)
        this.SUB.MOD = new Auto_B();
    }
}

/**
 * 오토컴포넌트
 */
class AutoComponent {}

/**
 * FAQ 기준의 오토 컴포넌트
 */
class FAQComponent extends AutoComponent {
    constructor() {
        // 메타 모델 정의
        this.meta = FAQ.getInstance();
        // 오토 구성
        this.view = new AutomationFAQ();
        // 참조 지정
        this.model = this.view.mod['server'].mod['db'];
    }
}

class GroupComponent extends AutoComponent {
    constructor() {
        this.group = [];
        this.group.push(new FAQComponent());  // 타입이 들어감
    }
}

/**
 * 어떤식으로 컴포넌트를 사용할지 .... 자유롭게 
 */
class ComponentE1 extends AutoComponent {
    constructor() {
        super();
        // 컴포넌트의 주인 
        this.owner = new FAQAutomation();
        // 참조 타입 지정
        this.model = this.owner.mod['model'];
    }
}
/**
 * 컴포넌트를 생성해서 오토에 지정하면
 */
class AutoChange extends Automation {
    constructor() {
        // 기본 오토 추가
        this.mod.add('view1', require('view2'));
        // sub 로 오토 추가
        this.mod.sub('view1', require('view2'));
        // super 로 오토 추가
        this.mod.super('view1', require('view2'));

        // 네임스페이스 지정
        this.namespace = 'logic.component.mssql';
        this.name = 'asp_View'
        // 사용시 : mssql 이름공간의 오토를 찾아낸다.
        var c = this.ns.logic.component.mssql;
        // 사용시 : component 이름공간 하위의 오토를 찾아낸다.
        var c = this.ns.logic.component;

        // 교체 방법 1 : 셀렉터 교칙 이용
        // view 자식중 db
        this.change('view1 > db', require('new_db'));
        // view 자손중 db
        this.change('view1 db', require('new_db'));
        // db 형제중 db2
        this.change('db ~ db2', require('new_db'));
        // npm 명이 npm_name
        this.change('#npm_name', require('new_db'));
        // 메소드명 교체
        this.replace('view1 > db', require('new_db'));
        /**
         * 조건
         *  - Automation 의 자식이어야 한다.
         *  - 교체 대상에 인터페이스가 구현하였으면 동일한 구현을 해야 한다.
         *  - sup/super 로 연결된 경우 대상을 상속한 자식만 가능하다.
         *  - mod 로 연결된 경우는 가능하다.
         *  - auto map 을 통헤서 auto-map.json 파일을 참조하여 교체
         */
    }
}