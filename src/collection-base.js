/**
 * @namespace _W.Collection.BaseCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var ICollection;
    var Observer;    

    if (typeof module === "object" && typeof module.exports === "object") {
        ICollection         = require("./i-collection");
        Observer            = require("./observer");
    } else {
        ICollection         = global._W.Interface.ICollection;
        Observer            = global._W.Common.Observer;
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
    
            var __elementType   = null;

            // Private
            this.__event        = new Observer(this, this);

            // Protected
            this._onwer         = p_onwer;
            this._element       = [];
            this._symbol        = [];

            /** @property */
            Object.defineProperty(this, "elementType", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return __elementType;
                },
                set: function(newValue) {
                    if(typeof newValue !== "function") throw new Error("Only [elementType] type 'function' can be added");
                    if(typeof newValue === "function" && typeof ["number", "string", "boolean"].indexOf(newValue.name) > -1) {
                        throw new Error("Only [elementType] type Not 'number', 'string', 'boolean' can be added");
                    }
                    __elementType = newValue;
                }
            });

            /** @property */
            Object.defineProperty(this, "list", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element;
                }
            });
            /** @property */
            Object.defineProperty(this, "count", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element.length;
                }
            });
            /** @event */
            Object.defineProperty(this, "onAdd", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "add");
                }
            });
            /** @event */
            Object.defineProperty(this, "onRemove", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "remove");
                }
            });
            /** @event */
            Object.defineProperty(this, "onClear", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "clear");
                }
            });
            /** @event */
            Object.defineProperty(this, "onChanging", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "changing");
                }
            });
            /** @event */
            Object.defineProperty(this, "onChanged", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "changed");
                }
            });

            // 예약어 등록
            this._symbol = this._symbol.concat(["__event", "_onwer", "_element", "_symbol", "elementType", "list", "count"]);
            this._symbol = this._symbol.concat(["onAddr", "onRemove", "onClear", "onChanging", "onChanged"]);
            this._symbol = this._symbol.concat(["_getPropDescriptor", "_onAdd", "_onRemove", "_onClear", "_onChanging", "_onChanged"]);
            this._symbol = this._symbol.concat(["_remove", "add", "clear", "remove", "removeAt", "indexOf"]);

            /** @implements ICollection 인터페이스 구현 */
             this._implements(ICollection);
        }
    
        /**
         * @method private 프로퍼티 기술자 설정
         * @param {number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) {
                    
                    var typeName;

                    if (this.elementType !== null && !(newValue instanceof this.elementType)) {
                        // typeName = this.elementType.constructor.name; // REVIEW::
                        typeName = this.elementType.name || this.elementType.constructor.name;
                        throw new Error("Only [" + typeName + "] type instances can be added");
                    }
                    this._element[p_idx] = newValue; 
                },
                enumerable: true,
                configurable: true
            };
        };

        /** @event onAdd 등록 이벤트 발생 */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish("add", p_idx, p_value); 
        };

        /** @event onRemove 삭제 이벤트 발생 */
        BaseCollection.prototype._onRemove = function(p_idx) {
            this.__event.publish("remove", p_idx); 
        };

        /** @event onClear 전체삭제 이벤트 발생 */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish("clear"); 
        };

        /** @event onChanging 변경시 이벤트 발생 */
        BaseCollection.prototype._onChanging = function() {
            this.__event.publish("changing"); 
        };

        /** @event onChanged 변경후 이벤트 발생 */
        BaseCollection.prototype._onChanged = function() {
            this.__event.publish("changed"); 
        };

        /** @abstract */
        BaseCollection.prototype._remove  = function() {
            throw new Error("[ _remove() ] Abstract method definition, fail...");
        };

        /** @abstract */
        BaseCollection.prototype.add  = function() {
            throw new Error("[ add() ] Abstract method definition, fail...");
        };
        
        /** @abstract */
        BaseCollection.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        /**
         * @method remove 배열속성 삭제
         * @param {element} p_elem 속성명
         * @returns {number} 삭제한 인덱스
         */
        BaseCollection.prototype.remove = function(p_elem) {
            
            var idx;
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (this.contains(p_elem)) {
                idx = this.indexOf(p_elem);
                this._remove(idx);
            }
            
            this._onRemove(idx);                    // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method removeAt 배열속성 삭제
         * @param {number} p_idx 인덱스
         */
        BaseCollection.prototype.removeAt = function(p_idx) {

            var obj = this._element[p_idx];
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (typeof obj !== "undefined") this._remove(p_idx);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };

        /**
         * @method contains 배열속성 여부 
         * @param {object} p_elem 속성 객체
         * @returns {boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._element.indexOf(p_elem) > -1;
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {Object} p_elem 속성 객체
         * @returns {Number}
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._element.indexOf(p_elem);
        };

        return BaseCollection;
    }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseCollection;
    } else {
        global._W.Collection.BaseCollection = BaseCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));