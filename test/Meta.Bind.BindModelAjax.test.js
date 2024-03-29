/**
 * @namespace _W.Test.BindModelAjax
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
    var CustomError;
    var Row;
    var Item;
    var ItemDOM;
    var EntityView;
    var EntityTable;
    var BindModelAjax;
    var IBindModel;

    if (typeof module === 'object' && typeof module.exports === 'object') {  
        require('../src/object-implement'); // _implements() : 폴리필
        util                    = require('../src/utils');
        CustomError             = require('../src/error-custom');
        Row                     = require('../src/entity-row').Row;
        Item                    = require('../src/entity-item').Item;
        ItemDOM                 = require('../src/entity-item-dom');
        EntityView              = require('../src/entity-view').EntityView;
        EntityTable             = require('../src/entity-table').EntityTable;
        BindModelAjax           = require('../src/bind-model-ajax');
        IBindModel              = require('../src/i-bind-model');
    } else {
        util                    = global._W.Common.Util;
        CustomError             = global._W.Common.CustomError;
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        ItemDOM                 = global._W.Meta.Entity.ItemDOM;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityTable             = global._W.Meta.Entity.EntityTable;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        IBindModel              = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {

        function CreateDI(p_this) {
            IBindModel.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.prop = {
                i1: 'V1',
                i2: 'V2',
                i3: {
                    caption: 'C3', 
                    value: 'V3',
                    constraints: [
                        { regex: /\D/, msg: '숫자만 입력해야함...', code: 100},
                        { regex: /12/, msg: '12로 시작해야함...', code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: '5자리 미만 숫자만...', code: 300 }
                    ]
                }
            };

            this.cbFail = function(p_msg, p_code) {
                return 'cbFail';
            };
        
            this.cbError = function(p_msg, p_status) {
                return 'cbError';
            };
        
            this.onExecute = function() {       // 실행시 이벤트 등록
                return 'onExecute';
            };
            this.onExecuted = function() {      // 실행끝 이벤트 등록
                return 'onExecuted';
            };
        }
        util.inherits(CreateDI, IBindModel);

        CreateDI.prototype.preRegister = function() {
            return 'preRegister';
        };
        CreateDI.prototype.preCheck = function() {
            return 'preCheck';
        };
        CreateDI.prototype.preReady = function() {
            return 'preReady';
        };


        if (isCallback) {
            console.log('---------------------------------------------------------------------------');
            console.log('BaseBind.onExecute         :: 바인드 명령 실행[execute()] 실행 전 (공통처리의 관점) ');
            console.log('BaseBind.onExecuted        :: 바인드 명령 실행execute() 실행 후 (공통처리의 관점) ');
            console.log('BindModel.cbFail           :: 검사 실패 발생시 실행 ');
            console.log('BindModel.cbError          :: 오류 발생시 실행 ');
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];        
            model.create.addItem('i1', 'V1');
            model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
            };
            model.create.cbBind = function(p_ajax){
                console.log('call cbBind');
            };
            model.onExecute = function(pp) {
                this.result.push('onExecute');
            };
            model.onExecuted = function() {
                this.result.push('onExecuted');
                console.log('---------------------------------------------------------------------------');
                console.log('onExecute, onExecuted  :: 콜백 ');
                if (
                        this.result[0] === 'onExecute' &&                          // 처음
                        this.result[this.result.length - 1] === 'onExecuted' &&    // 마지막
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };
            model.create.execute();
        }


        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() ');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        var model = new BindModelAjax(Item);
        model.result = [];
        model.preRegister = function() {
            this.result.push('preRegister');
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        model.init();
        if (
                model.result[0] === 'preRegister' && 
                model.result[1] === 'preCheck' && 
                model.result[2] === 'preReady' && 
                model.result.length === 3 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() 에러 처리');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        var model = new BindModelAjax(Item);
        model.result = [];
        model.cbError = function(p_msg, p_status){
            this.result.push('cbError');
            console.log('err message = ' + p_msg);
        };        
        model.preRegister = function() {
            throw '에러 preRegister()';       // 에러 던지기
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        model.init();
        if (
                model.result[0] === 'cbError' && 
                model.result.length === 1 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() 에러 처리 : cbError 선언 없을 경우');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        var model = new BindModelAjax(Item);
        model.result = [];
        model.preRegister = function() {
            throw '에러 preRegister()';       // 에러 던지기
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        model.init();
        if (
                model.result.length === 0 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.init() 에러 처리 : cbError 선언 없을 경우 (외부로 에러 전달)');
        console.log('BindModel.preRegister :: 등록 ');
        console.log('BindModel.preCheck :: 검사 ');
        console.log('BindModel.preReady :: 준비 완료 ');
        global.isThrow = true;
        var model = new BindModelAjax(Item);
        model.result = [];
        model.preRegister = function() {
            throw '에러 preRegister()';       // 에러 던지기
        };
        model.preCheck = function() {
            this.result.push('preCheck');
            return true;
        };
        model.preReady = function() {
            this.result.push('preReady');
        };
        try {
            model.init();
        } catch (e) {
            model.error = true;     // 내부 예외처리로 무시됨
        }
        
        if (
                model.error === true &&
                model.result.length === 0 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        global.isThrow = false;

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.cbFail           :: 실패 발생시 실행 (검사) ');
        var model = new BindModelAjax(Item);
        model.addCommand('create');
        model.result = [];
        model.create.addItem('i1', '');
        model.create.valid.items['i1'].isNotNull = true;
        model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
        model.cbFail = function(p_msg, p_code){
            this.result.push('cbFail');
        };
        model.cbError = function(p_msg, p_status){
            this.result.push('cbError');
        };
        // model.create.cbValid = function() {
        //     return false;
        // };   // 리턴을 하지 않아 실패함
        model.create.execute();
        if (
                model.result[0] === 'cbFail' && 
                model.result.length === 1 && 
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        if (isCallback ) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindModel.cbError          :: 오류 발생시 실행 (html) ');
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];
            model.create.addItem('i1', '');
            // model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            model.baseUrl = 'http://127.0.0.1:8080/';                 // 오류 1 : 403
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            // model.baseUrl = 'sample_row_single2.json';                // 오류 2
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
                console.log('err message = ' + p_msg);
            };
            model.onExecuted = function() {
                console.log('---------------------------------------------------------------------------');
                console.log('BindModel.cbError      :: 콜백 ');
                if (    
                        this.result[0] === 'cbError' && 
                        this.result.length === 1 && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };

            model.create.execute();
        }

        if (isCallback ) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindModel.cbError          :: 오류 발생시 실행 (local) ');
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];
            model.create.addItem('i1', '');
            // model.baseUrl = 'http://127.0.0.1:8080/json/sample_row_single.json';       // 가져올 경로
            // model.baseUrl = 'http://127.0.0.1:8080/';                 // 오류 1 : 403
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            model.baseUrl = 'sample_row_single2.json';                // 오류 2
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
                console.log('err message = ' + p_msg);
            };
            model.onExecuted = function() {
                console.log('---------------------------------------------------------------------------');
                console.log('BindModel.cbError      :: 콜백 ');
                if (    
                        this.result[0] === 'cbError' && 
                        this.result.length === 1 && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };

            model.create.execute();
        }

        if (isCallback ) {
            console.log('---------------------------------------------------------------------------');
            console.log('BindModel.cbError          :: 오류 발생시 실행 (경로없음:404) ');
            // global.isLog = true;
            var model = new BindModelAjax(Item);
            model.addCommand('create');
            model.result = [];
            model.create.addItem('i1', '');
            model.baseUrl = 'http://127.0.0.1:8080/abc/';                 // 오류 1 : 403
            // model.baseUrl = 'http://rtwgs4.cafe24.com/';                 // 오류 1 : 403
            model.cbFail = function(p_msg, p_code){
                this.result.push('cbFail');
            };
            model.cbError = function(p_msg, p_status){
                this.result.push('cbError');
                console.log('err message = ' + p_msg);
            };
            model.onExecuted = function() {
                console.log('---------------------------------------------------------------------------');
                console.log('BindModel.cbError      :: 콜백 ');
                if (    
                        this.result[0] === 'cbError' && 
                        this.result.length === 1 && 
                        true) {
                    taskCnt++;
                    console.log('Result = Success');
                } else {
                    errorCnt++;
                    console.warn('Result = Fail');
                }
            };

            model.create.execute();
        }

        
        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item) :: 전체 cmd에 아이템 등록 (cmd 사용자 추가후) ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.add(new Item('i1'), []);
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, [], entity) :: 전체 cmd에 지정entity에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        // model.add(new Item('i1'), [], 'bind');           // 정상
        // model.add(new Item('i1'), undefined, 'bind');    // 정상
        // model.add(new Item('i1'), null, 'bind');
        model.add(new Item('i1'), '', 'bind');
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 0 &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, cmd) :: cmd 전체에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.add(new Item('i1'), 'create2');
        // model.columns.add(new Item('i1'), 'create2');    // 개선 문법
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 0 &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, cmd, entity) :: 지정 cmd의 지정entity에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.add(new Item('i1'), 'create2', 'bind');
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 0 &&
                // create 2
                model.create2.valid.items.count === 0 &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
        
        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, cmds) :: cmd 전체에 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;        
        model.addCommand('create');
        model.addCommand('create2');
        model.addCommand('create3');
        model.add(new Item('i1'), ['create', 'create2']);
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // create 3
                model.create3.valid.items.count === 0 &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&               
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, obj) :: 아이템 생성 (객체형), ItemDOM 기본값, [전체] cmd에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', { 
            default: 10, 
            value: 'V1',
        }, []);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                model.first.items['i1'].default === 10 &&
                model.itemType.name === 'ItemDOM' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value) :: 아이템 생성 및 [전체] cmd에 추가 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', 'V1', []);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value, [], entity) :: 아이템 생성 및 [전체] cmd의 지정 entity에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', 'V1', [], 'bind');
        if (    // create 
                model.create.valid.items.count === 0 &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 0 &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value, cmd) :: 아이템 생성 및 [특정] cmd에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addItem('i1', 'V1', 'create2');
        if (    // create 
                model.create.valid.items.count === 0 &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addItem(name, value, cmds) :: 아이템 생성 및 [특정목록] cmd에 추가 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.addCommand('create3');
        model.addItem('i1', 'V1', ['create', 'create2']);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                // create 3
                model.create3.valid.items.count === 0 &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&               
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.setMapping(mapping: json) :: 메핑으로 부분 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.items.addValue('i1', 'V1');
        model.items.addValue('i2', 'V1');
        var mapping = {
            i1: {
                create: ['valid', 'bind'],
                create2: ['valid', 'bind']
            },
        };

        model.setMapping(mapping);
        if (// create 
            model.create.valid.items.count === 1 &&
            model.create.valid.items['i1'].value === 'V1' &&
            model.create.valid.items['i1'].entity.name === 'first' &&
            model.create.bind.items.count === 1 &&
            model.create.bind.items['i1'].value === 'V1' &&
            model.create.bind.items['i1'].entity.name === 'first' &&
            // create 2
            model.create2.valid.items.count === 1 &&
            model.create2.valid.items['i1'].value === 'V1' &&
            model.create2.valid.items['i1'].entity.name === 'first' &&
            model.create2.bind.items.count === 1 &&
            model.create2.bind.items['i1'].value === 'V1' &&
            model.create2.bind.items['i1'].entity.name === 'first' &&
            true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.setMapping(mapping: json) :: 메핑으로 전체 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addCommand('create2');
        model.items.addValue('i1', 'V1');
        model.items.addValue('i2', 'V1');
        var mapping = {
            i1: {
                Array: [],      
            },
        };
        model.setMapping(mapping);
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.create2.valid.items.count === 1 &&
                model.create2.valid.items['i1'].value === 'V1' &&
                model.create2.valid.items['i1'].entity.name === 'first' &&
                model.create2.bind.items.count === 1 &&
                model.create2.bind.items['i1'].value === 'V1' &&
                model.create2.bind.items['i1'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.addEntity(name) :: 모델에 엔티티 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('create');
        model.addEntity('second');
        model.add(new Item('i1'), []);
        model.first.items['i1'].value = 'V1';
        if (    // create 
                model.create.valid.items.count === 1 &&
                model.create.valid.items['i1'].value === 'V1' &&
                model.create.valid.items['i1'].entity.name === 'first' &&
                model.create.bind.items.count === 1 &&
                model.create.bind.items['i1'].value === 'V1' &&
                model.create.bind.items['i1'].entity.name === 'first' &&
                // create 2
                model.second instanceof EntityTable &&
                model.second.items.count === 0 &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp() :: prop에 [모든] 속성을 first에 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.loadProp();
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp() :: prop에 [모든] 속성을 __시작이름 제외후 등록');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.prop.add('__i4', 'V4');
        model.loadProp();
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp(props) :: prop에 [특정] 속성을  [first] 엔티티에 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.loadProp(['i2', 'i3']);
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 2 &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.loadProp(props, entity) :: prop에 [특정] 속성을  [특정] 엔티티에 등록 ');
        var model = new BindModelAjax();
        model.addCommand('create');
        model.addEntity('second');
        model.prop.add('i1', 'V1');
        model.prop.add('i2', 'V2');
        model.prop.add('i3', {caption: 'C3'});    
        model.loadProp(['i2', 'i3'], 'second');
        if (    // create 
                model.create.valid.items.count === 0 &&
                // first
                model.first.items.count === 0 &&
                // second
                model.second.items.count === 2 &&
                model.second.items['i2'].value === 'V2' &&
                model.second.items['i2'].entity.name === 'second' &&
                model.second.items['i3'].caption === 'C3' &&
                model.second.items['i3'].entity.name === 'second' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModelAjax.baseAjaxSetup :: 설명 ');
        console.log('BindModelAjax.baseUrl :: 설명 ');
        var model = new BindModelAjax();
        model.baseUrl = 'URL';
        if (
                model.baseAjaxSetup.url === 'URL' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di) :: DI 주입 생성 ');
        var model = new BindModelAjax();
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ');
        var model = new BindModelAjax();
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ');
        var model = new BindModelAjax();
        model.itemType = ItemDOM;
        var cc  = new CreateDI(model);
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                model.first.items.count === 3 &&
                model.first.items['i1'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i1'] instanceof  ItemDOM &&
                model.first.items['i2'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i2'] instanceof  ItemDOM &&
                model.first.items['i3'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i3'] instanceof  ItemDOM &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
    
        console.log('---------------------------------------------------------------------------');
        console.log('BindModelAjax.getTypes() :: 타입 조회(상속) ');
        var creator = new BindModelAjax();
        var types = creator.getTypes();
        if (
                types[0] === 'BindModelAjax' && 
                types[1] === 'BindModel' && 
                types[2] === 'BaseBind' && 
                types[3] === 'MetaObject' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        function ReadDI() {
            IBindModel.call(this);

            var __this = this;          // 내부용 this : prototype 접근지시자

            this.prop = {
                i1: 'V1',
                i2: 'V2',
                i3: {
                    caption: 'C3', 
                    value: 'V3',
                    constraints: [
                        { regex: /\D/, msg: '숫자만 입력해야함...', code: 100},
                        { regex: /12/, msg: '12로 시작해야함...', code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: '5자리 미만 숫자만...', code: 300 }
                    ]
                }
            };

            this.preRegister = function() {
               return 'preRegister';
            };
        
            this.preCheck = function() {
                return 'preCheck';
            };
        
            this.preReady = function(model) {
                return 'preReady';
            };
        
            this.cbFail = function(p_msg, p_code) {
                return 'cbFail';
            };
        
            this.cbError = function(p_msg, p_status) {
                return 'cbError';
            };
        
            this.onExecute = function() {       // 실행시 이벤트 등록
                return 'onExecute';
            };
            this.onExecuted = function() {      // 실행끝 이벤트 등록
                return 'onExecuted';
            };
        }
        util.inherits(ReadDI, IBindModel);

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item, []) :: 전체 cmd에 아이템 등록 (cmd 사용자 추가후) ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('read', 1);
        model.addCommand('read2', 1);
        model.add(new Item('i1'), []);
        model.first.items['i1'].value = 'V1';
        if (    // read 
                model.read.valid.items.count === 1 &&
                model.read.valid.items['i1'].value === 'V1' &&
                model.read.valid.items['i1'].entity.name === 'first' &&
                model.read.bind.items.count === 1 &&
                model.read.bind.items['i1'].value === 'V1' &&
                model.read.bind.items['i1'].entity.name === 'first' &&
                model.read.output.items.count === 1 &&
                model.read.output.items['i1'].value === 'V1' &&
                model.read.output.items['i1'].entity.name === 'first' &&
                // read 2
                model.read2.valid.items.count === 1 &&
                model.read2.valid.items['i1'].value === 'V1' &&
                model.read2.valid.items['i1'].entity.name === 'first' &&
                model.read2.bind.items.count === 1 &&
                model.read2.bind.items['i1'].value === 'V1' &&
                model.read2.bind.items['i1'].entity.name === 'first' &&
                model.read2.output.items.count === 1 &&
                model.read2.output.items['i1'].value === 'V1' &&
                model.read2.output.items['i1'].entity.name === 'first' &&
                // first
                model.first.items.count === 1 &&
                model.first.items['i1'].value === 'V1' &&            
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('BindModel.add(item) :: 모델에만 아이템 등록 ');
        var model = new BindModelAjax();
        model.itemType = Item;
        model.addCommand('read', 1);
        model.addCommand('read2', 1);
        model.add(new Item('i1'));
        model.first.items['i1'].value = 'V1';
        if (    // read 
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
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di) :: DI 주입 생성 ');
        var model = new BindModelAjax();
        var cc  = new ReadDI(model);
        model.setService(cc, false);
        model.addCommand('read', 1);
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr) :: DI 주입 생성 + 자동 로딩 ');
        var model = new BindModelAjax();
        var cc  = new ReadDI(model);
        model.setService(cc, true);
        model.addCommand('read', 1);
        if (    
                model.prop.count === 3 &&
                // first
                model.first.items.count === 3 &&
                model.first.items['i1'].value === 'V1' &&
                model.first.items['i1'].entity.name === 'first' &&
                model.first.items['i2'].value === 'V2' &&
                model.first.items['i2'].entity.name === 'first' &&
                model.first.items['i3'].caption === 'C3' &&
                model.first.items['i3'].entity.name === 'first' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(di, isLoadAttr, itemType) :: DI 주입 생성 + 자동 로딩 + 아이템 타입 지정 ');
        var model = new BindModelAjax();
        var cc  = new ReadDI(model);
        model.itemType = ItemDOM;
        model.setService(cc, true);
        if (
                model.prop.count === 3 &&
                model.first.items.count === 3 &&
                model.first.items['i1'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i1'] instanceof  ItemDOM &&
                model.first.items['i2'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i2'] instanceof  ItemDOM &&
                model.first.items['i3'].getTypes()[0] === 'ItemDOM' &&
                model.first.items['i3'] instanceof  ItemDOM &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }
    
        console.log('---------------------------------------------------------------------------');
        console.log('BindModelAjax.setService(service) :: 서비스 설정 ');
        var cc  = new ReadDI();
        var model = new BindModelAjax();
        model.setService(cc);
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax(new service) :: 생성시 서비스 객체 주입 ');
        var model = new BindModelAjax( new ReadDI());
        if (
                model.prop.count === 3 &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }


        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax( {...} ) :: 생성시 객체 주입 (전체) ');
        var model = new BindModelAjax({
            prop: {
                i1: 'V1',
                i2: 'V2',
                i3: {
                    caption: 'C3', 
                    value: 'V3',
                    constraints: [
                        { regex: /\D/, msg: '숫자만 입력해야함...', code: 100},
                        { regex: /12/, msg: '12로 시작해야함...', code: 200, return: true},
                        { regex: /[0-9]{5}/, msg: '5자리 미만 숫자만...', code: 300 }
                    ]
                }
            },
            command: {
                read: {
                    outputOption: 3,
                    cbValid: function() { return 'cbValid'; },
                    cbBind: function() { return 'cbBind'; },
                    cbResult: function() { return 'cbResult'; },
                    cbOutput: function() { return 'cbOutput'; },
                    cbEnd: function() { return 'cbEnd'; },
                }
            },
            preRegister: function() { return 'preRegister'; },
            preCheck: function() { return 'preCheck'; },
            preReady: function(model) { return 'preReady'; },
            cbFail: function(p_msg, p_code) { return 'cbFail'; },
            cbError: function(p_msg, p_status) { return 'cbError'; },
        });
        if (
                model.prop.count === 3 &&
                model.read.outputOption === 3 &&
                model.read.cbValid() === 'cbValid' &&
                model.read.cbBind() === 'cbBind' &&
                model.read.cbResult() === 'cbResult' &&
                model.read.cbOutput() === 'cbOutput' &&
                model.read.cbEnd() === 'cbEnd' &&
                model.preRegister() === 'preRegister' &&
                model.preCheck() === 'preCheck' &&
                model.preReady() === 'preReady' &&
                model.cbFail() === 'cbFail' &&
                model.cbError() === 'cbError' &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax( {...} ) :: 생성시 객체 주입 : 에러발생 [내부 에러처리]');
        try {
            var model = new BindModelAjax({
                prop: {
                    i3: {
                        caption: 'C3', 
                        value: 'V3',
                        order: 'E',     // 에러 강제 발생
                    }
                },
            });
            model.error = false;
        } catch (e) {
            model.error = true;     // 내부 예외처리로 무시됨
        }
        model.result = [];
        if (
                model.prop.count === 1 &&
                model.error === false &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }        

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax( {...} ) :: 생성시 객체 주입 : 에러발생 [외부로 에러 전달]');
        global.isThrow = true;
        global.isLog = true;
        try {
            var model = new BindModelAjax({
                prop: {
                    i3: {
                        caption: 'C3', 
                        value: 'V3',
                        order: 'E',     // 에러 강제 발생
                    }
                },
            });
            model.error = false;
        } catch (e) {
            model.error = true;     // 내부 예외처리로 무시됨
        }
        model.result = [];
        if (
                model.prop.count === 1 &&
                model.error === true &&
                true) {
            taskCnt++;
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }        
        global.isThrow = false; // 해제
        global.isLog = false;

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax() :: 예외 ');
        try {
            var model = new BindModelAjax();
            model.addCommand('read', 1);
            model.read.addItem('i1', '');
            model.items.i1.value = 'A';
            model.items.i1.order = 'E';     // 에러 발생!
        } catch (e) {
            model.error = true;
        }
        
        if (
                model.items.i1.value === 'A' &&
                model.error === true &&
                true) {
            console.log('Result = Success');
        } else {
            errorCnt++;
            console.warn('Result = Fail');
        }

        console.log('---------------------------------------------------------------------------');
        console.log('new BindModelAjax() :: 예외 ');
        try {
            var model = new BindModelAjax();
            model.baseUrl = 1;          // 에러 발생!
        } catch (e) {
            model.error = true;
        }
        
        if (
                model.error === true &&
                true) {
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
        global._W.Test.BindModelAjax = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : this));