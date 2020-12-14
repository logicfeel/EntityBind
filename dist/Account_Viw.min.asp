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

<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelReadAjax       = _W.Meta.Bind.BindModelReadAjax;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelReadAjax();

    e.baseUrl = "/admin/adm_mod/sto/Account.C.asp";                 // 설정
    
    e.addItem("cmd", "READ", [], "bind");
    e.addItem("doctype", "JSON", [], "bind");
    e.read.addItem("acc_idx", ParamGet2JSON(location.href).acc_idx, ["valid", "bind"]);
    e.read.add(new ItemDOM("adm_id", null, { setter: function(val) { $("#adm_id").text(val); } }), "output");
    e.read.add(new ItemDOM("passwd", null, { setter: function(val) { $("#passwd").text(val); } }), "output");
    e.read.add(new ItemDOM("admName", null, { setter: function(val) { $("#admName").text(val); } }), "output");
    e.read.add(new ItemDOM("use_yn", null, { setter: function(val) { $("#using_yn").text( val === "Y" ? "정상" : "중지"); } }), "output");
    e.read.outputOption = 3;

    $("#btn_List").click(function () {
       location.href = "Account_Lst.D.asp";;
    });
    
    $(document).ready(function () {
        e.read.execute();
    });
</script>
</body>
</html>