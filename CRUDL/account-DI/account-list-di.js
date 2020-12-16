/**
 * @namespace _W.Meta.Bind.AccountListDI
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
    var BaseListDI;
    var accountFrmURL;          // 수정화면 경로(참조)
    
    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        BaseListDI          = global._W.Meta.Bind.BaseListDI;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseListDI === "undefined") throw new Error("[BaseListDI] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var AccountListDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function AccountListDI() {
            _super.call(this);
            
            // 업무 속성
            this.attr["frmURL"] = {
                getter: function() { return accountFrmURL; },
                setter: function(val) { accountFrmURL = val; }
            };
            this.attr["page_size"] =  {
                getter: function() { return page.page_size; },
                setter: function(val) { page.page_size = val; }
            };
            this.attr["page_count"] = {
                getter: function() { return page.page_count; },
                setter: function(val) { page.page_count = val; }
            };
            // 검색/조회 조건
            this.attr["keyword"] = {
                caption: "검색어",
                selector: "#name_corp_tel_hp",
                getter: function() { return $("#name_corp_tel_hp").val(); },
                setter: function(val) { $("#name_corp_tel_hp").val(val); }
            };
            this.attr["sort_cd"] = "";
            // // 레코드
            this.attr["acc_idx"] = {caption: "일련번호"};
            this.attr["adm_id"] = {caption: "관리자ID"};
            this.attr["admName"] = {caption: "관리자명"};
            this.attr["use_yn"] = {caption: "사용유무"};
            this.attr["create_dt"] = {caption: "등록일자"};
    
            this.mapping = {
                keyword: { list: "bind"},
                page_size: { list: "bind"},
                page_count: { list: "bind"},
                sort_cd: { list: "bind"}
            };
        }
        util.inherits(AccountListDI, _super);
    
        // 정적 메소드
        AccountListDI.goForm = function (p_idx) {
            location.href = accountFrmURL + "?mode=EDIT&acc_idx=" + p_idx;
        };
        AccountListDI.use_yn = function(flag) {
            if (flag === "Y") return "<strong class='icoStatus positive'></strong>";
            else return "<span class='icoMobile'>중지</span>";
        };
        AccountListDI.listView = function(p_entity) {

            var entity      = this.output;
            var row_total   = p_entity.table["row_total"];
            var numCount      = row_total - ((page.page_count - 1) * page.page_size);     // 개시물 번호 = 전체 갯수 - ((현재페이지 -1) * 리스트수 )
            var strHtml;

            $("#CList").html("");
            $("#totalView").text(row_total);

            if (entity.rows.count === 0) {
                $("#CList").append("<tr><td colspan='5' align='center'>자료가 없습니다.</td></tr>");
            } else {
                for (var i = 0, num = numCount; i < entity.rows.count; i++, num--) {
                    strHtml = "";
                    strHtml = strHtml + "<tr>";
                    strHtml = strHtml + "<td>" + num + "</td>";
                    strHtml = strHtml + "<td><a href=\"javascript:AccountListDI.goForm('" + entity.rows[i].acc_idx + "');\">" + entity.rows[i].adm_id + "</a></td>";
                    strHtml = strHtml + "<td>" + entity.rows[i].admName + "</td>";
                    strHtml = strHtml + "<td>" + AccountListDI.use_yn(entity.rows[i].use_yn) + "</td>";
                    strHtml = strHtml + "<td>" + entity.rows[i].create_dt.substring(0, 10) + "</td>";
                    strHtml = strHtml + "</tr>";
                    $("#CList").append(strHtml); 
                }
                $("#CPage").html(page.parser(row_total));   // 필수 항목만 받음
            }
        };
        // 데코레이션 메소드
        AccountListDI.prototype.cbRegister = function() {
            BaseListDI.prototype.cbRegister.call(this);
            
            var _this = this;   // jqeury 함수 내부에서 this 접근시 사용
            
            this.list.cbOutput = AccountListDI.listView;        // 출력(output) 메소드 설정
            page.callback = this.list.execute.bind(this.list);  // page 콜백 함수 설정

            $("#page_size").change(function () {
                page.page_size = $("#page_size").val();
                page.page_count = 1;
                _this.list.execute();
            });

        };
        AccountListDI.prototype.cbCheck = function() {
            if (BaseListDI.prototype.cbCheck.call(this)) {
                if (this.checkSelector()) {                     // 선택자 검사
                    console.log("cbCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        AccountListDI.prototype.cbReady = function() {
            BaseListDI.prototype.cbReady.call(this);
            this.list.execute();                                // 준비완료 후 실행(execute)
        };

        return AccountListDI;
    
    }(BaseListDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseListDI;
    } else {
        global._W.Meta.Bind.AccountListDI = AccountListDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));