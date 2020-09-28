/**
 * _W.Interface.IObject
 */
(function(global) {
    "use strict";

    //==============================================================
    // 1. 모듈 및 네임스페이스 선언
    global._W   = global._W || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 의존성 검사

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
        }
    
        ICollection.prototype.add  = function() {
            throw new Error("에러:: 구현해야함.");
        };

        ICollection.prototype.remove  = function() {
            throw new Error("에러:: 구현해야함.");
        };

        ICollection.prototype.removeAt  = function() {
            throw new Error("에러:: 구현해야함.");
        };

        ICollection.prototype.clear  = function() {
            throw new Error("에러:: 구현해야함.");
        };

        ICollection.prototype.contains  = function() {
            throw new Error("에러:: 구현해야함.");
        };

        ICollection.prototype.indexOf  = function() {
            throw new Error("에러:: 구현해야함.");
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