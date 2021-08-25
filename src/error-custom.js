/**
 * namespace _W.Common.CustomError
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                        = require('./utils');
    } else {
        util                        = global._W.Common.Util;
    }

    //==============================================================Á
    // 3. 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    
    var CustomError = (function (_super) {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _W.Common.CustomError
         * @param {String} p_message 사용자 메세지 내용
         * @param {?String} p_target 대상(값)
         * @param {?String} p_name 에러명
         * 우선순위 : 메세지 > 타겟 > 에러명
         */
        function CustomError(p_message, p_target, p_name) {
            _super.call(this, p_message);

            /**
             * 에러 스텍
             * @member {String} _W.Common.CustomError#stack
             */
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, CustomError);
            }

            /**
             * 에러 메세지
             * @member {Object} 
             */
            this.message = p_message;    

            /**
             * 에러 구분자
             * @member {Object} 
             */
            this.target = { value: p_target || ''};

            /**
             * 에러명
             * @member {Object} 
             */
            this.name = p_name || 'CustomError';
            
            // TODO:: 추후 [내부처리] 부분 구현
            this.innerExecute();
        }
        util.inherits(CustomError, _super);

        /**
         * 내부처리
         */
         CustomError.prototype.innerExecute = function() {
            // console.log('CustomError.innerExecute()');
        };

        return CustomError;
        
    }(Error));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = CustomError;
    } else {
        global._W.Common.CustomError = CustomError;
        global._W.CustomError = CustomError;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));