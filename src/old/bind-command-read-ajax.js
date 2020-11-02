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
        ajax                = global.jQuery.ajax || global.$.ajax;     // jquery 로딩 REVIEW:: 로딩 확인
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
         * @param {Object} p_setup 
         */
        BindCommandReadAjax.prototype.bindAjaxAdapter = function(p_setup) {
            
            var option = {};
            var result;
    
            if (ajax) {
                if (typeof ajax === "undefined") throw new Error("[ajax] module load fail...");
                ajax(p_setup);
            } else {
                option.uri = p_setup.url;
                // option.json = true // json 으로 JSON 으로 요청함
    
                if (p_setup.method === "GET") {
                    option.method = "POST";
                    option.qs = p_setup.data;
                    request.get(option, p_setup.success);
                } else if (p_setup.method === "POST") {
                    option.method = "POST";
                    option.form = p_setup.data;
                    request.post(option, function(err, res, body) {
                        // TODO:: 에러처리 추가해야함
                        if (p_setup.dataType === "json") result = JSON.parse(body);
                        
                        result = result || body;
                        p_setup.success(result, err, res);
                    });
                } else {
                    // 기타 
                    option.method = p_setup.method;
                    request(option, p_setup.success);
                }
            }
        };


        // TODO:: 상위로 이동 검토
        BindCommandReadAjax.prototype._execValid = function() {
            

            var o_msg = {};

            // item 의 제약 조건을 기준으로 검사함
            // if item.Valid("값", o_msg, o_code) 
            
            // 오류 발생시 _onFail(i_msg, i_code);

            // TODO::
            console.log("*************");
            // console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                if (!(this.valid.items[i].valid(this.bind.items[i].refValue, o_msg))) {
                    this._onFail(o_msg);
                    return false;
                }
                // console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        BindCommandReadAjax.prototype._execBind = function() {
            
            var ajaxSetup = {};
            
            ajaxSetup.url = this.ajaxSetup.url || this._model.baseAjaxSetup.url;
            ajaxSetup.method = this.ajaxSetup.method || this._model.baseAjaxSetup.method;
            // TODO:: 프로퍼티에 추가해야함
            ajaxSetup.dataType = "json";
            ajaxSetup.data = {};   // items에서 받아와야함
            ajaxSetup.success = this._execSuccess.bind(this);
            
            for(var i = 0; i < this.bind.items.count; i++) {
                ajaxSetup.data[this.bind.items[i].name] = this.bind.items[i].refValue; // 값
            }
            
            // $.ajax(this.ajaxSetup);
            this.bindAjaxAdapter(ajaxSetup);

            // REVIEW:: 확인후 삭제
            console.log("*************");
            console.log("_execBind(ajax load)");
        };
        
        /**
         * 콜백에서 받은 데이터를 기준으로 table(item, rows)을 만든다.
         * 리턴데이터 형식이 다를 경우 오버라이딩해서 수정함
         * @param {*} p_result 
         * @param {*} p_status 
         * @param {*} p_xhr 
         */
        BindCommandReadAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {
            
            var entity;

            entity = new EntityView("result");
            entity.load(p_result);

            console.log("*************");
            console.log("_execSuccess()");
            this._execView(entity);
        };

        
        
        /**
         * TODO:: 이 부분은 사용시 구현이 되어야함.
         * 임시테이블과 View 지정 테이블과 매핑한다.
         * @param {*} entity 
         */
        BindCommandReadAjax.prototype._execView = function(entity) {
            
            var itemName;
            
            // this.view.newRow();
            this.view.load(entity, this.outputOption);

            // for (var i = 0; entity.items.count > i; i++) {
                
            //     if (this.view.items.contains(entity.items[i].name)) {
            //         itemName = entity.items[i].name;
            //         this.view.rows[0][itemName] = entity.rows[0][itemName]; // 데이터 복사
            //     }
            // }
            // TODO::
            // console.log("*************");
            // console.log("_execView()");
            // for(var i = 0; i < this._output.count; i++) {
            //     for (var ii = 0; ii < this._output[i].items.count; ii++) {
            //         console.log("output["+ i +"] : " + this._output[i].items[ii].name);
            //     }
            // }
            
            // 뷰 콜백 호출  : EntitView를 전달함
            if (typeof this.cbOutput === "function" ) this.cbOutput(this.view);

            // 처리 종료 콜백 호출
            if (typeof this.cbEnd === "function" ) this.cbEnd();
            
            this._onExecuted();  // "실행 종료" 이벤트 발생
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