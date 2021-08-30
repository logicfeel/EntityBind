/**
 * Object : 폴리필
 * namespace Object.prototype.isImplementOf [protected] 구현 여부
 * namespace Object.prototype._implements 인터페이스(클래스 포함) 등록 *다중상속*
 */
if ((typeof Object.prototype._implements === 'undefined') ||
    (typeof Object.prototype.isImplementOf === 'undefined')) {

    (function(global) {

        'use strict';

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
         * @param {function} p_imp 
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
         * @param {function} args 함수형 인터페이스 목록
         */
        var _implements = function _implements(args) {
            this._interface = this._interface || [];

            var typeName;
            var obj;    
        
            for(var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === 'function') {
                    // 중복 제거
                    if (this._interface.indexOf(arguments[i]) < 0) {
                        this._interface.push(arguments[i]);
                        this._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                    }
                } else {
                    throw new Error('함수타입만 가능합니다.');
                }
                    
                obj = new arguments[i];
        
                for(var p in obj) {
                    typeName = (typeof obj[p] === 'function') ? 'Method' : 'Property';
                    
                    if (!(p in this) && !Object.prototype.hasOwnProperty(p)) {
                        console.warn('Warning!! 인터페이스 구현 해야함. ' + arguments[i].name + ' :: (' + typeName + ') ' + p);
                    }
                }
            }
        };

        //==============================================================
        // 5. 모듈 내보내기 (node | web)
        // jquery 에서 오류 발생으로 대체함
        // Object.prototype._implements = _implements;
        // Object.prototype.isImplementOf = isImplementOf;
		Object.defineProperty(Object.prototype, '_implements',
	    {
	        value: _implements,
	        enumerable: false
	    });
	    Object.defineProperty(Object.prototype, 'isImplementOf',
	    {
	        value: isImplementOf,
	        enumerable: false
        });
        
    }(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
}
/**
 * namespace Array.isArray : 배열 유무 (폴리필 웹전용)
 */
if (typeof Array.isArray === 'undefined') {

    (function(global) {
        
        'use strict';

        //==============================================================
        // 1. 모듈 네임스페이스 선언
        
        //==============================================================
        // 2. 모듈 가져오기 (node | web)

        //==============================================================
        // 3. 모듈 의존성 검사

        //==============================================================
        // 4. 모듈 구현    
        var isArray = function(pValue) {
            if (typeof Array.isArray === 'function') {
                return Array.isArray(pValue);
            } else {
                return Object.prototype.toString.call(pValue) === '[object Array]';
            }
        };

        //==============================================================
        // 5. 모듈 내보내기 (node | web)
        Arrary.isArray = isArray;

    }(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
}
/**
 * namespace _W.Common.Util
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};
    global._W.Common.Util   = global._W.Common.Util || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    

    /**
     * inherits(대상, 부모) : 상속
     * @function
     * @memberof _W.Common.Util
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
     * 배열 깊이 얻기
     * @param {*} p_elem 
     * @param {*} p_depts 
     * @memberof _W.Common.Util
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
     * createGUID GUID 생성
     * @memberof _W.Common.Util
     */
    var createGUID = function() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+'000000000').substr(2,8);  
            return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 셀렉터의 유효성 검사 : 대상을 모두 검사하여 결과를 리턴한다.
     * 주의!! DOM(web) 에서만 작동한다.
     * @param {String | Object | Array<Object>} p_obj 
     * @returns {String} 없는 셀렉터, 통화하면 null 리턴
     * @memberof _W.Common.Util
     */
    var validSelector = function(p_obj, p_isJQuery) {
        
        var selectors = [];

        // 입력형식에 따른 배열에 삽입
        if (typeof p_obj === 'string') selectors.push(p_obj);
        else if (typeof p_obj === 'array') {
            selectors = p_obj;
        } else if (typeof p_obj === 'object') {
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

        if (typeof document === 'object' && typeof document.querySelector === 'function') {     
            // 유효성 검사
            for(var i = 0; selectors.length > i; i++) {
                if (typeof selectors[i] !== 'string') throw new Error('Only [selectors] type "string" can be added');

                // if (document.querySelector(selectors[i]) === null) {
                //     return selectors[i];
                // }
                if (p_isJQuery === true) {
                    if (jQuery(selectors[i]).length === 0) {
                        return selectors[i];
                    }
                } else {
                    if (document.querySelector(selectors[i]) === null) {
                        return selectors[i];
                    }
                }
            }
        } else {
            throw new Error('[document.querySelector] module load fail...');
        }

        return null;
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.inherits = inherits;
        module.exports.getArrayLevel = getArrayLevel;
        module.exports.createGUID = createGUID;
    } else {
        global._W.Common.Util.inherits = inherits;
        global._W.Common.Util.getArrayLevel = getArrayLevel;
        global._W.Common.Util.createGUID = createGUID;
        global._W.Common.Util.validSelector = validSelector;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Common.Observer
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
    } else {
    }

    //==============================================================Á
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    
    var Observer = (function () {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _W.Common.Observer
         * @param {obejct} p_onwer Observer 클래스의 소유 함수 또는 클래스
         * @param {object} p_this 함수 호출 본문에서 this 역활 publish.apply(p_this, ...)
         */
        function Observer(p_onwer, p_this) {

            this.isDebug = false;

            /**
             * 등록함수의 this 
             * @member {Object} */
            this._this = p_this;    

            /** 
             * 이벤트의 소유자
             * @protected
             * @member {Object}   
             */
            this._onwer = p_onwer;
            
            /**
             * 전역 구독자
             * @member {Object}
             */
            this.subscribers = {
                any: []
            };
            
            /** 
             * 이벤트 전파 설정 (기본값:true)
             * @member {Boolean}
             */
            this.propagation    = true;

            /** 
             * 단일 구독자 모드, 마지막 등록 구독자만 활성화 (기본값:true)  
             * @member {Boolean} 
             */
            this.isMultiMode    = true;
        }

        /**
         * 구독 신청
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에 등록 된다.
         * @param {Function} p_fn  구독 콜백 함수
         * @param {?String} p_code 구독 코드명 : 기본값 'any'
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            var subscribers = null;

            if (typeof p_fn === 'undefined') throw new Error('p_fn param request fail...');
            if (typeof p_fn !== 'function') throw new Error('Only [p_fn] type "function" can be added');

            // 싱글모드일 경우 기존내용 모두 제거
            if (!this.isMultiMode) this.unsubscribeAll(p_code);

            if (typeof this.subscribers[p_code] === 'undefined') {
                this.subscribers[p_code] = [];
            }
            subscribers = this.subscribers[p_code];
            subscribers.push(p_fn);
        };
        
        /**
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에서 취소 된다.
         * @param {Function} p_fn [필수] 이벤트 콜백 함수
         * @param {?String} p_code 이벤트 코드명 : 기본값 'any'
         */
        Observer.prototype.unsubscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            if (typeof p_fn === 'undefined') throw new Error('p_fn param request fail...');

            if (this.subscribers[p_code]) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (this.subscribers[p_code][i] === p_fn) {
                        this.subscribers[p_code].splice(i, 1);
                    }
                }
            }
        };

        /**
         * 전체 또는 지정 구독을 취소한다.
         * @param {?String} p_code 이벤트 코드명
         * @desc 
         *  - p_code 입력하면 해당 콜백함수들 구독 취소한다.
         *  - p_code 를 입력하지 않으면 전체 등록된 이벤트가 취소된다.
         */
        Observer.prototype.unsubscribeAll = function(p_code) {

            if (typeof p_code === 'undefined') {     // 전체 구독 삭제
                this.subscribers = {any: []};
            } else {                        // 코드명 구독(함수) 전체 삭제
                delete this.subscribers[p_code];
            }
        };

        /**
         * 구독 함수 전체 또는 지정 구독을 호출한다.
         * @param {?String} p_code 이벤트 코드명 : 기본값 'any'
         */
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || 'any';
            
            var args = Array.prototype.slice.call(arguments);
            var params = args.length >= 1 ? args.splice(1) : [];

            // this.propagation = true;    // 이벤트 전파

            if (p_code in this.subscribers) {
                for (var i = 0; i < this.subscribers[p_code].length; i++) {
                    if (typeof this.subscribers[p_code][i] === 'function') {
                        // this.subscribers[p_code][i].call(this._this, this._onwer);  // REVIEW:: _onwer 인수 확인필요! >> 전달파라메터 
                        this.subscribers[p_code][i].apply(this._this, params);
                    }
                }
            }
            
            if (this.isDebug) {
                console.log('publish() 이벤트 발생 [' + this._this.constructor.name + '] type:' + p_code);
            }
        };

        /**
         * 이벤트 전달을 중단한다.
         */
        Observer.prototype.stopPropagation = function() {
            this.propagation = false;
        }

        return Observer;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = Observer;
    } else {
        global._W.Common.Observer = Observer;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Common.CustomError
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                        = require('./utils');
    } else {
        util                        = global._W.Common.Util;
    }

    //==============================================================Á
    // 3. 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    
    var CustomError = (function (_super) {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _W.Common.CustomError
         * @param {String} p_message 사용자 메세지 내용
         * @param {?String} p_target 대상(값)
         * @param {?String} p_name 에러명
         * 우선순위 : 메세지 > 타겟 > 에러명
         */
        function CustomError(p_message, p_target, p_name) {
            _super.call(this, p_message);

            /**
             * 에러 스텍
             * @member {String} _W.Common.CustomError#stack
             */
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, CustomError);
            }

            /**
             * 에러 메세지
             * @member {Object} 
             */
            this.message = p_message;    

            /**
             * 에러 구분자
             * @member {Object} 
             */
            this.target = { value: p_target || ''};

            /**
             * 에러명
             * @member {Object} 
             */
            this.name = p_name || 'CustomError';
            
            // TODO:: 추후 [내부처리] 부분 구현
            this.innerExecute();
        }
        util.inherits(CustomError, _super);

        /**
         * 내부처리
         */
         CustomError.prototype.innerExecute = function() {
            // console.log('CustomError.innerExecute()');
        };

        return CustomError;
        
    }(Error));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = CustomError;
    } else {
        global._W.Common.CustomError = CustomError;
        global._W.CustomError = CustomError;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IObject
 */
(function(global) {
    
    'use strict';

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
        /**
         * 최상위 객체 인터페이스
         * @constructs _W.Interface.IObject 
         * @interface
         */
        function IObject() {
        }
        
        /**
         * 객체타입 얻기
         */
        IObject.prototype.getTypes  = function() {
            throw new Error('[ getTypes() ] Abstract method definition, fail...');
        };
        
        /**
         * 인스턴스 검사
         * @returns {Boolean}
         */
        IObject.prototype.instanceOf  = function() {
            throw new Error('[ instanceOf() ] Abstract method definition, fail...');
        };
    
        return IObject;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IObject;
    } else {
        global._W.Interface.IObject = IObject;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IMarshal
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var IObject;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        IObject             = require('./i-object');
    } else {
        util                = global._W.Common.Util;
        IObject             = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof IObject === 'undefined') throw new Error('[IObject] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var IMarshal  = (function (_super) {
        /**
         * 최상위 객체
         * @constructs _W.Interface.IMarshal
         * @interface
         * @extends Interface.IObject
         */
        function IMarshal() {
            _super.call(this);
        }
        util.inherits(IMarshal, _super);

        /**
         * 객체 얻기
         * @returns {Object}
         */
        IMarshal.prototype.getObject  = function() {
            throw new Error('[ getObject() ] Abstract method definition, fail...');
        };

        /**
         * GUID 얻기
         * @abstract
         * @returns {Stirng}
         */
        IMarshal.prototype.getGUID  = function() {
            throw new Error('[ getGUID() ] Abstract method definition, fail...');

        };

        return IMarshal;
    }(IObject));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IMarshal;
    } else {
        global._W.Interface.IMarshal = IMarshal;
    }
    
}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IAllControl
 */
(function(global) {
    
    'use strict';

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
        /**
         * @constructs _W.Interface.IAllControl
         * @interface
         */
        function IAllControl() {
        }
    
        /**
         * 복제 : 전체
         * @abstract
         */
        IAllControl.prototype.clone  = function() {
            throw new Error('[ clone() ] Abstract method definition, fail...');
        };

        /**
         * 로드 : 전체
         * @abstract
         */
        IAllControl.prototype.load  = function() {
            throw new Error('[ load() ] Abstract method definition, fail...');
        };

        /**
         * 삭제 : 전체
         * @abstract
         */
        IAllControl.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };
    
        return IAllControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IAllControl;
    } else {
        global._W.Interface.IAllControl = IAllControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IExportControl
 */
(function(global) {
    
    'use strict';

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
        /**
         * @constructs _W.Interface.IExportControl
         * @interface
         */
        function IExportControl() {
        }
    
        /**
         * 출력 : 전체
         * @abstract
         */
        IExportControl.prototype.write  = function() {
            throw new Error('[ write() ] Abstract method definition, fail...');
        };
    
        return IExportControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IExportControl;
    } else {
        global._W.Interface.IExportControl = IExportControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IGroupControl
 */
(function(global) {
    
    'use strict';

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
        /**
         * @constructs _W.Interface.IGroupControl
         * @interface
         */
        function IGroupControl() {
        }
    
        /**
         * 병합 : 그룹
         * @abstract
         */
        IGroupControl.prototype.merge  = function() {
            throw new Error('[ merge() ] Abstract method definition, fail...');
        };

        /**
         * 복사 : 그룹
         * @abstract
         */
        IGroupControl.prototype.copy  = function() {
            throw new Error('[ copyTo() ] Abstract method definition, fail...');
        };

        return IGroupControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IGroupControl;
    } else {
        global._W.Interface.IGroupControl = IGroupControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IImportControl
 */
(function(global) {
    
    'use strict';

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
        /**
         * @constructs _W.Interface.IImportControl
         * @interface
         */
        function IImportControl() {
        }
    
        /**
         * 입력 : 전체
         * @abstract
         */
        IImportControl.prototype.read  = function() {
            throw new Error('[ read() ] Abstract method definition, fail...');
        };
    
        return IImportControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IImportControl;
    } else {
        global._W.Interface.IImportControl = IImportControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.ILookupControl
 */
(function(global) {
    
    'use strict';

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
        /**
         * @constructs _W.Interface.ILookupControl
         * @interface
         */
        function ILookupControl() {
        }
    
        /**
         * 유무 검사
         * @abstract
         */
        ILookupControl.prototype.contains  = function() {
            throw new Error('[ contains() ] Abstract method definition, fail...');
        };

        return ILookupControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ILookupControl;
    } else {
        global._W.Interface.ILookupControl = ILookupControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IPartControl
 */
(function(global) {
    
    'use strict';

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
        /**
         * @constructs _W.Interface.IPartControl
         * @interface
         */
        function IPartControl() {
        }
    
        /**
         * 등록 : 부분
         * @abstract
         */
        IPartControl.prototype.add  = function() {
            throw new Error('[ add() ] Abstract method definition, fail...');
        };

        /**
         * 삭제 : 부분
         * @abstract
         */
        IPartControl.prototype.remove  = function() {
            throw new Error('[ remove() ] Abstract method definition, fail...');
        };
    
        return IPartControl;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IPartControl;
    } else {
        global._W.Interface.IPartControl = IPartControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.ICollection
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IPartControl;
    var ILookupControl;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        IPartControl        = require('./i-control-part');
        ILookupControl      = require('./i-control-lookup');
    } else {
        IPartControl        = global._W.Interface.IPartControl;
        ILookupControl      = global._W.Interface.ILookupControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var ICollection  = (function () {
        /**
         * 컬렉션 최상위
         * @classdesc 컬렉션 최상위 컬렉션 인터페이스
         * @constructs _W.Interface.ICollection
         * @interface
         * @implements {_W.Interface.IPartControl}
         * @implements {_W.Interface.ILookupControl}
         */
        function ICollection() {
            /**
             * 컬렉션 갯수
             * @member
             */
            this.count = 0;

            /**
             * 컬렉션 배열 반환
             * @member
             */
            this.list = [];

            /** implements IPartControl 인터페이스 구현 */
            /** implements ILookupControl 인터페이스 구현 */
            this._implements(IPartControl, ILookupControl);            
        }
    
        /**
         * 등록 : insert
         * @abstract
         */
        ICollection.prototype.add  = function() {
            throw new Error('[ add() ] Abstract method definition, fail...');
        };

        /**
         * 삭제 (객체, 이름) : delete
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            throw new Error('[ remove() ] Abstract method definition, fail...');
        };

        /**
         * 삭제 (번호) : delete
         * @abstract
         */
        ICollection.prototype.removeAt  = function() {
            throw new Error('[ removeAt() ] Abstract method definition, fail...');
        };

        /**
         * 초기화 : update (delete 후 insert 의 의미)
         * @abstract
         */
        ICollection.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };

        /**
         * 유무 검사 (소유) : read (select)
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            throw new Error('[ contains() ] Abstract method definition, fail...');
        };

        /**
         * 찾기 (번호) : read(select)
         * @abstract
         */
        ICollection.prototype.indexOf  = function() {
            throw new Error('[ indexOf() ] Abstract method definition, fail...');
        };
    
        return ICollection;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ICollection;
    } else {
        global._W.Interface.ICollection = ICollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IPropertyCollection
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var ICollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        ICollection         = require('./i-collection');
    } else {
        util                = global._W.Common.Util;
        ICollection         = global._W.Interface.ICollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var IPropertyCollection  = (function (_super) {
        /**
         * @constructs _W.Interface.IPropertyCollection
         * @interface
         * @extends  _W.Interface.ICollection
         */
        function IPropertyCollection() {
            _super.call(this);
        }
        util.inherits(IPropertyCollection, _super);

        /**
         * 조회 : idx 로 이름 조회
         */
        IPropertyCollection.prototype.propertyOf  = function() {
            throw new Error('[ propertyOf() ] Abstract method definition, fail...');
        };
    
        return IPropertyCollection;
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IPropertyCollection;
    } else {
        global._W.Interface.IPropertyCollection = IPropertyCollection;
    }
    
}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IControlCollection
 */
(function(global) {

    'use strict';

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

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        ICollection         = require('./i-collection');
        IGroupControl        = require('./i-control-group');
        IAllControl         = require('./i-control-all');
    } else {
        util                = global._W.Common.Util;
        ICollection         = global._W.Interface.ICollection;
        IGroupControl        = global._W.Interface.IGroupControl;
        IAllControl         = global._W.Interface.IAllControl;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');
    if (typeof IGroupControl === 'undefined') throw new Error('[IGroupControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var IControlCollection  = (function (_super) {
        /** 
         * 컨트롤 컬렉션 엔터페이스
         * @constructs _W.Interface.IControlCollection
         * @interface
         * @extends _W.Interface.ICollection
         * @implements {_W.Interface.IGroupControl}
         * @implements {_W.Interface.IAllControl}
         */
        function IControlCollection() {
            _super.call(this);

            this._implements(IGroupControl, IAllControl);            
        }
        util.inherits(IControlCollection, _super);        
    
        /**
         * 병합, 합침
         * @abstract
         */
        IControlCollection.prototype.merge  = function() {
            throw new Error('[ concat() ] Abstract method definition, fail...');
        };

        /**
         * 범위 복사
         * @abstract
         */
        IControlCollection.prototype.copyTo  = function() {
            throw new Error('[ copyTo() ] Abstract method definition, fail...');
        };

        /**
         * 전체 복제(복사)
         * @abstract
         */
        IControlCollection.prototype.clone  = function() {
            throw new Error('[ clone() ] Abstract method definition, fail...');
        };

        /**
         * 로드 : 전체
         * @abstract
         */
        IControlCollection.prototype.load  = function() {
            throw new Error('[ load() ] Abstract method definition, fail...');
        };

        /**
         * 삭제 : 전체
         * @abstract
         */
        IControlCollection.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };
    
        return IControlCollection;
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IControlCollection;
    } else {
        global._W.Interface.IControlCollection = IControlCollection;
    }
    
}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Interface.IBindModel
 */
(function(global) {
    
    'use strict';

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
        /**
         * 바인드모델 인터페이스
         * @constructs _W.Interface.IBindModel
         * @interface
         */
        function IBindModel() {

            
            /**
             * @typedef {Object} IBindcommand
             * @property {Number} outputOption 출력방식 0 ~ 3
             * @property {Function} cbVaild 검사 콜백
             * @property {Function} cbBind 바인드 전 콜백
             * @property {Function} cbResult 결과 수신 콜백
             * @property {Function} cbOutput 출력 콜백
             * @property {Function} cbEnd 종료 콜백
             */

            /**
             * 제약조건
             * @typedef IConstraint
             * @property {Regex} regex 정규표현식
             * @property {String} msg 실패 메세지 
             * @property {String} code  실패시 리턴 코드
             * @property {Number} return 성공 조건
             */

            /**
             * 아이템 타입
             * @typedef {Object} IItem
             * @property {Number} size 크기
             * @property {Function} type
             * @property {Function} default
             * @property {Function} caption
             * @property {Function} isNotNull
             * @property {Function} isNullPass
             * @property {Function} callback
             * @property {Array<IConstraint | Function>} constraints 제약조건
             * @property {Array} constraints.regex 제약조건
             * @property {Array} constraints.msg 제약조건
             * @property {String} constraints.code 실패시 리턴 코드
             * @property {Number} constraints.return 성공 조건
             */

            /**
             * 대상속성과 명령의 엔티티(검사, 바인딩, 출력)에 매핑한다
             * @typedef {Object} IMapping
             * @property {String} {command} 매핑할 명령 (command에 지정한 명칭)
             * @property {'Arrary'} {command} 전체 명령 (command에 지정한 명칭)
             * @property {'valid'} {command:mapping} 검사대상에 매핑 한다.
             * @property {'bind'} {command:mapping} 바인딩에 매핑한다.
             * @property {'output'} {command:mapping} 출력에 매핑한다.
             * @property {Arrary<'valid', 'output'>} {command:mapping} 검사와 출력에 매핑한다.
             * @property {'Arrary' | '[]'} {command:mapping} 검사와 바인딩 출력 모든곳에 매핑한다.
             * @example
             * this.mapping = {
             *      cmd:            { Array:    'bind' },
             *      keyword:        { list:     'bind' },
             *      faq_idx:        { read:     'bind',     delete:     'bind' }
             * };
             */


            /**
             * 서비스(svc)에서 bindModel에 접근 지시자
             * @member
             * @type {BindModel}
             */
            this.bindModel  = null;

            /**
             * 속성(아이템)
             * @member
             * @type {Object.<String, IItem | String | Boolean | Number>}
             * @property {Number} size 크기
             * @property {String} type 타입
             * @property {String} default
             * @property {String} caption
             * @property {Boolean} isNotNull
             * @property {Boolean} isNullPass
             * @property {Function} callback
             * @property {Array | Function} constraints 제약조건
             * @property {Array} constraints.regex 제약조건
             * @property {Array} constraints.msg 제약조건
             * @property {String} constraints.code 실패시 리턴 코드
             * @property {Number} constraints.return 성공 조건
             * @example
             * this.prop = {
             *   // inner
             *   __isGetLoad:    true,
             *   __listUrl:      '',
             *   keyword:        { selector: { key: '#m-keyword'+ _SUFF,         type: 'value' } },
             *   page_size:      {
             *       setter: function(val) { page.page_size = val; },
             *       selector: { key: 'select[name=m-page_size]'+ _SUFF,         type: 'value' },
             *   },
             * };
             */
            this.prop       = {};
            
            /**
             * 명령
             * @member
             * @type {Object.<String, IBindcommand>}
             * @property {Number} outputOption 출력방식 0 ~ 3
             * @property {Function} cbVaild 검사 콜백
             * @property {Entity} cbVaild.p_valid 검사 엔티티
             * @property {Function} cbBind 바인드 전 콜백
             * @property {Entity} cbBind.p_ajaxSetup ajaxSetup 설정
             * @property {Function} cbResult 결과 수신 콜백
             * @property {Function} cbOutput 출력 콜백
             * @property {Entity} cbOutput.p_entity 리턴 결과 엔티티
             * @property {Function} cbEnd 종료 콜백
             * @property {Object} cbEnd.p_result 
             * @property {Object} cbEnd.p_states 
             * @property {Object} cbEnd.p_xhr 
             * @property {Function} onExecute 실행전 이벤트
             * @property {Function} onExecute.p_bindCommand 대상 BindCommand
             * @property {Function} onExecuted 실행후 이벤트
             * @property {Function} onExecuted.p_bindCommand 대상 BindCommand
             * @property {Function} onExecuted.p_result 리턴 결과 
             * @example
             * this.command = {
             *   create:         {
             *     onExecute: function(p_bindCommand) { 
             *        _this.bindModel.items['cmd'].value = 'CREATE'; 
             *     },
             *     cbEnd: function(p_entity) {
             *         if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
             *         location.href = _this.bindModel.prop['__listUrl'];
             *     },
             *   },
             * };
             */
             this.command       = {};

            /** 
             * 속성명(prop)에 매핑을 설정한다.
             * @member  
             * @type {Object.<String, IMapping>}  
             * @property {String} command 매핑할 명령
             * @property {'Arrary'} command 전체 명령
             * @property {'valid'} command.mapping 검사(엔티티)에 매핑 한다.
             * @property {'bind'} command.mapping 바인딩(엔티티)에 매핑한다.
             * @property {'output'} command.mapping 출력(엔티티)에 매핑한다.
             * @property {'[]'} command.mapping 모든곳에 매핑한다.(검사와 바인딩 출력)
             * @example
             * this.mapping = {
             *      cmd:            { Array:    'bind' },
             *      keyword:        { list:     ['bind', 'valid'] },
             *      faq_idx:        { read:     'bind',     delete:     'bind' }
             * };
             */
            this.mapping    = {};

            /**
             * 공개 함수
             * @member
             * @type {Object.<String, Function>}
             * @example
             * this.fn = {
             *   searchList: function() {
             *     page.page_count = 1;
             *     _this.bindModel.list.execute();
             *   },
             *   procList: function () { 
             *     _this.bindModel.list.execute(); 
             *   }
             * };
             */
             this.fn         = {};

             /**
             * 기본 검사 콜백
             * @member
             * @type {Function}
             * @property {Entity} p_valid 검사 엔티티
             */
            this.cbBaseValid    = null;
            
            /**
             * 기본 바인드 콜백
             * @member
             * @type {Function}
             * @property {Entity} p_ajaxSetup ajaxSetup 설정
             */
            this.cbBaseBind     = null;
            
            /**
             * 기본 결과 콜백 (수신결과를 가공한다.)
             * @member
             * @type {Function}
             * @property {Entity} p_entity 리턴 결과 엔티티
             */
            this.cbBaseResult   = null;
            
            /**
             * 기본 출력 콜백
             * @member
             * @type {Function}
             * @property {Entity} p_entity 리턴 결과 엔티티
             */
            this.cbBaseOutput   = null;
            
            /**
             * 기본 종료 콜백
             * @member
             * @type {Function}
             * @property {Object} p_result 
             * @property {Object} p_states 
             * @property {Object} p_xhr 
             */
            this.cbBaseEnd      = null;

            /**
             * 실행전 이벤트
             * @member
             * @type {Function}
             * @property {BindCommand} p_bindCommand 실행대상 BindCommand
             */
            this.onExecute  = null;
            
            /**
             * 실행후 이벤트
             * @member
             * @type {Function}
             * @property {BindCommand} p_bindCommand 실행대상 BindCommand
             * @property {Entity} p_entity 회신결과 Entity
             */
            this.onExecuted = null;

            /**
             * 실패 콜백
             * @member
             * @property {*} p_result 실패 결과
             * @property {*} p_item 실패한 대상 Item
             */
            this.cbFail = function(p_result, p_item) {};
            
            /**
             * 에러 콜백
             * @member
             * @property {*} p_msg 오류메세지 
             * @property {*} p_status 상태 메세지
             */
            this.cbError = function(p_msg, p_status) {};
        }
        /**
         * 초기화시점에(init) 등록
         * @param {BindModel} p_bindModel 대상 BindModel
         */
        IBindModel.prototype.preRegister = function(p_bindModel) {};
        
        /**
         * 초기화시점에(init) 검사
         * @param {BindModel} p_bindModel 대상 BindModel
         */
        IBindModel.prototype.preCheck = function(p_bindModel) { return true };

        /**
         * 초기화시점에(init) 준비
         * @param {BindModel} p_bindModel 대상 BindModel
         */
        IBindModel.prototype.preReady = function(p_bindModel) {};

        // IBindModel.prototype.cbFail = function() {};
        // IBindModel.prototype.cbError = function() {};

        return IBindModel;
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IBindModel;
    } else {
        global._W.Interface.IBindModel = IBindModel;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Collection.BaseCollection
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var ICollection;
    var Observer;    

    if (typeof module === 'object' && typeof module.exports === 'object') {
        ICollection         = require('./i-collection');
        Observer            = require('./observer');
    } else {
        ICollection         = global._W.Interface.ICollection;
        Observer            = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현 
    
    var BaseCollection  = (function () {
       /**
        * 컬렉션 최상위 클래스 (추상클래스)
        * @constructs _W.Collection.BaseCollection
        * @implements {_W.Interface.ICollection}
        * @param {Object} p_onwer 소유객체
        */
        function BaseCollection(p_onwer) { 
            
            var __elementType   = null;

            /** @private */
            this.__event        = new Observer(this, this);

            /** 
             * 소유객체
             * @protected 
             * @member {Object}
             */
            this._onwer         = p_onwer;

            /** 
             * 배열요소
             * @protected 
             * @member {Array}
             */
            this._element       = [];
            
            /** 
             * 심볼 배열입니다. 
             * @protected
             * @member {Array} 
             */
            this._symbol        = [];

            /** 
             * 요소타입
             * @member {Observer}  _W.Collection.BaseCollection#elementType  
             */
            Object.defineProperty(this, 'elementType', {
                enumerable: true,
                configurable: true,
                get: function() {
                    return __elementType;
                },
                set: function(newValue) {
                    if(typeof newValue !== 'function') throw new Error('Only [elementType] type "function" can be added');
                    if(typeof newValue === 'function' && typeof ['number', 'string', 'boolean'].indexOf(newValue.name) > -1) {
                        throw new Error('Only [elementType] type Not "number, string, boolean" can be added');
                    }
                    __elementType = newValue;
                }
            });

            /**
             * 컬렉션 목록 
             * @member {Array}  _W.Collection.BaseCollection#list  
             */
            Object.defineProperty(this, 'list', {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element;
                }
            });

            /**
             * 컬랙션 갯수 
             * @member {Number} _W.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this._element.length;
                }
            });

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _W.Collection.BaseCollection#onAdd 
             */
            Object.defineProperty(this, 'onAdd', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'add');
                }
            });

            /** 
             * 제거 이벤트
             * @event _W.Collection.BaseCollection#onRemove
             */
            Object.defineProperty(this, 'onRemove', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'remove');
                }
            });

            /** 
             * 전체 제거 이벤트
             * @event _W.Collection.BaseCollection#onClear
             */
            Object.defineProperty(this, 'onClear', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'clear');
                }
            });

            /** 
             * 변경(등록/삭제) 전 이벤트  
             * @event _W.Collection.BaseCollection#onChanging 
             */
            Object.defineProperty(this, 'onChanging', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'changing');
                }
            });

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _W.Collection.BaseCollection#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'changed');
                }
            });

            // 예약어 등록
            this._symbol = this._symbol.concat(['__event', '_onwer', '_element', '_symbol', 'elementType', 'list', 'count']);
            this._symbol = this._symbol.concat(['onAddr', 'onRemove', 'onClear', 'onChanging', 'onChanged']);
            this._symbol = this._symbol.concat(['_getPropDescriptor', '_onAdd', '_onRemove', '_onClear', '_onChanging', '_onChanged']);
            this._symbol = this._symbol.concat(['_remove', 'add', 'clear', 'remove', 'removeAt', 'indexOf']);

            /** implements ICollection 인터페이스 구현 */
             this._implements(ICollection);
        }
    
        /**
         * 프로퍼티 기술자 설정
         * @protected
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) {
                    
                    var typeName;

                    if (this.elementType !== null && !(newValue instanceof this.elementType)) {
                        // typeName = this.elementType.constructor.name; // REVIEW::
                        typeName = this.elementType.name || this.elementType.constructor.name;
                        throw new Error('Only [' + typeName + '] type instances can be added');
                    }
                    this._element[p_idx] = newValue; 
                },
                enumerable: true,
                configurable: true
            };
        };

        /**
         * 추가 이벤트 수신자
         * @listens _W.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish('add', p_idx, p_value); 
        };

        /**
         * 삭제 이벤트 수신자
         * @listens _W.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx) {
            this.__event.publish('remove', p_idx); 
        };

        /** 
         *  전체삭제 수신자 이벤트
         * @listens _W.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish('clear'); 
        };

        /** 
         *  변경(등록/삭제) 전 수신자 이벤트
         * @listens _W.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function() {
            this.__event.publish('changing'); 
        };

        /** 
         *  변경(등록/삭제) 후 수신자 이벤트
         * @listens _W.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function() {
            this.__event.publish('changed'); 
        };

        /** 
         * 컬렉션을 삭제한다.
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            throw new Error('[ _remove() ] Abstract method definition, fail...');
        };

        /** 
         * 컬렉션을 추가한다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            throw new Error('[ add() ] Abstract method definition, fail...');
        };
        
        /** 
         * 전체삭제(초기화)한다.
         * @abstract 
         * @fires _W.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };

        /**
         * 컬렉션을 삭제한다.
         * @param {Object} p_elem 속성명
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
         * 배열속성 삭제한다.
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype.removeAt = function(p_idx) {

            var obj = this._element[p_idx];
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (typeof obj !== 'undefined') this._remove(p_idx);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };

        /**
         * 배열속성 여부를 리턴한다. 
         * @param {Object} p_elem 속성 객체
         * @returns {Boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._element.indexOf(p_elem) > -1;
        };

        /**
         * 배열속성 인덱스 찾는다.
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = BaseCollection;
    } else {
        global._W.Collection.BaseCollection = BaseCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Collection.ArrayCollection
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        BaseCollection      = require('./collection-base');
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseCollection === 'undefined') throw new Error('[BaseCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ArrayCollection  = (function (_super) {
        /**
         * 배열타입 컬렉션 클래스
         * @constructs _W.Collection.ArrayCollection
         * @extends _W.Collection.BaseCollection
         * @param {Object} p_onwer 소유객체
         */
        function ArrayCollection(p_onwer) {
            _super.call(this, p_onwer);

        }
        util.inherits(ArrayCollection, _super);

        /**
         * 배열속성 컬렉션을 삭제한다.(내부처리)
         * @protected
         * @param {*} p_idx 인덱스 번호
         */
        ArrayCollection.prototype._remove = function(p_idx) {
            
            var count = this._element.length - 1;   // [idx] 포인트 이동
            
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
         * 배열속성 컬렉션을 추가한다.
         * @param {*} p_value [필수] 속성값
         * @returns {*} 입력 속성 참조값
         */
        ArrayCollection.prototype.add = function(p_value) {
        
            var typeName;
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전

            if (typeof p_value === 'undefined') throw new Error('p_value param request fail...');
            if (this.elementType !== null && !(p_value instanceof this.elementType)) {
                typeName = this.elementType.constructor.name;
                throw new Error('Only [' + typeName + '] type instances can be added');
            }
        
            this._element.push(p_value);
            
            index = (this._element.length === 1) ? 0 : this._element.length  - 1;
            Object.defineProperty(this, [index], this._getPropDescriptor(index));

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return [index];
        };

        /**
         * 배열속성 컬렉션을 전체삭제한다.
         */
        ArrayCollection.prototype.clear = function() {
            
            var obj;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._element.length; i++) {
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ArrayCollection;
    } else {
        global._W.Collection.ArrayCollection = ArrayCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Collection.PropertyCollection
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;
    var IPropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        BaseCollection      = require('./collection-base');
        IPropertyCollection = require('./i-collection-property');
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
        IPropertyCollection = global._W.Interface.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseCollection === 'undefined') throw new Error('[BaseCollection] module load fail...');
    if (typeof IPropertyCollection === 'undefined') throw new Error('[IPropertyCollection] module load fail...');
    
    //==============================================================
    // 4. 모듈 구현    
    var PropertyCollection  = (function (_super) {
        /**
         * 속성타입 컬렉션 클래스
         * @constructs _W.Collection.PropertyCollection
         * @implements {_W.Interface.IPropertyCollection}
         * @extends _W.Collection.BaseCollection
         * @param {Object} p_onwer 소유자
         */
        function PropertyCollection(p_onwer) {
            _super.call(this, p_onwer); 

            var __properties = [];

            /** @member {Array} _W.Collection.PropertyCollection#properties 속성들값 */
            Object.defineProperty(this, 'properties', 
            {
                get: function() { return __properties; },
                set: function(newValue) { __properties = newValue; },
                configurable: true,
                enumerable: true
            });

            // 예약어 등록
            this._symbol = this._symbol.concat(['properties', 'indexOfName', 'propertyOf']);

            /** implements IPropertyCollection 인터페이스 구현 */
            this._implements(IPropertyCollection);            
        }
        util.inherits(PropertyCollection, _super);

        /**
         * 속성 컬렉션을 삭제한다. (내부처리)
         * @protected
         * @param {*} p_name 속성명
         * @returns {number} 삭제한 인덱스
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
         * 속성컬렉션을 등록한다.
         * @param {string} p_name [필수] 속성명
         * @param {?any} p_value 속성값
         * @returns {any} 입력 속성 참조값 REVIEW:: 필요성 검토
         */
        PropertyCollection.prototype.add = function(p_name, p_value, p_desc) {
            p_value = p_value || '';
            
            var typeName;
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전
        
            if (typeof p_name !== 'string') throw new Error('Only [p_name] type "string" can be added');
            if (this.elementType !== null && !(p_value instanceof this.elementType)) {
                typeName = this.elementType.constructor.name;
                throw new Error('Only [' + typeName + '] type instances can be added');
            }

            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(' [' + p_name + '] is a Symbol word');   
            }

            if (this.indexOfName(p_name) > -1) {
                console.warn('Warning:: 프로퍼티 이름 중복 !!');
                return this[p_name];     // 중복 등록 방지
            }

            this._element.push(p_value);
            this.properties.push(p_name);

            index = (this._element.length === 1) ? 0 : this._element.length  - 1;

            if (typeof p_desc === 'object' && (typeof p_desc.get === 'function' || typeof p_desc.set === 'function')) {
                Object.defineProperty(this, [index], p_desc);
                Object.defineProperty(this, p_name, p_desc);
            } else {
                Object.defineProperty(this, [index], this._getPropDescriptor(index));
                Object.defineProperty(this, p_name, this._getPropDescriptor(index));
            }

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return this[index];
        };

        /**
         * 속성컬렉션을 전체 삭제한다.
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
         * 이름으로 index값 조회한다.
         * @param {String} p_name 
         */
        PropertyCollection.prototype.indexOfName = function(p_name) {
            
            var obj;
            
            if (typeof p_name !== 'string')  throw new Error('Only [p_name] type "string" can be added');
            
            obj = this[p_name];

            return this._element.indexOf(obj);;
        };

        /**
         * 배열속성 이름 찾는다.
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = PropertyCollection;
    } else {
        global._W.Collection.PropertyCollection = PropertyCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Collection.PropertyObjectCollection
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var PropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        PropertyCollection  = require('./collection-property');
    } else {
        util                = global._W.Common.Util;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    
    //==============================================================
    // 4. 모듈 구현    
     //---------------------------------------
     var PropertyObjectCollection  = (function (_super) {
        /**
         * 객체 프로퍼티 컬렉션
         * @constructs _W.Collection.PropertyObjectCollection
         * @extends _W.Collection.ProperyCollection
         * @param {*} p_onwer 소유자 
         */
        function PropertyObjectCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Object;
        }
        util.inherits(PropertyObjectCollection, _super);

        /**
         * 객체속성 컬렉션을 추가한다.
         * @param {String} p_name 
         * @param {*} p_value 
         * @returns {Item} 등록한 아이템을 리턴한다.
         */
        PropertyObjectCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === 'undefined') throw new Error('p_name param request fail...');
            if (!(p_value && typeof p_value !== 'object')) throw new Error('p_name param request fail...');

            return _super.prototype.add.call(this, p_name, p_value);
        };
        
        return PropertyObjectCollection;
    
    }(PropertyCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = PropertyObjectCollection;
    } else {
        global._W.Collection.PropertyObjectCollection = PropertyObjectCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Collection.PropertyFunctionCollection
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var PropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        PropertyCollection  = require('./collection-property');
    } else {
        util                = global._W.Common.Util;
        PropertyCollection  = global._W.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    
    //==============================================================
    // 4. 모듈 구현    
     //---------------------------------------
     var PropertyFunctionCollection  = (function (_super) {
        /**
         * 함수 프로퍼티 컬렉션
         * @constructs _W.Collection.PropertyFunctionCollection
         * @param {*} p_onwer 소유자 
         * @extends _W.Collection.ProperyCollection
         */
        function PropertyFunctionCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Function;
        }
        util.inherits(PropertyFunctionCollection, _super);

        /**
         * 함수속성 컬렉션을 추가한다.
         * @param {String} p_name 
         * @param {*} p_value 
         * @returns {Item} 등록한 아이템을 리턴한다.
         */
        PropertyFunctionCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === 'undefined') throw new Error('p_name param request fail...');
            if (typeof p_value !== 'function') throw new Error('p_value param request fail...');

            return _super.prototype.add.call(this, p_name, p_value);
        };
        
        return PropertyFunctionCollection;
    
    }(PropertyCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = PropertyFunctionCollection;
    } else {
        global._W.Collection.PropertyFunctionCollection = PropertyFunctionCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.MetaObject
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IObject;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('./object-implement'); // _implements() : 폴리필
        
        IObject             = require('./i-object');
    } else {
        IObject             = global._W.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof IObject === 'undefined') throw new Error('[IObject] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaObject  = (function () {
        /**
         * 메타 최상위 클래스 (실체)
         * @constructs _W.Meta.MetaObject
         * @abstract
         * @implements {_W.Interface.IObject}
         */
        function MetaObject() {
            
            var _name = '';

            /**
             * 이름
             * @member _W.Meta.MetaObject#name
             * @protected
             */
             Object.defineProperty(this, 'name', 
             {
                 get: function() { return _name; },
                 set: function(newValue) { 
                     if (typeof newValue !== 'string') throw new Error('Only [name] type "string" can be added');
                     _name = newValue;
                 },
                 configurable: true,
                 enumerable: true
             });

            /** implements IObject 인터페이스 구현 */
            this._implements(IObject);
        }
        
        /**
         * 객체 타입 얻기
         * @virtual
         * @returns {Array}
         */
        MetaObject.prototype.getTypes  = function() {
            
            var type = ['MetaObject'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 상위 클래스 또는 인터페이스 구현 여부 검사
         * @param {String} p_name 클래스명
         * @returns {Boolean}
         */
        MetaObject.prototype.instanceOf  = function(p_name) {

            var arr = this.getTypes();
    
            if (typeof p_name !== 'string') throw new Error('Only [p_name] type name "string" can be added');
        
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = MetaObject;
    } else {
        global._W.Meta.MetaObject = MetaObject;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.MetaElement
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaObject;
    var IMarshal;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        MetaObject          = require('./meta-object');
        IMarshal            = require('./i-marshal');

    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        IMarshal            = global._W.Interface.IMarshal;

    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof IMarshal === 'undefined') throw new Error('[IMarshal] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaElement  = (function (_super) {
        /**
         * IMarshal 인터페이스 구현 및 ..
         * @constructs _W.Meta.MetaElement
         * @abstract
         * @extends _W.Meta.MetaObject
         * @implements {_W.Interface.IMarshal}
         * @param {*} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            this.name = p_name || '';
            
            /**
             * GUID 값 
             * @type {String}
             * @private 
             */
            this.__GUID = null;
            
            /** implements IMarshal 인터페이스 구현 */
            this._implements(IMarshal);            
        }
        util.inherits(MetaElement, _super);
    
        /** @override **/
        MetaElement.prototype.getTypes = function() {
            
            var type = ['MetaElement'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * GUID 생성한다.
         * @private
         * @returns {String}
         */
        MetaObject.prototype.__newGUID  = function() {
            return util.createGUID();
        };

        /**
         * 조건 : GUID는 한번만 생성해야 함
         * GUID를 얻는다.
         * @returns {String}
         */
        MetaObject.prototype.getGUID  = function() {
            if (this.__GUID === null) {
                this.__GUID = this.__newGUID();
            }
            return this.__GUID;
        };

        /**
         * 객체를 얻는다
         * REVIEW:: 공통 요소? 확인필요
         * @virtual
         * @returns {Object}
         */
        MetaElement.prototype.getObject  = function(p_context) {

            var obj     = {};

            for (var prop in this) {
                if (this[prop] instanceof MetaElement) {
                    obj[prop] = this[prop].getObject(p_context);
                } else if (typeof this[prop] !== 'function' && prop.substr(0, 1) !== '_') {
                    obj[prop] = this[prop];
                }
            }
            return obj;                        
        };

        return MetaElement;
    
    }(MetaObject));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = MetaElement;
    } else {
        global._W.Meta.MetaElement = MetaElement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.ComplexElement
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                   = global._W || {};
    global._W.Meta              = global._W.Meta || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaElement;
    var IPropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                    = require('./utils');
        MetaElement             = require('./meta-element');
        IPropertyCollection     = require('./i-collection-property');

    } else {
        util                    = global._W.Common.Util;
        MetaElement             = global._W.Meta.MetaElement;
        IPropertyCollection     = global._W.Interface.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof IPropertyCollection === 'undefined') throw new Error('[IPropertyCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ComplexElement  = (function (_super) {
        /**
         * 복합요소
         * @constructs _W.Meta.ComplexElement
         * @abstract
         * @extends _W.Meta.MetaElement
         * @implements {_W.Interface.IPropertyCollection}
         */
        function ComplexElement() {
            _super.call(this);

            var __element = [];

            /**
             * 요소 갯수
             * @member _W.Meta.ComplexElement#count
             */
            Object.defineProperty(this, 'count', 
            {
                get: function() { return __element.length; },
                configurable: true,
                enumerable: true
            });

            /**
             * 요소 목록
             * @member _W.Meta.ComplexElement#list
             */
            Object.defineProperty(this, 'list', 
            {
                get: function() { return __element; },
                configurable: true,
                enumerable: true
            });

            /** implements IPropertyCollection 인터페이스 선언 */
            this._implements(IPropertyCollection);                
        }
        util.inherits(ComplexElement, _super);

        /** @override **/
        ComplexElement.prototype.getTypes  = function() {
                            
            var type = ['ComplexElement'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ComplexElement;
    } else {
        global._W.Meta.ComplexElement = ComplexElement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Entity.Item
 * namespace _W.Meta.Entity.ItemCollection
 * namespace _W.Meta.Entity.ItemViewCollection
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
    var CustomError;
    var MetaElement;
    var PropertyCollection;
    var Observer;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('util');
        CustomError         = require('./error-custom');
        MetaElement         = require('./meta-element');
        PropertyCollection  = require('./collection-property');
        Observer            = require('./observer');
    } else {
        util                = global._W.Common.Util;
        CustomError             = global._W.Common.CustomError;
        MetaElement         = global._W.Meta.MetaElement;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        Observer            = global._W.Common.Observer;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof CustomError === 'undefined') throw new Error('[CustomError] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    //---------------------------------------
    var Item  = (function (_super) {
        /**
         * 아이템
         * @constructs _W.Meta.Entity.Item
         * @extends _W.Meta.MetaElement
         * @param {String} p_name 아이템명
         * @param {Entity} p_entity 소유 Entity
         */
        function Item(p_name, p_entity, p_property) {
            _super.call(this, p_name);

            var __entity        = null;
            var __type          = 'string';
            var __size          = 0;
            var __default       = null;
            var __caption       = '';
            var __isNotNull     = false;
            var __isNullPass    = false;
            var __callback      = null;
            var __constraints   = [];
            var __codeType      = null;
            var __order         = 100;
            var __increase      = 100;      // order 의 자동 추가수
            var __getter        = null;
            var __setter        = null;
            var __value         = null;
            var __alias         = null;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaElement && p_entity.instanceOf('Entity')) {
                __entity    = p_entity;
                __order     = __entity.items.count === 0 ? __order : __entity.items[__entity.items.count - 1].order + __increase;
            }

            /** @private */
            this.__event    = new Observer(this, this);

            /**
             * value 내부값 (필터 및 getter/setter 무시)
             * @private
             * @member {*} _W.Meta.Entity.Item#__value
             */
            Object.defineProperty(this, '__value', 
            {
                get: function() { return __value; },
                set: function(newValue) { 
                    // 직접 입력하면 안됨
                    // throw new Error('Only getter !! ');
                    __value = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 소유 엔티티
             * @member {Entity} _W.Meta.Entity.Item#entity
             */
            Object.defineProperty(this, 'entity', 
            {
                get: function() { return __entity; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if (newValue && !(newValue instanceof MetaElement && newValue.instanceOf('Entity'))) {
                        throw new Error('Only [entity] type "Entity" can be added');
                    }
                    __entity = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 타입 (내부속성)
             * @member {String} _W.Meta.Entity.Item#type
             */
            Object.defineProperty(this, 'type', 
            {
                get: function() { return __type; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if(typeof newValue !== 'string') throw new Error('Only [type] type "string" can be added');
                    __type = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 크기 (내부속성)
             * @member {Number} _W.Meta.Entity.Item#size
             */
            Object.defineProperty(this, 'size', 
            {
                get: function() { return __size; },
                set: function(newValue) { 
                    if(typeof newValue !== 'number') throw new Error('Only [size] type "number can be added');
                    __size = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 기본값 (내부속성)
             * @member {String | Number | Boolean} _W.Meta.Entity.Item#default
             */
            Object.defineProperty(this, 'default', 
            {
                get: function() { return __default; },
                set: function(newValue) { 
                    if(typeof newValue !== 'undefined' && newValue !== null &&  ['string', 'number', 'boolean'].indexOf(typeof newValue) < 0) throw new Error('Only [default] type "string | boolea | number" can be added');
                    __default = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 설명 (내부속성)
             * @member {String} _W.Meta.Entity.Item#caption
             */
            Object.defineProperty(this, 'caption', 
            {
                get: function() { return __caption; },
                set: function(newValue) { 
                    if(typeof newValue !== 'string') throw new Error('Only [caption] type "string" can be added');
                    __caption = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 value의 Null 여부
             * @member {Boolean} _W.Meta.Entity.Item#isNotNull
             */
            Object.defineProperty(this, 'isNotNull', 
            {
                // get: function() { 
                //     var isReturn;
                //     isReturn = __constraints.length > 0 ? true : __isNotNull;
                //     return isReturn; 
                // },
                get: function() { return __isNotNull },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isNotNull] type "boolean" can be added');
                    __isNotNull = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 value null 통과 여부 (기본값 = false)
             * @member {Boolean} _W.Meta.Entity.Item#isNullPass
             */
            Object.defineProperty(this, 'isNullPass', 
            {
                get: function() { return __isNullPass },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isNullPass] type "boolean" can be added');
                    __isNullPass = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 아이템 콜백 함수
             * REVIEW: 필요성 검토 필요
             * @member {String} _W.Meta.Entity.Item#callback
             */
            Object.defineProperty(this, 'callback', 
            {
                get: function() { return __callback; },
                set: function(newValue) { 
                    if(newValue !== null && typeof newValue !== 'function') throw new Error('Only [callback] type "function" can be added');
                    __callback = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 제약 조건 
             * @member {Array<Object>} _W.Meta.Entity.Item#constraints
             * @example
             * var c = {
             *  regex: /aa/,
             *  msg: '매칭메세지',  // return이 true면 성공시 메세지, false 실패시 메세지
             *  return: ture     // 매칭시 싱공실패 여부 
             * };
             */
            Object.defineProperty(this, 'constraints', 
            {
                get: function() { return __constraints; },
                set: function(newValue) { 
                    var list = [];
                    
                    // 배열로 일반화
                    if (Array.isArray(newValue))  list = newValue;
                    else list.push(newValue);

                    // 유효성 검사
                    for(var i = 0; list.length > i; i++) {
                        if (!(typeof list[i] === 'function' || (typeof list[i].regex === 'object' && typeof list[i].msg === 'string'))) {
                            throw new Error('Only [constraints] type "function OR {regex:object, msg:string, ?code:number}" can be added');
                         }
                    }
                    __constraints = list;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 코드 타입
             * @member {Object} _W.Meta.Entity.Item#codeType
             */
            Object.defineProperty(this, 'codeType', 
            {
                get: function() { return __codeType; },
                set: function(newValue) { __codeType = newValue; },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 순서
             * @member {String} _W.Meta.Entity.Item#order
             */
            Object.defineProperty(this, 'order', 
            {
                get: function() { return __order; },
                set: function(newValue) { 
                    if(typeof newValue !== 'number') throw new CustomError('Only [order] type "number" can be added', newValue);
                    __order = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 순서 증가 수
             * @member {Number} _W.Meta.Entity.Item#increase
             */
            Object.defineProperty(this, 'increase', 
            {
                get: function() { return __increase; },
                set: function(newValue) { 
                    if(typeof newValue !== 'number') throw new CustomError('Only [increase] type "number" can be added', newValue);
                    __increase = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 아이템 value
             * @member {*} _W.Meta.Entity.Item#value
             */
            Object.defineProperty(this, 'value', 
            {
                get: function() { 
                    var __val;
                    
                    // 우선순위 : 1
                    if (typeof __getter === 'function' ) {
                        
                        __val = __getter.call(this);
                        
                        // 검사 및 이벤트 발생
                        if (this.__value !== null && this.__value !== __val) {
                            this._onChanged(__val, this.__value);
                            this.__value = __val;   // 내부에 저장
                        }
                    
                    // 우선순위 : 2
                    } else {
                        __val = this.__value;
                    }
                    
                    /**
                     * 분기 처리값 '__val' 없는경우 (null, undefined)
                     *  - this.__value 초기화 되지 않은 경우
                     *  - getter 리턴이 없는 경우
                     */
                    if (typeof __val === 'undefined' || __val === null) {
                        __val = this.__value || this.default;  
                    }

                    return __val; 
                },
                set:  function(val) { 
                    var __val, _val;
                    var _oldVal = this.__value;
                    if (typeof __setter === 'function' ) _val = __setter.call(this, val);
                    
                    // settter 의 리턴이 여부
                    if (typeof _val !== 'undefined') __val = _val;
                    else __val = val; 

                    __val = __val === null ? '' : __val;  // null 등록 오류 처리
                    if(['number', 'string', 'boolean'].indexOf(typeof __val) < 0) {
                        throw new Error('Only [value] type "number, string, boolean" can be added');
                    }
                    this.__value = __val;
                    // 검사 및 이벤트 발생
                    if (_oldVal !== __val && __val) this._onChanged(__val, _oldVal);
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템의 value 의 getter
             * @member {Function} _W.Meta.Entity.Item#getter
             */
            Object.defineProperty(this, 'getter', 
            {
                get: function() { return __getter; },
                set: function(val) { 
                    if(val !== null && typeof val !== 'function') throw new Error('Only [getter] type "function" can be added');
                    __getter = val;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템의 value 의 setter
             * @member {Function} _W.Meta.Entity.Item#setter
             */
            Object.defineProperty(this, 'setter', 
            {
                get: function() { return __setter; },
                set: function(val) { 
                    if(val !== null && typeof val !== 'function') throw new Error('Only [setter] type "function" can be added');
                    __setter = val;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 별칭 (bind전송시, 데이터 수신후 설정시 활용함)
             * 사용처 
             * - Bind-command-ajax._execBind() : 데이터 전송시
             * - BaseBind.setValue(row) : 로우값 을 엔티티에 설정시
             * - getValue() : row 에 활용함
             * 기본값 = name 값
             * @member {String} _W.Meta.Entity.Item#alias
             */
             Object.defineProperty(this, 'alias', 
             {
                 get: function() { return typeof __alias === 'string' ? __alias : this.name; },
                 set: function(newValue) { 
                    if(typeof newValue !== 'string') throw new Error('Only [alias] type "string" can be added');
                     __alias = newValue; 
                 },
                 configurable: true,
                 enumerable: true
             });

            /**
             * 변경 이벤트 
             * @event _W.Meta.Entity.Item#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'onChanged');
                }
            });
            

            //---------------------------------------------------
            // 아이템 옵션속성 추가
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    [   'entity', 'type', 'size', 'default', 'caption', 
                        'isNotNull', 'isNullPass', 'callback', 'constraints', 
                        'codeType', 'order', 'increase', 'value', 'getter', 'setter', 'alias', 'onChanged' 
                    ].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            } else if (['number', 'string', 'boolean'].indexOf(typeof p_property) > -1) {
                this['value'] = p_property;
            }

        }
        util.inherits(Item, _super);

        /**
         * @listens _W.Meta.Entity.Item#_onChanged
         */
         Item.prototype._onChanged = function(p_nValue, p_oValue) {
            p_oValue = p_oValue || this.__value;
            this.__event.publish('onChanged', p_nValue, p_oValue);
        };

        /** @override **/
        Item.prototype.getTypes  = function() {
                    
            var type = ['Item'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /** 
         * 아이템을 복제한다. 
         * @returns {Item}
         */
        Item.prototype.clone = function() {
            
            var clone = new Item(this.name);
            var constraints = [];

            if (this.entity) clone['entity']            = this.entity;  // 참조값
            if (this.alias) clone['alias']              = this.alias;
            if (this.type) clone['type']                = this.type;
            if (this.size) clone['size']                = this.size;
            if (this.default) clone['default']          = this.default;
            if (this.caption) clone['caption']          = this.caption;
            if (this.isNotNull) clone['isNotNull']      = this.isNotNull;
            if (this.isNullPass) clone['isNullPass']     = this.isNullPass;
            if (this.callback) clone['callback']        = this.callback;
            for (var i = 0; this.constraints.length > i; i++) {
                constraints.push(this.constraints[i]);
            }
            if (this.constraints) clone['constraints']  = constraints;
            if (this.codeType) clone['codeType']        = this.codeType;  // 참조값
            if (this.order) clone['order']              = this.order;
            if (this.increase) clone['increase']        = this.increase;
            // if (this.value) clone['value']              = this.value;    // 생성시 계산해서 개선한
            if (this.__value) clone['__value']          = this.__value;
            if (this.getter) clone['getter']            = this.getter;
            if (this.setter) clone['setter']            = this.setter;
            
            // 이벤트 복사 (REVIEW:: 개선필요!!)
            if (this.__event.subscribers.onChanged) {
                for (var i = 0; this.__event.subscribers.onChanged.length > i; i++) {
                    clone['onChanged'] = this.__event.subscribers.onChanged[i];
                }
            }
            
            return clone;
        };

        /** @override */
        Item.prototype.getObject = function() {
            // TODO::
        };

        /**
         * 제약조건을 추가한다.
         * REVIEW: addConstraint vs setConstraint 와 적합성 검토
         * @param {*} p_regex 
         * @param {*} p_msg 
         * @param {*} p_code 
         * @param {*} p_return 
         */
        Item.prototype.setConstraint = function(p_regex, p_msg, p_code, p_return) {
            p_return = p_return || false;

            var constraint = {};

            if (!(p_regex instanceof RegExp)) throw new Error('Only [p_regex] type "RegExp" can be added');
            if (!(typeof p_msg === 'string')) throw new Error('Only [p_msg] type "string" can be added');

            constraint.regex = p_regex;
            constraint.msg = p_msg;
            constraint.code = p_code;
            constraint.return = p_return;
            
            this.constraints.push(constraint);
        };

// POINT:: 삭제 대기
        /**
         * method
         */
        // Item.prototype.defineValueProperty = function(p_getter, p_setter) {

        //     // 타입검사 
        //     if(typeof p_getter !== 'undefined' && typeof p_getter !== 'function') {
        //         throw new Error('Only [p_getter] type 'function' can be added');
        //     }
        //     if(typeof p_setter !== 'undefined' && typeof p_setter !== 'function') {
        //         throw new Error('Only [p_getter] type 'function' can be added');
        //     }

        //     // 기본값 설정
        //     p_getter = p_getter || function() { return this.__value; };
        //     p_setter = p_setter || function(val) { this.__value = val; };

        //     /** @event */s
        //     Object.defineProperty(this, 'value', {
        //         enumerable: true,
        //         configurable: true,
        //         get: p_getter,
        //         set: p_setter
        //     });
        // };
        
        /**
         * 아이템의 value에 유효성을 검사한다. (isNotnull, isNullPass, constraints 기준)
         * @param {string} p_value 
         * @param {object} r_result 메세지는 참조(객체)형 으로 전달
         * @param {number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
         */
        // Item.prototype.valid = function(p_value, r_result, p_option) {
        Item.prototype.valid = function(p_value, r_result) {
            // p_option = p_option || 1;   
            r_result.value = p_value;
            r_result.msg = '';
            r_result.code = '';
            p_value = p_value || '';
            
            var result;
            var value = null;

            // if (!(typeof p_value === 'string')) throw new Error('Only [p_value] type 'string' can be added');
            p_value = typeof p_value === 'number' ? String(p_value) : p_value;  // number 형 변환

            // 1. 기본값 얻기
            value = p_value === null || typeof p_value === 'undefined' ? this.default : p_value;
            value = value.trim();

            // 2-1. 통과조건 검사
            if (false
                || (this.isNotNull === false && this.constraints.length === 0 ) 
                || (this.isNotNull === false && this.isNullPass === true && value.length === 0)
                || (this.isNotNull === true && this.constraints.length === 0 && value.length > 0)
            ){
                return true;
            }
            // 2-2. 실패조건 검사
            if (this.isNotNull === true && this.constraints.length === 0 && value.length === 0) {
                r_result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
                r_result.code  = 0;
                return false;
            }

            // 2-3. 제약조건 검사
            for(var i = 0; this.constraints.length > i; i++) {

                if (typeof this.constraints[i] === 'function') {
                    return this.constraints[i].call(this, this, p_value, r_result);     // 함수형 제약조건
                } else {
                    result = p_value.match(this.constraints[i].regex);
    
                    if ((this.constraints[i].return === false && result !== null) ||    // 실패 조건
                        (this.constraints[i].return === true && result === null)) {     // 성공 조건
       
                        r_result.msg   = this.constraints[i].msg;
                        r_result.code  = this.constraints[i].code;
                        return false;
                    }
                }
            }            
            // // 3. 결과(Null) 검사
            // if ((p_option === 1 && this.isNotNull === true && p_value.trim().length <= 0) || 
            //     (p_option === 2 && p_value.trim().length <= 0)) {
                
            //     r_result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
            //     r_result.code  = 0;
            //     return false;
            // }
            return true;
        };

        return Item;
    
    }(MetaElement));

    //---------------------------------------
    var ItemCollection  = (function (_super) {
        /**
         * 아이템 컬렉션 (최상위)
         * @constructs _W.Meta.Entity.ItemCollection
         * @extends _W.Collection.PropertyCollection
         * @abstract
         * @param {*} p_onwer 소유자 
         */
        function ItemCollection(p_onwer) {
            _super.call(this, p_onwer);
            
            this.elementType = Item;    // 기본 컬렉션 타입
            
            /**
             * 아이템의 타입
             * @member {Function} _W.Meta.Entity.ItemCollection#itemType
             */
            Object.defineProperty(this, 'itemType', 
            {
                get: function() { return this.elementType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error('Only [Item] type "Item" can be added');
                    this.elementType = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            
        }
        util.inherits(ItemCollection, _super);
        
        /**
         * 컬렉션에 아이템 유무를 검사한다.
         * @param {*} p_elem 
         * @returns {*} 
         */
        ItemCollection.prototype.contains = function(p_elem) {

            if (p_elem instanceof Item) {
                return this.indexOfName(p_elem.name) > -1;
            } else {
                return _super.prototype.contains.call(this, p_elem);
            }
        };

        /**
         *  이름과 값으로 아이템 생성하여 컬렉션에 추가한다.
         * @param {*} p_name 아이템명
         * @param {String | Number | Boolean} p_value 
         * @returns {Item}
         */
        ItemCollection.prototype.addValue  = function(p_name, p_value) {

            var item;
            var property = {};

            if (typeof p_name !== 'string') throw new Error('There is no required value [p_name].');
            if(['number', 'string', 'boolean'].indexOf(typeof p_value) < 0) {
                throw new Error('Only [value] type "number, string, boolean" can be added');
            }
            
            property = { value: p_value };

            item = new this.itemType(p_name, this._onwer, property);

            return this.add(item);
        };

        /**
         *  이름과 값으로 아이템 생성하여 컬렉션에 추가한다.
         * @param {*} p_name 아이템명
         * @param {String | Number | Boolean} p_value 
         * @returns {Item}
         */
         ItemCollection.prototype.initValue  = function() {

            for (var i = 0; this.count > i; i++) {
                this[i].value = this[i].default;
            }
        };

        return ItemCollection;
    
    }(PropertyCollection));


    //---------------------------------------
    var ItemTableCollection  = (function (_super) {
        /**
         * 테이블 아이템 컬렉션
         * @constructs _W.Meta.Entity.ItemTableCollection
         * @extends _W.Meta.Entity.ItemCollection
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemTableCollection(p_onwer) {
            _super.call(this, p_onwer);
        }
        util.inherits(ItemTableCollection, _super);

        /**
         * 테이블컬렉션에 아이템을 추가한다.
         * @param {string | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        ItemTableCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new this.itemType(i_name, this._onwer);
            } else if (p_object instanceof this.itemType) {
                // EntityTable은 직접만 적용(참조형 아이템 소유 못함)
                i_name  = p_object.name;
                i_value = p_object.clone();
                i_value.entity = this._onwer;
            } else {
                throw new Error('string | Item object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');

            return _super.prototype.add.call(this, i_name, i_value);
        };

        return ItemTableCollection;
    
    }(ItemCollection));


    //---------------------------------------
    var ItemViewCollection  = (function (_super) {
        /**
         * @constructs _W.Meta.Entity.ItemViewCollection
         * @extends _W.Meta.Entity.ItemCollection
         * @param {*} p_onwer 소유자
         * @param {?ItemCollection} p_baseCollection 참조기본 컬렉션
         */
        function ItemViewCollection(p_onwer, p_baseCollection) {
            _super.call(this, p_onwer);

            if (p_baseCollection && !(p_baseCollection instanceof ItemCollection)) {
                throw new Error('Error!! ItemCollection object [p_baseCollection].');
            }
            
            /** @protected */
            this._baseCollection = p_baseCollection;
        }
        util.inherits(ItemViewCollection, _super);

        /**
         * 뷰컬렉션에 아이템을 추가(등록/설정)한다.
         * @param {String | Item} p_object 
         * @param {?ItemCollection} p_baseCollection
         * @example
         *  - base(all),    string | Itme, Collection   => Collection 에 생성후 자신에 등록 
         *  - base(N),      string | Itme               => this 에 생성후 자신에 등록
         *  - base(Y),      string | Item               => Base 에 생성후 자신에 등록
         * 
         *   // string                       => 생성 및 자신에 등록
         *   // string <base>                => 생성 및 소유처에 등록
         *   // Item                         => 생성 및 자신에 등록
         *   // Item <base>                  => 생성 및 소유처에 등록
         *   // string, collection           => 참조만 등록
         *   // string, collection <base>    => 참조만 등록
         * 
         *  TODO:: filter 옵션 : 충돌방지에 이용
         *  TODO:: 객체 비교는 string 이 아니고 값과 타입을 비교해야함 (그래야 참조를 사용)
         */
        ItemViewCollection.prototype.add  = function(p_object, p_baseCollection) {
            
            var collection;
            var i_name;
            var i_value;

            if (p_object instanceof Item) {
                // 아이템 소유자 설정
                if (p_object.entity === null) p_object.entity = this._onwer;
                i_name = p_object.name;
                i_value = p_object;
            } else if (typeof p_object === 'string') {
                i_name = p_object;
                i_value = new this.itemType(i_name, this._onwer);
// POINT::
            // } else if (p_object instanceof MetaElement && p_object.instanceOf('Entity')) {
            //     // 아아템 가져오기
            //     for (var i = 0; p_object.items.count > i; i++) {
            //         this.add(p_object.items[i]);
            //     }
            } else {
                throw new Error('p_object string | Item instance param request fail...');
            }

            // TODO:: 이름 충돌검사

            if (p_baseCollection instanceof ItemCollection) {            // 전달값으로 기본컬렉션 지정시
                collection = p_baseCollection;
            } else if (this._baseCollection instanceof ItemCollection) { // 기본컬렉션 존재시
                collection = this._baseCollection;
            }
            
            // 기본참조 컬렉션 또는 전달참조 컬렉션인 경우
            if (collection) {
                if (collection.contains(collection[i_name])) {
                    i_value = collection[i_name];                      // 참조 가져옴
                } else {
                    i_value = collection.add(p_object);                // 컬렉션에 등록
                }
                
                // REVIEW:: 의존성을 낮추기 위해서 검사후 등록
                // 소유객체에 참조 등록 (중복제거됨)
                if (this._onwer._regRefer) {
                    this._onwer._regRefer(collection._onwer);
                }
            }
            
            return _super.prototype.add.call(this, i_name, i_value);
        };

        /**
         * 엔티티 추가한다.
         * REVIEW:: 제거 대상 add() 로 합쳐짐
         * @param {Entity} p_entity 
         */
        ItemViewCollection.prototype.addEntity  = function(p_entity) {
            if (typeof p_entity === 'undefined' && !(p_entity instanceof MetaElement && p_entity.instanceOf('Entity'))) {
                throw new Error('Only [p_entity] type "Entity" can be added');
            }

            for (var i = 0; p_entity.items.count > i; i++) {
                this.add(p_entity.items[i]);
            }
        };
        
        return ItemViewCollection;
    
    }(ItemCollection));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
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

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Entity.ItemDOM
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
    var Item;
    var jquery;
    var ajax;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                    = require('./utils');
        Item                    = require('./entity-item').Item;
    } else {
        util                    = global._W.Common.Util;
        Item                    = global._W.Meta.Entity.Item;
        jquery                  = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof Item === 'undefined') throw new Error('[Item] module load fail...');
    if (typeof jquery === 'undefined' && typeof module !== 'object') throw new Error('[jquery] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ItemDOM  = (function (_super) {
        /**
         * @constructs _W.Meta.Entity.ItemDOM
         * @extends _W.Meta.Entity.Item
         */
        function ItemDOM(p_name, p_entity, p_option) {
            _super.call(this, p_name, p_entity, p_option);

            var __domType       = null;
            var __isReadOnly    = false;
            var __isHide        = false;
            var __element       = null;
            var __getFilter     = null;
            var __setFilter     = null;
            var __selector      = null;

            /**
             * 아이템 DOM 타입
             * @member {*} _W.Meta.Entity.ItemDOM#domType
             */
            Object.defineProperty(this, 'domType', 
            {
                get: function() { return __domType; },
                set: function(newValue) { 
                    // TODO:: 자료종류 {input: {type: 'text'...}} 만들어야함
                    if(typeof newValue !== 'object') throw new Error('Only [domType] type "object" can be added');
                    __domType = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 읽기전용 여부
             * @member {*} _W.Meta.Entity.ItemDOM#isReadOnly
             */
            Object.defineProperty(this, 'isReadOnly', 
            {
                get: function() { return __isReadOnly; },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isReadOnly] type "boolean" can be added');
                    __isReadOnly = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 숨김 여부
             * @member {*} _W.Meta.Entity.ItemDOM#isHide
             */
            Object.defineProperty(this, 'isHide', 
            {
                get: function() { return __isHide; },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') throw new Error('Only [isHide] type "boolean" can be added');
                    __isHide = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * DOM 요소
             * @member {*} _W.Meta.Entity.ItemDOM#element
             */
            Object.defineProperty(this, 'element', 
            {
                get: function() { return __element; },
                set: function(newValue) { 
                    if(typeof newValue !== 'object') throw new Error('Only [element] type "object" can be added');
                    __element = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 셀렉터
             * @member _W.Meta.Entity.ItemDOM#selector
             * @example
             * type
             *  - val | value   : 요소의 value 속성값
             *  - text          : 요소의 텍스트값
             *  - html          : 요소의 html값
             *  - css.속성명    : css 의 속성값 (객체)
             *  - prop.속성명   : 요소의 속성명값 (초기상태기준)
             *  - attr.속성명   : 요소의 속성명값 (현재상태)
             *  - none         : 아무일도 하지 않음, 표현의 목적
             */
            Object.defineProperty(this, 'selector', 
            {
                get: function() { return __selector; },
                set: function(newValue) { 
                    var selector = { key: '', type: 'value' };

                    if (typeof newValue === 'string') {
                        selector.key = newValue;
                    } else if (typeof newValue === 'object' && typeof newValue.key !== 'undefined') {
                        selector = newValue;
                    } else {
                        throw new Error('Only [selector] type "string | object.key" can be added');
                    }
                    __selector = selector;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * value 값 필터
             * @member {Function} _W.Meta.Entity.ItemDOM#getFilter
             */
             Object.defineProperty(this, 'getFilter', 
             {
                 get: function() { return __getFilter; },
                 set: function(val) { 
                     if(val !== null && typeof val !== 'function') throw new Error('Only [getFilter] type "function" can be added');
                     __getFilter = val;
                 },
                 configurable: true,
                 enumerable: true
             });
                      
             /**
             * value 값 필터
             * @member {Function} _W.Meta.Entity.ItemDOM#setFilter
             */
              Object.defineProperty(this, 'setFilter', 
              {
                  get: function() { return __setFilter; },
                  set: function(val) { 
                      if(val !== null && typeof val !== 'function') throw new Error('Only [setFilter] type "function" can be added');
                      __setFilter = val;
                  },
                  configurable: true,
                  enumerable: true
              });

            /**
             * 아이템 값 (오버라이딩)
             * @member {*} _W.Meta.Entity.ItemDOM#value
             */
            Object.defineProperty(this, 'value', 
            {
                get: function() { 
                    var __val;
                    var key, type, option;

                    // 우선순위 : 1
                    if (typeof this.getter === 'function' ) {
                        
                        __val = this.getter.call(this);
                        
                        // 검사 및 이벤트 발생
                        if (this.__value !== null && this.__value !== __val) {
                            this._onChanged(__val, this.__value);
                            this.__value = __val;   // 내부에 저장
                        }

                    // 우선순위 : 2
                    // } else if (__selector !== null && __filter === null) {
                    } else if (__selector !== null || typeof this.getFilter === 'function') {

                        // node 에서는 강제 종료함
                        if (typeof module !== 'object') {

                            key = this.selector.key;
                            type = this.selector.type;
                            option = type.indexOf('.') > -1 ? type.substr(type.indexOf('.') + 1) : '';
                            
                            if (type !== 'none' &&  type !== ''){
                                if (type === 'value' || type === 'val') {
                                    __val = jQuery(key).val();
                                } else if (type === 'text') {
                                    __val = jQuery(key).text();
                                } else if (type === 'html') {
                                    __val = jQuery(key).html();
                                } else if (type.indexOf('prop') > -1) {
                                    __val = jQuery(key).prop(option);
                                } else if (type.indexOf('attr') > -1) {
                                    __val = jQuery(key).attr(option);
                                } else if (type.indexOf('css') > -1) {
                                    __val = jQuery(key).css(option);
                                } else {
                                    console.warn('['+ key +'] selector의 type는[value, val, text, prop, attr, css, none] 이어야합니다. ');
                                }
                                
                                // selector 검사
                                if (typeof __val === 'undefined' || __val === null) {
                                    console.warn('['+ key +'] ['+ type +'] 일치하는 selector가 없습니다. ');                            
                                } 

                                // 검사 및 이벤트 발생
                                if (this.__sValue !== null && this.__sValue !== __val && __val) {
                                    this._onChanged(__val, this.__sValue);
                                    this.__sValue = String(__val);  // sValue 저장
                                }

                            }
                        }

                        // 필터 적용 : get
                        if (typeof this.getFilter === 'function') __val = this.getFilter.call(this, __val);
                    
                    // 우선순위 : 3        
                    } else {
                        __val = this.__value;
                    }
                     
                    /**
                     * 분기 처리값 '__val' 없는경우 (null, undefined)
                     *  - this.__value 초기화 되지 않은 경우
                     *  - getter 리턴이 없는 경우
                     *  - node selector 를 사용한 경우
                     *  - selector 매칭값이 없는 경우
                     */
                    if (typeof __val === 'undefined' || __val === null) {
                        __val = this.__value || this.default;  
                    }

                    // Get값과 내부값이 다를경우 값 설정 (내부적으로 change 이벤트 발생함)
                    // if (__val !== this.__value) {
                    //     this.value = __val;
                    // }

                    return __val; 
                },
                set:  function(val) { 
                    var __val, _val, _fVal;
                    var key, type, option;
                    var _oldVal = this.__value;
                    // var _isSetFilter = true;   // selector 설정 여부

                    if (typeof this.setter === 'function' ) _val = this.setter.call(this, val);
                    
                    // settter 의 리턴이 여부
                    if (typeof _val !== 'undefined') __val = _val;
                    else __val = val; 

                    __val = __val === null ? '' : __val;  // null 등록 오류 처리
                    if(['number', 'string', 'boolean'].indexOf(typeof __val) < 0) {
                        throw new Error('Only [value] type "number, string, boolean" can be added');
                    }
                    this.__value = __val;   // 내부에 저장
           
                    if (__selector !== null || typeof this.setFilter === 'function') {

                        if (typeof this.setFilter === 'function') {
                            _fVal = this.setFilter.call(this, __val);
                        }
                        
                        // 셀렉터 설정 값 1> 필터값, 2> __value
                        __val = _fVal || __val;

                        // node 에서는 강제 종료함
                        if (typeof module !== 'object') {

                            // 필터 적용 : set
                            // if (typeof this.setFilter === 'function') {
                            //     __val = this.setFilter.call(this, __val);
                            //     _isSetFilter = __val ? true : false;
                            // }

                            // if (typeof this.setFilter === 'function') {
                            //     _fVal = this.setFilter.call(this, __val);
                            // }
                            
                            // // 셀렉터 설정 값 1> 필터값, 2> __value
                            // __val = _fVal || __val;

                            // 셀렉터 내부값 저장
                            this.__sValue = String(__val);

                            key = this.selector.key;
                            type = this.selector.type;
                            option = type.indexOf('.') > -1 ? type.substr(type.indexOf('.') + 1) : '';

                            // 유효한 셀렉터 이면서, 설정할 ....
                            // if (type !== 'none' && type !== '' && _isSetFilter){
                            if (type !== 'none' && type !== ''){
                                if (type === 'value' || type === 'val') {
                                    jQuery(key).val(__val);
                                } else if (type === 'text') {
                                    jQuery(key).text(__val);
                                } else if (type === 'html') {
                                    jQuery(key).html(__val);
                                } else if (type.indexOf('prop') > -1) {
                                    jQuery(key).prop(option, __val);
                                } else if (type.indexOf('attr') > -1) {
                                    jQuery(key).attr(option, __val);
                                } else if (type.indexOf('css') > -1) {
                                    jQuery(key).css(option, __val);
                                } else {
                                    console.warn('['+ key +'] selector의 type는[value, val, text, prop, attr, css, none] 이어야합니다. ');
                                }
                            }
                        }
                    }

                    // 검사 및 이벤트 발생 : 타입간 호환성
                    if (_oldVal !== __val && __val) this._onChanged(__val, _oldVal);

                    // // 이벤트 발생
                    // this._onChanged();
                },
                configurable: true,
                enumerable: true
            });
            



            //---------------------------------------------------
            // 아이템 옵션속성 추가
            if (typeof p_option === 'object' ) {
                for(var prop in p_option) {
                    if (p_option.hasOwnProperty(prop) && 
                        ['domType', 'isReadOnly', 'isHide', 'element', 'selector', 'getFilter', 'setFilter'].indexOf(prop) > -1) {
                        this[prop] = p_option[prop];
                    }
                }
            }
            // 기본값 설정
            this.default = this.default || '';
        }
        util.inherits(ItemDOM, _super);
    
        /** @override **/
        ItemDOM.prototype.getTypes  = function() {
                    
            var type = ['ItemDOM'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 아이템 DOM을 복제한다. 
         * @returns {ItemDOM}
         */
        ItemDOM.prototype.clone  = function() {
                    
            var top = _super.prototype.clone.call(this);
            var clone = new ItemDOM(this.name);

            for(var prop in top) {
                if (top.hasOwnProperty(prop)) {
                    if (top[prop]) clone[prop] = top[prop];
                }
            }

            if (this.domType) clone['domType']          = this.domType;     // 참조값
            if (this.isReadOnly) clone['isReadOnly']    = this.isReadOnly;
            if (this.isHide) clone['isHide']            = this.isHide;
            if (this.element) clone['element']          = this.element;
            
            if (this.selector) clone['selector']        = this.selector;
            if (this.getFilter) clone['getFilter']      = this.getFilter;
            if (this.setFilter) clone['setFilter']      = this.setFilter;
            // if (this.selector) clone.__selector        = this.__selector.concat([]); // 배열 + 함수형
            
            return clone;
        };

// POINT:: 삭제대기
        // /**
        //  * 상위 Item.value 의 특성을 오버라이딩함
        //  * @param {Function} p_getter 
        //  * @param {Function} p_setter 
        //  */
        // ItemDOM.prototype.defineValueProperty  = function(p_getter, p_setter) {
        //     p_getter = p_getter || function() { return this.value };
        //     p_setter = p_setter || function(val) { this.value = val };

        //     // 유효성 검사
        //     if (typeof p_getter !== 'function') throw new Error('Only [p_getter] type 'function' can be added');
        //     if (typeof p_setter !== 'function') throw new Error('Only [p_setter] type 'function' can be added');

        //     Object.defineProperty(this, 'value', 
        //     {
        //         get: p_getter,
        //         set: p_setter,
        //         configurable: true,
        //         enumerable: true
        //     });
        // };

        /** @override */
        ItemDOM.prototype.getObject = function() {
            // TODO::
        };

        /**
         * TODO:
         */
        ItemDOM.prototype.toEntityColumn = function() {
            // TODO::
        };

        return ItemDOM;
    
    }(Item));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ItemDOM;
    } else {
        global._W.Meta.Entity.ItemDOM = ItemDOM;
        global.ItemDOM = ItemDOM;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Entity.Row
 * namespace _W.Meta.Entity.RowCollection
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
    var PropertyCollection;
    var ArrayCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        MetaObject          = require('./meta-object');
        PropertyCollection  = require('./collection-property');
        ArrayCollection     = require('./collection-array');
    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ArrayCollection     = global._W.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof ArrayCollection === 'undefined') throw new Error('[ArrayCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var Row  = (function (_super) {
        /**
         * 로우
         * @constructs _W.Meta.Entity.Row
         * @extends _W.Collection.PropertyCollection
         */
        function Row(p_entity) {
            _super.call(this, p_entity);
            
            var __entity        = null;
            var itemName;

            // Entity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaObject && p_entity.instanceOf('Entity')) {
                __entity    = p_entity;

                for (var i = 0; i < __entity.items.count; i++) {
                    
                    // 별칭 가져오기로 수정함
                    // itemName = __entity.items[i].name;   
                    itemName = __entity.items[i].alias;
                    _super.prototype.add.call(this, itemName, null);
                }
            }

            /**
             * 로우의 소유 엔티티
             * @member {Entity} _W.Meta.Entity.Row#entity
             */
            Object.defineProperty(this, 'entity', 
            {
                get: function() { return __entity; },
                configurable: true,
                enumerable: true
            });            
        }
        util.inherits(Row, _super);

        /** @override **/
        Row.prototype.getTypes  = function() {
                    
            var type = ['Row'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 로우를 복사한다. (생성 후 복제)
         * @param {Object} p_filter 필터객체
         */
        Row.prototype.copy = function(p_filter) {
          
            var clone = new Row(this.entity);
            
            if (this.value) clone['value'] = this.value;
        };
        
        /**
         * 로우를 복제한다.
         * @returns {Row}
         */
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
         * 로우 컬렉션
         * @constructs _W.Meta.Entity.RowCollection
         * @extends _W.Collection.ArrayCollection
         * @param {*} p_onwer 소유자 
         */
        function RowCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = Row;   // 컬렉션타입 설정
        }
        util.inherits(RowCollection, _super);

        /**
         * 로우컬렉션에 로우를 추가한다.
         * @param {String | Item} p_row 
         * @returns {Row} 등록한 로우
         */
        RowCollection.prototype.add  = function(p_row) {

            var i_value;

            if (typeof p_row === 'undefined') {      
                i_value = new Row(this._onwer);
            } else if (p_row instanceof Row) {
                i_value = p_row;
            } else {
                throw new Error('Row | Row object [p_row].');
            }

            return _super.prototype.add.call(this, i_value);
        };

        return RowCollection;
        
    }(ArrayCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.Row = Row;
        module.exports.RowCollection = RowCollection;
    } else {
        global._W.Meta.Entity.Row = Row;
        global._W.Meta.Entity.RowCollection = RowCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
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
/**
 * namespace _W.Meta.Entity.EntityTable
 * namespace _W.Meta.Entity.EntityTableCollection
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
    var Entity;
    var PropertyCollection;
    var ItemTableCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('util');
        Entity              = require('./entity-base');
        PropertyCollection  = require('./collection-property');
        ItemTableCollection      = require('./entity-item').ItemTableCollection;
    } else {
        util                = global._W.Common.Util;
        Entity              = global._W.Meta.Entity.Entity;
        PropertyCollection  = global._W.Collection.PropertyCollection;
        ItemTableCollection      = global._W.Meta.Entity.ItemTableCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof Entity === 'undefined') throw new Error('[Entity] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof ItemTableCollection === 'undefined') throw new Error('[ItemTableCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var EntityTable  = (function (_super) {
        /**
         * 테이블 엔티티
         * @constructs _W.Meta.Entity.EntityTable
         * @extends _W.Meta.Entity.Entity
         * @param {*} p_name 
         */
        function EntityTable(p_name) {
            _super.call(this, p_name);

            this.items = new ItemTableCollection(this);
        }
        util.inherits(EntityTable, _super);

        /** @override **/
        EntityTable.prototype.getTypes  = function() {
            
            var type = ['EntityTable'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** @override */
        EntityTable.prototype.getObject = function() {
            // TODO::
        };

        /**
         * 테이블 엔티티를 복제한다.
         * @returns {*}
         */
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
         * 테이블 컬렉션
         * @constructs _W.Meta.Entity.EntityTableCollection
         * @extends _W.Collection.PropertyCollection
         * @param {*} p_onwer 소유자 
         */
        function EntityTableCollection(p_onwer) {
            _super.call(this, p_onwer);

            this.elementType = EntityTable;   // 컬렉션타입 설정
        }
        util.inherits(EntityTableCollection, _super);

        /**
         * 테이블 컬렉션에 엔티티 추가한다.
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        EntityTableCollection.prototype.add  = function(p_object) {

            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new EntityTable(i_name);
            } else if (p_object instanceof EntityTable) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error('string | EntityTable object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        return EntityTableCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.EntityTable = EntityTable;
        module.exports.EntityTableCollection = EntityTableCollection;
    } else {
        global._W.Meta.Entity.EntityTable = EntityTable;
        global._W.Meta.Entity.EntityTableCollection = EntityTableCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
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
/**
 * namespace _W.Meta.Entity.EntitySet
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    // var util;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // util = require('util');
    } else {
        // global._W = global._W || {};
        // util = global._W.util || {};
    }

    //==============================================================
    // 3. 의존성 검사
    // if (typeof util === 'undefined') throw new Error('[XXX] module  load fail...');


    //==============================================================
    // 4. 모듈 구현    
    // util.inherits = (function () {
    // }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    // if (typeof module === 'object' && typeof module.exports === 'object') {     
    //     module.exports = namespace;
    // } else {
    //     global._W.namespace = namespace;
    // }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Bind.BaseBind
 */
(function(global) {
    
    'use strict';

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

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        Observer            = require('./observer');
        MetaObject          = require('./meta-object');
        Entity              = require('./entity-base');
    } else {
        util                = global._W.Common.Util;
        Observer            = global._W.Common.Observer;
        MetaObject          = global._W.Meta.MetaObject;
        Entity              = global._W.Meta.Entity.Entity;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');
    if (typeof Entity === 'undefined') throw new Error('[Entity] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var BaseBind  = (function (_super) {
        /**
         * 기본 바인드 (최상위)
         * @constructs _W.Meta.Bind.BaseBind
         * @abstract
         * @extends _W.Meta.MetaObject
         */
        function BaseBind() {
            _super.call(this);

            var __baseEntity;
            // var __propagation   = true;
            
            /** 
             * 이벤트 (옵서버)
             * @private 
             */
            this.__event    = new Observer(this, this);

            // Protected
            /**
             * 심볼 (내부 심볼 등록)
             * @protected
             */
            this._symbol        = [];

            /**
             * 기본 엔티티
             * @member _W.Meta.Bind.BaseBind#_baseEntity
             * @protected
             */
            Object.defineProperty(this, '_baseEntity', 
            {
                get: function() { return __baseEntity; },
                set: function(newValue) { 
                    if (!(newValue instanceof Entity)) throw new Error('Only [baseEntity] type "Entity" can be added');
                    __baseEntity = newValue;
                },
                configurable: true,
                enumerable: true
            });  

            /**
             * 실행전 이벤트
             * @event _W.Meta.Bind.BaseBind#onExecute
             */
            Object.defineProperty(this, 'onExecute', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'execute');
                }
            });

            /**
             * 실행후 이벤트
             * @event _W.Meta.Bind.BaseBind#onExecuted
             */
            Object.defineProperty(this, 'onExecuted', {
                enumerable: true,
                configurable: true,
                set: function(p_fn) {
                    this.__event.subscribe(p_fn, 'executed');
                }
            });

            // 예약어 등록
            this._symbol = this._symbol.concat(['__event', '_symbol', '_baseEntity']);
            this._symbol = this._symbol.concat(['onExecute', 'onExecuted']);
            this._symbol = this._symbol.concat(['getTypes', '_onExecute', '_onExecuted']);
        }
        util.inherits(BaseBind, _super);


        /** 
         * 상속 클래스에서 오버라이딩 필요!!
         * @override
         */
        BaseBind.prototype.getTypes  = function() {
                    
            var type = ['BaseBind'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /**
         * 실행전 이벤트
         * @listens _W.Meta.Bind.BaseBind#_onExecute
         */
        BaseBind.prototype._onExecute = function(p_bindCommand) {
            this.__event.publish('execute', p_bindCommand);
        };

        /**
         * 실행후 이벤트
         * @listens _W.Meta.Bind.BaseBind#_onExecuted
         */
        BaseBind.prototype._onExecuted = function(p_bindCommand, p_result) {
            this.__event.publish('executed', p_bindCommand, p_result); 
        };

        return BaseBind;
    
    }(MetaObject));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = BaseBind;
    } else {
        global._W.Meta.Bind.BaseBind = BaseBind;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Bind.BindCommand
 */ 
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaObject;
    var BaseCollection;
    var BaseBind;
    var Item;
    var Entity;
    var entityView;
    var EntityView;
    var EntityViewCollection;


    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                    = require('./utils');
        MetaObject              = require('./meta-object');
        BaseCollection          = require('./collection-base');
        BaseBind                = require('./bind-base');
        Item                    = require('./entity-item').Item;
        Entity                  = require('./entity-base');
        entityView              = require('./entity-view');
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
    } else {
        util                    = global._W.Common.Util;
        MetaObject              = global._W.Meta.MetaObject;
        BaseCollection          = global._W.Collection.BaseCollection;
        BaseBind                = global._W.Meta.Bind.BaseBind;
        Entity                  = global._W.Meta.Entity.Entity;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
        Item                    = global._W.Meta.Entity.Item;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof BaseCollection === 'undefined') throw new Error('[BaseCollection] module load fail...');
    if (typeof BaseBind === 'undefined') throw new Error('[BaseBind] module load fail...');
    if (typeof Entity === 'undefined') throw new Error('[Entity] module load fail...');
    if (typeof Item === 'undefined') throw new Error('[Item] module load fail...');
    if (typeof EntityView === 'undefined') throw new Error('[EntityView] module load fail...');
    if (typeof EntityViewCollection === 'undefined') throw new Error('[EntityViewCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var BindCommand  = (function (_super) {
        /**
         * 바인드 명령 (상위)
         * @constructs _W.Meta.Bind.BindCommand
         * @abstract
         * @extends _W.Meta.Bind.BaseBind
         * @param {*} p_bindModel 
         * @param {*} p_baseEntity 
         */
        function BindCommand(p_bindModel, p_baseEntity) {
            _super.call(this);
            
            p_baseEntity = p_baseEntity || p_bindModel._baseEntity;     // 기본값

            /**
             * 모델
             * @protected  
             */
            this._model = p_bindModel;          // 최상위 설정
            /**
             * 기본 요소
             * @protected
             */
            this._baseEntity = p_baseEntity;    // 최상위 설정

            /**
             * 출력 컬렉션
             * @protected
             */
            this._output = new EntityViewCollection(this, this._baseEntity);
            this.addOutput('output');

            var __propagation   = true;

            var __valid     = new EntityView('valid', this._baseEntity);
            var __bind      = new EntityView('bind', this._baseEntity);
            var __etc       = new EntityView('etc', this._baseEntity);

            var __cbValid       = null;
            var __cbBind        = null;
            var __cbResult      = null;
            var __cbEnd         = null;
            var __cbOutput      = null;
            var __outputOption  = 0;     // 0: 제외(edit),  1: View 오버로딩 , 2: 있는자료만 , 3: 존재하는 자료만          

            
            if (p_bindModel && !(p_bindModel instanceof MetaObject && p_bindModel.instanceOf('BindModel'))) {
                throw new Error('Only [p_bindModel] type "BindModel" can be added');
            }
            if (p_baseEntity && !(p_bindModel instanceof MetaObject && p_baseEntity.instanceOf('Entity'))) {
                throw new Error('Only [p_baseEntity] type "Entity" can be added');
            }
            
            /**
             * 이벤트 전파 유무 (기본값 = true)
             * @member {Boolean} _W.Meta.Bind.BindCommand#eventPropagation 
             */
            Object.defineProperty(this, 'eventPropagation', {
                enumerable: true,
                configurable: true,
                set: function(p_bool) {
                    if (typeof p_bool !== 'boolean') throw new Error('Only [p_bool] type "Boolean" can be added');
                    __propagation = p_bool;
                },
                get: function() { return __propagation; }
            }); 
            
            /**
             * 검사대상 EntityView
             * @member {EntityView} _W.Meta.Bind.BindCommand#valid 
             */
            Object.defineProperty(this, 'valid', 
            {
                get: function() { return __valid; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error('Only [valid] type "EntityView" can be added');
                    __valid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인드 EntityView
             * @member {EntityView} _W.Meta.Bind.BindCommand#bind 
             */
            Object.defineProperty(this, 'bind', 
            {
                get: function() { return __bind; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error('Only [valid] type "EntityView" can be added');
                    __bind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 기타 EntityView (기타의 용도 : validSelector 외)
             * @member {EntityView} _W.Meta.Bind.BindCommand#etc 
             */
            Object.defineProperty(this, 'etc', 
            {
                get: function() { return __etc; },
                set: function(newValue) { 
                    if (!(newValue instanceof EntityView)) throw new Error('Only [etc] type "EntityView" can be added');
                    __etc = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 출력(output) 특성
             * 0: 제외(edit),  1: View 오버로딩 , 2: 있는자료만 , 3: 존재하는 자료만 
             * @member {Number} _W.Meta.Bind.BindCommand#outputOption 
             */
            Object.defineProperty(this, 'outputOption', 
            {
                get: function() { return __outputOption; },
                set: function(newValue) { 
                    if (!(typeof newValue === 'number')) throw new Error('Only [outputOption] type "number" can be added');
                    __outputOption = newValue;
                },

                configurable: true,
                enumerable: true
            });

            /**
             * 검사(valid) 전 콜백
             * @member {Function} _W.Meta.Bind.BindCommand#cbValid 
             */
            Object.defineProperty(this, 'cbValid', 
            {
                get: function() { return __cbValid; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbValid] type "Function" can be added');
                    __cbValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인드(bind) 전 콜백
             * @member {Function} _W.Meta.Bind.BindCommand#cbBind
             */
            Object.defineProperty(this, 'cbBind', 
            {
                get: function() { return __cbBind; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbBind] type "Function" can be added');
                    __cbBind = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인드(bind) 결과 콜백 (주요 : 회신자료의 가공의 역활)
             * @member {Function} _W.Meta.Bind.BindCommand#cbValid 
             */
            Object.defineProperty(this, 'cbResult', 
            {
                get: function() { return __cbResult; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbResult] type "Function" can be added');
                    __cbResult = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인드 결과 출력 콜백 (주요: 목록의 출력)
             * @member {Function} _W.Meta.Bind.BindCommand#cbOutput 
             */
            Object.defineProperty(this, 'cbOutput', 
            {
                get: function() { return __cbOutput; },
                set: function(newValue) { 
                    if (typeof newValue  !== 'function') throw new Error('Only [cbOutput] type "Function" can be added');
                    __cbOutput = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 바인드 처리 종료 후 콜백 (주요: 다른 이벤트 또는 명령과의 연결)
             * @member {Function} _W.Meta.Bind.BindCommand#cbEnd 
             */
            Object.defineProperty(this, 'cbEnd', 
            {
                get: function() { return __cbEnd; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbEnd] type "Function" can be added');
                    __cbEnd = newValue;
                },
                configurable: true,
                enumerable: true
            });    

            // 예약어 등록
            this._symbol = this._symbol.concat(['_model', 'eventPropagation']);
            this._symbol = this._symbol.concat(['valid', 'bind']);
            this._symbol = this._symbol.concat(['cbValid', 'cbBind', 'cbResult', 'cbOutput', 'cbEnd']);
            this._symbol = this._symbol.concat(['_output', 'outputOption', 'cbOutput']);
            this._symbol = this._symbol.concat(['execute', '_onExecute', '_onExecuted', 'getTypes', 'add', 'addItem', 'setItem']);
            this._symbol = this._symbol.concat(['addOutput']);
        }
        util.inherits(BindCommand, _super);
    

        /** 
         * 실행 ( valid >> bind >> result >> output >> end )
         * @virtual 
         */
        BindCommand.prototype.execute = function() {
            throw new Error('[ execute() ] Abstract method definition, fail...');
        };

        /**
         * BindCommand의 실행 전 이벤트 
         * @override 
         * @param {BindCommand} p_bindCommand 
         */
        BindCommand.prototype._onExecute = function(p_bindCommand) {
            _super.prototype._onExecute.call(this, p_bindCommand);               // 자신에 이벤트 발생
            
            if (this.eventPropagation) this._model._onExecute(p_bindCommand);    // 모델에 이벤트 추가 발생
        };

        /**
         * BindCommand의 실행 후 이벤트 
         * @override 
         * @param {BindCommand} p_bindCommand 
         * @param {Object} p_result 
         */
        BindCommand.prototype._onExecuted = function(p_bindCommand, p_result) {
            _super.prototype._onExecuted.call(this, p_bindCommand, p_result);
            if (this.eventPropagation) this._model._onExecuted(p_bindCommand, p_result);
        };

        /** 
         * 상속 클래스에서 오버라이딩 필요!!
         * @override  
         */
        BindCommand.prototype.getTypes  = function() {
                    
            var type = ['BindCommand'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };
        
        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?(Array<String> | String)} p_views <선택> 추가할 뷰 엔티티
         */
        BindCommand.prototype.add = function(p_item, p_views) {

            var views = [];     // 파라메터 변수
            var property = [];      // 속성
            var collection;

            // 1.유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error('Only [p_item] type "Item" can be added');
            }
            if (typeof p_views !== 'undefined' && (!(Array.isArray(p_views) || typeof p_views === 'string'))) {
                throw new Error('Only [p_views] type "Array | string" can be added');
            } 

            // 2.초기화 설정
            if (Array.isArray(p_views)) views = p_views;
            else if (typeof p_views === 'string') views.push(p_views);
            
            // baseEntity 에 아이템 없으면 등록
            if (!this._baseEntity.items.contains(p_item))  {
                this._baseEntity.items.add(p_item);
            }

            // 3.설정 대상 가져오기
            if (views.length > 0) {
                for (var i = 0; i < views.length; i++) {
                    
                    if (typeof views[i] !== 'string') throw new Error('Only [String] type instances can be added');
                   
                    // 속성 유무 검사
                    if (this[views[i]]) {
                        property.push(views[i]);
                    } else {
                        console.warn('Warning!! Param p_views 에 [' + views[i] + ']가 없습니다. ');
                    }
                }
            } else {
                // 공개(public) Entity 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof Entity && prop.substr(0, 1) !== '_') {
                        property.push(prop.toString());
                    }
                }
            }

            // 4.컬렉션 추가(등록)
            for (var i = 0; i < property.length; i++) {
                if (this[property[i]] instanceof Entity ){
                    collection = this[property[i]].items;
                } else {
                    console.warn('Warning!! [' + property[i] + ']속성이 this 에 없습니다. ');
                }
                collection.add(p_item);
            }
        };

        /**
         * p_name으로 아이템을 p_entitys(String | String)에 다중 등록한다.
         * @param {String} p_name
         * @param {Object | String | Number | Boolean} p_value
         * @param {?(Array<String> | String)} p_views <선택> 추가할 뷰 엔티티
         */
        BindCommand.prototype.addItem = function(p_name, p_value, p_views) {

            var item;
            
            // 유효성 검사
            if (typeof p_name !== 'string') {
                throw new Error('Only [p_name] type "string" can be added');
            }

            item = this._baseEntity.items.addValue(p_name, p_value);

            this.add(item, p_views);
        };

        /**
         * 예시>
         * e.read.setEntity(['idx', 'addr'], 'valid');
         * @param {String | Array} p_names 아이템명
         * @param {?(String | Array<String>)} p_views 설정할 뷰이름
         */
        BindCommand.prototype.setItem = function(p_names, p_views) {

            var names = [];     // 파라메터 변수
            var itemName;
            var item;

            // 초기화
            if (Array.isArray(p_names)) names = p_names;
            else if (typeof p_names === 'string') names.push(p_names);

            // 유효성 검사
            if (names.length === 0) throw new Error('Only [p_names] type "Array | string" can be added');

            // 아이템 검사 및 등록 함수 this.add(..) 호출
            for(var i = 0; names.length > i; i++) {
                itemName = names[i]; 
                item = this._model._baseEntity.items[itemName];
                if (typeof item !== 'undefined') {
                    this.add(item, p_views);
                } else {
                    console.warn('baseEntity에 [' + itemName + '] 아이템이 없습니다.');
                }
            }
        };

        /**
         * 대상엔티티에서 해제
         * @param {String | Array} p_names 해제할 아이템명
         * @param {?(String | Array<String>)} p_views 'valid', 'bind', 'output' 해제할 뷰 엔티티 지정
         * @example
         * e.read.release(['idx', 'addr'], 'valid');
         */
        BindCommand.prototype.release = function(p_names, p_views) {

            var names = [];         // 파라메터 변수
            var views = [];      // 파라메터 변수
            var property = [];      // 속성
            var itemName;
            var item;


            // 초기화
            if (Array.isArray(p_names)) names = p_names;
            else if (typeof p_names === 'string') names.push(p_names);

            // 1. 유효성 검사
            if (names.length === 0) throw new Error('Only [p_names] type "Array | string" can be added');
            if (typeof p_views !== 'undefined' && (!(Array.isArray(p_views) || typeof p_views === 'string'))) {
                throw new Error('Only [p_views] type "Array | string" can be added');
            } 

            // 2.초기화 설정
            if (Array.isArray(p_views)) views = p_views;
            else if (typeof p_views === 'string') views.push(p_views);
            
            // 3.설정 대상 가져오기
            if (views.length > 0) {
                for (var i = 0; i < views.length; i++) {
                    
                    if (typeof views[i] !== 'string') throw new Error('Only [String] type instances can be added');
                   
                    // 속성 유무 검사
                    if (this[views[i]]) {
                        property.push(views[i]);
                    } else {
                        console.warn('Warning!! Param p_views 에 [' + views[i] + ']가 없습니다. ');
                    }
                }
            } else {
                // 공개(public) Entity 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof Entity && prop.substr(0, 1) !== '_') {
                        property.push(prop.toString());
                    }
                }
            }

            // 아이템 검사 및 아이템 해제
            for(var i = 0; names.length > i; i++) {
                itemName = names[i]; 
                item = this._model._baseEntity.items[itemName];

                if (typeof item !== 'undefined') {
                    for (var ii = 0; property.length > ii; ii++) {
                        this[property[ii]].items.remove(item);
                    }

                } else {
                    console.warn('baseEntity에 [' + itemName + '] 아이템이 없습니다.');
                }
            }
        };

        /**
         * 출력에 사용할 엔티티를 추가한다.
         * @param {String} p_name 
         */
        BindCommand.prototype.addOutput = function(p_name) {

            // 유효성 검사
            if (typeof p_name !== 'string') throw new Error('Only [p_name] type "string" can be added');
            
            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(' [' + p_name + '] is a Symbol word');   
            }            

            // 이름 중복 검사
            if (typeof this[p_name] !== 'undefined') throw new Error('에러!! 이름 중복 : ' + p_name);

            // this._output.add('default', this._baseEntity);            // 등록방법 2
            this._output.add(new EntityView(p_name, this._baseEntity));  // 등록방법 1
            this[p_name] = this._output[p_name];
        };


        return BindCommand;
    
    }(BaseBind));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = BindCommand;
    } else {
        global._W.Meta.Bind.BindCommand = BindCommand;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Bind.BindModel
 */
(function(global) {

    'use strict';

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

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                        = require('./utils');
        BaseBind                    = require('./bind-base');
        ItemCollection              = require('./entity-item').ItemCollection;
        PropertyCollection          = require('./collection-property');
        PropertyFunctionCollection  = require('./collection-property-function');        
        IBindModel                  = require('./i-bind-model');        
        Entity                      = require('./entity-base');
        EntityTable                 = require('./entity-table').EntityTable;
        Item                        = require('./entity-item').Item;
        MetaObject                  = require('./meta-object');
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
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseBind === 'undefined') throw new Error('[BaseBind] module load fail...');
    if (typeof ItemCollection === 'undefined') throw new Error('[ItemCollection] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof PropertyFunctionCollection === 'undefined') throw new Error('[PropertyFunctionCollection] module load fail...');
    if (typeof IBindModel === 'undefined') throw new Error('[IBindModel] module load fail...');
    if (typeof Entity === 'undefined') throw new Error('[Entity] module load fail...');
    if (typeof EntityTable === 'undefined') throw new Error('[EntityTable] module load fail...');
    if (typeof Item === 'undefined') throw new Error('[Item] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var BindModel  = (function (_super) {
        /**
         * 바인드모델 추상클래스
         * @constructs _W.Meta.Bind.BindModel
         * @abstract
         * @extends _W.Meta.Bind.BaseBind
         */
        function BindModel()  {
            _super.call(this);

            var __prop          = new PropertyCollection(this);
            var __fn            = new PropertyFunctionCollection(this);
            var __mapping       = new PropertyCollection(this);
            
            var __cbFail        = function(msg) { console.warn('실패하였습니다. Err:'+ msg); };
            var __cbError       = function(msg) { console.error('오류가 발생 하였습니다. Err:'+msg); };
            var __cbBaseValid   = null;
            var __cbBaseBind    = null;
            var __cbBaseResult  = null;
            var __cbBaseOutput  = null;
            var __cbBaseEnd     = null;

            var __itemType      = Item;

            this.__preRegister    = function() {};
            this.__preCheck       = function() {return true};
            this.__preReady       = function() {};

            // DI 인터페이스 구현 검사
            // if(typeof p_objectDI !== 'undefined' && !(p_objectDI instanceof IBindModel))  {
            //     throw new Error('Only [p_objectDI] type "IBindModel" can be added');
            // }
            
            /**
             * 바인드모델 속성 (내부 : __이름)
             * @member {PropertyCollection} _W.Meta.Bind.BindModel#prop
             */
            Object.defineProperty(this, 'prop', 
            {
                get: function() { return __prop; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyCollection)) throw new Error('Only [prop] type "PropertyCollection" can be added');
                    __prop = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인드모델 함수 (내부함수 + 노출함수)
             * @member {PropertyFunctionCollection} _W.Meta.Bind.BindModel#fn
             */
            Object.defineProperty(this, 'fn', 
            {
                get: function() { return __fn; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyFunctionCollection)) throw new Error('Only [fn] type "PropertyFunctionCollection" can be added');
                    __fn = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인드속성의 매핑한다.
             * @member {PropertyCollection} _W.Meta.Bind.BindModel#mapping
             */
            Object.defineProperty(this, 'mapping', 
            {
                get: function() { return __mapping; },
                set: function(newValue) { 
                    if (!(newValue instanceof PropertyCollection)) throw new Error('Only [mapping] type "PropertyCollection" can be added');
                    __mapping = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 타입을 설정한다.
             * @member {Item} _W.Meta.Bind.BindModel#itemType
             */
            Object.defineProperty(this, 'itemType', 
            {
                get: function() { return __itemType; },
                set: function(newValue) { 
                    if (!(new newValue() instanceof Item)) throw new Error('Only [itemType] type "Item" can be added');
                    __itemType = newValue;
                    this._baseEntity.items.itemType = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * valid 에서 실패시 콜백
             * @member {Funtion} _W.Meta.Bind.BindModel#cbFail
             */
            Object.defineProperty(this, 'cbFail', 
            {
                get: function() { return __cbFail; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbFail] type "Function" can be added');
                    __cbFail = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * valid 에서 오류발생시 콜백
             * @member {Funtion} _W.Meta.Bind.BindModel#cbError
             */
            Object.defineProperty(this, 'cbError', 
            {
                get: function() { return __cbError; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbError] type "Function" can be added');
                    __cbError = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 검사(valid)시 기본 콜백 (cbValid 콜백함수가 없을 경우)
             * @member {Funtion} _W.Meta.Bind.BindModel#cbBaseValid
             */
            Object.defineProperty(this, 'cbBaseValid', 
            {
                get: function() { return __cbBaseValid; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbBaseValid] type "Function" can be added');
                    __cbBaseValid = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인드(valid)시 기본 콜백 (cbBind 콜백함수가 없을 경우)
             * @member {Funtion} _W.Meta.Bind.BindModel#cbBaseBind
             */
            Object.defineProperty(this, 'cbBaseBind', 
            {
                get: function() { return __cbBaseBind; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbBaseBind] type "Function" can be added');
                    __cbBaseBind = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 바인드 결과 수신 기본 콜백 (cbResult 콜백함수가 없을 경우)
             * @member {Funtion} _W.Meta.Bind.BindModel#cbBaseResult
             */
            Object.defineProperty(this, 'cbBaseResult', 
            {
                get: function() { return __cbBaseResult; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbBaseResult] type "Function" can be added');
                    __cbBaseResult = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 출력 기본 콜백 (cbOutput 콜백함수가 없을 경우)
             * @member {Funtion} _W.Meta.Bind.BindModel#cbBaseOutput
             */
            Object.defineProperty(this, 'cbBaseOutput', 
            {
                get: function() { return __cbBaseOutput; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbBaseOutput] type "Function" can be added');
                    __cbBaseOutput = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 실행완료시 기본 콜백 (cbEnd 콜백함수가 없을 경우)
             * @member {Funtion} _W.Meta.Bind.BindModel#cbBaseEnd
             */
            Object.defineProperty(this, 'cbBaseEnd', 
            {
                get: function() { return __cbBaseEnd; },
                set: function(newValue) { 
                    if (typeof newValue !== 'function') throw new Error('Only [cbBaseEnd] type "Function" can be added');
                    __cbBaseEnd = newValue;
                },
                configurable: true,
                enumerable: true
            });


            // 예약어 등록
            this._symbol = this._symbol.concat(['__preRegister', '__preCheck', '__preReady']);
            this._symbol = this._symbol.concat(['prop', 'mode', 'mapping']);
            this._symbol = this._symbol.concat(['itemType', 'cbFail', 'cbError']);
            this._symbol = this._symbol.concat(['cbBaseResult', 'cbBaseValid', 'cbBaseBind', 'cbBaseOutput', 'cbBaseEnd']);
            this._symbol = this._symbol.concat(['getTypes', 'init', 'preRegister', 'preCheck', 'preReady', 'addEntity']);
            this._symbol = this._symbol.concat(['add', 'addItem', 'loadProp', 'setMapping', 'preReady', 'addEntity']);
            this._symbol = this._symbol.concat(['addCommand', 'setService']);
            this._symbol = this._symbol.concat(['service', 'bindModel', 'command', 'fn']);
        }
        util.inherits(BindModel, _super);

        /** 
         * 상속 클래스에서 오버라이딩 필요!! 
         * @override 
         */
        BindModel.prototype.getTypes  = function() {
                    
            var type = ['BindModel'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /** 
         * 초기화  
         * 내부적으로 preRegister() >>  preCheck() >> preRedy() 실행한다.
         */
        BindModel.prototype.init = function() {
            if (global.isLog) console.log('[BindModel] init()');
            
            try {

                this.preRegister.call(this, this);
                if (this.preCheck.call(this, this)) {
                    this.preReady.call(this, this)
                }

            } catch (err) {
                var _err = {
                    name: err.name || 'throw',
                    message: err.message || err,
                    target: err.target || '',
                    stack: err.stack || '',
                };
                this.cbError('Err:init() message:'+ _err.message);
                if (global.isLog) {
                    console.error('NAME : '+ _err.name);
                    console.error('MESSAGE : '+ _err.message);
                    console.error('TARGET : '+ JSON.stringify(_err.target));
                    console.error('STACK : '+ _err.stack);
                }
                if (global.isThrow) throw _err;       // 에러 던지기
            } 
        };

        /**
         * 전처리 등록
         * @param {BindModel} p_bindModel 
         */
        BindModel.prototype.preRegister = function(p_bindModel) {
            return this.__preRegister.call(this, p_bindModel);
        };

        /**
         * 전처리 검사
         * @param {BindModel} p_bindModel 
         */
        BindModel.prototype.preCheck = function(p_bindModel) {
            return this.__preCheck.call(this, p_bindModel);
        };
        
        /**
         * 전처리 준비
         * @param {BindModel} p_bindModel 
         */
        BindModel.prototype.preReady = function(p_bindModel) {
            return this.__preReady.call(this, p_bindModel);
        };
        
        /**
         * 사용할 엔티티를 추가한다. (확장시 사용)
         * @param {String} p_name 
         * @returns {*}
         */
        BindModel.prototype.addEntity = function(p_name) {

            var entity;

            // 유효성 검사
            if (typeof p_name !== 'string') throw new Error('Only [p_name] type "string" can be added');
            
            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(' [' + p_name + '] is a Symbol word');   
            }            

            // 이름 중복 검사
            if (typeof this[p_name] !== 'undefined') throw new Error('에러!! 이름 중복 : ' + p_name);

            entity = new EntityTable(p_name);
            entity.items.itemType = this.itemType;    // 아이템타입 설정
            
            this[p_name] = entity;
            
            return entity;
        }

        /**
         * 아이템을 추가하고 명령과 매핑한다.
         * @param {Item} p_item 등록할 아이템
         * @param {?Array<String>} p_cmds <선택> 추가할 아이템 명령
         * @param {?(Array<String> | String)} p_views <선택> 추가할 뷰 엔티티
         */
        BindModel.prototype.add = function(p_item, p_cmds, p_views) {

            var cmds = [];
            var property = [];      // 속성

            // 1.유효성 검사
            if (!(p_item instanceof Item)) {
                throw new Error('Only [Item] type "Item" can be added');
            }
            if (typeof p_cmds !== 'undefined' && p_cmds !== null && (!(Array.isArray(p_cmds) || typeof p_cmds === 'string'))) {
                throw new Error('Only [a_cmd] type "Array | string" can be added');
            }
            
            // 2.초기화 설정
            if (Array.isArray(p_cmds)) cmds = p_cmds;
            else if (typeof p_cmds === 'string' && p_cmds.length > 0) cmds.push(p_cmds);
            
            // 3.설정 대상 가져오기
            if (cmds.length > 0) {
                for (var i = 0; i< cmds.length; i++) {
                    
                    if (typeof cmds[i] !== 'string') throw new Error('Only [String] type instances can be added');
                    
                    if (this[cmds[i]]) {
                        property.push(cmds[i]);
                    } else {
                        console.warn('Warning!! Param p_cmds 에 [' + cmds[i] + ']가 없습니다. ');
                    }
                }
            } else {
                // public ItemCollection 프로퍼티 검사
                for (var prop in this) {
                    if (this[prop] instanceof MetaObject && this[prop].instanceOf('BindCommand') && prop.substr(0, 1) !== '_') {
                        property.push(prop.toString());
                    }
                }
            }
            // 4.설정(등록) OR item 등록
            if (typeof p_cmds === 'undefined') {
                this._baseEntity.items.add(p_item); // 기본(_baseEntity)엔티티만 등록
            } else {
                for (var i = 0; i < property.length; i++) {
                    this[property[i]].add(p_item, p_views);
                }
            }
        };

        /**
         * p_name으로 아이템을 p_views(String | String)에 다중 등록한다.
         * @param {String} p_name
         * @param {Object | String | Number | Boolean} p_obj 
         * @param {?(Array<String> | String)} p_views <선택> 추가할 뷰 엔티티
         */
        BindModel.prototype.addItem = function(p_name, p_obj, p_cmds, p_views) {

            var item;
            var property = {};

            // 유효성 검사
            if (typeof p_name !== 'string') {
                throw new Error('Only [p_name] type "string" can be added');
            }

            if (typeof p_obj === 'object') {
                property = p_obj;
            } else {
                property = { value: p_obj };
            }
            
            item = new this.itemType(p_name, null, property);

            this.add(item, p_cmds, p_views);
        };

        // BindModel.prototype.addItem = function(p_name, p_value, p_cmds, p_entities) {

        //     var item;
        //     var property = {};

        //     // 유효성 검사
        //     if (typeof p_name !== 'string') {
        //         throw new Error('Only [p_name] type "string" can be added');
        //     }

        //     item = this._baseEntity.items.addValue(p_name, p_value);

        //     this.add(item, p_cmds, p_entities);
        // };



        /**
         * 속성을 baseEntiey 또는 지정 Entity에  등록(로딩)한다.
         * @param {?(String | Array<String>)} p_prop 
         * @param {?String} p_bEntity 기본엔티티 
         */
        BindModel.prototype.loadProp = function(p_prop, p_bEntity) {

            var prop = [];
            var entity;
            var propName;

            // 1.초기화
            if (Array.isArray(p_prop)) prop = prop.concat(p_prop);      // Array의 경우
            else if (typeof p_prop === 'string') prop.push(p_prop);       // String의 경우
            else prop = this.prop.properties;                             // 없을 경우 (전체 가져옴)

            // 2.유효성 검사
            if (typeof p_prop !== 'undefined' && (!Array.isArray(p_prop) || typeof p_prop === 'string')) {
                throw new Error('Only [p_entities] type "Array | string" can be added');
            }
            if (typeof p_bEntity !== 'undefined' && typeof p_bEntity !== 'string') {
                throw new Error('Only [p_bEntity] type "string" can be added');
            }
            if (typeof p_bEntity !== 'undefined' && typeof this[p_bEntity] === 'undefined') {
                throw new Error(' BindModel에 ['+ p_bEntity +']의 Entity가 없습니다. ');
            }

            entity = this[p_bEntity] || this._baseEntity;

            // 3.속성정보 등록
            for(var i = 0; prop.length > i; i++) {
                propName = prop[i];
                if (typeof propName === 'string' && typeof this.prop[propName] !== 'undefined'
                    && propName.indexOf('__') < 0 ) {  // __이름으로 제외 조건 추가
                    if(['number', 'string', 'boolean'].indexOf(typeof this.prop[propName]) > -1) {
                        entity.items.addValue(propName, this.prop[propName]);
                    } else if (this.prop[propName]  !== null && typeof this.prop[propName] === 'object'){
                        entity.items.add(new this.itemType(propName, entity, this.prop[propName]))
                    }
                }
            }

            // 4.매핑
            this.setMapping(this.mapping, p_bEntity);
        };

        /**
         * 아이템을 매핑한다.
         * @param {ProperyCollection | Object} p_mapping Item 에 매핑할 객체 또는 컬렉션
         * @param {?String} p_bEntity 대상 기본 엔티티 
         */
        BindModel.prototype.setMapping = function(p_mapping, p_bEntity) {
            
            var mappingCollection;
            var entity;
            var propName;
            var item;
            

            // 1.유효성 검사
            if (!(p_mapping instanceof PropertyCollection || typeof p_mapping === 'object')) {
                throw new Error('Only [p_mapping] type "PropertyCollection | object" can be added');
            }
            if (typeof p_bEntity !== 'undefined' && typeof p_bEntity !== 'string') {
                throw new Error('Only [p_bEntity] type "string" can be added');
            }
            if (typeof p_bEntity !== 'undefined' && typeof this[p_bEntity] === 'undefined') {
                throw new Error(' BindModel에 ['+ p_bEntity +']의 Entity가 없습니다. ');
            }

            entity = this[p_bEntity] || this._baseEntity;

            // 2. 임시 매핑 컬렉션에 등록
            if (p_mapping instanceof PropertyCollection) {
                mappingCollection = p_mapping;
            } else if (typeof p_mapping === 'object') {
                mappingCollection = new PropertyCollection();
                for(var prop in p_mapping) {
                    if (p_mapping.hasOwnProperty(prop) && typeof p_mapping[prop] !== 'undefined') {
                        mappingCollection.add(prop, p_mapping[prop]);
                    }
                }
            }

            // 3. 아이템 매핑
            for(var i = 0; mappingCollection.count > i; i++) {
                propName = mappingCollection.propertyOf(i);
                item = entity.items[propName];
                if (typeof item !== 'undefined') {
                    for (var prop in mappingCollection[i]) {    // command 조회
                        if (prop === 'Array') {          // 'Array' 전체 등록 속성 추가
                            this.add(item, [], mappingCollection[i][prop]);
                        } else if (mappingCollection[i].hasOwnProperty(prop)) {
                            this.add(item, prop, mappingCollection[i][prop]);
                        }
                    }
                } else {
                    console.warn('entity에 지정된 [%s] BindCommand 가 없습니다. ');
                }
            }
        };

        /**
         * 명령 추가 (추상클래스) 상속하여 구현해야 함
         * @abstract
         * @param {String} p_name 
         * @param {?Number} p_option 
         * @param {?Entity} p_entities 
         */
        BindModel.prototype.addCommand  = function(p_name, p_option, p_entities) {

            throw new Error('[ execute() ] Abstract method definition, fail...');
        };

        /**
         * 서비스를 설정한다.
         * @param {IBindModel} p_service 서비스객체
         * @param {?Boolean} p_isLoadProp 서비스 내의 prop 를 item 으로 로딩힌다. (기본값: true)
         */
        BindModel.prototype.setService  = function(p_service, p_isLoadProp) {

            var propObject;
            var propSubObject;
            var command;

            p_isLoadProp = p_isLoadProp || true;       // 기본값

            // 유효성 검사
            if (typeof p_service !== 'object') throw new Error('Only [p_service] type "object" can be added');

            // command 등록
            if (typeof p_service['command'] !== 'undefined' && p_service['prop'] !== null) {
                propObject = p_service['command'];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== 'undefined') {

                        // 예약어 검사
                        if (this._symbol.indexOf(prop) > -1) {
                            throw new Error(' [' + prop + '] is a Symbol word');   
                        }            

                        // 중복 검사
                        if (typeof this[prop] !== 'undefined') throw new Error('에러!! command 이름 중복 : ' + prop);

                        // command 등록 및 설정
                        command = this.addCommand(prop);
                        if (typeof propObject[prop]['outputOption'] === 'number') command.outputOption = propObject[prop]['outputOption'];
                        if (typeof propObject[prop]['ajaxSetup'] === 'object')    command.ajaxSetup = propObject[prop]['ajaxSetup'];
                        if (typeof propObject[prop]['url'] === 'string')          command.url = propObject[prop]['url'];
                        if (typeof propObject[prop]['onExecute'] === 'function')  command.onExecute = propObject[prop]['onExecute'];
                        if (typeof propObject[prop]['onExecuted'] === 'function') command.onExecuted = propObject[prop]['onExecuted'];
                        if (typeof propObject[prop]['cbValid'] === 'function')    command.cbValid = propObject[prop]['cbValid'];
                        if (typeof propObject[prop]['cbBind'] === 'function')     command.cbBind = propObject[prop]['cbBind'];
                        if (typeof propObject[prop]['cbResult'] === 'function')   command.cbResult = propObject[prop]['cbResult'];
                        if (typeof propObject[prop]['cbOutput'] === 'function')   command.cbOutput = propObject[prop]['cbOutput'];
                        if (typeof propObject[prop]['cbEnd'] === 'function')      command.cbEnd = propObject[prop]['cbEnd'];
                    }
                }
            }
            
            // prop 등록
            if (typeof p_service['prop'] !== 'undefined' && p_service['prop'] !== null) {
                propObject = p_service['prop'];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== 'undefined') {
                        //__prop.add(prop, propObject[prop]);
                        // get/sett 형식의 기능 추가        REVIEW:: 확인필요 get/set 의 필요성, 중복 및 혼선의 이슈
                        if (typeof propObject[prop] === 'object' 
                            && (typeof propObject[prop].get === 'function' || typeof propObject[prop].set === 'function')) {
                            this.prop.add(prop, '', propObject[prop]);    
                        } else {
                            this.prop.add(prop, propObject[prop]);
                        }
                    }
                }
            }
            
            // fn 등록
            if (typeof p_service['fn'] !== 'undefined' && p_service['fn'] !== null) {
                propObject = p_service['fn'];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== 'undefined') {
                        this.fn.add(prop, propObject[prop]);
                    }
                }
            }

            if (typeof p_service['mapping'] !== 'undefined' && p_service['mapping'] !== null) {
                propObject = p_service['mapping'];
                for(var prop in propObject) {
                    if (propObject.hasOwnProperty(prop) && typeof propObject[prop] !== 'undefined') {
                        this.mapping.add(prop, propObject[prop]);
                    }
                }
            }

            // pre 메소드 등록
            if (typeof p_service['preRegister'] === 'function') {
                // __preRegister = p_service['preRegister'];
                this.preRegister = p_service['preRegister'];
            }
            if (typeof p_service['preCheck'] === 'function') {
                // __preCheck = p_service['preCheck'];
                this.preCheck = p_service['preCheck'];
            }
            if (typeof p_service['preReady'] === 'function') {
                // __preReady = p_service['preReady'];
                this.preReady = p_service['preReady'];
            }
            
            // fail, error 등록
            if (typeof p_service['cbFail'] === 'function') {
                this.cbFail = p_service['cbFail'];
            }
            if (typeof p_service['cbError'] === 'function') {
                this.cbError = p_service['cbError'];
            }
            
            // base 등록
            if (typeof p_service['cbBaseValid'] === 'function') {
                this.cbBaseValid = p_service['cbBaseValid'];
            }
            if (typeof p_service['cbBaseBind'] === 'function') {
                this.cbBaseBind = p_service['cbBaseBind'];
            }
            if (typeof p_service['cbBaseResult'] === 'function') {
                this.cbBaseResult = p_service['cbBaseResult'];
            }
            if (typeof p_service['cbBaseOutput'] === 'function') {
                this.cbBaseOutput = p_service['cbBaseOutput'];
            }
            if (typeof p_service['cbBaseEnd'] === 'function') {
                this.cbBaseEnd = p_service['cbBaseEnd'];
            }

            // execute 이벤트 등록
            if (typeof p_service['onExecute'] === 'function') {
                this.onExecute = p_service['onExecute'];    // 복수 등록
            }
            if (typeof p_service['onExecuted'] === 'function') {
                this.onExecuted = p_service['onExecuted'];  // 복수 등록
            }
            
            // service  등록
            if (typeof p_service['service'] === 'object') {
                this.service = p_service['service'];
            }

            // 서비스에 onwer bindModel 설정
            p_service.bindModel = this;

            // 속성(prop)을 아이템으로 로딩 ('__'시작이름 제외)
            if (p_isLoadProp === true) {
                this.loadProp();
            }
        };

        return BindModel;
    
    }(BaseBind));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = BindModel;
    } else {
        global._W.Meta.Bind.BindModel = BindModel;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Bind.BindCommandAjax
 */
(function(global) {
    
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                   = global._W || {};
    global._W.Meta              = global._W.Meta || {};
    global._W.Meta.Bind         = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommand;
    var entityView;
    var EntityView;
    var EntityViewCollection;
    var request;        // node 전용
    var sync_request;   // node 전용
    var jquery;
    var ajax;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                    = require('util');
        BindCommand             = require('./bind-command');
        entityView              = require('./entity-view');
        EntityView              = entityView.EntityView;
        EntityViewCollection    = entityView.EntityViewCollection;
        request                 = require('request');
        sync_request            = require('sync-request');
    } else {
        util                    = global._W.Common.Util;
        BindCommand             = global._W.Meta.Bind.BindCommand;
        EntityView              = global._W.Meta.Entity.EntityView;
        EntityViewCollection    = global._W.Meta.Entity.EntityViewCollection;
        jquery                  = global.jQuery || global.$;     // jquery 로딩 REVIEW:: 로딩 확인
        ajax                    = jquery.ajax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BindCommand === 'undefined') throw new Error('[BindCommand] module load fail...');
    if (typeof EntityView === 'undefined') throw new Error('[EntityView] module load fail...');
    if (typeof EntityViewCollection === 'undefined') throw new Error('[EntityViewCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var BindCommandAjax  = (function (_super) {
        
        /**
         * 바인드 명령 Ajax 
         * @constructs _W.Meta.Bind.BindCommandAjax
         * @extends _W.Meta.Bind.BindCommand
         * @param {BindModel} p_bindModel 
         * @param {Number} p_outputOption 
         * @param {Entity} p_baseEntity 
         */
        function BindCommandAjax(p_bindModel, p_outputOption, p_baseEntity) {
            _super.call(this, p_bindModel, p_baseEntity);

            var __ajaxSetup = {
                url: null,          // 요청 경로
                type: null,         // 전송 방법 : GET, POST
                dataType: null,     //
                async: null,        // [*]비동기(ture), 동기(false)
                crossDomain: null,  // 크로스 도메인
                success: null,      // 성공 콜백
                error: null,        // 실패 콜백
                complete: null      // 완료 콜백
            };
            
            /**
             * ajaxSetup 설정값 (jquery의 ajaxSetup 과 동일)
             * @member {Object} _W.Meta.Bind.BindCommandAjax#ajaxSetup 
             */
            Object.defineProperty(this, 'ajaxSetup', 
            {
                get: function() { return __ajaxSetup; },
                configurable: true,
                enumerable: true
            });
            
            /**
             * ajaxSetup.url 의 값에 설정한다.
             * @member {String} _W.Meta.Bind.BindCommandAjax#url 
             */
            Object.defineProperty(this, 'url', 
            {
                get: function() { return __ajaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === 'string')) throw new Error('Only [url] type "string" can be added');
                    __ajaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            }); 

            // outputOption 설정
            if (typeof p_outputOption === 'number') this.outputOption = p_outputOption;

            // 예약어 등록

            this._symbol = this._symbol.concat(['ajaxSetup', 'url']);
            this._symbol = this._symbol.concat(['_execValid', '_execBind', '_execSuccess', '_execError', '_ajaxAdapter']);
        }
        util.inherits(BindCommandAjax, _super);

        /** 
         * valid.items.. 검사한다.
         * @protected
         */
        BindCommandAjax.prototype._execValid = function() {
            
            var result = {};     // 오류 참조 변수
            var value = null;
            var bReturn = true;

            // 콜백 검사 (valid)
            if (typeof this.cbValid  === 'function') bReturn = this.cbValid.call(this, this.valid);
            else if (typeof this._model.cbBaseValid  === 'function') bReturn= this._model.cbBaseValid.call(this, this.valid);

            // valid 검사 결과
            if (!bReturn) {
                this._onExecuted(this);     // '실행 종료' 이벤트 발생
                return false;
            }

            // 아이템 검사
            for(var i = 0; i < this.valid.items.count; i++) {
                
                // value = this.valid.items[i].value === null ? this.valid.items[i].default : this.valid.items[i].value;
                value = this.valid.items[i].value;
                
                // 공백 && isNotNull = false    => 검사 넘어감
                // 공백 && isNotNull = true     => 오류 리턴
                // 값존재시                     => 검사 수행
                // if (value.length > 0 || this.valid.items[i].isNotNull) {
                // if (value.length > 0 || this.valid.items[i].isNotNull) {
                    if (!(this.valid.items[i].valid(value, result, 2))) {
                        this._model.cbFail(result, this.valid.items[i]);
                        this._onExecuted(this);     // '실행 종료' 이벤트 발생
                        return false;
                    }
                // }
            }
            return true;
        };

        /**
         * Ajax 바인딩 구현
         * @protected
         */
        BindCommandAjax.prototype._execBind = function() {
            
            var value;
            var item;
            var ajaxSetup = {};
            var complete = this.ajaxSetup.complete || this._model.baseAjaxSetup.complete || null;
            
            ajaxSetup.url           = this.ajaxSetup.url || this._model.baseAjaxSetup.url;
            ajaxSetup.type          = this.ajaxSetup.type || this._model.baseAjaxSetup.type || 'GET';
            ajaxSetup.dataType      = this.ajaxSetup.dataType || this._model.baseAjaxSetup.dataType || 'json';
            ajaxSetup.async         = this.ajaxSetup.async || this._model.baseAjaxSetup.async || true;
            ajaxSetup.crossDomain   = this.ajaxSetup.crossDomain || this._model.baseAjaxSetup.crossDomain || false;
            ajaxSetup.complete      = (typeof complete === 'function') ? complete.bind(this) : null;
            ajaxSetup.success       = this._execSuccess.bind(this);
            ajaxSetup.error         = this._execError.bind(this);

            for(var i = 0; i < this.bind.items.count; i++) {
                if(typeof ajaxSetup.data !== 'object') ajaxSetup.data = {};
                item = this.bind.items[i];
                value = item.value || item.default;     // 값이 없으면 기본값 설정
                
                //ajaxSetup.data[item.name] = value;
                ajaxSetup.data[item.alias] = value;     // 별칭에 설정, 없을시 기본 name
            }
            
            // 콜백 검사 (bind)
            if (typeof this.cbBind === 'function') this.cbBind.call(this, ajaxSetup, this);
            else if (typeof this._model.cbBaseBind === 'function') this._model.cbBaseBind.call(this, ajaxSetup, this);
            
            this._ajaxAdapter(ajaxSetup);       // Ajax 호출 (web | node)
        };

        /**
         * 실행 성공
         * @param {*} p_result 
         * @param {*} p_status 
         * @param {*} p_xhr 
         * @protected
         */
        BindCommandAjax.prototype._execSuccess = function(p_result, p_status, p_xhr) {
            
            var loadOption = this.outputOption === 3 ? 2  : this.outputOption;

            var result = typeof p_result === 'object' ? p_result : JSON.parse(JSON.stringify(p_result));

            // 콜백 검사 (Result)
            if (typeof this.cbResult === 'function' ) result = this.cbResult.call(this, result);
            else if (typeof this._model.cbBaseResult === 'function' ) result = this._model.cbBaseResult.call(this, result);

            // ouputOption = 1,2,3  : 출력모드의 경우
            if (this.outputOption > 0) {
                
                // 초기화 : opt = 1
                for (var i = 0; this._output.count > i; i++) {
                    if (loadOption === 1) this._output[i].clear();  // 전체 초기화 (item, rows)
                    else this._output[i].rows.clear();              // Row 초기화
                }
                
                // 결과 EntityView에 로딩
                if(typeof result['entity'] !== 'undefined' || typeof result['table'] !== 'undefined' ) {

                    this._output[0].load(result, loadOption); // this['output']
                
                } else if (Array.isArray(result['entities'])) {

                    for(var i = 0; result['entities'].length > i && typeof this._output[i] !== 'undefined'; i++) {
                        this._output[i].clear();
                        this._output[i].load(result['entities'][i], loadOption);
                    }
                }
                
                // 존재하는 아이템 중에 지정된 값으로 설정
                if (this.outputOption === 3) {
                    for (var i = 0; this._output.count > i; i++) {
                        if (this._output[i].items.count > 0 && this._output[i].rows.count > 0)
                        this._output[i].setValue(this._output[i].rows[0]);
                    }
                }

                // 콜백 검사 (Output)
                if (typeof this.cbOutput === 'function' ) this.cbOutput.call(this, result);
                else if (typeof this._model.cbBaseOutput === 'function' ) this._model.cbBaseOutput.call(this, result);
            }

            // 콜백 검사 (End)
            if (typeof this.cbEnd === 'function' ) this.cbEnd.call(this, result, p_status, p_xhr);
            else if (typeof this._model.cbBaseEnd === 'function') this._model.cbBaseEnd.call(this, result, p_status, p_xhr);
            
            this._onExecuted(this, result);  // '실행 종료' 이벤트 발생
        };

        /**
         * AJAX 를 기준으로 구성함 (requst는 맞춤)
         * error(xhr,status,error)
         * @param {*} p_xhr 
         * @param {*} p_status 
         * @param {*} p_error 
         * @protected
         */
        BindCommandAjax.prototype._execError = function(p_xhr, p_status, p_error) {
            
            var msg = p_xhr && p_xhr.statusText ? p_xhr.statusText : p_error;

            this._model.cbError.call(this, msg, p_status);
            this._onExecuted(this);     // '실행 종료' 이벤트 발생
        };

        /**
         * (WEB & NodeJs 의 어뎁터 패턴)
         * node 에서는 비동기만 반영함 (테스트 용도) =>> 필요시 개발함
         * @param {Object} p_ajaxSetup 
         * @protected
         */
        BindCommandAjax.prototype._ajaxAdapter = function(p_ajaxSetup) {
            
            var option = {};
            var result;
            var _this = this;

            // request VS Jquery.ajax 와 콜백 어뎁터 연결 함수
            function callback(error, response, body) {

                var status = response ? response.statusCode : null;
                var msg    = response ? response.statusMessage : '';

                // 콜백
                try {

                    // (xhr,status) : 완료콜백
                    if (p_ajaxSetup && typeof p_ajaxSetup.complete === 'function') p_ajaxSetup.complete(response, status);

                    if (error || response.statusCode !== 200) {    // 실패시
                        msg = error ? (msg + ' ' + error) : msg;
                        // (xhr,status,error)
                        p_ajaxSetup.error(response, status, msg);
                    } else {                                        // 성공시
                        if (p_ajaxSetup.dataType === 'json') result = JSON.parse(body);
                        result = result || body;
                        // (result,status,xhr)
                        p_ajaxSetup.success(result, error, response);
                    }                

                } catch (err) {
                    var _err = {
                        name: err.name || 'throw',
                        message: err.message || err,
                        target: err.target || '',
                        stack: err.stack || '',
                    };
                    _this._model.cbError('Err:callback(cmd='+ _this.name +') message:'+ _err.message);
                    _this._onExecuted(_this);     // '실행 종료' 이벤트 발생
                    if (global.isLog) {
                        console.error('NAME : '+ _err.name);
                        console.error('MESSAGE : '+ _err.message);
                        console.error('TARGET : '+ JSON.stringify(_err.target));
                        console.error('STACK : '+ _err.stack);
                    }
                    if (global.isThrow) throw _err;       // 에러 던지기
                }             
            }

            if (ajax && typeof ajax === 'function') {

                // REVIEW:: Jquery.ajax 사용
                ajax(p_ajaxSetup);

            } else {

                option.uri = p_ajaxSetup.url;

                if (p_ajaxSetup.async === false) request = sync_request;    // 동기화 처리

                if (p_ajaxSetup.type === 'GET') {
                    option.method = 'POST';
                    option.qs = p_ajaxSetup.data;
                    request.get(option, callback);
                } else if (p_ajaxSetup.type === 'POST') {
                    option.method = 'POST';
                    option.form = p_ajaxSetup.data;
                    request.post(option, callback);
                } else {
                    // 기타 :: 결과는 확인 안함
                    request(option, callback);
                }
            }
        };

        /**
         * 상속 클래스에서 오버라이딩 필요!! 
         * @override 
         */
        BindCommandAjax.prototype.getTypes  = function() {
                    
            var type = ['BindCommandAjax'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 실행 
         */
        BindCommandAjax.prototype.execute = function() {
            if (global.isLog) console.log('[BindCommandAjax] %s.execute()', this.name);

            try {

                this._onExecute(this);  // '실행 시작' 이벤트 발생
                if (this._execValid()) this._execBind();
            
            } catch (err) {
                var _err = {
                    name: err.name || 'throw',
                    message: err.message || err,
                    target: err.target || '',
                    stack: err.stack || '',
                };
                this._model.cbError('Err:execue(cmd='+ _this.name +') message:'+ _err.message);
                this._onExecuted(this);     // '실행 종료' 이벤트 발생
                if (global.isLog) {
                    console.error('NAME : '+ _err.name);
                    console.error('MESSAGE : '+ _err.message);
                    console.error('TARGET : '+ JSON.stringify(_err.target));
                    console.error('STACK : '+ _err.stack);
                }
                if (global.isThrow) throw _err;       // 에러 던지기
            }            
        };

        return BindCommandAjax;
    
    }(BindCommand));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = BindCommandAjax;
    } else {
        global._W.Meta.Bind.BindCommandAjax = BindCommandAjax;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
/**
 * namespace _W.Meta.Bind.BindModelAjax
 */ 
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var CustomError;
    var BindModel;
    var PropertyCollection;
    var IBindModel;
    var ItemDOM;
    var BindCommandAjax;
    var EntityView;

    if (typeof module === 'object' && typeof module.exports === 'object') {    
        util                    = require('./utils');
        CustomError             = require('./error-custom');
        BindModel               = require('./bind-model');
        PropertyCollection      = require('./collection-property');
        IBindModel              = require('./i-bind-model');        
        ItemDOM                 = require('./entity-item-dom');
        BindCommandAjax         = require('./bind-command-ajax');
        EntityView              = require('./entity-view').EntityView;

    } else {
        util                    = global._W.Common.Util;
        CustomError             = global._W.Common.CustomError;
        BindModel               = global._W.Meta.Bind.BindModel;
        PropertyCollection      = global._W.Collection.PropertyCollection;
        IBindModel              = global._W.Interface.IBindModel;        
        ItemDOM                 = global._W.Meta.Entity.ItemDOM;
        BindCommandAjax         = global._W.Meta.Bind.BindCommandAjax;
        EntityView              = global._W.Meta.Entity.EntityView;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof CustomError === 'undefined') throw new Error('[CustomError] module load fail...');
    if (typeof BindModel === 'undefined') throw new Error('[BindModel] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof IBindModel === 'undefined') throw new Error('[IBindModel] module load fail...');
    if (typeof ItemDOM === 'undefined') throw new Error('[ItemDOM] module load fail...');
    if (typeof BindCommandAjax === 'undefined') throw new Error('[BindCommandAjax] module load fail...');
    if (typeof EntityView === 'undefined') throw new Error('[EntityView] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var BindModelAjax  = (function (_super) {
        /**
         * 바인드모델 Ajax
         * - aaa
         * - bbb
         * @constructs _W.Meta.Bind.BindModelAjax
         * @extends _W.Meta.Bind.BindModel
         * @param {IBindModel} p_service 
         * @param {Object} p_service.baseAjaxSetup Ajax 설정 
         * @param {String} p_service.baseAjaxSetup.url Ajax 설정 
         * @param {String} p_service.baseAjaxSetup.type GET, POST
         * @param {String} p_service.baseUrl 바인딩 경로 
         * @param {Object} p_service.command 명령들
         * @param {Object} p_service.command.name 사용자명령어
         * @param {Function} p_service.command.name.onExecute 실행전 이벤트
         * @param {Object}  p_service.command.name.onExecuted 실행후 이벤트 
         * @example
         * // returns 2
         * globalNS.method1(5, 10);
         * @example
         * // returns 3
         * globalNS.method(5, 15); 
         * 어떤 샘플이 들어....
         * 
         * @summary
         * - aaa : ddd
         * - a-1
         * - ddd
         * - b-1
         * - ccc
         * @desc
         *  바인딩 모델 의 기본 설정
         * - 무엇을 하는가.
         * - 뭐든지 하지요.
         * - 할것
         * - 또할것
         * # ㅁㅁㅁ
         * - ㅇㅇㅇㅇㅇ
         * - ㅉ
         * # ㅉㅈ
         * ㅇㅇㅇㅇㅇ
         * ** 굵게(강조)**
         * ~~취소선~~
         * - aaa
         *  - bbbb
         * + 1111
         *  + 2222
         * 
         * ```javascript
         * var s = 'JavaScript syntax highlighting';
         * alert(s);
         * ``
         * @todo 할것 목록
         * 
         * @tutorial tutorial-1  튜토리얼이 들어있음
         */
        function BindModelAjax(p_service) {
            _super.call(this);

            var __baseAjaxSetup = {
                url: '',
                type: 'GET'
            };
            
            this._baseEntity                = this.addEntity('first');   // Entity 추가 및 baseEntity 설정
            this.itemType                   = ItemDOM;                   // 기본 아이템 타입 변경
            this._baseEntity.items.itemType = this.itemType;            // base 엔티티 타입 변경
            this.items                      = this._baseEntity.items;   // 참조 추가

            /**
             * 바인딩 기본 ajaxSetup 을 설정한다.
             * @member {Object} _W.Meta.Bind.BindModelAjax#baseAjaxSetup
             */
            Object.defineProperty(this, 'baseAjaxSetup', 
            {
                get: function() { return __baseAjaxSetup; },
                configurable: true,
                enumerable: true
            });

            /**
             * 바인딩 기본 ajaxSetup.url 을 설정한다.
             * @member {String} _W.Meta.Bind.BindModelAjax#baseUrl
             */
            Object.defineProperty(this, 'baseUrl', 
            {
                get: function() { return __baseAjaxSetup.url; },
                set: function(newValue) { 
                    if (!(typeof newValue === 'string')) throw new Error('Only [baseUrl] type "string" can be added');
                    __baseAjaxSetup.url = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // 객체 등록
            if (typeof p_service === 'object') {
                // 서비스 설정
                this.setService(p_service);
            }

            // 예약어 등록
            this._symbol = this._symbol.concat(['items', 'baseAjaxSetup', 'baseUrl']);
            this._symbol = this._symbol.concat(['getTypes', 'checkSelector', 'setService']);
        }
        util.inherits(BindModelAjax, _super);
    
        /**
         * 상속 클래스에서 오버라이딩 필요!! *
         * @override
         */
        BindModelAjax.prototype.getTypes  = function() {
                    
            var type = ['BindModelAjax'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * 셀렉터 검사
         * @param {?ItemCollecton} p_collection 
         */
        BindModelAjax.prototype.checkSelector  = function(p_collection) {
            
            var collection = p_collection || this.prop;
            var failSelector = null;
            var selectors = [];
            var selector = '';

            // 유효성 검사
            if (!(collection instanceof PropertyCollection)) throw new Error('Only [p_collection] type "PropertyCollection" can be added');

            // 검사
            // for (var i = 0; collection.count > i; i++) {
            //     if (typeof collection[i].selector !== 'undefined') {
            //         selectors = [];
            //         if (Array.isArray(collection[i].selector)) 
            //             selectors = collection[i].selector;
            //         else   
            //             selectors.push(collection[i].selector)
                    
            //         for (var ii = 0; ii < selectors.length; ii++) {
            //             selector  = typeof selectors[ii] === 'function' ? selectors[ii].call(this) : selectors[ii];

            //             if (typeof selector === 'string' && selector.length > 0) failSelector = util.validSelector(selector);
                        
            //             if (failSelector !== null) {
            //                 console.warn('selector 검사 실패 : %s ', failSelector);
            //                 return false;
            //             }
            //         }
            //     }
            // }            
            for (var i = 0; collection.count > i; i++) {
                if (typeof collection[i].selector !== 'undefined') {
                        selector = collection[i].selector.key;

                        if (typeof selector === 'string' && selector.length > 0) failSelector = util.validSelector(selector, true);
                        
                        if (failSelector !== null) {
                            console.warn('selector 검사 실패 : %s ', failSelector);
                            return false;
                        }
                }
            }
            
            return true;
        };


        /**
         * 셀렉터 검사 결과 얻기
         * @param {?(String | Arrary<String>)} p_cmdNames command 명칭들
         * @param {?Boolean} p_isLog 기본값 true
         * @param {?ItemCollecton} p_collection 지정된 컬렉션에서 검사한다.
         * @return {Arrary<Selector>}
         * @example
         * var bm = new BindModelAjax();
         * ...
         * bm.validSelector();           // 전체 셀렉터 목록 리턴
         * bm.validSelector([], true);   // 전체 셀렉터 목록 리턴 및 로그 출력
         * bm.validSelector('list');     // 지정한 단일 command 셀렉터 검사
         * bm.validSelector(['list', 'read'], true);         // 지정한 복수 command 셀렉터 검사
         * bm.validSelector([], true, secondCollection);     // 검사 대상 컬렉션 변경 (this.items)
         * 
         */
         BindModelAjax.prototype.validSelector  = function(p_cmdNames, p_isLog, p_collection) {
            
            p_isLog = typeof p_isLog === 'undefined' || true;

            var collection = p_collection || this.items;    // TODO: import 및 검사 추가
            var obj;
            var selector;
            var selectors = [];
            var cmds = [];
            var cmdName = '';
            var bindCommand = null;
            var items = [];
            var item;

            // 초기화
            if (Array.isArray(p_cmdNames)) cmds = p_cmdNames;
            else if (typeof p_cmdNames === 'string') cmds.push(p_cmdNames);
            
            
            // command의 valid, bind, output item 검색하여 중복 제거후 삽입
            for (var i = 0; cmds.length > i; i++) {
                
                cmdName = cmds[i];              // cmd 이름 얻기
                bindCommand = this[cmdName];    // 대상 bindCommand 설정

                if (typeof bindCommand === 'undefined') {
                    console.warn('[%s] bindCommand가 없습니다.', cmdName);
                } else {
                    
                    for (var prop in bindCommand) {
                        if (bindCommand[prop] instanceof EntityView && 
                                prop.substr(0, 1) !== '_' &&                        // 이름 제외 조건
                                (['valid', 'bind', 'etc'].indexOf(prop) > -1 ||     // 기본 Entity
                                1 < bindCommand.outputOption )) {                   // 확장 Entity(output)은 옵션 검사
                            
                            for (var ii = 0; bindCommand[prop].items.count > ii; ii++) {

                                item = bindCommand[prop].items[ii];
                                if (items.indexOf(item) < 0) { // 없으면 추가
                                    items.push(item);
                                }
                            }
                        }
                    }

                    // // cmds.valid
                    // for (var ii = 0; bindCommand.valid.items.count > ii; ii++) {
                    //     item = bindCommand.valid.items[ii];
                    //     if (items.indexOf(item) < 0) { // 없으면 추가
                    //         items.push(item);
                    //     }
                    // }
                    // // cmds.bind
                    // for (var ii = 0; bindCommand.bind.items.count > ii; ii++) {
                    //     item = bindCommand.bind.items[ii];
                    //     if (items.indexOf(item) < 0) { // 없으면 추가
                    //         items.push(item);
                    //     }
                    // }
                    // // cmds.etc
                    // for (var ii = 0; bindCommand.etc.items.count > ii; ii++) {
                    //     item = bindCommand.etc.items[ii];
                    //     if (items.indexOf(item) < 0) { // 없으면 추가
                    //         items.push(item);
                    //     }
                    // }
                    // //TODO: 전체 output[] 에서 비교해야함
                    // // cmds.output  
                    // for (var ii = 0; bindCommand.output.items.count > ii; ii++) {
                    //     item = bindCommand.output.items[ii];
                    //     if (items.indexOf(item) < 0) { // 없으면 추가
                    //         items.push(item);
                    //     }
                    // }
                }
            }

            for (var i = 0; collection.count > i; i++) {
                
                if (cmds.length > 0) {
                    selector = items.indexOf(collection[i]) > -1 ? collection[i].selector : null;   // 비교
                } else {
                    selector = collection[i].selector;  // 전체 포함
                }
                
                if (selector !== null && typeof selector === 'object' && typeof selector.key === 'string' && selector.key.length > 0) {
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
                        console.log('item: %s, key: %s, type: %s ', selectors[i].item, selectors[i].key, selectors[i].type);
                    } else {
                        console.warn('item: %s, key: %s, type: %s [Fail]', selectors[i].item, selectors[i].key, selectors[i].type);
                    }
                }
            }
            
            return selectors;
        };        

        /**
         * 명령 추가
         * @param {*} p_name 
         * @param {*} p_option 
         * @param {*} p_bEntity 기본엔테티
         */
        BindModelAjax.prototype.addCommand  = function(p_name, p_option, p_bEntity) {
            
            var bindCommand;
            
            // 유효성 검사
            if (typeof p_name !== 'string') {
                throw new Error('Only [p_name] type "string" can be added');
            }

            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(' [' + p_name + '] is a Symbol word');   
            }            
            
            // 중복 검사
            if (typeof this[p_name] !== 'undefined') throw new Error('에러!! 이름 중복 : ' + p_name);

            // 생성 및 이름 설정
            bindCommand = new BindCommandAjax(this, p_option, p_bEntity);
            bindCommand.name = p_name;  // 인스턴스 이름

            this[p_name] = bindCommand;

            return this[p_name];
        };


        /**
         * 서비스를 설정한다.
         * @param {IBindModel} p_service 서비스객체
         * @param {?Boolean} p_isLoadProp 서비스 내의 prop 를 item 으로 로딩힌다. (기본값: true)
         */
         BindModelAjax.prototype.setService  = function(p_service, p_isLoadProp) {

            try {  

                _super.prototype.setService.call(this, p_service, p_isLoadProp);    // 부모 호출

                // base
                if (typeof p_service['baseUrl'] === 'string') {
                    this.baseUrl = p_service['baseUrl'];
                }
                if (typeof p_service['baseAjaxSetup'] === 'object') {
                    this.baseAjaxSetup = p_service['baseAjaxSetup'];
                }

                for (var prop in p_service) {
                    if (p_service.hasOwnProperty(prop) && this._symbol.indexOf(prop) < 0) {
                        // 사용자 객체 설정
                        console.log(prop);
                        this[prop] = p_service[prop];
                    }
                }

            } catch (err) {
                var _err = {
                    name: err.name || 'throw',
                    message: err.message || err,
                    target: err.target || '',
                    stack: err.stack || '',
                };
                this.cbError('Err:setService() message:'+ _err.message);
                if (global.isLog) {
                    console.error('NAME : '+ _err.name);
                    console.error('MESSAGE : '+ _err.message);
                    console.error('TARGET : '+ JSON.stringify(_err.target));
                    console.error('STACK : '+ _err.stack);
                }
                if (global.isThrow) throw _err;       // 에러 던지기
            }               
        };

        return BindModelAjax;
    
    }(BindModel));
    
    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = BindModelAjax;
    } else {
        global._W.Meta.Bind.BindModelAjax = BindModelAjax;
        global._W.BindModelAjax = BindModelAjax;        // 힌트
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));