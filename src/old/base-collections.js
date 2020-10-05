/**
 * _W.Util.Collection.* : 컬렉션
 * 
 *  - BaseCollection : 컬렉션 최상위
 *  - ArrayColleciton : 배열형 컬렉션
 *  - PerpertyCollection : 속성형 컬렉션
 * BaseCollection : 
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 | 폴리필 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    var Util;   
    var Observer;
    var ICollection;
    var IProperyCollection;


    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필
        
        Util                    = require("./utils");
        Observer                = require("./observer");
        ICollection             = require("./i-collection");
        IProperyCollection      = require("./i-collection-property");
    } else {
        Util                    = global._W.Util;
        Observer                = global._W.Util.Observer;
        ICollection             = global._W.Util.ICollection;
        IProperyCollection      = global._W.Util.IProperyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === "undefined") throw new Error("[Util] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");
    if (typeof IProperyCollection === "undefined") throw new Error("[IProperyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    var BaseCollection  = (function () {
        /**
         * @abstract 추상클래스
         * @class 속성타입 컬렉션 최상위(부모) 클래스
         */
        function BaseCollection(p_onwer) {
    
            this.isDebug    = false;       // 디버깅 플래그

            // Private
            this.__event     = new Observer(this, this);

            // Protected
            this._onwer    = p_onwer;
    
            this._items    = [];

            // Property
            this.setProperty("count", 
                function() {
                    return this._items.length;
                }, 
                null
            );

            // Property
            this.setProperty("list", 
                function() {
                    return this._items;
                }, 
                null
            );
            
            // Event
            this.setProperty("onAdd",       // 등록
                null, 
                function(p_fn) {
                    this.__event.subscribe(p_fn, "add");
                }
            );
            
            this.setProperty("onRemove",    // 삭제
                null, 
                function(p_fn) {
                    this.__event.subscribe(p_fn, "remove");
                }
            );

            this.setProperty("onClear",     // 전체삭제
                null, 
                function(p_fn) {
                    this.__event.subscribe(p_fn, "clear");
                }
            );

            this.setProperty("onChanging", // 변경전 (등록,삭제시)
                null, 
                function(p_fn) {
                    this.__event.subscribe(p_fn, "changing");
                }
            );

            this.setProperty("onChanged", // 변경후 (등록,삭제시)
                null, 
                function(p_fn) {
                    this.__event.subscribe(p_fn, "changed");
                }
            );

            /**
             * 인터페이스 선언
             * @interface
             */
            this._implements(ICollection);
        }
    
        /**
         * @method private 프로퍼티 옵션 객체 얻기
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDesciptor = function(p_idx) {
            var obj = {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { this._items[p_idx] = newValue; },
                enumerable: true,
                configurable: true
            };
            
            return obj;
        };

        /**
         *  @method 고정속성 등록
         * @param {String} p_name 속성명
         * @param {Function} p_getter getter 함수
         * @param {Function} p_setter setter 함수
         */
        BaseCollection.prototype.setProperty = function(p_name, p_getter, p_setter) {

            var obj = {
                enumerable: true,
                configurable: true
            };
            
            if (typeof p_getter === "function") {
                obj.get = p_getter;
            } else {    // G 기본값 설정
                obj.get = function(){return null};
            }
    
            if (typeof p_setter === "function") {
                obj.set = p_setter;
            } else {    // 셋터 기본값 설정
                obj.set = function(){};
            }
    
            Object.defineProperty(this, p_name, obj);
        };

        /**
         * @method 고정속성 삭제 
         * @param {*} p_name 속성명
         */
        BaseCollection.prototype.delProperty = function(p_name) {
            
            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            delete this[p_name];                    // 내부 이름 참조 삭제
        };

        /**
         * @method 배열속성 등록 및 값 설정
         */
        // BaseCollection.prototype.add = function() {
        //     throw new Error("[ add() ] Abstract method definition, fail...");
        // };

        /**
         * @method 배열속성 삭제
         */
        // BaseCollection.prototype.remove = function() {
        //     throw new Error("[ remove() ] Abstract method definition, fail...");
        // };
        
        /**
         * @method 배열속성 삭제
         */
        // BaseCollection.prototype.removeAt = function() {
        //     throw new Error("[ removeAt() ] Abstract method definition, fail...");
        // };
        
        /**
         * @method 배열속성 전체 삭제
         */
        // BaseCollection.prototype.clear = function() {
        //     throw new Error("[ clear() ] Abstract method definition, fail...");
        // };
        
        /**
         * @method 배열속성 + 고정속성 여부 검사 
         */
        // BaseCollection.prototype.contains = function() {
        //     throw new Error("[ contains() ] Abstract method definition, fail...");
        // };

        /**
         * @method 속성 인덱스 번호 얻기
         */
        // BaseCollection.prototype.indexOf = function() {
        //     throw new Error("[ indexOf() ] Abstract method definition, fail...");
        // };

        /**
         * @method 속성 배열속성 이름 얻기
         */
        // BaseCollection.prototype.propertyOf = function() {
        //     throw new Error("[ propertyOf() ] Abstract method definition, fail...");
        // };

        return BaseCollection;
    }());
    
    //---------------------------------------
    var ArrayCollection  = (function (_super) {
        /**
         * @class 배열타입 컬렉션 클래스
         */
        function ArrayCollection(p_onwer) {
            _super.call(this, p_onwer); 

        }
        Util.inherits(ArrayCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method 배열속성 삭제 (내부처리)
         * @param {*} p_idx 인덱스 번호
         */
        ArrayCollection.prototype._remove = function(p_idx) {
            delete this[p_idx];                      // 내부 idx 삭제
            delete this._items[p_idx];              // 내부 참조 삭제
        };

        /**
         * @method 배열속성 속성값 설정
         * @param {*} p_value [필수] 속성값
         * @returns {*} 입력 속성 참조값
         */
        ArrayCollection.prototype.add = function(p_value) {
        
            var index   = -1;

            if (typeof p_value === "undefined") throw new Error("p_value param request fail...");
        
            this._items.push(p_value);
            index = (this._items.length === 1) ? 0 : this._items.length  - 1;
            Object.defineProperty(this, [index], this._getPropDesciptor(index));

            this.__event.publish("add");             // 이벤트 발생

            return [index];
        };

        /**
         * @method 배열속성 삭제
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        ArrayCollection.prototype.remove = function(p_obj) {
            
            var idx = this.indexOf(p_obj);
            
            this.__event.publish("changing");        // 이벤트 발생 : 변경전
            
            if (this.contains(p_obj)) this._remove(idx);
            
            this.__event.publish("remove");          // 이벤트 발생 : 삭제
            this.__event.publish("changed");         // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method 배열속성 삭제
         * @param {*} p_idx 인덱스
         */
        ArrayCollection.prototype.removeAt = function(p_idx) {

            var obj = this._items[p_idx];
            
            this.__event.publish("changing");        // 이벤트 발생 : 변경전
            
            if (typeof obj !== "undefined") this._remove(p_idx);

            this.__event.publish("remove");          // 이벤트 발생 : 삭제
            this.__event.publish("changed");         // 이벤트 발생 : 변경후            
        };
        
        /**
         * @method 배열속성 전체삭제
         */
        ArrayCollection.prototype.clear = function() {
            
            var obj;
            
            this.__event.publish("changing");        // 이벤트 발생 : 변경전

            for (var i = 0; i < this._items.length; i++) {
                obj = this.indexOf(i);
                if (typeof obj !== "undefined") this._remove(i);
            }
            this._items = [];
        
            this.__event.publish("clear");           // 이벤트 발생 : 전체삭제
            this.__event.publish("changed");         // 이벤트 발생 : 변경후            
        };
        
        /**
         * @method 배열속성 여부 
         * @param {Object} p_obj 속성 객체
         * @returns {Boolean}
         */
        ArrayCollection.prototype.contains = function(p_obj) {
            return this._items.indexOf(p_obj) > -1;
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {Object} p_obj 속성 객체
         * @returns {Number}
         */
        ArrayCollection.prototype.indexOf = function(p_obj) {
            return this._items.indexOf(p_obj);
        };

        return ArrayCollection;

    }(BaseCollection));

    //---------------------------------------
    // 클래스 정의
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
        Util.inherits(PropertyCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method 배열속성 삭제 (내부처리)
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype._remove = function(p_name) {

            var idx = this.indexOf(p_name);

            delete this[p_name];                    // 내부 이름 삭제
            delete this[idx];                       // 내부 idx 삭제
            delete this._items[idx];               // 내부 참조 삭제

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
        module.exports = {
            BaseCollection: BaseCollection,
            ArrayCollection: ArrayCollection,
            PropertyCollection: PropertyCollection
        };
    } else {
        global._W.Collection.BaseCollection = BaseCollection;
        global._W.Collection.ArrayCollection = ArrayCollection;
        global._W.Collection.PropertyCollection = PropertyCollection;
    }

}(this));