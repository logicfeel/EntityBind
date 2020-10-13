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
                url: "",
                method: "POST",
                dataType: "json"
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

            /** @property {method} */
            Object.defineProperty(this, "method", 
            {
                get: function() { return __ajaxSetup.method; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [method] type 'string' can be added");
                    __ajaxSetup.method = newValue;
                },
                configurable: true,
                enumerable: true
            }); 

            
        }
        util.inherits(BindCommandReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandReadAjax.prototype.getTypes  = function() {
                
            var type = ["BindCommandReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * (WEB & NodeJs 의 어뎁터 패턴)
         * node 에서는 비동기만 반영함 (테스트 용도) =>> 필요시 개발함
         * @param {Object} i_setup 
         */
        BindCommandReadAjax.prototype._ajaxAdapter = function(i_setup) {
            
            var option = {};
            var result;
            var this_onFail = this._onFail.bind(this);

            if (ajax) {
                if (typeof ajax === "undefined") throw new Error("[ajax] module load fail...");
                // ajax(i_setup);
            } else {
                option.uri = i_setup.url;
                // option.json = true // json 으로 JSON 으로 요청함
    
                if (i_setup.method === "GET") {
                    option.method = "POST";
                    option.qs = i_setup.data;
                    request.get(option, i_setup.success);
                } else if (i_setup.method === "POST") {
                    option.method = "POST";
                    option.form = i_setup.data;
                    request.post(option, function(i_err, i_res, i_body) {
                    // request.post(option, function(i_result, i_status, i_xhr) {
                        
                        // TODO:: 에러처리     
                        if (i_err || i_res.statusCode !== 200) {
                            this_onFail("네트워크 오류 ::" + i_res.statusMessage);
                            return;
                        }
                        
                        if (i_setup.dataType === "json") result = JSON.parse(i_body);
                        result = result || i_body;
                        i_setup.success(result, i_err, i_res);
                    });
                } else {
                    // 기타 
                    option.method = i_setup.method;
                    request(option, i_setup.success);
                }
            }
        };

        BindCommandReadAjax.prototype._execBind = function() {
            
            var ajaxSetup = {};
            
            ajaxSetup.url = this.ajaxSetup.url || this._model.baseAjaxSetup.url;
            ajaxSetup.method = this.ajaxSetup.method || this._model.baseAjaxSetup.method;
            ajaxSetup.dataType = "json";
            ajaxSetup.success = this._execCallback.bind(this);

            ajaxSetup.data = {};   // items에서 받아와야함            
            for(var i = 0; i < this.bind.items.count; i++) {
                ajaxSetup.data[this.bind.items[i].name] = this.bind.items[i].refValue; // 값
            }
            
            // $.ajax(this.ajaxSetup);
            this._ajaxAdapter(ajaxSetup);
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