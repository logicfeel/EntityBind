/**
 * @namespace _W.Test.BindCommandAjax
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Test           = global._W.Test || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCnt = 0;
    var result = [];        // 결과 확인 **사용시 초기화    
    var isCallback = global.isCallback === false ? false : true;
    var taskCnt = 0;

    var util;        
    var Row;
    var Item;
    var EntityView;
    var EntityTable;
    var BindModelAjax;

    if (typeof module === 'object' && typeof module.exports === 'object') {  
        require('../src/object-implement'); // _implements() : 폴리필
        util                    = require('../src/utils');
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
        BindModelAjax           = require('../src/bind-model-ajax');
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
            console.log('---------------------------------------------------------------------------');
            console.log('cbValid        :: 검사시 실행 ');
            console.log('cbBind         :: 바인딩시 실행 ');
            console.log('cbOutput       :: 뷰 출력시 실행 [View 하위만] ');
            console.log('cbEnd          :: 실행 완료시 실행 (명령간 연결의 용도 + 서버측 결과) ');
            console.log('onExecute      :: 명령 엔티티 실행[execute()] 실행 전 ');
            console.log('onExecuted     :: 명령 엔티티 실행[execute()] 실행 후 ');
            var model = new BindModelAjax();
            model.result = [];
            model.addCommand('read', 1);
            model.read.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            // 비동기 처리에 대한 이슈가 있음, command 에서 _this 를 리턴하지 않음
            // model.baseAjaxSetup.async = false;  // 비동기 처리
            // model.read.ajaxSetup.async = false;
            // model.baseAjaxSetup.async
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            // model.baseUrl = 'sample_row_single.json';                    // 오류 2
            // model.baseAjaxSetup.async = false;                           // 동기화로 변경
            model.read.onExecute = function() {
                this._model.result.push('read.onExecute');
            };
            model.onExecute = function() {
                this.result.push('onExecute');
            };
            model.read.cbValid = function() {
                this._model.result.push('cbValid');
                return true;
            };
            model.read.cbBind = function(p_ajaxSetup) {
                this._model.result.push('cbBind');
            };
            model.read.cbResult = function(p_result) {
                this._model.result.push('cbResult');
                return p_result;
            };
            model.read.cbOutput = function() {
                this._model.result.push('cbOutput');
            };
            model.read.cbEnd = function(p_result) {
                this._model.result.push('cbEnd');
            };
            model.read.onExecuted = function() {
                this._model.result.push('read.onExecuted');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('cbOutput, cbEnd, read.onExecuted, onExecuted :: 콜백 ');
                // 콜백에서 검사
                if (
                        this.result[0] === 'read.onExecute' && 
                        this.result[1] === 'onExecute' && 
                        this.result[2] === 'cbValid' && 
                        this.result[3] === 'cbBind' && 
                        this.result[4] === 'cbResult' && 
                        this.result[5] === 'cbOutput' && 
                        this.result[6] === 'cbEnd' && 
                        this.result[7] === 'read.onExecuted' && 
                        this.result[8] === 'onExecuted' && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
                model.result = [];    // 콜백 초기화
            };
            model.read.execute();
        }
        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('cbBaseValid        :: 검사시 실행 ');
            console.log('cbBaseBind         :: 바인딩시 실행 ');
            console.log('onBaseResult       :: 바인딩 결과로 실행 ');
            console.log('cbBaseOutput       :: 뷰 출력시 실행 [View 하위만] ');
            console.log('cbBaseEnd          :: 실행 완료시 실행 (명령간 연결의 용도 + 서버측 결과) ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = [];
            model.read.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.cbBaseValid = function() {
                this._model.result.push('cbBaseValid');
                return true;
            };
            model.cbBaseBind = function(p_ajaxSetup) {
                this._model.result.push('cbBaseBind');
            };
            model.cbBaseResult = function(p_result) {
                this._model.result.push('cbBaseResult');
                return p_result;
            };
            model.cbBaseOutput = function() {
                this._model.result.push('cbBaseOutput');
            };
            model.cbBaseEnd = function(p_result) {
                this._model.result.push('cbBaseEnd');
            };
     
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('cbBaseOutput, cbBaseEnd... :: 콜백 ');
                // 콜백에서 검사
                if (
                        this.result[0] === 'cbBaseValid' &&
                        this.result[1] === 'cbBaseBind' &&
                        this.result[2] === 'cbBaseResult' &&
                        this.result[3] === 'cbBaseOutput' &&
                        this.result[4] === 'cbBaseEnd' &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
                result = [];    // 콜백 초기화
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('cbBase.. cbValid 와 혼합사용');
            console.log('cbBase < cbValid 우선순위 높음');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = [];
            model.read.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.cbBaseValid = function() {
                this.result.push('cbBaseValid');
                return true;
            };
            model.cbBaseBind = function(p_ajaxSetup) {
                this.result.push('cbBaseBind');
            };
            model.cbBaseResult = function(p_result) {
                this.result.push('cbBaseResult');
                return p_result;
            };
            model.cbBaseOutput = function() {
                this.result.push('cbBaseOutput');
            };
            model.cbBaseEnd = function(p_result) {
                this.result.push('cbBaseEnd');
            };
            model.read.cbValid = function() {
                this._model.result.push('cbValid');
                return true;
            };
            model.read.cbBind = function(p_ajaxSetup) {
                this._model.result.push('cbBind');
            };
            model.read.cbResult = function(p_result) {
                this._model.result.push('cbResult');
                return p_result;
            };
            model.read.cbOutput = function() {
                this._model.result.push('cbOutput');
            };
            model.read.cbEnd = function(p_result) {
                this._model.result.push('cbEnd');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('cbBaseOutput, cbBaseEnd... :: 우선순위 콜백 ');
                // 콜백에서 검사
                if (
                        this.result[0] === 'cbValid' &&
                        this.result[1] === 'cbBind' &&
                        this.result[2] === 'cbResult' &&
                        this.result[3] === 'cbOutput' &&
                        this.result[4] === 'cbEnd' &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
                result = [];    // 콜백 초기화
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BaseBind.eventPropagation = false        :: 이벤트 전파 금지 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.result = []; 
            model.read.addItem('i1', 'V1');
            model.read.eventPropagation = false;
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.onExecute = function() {
                this._model.result.push('read.onExecute');
            };
            model.read.onExecuted = function() {
                this._model.result.push('read.onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('read.onExecuted, onExecuted :: 콜백 ');
                if (
                        this._model.result[0] === 'read.onExecute' && 
                        this._model.result[1] === 'read.onExecuted' && 
                        this._model.result.length === 2 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.onExecute = function() {
                this.result.push('onExecute');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 1) row 기준으로 가져옴 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (    this.output.items.count > 0 &&
                        this.output.rows.count > 0 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }
        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 2) 존재하는 아이템만 가져옴 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.addItem('sto_id', 'output');
            model.read.addItem('adm_id', 'output');
            model.read.outputOption = 2;    // 존재하는 컬럼만 가져오기
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (
                        this.output.items.count === 2 &&
                        this.output.rows.count === 1 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 (outoption = 3) 존재하는 아이템만 가져옴, + rows[0] value 설정 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.read.addItem('sto_id', 'output');
            model.read.addItem('adm_id', 'output');
            model.read.outputOption = 3;    // 존재하는 컬럼만 가져오기
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (
                        this.output.items.count === 2 &&
                        this.output.rows.count === 1 &&
                        this.output.items['sto_id'].value === 'S00001' &&
                        this.output.items['adm_id'].value === 'logicfeel' &&
                        this.output.rows.count === 1 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }

        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindCommandAjax.addOutput(name) :: 출력(뷰) 엔티티 추가 ');
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_entity_multi.json';       // 복수 엔티티
            model.read.addOutput('output2');
            model.read.cbOutput = function(p_result) {
                console.log('---------------------------------------------------------------------------');
                console.log('BindCommandAjax.execute() :: 콜백 ');
                if (
                        this.output.items.count > 0 &&
                        this.output.rows.count > 0 &&
                        this.output2.items.count > 0 &&
                        this.output2.rows.count > 0 &&
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.read.execute();
        }

        // console.log('---------------------------------------------------------------------------');
        // console.log('BindCommandAjax.addOutput(name) :: 출력(뷰) 엔티티 추가 ');
        // var model = new BindModelAjax();
        // model.addCommand('read', 1);
        // model.baseUrl = 'http://127.0.0.1:8080/json/sample_entity_multi.json';       // 복수 엔티티
        // model.read.addOutput('output2');

        // console.log('---------------------------------------------------------------------------');
        // console.log('BindCommandAjax.execute() :: 콜백 ');
        // if (
        //         this.output.items.count > 0 &&
        //         this.output.rows.count > 0 &&
        //         this.output2.items.count > 0 &&
        //         this.output2.rows.count > 0 &&
        //         true) {
        //     taskCnt++;
        //     console.log('Result = Success');
        // } else {
        //     errorCnt++;
        //     console.warn('Result = Fail');
        // }


        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.add(item) :: 전체 엔티티에 아이템 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');    // 참조 값으로 넘김
        model.create.add(i1);
        model.first.items['i1'].value = 'V1';
        model._baseEntity.items['i1'].value = 'V11';    // 실제 적용 위치
        i1.value = 'V111';
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V11' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V11' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V11' &&
                model._baseEntity.items['i1'].value === 'V11' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCount++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.add(item, entityName) :: [지정된] 엔티티에 아이템 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.add(i1, 'valid');
        model.first.items['i1'].value = 'V1';
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 0 &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCount++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.add(item, entityNames) :: [지정된] 엔티티[들]에 아이템 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.add(i1, ['valid', 'bind']);
        // model.create.add(i1, ['valid', 'bind']); 중복 추가 안됨
        model.first.items['i1'].value = 'V1';
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.addItem(name, value) :: 아이템 생성 및 [전체] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.create.addItem('i1', 'V1');
        // model.create.addItem('i1', 'V2');   // 중복되서 추가 안됨
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.addItem(name, value, entityName) :: 아이템 생성 및 [특정] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.addItem('i1', 'V1', 'valid');
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 0 &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.addItem(name, value, entityNames) :: 아이템 생성 및 [지정된] 엔티티[들]에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        var i1 = new Item('i1');
        model.create.addItem('i1', 'V1', ['valid', 'bind']);
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.setItem(name | names) :: baseEntity의 [지정한] 아이템을 [전체] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.first.items.add(new Item('i1'));
        model.first.items['i1'].value = 'V1';
        model.create.setItem('i1', ['valid', 'bind']);
            if (model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.setItem(names, entityName) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.first.items.add(new Item('i1'));
        model.first.items.add(new Item('i2'));
        model.first.items['i1'].value = 'V1';
        model.first.items['i2'].value = 'V2';
        model.create.setItem(['i1', 'i2'], 'valid');
        if (
                model.create.valid.items.count === 2 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i2'].value === 'V2' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 0 &&
                model.first.items.count === 2 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i2'].value === 'V2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.release(names, entityName) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티에 해제 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.items.add(new Item('i1'));
        model.items.add(new Item('i2'));
        model.items['i1'].value = 'V1';
        model.items['i2'].value = 'V2';
        model.create.setItem(['i1', 'i2'], ['valid', 'bind']);
        model.create.release('i2', 'bind');
        if (
                model.create.valid.items.count === 2 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i2'].value === 'V2' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.items.count === 2 &&
                model.items['i1'].value === 'V1' &&
                model.items['i2'].value === 'V2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.release(names, entityName) :: baseEntity의 [지정한] 아이템을 [전체] 엔티티에 해제 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.items.add(new Item('i1'));
        model.items.add(new Item('i2'));
        model.items['i1'].value = 'V1';
        model.items['i2'].value = 'V2';
        model.create.setItem(['i1', 'i2'], ['valid', 'bind']);
        model.create.release('i2');
        if (
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.items.count === 2 &&
                model.items['i1'].value === 'V1' &&
                model.items['i2'].value === 'V2' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommand.setItem(names, entityNames) :: baseEntity의 [지정한] 아이템을 [지정된] 엔티티[들]에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.first.items.add(new Item('i1'));
        model.first.items.add(new Item('i2'));
        model.first.items.add(new Item('i3'));
        model.first.items['i1'].value = 'V1';
        model.first.items['i2'].value = 'V2';
        model.first.items['i3'].value = 'V3';
        model.create.setItem(['i1', 'i2'], ['valid', 'bind']);
        if (
                model.create.valid.items.count === 2 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i2'].value === 'V2' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 2 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i2'].value === 'V2' &&
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i3'].value === 'V3' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindCommandAjax.execute() :: 명령 엔티티 실행 ');
       
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
        model. result = [];  
        model.create.cbValid = function() {
            this._model.result.push('Valid'); 
            return true;
        };
        var err = function(p) {
            this.result = [];
            console.warn('실패! ' + p);
            errorCount++;
        };
        model.cbFail = err;
        model.cbError = err;
        model.create.cbEnd = function(p_result) {
            if (p_result.entity['return'] !== 0) {
                errorCount++;
                console.warn('서버측 처리가 실패하였습니다.');
            }
        };
        model.create.addItem('i1', 'V1');
        model.create.execute();             // 실행
        if (
                model.result.indexOf('Valid') > -1 &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            console.warn('Result = Fail');
            errorCount++;
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('BindCommandAjax.getTypes() :: 타입 조회(상속) ');
        var model = new BindModelAjax();
        model.addCommand('read', 1);
        var types = model.read.getTypes();
        if (
                types.indexOf('BindCommandAjax') > -1 &&
                types[0] === 'BindCommandAjax' && 
                types[1] === 'BindCommand' && 
                types[2] === 'BaseBind' && 
                types[3] === 'MetaObject' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        
        //#################################################
        console.log('===========================================================================');
        if (errorCnt > 0) console.warn('Error Sub SUM : %dEA', errorCnt);    
        console.log('단위 테스트 [ %s EA]: SUCCESS', taskCnt);

        return {
            errorCnt: errorCnt,
            taskCnt: taskCnt
        };
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = run();
    } else {
        global._W.Test.BindCommandAjax = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));