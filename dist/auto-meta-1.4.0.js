/**
 * Object : 폴리필
 * @namespace Object.prototype.isImplementOf [protected] 구현 여부
 * @namespace Object.prototype._implements 인터페이스(클래스 포함) 등록 *다중상속*
 */
if ((typeof Object.prototype._implements === "undefined") ||
    (typeof Object.prototype.isImplementOf === "undefined")) {

    (function(global) {

        "use strict";

        //==============================================================
        // 1. 모듈 네임스페이스 선언
        
        //==============================================================
        // 2. 모듈 가져오기 (node | web)

        //==============================================================
        // 3. 모듈 의존성 검사

        //==============================================================
        // 4. 모듈 구현    
        /**
         * 인터페이스 객체 유무 검사
         * @function  
         * @param {Function} p_imp 
         */
        var isImplementOf = function(p_imp) {
            for (var i = 0; i < this._interface.length; i++) {
                if (this._interface[i] === p_imp) return true;
            }
            return false;
        };    

        /**
         * 등록된 인터페이스의 prototype과 프로퍼티는 구현되어야 함
         * 인터페이스(클래스) 등록
         * @protected
         * @function 
         * @param {Function} arg 함수형 인터페이스 목록
         */
        var _implements = function _implements(arg) {
            this._interface = this._interface || [];

            var typeName;
            var obj;    
        
            for(var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "function") {
                    // 중복 제거
                    if (this._interface.indexOf(arguments[i]) < 0) {
                        this._interface.push(arguments[i]);
                        this._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                    }
                } else {
                    throw new Error("함수타입만 가능합니다.");
                }
                    
                obj = new arguments[i];
        
                for(var p in obj) {
                    typeName = (typeof obj[p] === "function") ? "Method" : "Property";
                    
                    if (!(p in this) && !Object.prototype.hasOwnProperty(p)) {
                        console.warn("Warning!! 인터페이스 구현 해야함. " + arguments[i].name + " :: (" + typeName + ") " + p);
                    }
                }
            }
        };

        //==============================================================
        // 5. 모듈 내보내기 (node | web)
        // jquery 에서 오류 발생으로 대체함
        // Object.prototype._implements = _implements;
        // Object.prototype.isImplementOf = isImplementOf;
		Object.defineProperty(Object.prototype, "_implements",
	    {
	        value: _implements,
	        enumerable: false
	    });
	    Object.defineProperty(Object.prototype, "isImplementOf",
	    {
	        value: isImplementOf,
	        enumerable: false
        });
        
    }(typeof module === "object" && typeof module.exports === "object" ? global : window));
}
/**
 * @namespace Array.isArray : 배열 유무 (폴리필 웹전용)
 */
if (typeof Array.isArray === "undefined") {

    (function(global) {

        "use strict";

        //==============================================================
        // 1. 모듈 네임스페이스 선언
        
        //==============================================================
        // 2. 모듈 가져오기 (node | web)

        //==============================================================
        // 3. 모듈 의존성 검사

        //==============================================================
        // 4. 모듈 구현    
        var isArray = function(pValue) {
            if (typeof Array.isArray === "function") {
                return Array.isArray(pValue);
            } else {
                return Object.prototype.toString.call(pValue) === "[object Array]";
            }
        };

        //==============================================================
        // 5. 모듈 내보내기 (node | web)
        Arrary.isArray = isArray;

    }(typeof module === "object" && typeof module.exports === "object" ? global : window));
}
/**
 * @namespace _W.Common.Util
 *      - inherits() : 상속
 *      - getArrayLevel() : 배열 깊이 얻기
 *      - createGUID() : GUID 생성
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};
    global._W.Common.Util   = global._W.Common.Util || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {
    } else {
    }

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    /**
     * inherits(대상, 부모) : 상속
     */
    var inherits = (function () {
        if (typeof Object.create === 'function') {
            // implementation from standard node.js 'Util' module
            return function(ctor, superCtor) {
                if (superCtor) {
                    ctor.super = superCtor
                    ctor.prototype = Object.create(superCtor.prototype, {
                        constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                        }
                    })
                }
            };
        } else {
            // old school shim for old browsers
            return function (ctor, superCtor) {
                if (superCtor) {
                    ctor.super = superCtor
                    var TempCtor = function () {}
                    TempCtor.prototype = superCtor.prototype
                    ctor.prototype = new TempCtor()
                    ctor.prototype.constructor = ctor
                }
            }
        }
    }());

    /**
     * @param {*} p_elem 
     * @param {*} p_depts 
     */
    var getArrayLevel = function (p_elem, p_depts) {
        
        var MAX     = 10;
        var level   = 0;
        
        p_depts = p_depts || 0;

        if (p_elem instanceof Array && MAX > p_depts) {
            level++;
            p_depts++;
            level = level + this.getArrayLevel(p_elem[0], p_depts);  // 재귀호출을 통해 깊이 얻기
        }
        return level;
    };
    
    /**
     * @function GUID 생성
     */
    var createGUID = function() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+"000000000").substr(2,8);  
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 셀렉터의 유효성 검사 : 대상을 모두 검사하여 결과를 리턴한다.
     * 주의!! DOM(web) 에서만 작동한다.
     * @param {object<array | string> | array<string> | string} p_obj 
     * @returns {String} 없는 셀렉터, 통화하면 null 리턴
     */
    var validSelector = function(p_obj) {
        
        var selectors = [];

        // 입력형식에 따른 배열에 삽입
        if (typeof p_obj === "string") selectors.push(p_obj);
        else if (typeof p_obj === "array") {
            selectors = p_obj;
        } else if (typeof p_obj === "object") {
            for(var prop in p_obj) {
                if (p_obj.hasOwnProperty(prop)) {
                    if (Array.isArray(p_obj[prop])) {
                        selectors = selectors.concat(p_obj[prop]);
                    } else { 
                        selectors.push(p_obj[prop]);
                    }
                }
            }
        }

        if (typeof document === "object" && typeof document.querySelector === "object") {     
            // 유효성 검사
            for(var i = 0; selectors.length > 0; i++) {
                if (typeof selectors[i] !== "string") throw new Error("Only [selectors] type 'string' can be added");

                if (document.querySelector(selectors[i]) === null) {
                    return selectors[i];
                }
            }
        } else {
            throw new Error("[document.querySelector] module load fail...");
        }

        return null;
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.inherits = inherits;
        module.exports.getArrayLevel = getArrayLevel;
        module.exports.createGUID = createGUID;
    } else {
        global._W.Common.Util.inherits = inherits;
        global._W.Common.Util.getArrayLevel = getArrayLevel;
        global._W.Common.Util.createGUID = createGUID;
        global._W.Common.Util.validSelector = validSelector;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Common.Observer : 옵서버
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
    } else {
    }

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    
    // 클래스 정의
    var Observer = (function () {
        /**
         * @class Observer
         * @classdesc 구독자 클래스, 이벤트에 활용
         * @param {obejct} p_onwer Observer 클래스의 소유 함수 또는 클래스
         * @param {object} p_this 함수 호출 본문에서 this 역활 publish.apply(p_this, ...)
         */
        function Observer(p_onwer, p_this) {

            this.isDebug = false;

            /** @member {object} Observer._this 등록함수의 this */
            this._this = p_this;    

            /** @member {object} Observer._onwer 이벤트의 소유자 */
            this._onwer = p_onwer;
            
            this.subscribers = {        // 전역 구독자
                any: []
            };
            
            /** @member {boolean} Observer.propagation  이벤트 전파 설정 (기본값:true) */
            this.propagation    = true;

            /** @member {boolean} Observer.isMultiMode 단일 구독자 모드, 마지막 등록 구독자만 활성화 (기본값:true) */
            this.isMultiMode    = true;
        }

        /**
         * 구독 신청
         * @method Observer#subscribe 
         * @param {function} p_fn  구독 콜백 함수
         * @param {?string} p_code 구독 코드명 : 기본값 "any"
         * @summary 이벤트 "p_code"를 입력하지 않으면 전역(any)에 등록 된다.
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            var subscribers = null;

            if (typeof p_fn === "undefined") throw new Error("p_fn param request fail...");
            if (typeof p_fn !== "function") throw new Error("Only [p_fn] type 'function' can be added");

            // 싱글모드일 경우 기존내용 모두 제거
            if (!this.isMultiMode) this.unsubscribeAll(p_code);

            if (typeof this.subscribers[p_code] === "undefined") {
                this.subscribers[p_code] = [];
            }
            subscribers = this.subscribers[p_code];
            subscribers.push(p_fn);
        };
        
        /**
         * @method Observer#unsubscribe 
         * @param {function} p_fn [필수] 이벤트 콜백 함수
         * @param {?string} p_code 이벤트 코드명 : 기본값 "any"
         * @description sdfds
         * @summary 이벤트 "p_code"를 입력하지 않으면 전역(any)에서 취소 된다.
         */
        Observer.prototype.unsubscribe = function(p_fn, p_code) {
            p_code = p_code || "any";

            if (typeof p_fn === "undefined") throw new Error("p_fn param request fail...");

            if (this.subscribers[p_code]) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (this.subscribers[p_code][i] === p_fn) {
                        this.subscribers[p_code].splice(i, 1);
                    }
                }
            }
        };

        /**
         * @method Observer#unsubscribeAll
         * @param {?string} p_code 이벤트 코드명
         * @summary 
         *  - p_code 입력하면 해당 콜백함수들 구독 취소한다.
         *  - p_code 를 입력하지 않으면 전체 등록된 이벤트가 취소된다.
         */
        Observer.prototype.unsubscribeAll = function(p_code) {

            if (typeof p_code === "undefined") {     // 전체 구독 삭제
                this.subscribers = {any: []};
            } else {                        // 코드명 구독(함수) 전체 삭제
                delete this.subscribers[p_code];
            }
        };

        /**
         * @description 구독 함수 호출
         * @method Observer#publish
         * @param {?string} p_code 이벤트 코드명 : 기본값 "any"
         */
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || "any";
            
            var args = Array.prototype.slice.call(arguments);
            var params = args.length >= 1 ? args.splice(1) : [];

            // this.propagation = true;    // 이벤트 전파

            if (p_code in this.subscribers) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (typeof this.subscribers[p_code][i] === "function") {
                        // this.subscribers[p_code][i].call(this._this, this._onwer);  // REVIEW:: _onwer 인수 확인필요! >> 전달파라메터 
                        this.subscribers[p_code][i].apply(this._this, params);
                    }
                }
            }
            
            if (this.isDebug) {
                console.log("publish() 이벤트 발생 [" + this._this.constructor.name + "] type:" + p_code);
            }
        };

        Observer.prototype.stopPropagation = function() {
            this.propagation = false;
        }

        return Observer;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = Observer;
    } else {
        global._W.Common.Observer = Observer;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IObject
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IObject  = (function () {
        function IObject() {
        }
    
        IObject.prototype.getTypes  = function() {
            throw new Error("[ getTypes() ] Abstract method definition, fail...");
        };
        
        IObject.prototype.instanceOf  = function() {
            throw new Error("[ instanceOf() ] Abstract method definition, fail...");
        };
    
        return IObject;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IObject;
    } else {
        global._W.Interface.IObject = IObject;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IMarshal
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IObject;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IObject             = require("./i-object");
    } else {
        util                = global._W.Common.Util;
        IObject             = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IObject === "undefined") throw new Error("[IObject] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IMarshal  = (function (_super) {
        function IMarshal() {
            _super.call(this);
        }
        util.inherits(IMarshal, _super);

        IMarshal.prototype.getObject  = function() {
            throw new Error("[ getObject() ] Abstract method definition, fail...");
        };

        IMarshal.prototype.getGUID  = function() {
            throw new Error("[ getGUID() ] Abstract method definition, fail...");

        };

        return IMarshal;
    }(IObject));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IMarshal;
    } else {
        global._W.Interface.IMarshal = IMarshal;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IAllControl
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IAllControl  = (function () {
        function IAllControl() {
        }
    
        /**
         * 복제 : 전체
         */
        IAllControl.prototype.clone  = function() {
            throw new Error("[ clone() ] Abstract method definition, fail...");
        };

        /**
         * 로드 : 전체
         */
        IAllControl.prototype.load  = function() {
            throw new Error("[ load() ] Abstract method definition, fail...");
        };

        /**
         * 삭제 : 전체
         */
        IAllControl.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
    
        return IAllControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IAllControl;
    } else {
        global._W.Interface.IAllControl = IAllControl;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IExportControl
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IExportControl  = (function () {
        function IExportControl() {
        }
    
        /**
         * 출력 : 전체
         */
        IExportControl.prototype.write  = function() {
            throw new Error("[ write() ] Abstract method definition, fail...");
        };
    
        return IExportControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IExportControl;
    } else {
        global._W.Interface.IExportControl = IExportControl;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IGroupControl
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IGroupControl  = (function () {
        function IGroupControl() {
        }
    
        /**
         * 복제 : 전체
         */
        IGroupControl.prototype.merge  = function() {
            throw new Error("[ merge() ] Abstract method definition, fail...");
        };

        /**
         * 로드 : 전체
         */
        IGroupControl.prototype.copy  = function() {
            throw new Error("[ copyTo() ] Abstract method definition, fail...");
        };

        return IGroupControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IGroupControl;
    } else {
        global._W.Interface.IGroupControl = IGroupControl;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IImportControl
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IImportControl  = (function () {
        function IImportControl() {
        }
    
        /**
         * 출력 : 전체
         */
        IImportControl.prototype.read  = function() {
            throw new Error("[ read() ] Abstract method definition, fail...");
        };
    
        return IImportControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IImportControl;
    } else {
        global._W.Interface.IImportControl = IImportControl;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.ILookupControl
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var ILookupControl  = (function () {
        function ILookupControl() {
        }
    
        /**
         * 유무 검사
         */
        ILookupControl.prototype.contains  = function() {
            throw new Error("[ contains() ] Abstract method definition, fail...");
        };

        return ILookupControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ILookupControl;
    } else {
        global._W.Interface.ILookupControl = ILookupControl;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IPartControl
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IPartControl  = (function () {
        function IPartControl() {
        }
    
        /**
         * 등록 : 부분
         */
        IPartControl.prototype.add  = function() {
            throw new Error("[ add() ] Abstract method definition, fail...");
        };

        /**
         * 삭제 : 부분
         */
        IPartControl.prototype.remove  = function() {
            throw new Error("[ remove() ] Abstract method definition, fail...");
        };
    
        return IPartControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IPartControl;
    } else {
        global._W.Interface.IPartControl = IPartControl;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.ICollection
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IPartControl;
    var ILookupControl;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필

        IPartControl        = require("./i-control-part");
        ILookupControl      = require("./i-control-lookup");
    } else {
        IPartControl        = global._W.Interface.IPartControl;
        ILookupControl      = global._W.Interface.ILookupControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var ICollection  = (function () {
        function ICollection() {
            /**
             * @member count 컬렉션 갯수
             */
            this.count = 0;

            /**
             * @member list 컬렉션 배열 반환
             */
            this.list = [];

            /** @implements */
            this._implements(IPartControl, ILookupControl);            
        }
    
        /**
         * 등록 : insert
         */
        ICollection.prototype.add  = function() {
            throw new Error("[ add() ] Abstract method definition, fail...");
        };

        /**
         * 삭제 (객체, 이름) : delete
         */
        ICollection.prototype.remove  = function() {
            throw new Error("[ remove() ] Abstract method definition, fail...");
        };

        /**
         * 삭제 (번호) : delete
         */
        ICollection.prototype.removeAt  = function() {
            throw new Error("[ removeAt() ] Abstract method definition, fail...");
        };

        /**
         * 초기화 : update (delete 후 insert 의 의미)
         */
        ICollection.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        /**
         * 유무 검사 (소유) : read (select)
         */
        ICollection.prototype.contains  = function() {
            throw new Error("[ contains() ] Abstract method definition, fail...");
        };

        /**
         * 찾기 (번호) : read(select)
         */
        ICollection.prototype.indexOf  = function() {
            throw new Error("[ indexOf() ] Abstract method definition, fail...");
        };
    
        return ICollection;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ICollection;
    } else {
        global._W.Interface.ICollection = ICollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IPropertyCollection
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var ICollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필

        util                = require("./utils");
        ICollection         = require("./i-collection");
    } else {
        util                = global._W.Common.Util;
        ICollection         = global._W.Interface.ICollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IPropertyCollection  = (function (_super) {
        function IPropertyCollection() {
            _super.call(this);
        }
        util.inherits(IPropertyCollection, _super);

        IPropertyCollection.prototype.propertyOf  = function() {
            throw new Error("[ propertyOf() ] Abstract method definition, fail...");
        };
    
        return IPropertyCollection;
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IPropertyCollection;
    } else {
        global._W.Interface.IPropertyCollection = IPropertyCollection;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IControlCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var ICollection;
    var IGroupControl;
    var IAllControl;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        ICollection         = require("./i-collection");
        IGroupControl        = require("./i-control-group");
        IAllControl         = require("./i-control-all");
    } else {
        util                = global._W.Common.Util;
        ICollection         = global._W.Interface.ICollection;
        IGroupControl        = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof IAllControl === "undefined") throw new Error("[IAllControl] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IControlCollection  = (function (_super) {
        function IControlCollection() {
            _super.call(this);

            /** @implements */
            this._implements(IGroupControl, IAllControl);            
        }
        util.inherits(IControlCollection, _super);        
    
        
        /**
         * 병합, 합침
         */
        IControlCollection.prototype.merge  = function() {
            throw new Error("[ concat() ] Abstract method definition, fail...");
        };

        /**
         * 범위 복사
         */
        IControlCollection.prototype.copyTo  = function() {
            throw new Error("[ copyTo() ] Abstract method definition, fail...");
        };

        /**
         * 전체 복제(복사)
         */
        IControlCollection.prototype.clone  = function() {
            throw new Error("[ clone() ] Abstract method definition, fail...");
        };

        /**
         * 로드 : 전체
         */
        IControlCollection.prototype.load  = function() {
            throw new Error("[ load() ] Abstract method definition, fail...");
        };

        /**
         * 삭제 : 전체
         */
        IControlCollection.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
    
        return IControlCollection;
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IControlCollection;
    } else {
        global._W.Interface.IControlCollection = IControlCollection;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModel
 */
(function(global) {
    
    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var IBindModel  = (function () {
        function IBindModel() {

            this.attr      = null;
            this.mode       = null;

            this.cbRegister = null;
            this.cbValid    = null;
            this.cbReady    = null;

            this.onExecute  = null;
            this.onExecuted = null;

            this.cbFail     = null;
            this.cbError    = null;

            this.onExecute  = null;
            this.onExecuted = null;
        }
        
        return IBindModel;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModel;
    } else {
        global._W.Interface.IBindModel = IBindModel;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModelRead
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModel;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModel          = require("./i-bind-model");
    } else {
        util                = global._W.Common.Util;
        IBindModel          = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelRead  = (function (_super) {
        function IBindModelRead() {
            _super.call(this);

            this.read = null;
        }
        util.inherits(IBindModelRead, _super);

        return IBindModelRead;
    }(IBindModel));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelRead;
    } else {
        global._W.Interface.IBindModelRead = IBindModelRead;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModelList
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModel;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModel          = require("./i-bind-model");
    } else {
        util                = global._W.Common.Util;
        IBindModel          = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelList  = (function (_super) {
        function IBindModelList() {
            _super.call(this);

            this.list = null;
        }
        util.inherits(IBindModelList, _super);

        return IBindModelList;
    }(IBindModel));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelList;
    } else {
        global._W.Interface.IBindModelList = IBindModelList;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModelEdit
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModel;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModel          = require("./i-bind-model");
    } else {
        util                = global._W.Common.Util;
        IBindModel          = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelEdit  = (function (_super) {
        function IBindModelEdit() {
            _super.call(this);

            this.read   = null;
            this.update = null;
            this.delete = null;
        }
        util.inherits(IBindModelEdit, _super);

        return IBindModelEdit;
    }(IBindModel));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelEdit;
    } else {
        global._W.Interface.IBindModelEdit = IBindModelEdit;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModelCreate
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModel;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModel          = require("./i-bind-model");
    } else {
        util                = global._W.Common.Util;
        IBindModel          = global._W.Interface.IBindModel;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelCreate  = (function (_super) {
        function IBindModelCreate() {
            _super.call(this);

            this.create = null;
        }
        util.inherits(IBindModelCreate, _super);

        return IBindModelCreate;
    }(IBindModel));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelCreate;
    } else {
        global._W.Interface.IBindModelCreate = IBindModelCreate;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModelReadDel
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModelRead;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModelRead      = require("./i-bind-model-read");
    } else {
        util                = global._W.Common.Util;
        IBindModelRead      = global._W.Interface.IBindModelRead;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelRead === "undefined") throw new Error("[IBindModelRead] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelReadDel  = (function (_super) {
        function IBindModelReadDel() {
            _super.call(this);

            this.delete = null;
        }
        util.inherits(IBindModelReadDel, _super);

        return IBindModelReadDel;
    }(IBindModelRead));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelReadDel;
    } else {
        global._W.Interface.IBindModelReadDel = IBindModelReadDel;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModelForm
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModelEdit;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModelEdit      = require("./i-bind-model-edit");
    } else {
        util                = global._W.Common.Util;
        IBindModelEdit      = global._W.Interface.IBindModelEdit;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelEdit === "undefined") throw new Error("[IBindModelEdit] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelForm  = (function (_super) {
        function IBindModelForm() {
            _super.call(this);

            this.create = null;
        }
        util.inherits(IBindModelForm, _super);

        return IBindModelForm;
    }(IBindModelEdit));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelForm;
    } else {
        global._W.Interface.IBindModelForm = IBindModelForm;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Interface.IBindModelListDel
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IBindModelList;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        IBindModelList      = require("./i-bind-model-list");
    } else {
        util                = global._W.Common.Util;
        IBindModelList      = global._W.Interface.IBindModelList;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelList === "undefined") throw new Error("[IBindModelList] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var IBindModelListDel  = (function (_super) {
        function IBindModelListDel() {
            _super.call(this);

            this.delete = null;
        }
        util.inherits(IBindModelListDel, _super);

        return IBindModelListDel;
    }(IBindModelList));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = IBindModelListDel;
    } else {
        global._W.Interface.IBindModelListDel = IBindModelListDel;
    }
    
}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Collection.BaseCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var ICollection;
    var Observer;    

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        ICollection         = require("./i-collection");
        Observer            = require("./observer");
    } else {
        ICollection         = global._W.Interface.ICollection;
        Observer            = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof ICollection === "undefined") throw new Error("[ICollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseCollection  = (function () {
        /**
         * @abstract 추상클래스
         * @class 속성타입 컬렉션 최상위(부모) 클래스
         */
        function BaseCollection(p_onwer) {
    
            var __elementType = null;

            // Private
            this.__event     = new Observer(this, this);

            // Protected
            this._onwer         = p_onwer;
            this._element       = [];

            /** @property */
            Object.defineProperty(this, "elementType", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return __elementType;
                },
                set: function(newValue) {
                    if(typeof newValue !== "function") throw new Error("Only [elementType] type 'function' can be added");
                    if(typeof newValue === "function" && typeof ["number", "string", "boolean"].indexOf(newValue.name) > -1) {
                        throw new Error("Only [elementType] type Not 'number', 'string', 'boolean' can be added");
                    }
                    __elementType = newValue;
                }
            });

            /** @property */
            Object.defineProperty(this, "list", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element;
                }
            });

            /** @property */
            Object.defineProperty(this, "count", {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element.length;
                }
            });
            
            /** @event */
            Object.defineProperty(this, "onAdd", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "add");
                }
            });

            /** @event */
            Object.defineProperty(this, "onRemove", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "remove");
                }
            });

            /** @event */
            Object.defineProperty(this, "onClear", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "clear");
                }
            });

            /** @event */
            Object.defineProperty(this, "onChanging", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "changing");
                }
            });

            /** @event */
            Object.defineProperty(this, "onChanged", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "changed");
                }
            });

            /**
             * 인터페이스 선언
             * @interface
             */
            this._implements(ICollection);
        }
    
        /**
         * @method private 프로퍼티 기술자 설정
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) {
                    
                    var typeName;

                    if (this.elementType !== null && !(newValue instanceof this.elementType)) {
                        // typeName = this.elementType.constructor.name;
                        typeName = this.elementType.name || this.elementType.constructor.name;
                        throw new Error("Only [" + typeName + "] type instances can be added");
                    }
                    this._element[p_idx] = newValue; 
                },
                enumerable: true,
                configurable: true
            };
        };

        /** @event onAdd 등록 이벤트 발생 */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish("add", p_idx, p_value); 
        };

        /** @event onRemove 삭제 이벤트 발생 */
        BaseCollection.prototype._onRemove = function(p_idx) {
            this.__event.publish("remove", p_idx); 
        };

        /** @event onClear 전체삭제 이벤트 발생 */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish("clear"); 
        };

        /** @event onChanging 변경시 이벤트 발생 */
        BaseCollection.prototype._onChanging = function() {
            this.__event.publish("changing"); 
        };

        /** @event onChanged 변경후 이벤트 발생 */
        BaseCollection.prototype._onChanged = function() {
            this.__event.publish("changed"); 
        };

        /** @abstract */
        BaseCollection.prototype._remove  = function() {
            throw new Error("[ _remove() ] Abstract method definition, fail...");
        };

        /** @abstract */
        BaseCollection.prototype.add  = function() {
            throw new Error("[ add() ] Abstract method definition, fail...");
        };
        
        /** @abstract */
        BaseCollection.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        /**
         * @method remove 배열속성 삭제
         * @param {element} p_elem 속성명
         * @returns {Number} 삭제한 인덱스
         */
        BaseCollection.prototype.remove = function(p_elem) {
            
            var idx;
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (this.contains(p_elem)) {
                idx = this.indexOf(p_elem);
                this._remove(idx);
            }
            
            this._onRemove(idx);                    // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method removeAt 배열속성 삭제
         * @param {number} p_idx 인덱스
         */
        BaseCollection.prototype.removeAt = function(p_idx) {

            var obj = this._element[p_idx];
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (typeof obj !== "undefined") this._remove(p_idx);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };

        /**
         * @method contains 배열속성 여부 
         * @param {Object} p_elem 속성 객체
         * @returns {Boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._element.indexOf(p_elem) > -1;
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {Object} p_elem 속성 객체
         * @returns {Number}
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._element.indexOf(p_elem);
        };

        return BaseCollection;
    }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseCollection;
    } else {
        global._W.Collection.BaseCollection = BaseCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Collection.ArrayCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      = require("./collection-base");
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var ArrayCollection  = (function (_super) {
        /**
         * @class 배열타입 컬렉션 클래스
         */
        function ArrayCollection(p_onwer) {
            _super.call(this, p_onwer); 
        }
        util.inherits(ArrayCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method __remove 배열속성 삭제 (내부처리)
         * @param {*} p_idx 인덱스 번호
         */
        ArrayCollection.prototype._remove = function(p_idx) {
            // [idx] 포인트 이동
            var count = this._element.length - 1;
            
            this._element.splice(p_idx, 1);
            
            if (p_idx < count) {
                // 참조 변경(이동)
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));
                }
                delete this[count];                      // 마지막 idx 삭제
            } else {
                delete this[p_idx];                      // idx 삭제 (끝일 경우)
            }
        };

        /**
         * @method add 배열속성 속성값 설정
         * @param {*} p_value [필수] 속성값
         * @returns {*} 입력 속성 참조값
         */
        ArrayCollection.prototype.add = function(p_value) {
        
            var typeName;
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전

            if (typeof p_value === "undefined") throw new Error("p_value param request fail...");
            if (this.elementType !== null && !(p_value instanceof this.elementType)) {
                typeName = this.elementType.constructor.name;
                throw new Error("Only [" + typeName + "] type instances can be added");
            }
        
            this._element.push(p_value);
            
            index = (this._element.length === 1) ? 0 : this._element.length  - 1;
            Object.defineProperty(this, [index], this._getPropDescriptor(index));

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return [index];
        };

        /**
         * @method clear 배열속성 전체삭제
         */
        ArrayCollection.prototype.clear = function() {
            
            var obj;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._element.length; i++) {
                // obj = this.indexOf(this[i]);
                // if (typeof obj !== "undefined") this._remove(i);
                delete this[i];
            }

            this._element = [];
        
            this._onClear();                        // 이벤트 발생 : 전체삭제
            this._onChanged();                      // 이벤트 발생 : 변경후            
        };

        return ArrayCollection;

    }(BaseCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ArrayCollection;
    } else {
        global._W.Collection.ArrayCollection = ArrayCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Collection.PropertyCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;
    var IPropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      = require("./collection-base");
        IPropertyCollection = require("./i-collection-property");
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
        IPropertyCollection = global._W.Interface.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");
    if (typeof IPropertyCollection === "undefined") throw new Error("[IPropertyCollection] module load fail...");
    
    //==============================================================
    // 4. 모듈 구현    
    var PropertyCollection  = (function (_super) {
        /**
         * @method 속성타입 컬렉션 클래스
         */
        function PropertyCollection(p_onwer) {
            _super.call(this, p_onwer); 

            var __properties = [];

            /** @property {properties} */
            Object.defineProperty(this, "properties", 
            {
                get: function() { return __properties; },
                set: function(newValue) { __properties = newValue; },
                configurable: true,
                enumerable: true
            });

            /** @interface IPropertyCollection 인터페이스 선언 */
            this._implements(IPropertyCollection);            
        }
        util.inherits(PropertyCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method __remove 배열속성 삭제 (내부처리)
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype._remove = function(p_idx) {
            
            var count = this._element.length - 1;
            var propName;
            
            // 프로퍼티 삭제
            propName = this.propertyOf(p_idx);
            delete this[propName];                      

            // 원시 자료 변경
            this._element.splice(p_idx, 1);
            this.properties.splice(p_idx, 1);

            // 참조 자료 변경
            if (p_idx < count) {
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));
                    propName = this.propertyOf(i);
                    Object.defineProperty(this, propName, this._getPropDescriptor(i));
                }
                delete this[count];                     // 마지막 idx 삭제
            } else {
                delete this[p_idx];                     // idx 삭제 (끝일 경우)
            }
        };

        /**
         * @method add 배열속성 설정 및 속성값 등록
         * @param {String} p_name [필수] 속성명
         * @param {?any} p_value 속성값
         * @returns {any} 입력 속성 참조값 REVIEW:: 필요성 검토
         */
        PropertyCollection.prototype.add = function(p_name, p_value) {
            p_value = p_value || "";
            
            var typeName;
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전
        
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (this.elementType !== null && !(p_value instanceof this.elementType)) {
                typeName = this.elementType.constructor.name;
                throw new Error("Only [" + typeName + "] type instances can be added");
            }
            
            if (this.indexOfName(p_name) > -1) {
                console.warn("Warning:: 프로퍼티 이름 중복 !!");
                return this[p_name];     // 중복 등록 방지
            }

            this._element.push(p_value);
            this.properties.push(p_name);

            index = (this._element.length === 1) ? 0 : this._element.length  - 1;
            Object.defineProperty(this, [index], this._getPropDescriptor(index));
            Object.defineProperty(this, p_name, this._getPropDescriptor(index));

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return this[index];
        };

        /**
         * @method clear 배열속성 전체삭제
         */
        PropertyCollection.prototype.clear = function() {
            
            var propName;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._element.length; i++) {
                propName = this.propertyOf(i);
                delete this[i];
                delete this[propName];
            }

            this._element = [];
            this.properties = [];

            this._onClear();                        // 이벤트 발생 : 전체삭제
            this._onChanged();                      // 이벤트 발생 : 변경후                
        };
        
        /**
         * @method indexOfName 이름으로 index값 조회
         * @param {string} p_name 
         */
        PropertyCollection.prototype.indexOfName = function(p_name) {
            
            var obj;
            
            if (typeof p_name !== "string")  throw new Error("Only [p_name] type 'string' can be added");
            
            obj = this[p_name];

            return this._element.indexOf(obj);;
        };

        /**
         * @method propertyOf 배열속성 이름 찾기
         * @param {Number} p_idx 인덱스
         * @returns {String}
         */
        PropertyCollection.prototype.propertyOf = function(p_idx) {
            return this.properties[p_idx];
        };

        return PropertyCollection;

    }(BaseCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = PropertyCollection;
    } else {
        global._W.Collection.PropertyCollection = PropertyCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Collection.PropertyObjectCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var PropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        PropertyCollection  = require("./collection-property");
    } else {
        util                = global._W.Common.Util;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    
    //==============================================================
    // 4. 모듈 구현    
     //---------------------------------------
     var PropertyObjectCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function PropertyObjectCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Object;
        }
        util.inherits(PropertyObjectCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        PropertyObjectCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            if (!(p_value && typeof p_value !== "object")) throw new Error("p_name param request fail...");

            return _super.prototype.add.call(this, p_name, p_value);
        };
        
        /**
         * EntityTable 타입만 들어가게 제약조건 추가
         * @override
         */
        // PropertyObjectCollection.prototype._getPropDescriptor = function(p_idx) {
        //     return {
        //         get: function() { return this._element[p_idx]; },
        //         set: function(newValue) { 
        //             if (newValue instanceof Object) {
        //                 this._element[p_idx] = newValue;
        //             } else {
        //                 throw new Error("Only [Object] type instances can be added");
        //             }
        //         },
        //         enumerable: true,
        //         configurable: true
        //     };
        // };


        // TODO::
        
        return PropertyObjectCollection;
    
    }(PropertyCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = PropertyObjectCollection;
    } else {
        global._W.Collection.PropertyObjectCollection = PropertyObjectCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Collection.PropertyFunctionCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var PropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        PropertyCollection  = require("./collection-property");
    } else {
        util                = global._W.Common.Util;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    
    //==============================================================
    // 4. 모듈 구현    
     //---------------------------------------
     var PropertyFunctionCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function PropertyFunctionCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Function;
        }
        util.inherits(PropertyFunctionCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        PropertyFunctionCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            if (!(p_value && typeof p_value !== "function")) throw new Error("p_name param request fail...");

            return _super.prototype.add.call(this, p_name, p_value);
        };
        
        /**
         * EntityTable 타입만 들어가게 제약조건 추가
         * @override
         */
        // PropertyFunctionCollection.prototype._getPropDescriptor = function(p_idx) {
        //     return {
        //         get: function() { return this._element[p_idx]; },
        //         set: function(newValue) { 
        //             if (newValue instanceof Function) {
        //                 this._element[p_idx] = newValue;
        //             } else {
        //                 throw new Error("Only [Function] type instances can be added");
        //             }
        //         },
        //         enumerable: true,
        //         configurable: true
        //     };
        // };


        // TODO::
        
        return PropertyFunctionCollection;
    
    }(PropertyCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = PropertyFunctionCollection;
    } else {
        global._W.Collection.PropertyFunctionCollection = PropertyFunctionCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.MetaObject
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IObject;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필
        
        IObject             = require("./i-object");
    } else {
        IObject             = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof IObject === "undefined") throw new Error("[IObject] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var MetaObject  = (function () {
        /**
         * @class 메타 최상위 클래스 (실체)
         */
        function MetaObject() {
            
            // 구현할 인터페이스 선언
            this._implements(IObject);
        }
        
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        MetaObject.prototype.getTypes  = function() {
            
            var type = ["MetaObject"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 상위 클래스 또는 인터페이스 구현 여부 
         * @param {String} p_name 클래스, Function 이름
         * @returns {Boolean}
         */
        MetaObject.prototype.instanceOf  = function(p_name) {

            var arr = this.getTypes();
    
            if (typeof p_name !== "string") throw new Error("Only [p_name] type name 'string' can be added");
        
            if (this._interface) {
                for (var i = 0; i < this._interface.length; i++) {
                    arr.push(this._interface[i].name);
                }
            }
        
            return arr.indexOf(p_name) > -1;
        };



        return MetaObject;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = MetaObject;
    } else {
        global._W.Meta.MetaObject = MetaObject;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.MetaElement
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaObject;
    var IMarshal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필

        util                = require("./utils");
        MetaObject          = require("./meta-object");
        IMarshal            = require("./i-marshal");

    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        IMarshal            = global._W.Interface.IMarshal;

    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof IMarshal === "undefined") throw new Error("[IMarshal] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var MetaElement  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            p_name = p_name || "";
            
            this.__GUID = null;

            this.name = p_name;
            
            /**
             * @interface IMarshal 인터페이스 선언
             */
            this._implements(IMarshal);            
        }
        util.inherits(MetaElement, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        MetaElement.prototype.getTypes = function() {
            
            var type = ["MetaElement"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * @private
         * @method GUID 생성
         */
        MetaObject.prototype.__newGUID  = function() {
            return util.createGUID();
        };

        /**
         * 조건 : GUID는 한번만 생성해야 함
         * @method GUID 얻기
         */
        MetaObject.prototype.getGUID  = function() {
            if (this.__GUID === null) {
                this.__GUID = this.__newGUID();
            }
            return this.__GUID;
        };

        /**
         * @method 객체 얻기 : 추상메소드
         */
        MetaElement.prototype.getObject  = function(p_context) {
            // throw new Error("[ getObject() ] Abstract method definition, fail...");

            var obj     = {};

            for (var prop in this) {
                if (this[prop] instanceof MetaElement) {
                    obj[prop] = this[prop].getObject(p_context);
                } else if (typeof this[prop] !== "function" && prop.substr(0, 1) !== "_") {
                    obj[prop] = this[prop];
                }
            }
            return obj;                        
        };

        return MetaElement;
    
    }(MetaObject));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = MetaElement;
    } else {
        global._W.Meta.MetaElement = MetaElement;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.ComplexElement
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                   = global._W || {};
    global._W.Meta              = global._W.Meta || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaElement;
    var IPropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필

        util                    = require("./utils");
        MetaElement             = require("./meta-element");
        IPropertyCollection     = require("./i-collection-property");

    } else {
        util                    = global._W.Common.Util;
        MetaElement             = global._W.Meta.MetaElement;
        IPropertyCollection     = global._W.Interface.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof IPropertyCollection === "undefined") throw new Error("[IPropertyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var ComplexElement  = (function (_super) {
        /**
         * @class
         */
        function ComplexElement() {
            _super.call(this);

            var __element = [];
            /**
             * TODO::
             * @implements
             */
            Object.defineProperty(this, "count", 
            {
                get: function() { return __element.length; },
                configurable: true,
                enumerable: true
            });
            Object.defineProperty(this, "list", 
            {
                get: function() { return __element; },
                configurable: true,
                enumerable: true
            });

             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IPropertyCollection);                
        }
        util.inherits(ComplexElement, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        ComplexElement.prototype.getTypes  = function() {
                            
            var type = ["ComplexElement"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };        
        
        // TODO::
        ComplexElement.prototype.add  = function() {};
        ComplexElement.prototype.remove  = function() {};
        ComplexElement.prototype.removeAt  = function() {};
        ComplexElement.prototype.clear  = function() {};
        ComplexElement.prototype.indexOf  = function() {};
        ComplexElement.prototype.contains  = function() {};
        ComplexElement.prototype.propertyOf  = function() {};

        return ComplexElement;
    
    }(MetaElement));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ComplexElement;
    } else {
        global._W.Meta.ComplexElement = ComplexElement;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Entity.Item
 * @namespace _W.Meta.Entity.ItemCollection
 * @namespace _W.Meta.Entity.ItemViewCollection
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
    var PropertyCollection;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        MetaElement         = require("./meta-element");
        PropertyCollection  = require("./collection-property");
    } else {
        util                = global._W.Common.Util;
        MetaElement         = global._W.Meta.MetaElement;
        PropertyCollection  =  global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    var Item  = (function (_super) {
        /**
         * @class 
         * @param {String} p_name 아이템명
         * @param {Entity} p_entity 소유 Entity
         */
        function Item(p_name, p_entity, p_property) {
            _super.call(this, p_name);

            var __entity        = null;
            var __type          = "string";
            var __size          = 0;
            var __default       = "";
            var __caption       = "";
            var __isNotNull     = false;
            var __callback      = null;
            var __constraints   = [];
            var __codeType      = null;
            var __order         = 100;
            var __increase      = 100;      // order 의 자동 추가수
            var __getter        = function() { return this.__value; };
            var __setter        = function(val) { 
                if(["number", "string", "boolean"].indexOf(typeof val) < 0) throw new Error("Only [value] type 'number, string, boolean' can be added");
                this.__value = val;
            }

            this.__value         = null;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity.instanceOf("Entity")) {
                __entity    = p_entity;
                __order     = __entity.items.count === 0 ? __order : __entity.items[__entity.items.count - 1].order + __increase;
            }

            /** @property {entity} */
            Object.defineProperty(this, "entity", 
            {
                get: function() { return __entity; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if (newValue && !newValue.instanceOf("Entity")) throw new Error("Only [entity] type 'Entity' can be added");
                    __entity = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {type} */
            Object.defineProperty(this, "type", 
            {
                get: function() { return __type; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if(typeof newValue !== "string") throw new Error("Only [type] type 'string' can be added");
                    __type = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {size} */
            Object.defineProperty(this, "size", 
            {
                get: function() { return __size; },
                set: function(newValue) { 
                    if(typeof newValue !== "number") throw new Error("Only [size] type 'number' can be added");
                    __size = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {default} */
            Object.defineProperty(this, "default", 
            {
                get: function() { return __default; },
                set: function(newValue) { 
                    if(typeof newValue !== "undefined" && newValue !== null &&  ["string", "number", "boolean"].indexOf(typeof newValue) < 0) throw new Error("Only [default] type 'string | boolea | number' can be added");
                    __default = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {caption} */
            Object.defineProperty(this, "caption", 
            {
                get: function() { return __caption; },
                set: function(newValue) { 
                    if(typeof newValue !== "string") throw new Error("Only [caption] type 'string' can be added");
                    __caption = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {isNotNull} */
            Object.defineProperty(this, "isNotNull", 
            {
                get: function() { return __isNotNull; },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isNotNull] type 'boolean' can be added");
                    __isNotNull = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {callback} */
            Object.defineProperty(this, "callback", 
            {
                get: function() { return __callback; },
                set: function(newValue) { 
                    if(newValue !== null && typeof newValue !== "function") throw new Error("Only [callback] type 'function' can be added");
                    __callback = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {constraints} */
            Object.defineProperty(this, "constraints", 
            {
                get: function() { return __constraints; },
                set: function(newValue) { 
                    var list = [];
                    
                    // 배열로 일반화
                    if (Array.isArray(newValue))  list = newValue;
                    else list.push(newValue);

                    // 유효성 검사
                    for(var i = 0; list.length > i; i++) {
                        if (typeof list[i].regex !== "object" || typeof list[i].msg !== "string") {
                            throw new Error("Only [constraints] type '{regex:object, msg:string, ?code:number}' can be added");
                        }
                    }
                    __constraints = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {codeType} */
            Object.defineProperty(this, "codeType", 
            {
                get: function() { return __codeType; },
                set: function(newValue) { __codeType = newValue; },
                configurable: true,
                enumerable: true
            });

            /** @property {order} */
            Object.defineProperty(this, "order", 
            {
                get: function() { return __order; },
                set: function(newValue) { 
                    if(typeof newValue !== "number") throw new Error("Only [order] type 'number' can be added");
                    __order = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {increase} */
            Object.defineProperty(this, "increase", 
            {
                get: function() { return __increase; },
                set: function(newValue) { 
                    if(typeof newValue !== "number") throw new Error("Only [increase] type 'number' can be added");
                    __increase = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            /** @property {value} */
            Object.defineProperty(this, "value", 
            {
                get: __getter,
                set: __setter,
                configurable: true,
                enumerable: true
            });

            /** @property {value} */
            Object.defineProperty(this, "getter", 
            {
                get: function() { return __getter; },
                set: function(val) { 
                    if(val !== null && typeof val !== "function") throw new Error("Only [getter] type 'function' can be added");
                    __getter = val;
                    Object.defineProperty(this, "value", {
                        get: __getter,
                        configurable: true,
                        enumerable: true
                    });
                },
                configurable: true,
                enumerable: true
            });

            /** @property {value} */
            Object.defineProperty(this, "setter", 
            {
                get: function() { return __setter; },
                set: function(val) { 
                    if(val !== null && typeof val !== "function") throw new Error("Only [setter] type 'function' can be added");
                    __setter = val;
                    Object.defineProperty(this, "value", {
                        set: __setter,
                        configurable: true,
                        enumerable: true
                    });
                },
                configurable: true,
                enumerable: true
            });


            // 아이템 옵션속성 추가
            if (typeof p_property === "object" ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    [
                        "entity", "type", "size", "default", "caption", 
                        "isNotNull", "callback", "constraints", 
                        "codeType", "order", "increase", "value", "getter", "setter", 
                    ].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            } else if (["number", "string", "boolean"].indexOf(typeof p_property) > -1) {
                this.default = p_property;
            }

        }
        util.inherits(Item, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Item.prototype.getTypes  = function() {
                    
            var type = ["Item"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** @override */
        Item.prototype.clone = function() {
            
            var clone = new Item(this.name);
            var constraints = [];

            if (this.entity) clone["entity"]            = this.entity;  // 참조값
            if (this.type) clone["type"]                = this.type;
            if (this.size) clone["size"]                = this.size;
            if (this.default) clone["default"]          = this.default;
            if (this.caption) clone["caption"]          = this.caption;
            if (this.isNotNull) clone["isNotNull"]      = this.isNotNull;
            if (this.callback) clone["callback"]        = this.callback;
            for (var i = 0; this.constraints.length > i; i++) {
                constraints.push(this.constraints[i]);
            }
            if (this.constraints) clone["constraints"]  = constraints;
            if (this.codeType) clone["codeType"]        = this.codeType;  // 참조값
            if (this.order) clone["order"]              = this.order;
            if (this.increase) clone["increase"]        = this.increase;
            if (this.value) clone["value"]              = this.value;
            if (this.getter) clone["getter"]            = this.getter;
            if (this.getter) clone["setter"]            = this.setter;

            return clone;
        };

        /** @override */
        Item.prototype.getObject = function() {
            // TODO::
        };

        /**
         * @method
         */
        Item.prototype.setConstraint = function(p_regex, p_msg, p_code, p_return) {
            p_return = p_return || false;

            var constraint = {};

            if (!(p_regex instanceof RegExp)) throw new Error("Only [p_regex] type 'RegExp' can be added");
            if (!(typeof p_msg === "string")) throw new Error("Only [p_msg] type 'string' can be added");

            constraint.regex = p_regex;
            constraint.msg = p_msg;
            constraint.code = p_code;
            constraint.return = p_return;
            
            this.constraints.push(constraint);
        };

        /**
         * @method
         */
        Item.prototype.defineValueProperty = function(p_getter, p_setter) {

            // 타입검사 
            if(typeof p_getter !== "undefined" && typeof p_getter !== "function") {
                throw new Error("Only [p_getter] type 'function' can be added");
            }
            if(typeof p_setter !== "undefined" && typeof p_setter !== "function") {
                throw new Error("Only [p_getter] type 'function' can be added");
            }

            // 기본값 설정
            p_getter = p_getter || function() { return this.__value; };
            p_setter = p_setter || function(val) { this.__value = val; };

            /** @event */
            Object.defineProperty(this, "value", {
                enumerable: true,
                configurable: true,
                get: p_getter,
                set: p_setter
            });
        };
        
        /**
         * 
         * @param {*} p_value 
         * @param {*} r_result 
         * @param {Number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
         */
        Item.prototype.valid = function(p_value, r_result, p_option) {
            // 기본값
            p_option = p_option || 1;   
            r_result.msg = "";
            r_result.code = "";
            p_value = p_value || "";
            
            var result;

            if (!(typeof p_value === "string")) throw new Error("Only [p_value] type 'string' can be added");
            
            // 우선순위 높음
            for(var i = 0; this.constraints.length > i; i++) {

                result = p_value.match(this.constraints[i].regex);

                if ((this.constraints[i].return !== true && result !== null) ||
                    (this.constraints[i].return === true && result === null)) {

                    r_result.msg   = this.constraints[i].msg;
                    r_result.code  = this.constraints[i].code;
                    return false;
                }

                // if (result !== null) {
                //     r_result.msg   = this.constraints[i].msg;
                //     r_result.code  = this.constraints[i].code;
                //     return false;
                // }
            }
            
            // Null 검사
            if ((p_option === 1 && this.isNotNull === true && p_value.trim().length <= 0) || 
                (p_option === 2 && p_value.trim().length <= 0)) {
                
                r_result.msg   = this.caption+"("+this.name+")은  공백을 입력할 수 없습니다.";
                r_result.code  = 0;
                return false;
            }
            return true;
        };

        return Item;
    
    }(MetaElement));

    //---------------------------------------
    var ItemCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function ItemCollection(p_onwer) {
            _super.call(this, p_onwer);
            
            this.elementType = Item;    // 기본 컬렉션 타입
            
            Object.defineProperty(this, "itemType", 
            {
                get: function() { return this.elementType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error("Only [Item] type 'Item' can be added");
                    this.elementType = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            
        }
        util.inherits(ItemCollection, _super);
        
        ItemCollection.prototype.contains = function(p_elem) {
            if (p_elem instanceof Item) {
                return this.indexOfName(p_elem.name) > -1;
            } else {
                return _super.prototype.contains.call(this, p_elem);
            }
        };

        ItemCollection.prototype.addValue  = function(p_name, p_value) {

            var item;
            var property = {};

            if (typeof p_name !== "string") throw new Error("There is no required value [p_name].");
            if(["number", "string", "boolean"].indexOf(typeof p_value) < 0) throw new Error("Only [value] type 'number, string, boolean' can be added");
            
            property = { value: p_value}

            item = new this.itemType(p_name, this._onwer, property);

            return this.add(item);
        };

        /**
         * Item 타입만 들어가게 제약조건 추가
         * @override
         */
        // ItemCollection.prototype._getPropDescriptor = function(p_idx) {
        //     return {
        //         get: function() { return this._element[p_idx]; },
        //         set: function(newValue) { 
        //             if (newValue instanceof Item) {
        //                 this._element[p_idx] = newValue;
        //             } else {
        //                 throw new Error("Only [Item] type instances can be added");
        //             }
        //         },
        //         enumerable: true,
        //         configurable: true
        //     };
        // };


        // TODO::
        
        return ItemCollection;
    
    }(PropertyCollection));


    //---------------------------------------
    var ItemViewCollection  = (function (_super) {
        /**
         * @class
         * @constructor
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemViewCollection(p_onwer, p_baseCollection) {
            _super.call(this, p_onwer);

            // if (typeof p_baseCollection !== "undefined" && !(p_baseCollection instanceof ItemCollection)) {
            if (p_baseCollection && !(p_baseCollection instanceof ItemCollection)) {
                throw new Error("Error!! ItemCollection object [p_baseCollection].");
            }
            
            /**
             * @protected @member
             */
            this._baseCollection = p_baseCollection;
        }
        util.inherits(ItemViewCollection, _super);

        /**
         *  - base(all),    string | Itme, Collection   => Collection 에 생성후 자신에 등록 
         *  - base(N),      string | Itme               => this 에 생성후 자신에 등록
         *  - base(Y),      string | Item               => Base 에 생성후 자신에 등록
         * 
         *  TODO:: filter 옵션 : 충돌방지에 이용
         *  TODO:: 객체 비교는 string 이 아니고 값과 타입을 비교해야함 (그래야 참조를 사용)
         * 
         * @param {String, Item} p_object 
         * @param {?ItemCollection} p_baseCollection
         */
        ItemViewCollection.prototype.add  = function(p_object, p_baseCollection) {
            
            
            // string                       => 생성 및 자신에 등록
            // string <base>                => 생성 및 소유처에 등록
            // Item                         => 생성 및 자신에 등록
            // Item <base>                  => 생성 및 소유처에 등록
            // string, collection           => 참조만 등록
            // string, collection <base>    => 참조만 등록
            
            var item;
            var collection;
            var i_name;
            var i_value;

            if (p_object instanceof Item) {
                if (p_object.entity === null) p_object.entity = this._onwer;
                i_name = p_object.name;
                i_value = p_object;
            } else if (typeof p_object === "string") {
                i_name = p_object;
                i_value = new this.itemType(i_name, this._onwer);
            } else {
                throw new Error("p_object string | Item instance param request fail...");
            }

            // TODO:: 이름 충돌검사

            if (p_baseCollection instanceof ItemCollection) {            // 전달값으로 기본컬렉션 지정시
                collection = p_baseCollection;
            } else if (this._baseCollection instanceof ItemCollection) { // 기본컬렉션 존재시
                collection = this._baseCollection;
            }
            
            // 기본참조 컬렉션 또는 전달참조 컬렉션인 경우
            if (collection) {
                // if (collection.contains(i_name)) {
                if (collection.contains(collection[i_name])) {
                    // item = collection[i_name];                      // 참조 가져옴
                    i_value = collection[i_name];                      // 참조 가져옴
                } else {
                    // item = collection.add(p_object);                // 컬렉션에 등록
                    i_value = collection.add(p_object);                // 컬렉션에 등록
                }
                
                // REVIEW:: 의존성을 낮추기 위해서 검사후 등록
                // 소유객체에 참조 등록 (중복제거됨)
                if (this._onwer._regRefer) {
                    this._onwer._regRefer(collection._onwer);
                }
            }
            
            // item = item || p_object;
            
            return _super.prototype.add.call(this, i_name, i_value);
            // return _super.prototype.add.call(this, item);           // 자신에 등록
        };

        ItemViewCollection.prototype.addEntity  = function(p_entity) {
            if (typeof p_entity === "undefined" || 
                typeof p_entity.instanceOf === "undefined" || 
                !p_entity.instanceOf("Entity")) {
                throw new Error("There is no required value [p_name].");
            }

            for (var i = 0; p_entity.items.count > i; i++) {
                this.add(p_entity.items[i]);
            }
        };
        
        return ItemViewCollection;
    
    }(ItemCollection));

    //---------------------------------------
    var ItemTableCollection  = (function (_super) {
        /**
         * @class
         * @constructor
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemTableCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(ItemTableCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        ItemTableCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                // i_value = new Item(i_name, this._onwer);
                i_value = new this.itemType(i_name, this._onwer);
            // } else if (p_object instanceof Item) {
            } else if (p_object instanceof this.itemType) {
                // i_name  = p_object.name;
                // i_value = p_object;
                // EntityTable은 직접만 적용(참조형 아이템 소유 못함)
                i_name  = p_object.name;
                i_value = p_object.clone();
                i_value.entity = this._onwer;
            } else {
                throw new Error("string | Item object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            return _super.prototype.add.call(this, i_name, i_value);
        };

        return ItemTableCollection;
    
    }(ItemCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
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

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Entity.ItemDOM
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
    var Item;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        Item                = require("./entity-item").Item;
    } else {
        util                = global._W.Common.Util;
        Item                = global._W.Meta.Entity.Item;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var ItemDOM  = (function (_super) {
        /**
         * @class
         */
        function ItemDOM(p_name, p_entity, p_option) {
            _super.call(this, p_name, p_entity, p_option);

            var __domType       = null;
            var __isReadOnly    = false;
            var __isHide        = false;
            var __element       = null;

            /** @property {domType} */
            Object.defineProperty(this, "domType", 
            {
                get: function() { return __domType; },
                set: function(newValue) { 
                    // TODO:: 자료종류 {input: {type: "text"...}} 만들어야함
                    if(typeof newValue !== "object") throw new Error("Only [domType] type 'object' can be added");
                    __domType = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {isReadOnly} */
            Object.defineProperty(this, "isReadOnly", 
            {
                get: function() { return __isReadOnly; },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isReadOnly] type 'boolean' can be added");
                    __isReadOnly = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {isHide} */
            Object.defineProperty(this, "isHide", 
            {
                get: function() { return __isHide; },
                set: function(newValue) { 
                    if(typeof newValue !== "boolean") throw new Error("Only [isHide] type 'boolean' can be added");
                    __isHide = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {element} */
            Object.defineProperty(this, "element", 
            {
                get: function() { return __element; },
                set: function(newValue) { 
                    if(typeof newValue !== "object") throw new Error("Only [element] type 'object' can be added");
                    __element = newValue;
                },
                configurable: true,
                enumerable: true
            });

            if (typeof p_option === "object" ) {
                for(var prop in p_option) {
                    if (p_option.hasOwnProperty(prop) && 
                        ["domType", "isReadOnly", "isHide", "element"].indexOf(prop) > -1) {
                        this[prop] = p_option[prop];
                    }
                }
            } 
        }
        util.inherits(ItemDOM, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        ItemDOM.prototype.getTypes  = function() {
                    
            var type = ["ItemDOM"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        ItemDOM.prototype.clone  = function() {
                    
            var top = _super.prototype.clone.call(this);
            var clone = new ItemDOM(this.name);

            for(var prop in top) {
                if (top.hasOwnProperty(prop)) {
                    if (top[prop]) clone[prop] = top[prop];
                }
            }

            if (this.domType) clone["domType"]          = this.domType;     // 참조값
            if (this.isReadOnly) clone["isReadOnly"]    = this.isReadOnly;
            if (this.isHide) clone["isHide"]            = this.isHide;
            if (this.isHide) clone["element"]           = this.element;
            
            return clone;
        };

        /**
         * 상위 Item.value 의 특성을 오버라이딩함
         * @param {Function} p_getter 
         * @param {Function} p_setter 
         */
        ItemDOM.prototype.defineValueProperty  = function(p_getter, p_setter) {
            p_getter = p_getter || function() { return this.value };
            p_setter = p_setter || function(val) { this.value = val };

            // 유효성 검사
            if (typeof p_getter !== "function") throw new Error("Only [p_getter] type 'function' can be added");
            if (typeof p_setter !== "function") throw new Error("Only [p_setter] type 'function' can be added");

            Object.defineProperty(this, "value", 
            {
                get: p_getter,
                set: p_setter,
                configurable: true,
                enumerable: true
            });
        };

        /** @override */
        ItemDOM.prototype.getObject = function() {
            // TODO::
        };

        ItemDOM.prototype.toEntityColumn = function() {
            // TODO::
        };

        return ItemDOM;
    
    }(Item));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ItemDOM;
    } else {
        global._W.Meta.Entity.ItemDOM = ItemDOM;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Entity.Row
 * @namespace _W.Meta.Entity.RowCollection
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
    // var Entity;
    var PropertyCollection;
    var ArrayCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        // Entity              = require("./entity-base");
        PropertyCollection  = require("./collection-property");
        ArrayCollection     = require("./collection-array");
    } else {
        util                = global._W.Common.Util;
        // Entity              = global._W.Meta.Entity;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ArrayCollection     = global._W.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    // if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof ArrayCollection === "undefined") throw new Error("[ArrayCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var Row  = (function (_super) {
        /**
         * @abstract @class
         */
        function Row(p_entity) {
            _super.call(this, p_entity);
            
            var __entity        = null;
            var itemName;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity.instanceOf("Entity")) {
                __entity    = p_entity;

                for (var i = 0; i < __entity.items.count; i++) {
                    itemName = __entity.items[i].name;
                    _super.prototype.add.call(this, itemName, null);
                }
            }

            /** @property {entity} */
            Object.defineProperty(this, "entity", 
            {
                get: function() { return __entity; },
                configurable: true,
                enumerable: true
            });            
        }
        util.inherits(Row, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Row.prototype.getTypes  = function() {
                    
            var type = ["Row"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * @param {Object} p_filter 필터객체
         */
        Row.prototype.copy = function(p_filter) {
          
            var clone = new Row(this.entity);
            
            if (this.value) clone["value"]               = this.value;
        };
        
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
         * @class
         * @param {*} p_onwer 소유자 
         */
        function RowCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Row;   // 컬렉션타입 설정
        }
        util.inherits(RowCollection, _super);

        /**
         * 
         * @param {String | Item} p_row 
         * @returns {Item} 등록한 아이템
         */
        RowCollection.prototype.add  = function(p_row) {

            var i_value;

            if (typeof p_row === "undefined") {      
                i_value = new Row(this._onwer);
            } else if (p_row instanceof Row) {
                i_value = p_row;``
            } else {
                throw new Error("Row | Row object [p_row].");
            }

            return _super.prototype.add.call(this, i_value);
        };

        /**
         * Row 타입만 들어가게 제약조건 추가
         * @override
         */
        // RowCollection.prototype._getPropDescriptor = function(p_idx) {
        //     return {
        //         get: function() { return this._element[p_idx]; },
        //         set: function(newValue) { 
        //             if (newValue instanceof Row) {
        //                 this._element[p_idx] = newValue;
        //             } else {
        //                 throw new Error("Only [Row] type instances can be added");
        //             }
        //         },
        //         enumerable: true,
        //         configurable: true
        //     };
        // };


        // TODO::
        
        return RowCollection;
        
    }(ArrayCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.Row = Row;
        module.exports.RowCollection = RowCollection;
    } else {
        global._W.Meta.Entity.Row = Row;
        global._W.Meta.Entity.RowCollection = RowCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
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
            
            if(!this.items.contains(this.items[p_name])) this.items.add(p_name);
            
            if (typeof p_property === "object" ) {
                for(var prop in p_property) {
                    this.items[p_name][prop] = p_property[prop];
                }
            }
        };

        /**
         * 빈 row 채우기
         * @param {*} p_target 
         */
        Entity.prototype.__fillRow  = function(p_target) {
            
            var itemName;
            
            for (var i = 0 ; i < this.rows.count; i++) {
                for (var ii = 0; ii < p_target.items.count; ii++) {
                    itemName = p_target.items[ii].name;
                    if (typeof this.rows[i][itemName] === "undefined") {
                        this.rows[i].add(itemName, "");
                    }
                }
            }            
        };

        Entity.prototype.__loadJSON  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기
            
            var entity;
            var row;
            var itemName;

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
            if (this.items.count > 0 && entity.rows && entity.rows[0]) {
                for(var i = 0; entity.rows.length > i; i++) {
                    
                    row = this.newRow();
                    for (var prop in entity.rows[i]) {
                        if (entity.rows[i].hasOwnProperty(prop) && typeof row[prop] !== "undefined") {
                            row[prop] = entity.rows[i][prop];
                        }
                    }
                    if (row.count) this.rows.add(row);
                }
            } 
            
            // 빈 Row 채우기
            for (var i = 0 ; i < this.rows.count; i++) {
                for (var ii = 0; ii < this.items.count; ii++) {
                    itemName = this.items[ii].name;
                    if (typeof this.rows[i][itemName] === "undefined") {
                        this.rows[i].add(itemName, "");
                    }
                }
            }   
        };

        Entity.prototype.__loadEntity  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기

            var entity = p_object;
            var row;
            var itemName;

            // 병합
            if (p_option === 1) {
                // Item 기준으로 아이템 가져오기
                for(var i = 0; entity.items.count > i; i++) {
                    itemName = entity.items[i].name;
                    if (typeof this.items[itemName] === "undefined") this.items.add(entity.items[i]);
                }
            }
            
            // Row 데이터 가져오기
            for(var i = 0; entity.rows.count > i; i++) {
                
                row = this.newRow();

                for (var ii = 0; ii < this.items.count; ii++) {
                    itemName = this.items[ii].name;
                    
                    // row[itemName] = typeof entity.rows[i][itemName] !== "undefined" ? entity.rows[i][itemName] : "";
                    // 이해하기 쉽게 코드 변경
                    if (typeof entity.rows[i][itemName] !== "undefined") {
                        row[itemName] = entity.rows[i][itemName];    
                    } else {
                        row[itemName] = "";
                    }
                }
                this.rows.add(row);
            }

            if (p_option === 1) this.__fillRow(entity);
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Entity.prototype.getTypes = function() {
            
            var type = ["Entity"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override */
        Entity.prototype.getObject = function() {
            // TODO::
        };

        Entity.prototype.newRow  = function() {
            return new Row(this);
        };

        Entity.prototype.setValue  = function(p_row) {
            
            if (!(p_row instanceof Row)) throw new Error("Only [p_row] type 'Row' can be added");

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

        /** 
         * filter = {
         *  __except : ["name"...],        // 제외 아이템 (1방법)
         *  아이템명: { __except: true }    // 아이템 제외 (2방법)
         *  아이템명: { order: 100 }        // 속성 오버라이딩
         * }
         * ** 상속기법을 이용함
         * @param {Object} p_filter 필터객체
         * @param {?Number | Array<Number>} p_index 인덱스 시작번호 또는 목록
         * @param {?Number} p_end 인덱스 종료번호
         * @return {Entity}
         */
        Entity.prototype.select  = function(p_filter, p_index, p_end) {
            
            var EXECEPT = '__except';
            var list = [];
            var excepts = [];
            var obj, f;
            var filterItem;
            

            // 자신의 생성자로 생성
            // REVIEW:: 이후에 복제로 변경 검토
            var entity = new this.constructor(this.name);   
            var idx;

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

            list.sort(function(a, b) { return a.order - b.order; });

            // 리턴 Entity 의 Item 구성 : 참조형
            for(var i = 0; i < list.length; i++) {
                entity.items.add(list[i]);
            }
            
            /**
             * row 항목을 재구성하여 생성 (내부 함수)
             * @param {*} rowIdx 
             */
            function __createRow(rowIdx, orgEntity) {

                var row = entity.newRow();
                var i_name;

                for (var i = 0; entity.items.count > i ; i++) {
                    i_name = entity.items[i].name;
                    if (typeof row[i_name] !== "undefined" && typeof orgEntity.rows[rowIdx][i_name] !== "undefined") {
                        row[i_name] = orgEntity.rows[rowIdx][i_name];
                    }
                }
                return row;
            }

            // 리턴 Entity 의 Row 구성 : 참조형
            if (typeof p_index === "number") {
                for(var i = p_index; i < this.rows.count; i++) {
                    // entity.rows.add(this.rows[idx]);
                    entity.rows.add(__createRow(i, this));
                    if (typeof p_end === "number" && i === p_end) break;
                }
            } else if (Array.isArray(p_index)) {
                for(var i = 0; i < p_index.length; i++) {
                    idx = p_index[i];
                    if (typeof idx === "number" && typeof this.rows[idx] !== "undefined") {
                        // entity.rows.add(this.rows[idx]);
                        entity.rows.add(__createRow(idx, this));
                    }
                }
            }
            
            return entity;
        };

        /**@abstract IGroupControl */
        Entity.prototype.copy  = function(p_filter, p_index, p_end) {
            
            var entity = this.select(p_filter, p_index, p_end);

            return entity.clone();

        };

        /**
         * "구조를 구성하는게 주용도임"
         * 병합 : 컬렉션 순서에 따라 병한다.
         * * @param {*} p_target 병합할 Entity
         * @param {*} p_option {item: 1, row:2}
         * Item과 Row가 있는 경우
         * - 1 items, rows 병합 (기존유지) *기본값
         * - 2 items, rows 병합 (덮어쓰기)  
         * - 3 row 안가져오기    (기존유지)
         */
        Entity.prototype.merge  = function(p_target, p_option) {
            p_option = p_option || 1;    // 기본값

            var cloneTarget;
            var row;
            var itemName;
            // var rowMax;

            // 유효성 검사
            if (!(p_target instanceof Entity)) throw new Error("Only [p_target] type 'Entity' can be added");

            // 병합 : Item 기준으로 아이템 가져오기
            for(var i = 0; p_target.items.count > i; i++) {
                itemName = p_target.items[i].name;
                
                // 없으면 생성
                if (typeof this.items[itemName] === "undefined") {
                    this.items.add(p_target.items[i]);
                }
                
                // option = 2: 기존 item 덮어쓰기
                if (p_option === 2 && typeof this.items[itemName] !== "undefined") {
                    this.items[itemName] = p_target.items[itemName];
                }
            }

            if (p_option !== 3) {
                // Row 데이터 가져오기
                for(var i = 0; p_target.rows.count > i; i++) {
                    
                    if (typeof this.rows[i] !== "undefined") {  // this.rows 있는 경우
                        row = this.rows[i];
                        for (var ii = 0; ii < p_target.items.count; ii++) {
                            itemName = p_target.items[ii].name;
                            if (typeof this.rows[i][itemName] === "undefined") {    // 이름이 없는 경우
                                row.add(itemName, p_target.rows[i][itemName]);
                            } else if (p_option === 2 && typeof this.rows[i][itemName] !== "undefined") {   // 덮어쓰기
                                row[itemName] = p_target.rows[i][itemName];     
                            }
                        }
                        
                    } else {                                    // this.rows 없는 경우
                        row = this.newRow();
                        for (var ii = 0; ii < p_target.items.count; ii++) {
                            itemName = p_target.items[ii].name;
                            if (p_option === 2) {   // 덮어쓰기
                                row[itemName] = p_target.rows[i][itemName];     
                            }
                        }
                        this.rows.add(row);
                    }
                }
            }

            // 공백 채우기
            this.__fillRow(p_target);
            // for (var i = 0 ; i < this.rows.count; i++) {
            //     for (var ii = 0; ii < p_target.items.count; ii++) {
            //         itemName = p_target.items[ii].name;
            //         if (typeof this.rows[i][itemName] === "undefined") {
            //             this.rows[i].add(itemName, "");
            //         }
            //     }
            // }
        };
        
        /**
         * "데이터를 가져오는게 주용도임"
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 기존에 row 가 존재하면 newRow 부터 가져오고, 기존item 은 공백이 들어감
         * @param {*} p_object Entity 는 item과 row 는 쌍으로 존재함, JSON 은 row만 존재할 수 있음
         * @param {Number} p_option 
         *          - 1: row 기준으로 가져옴, 없을시 item 생성, item 중복시 기존유지  <*기본값> 
         *          - 2: 존재하는 item 데이터만 가져오기
         */
        Entity.prototype.load  = function(p_object, p_option) {

            if (p_object instanceof Entity) {
                this.__loadEntity(p_object, p_option);
            } else {
                this.__loadJSON(p_object, p_option);
            }
        };
        
        /** @method */
        Entity.prototype.clear  = function() {
            this.items.clear();
            this.rows.clear();
        };

        /** @abstract IAllControl */
        Entity.prototype.clone  = function() {
            throw new Error("[ clone() ] Abstract method definition, fail...");
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

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Entity.EntityTable
 * @namespace _W.Meta.Entity.EntityTableCollection
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
    var PropertyCollection;
    var IGroupControl;
    var IAllControl;
    var RowCollection;
    var ItemTableCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        PropertyCollection  = require("./collection-property");
        IGroupControl       = require("./i-control-group");
        IAllControl         = require("./i-control-all");
        RowCollection       = require("./entity-row").RowCollection;
        ItemTableCollection      = require("./entity-item").ItemTableCollection;
    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        IGroupControl       = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;
        RowCollection       = global._W.Meta.Entity.RowCollection;
        ItemTableCollection      = global._W.Meta.Entity.ItemTableCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof RowCollection === "undefined") throw new Error("[RowCollection] module load fail...");
    if (typeof ItemTableCollection === "undefined") throw new Error("[ItemTableCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var EntityTable  = (function (_super) {
        /**
         * @abstract @class
         */
        function EntityTable(p_name) {
            _super.call(this, p_name);

            this.items = new ItemTableCollection(this);

            // /**
            //  * @interface IProperyCollection 인터페이스 선언
            //  */
            // this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(EntityTable, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        EntityTable.prototype.getTypes  = function() {
            
            var type = ["EntityTable"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override */
        EntityTable.prototype.getObject = function() {
            // TODO::
        };

        EntityTable.prototype.clone  = function() {
            
            var clone = new EntityTable(this.name);
            
            // items 복제본 추가
            for(var i = 0; i < this.items.count; i++) {
                clone.items.add(this.items[i].clone());
            }
            
            // rows 복제본 추가
            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone());
            }
            
            return clone;
        };

        return EntityTable;
    
    }(Entity));
    

     //---------------------------------------
     var EntityTableCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function EntityTableCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = EntityTable;   // 컬렉션타입 설정
        }
        util.inherits(EntityTableCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        EntityTableCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new EntityTable(i_name);
            } else if (p_object instanceof EntityTable) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | EntityTable object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        /**
         * EntityTable 타입만 들어가게 제약조건 추가
         * @override
         */
        // EntityTableCollection.prototype._getPropDescriptor = function(p_idx) {
        //     return {
        //         get: function() { return this._element[p_idx]; },
        //         set: function(newValue) { 
        //             if (newValue instanceof EntityTable) {
        //                 this._element[p_idx] = newValue;
        //             } else {
        //                 throw new Error("Only [EntityTable] type instances can be added");
        //             }
        //         },
        //         enumerable: true,
        //         configurable: true
        //     };
        // };


        // TODO::
        
        return EntityTableCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.EntityTable = EntityTable;
        module.exports.EntityTableCollection = EntityTableCollection;
    } else {
        global._W.Meta.Entity.EntityTable = EntityTable;
        global._W.Meta.Entity.EntityTableCollection = EntityTableCollection;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
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
    var ItemViewCollection;
    var PropertyCollection;
    var RowCollection;
    var IGroupControl;
    var IAllControl;


    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        ItemViewCollection   = require("./entity-item").ItemViewCollection;
        PropertyCollection  = require("./collection-property");
        RowCollection       = require("./entity-row").RowCollection;
        IGroupControl       = require("./i-control-group");
        IAllControl         = require("./i-control-all");

    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        ItemViewCollection   = global._W.Meta.Entity.ItemViewCollection;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        RowCollection       = global._W.Meta.Entity.RowCollection;
        IGroupControl       = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof ItemViewCollection === "undefined") throw new Error("[ItemViewCollection] module load fail...");
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
        function EntityView(p_name, p_baseEntity) {
            _super.call(this, p_name);

            var refCollection;

            if (p_baseEntity && p_baseEntity.instanceOf("Entity")) {
                refCollection = p_baseEntity.items;
            }
            
            this._refEntity = p_baseEntity;
            
            this._refEntities = [];

            this.items = new ItemViewCollection(this, refCollection);
        }
        util.inherits(EntityView, _super);

        /**
         * 뷰 참조 등록
         * @param {Entity} p_entity 
         */
        EntityView.prototype._regRefer  = function(p_entity) {
            if (!(p_entity instanceof Entity)) throw new Error("Only [p_entity] type 'Entity' can be added");
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

            // 참조 복제
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
         * @class
         * @param {*} p_onwer 소유자 
         */
        function EntityViewCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = EntityView;   // 컬렉션타입 설정
        }
        util.inherits(EntityViewCollection, _super);

        /**
         *  - string                    : 생성후   string      이름으로 등록 
         *  - string, colltion          : 생성후   string      이름으로  등록 (collection보냄)
         *  - entityView                :         entityView  이름으로 등록
         *  - entityView, collection    :         entityView  이름으로 등록 (collection보냄) => 오류발생
         * 
         * @param {String | EntityView} p_object 
         * @param {I?temCollection} p_baseEntity
         * @returns {EntityView} 등록한 아이템
         */
        EntityViewCollection.prototype.add  = function(p_object, p_baseEntity) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new EntityView(i_name, p_baseEntity);
            } else if (p_object instanceof EntityView) {
                if (p_baseEntity) throw new Error(" EntityView객체와 refEntity객체를 동시에 입력할 수 없습니다. !!");
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
        // EntityViewCollection.prototype._getPropDescriptor = function(p_idx) {
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

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Entity.EntitySet
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    // var util;
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util = require("util");
    } else {
        // global._W = global._W || {};
        // util = global._W.util || {};
    }

    //==============================================================
    // 3. 의존성 검사
    // if (typeof util === "undefined") throw new Error("[XXX] module  load fail...");


    //==============================================================
    // 4. 모듈 구현    
    // util.inherits = (function () {
    // }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    // if (typeof module === "object" && typeof module.exports === "object") {     
    //     module.exports = namespace;
    // } else {
    //     global._W.namespace = namespace;
    // }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BaseBind
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
    var Observer;
    var MetaObject;
    var Entity;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        Observer            = require("./observer");
        MetaObject          = require("./meta-object");
        Entity              = require("./entity-base");
    } else {
        util                = global._W.Common.Util;
        Observer            = global._W.Common.Observer;
        MetaObject          = global._W.Meta.MetaObject;
        Entity              = global._W.Meta.Entity.Entity;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseBind  = (function (_super) {
        /**
         * @abstract @class 추상클래스
         */
        function BaseBind() {
            _super.call(this);

            var __baseEntity;
            // var __propagation   = true;
            
            /** @private */
            this.__event    = new Observer(this, this);

            /** @property */
            Object.defineProperty(this, "_baseEntity", 
            {
                get: function() { return __baseEntity; },
                set: function(newValue) { 
                    if (!(newValue instanceof Entity)) throw new Error("Only [baseEntity] type 'Entity' can be added");
                    __baseEntity = newValue;
                },
                configurable: true,
                enumerable: true
            });  

            /** @property */
            Object.defineProperty(this, "onExecute", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "execute");
                }
            });

            /** @property */
            Object.defineProperty(this, "onExecuted", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "executed");
                }
            });

            // /** @property */
            // Object.defineProperty(this, "eventPropagation", {
            //     enumerable: true,
            //     configurable: true,
            //     set: function(p_bool) {
            //         if (typeof p_bool !== "boolean") throw new Error("Only [p_bool] type 'Boolean' can be added");
            //         // this.__event.propagation = p_bool;
            //         __propagation = p_bool;
            //     },
            //     get: function() { return __propagation; }
            //     // get: function() { return this.__event.propagation; }
            // });
        }
        util.inherits(BaseBind, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BaseBind.prototype.getTypes  = function() {
                    
            var type = ["BaseBind"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @event */
        BaseBind.prototype._onExecute = function() {
            this.__event.publish("execute"); 
        };

        /** @event */
        BaseBind.prototype._onExecuted = function() {
            this.__event.publish("executed"); 
        };

        // /** @event */
        // BaseBind.prototype._onFail = function(p_msg) {
        //     this.__event.publish("fail", p_msg); 
        // };        

        return BaseBind;
    
    }(MetaObject));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseBind;
    } else {
        global._W.Meta.Bind.BaseBind = BaseBind;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
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
         * @abstract 바인드 명령 (상위)
         * @class
         */
        function BindCommand(p_bindModel, p_baseEntity) {
            _super.call(this);
            
            var __propagation   = true;

            if (p_bindModel && !(p_bindModel.instanceOf("BindModel"))) throw new Error("Only [p_bindModel] type 'BindModel' can be added");
            if (p_baseEntity && !(p_baseEntity.instanceOf("Entity"))) throw new Error("Only [p_baseEntity] type 'Entity' can be added");

            /** @protected 소유자 */
            this._model = p_bindModel;

            this._baseEntity = p_baseEntity;

            /** @property */
            Object.defineProperty(this, "eventPropagation", {
                enumerable: true,
                configurable: true,
                set: function(p_bool) {
                    if (typeof p_bool !== "boolean") throw new Error("Only [p_bool] type 'Boolean' can be added");
                    // this.__event.propagation = p_bool;
                    __propagation = p_bool;
                },
                get: function() { return __propagation; }
                // get: function() { return this.__event.propagation; }
            });            
        }
        util.inherits(BindCommand, _super);
    

        /** @virtual */
        BindCommand.prototype.execute = function() {
            throw new Error("[ execute() ] Abstract method definition, fail...");
        };

        /** @override */
        BindCommand.prototype._onExecute = function() {
            
            _super.prototype._onExecute.call(this);                         // 자신에 이벤트 발생
            if (this.eventPropagation) this._model._onExecute();    // 모델에 이벤트 추가 발생
        };

        /** @override */
        BindCommand.prototype._onExecuted = function() {
            _super.prototype._onExecuted.call(this);
            if (this.eventPropagation) this._model._onExecuted();
        };

        // /** @override */
        // BindCommand.prototype._onFail = function(p_msg) {
        //     _super.prototype._onFail.call(this, p_msg);
        //     if (this.eventPropagation) this._model._onFail(p_msg);
        // };        

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommand.prototype.getTypes  = function() {
                    
            var type = ["BindCommand"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String> | String} p_entities <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.add = function(p_item, p_entities) {

            var entities = [];     // 파라메터 변수
            var property = [];      // 속성
            var collection;

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [p_item] type 'Item' can be added");
            }
            if (typeof p_entities !== "undefined" && (!(Array.isArray(p_entities) || typeof p_entities === "string"))) {
                throw new Error("Only [p_entities] type 'Array | string' can be added");
            } 

            // 초기화 설정
            if (Array.isArray(p_entities)) entities = p_entities;
            else if (typeof p_entities === "string") entities.push(p_entities);
            
            // baseEntity 에 아이템 없으면 등록
            if (!this._baseEntity.items.contains(p_item))  {
                this._baseEntity.items.add(p_item);
            } {

            }

            // 설정 대상 가져오기
            if (entities.length > 0) {
                for (var i = 0; i < entities.length; i++) {
                    
                    if (typeof entities[i] !== "string") throw new Error("Only [String] type instances can be added");
                   
                    // 속성 유무 검사
                    if (this[entities[i]]) {
                        property.push(entities[i]);
                    } else {
                        console.warn("Warning!! Param p_entities 에 [" + entities[i] + "]가 없습니다. ");
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
                if (this[property[i]] instanceof Entity ){
                    collection = this[property[i]].items;
                } else {
                    console.warn("Warning!! [" + property[i] + "]속성이 this 에 없습니다. ");
                }
                collection.add(p_item);
            }

        };

        /**
         * p_name으로 아이템을 p_entitys(String | String)에 다중 등록한다.
         * @param {String} p_name
         * @param {Object | String | Number | Boolean} p_value
         * @param {?Array<String> | String} p_entities <선택> 추가할 아이템 명령
         */
        BindCommand.prototype.addItem = function(p_name, p_value, p_entities) {

            var item;
            
            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            item = this._baseEntity.items.addValue(p_name, p_value);

            this.add(item, p_entities);
        };

        /**
         * 예시>
         * e.read.setEntity(['idx', 'addr'], 'valid');
         * @param {String | Array} p_names 
         * @param {?String | Array<String>} p_entities 
         */
        BindCommand.prototype.setItem = function(p_names, p_entities) {

            var names = [];     // 파라메터 변수
            var itemName;
            var item;

            // 초기화
            if (Array.isArray(p_names)) names = p_names;
            else if (typeof p_names === "string") names.push(p_names);

            // 유효성 검사
            if (names.length === 0) throw new Error("Only [p_names] type 'Array | string' can be added");

            // 아이템 검사 및 등록 함수 this.add(..) 호출
            for(var i = 0; names.length > i; i++) {
                itemName = names[i]; 
                item = this._model._baseEntity.items[itemName];
                if (typeof item !== "undefined") {
                    this.add(item, p_entities);
                } else {
                    // throw new Error("baseEntity에 [" + itemName + "] 아이템이 없습니다.");
                    console.warn("baseEntity에 [" + itemName + "] 아이템이 없습니다.");
                }
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

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModel
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
    var BaseBind;
    var ItemCollection;
    var PropertyCollection;
    var PropertyFunctionCollection;
    var IBindModel;
    var Entity;
    var EntityTable;
    var Item;
    var MetaObject;

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필

        util                        = require("./utils");
        BaseBind                    = require("./bind-base");
        ItemCollection              = require("./entity-item").ItemCollection;
        PropertyCollection          = require("./collection-property");
        PropertyFunctionCollection  = require("./collection-property-function");        
        IBindModel                  = require("./i-bind-model");        
        Entity                      = require("./entity-base");
        EntityTable                 = require("./entity-table").EntityTable;
        Item                        = require("./entity-item").Item;
        MetaObject                  = require("./meta-object");
    } else {
        util                        = global._W.Common.Util;
        BaseBind                    = global._W.Meta.Bind.BaseBind;
        ItemCollection              = global._W.Meta.Entity.ItemCollection;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        PropertyFunctionCollection  = global._W.Collection.PropertyFunctionCollection;        
        IBindModel                  = global._W.Interface.IBindModel;        
        Entity                      = global._W.Meta.Entity.Entity;        
        EntityTable                 = global._W.Meta.Entity.EntityTable;        
        Item                        = global._W.Meta.Entity.Item;        
        MetaObject                  = global._W.Meta.MetaObject;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof PropertyFunctionCollection === "undefined") throw new Error("[PropertyFunctionCollection] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel(p_objectDI)  {
            _super.call(this);

            var __attr         = new PropertyCollection(this);
            var __mode          = new PropertyFunctionCollection(this);
            var __cbRegister    = function() {};
            var __cbValid       = function() {return true};
            var __cbReady       = function() {};
            var __cbFail        = function() { console.warn("바인딩 실패하였습니다."); };
            var __cbError       = function() { console.error("바인딩 오류가 발생 하였습니다."); };
            var __itemType      = Item;

            var propObject;


            /** @property {attr} */
            Object.defineProperty(this, "attr", 
            {
                get: function() { return __attr; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyCollection)) throw new Error("Only [attr] type 'PropertyCollection' can be added");
                    __attr = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {mode} */
            Object.defineProperty(this, "mode", 
            {
                get: function() { return __mode; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyFunctionCollection)) throw new Error("Only [mode] type 'PropertyFunctionCollection' can be added");
                    __mode = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbRegister} */
            Object.defineProperty(this, "cbRegister", 
            {
                get: function() { return __cbRegister; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbRegister] type 'Function' can be added");
                    __cbRegister = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /** @property {cbValid} */
            Object.defineProperty(this, "cbValid", 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbValid] type 'Function' can be added");
                    __cbValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbReady} */
            Object.defineProperty(this, "cbReady", 
            {
                get: function() { return __cbReady; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbReady] type 'Function' can be added");
                    __cbReady = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbFail} */
            Object.defineProperty(this, "cbFail", 
            {
                get: function() { return __cbFail; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbFail] type 'Function' can be added");
                    __cbFail = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbError} */
            Object.defineProperty(this, "cbError", 
            {
                get: function() { return __cbError; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbError] type 'Function' can be added");
                    __cbError = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {itemType} */
            Object.defineProperty(this, "itemType", 
            {
                get: function() { return __itemType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error("Only [itemType] type 'Item' can be added");
                    __itemType = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // DI 의존성 주입 : 객체를 비교하여 삽입
            if (p_objectDI instanceof IBindModel) {     // 가능
                // attr 등록
                if (typeof p_objectDI["attr"] !== "undefined" && p_objectDI["attr"] !== null) {
                    propObject = p_objectDI["attr"];
                    for(var prop in propObject) {
                        if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                            __attr.add(prop, propObject[prop]);
                        }
                    }
                }
                // mode 등록
                if (typeof p_objectDI["mode"] !== "undefined" && p_objectDI["mode"] !== null) {
                    propObject = p_objectDI["mode"];
                    for(var prop in propObject) {
                        if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                            __mode.add(prop, propObject[prop]);
                        }
                    }
                }
                if (typeof p_objectDI["cbRegister"] === "function") {
                    __cbRegister = p_objectDI["cbRegister"];
                }
                if (typeof p_objectDI["cbValid"] === "function") {
                    __cbValid = p_objectDI["cbValid"];
                }
                if (typeof p_objectDI["cbReady"] === "function") {
                    __cbReady = p_objectDI["cbReady"];
                }
                if (typeof p_objectDI["cbFail"] === "function") {
                    __cbFail = p_objectDI["cbFail"];
                }
                if (typeof p_objectDI["cbError"] === "function") {
                    __cbError = p_objectDI["cbError"];
                }

                if (typeof p_objectDI["onExecute"] === "function") {
                    this.onExecute = p_objectDI["onExecute"];
                }
                if (typeof p_objectDI["onExecuted"] === "function") {
                    this.onExecuted = p_objectDI["onExecuted"];
                }
            }

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModel);            
        }
        util.inherits(BindModel, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModel.prototype.getTypes  = function() {
                    
            var type = ["BindModel"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @method */
        BindModel.prototype.init = function() {
            this.cbRegister.call(this);
            if (this.cbValid.call(this)) {
                this.cbReady.call(this)
            }
        };
        
        BindModel.prototype.addEntity = function(p_name) {

            var entity;

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            entity = new EntityTable(p_name);
            entity.items.itemType = this.itemType;    // 아이템타입 설정
            
            this[p_name] = entity;
            
            return entity;
        }

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} p_cmds <선택> 추가할 아이템 명령
         */
        BindModel.prototype.add = function(p_item, p_cmds) {

            var cmds = [];
            var property = [];      // 속성

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type 'Item' can be added");
            }
            if (typeof p_cmds !== "undefined" && (!(Array.isArray(p_cmds) || typeof p_cmds === "string"))) {
                throw new Error("Only [a_cmd] type 'Array | string' can be added");
            }
            
            // 초기화 설정
            if (Array.isArray(p_cmds)) cmds = p_cmds;
            else if (typeof p_cmds === "string") cmds.push(p_cmds);
            
            // 설정 대상 가져오기
            if (cmds.length > 0) {
                for (var i = 0; i< cmds.length; i++) {
                    
                    if (typeof cmds[i] !== "string") throw new Error("Only [String] type instances can be added");
                    
                    if (this[cmds[i]]) {
                        property.push(cmds[i]);
                    } else {
                        console.warn("Warning!! Param p_cmds 에 [" + cmds[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof MetaObject && this[prop].instanceOf("BindCommand") && prop.substr(0, 1) !== "_") {
                        property.push(prop.toString());
                    }
                }
            }
            // 설정
            for (var i = 0; i < property.length; i++) {
                this[property[i]].add(p_item);
            }
        };

        /**
         * p_name으로 아이템을 p_entitys(String | String)에 다중 등록한다.
         * @param {String} p_name
         * @param {Object | String | Number | Boolean} p_value 
         */
        BindModel.prototype.addItem = function(p_name, p_value, p_cmds) {

            var item;
            
            // 유효성 검사
            if (typeof p_name !== "string") {
                throw new Error("Only [p_name] type 'string' can be added");
            }

            item = this._baseEntity.items.addValue(p_name, p_value);

            this.add(item, p_cmds);
        };

        /**
         * 속성을 baseEntiey 또는 지정 Entity에  등록(로딩)한다.
         * @param {?String | ?Array<String>} p_attr 
         * @param {?String} p_entity 
         */
        BindModel.prototype.loadAttr = function(p_attr, p_entity) {

            var __attr = [];
            var entity;
            var propName;

            // 최기화
            if (Array.isArray(p_attr)) __attr = __attr.concat(p_attr);      // Array의 경우
            else if (typeof p_attr === "string") __attr.push(p_attr);       // String의 경우
            else __attr = this.attr.properties;                             // 없을 경우 (전체 가져옴)

            // 유효성 검사
            if (typeof p_attr !== "undefined" && (!Array.isArray(p_attr) || typeof p_attr === "string")) {
                throw new Error("Only [p_entities] type 'Array | string' can be added");
            }
            if (typeof p_entity !== "undefined" && typeof p_entity !== "string") {
                throw new Error("Only [p_entity] type 'string' can be added");
            }
            if (typeof p_entity !== "undefined" && typeof this[p_entity] === "undefined") {
                throw new Error(" BindModel에 ["+ p_entity +"]의 Entity가 없습니다. ");
            }

            entity = this[p_entity] || this._baseEntity;

            // 속성정보를 등록
            for(var i = 0; __attr.length > i; i++) {
                propName = __attr[i];
                if (typeof propName === "string" && typeof this.attr[propName] !== "undefined") {
                    if(["number", "string", "boolean"].indexOf(typeof this.attr[propName]) > -1) {
                        entity.items.addValue(propName, this.attr[propName]);
                    } else if (this.attr[propName]  !== null && typeof this.attr[propName] === "object"){
                        entity.items.add(new this.itemType(propName, entity, this.attr[propName]))
                    }
                }
            }
        };

        

        return BindModel;
    
    }(BaseBind));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModel;
    } else {
        global._W.Meta.Bind.BindModel = BindModel;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindCommandAjax
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                   = global._W || {};
    global._W.Meta              = global._W.Meta || {};
    global._W.Meta.Bind         = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommand;
    var EntityView;
    var request;        // node 전용
    var sync_request;   // node 전용
    var jquery;
    var ajax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommand             = require("./bind-command");
        EntityView              = require("./entity-view").EntityView;
        request                 = require("request");
        sync_request            = require("sync-request");
    } else {
        util                    = global._W.Common.Util;
        BindCommand             = global._W.Meta.Bind.BindCommand;
        EntityView              = global._W.Meta.Entity.EntityView;
        jquery                  = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
        ajax                    = jquery.ajax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommandAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __ajaxSetup = {
                url: "",            // 요청 경로
                type: "POST",       // 전송 방법 : GET, POST
                dataType: "json",   //
                async: true,        // [*]비동기(ture), 동기(false)
                success: null,      // 성공 콜백
                error: null,        // 실패 콜백
                complete: null      // 완료 콜백
            };

            var __valid     = new EntityView("valid", this._baseEntity);
            var __bind      = new EntityView("bind", this._baseEntity);

            var __cbValid   = function() {return true;};
            var __cbBind    = function() {};
            var __cbEnd     = function() {};

            /** @property {ajaxSetup} */
            Object.defineProperty(this, "ajaxSetup", 
            {
                get: function() { return __ajaxSetup; },
                configurable: true,
                enumerable: true
            });

            /** @property {url} */
            Object.defineProperty(this, "url", 
            {
                get: function() { return __ajaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [url] type 'string' can be added");
                    __ajaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            }); 

            /** @property {valid} */
            Object.defineProperty(this, "valid", 
            {
                get: function() { return __valid; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __valid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {bind} */
            Object.defineProperty(this, "bind", 
            {
                get: function() { return __bind; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error("Only [valid] type 'EntityView' can be added");
                    __bind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbValid} */
            Object.defineProperty(this, "cbValid", 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbValid] type 'Function' can be added");
                    __cbValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {cbBind} */
            Object.defineProperty(this, "cbBind", 
            {
                get: function() { return __cbBind; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbBind] type 'Function' can be added");
                    __cbBind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {vbEnd} */
            Object.defineProperty(this, "cbEnd", 
            {
                get: function() { return __cbEnd; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbEnd] type 'Function' can be added");
                    __cbEnd = newValue;
                },
                configurable: true,
                enumerable: true
            });            
        }
        util.inherits(BindCommandAjax, _super);



        /** @virtual */
        BindCommandAjax.prototype._execValid = function() {
            
            var result = {};     // 오류 참조 변수
            var value = null;

            // 콜백 검사
            if (!this.cbValid()) {
                this._model.cbFail("cbValid() => false 리턴 ");
                this._onExecuted();     // "실행 종료" 이벤트 발생
                return false;
            } else {
                // 아이템 검사
                for(var i = 0; i < this.valid.items.count; i++) {
                    
                    value = this.valid.items[i].value === null ? this.valid.items[i].default : this.valid.items[i].value;
                    // null 검사를 모두 수행 : option 2
                    if (!(this.valid.items[i].valid(value, result, 2))) {
                        this._model.cbFail(result.msg, result.code);
                        this._onExecuted();     // "실행 종료" 이벤트 발생
                        return false;
                    }
                }
            }
            return true;
        };

        /**
         * Ajax 바인딩 구현
         * @method
         */
        BindCommandAjax.prototype._execBind = function() {
            
            var value;
            var item;
            var ajaxSetup = {};
            var complete = this.ajaxSetup.complete || this._model.baseAjaxSetup.complete || null;
            
            ajaxSetup.url           = this.ajaxSetup.url || this._model.baseAjaxSetup.url;
            ajaxSetup.type          = this.ajaxSetup.type || this._model.baseAjaxSetup.type;
            ajaxSetup.dataType      = this.ajaxSetup.dataType || this._model.baseAjaxSetup.dataType;
            ajaxSetup.async         = this.ajaxSetup.async || this._model.baseAjaxSetup.async;
            ajaxSetup.crossDomain   = this.ajaxSetup.crossDomain || this._model.baseAjaxSetup.crossDomain;
            ajaxSetup.complete      = (typeof complete === "function") ? complete.bind(this) : null;
            ajaxSetup.success       = this._execSuccess.bind(this);
            ajaxSetup.error         = this._execError.bind(this);

            for(var i = 0; i < this.bind.items.count; i++) {
                if(typeof ajaxSetup.data !== "object") ajaxSetup.data = {};
                item = this.bind.items[i];
                value = item.value || item.default;     // 값이 없으면 기본값 설정
                ajaxSetup.data[item.name] = value;
            }
            
            this.cbBind(ajaxSetup);

            this._ajaxAdapter(ajaxSetup);       // Ajax 호출 (web | node)
        };

        /** 
         * success(result,status,xhr)
         * @virtual 
         **/
        BindCommandAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {
            
            var result = typeof p_result === "object" ? p_result : JSON.parse(JSON.stringify(p_result));
            
            // 처리 종료 콜백 호출
            if (typeof this.cbEnd === "function" ) this.cbEnd(result);
            
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

        /**
         * AJAX 를 기준으로 구성함 (requst는 맞춤)
         * error(xhr,status,error)
         * @param {*} p_xhr 
         * @param {*} p_status 
         * @param {*} p_error 
         */
        BindCommandAjax.prototype._execError = function(p_xhr, p_status, p_error) {
            
            var msg = p_xhr && p_xhr.statusText ? p_xhr.statusText : p_error;

            this._model.cbError(msg, p_status);
            this._onExecuted();     // "실행 종료" 이벤트 발생
        };

        /**
         * (WEB & NodeJs 의 어뎁터 패턴)
         * node 에서는 비동기만 반영함 (테스트 용도) =>> 필요시 개발함
         * @param {Object} p_ajaxSetup 
         */
        BindCommandAjax.prototype._ajaxAdapter = function(p_ajaxSetup) {
            
            var option = {};
            var result;
            
            var msg;
            var code;

            // request VS Jquery.ajax 와 콜백 어뎁터 연결 함수
            function callback(error, response, body) {

                var status = response ? response.statusCode : null;
                var msg    = response ? response.statusMessage : "";

                // (xhr,status) : 완료콜백
                if (p_ajaxSetup && typeof p_ajaxSetup.complete === "function") p_ajaxSetup.complete(response, status);

                if (error || response.statusCode !== 200) {    // 실패시
                    msg = error ? (msg + " " + error) : msg;
                    // (xhr,status,error)
                    p_ajaxSetup.error(response, status, msg);
                } else {                                        // 성공시
                    if (p_ajaxSetup.dataType === "json") result = JSON.parse(body);
                    result = result || body;
                    // (result,status,xhr)
                    p_ajaxSetup.success(result, error, response);
                }                
            }

            if (ajax && typeof ajax === "function") {
                // try {
                //     ajax(p_ajaxSetup);
                // } catch (e) {
                //     p_ajaxSetup.error();
                // }
                ajax(p_ajaxSetup);
            } else {
                option.uri = p_ajaxSetup.url;
                // option.json = true // json 으로 JSON 으로 요청함
                
                // 동기화 처리
                if (p_ajaxSetup.async === false) request = sync_request;

                if (p_ajaxSetup.type === "GET") {
                    option.method = "POST";
                    option.qs = p_ajaxSetup.data;
                    request.get(option, callback);
                } else if (p_ajaxSetup.type === "POST") {
                    option.method = "POST";
                    option.form = p_ajaxSetup.data;
                    request.post(option, callback);
                } else {
                    // 기타 :: 결과는 확인 안함
                    request(option, callback);
                }
            }
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandAjax.prototype.getTypes  = function() {
                    
            var type = ["BindCommandAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * @method 
         */
        BindCommandAjax.prototype.execute = function() {
            this._onExecute();  // "실행 시작" 이벤트 발생
            if (this._execValid()) this._execBind();
        };
        

        return BindCommandAjax;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandAjax;
    } else {
        global._W.Meta.Bind.BindCommandAjax = BindCommandAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindCommandEditAjax
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
    var BindCommandAjax;
    var EntityView;
    var request;
    var jquery;
    var ajax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindCommandAjax     = require("./bind-command-ajax");
        EntityView          = require("./entity-view").EntityView;
        request             = require("request");
    } else {
        util                = global._W.Common.Util;
        BindCommandAjax     = global._W.Meta.Bind.BindCommandAjax;
        EntityView          = global._W.Meta.Entity.EntityView;
        jquery              = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
        ajax                = jquery.ajax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandAjax === "undefined") throw new Error("[BindCommandAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandEditAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandEditAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);
        }
        util.inherits(BindCommandEditAjax, _super);
    

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandEditAjax.prototype.getTypes  = function() {
                
            var type = ["BindCommandEditAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        

        return BindCommandEditAjax;
    
    }(BindCommandAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandEditAjax;
    } else {
        global._W.Meta.Bind.BindCommandEditAjax = BindCommandEditAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindCommandLookupAjax
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
    var BindCommandAjax;
    var entityView;
    var EntityView;
    var EntityViewCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommandAjax         = require("./bind-command-ajax");
        entityView              = require("./entity-view");
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
    } else {
        util                    = global._W.Common.Util;
        BindCommandAjax         = global._W.Meta.Bind.BindCommandAjax;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandAjax === "undefined") throw new Error("[BindCommandAjax] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof EntityViewCollection === "undefined") throw new Error("[EntityViewCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandLookupAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandLookupAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __cbOutput;
            var __outputOption = 1;     // 1: View 오버로딩 , 2: 있는자료만            
            
            this._output = new EntityViewCollection(this, this._baseEntity);
            
            /** @property {outputOption} */
            Object.defineProperty(this, "outputOption", 
            {
                get: function() { return __outputOption; },
                set: function(newValue) { 
                    if (!(typeof newValue === "number")) throw new Error("Only [outputOption] type 'number' can be added");
                    __outputOption = newValue;
                },

                configurable: true,
                enumerable: true
            });
            
            /** @property {cbOutput} */
            Object.defineProperty(this, "cbOutput", 
            {
                get: function() { return __cbOutput; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbOutput] type 'Function' can be added");
                    __cbOutput = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // 속성 생성 및 참조 등록
            this.addOutput("output");
        }
        util.inherits(BindCommandLookupAjax, _super);

        /**
         * 콜백에서 받은 데이터를 기준으로 table(item, rows)을 만든다.
         * 리턴데이터 형식이 다를 경우 오버라이딩해서 수정함
         * @param {*} p_result 
         * @param {*} p_status 
         * @param {*} p_xhr 
         */
        BindCommandLookupAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {

            var loadOption = this.outputOption === 3 ? 2  : this.outputOption;

            if(typeof p_result["entity"] !== "undefined" || typeof p_result["table"] !== "undefined" ) {
                this._output[0].load(p_result, loadOption); // this["output"]
            } else if (Array.isArray(p_result["entities"])) {
                for(var i = 0; p_result["entities"].length > i && typeof this._output[i] !== "undefined"; i++) {
                    this._output[i].load(p_result["entities"][i], loadOption);
                }
            }

            // 존재하는 아이템 중에 지정된 값으로 설정한다.
            if (this.outputOption === 3) {
                for (var i = 0; this._output.count > i; i++) {
                    if (this._output[i].items.count > 0 && this._output[i].rows.count > 0)
                    this._output[i].setValue(this._output[i].rows[0]);
                }
            }

            // 뷰 콜백 호출  : EntitView를 전달함
            if (typeof this.cbOutput === "function" ) this.cbOutput(p_result);

            // 상위 호출 : 데코레이션 패턴
            _super.prototype._execSuccess.call(this, p_result, p_status, p_xhr);
        };

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandLookupAjax.prototype.getTypes  = function() {
                    
            var type = ["BindCommandLookupAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandLookupAjax.prototype.addOutput = function(p_name) {

            // 유효성 검사
            if (typeof p_name !== "string") throw new Error("Only [p_name] type 'string' can be added");
            if (typeof this[p_name] !== "undefined") throw new Error("에러!! 이름 중복 : " + p_name);

            // this._output.add("default", this._baseEntity);            // 등록방법 2
            this._output.add(new EntityView(p_name, this._baseEntity));  // 등록방법 1
            this[p_name] = this._output[p_name];
        };

        return BindCommandLookupAjax;
    
    }(BindCommandAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandLookupAjax;
    } else {
        global._W.Meta.Bind.BindCommandLookupAjax = BindCommandLookupAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelAjax
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
    var EntityTable;
    
    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
         
        util                    = require("./utils");
        BindModel               = require("./bind-model");
        EntityTable             = require("./entity-table").EntityTable;
    } else {
        util                    = global._W.Common.Util;
        BindModel               = global._W.Meta.Bind.BindModel;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelAjax  = (function (_super) {
        /**
         * @class
         */
        function BindModelAjax(p_objectDI, p_itemType) {
            _super.call(this, p_objectDI);

            var __baseAjaxSetup = {
                url: "",
                type: "POST"
            };

            // Entity 추가 및 baseEntity 설정
            this._baseEntity = this.addEntity('first');

            if (typeof p_itemType === "function") {
                this.itemType = p_itemType;
                this._baseEntity.items.itemType = this.itemType;
            }

            /** @property {baseAjaxSetup} */
            Object.defineProperty(this, "baseAjaxSetup", 
            {
                get: function() { return __baseAjaxSetup; },
                configurable: true,
                enumerable: true
            });

            /** @property {baseUrl} */
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
        }
        util.inherits(BindModelAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelAjax;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelAjax;
    } else {
        global._W.Meta.Bind.BindModelAjax = BindModelAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelCreateAjax
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
    var IBindModelCreate;
    var BindModelAjax;
    var BindCommandEditAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
         
        util                    = require("./utils");
        IBindModelCreate        = require("./i-bind-model-create");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
    } else {
        util                    = global._W.Common.Util;
        IBindModelCreate        = global._W.Interface.IBindModelCreate;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelCreate === "undefined") throw new Error("[IBindModelCreate] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelCreateAjax  = (function (_super) {
        /** @class */
        function BindModelCreateAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);
            
            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelCreate))  {
                throw new Error("Only [p_objectDI] type 'IBindModelCreate' can be added");
            }
            
            this.create = new BindCommandEditAjax(this, this._baseEntity);

            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @interface IBindModelCreate 인터페이스 선언 */
            this._implements(IBindModelCreate);
        }
        util.inherits(BindModelCreateAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelCreateAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelCreateAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelCreateAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelCreateAjax;
    } else {
        global._W.Meta.Bind.BindModelCreateAjax = BindModelCreateAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelReadAjax
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
    var IBindModelRead;
    var BindModelAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
         
        util                    = require("./utils");
        IBindModelRead          = require("./i-bind-model-read");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
    } else {
        util                    = global._W.Common.Util;
        IBindModelRead          = global._W.Interface.IBindModelRead;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelRead === "undefined") throw new Error("[IBindModelRead] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadAjax  = (function (_super) {
        /** @class */
        function BindModelReadAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);

            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelRead))  {
                throw new Error("Only [p_objectDI] type 'IBindModelCreate' can be added");
            }
            
            this.read = new BindCommandLookupAjax(this, this._baseEntity);

            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @interface IBindModel 인터페이스 선언 */
            this._implements(IBindModelRead);              
        }
        util.inherits(BindModelReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelReadAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadAjax;
    } else {
        global._W.Meta.Bind.BindModelReadAjax = BindModelReadAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelReadDelAjax
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
    var IBindModelReadDel;
    var BindModelAjax;
    var BindCommandEditAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
         
        util                    = require("./utils");
        IBindModelReadDel       = require("./i-bind-model-read-del");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
    } else {
        util                    = global._W.Common.Util;
        IBindModelReadDel       = global._W.Interface.IBindModelReadDel;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelReadDel === "undefined") throw new Error("[IBindModelReadDel] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadDelAjax  = (function (_super) {
        /** @class */
        function BindModelReadDelAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);
            
            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelReadDel))  {
                throw new Error("Only [p_objectDI] type 'IBindModelReadDel' can be added");
            }
            
            this.read   = new BindCommandLookupAjax(this, this._baseEntity);
            this.delete = new BindCommandEditAjax(this, this._baseEntity);


            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @interface IBindModelReadDel 인터페이스 선언 */
            this._implements(IBindModelReadDel);                    
        }
        util.inherits(BindModelReadDelAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadDelAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadDelAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelReadDelAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadDelAjax;
    } else {
        global._W.Meta.Bind.BindModelReadDelAjax = BindModelReadDelAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelListAjax
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
    var IBindModelList;
    var BindModelAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
        
        util                    = require("./utils");
        IBindModelList          = require("./i-bind-model-list");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
    } else {
        util                    = global._W.Common.Util;
        IBindModelList          = global._W.Interface.IBindModelList;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelList === "undefined") throw new Error("[IBindModelList] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelListAjax  = (function (_super) {
        /** @class */
        function BindModelListAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);

            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelList))  {
                throw new Error("Only [p_objectDI] type 'IBindModelList' can be added");
            }

            this.list = new BindCommandLookupAjax(this, this._baseEntity);
            
            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @interface IBindModel 인터페이스 선언 */
            this._implements(IBindModelList);
        }
        util.inherits(BindModelListAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelListAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelListAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelListAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelListAjax;
    } else {
        global._W.Meta.Bind.BindModelListAjax = BindModelListAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelListDelAjax
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
    var IBindModelListDel;
    var BindModelAjax;
    var BindCommandEditAjax;
    var BindCommandLookupAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
        
        util                    = require("./utils");
        IBindModelListDel       = require("./i-bind-model-list");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
    } else {
        util                    = global._W.Common.Util;
        IBindModelListDel       = global._W.Interface.IBindModelListDel;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelListDel === "undefined") throw new Error("[IBindModelListDel] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelListDelAjax  = (function (_super) {
        /** @class */
        function BindModelListDelAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);

            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelListDel))  {
                throw new Error("Only [p_objectDI] type 'IBindModelListDel' can be added");
            }

            this.list   = new BindCommandLookupAjax(this, this._baseEntity);
            this.delete = new BindCommandEditAjax(this, this._baseEntity);
            
            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @interface IBindModel 인터페이스 선언 */
            this._implements(IBindModelListDel);
        }
        util.inherits(BindModelListDelAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelListDelAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelListDelAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelListDelAjax;
    
    }(BindModelAjax));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelListDelAjax;
    } else {
        global._W.Meta.Bind.BindModelListDelAjax = BindModelListDelAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelEditAjax
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
    var IBindModelEdit;
    var BindModelAjax;
    var BindCommandLookupAjax;
    var BindCommandEditAjax;

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        util                    = require("./utils");
        IBindModelEdit          = require("./i-bind-model-edit");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
    } else {
        util                    = global._W.Common.Util;
        IBindModelEdit          = global._W.Interface.IBindModelEdit;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelEdit === "undefined") throw new Error("[IBindModelEdit] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelEditAjax  = (function (_super) {
        /** @class */
        function BindModelEditAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);
            
            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelEdit))  {
                throw new Error("Only [p_objectDI] type 'IBindModelEdit' can be added");
            }
            
            this.read   = new BindCommandLookupAjax(this, this._baseEntity);
            this.update = new BindCommandEditAjax(this, this._baseEntity);
            this.delete = new BindCommandEditAjax(this, this._baseEntity);

            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @interface IBindModel 인터페이스 선언 */
            this._implements(IBindModelEdit);              

        }
        util.inherits(BindModelEditAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelEditAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelEditAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelEditAjax;
    
    }(BindModelAjax));
    
        
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelEditAjax;
    } else {
        global._W.Meta.Bind.BindModelEditAjax = BindModelEditAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));
/**
 * @namespace _W.Meta.Bind.BindModelFormAjax
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
    var IBindModelForm;
    var BindModelAjax;
    var BindCommandLookupAjax;
    var BindCommandEditAjax;

    if (typeof module === "object" && typeof module.exports === "object") {    
        util                    = require("./utils");
        IBindModelForm          = require("./i-bind-model-form");
        BindModelAjax           = require("./bind-model-ajax");
        BindCommandLookupAjax   = require("./bind-command-ajax-lookup");
        BindCommandEditAjax     = require("./bind-command-ajax-edit");
    } else {
        util                    = global._W.Common.Util;
        IBindModelForm          = global._W.Interface.IBindModelForm;
        BindModelAjax           = global._W.Meta.Bind.BindModelAjax;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof IBindModelForm === "undefined") throw new Error("[IBindModelForm] module load fail...");
    if (typeof BindModelAjax === "undefined") throw new Error("[BindModelAjax] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelFormAjax  = (function (_super) {
        /** @class */
        function BindModelFormAjax(p_objectDI, p_isLoadAttr, p_itemType) {
            _super.call(this, p_objectDI, p_itemType);
            
            // DI 인터페이스 구현 검사
            if(typeof p_objectDI !== "undefined" && !(p_objectDI instanceof IBindModelForm))  {
                throw new Error("Only [p_objectDI] type 'IBindModelForm' can be added");
            }
            this.read   = new BindCommandLookupAjax(this, this._baseEntity);
            this.update = new BindCommandEditAjax(this, this._baseEntity);
            this.delete = new BindCommandEditAjax(this, this._baseEntity);
            this.create = new BindCommandEditAjax(this, this._baseEntity);

            // 속성 자동 로딩
            if (p_isLoadAttr) {
                this.loadAttr();
            }

            /** @interface IBindModel 인터페이스 선언 */
            this._implements(IBindModelForm);
        }
        util.inherits(BindModelFormAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelFormAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelFormAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelFormAjax;
    
    }(BindModelAjax));
    
        
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelFormAjax;
    } else {
        global._W.Meta.Bind.BindModelFormAjax = BindModelFormAjax;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));