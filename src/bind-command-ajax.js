/**
 * @namespace _W.Meta.Bind.BindCommandAjax
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                   = global._W || {};
    global._W.Meta              = global._W.Meta || {};
    global._W.Meta.Bind         = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommand;
    var entityView;
    var EntityView;
    var EntityViewCollection;
    var request;        // node 전용
    var sync_request;   // node 전용
    var jquery;
    var ajax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommand             = require("./bind-command");
        entityView              = require("./entity-view");
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
        request                 = require("request");
        sync_request            = require("sync-request");
    } else {
        util                    = global._W.Common.Util;
        BindCommand             = global._W.Meta.Bind.BindCommand;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
        jquery                  = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
        ajax                    = jquery.ajax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof EntityViewCollection === "undefined") throw new Error("[EntityViewCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommandAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandAjax(p_bindModel, p_outputOption, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __ajaxSetup = {
                url: null,          // 요청 경로
                type: null,         // 전송 방법 : GET, POST
                dataType: null,     //
                async: null,        // [*]비동기(ture), 동기(false)
                crossDomain: null,  // 크로스 도메인
                success: null,      // 성공 콜백
                error: null,        // 실패 콜백
                complete: null      // 완료 콜백
            };

            var __valid     = new EntityView("valid", this._baseEntity);
            var __bind      = new EntityView("bind", this._baseEntity);

            // var __cbValid   = function() {return true;};
            // var __cbBind    = function() {};
            // var __cbEnd     = function() {};
            var __cbValid       = null;
            var __cbBind        = null;
            var __cbEnd         = null;
            var __cbOutput      = null;
            var __outputOption  = 0;     // 0: 제외(edit),  1: View 오버로딩 , 2: 있는자료만 , 3: 존재하는 자료만          
            
            this._output = new EntityViewCollection(this, this._baseEntity);

            // 속성 생성 및 참조 등록
            this.addOutput("output");


            /** @property {ajaxSetup} */
            Object.defineProperty(this, "ajaxSetup", 
            {
                get: function() { return __ajaxSetup; },
                configurable: true,
                enumerable: true
            });

            /** @property {url} */
            Object.defineProperty(this, "url", 
            {
                get: function() { return __ajaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [url] type 'string' can be added");
                    __ajaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            }); 

            /** @property {valid} */
            Object.defineProperty(this, "valid", 
            {
                get: function() { return __valid; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __valid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {bind} */
            Object.defineProperty(this, "bind", 
            {
                get: function() { return __bind; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __bind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {outputOption} */
            Object.defineProperty(this, "outputOption", 
            {
                get: function() { return __outputOption; },
                set: function(newValue) { 
                    if (!(typeof newValue === "number")) throw new Error("Only [outputOption] type 'number' can be added");
                    __outputOption = newValue;
                },

                configurable: true,
                enumerable: true
            });
            
            /** @property {cbValid} */
            Object.defineProperty(this, "cbValid", 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbValid] type 'Function' can be added");
                    __cbValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbBind} */
            Object.defineProperty(this, "cbBind", 
            {
                get: function() { return __cbBind; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbBind] type 'Function' can be added");
                    __cbBind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbOutput} */
            Object.defineProperty(this, "cbOutput", 
            {
                get: function() { return __cbOutput; },
                set: function(newValue) { 
                    if (typeof newValue  !== "function") throw new Error("Only [cbOutput] type 'Function' can be added");
                    __cbOutput = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {vbEnd} */
            Object.defineProperty(this, "cbEnd", 
            {
                get: function() { return __cbEnd; },
                set: function(newValue) { 
                    if (typeof newValue !== "function") throw new Error("Only [cbEnd] type 'Function' can be added");
                    __cbEnd = newValue;
                },
                configurable: true,
                enumerable: true
            });            

            // outputOption 설정
            if (typeof p_outputOption === 'number') this.outputOption = p_outputOption;

            // 예약어 등록
            this._symbol = this._symbol.concat(["valid", "bind", "ajaxSetup", "url", "valid", "bind"]);
            this._symbol = this._symbol.concat(["cbValid", "cbBind", "cbEnd"]);
            this._symbol = this._symbol.concat(["_execValid", "_execBind", "_execSuccess", "_execError", "_ajaxAdapter"]);
            this._symbol = this._symbol.concat(["_output", "outputOption", "cbOutput", "output"]);
            this._symbol = this._symbol.concat(["addOutput"]);
        }
        util.inherits(BindCommandAjax, _super);

        /** @virtual */
        BindCommandAjax.prototype._execValid = function() {
            
            var result = {};     // 오류 참조 변수
            var value = null;

            // 콜백 검사 (base)
            if (typeof this._model.cbBaseValid  === "function" && !this._model.cbBaseValid(this.valid)) {
                this._onExecuted(this);     // "실행 종료" 이벤트 발생
                return false;
            }
            
            // 콜백 검사 (command)
            if (typeof this.cbValid  === "function" && !this.cbValid(this.valid)) {
                // this._model.cbFail("cbValid() => false 리턴 ");
                // result.msg = "cbValid() 검사 실패";
                // this._model.cbFail(result, this.valid.items);
                this._onExecuted(this);     // "실행 종료" 이벤트 발생
                return false;
            } 

            // 아이템 검사
            for(var i = 0; i < this.valid.items.count; i++) {
                
                // value = this.valid.items[i].value === null ? this.valid.items[i].default : this.valid.items[i].value;
                value = this.valid.items[i].value;
                
                // 공백 && isNotNull = false    => 검사 넘어감
                // 공백 && isNotNull = true     => 오류 리턴
                // 값존재시                     => 검사 수행
                // if (value.length > 0 || this.valid.items[i].isNotNull) {
                // if (value.length > 0 || this.valid.items[i].isNotNull) {
                    if (!(this.valid.items[i].valid(value, result, 2))) {
                        this._model.cbFail(result, this.valid.items[i]);
                        this._onExecuted(this);     // "실행 종료" 이벤트 발생
                        return false;
                    }
                // }
            }

            return true;
        };

        /**
         * Ajax 바인딩 구현
         * @method
         */
        BindCommandAjax.prototype._execBind = function() {
            
            var value;
            var item;
            var ajaxSetup = {};
            var complete = this.ajaxSetup.complete || this._model.baseAjaxSetup.complete || null;
            
            ajaxSetup.url           = this.ajaxSetup.url || this._model.baseAjaxSetup.url;
            ajaxSetup.type          = this.ajaxSetup.type || this._model.baseAjaxSetup.type || "GET";
            ajaxSetup.dataType      = this.ajaxSetup.dataType || this._model.baseAjaxSetup.dataType || "json";
            ajaxSetup.async         = this.ajaxSetup.async || this._model.baseAjaxSetup.async || true;
            ajaxSetup.crossDomain   = this.ajaxSetup.crossDomain || this._model.baseAjaxSetup.crossDomain || false;
            ajaxSetup.complete      = (typeof complete === "function") ? complete.bind(this) : null;
            ajaxSetup.success       = this._execSuccess.bind(this);
            ajaxSetup.error         = this._execError.bind(this);

            for(var i = 0; i < this.bind.items.count; i++) {
                if(typeof ajaxSetup.data !== "object") ajaxSetup.data = {};
                item = this.bind.items[i];
                value = item.value || item.default;     // 값이 없으면 기본값 설정
                ajaxSetup.data[item.name] = value;
            }
            
            // 콜백 검사 (base)
            if (typeof this._model.cbBaseBind === "function") this._model.cbBaseBind(ajaxSetup, this);

            // 콜백 검사 (command)
            if (typeof this.cbBind === "function") this.cbBind(ajaxSetup);
            
            this._ajaxAdapter(ajaxSetup);       // Ajax 호출 (web | node)
        };

        /**
         * 
         * @param {*} p_result 
         * @param {*} p_status 
         * @param {*} p_xhr 
         */
        BindCommandAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {
            
            var loadOption = this.outputOption === 3 ? 2  : this.outputOption;

            var result = typeof p_result === "object" ? p_result : JSON.parse(JSON.stringify(p_result));

            // 콜백 검사 (result)
            if (typeof this._model.cbResult === "function" ) result = this._model.cbResult(result);

            // ouputOption = 1,2,3  : 출력모드의 경우
            if (this.outputOption > 0) {
                
                // 초기화 : opt = 1
                for (var i = 0; this._output.count > i; i++) {
                    if (loadOption === 1) this._output[i].clear();  // 전체 초기화 (item, rows)
                    else this._output[i].rows.clear();              // Row 초기화
                }
                
                // 결과 EntityView에 로딩
                if(typeof result["entity"] !== "undefined" || typeof result["table"] !== "undefined" ) {

                    this._output[0].load(result, loadOption); // this["output"]
                
                } else if (Array.isArray(result["entities"])) {

                    for(var i = 0; result["entities"].length > i && typeof this._output[i] !== "undefined"; i++) {
                        this._output[i].clear();
                        this._output[i].load(result["entities"][i], loadOption);
                    }
                }
                
                // 존재하는 아이템 중에 지정된 값으로 설정
                if (this.outputOption === 3) {
                    for (var i = 0; this._output.count > i; i++) {
                        if (this._output[i].items.count > 0 && this._output[i].rows.count > 0)
                        this._output[i].setValue(this._output[i].rows[0]);
                    }
                }

                // 콜백 검사 (base)
                if (typeof this._model.cbBaseOutput === "function" ) this._model.cbBaseOutput(p_result);

                // 콜백 검사 (command)
                if (typeof this.cbOutput === "function" ) this.cbOutput(p_result);
            }


            // 콜백 검사 (base)
            if (typeof this._model.cbBaseEnd === "function") this._model.cbBaseEnd(result, p_status, p_xhr);

            // 콜백 검사 (command)
            if (typeof this.cbEnd === "function" ) this.cbEnd(result, p_status, p_xhr);
            
            this._onExecuted(this, result);  // "실행 종료" 이벤트 발생
        };
        /** 
         * success(result,status,xhr)
         * @virtual 
         **/
        // BindCommandAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {
            
        //     var result = typeof p_result === "object" ? p_result : JSON.parse(JSON.stringify(p_result));
            
        //     // 콜백 검사 (base)
        //     if (typeof this._model.cbBaseEnd === "function") this._model.cbBaseEnd(result, p_status, p_xhr);

        //     // 콜백 검사 (command)
        //     if (typeof this.cbEnd === "function" ) this.cbEnd(result, p_status, p_xhr);
            
        //     this._onExecuted(this, result);  // "실행 종료" 이벤트 발생
        // };


        /**
         * AJAX 를 기준으로 구성함 (requst는 맞춤)
         * error(xhr,status,error)
         * @param {*} p_xhr 
         * @param {*} p_status 
         * @param {*} p_error 
         */
        BindCommandAjax.prototype._execError = function(p_xhr, p_status, p_error) {
            
            var msg = p_xhr && p_xhr.statusText ? p_xhr.statusText : p_error;

            this._model.cbError(msg, p_status);
            this._onExecuted(this);     // "실행 종료" 이벤트 발생
        };

        /**
         * (WEB & NodeJs 의 어뎁터 패턴)
         * node 에서는 비동기만 반영함 (테스트 용도) =>> 필요시 개발함
         * @param {Object} p_ajaxSetup 
         */
        BindCommandAjax.prototype._ajaxAdapter = function(p_ajaxSetup) {
            
            var option = {};
            var result;

            // request VS Jquery.ajax 와 콜백 어뎁터 연결 함수
            function callback(error, response, body) {

                var status = response ? response.statusCode : null;
                var msg    = response ? response.statusMessage : "";

                // (xhr,status) : 완료콜백
                if (p_ajaxSetup && typeof p_ajaxSetup.complete === "function") p_ajaxSetup.complete(response, status);

                if (error || response.statusCode !== 200) {    // 실패시
                    msg = error ? (msg + " " + error) : msg;
                    // (xhr,status,error)
                    p_ajaxSetup.error(response, status, msg);
                } else {                                        // 성공시
                    if (p_ajaxSetup.dataType === "json") result = JSON.parse(body);
                    result = result || body;
                    // (result,status,xhr)
                    p_ajaxSetup.success(result, error, response);
                }                
            }

            if (ajax && typeof ajax === "function") {

                // REVIEW:: Jquery.ajax 사용
                ajax(p_ajaxSetup);

            } else {

                option.uri = p_ajaxSetup.url;

                if (p_ajaxSetup.async === false) request = sync_request;    // 동기화 처리

                if (p_ajaxSetup.type === "GET") {
                    option.method = "POST";
                    option.qs = p_ajaxSetup.data;
                    request.get(option, callback);
                } else if (p_ajaxSetup.type === "POST") {
                    option.method = "POST";
                    option.form = p_ajaxSetup.data;
                    request.post(option, callback);
                } else {
                    // 기타 :: 결과는 확인 안함
                    request(option, callback);
                }
            }
        };
        BindCommandAjax.prototype.addOutput = function(p_name) {

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            
            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(" [" + p_name + "] is a Symbol word");   
            }            

            // 이름 중복 검사
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            // this._output.add("default", this._baseEntity);            // 등록방법 2
            this._output.add(new EntityView(p_name, this._baseEntity));  // 등록방법 1
            this[p_name] = this._output[p_name];
        };


        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandAjax.prototype.getTypes  = function() {
                    
            var type = ["BindCommandAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * @method 
         */
        BindCommandAjax.prototype.execute = function() {
            this._onExecute(this);  // "실행 시작" 이벤트 발생
            if (this._execValid()) this._execBind();
        };
        

        return BindCommandAjax;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandAjax;
    } else {
        global._W.Meta.Bind.BindCommandAjax = BindCommandAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));