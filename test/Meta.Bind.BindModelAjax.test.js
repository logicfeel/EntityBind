/**
 * @namespace _W.Test.BindModelAjax
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
    var BindModelAjax;
    var IBindModel;
    var BindCommandEditAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {  
        require("../src/object-implement"); // _implements() : 폴리필
        util                    = require("../src/utils");
        Row                     = require("../src/entity-row").Row;
        Item                    = require("../src/entity-item").Item;
        ItemDOM                 = require("../src/entity-item-dom");
        EntityView              = require("../src/entity-view").EntityView;
        EntityTable             = require("../src/entity-table").EntityTable;
        BindModelAjax           = require("../src/bind-model-ajax");
        BindCommandEditAjax     = require("../src/bind-command-ajax-edit");
        BindCommandLookupAjax   = require("../src/bind-command-ajax-lookup");
        IBindModel              = require("../src/i-bind-model");
    } else {
        util                    = global._W.Common.Util;
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        ItemDOM                 = global._W.Meta.Entity.ItemDOM;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        IBindModel              = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        function CreateDI(p_this) {
            IBindModel.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.prop = {
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
        util.inherits(CreateDI, IBindModel);

        CreateDI.prototype.preRegister = function() {
            return "preRegister";
        };
        CreateDI.prototype.preCheck = function() {
            return "preCheck";
        };
        CreateDI.prototype.preReady = function() {
            return "preReady";
        };

        



        if (isCallback) {
            console.log("---------------------------------------------------------------------------");
            console.log("BaseBind.onExecute         :: 바인드 명령 실행[execute()] 실행 전 (공통처리의 관점) ");
            console.log("BaseBind.onExecuted        :: 바인드 명령 실행execute() 실행 후 (공통처리의 관점) ");
            console.log("BindModel.cbFail           :: 검사 실패 발생시 실행 ");
            console.log("BindModel.cbError          :: 오류 발생시 실행 ");
            var model = new BindModelAjax(Item);
            model.create = new BindCommandEditAjax(model, model._baseEntity);
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
                if (true 
                    && this.result[0] === "onExecute"                           // 처음
                    && this.result[this.result.length - 1] === "onExecuted"     // 마지막
                    ) {
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
        console.log("BindModel.preRegister :: 등록 ");
        console.log("BindModel.preCheck :: 검사 ");
        console.log("BindModel.preReady :: 준비 완료 ");
        var model = new BindModelAjax(Item);
        model.result = [];
        model.preRegister = function() {
            this.result.push("preRegister");
        };
        model.preCheck = function() {
            this.result.push("preCheck");
            return true;
        };
        model.preReady = function() {
            this.result.push("preReady");
        };
        model.init();
        if (model.result[0] === "preRegister" && 
            model.result[1] === "preCheck" && 
            model.result[2] === "preReady" && 
            model.result.length === 3 && 
        true) {
        console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.cbFail           :: 실패 발생시 실행 (검사) ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.result = [];
        model.create.addItem("i1", "");
        model.create.valid.items["i1"].isNotNull = true;
        model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
        model.cbFail = function(p_msg, p_code){
            this.result.push("cbFail");
        };
        model.cbError = function(p_msg, p_status){
            this.result.push("cbError");
        };
        // model.create.cbValid = function() {
        //     return false;
        // };   // 리턴을 하지 않아 실패함
        model.create.execute();
        if (model.result[0] === "cbFail" && 
            model.result.length === 1 && 
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        // REVIEW:: URL 오류 메세지로 일단 막아둠
        if (isCallback && false) {
            console.log("---------------------------------------------------------------------------");
            console.log("BindModel.cbError          :: 오류 발생시 실행 ");
            var model = new BindModelAjax(Item);
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
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.add(new Item("i1"), []);
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
        console.log("BindModel.add(item, [], entity) :: 전체 cmd에 지정entity에 아이템 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        // model.add(new Item("i1"), [], "bind");           // 정상
        // model.add(new Item("i1"), undefined, "bind");    // 정상
        // model.add(new Item("i1"), null, "bind");
        model.add(new Item("i1"), "", "bind");
        model.first.items["i1"].value = "V1";
        if (// create 
            model.create.valid.items.count === 0 &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 0 &&
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
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.add(new Item("i1"), "create2");
        model.first.items["i1"].value = "V1";
        if (// create 
            model.create.valid.items.count === 0 &&
            model.create.bind.items.count === 0 &&
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
        console.log("BindModel.add(item, cmd, entity) :: 지정 cmd의 지정entity에 아이템 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.add(new Item("i1"), "create2", "bind");
        model.first.items["i1"].value = "V1";
        if (// create 
            model.create.valid.items.count === 0 &&
            model.create.bind.items.count === 0 &&
            // create 2
            model.create2.valid.items.count === 0 &&
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
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
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
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.addItem("i1", "V1", []);
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
        console.log("BindModel.addItem(name, value, [], entity) :: 아이템 생성 및 [전체] cmd의 지정 entity에 추가 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.addItem("i1", "V1", [], "bind");
        if (// create 
            model.create.valid.items.count === 0 &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 0 &&
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
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
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
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
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
        console.log("BindModel.setMapping(mapping: json) :: 메핑으로 부분 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.items.addValue("i1", "V1");
        model.items.addValue("i2", "V1");
        var mapping = {
            i1: {
                create: ["valid", "bind"],
                create2: ["valid", "bind"]
            },
        };

        model.setMapping(mapping);
        if (true
            // create 
            && model.create.valid.items.count === 1
            && model.create.valid.items["i1"].value === "V1"
            && model.create.valid.items["i1"].entity.name === "first"
            && model.create.bind.items.count === 1
            && model.create.bind.items["i1"].value === "V1"
            && model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }


        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.setMapping(mapping: json) :: 메핑으로 전체 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.create2 = new BindCommandEditAjax(model, model._baseEntity);
        model.items.addValue("i1", "V1");
        model.items.addValue("i2", "V1");
        var mapping = {
            i1: {
                Array: [],      
            },
        };
        model.setMapping(mapping);
        if (true
            // create 
            && model.create.valid.items.count === 1
            && model.create.valid.items["i1"].value === "V1"
            && model.create.valid.items["i1"].entity.name === "first"
            && model.create.bind.items.count === 1
            && model.create.bind.items["i1"].value === "V1"
            && model.create.bind.items["i1"].entity.name === "first" &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items["i1"].value === "V1" &&
            model.create2.valid.items["i1"].entity.name === "first" &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items["i1"].value === "V1" &&
            model.create2.bind.items["i1"].entity.name === "first" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.addEntity(name) :: 모델에 엔티티 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.addEntity("second");
        model.add(new Item("i1"), []);
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
        console.log("BindModel.loadProp() :: prop에 [모든] 속성을 first에 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.prop.add("i1", "V1");
        model.prop.add("i2", "V2");
        model.prop.add("i3", {caption: "C3"});    
        model.loadProp();
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
        console.log("BindModel.loadProp() :: prop에 [모든] 속성을 __시작이름 제외후 등록");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.prop.add("i1", "V1");
        model.prop.add("i2", "V2");
        model.prop.add("i3", {caption: "C3"});    
        model.prop.add("__i4", "V4");
        model.loadProp();
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
        console.log("BindModel.loadProp(props) :: prop에 [특정] 속성을  [first] 엔티티에 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.prop.add("i1", "V1");
        model.prop.add("i2", "V2");
        model.prop.add("i3", {caption: "C3"});    
        model.loadProp(["i2", "i3"]);
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
        console.log("BindModel.loadProp(props, entity) :: prop에 [특정] 속성을  [특정] 엔티티에 등록 ");
        var model = new BindModelAjax(Item);
        model.create = new BindCommandEditAjax(model, model._baseEntity);
        model.addEntity("second");
        model.prop.add("i1", "V1");
        model.prop.add("i2", "V2");
        model.prop.add("i3", {caption: "C3"});    
        model.loadProp(["i2", "i3"], "second");
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
        var model = new BindModelAjax(Item);
        model.baseUrl = "URL";
        if (model.baseAjaxSetup.url === "URL" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("new BindModelAjax(di) :: DI 주입 생성 ");
        var model = new BindModelAjax(Item);
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (model.prop.count === 3 &&
            model.preRegister() === "preRegister" &&
            model.preCheck() === "preCheck" &&
            model.preReady() === "preReady" &&
            model.cbFail() === "cbFail" &&
            model.cbError() === "cbError" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("new BindModelAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ");
        var model = new BindModelAjax(Item);
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (model.prop.count === 3 &&
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
        console.log("new BindModelAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ");
        var model = new BindModelAjax(ItemDOM);
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (model.prop.count === 3 &&
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
        console.log("BindModelAjax.getTypes() :: 타입 조회(상속) ");
        var creator = new BindModelAjax(Item);
        var types = creator.getTypes();
        if (types[0] === "BindModelAjax" && 
            types[1] === "BindModel" && 
            types[2] === "BaseBind" && 
            types[3] === "MetaObject" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        function ReadDI(p_this) {
            IBindModel.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.prop = {
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

            this.preRegister = function() {
               return "preRegister";
            };
        
            this.preCheck = function() {
                return "preCheck";
            };
        
            this.preReady = function(model) {
                return "preReady";
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
        util.inherits(ReadDI, IBindModel);

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.add(item, []) :: 전체 cmd에 아이템 등록 (cmd 사용자 추가후) ");
        var model = new BindModelAjax(Item);
        model.read = new BindCommandLookupAjax(model, model._baseEntity);
        model.read2 = new BindCommandLookupAjax(model, model._baseEntity);
        model.add(new Item("i1"), []);
        model.first.items["i1"].value = "V1";
        if (// read 
            model.read.valid.items.count === 1 &&
            model.read.valid.items["i1"].value === "V1" &&
            model.read.valid.items["i1"].entity.name === "first" &&
            model.read.bind.items.count === 1 &&
            model.read.bind.items["i1"].value === "V1" &&
            model.read.bind.items["i1"].entity.name === "first" &&
            model.read.output.items.count === 1 &&
            model.read.output.items["i1"].value === "V1" &&
            model.read.output.items["i1"].entity.name === "first" &&
            // read 2
            model.read2.valid.items.count === 1 &&
            model.read2.valid.items["i1"].value === "V1" &&
            model.read2.valid.items["i1"].entity.name === "first" &&
            model.read2.bind.items.count === 1 &&
            model.read2.bind.items["i1"].value === "V1" &&
            model.read2.bind.items["i1"].entity.name === "first" &&
            model.read2.output.items.count === 1 &&
            model.read2.output.items["i1"].value === "V1" &&
            model.read2.output.items["i1"].entity.name === "first" &&
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
        console.log("BindModel.add(item) :: 모델에만 아이템 등록 ");
        var model = new BindModelAjax(Item);
        model.read = new BindCommandLookupAjax(model, model._baseEntity);
        model.read2 = new BindCommandLookupAjax(model, model._baseEntity);
        model.add(new Item("i1"));
        model.first.items["i1"].value = "V1";
        if (// read 
            model.read.valid.items.count === 0 &&
            model.read.bind.items.count === 0 &&
            model.read.output.items.count === 0 &&
            // read 2
            model.read2.valid.items.count === 0 &&
            model.read2.bind.items.count === 0 &&
            model.read2.output.items.count === 0 &&
            // first
            model.first.items.count === 1 &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }


        console.log("---------------------------------------------------------------------------");
        console.log("new BindModelAjax(di) :: DI 주입 생성 ");
        var model = new BindModelAjax(Item);
        var cc  = new ReadDI(model);
        model.setService(cc, false);
        model.read = new BindCommandLookupAjax(model, model._baseEntity);
        if (model.prop.count === 3 &&
            model.preRegister() === "preRegister" &&
            model.preCheck() === "preCheck" &&
            model.preReady() === "preReady" &&
            model.cbFail() === "cbFail" &&
            model.cbError() === "cbError" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("new BindModelAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ");
        var model = new BindModelAjax(Item);
        var cc  = new ReadDI(model);
        model.setService(cc, true);
        model.read = new BindCommandLookupAjax(model, model._baseEntity);
        if (model.prop.count === 3 &&
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
        console.log("new BindModelAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ");
        var model = new BindModelAjax(ItemDOM);
        var cc  = new ReadDI(model);
        model.setService(cc, true);
        if (model.prop.count === 3 &&
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
        global._W.Test.BindModelAjax = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));