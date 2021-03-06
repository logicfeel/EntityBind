/**
 * 모듈 테스트
 */
//===============================================
// 선언
var Item                    = require("../src/entity-item").Item;
var MetaElement             = require("../src/meta-element");


var BindModelReadAjax       = require("../src/bind-model-read-ajax");
var IBindModelRead          = require("../src/i-bind-model-read");
var util                    = require("../src/utils");

function ReadDI() {
    IBindModelRead.call(this);

    __this = this;          // 내부용 this

    this.prop = {
        cmd: "INSERT",
        idx: 130,
        cnt: {caption: "카운터"}
    };

    // 등록 방법 
    // 1) 함수로 선언하여 위치를 자유롭게 선언 후 preRegister에 등록
    // 2) preRegister 에 즉시 선언
    // 3) this.XXX 선언후 등록 (this.preRegister 보다 우선 선언해야 함)
    this.preRegister = function() {
        this.read.cbOutput = function(entity) {      // 함수로 선언하여 위치를 자유롭게 두던지, 
            console.log("cbOutput  호출");    
            console.log("this._model.first.items.count  10 ==> " + this._model.first.items.count);   
            console.log("entity.items.count             10 ==> " + entity.items.count);   
            console.log("entity.rows.count              1  ==> " + entity.rows.count);   
            console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._element);   
            __this.msg();

            var filter = {
                __except: "row_count",
                adm_id: {caption: "관리자아이디요", order: 10000},
                del_yn: {__except: true}

            };
            
            var list = entity.select(filter);
            console.log("filte....")
            console.log("list.length  8 ==> " + list.length);
            // 필터 인스턴스 타입 검사
            if (list[0] instanceof Item) console.log("true");
            if (list[0] instanceof MetaElement) console.log("true");


            // 제약조건 : 실패조건과 메세지를 등록하는 방식
            console.log("제약조건 테스트------------------");
            var msg = {};
            list[0].isNotNull = true;
            list[0].caption = "상점코드";
            list[0].setConstraint(/\D/, "숫자만 입력해야함...", 100);
            list[0].setConstraint(/[0-9]{5}/, "5자리 이하만...", 200);
            list[0].setConstraint(/\s/, "공백은 안되요...", 200);
            console.log(list[0].valid("", msg));

            var m = msg.msg;
            var aaa = "AAAa";
            
            console.log(m)
            // console.log('msg : %s %s  ${aaa}..', aaa, "AAA");
            console.log("STOP")
        };
    };

    this.preReady = function(model) {
        this.read.execute();
    };

}
util.inherits(ReadDI, IBindModelRead);

ReadDI.prototype.msg = function(a) {
    console.log("msg...");
};

//===============================================
// 테스크 1
var e = new BindModelReadAjax(new ReadDI());

// 속성 설정
e.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";
// e.baseUrl = "http://rtwgs4.cafe24.com/sample_row_single.as";    // 오류 1
// e.baseUrl = "jsons/sample_row_single.json";                     // 오류 2

// 추가 등록 ----------------------
e.cbFail = function(p_msg) {    // 공통(상위) 오류 등록
    console.log("오류  ==> " + p_msg);
};

e.onExecute = function() {      // 실행시
    console.log("onExecute 이벤트 ");
};
e.onExecuted = function() {      // 실행끝
    console.log("onExecuted 이벤트 ");
};

// 1) 'prop'의 단일 Items을 등록
// 1-1) prop(단일객체)를 >> entity에 개별 등록
// e.read.valid.items.add(new Item("cnt", e.read.valid, e.prop["cnt"])); // 1번 방법(비추)
// e.read.valid.items.addValue("cnt", e.prop["cnt"]);              // 2번 방법 (추천)
// addValue
// 1-2) prop(단일객체)를 >> entity목록(배열)에 등록
// addValue
// 1-3) prop(단일객체)를 >> cmd목록(배열)에 속한 모든 entity에 등록
// addValue
// 2) 'prop'의 여러 Item을  등록
// loadProp(['cmd', 'addr']);
// 2-1-1) 전체 prop을 기본(baseEntity) 엔티티에 로딩
// e.loadProp();
// 2-1-2) 지정 prop을 지정 엔티티에 로딩
// e.second = new EntityTable('second');
// e.loadProp(['cmd', 'addr'], 'second');
// 2-2-1) 여러 아이템을 지정한 entity에 등록
// e.read.setEntity(['cmd', 'addr'], 'bind');
// 2-2-2) 여러 아이템을 cmd의 모든 entity에 등록
// e.read.setEntity(['cmd', 'addr']);
//===============================================
e.init();
console.log("-End-");