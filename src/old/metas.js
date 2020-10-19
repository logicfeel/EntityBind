/**
 * _W.Meta.Base.* : 메타의 기초/기본
 * 
 *  - MetaObject : 메타의 최상위, 객첼 직렬화(파일 <=> 객체)
 *      + IObject 구현
 *  - MetaElement : 관리되어야 하는 MetaObject 요소 (getObject, 직렬화)
 *      + IMarshal 구현
 *  - ComplexElement : 속성 타입의 관리되는 MetaObject 요소
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 | 폴리필 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Base     = global._W.Meta.Base || {};
    global._W.Interface     = global._W.Interface || {};    

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IObject;
    var IMarshal;
    var common;
    var Observer;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("../src/object-implement.slim"); // _implements() : 폴리필

        common              = require("./utils");
        Observer            = require("./observer");
        IObject             = require("./i-object");
        IMarshal            = require("./i-marshal");
    } else {
        common              = global._W.common;
        Observer            = global._W.common.Observer;
        IObject             = global._W.Interface.IObject;        
        IMarshal            = global._W.Interface.IMarshal;        
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof common === "undefined") throw new Error("[common] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof IObject === "undefined") throw new Error("[IObject] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    var MetaObject  = (function () {
        /**
         * @class 메타 최상위 클래스 (실체)
         */
        function MetaObject() {
            this.__GUID = null;

            // 구현할 인터페이스 선언
            this._implements(IObject);
        }
    
        /**
         * @method GUID 생성
         */
        MetaObject.prototype._newGUID  = function() {
            return common.createGUID();
        };

        /**
         * 조건 : GUID는 한번만 생성해야 함
         * @method GUID 얻기
         */
        MetaObject.prototype.getGUID  = function() {
            if (this.__GUID === null) {
                this.__GUID = this._newGUID();
            }
            return this.__GUID;
        };
    
        return MetaObject;
    }());
    
    //---------------------------------------
    var MetaElement  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function MetaElement() {
            _super.call(this);
            
            /**
             * @interface IMarshal 인터페이스 선언
             */
            this._implements(IMarshal);            
        }
        common.inherits(MetaElement, _super);
    
        /**
         * @method 객체 얻기 : 추상메소드
         */
        MetaElement.prototype.getObject  = function() {
            throw new Error("[ getObject() ] Abstract method definition, fail...");            
        };

        return MetaElement;
    
    }(MetaObject));

    //---------------------------------------
    var ComplexElement  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function ComplexElement() {
            _super.call(this);

            /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IProperyCollection);                
        }
        common.inherits(ComplexElement, _super);
    

        // TODO::
        // ComplexElement.prototype.add  = function(p_name) {};
        // ComplexElement.prototype.remove  = function(p_name) {};
        // ComplexElement.prototype.removeAt  = function(p_name) {};
        // ComplexElement.prototype.clear  = function(p_name) {};
        // ComplexElement.prototype.indexOf  = function(p_name) {};
        // ComplexElement.prototype.properyOf  = function(p_name) {};

        return ComplexElement;
    
    }(MetaElement));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = {
            MetaObject: MetaObject,
            MetaElement: MetaElement,
            ComplexElement: ComplexElement
        };
    } else {
        global._W.Meta.Base.MetaObject = MetaObject;
        global._W.Meta.Base.MetaElement = MetaElement;
        global._W.Meta.Base.ComplexElement = ComplexElement;
    }

}(this));