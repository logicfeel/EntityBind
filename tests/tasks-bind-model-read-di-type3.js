/**
 * 모듈 테스트
 */
//===============================================
// 선언
var Item                    = require("../src/entity-item").Item;
var ItemDOM                 = require("../src/entity-item-dom");
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
    console.log("entity.rows.count              3  ==> " + entity.rows.count);   
    console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._element);

    // 테스트 위치
    console.log(entity.items.count);
    
    var s1 = entity.select({__except: ["acc_idx", "adm_id"]}, 1)
    console.log(s1.items.count);
    
    var i1 = this._model.first.items[3];
    var i2 = this._model.first.items[3].clone();

    var t1 = this._model.first.clone();
    var t2 = entity.clone();
    
    console.log(i1);
    console.log(i2);

    var s2 = entity.copy({__except: ["acc_idx"]}, 0)
    console.log(s2.items.count);



    console.log("-STOP-");
};

ReadDI.prototype.readValid = function() {
    console.log("경고창:등록하시겠습니까 ?  => Yes ");
    return true;
};

//===============================================
// 테스크 1
var e = new BindModelReadAjax(new ReadDI(), true, ItemDOM);

e.baseUrl = "http://rtwgs4.cafe24.com/sample_row_multi.asp";

e.init();
//===============================================

console.log("-End-");