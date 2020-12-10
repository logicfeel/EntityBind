/**
 * @namespace _W.Test.BindModelDI.task.js
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
    var ItemDOM;
    var EntityView;
    var EntityTable;
    var BindModelCreateAjax;
    var IBindModelCreate;
    var BindCommandEditAjax;
    var BindModelReadAjax;
    var IBindModelRead;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {  
        require("../src/object-implement"); // _implements() : 폴리필
        util                    = require("../src/utils");
        Row                     = require("../src/entity-row").Row;
        Item                    = require("../src/entity-item").Item;
        ItemDOM                 = require("../src/entity-item-dom");
        EntityView              = require("../src/entity-view").EntityView;
        EntityTable             = require("../src/entity-table").EntityTable;
        BindModelCreateAjax     = require("../src/bind-model-ajax-create");
        BindCommandEditAjax     = require("../src/bind-command-ajax-edit");
        IBindModelCreate        = require("../src/i-bind-model-create");
        BindModelReadAjax       = require("../src/bind-model-ajax-read");
        BindCommandLookupAjax   = require("../src/bind-command-ajax-lookup");
        IBindModelRead          = require("../src/i-bind-model-read");
    } else {
        util                    = global._W.Common.Util;
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        ItemDOM                 = global._W.Meta.Entity.ItemDOM;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
        BindModelCreateAjax     = global._W.Meta.Bind.BindModelCreateAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
        IBindModelCreate        = global._W.Interface.IBindModelCreate;
        BindModelReadAjax       = global._W.Meta.Bind.BindModelReadAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        IBindModelRead          = global._W.Interface.IBindModelRead;        
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        function CreateDI() {
            IBindModelCreate.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.attr = {
                i1: "V1",
                i2: "V2",
                i3: {
                    caption: "C3", 
                    value: "V3",
                    constraints: [
                        { regex: /\D/, msg: "숫자만 입력해야함...", code: 100},
                        { regex: /12/, msg: "12로 시작해야함...", code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: "5자리 미만 숫자만...", code: 300 }
                    ]
                }
            };

            this.cbRegister = function() {
               return "cbRegister";
            };
        
            this.cbCheck = function() {
                return true;
            };
        
            this.cbReady = function(model) {
                return "cbReady";
            };
        
            this.cbFail = function(p_msg, p_code) {
                this.result.push("cbFail");
            };
        
            this.cbError = function(p_msg, p_status) {
                this.result.push("cbFail");
            };
        
            this.onExecute = function() {       // 실행시 이벤트 등록
                return "onExecute";
            };
            this.onExecuted = function() {      // 실행끝 이벤트 등록
                return "onExecuted";
            };
        }
        util.inherits(CreateDI, IBindModelCreate);
        CreateDI.prototype.viewRead = function() {
            console.log("viewRead....");
        };

        function ReadDI() {
            IBindModelRead.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.attr = {
                i1: "V1",
                i2: "V2",
                i3: {
                    caption: "C3", 
                    value: "V3",
                    constraints: [
                        { regex: /\D/, msg: "숫자만 입력해야함...", code: 100},
                        { regex: /12/, msg: "12로 시작해야함...", code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: "5자리 미만 숫자만...", code: 300 }
                    ]
                }
            };

            this.cbRegister = function() {
               return "cbRegister";
            };
        
            this.cbCheck = function() {
                return true;
            };
        
            this.cbReady = function(model) {
                return "cbReady";
            };
        
            this.cbFail = function(p_msg, p_code) {
                this.result.push("cbFail");
            };
        
            this.cbError = function(p_msg, p_status) {
                this.result.push("cbFail");
            };
        
            this.onExecute = function() {       // 실행시 이벤트 등록
                return "onExecute";
            };
            this.onExecuted = function() {      // 실행끝 이벤트 등록
                return "onExecuted";
            };
        }
        util.inherits(ReadDI, IBindModelRead);

        
        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("new BindModelCreateAjax() :: DI 의존성 주입 ");
            var model = new BindModelCreateAjax(new CreateDI(), true);
            model.create.setItem(["i1", "i2", "i3"], "bind");
            model.create.setItem("i3", "valid");
            model.first.items["i3"].value = "12";
            // model.first.items["i3"].value = "V3";   // 강제 오류 발생
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            model.result = [];
            model.create.cbBind = function(p_ajax) {
                console.log("---------------------------------------------------------------------------");
                console.log("cbBind  :: 콜백 ");
                if (p_ajax.data["i1"] === "V1" && 
                    p_ajax.data["i2"] === "V2" && 
                    p_ajax.data["i3"] === "12" && 
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.create.cbEnd = function(p_result) {
                console.log("---------------------------------------------------------------------------");
                console.log("result.entity.return === 0  :: 콜백 ");
                if (p_result["entity"]["return"] === 0 && 
                    this._model.result.length === 0 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.onExecuted = function() {
                console.log("---------------------------------------------------------------------------");
                console.log("this.result.length === 0  :: 콜백 ");
                if (
                    this.result.length === 0 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.create.execute();
        }

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("new BindModelReadAjax() :: DI 의존성 주입 ");
            var model = new BindModelReadAjax(new ReadDI(), true);
            model.read.setItem(["i1", "i2", "i3"], "bind");
            model.read.addOutput("output2");
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            model.result = [];
            model.read.cbBind = function(p_ajax) {
                console.log("---------------------------------------------------------------------------");
                console.log("cbBind  :: 콜백 ");
                if (p_ajax.data["i1"] === "V1" && 
                    p_ajax.data["i2"] === "V2" && 
                    p_ajax.data["i3"] === "V3" && 
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.read.cbEnd = function(p_result) {
                console.log("---------------------------------------------------------------------------");
                console.log("result.entity.return === 0  :: 콜백 BindModelReadAjax ");
                if (p_result["entity"]["return"] === 0 && 
                    this._model.result.length === 0 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.onExecuted = function() {
                console.log("---------------------------------------------------------------------------");
                console.log("this.result.length === 0  :: 콜백 BindModelReadAjax ");
                if (
                    this.result.length === 0 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            
            model.read.cbOutput = function(p_result) {
                console.log("---------------------------------------------------------------------------");
                console.log("BindCommandAjax.execute() :: 콜백 ");
                if (this.output.items.count > 0 &&
                    this.output.rows.count > 0 &&
                    this.output2.items.count === 0 &&
                    this.output2.rows.count === 0 &&
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.read.execute();        
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
        global._W.Test.BindModelDI = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));