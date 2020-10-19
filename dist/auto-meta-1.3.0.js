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
        
    }(this));
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

    }(this));
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
    }

}(this));
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
         * @description 옵서버 클래스
         * @param {*} p_this 호출 대상(this) 지정
         * @param {*} p_onwer call 인수 목록 TODO:: 이부분 확인 필요
         */
        function Observer(p_this, p_onwer) {

            this.isDebug = false;

            this._this = p_this;
            
            this._onwer = p_onwer;
            
            this.subscribers = {        // 전역 구독자
                any: []
            };

            // 이벤트 전파 설정
            this.propagation = true;
        }

        /**
         * @description 구독 신청
         * @param {Function} p_fn [필수] 이벤트 콜백 함수
         * @param {String} p_code 이벤트 코드명 : 기본값 "any"
         * @summary 이벤트 "p_code"를 입력하지 않으면 전역(any)에 등록 된다.
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            var subscribers = null;
            
            if (typeof p_fn === "undefined") throw new Error("p_fn param request fail...");
            
            if (typeof this.subscribers[p_code] === "undefined") {
                this.subscribers[p_code] = [];
            }
            subscribers = this.subscribers[p_code];
            
            if  (typeof p_fn === "function") subscribers.push(p_fn);
        };
        
        /**
         * @description 구독 취소
         * @param {Function} p_fn [필수] 이벤트 콜백 함수
         * @param {String} p_code 이벤트 코드명 : 기본값 "any"
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
         * @description 전체 구독 취소
         * @param {String} p_code 이벤트 코드명
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
         * @param {String}} p_code 이벤트 코드명 : 기본값 "any"
         */
        Observer.prototype.publish = function(p_code, p_params) {
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

}(this));
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

}(this));
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
    
}(this));
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

}(this));
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

}(this));
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
        IGroupControl.prototype.copyTo  = function() {
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

}(this));
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

}(this));
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

}(this));
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

}(this));
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

}(this));
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
    
}(this));
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
    
}(this));
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
            this.attrs      = null;
            this.mode       = null;
            this.cbRegister = null;
            this.cbValid    = null;
            this.cbReady   = null;
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

}(this));
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
    
}(this));
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
    
}(this));
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
    
}(this));
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
    
}(this));
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
    
}(this));
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
    
}(this));
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
    
}(this));
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
    
            this.isDebug    = false;       // 디버깅 플래그

            // Private
            this.__event     = new Observer(this, this);

            // Protected
            this._onwer    = p_onwer;
    
            this._items    = [];

            // Property
            this.setProperty("count", 
                function() {
                    return this._items.length;
                }, 
                null
            );

            // Property
            this.setProperty("list", 
                function() {
                    return this._items;
                }, 
                null
            );
            
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
         * @method private 프로퍼티 옵션 객체 얻기
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { this._items[p_idx] = newValue; },
                enumerable: true,
                configurable: true
            };
        };

        /** @event onAdd 등록 이벤트 발생 */
        BaseCollection.prototype._onAdd = function() {
            this.__event.publish("add"); 
        };

        /** @event onRemove 삭제 이벤트 발생 */
        BaseCollection.prototype._onRemove = function() {
            this.__event.publish("remove"); 
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

        /**
         *  @method 고정속성 등록
         * @param {String} p_name 속성명
         * @param {Function} p_getter getter 함수
         * @param {Function} p_setter setter 함수
         */
        BaseCollection.prototype.setProperty = function(p_name, p_getter, p_setter) {

            var obj = {
                enumerable: true,
                configurable: true
            };
            
            if (typeof p_getter === "function") {
                obj.get = p_getter;
            } else {    // G 기본값 설정
                obj.get = function(){return null};
            }
    
            if (typeof p_setter === "function") {
                obj.set = p_setter;
            } else {    // 셋터 기본값 설정
                obj.set = function(){};
            }
    
            Object.defineProperty(this, p_name, obj);
        };

        /**
         * @method 고정속성 삭제 
         * @param {*} p_name 속성명
         */
        BaseCollection.prototype.delProperty = function(p_name) {
            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            delete this[p_name];                    // 내부 이름 참조 삭제
        };

        /**
         * @method add 배열속성 등록 및 값 설정
         * @method remove 배열속성 삭제
         * @method removeAt 배열속성 삭제
         * @method clear 배열속성 전체 삭제
         * @method contains 배열속성 + 고정속성 여부 검사 
         * @method indexOf 속성 인덱스 번호 얻기
         */

        return BaseCollection;
    }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseCollection;
    } else {
        global._W.Collection.BaseCollection = BaseCollection;
    }

}(this));
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
         * @method 배열속성 삭제 (내부처리)
         * @param {*} p_idx 인덱스 번호
         */
        ArrayCollection.prototype.__remove = function(p_idx) {
            delete this[p_idx];                      // 내부 idx 삭제
            delete this._items[p_idx];              // 내부 참조 삭제
        };

        /**
         * @method 배열속성 속성값 설정
         * @param {*} p_value [필수] 속성값
         * @returns {*} 입력 속성 참조값
         */
        ArrayCollection.prototype.add = function(p_value) {
        
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전

            if (typeof p_value === "undefined") throw new Error("p_value param request fail...");
        
            this._items.push(p_value);
            index = (this._items.length === 1) ? 0 : this._items.length  - 1;
            Object.defineProperty(this, [index], this._getPropDesciptor(index));

            this._onAdd();                          // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return [index];
        };

        /**
         * @method 배열속성 삭제
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        ArrayCollection.prototype.remove = function(p_obj) {
            
            var idx = this.indexOf(p_obj);
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (this.contains(p_obj)) this.__remove(idx);
            
            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method 배열속성 삭제
         * @param {*} p_idx 인덱스
         */
        ArrayCollection.prototype.removeAt = function(p_idx) {

            var obj = this._items[p_idx];
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (typeof obj !== "undefined") this.__remove(p_idx);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };
        
        /**
         * @method 배열속성 전체삭제
         */
        ArrayCollection.prototype.clear = function() {
            
            var obj;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._items.length; i++) {
                obj = this.indexOf(i);
                if (typeof obj !== "undefined") this.__remove(i);
            }
            this._items = [];
        
            this._onClear();                        // 이벤트 발생 : 전체삭제
            this._onChanged();                      // 이벤트 발생 : 변경후            
        };
        
        /**
         * @method 배열속성 여부 
         * @param {Object} p_obj 속성 객체
         * @returns {Boolean}
         */
        ArrayCollection.prototype.contains = function(p_obj) {
            return this._items.indexOf(p_obj) > -1;
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {Object} p_obj 속성 객체
         * @returns {Number}
         */
        ArrayCollection.prototype.indexOf = function(p_obj) {
            return this._items.indexOf(p_obj);
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

}(this));
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

            /**
             * @interface IPropertyCollection 인터페이스 선언
             */
            this._implements(IPropertyCollection);            
        }
        util.inherits(PropertyCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method 배열속성 삭제 (내부처리)
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype.__remove = function(p_name) {

            var idx = this.indexOf(p_name);

            delete this[p_name];                    // 내부 이름 삭제
            delete this[idx];                       // 내부 idx 삭제
            delete this._items[idx];                // 내부 참조 삭제

            return idx;
        };

        /**
         * @method 배열속성 설정 및 속성값 등록
         * @param {*} p_name [필수] 속성명
         * @param {*} p_value 속성값
         * @returns {*} 입력 속성 참조값
         */
        PropertyCollection.prototype.add = function(p_name, p_value) {
            p_value = p_value || "";
            
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전
        
            if (typeof p_name === "undefined") throw new Error("p_name param request fail...");
            if (this.contains(p_name)) {
                console.warn("Warning:: 이름이 중복 !!");
                return this[p_name];     // 중복 등록 방지
            }

            this._items.push(p_value);
            index = (this._items.length === 1) ? 0 : this._items.length  - 1;
            Object.defineProperty(this, [index], this._getPropDesciptor(index));

            if (p_name) {
                Object.defineProperty(this, p_name, this._getPropDesciptor(index));
            }

            this._onAdd();                          // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return [index];
        };

        /**
         * @method 배열속성 삭제
         * @param {*} p_name 속성명
         * @returns {Number} 삭제한 인덱스
         */
        PropertyCollection.prototype.remove = function(p_name) {

            var idx;

            this._onChanging();                     // 이벤트 발생 : 변경전

            if (this.contains(p_name)) idx = this.__remove(p_name);
            
            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method 배열속성 삭제
         * @param {*} p_idx 인덱스
         */
        PropertyCollection.prototype.removeAt = function(p_idx) {

            var propName = this.propertyOf(p_idx);
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            if (typeof propName === "string") this.__remove(propName);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };
        
        /**
         * @method 배열속성 전체삭제
         */
        PropertyCollection.prototype.clear = function() {
            
            var propName;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._items.length; i++) {
                propName = this.propertyOf(i);
                if (typeof propName === "string") this.__remove(propName);
            }
            this._items = [];

            this._onClear();                        // 이벤트 발생 : 전체삭제
            this._onChanged();                      // 이벤트 발생 : 변경후                
        };
        
        /**
         * TODO:: 객체로 오면 컬렉션중 객체를 비교해야 함.
         * 
         * @method 배열속성 여부
         * @param {String} p_name 속성명
         * @returns {Boolean}
         */
        PropertyCollection.prototype.contains = function(p_obj) {
            if (typeof p_obj === "string") {
                return typeof this[p_obj] !== "undefined";
            } else {
                return this.indexOf(p_obj) > -1;
            }
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {String}} p_name 속성명
         * @returns {Number}
         */
        PropertyCollection.prototype.indexOf = function(p_obj) {
            
            var obj = typeof p_obj === "string" ? this[p_obj] : p_obj;
            
            return this._items.indexOf(obj);;
        };

        /**
         * @method 배열속성 이름 찾기
         * @param {Number}} p_idx 인덱스
         * @returns {String}
         */
        PropertyCollection.prototype.propertyOf = function(p_idx) {
            
            for (var prop in this) {
                if ( this.hasOwnProperty(prop)){
                    if (!isFinite(prop) && this[prop] === this._items[p_idx]) {
                        return prop;
                    }
                }
            }
            return null;
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

}(this));
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
        PropertyObjectCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Object) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [Object] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


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

}(this));
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
        PropertyFunctionCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Function) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [Function] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


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

}(this));
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
            this.__GUID = null;

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

}(this));
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

}(this));
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

            var __items = [];
            /**
             * TODO::
             * @implements
             */
            Object.defineProperty(this, "count", 
            {
                get: function() { return __items.length; },
                configurable: true,
                enumerable: true
            });
            Object.defineProperty(this, "list", 
            {
                get: function() { return __items; },
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

}(this));
/**
 * @namespace _W.Meta.Entity.Item
 * @namespace _W.Meta.Entity.ItemCollection
 * @namespace _W.Meta.Entity.ItemRefCollection
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
        function Item(p_name, p_entity, p_option) {
            _super.call(this, p_name);

            var __entity        = null;
            var __type          = "string";
            var __size          = 0;
            var __default       = null;
            var __caption       = "";
            var __isNotNull     = false;
            var __callback      = null;
            var __constraints   = [];
            var __codeType      = null;
            var __order         = 100;
            var __increase      = 100;      // order 의 자동 추가수
            
            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity.instanceOf("Entity")) {
                __entity    = p_entity;
                __order = __entity.items.count === 0 ? __order : __entity.items[__entity.items.count - 1].order + __increase;
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
                    if(typeof newValue !== "string") throw new Error("Only [default] type 'string' can be added");
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
                    if(typeof newValue !== "function") throw new Error("Only [callback] type 'function' can be added");
                    __callback = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /** @property {constraints} */
            Object.defineProperty(this, "constraints", 
            {
                get: function() { return __constraints; },
                // set: function(newValue) { __constraints = newValue; },
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

            // 아이템 옵션속성 추가
            if (typeof p_option === "object" ) {
                for(var prop in p_option) {
                    if (p_option.hasOwnProperty(prop)) {
                        this[prop] = p_option[prop];
                    }
                }
            }

        }
        util.inherits(Item, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Item.prototype.getTypes  = function() {
                    
            var type = ["Item"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** @override */
        Item.prototype.getObject = function() {
            // TODO::
        };

        /**
         * @method
         */
        Item.prototype.setConstraint = function(i_regex, i_msg, i_code) {

            var constraint = {};

            if (!(i_regex instanceof RegExp)) throw new Error("Only [i_regex] type 'RegExp' can be added");
            if (!(typeof i_msg === "string")) throw new Error("Only [i_msg] type 'string' can be added");

            constraint.regex = i_regex;
            constraint.msg = i_msg;
            constraint.code = i_code;
            
            this.constraints.push(constraint);
        };

        Item.prototype.valid = function(i_value, o_message) {

            var result = "";

            o_message.msg = "";
            o_message.code = "";
            i_value = i_value || "";

            if (!(typeof i_value === "string")) throw new Error("Only [i_value] type 'string' can be added");
            
            // 우선순위 높음
            for(var i = 0; this.constraints.length > i; i++) {
                result = i_value.match(constraints[i].regex);
                if (result.length > 0 ) {
                    o_message.msg = constraints[i].msg;
                    o_message.code = constraints[i].code;
                    
                    return false;
                }
            }
            // 우선순위 낮음
            if (this.isNotNull && i_value.trim().length <= 0) {
                o_message.msg = "- " + this.caption + "(" + this.name + ")은 공백을 입력할 수 없습니다.";
                o_message.code = 0;
                return false;    // 공백 메세지
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
        }
        util.inherits(ItemCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        ItemCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new Item(i_name, this._onwer);
            } else if (p_object instanceof Item) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | Item object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        /**
         * Item 타입만 들어가게 제약조건 추가
         * @override
         */
        ItemCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Item) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [Item] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


        // TODO::
        
        return ItemCollection;
    
    }(PropertyCollection));


    //---------------------------------------
    var ItemRefCollection  = (function (_super) {
        /**
         * @class
         * @constructor
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_refCollection 참조기본 컬렉션
         */
        function ItemRefCollection(p_onwer, p_refCollection) {
            _super.call(this, p_onwer);

            // if (typeof p_refCollection !== "undefined" && !(p_refCollection instanceof ItemCollection)) {
            if (p_refCollection && !(p_refCollection instanceof ItemCollection)) {
                throw new Error("Error!! ItemCollection object [p_refCollection].");
            }
            
            /**
             * @protected @member
             */
            this._refCollection = p_refCollection;
        }
        util.inherits(ItemRefCollection, _super);

        /**
         *  - base(all),    string | Itme, Collection   => Collection 에 생성후 자신에 등록 
         *  - base(N),      string | Itme               => this 에 생성후 자신에 등록
         *  - base(Y),      string | Item               => Base 에 생성후 자신에 등록
         * 
         *  TODO:: filter 옵션 : 충돌방지에 이용
         *  TODO:: 객체 비교는 string 이 아니고 값과 타입을 비교해야함 (그래야 참조를 사용)
         * 
         * @param {String, Item} p_object 
         * @param {?ItemCollection} p_refCollection
         */
        ItemRefCollection.prototype.add  = function(p_object, p_refCollection) {

            // string                       => 생성 및 자신에 등록
            // string <base>                => 생성 및 소유처에 등록
            // Item                         => 생성 및 자신에 등록
            // Item <base>                  => 생성 및 소유처에 등록
            // string, collection           => 참조만 등록
            // string, collection <base>    => 참조만 등록
            
            var item;
            var collection;
            var i_name = p_object instanceof Item ? p_object.name : null;

            if (p_object instanceof Item) {
                i_name = p_object.name;
            } else if (typeof p_object === "string") {
                i_name = p_object;
            } else {
                throw new Error("p_object string | Item instance param request fail...");
            }

            // TODO:: 이름 충돌검사

            if (p_refCollection instanceof ItemCollection) {
                collection = p_refCollection;
            } else if (this._refCollection instanceof ItemCollection) {
                collection = this._refCollection;
            }
            
            // 기본참조 컬렉션 또는 전달참조 컬렉션인 경우
            if (collection) {
                if (collection.contains(i_name)) {
                    item = collection[i_name];                      // 참조 가져옴
                } else {
                    item = collection.add(p_object);                // 참조 가져옴
                }
                
                // REVIEW:: 의존성을 낮추기 위해서 검사후 등록
                // 소유객체에 참조 등록 (중복제거됨)
                if (this._onwer._regRefer) {
                    this._onwer._regRefer(collection._onwer);
                }
            }
            
            item = item || p_object;

            return _super.prototype.add.call(this, item);           // 자신에 등록
        };


        return ItemRefCollection;
    
    }(ItemCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.Item                     = Item;
        module.exports.ItemCollection           = ItemCollection;
        module.exports.ItemRefCollection        = ItemRefCollection;
    } else {
        global._W.Meta.Entity.Item              = Item;
        global._W.Meta.Entity.ItemCollection    = ItemCollection;
        global._W.Meta.Entity.ItemRefCollection = ItemRefCollection;
    }

}(this));
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
        function ItemDOM(p_name, p_entity) {
            _super.call(this, p_name, p_entity);

            var __domType       = null;
            var __isReadOnly    = false;
            var __isHide        = false;
            var __refElement    = null;
            var __refValue      = null;

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

            /** @property {refElement} */
            Object.defineProperty(this, "refElement", 
            {
                get: function() { return __refElement; },
                set: function(newValue) { 
                    if(typeof newValue !== "object") throw new Error("Only [refElement] type 'object' can be added");
                    __refElement = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {refValue} */
            Object.defineProperty(this, "refValue", 
            {
                get: function() { return __refValue; },
                set: function(newValue) { 
                    __refValue = newValue;
                },
                configurable: true,
                enumerable: true
            });

        }
        util.inherits(ItemDOM, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        ItemDOM.prototype.getTypes  = function() {
                    
            var type = ["ItemDOM"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
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

}(this));
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
    var Entity;
    var PropertyCollection;
    var ArrayCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        PropertyCollection  = require("./collection-property");
        ArrayCollection     = require("./collection-array");
    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ArrayCollection     = global._W.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof ArrayCollection === "undefined") throw new Error("[ArrayCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var Row  = (function (_super) {
        /**
         * @abstract @class
         */
        function Row(p_entity) {
            _super.call(this, this);
            
            var __entity        = null;
            var itemName = "";

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
        }
        util.inherits(RowCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        RowCollection.prototype.add  = function(p_object) {

            var i_value;

            if (typeof p_object === "undefined") {      
                i_value = new Row();
            } else if (p_object instanceof Row) {
                i_value = p_object;
            } else {
                throw new Error("Row | Row object [p_object].");
            }

            return _super.prototype.add.call(this, i_value);
        };
        
        /**
         * Row 타입만 들어가게 제약조건 추가
         * @override
         */
        RowCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof Row) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [Row] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


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

}(this));
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
            var __rows = null;      // 상속해서 생성해야함

            /**
             * TODO:: 삭제 하는게 맞을듯 확인 필요
             */
            // Object.defineProperty(this, "count", 
            // {
            //     get: function() { return __items.length; },
            //     configurable: true,
            //     enumerable: true
            // });
            // Object.defineProperty(this, "list", 
            // {
            //     get: function() { return __items; },
            //     configurable: true,
            //     enumerable: true
            // });

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

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        Entity.prototype.getTypes = function() {
            
            var type = ["Entity"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
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
        


        // 지역함수
        function loadItem(p_thisEntity, p_item) {
            // for (var prop in entity.items[i]) {
                // if (p_item.hasOwnProperty(prop)) {
                    p_thisEntity.items.add(p_item);
                    // Item 속성 가져오기
                    for (var prop in p_item) {
                        if (p_item.hasOwnProperty(prop)) {
                            
                            // REVIEW: 필요시 검사후 설정 로직 추가
                            p_thisEntity.items[prop][prop2] = entity.items[i][prop][prop2]
                        }
                    }
                // }
            // }
        }


        Entity.prototype.__addItem  = function(p_name, p_property) {
            
            if(!this.items.contains(p_name)) this.items.add(p_name);
            
            if (typeof p_property === "object" ) {
                for(var prop in p_property) {
                    this.items[p_name][prop] = p_property[prop];
                }
            }
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


        /**@abstract IAllControl */
        Entity.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        Entity.prototype.select  = function() {
            throw new Error("[ select() ] Abstract method definition, fail...");
        };

        
        Entity.prototype.newRow  = function() {
            return new Row(this);
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
    var ItemCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        PropertyCollection  = require("./collection-property");
        IGroupControl       = require("./i-control-group");
        IAllControl         = require("./i-control-all");
        RowCollection       = require("./entity-row").RowCollection;
        ItemCollection      = require("./entity-item").ItemCollection;
    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        IGroupControl       = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;
        RowCollection       = global._W.Meta.Entity.RowCollection;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof RowCollection === "undefined") throw new Error("[RowCollection] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var EntityTable  = (function (_super) {
        /**
         * @abstract @class
         */
        function EntityTable(p_name) {
            _super.call(this, p_name);

            this.items = new ItemCollection(this);

            this.rows = new RowCollection(this);

            /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(EntityTable, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        EntityTable.prototype.getTypes  = function() {
            
            var type = ["EntityTable"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        EntityTable.prototype.merge  = function() {
            // TODO::
        };
        
        EntityTable.prototype.copyTo  = function() {
            // TODO::
        };
        
        EntityTable.prototype.clone  = function() {
            // TODO::
        };
        
        // EntityTable.prototype.load  = function() {
        //     // TODO::
        // };
        
        EntityTable.prototype.clear  = function() {
            // TODO::
        };

        EntityTable.prototype.select  = function() {
            // TODO::
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
                i_value = new Item(i_name, this._onwer);
            } else if (p_object instanceof Item) {
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
        EntityTableCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof EntityTable) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [EntityTable] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


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

}(this));
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

            this._refEntity = [];

            this.items = new ItemRefCollection(this, refCollection);
            
            this.rows = new RowCollection(this);
            
             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(EntityView, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        EntityView.prototype.getTypes  = function() {
            
            var type = ["EntityView"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        EntityView.prototype._regRefer  = function(p_entity) {
            if (this._refEntity.indexOf(p_entity) < 0) this._refEntity.push(p_entity);
        };

        EntityView.prototype.merge  = function() {
            // TODO::
        };
        
        EntityView.prototype.copyTo  = function() {
            // TODO::
        };
        
        EntityView.prototype.clone  = function() {
            // TODO::
        };
        
        // EntityView.prototype.load  = function() {
        //     // TODO::
        // };
        
        EntityView.prototype.clear  = function() {
            // TODO::
        };

        EntityView.prototype.select  = function() {
            // TODO::
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
        EntityViewCollection.prototype._getPropDesciptor = function(p_idx) {
            return {
                get: function() { return this._items[p_idx]; },
                set: function(newValue) { 
                    if (newValue instanceof EntityView) {
                        this._items[p_idx] = newValue;
                    } else {
                        throw new Error("Only [EntityView] type instances can be added");
                    }
                },
                enumerable: true,
                configurable: true
            };
        };


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

}(this));
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

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        Observer            = require("./observer");
        MetaObject          = require("./meta-object");
    } else {
        util                = global._W.Common.Util;
        Observer            = global._W.Common.Observer;
        MetaObject          = global._W.Meta.MetaObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BaseBind  = (function (_super) {
        /**
         * @abstract @class 추상클래스
         */
        function BaseBind() {
            _super.call(this);

            /** @private */
            this.__event    = new Observer(this, this);

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

            /** @property */
            Object.defineProperty(this, "onFail", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "fail");
                }
            });

            /** @property */
            Object.defineProperty(this, "eventPropagation", {
                enumerable: true,
                configurable: true,
                set: function(p_bool) {
                    if (!(p_bool instanceof Boolean)) throw new Error("Only [p_bool] type 'Boolean' can be added");
                    this.__event.propagation = p_bool;
                },
                get: function() { return this.__event.propagation; }
            });
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

        /** @event */
        BaseBind.prototype._onFail = function(p_msg) {
            this.__event.publish("fail", p_msg); 
        };        

        return BaseBind;
    
    }(MetaObject));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BaseBind;
    } else {
        global._W.Meta.Bind.BaseBind = BaseBind;
    }

}(this));
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
            
            var __cbEnd;

            if (p_baseEntity && !(p_bindModel.instanceOf("BindModel"))) throw new Error("Only [p_bindModel] type 'BindModel' can be added");
            if (p_baseEntity && !(p_baseEntity.instanceOf("Entity"))) throw new Error("Only [p_baseEntity] type 'Entity' can be added");

            /** @protected 소유자 */
            this._model = p_bindModel;

            /** @protected */
            this.baseEntity = p_baseEntity;

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
        util.inherits(BindCommand, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommand.prototype.getTypes  = function() {
                    
            var type = ["BindCommand"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

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

        /** @override */
        BindCommand.prototype._onFail = function(p_msg) {
            _super.prototype._onFail.call(this, p_msg);
            if (this.eventPropagation) this._model._onFail(p_msg);
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

    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필

        util                        = require("./utils");
        BaseBind                    = require("./bind-base");
        ItemCollection              = require("./entity-item").ItemCollection;
        PropertyCollection          = require("./collection-property");
        PropertyFunctionCollection  = require("./collection-property-function");        
        IBindModel                  = require("./i-bind-model");        
    } else {
        util                        = global._W.Common.Util;
        BaseBind                    = global._W.Meta.Bind.BaseBind;
        ItemCollection              = global._W.Meta.Entity.ItemCollection;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        PropertyFunctionCollection  = global._W.Collection.PropertyFunctionCollection;        
        IBindModel                  = global._W.Interface.IBindModel;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof PropertyFunctionCollection === "undefined") throw new Error("[PropertyFunctionCollection] module load fail...");
    if (typeof IBindModel === "undefined") throw new Error("[IBindModel] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel(p_objectDI) {
            _super.call(this);

            var __attrs         = new PropertyCollection(this);
            var __mode          = new PropertyFunctionCollection(this);
            var __cbRegister    = function() {};
            var __cbValid       = function() {return true};
            var __cbReady      = function() {};

            var propObject;

            // DI 의존성 주입 : 객체를 비교하여 삽입
            if (p_objectDI instanceof IBindModel) {     // 가능
                // attrs 등록
                if (typeof p_objectDI["attrs"] !== "undefined" && p_objectDI["attrs"] !== null) {
                    propObject = p_objectDI["attrs"];
                    for(var prop in propObject) {
                        if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== "undefined") {
                            __attrs.add(prop, propObject[prop]);
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
            }

            /** @property {attrs} */
            Object.defineProperty(this, "attrs", 
            {
                get: function() { return __attrs; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyCollection)) throw new Error("Only [attrs] type 'PropertyCollection' can be added");
                    __attrs = newValue;
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

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} p_cmds <선택> 추가할 아이템 명령
         */
        BindModel.prototype.add = function(p_item, p_cmds) {

            var cmds = [];

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type instances can be added");
            }
            if (typeof p_cmds !== "undefined" && !Array.isArray(p_cmds)) {
                throw new Error("Only [a_cmd] type Array can be added");
            }
            
            // 설정 대상 가져오기
            if (Array.isArray(p_cmds)) {
                for (var i = 0; i< p_cmds.length; i++) {
                    if (this[p_cmds[i]]) {
                        cmds.push(p_cmds[i]);
                    } else {
                        console.warn("Warning!! Param p_cmds 에 [" + p_cmds[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    
                    if (this[prop].instanceOf("BindCommand") && prop.substr(0, 1) !== "_") {
                        cmds.push(prop.toString());
                    }
                }
            }

            // 설정
            for (var i = 0; i < cmds.length; i++) {
                this[cmds[i]].add(p_item);
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

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandInternal
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

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommand             = require("./bind-command");
        EntityView              = require("./entity-view").EntityView;
    } else {
        util                    = global._W.Common.Util;
        BindCommand             = global._W.Meta.Bind.BindCommand;
        EntityView              = global._W.Meta.Entity.EntityView;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindCommandInternal  = (function (_super) {
        /**
         * @class
         */
        function BindCommandInternal(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __valid = new EntityView("valid", this.baseEntity);
            var __bind  = new EntityView("bind", this.baseEntity);

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

        }
        util.inherits(BindCommandInternal, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandInternal.prototype.getTypes  = function() {
                    
            var type = ["BindCommandInternal"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandInternal.prototype.execute = function() {
            this._onExecute();  // "실행 시작" 이벤트 발생
            if (this._execValid()) this._execBind();
        };

        /** @virtual */
        BindCommandInternal.prototype._execValid = function() {
            
            var o_msg = {};

            console.log("*************");
            // console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                if (!(this.valid.items[i].valid(this.bind.items[i].refValue, o_msg))) {
                    this._onFail(o_msg);
                    return false;
                }
                // console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        /** @abstract */
        BindCommandInternal.prototype._execBind = function() {
            throw new Error("[ _execBind() ] Abstract method definition, fail...");
        };
        
        /** 
         * success(result,status,xhr)
         * @virtual 
         **/
        BindCommandInternal.prototype._execSuccess = function(i_result, i_status, i_xhr) {
            // 처리 종료 콜백 호출
            if (typeof this.cbEnd === "function" ) this.cbEnd();
            
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };


        return BindCommandInternal;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandInternal;
    } else {
        global._W.Meta.Bind.BindCommandInternal = BindCommandInternal;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandView
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
    var BindCommandInternal;
    var entityView;
    var EntityView;
    var EntityViewCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                    = require("util");
        BindCommandInternal     = require("./bind-command-internal");
        entityView              = require("./entity-view");
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
    } else {
        util                    = global._W.Common.Util;
        BindCommandInternal     = global._W.Meta.Bind.BindCommandInternal;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandInternal === "undefined") throw new Error("[BindCommandInternal] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof EntityViewCollection === "undefined") throw new Error("[EntityViewCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandView  = (function (_super) {
        /**
         * @class
         */
        function BindCommandView(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __cbView;

            var __outputOption = 1;     // 1: View 오버로딩 , 2: 있는자료만            
            
            this._output = new EntityViewCollection(this, this.baseEntity);
            this._output.add(new EntityView("default", this.baseEntity));  // 등록방법 1
            // this._output.add("default", this.baseEntity);               // 등록방법 2

            /** @property {view} 필요시  상속 또는 객체를 통해서 확장 */
            this.view = this._output["default"];        // 참조 속성 설정 [0]


            /** @property {cbView} */
            Object.defineProperty(this, "cbView", 
            {
                get: function() { return __cbView; },
                set: function(newValue) { 
                    if (!(newValue instanceof Function)) throw new Error("Only [cbView] type 'Function' can be added");
                    __cbView = newValue;
                },
                configurable: true,
                enumerable: true
            });

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
        }
        util.inherits(BindCommandView, _super);

        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandView.prototype.getTypes  = function() {
                    
            var type = ["BindCommandView"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 콜백에서 받은 데이터를 기준으로 table(item, rows)을 만든다.
         * 리턴데이터 형식이 다를 경우 오버라이딩해서 수정함
         * @param {*} i_result 
         * @param {*} i_status 
         * @param {*} i_xhr 
         */
        BindCommandView.prototype._execSuccess = function(i_result, i_status, i_xhr) {

            this.view.load(i_result, this.outputOption);

            // 뷰 콜백 호출  : EntitView를 전달함
            if (typeof this.cbView === "function" ) this.cbView(this.view);

            // 상위 호출 : 데코레이션 패턴
            _super.prototype._execSuccess.call(this, i_result, i_status, i_xhr);
        };

        return BindCommandView;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandView;
    } else {
        global._W.Meta.Bind.BindCommandView = BindCommandView;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandRead
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
    var BindCommandView;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandView     = require("./bind-command-view");
    } else {
        util                = global._W.Common.Util;
        BindCommandView     = global._W.Meta.Bind.BindCommandView;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandView === "undefined") throw new Error("[BindCommandView] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandRead  = (function (_super) {
        /**
         * @class
         */
        function BindCommandRead(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);
        }
        util.inherits(BindCommandRead, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandRead.prototype.getTypes  = function() {
                
            var type = ["BindCommandRead"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandRead.prototype._execValid = function() {
            // TODO::
            console.log("*************");
            console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        BindCommandRead.prototype._execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execSuccess();
        };
        
        BindCommandRead.prototype._execSuccess = function() {
            // TODO::
            console.log("*************");
            console.log("_execSuccess()");
            this._execView();
        };

        BindCommandRead.prototype._execView = function() {
            // TODO::
            console.log("*************");
            console.log("_execView()");
            for(var i = 0; i < this._output.count; i++) {
                for (var ii = 0; ii < this._output[i].items.count; ii++) {
                    console.log("output["+ i +"] : " + this._output[i].items[ii].name);
                }
            }
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

        return BindCommandRead;
    
    }(BindCommandView));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandRead;
    } else {
        global._W.Meta.Bind.BindCommandRead = BindCommandRead;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandCreate
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
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-command-internal");
    } else {
        util                = global._W.Common.Util;
        BindCommandInternal = global._W.Meta.Bind.BindCommandInternal;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandInternal === "undefined") throw new Error("[BindCommandInternal] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandCreate  = (function (_super) {
        /**
         * @class
         */
        function BindCommandCreate(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

        }
        util.inherits(BindCommandCreate, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandCreate.prototype.getTypes  = function() {
                    
            var type = ["BindCommandCreate"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandCreate.prototype.execValid = function() {
             // TODO::
             console.log("*************");
             console.log("_execValid()");
             for(var i = 0; i < this.valid.items.count; i++) {
                 console.log("valid : " + this.valid.items[i].name);
             }
             return true;
        };

        BindCommandCreate.prototype.execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execSuccess();
        };
        
        BindCommandCreate.prototype.execSuccess = function() {
             // TODO::
             console.log("*************");
             console.log("_execSuccess()");
 
             this._onExecuted();  // "실행 종료" 이벤트 발생
        };


        return BindCommandCreate;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandCreate;
    } else {
        global._W.Meta.Bind.BindCommandCreate = BindCommandCreate;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandUpdate
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
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-command-internal");
    } else {
        util                = global._W.Common.Util;
        BindCommandInternal = global._W.Meta.Bind.BindCommandInternal;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandInternal === "undefined") throw new Error("[BindCommandInternal] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandUpdate  = (function (_super) {
        /**
         * @class
         */
        function BindCommandUpdate(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

        }
        util.inherits(BindCommandUpdate, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandUpdate.prototype.getTypes  = function() {
                    
            var type = ["BindCommandUpdate"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandUpdate.prototype.execValid = function() {
            // TODO::
            console.log("*************");
            console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        BindCommandUpdate.prototype.execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execSuccess();
        };
        
        BindCommandUpdate.prototype.execSuccess = function() {
            // TODO::
            console.log("*************");
            console.log("_execSuccess()");

            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

        return BindCommandUpdate;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandUpdate;
    } else {
        global._W.Meta.Bind.BindCommandUpdate = BindCommandUpdate;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandDelete
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
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-command-internal");
    } else {
        util                = global._W.Common.Util;
        BindCommandInternal = global._W.Meta.Bind.BindCommandInternal;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandInternal === "undefined") throw new Error("[BindCommandInternal] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandDelete  = (function (_super) {
        /**
         * @class
         */
        function BindCommandDelete(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

        }
        util.inherits(BindCommandDelete, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandDelete.prototype.getTypes  = function() {
                    
            var type = ["BindCommandDelete"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandDelete.prototype.execValid = function() {
            // TODO::
            console.log("*************");
            console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        BindCommandDelete.prototype.execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execSuccess();
        };
        
        BindCommandDelete.prototype.execSuccess = function() {
            // TODO::
            console.log("*************");
            console.log("_execSuccess()");

            this._onExecuted();  // "실행 종료" 이벤트 발생
        };

        return BindCommandDelete;
    
    }(BindCommandInternal));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandDelete;
    } else {
        global._W.Meta.Bind.BindCommandDelete = BindCommandDelete;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandList
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
    var BindCommandView;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandView     = require("./bind-command-view");
    } else {
        util                = global._W.Common.Util;
        BindCommandView     = global._W.Meta.Bind.BindCommandView;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandView === "undefined") throw new Error("[BindCommandView] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandList  = (function (_super) {
        /**
         * @class
         */
        function BindCommandList(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

        }
        util.inherits(BindCommandList, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandList.prototype.getTypes  = function() {
                
            var type = ["BindCommandList"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindCommandList.prototype.execValid = function() {
            // TODO::
            console.log("*************");
            console.log("_execValid()");
            for(var i = 0; i < this.valid.items.count; i++) {
                console.log("valid : " + this.valid.items[i].name);
            }
            return true;
        };

        BindCommandList.prototype.execBind = function() {
            // TODO::
            console.log("*************");
            console.log("_execBind()");
            for(var i = 0; i < this.bind.items.count; i++) {
                console.log("bind : " + this.bind.items[i].name);
            }
            this._execSuccess();
        };
        
        BindCommandList.prototype.execSuccess = function() {
            // TODO::
            console.log("*************");
            console.log("_execSuccess()");
            this._execView();
        };

        BindCommandList.prototype.execView = function() {
            // TODO::
            console.log("*************");
            console.log("_execView()");
            for(var i = 0; i < this._output.count; i++) {
                for (var ii = 0; ii < this._output[i].items.count; ii++) {
                    console.log("output["+ i +"] : " + this._output[i].items[ii].name);
                }
            }
            this._onExecuted();  // "실행 종료" 이벤트 발생
        };


        return BindCommandList;
    
    }(BindCommandView));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandList;
    } else {
        global._W.Meta.Bind.BindCommandList = BindCommandList;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandReadAjax
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
    var BindCommandView;
    var EntityView;
    var request;
    var jquery;
    var ajax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindCommandView     = require("./bind-command-view");
        EntityView          = require("./entity-view").EntityView;
        request             = require("request");
    } else {
        util                = global._W.Common.Util;
        BindCommandView     = global._W.Meta.Bind.BindCommandView;
        EntityView          = global._W.Meta.Entity.EntityView;
        jquery              = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
        ajax                = jquery.ajax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommandView === "undefined") throw new Error("[BindCommandView] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandReadAjax  = (function (_super) {
        /**
         * @class
         */
        function BindCommandReadAjax(p_bindModel, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            // TODO:: jquery 등 외부 모듈을 이용하여, 검사 진행, 하지만 꼭 필요한지 사용시 재검토
            var __ajaxSetup = {
                url: "",            // 경로
                type: "POST",       // 전송방법 : GET, POST
                dataType: "json",
                async: true,        // [*]비동기(ture), 동기(false)

            };

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

        }
        util.inherits(BindCommandReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindCommandReadAjax.prototype.getTypes  = function() {
                
            var type = ["BindCommandReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * (WEB & NodeJs 의 어뎁터 패턴)
         * node 에서는 비동기만 반영함 (테스트 용도) =>> 필요시 개발함
         * @param {Object} i_setup 
         */
        BindCommandReadAjax.prototype._ajaxAdapter = function(i_setup) {
            
            var option = {};
            var result;
            
            var msg;
            var code;

            /** @function */
            function callback(error, response, body) {

                var status = response ? response.statusCode : null;
                var msg    = response ? response.statusMessage : "";

                // (xhr,status)
                i_setup.complete(response, status);

                if (error || response.statusCode !== 200) {    // 실패시
                    msg = error ? (msg + " :: " + error) : msg;
                    // (xhr,status,error)
                    i_setup.error(response, status, msg);
                } else {                                    // 성공시
                    if (i_setup.dataType === "json") result = JSON.parse(body);
                    result = result || body;
                    // (result,status,xhr)
                    i_setup.success(result, error, response);
                }                
            }

            if (ajax) {
                if (typeof ajax === "undefined") throw new Error("[ajax] module load fail...");
                // 원격 서비스 호출
                ajax(i_setup);
            } else {
                option.uri = i_setup.url;
                // option.json = true // json 으로 JSON 으로 요청함
    
                if (i_setup.type === "GET") {
                    option.method = "POST";
                    option.qs = i_setup.data;
                    request.get(option, callback);
                } else if (i_setup.type === "POST") {
                    option.method = "POST";
                    option.form = i_setup.data;
                    request.post(option, callback);
                } else {
                    // 기타 :: 결과는 확인 안함
                    request(option, callback);
                }
            }
        };

        /**
         * AJAX 를 기준으로 구성함 (requst는 맞춤)
         * error(xhr,status,error)
         * @param {*} xhr 
         * @param {*} status 
         * @param {*} error 
         */
        BindCommandReadAjax.prototype._ajaxError = function(xhr, status, error) {
            
            var msg ="";
            
            msg = xhr && xhr.statusText ? xhr.statusText : error;
            this._onFail(msg);
            
            this._onExecuted();  // "실행 종료" 이벤트 발생
        }

        /**
         * AJAX 를 기준으로 구성함 (requst는 맞춤)
         * complete(xhr,status)
         * @param {*} xhr 
         * @param {*} status 
         * @param {*} error 
         */
        BindCommandReadAjax.prototype._ajaxComplete = function(xhr, status) {
            
            // TODO::
            // var msg ="";
            
            // msg = xhr && xhr.statusText ? xhr.statusText : error;
            // this._onFail(msg);
        }

        BindCommandReadAjax.prototype._execBind = function() {
            
            var ajaxSetup = {};
            
            ajaxSetup.url       = this.ajaxSetup.url || this._model.baseAjaxSetup.url;
            ajaxSetup.dataType  = "json";
            ajaxSetup.success   = this._execSuccess.bind(this);
            ajaxSetup.error     = this._ajaxError.bind(this);
            ajaxSetup.complete  = this._ajaxComplete.bind(this);

            for(var i = 0; i < this.bind.items.count; i++) {
                if(typeof ajaxSetup.data !== "object") ajaxSetup.data = {};
                ajaxSetup.data[this.bind.items[i].name] = this.bind.items[i].refValue; // 값
            }

            this._ajaxAdapter(ajaxSetup);       // Ajax 호출 (web | node)
        };

        return BindCommandReadAjax;
    
    }(BindCommandView));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandReadAjax;
    } else {
        global._W.Meta.Bind.BindCommandReadAjax = BindCommandReadAjax;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindModelList
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
    var BindCommandList;
    var EntityTable;
    var IBindModelList;

    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
        
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandList     = require("./bind-command-list");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelList      = require("./i-bind-model-list");

    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandList     = global._W.Meta.Bind.BindCommandList;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelList      = global._W.Interface.IBindModelList;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandList === "undefined") throw new Error("[BindCommandList] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelList === "undefined") throw new Error("[IBindModelList] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelList  = (function (_super) {
        /**
         * @class
         */
        function BindModelList() {
            _super.call(this);

            var __firest    = new EntityTable("first");
            var __list      = new BindCommandList(this, this.first);

            /** @property {first} */
            Object.defineProperty(this, "first", 
            {
                get: function() { return __firest; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityTable)) throw new Error("Only [first] type 'EntityTable' can be added");
                    __firest = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {list} */
            Object.defineProperty(this, "list", 
            {
                get: function() { return __list; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [list] type 'BindCommand' can be added");
                    __list = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelList);              
        }
        util.inherits(BindModelList, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelList.prototype.getTypes  = function() {
                    
            var type = ["BindModelList"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelList.prototype.init = function() {
            // TODO::
        };

        return BindModelList;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelList;
    } else {
        global._W.Meta.Bind.BindModelList = BindModelList;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindModelRead
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
    var BindCommand;
    var EntityTable;
    var IBindModelRead;
    
    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필

        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommand         = require("./bind-command");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelRead      = require("./i-bind-model-read");
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommand         = global._W.Meta.Bind.BindCommand;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelRead      = global._W.Interface.IBindModelRead;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelRead === "undefined") throw new Error("[IBindModelRead] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelRead  = (function (_super) {
        /**
         * @class
         */
        function BindModelRead(p_objectDI) {
            _super.call(this, p_objectDI);


            var __firest    = new EntityTable("first");

            // var __read      = new BindCommandRead(this, __firest);
            var __read      = null;

            /** @property {first} */
            Object.defineProperty(this, "first", 
            {
                get: function() { return __firest; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityTable)) throw new Error("Only [first] type 'EntityTable' can be added");
                    __firest = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {read} */
            Object.defineProperty(this, "read", 
            {
                get: function() { return __read; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [read] type 'BindCommand' can be added");
                    __read = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelRead);              
        }
        util.inherits(BindModelRead, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelRead.prototype.getTypes  = function() {
                    
            var type = ["BindModelRead"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelRead;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelRead;
    } else {
        global._W.Meta.Bind.BindModelRead = BindModelRead;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindModelCreate
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
    var BindCommandRead;
    var EntityTable;
    var IBindModelCreate;
    
    if (typeof module === "object" && typeof module.exports === "object") {    
        require("./object-implement"); // _implements() : 폴리필
         
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandRead     = require("./bind-command-read");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelCreate    = require("./i-bind-model-create");
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelCreate    = global._W.Interface.IBindModelCreate;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelCreate === "undefined") throw new Error("[IBindModelCreate] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelCreate  = (function (_super) {
        /**
         * @class
         */
        function BindModelCreate() {
            _super.call(this);


            var __firest    = new EntityTable("first");

            // var __create      = new BindCommandRead(this, __firest);
            var __create      = null;

            /** @property {first} */
            Object.defineProperty(this, "first", 
            {
                get: function() { return __firest; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityTable)) throw new Error("Only [first] type 'EntityTable' can be added");
                    __firest = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {create} */
            Object.defineProperty(this, "create", 
            {
                get: function() { return __create; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommandRead)) throw new Error("Only [create] type 'BindCommandRead' can be added");
                    __create = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelCreate);              
        }
        util.inherits(BindModelCreate, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelCreate.prototype.getTypes  = function() {
                    
            var type = ["BindModelCreate"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelCreate;
    
    }(BindModel));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelCreate;
    } else {
        global._W.Meta.Bind.BindModelCreate = BindModelCreate;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindModelListDel
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
    var BindModelList;
    var BindCommandList;
    var EntityTable;
    var IBindModelListDel;

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        util                = require("./utils");
        BindModelList       = require("./bind-model-list");
        BindCommandList     = require("./bind-command-list");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelListDel   = require("./i-bind-model-list-del");
    } else {
        util                = global._W.Common.Util;
        BindModelList       = global._W.Meta.Bind.BindModelList;
        BindCommandList     = global._W.Meta.Bind.BindCommandList;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelListDel   = global._W.Interface.IBindModelListDel;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelList === "undefined") throw new Error("[BindModelList] module load fail...");
    if (typeof BindCommandList === "undefined") throw new Error("[BindCommandList] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelListDel === "undefined") throw new Error("[IBindModelListDel] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelListDel  = (function (_super) {
        /**
         * @class
         */
        function BindModelListDel() {
            _super.call(this);

            var __delete    = null;

            /** @property {delete} */
            Object.defineProperty(this, "delete", 
            {
                get: function() { return __delete; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [delete] type 'BindCommand' can be added");
                    __delete = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelListDel);              
        }
        util.inherits(BindModelListDel, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelListDel.prototype.getTypes  = function() {
                    
            var type = ["BindModelListDel"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelListDel.prototype.init = function() {
            // TODO::
        };

        return BindModelListDel;
    
    }(BindModelList));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelListDel;
    } else {
        global._W.Meta.Bind.BindModelListDel = BindModelListDel;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindModelReadDelDel
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
    var BindModelRead;
    var BindCommandRead;
    var BindCommandDelete;
    var EntityTable;
    var IBindModelReadDel;

    if (typeof module === "object" && typeof module.exports === "object") {   
        require("./object-implement"); // _implements() : 폴리필
          
        util                = require("./utils");
        BindModelRead       = require("./bind-model-read");
        BindCommandRead     = require("./bind-command-read");
        BindCommandDelete   = require("./bind-command-delete");
        EntityTable         = require("./entity-table").EntityTable;
        IBindModelReadDel   = require("./i-bind-model-read-del");
    } else {
        util                = global._W.Common.Util;
        BindModelRead       = global._W.Meta.Bind.BindModelRead;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        BindCommandDelete   = global._W.Meta.Bind.BindCommandDelete;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        IBindModelReadDel   = global._W.Interface.IBindModelReadDel;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelRead === "undefined") throw new Error("[BindModelRead] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof BindCommandDelete === "undefined") throw new Error("[BindCommandDelete] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof IBindModelReadDel === "undefined") throw new Error("[IBindModelReadDel] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadDel  = (function (_super) {
        /**
         * @class
         */
        function BindModelReadDel() {
            _super.call(this);

            var __delete    = new BindCommandDelete(this, this.first);

            /** @property {delete} */
            Object.defineProperty(this, "delete", 
            {
                get: function() { return __delete; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [delete] type 'BindCommand' can be added");
                    __delete = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelReadDel);                    
        }
        util.inherits(BindModelReadDel, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadDel.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadDel"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        BindModelReadDel.prototype.init = function() {
            // TODO::
        };

        return BindModelReadDel;
    
    }(BindModelRead));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadDel;
    } else {
        global._W.Meta.Bind.BindModelReadDel = BindModelReadDel;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindModelEdit
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
    var BindCommandCreate;
    var BindCommandRead;
    var BindCommandUpdate;
    var BindCommandDelete;
    var EntityTable;
    var PropertyCollection;
    var IBindModelEdit;

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        util                        = require("./utils");
        BindModel                   = require("./bind-model");
        BindCommandCreate           = require("./bind-command-create");
        BindCommandRead             = require("./bind-command-read");
        BindCommandUpdate           = require("./bind-command-update");
        BindCommandDelete           = require("./bind-command-delete");
        EntityTable                 = require("./entity-table").EntityTable;
        PropertyCollection          = require("./collection-property");
        IBindModelEdit              = require("./i-bind-model-edit");
    } else {
        util                        = global._W.Common.Util;
        BindModel                   = global._W.Meta.Bind.BindModel;
        BindCommandCreate           = global._W.Meta.Bind.BindCommandCreate;
        BindCommandRead             = global._W.Meta.Bind.BindCommandRead;
        BindCommandUpdate           = global._W.Meta.Bind.BindCommandUpdate;
        BindCommandDelete           = global._W.Meta.Bind.BindCommandDelete;
        EntityTable                 = global._W.Meta.Entity.EntityTable;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        IBindModelEdit               = global._W.Interface.IBindModelEdit;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandCreate === "undefined") throw new Error("[BindCommandCreate] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof BindCommandUpdate === "undefined") throw new Error("[BindCommandUpdate] module load fail...");
    if (typeof BindCommandDelete === "undefined") throw new Error("[BindCommandDelete] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IBindModelEdit === "undefined") throw new Error("[IBindModelEdit] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelEdit  = (function (_super) {
        /**
         * @class
         */
        function BindModelEdit() {
            _super.call(this);

            var __firest    = new EntityTable("first");
            
            // var __create    = new BindCommandCreate(this, this.first);
            // var __read      = new BindCommandRead(this, this.first);
            // var __update    = new BindCommandUpdate(this, this.first);
            // var __delete    = new BindCommandDelete(this, this.first);
            var __read      = null;
            var __update    = null;
            var __delete    = null;

            /** @property {first} */
            Object.defineProperty(this, "first", 
            {
                get: function() { return __firest; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityTable)) throw new Error("Only [first] type 'EntityTable' can be added");
                    __firest = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {read} */
            Object.defineProperty(this, "read", 
            {
                get: function() { return __read; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [read] type 'BindCommand' can be added");
                    __read = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {update} */
            Object.defineProperty(this, "update", 
            {
                get: function() { return __update; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [update] type 'BindCommand' can be added");
                    __update = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /** @property {delete} */
            Object.defineProperty(this, "delete", 
            {
                get: function() { return __delete; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [delete] type 'BindCommand' can be added");
                    __delete = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelEdit);
        }
        util.inherits(BindModelEdit, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelEdit.prototype.getTypes  = function() {
                    
            var type = ["BindModelEdit"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelEdit;
    
    }(BindModel));
    
        
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelEdit;
    } else {
        global._W.Meta.Bind.BindModelEdit = BindModelEdit;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindModelForm
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
    var BindModelEdit;
    var BindCommandCreate;
    var BindCommandRead;
    var BindCommandUpdate;
    var BindCommandDelete;
    var EntityTable;
    var PropertyCollection;
    var IBindModelForm;

    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        util                        = require("./utils");
        BindModelEdit               = require("./bind-model-edit");
        BindCommandCreate           = require("./bind-command-create");
        BindCommandRead             = require("./bind-command-read");
        BindCommandUpdate           = require("./bind-command-update");
        BindCommandDelete           = require("./bind-command-delete");
        EntityTable                 = require("./entity-table").EntityTable;
        PropertyCollection          = require("./collection-property");
        IBindModelForm              = require("./i-bind-model-form");
    } else {
        util                        = global._W.Common.Util;
        BindModelEdit               = global._W.Meta.Bind.BindModelEdit;
        BindCommandCreate           = global._W.Meta.Bind.BindCommandCreate;
        BindCommandRead             = global._W.Meta.Bind.BindCommandRead;
        BindCommandUpdate           = global._W.Meta.Bind.BindCommandUpdate;
        BindCommandDelete           = global._W.Meta.Bind.BindCommandDelete;
        EntityTable                 = global._W.Meta.Entity.EntityTable;
        PropertyCollection          = global._W.Collection.PropertyCollection;
        IBindModelForm               = global._W.Interface.IBindModelForm;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelEdit === "undefined") throw new Error("[BindModelEdit] module load fail...");
    if (typeof BindCommandCreate === "undefined") throw new Error("[BindCommandCreate] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof BindCommandUpdate === "undefined") throw new Error("[BindCommandUpdate] module load fail...");
    if (typeof BindCommandDelete === "undefined") throw new Error("[BindCommandDelete] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof IBindModelForm === "undefined") throw new Error("[IBindModelForm] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var BindModelForm  = (function (_super) {
        /**
         * @class
         */
        function BindModelForm() {
            _super.call(this);

            var __create    = null;

            /** @property {create} */
            Object.defineProperty(this, "create", 
            {
                get: function() { return __create; },
                set: function(newValue) { 
                    if (!(newValue instanceof BindCommand)) throw new Error("Only [create] type 'BindCommand' can be added");
                    __create = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * @interface IBindModel 인터페이스 선언
             */
            this._implements(IBindModelForm);              
        }
        util.inherits(BindModelForm, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelForm.prototype.getTypes  = function() {
                    
            var type = ["BindModelForm"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelForm;
    
    }(BindModelEdit));
    
        
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelForm;
    } else {
        global._W.Meta.Bind.BindModelForm = BindModelForm;
    }

}(this));
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
    var BindModelRead;
    var BindCommandRead;
    var EntityTable;
    var BindCommandReadAjax;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModelRead       = require("./bind-model-read");
        BindCommandRead     = require("./bind-command-read");
        EntityTable         = require("./entity-table").EntityTable;
        BindCommandReadAjax = require("./bind-command-read-ajax");
    } else {
        util                = global._W.Common.Util;
        BindModelRead       = global._W.Meta.Bind.BindModelRead;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
        EntityTable         = global._W.Meta.Entity.EntityTable;
        BindCommandReadAjax = global._W.Meta.Bind.BindCommandReadAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModelRead === "undefined") throw new Error("[BindModelRead] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");
    if (typeof EntityTable === "undefined") throw new Error("[EntityTable] module load fail...");
    if (typeof BindCommandReadAjax === "undefined") throw new Error("[BindCommandReadAjax] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelReadAjax  = (function (_super) {
        /**
         * @class
         */
        function BindModelReadAjax(p_objectDI) {
            _super.call(this, p_objectDI);

            var __baseAjaxSetup = {
                url: "",
                method: "POST"
            };

            /** @override */
            this.read = new BindCommandReadAjax(this, this.first);

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

            /** @property {baseMethod} */
            Object.defineProperty(this, "baseMethod",
            {
                get: function() { return __baseAjaxSetup.method; },
                set: function(newValue) { 
                    if (!(typeof newValue === "string")) throw new Error("Only [baseMethod] type 'string' can be added");
                    __baseAjaxSetup.method = newValue;
                },
                configurable: true,
                enumerable: true
            });             
        }
        util.inherits(BindModelReadAjax, _super);
    
        /** @override 상속 클래스에서 오버라이딩 필요!! **/
        BindModelReadAjax.prototype.getTypes  = function() {
                    
            var type = ["BindModelReadAjax"];
            
            return type.concat(typeof _super !== "undefined" && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        return BindModelReadAjax;
    
    }(BindModelRead));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindModelReadAjax;
    } else {
        global._W.Meta.Bind.BindModelReadAjax = BindModelReadAjax;
    }

}(this));