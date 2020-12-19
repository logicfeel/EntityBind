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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/sto/account_Viw.asp
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

<script src="/Common/js/_w-meta-1.4.0.js"></script>
<script src="/Admin/adm_cmn/DI/base-read-di.js"></script>
<script src="/Admin/adm_mod/STO/DI/account-read-di.js"></script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelReadAjax       = _W.Meta.Bind.BindModelReadAjax;
    var AccountReadDI           = _W.Meta.Bind.AccountReadDI;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelReadAjax(new AccountReadDI(), true, ItemDOM);

    e.baseUrl = "/Admin/adm_mod/STO/callback/Account.C.asp";                 // 생성 및 설정
    e.first.items["listURL"].value = "Account_Lst.D.asp";

    e.addItem("cmd", "READ", [], "bind");                               // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");

    e.read.outputOption = 3;
    e._baseEntity.items["acc_idx"].value = ParamGet2JSON(location.href).acc_idx;
    //--------------------------------------------------------------
    $(document).ready(function () {
        e.init();
    });
</script>
</body>
</html>