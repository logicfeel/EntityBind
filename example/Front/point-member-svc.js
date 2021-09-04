/**
 * namespace _W.Meta.Bind.PointMemberService
 */
 (function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    var util;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
    } else if (typeof module.exports === 'object'){     // node
        // util                = require('util');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var PointMemberService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function PointMemberService(p_suffix) {
            _super.call(this);
            
            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Front/frt_mod/POT/Point_Member.C.asp';

            /**
             * prop 속성
             * @type {Object.<String, Item | String | Boolean | Number>}
             */  
             this.prop =     {
                // view
                _txt_total:      { selector: { key: "#s-txt-total"+ _SUFF,             type: "text" } },
                // bind
                cmd:            "",
                meb_idx:        "",
                total_it:       0,
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
             this.command = {
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        _this.bindModel.items["_txt_total"].value = numberWithCommas(_this.bindModel.items["total_it"].value); 
                    }
                },
            };

            /**
             * 속성의 매핑
             * @type {Object}
             */
             this.mapping = {
                cmd:            { Array: ["bind"] },    // 전역설정
                meb_idx:        { read:  ["bind"] },
                total_it:       { read:  ["output"] },
            };

            /**
             * 공개 함수
             * @type {Object.<String, Function>}
             */
             this.fn = {
                procRead: function (p_meb_idx) { 
                    if (typeof p_meb_idx !== 'undefined') _this.bindModel.items['meb_idx'].value = p_meb_idx;
                    _this.bindModel.read.execute(); 
                },
            };

        }
        util.inherits(PointMemberService, _super);

        return PointMemberService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.PointMemberService = PointMemberService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));