// util, Observer
(function(global) {
    
    'use strict';
    
    //==============================================================
    // 1. 모듈 네임스페이스 선언
    require('./extends');   // 폴리필

    global._W               = global._W || {};
    global._W.Common        = global._W.Common || {};
    global._W.Common.Util   = global._W.Common.Util || {};
    global._W.Common.Extend = global._W.Common.Extend || {};

    var util;
    var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./utils');
        Observer            = require('./observer');
    } else {
        util                = global._W.common.Util;
        Observer            = global._W.common.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.util             = util;
        module.exports.Observer         = Observer;
    } else {
        global._W.Common.Util           = util;
        global._W.Common.Observer       = Observer;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));