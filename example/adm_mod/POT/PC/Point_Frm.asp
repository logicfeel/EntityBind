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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/pot/point_Frm.asp?cmd=INSERT
'
'******************************************************************************
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Define.I.asp"-->
<%	


	
%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
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
                        <th scope="row">포인트명 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="m-pointName" name="pointName" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">식별코드 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="m-identifier" name="identifier" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
                    <tr>
                        <th scope="row">타입 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input id="method_F" type="radio" name="m-method_cd" value="F" checked class="fChk" /> 고정포인트 </label> 
                            <input id="method_P" type="radio" name="m-method_cd" value="P" class="fChk" /> 퍼센트(%)</label> 
                            <input id="method_E" type="radio" name="m-method_cd" value="E" class="fChk" /> 개별</label> 
                        </td> 
                        <th scope="row">사용유무 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input id="use_Y" type="radio" name="m-use_yn" value="Y" checked class="fChk" /> 사용</label> 
                            <input id="use_N" type="radio" name="m-use_yn" value="N" class="fChk" /> 중지</label> 
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">퍼센트</th>
                        <td colspan="3">
                            <input type="text" id="m-percent_it" name="percent_it" value="" class="fText" style="width:200px;" />%
                        </td>
                    </tr>                                        
                    <tr>
                        <th scope="row"> 포인트 </th>
                        <td colspan="3">
                            <input type="text" id="m-point_it" name="point_it" value="" class="fText" style="width:200px;" />점
                        </td>
                    </tr>                                        
                    <tr>
                        <th scope="row">설명</th>
                        <td colspan="3">
                        	<input type="text" id="m-contents" name="contents" value="" class="fText" style="width:600px;" />
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
<script src="/Admin/adm_mod/POT/Service/point-master-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var pot = new _W.BindModelAjax(new PointMasterService());

    this.isLog = true;  // 디버깅 모드
	
	// 속성 설정
	pot.prop["__listUrl"] = "Point_Lst.asp";
    pot.prop["__mode"] = getParamsToJSON(location.href).mode;

	// 이벤트 바인딩
	$('#btn_Insert').click(pot.fn.procCreate);
	$('#btn_Update').click(pot.fn.procUpdate);
	$('#btn_Delete').click(pot.fn.procDelete);
	$('#btn_List').click(pot.fn.moveList);
	$('#btn_Reset').click(pot.fn.resetForm);
    //--------------------------------------------------------------
	$(document).ready(function () {
        pot.init();

        if (pot.prop["__mode"] === "EDIT") {
            setEditMode(true);
            pot.items["pot_id"].value  = getParamsToJSON(location.href).pot_id;
            pot.fn.procRead();
        }  else {
            setEditMode(false);
        }
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>

</body>
</html>            