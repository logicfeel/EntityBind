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