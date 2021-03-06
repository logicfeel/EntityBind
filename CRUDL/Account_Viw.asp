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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/sto/account_Frm.asp?cmd=INSERT
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
    <link rel="stylesheet" type="text/css" href="/Admin/PC/css/suio.css" media="screen" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/Admin/PC/css/layout.css" media="screen" charset="utf-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		

	<script language="javascript" src="/Common/js/jquery.xml2json.js"></script>
	<script language="javascript" src="/Common/js/common.js?v1"></script>
	<script language="javascript" src="/Admin/adm_cmn/js/admin_common.js?v2"></script>
</head>
<body>

<div style="width:1020px">   
    <form id="frm_default" name="frm_default" method="post">
	<input type="hidden" id="acc_idx" name="acc_idx" value="" /> 
    <!-- 폼 내용 -->
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
                        <th scope="row">아이디 </th>
                        <td><p id="adm_id"></p> </td>
                        <th scope="row">이름 </th>
                        <td><p id="admName"></p> </td>                        
                    </tr>
                    <tr>
                        <th scope="row">비밀번호 </th>
                        <td><p id="passwd"></p> </td>
                        <th scope="row">사용유무 </th>
                        <td><p id="using_yn"></p> </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">메모</th>
                        <td colspan="3"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
		<!-- 버튼 -->
		<div class="mButton gCenter">
		    <a id="btn_List" class="btnSearch reset"><span>목록</span></a>
		</div>
        <!-- // 버튼 -->
    </div>
    <!-- // 폼 내용 -->
	<!-- 처리중 -->
	<div class="mLoading typeStatic">
	    <p>처리중입니다. 잠시만 기다려 주세요.</p>
	    <img src="http://img.echosting.cafe24.com/suio/ico_loading.gif" alt="" />
	</div>
	<!-- // 처리중 -->

    <!--###############  페이지 Block ###############-->
	<!-- 도움말 영역 -->

	<!-- // 도움말 영역 -->
    </form>
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
<script src="/Common/js/_w-meta-1.4.0.js?aaaaaaa"></script>
<script src="/Common/js/_w-meta-1.4.0.test.js"></script>

<script>
    // #######################################################################################################
    // 특정 기능을 수행하는 화면을 Frm, Edit 기능을 기준으로 
    var util                    = _W.Common.Util;
    var IBindModelRead          = _W.Interface.IBindModelRead;

    function BaseReadDI() {
        IBindModelRead.call(this);

        this.prop["listURL"]    = "";

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
    util.inherits(BaseReadDI, IBindModelRead);
    // 가상 메소드
    BaseReadDI.prototype.preRegister = function() {
        console.log("preRegister : 이벤트 및 설정 등록 ");

        var _this = this;   // jqeury 함수 내부에서 this 접근시 사용

        $("#btn_List").click(function () {
            location.href = _this.first.items["listURL"].value;
        });
    };
    BaseReadDI.prototype.preCheck = function() {   // 2.검사
        console.log("preCheck : 화면 유효성 검사 ");
        return true;
    };
    BaseReadDI.prototype.preReady = function() {
        console.log("preReady : 준비완료 ");
    };
</script>
<script>
    // #######################################################################################################
    // 특정 비즈니스를 담당하는 기능 (Account_Frm)
    var util                    = _W.Common.Util;
    var BaseReadDI              = BaseReadDI;

    function AccountReadDI() {
        BaseReadDI.call(this);

        // 업무 속성
        this.prop["acc_idx"] = {caption: "일련번호", value: ""};
        this.prop["sto_id"] = "S00001";
        this.prop["adm_id"] = {
            caption: "관리자ID",
            selector: "#adm_id",
            setter: function(val) { $("#adm_id").text(val); }
        };
        this.prop["passwd"] = {
            caption: "비밀번호",
            selector: "#passwd",
            setter: function(val) { $("#passwd").text(val); }
        };
        this.prop["admName"] = {
            caption: "관리자명", 
            selector: "#admName",
            setter: function(val) { $("#admName").text(val); }
        };
        this.prop["use_yn"] = {
            caption: "사용유무", 
            selector: ["#using_yn"],
            setter: function(val) { $("#using_yn").text( val === "Y" ? "정상" : "중지"); }
        };
    }
    util.inherits(AccountReadDI, BaseReadDI);
    // 데코레이션 메소드
    AccountReadDI.prototype.preRegister = function() {
        BaseReadDI.prototype.preRegister.call(this);
    };
    AccountReadDI.prototype.preCheck = function() {
        if (BaseReadDI.prototype.preCheck.call(this)) {
            if (this.checkSelector()) {                             // 선택자 검사
                console.log("preCheck : 선택자 검사 => 'Success' ");
                return true;
            }
        }
        return false;    
    };
    AccountReadDI.prototype.preReady = function() {
        BaseReadDI.prototype.preReady.call(this);
        this.read.execute();
    };
</script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelReadAjax       = _W.Meta.Bind.BindModelReadAjax;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelReadAjax(new AccountReadDI(), true, ItemDOM);

    e.baseUrl = "/admin/adm_mod/sto/Account.C.asp";                 // 생성 및 설정
    e.first.items["listURL"].value = "Account_Lst.D.asp";
    // e.baseAjaxSetup.type = "POST";

    e.addItem("cmd", "READ", [], "bind");                               // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");

    // e.read.setItem(["acc_idx"], ["valid", "bind"]);
    // e.read.setItem(["adm_id", "admName", "use_yn", "passwd"], "output");
    e.read.outputOption = 3;
    e.read.onExecute = function(p_bindCommand) {
        this.bind.items["acc_idx"].value = ParamGet2JSON(location.href).acc_idx;
    };
    //--------------------------------------------------------------
    $(document).ready(function () {
        e.init();
    });

    var itemBind;
    
    /*
        아이템의 명령의 엔티티에 매핑하는 구조 표현
    */
    // var itemMapping = {
    //     { [""], "read", "" }
    // };
    // bindCommand

    var mapping = {
        cmd: { read: "bind" },
        doctype: { read: ["valid", "bind"] },
        acc_idx: { 
            { read: ["valid", "bind", "output"] },
            { create: "bind"} 
        }
    };

</script>
</body>
</html>            