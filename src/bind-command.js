/**
 * @namespace _W.Meta.Bind.BindCommand
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;
    var BaseBind;
    var Entity;
    var item;
    var Item;
    var ItemCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      =  require("./collection-base");
        BaseBind            = require("./bind-base");
        item                = require("./entity-item");
        Entity              =  require("./entity-base");
        Item                = item.Item;
        ItemCollection      = item.ItemCollection;
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
        BaseBind            = global._W.Meta.Bind.BaseBind;
        Entity              = global._W.Meta.Entity.Entity;
        Item                = global._W.Meta.Entity.Item;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommand  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindCommand(p_model) {
            _super.call(this);

            // TODO:: p_onwer 타입 검사 추가
            // if (p_onwer instanceof BindModel)

            /** @protected 소유자 */
            this.model = p_model;
            
        }
        util.inherits(BindCommand, _super);
    
        /** @virtual */
        BindCommand.prototype.execute = function() {
            throw new Error("[ execute() ] Abstract method definition, fail...");
        };

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String> | String} a_views <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.add = function(p_item, a_views) {

            var views = [];     // 파라메터 변수
            var property = [];  // 속성
            var propStr;
            var collection;

            // 초기화
            if (Array.isArray(a_views)) views = a_views;
            else if (typeof a_views === "string") views.push(a_views);

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type instances can be added");
            }
            if (typeof a_views !== "undefined" && (!Array.isArray(a_views) || typeof a_views === "string")) {
                throw new Error("Only [a_views] type Array can be added");
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
                        console.warn("Warning!! Param a_views 에 [" + views[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // 공개(public) Entity | BaseCollection 프로퍼티 검사
                for (var prop in this) {
                    if ((this[prop] instanceof Entity || this[prop] instanceof BaseCollection) 
                            && prop.substr(0, 1) !== "_") {
                                property.push(prop.toString());
                    }
                }
            }

            // 설정
            for (var i = 0; i < property.length; i++) {
                if (this[property[i]] instanceof BaseCollection) {
                    property[i] = property[i] + "[0]"               // 기본 첫번째 배열 설정 
                }
                
                if (property[i].indexOf("[") > -1 && property[i].indexOf("]") > -1) {
                    collection = eval("this." + property[i]).items;
                } else if (this[property[i]] instanceof Entity){
                    collection = this[property[i]].items
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