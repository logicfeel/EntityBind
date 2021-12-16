/**
 * 메타를 내보내고 병합하는 소스 예제
 */

// ###############################################
// 메타 모듈 내보내기

// 메타 정의
class MetaModule_A extends SuperMeta {
    constructor() {

    }
}

// 

// 내보내기
module.exports = MetaModule_A;

// ###############################################

// 메타 모듈 불러오기
import MetaModel from 'MetaModel';
import MM_FAQ_Table from 'MM_FAQ_Table';

class MM_FAQ extends MetaModel {
    constructor() {
        super();    // 기본호출해야 함

        /**
         * 파일 로딩
         * 이부분은 기본으로 지정해야 할까?
         *  - 선택적으로 로딩할 경우 어떻게?
         */
        this.load('meta.json');

        /**
         *  - 가져올때 이름 충돌시 경고 메세지 (덮어쓰기)
         *  - 의존성이 깨지면(참조 table 은 그대로 두고 sp만 가져온 경우) 에러 메세지!!
         */
        


        // 메타클래스 생성
        var table = new MM_FAQ_Table();
        
        // 조각(part) 노출 설정
        this.part.table = table;

        // 동적 속성 설정
        this.part.table['M01_Table'].dynamic.add({
            name: 'cd_job',
            isNotNull: false,
            caption: '직업코드'
        });

        this.add(table);                        // 전체 추가
        this.table.add(table);                  // 테이블 전체 추가
        this.table.add(table, 'XXX_table');     // 특정 테이블 추가
        this.table.add(table, ['XXX_table']);   // 특정 테이블[들] 추가

        
    }
    // 추가 모듈의 동적 추가 부분의
}

// ###############################################
/**
 * 메타 사용 예시 : AutoTemplate 에서
 */
// 메타 객체 생성
var mm = new MM_FAQ();

// 하위 모듈 동적 
/**
 * 명칭의 충돌 이슈 있음 => 예> table
 */
mm.part.table['M01_Table'].dynamic.add({
    name: 'cd_job',
    isNotNull: false,
    caption: '직업코드'
});


class ServerSide extends AutoTemplate {
    constructor() {
        
        // 템플릿 데이터를 설정한다.
        this.data = mm;
    }
}

// 템플릿 생성
var sTemp = new ServerSide();

sTemp.build();

/**
 * CLI 로 해결하는게 맞을듯..
 * 빌드 방식
 *  - CLI 를 통한 빌드
 *  - >node 임시파일.js   // 실행으로 처리
 *  - 
 * 템플릿 동적 속성 추가는 어디에서 해야 할까?
 */

// TODO::
// 생성은 어디서 해야 하나?
// 동적컬럼 추가 시점은 어디 인가?


/**
 * - 가져와서 조립할 것인지? vs 조립과 조립의 관점인가?
 * 개발의 관점과 사용의 관점이 분리됨
 *  - Vue 는 객제주입 방식 : new Vuex.Store({...}) 
 *  독립 방식(2.0)
 *      + Vue.component('todo-item', {..)}  // 컴포넌트 사전 등록
 *      + var app = new Vue({...})          // 생성 + 매핑 동시에 진행
 *      + app.$data ..                      // 데이터 연결
 *      + app.$el   (element의 약자인듯)       // 셀렉터 위치
 *      + app.$watch('a', function...)      // 데이터 관찰자
 *      # 생성후 app 객체 설정에 따른 시점 이슈가 있음! (혼동)
 *  독립 방식
 *      + 함수를 호출하여 특정 ID에 마운트
 *      + app = createApp({...});           // 앱 생성, 데이트 구조 
 *      + app.component('tag-name', {...}); // 컴포넌트 등록
 *      + app.mount("#야이디");               // #ID에 적용
 *  싱글페이지 방식
 *      + index.html        // ID 적용 위치 로딩  
 *      + src/main.js       // 로딩
 *          - plugins....   // 스타일
 *          - App.vue       // 최상위 컴포넌트 export defaut ... 
 *          - router.js     // 경로설정 : URL vs page.Vue
 *          - store.js      // 저장소, get/set 매핑작업
 *      # 싱글페이지에서는 만들고 컴파일함 (웹 방식)
 *  - React 는 상속 후 클래스 선언 방식
 *  독립 방식
 *      + Rander JSX 사용
 *      + 상속한 클래스명은 사용자 태그로 전환됨    
 *         class LikeButton => <like-button>...</like-button>
 *         즉, 객체의 생성자는 사용자 테그 등록임
 *      + ReactDOM.render(<App />, documnet.getElementById('root'))
 *          이 시점에 생성하여 root ID 에 App 가 만들어준다.
 * 
 */
