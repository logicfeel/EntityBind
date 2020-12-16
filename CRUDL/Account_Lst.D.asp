<% @CODEPAGE="65001" language="VBScript" %>
<%
'******************************************************************************
' FILENAME      : 
'------------------------------------------------------------------------------
' PROGRAM NAME  : 
' AUTHOR        : 김영호
' DESCRIPTION   : 
' HISTORY       :
'------------------------------------------------------------------------------
' DATE        NAME        DESCRIPTION
'------------------------------------------------------------------------------
'
'   확인
'   http://rtwgs4.cafe24.com/Admin/pc/mod/bod/faq_Lst.asp#none
'
'******************************************************************************
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Define.I.asp"-->
<%	


%><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="copyright" content="Copyright(c) White Lab Inc. All Rights Reserved." />
    <title>OnStory Admin</title>
    <link rel="stylesheet" type="text/css" href="/css/suio.css" media="screen" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/css/layout.css" media="screen" charset="utf-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		
    
	<script language="javascript" src="/Common//JS/jquery.xml2json.js"></script>
	<script language="javascript" src="/Common/JS/Common.js"></script>
	<script language="javascript" src="/A-Back/CMN/JS/BackCommon.js"></script>
</head>
<body>

<div style="width:1020px">   

    <form id="frm_default" name="frm_default" method="post">
                
	<!--###############  검색 조건 Block ###############-->

	<div class="section" id="QA_profile1">
  		<div>&nbsp;</div>
        <div>&nbsp;</div>                        
        <div class="optionArea">
            <div class="mOption" style="display: block;">
                <table border="1" summary="">
                    <caption>회원정보 조회</caption>
                    <colgroup>
                        <col style="width:154px;*width:135px;" />
                        <col style="width:auto;" />
                        <col style="width:154px;*width:135px;" />
                        <col style="width:auto;" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">관리자명, ID(admin)</th>
                            <td colspan="3">
                                <input type="text" id="name_corp_tel_hp" name="name_corp_tel_hp" value="" class="fText" style="width:200px;" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
		<!--###############  검색 버튼 Block ###############-->
		<div class="mButton gCenter">
		    <a href="#none" id="btn_Search" class="btnSearch"><span>검색</span></a>
		    <a href="#none" id="btn_Reset" class="btnSearch reset"><span>초기화</span></a>
		</div>
    </div>

	<!--###############  검색 결과 Block ###############-->
	<div class="section" id="QA_level2">
	    <div class="mState">
	        <div class="gLeft">
	            <p class="total">검색결과 <strong id="totalView">0</strong>건</p>
            </div>
	        <div class="gRight">
	            <select id="page_size" name="page_size" class="fSelect">
	                <option value="10" selected>10개씩보기</option>
	                <option value="20">20개씩보기</option>
	                <option value="30">30개씩보기</option>
	                <option value="50">50개씩보기</option>
	                <option value="100">100개씩보기</option>
	            </select>
	        </div>
	    </div>
	    <div class="mCtrl typeHeader">
	        <div class="gLeft">
                <a href="#none" id="btn_Delete" class="btnNormal"><span><em class="icoDel"></em> 삭제</span></a>
                <a href="#none" id="btn_Insert" class="btnNormal"><span> 등록</span></a>
	        </div>
	        <div class="gRight">
                <a href="#none" id="btn_Excel" title="새창 열림" class="btnNormal"><span><em class="icoXls"></em> 엑셀다운로드<em class="icoLink"></em></span></a>
            </div>
	    </div>
	    <div class="mBoard gCellNarrow">
	        <table border="1" summary="" class="eChkColor">
		        <caption>목록</caption>
		        <!--###############  제목 크기 Block ###############-->
		        <colgroup>
		            <col class="chk">
		            <col class="date">
                    <col style="width:auto">
		            <col style="width:auto">
		            <col style="width:auto">
		            <col style="width:auto">
                    <col style="width:auto">
		        </colgroup>
		        <!--###############  검색 제목 Block ###############-->
		        <thead>
		            <tr>
		                <th scope="col"><input id="btn_AllChk" type="checkbox" name="Allselect" class="allChk"></th>
		                <th scope="col"><strong>구분</strong></th>
		                <th scope="col"><strong>아이디</strong></th>
                        <th scope="col"><strong>이름</strong></th>
                        <th scope="col"><strong>상태</strong></th>
		                <th scope="col"><strong>등록일자</strong></th>
                        <th scope="col"><strong>처리</strong></th>
		            </tr>
		        </thead>
				
				<!--###############  검색 본문 Block ###############-->
				<tbody class="center" id="CList">
                    <template>
                    <tr class="">
                        <td><input name="chk_idx" type="checkbox" class="rowChk _product_no" value="" is_display="F" is_selling="F"></td>
                        <td>2017-09-01</td>			            	
                        <td>기본상품</td>
                        <td>기본상품</td>
                        <td class="txtCode"><strong class="icoStatus positive"></strong></td>
                        <td>010-222-2222</td>
                        <td>010-222-2222</td>
                    </tr>
                    </template>
					<tr><td colspan='6' align='center'>자료가 없습니다.</td></tr>
				</tbody>
			
			</table>
			<!--###############  검색 없음 Block ###############-->
<!--
	        <p class="empty" style="display:block;">검색된 자료가 없습니다.</p>
--> 
	    </div>
	    
	    <!--###############  페이지 Block ###############-->
	    <div id="CPage" class="mPaginate">

	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>이전</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>1</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>다음</span></a>

	    </div>
	</div>

	<!--###############  처리중 Block ###############-->
	<div class="mLoading typeStatic">
	    <p>처리중입니다. 잠시만 기다려 주세요.</p>
	    <img src="http://img.echosting.cafe24.com/suio/ico_loading.gif" alt="" />
	</div>
	
	<!--###############  페이지 Block ###############-->
	<!-- 도움말 영역 -->

	<!-- //도움말 영역 -->
    </form>
    <!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">-->
<style>
	.w3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:20}    
	.w3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}
	.w3-animate-opacity{animation:opac 0.8s}@keyframes opac{from{opacity:0} to{opacity:1}}
	.w3-animate-top{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}
	.w3-animate-left{position:relative;animation:animateleft 0.4s}@keyframes animateleft{from{left:-300px;opacity:0} to{left:0;opacity:1}}
	.w3-animate-right{position:relative;animation:animateright 0.4s}@keyframes animateright{from{right:-300px;opacity:0} to{right:0;opacity:1}}
	.w3-animate-bottom{position:relative;animation:animatebottom 0.4s}@keyframes animatebottom{from{bottom:-300px;opacity:0} to{bottom:0;opacity:1}}
	.w3-animate-zoom {animation:animatezoom 0.6s}@keyframes animatezoom{from{transform:scale(0)} to{transform:scale(1)}}
	.w3-animate-input{transition:width 0.4s ease-in-out}.w3-animate-input:focus{width:100%!important}
	.w3-opacity,.w3-hover-opacity:hover{opacity:0.60}.w3-opacity-off,.w3-hover-opacity-off:hover{opacity:1}
</style>
	<div id="part_Overlay" class="w3-overlay w3-animate-opacity" style="cursor:pointer;z-index:90;"></div>

</div>        
<script>    
    //************** ajax 에러 처리  ************************
    $(document).ajaxError(function (event, xhr, options, exc) {
        if (xhr.status != 200){
        var msg = "";
        msg = msg + "# options.data : " + options.data + " , ";
        msg = msg + "# options.url : " + options.url + " , ";
        msg = msg + "# options.contentType : " + options.contextType + " , ";
        msg = msg + "# xhr.status : " + xhr.status + " , ";
        msg = msg + "# xhr.statusText : " + xhr.statusText + " , ";
        msg = msg + "# xhr.responseText : " + xhr.responseText + " , ";

        Msg("ALERT", "ajaxError", msg, "");
        }
    });
</script>
<script src="/Common/js/_w-meta-1.4.0.js?a=123"></script>
<script src="/Common/js/page-view.js?a=123"></script>
<script>
    // #######################################################################################################
    var util                    = _W.Common.Util;
    var IBindModelListDel       = _W.Interface.IBindModelListDel;
    var page;

    page = new PageView("page", 5);

    function BaseListDelDI() {
        IBindModelListDel.call(this);

        this.attr["regURL"]        = "";                    // 등록화면 경로

        this.cbFail = function(p_result, p_item) {          // 전역 실패 콜백
            console.warn("실패 :: Value=\"%s\", Code=\"%s\", Message=\"%s\" ", p_result.value, p_result.code, p_result.msg);
            Msg("ALERT", "실패", p_result.msg);
            if (typeof p_item.selector[0] === "string") $(p_item.selector[0]).focus();
        };
        this.cbError = function(p_msg, p_status) {          // 전역 오류 콜백
            console.warn("오류 :: Status=\"%s\" , Message=\"%s\" ", p_status, p_msg);
            Msg("ALERT", "오류", p_msg);
        };
        this.onExecute = function(p_bindCommand) {          // 실행시 이벤트 등록
            console.log("onExecute 이벤트. ");
            $('.mLoading').show();
        };
        this.onExecuted = function(p_bindCommand) {         // 실행끝 이벤트 등록
            console.log("onExecuted 이벤트.. ");
            $('.mLoading').hide();
        };

    }
    util.inherits(BaseListDelDI, IBindModelListDel);
    // 메소드
    BaseListDelDI.prototype.cbRegister = function() {
        console.log("cbRegister : 이벤트 및 설정 등록 ");
        
        var _this = this;   // jqeury 함수 내부에서 this 접근시 사용
        
        this.delete.cbEnd = function(p_result) {
            _this.list.execute();
        };

        $("#btn_Search").click(function () {
            _this.list.execute();
        });
        $("#btn_Reset").click(function () {
            $("form").each(function() {
                this.reset();
            });
        });
        $("#btn_Insert").click(function () {
            var regURL = _this.first.items["regURL"].value;
            location.href = regURL + "?mode=CREATE";
        });    
    };
    BaseListDelDI.prototype.cbCheck = function() {
        console.log("cbCheck : 화면 유효성 검사 ");
        return true;
    };
    BaseListDelDI.prototype.cbReady = function() {
        console.log("cbReady : 준비완료 ");
    };
</script>
<script>
    // #######################################################################################################
    // 특정 비즈니스를 담당하는 기능 (Account_Frm)
    var util                    = _W.Common.Util;
    var BaseListDelDI              = BaseListDelDI;
    var accountFrmURL;          // 수정화면 경로(참조)
    var accountViwURL;          // 세부보기

    function AccountListDelDI() {
        BaseListDelDI.call(this);

        this.attr["frmURL"] = {
            getter: function() { return accountFrmURL; },
            setter: function(val) { accountFrmURL = val; }
        };
        this.attr["viwURL"] = {
            getter: function() { return accountViwURL; },
            setter: function(val) { accountViwURL = val; }
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
    }
    util.inherits(AccountListDelDI, BaseListDelDI);
    // 정적 메소드
    AccountListDelDI.goForm = function (p_idx) {
        location.href = accountFrmURL + "?mode=EDIT&acc_idx=" + p_idx;
    };
    AccountListDelDI.goView = function (p_idx) {
        location.href = accountViwURL + "?acc_idx=" + p_idx;
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
                strHtml = strHtml + "<td><a href=\"javascript:AccountListDelDI.goForm('" + entity.rows[i].acc_idx + "');\"\" class='btnNormal'><span> 수정</span></a></td>";
                strHtml = strHtml + "</tr>";
                $("#CList").append(strHtml); 
            }
            $("#CPage").html(page.parser(row_total));   // 필수 항목만 받음
        }
    };
    // 데코레이션 메소드
    AccountListDelDI.prototype.cbRegister = function() {
        BaseListDelDI.prototype.cbRegister.call(this);
        
        var _this = this;

        this.list.cbOutput = AccountListDelDI.listView;         // 출력(output) 메소드 설정
        page.callback = this.list.execute.bind(this.list);      // page 콜백 함수 설정

        $("#page_size").change(function () {
            var page_size = $("#page_size").val();
            page.page_size = page_size;
            page.page_count = 1;
            _this.list.execute();
        });
        $("#btn_AllChk").click(function () {                    // 전체 선택/해제
            if($("#btn_AllChk").is(":checked")) {
                $("input:checkbox[name='chk_idx']").prop('checked', true);
            } else {
                $("input:checkbox[name='chk_idx']").prop('checked', false);
            }
        });
        $("#btn_Delete").click(function () {
            if (confirm("삭제 하시겠습니까 ?")) {
                if ($("input:checkbox[name='chk_idx']:checked").length <= 0) {
                    alert("선택된 항목이 없습니다.");
                    return;
                }
                $("input:checkbox[name='chk_idx']").each(function() {
                    if(this.checked){   //checked 처리된 항목의 값
                        _this._baseEntity.items["acc_idx"].value = this.value;
                        _this.delete.execute();
                    }
                });
            }
        });
    };
    AccountListDelDI.prototype.cbCheck = function() {
        if (BaseListDelDI.prototype.cbCheck.call(this)) {
            if (this.checkSelector()) {                     // 선택자 검사
                console.log("cbCheck : 선택자 검사 => 'Success' ");
                return true;
            }
        }
        return false;
    };
    AccountListDelDI.prototype.cbReady = function() {
        BaseListDelDI.prototype.cbReady.call(this);
        this.list.execute();                                // 준비완료 후 실행(execute)
    };
</script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelListDelAjax    = _W.Meta.Bind.BindModelListDelAjax;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelListDelAjax(new AccountListDelDI(), true, ItemDOM);

    e.baseUrl = "/admin/adm_mod/sto/Account.C.asp";         // 생성 및 설정
    e.first.items["frmURL"].value = "Account_Frm.asp";
    e.first.items["regURL"].value = "Account_Reg.asp";
    e.first.items["viwURL"].value = "Account_Viw.asp";
    e.baseAjaxSetup.type = "POST";

    e.addItem("cmd", "", [], "bind");                   // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");

    e.list.setItem(["keyword", "page_size", "page_count", "sort_cd"], "bind");
    e.list.setItem(["acc_idx", "adm_id", "use_yn", "create_dt"], "output");
    e.list.onExecute = function(p_bindCommand) {
        this.bind.items["cmd"].value = "LIST";
    };

    e.delete.setItem(["acc_idx"], ["valid", "bind"]);
    e.delete.onExecute = function(p_bindCommand) {
        this.bind.items["cmd"].value = "DELETE";
    };

    //--------------------------------------------------------------
    // 디버깅 용도
    e.list.cbBind = function(p_ajaxSetup) {
        console.log("call cbBind() ");
    };
    e.delete.cbBind = function(p_ajaxSetup) {
        console.log("call cbBind() ");
    };
    //--------------------------------------------------------------
    $(document).ready(function () {
        e.init();
    });
</script>
</body>
</html>            