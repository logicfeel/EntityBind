/**
 * @namespace _W.Meta.Bind.BindCommandReadAjax
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandView;
    var EntityView;
    var request;
    var jquery;
    var ajax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindCommandView     = require("./bind-command-view");
        EntityView          = require("./entity-view").EntityView;
        request             = require("request");
    } else {
        util                = global._W.Common.Util;
        BindCommandView     = global._W.Meta.Bind.BindCommandView;
        EntityView          = global._W.Meta.Entity.EntityView;
        jquery              = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
        ajax                = jquery.ajax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandView === "undefined") throw new Error("[BindCommandView] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandReadAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandReadAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            // TODO:: jquery 등 외부 모듈을 이용하여, 검사 진행, 하지만 꼭 필요한지 사용시 재검토
            var __ajaxSetup = {
                url: "",            // 요청 경로
                type: "POST",       // 전송 방법 : GET, POST
                dataType: "json",   //
                async: true,        // [*]비동기(ture), 동기(false)
                success: null,      // 성공 콜백
                error: null,        // 실패 콜백
                complete: null      // 완료 콜백
            };

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

            // /** @property {complete} */
            // Object.defineProperty(this, "complete", 
            // {
            //     get: function() { return __ajaxSetup.complete; },
            //     set: function(newValue) { 
            //         if (!(typeof newValue === "function")) throw new Error("Only [complete] type 'function' can be added");
            //         __ajaxSetup.complete = newValue;
            //     },
            //     configurable: true,
            //     enumerable: true
            // }); 

        }
        util.inherits(BindCommandReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandReadAjax.prototype.getTypes  = function() {
                
            var type = ["BindCommandReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * AJAX 를 기준으로 구성함 (requst는 맞춤)
         * error(xhr,status,error)
         * @param {*} xhr 
         * @param {*} status 
         * @param {*} error 
         */
        BindCommandReadAjax.prototype._execError = function(xhr, status, error) {
            
            var msg = xhr && xhr.statusText ? xhr.statusText : error;

            // 상위 호출 : 데코레이션 패턴
            _super.prototype._execError.call(msg);
        }

        /**
         * Ajax 바인딩 구현
         * @method
         */
        BindCommandReadAjax.prototype._execBind = function() {
            
            var ajaxSetup = {};
            var complete = this.ajaxSetup.complete || this._model.baseAjaxSetup.complete || null;
            
            ajaxSetup.url       = this.ajaxSetup.url || this._model.baseAjaxSetup.url;
            ajaxSetup.type      = this.ajaxSetup.type || this._model.baseAjaxSetup.type;
            ajaxSetup.dataType  = this.ajaxSetup.dataType || this._model.baseAjaxSetup.dataType;
            ajaxSetup.complete  = (typeof complete === "function") ? complete.bind(this) : null;
            ajaxSetup.success   = this._execSuccess.bind(this);
            ajaxSetup.error     = this._execError.bind(this);

            for(var i = 0; i < this.bind.items.count; i++) {
                if(typeof ajaxSetup.data !== "object") ajaxSetup.data = {};
                ajaxSetup.data[this.bind.items[i].name] = this.bind.items[i].refValue; // 값
            }

            this._ajaxAdapter(ajaxSetup);       // Ajax 호출 (web | node)
        };

        /**
         * (WEB & NodeJs 의 어뎁터 패턴)
         * node 에서는 비동기만 반영함 (테스트 용도) =>> 필요시 개발함
         * @param {Object} i_setup 
         */
        BindCommandReadAjax.prototype._ajaxAdapter = function(i_setup) {
            
            var option = {};
            var result;
            
            var msg;
            var code;

            // request VS Jquery.ajax 와 콜백 어뎁터 연결 함수
            function callback(error, response, body) {

                var status = response ? response.statusCode : null;
                var msg    = response ? response.statusMessage : "";

                // (xhr,status) : 완료콜백
                if (i_setup && typeof i_setup.complete === "function") i_setup.complete(response, status);
                

                if (error || response.statusCode !== 200) {    // 실패시
                    msg = error ? (msg + " :: " + error) : msg;
                    // (xhr,status,error)
                    i_setup.error(response, status, msg);
                } else {                                        // 성공시
                    if (i_setup.dataType === "json") result = JSON.parse(body);
                    result = result || body;
                    // (result,status,xhr)
                    i_setup.success(result, error, response);
                }                
            }

            if (ajax && typeof ajax === "function") {
                
                ajax(i_setup);

            } else {
                option.uri = i_setup.url;
                // option.json = true // json 으로 JSON 으로 요청함
    
                if (i_setup.type === "GET") {
                    option.method = "POST";
                    option.qs = i_setup.data;
                    request.get(option, callback);
                } else if (i_setup.type === "POST") {
                    option.method = "POST";
                    option.form = i_setup.data;
                    request.post(option, callback);
                } else {
                    // 기타 :: 결과는 확인 안함
                    request(option, callback);
                }
            }
        };

        return BindCommandReadAjax;
    
    }(BindCommandView));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandReadAjax;
    } else {
        global._W.Meta.Bind.BindCommandReadAjax = BindCommandReadAjax;
    }

}(this));