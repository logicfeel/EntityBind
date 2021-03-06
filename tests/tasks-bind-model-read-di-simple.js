/**
 * 모듈 테스트
 */
//===============================================
// 선언
require("../src/object-implement"); // _implements() : 폴리필

var BindModelReadAjax       = require("../src/bind-model-read-ajax");
var IBindModelRead          = require("../src/i-bind-model-read");
var MetaObject              = require("../src/meta-object");
var util                    = require("../src/utils");



//-----------------------------------------------------
// 페이지 의존 함수
function readDI() {
    MetaObject.call(this);

    this.read = null;       // 가상으로 지정함
    
    this.prop = {
        cmd: "INSERT",
        idx: 130
    };
    
    this.mode = {};

    this.preRegister = function() {
        this.read.cbOutput = readView;
    };
    this.cbValid = null;
    this.preReady = function(model) {
        this.read.execute();
    };

    function readView(entity) {
        console.log("cbOutput  호출");    
        console.log("this._model.first.items.count  10 ==> " + this._model.first.items.count);   
        console.log("entity.items.count             10 ==> " + entity.items.count);   
        console.log("entity.rows.count              1  ==> " + entity.rows.count);   
        console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._element);   
    }

    /** @implements */
    this._implements(IBindModelRead);            
}
util.inherits(readDI, MetaObject);

//-----------------------------------------------------
// 연결
var e = new BindModelReadAjax(new readDI());

// 등록
// e.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";
e.baseUrl = "jsons/sample_row_single.asp";
e.baseUrl = "jsons/sample_row_single.json";

e.onFail = function(p_msg) {
    console.log("오류  ==> " + p_msg);
};

//------------------------------
// e.read.execute();
e.init();
console.log("-End-");