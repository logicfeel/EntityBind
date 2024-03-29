


/**
 * Object : 폴리필
 * namespace Object.prototype.isImplementOf [protected] 구현 여부
 * namespace Object.prototype._implements 인터페이스(클래스 포함) 등록 *다중상속*
 */

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

    var aaa = 1;
    //  aaa.setType('number');
    
    aaa = 20;  // OK
    
    aaa = "SS" // Err

    var a  = String("S");
    var a2  = new String("S");

    /**
     * 순서
     * - 1차 원시타입 : number, string, boolean
     *  + this.setType('number'...)
     * - 2차 인스턴스 : function : 대상함수로 instanceof 검사
     *  + this.setType(Func)
     * - 3차 객체 : object
     * 
     * 원시 > 인스턴스 > 객체
     */
    console.log(1)

     
 }(typeof module === 'object' && typeof module.exports === 'object' ? global : window));



 