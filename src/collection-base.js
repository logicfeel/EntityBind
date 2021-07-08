/**
 * @namespace _W.Collection 
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
         * BaseCollection 추상클래스
         * @class BaseCollection
         * @classdesc 컬렉션 최상위(부모) 클래스
         * @param {obejct} p_onwer 소유객체
         */
        function BaseCollection(p_onwer) {
    
            var __elementType   = null;

            // Private
            this.__event        = new Observer(this, this);

            // Protected
            this._onwer         = p_onwer;
            this._element       = [];
            this._symbol        = [];

            /** @member {Observer} BaseCollection#elementType 요소타입 */
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

            /**
             * @member {Array}  BaseCollection#list  컬렉션 목록 
             */
            Object.defineProperty(this, "list", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element;
                }
            });
            /** 
             * @member {Number} BaseCollection#count 갯수
             */
            Object.defineProperty(this, "count", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element.length;
                }
            });

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
            /** 
             * @event BaseCollection#onClear 전체 제거 이벤트
             */
            Object.defineProperty(this, "onClear", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "clear");
                }
            });
            /** 
             * 변경(등록/삭제) 전 이벤트  
             * @event BaseCollection#onChanging 
             */
            Object.defineProperty(this, "onChanging", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "changing");
                }
            });
            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event BaseCollection#onChanged 
             */
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
         * 프로퍼티 기술자 설정
         * @method BaseCollection#_getPropDescriptor 
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

        /**
         * 등록 이벤트 
         * @event BaseCollection#onAdd  
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish("add", p_idx, p_value); 
        };

        /** @event onRemove 삭제 이벤트 발생 */
        BaseCollection.prototype._onRemove = function(p_idx) {
            this.__event.publish("remove", p_idx); 
        };

        /** 
         *  전체삭제 이벤트 수신
         * @method BaseCollection#_onClear
         * @listens BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish("clear"); 
        };

        /** 
         *  변경(등록/삭제) 전 이벤트 수신
         * @method BaseCollection#_onChanging
         * @listens BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function() {
            this.__event.publish("changing"); 
        };

        /** 
         *  변경(등록/삭제) 후 이벤트 수신
         * @method BaseCollection#_onChanged
         * @listens BaseCollection#onChanged
         */        
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
        
        /** 
         * 전체삭제(초기화)
         * @abstract 
         * @method BaseCollection#clear
         * @fires BaseCollection#onClear 
         */
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