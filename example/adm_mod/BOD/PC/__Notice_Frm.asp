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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/bod/notice_Frm.asp?cmd=INSERT
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
	<input type="hidden" id="account_idx" name="account_idx" value="" /> 
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
                        <th scope="row">제목</th>
                        <td colspan="3">
                        	<input type="text" id="title" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">작성자 <strong class="icoRequired">필수</strong></th>
                        <td  colspan="3">
                            <input type="text" id="writer" name="writer" value="" class="fText" style="width:200px;" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">상단공지 유무</th>
                        <td>
                            <input id="top_N" type="radio" name="top_yn" value="N" class="fChk" /> 일반공지</label> 
                            <input id="top_Y" type="radio" name="top_yn" value="Y" checked class="fChk" /> 상단공지</label> 
                        </td>
                        <th scope="row">팝업공지 유무</th>
                        <td>
                            <input id="popup_N" type="radio" name="popup_yn" value="N" class="fChk" /> 일반공지</label> 
                            <input id="popup_Y" type="radio" name="popup_yn" value="Y" checked class="fChk" /> 팝업공지</label> 
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">공지내용</th>
                        <td colspan="3">
                        	<!--<input type="textarea" id="contents" name="contents" value="" class="fTextarea" style="width:600px;height:300px" />-->
                            <textarea id="contents"  class="fTextarea" style="width:600px;height:300px"></textarea>
                        </td>
                    </tr>  
                    </tbody>
                </table>
            </div>
        </div>
		<!-- 버튼 -->
		<div class="mButton gCenter">
		    <a id="btn_Insert" class="btnSubmit"><span>등록</span></a>
		    <a id="btn_Update" class="btnSubmit"><span>수정</span></a>
		    <a id="btn_Delete" class="btnSubmit"><span>삭제</span></a>
		    <a id="btn_List" class="btnSearch reset"><span>목록</span></a>
		    <a id="btn_Reset" class="btnSearch reset"><span>초기화</span></a>
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
      
<!-- 네이버 웹에디터 -->
<script type="text/javascript" src="/nhn_editor/js/service/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript">
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "contents",      // textarea id
        sSkinURI: "/nhn_editor/SmartEditor2Skin.html",
        fCreator: "createSEditor2"
    });
</script>

<script src="/Common/js/_w-meta-1.4.0.js?aa"></script>
<script src="/Admin/adm_cmn/DI/base-di.js?aa"></script>
<script src="/Admin/adm_cmn/DI/base-form-di.js?a"></script>
<script src="/Admin/adm_mod/BOD/DI/notice-form-di.js?aa"></script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelFormAjax       = _W.Meta.Bind.BindModelFormAjax;
    var NoticeFormDI             = _W.Meta.Bind.NoticeFormDI;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelFormAjax(new NoticeFormDI(), true, ItemDOM);

    e.baseUrl = "/Admin/adm_mod/BOD/Notice.C.asp";                 // 생성 및 설정
    e.first.items["listURL"].value = "Notice_Lst.asp";
    e.baseAjaxSetup.type = "POST";

    e.addItem("cmd", "", [], "bind");                               // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");

    e.read.outputOption = 3;
    
    e.read.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "READ"; 
        e.read.bind.items["ntc_idx"].value = ParamGet2JSON(location.href).ntc_idx;
    };
    e.update.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "UPDATE"; 
        oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    e.create.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "CREATE"; 
        oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    e.delete.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };
    
    //--------------------------------------------------------------
    $(document).ready(function () {
        e.init();
    });
</script>

</body>
</html>            