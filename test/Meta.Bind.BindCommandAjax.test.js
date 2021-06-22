/**
 * @namespace _W.Test.BindCommandAjax
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Test           = global._W.Test || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCount = 0;
    var result = [];        // 결과 확인 **사용시 초기화    
    var isCallback = global.isCallback === false ? false : true;

    var util;        
    var Row;
    var Item;
    var EntityView;
    var EntityTable;
    var BindModelAjax;

    if (typeof module === "object" && typeof module.exports === "object") {  
        require("../src/object-implement"); // _implements() : 폴리필
        util                    = require("../src/utils");
        Row                     = require("../src/entity-row").Row;
        Item                    = require("../src/entity-item").Item;
        EntityView              = require("../src/entity-view").EntityView;
        EntityTable             = require("../src/entity-table").EntityTable;
        BindModelAjax           = require("../src/bind-model-ajax");
    } else {
        util                    = global._W.Common.Util;
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("cbValid        :: 검사시 실행 ");
            console.log("cbBind         :: 바인딩시 실행 ");
            console.log("cbOutput       :: 뷰 출력시 실행 [View 하위만] ");
            console.log("cbEnd          :: 실행 완료시 실행 (명령간 연결의 용도 + 서버측 결과) ");
            console.log("onExecute      :: 명령 엔티티 실행[execute()] 실행 전 ");
            console.log("onExecuted     :: 명령 엔티티 실행[execute()] 실행 후 ");
            var model = new BindModelAjax();
            model.result = [];
            model.addCommand('read', 1);
            model.read.addItem("i1", "V1");
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            // model.baseUrl = "http://rtwgs4.cafe24.com/";                 // 오류 1 : 403
            // model.baseUrl = "sample_row_single.json";                    // 오류 2
            // model.baseAjaxSetup.async = false;                           // 동기화로 변경
            model.read.cbValid = function() {
                this._model.result.push("cbValid");
                return true;
            };
            model.read.cbBind = function(p_ajaxSetup) {
                this._model.result.push("cbBind");
            };
            model.read.cbOutput = function() {
                this._model.result.push("cbOutput");
            };
            model.read.cbEnd = function(p_result) {
                this._model.result.push("cbEnd");
            };
            model.read.onExecute = function() {
                this._model.result.push("read.onExecute");
            };
            model.read.onExecuted = function() {
                this._model.result.push("read.onExecuted");
            };
            model.onExecute = function() {
                this.result.push("onExecute");
            };
            model.onExecuted = function() {
                this.result.push("onExecuted");
                console.log("---------------------------------------------------------------------------");
                console.log("cbOutput, cbEnd, read.onExecuted, onExecuted :: 콜백 ");
                // 콜백에서 검사
                if (this.result[0] === "read.onExecute" && 
                    this.result[1] === "onExecute" && 
                    this.result[2] === "cbValid" && 
                    this.result[3] === "cbBind" && 
                    this.result[4] === "cbOutput" && 
                    this.result[5] === "cbEnd" && 
                    this.result[6] === "read.onExecuted" && 
                    this.result[7] === "onExecuted" && 
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
                result = [];    // 콜백 초기화
            };
            model.read.execute();
        }
        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("cbBaseValid        :: 검사시 실행 ");
            console.log("cbBaseBind         :: 바인딩시 실행 ");
            console.log("cbBaseOutput       :: 뷰 출력시 실행 [View 하위만] ");
            console.log("cbBaseEnd          :: 실행 완료시 실행 (명령간 연결의 용도 + 서버측 결과) ");
            console.log("onResult           :: 명령 엔티티 실행[execute()] 실행 전 ");
            result = []; 
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = [];
            model.read.addItem("i1", "V1");
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            // model.baseUrl = "http://rtwgs4.cafe24.com/";                 // 오류 1 : 403
            // model.baseUrl = "sample_row_single.json";                    // 오류 2
            // model.baseAjaxSetup.async = false;                           // 동기화로 변경
            model.cbResult = function(p_result) {
                p_result["cbResult"] = 10;
                return p_result;
            };
            model.cbBaseValid = function() {
                this.result.push("cbBaseValid");
                return true;
            };
            model.cbBaseBind = function(p_ajaxSetup) {
                this.result.push("cbBaseBind");
            };
            model.cbBaseOutput = function() {
                this.result.push("cbBaseOutput");
            };
            model.cbBaseEnd = function(p_result) {
                this.result.push("cbBaseEnd");
            };
            model.read.cbEnd = function(p_result) {
                this._model.result.push("cbEnd");
                this._model.result.push(p_result["cbResult"]);  // 10
            };
            model.onExecuted = function() {
                this.result.push("onExecuted");
                console.log("---------------------------------------------------------------------------");
                console.log("cbBaseOutput, cbBaseEnd... :: 콜백 ");
                // 콜백에서 검사
                if (true 
                    && this.result[0] === "cbBaseValid"
                    && this.result[1] === "cbBaseBind"
                    && this.result[2] === "cbBaseOutput"
                    && this.result[3] === "cbBaseEnd"
                    && this.result[4] === "cbEnd"
                    && this.result[5] === 10
                    ) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
                result = [];    // 콜백 초기화
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BaseBind.eventPropagation = false        :: 이벤트 전파 금지 ");
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = []; 
            model.read.addItem("i1", "V1");
            model.read.eventPropagation = false;
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            model.read.onExecute = function() {
                this._model.result.push("read.onExecute");
            };
            model.read.onExecuted = function() {
                this._model.result.push("read.onExecuted");
                console.log("---------------------------------------------------------------------------");
                console.log("read.onExecuted, onExecuted :: 콜백 ");
                if (this._model.result[0] === "read.onExecute" && 
                    this._model.result[1] === "read.onExecuted" && 
                    this._model.result.length === 2 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.onExecute = function() {
                this.result.push("onExecute");
            };
            model.onExecuted = function() {
                this.result.push("onExecuted");
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 1) row 기준으로 가져옴 ");
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            model.read.cbOutput = function(p_result) {
                console.log("---------------------------------------------------------------------------");
                console.log("BindCommandAjax.execute() :: 콜백 ");
                if (this.output.items.count > 0 &&
                    this.output.rows.count > 0 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.read.execute();
        }
        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 2) 존재하는 아이템만 가져옴 ");
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            model.read.addItem("sto_id", "output");
            model.read.addItem("adm_id", "output");
            model.read.outputOption = 2;    // 존재하는 컬럼만 가져오기
            model.read.cbOutput = function(p_result) {
                console.log("---------------------------------------------------------------------------");
                console.log("BindCommandAjax.execute() :: 콜백 ");
                if (this.output.items.count === 2 &&
                    this.output.rows.count === 1 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 3) 존재하는 아이템만 가져옴, + rows[0] value 설정 ");
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            model.read.addItem("sto_id", "output");
            model.read.addItem("adm_id", "output");
            model.read.outputOption = 3;    // 존재하는 컬럼만 가져오기
            model.read.cbOutput = function(p_result) {
                console.log("---------------------------------------------------------------------------");
                console.log("BindCommandAjax.execute() :: 콜백 ");
                if (this.output.items.count === 2 &&
                    this.output.rows.count === 1 &&
                    this.output.items["sto_id"].value === "S00001" &&
                    this.output.items["adm_id"].value === "logicfeel" &&
                    this.output.rows.count === 1 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BindCommandAjax.addOutput(name) :: 출력(뷰) 엔티티 추가 ");
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = "http://127.0.0.1:8080/json/sample_entity_multi.json";       // 복수 엔티티
            model.read.addOutput("output2");
            model.read.cbOutput = function(p_result) {
                console.log("---------------------------------------------------------------------------");
                console.log("BindCommandAjax.execute() :: 콜백 ");
                if (this.output.items.count > 0 &&
                    this.output.rows.count > 0 &&
                    this.output2.items.count > 0 &&
                    this.output2.rows.count > 0 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.read.execute();
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommandEditAjax.getTypes() :: 타입 조회(상속) ");
        var model = new BindModelAjax();
        model.addCommand('read', 1);
        var types = model.read.getTypes();
        if (types.indexOf("BindCommandAjax") > -1 &&
            types[0] === "BindCommandAjax" && 
            types[1] === "BindCommand" && 
            types[2] === "BaseBind" && 
            types[3] === "MetaObject" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        //#################################################
        if (errorCount > 0) {
            console.warn("Error Sub SUM : %dEA", errorCount);    
        }
        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Test.BindCommandAjax = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));