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
	<input type="hidden" id="s-area-roll" name="account_idx" value="" /> 
    </form>
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
                        <th scope="row">제목 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="text" id="m-title" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">pc 링크주소 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="text" id="m-pcLink" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>  
                    <tr>
                        <th scope="row">m 링크주소 </th>
                        <td colspan="3">
                        	<input type="text" id="m-mLink" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>  
                    <tr>
                        <th scope="row">pc 이미지 경로 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="text" id="m-pcUrl" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>  
                    <tr>
                        <th scope="row">m 이미지 경로 </th>
                        <td colspan="3">
                        	<input type="text" id="m-mUrl" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>  
                    <tr>
                        <th scope="row">활성화 여부 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="radio" name="m-active_yn" value="Y"> 활성화
                            <input type="radio" name="m-active_yn" value="N"> 비활성화
                        </td>
                    </tr>                
                    <tr id="s-area-upload" style="display:none;">
                        <th scope="row">파일업로드 </th>
                        <td  colspan="3">
                            <table>
                                <thead>
                                <tr>
                                    <th>원본이름</th>
                                    <th>경로</th>
                                    <th>처리</th>
                                </tr>
                                </thead>
                                <tbody id="s-area-img">
                                </tbody>
                                <script id="s-temp-img" type="text/x-handlebars-template">
                                    {{#rows}}
                                    <tr>
                                        <td>{{orgName}}</td>
                                        <td>{{imgUrl}} </td>
                                        <td><a id="" onClick="image.delImage('{{img_idx}}', '{{file_idx}}')" class="btnNormal" style="color:red;"><span>삭제</span></a> </td>
                                    </tr>
                                    {{/rows}} 
                                </script>           

                            </table>
                            <div ></div>

                            
                            <br/>
                            <form method="post" enctype="multipart/form-data" id="fileUploadForm">
                                <input type="file" name="upfile" id="m-upfile"> 
                                <a id="s-btn-upload" class="btnCtrl"><span>파일 업로드</span></a>
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

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/page-view.js??<%=g_iRandomID%>"></script>
<script src="/Common/js/_w-meta-1.5.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/DGN/Service/design-rolling-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/SYS/Service/system-image-svc.js?<%=g_iRandomID%>"></script>
<script>
    //--------------------------------------------------------------
	// 1. 생성 및 서비스 설정
    var roll              = new BindModelAjax();
    var image              = new BindModelAjax();
    
    roll.setService(new DesignRollingService(roll));
    image.setService(new SystemImageService(image));

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
	roll.prop["__listUrl"] 	        = "Rolling_Lst.asp";
    roll.items["roll_idx"].value    = getParamsToJSON(location.href).roll_idx;

    image.items["pos_idx"].value   = getParamsToJSON(location.href).img_idx;      // image 키 등록
    image.items["position_cd"].value 	= "Rolling";
    image.items["prefix"].value 	    = "ROL-";
    //--------------------------------------------------------------    
	// 6. 외부 호출 함수 구현

	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
        console.log('read ~');
        roll.init();
        image.init();
        
        if (roll.prop["__mode"] === "EDIT") {
            $("#s-area-upload").show();
            roll.read.execute();
            image.list.execute();
        }
	});
</script>

</body>
</html>            
