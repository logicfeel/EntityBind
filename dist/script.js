/**
 * @namespace Object.prototype
 * Object : 폴리필
 *      - Object.prototype.isImplementOf() : [protected] 구현 여부
 *      - Object.prototype._implements() : 인터페이스(클래스 포함) 등록 *다중상속*
*/

if ((typeof Object.prototype._implements === "undefined") ||
    (typeof Object.prototype.isImplementOf === "undefined")) {

    (function(global) {

        "use strict";

        //==============================================================
        // 1. 모듈 | 네임스페이스 선언 (폴리필)
        
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
         * @param {Function} a_imps 함수형 인터페이스 목록
         */
        var _implements = function _implements(a_imps) {
            this._interface = this._interface || [];

            var typeName;
            var obj;    
        
            for(var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "function") {
                    this._interface.push(arguments[i]);
                    this._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                } else {
                    throw new Error("함수타입민 가능합니다.");
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
        Object.prototype._implements = _implements;
        Object.prototype.isImplementOf = isImplementOf;

    }(this));
}
/**
 * Arrary : 폴리필 (웹전용)
 *      - Arrary.prototype.isArray() : 배열 유무
*/

if (typeof Array.isArray === "undefined") {

    (function(global) {

        "use strict";

        //==============================================================
        // 1. 모듈 | 네임스페이스 선언 (폴리필)
        
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
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {
    } else {
        global._W               = global._W || {};
        global._W.Common        = global._W.Common || {};
        global._W.Common.Util   = global._W.Common.Util || {};
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
    // 1. 모듈 | 네임스페이스 | 폴리필 선언
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
    } else {
        global._W               = global._W || {};
        global._W.Common        = global._W.Common || {};
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
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || "any";
            
            if (p_code in this.subscribers) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (typeof this.subscribers[p_code][i] === "function") {
                        this.subscribers[p_code][i].call(this._this, this._onwer);  // REVIEW:: _onwer 인수 확인필요!
                    }
                }
            }
            
            if (this.isDebug) {
                console.log("publish() 이벤트 발생 [" + this._this.constructor.name + "] type:" + p_code);
            }
            
        };

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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    
        IObject.prototype.getGUID  = function() {
            throw new Error("에러:: 구현해야함.");
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    var util;
    var IObject;

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
            throw new Error("에러:: 구현해야함.");
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
 * @namespace _W.Interface.IMarshal
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
 * _W.Collection
 *      - BaseCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)


    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    var ICollection;
    var Observer;    

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {
        require("./object-implement"); // _implements() : 폴리필

        ICollection             = require("./i-collection");
        Observer                = require("./observer");
    } else {
        ICollection             = global._W.Interface.ICollection;
        Observer                = global._W.Common.Observer;
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
 * _W.Collection
 *      - ArrayCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    var util;
    var BaseCollection;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
 * _W.Collection
 *      - PropertyCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IProperyCollection);            
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
 * @namespace _W.Meta.MetaObject
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    
        /**
         * @method GUID 생성
         */
        MetaObject.prototype._newGUID  = function() {
            return common.createGUID();
        };

        /**
         * 조건 : GUID는 한번만 생성해야 함
         * @method GUID 얻기
         */
        MetaObject.prototype.getGUID  = function() {
            if (this.__GUID === null) {
                this.__GUID = this._newGUID();
            }
            return this.__GUID;
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    

    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

    var util;
    var MetaObject;
    var IMarshal;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)


    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

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
 * @namespace _W.Meta.Entity
 *      - Item
 *      - ItemCollection
 *      - ItemRefCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
         */
        function Item(p_name) {
            _super.call(this, p_name);

            this.default = null;
            this.caption = null;
            this.codeType = null;
        }
        util.inherits(Item, _super);

        // TODO::
        // Item.prototype.add  = function() {};

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
                i_value = new Item(i_name);
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
         * @param {?ItemCollection} p_base 참조기본 컬렉션
         */
        function ItemRefCollection(p_onwer, p_base) {
            _super.call(this, p_onwer);

            if (typeof p_base !== "undefined" && !(p_base instanceof ItemCollection)) {
                throw new Error("Error!! ItemCollection object [p_base].");
            }
            
            /**
             * @protected @member
             */
            this._baseCollection = p_base;
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
            } else if (this._baseCollection instanceof ItemCollection) {
                collection = this._baseCollection;
            }
            
            if (collection) {
                if (collection.contains(i_name)) {
                    item = collection[i_name];                      // 참조 가져옴
                } else {
                    item = collection.add(p_object);                // 참조 가져옴
                }
                
                // 의존성을 낮추기 위해서 검사후 등록
                // 오너 참조에 검사후 없을경우 등록하는 루틴 필요
                if (this._onwer.regRefer) {
                    this._onwer.regRefer(collection._onwer);
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
 * @namespace _W.Meta.Entity.Entity
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        require("./object-implement"); // _implements() : 폴리필
        
        util                    = require("./utils");
        MetaElement             = require("./meta-element");
        IGroupControl           = require("./i-control-group");
        IAllControl             = require("./i-control-all");
    } else {
        util                    = global._W.Common.Util;
        MetaElement             = global._W.Meta.MetaElement;
        IGroupControl           = global._W.Interface.IGroupControl;
        IAllControl             = global._W.Interface.IAllControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaElement === "undefined") throw new Error("[MetaElement] module load fail...");
    if (typeof IGroupControl === "undefined") throw new Error("[IGroupControl] module load fail...");
    if (typeof IAllControl === "undefined") throw new Error("[IAllControl] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var Entity  = (function (_super) {
        /**
         * @abstract @class
         */
        function Entity(p_name) {
            _super.call(this, p_name);

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
             * @abstract 상속에서 생성해야함
             */
            this.items = null;
            this.rows = null;

             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(Entity, _super);

        /**
         * @abstract IGroupControl
         */
        Entity.prototype.merge  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        Entity.prototype.copyTo  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        
        /**
         * @abstract IAllControl
         */
        Entity.prototype.clone  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        Entity.prototype.load  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };
        Entity.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        Entity.prototype.select  = function() {
            throw new Error("[ select() ] Abstract method definition, fail...");
        };

        Entity.prototype.newRow  = function() {
            // TODO::
        };
        Entity.prototype.clearRow  = function() {
            // TODO::
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
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Entity   = global._W.Meta.Entity || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var Entity;
    var PropertyCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        PropertyCollection  = require("./collection-property");
    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var EntityTable  = (function (_super) {
        /**
         * @abstract @class
         */
        function EntityTable(p_name) {
            _super.call(this, p_name);

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
             * @abstract 상속에서 생성해야함
             */
            this.items = null;
            this.rows = null;

             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(EntityTable, _super);

        EntityTable.prototype.merge  = function() {
            // TODO::
        };
        
        EntityTable.prototype.copyTo  = function() {
            // TODO::
        };
        
        EntityTable.prototype.clone  = function() {
            // TODO::
        };
        
        EntityTable.prototype.load  = function() {
            // TODO::
        };
        
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
                i_value = new Item(i_name);
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
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Entity   = global._W.Meta.Entity || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var Entity;
    var ItemRefCollection;
    var PropertyCollection;
    var ArrayCollection;
    var IGroupControl;
    var IAllControl;


    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        Entity              = require("./entity-base");
        ItemRefCollection   = require("./entity-item").ItemRefCollection;
        PropertyCollection  = require("./collection-property");
        ArrayCollection     = require("./collection-array");
        IGroupControl       = require("./i-control-group");
        IAllControl         = require("./i-control-all");

    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        ItemRefCollection   = global._W.Meta.Entity.ItemRefCollection;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ArrayCollection     = global._W.Collection.ArrayCollection;
        IGroupControl       = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof Entity === "undefined") throw new Error("[Entity] module load fail...");
    if (typeof ItemRefCollection === "undefined") throw new Error("[ItemRefCollection] module load fail...");
    if (typeof PropertyCollection === "undefined") throw new Error("[PropertyCollection] module load fail...");
    if (typeof ArrayCollection === "undefined") throw new Error("[ArrayCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var EntityView  = (function (_super) {
        /**
         * @abstract @class
         */
        function EntityView(p_name, p_baseCollection) {
            _super.call(this, p_name);

            /**
             * @abstract 상속에서 생성해야함
             */
            this.items = new ItemRefCollection(this, p_baseCollection);
            this.rows = null;
            
             /**
             * @interface IProperyCollection 인터페이스 선언
             */
            this._implements(IGroupControl, IAllControl);                
        }
        util.inherits(EntityView, _super);

        EntityView.prototype._regRefer  = function() {
            // TODO::
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
        
        EntityView.prototype.load  = function() {
            // TODO::
        };
        
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
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        EntityViewCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new Item(i_name);
            } else if (p_object instanceof Item) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | EntityView object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
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

    //---------------------------------------
    var OutputCollection  = (function (_super) {
        /**
         * @class
         * @param {*} p_onwer 소유자 
         */
        function OutputCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(OutputCollection, _super);

        /**
         * 
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        OutputCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new EntityView(i_name);
            } else if (p_object instanceof EntityView) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | EntityView object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            return _super.prototype.add.call(this, i_value);
        };
        
        /**
         * EntityView 타입만 들어가게 제약조건 추가
         * @override
         */
        OutputCollection.prototype._getPropDesciptor = function(p_idx) {
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
        
        return OutputCollection;
    
    }(ArrayCollection));
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports.EntityView = EntityView;
        module.exports.EntityViewCollection = EntityViewCollection;
        module.exports.OutputCollection = OutputCollection;
    } else {
        global._W.Meta.Entity.EntityView = EntityView;
        global._W.Meta.Entity.EntityViewCollection = EntityViewCollection;
        global._W.Meta.Entity.OutputCollection = OutputCollection;
    }

}(this));
/**
 * @namespace _W.Meta.Entity.Row
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
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
        PropertyCollection  =  global._W.Collection.PropertyCollection;
        ArrayCollection     =  global._W.Collection.ArrayCollection;
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
        function Row() {
            _super.call(this, this);
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
            var i_name;

            if (typeof p_object === "string") {      
                i_name  = p_object;
                i_value = new Item(i_name);
            } else if (p_object instanceof Item) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error("string | Row object [p_object].");
            }

            if (typeof i_name === "undefined") throw new Error("There is no required value [p_name].");

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
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
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var Observer;
    var MetaObject;
    var ItemCollection;
    var item;
    var Item;
    var ItemCollection;


    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        Observer            = require("./observer");
        MetaObject          = require("./meta-object");
        item                = require("./entity-item");
        Item                = item.Item;
        ItemCollection      = item.ItemCollection;
    } else {
        util                = global._W.Common.Util;
        Observer            = global._W.Common.Observer;
        MetaObject          = global._W.Meta.MetaObject;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
        Item                = global._W.Meta.Entity.Item;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof MetaObject === "undefined") throw new Error("[MetaObject] module load fail...");
    if (typeof Observer === "undefined") throw new Error("[Observer] module load fail...");
    if (typeof Item === "undefined") throw new Error("[Item] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");

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

            /** @event */
            Object.defineProperty(this, "onExecute", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "execute");
                }
            });

            Object.defineProperty(this, "onExecuted", {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, "executed");
                }
            });
        }
        util.inherits(BaseBind, _super);

        /** @protected @event */
        BaseBind.prototype._onExecute = function() {
            this.__event.publish("execute"); 
        };

        /** @protected @event */
        BaseBind.prototype._onExecuted = function() {
            this.__event.publish("executed"); 
        };

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @abstract
         */
        BaseBind.prototype.add = function() {
            throw new Error("[ add() ] Abstract method definition, fail...");
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
/**
 * @namespace _W.Meta.Bind.BindModel
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
    var MetaObject;
    var ItemCollection;
    var BindCommand;
    var BaseBind;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseBind            = require("./bind-base");
        ItemCollection      = require("./entity-item").ItemCollection;
        BindCommand         = require("./bind-cmd");
    } else {
        util                = global._W.Common.Util;
        BaseBind            = global._W.Meta.Bind.BaseBind;
        ItemCollection      = global._W.Meta.Entity.ItemCollection;
        BindCommand         = global._W.Meta.Bind.BindCommand;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseBind === "undefined") throw new Error("[BaseBind] module load fail...");
    if (typeof ItemCollection === "undefined") throw new Error("[ItemCollection] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModel() {
            _super.call(this);

        }
        util.inherits(BindModel, _super);
    
        /** @virtual */
        BindModel.prototype.init = function() {
            throw new Error("[ init() ] Abstract method definition, fail...");
        };

/**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} a_cmds <선택> 추가할 아이템 명령
         */
        BindModel.prototype.add = function(p_item, a_cmds) {

            var cmds = [];

            // 유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error("Only [Item] type instances can be added");
            }
            if (typeof a_cmds !== "undefined" && !Array.isArray(a_cmds)) {
                throw new Error("Only [a_cmd] type Array can be added");
            }
            
            // 설정 대상 가져오기
            if (Array.isArray(a_cmds)) {
                for (var i = 0; i< a_cmds.length; i++) {
                    if (this[a_cmds[i]]) {
                        cmds.push(a_cmds[i]);
                    } else {
                        console.warn("Warning!! Param a_cmds 에 [" + a_cmds[i] + "]가 없습니다. ");
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof BindCommand && prop.substr(0, 1) !== "_") {
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
 * @namespace _W.Meta.Bind.BindCommandView
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
    var BindCommand;
    var entityView;
    var EntityView;
    var OutputCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommand         = require("./bind-command");
        entityView          = require("./entity-view");
        EntityView          = entityView.EntityView;
        OutputCollection    = entityView.OutputCollection;
    } else {
        util                = global._W.Common.Util;
        BindCommand         = global._W.Meta.Bind.BindCommand;
        EntityView          = global._W.Meta.Entity.EntityView;
        OutputCollection    = global._W.Meta.Entity.OutputCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof EntityView === "undefined") throw new Error("[EntityView] module load fail...");
    if (typeof OutputCollection === "undefined") throw new Error("[OutputCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandView  = (function (_super) {
        /**
         * @class
         */
        function BindCommandView(p_model) {
            _super.call(this, p_model);

            // TODO:: model 검사 추가해ㅑㅇ함
            
            /** @public  */
            this.valid  = new EntityView("valid", p_model.items);

            this.bind   = new EntityView("bind", p_model.items);

            this.output = new OutputCollection(this);
            this.output.add(new EntityView("output_1", p_model.items));

        }
        util.inherits(BindCommandView, _super);
    
        BindCommandView.prototype.execute = function() {
            if (this.execValid()) this.execBind();
        };

        /** @virtual */
        BindCommandView.prototype.execValid = function() {
            throw new Error("[ execValid() ] Abstract method definition, fail...");
        };

        /** @virtual */
        BindCommandView.prototype.execBind = function() {
            throw new Error("[ execBind() ] Abstract method definition, fail...");
        };
        
        /** @virtual */
        BindCommandView.prototype.execCallback = function() {
            throw new Error("[ execCallback() ] Abstract method definition, fail...");
        };

        /** @virtual */
        BindCommandView.prototype.execView = function() {
            throw new Error("[ execView() ] Abstract method definition, fail...");
        };

        return BindCommandView;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = BindCommandView;
    } else {
        global._W.Meta.Bind.BindCommandView = BindCommandView;
    }

}(this));
/**
 * @namespace _W.Meta.Bind.BindCommandInternal
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
    var BindCommand;
    var ItemRefCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommand         = require("./bind-cmd");
        ItemRefCollection   = require("./item");
    } else {
        util                = global._W.Common.Util;
        BindCommand         = global._W.Meta.Bind.BindCommand;
        ItemRefCollection   = global._W.Meta.Entity.ItemRefCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindCommand === "undefined") throw new Error("[BindCommand] module load fail...");
    if (typeof ItemRefCollection === "undefined") throw new Error("[ItemRefCollection] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindCommandInternal  = (function (_super) {
        /**
         * @class
         */
        function BindCommandInternal(p_model) {
            _super.call(this, p_model);

            /** @public  */
            this.valid = new ItemRefCollection(p_onwer.entity.items);

            this.bind = new ItemRefCollection(p_onwer.entity.items);
            
        }
        util.inherits(BindCommandInternal, _super);
    
        BindCommandInternal.prototype.execute = function() {
            if (this.execValid()) this.execBind();
        };

        /** @virtual */
        BindCommandInternal.prototype.execValid = function() {
            throw new Error("[ execValid() ] Abstract method definition, fail...");
        };

        /** @virtual */
        BindCommandInternal.prototype.execBind = function() {
            throw new Error("[ execBind() ] Abstract method definition, fail...");
        };
        
        /** @virtual */
        BindCommandInternal.prototype.execCallback = function() {
            throw new Error("[ execCallback() ] Abstract method definition, fail...");
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
 * @namespace _W.Meta.Bind.BindCommandCreate
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
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-cmd-internal");
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
        function BindCommandCreate(p_model) {
            _super.call(this, p_model);

        }
        util.inherits(BindCommandCreate, _super);
    
        BindCommandCreate.prototype.execValid = function() {
            // TODO::
        };

        BindCommandCreate.prototype.execBind = function() {
            // TODO::
        };
        
        BindCommandCreate.prototype.execCallback = function() {
            // TODO::
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
 * @namespace _W.Meta.Bind.BindCommandDelete
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
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-cmd-internal");
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
        function BindCommandDelete(p_model) {
            _super.call(this, p_model);

        }
        util.inherits(BindCommandDelete, _super);
    
        BindCommandDelete.prototype.execValid = function() {
            // TODO::
        };

        BindCommandDelete.prototype.execBind = function() {
            // TODO::
        };
        
        BindCommandDelete.prototype.execCallback = function() {
            // TODO::
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
    // 1. 모듈 | 네임스페이스 선언 (폴리필)
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandView;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandView     = require("./bind-cmd-view");
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
        function BindCommandList(p_model) {
            _super.call(this, p_model);

        }
        util.inherits(BindCommandList, _super);
    
        BindCommandList.prototype.execValid = function() {
            // TODO::
        };

        BindCommandList.prototype.execBind = function() {
            // TODO::
        };
        
        BindCommandList.prototype.execCallback = function() {
            // TODO::
        };

        BindCommandList.prototype.execView = function() {
            // TODO::
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
 * @namespace _W.Meta.Bind.BindCommandRead
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
    var BindCommandView;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandView     = require("./bind-cmd-view");
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
        function BindCommandRead(p_model) {
            _super.call(this, p_model);

        }
        util.inherits(BindCommandRead, _super);
    
        BindCommandRead.prototype.execValid = function() {
            // TODO::
        };

        BindCommandRead.prototype.execBind = function() {
            // TODO::
        };
        
        BindCommandRead.prototype.execCallback = function() {
            // TODO::
        };

        BindCommandRead.prototype.execView = function() {
            // TODO::
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
 * @namespace _W.Meta.Bind.BindCommandUpdate
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
    var BindCommandInternal;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("util");
        BindCommandInternal = require("./bind-cmd-internal");
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
        function BindCommandUpdate(p_model) {
            _super.call(this, p_model);

        }
        util.inherits(BindCommandUpdate, _super);
    
        BindCommandUpdate.prototype.execValid = function() {
            // TODO::
        };

        BindCommandUpdate.prototype.execBind = function() {
            // TODO::
        };
        
        BindCommandUpdate.prototype.execCallback = function() {
            // TODO::
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
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
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
 * @namespace _W.Meta.Bind.BindModelRead
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
    var BindModel;
    var BindCommandRead;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BindModel           = require("./bind-model");
        BindCommandRead     = require("./bind-cmd-read");
    } else {
        util                = global._W.Common.Util;
        BindModel           = global._W.Meta.Bind.BindModel;
        BindCommandRead     = global._W.Meta.Bind.BindCommandRead;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BindModel === "undefined") throw new Error("[BindModel] module load fail...");
    if (typeof BindCommandRead === "undefined") throw new Error("[BindCommandRead] module load fail...");


    //==============================================================
    // 4. 모듈 구현    
    var BindModelRead  = (function (_super) {
        /**
         * @abstract 추상클래스
         * @class
         */
        function BindModelRead() {
            _super.call(this);

            /** @public 마스터 아이템 (실 동록위치) */
            this.read       = new BindCommandRead(this);

            /** @public 마스터 아이템 (실 동록위치) */
            this.first      = new ItemCollection(this);
            
        }
        util.inherits(BindModelRead, _super);
    
        BindModelRead.prototype.init = function() {
            // TODO::
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