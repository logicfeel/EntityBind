/**
 * @namespace _W.Meta.Entity.EntityView
 * @namespace _W.Meta.Entity.EntityViewCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Entity   = global._W.Meta.Entity || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var Entity;
    var ItemRefCollection;
    var PropertyCollection;
    var RowCollection;
    var IGroupControl;
    var IAllControl;


    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        ItemRefCollection   = require("./entity-item").ItemRefCollection;
        PropertyCollection  = require("./collection-property");
        RowCollection       = require("./entity-row").RowCollection;
        IGroupControl       = require("./i-control-group");
        IAllControl         = require("./i-control-all");

    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        ItemRefCollection   = global._W.Meta.Entity.ItemRefCollection;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        RowCollection       = global._W.Meta.Entity.RowCollection;
        IGroupControl       = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof ItemRefCollection === "undefined") throw new Error("[ItemRefCollection] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof RowCollection === "undefined") throw new Error("[RowCollection] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof IAllControl === "undefined") throw new Error("[IAllControl] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var EntityView  = (function (_super) {
        /**
         * @abstract @class
         */
        function EntityView(p_name, p_refEntity) {
            _super.call(this, p_name);

            var refCollection;

            if (p_refEntity && p_refEntity.instanceOf("Entity")) {
                refCollection = p_refEntity.items;
            }
            
            this._refEntity = p_refEntity;
            
            this._refEntities = [];

            this.items = new ItemRefCollection(this, refCollection);
        }
        util.inherits(EntityView, _super);

        EntityView.prototype._regRefer  = function(p_entity) {
            if (this._refEntities.indexOf(p_entity) < 0) this._refEntities.push(p_entity);
        };
        
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        EntityView.prototype.getTypes  = function() {
            
            var type = ["EntityView"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** @override */
        EntityView.prototype.getObject = function() {
            // TODO::
        };

        EntityView.prototype.clone  = function() {
            
            var clone = new EntityView(this.name);  // 뷰를 복제하면 참조타입 >> 엔티티타입으로 변경

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
         * @class
         * @param {*} p_onwer 소유자 
         */
        function EntityViewCollection(p_onwer) {
            _super.call(this, p_onwer);

            this._elementType = EntityView;   // 컬렉션타입 설정
        }
        util.inherits(EntityViewCollection, _super);

        /**
         *  - string                    : 생성후   string      이름으로 등록 
         *  - string, colltion          : 생성후   string      이름으로  등록 (collection보냄)
         *  - entityView                :         entityView  이름으로 등록
         *  - entityView, collection    :         entityView  이름으로 등록 (collection보냄) => 오류발생
         * 
         * @param {String | EntityView} p_object 
         * @param {I?temCollection} p_refEntity
         * @returns {EntityView} 등록한 아이템
         */
        EntityViewCollection.prototype.add  = function(p_object, p_refEntity) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new EntityView(i_name, p_refEntity);
            } else if (p_object instanceof EntityView) {
                if (p_refEntity) throw new Error(" EntityView객체와 refEntity객체를 동시에 입력할 수 없습니다. !!");
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | EntityView object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            return _super.prototype.add.call(this, i_name, i_value);
        };
        
        /**
         * EntityView 타입만 들어가게 제약조건 추가
         * @override
         */
        // EntityViewCollection.prototype._getPropDesciptor = function(p_idx) {
        //     return {
        //         get: function() { return this._element[p_idx]; },
        //         set: function(newValue) { 
        //             if (newValue instanceof EntityView) {
        //                 this._element[p_idx] = newValue;
        //             } else {
        //                 throw new Error("Only [EntityView] type instances can be added");
        //             }
        //         },
        //         enumerable: true,
        //         configurable: true
        //     };
        // };


        // TODO::
        
        return EntityViewCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.EntityView = EntityView;
        module.exports.EntityViewCollection = EntityViewCollection;
    } else {
        global._W.Meta.Entity.EntityView = EntityView;
        global._W.Meta.Entity.EntityViewCollection = EntityViewCollection;
    }

}(this));