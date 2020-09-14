/**
 * 설명
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 의존 모듈 선언
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
    } else {
    }

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    var Meta  = (function () {
        /**
         * @description 메타 최상위 클래스 (실체)
         */
        function Meta() {
            this.__GUID = this._newGUID();
        }
    
        /**
         * @description GUID 생성
         */
        Meta.prototype._newGUID  = function() {
            function _p8(s) {  
                var p = (Math.random().toString(16)+"000000000").substr(2,8);  
                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
             }  
             return _p8() + _p8(true) + _p8(true) + _p8();  
        };

        /**
         * @description GUID 얻기
         */
        Meta.prototype.getGUID  = function() {
            return this.__GUID;
        };

        /**
         * @description 객체 얻기 : 추상메소드
         */
        Meta.prototype.getObject  = function() {
            throw new Error("[ getObject() ] Abstract method definition, fail...");            
        };

        
    
        return Meta;
    }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = Meta;
    } else {
        global._W.Meta = Meta;
    }

}(this));