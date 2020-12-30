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

    var __this = this;          // 내부용 this : prototype 접근지시자

    this.prop = {
        cmd: "INSERT",
        idx: 130,
        listURL: "Notice_Lst.asp",
        sto_id: {
            caption: "상점코드", 
            value: "1220",
            constraints: [
                { regex: /\D/, msg: "숫자만 입력해야함...", code: 100},
                { regex: /12/, msg: "12로 시작해야함...", code: 150, return: true},
                { regex: /[0-9]{5}/, msg: "5자리 미만 숫자만...", code: 200 }
            ]
        }, 
        ntc_idx: {caption: "일련번호", value: 12},
        title: {caption: "제목", value: "제목이요"},
        writer: {caption: "작성자", value: "작가"},
        noticeType: {caption: "공지타입", value: "G"}
    };

    this.preRegister = function() {
        console.log("cbREgister.#btn_List 이벤트 등록..");
        this.read.cbOutput = __this.readView;
        this.read.cbValid = __this.readValid;
    };

    this.cbValid = function() {   // 2.검사
        if (this.prop.cmd === "") Msg("에러! 잘못된 접근경로입니다.");
        return true;
    };

    this.preReady = function(model) {
        this.read.execute();
    };

    this.cbFail = function(p_msg, p_code) {
        console.log("실패 :: Code= \"%s\", Message= %s ", p_code, p_msg);
    };

    this.cbError = function(p_msg, p_status) {
        console.log("오류 :: Status= \"%s\" , Message= %s ", p_status, p_msg);
    };

    this.onExecute = function() {       // 실행시 이벤트 등록
        console.log("onExecute 이벤트. ");
    };
    this.onExecuted = function() {      // 실행끝 이벤트 등록
        console.log("onExecuted 이벤트.. ");
    };
}
util.inherits(ReadDI, IBindModelRead);

ReadDI.prototype.readView = function(entity) {
    console.log("-------------------------------------------------------");
    console.log("cbOutput  호출");
    console.log("this._model.first.items.count  10 ==> " + this._model.first.items.count);   
    console.log("entity.items.count             10 ==> " + entity.items.count);   
    console.log("entity.rows.count              1  ==> " + entity.rows.count);   
    console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._element);       
};

ReadDI.prototype.readValid = function() {
    console.log("경고창:등록하시겠습니까 ?  => Yes ");
    return true;
};



//===============================================
// 테스크 1
var e = new BindModelReadAjax(new ReadDI(), true);
// var e = new BindModelReadAjax(new ReadDI());

// 속성 설정
e.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";
// e.baseUrl = "http://rtwgs4.cafe24.com/sample_row_single.as";    // 오류 1
// e.baseUrl = "jsons/sample_row_single.json";                     // 오류 2

// 추가 등록 ----------------------
// e.loadProp();

// e._baseEntity.items["sto_id"].setConstraint(/\D/, "숫자만 입력해야함...", 100);
// e._baseEntity.items["sto_id"].setConstraint(/[0-9]{5}/, "5자리 미만 숫자만...", 200);
// e._baseEntity.items["sto_id"].setConstraint(/\S/, "문자만 입력해야함....", 300);

e.read.setItem(["title", "sto_id"], "valid");

// e.onExecute = function() {      // 실행시
//     console.log("onExecute 이벤트 ");
// };
// e.onExecuted = function() {      // 실행끝
//     console.log("onExecuted 이벤트 ");
// };

// e.read.cbValid = function() {     // REVIEW 추가 검토 필요!!
//     console.log("경고창:등록하시겠습니까 ?  => Yes ");
//     return true;
// };

//===============================================
e.init();
console.log("-End-");