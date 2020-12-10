/**
 * @namespace _W.Test.BindCommandEditAjax
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
    var BindModelCreateAjax;
    var IBindModelCreate;

    if (typeof module === "object" && typeof module.exports === "object") {  
        require("../src/object-implement"); // _implements() : 폴리필        
        util                    = require("../src/utils");
        Row                     = require("../src/entity-row").Row;
        Item                    = require("../src/entity-item").Item;
        EntityView              = require("../src/entity-view").EntityView;
        EntityTable             = require("../src/entity-table").EntityTable;
        BindModelCreateAjax     = require("../src/bind-model-ajax-create");
        IBindModelCreate        = require("../src/i-bind-model-create");
    } else {
        util                    = global._W.Common.Util;
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
        BindModelCreateAjax     = global._W.Meta.Bind.BindModelCreateAjax;
        IBindModelCreate        = global._W.Interface.IBindModelCreate;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        function CreateDI() {
            IBindModelRead.call(this);
        };
        util.inherits(CreateDI, IBindModelCreate);

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.add(item) :: 전체 엔티티에 아이템 추가 ");
        var model = new BindModelCreateAjax();
        var i1 = new Item("i1");    // 참조 값으로 넘김
        model.create.add(i1);
        model.first.items["i1"].value = "V1";
        model._baseEntity.items["i1"].value = "V11";    // 실제 적용 위치
        i1.value = "V111";
        if (model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V11" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V11" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V11" &&
            model._baseEntity.items["i1"].value === "V11" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.add(item, entityName) :: [지정된] 엔티티에 아이템 추가 ");
        var model = new BindModelCreateAjax();
        var i1 = new Item("i1");
        model.create.add(i1, "valid");
        model.first.items["i1"].value = "V1";
        if (model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 0 &&
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.add(item, entityNames) :: [지정된] 엔티티[들]에 아이템 추가 ");
        var model = new BindModelCreateAjax();
        var i1 = new Item("i1");
        model.create.add(i1, ["valid", "bind"]);
        // model.create.add(i1, ["valid", "bind"]); 중복 추가 안됨
        model.first.items["i1"].value = "V1";
        if (model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.addItem(name, value) :: 아이템 생성 및 [전체] 엔티티에 추가 ");
        var model = new BindModelCreateAjax();
        model.create.addItem("i1", "V1");
        // model.create.addItem("i1", "V2");   // 중복되서 추가 안됨
        if (model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.addItem(name, value, entityName) :: 아이템 생성 및 [특정] 엔티티에 추가 ");
        var model = new BindModelCreateAjax();
        var i1 = new Item("i1");
        model.create.addItem("i1", "V1", "valid");
        if (model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 0 &&
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.addItem(name, value, entityNames) :: 아이템 생성 및 [지정된] 엔티티[들]에 추가 ");
        var model = new BindModelCreateAjax();
        var i1 = new Item("i1");
        model.create.addItem("i1", "V1", ["valid", "bind"]);
        if (model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.setItem(name | names) :: baseEntity의 [지정한] 아이템을 [전체] 엔티티에 추가 ");
        var model = new BindModelCreateAjax();
        model.first.items.add(new Item("i1"));
        model.first.items["i1"].value = "V1";
        model.create.setItem("i1", ["valid", "bind"]);
        if (model.create.valid.items.count === 1 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i1"].entity.name === "first" &&
            model.first.items.count === 1 &&
            model.first.items["i1"].value === "V1" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.setItem(names, entityName) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티에 추가 ");
        var model = new BindModelCreateAjax();
        model.first.items.add(new Item("i1"));
        model.first.items.add(new Item("i2"));
        model.first.items["i1"].value = "V1";
        model.first.items["i2"].value = "V2";
        model.create.setItem(["i1", "i2"], "valid");
        if (model.create.valid.items.count === 2 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i2"].value === "V2" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 0 &&
            model.first.items.count === 2 &&
            model.first.items["i1"].value === "V1" &&
            model.first.items["i2"].value === "V2" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommand.setItem(names, entityNames) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티[들]에 추가 ");
        var model = new BindModelCreateAjax();
        model.first.items.add(new Item("i1"));
        model.first.items.add(new Item("i2"));
        model.first.items.add(new Item("i3"));
        model.first.items["i1"].value = "V1";
        model.first.items["i2"].value = "V2";
        model.first.items["i3"].value = "V3";
        model.create.setItem(["i1", "i2"], ["valid", "bind"]);
        if (model.create.valid.items.count === 2 &&
            model.create.valid.items["i1"].value === "V1" &&
            model.create.valid.items["i2"].value === "V2" &&
            model.create.valid.items["i1"].entity.name === "first" &&
            model.create.bind.items.count === 2 &&
            model.create.bind.items["i1"].value === "V1" &&
            model.create.bind.items["i2"].value === "V2" &&
            model.first.items.count === 3 &&
            model.first.items["i1"].value === "V1" &&
            model.first.items["i2"].value === "V2" &&
            model.first.items["i3"].value === "V3" &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommandAjax.execute() :: 명령 엔티티 실행 ");
       
        var model = new BindModelCreateAjax();
        model.baseUrl = "http://127.0.0.1:8080/json/sample_row_single.json";       // 가져올 경로
        model. result = [];  
        model.create.cbValid = function() {
            this._model.result.push("Valid"); 
            return true;
        };
        var err = function(p) {
            this.result = [];
            console.warn("실패! " + p);
            errorCount++;
        };
        model.cbFail = err;
        model.cbError = err;
        model.create.cbEnd = function(p_result) {
            if (p_result.entity["return"] !== 0) {
                errorCount++;
                console.warn("서버측 처리가 실패하였습니다.");
            }
        };
        model.create.addItem("i1", "V1");
        model.create.execute();             // 실행
        if (model.result.indexOf("Valid") > -1 &&
            true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------------------------------------------");
        console.log("BindCommandEditAjax.getTypes() :: 타입 조회(상속) ");
        var model = new BindModelCreateAjax();
        var types = model.create.getTypes();
        if (types.indexOf("BindCommandEditAjax") > -1 &&
            types[0] === "BindCommandEditAjax" && 
            types[1] === "BindCommandAjax" && 
            types[2] === "BindCommand" && 
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
        global._W.Test.BindCommandEditAjax = {run: run};
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));