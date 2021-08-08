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