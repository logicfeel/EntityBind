/**
 * @namespace _W.Meta.Bind.BindCommandView
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
    var BindCommandInternal;
    var entityView;
    var EntityView;
    var EntityViewCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommandInternal     = require("./bind-command-internal");
        entityView              = require("./entity-view");
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
    } else {
        util                    = global._W.Common.Util;
        BindCommandInternal     = global._W.Meta.Bind.BindCommandInternal;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandInternal === "undefined") throw new Error("[BindCommandInternal] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof EntityViewCollection === "undefined") throw new Error("[EntityViewCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandView  = (function (_super) {
        /**
         * @class
         */
        function BindCommandView(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __cbOutput;

            var __outputOption = 1;     // 1: View 오버로딩 , 2: 있는자료만            
            
            this._output = new EntityViewCollection(this, this.baseEntity);
            
            // 속성 생성 및 참조 등록
            this.addOutput("outout");

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
                
        }
        util.inherits(BindCommandView, _super);

        /**
         * 콜백에서 받은 데이터를 기준으로 table(item, rows)을 만든다.
         * 리턴데이터 형식이 다를 경우 오버라이딩해서 수정함
         * @param {*} i_result 
         * @param {*} i_status 
         * @param {*} i_xhr 
         */
        BindCommandView.prototype._execSuccess = function(i_result, i_status, i_xhr) {

            this["outout"].load(i_result, this.outputOption);

            // 뷰 콜백 호출  : EntitView를 전달함
            if (typeof this.cbOutput === "function" ) this.cbOutput(this["outout"]);

            // 상위 호출 : 데코레이션 패턴
            _super.prototype._execSuccess.call(this, i_result, i_status, i_xhr);
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandView.prototype.getTypes  = function() {
                    
            var type = ["BindCommandView"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandView.prototype.addOutput = function(p_name) {

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            // this._output.add("default", this.baseEntity);            // 등록방법 2
            this._output.add(new EntityView(p_name, this.baseEntity));  // 등록방법 1
            this[p_name] = this._output[p_name];
        };

        return BindCommandView;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandView;
    } else {
        global._W.Meta.Bind.BindCommandView = BindCommandView;
    }

}(this));