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