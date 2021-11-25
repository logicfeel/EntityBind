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
                    <tr>
                        <th scope="row">문의날짜 </th>
                        <td>
                            <p id="m-create_dt"></p>
                        </td>
                        <th scope="row">답변일자 </th>
                        <td>
                            <p id="m-answer_dt"></p>
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">상품명 </th>
                        <td colspan="3">
                        	<p id="m-prtName"></p>
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">문의제목 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="text" id="m-title" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">작성자 <strong class="icoRequired">필수</strong></th>
                        <td>
                        	<input type="text" id="m-writer" name="title" value="" class="fText" />
                        </td>
                        <th scope="row">회원ID </th>
                        <td>
                            <p id="m-meb_id"></p>
                        </td>
                    </tr>
                    <!--                
                    <tr>
                        <th scope="row">공개 여부 <strong class="icoRequired">필수</strong></th>
                        <td>
                        	<input type="radio" name="m-open_yn" value="Y"> 공개
                            <input type="radio" name="m-open_yn" value="N"> 비공개
                        </td>
                        <th scope="row">비밀번호 </th>
                        <td>
                            <input type="password" id="m-passwd" name="title" value="" class="fText" />
                        </td>
                    </tr>                
                    -->
                    <tr>
                        <th scope="row">답변상태 <strong class="icoRequired">필수</strong></th>
                        <td  colspan="3">
                            <input type="radio" name="m-state_cd" value="R"> 문의접수
                            <input type="radio" name="m-state_cd" value="W"> 답변대기
                            <input type="radio" name="m-state_cd" value="F"> 답변완료
                            <input type="radio" name="m-state_cd" value="D"> 답변삭제(숨김)
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">문의내용 </th>
                        <td colspan="3">
                        	<!-- <input type="textarea" id="answer" name="answer" value="" class="fTextarea" style="width:600px;height:300px" />-->
                            <!--
                            <textarea id="m-contents"  class="fTextarea" style="width:800px;height:200px"></textarea>
                            -->
                            <p id="m-contents"></p>

                        </td>
                    </tr>  

                    <tr>
                        <th scope="row">답변내용 </th>
                        <td colspan="3">
                        	<!-- <input type="textarea" id="answer" name="answer" value="" class="fTextarea" style="width:600px;height:300px" />-->
                            <textarea id="m-answer"  class="fTextarea" style="width:800px;height:300px"></textarea>
                            
    </form>
                            
                            
                        </td>
                    </tr>  
                    </tbody>
                </table>
            </div>
        </div>
		<!-- 버튼 -->
		<div class="mButton gCenter">
		    <a id="s-btn-insert" class="btnSubmit"><span>등록</span></a>
		    <a id="s-btn-update" class="btnSubmit"><span>수정</span></a>
		    <a id="s-btn-delete" class="btnSubmit"><span>삭제</span></a>
		    <a id="s-btn-list" class="btnSearch reset"><span>목록</span></a>
		    <a id="s-btn-reset" class="btnSearch reset"><span>초기화</span></a>
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
    
    <!--
    <form method="post" enctype="multipart/form-data" id="fileUploadForm">
        <input type="file" name="upfile" id="m-upfile">
    </form>
    -->

</div>        

<!-- 네이버 웹에디터 -->
<script type="text/javascript" src="/nhn_editor/js/service/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript">
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "m-answer",        // textarea id
        sSkinURI: "/nhn_editor/SmartEditor2Skin.html",
        fCreator: "createSEditor2",
        fOnAppLoad : function(){
        //예제 코드
        //oEditors.getById["content"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
            // var sHTML = '<span style="color:#FF0000;">저장</span>';
            // oEditors.getById["answer"].exec("PASTE_HTML", [sHTML]);
        },        
    });
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/page-view.js??<%=g_iRandomID%>"></script>
<script src="/Common/js/_w-meta-1.5.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/PRT/Service/product-qna-svc.js?<%=g_iRandomID%>"></script>
<script>
    //--------------------------------------------------------------
	// 1. 생성 및 서비스 설정
    var qna              = new BindModelAjax();

    
    qna.setService(new ProductQnaService(qna));

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
	qna.prop["__listUrl"] 	        = "QnA_Lst.asp";
    
    //--------------------------------------------------------------    
	// 6. 외부 호출 함수 구현
    qna.create.onExecute = function(p_bindCommand) { 
        oEditors.getById["m-answer"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터

    };
    qna.update.onExecute = function(p_bindCommand) { 
        oEditors.getById["m-answer"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };

	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
		qna.init();
        if (qna.prop["__mode"] === "EDIT") {
            qna.read.execute();
        }
	});
</script>

</body>
</html>            
