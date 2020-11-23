/**
 * @namespace _W.Collection.ArrayCollection
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Collection    = global._W.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BaseCollection;

    if (typeof module === "object" && typeof module.exports === "object") {     
        util                = require("./utils");
        BaseCollection      = require("./collection-base");
    } else {
        util                = global._W.Common.Util;
        BaseCollection      = global._W.Collection.BaseCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseCollection === "undefined") throw new Error("[BaseCollection] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var ArrayCollection  = (function (_super) {
        /**
         * @class 배열타입 컬렉션 클래스
         */
        function ArrayCollection(p_onwer) {
            _super.call(this, p_onwer); 
        }
        util.inherits(ArrayCollection, _super);     // 상속(대상, 부모)    

        /**
         * @method 배열속성 삭제 (내부처리)
         * @param {*} p_idx 인덱스 번호
         */
        ArrayCollection.prototype.__remove = function(p_idx) {
            // delete this[p_idx];                      // 내부 idx 삭제
            // delete this._element[p_idx];              // 내부 참조 삭제
            
            // [idx] 포인트 이동
            var count = this._element.length - 1;
            
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
         * @method 배열속성 속성값 설정
         * @param {*} p_value [필수] 속성값
         * @returns {*} 입력 속성 참조값
         */
        ArrayCollection.prototype.add = function(p_value) {
        
            var index   = -1;

            this._onChanging();                     // 이벤트 발생 : 변경전

            if (typeof p_value === "undefined") throw new Error("p_value param request fail...");
        
            this._element.push(p_value);
            index = (this._element.length === 1) ? 0 : this._element.length  - 1;
            Object.defineProperty(this, [index], this._getPropDescriptor(index));

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return [index];
        };

        /**
         * @method 배열속성 삭제
         * @param {element} p_elem 속성명
         * @returns {Number} 삭제한 인덱스
         */
        ArrayCollection.prototype.remove = function(p_elem) {
            
            var idx;
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (this.contains(p_elem)) {
                idx = this.indexOf(p_elem);
                this.__remove(idx);
            }
            
            this._onRemove(idx);                    // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후

            return idx;
        };
        
        /**
         * @method 배열속성 삭제
         * @param {*} p_idx 인덱스
         */
        ArrayCollection.prototype.removeAt = function(p_idx) {

            var obj = this._element[p_idx];
            
            this._onChanging();                     // 이벤트 발생 : 변경전
            
            if (typeof obj !== "undefined") this.__remove(p_idx);

            this._onRemove();                       // 이벤트 발생 : 삭제
            this._onChanged();                      // 이벤트 발생 : 변경후
        };
        
        /**
         * @method 배열속성 전체삭제
         */
        ArrayCollection.prototype.clear = function() {
            
            var obj;
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            for (var i = 0; i < this._element.length; i++) {
                // obj = this.indexOf(this[i]);
                // if (typeof obj !== "undefined") this.__remove(i);
                delete this[i];
            }

            this._element = [];
        
            this._onClear();                        // 이벤트 발생 : 전체삭제
            this._onChanged();                      // 이벤트 발생 : 변경후            
        };
        
        /**
         * @method 배열속성 여부 
         * @param {Object} p_elem 속성 객체
         * @returns {Boolean}
         */
        ArrayCollection.prototype.contains = function(p_elem) {
            return this._element.indexOf(p_elem) > -1;
        };

        /**
         * @method 배열속성 인덱스 찾기
         * @param {Object} p_elem 속성 객체
         * @returns {Number}
         */
        ArrayCollection.prototype.indexOf = function(p_elem) {
            return this._element.indexOf(p_elem);
        };

        return ArrayCollection;

    }(BaseCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = ArrayCollection;
    } else {
        global._W.Collection.ArrayCollection = ArrayCollection;
    }

}(this));