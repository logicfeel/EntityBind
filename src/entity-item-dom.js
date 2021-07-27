/**
 * namespace _W.Meta.Entity.ItemDOM
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
    var Item;
    var jquery;
    var ajax;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                    = require('./utils');
        Item                    = require('./entity-item').Item;
    } else {
        util                    = global._W.Common.Util;
        Item                    = global._W.Meta.Entity.Item;
        jquery                  = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof Item === 'undefined') throw new Error('[Item] module load fail...');
    if (typeof jquery === 'undefined' && typeof module !== 'object') throw new Error('[jquery] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ItemDOM  = (function (_super) {
        /**
         * @constructs _W.Meta.Entity.ItemDOM
         * @extends _W.Meta.Entity.Item
         */
        function ItemDOM(p_name, p_entity, p_option) {
            _super.call(this, p_name, p_entity, p_option);

            var __domType       = null;
            var __isReadOnly    = false;
            var __isHide        = false;
            var __element       = null;
            var __filter        = null;
            var __selector      = null;

            Object.defineProperty(this, 'domType', 
            {
                get: function() { return __domType; },
                set: function(newValue) { 
                    // TODO:: 자료종류 {input: {type: 'text'...}} 만들어야함
                    if(typeof newValue !== 'object') throw new Error('Only [domType] type "object" can be added');
                    __domType = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            Object.defineProperty(this, 'isReadOnly', 
            {
                get: function() { return __isReadOnly; },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isReadOnly] type "boolean" can be added');
                    __isReadOnly = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            Object.defineProperty(this, 'isHide', 
            {
                get: function() { return __isHide; },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isHide] type "boolean" can be added');
                    __isHide = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            Object.defineProperty(this, 'element', 
            {
                get: function() { return __element; },
                set: function(newValue) { 
                    if(typeof newValue !== 'object') throw new Error('Only [element] type "object" can be added');
                    __element = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 셀렉터
             * type
             *  - val | value   : 요소의 value 속성값
             *  - text          : 요소의 텍스트값
             *  - html          : 요소의 html값
             *  - css.속성명    : css 의 속성값 (객체)
             *  - prop.속성명   : 요소의 속성명값 (초기상태기준)
             *  - attr.속성명   : 요소의 속성명값 (현재상태)
             *  - none         : 아무일도 하지 않음, 표현의 목적
             * @member _W.Meta.Entity.ItemDOM#selector
             */
            Object.defineProperty(this, 'selector', 
            {
                get: function() { return __selector; },
                set: function(newValue) { 
                    var selector = { key: '', type: 'value' };

                    if (typeof newValue === 'string') {
                        selector.key = newValue;
                    } else if (typeof newValue === 'object' && typeof newValue.key !== 'undefined') {
                        selector = newValue;
                    } else {
                        throw new Error('Only [selector] type "string | object.key" can be added');
                    }
                    __selector = selector;
                },
                configurable: true,
                enumerable: true
            });

            /** property {value} 오버라이딩 */
            Object.defineProperty(this, 'value', 
            {
                get: function() { 
                    var __val;
                    var key, type, option;

                    if (typeof this.getter === 'function' ) {
                        __val = this.getter.call(this);
                    } else if (__selector !== null && __filter === null) {

                        // node 에서는 강제 종료함
                        if (typeof module !== 'object') {

                            key = this.selector.key;
                            type = this.selector.type;
                            option = type.indexOf('.') > -1 ? type.substr(type.indexOf('.') + 1) : '';
                            
                            if (type !== 'none' &&  type !== ''){
                                if (type === 'value' || type === 'val') {
                                    __val = jQuery(key).val();
                                } else if (type === 'text') {
                                    __val = jQuery(key).text();
                                } else if (type === 'html') {
                                    __val = jQuery(key).html();
                                } else if (type.indexOf('prop') > -1) {
                                    __val = jQuery(key).prop(option);
                                } else if (type.indexOf('attr') > -1) {
                                    __val = jQuery(key).attr(option);
                                } else if (type.indexOf('css') > -1) {
                                    __val = jQuery(key).css(option);
                                } else {
                                    console.warn('['+ key +'] selector의 type는[value, val, text, prop, attr, css, none] 이어야합니다. ');
                                }
                                
                                // if (typeof __val === 'undefined' || __val === null) {
                                //     console.warn('['+ key +'] 일치하는 selector가 없습니다. ');
                                // }
                            }
                        }
                    }
                    
                    if (typeof __val === 'undefined' || __val === null) {
                        __val = this.__value || this.default;  // value 없으면 기본값 리턴
                    }

                    return __val; 
                },
                set:  function(val) { 
                    var __val, _val;
                    var key, type, option;

                    if (typeof this.setter === 'function' ) _val = this.setter.call(this, val);
                    
                    // settter 의 리턴이 여부
                    if (typeof _val !== 'undefined') __val = _val;
                    else __val = val; 

                    __val = __val === null ? '' : __val;  // null 등록 오류 처리
                    if(['number', 'string', 'boolean'].indexOf(typeof __val) < 0) {
                        throw new Error('Only [value] type "number, string, boolean" can be added');
                    }
                    this.__value = __val;   // 내부에 저장

                    if (__selector !== null) {

                        // node 에서는 강제 종료함
                        if (typeof module !== 'object') {

                            // 필터 적용
                            if (typeof __filter === 'function') __val = __filter.call(this, __val);

                            key = this.selector.key;
                            type = this.selector.type;
                            option = type.indexOf('.') > -1 ? type.substr(type.indexOf('.') + 1) : '';

                            if (type !== 'none' && type !== ''){
                                if (type === 'value' || type === 'val') {
                                    jQuery(key).val(__val);
                                } else if (type === 'text') {
                                    jQuery(key).text(__val);
                                } else if (type === 'html') {
                                    jQuery(key).html(__val);
                                } else if (type.indexOf('prop') > -1) {
                                    jQuery(key).prop(option, __val);
                                } else if (type.indexOf('attr') > -1) {
                                    jQuery(key).attr(option, __val);
                                } else if (type.indexOf('css') > -1) {
                                    jQuery(key).css(option, __val);
                                } else {
                                    console.warn('['+ key +'] selector의 type는[value, val, text, prop, attr, css, none] 이어야합니다. ');
                                }
                            }
                        }
                    }

                    // 이벤트 발생
                    this._onChanged();
                },
                configurable: true,
                enumerable: true
            });
            
            Object.defineProperty(this, 'filter', 
            {
                get: function() { return __filter; },
                set: function(val) { 
                    if(val !== null && typeof val !== 'function') throw new Error('Only [filter] type "function" can be added');
                    __filter = val;
                },
                configurable: true,
                enumerable: true
            });


            //---------------------------------------------------
            // 아이템 옵션속성 추가
            if (typeof p_option === 'object' ) {
                for(var prop in p_option) {
                    if (p_option.hasOwnProperty(prop) && 
                        ['domType', 'isReadOnly', 'isHide', 'element', 'selector'].indexOf(prop) > -1) {
                        this[prop] = p_option[prop];
                    }
                }
            }
            // 기본값 설정
            this.default = this.default || '';
        }
        util.inherits(ItemDOM, _super);
    
        /** @override **/
        ItemDOM.prototype.getTypes  = function() {
                    
            var type = ['ItemDOM'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override **/
        ItemDOM.prototype.clone  = function() {
                    
            var top = _super.prototype.clone.call(this);
            var clone = new ItemDOM(this.name);

            for(var prop in top) {
                if (top.hasOwnProperty(prop)) {
                    if (top[prop]) clone[prop] = top[prop];
                }
            }

            if (this.domType) clone['domType']          = this.domType;     // 참조값
            if (this.isReadOnly) clone['isReadOnly']    = this.isReadOnly;
            if (this.isHide) clone['isHide']            = this.isHide;
            if (this.element) clone['element']          = this.element;
            
            if (this.selector) clone['selector']        = this.selector;
            // if (this.selector) clone.__selector        = this.__selector.concat([]); // 배열 + 함수형
            
            return clone;
        };

// POINT:: 삭제대기
        // /**
        //  * 상위 Item.value 의 특성을 오버라이딩함
        //  * @param {Function} p_getter 
        //  * @param {Function} p_setter 
        //  */
        // ItemDOM.prototype.defineValueProperty  = function(p_getter, p_setter) {
        //     p_getter = p_getter || function() { return this.value };
        //     p_setter = p_setter || function(val) { this.value = val };

        //     // 유효성 검사
        //     if (typeof p_getter !== 'function') throw new Error('Only [p_getter] type 'function' can be added');
        //     if (typeof p_setter !== 'function') throw new Error('Only [p_setter] type 'function' can be added');

        //     Object.defineProperty(this, 'value', 
        //     {
        //         get: p_getter,
        //         set: p_setter,
        //         configurable: true,
        //         enumerable: true
        //     });
        // };

        /** @override */
        ItemDOM.prototype.getObject = function() {
            // TODO::
        };

        /**
         * TODO:
         */
        ItemDOM.prototype.toEntityColumn = function() {
            // TODO::
        };

        return ItemDOM;
    
    }(Item));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ItemDOM;
    } else {
        global._W.Meta.Entity.ItemDOM = ItemDOM;
        global.ItemDOM = ItemDOM;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));