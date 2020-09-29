/**
 * BaseCollection : node, web
 */
(function(global) {

    "use strict";

    //--------------------------------------------------------------
    // 1. 모듈 선언
    var Observer;

    //--------------------------------------------------------------
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        Observer = require("./observer");
    } else {
        global._W = global._W || {};
        Observer =  global._W.Observer;
    }

    //--------------------------------------------------------------
    // 3. 의존성 검사
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");


    //--------------------------------------------------------------
    // 4. 모듈 구현    
    var BaseCollection  = (function () {
        /**
         * @description 속성타입 컬렉션 최상위(부모) 클래스
         */
        function BaseCollection() {
    
            this.isDebug    = false;       // 디버깅 플래그
    
            this._items     = [];

            this._event     = new Observer(this, this);
            
            this.setProperty("onAdd", 
                null, 
                function(p_fn) {
                    this._event.subscribe(p_fn, "add");
                }
            );
            
            this.setProperty("onRemove", 
                null, 
                function(p_fn) {
                    this._event.subscribe(p_fn, "remove");
                }
            );

            this.setProperty("onClear", 
                null, 
                function(p_fn) {
                    this._event.subscribe(p_fn, "clear");
                }
            );
        }
    
        /**
         * @description private 프로퍼티 옵션 객체 얻기
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
         * @description 고정속성 등록
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
         * @description 고정속성 삭제 
         * @param {*} p_name 속성명
         */
        BaseCollection.prototype.delProperty = function(p_name) {
            
            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            delete this[p_name];                    // 내부 이름 참조 삭제
        };

        /**
         * @description 배열속성 등록 및 값 설정
         * @param {*} p_name [필수] 속성명
         * @param {*} p_value 속성값
         */
        BaseCollection.prototype.add = function(p_name, p_value) {
        
            var index   = -1;
        
            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            
            this._items.push(p_value);
            index = (this._items.length === 1) ? 0 : this._items.length  - 1;
            Object.defineProperty(this, [index], this._getPropDesciptor(index));

            if (p_name) {
                Object.defineProperty(this, p_name, this._getPropDesciptor(index));
            }

            this._event.publish("add");             // 이벤트 발생
        };

        /**
         * @description 배열속성 삭제
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스 번호
         */
        BaseCollection.prototype.remove = function(p_name) {

            var idx = this.indexOf(p_name);

            delete this[p_name];                    // 내부 이름 삭제
            delete this[idx];                       // 내부 idx 삭제
            delete this._items[idx];                // 내부 참조 삭제
            
            this._event.publish("remove");          // 이벤트 발생

            return idx;
        };
        
        /**
         * @description 배열속성 삭제
         * @param {*} p_idx 인덱스 번호
         */
        BaseCollection.prototype.removeAt = function(p_idx) {

            var propName = this.propertyOf(p_idx);
            
            if (typeof propName === "string") this.remove(propName);
        };
        
        /**
         * @description 배열속성 전체 삭제
         */
        BaseCollection.prototype.clear = function() {
            
            var propName;
            
            for (var i = 0; i < this._items.length; i++) {
                propName = this.propertyOf(i);
                if (typeof propName === "string") this.remove(propName);
            }
            this._items = [];
            this._event.publish("clear");           // 이벤트 발생
        };
        
        /**
         * @description 배열속성 + 고정속성 여부 검사 
         * @param {String} p_name 속성명
         */
        BaseCollection.prototype.contains = function(p_name) {
            return typeof this[p_name] !== "undefined";
        };

        /**
         * @description 속성 인덱스 번호 얻기
         * @param {String}} p_name 속성명
         */
        BaseCollection.prototype.indexOf = function(p_name) {
            
            var idx = this._items.indexOf(this[p_name]);
            
            return idx;
        };

        /**
         * @description 속성 배열속성 이름 얻기
         * @param {String}} p_name 속성명
         */
        BaseCollection.prototype.propertyOf = function(p_idx) {
            
            for (var prop in this) {
                if ( this.hasOwnProperty(prop)){
                    if (!isFinite(prop) && this[prop] === this[p_idx]) {
                        return prop;
                    }
                }
            }
            return null;
        };

        return BaseCollection;
    }());
    

    //--------------------------------------------------------------
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseCollection;
    } else {
        global._W.BaseCollection = BaseCollection;
    }

}(this));