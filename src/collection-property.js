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
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IPropertyCollection 인터페이스 선언
             */
            this._implements(IPropertyCollection);            
        }
        util.inherits(PropertyCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method 배열속성 삭제 (내부처리)
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        // PropertyCollection.prototype.__remove = function(p_name) {

        //     var idx = this.indexOf(p_name);

        //     delete this[p_name];                                        // 이름 삭제
        //     delete this[idx];                                           // idx 삭제
        //     delete this._element[idx];                                  // 내부참조 삭제
        //     delete this.properties[this.properties.indexOf(p_name)];    // 속성목록 삭제

        //     return idx;
        // };
        PropertyCollection.prototype.__remove = function(p_idx) {
            
            var count = this._element.length - 1;
            var propName;

            this._element.splice(p_idx, 1);
            
            if (p_idx < count) {
                // 참조 변경(이동)
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));
                    propName = this.propertyOf(i);
                    Object.defineProperty(this, propName, this._getPropDescriptor(i));
                }
                delete this[count];                     // 마지막 idx 삭제
            } else {
                delete this[p_idx];                     // idx 삭제 (끝일 경우)
            }
            propName = this.propertyOf(p_idx);          
            delete this[propName];                      // 이름 삭제
            this.properties.splice(p_idx, 1);
        };

        /**
         * @method 배열속성 설정 및 속성값 등록
         * @param {string} p_name [필수] 속성명
         * @param {?any} p_value 속성값
         * @returns {any} 입력 속성 참조값 REVIEW:: 필요성 검토
         */
        PropertyCollection.prototype.add = function(p_name, p_value) {
            p_value = p_value || "";
            
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전
        
            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            if (this.contains(p_name)) {
                console.warn("Warning:: 이름이 중복 !!");
                return this[p_name];     // 중복 등록 방지
            }

            this._element.push(p_value);
            index = (this._element.length === 1) ? 0 : this._element.length  - 1;
            Object.defineProperty(this, [index], this._getPropDescriptor(index));

            if (p_name) {
                Object.defineProperty(this, p_name, this._getPropDescriptor(index));
            }
            this.properties.push(p_name);

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return [index];
        };

        /**
         * REVEIW: 테스트 필요
         * @method 배열속성 삭제
         * @param {name | element} p_obj 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype.remove = function(p_obj) {

            var idx;
            var propName;
            var elem;

            this._onChanging();                     // 이벤트 발생 : 변경전

            if (typeof p_obj === "string") 

            idx = this.indexOf(p_obj);
            propName = this.propertyOf(idx);

            if (this.contains(propName)) this.__remove(idx);
            
            this._onRemove(idx);                    // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method 배열속성 삭제
         * @param {*} p_idx 인덱스
         */
        PropertyCollection.prototype.removeAt = function(p_idx) {

            var propName = this.propertyOf(p_idx);
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            if (typeof propName === "string") this.__remove(p_idx);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };
        
        /**
         * @method 배열속성 전체삭제
         */
        PropertyCollection.prototype.clear = function() {
            
            var propName;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._element.length; i++) {
                propName = this.propertyOf(i);
                if (typeof propName === "string") this.__remove(i);
            }
            this._element = [];

            this._onClear();                        // 이벤트 발생 : 전체삭제
            this._onChanged();                      // 이벤트 발생 : 변경후                
        };
        
        /**
         * TODO:: 객체로 오면 컬렉션중 객체를 비교해야 함.
         * 
         * @method 배열속성 여부
         * @param {String} p_name 속성명
         * @returns {Boolean}
         */
        PropertyCollection.prototype.contains = function(p_obj) {
            if (typeof p_obj === "string") {
                return typeof this[p_obj] !== "undefined";
            } else {
                return this.indexOf(p_obj) > -1;
            }
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {String}} p_name 속성명
         * @returns {Number}
         */
        PropertyCollection.prototype.indexOf = function(p_obj) {
            
            var obj = typeof p_obj === "string" ? this[p_obj] : p_obj;
            
            return this._element.indexOf(obj);;
        };

        /**
         * @method 배열속성 이름 찾기
         * @param {Number}} p_idx 인덱스
         * @returns {String}
         */
        // PropertyCollection.prototype.propertyOf = function(p_idx) {
            
        //     for (var prop in this) {
        //         if ( this.hasOwnProperty(prop)){
        //             if (!isFinite(prop) && this[prop] === this._element[p_idx]) {
        //                 return prop;
        //             }
        //         }
        //     }
        //     return null;
        // };
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