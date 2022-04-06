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

        /***
         * 객체의 타입 비교
         *  - 원본객체에 null 은 어떤겍체든 허용한다.
         * @param org 원본 객체
         * @param tar 비교 객체
         */
        function equalType(org, tar){
                    
            var typeName = ""

            for (var key in org) {
                if (org.hasOwnProperty(key)){
                    typeName = (typeof org[key] === 'function') ? 'Method' : 'Property';
                    
                    if (!(key in tar)) {
                        console.warn('Warning!! 대상 없음 ' + key + ' :: (' + typeName + ') ');
                        return false;
                    }
                    if (typeof org[key] === 'object' && org[key] !== null) {
                        if (tar[key] === null) {
                            console.warn('Warning!! null 타입. ' + key + ' :: (' + typeName + ') ');
                            return false;                    
                        }
                        if (equalType(org[key], tar[key]) === false) return false;
                    }
                    if (org[key] !== null && !(typeof org[key] === typeof tar[key])) {  /** 원본 null 비교 안함 */
                        console.warn('Warning!! 타입 다름. ' + key + ' :: (' + typeName + ') ');
                        return false;
                    }
                }
            }
            return true;
        }

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

            var typeName;
            var obj;    
            var _interface = [];

            Object.defineProperty(this, '_interface', {
                enumerable: false,
                configurable: true,
                get: function() { 
                    return _interface;
                }
            });
            // this._interface = this._interface || [];
        
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
                // 비교 원본 인터페이스 임시 객체 생성    
                obj = new arguments[i];
        
                // 객체 타입을 비교 (값은 비교 안함)
                equalType(obj, this);

                // for(var p in obj) {
                //     typeName = (typeof obj[p] === 'function') ? 'Method' : 'Property';
                    
                //     // REVIEW:: 타입검사 추가함 22.4.5
                //     if (!(typeof obj[p] === typeof this[p])) {
                //         console.warn('Warning!! 인터페이스 구현타입과 다름. ' + arguments[i].name + ' :: (' + typeName + ') ' + p);
                //     }

                //     if (!(p in this) && !Object.prototype.hasOwnProperty(p)) {
                //         console.warn('Warning!! 인터페이스 구현 해야함. ' + arguments[i].name + ' :: (' + typeName + ') ' + p);
                //     }
                // }
            }
        };

        //==============================================================
        // 5. 모듈 내보내기 (node | web)
        // REVIEW:: jquery 에서 오류 발생으로 대체함
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