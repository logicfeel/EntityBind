/**
 * @namespace _W.Task.BindModelReadAjax
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Task           = global._W.Task || {};
    
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
        BindModelReadAjax       = global._W.Meta.Bind.BindModelReadAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        IBindModelRead          = global._W.Interface.IBindModelRead;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
        
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
        
            this.cbValid = function() {
                return "cbValid";
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
        util.inherits(ReadDI, IBindModelRead);

        console.log("---------------------------------------------------------------------------");
        console.log("BindModel.add(item) :: 전체 cmd에 아이템 등록 (cmd 사용자 추가후) ");
        var model = new BindModelReadAjax();
        model.read2 = new BindCommandLookupAjax(model, model._baseEntity);
        model.add(new Item("i1"));
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
        console.log("new BindModelReadAjax(di) :: DI 주입 생성 ");
        var model = new BindModelReadAjax(new ReadDI());
        if (model.attr.count === 3 &&
            model.cbRegister() === "cbRegister" &&
            model.cbValid() === "cbValid" &&
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
        console.log("new BindModelReadAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ");
        var model = new BindModelReadAjax(new ReadDI(), true);
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
        console.log("new BindModelReadAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ");
        var model = new BindModelReadAjax(new ReadDI(), true, ItemDOM);
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
        console.log("BindModelReadAjax.getTypes() :: 타입 조회(상속) ");
        var model = new BindModelReadAjax();
        var types = model.getTypes();
        if (types[0] === "BindModelReadAjax" && 
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
        global._W.Task.BindModelReadAjax = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));