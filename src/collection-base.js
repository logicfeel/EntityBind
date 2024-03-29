/**
 * namespace _W.Collection.BaseCollection
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var ICollection;
    var Observer;    

    if (typeof module === 'object' && typeof module.exports === 'object') {
        ICollection         = require('./i-collection');
        Observer            = require('./observer');
    } else {
        ICollection         = global._W.Interface.ICollection;
        Observer            = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현 
    
    var BaseCollection  = (function () {
       /**
        * 컬렉션 최상위 클래스 (추상클래스)
        * @constructs _W.Collection.BaseCollection
        * @implements {_W.Interface.ICollection}
        * @param {Object} p_onwer 소유객체
        */
        function BaseCollection(p_onwer) { 
            
            var __event  = new Observer(this, this);
            var _onwer = p_onwer || null;
            var _element = [];
            var _symbol = [];
            var __elementType   = null;

            /** 
             * 이벤트 객체
             * @private 
             * @member {Object} _W.Collection.BaseCollection#__event  
             */
            Object.defineProperty(this, '__event', {
                enumerable: false,
                configurable: true,
                get: function() { 
                    return __event;
                }
            });

             /** 
             * 소유객체
             * @protected 
             * @member {Object} _W.Collection.BaseCollection#_onwer  
             */
              Object.defineProperty(this, '_onwer', {
                enumerable: false,
                configurable: true,
                get: function() {
                    return _onwer;
                },
                set: function(val) {
                    _onwer = val;
                }
            });

            /** 
             * 컬랙선 내부값 
             * @protected 
             * @member {Array} _W.Collection.BaseCollection#_element  
             */
            Object.defineProperty(this, '_element', {
                enumerable: false,
                configurable: true,
                get: function() {
                    return _element;
                },
                set: function(val) {
                    _element = val;
                }
            });

            /** 
             * 심볼 예약어 목록 
             * @protected
             * @member {Array}  _W.Collection.BaseCollection#_symbol  
             */
             Object.defineProperty(this, '_symbol', {
                enumerable: false,
                configurable: true,
                get: function() { 
                    return _symbol;
                },
                set: function(p_val) {
                    _symbol = p_val;
                }
            });

            /** 
             * 요소타입
             * @member {Observer}  _W.Collection.BaseCollection#elementType  
             */
            Object.defineProperty(this, 'elementType', {
                enumerable: false,
                configurable: true,
                get: function() {
                    return __elementType;
                },
                set: function(newValue) {
                    if(typeof newValue !== 'function') throw new Error('Only [elementType] type "function" can be added');
                    if(typeof newValue === 'function' && typeof ['number', 'string', 'boolean'].indexOf(newValue.name) > -1) {
                        throw new Error('Only [elementType] type Not "number, string, boolean" can be added');
                    }
                    __elementType = newValue;
                }
            });

            /**
             * 컬렉션 목록 
             * @member {Array}  _W.Collection.BaseCollection#list  
             */
            Object.defineProperty(this, 'list', {
                enumerable: false,
                configurable: true,
                get: function() {
                    return this._element;
                }
            });

            /**
             * 컬랙션 갯수 
             * @member {Number} _W.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', {
                enumerable: false,
                configurable: true,
                get: function() {
                    return this._element.length;
                }
            });

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _W.Collection.BaseCollection#onAdd 
             */
            Object.defineProperty(this, 'onAdd', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'add');
                }
            });

            /** 
             * 제거 이벤트
             * @event _W.Collection.BaseCollection#onRemove
             */
            Object.defineProperty(this, 'onRemove', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'remove');
                }
            });

            /** 
             * 전체 제거 이벤트
             * @event _W.Collection.BaseCollection#onClear
             */
            Object.defineProperty(this, 'onClear', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'clear');
                }
            });

            /** 
             * 변경(등록/삭제) 전 이벤트  
             * @event _W.Collection.BaseCollection#onChanging 
             */
            Object.defineProperty(this, 'onChanging', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'changing');
                }
            });

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _W.Collection.BaseCollection#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'changed');
                }
            });

            // 예약어 등록
            this._symbol = this._symbol.concat(['__event', '_onwer', '_element', '_symbol', 'elementType', 'list', 'count']);
            this._symbol = this._symbol.concat(['onAddr', 'onRemove', 'onClear', 'onChanging', 'onChanged']);
            this._symbol = this._symbol.concat(['_getPropDescriptor', '_onAdd', '_onRemove', '_onClear', '_onChanging', '_onChanged']);
            this._symbol = this._symbol.concat(['_remove', 'add', 'clear', 'remove', 'removeAt', 'indexOf']);

            /** implements ICollection 인터페이스 구현 */
             this._implements(ICollection);
        }
    
        /**
         * 프로퍼티 기술자 설정
         * @protected
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) {
                    
                    var typeName;

                    if (this.elementType !== null && !(newValue instanceof this.elementType)) {
                        // typeName = this.elementType.constructor.name; // REVIEW::
                        typeName = this.elementType.name || this.elementType.constructor.name;
                        throw new Error('Only [' + typeName + '] type instances can be added');
                    }
                    this._element[p_idx] = newValue; 
                },
                enumerable: true,
                configurable: true
            };
        };

        /**
         * 추가 이벤트 수신자
         * @listens _W.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish('add', p_idx, p_value); 
        };

        /**
         * 삭제 이벤트 수신자
         * @listens _W.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx) {
            this.__event.publish('remove', p_idx); 
        };

        /** 
         *  전체삭제 수신자 이벤트
         * @listens _W.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish('clear'); 
        };

        /** 
         *  변경(등록/삭제) 전 수신자 이벤트
         * @listens _W.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function() {
            this.__event.publish('changing'); 
        };

        /** 
         *  변경(등록/삭제) 후 수신자 이벤트
         * @listens _W.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function() {
            this.__event.publish('changed'); 
        };

        /** 
         * 컬렉션을 삭제한다.
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            throw new Error('[ _remove() ] Abstract method definition, fail...');
        };

        /** 
         * 컬렉션을 추가한다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            throw new Error('[ add() ] Abstract method definition, fail...');
        };
        
        /**
         * 전체삭제(초기화)한다.
         * @abstract 
         * @fires _W.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };

        /**
         * 컬렉션을 삭제한다.
         * @param {Object} p_elem 속성명
         * @returns {Number} 삭제한 인덱스
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
         * 배열속성 삭제한다.
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype.removeAt = function(p_idx) {

            var obj = this._element[p_idx];
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (typeof obj !== 'undefined') this._remove(p_idx);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };

        /**
         * 배열속성 여부를 리턴한다. 
         * @param {Object} p_elem 속성 객체
         * @returns {Boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._element.indexOf(p_elem) > -1;
        };

        /**
         * 배열속성 인덱스 찾는다.
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = BaseCollection;
    } else {
        global._W.Collection.BaseCollection = BaseCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));