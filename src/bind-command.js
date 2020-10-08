/**
 * @namespace _W.Meta.Bind.BindCommand
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;
    var BaseBind;
    var item;
    var Item;
    var Entity;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      = require("./collection-base");
        BaseBind            = require("./bind-base");
        item                = require("./entity-item");
        Item                = item.Item;
        Entity              = require("./entity-base");
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
        BaseBind            = global._W.Meta.Bind.BaseBind;
        Entity              = global._W.Meta.Entity.Entity;
        Item                = global._W.Meta.Entity.Item;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommand  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindCommand(p_bindModel, p_baseEntity) {
            _super.call(this);
            
            if (!(p_bindModel.instanceOf("BindModel"))) throw new Error("Only [p_bindModel] type 'BindModel' can be added");
            if (p_baseEntity && !(p_baseEntity.instanceOf("Entity"))) throw new Error("Only [p_baseEntity] type 'Entity' can be added");

            /** @protected 소유자 */
            this._model = p_bindModel;

            /** @protected */
            this._baseEntity = p_baseEntity;
        }
        util.inherits(BindCommand, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommand.prototype.getTypes  = function() {
                    
            var type = ["BindCommand"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override */
        BindCommand.prototype._onExecute = function() {
            this._model._onExecute();
            _super.prototype._onExecute.call(this);
        };

        /** @override */
        BindCommand.prototype._onExecuted = function() {
            _super.prototype._onExecuted.call(this);
            this._model._onExecuted();
        };
        
        /** @virtual */
        BindCommand.prototype.execute = function() {
            throw new Error("[ execute() ] Abstract method definition, fail...");
        };

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String> | String} p_views <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.add = function(p_item, p_views) {

            var views = [];     // 파라메터 변수
            var property = [];  // 속성
            var propStr;
            var collection;

            // 초기화
            if (Array.isArray(p_views)) views = p_views;
            else if (typeof p_views === "string") views.push(p_views);

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type instances can be added");
            }
            if (typeof p_views !== "undefined" && (!Array.isArray(p_views) || typeof p_views === "string")) {
                throw new Error("Only [p_views] type Array can be added");
            } 
            
            // 설정 대상 가져오기
            if (views.length > 0) {
                for (var i = 0; i< views.length; i++) {
                    
                    if (typeof views[i] !== "string") throw new Error("Only [String] type instances can be added");
                   
                    // 배열문자열 검사  => output[0]
                    if (views[i].indexOf("[") > -1) {
                        propStr = views[i].slice(0, views[i].indexOf("[") - 1);
                    } else {
                        propStr = views[i];
                    }

                    // 속성 유무 검사
                    if (this[propStr]) {
                        property.push(views[i]);
                    } else {
                        console.warn("Warning!! Param p_views 에 [" + views[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // 공개(public) Entity 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof Entity && prop.substr(0, 1) !== "_") {
                                property.push(prop.toString());
                    }
                }
            }

            // 설정
            for (var i = 0; i < property.length; i++) {
                // if (this[property[i]] instanceof BaseCollection) {
                //     property[i] = property[i] + "[0]"               // 기본 첫번째 배열 설정 
                // }
                
                if (property[i].indexOf("[") > -1 && property[i].indexOf("]") > -1) {
                    collection = eval("this." + property[i]).items;
                } else if (this[property[i]] instanceof Entity){
                    collection = this[property[i]].items
                } else {
                    console.warn("Warning!! [" + property[i] + "]속성이 this 에 없습니다. ");
                }

                collection.add(p_item);
            }
        };

        return BindCommand;
    
    }(BaseBind));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommand;
    } else {
        global._W.Meta.Bind.BindCommand = BindCommand;
    }

}(this));