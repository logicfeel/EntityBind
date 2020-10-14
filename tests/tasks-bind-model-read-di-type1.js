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

    this.attrs = {
        cmd: "INSERT",
        idx: 130
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
            console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._items);   
            __this.msg();
        };
    };

    this.cbResume = function(model) {
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
// e.baseUrl = "jsons/sample_row_single.json";                      // 오류 2

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

//===============================================
e.init();
console.log("-End-");