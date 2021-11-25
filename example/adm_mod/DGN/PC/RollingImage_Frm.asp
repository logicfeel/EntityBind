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
	<input type="hidden" id="m-roll_idx" value="" /> 
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
                        <th scope="row">pc 링크주소 </th>
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
                        <th scope="row">pc 이미지 경로 </th>
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
                                        <td><a id="" onClick="img.fn.procDelete('{{img_idx}}', '{{file_idx}}')" class="btnNormal" style="color:red;"><span>삭제</span></a> </td>
                                    </tr>
                                    {{/rows}} 
                                </script>           

                            </table>
                            <div ></div>

                            
                            <br/>
                            <form method="post" enctype="multipart/form-data" id="fileUploadForm">
                                <input type="file" name="upfile" id="m-upfile"> 
                                <a id="btn_Upload" class="btnCtrl"><span>파일 업로드</span></a>
                            </form>
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
    
    <!--
    <form method="post" enctype="multipart/form-data" id="fileUploadForm">
        <input type="file" name="upfile" id="m-upfile">
    </form>
    -->

</div>        

<script>
    function setEditMode(pIsEdit) {
        if (pIsEdit) {
            $('#btn_Insert').hide();
            $('#btn_Update').show();
            $('#btn_Delete').show();
            $('#btn_Reset').hide();
            $('#area_create').show();
            $("#s-area-upload").show();
        }  else {
            $('#btn_Update').hide();
            $('#btn_Delete').hide();
            $('#btn_Insert').show();
            $('#btn_Reset').show();
            $('#area_create').hide();
            $("#s-area-upload").hide();
        }
    }
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/DGN/Service/design-rolling-image-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/SYS/Service/system-image-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var roll = new _W.BindModelAjax(new DesignRollingImageService());
    var img = new _W.BindModelAjax(new SystemImageService());

    this.isLog = true;  // 디버깅 모드

	// 속성 설정 : roll
	roll.prop["__listUrl"] = "RollingImage_Lst.asp";
    roll.prop["__mode"] = ParamGet2JSON(location.href).mode;
    roll.items["roll_idx"].value = getParamsToJSON(location.href).roll_idx;

	// 이벤트 바인딩 : roll
    $('#btn_Insert').click(roll.fn.procCreate);  // 수정
	$('#btn_Update').click(roll.fn.procUpdate);  // 수정
	$('#btn_Delete').click(roll.fn.procDelete);  // 삭제
	$('#btn_List').click(roll.fn.moveList);      // 목록 이동
	$('#btn_Reset').click(roll.fn.resetForm);    // 입력폼 초기화
    // 이벤트 바인딩 : img
    $('#btn_Upload').click(img.fn.procCreate);  // 이미지 업로드(등록)
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        roll.init();
        img.init();

        if (roll.prop["__mode"] === "EDIT") {
            setEditMode(true);
            // roll
            roll.items["roll_idx"].value  = ParamGet2JSON(location.href).roll_idx;
            roll.fn.procRead();
            // img
            img.items["position_cd"].value = "Rolling";
            img.items["prefix"].value = "ROL-";
            img.items["pos_idx"].value = getParamsToJSON(location.href).img_idx;
            img.fn.procList();
        }  else {
            setEditMode(false);
        }
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>

</body>
</html>            
