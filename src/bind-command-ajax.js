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
    var EntityView;
    var request;        // node 전용
    var sync_request;   // node 전용
    var jquery;
    var ajax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommand             = require("./bind-command");
        EntityView              = require("./entity-view").EntityView;
        request                 = require("request");
        sync_request            = require("sync-request");
    } else {
        util                    = global._W.Common.Util;
        BindCommand             = global._W.Meta.Bind.BindCommand;
        EntityView              = global._W.Meta.Entity.EntityView;
        jquery                  = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
        ajax                    = jquery.ajax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommandAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __ajaxSetup = {
                url: "",            // 요청 경로
                type: "POST",       // 전송 방법 : GET, POST
                dataType: "json",   //
                async: true,        // [*]비동기(ture), 동기(false)
                success: null,      // 성공 콜백
                error: null,        // 실패 콜백
                complete: null      // 완료 콜백
            };

            var __valid     = new EntityView("valid", this._baseEntity);
            var __bind      = new EntityView("bind", this._baseEntity);

            var __cbValid   = function() {return true;};
            var __cbBind    = function() {};
            var __cbEnd     = function() {};

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

            /** @property {cbValid} */
            Object.defineProperty(this, "cbValid", 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbValid] type 'Function' can be added");
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
                    if (!(newValue instanceof Function)) throw new Error("Only [cbBind] type 'Function' can be added");
                    __cbBind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {vbEnd} */
            Object.defineProperty(this, "cbEnd", 
            {
                get: function() { return __cbEnd; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbEnd] type 'Function' can be added");
                    __cbEnd = newValue;
                },
                configurable: true,
                enumerable: true
            });            
        }
        util.inherits(BindCommandAjax, _super);



        /** @virtual */
        BindCommandAjax.prototype._execValid = function() {
            
            var result = {};     // 오류 참조 변수
            var value = null;

            // 콜백 검사
            if (!this.cbValid()) {
                this._model.cbFail("cbValid() => false 리턴 ");
                this._onExecuted();     // "실행 종료" 이벤트 발생
                return false;
            } else {
                // 아이템 검사
                for(var i = 0; i < this.valid.items.count; i++) {
                    
                    value = this.valid.items[i].value === null ? this.valid.items[i].default : this.valid.items[i].value;
                    // null 검사를 모두 수행 : option 2
                    if (!(this.valid.items[i].valid(value, result, 2))) {
                        this._model.cbFail(result.msg, result.code);
                        this._onExecuted();     // "실행 종료" 이벤트 발생
                        return false;
                    }
                }
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
            ajaxSetup.type          = this.ajaxSetup.type || this._model.baseAjaxSetup.type;
            ajaxSetup.dataType      = this.ajaxSetup.dataType || this._model.baseAjaxSetup.dataType;
            ajaxSetup.async         = this.ajaxSetup.async || this._model.baseAjaxSetup.async;
            ajaxSetup.crossDomain   = this.ajaxSetup.crossDomain || this._model.baseAjaxSetup.crossDomain;
            ajaxSetup.complete      = (typeof complete === "function") ? complete.bind(this) : null;
            ajaxSetup.success       = this._execSuccess.bind(this);
            ajaxSetup.error         = this._execError.bind(this);

            for(var i = 0; i < this.bind.items.count; i++) {
                if(typeof ajaxSetup.data !== "object") ajaxSetup.data = {};
                item = this.bind.items[i];
                value = item.value || item.default;     // 값이 없으면 기본값 설정
                ajaxSetup.data[item.name] = value;
            }
            
            this.cbBind(ajaxSetup);

            this._ajaxAdapter(ajaxSetup);       // Ajax 호출 (web | node)
        };

        /** 
         * success(result,status,xhr)
         * @virtual 
         **/
        BindCommandAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {
            
            var result = typeof p_result === "object" ? p_result : JSON.parse(JSON.stringify(p_result));
            
            // 처리 종료 콜백 호출
            if (typeof this.cbEnd === "function" ) this.cbEnd(result);
            
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

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
            this._onExecuted();     // "실행 종료" 이벤트 발생
        };

        /**
         * (WEB & NodeJs 의 어뎁터 패턴)
         * node 에서는 비동기만 반영함 (테스트 용도) =>> 필요시 개발함
         * @param {Object} p_ajaxSetup 
         */
        BindCommandAjax.prototype._ajaxAdapter = function(p_ajaxSetup) {
            
            var option = {};
            var result;
            
            var msg;
            var code;

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
                // try {
                //     ajax(p_ajaxSetup);
                // } catch (e) {
                //     p_ajaxSetup.error();
                // }
                ajax(p_ajaxSetup);
            } else {
                option.uri = p_ajaxSetup.url;
                // option.json = true // json 으로 JSON 으로 요청함
                
                // 동기화 처리
                if (p_ajaxSetup.async === false) request = sync_request;

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

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandAjax.prototype.getTypes  = function() {
                    
            var type = ["BindCommandAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * @method 
         */
        BindCommandAjax.prototype.execute = function() {
            this._onExecute();  // "실행 시작" 이벤트 발생
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