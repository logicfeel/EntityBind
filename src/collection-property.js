/**
 * @namespace _W.Collection.PropertyCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;
    var IPropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      = require("./collection-base");
        IPropertyCollection = require("./i-collection-property");
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
        IPropertyCollection = global._W.Interface.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");
    if (typeof IPropertyCollection === "undefined") throw new Error("[IPropertyCollection] module load fail...");
    
    //==============================================================
    // 4. 모듈 구현    
    var PropertyCollection  = (function (_super) {
        /**
         * @method 속성타입 컬렉션 클래스
         */
        function PropertyCollection(p_onwer) {
            _super.call(this, p_onwer); 

            var __properties = [];

            /** @property {properties} */
            Object.defineProperty(this, "properties", 
            {
                get: function() { return __properties; },
                set: function(newValue) { __properties = newValue; },
                configurable: true,
                enumerable: true
            });

            /** @interface IPropertyCollection 인터페이스 선언 */
            this._implements(IPropertyCollection);            
        }
        util.inherits(PropertyCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method __remove 배열속성 삭제 (내부처리)
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype._remove = function(p_idx) {
            
            var count = this._element.length - 1;
            var propName;
            
            // 프로퍼티 삭제
            propName = this.propertyOf(p_idx);
            delete this[propName];                      

            // 원시 자료 변경
            this._element.splice(p_idx, 1);
            this.properties.splice(p_idx, 1);

            // 참조 자료 변경
            if (p_idx < count) {
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));
                    propName = this.propertyOf(i);
                    Object.defineProperty(this, propName, this._getPropDescriptor(i));
                }
                delete this[count];                     // 마지막 idx 삭제
            } else {
                delete this[p_idx];                     // idx 삭제 (끝일 경우)
            }
        };

        /**
         * @method add 배열속성 설정 및 속성값 등록
         * @param {String} p_name [필수] 속성명
         * @param {?any} p_value 속성값
         * @returns {any} 입력 속성 참조값 REVIEW:: 필요성 검토
         */
        PropertyCollection.prototype.add = function(p_name, p_value) {
            p_value = p_value || "";
            
            var typeName;
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전
        
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (this.elementType !== null && !(p_value instanceof this.elementType)) {
                typeName = this.elementType.constructor.name;
                throw new Error("Only [" + typeName + "] type instances can be added");
            }
            
            if (this.indexOfName(p_name) > -1) {
                console.warn("Warning:: 프로퍼티 이름 중복 !!");
                return this[p_name];     // 중복 등록 방지
            }

            this._element.push(p_value);
            this.properties.push(p_name);

            index = (this._element.length === 1) ? 0 : this._element.length  - 1;
            Object.defineProperty(this, [index], this._getPropDescriptor(index));
            Object.defineProperty(this, p_name, this._getPropDescriptor(index));

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return this[index];
        };

        /**
         * @method clear 배열속성 전체삭제
         */
        PropertyCollection.prototype.clear = function() {
            
            var propName;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._element.length; i++) {
                propName = this.propertyOf(i);
                delete this[i];
                delete this[propName];
            }

            this._element = [];
            this.properties = [];

            this._onClear();                        // 이벤트 발생 : 전체삭제
            this._onChanged();                      // 이벤트 발생 : 변경후                
        };
        
        /**
         * @method indexOfName 이름으로 index값 조회
         * @param {string} p_name 
         */
        PropertyCollection.prototype.indexOfName = function(p_name) {
            
            var obj;
            
            if (typeof p_name !== "string")  throw new Error("Only [p_name] type 'string' can be added");
            
            obj = this[p_name];

            return this._element.indexOf(obj);;
        };

        /**
         * @method propertyOf 배열속성 이름 찾기
         * @param {Number} p_idx 인덱스
         * @returns {String}
         */
        PropertyCollection.prototype.propertyOf = function(p_idx) {
            return this.properties[p_idx];
        };

        return PropertyCollection;

    }(BaseCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = PropertyCollection;
    } else {
        global._W.Collection.PropertyCollection = PropertyCollection;
    }

}(this));