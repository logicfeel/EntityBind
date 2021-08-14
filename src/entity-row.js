/**
 * namespace _W.Meta.Entity.Row
 * namespace _W.Meta.Entity.RowCollection
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
    var MetaObject;
    var PropertyCollection;
    var ArrayCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        MetaObject          = require('./meta-object');
        PropertyCollection  = require('./collection-property');
        ArrayCollection     = require('./collection-array');
    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ArrayCollection     = global._W.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof ArrayCollection === 'undefined') throw new Error('[ArrayCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var Row  = (function (_super) {
        /**
         * 로우
         * @constructs _W.Meta.Entity.Row
         * @extends _W.Collection.PropertyCollection
         */
        function Row(p_entity) {
            _super.call(this, p_entity);
            
            var __entity        = null;
            var itemName;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaObject && p_entity.instanceOf('Entity')) {
                __entity    = p_entity;

                for (var i = 0; i < __entity.items.count; i++) {
                    
                    // 별칭 가져오기로 수정함
                    // itemName = __entity.items[i].name;   
                    itemName = __entity.items[i].alias;
                    _super.prototype.add.call(this, itemName, null);
                }
            }

            /**
             * 로우의 소유 엔티티
             * @member {Entity} _W.Meta.Entity.Row#entity
             */
            Object.defineProperty(this, 'entity', 
            {
                get: function() { return __entity; },
                configurable: true,
                enumerable: true
            });            
        }
        util.inherits(Row, _super);

        /** @override **/
        Row.prototype.getTypes  = function() {
                    
            var type = ['Row'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 로우를 복사한다. (생성 후 복제)
         * @param {Object} p_filter 필터객체
         */
        Row.prototype.copy = function(p_filter) {
          
            var clone = new Row(this.entity);
            
            if (this.value) clone['value'] = this.value;
        };
        
        /**
         * 로우를 복제한다.
         * @returns {Row}
         */
        Row.prototype.clone  = function() {
          
            var clone = new Row(this.entity);
            var itemName;

            for (var i = 0; i < this.entity.items.count; i++) {
                itemName = this.entity.items[i].name;
                clone[itemName] = this[itemName];
            }

            return clone;
        };
        
        return Row;
    
    }(PropertyCollection));
    
    //---------------------------------------
    var RowCollection  = (function (_super) {
        /**
         * 로우 컬렉션
         * @constructs _W.Meta.Entity.RowCollection
         * @extends _W.Collection.ArrayCollection
         * @param {*} p_onwer 소유자 
         */
        function RowCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Row;   // 컬렉션타입 설정
        }
        util.inherits(RowCollection, _super);

        /**
         * 로우컬렉션에 로우를 추가한다.
         * @param {String | Item} p_row 
         * @returns {Row} 등록한 로우
         */
        RowCollection.prototype.add  = function(p_row) {

            var i_value;

            if (typeof p_row === 'undefined') {      
                i_value = new Row(this._onwer);
            } else if (p_row instanceof Row) {
                i_value = p_row;
            } else {
                throw new Error('Row | Row object [p_row].');
            }

            return _super.prototype.add.call(this, i_value);
        };

        return RowCollection;
        
    }(ArrayCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.Row = Row;
        module.exports.RowCollection = RowCollection;
    } else {
        global._W.Meta.Entity.Row = Row;
        global._W.Meta.Entity.RowCollection = RowCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));