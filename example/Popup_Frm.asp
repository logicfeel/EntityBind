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
                        <th scope="row">제목 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="text" id="m-title" name="title" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">활성화 유무 <strong class="icoRequired">필수</strong></th>
                        <td  colspan="3">
                            <input type="radio" name="m-active_yn" value="Y"> 활성화
                            <input type="radio" name="m-active_yn" value="N"> 비활성화
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">팝업 위치(방식<strong class="icoRequired">필수</strong></th>
                        <td  colspan="3">
                            <input type="radio" name="m-type_cd" value="P"> PC
                            <input type="radio" name="m-type_cd" value="M"> 모바일
                        </td>
                    </tr>
                    <!--                    
                    <tr>
                        <th scope="row">가로 크기 (px 기준)<strong class="icoRequired">필수</strong></th>
                        <td >
                        	<input type="text" id="m-width_it" name="title" value="" class="fText"  />
                        </td>
                        <th scope="row">세로 크기 (px 기준) <strong class="icoRequired">필수</strong></th>
                        <td >
                        	<input type="text" id="m-height_it" name="title" value="" class="fText"  />
                        </td>
                    </tr>                
                    <tr>
                        <th scope="row">가로 위치<strong class="icoRequired">필수</strong></th>
                        <td  colspan="3">
                            <input type="radio" name="m-xPosition_cd" value="R"> 오른쪽
                            <input type="radio" name="m-xPosition_cd" value="C"> 중앙
                            <input type="radio" name="m-xPosition_cd" value="L"> 왼쪽
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">가로 위치<strong class="icoRequired">필수</strong></th>
                        <td  colspan="3">
                            <input type="radio" name="m-yPosition_cd" value="T"> 상단
                            <input type="radio" name="m-yPosition_cd" value="M"> 중앙
                            <input type="radio" name="m-yPosition_cd" value="B"> 하단
                        </td>
                    </tr>
                    -->
                    <tr>
                        <th scope="row">내용 </th>
                        <td colspan="3">
                        	<!-- <input type="textarea" id="answer" name="answer" value="" class="fTextarea" style="width:600px;height:300px" />-->
                            <textarea id="m-contents"  class="fTextarea" style="width:800px;height:300px"></textarea>
                            
    </form>
                            
                            

                            
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

<!-- 네이버 웹에디터 -->

<script type="text/javascript" src="/nhn_editor/js/service/HuskyEZCreator.js" charset="utf-8"></script>

<script type="text/javascript">
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "m-contents",        // textarea id
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
<script src="/Common/js/_w-meta-1.6.0.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/DGN/Service/design-popup-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/SYS/Service/-system-image-svc.js?<%=g_iRandomID%>"></script>
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
<script>
	// #######################################################################################################
	var pop = new _W.BindModelAjax(new DesignPopupService());
    var img = new _W.BindModelAjax(new SystemImageService());
	
	// 속성 설정 : pop
    pop.isLog = true;
	pop.prop["__listUrl"] = "Popup_Lst.asp";
    pop.prop["__mode"] = ParamGet2JSON(location.href).mode;
    // 속성 설정 : img
    img.items["position_cd"].value 	= "Popup";
    img.items["prefix"].value 	    = "POP-";

    // 콜백 등록 : pop
    pop.create.onExecute = function(p_bindCommand) { 
        oEditors.getById["m-contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    pop.update.onExecute = function(p_bindCommand) { 
        oEditors.getById["m-contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    pop.read.onExecuted = function(p_bindCommand, p_result) { 
        img.items["pos_idx"].value   = pop.items["pop_idx"].value;      // image 키 등록
        img.list.execute();
    };
    // 콜백 등록 : img
    img.create.onExecuted = function(p_bindCommand, p_result) { 
        var sHTML;
        if (typeof p_result !== 'undefined') {
            sHTML = "<div><img src='" + p_result.table["imgurl"] + "'></div>";
            oEditors.getById["m-contents"].exec("PASTE_HTML", [sHTML]);
        }
    };

	// 이벤트 바인딩 : pop
    $('#btn_Insert').click(pop.fn.procCreate);  // 수정
	$('#btn_Update').click(pop.fn.procUpdate);  // 수정
	$('#btn_Delete').click(pop.fn.procDelete);  // 삭제
	$('#btn_List').click(pop.fn.moveList);      // 목록 이동
	$('#btn_Reset').click(pop.fn.resetForm);    // 입력폼 초기화
    // 이벤트 바인딩 : img
    $('#btn_Upload').click(img.fn.procCreate);  // 이미지 업로드(등록)
    //--------------------------------------------------------------
	$(document).ready(function () {
        pop.init();
        img.init();

        if (pop.prop["__mode"] === "EDIT") {
            setEditMode(true);
            pop.items["pop_idx"].value  = ParamGet2JSON(location.href).pop_idx;
            img.items["pos_idx"].value   = pop.items["pop_idx"].value;      // image 키 등록
            pop.fn.procRead();
        }  else {
            setEditMode(false);
        }
    });
	console.log("______________ $.ready()");
</script>

</body>
</html>            
