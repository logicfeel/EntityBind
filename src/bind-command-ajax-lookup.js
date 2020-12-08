/**
 * @namespace _W.Meta.Bind.BindCommandLookupAjax
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
    var BindCommandAjax;
    var entityView;
    var EntityView;
    var EntityViewCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommandAjax         = require("./bind-command-ajax");
        entityView              = require("./entity-view");
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
    } else {
        util                    = global._W.Common.Util;
        BindCommandAjax         = global._W.Meta.Bind.BindCommandAjax;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandAjax === "undefined") throw new Error("[BindCommandAjax] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof EntityViewCollection === "undefined") throw new Error("[EntityViewCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandLookupAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandLookupAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __cbOutput;
            var __outputOption = 1;     // 1: View 오버로딩 , 2: 있는자료만            
            
            this._output = new EntityViewCollection(this, this._baseEntity);
            
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
            
            /** @property {cbOutput} */
            Object.defineProperty(this, "cbOutput", 
            {
                get: function() { return __cbOutput; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbOutput] type 'Function' can be added");
                    __cbOutput = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // 속성 생성 및 참조 등록
            this.addOutput("output");
        }
        util.inherits(BindCommandLookupAjax, _super);

        /**
         * 콜백에서 받은 데이터를 기준으로 table(item, rows)을 만든다.
         * 리턴데이터 형식이 다를 경우 오버라이딩해서 수정함
         * @param {*} p_result 
         * @param {*} p_status 
         * @param {*} p_xhr 
         */
        BindCommandLookupAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {

            var loadOption = this.outputOption === 3 ? 2  : this.outputOption;

            if(typeof p_result["entity"] !== "undefined" || typeof p_result["table"] !== "undefined" ) {
                this._output[0].load(p_result, loadOption); // this["output"]
            } else if (Array.isArray(p_result["entities"])) {
                for(var i = 0; p_result["entities"].length > i && typeof this._output[i] !== "undefined"; i++) {
                    this._output[i].load(p_result["entities"][i], loadOption);
                }
            }

            // 존재하는 아이템 중에 지정된 값으로 설정한다.
            if (this.outputOption === 3) {
                for (var i = 0; this._output.count > i; i++) {
                    if (this._output[i].items.count > 0 && this._output[i].rows.count > 0)
                    this._output[i].setValue(this._output[i].rows[0]);
                }
            }

            // 뷰 콜백 호출  : EntitView를 전달함
            if (typeof this.cbOutput === "function" ) this.cbOutput(p_result);

            // 상위 호출 : 데코레이션 패턴
            _super.prototype._execSuccess.call(this, p_result, p_status, p_xhr);
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandLookupAjax.prototype.getTypes  = function() {
                    
            var type = ["BindCommandLookupAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandLookupAjax.prototype.addOutput = function(p_name) {

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            // this._output.add("default", this._baseEntity);            // 등록방법 2
            this._output.add(new EntityView(p_name, this._baseEntity));  // 등록방법 1
            this[p_name] = this._output[p_name];
        };

        return BindCommandLookupAjax;
    
    }(BindCommandAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandLookupAjax;
    } else {
        global._W.Meta.Bind.BindCommandLookupAjax = BindCommandLookupAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));