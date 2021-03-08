/**
 * @namespace _W.Meta.Bind.PointMemberService
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Meta          = global._W.Meta || {};
    global._W.Meta.Bind     = global._W.Meta.Bind || {};
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;
    var BindCommandEditAjax     =_W.Meta.Bind.BindCommandEditAjax;

    // var accountFrmURL;          // 수정화면 경로(참조)

    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                    = global._W.Common.Util;
        BindCommandLookupAjax   = global._W.Meta.Bind.BindCommandLookupAjax;
        BindCommandEditAjax     = global._W.Meta.Bind.BindCommandEditAjax;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseService === "undefined") throw new Error("[BaseService] module load fail...");
    if (typeof BindCommandLookupAjax === "undefined") throw new Error("[BindCommandLookupAjax] module load fail...");
    if (typeof BindCommandEditAjax === "undefined") throw new Error("[BindCommandEditAjax] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var PointMemberService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function PointMemberService(p_this) {
            _super.call(this);

            var _this = this;
            
            //--------------------------------------------------------------
	        // 1. Command 정의 및 생성
            p_this.read             = new BindCommandLookupAjax(p_this, p_this._baseEntity);    // 포인트 조회
            //--------------------------------------------------------------    
	        // 2. 객체 설정 (등록)
            p_this.read.outputOption = 3;
            p_this.read.url  = "/Front/frt_mod/POT/Point_Member.C.asp";
            //--------------------------------------------------------------    
	        // 3. 아이템 등록 및 설정(추가)
            this.prop["cmd"] = "";
            this.prop["meb_idx"] = "";
            this.prop["total_it"] = { setter: function(val) { return $("#total_it").text(numberWithCommas(val)); }, };
            // mapping
            this.mapping = {
                cmd:            { Array: ["bind"] },    // 전역설정
                meb_idx:        { read: ["bind"], },
                total_it:       { read: ["output"] },
            };
            //--------------------------------------------------------------    
            // 4. 콜백 함수 구현
            // onExecute
            p_this.read.onExecute = function(p_bindCommand) { p_this.items["cmd"].value = "READ"; };          // Point.C.asp
            //--------------------------------------------------------------    
            // 5. 이벤트 등록
        }
        util.inherits(PointMemberService, _super);
    
        // 데코레이션 메소드  (빼도 동작에 상관없음)
        // PointMemberService.prototype.preRegister = function(p_this) {
        //     BaseService.prototype.preRegister.call(this, p_this);
        // };
        // PointMemberService.prototype.preCheck = function(p_this) {
        //     if (BaseService.prototype.preCheck.call(this, p_this)) {
        //         if (p_this.checkSelector()) {
        //         console.log("preCheck : 선택자 검사 => 'Success' ");
        //             return true;
        //         }
        //     }
        //     return false;
        // };
        // PointMemberService.prototype.preReady = function(p_this) {
        //     BaseService.prototype.preReady.call(this, p_this);
        // };

        return PointMemberService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseService;
    } else {
        global.PointMemberService = PointMemberService;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));