/**
 * namespace _W.Meta.Entity.Item
 * namespace _W.Meta.Entity.ItemCollection
 * namespace _W.Meta.Entity.ItemViewCollection
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Entity   = global._W.Meta.Entity || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var CustomError;
    var MetaElement;
    var PropertyCollection;
    var Observer;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('util');
        CustomError         = require('./error-custom');
        MetaElement         = require('./meta-element');
        PropertyCollection  = require('./collection-property');
        Observer            = require('./observer');
    } else {
        util                = global._W.Common.Util;
        CustomError             = global._W.Common.CustomError;
        MetaElement         = global._W.Meta.MetaElement;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        Observer            = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof CustomError === 'undefined') throw new Error('[CustomError] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    var Item  = (function (_super) {
        /**
         * 아이템
         * @constructs _W.Meta.Entity.Item
         * @extends _W.Meta.MetaElement
         * @param {String} p_name 아이템명
         * @param {Entity} p_entity 소유 Entity
         */
        function Item(p_name, p_entity, p_property) {
            _super.call(this, p_name);

            var __entity        = null;
            var __type          = 'string';
            var __size          = 0;
            var __default       = null;
            var __caption       = '';
            var __isNotNull     = false;
            var __isNullPass    = false;
            var __callback      = null;
            var __constraints   = [];
            var __codeType      = null;
            var __order         = 100;
            var __increase      = 100;      // order 의 자동 추가수
            var __getter        = null;
            var __setter        = null;
            var __value         = null;
            var __alias         = null;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaElement && p_entity.instanceOf('Entity')) {
                __entity    = p_entity;
                __order     = __entity.items.count === 0 ? __order : __entity.items[__entity.items.count - 1].order + __increase;
            }

            /** @private */
            this.__event    = new Observer(this, this);

            /**
             * value 내부값 (필터 및 getter/setter 무시)
             * @private
             * @member {*} _W.Meta.Entity.Item#__value
             */
            Object.defineProperty(this, '__value', 
            {
                get: function() { return __value; },
                set: function(newValue) { 
                    // 직접 입력하면 안됨
                    // throw new Error('Only getter !! ');
                    __value = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 소유 엔티티
             * @member {Entity} _W.Meta.Entity.Item#entity
             */
            Object.defineProperty(this, 'entity', 
            {
                get: function() { return __entity; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if (newValue && !(newValue instanceof MetaElement && newValue.instanceOf('Entity'))) {
                        throw new Error('Only [entity] type "Entity" can be added');
                    }
                    __entity = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 타입 (내부속성)
             * @member {String} _W.Meta.Entity.Item#type
             */
            Object.defineProperty(this, 'type', 
            {
                get: function() { return __type; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if(typeof newValue !== 'string') throw new Error('Only [type] type "string" can be added');
                    __type = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 크기 (내부속성)
             * @member {Number} _W.Meta.Entity.Item#size
             */
            Object.defineProperty(this, 'size', 
            {
                get: function() { return __size; },
                set: function(newValue) { 
                    if(typeof newValue !== 'number') throw new Error('Only [size] type "number can be added');
                    __size = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 기본값 (내부속성)
             * @member {String | Number | Boolean} _W.Meta.Entity.Item#default
             */
            Object.defineProperty(this, 'default', 
            {
                get: function() { return __default; },
                set: function(newValue) { 
                    if(typeof newValue !== 'undefined' && newValue !== null &&  ['string', 'number', 'boolean'].indexOf(typeof newValue) < 0) throw new Error('Only [default] type "string | boolea | number" can be added');
                    __default = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 설명 (내부속성)
             * @member {String} _W.Meta.Entity.Item#caption
             */
            Object.defineProperty(this, 'caption', 
            {
                get: function() { return __caption; },
                set: function(newValue) { 
                    if(typeof newValue !== 'string') throw new Error('Only [caption] type "string" can be added');
                    __caption = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 value의 Null 여부
             * @member {Boolean} _W.Meta.Entity.Item#isNotNull
             */
            Object.defineProperty(this, 'isNotNull', 
            {
                // get: function() { 
                //     var isReturn;
                //     isReturn = __constraints.length > 0 ? true : __isNotNull;
                //     return isReturn; 
                // },
                get: function() { return __isNotNull },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isNotNull] type "boolean" can be added');
                    __isNotNull = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 value null 통과 여부 (기본값 = false)
             * @member {Boolean} _W.Meta.Entity.Item#isNullPass
             */
            Object.defineProperty(this, 'isNullPass', 
            {
                get: function() { return __isNullPass },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isNullPass] type "boolean" can be added');
                    __isNullPass = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 아이템 콜백 함수
             * REVIEW: 필요성 검토 필요
             * @member {String} _W.Meta.Entity.Item#callback
             */
            Object.defineProperty(this, 'callback', 
            {
                get: function() { return __callback; },
                set: function(newValue) { 
                    if(newValue !== null && typeof newValue !== 'function') throw new Error('Only [callback] type "function" can be added');
                    __callback = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 제약 조건 
             * @member {Array<Object>} _W.Meta.Entity.Item#constraints
             * @example
             * var c = {
             *  regex: /aa/,
             *  msg: '매칭메세지',  // return이 true면 성공시 메세지, false 실패시 메세지
             *  return: ture     // 매칭시 싱공실패 여부 
             * };
             */
            Object.defineProperty(this, 'constraints', 
            {
                get: function() { return __constraints; },
                set: function(newValue) { 
                    var list = [];
                    
                    // 배열로 일반화
                    if (Array.isArray(newValue))  list = newValue;
                    else list.push(newValue);

                    // 유효성 검사
                    for(var i = 0; list.length > i; i++) {
                        if (!(typeof list[i] === 'function' || (typeof list[i].regex === 'object' && typeof list[i].msg === 'string'))) {
                            throw new Error('Only [constraints] type "function OR {regex:object, msg:string, ?code:number}" can be added');
                         }
                    }
                    __constraints = list;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 코드 타입
             * @member {Object} _W.Meta.Entity.Item#codeType
             */
            Object.defineProperty(this, 'codeType', 
            {
                get: function() { return __codeType; },
                set: function(newValue) { __codeType = newValue; },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 순서
             * @member {String} _W.Meta.Entity.Item#order
             */
            Object.defineProperty(this, 'order', 
            {
                get: function() { return __order; },
                set: function(newValue) { 
                    if(typeof newValue !== 'number') throw new CustomError('Only [order] type "number" can be added', newValue);
                    __order = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 순서 증가 수
             * @member {Number} _W.Meta.Entity.Item#increase
             */
            Object.defineProperty(this, 'increase', 
            {
                get: function() { return __increase; },
                set: function(newValue) { 
                    if(typeof newValue !== 'number') throw new CustomError('Only [increase] type "number" can be added', newValue);
                    __increase = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 아이템 value
             * @member {*} _W.Meta.Entity.Item#value
             */
            Object.defineProperty(this, 'value', 
            {
                get: function() { 
                    var __val;
                    
                    // 우선순위 : 1
                    if (typeof __getter === 'function' ) {
                        
                        __val = __getter.call(this);
                        
                        // 검사 및 이벤트 발생
                        if (this.__value !== null && this.__value !== __val) {
                            this._onChanged(__val, this.__value);
                            this.__value = __val;   // 내부에 저장
                        }
                    
                    // 우선순위 : 2
                    } else {
                        __val = this.__value;
                    }
                    
                    /**
                     * 분기 처리값 '__val' 없는경우 (null, undefined)
                     *  - this.__value 초기화 되지 않은 경우
                     *  - getter 리턴이 없는 경우
                     */
                    if (typeof __val === 'undefined' || __val === null) {
                        __val = this.__value || this.default;  
                    }

                    return __val; 
                },
                set:  function(val) { 
                    var __val, _val;
                    var _oldVal = this.__value;
                    if (typeof __setter === 'function' ) _val = __setter.call(this, val);
                    
                    // settter 의 리턴이 여부
                    if (typeof _val !== 'undefined') __val = _val;
                    else __val = val; 

                    __val = __val === null ? '' : __val;  // null 등록 오류 처리
                    if(['number', 'string', 'boolean'].indexOf(typeof __val) < 0) {
                        throw new Error('Only [value] type "number, string, boolean" can be added');
                    }
                    this.__value = __val;
                    // 검사 및 이벤트 발생
                    if (_oldVal !== __val && __val) this._onChanged(__val, _oldVal);
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템의 value 의 getter
             * @member {Function} _W.Meta.Entity.Item#getter
             */
            Object.defineProperty(this, 'getter', 
            {
                get: function() { return __getter; },
                set: function(val) { 
                    if(val !== null && typeof val !== 'function') throw new Error('Only [getter] type "function" can be added');
                    __getter = val;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템의 value 의 setter
             * @member {Function} _W.Meta.Entity.Item#setter
             */
            Object.defineProperty(this, 'setter', 
            {
                get: function() { return __setter; },
                set: function(val) { 
                    if(val !== null && typeof val !== 'function') throw new Error('Only [setter] type "function" can be added');
                    __setter = val;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 별칭 (bind전송시, 데이터 수신후 설정시 활용함)
             * 사용처 
             * - Bind-command-ajax._execBind() : 데이터 전송시
             * - BaseBind.setValue(row) : 로우값 을 엔티티에 설정시
             * - getValue() : row 에 활용함
             * 기본값 = name 값
             * @member {String} _W.Meta.Entity.Item#alias
             */
             Object.defineProperty(this, 'alias', 
             {
                 get: function() { return typeof __alias === 'string' ? __alias : this.name; },
                 set: function(newValue) { 
                    if(typeof newValue !== 'string') throw new Error('Only [alias] type "string" can be added');
                     __alias = newValue; 
                 },
                 configurable: true,
                 enumerable: true
             });

            /**
             * 변경 이벤트 
             * @event _W.Meta.Entity.Item#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'onChanged');
                }
            });
            

            //---------------------------------------------------
            // 아이템 옵션속성 추가
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    [   'entity', 'type', 'size', 'default', 'caption', 
                        'isNotNull', 'isNullPass', 'callback', 'constraints', 
                        'codeType', 'order', 'increase', 'value', 'getter', 'setter', 'alias', 'onChanged' 
                    ].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            } else if (['number', 'string', 'boolean'].indexOf(typeof p_property) > -1) {
                this['value'] = p_property;
            }

        }
        util.inherits(Item, _super);

        /**
         * @listens _W.Meta.Entity.Item#_onChanged
         */
         Item.prototype._onChanged = function(p_nValue, p_oValue) {
            p_oValue = p_oValue || this.__value;
            this.__event.publish('onChanged', p_nValue, p_oValue);
        };

        /** @override **/
        Item.prototype.getTypes  = function() {
                    
            var type = ['Item'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** 
         * 아이템을 복제한다. 
         * @returns {Item}
         */
        Item.prototype.clone = function() {
            
            var clone = new Item(this.name);
            var constraints = [];

            if (this.entity) clone['entity']            = this.entity;  // 참조값
            if (this.alias) clone['alias']              = this.alias;
            if (this.type) clone['type']                = this.type;
            if (this.size) clone['size']                = this.size;
            if (this.default) clone['default']          = this.default;
            if (this.caption) clone['caption']          = this.caption;
            if (this.isNotNull) clone['isNotNull']      = this.isNotNull;
            if (this.isNullPass) clone['isNullPass']     = this.isNullPass;
            if (this.callback) clone['callback']        = this.callback;
            for (var i = 0; this.constraints.length > i; i++) {
                constraints.push(this.constraints[i]);
            }
            if (this.constraints) clone['constraints']  = constraints;
            if (this.codeType) clone['codeType']        = this.codeType;  // 참조값
            if (this.order) clone['order']              = this.order;
            if (this.increase) clone['increase']        = this.increase;
            // if (this.value) clone['value']              = this.value;    // 생성시 계산해서 개선한
            if (this.__value) clone['__value']          = this.__value;
            if (this.getter) clone['getter']            = this.getter;
            if (this.setter) clone['setter']            = this.setter;
            
            // 이벤트 복사 (REVIEW:: 개선필요!!)
            if (this.__event.subscribers.onChanged) {
                for (var i = 0; this.__event.subscribers.onChanged.length > i; i++) {
                    clone['onChanged'] = this.__event.subscribers.onChanged[i];
                }
            }
            
            return clone;
        };

        /** @override */
        Item.prototype.getObject = function() {
            // TODO::
        };

        /**
         * 제약조건을 추가한다.
         * REVIEW: addConstraint vs setConstraint 와 적합성 검토
         * @param {*} p_regex 
         * @param {*} p_msg 
         * @param {*} p_code 
         * @param {*} p_return 
         */
        Item.prototype.setConstraint = function(p_regex, p_msg, p_code, p_return) {
            p_return = p_return || false;

            var constraint = {};

            if (!(p_regex instanceof RegExp)) throw new Error('Only [p_regex] type "RegExp" can be added');
            if (!(typeof p_msg === 'string')) throw new Error('Only [p_msg] type "string" can be added');

            constraint.regex = p_regex;
            constraint.msg = p_msg;
            constraint.code = p_code;
            constraint.return = p_return;
            
            this.constraints.push(constraint);
        };

// POINT:: 삭제 대기
        /**
         * method
         */
        // Item.prototype.defineValueProperty = function(p_getter, p_setter) {

        //     // 타입검사 
        //     if(typeof p_getter !== 'undefined' && typeof p_getter !== 'function') {
        //         throw new Error('Only [p_getter] type 'function' can be added');
        //     }
        //     if(typeof p_setter !== 'undefined' && typeof p_setter !== 'function') {
        //         throw new Error('Only [p_getter] type 'function' can be added');
        //     }

        //     // 기본값 설정
        //     p_getter = p_getter || function() { return this.__value; };
        //     p_setter = p_setter || function(val) { this.__value = val; };

        //     /** @event */s
        //     Object.defineProperty(this, 'value', {
        //         enumerable: true,
        //         configurable: true,
        //         get: p_getter,
        //         set: p_setter
        //     });
        // };
        
        /**
         * 아이템의 value에 유효성을 검사한다. (isNotnull, isNullPass, constraints 기준)
         * @param {string} p_value 
         * @param {object} r_result 메세지는 참조(객체)형 으로 전달
         * @param {number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
         */
        // Item.prototype.valid = function(p_value, r_result, p_option) {
        Item.prototype.valid = function(p_value, r_result) {
            // p_option = p_option || 1;   
            r_result.value = p_value;
            r_result.msg = '';
            r_result.code = '';
            p_value = p_value || '';
            
            var result;
            var value = null;

            // if (!(typeof p_value === 'string')) throw new Error('Only [p_value] type 'string' can be added');
            p_value = typeof p_value === 'number' ? String(p_value) : p_value;  // number 형 변환

            // 1. 기본값 얻기
            value = p_value === null || typeof p_value === 'undefined' ? this.default : p_value;
            value = value.trim();

            // 2-1. 통과조건 검사
            if (false
                || (this.isNotNull === false && this.constraints.length === 0 ) 
                || (this.isNotNull === false && this.isNullPass === true && value.length === 0)
                || (this.isNotNull === true && this.constraints.length === 0 && value.length > 0)
            ){
                return true;
            }
            // 2-2. 실패조건 검사
            if (this.isNotNull === true && this.constraints.length === 0 && value.length === 0) {
                r_result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
                r_result.code  = 0;
                return false;
            }

            // 2-3. 제약조건 검사
            for(var i = 0; this.constraints.length > i; i++) {

                if (typeof this.constraints[i] === 'function') {
                    return this.constraints[i].call(this, this, p_value, r_result);     // 함수형 제약조건
                } else {
                    result = p_value.match(this.constraints[i].regex);
    
                    if ((this.constraints[i].return === false && result !== null) ||    // 실패 조건
                        (this.constraints[i].return === true && result === null)) {     // 성공 조건
       
                        r_result.msg   = this.constraints[i].msg;
                        r_result.code  = this.constraints[i].code;
                        return false;
                    }
                }
            }            
            // // 3. 결과(Null) 검사
            // if ((p_option === 1 && this.isNotNull === true && p_value.trim().length <= 0) || 
            //     (p_option === 2 && p_value.trim().length <= 0)) {
                
            //     r_result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
            //     r_result.code  = 0;
            //     return false;
            // }
            return true;
        };

        return Item;
    
    }(MetaElement));

    //---------------------------------------
    var ItemCollection  = (function (_super) {
        /**
         * 아이템 컬렉션 (최상위)
         * @constructs _W.Meta.Entity.ItemCollection
         * @extends _W.Collection.PropertyCollection
         * @abstract
         * @param {*} p_onwer 소유자 
         */
        function ItemCollection(p_onwer) {
            _super.call(this, p_onwer);
            
            this.elementType = Item;    // 기본 컬렉션 타입
            
            /**
             * 아이템의 타입
             * @member {Function} _W.Meta.Entity.ItemCollection#itemType
             */
            Object.defineProperty(this, 'itemType', 
            {
                get: function() { return this.elementType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error('Only [Item] type "Item" can be added');
                    this.elementType = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            
        }
        util.inherits(ItemCollection, _super);
        
        /**
         * 컬렉션에 아이템 유무를 검사한다.
         * @param {*} p_elem 
         * @returns {*} 
         */
        ItemCollection.prototype.contains = function(p_elem) {

            if (p_elem instanceof Item) {
                return this.indexOfName(p_elem.name) > -1;
            } else {
                return _super.prototype.contains.call(this, p_elem);
            }
        };

        /**
         *  이름과 값으로 아이템 생성하여 컬렉션에 추가한다.
         * @param {*} p_name 아이템명
         * @param {String | Number | Boolean} p_value 
         * @returns {Item}
         */
        ItemCollection.prototype.addValue  = function(p_name, p_value) {

            var item;
            var property = {};

            if (typeof p_name !== 'string') throw new Error('There is no required value [p_name].');
            if(['number', 'string', 'boolean'].indexOf(typeof p_value) < 0) {
                throw new Error('Only [value] type "number, string, boolean" can be added');
            }
            
            property = { value: p_value };

            item = new this.itemType(p_name, this._onwer, property);

            return this.add(item);
        };

        /**
         *  이름과 값으로 아이템 생성하여 컬렉션에 추가한다.
         * @param {*} p_name 아이템명
         * @param {String | Number | Boolean} p_value 
         * @returns {Item}
         */
         ItemCollection.prototype.initValue  = function() {

            for (var i = 0; this.count > i; i++) {
                this[i].value = this[i].default;
            }
        };

        return ItemCollection;
    
    }(PropertyCollection));


    //---------------------------------------
    var ItemTableCollection  = (function (_super) {
        /**
         * 테이블 아이템 컬렉션
         * @constructs _W.Meta.Entity.ItemTableCollection
         * @extends _W.Meta.Entity.ItemCollection
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemTableCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(ItemTableCollection, _super);

        /**
         * 테이블컬렉션에 아이템을 추가한다.
         * @param {string | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        ItemTableCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new this.itemType(i_name, this._onwer);
            } else if (p_object instanceof this.itemType) {
                // EntityTable은 직접만 적용(참조형 아이템 소유 못함)
                i_name  = p_object.name;
                i_value = p_object.clone();
                i_value.entity = this._onwer;
            } else {
                throw new Error('string | Item object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');

            return _super.prototype.add.call(this, i_name, i_value);
        };

        return ItemTableCollection;
    
    }(ItemCollection));


    //---------------------------------------
    var ItemViewCollection  = (function (_super) {
        /**
         * @constructs _W.Meta.Entity.ItemViewCollection
         * @extends _W.Meta.Entity.ItemCollection
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemViewCollection(p_onwer, p_baseCollection) {
            _super.call(this, p_onwer);

            if (p_baseCollection && !(p_baseCollection instanceof ItemCollection)) {
                throw new Error('Error!! ItemCollection object [p_baseCollection].');
            }
            
            /** @protected */
            this._baseCollection = p_baseCollection;
        }
        util.inherits(ItemViewCollection, _super);

        /**
         * 뷰컬렉션에 아이템을 추가(등록/설정)한다.
         * @param {String | Item} p_object 
         * @param {?ItemCollection} p_baseCollection
         * @example
         *  - base(all),    string | Itme, Collection   => Collection 에 생성후 자신에 등록 
         *  - base(N),      string | Itme               => this 에 생성후 자신에 등록
         *  - base(Y),      string | Item               => Base 에 생성후 자신에 등록
         * 
         *   // string                       => 생성 및 자신에 등록
         *   // string <base>                => 생성 및 소유처에 등록
         *   // Item                         => 생성 및 자신에 등록
         *   // Item <base>                  => 생성 및 소유처에 등록
         *   // string, collection           => 참조만 등록
         *   // string, collection <base>    => 참조만 등록
         * 
         *  TODO:: filter 옵션 : 충돌방지에 이용
         *  TODO:: 객체 비교는 string 이 아니고 값과 타입을 비교해야함 (그래야 참조를 사용)
         */
        ItemViewCollection.prototype.add  = function(p_object, p_baseCollection) {
            
            var collection;
            var i_name;
            var i_value;

            if (p_object instanceof Item) {
                // 아이템 소유자 설정
                if (p_object.entity === null) p_object.entity = this._onwer;
                i_name = p_object.name;
                i_value = p_object;
            } else if (typeof p_object === 'string') {
                i_name = p_object;
                i_value = new this.itemType(i_name, this._onwer);
// POINT::
            // } else if (p_object instanceof MetaElement && p_object.instanceOf('Entity')) {
            //     // 아아템 가져오기
            //     for (var i = 0; p_object.items.count > i; i++) {
            //         this.add(p_object.items[i]);
            //     }
            } else {
                throw new Error('p_object string | Item instance param request fail...');
            }

            // TODO:: 이름 충돌검사

            if (p_baseCollection instanceof ItemCollection) {            // 전달값으로 기본컬렉션 지정시
                collection = p_baseCollection;
            } else if (this._baseCollection instanceof ItemCollection) { // 기본컬렉션 존재시
                collection = this._baseCollection;
            }
            
            // 기본참조 컬렉션 또는 전달참조 컬렉션인 경우
            if (collection) {
                if (collection.contains(collection[i_name])) {
                    i_value = collection[i_name];                      // 참조 가져옴
                } else {
                    i_value = collection.add(p_object);                // 컬렉션에 등록
                }
                
                // REVIEW:: 의존성을 낮추기 위해서 검사후 등록
                // 소유객체에 참조 등록 (중복제거됨)
                if (this._onwer._regRefer) {
                    this._onwer._regRefer(collection._onwer);
                }
            }
            
            return _super.prototype.add.call(this, i_name, i_value);
        };

        /**
         * 엔티티 추가한다.
         * REVIEW:: 제거 대상 add() 로 합쳐짐
         * @param {Entity} p_entity 
         */
        ItemViewCollection.prototype.addEntity  = function(p_entity) {
            if (typeof p_entity === 'undefined' && !(p_entity instanceof MetaElement && p_entity.instanceOf('Entity'))) {
                throw new Error('Only [p_entity] type "Entity" can be added');
            }

            for (var i = 0; p_entity.items.count > i; i++) {
                this.add(p_entity.items[i]);
            }
        };
        
        return ItemViewCollection;
    
    }(ItemCollection));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.Item                         = Item;
        module.exports.ItemCollection               = ItemCollection;
        module.exports.ItemViewCollection           = ItemViewCollection;
        module.exports.ItemTableCollection          = ItemTableCollection;

    } else {
        global._W.Meta.Entity.Item                  = Item;
        global._W.Meta.Entity.ItemCollection        = ItemCollection;
        global._W.Meta.Entity.ItemViewCollection    = ItemViewCollection;
        global._W.Meta.Entity.ItemTableCollection   = ItemTableCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));