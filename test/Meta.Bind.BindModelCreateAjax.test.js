/**
 * @namespace _W.Test.BindModelCreateAjax
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
                return "cbCheck";
            };
        
            this.cbReady = function(model) {
                return "cbReady";
            };
        
            this.cbFail = function(p_msg, p_code) {
                return "cbFail";
            };
        
            this.cbError = function(p_msg, p_status) {
                return "cbError";
            };
        
            this.onExecute = function() {       // 실행시 이벤트 등록
                return "onExecute";
            };
            this.onExecuted = function() {      // 실행끝 이벤트 등록
                return "onExecuted";
            };
        }
        util.inherits(CreateDI, IBindModelCreate);

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BaseBind.onExecute         :: 바인드 명령 실행[execute()] 실행 전 (공통처리의 관점) ");
            console.log("BaseBind.onExecuted        :: 바인드 명령 실행execute() 실행 후 (공통처리의 관점) ");
            console.log("BindModel.cbFail           :: 검사 실패 발생시 실행 ");
            console.log("BindModel.cbError          :: 오류 발생시 실행 ");
            var model = new BindModelCreateAjax();
            model.result = [];        
            model.create.addItem("i1", "V1");
            model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            // model.baseUrl = "http://rtwgs4.cafe24.com/";                 // 오류 1 : 403
            model.cbFail = function(p_msg, p_code){
                this.result.push("cbFail");
            };
            model.cbError = function(p_msg, p_status){
                this.result.push("cbError");
            };
            model.create.cbBind = function(p_ajax){
                console.log("call cbBind");
            };
            model.onExecute = function() {
                this.result.push("onExecute");
            };
            model.onExecuted = function() {
                this.result.push("onExecuted");
                console.log("---------------------------------------------------------------------------");
                console.log("onExecute, onExecuted  :: 콜백 ");
                if (this.result[0] === "onExecute" && 
                    this.result[1] === "onExecuted" && 
                    this.result.length === 2 && 
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            model.create.execute();
        }


        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.init() ");
        console.log("BindModel.cbRegister :: 등록 ");
        console.log("BindModel.cbCheck :: 검사 ");
        console.log("BindModel.cbReady :: 준비 완료 ");
        var model = new BindModelCreateAjax();
        model.result = [];
        model.cbRegister = function() {
            this.result.push("cbRegister");
        };
        model.cbCheck = function() {
            this.result.push("cbCheck");
            return true;
        };
        model.cbReady = function() {
            this.result.push("cbReady");
        };
        model.init();
        if (model.result[0] === "cbRegister" && 
            model.result[1] === "cbCheck" && 
            model.result[2] === "cbReady" && 
            model.result.length === 3 && 
        true) {
        console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.cbFail           :: 실패 발생시 실행 (검사) ");
        var model = new BindModelCreateAjax();
        model.result = [];
        model.create.addItem("i1", "");
        model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
        model.cbFail = function(p_msg, p_code){
            this.result.push("cbFail");
        };
        model.cbError = function(p_msg, p_status){
            this.result.push("cbError");
        };
        model.create.execute();
        if (model.result[0] === "cbFail" && 
            model.result.length === 1 && 
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BindModel.cbError          :: 오류 발생시 실행 ");
            var model = new BindModelCreateAjax();
            model.result = [];
            // model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
            model.baseUrl = "http://127.0.0.1:8080/";                 // 오류 1 : 403
            // model.baseUrl = "http://rtwgs4.cafe24.com/";                 // 오류 1 : 403
            // model.baseUrl = "sample_row_single2.json";                // 오류 2
            model.cbFail = function(p_msg, p_code){
                this.result.push("cbFail");
            };
            model.cbError = function(p_msg, p_status){
                this.result.push("cbError");
            };
            model.onExecuted = function() {
                console.log("---------------------------------------------------------------------------");
                console.log("BindModel.cbError      :: 콜백 ");
                if (this.result[0] === "cbError" && 
                    this.result.length === 1 && 
                    true) {
                    console.log("Result = Success");
                } else {
                    console.warn("Result = Fail");
                    errorCount++;
                }
            };
            
            try {
                model.create.execute();            
            } catch (e) {
                console.warn("Result = Fail");
            }
            // model.create.execute();
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.add(item) :: 전체 cmd에 아이템 등록 (cmd 사용자 추가후) ");
        var model = new BindModelCreateAjax();
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.add(new Item("i1"));
        model.first.items["i1"].value = "V1";
        if (// create 
            model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            // first
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&            
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.add(item, cmd) :: cmd 전체에 아이템 등록 ");
        var model = new BindModelCreateAjax();
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.add(new Item("i1"), "create2");
        model.first.items["i1"].value = "V1";
        if (// create 
            model.create.valid.items.count === 0 &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            // first
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&            
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.add(item, cmds) :: cmd 전체에 아이템 등록 ");
        var model = new BindModelCreateAjax();
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.create3 = new BindCommandEditAjax(model, model._baseEntity);
        model.add(new Item("i1"), ["create", "create2"]);
        model.first.items["i1"].value = "V1";
        if (// create 
            model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            // create 3
            model.create3.valid.items.count === 0 &&
            // first
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&               
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.addItem(name, value) :: 아이템 생성 및 [전체] cmd에 추가 ");
        var model = new BindModelCreateAjax();
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.addItem("i1", "V1");
        if (// create 
            model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            // first
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&            
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.addItem(name, value, cmd) :: 아이템 생성 및 [특정] cmd에 추가 ");
        var model = new BindModelCreateAjax();
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.addItem("i1", "V1", "create2");
        if (// create 
            model.create.valid.items.count === 0 &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            // first
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&            
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.addItem(name, value, cmds) :: 아이템 생성 및 [특정목록] cmd에 추가 ");
        var model = new BindModelCreateAjax();
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.create3 = new BindCommandEditAjax(model, model._baseEntity);
        model.addItem("i1", "V1", ["create", "create2"]);
        if (// create 
            model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            // create 3
            model.create3.valid.items.count === 0 &&
            // first
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&               
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.addEntity(name) :: 모델에 엔티티 등록 ");
        var model = new BindModelCreateAjax();
        model.addEntity("second");
        model.add(new Item("i1"));
        model.first.items["i1"].value = "V1";
        if (// create 
            model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.second instanceof EntityTable &&
            model.second.items.count === 0 &&
            // first
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&            
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.loadAttr() :: attr에 [모든] 속성을 first에 등록 ");
        var model = new BindModelCreateAjax();
        model.attr.add("i1", "V1");
        model.attr.add("i2", "V2");
        model.attr.add("i3", {caption: "C3"});    
        model.loadAttr();
        if (// create 
            model.create.valid.items.count === 0 &&
            // first
            model.first.items.count === 3 &&
            model.first.items["i1"].value === "V1" &&
            model.first.items["i1"].entity.name === "first" &&
            model.first.items["i2"].value === "V2" &&
            model.first.items["i2"].entity.name === "first" &&
            model.first.items["i3"].caption === "C3" &&
            model.first.items["i3"].entity.name === "first" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.loadAttr(attrs) :: attr에 [특정] 속성을  [first] 엔티티에 등록 ");
        var model = new BindModelCreateAjax();
        model.attr.add("i1", "V1");
        model.attr.add("i2", "V2");
        model.attr.add("i3", {caption: "C3"});    
        model.loadAttr(["i2", "i3"]);
        if (// create 
            model.create.valid.items.count === 0 &&
            // first
            model.first.items.count === 2 &&
            model.first.items["i2"].value === "V2" &&
            model.first.items["i2"].entity.name === "first" &&
            model.first.items["i3"].caption === "C3" &&
            model.first.items["i3"].entity.name === "first" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.loadAttr(attrs, entity) :: attr에 [특정] 속성을  [특정] 엔티티에 등록 ");
        var model = new BindModelCreateAjax();
        model.addEntity("second");
        model.attr.add("i1", "V1");
        model.attr.add("i2", "V2");
        model.attr.add("i3", {caption: "C3"});    
        model.loadAttr(["i2", "i3"], "second");
        if (// create 
            model.create.valid.items.count === 0 &&
            // first
            model.first.items.count === 0 &&
            // second
            model.second.items.count === 2 &&
            model.second.items["i2"].value === "V2" &&
            model.second.items["i2"].entity.name === "second" &&
            model.second.items["i3"].caption === "C3" &&
            model.second.items["i3"].entity.name === "second" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModelAjax.baseAjaxSetup :: 설명 ");
        console.log("BindModelAjax.baseUrl :: 설명 ");
        var model = new BindModelCreateAjax();
        model.baseUrl = "URL";
        if (model.baseAjaxSetup.url === "URL" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("new BindModelCreateAjax(di) :: DI 주입 생성 ");
        var model = new BindModelCreateAjax(new CreateDI());
        if (model.attr.count === 3 &&
            model.cbRegister() === "cbRegister" &&
            model.cbCheck() === "cbCheck" &&
            model.cbReady() === "cbReady" &&
            model.cbFail() === "cbFail" &&
            model.cbError() === "cbError" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("new BindModelCreateAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ");
        var model = new BindModelCreateAjax(new CreateDI(), true);
        if (model.attr.count === 3 &&
            // first
            model.first.items.count === 3 &&
            model.first.items["i1"].value === "V1" &&
            model.first.items["i1"].entity.name === "first" &&
            model.first.items["i2"].value === "V2" &&
            model.first.items["i2"].entity.name === "first" &&
            model.first.items["i3"].caption === "C3" &&
            model.first.items["i3"].entity.name === "first" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("new BindModelCreateAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ");
        var model = new BindModelCreateAjax(new CreateDI(), true, ItemDOM);
        if (model.attr.count === 3 &&
            model.first.items.count === 3 &&
            model.first.items["i1"].getTypes()[0] === "ItemDOM" &&
            model.first.items["i1"] instanceof  ItemDOM &&
            model.first.items["i2"].getTypes()[0] === "ItemDOM" &&
            model.first.items["i2"] instanceof  ItemDOM &&
            model.first.items["i3"].getTypes()[0] === "ItemDOM" &&
            model.first.items["i3"] instanceof  ItemDOM &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
    
        console.log("---------------------------------------------------------------------------");
        console.log("BindModelCreateAjax.getTypes() :: 타입 조회(상속) ");
        var creator = new BindModelCreateAjax();
        var types = creator.getTypes();
        if (types[0] === "BindModelCreateAjax" && 
            types[1] === "BindModelAjax" && 
            types[2] === "BindModel" && 
            types[3] === "BaseBind" && 
            types[4] === "MetaObject" &&
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
        global._W.Test.BindModelCreateAjax = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));