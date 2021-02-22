/**
 * @namespace _W.Meta.Bind.BindCommandEditAjax
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

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindCommandAjax     = require("./bind-command-ajax");
    } else {
        util                = global._W.Common.Util;
        BindCommandAjax     = global._W.Meta.Bind.BindCommandAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandAjax === "undefined") throw new Error("[BindCommandAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandEditAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandEditAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);
        
            // 예약어 등록
            this._symbol = this._symbol.concat([]);
        }
        util.inherits(BindCommandEditAjax, _super);
    
        BindCommandEditAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {

            // 콜백 검사 (result)
            if (typeof this._model.cbResult === "function" ) p_result = this._model.cbResult(p_result);

            // 상위 호출 : 데코레이션 패턴
            _super.prototype._execSuccess.call(this, p_result, p_status, p_xhr);
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandEditAjax.prototype.getTypes  = function() {
                
            var type = ["BindCommandEditAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        

        return BindCommandEditAjax;
    
    }(BindCommandAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandEditAjax;
    } else {
        global._W.Meta.Bind.BindCommandEditAjax = BindCommandEditAjax;
        global.BindCommandEditAjax = BindCommandEditAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));