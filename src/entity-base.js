/**
 * @namespace _W.Meta.Entity.Entity
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
    var MetaElement;
    var IPropertyCollection;
    var IGroupControl;
    var IAllControl;
    var RowCollection;
    var Row;
    var ItemCollection;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필
        
        util                    = require("./utils");
        MetaElement             = require("./meta-element");
        IGroupControl           = require("./i-control-group");
        IAllControl             = require("./i-control-all");
        RowCollection           = require("./entity-row").RowCollection;
        Row                     = require("./entity-row").Row;
        ItemCollection          = require("./entity-item").ItemCollection;
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
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof IAllControl === "undefined") throw new Error("[IAllControl] module load fail...");
    if (typeof RowCollection === "undefined") throw new Error("[RowCollection] module load fail...");
    if (typeof Row === "undefined") throw new Error("[Row] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var Entity  = (function (_super) {
        /**
         * @abstract @class
         */
        function Entity(p_name) {
            _super.call(this, p_name);

            var __items = null;     // 상속해서 생성해야함
            var __rows  = new RowCollection(this);

            /** @property {first} */
            Object.defineProperty(this, "items", 
            {
                get: function() { return __items; },
                set: function(newValue) { 
                    if (!(newValue instanceof ItemCollection)) throw new Error("Only [items] type 'ItemCollection' can be added");
                    __items = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /** @property {first} */
            Object.defineProperty(this, "rows", 
            {
                get: function() { return __rows; },
                set: function(newValue) { 
                    if (!(newValue instanceof RowCollection)) throw new Error("Only [rows] type 'RowCollection' can be added");
                    __rows = newValue;
                },
                configurable: true,
                enumerable: true
            });

             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(Entity, _super);

        Entity.prototype.__addItem  = function(p_name, p_property) {
            
            if(!this.items.contains(p_name)) this.items.add(p_name);
            
            if (typeof p_property === "object" ) {
                for(var prop in p_property) {
                    this.items[p_name][prop] = p_property[prop];
                }
            }
        };


        Entity.prototype.__loadJSON  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기
            
            var entity;
            var row;

            if (typeof p_object === "undefined") throw new Error("Only [p_object] type 'object' can be added");
            
            entity = p_object["entity"]  || p_object["table"] || undefined;
            
            if (typeof entity === "undefined") throw new Error("Only [p_object] type 'entity | table' can be added");
            

            // itmes, rows 배열로 구조 변경
            if (!Array.isArray(entity.items)) entity.items = [entity.items];
            if (!Array.isArray(entity.rows)) entity.rows = [entity.rows];

            // 병합
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
                            this.__addItem(prop, "");
                        }
                    }
                }
            }
            
            // Row 데이터 가져오기
            if (entity.rows && entity.rows[0]) {
                for(var i = 0; entity.rows.length > i; i++) {
                    
                    row = this.newRow();
                    for (var prop in entity.rows[i]) {
                        if (entity.rows[i].hasOwnProperty(prop) && typeof row[prop] !== "undefined") {
                            row[prop] = entity.rows[i][prop];
                        }
                    }
                    this.rows.add(row);
                }
            }        
        };

        Entity.prototype.__loadEntity  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기

            var entity = p_object;
            var row;
            var itemName;
            var data;

            // 병합
            if (p_option === 1) {
                // Item 기준으로 아이템 가져오기
                for(var i = 0; entity.items.count > i; i++) {
                    this.items.add(entity.items[i]);
                }
            }
            
            // Row 데이터 가져오기
            for(var i = 0; entity.rows.count > i; i++) {
                
                row = this.newRow();

                for (var ii = 0; ii < this.items.count; ii++) {
                    itemName = this.items[ii].name;
                    row[itemName] = typeof entity.rows[i][itemName] !== "undefined" ? entity.rows[i][itemName] : "";
                }
                this.rows.add(row);
            }
        };


        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Entity.prototype.getTypes = function() {
            
            var type = ["Entity"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 
         * @param {*} p_object 
         * @param {Number} p_option 
         *          - 1: 병합, item + row  (*기본값)
         *          - 2: 데이터만 가져오기 (존재하는 아이템만)
         */
        Entity.prototype.load  = function(p_object, p_option) {

            if (p_object instanceof Entity) {
                this.__loadEntity(p_object, p_option);
            } else {
                this.__loadJSON(p_object, p_option);
            }
        };

        Entity.prototype.newRow  = function() {
            return new Row(this);
        };

        /**
         * filter = {
         *  __except : ["name"...],        // 제외 아이템 (1방법)
         *  아이템명: { __except: true }    // 아이템 제외 (2방법)
         *  아이템명: { order: 100 }        // 속성 오버라이딩
         * }
         * ** 상속기법을 이용함
         * @param {Object} p_filter ㄴㅇㄹㄴㄹ
         * @return {Array}
         */
        Entity.prototype.select  = function(p_filter) {
            
            var EXECEPT = '__except';
            var list = [];
            var excepts = [];
            var obj, f;
            var filterItem;

            // 제외 아이템 조회
            if (p_filter && p_filter[EXECEPT]) {
                if (Array.isArray(p_filter[EXECEPT])) excepts = p_filter[EXECEPT];
                else if (typeof p_filter[EXECEPT] === "string") excepts.push(p_filter[EXECEPT]);
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

            return list.sort(function(a, b) { return a.order - b.order; });
        };

        Entity.prototype.setValue  = function(p_row) {
            
            if (p_row instanceof Row) throw new Error("Only [p_row] type 'Row' can be added");

            for(var i = 0; this.items.count > i; i++) {
                this.items[i].value = p_row[i];
            }
        };

        Entity.prototype.getValue  = function() {
            
            var row = this.newRow();
            
            for(var i = 0; this.items.count > i; i++) {
                row[i] = this.items[i].value;
            }
            return row;
        };

        /**@abstract IGroupControl */
        Entity.prototype.merge  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        
        /**@abstract IGroupControl */
        Entity.prototype.copyTo  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        
        /**@abstract IAllControl */
        Entity.prototype.clone  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        /**@abstract IAllControl */
        Entity.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        
        return Entity;
    
    }(MetaElement));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = Entity;
    } else {
        global._W.Meta.Entity.Entity = Entity;
    }

}(this));