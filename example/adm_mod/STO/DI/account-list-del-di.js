/**
 * @namespace _W.Meta.Bind.AccountListDelDI
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
    var BaseListDelDI;
    var frmURL;          // 수정화면 경로(참조)
    var viwURL;          // 세부보기
    var viwDelURL;       // 세부보기(삭제)


    if (typeof module === "object" && typeof module.exports === "object") {     
        // util                = require("./utils");
        // IBindModelCreate    = require("./i-marshal");
    } else {
        util                = global._W.Common.Util;
        BaseListDelDI       = global._W.Meta.Bind.BaseListDelDI;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === "undefined") throw new Error("[util] module load fail...");
    if (typeof BaseListDelDI === "undefined") throw new Error("[BaseListDelDI] module load fail...");

    //==============================================================
    // 4. 모듈 구현    
    var AccountListDelDI  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @abstract 추상클래스
         * @class
         */
        function AccountListDelDI() {
            _super.call(this);
            
            // 업무 속성
            this.prop["frmURL"] = {
                getter: function() { return frmURL; },
                setter: function(val) { frmURL = val; }
            };
            this.prop["viwURL"] = {
                getter: function() { return viwURL; },
                setter: function(val) { viwURL = val; }
            };
            this.prop["viwDelURL"] = {
                getter: function() { return viwDelURL; },
                setter: function(val) { viwDelURL = val; }
            };
            this.prop["page_size"] =  {
                getter: function() { return page.page_size; },
                setter: function(val) { page.page_size = val; }
            };
            this.prop["page_count"] = {
                getter: function() { return page.page_count; },
                setter: function(val) { page.page_count = val; }
            };
            // 검색/조회 조건
            this.prop["keyword"] = {
                caption: "검색어",
                selector: "#name_corp_tel_hp",
                getter: function() { return $("#name_corp_tel_hp").val(); },
                setter: function(val) { $("#name_corp_tel_hp").val(val); }
            };
            this.prop["sort_cd"] = "";
            // // 레코드
            this.prop["acc_idx"] = {caption: "일련번호"};
            this.prop["adm_id"] = {caption: "관리자ID"};
            this.prop["admName"] = {caption: "관리자명"};
            this.prop["use_yn"] = {caption: "사용유무"};
            this.prop["create_dt"] = {caption: "등록일자"};
    
            this.mapping = {
                keyword: { list: "bind"},
                page_size: { list: "bind"},
                page_count: { list: "bind"},
                sort_cd: { list: "bind"},
                acc_idx: { 
                    list: "output",
                    delete:  ["valid", "bind"]
                },
                adm_id: { list: "output"},
                use_yn: { list: "output"},
                create_dt: { list: "output"},
            };
        }
        util.inherits(AccountListDelDI, _super);
        // 정적 메소드
        AccountListDelDI.goEdit = function (p_idx) {
            location.href = frmURL + "?mode=EDIT&acc_idx=" + p_idx;
        };
        AccountListDelDI.goViewDel = function (p_idx) {
            location.href = accountViwDelURL + "?acc_idx=" + p_idx;
        };
        AccountListDelDI.goView = function (p_idx) {
            location.href = viwURL + "?acc_idx=" + p_idx;
        };
        AccountListDelDI.use_yn = function(flag) {
            if (flag === "Y") return "<strong class='icoStatus positive'></strong>";
            else return "<span class='icoMobile'>중지</span>";
        };
        AccountListDelDI.listView = function(p_entity) {

            var entity      = this.output;
            var row_total   = p_entity.table["row_total"];
            var numCount      = row_total - ((page.page_count - 1) * page.page_size);     // 개시물 번호 = 전체 갯수 - ((현재페이지 -1) * 리스트수 )
            var strHtml;

            $("#CList").html("");
            $("#totalView").text(row_total);

            if (entity.rows.count === 0) {
                $("#CList").append("<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>");
            } else {
                for (var i = 0, num = numCount; i < entity.rows.count; i++, num--) {
                    strHtml = "";
                    strHtml = strHtml + "<tr>";
                    strHtml = strHtml + "<td><input name='chk_idx' type='checkbox' class='rowChk _product_no' value='" + entity.rows[i].acc_idx + "'></td>";
                    strHtml = strHtml + "<td>" + num + "</td>";
                    strHtml = strHtml + "<td><a href=\"javascript:AccountListDelDI.goView('" + entity.rows[i].acc_idx + "');\"\">" + entity.rows[i].adm_id + "</a></td>";
                    strHtml = strHtml + "<td>" + entity.rows[i].admName + "</td>";
                    strHtml = strHtml + "<td>" + AccountListDelDI.use_yn(entity.rows[i].use_yn) + "</td>";
                    strHtml = strHtml + "<td>" + entity.rows[i].create_dt.substring(0, 10) + "</td>";
                    strHtml = strHtml + "<td>";
                    strHtml = strHtml + "<a href=\"javascript:AccountListDelDI.goViewDel('" + entity.rows[i].acc_idx + "');\"\" class='btnNormal'><span> 조회</span></a>";
                    strHtml = strHtml + " <a href=\"javascript:AccountListDelDI.goEdit('" + entity.rows[i].acc_idx + "');\"\" class='btnNormal'><span> 수정</span></a>";
                    strHtml = strHtml + "</td>";
                    strHtml = strHtml + "</tr>";
                    $("#CList").append(strHtml); 
                }
                $("#CPage").html(page.parser(row_total));   // 필수 항목만 받음
            }
        };
        // 데코레이션 메소드
        AccountListDelDI.prototype.preRegister = function(p_this) {
            BaseListDelDI.prototype.preRegister.call(this, p_this);
            
            p_this.list.cbOutput = AccountListDelDI.listView;         // 출력(output) 메소드 설정
            page.callback = p_this.list.execute.bind(p_this.list);      // page 콜백 함수 설정

            $("#page_size").change(function () {
                var page_size = $("#page_size").val();
                page.page_size = page_size;
                page.page_count = 1;
                p_this.list.execute();
            });
            $("#btn_AllChk").click(function () {                    // 전체 선택/해제
                if($("#btn_AllChk").is(":checked")) {
                    $("input:checkbox[name='chk_idx']").prop('checked', true);
                } else {
                    $("input:checkbox[name='chk_idx']").prop('checked', false);
                }
            });
            $("#btn_Delete").click(function () {
                // if (confirm("삭제 하시겠습니까 ?")) {
                    if ($("input:checkbox[name='chk_idx']:checked").length <= 0) {
                        alert("선택된 항목이 없습니다.");
                        return;
                    }
                    $("input:checkbox[name='chk_idx']").each(function() {
                        if(this.checked){   //checked 처리된 항목의 값
                            p_this._baseEntity.items["acc_idx"].value = this.value;
                            p_this.delete.execute();
                        }
                    });
                // }
            });
        };
        AccountListDelDI.prototype.preCheck = function(p_this) {
            if (BaseListDelDI.prototype.preCheck.call(this, p_this)) {
                if (p_this.checkSelector()) {                     // 선택자 검사
                    console.log("preCheck : 선택자 검사 => 'Success' ");
                    return true;
                }
            }
            return false;
        };
        AccountListDelDI.prototype.preReady = function(p_this) {
            BaseListDelDI.prototype.preReady.call(this, p_this);
            p_this.list.execute();                                // 준비완료 후 실행(execute)
        };

        return AccountListDelDI;
    
    }(BaseListDelDI));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        // module.exports = BaseListDelDI;
    } else {
        global._W.Meta.Bind.AccountListDelDI = AccountListDelDI;
    }

}(typeof module === "object" && typeof module.exports === "object" ? global : window));