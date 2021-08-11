/**
 * namespace _W.Meta.MetaElement
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};

   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var MetaObject;
    var IMarshal;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        MetaObject          = require('./meta-object');
        IMarshal            = require('./i-marshal');

    } else {
        util                = global._W.Common.Util;
        MetaObject          = global._W.Meta.MetaObject;
        IMarshal            = global._W.Interface.IMarshal;

    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof IMarshal === 'undefined') throw new Error('[IMarshal] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaElement  = (function (_super) {
        /**
         * IMarshal 인터페이스 구현 및 ..
         * @constructs _W.Meta.MetaElement
         * @abstract
         * @extends _W.Meta.MetaObject
         * @implements {_W.Interface.IMarshal}
         * @param {*} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            this.name = p_name || '';
            
            /**
             * GUID 값 
             * @type {String}
             * @private 
             */
            this.__GUID = null;
            
            /** implements IMarshal 인터페이스 구현 */
            this._implements(IMarshal);            
        }
        util.inherits(MetaElement, _super);
    
        /** @override **/
        MetaElement.prototype.getTypes = function() {
            
            var type = ['MetaElement'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * GUID 생성한다.
         * @private
         * @returns {String}
         */
        MetaObject.prototype.__newGUID  = function() {
            return util.createGUID();
        };

        /**
         * 조건 : GUID는 한번만 생성해야 함
         * GUID를 얻는다.
         * @returns {String}
         */
        MetaObject.prototype.getGUID  = function() {
            if (this.__GUID === null) {
                this.__GUID = this.__newGUID();
            }
            return this.__GUID;
        };

        /**
         * 객체를 얻는다
         * REVIEW:: 공통 요소? 확인필요
         * @virtual
         * @returns {Object}
         */
        MetaElement.prototype.getObject  = function(p_context) {

            var obj     = {};

            for (var prop in this) {
                if (this[prop] instanceof MetaElement) {
                    obj[prop] = this[prop].getObject(p_context);
                } else if (typeof this[prop] !== 'function' && prop.substr(0, 1) !== '_') {
                    obj[prop] = this[prop];
                }
            }
            return obj;                        
        };

        return MetaElement;
    
    }(MetaObject));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = MetaElement;
    } else {
        global._W.Meta.MetaElement = MetaElement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));