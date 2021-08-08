/**
 * namespace _W.Meta.Entity.EntityView
 * namespace _W.Meta.Entity.EntityViewCollection
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
    var Entity;
    var ItemViewCollection;
    var PropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('util');
        MetaObject          = require('./meta-object');
        Entity              = require('./entity-base');
        ItemViewCollection   = require('./entity-item').ItemViewCollection;
        PropertyCollection  = require('./collection-property');
    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        Entity              = global._W.Meta.Entity.Entity;
        ItemViewCollection   = global._W.Meta.Entity.ItemViewCollection;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof Entity === 'undefined') throw new Error('[Entity] module load fail...');
    if (typeof ItemViewCollection === 'undefined') throw new Error('[ItemViewCollection] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var EntityView  = (function (_super) {
        /**
         * 뷰 엔티티
         * @constructs _W.Meta.Entity.EntityView
         * @extends _W.Meta.Entity.Entity
         * @param {*} p_name 
         * @param {*} p_baseEntity 
         */
        function EntityView(p_name, p_baseEntity) {
            _super.call(this, p_name);

            var refCollection;

            if (p_baseEntity && p_baseEntity instanceof MetaObject && p_baseEntity.instanceOf('Entity')) {
                refCollection = p_baseEntity.items;
            }
            
            this._refEntity = p_baseEntity;
            
            this._refEntities = [];

            this.items = new ItemViewCollection(this, refCollection);
        }
        util.inherits(EntityView, _super);

        /**
         * 뷰 엔티티에 참조를 등록한다.
         * @param {Entity} p_entity 
         */
        EntityView.prototype._regRefer  = function(p_entity) {
            if (!(p_entity instanceof Entity)) throw new Error('Only [p_entity] type "Entity" can be added');
            if (this._refEntities.indexOf(p_entity) < 0) this._refEntities.push(p_entity);
        };
        
        /** @override **/
        EntityView.prototype.getTypes  = function() {
            
            var type = ['EntityView'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** @override */
        EntityView.prototype.getObject = function() {
            // TODO::
        };

        /**
         * 뷰 엔티티를 복제한다.
         * @returns {*}
         */
        EntityView.prototype.clone  = function() {
            
            var clone = new EntityView(this.name);  // 뷰를 복제하면 참조타입 >> 엔티티타입으로 변경

            // 참조 복제 REVIEW::  필요성 검토 필요
            // for(var i = 0; i < this._refEntities.length; i++) {
            //     clone._refEntities.push(this._refEntities[i]);
            // }
           
            for(var i = 0; i < this.items.count; i++) {
                clone.items.add(this.items[i].clone());
            }

            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone());
            }
            
            return clone;
        };        
        
        return EntityView;
    
    }(Entity));
    
    //---------------------------------------
    var EntityViewCollection  = (function (_super) {
        /**
         * 뷰 엔티티 컬렉션
         * @constructs _W.Meta.Entity.EntityViewCollection
         * @extends _W.Meta.Entity.PropertyCollection
         * @param {*} p_onwer 소유자 
         */
        function EntityViewCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = EntityView;   // 컬렉션타입 설정
        }
        util.inherits(EntityViewCollection, _super);

        /**
         * 뷰 컬렉션에 뷰 엔티티를 추가한다.
         * @param {string | EntityView} p_object 
         * @param {?ItemCollection} p_baseEntity
         * @returns {EntityView} 등록한 아이템
         * @example
         *  - string                    : 생성후   string      이름으로 등록 
         *  - string, colltion          : 생성후   string      이름으로  등록 (collection보냄)
         *  - entityView                :         entityView  이름으로 등록
         *  - entityView, collection    :         entityView  이름으로 등록 (collection보냄) => 오류발생
         */
        EntityViewCollection.prototype.add  = function(p_object, p_baseEntity) {

            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new EntityView(i_name, p_baseEntity);
            } else if (p_object instanceof EntityView) {
                if (p_baseEntity) throw new Error(' EntityView객체와 refEntity객체를 동시에 입력할 수 없습니다. !!');
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error('string | EntityView object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');

            return _super.prototype.add.call(this, i_name, i_value);
        };

        return EntityViewCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.EntityView = EntityView;
        module.exports.EntityViewCollection = EntityViewCollection;
    } else {
        global._W.Meta.Entity.EntityView = EntityView;
        global._W.Meta.Entity.EntityViewCollection = EntityViewCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));