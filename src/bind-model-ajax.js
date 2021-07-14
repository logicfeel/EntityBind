/**
 * namespace _W.Meta.Bind.BindModelAjax
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
    var BindModel;
    var PropertyCollection;
    var IBindModel;
    var ItemDOM;
    var BindCommandAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        BindModel               = require("./bind-model");
        PropertyCollection      = require("./collection-property");
        IBindModel              = require("./i-bind-model");        
        ItemDOM                 = require("./entity-item-dom");
        BindCommandAjax         = require("./bind-command-ajax");

    } else {
        util                    = global._W.Common.Util;
        BindModel               = global._W.Meta.Bind.BindModel;
        PropertyCollection      = global._W.Collection.PropertyCollection;
        IBindModel              = global._W.Interface.IBindModel;        
        ItemDOM                 = global._W.Meta.Entity.ItemDOM;
        BindCommandAjax         = global._W.Meta.Bind.BindCommandAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");
    if (typeof ItemDOM === "undefined") throw new Error("[ItemDOM] module load fail...");
    if (typeof BindCommandAjax === "undefined") throw new Error("[BindCommandAjax] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelAjax  = (function (_super) {
        /**
         * 바인드모델 Ajax
         * @constructs _W.Meta.Bind.BindModelAjax
         * @extends _W.Meta.Bind.BindModel
         * @param {*} p_service 
         */
        function BindModelAjax(p_service) {
            _super.call(this);
            
            var __baseAjaxSetup = {
                url: "",
                type: "GET"
            };
            
            this._baseEntity                = this.addEntity('first');   // Entity 추가 및 baseEntity 설정
            this.itemType                   = ItemDOM;                   // 기본 아이템 타입 변경
            this._baseEntity.items.itemType = this.itemType;            // base 엔티티 타입 변경
            this.items                      = this._baseEntity.items;   // 참조 추가

            Object.defineProperty(this, "baseAjaxSetup", 
            {
                get: function() { return __baseAjaxSetup; },
                configurable: true,
                enumerable: true
            });

            Object.defineProperty(this, "baseUrl", 
            {
                get: function() { return __baseAjaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [baseUrl] type 'string' can be added");
                    __baseAjaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // 객체 등록
            if (typeof p_service === 'object') {
                // 서비스 설정
                this.setService(p_service);
                // 속성 설정
                if (typeof p_service["baseUrl"] === "string") {
                    this.baseUrl = p_service["baseUrl"];
                }
                if (typeof p_service["baseAjaxSetup"] === "object") {
                    this.baseAjaxSetup = p_service["baseAjaxSetup"];
                }
            }

            // 예약어 등록
            this._symbol = this._symbol.concat(["items", "baseAjaxSetup", "baseUrl"]);
            this._symbol = this._symbol.concat(["getTypes", "checkSelector", "setService"]);
        }
        util.inherits(BindModelAjax, _super);
    
        /**
         * 상속 클래스에서 오버라이딩 필요!! *
         * @override
         */
        BindModelAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 셀렉터 검사
         * @param {*} p_collection 
         */
        BindModelAjax.prototype.checkSelector  = function(p_collection) {
            
            var collection = p_collection || this.prop;
            var failSelector = null;
            var selectors = [];
            var selector = "";

            // 유효성 검사
            if (!(collection instanceof PropertyCollection)) throw new Error("Only [p_collection] type 'PropertyCollection' can be added");

            // 검사
            // for (var i = 0; collection.count > i; i++) {
            //     if (typeof collection[i].selector !== "undefined") {
            //         selectors = [];
            //         if (Array.isArray(collection[i].selector)) 
            //             selectors = collection[i].selector;
            //         else   
            //             selectors.push(collection[i].selector)
                    
            //         for (var ii = 0; ii < selectors.length; ii++) {
            //             selector  = typeof selectors[ii] === "function" ? selectors[ii].call(this) : selectors[ii];

            //             if (typeof selector === "string" && selector.length > 0) failSelector = util.validSelector(selector);
                        
            //             if (failSelector !== null) {
            //                 console.warn("selector 검사 실패 : %s ", failSelector);
            //                 return false;
            //             }
            //         }
            //     }
            // }            
            for (var i = 0; collection.count > i; i++) {
                if (typeof collection[i].selector !== "undefined") {
                        selector = collection[i].selector.key;

                        if (typeof selector === "string" && selector.length > 0) failSelector = util.validSelector(selector, true);
                        
                        if (failSelector !== null) {
                            console.warn("selector 검사 실패 : %s ", failSelector);
                            return false;
                        }
                }
            }
            
            return true;
        };

        /**
         * 셀렉터 목록 얻기
         * @param {*} p_isLog 
         */
        BindModelAjax.prototype.listSelector  = function(p_isLog) {
            
            var collection = this.items;
            var obj;
            var selector;
            var selectors = [];

            for (var i = 0; collection.count > i; i++) {
                selector = collection[i].selector;
                if (typeof selector !== "undefined" && typeof selector.key === "string" && selector.key.length > 0) {
                        obj = { 
                            item: collection[i].name, 
                            key: collection[i].selector.key, 
                            type: collection[i].selector.type,
                            check: util.validSelector(selector.key, true) === null ? true : false
                        };
                        selectors.push(obj);
                }
            }
            // 정렬
            selectors.sort(function(a, b) {
                if (a.check > b.check) {
                    return 1;
                } else {
                    return -1;
                }
            });
            if (p_isLog === true) {
                for (var i = 0; i < selectors.length > 0; i++ ) {
                    if (selectors[i].check === true) {
                        console.log("item: %s, key: %s, type: %s ", selectors[i].item, selectors[i].key, selectors[i].type);
                    } else {
                        console.warn("item: %s, key: %s, type: %s [Fail]", selectors[i].item, selectors[i].key, selectors[i].type);
                    }
                }
            }
            
            return selectors;
        };

        /**
         * 명령 추가
         * @param {*} p_name 
         * @param {*} p_option 
         * @param {*} p_entities 
         */
        BindModelAjax.prototype.addCommand  = function(p_name, p_option, p_entities) {

            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(" [" + p_name + "] is a Symbol word");   
            }            
            
            // 중복 검사
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            // 생성
            this[p_name] = new BindCommandAjax(this, p_option, p_entities);

            return this[p_name];
        };

        return BindModelAjax;
    
    }(BindModel));
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelAjax;
    } else {
        global._W.Meta.Bind.BindModelAjax = BindModelAjax;
        global.BindModelAjax = BindModelAjax;        // 힌트
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));