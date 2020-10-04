/**
 * _W.Collection
 *      - PropertyCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    var util;
    var BaseCollection;
    var IProperyCollection;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      = require("./collection-base");
        IProperyCollection  = require("./i-collection-property");
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
        IProperyCollection  = global._W.Inteface.IProperyCollection;

    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var PropertyCollection  = (function (_super) {
        /**
         * @method 속성타입 컬렉션 클래스
         */
        function PropertyCollection(p_onwer) {
            _super.call(this, p_onwer); 

            /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IProperyCollection);            
        }
        util.inherits(PropertyCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method 배열속성 삭제 (내부처리)
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype._remove = function(p_name) {

            var idx = this.indexOf(p_name);

            delete this[p_name];                    // 내부 이름 삭제
            delete this[idx];                       // 내부 idx 삭제
            delete this._items[idx];                // 내부 참조 삭제

            return idx;
        };

        /**
         * @method 배열속성 설정 및 속성값 등록
         * @param {*} p_name [필수] 속성명
         * @param {*} p_value 속성값
         * @returns {*} 입력 속성 참조값
         */
        PropertyCollection.prototype.add = function(p_name, p_value) {
            p_value = p_value || "";
            
            var index   = -1;
        
            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            if (this.contains(p_name)) {
                console.warn("Warning:: 이름이 중복 !!");
                return this[p_name];     // 중복 등록 방지
            }

            this._items.push(p_value);
            index = (this._items.length === 1) ? 0 : this._items.length  - 1;
            Object.defineProperty(this, [index], this._getPropDesciptor(index));

            if (p_name) {
                Object.defineProperty(this, p_name, this._getPropDesciptor(index));
            }

            this.__event.publish("add");             // 이벤트 발생

            return [index];
        };

        /**
         * @method 배열속성 삭제
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype.remove = function(p_name) {

            var idx;

            this.__event.publish("changing");        // 이벤트 발생 : 변경전

            if (this.contains(p_name)) idx = this._remove(p_name);
            
            this.__event.publish("remove");          // 이벤트 발생 : 삭제
            this.__event.publish("changed");         // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method 배열속성 삭제
         * @param {*} p_idx 인덱스
         */
        PropertyCollection.prototype.removeAt = function(p_idx) {

            var propName = this.propertyOf(p_idx);
            
            this.__event.publish("changing");        // 이벤트 발생 : 변경전

            if (typeof propName === "string") this._remove(propName);

            this.__event.publish("remove");          // 이벤트 발생 : 삭제
            this.__event.publish("changed");         // 이벤트 발생 : 변경후
        };
        
        /**
         * @method 배열속성 전체삭제
         */
        PropertyCollection.prototype.clear = function() {
            
            var propName;
            
            this.__event.publish("changing");        // 이벤트 발생 : 변경전

            for (var i = 0; i < this._items.length; i++) {
                propName = this.propertyOf(i);
                if (typeof propName === "string") this._remove(propName);
            }
            this._items = [];

            this.__event.publish("clear");           // 이벤트 발생 : 전체삭제
            this.__event.publish("changed");         // 이벤트 발생 : 변경후            
        };
        
        /**
         * TODO:: 객체로 오면 컬렉션중 객체를 비교해야 함.
         * 
         * @method 배열속성 여부
         * @param {String} p_name 속성명
         * @returns {Boolean}
         */
        PropertyCollection.prototype.contains = function(p_name) {
            return typeof this[p_name] !== "undefined";
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {String}} p_name 속성명
         * @returns {Number}
         */
        PropertyCollection.prototype.indexOf = function(p_name) {
            return this._items.indexOf(this[p_name]);
        };

        /**
         * @method 배열속성 이름 찾기
         * @param {Number}} p_idx 인덱스
         * @returns {String}
         */
        PropertyCollection.prototype.propertyOf = function(p_idx) {
            
            for (var prop in this) {
                if ( this.hasOwnProperty(prop)){
                    if (!isFinite(prop) && this[prop] === this._items[p_idx]) {
                        return prop;
                    }
                }
            }
            return null;
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