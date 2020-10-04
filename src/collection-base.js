/**
 * _W.Collection
 *      - BaseCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    require("./object-implement"); // _implements() : 폴리필

    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    var ICollection;
    var Observer;    

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        ICollection             = require("./i-collection");
        Observer                = require("./observer");
    } else {
        ICollection             = global._W.Util.ICollection;
        Observer                = global._W.Util.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
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
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { this._items[p_idx] = newValue; },
                enumerable: true,
                configurable: true
            };
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
         * @method add 배열속성 등록 및 값 설정
         * @method remove 배열속성 삭제
         * @method removeAt 배열속성 삭제
         * @method clear 배열속성 전체 삭제
         * @method contains 배열속성 + 고정속성 여부 검사 
         * @method indexOf 속성 인덱스 번호 얻기
         */

        return BaseCollection;
    }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseCollection;
    } else {
        global._W.Collection.BaseCollection = BaseCollection;
    }

}(this));