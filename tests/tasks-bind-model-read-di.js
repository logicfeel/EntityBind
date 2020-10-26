/**
 * 모듈 테스트
 */
//===============================================
// 선언
require("../src/object-implement"); // _implements() : 폴리필

var Item                    = require("../src/entity-item-dom");
var BindModelReadAjax       = require("../src/bind-model-read-ajax");
var IBindModelRead          = require("../src/i-bind-model-read");
var EntityTable             = require("../src/entity-table").EntityTable;
var MetaObject              = require("../src/meta-object");
var util                    = require("../src/utils");


function readDI() {
    MetaObject.call(this);

    this.read = null;       // 가상으로 지정함
    
    this.attr = {
        cmd: "INSERT",
        idx: 130
    };
    

    this.mode = {};
    this.cbRegister = function() {
        this.read.cbOutput = readView;
    };
    this.cbValid = null;
    // this.cbReady = null;
    this.cbReady = function(model) {
        this.read.execute();
    };

    function readView(entity) {
        console.log("cbOutput  호출");    
        console.log("this._model.first.items.count  10 ==> " + this._model.first.items.count);   
        console.log("e.first.items.count            10 ==> " + e.first.items.count);   
        console.log("entity.items.count             10 ==> " + entity.items.count);   
        console.log("entity.rows.count              1  ==> " + entity.rows.count);   
        console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._element);   
    }

    function listView(entity) {
        // ....        
    }

    /** @implements */
    this._implements(IBindModelRead);            
}
util.inherits(readDI, MetaObject);

// var t = new EntityTable("second");

//===============================================
// 테스크 1
var e = new BindModelReadAjax(new readDI());
// var di = new readDI();
// var e = new BindModelReadAjax(di);

// 등록
e.baseUrl = "http://rtwgs4.cafe24.com/sample_row_single.asp";

// e.read.cbOutput = di.cbOutput;
// e.read.cbOutput = function(entity) {
//     console.log("cbOutput  호출");    
//     console.log("this._model.first.items.count  10 ==> " + this._model.first.items.count);   
//     console.log("e.first.items.count            10 ==> " + e.first.items.count);   
//     console.log("entity.items.count             10 ==> " + entity.items.count);   
//     console.log("entity.rows.count              1  ==> " + entity.rows.count);   
//     console.log("entity.rows[0]                 ,, ==> " + entity.rows[0]._element);   
// };

e.onFail = function(p_msg) {
    console.log("오류  ==> " + p_msg);
}

e.init();
//------------------------------
// e.read.execute();

console.log("-End-");