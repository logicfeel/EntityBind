/**
 * 모듈 테스트
 */
//===============================================
// 선언
var Item                    = require("../src/entity-item-dom");
var BindModelReadAjax       = require("../src/bind-model-read-ajax");
var IBindModelRead          = require("../src/i-bind-model-read");
var util                    = require("../src/utils");

function ReadDI() {
    IBindModelRead.call(this);

    __this = this;          // 내부용 this

    this.attr = {
        cmd: "INSERT",
        idx: 130,
        cnt: {caption: "카운터"}
    };

    // 등록 방법 
    // 1) 함수로 선언하여 위치를 자유롭게 선언 후 cbRegister에 등록
    // 2) cbRegister 에 즉시 선언
    // 3) this.XXX 선언후 등록 (this.cbRegister 보다 우선 선언해야 함)
    this.cbRegister = function() {
        this.read.cbView = function(entity) {      // 함수로 선언하여 위치를 자유롭게 두던지, 
            console.log("cbView  호출");    
            console.log("this._model.first.items.count  10 ==> " + this._model.first.items.count);   
            console.log("entity.items.count             10 ==> " + entity.items.count);   
            console.log("entity.rows.count              1  ==> " + entity.rows.count);   
            console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._element);   
            __this.msg();

            var filter = {
                except: "row_count",
                adm_id: {caption: "관리자아이디요", order: 10000}
            };
            var list = entity.select(filter);

            console.log("STOP")
        };
    };

    this.cbReady = function(model) {
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
e.baseUrl = "http://rtwgs4.cafe24.com/sample_row_single.asp";
// e.baseUrl = "http://rtwgs4.cafe24.com/sample_row_single.as";    // 오류 1
// e.baseUrl = "jsons/sample_row_single.json";                     // 오류 2

// 추가 등록 ----------------------
e.onFail = function(p_msg) {    // 공통(상위) 오류 등록
    console.log("오류  ==> " + p_msg);
};

e.onExecute = function() {      // 실행시
    console.log("onExecute 이벤트 ");
};
e.onExecuted = function() {      // 실행끝
    console.log("onExecuted 이벤트 ");
};

// 1) 'attr'의 단일 Items을 등록
// 1-1) attr(단일객체)를 >> entity에 개별 등록
// e.read.valid.items.add(new Item("cnt", e.read.valid, e.attr["cnt"])); // 1번 방법(비추)
// e.read.valid.items.addValue("cnt", e.attr["cnt"]);              // 2번 방법 (추천)
// addValue
// 1-2) attr(단일객체)를 >> entity목록(배열)에 등록
// addValue
// 1-3) attr(단일객체)를 >> cmd목록(배열)에 속한 모든 entity에 등록
// addValue
// 2) 'attr'의 여러 Item을  등록
// loadAttr(['cmd', 'addr']);
// 2-1-1) 전체 attr을 기본(baseEntity) 엔티티에 로딩
// e.loadAttr();
// 2-1-2) 지정 attr을 지정 엔티티에 로딩
// e.second = new EntityTable('second');
// e.loadAttr(['cmd', 'addr'], 'second');
// 2-2-1) 여러 아이템을 지정한 entity에 등록
// e.read.setEntity(['cmd', 'addr'], 'bind');
// 2-2-2) 여러 아이템을 cmd의 모든 entity에 등록
// e.read.setEntity(['cmd', 'addr']);
//===============================================
e.init();
console.log("-End-");