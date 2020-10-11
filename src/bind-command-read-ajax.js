const { EntityView } = require("./entity-view");

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
    var BindCommandRead;
    var jquery;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindCommandRead     = require("./bind-command-read");
        jquery              = require("jquery");
    } else {
        util                = global._W.Common.Util;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        jquery              = global.$;     // jquery 로딩 REVIEW:: 로딩 확인
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof jquery === "undefined") throw new Error("[jquery] module load fail...");

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
                method: "POST"
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
            
            var $ = jquery;
            var url = this.ajaxSetup.url || this._model.g_ajaxSetup.url;
            var method = this.ajaxSetup.method || this._model.g_ajaxSetup.method;
            var data = {};   // items에서 받아와야함
            var success = this._execCallback; 
            
            for(var i = 0; i < this.bind.items.count; i++) {
                data[this.bind.items.name] = this.bind.items[i].refValue; // 값
            }

            $.ajax(this.ajaxSetup);

            // REVIEW:: 확인후 삭제
            console.log("*************");
            console.log("_execBind(ajax load)");
        };
        
        BindCommandReadAjax.prototype._execCallback = function(i_result, i_status, i_xhr) {
            
            var entities = [];
            var entity;

            // TODO:: 임시데이터 가져오기 테스트 부분
            if(i_result) {
                if (i_result.entity) {
                    entity = new EntityView("entity");
                    if (i_result.entity.rows) {
                        
                        // items 구성
                        for(var i = 0; i_result.entity.rows.length > i; i++) {
                            for (var prop in i_result.entity.rows[i]) {
                                if (view.hasOwnProperty(prop)) entity.items.add(prop);
                            }
                        }

                        // Rows (데이터)등록
                        entity.items.newRow();
                        for(var i = 0; i_result.entity.rows.length > i; i++) {
                            for (var prop in i_result.entity.rows[i]) {
                                if (view.hasOwnProperty(prop)) entity.rows[i][prop] = i_result.entity.rows[i][prop];
                            }
                        }

                    }
                }
            }
            
            // TODO:: i_result를 _output[0](this.view))을 비교하여 결과를 삽입함.
            // _output[0].rows.newRow() 이런식으로 삽입
            // 리턴이 두개일 경우 두개를 삽입?
            console.log("*************");
            console.log("_execCallback()");
            this._execView(entity);
        };

        // TODO:: 이 부분은 사용시 구현이 되어야함.
        BindCommandReadAjax.prototype._execView = function(entity) {
            
            var itemName;
            
            this.view.newRow();
            
            for (var i = 0; entity.items.count > i; i++) {
                
                if (this.view.items.contains(entity.items[i].name)) {
                    itemName = entity.items[i].name;
                    this.view.rows[0][itemName] = entity.rows[0][itemName]; // 데이터 복사
                }
            }
            // TODO::
            // console.log("*************");
            // console.log("_execView()");
            // for(var i = 0; i < this._output.count; i++) {
            //     for (var ii = 0; ii < this._output[i].items.count; ii++) {
            //         console.log("output["+ i +"] : " + this._output[i].items[ii].name);
            //     }
            // }
            
            // 뷰 콜백 호출  : EntitView를 전달함
            if (typeof this.cbView === "function" ) this.cbView(this.view);

            // 처리 종료 콜백 호출
            if (typeof this.cbEnd === "function" ) this.cbEnd(this.view);
            
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

        return BindCommandReadAjax;
    
    }(BindCommandRead));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandReadAjax;
    } else {
        global._W.Meta.Bind.BindCommandReadAjax = BindCommandReadAjax;
    }

}(this));