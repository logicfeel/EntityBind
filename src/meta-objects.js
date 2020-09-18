/**
 * _W.MetaObject.Base : 메타의 기초/기본
 *  - MetaObject : 메타의 최상위
 *  - MetaObjectElement : 관리되어야 하는 MetaObject 요소 (getObject, 직렬화)
 *  - PropertyElement : 속성 타입의 관리되는 MetaObject 요소
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    var Observer;
    var util;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        Observer    = require("./observer");
        util        = require("./utils");
    } else {
        // 네임스페이스 구성
        global._W               = global._W || {};
        global._W.Meta          = global._W.Meta || {};
        global._W.Meta.Base     = global._W.Meta.Base || {};
        
        Observer    = global._W.Observer;
        util        = global._W.util;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof util === "undefined") throw new Error("[util] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    // 클래스 정의
    var MetaObject  = (function () {
        /**
         * @description 메타 최상위 클래스 (실체)
         */
        function MetaObject() {
            this.__GUID = this._newGUID();
        }
    
        /**
         * @description GUID 생성
         */
        MetaObject.prototype._newGUID  = function() {
            function _p8(s) {  
                var p = (Math.random().toString(16)+"000000000").substr(2,8);  
                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
             }  
             return _p8() + _p8(true) + _p8(true) + _p8();  
        };

        /**
         * @description GUID 얻기
         */
        MetaObject.prototype.getGUID  = function() {
            return this.__GUID;
        };
    
        return MetaObject;
    }());
    
    //---------------------------------------
    // 클래스 정의
    var MetaElement  = (function (_super) {
    
        function MetaElement() {
            _super.call(this);
        }
        util.inherits(MetaElement, _super);     // 상속(대상, 부모)    
    
        /**
         * @description 객체 얻기 : 추상메소드
         */
        MetaElement.prototype.getObject  = function() {
            throw new Error("[ getObject() ] Abstract method definition, fail...");            
        };

        return MetaElement;
    
    }(MetaObject));

    //---------------------------------------
    // 클래스 정의
    var PropertyElement  = (function (_super) {
    
        function PropertyElement() {
            _super.call(this);
        }
        util.inherits(PropertyElement, _super);     // 상속(대상, 부모)    
    
        /**
         * @description 
         */
        PropertyElement.prototype.add  = function(p_name) {
            // TODO::             
        };

        return PropertyElement;
    
    }(MetaElement));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = {
            MetaObject = MetaObject,
            MetaElement = MetaElement,
            PropertyElement = PropertyElement
        };
    } else {
        global._W.Meta.Base.MetaObject = MetaObject;
        global._W.Meta.Base.MetaElement = MetaElement;
        global._W.Meta.Base.PropertyElement = PropertyElement;
    }

}(this));