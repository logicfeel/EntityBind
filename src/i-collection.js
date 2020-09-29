/**
 * _W.Interface.IObject
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
            throw new Error("[ add() ] Abstract method definition, fail...");
        };

        ICollection.prototype.remove  = function() {
            throw new Error("[ remove() ] Abstract method definition, fail...");
        };

        ICollection.prototype.removeAt  = function() {
            throw new Error("[ removeAt() ] Abstract method definition, fail...");
        };

        ICollection.prototype.clear  = function() {
            throw new Error("[ clear() ] Abstract method definition, fail...");
        };

        ICollection.prototype.contains  = function() {
            throw new Error("[ contains() ] Abstract method definition, fail...");
        };

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