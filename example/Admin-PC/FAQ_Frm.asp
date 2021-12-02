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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/bod/faq_Frm.asp?cmd=INSERT
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
                    <tr id="area_create">
                        <th scope="row">등록일자 </th>
                        <td colspan="3">
                        	<p id="m-create_dt"></p>
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">질문내용 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="text" id="m-question" name="question" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">순번 </th>
                        <td  colspan="3">
                            <input type="text" id="m-rank_it" name="rank_it" value="99" class="fText" style="width:200px;" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">코드타입 </th>
                        <td  colspan="3">
                            <input type="text" id="m-typeCode" name="typeCode" value="" class="fText" style="width:200px;" />
                        </td>
                    </tr>                    
                    <tr>
                        <th scope="row">답변내용 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<!-- <input type="textarea" id="answer" name="answer" value="" class="fTextarea" style="width:600px;height:300px" />-->
                            <textarea id="m-answer"  class="fTextarea" style="width:600px;height:300px"></textarea>
                            
                            <!-- 
                            <a href="javascript:submitContents(this)"><img src="버튼이미지" border=0></a>
                            -->
                        </td>
                    </tr>
                 
<!-- 
    '__ADD__' 추가위치 
    <tr>
        <th scope="row">코드타입 </th>
        <td  colspan="3">
            <input type="text" id="m-typeCode" name="typeCode" value="" class="fText" style="width:200px;" />
        </td>
    </tr>      
-->  
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

<script>
    function setEditMode(pIsEdit) {
        if (pIsEdit) {
            $('#btn_Insert').hide();
            $('#btn_Update').show();
            $('#btn_Delete').show();
            $('#btn_Reset').hide();
            $('#area_create').show();
        }  else {
            $('#btn_Update').hide();
            $('#btn_Delete').hide();
            $('#btn_Insert').show();
            $('#btn_Reset').show();
            $('#area_create').hide();
        }
    }
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/BOD/Service/board-faq-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var faq = new _W.BindModelAjax(new BoardFaqService());

    this.isLog = true;  // 디버깅 모드
	
	// 속성 설정
	faq.prop["__listUrl"] = "FAQ_Lst.asp";
    faq.prop["__mode"] = getParamsToJSON(location.href).mode;

	// 이벤트 바인딩
	$('#btn_Insert').click(faq.fn.procCreate);
	$('#btn_Update').click(faq.fn.procUpdate);
	$('#btn_Delete').click(faq.fn.procDelete);
	$('#btn_List').click(faq.fn.moveList);
	$('#btn_Reset').click(faq.fn.resetForm);
    //--------------------------------------------------------------
	$(document).ready(function () {
        faq.init();

        if (faq.prop["__mode"] === "EDIT") {
            setEditMode(true);
            faq.items["faq_idx"].value  = getParamsToJSON(location.href).faq_idx;
            faq.fn.procRead();
        }  else {
            setEditMode(false);
        }
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>

</body>
</html>            
