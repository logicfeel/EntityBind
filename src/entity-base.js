/**
 * namespace _W.Meta.Entity.Entity
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
    var MetaElement;
    var IPropertyCollection;
    var IGroupControl;
    var IAllControl;
    var RowCollection;
    var Row;
    var ItemCollection;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                    = require('./utils');
        MetaElement             = require('./meta-element');
        IGroupControl           = require('./i-control-group');
        IAllControl             = require('./i-control-all');
        RowCollection           = require('./entity-row').RowCollection;
        Row                     = require('./entity-row').Row;
        ItemCollection          = require('./entity-item').ItemCollection;
    } else {
        util                    = global._W.Common.Util;
        MetaElement             = global._W.Meta.MetaElement;
        IGroupControl           = global._W.Interface.IGroupControl;
        IAllControl             = global._W.Interface.IAllControl;
        RowCollection           = global._W.Meta.Entity.RowCollection;
        Row                     = global._W.Meta.Entity.Row;
        ItemCollection          = global._W.Meta.Entity.ItemCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof IGroupControl === 'undefined') throw new Error('[IGroupControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');
    if (typeof RowCollection === 'undefined') throw new Error('[RowCollection] module load fail...');
    if (typeof Row === 'undefined') throw new Error('[Row] module load fail...');
    if (typeof ItemCollection === 'undefined') throw new Error('[ItemCollection] module load fail...');


    //==============================================================
    // 4. 모듈 구현    
    var Entity  = (function (_super) {
        /**
         * 엔티티
         * @constructs _W.Meta.Entity.Entity
         * @extends _W.Meta.MetaElement
         * @implements {_W.Interface.IGroupControl}
         * @implements {_W.Interface.IAllControl}
         * @param {*} p_name 
         */
        function Entity(p_name) {
            _super.call(this, p_name);

            var __items = null;     // 상속해서 생성해야함
            var __rows  = new RowCollection(this);

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {ItemCollection} _W.Meta.Entity.Entity#items
             */
            Object.defineProperty(this, 'items', 
            {
                get: function() { return __items; },
                set: function(newValue) { 
                    if (!(newValue instanceof ItemCollection)) throw new Error('Only [items] type "ItemCollection" can be added');
                    __items = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 엔티티의 데이터(로우) 컬렉션
             * @member {RowCollection} _W.Meta.Entity.Entity#rows
             */
            Object.defineProperty(this, 'rows', 
            {
                get: function() { return __rows; },
                set: function(newValue) { 
                    if (!(newValue instanceof RowCollection)) throw new Error('Only [rows] type "RowCollection" can be added');
                    __rows = newValue;
                },
                configurable: true,
                enumerable: true
            });

            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(Entity, _super);

        /**
         * 아이템 추가한다. (내부)
         * @Private
         * @param {*} p_name 
         * @param {*} p_property 
         */
        Entity.prototype.__addItem  = function(p_name, p_property) {
            
            if(!this.items.contains(this.items[p_name])) this.items.add(p_name);
            
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    this.items[p_name][prop] = p_property[prop];
                }
            }
        };

        /**
         * 빈 row 채운다.
         * @param {*} p_target 
         */
        Entity.prototype.__fillRow  = function(p_target) {
            
            var itemName;
            
            for (var i = 0 ; i < this.rows.count; i++) {
                for (var ii = 0; ii < p_target.items.count; ii++) {
                    itemName = p_target.items[ii].name;
                    if (typeof this.rows[i][itemName] === 'undefined') {
                        this.rows[i].add(itemName, '');
                    }
                }
            }            
        };

        /**
         * 객체(JSON)를 불러온다.
         * @private 
         * @param {*} p_object 로딩할 객체
         * @param {*} p_option 로딩옵션
         */
        Entity.prototype.__loadJSON  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기
            
            var entity;
            var row;
            var itemName;

            if (typeof p_object === 'undefined') throw new Error('Only [p_object] type "object" can be added');
            
            entity = p_object['entity']  || p_object['table'] || undefined;
            
            if (typeof entity === 'undefined') throw new Error('Only [p_object] type "entity | table" can be added');
            

            // 1.itmes, rows 배열로 구조 변경
            if (!Array.isArray(entity.items)) entity.items = [entity.items];
            if (!Array.isArray(entity.rows)) entity.rows = [entity.rows];

            // 2.병합
            if (p_option === 1) {
                // Item 기준으로 아이템 가져오기
                if (entity.items && entity.items[0]) {
                    for(var i = 0; entity.items.length > i; i++) {
                        // Item 가져오기
                        for (var prop in entity.items[i]) {
                            if (entity.items[i].hasOwnProperty(prop)) {
                                this.__addItem(prop, entity.items[i][prop]);
                            }
                        }
                    }
                }

                // Row 기준으로 아이템 가져오기 (첫번째 Row 기준)
                if (entity.rows && entity.rows[0]) {
                    for (var prop in entity.rows[0]) {
                        if (entity.rows[0].hasOwnProperty(prop)) {
                            this.__addItem(prop, '');
                        }
                    }
                }
            }
            
            // 3.Row 데이터 가져오기
            if (this.items.count > 0 && entity.rows && entity.rows[0]) {
                for(var i = 0; entity.rows.length > i; i++) {
                    
                    row = this.newRow();
                    for (var prop in entity.rows[i]) {
                        if (entity.rows[i].hasOwnProperty(prop) && typeof row[prop] !== 'undefined') {
                            row[prop] = entity.rows[i][prop];
                        }
                    }
                    if (row.count) this.rows.add(row);
                }
            } 
            
            // 4.빈 Row 채우기
            for (var i = 0 ; i < this.rows.count; i++) {
                for (var ii = 0; ii < this.items.count; ii++) {
                    itemName = this.items[ii].name;
                    if (typeof this.rows[i][itemName] === 'undefined') {
                        this.rows[i].add(itemName, '');
                    }
                }
            }   
        };

        /**
         * Entity를 불러(로드)온다.
         * @private
         * @param {*} p_object 대상 엔티티
         * @param {*} p_option 옵션
         */
        Entity.prototype.__loadEntity  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기

            var entity = p_object;
            var row;
            var itemName;

            // 1.병합
            if (p_option === 1) {
                // Item 기준으로 아이템 가져오기
                for(var i = 0; entity.items.count > i; i++) {
                    itemName = entity.items[i].name;
                    if (typeof this.items[itemName] === 'undefined') this.items.add(entity.items[i]);
                }
            }
            
            // 2.Row 데이터 가져오기
            for(var i = 0; entity.rows.count > i; i++) {
                
                row = this.newRow();

                for (var ii = 0; ii < this.items.count; ii++) {
                    itemName = this.items[ii].name;
                    
                    // row[itemName] = typeof entity.rows[i][itemName] !== 'undefined' ? entity.rows[i][itemName] : '';
                    // 이해하기 쉽게 코드 변경
                    if (typeof entity.rows[i][itemName] !== 'undefined') {
                        row[itemName] = entity.rows[i][itemName];    
                    } else {
                        row[itemName] = '';
                    }
                }
                this.rows.add(row);
            }

            // 4.빈 Row 채우기
            if (p_option === 1) this.__fillRow(entity);
        };

        /** @override **/
        Entity.prototype.getTypes = function() {
            
            var type = ['Entity'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override */
        Entity.prototype.getObject = function() {
            // TODO::
        };

        /**
         * 새로운 Row를 추가한다.
         */
        Entity.prototype.newRow  = function() {
            return new Row(this);
        };

        /**
         * Row의 값을 아이템의 value에 설정한다.
         * @param {*} p_row 
         */
        Entity.prototype.setValue  = function(p_row) {
            
            var _name = '';

            if (!(p_row instanceof Row)) throw new Error('Only [p_row] type "Row" can be added');

            for(var i = 0; this.items.count > i; i++) {
                
                // this.items[i].value = p_row[i];
                _name = this.items[i].alias;        // 별칭이 없을시 기본이름
                this.items[i].value = p_row[_name];
            }
        };

        /**
         * 아아템의 value을 Row형식으로 얻는다.
         * @returns {Row}
         */
        Entity.prototype.getValue  = function() {
            
            var row = this.newRow();
            
            for(var i = 0; this.items.count > i; i++) {
                 row[i] = this.items[i].value;
            }
            return row;
        };

        /** 
         * 엔티티를 조회(검색) 한다.
         * @param {Object} p_filter 필터객체
         * @param {?(Number | Array<Number>)} p_index 인덱스 시작번호 또는 목록
         * @param {?Number} p_end 인덱스 종료번호
         * @return {Entity}
         * @example
         * // 상속기법을 이용함
         * filter = {
         *  __except : ['name'...],        // 제외 아이템 (1방법)
         *  아이템명: { __except: true }    // 아이템 제외 (2방법)
         *  아이템명: { order: 100 }        // 속성 오버라이딩
         * }
         */
        Entity.prototype.select  = function(p_filter, p_index, p_end) {
            
            var EXECEPT = '__except';
            var list = [];
            var excepts = [];
            var obj, f;
            var filterItem;
            
            // REVIEW:: 이후에 복제로 변경 검토, 자신의 생성자로 생성
            var entity = new this.constructor(this.name);   
            var idx;

            /** @inner row 항목을 재구성하여 생성 (내부 함수) */
            function __createRow(rowIdx, orgEntity) {

                var row = entity.newRow();
                var i_name;

                for (var i = 0; entity.items.count > i ; i++) {
                    i_name = entity.items[i].name;
                    if (typeof row[i_name] !== 'undefined' && typeof orgEntity.rows[rowIdx][i_name] !== 'undefined') {
                        row[i_name] = orgEntity.rows[rowIdx][i_name];
                    }
                }
                return row;
            }

            // 1.제외 아이템 조회
            if (p_filter && p_filter[EXECEPT]) {
                if (Array.isArray(p_filter[EXECEPT])) excepts = p_filter[EXECEPT];
                else if (typeof p_filter[EXECEPT] === 'string') excepts.push(p_filter[EXECEPT]);
            } 
            for (var i = 0; this.items.count > i; i++) {
                if (excepts.indexOf(this.items[i].name) < 0)  {
                    
                    // 임시함수에 객체 생성방식
                    f = function() {};
                    f.prototype = this.items[i];
                    var obj = new f();
                    
                    // 필터 설정(등록)
                    if (p_filter && p_filter[this.items[i].name]) {
                        filterItem = p_filter[this.items[i].name];    
                        for(var prop in filterItem) {
                            obj[prop] = filterItem[prop];
                        }
                    }
                    if (obj[EXECEPT] !== true) list.push(obj);
                }
            }

            // 2.정렬
            list.sort(function(a, b) { return a.order - b.order; });

            // 3.리턴 Entity 의 Item 구성 : 참조형
            for(var i = 0; i < list.length; i++) {
                entity.items.add(list[i]);
            }
            
            // 4.리턴 Entity 의 Row 구성 : 참조형
            if (typeof p_index === 'number') {
                for(var i = p_index; i < this.rows.count; i++) {
                    // entity.rows.add(this.rows[idx]);
                    entity.rows.add(__createRow(i, this));
                    if (typeof p_end === 'number' && i === p_end) break;
                }
            } else if (Array.isArray(p_index)) {
                for(var i = 0; i < p_index.length; i++) {
                    idx = p_index[i];
                    if (typeof idx === 'number' && typeof this.rows[idx] !== 'undefined') {
                        // entity.rows.add(this.rows[idx]);
                        entity.rows.add(__createRow(idx, this));
                    }
                }
            }
            
            return entity;
        };

        /**
         * 엔티티를 복사한다. (조회 후 복제)
         * @param {*} p_filter 
         * @param {*} p_index 
         * @param {*} p_end 
         */
        Entity.prototype.copy  = function(p_filter, p_index, p_end) {
            
            var entity = this.select(p_filter, p_index, p_end);

            return entity.clone();
        };

        /**
         * 엔티티를 병합한다. (구조를 구성하는게 주용도임)
         * @param {*} p_target 병합할 Entity (대상)
         * @param {*} p_option {item: 1, row:2}
         * @desc
         * 병합 : 컬렉션 순서에 따라 병한다.
         * Item과 Row가 있는 경우
         * - 1 items, rows 병합 (기존유지) *기본값
         * - 2 items, rows 병합 (덮어쓰기)  
         * - 3 row 안가져오기    (기존유지)
         */
        Entity.prototype.merge  = function(p_target, p_option) {
            p_option = p_option || 1;    // 기본값

            var row;
            var itemName;

            // 1.유효성 검사
            if (!(p_target instanceof Entity)) throw new Error('Only [p_target] type "Entity" can be added');

            // 2.병합 : Item 기준으로 아이템 가져오기
            for(var i = 0; p_target.items.count > i; i++) {
                itemName = p_target.items[i].name;
                
                // 없으면 생성
                if (typeof this.items[itemName] === 'undefined') {
                    this.items.add(p_target.items[i]);
                }
                
                // option = 2: 기존 item 덮어쓰기
                if (p_option === 2 && typeof this.items[itemName] !== 'undefined') {
                    this.items[itemName] = p_target.items[itemName];
                }
            }
            
            // 3.Row 데이터 가져오기
            if (p_option !== 3) {
                for(var i = 0; p_target.rows.count > i; i++) {
                    // this.rows 있는 경우
                    if (typeof this.rows[i] !== 'undefined') {  
                        row = this.rows[i];
                        for (var ii = 0; ii < p_target.items.count; ii++) {
                            itemName = p_target.items[ii].name;
                            if (typeof this.rows[i][itemName] === 'undefined') {    // 이름이 없는 경우
                                row.add(itemName, p_target.rows[i][itemName]);
                            } else if (p_option === 2 && typeof this.rows[i][itemName] !== 'undefined') {   // 덮어쓰기
                                row[itemName] = p_target.rows[i][itemName];     
                            }
                        }
                    // this.rows 없는 경우
                    } else {                                    
                        row = this.newRow();
                        for (var ii = 0; ii < p_target.items.count; ii++) {
                            itemName = p_target.items[ii].name;
                            // 덮어쓰기
                            if (p_option === 2) row[itemName] = p_target.rows[i][itemName];
                        }
                        this.rows.add(row);
                    }
                }
            }

            // 4.공백 채우기
            this.__fillRow(p_target);
        };
        
        /**
         * '데이터를 가져오는게 주용도임'
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 기존에 row 가 존재하면 newRow 부터 가져오고, 기존item 은 공백이 들어감
         * @param {*} p_object Entity 는 item과 row 는 쌍으로 존재함, JSON 은 row만 존재할 수 있음
         * @param {Number} p_option 
         * @param {Number} p_option.1 row 기준으로 가져옴, 없을시 item 생성, item 중복시 기존유지  <*기본값> 
         * @param {Number} p_option.2 존재하는 item 데이터만 가져오기
         */
        Entity.prototype.load  = function(p_object, p_option) {
            
            if (p_object instanceof Entity) {
                this.__loadEntity(p_object, p_option);
            } else {
                this.__loadJSON(p_object, p_option);
            }
        };
        
        /** 
         * 아이템과 로우를 초기화 한다.
         */
        Entity.prototype.clear  = function() {
            
            this.items.clear();
            this.rows.clear();
        };

        /** @abstract */
        Entity.prototype.clone  = function() {
            throw new Error('[ clone() ] Abstract method definition, fail...');
        };

        return Entity;
    
    }(MetaElement));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = Entity;
    } else {
        global._W.Meta.Entity.Entity = Entity;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));