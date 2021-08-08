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