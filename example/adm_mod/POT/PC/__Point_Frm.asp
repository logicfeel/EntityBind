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
                            <input type="text" id="pointName" name="pointName" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">식별코드 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="identifier" name="identifier" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
                    <tr>
                        <th scope="row">타입 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input id="method_F" type="radio" name="method_cd" value="F" checked class="fChk" /> 고정포인트 </label> 
                            <input id="method_P" type="radio" name="method_cd" value="P" class="fChk" /> 퍼센트(%)</label> 
                            <input id="method_E" type="radio" name="method_cd" value="E" class="fChk" /> 개별</label> 
                        </td> 
                        <th scope="row">사용유무</th>
                        <td>
                            <input id="use_Y" type="radio" name="use_yn" value="Y" checked class="fChk" /> 사용</label> 
                            <input id="use_N" type="radio" name="use_yn" value="N" class="fChk" /> 중지</label> 
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">퍼센트</th>
                        <td colspan="3">
                            <input type="text" id="percent_it" name="percent_it" value="" class="fText" style="width:200px;" />
                        </td>
                    </tr>                                        
                    <tr>
                        <th scope="row"> 포인트 </th>
                        <td colspan="3">
                            <input type="text" id="point_it" name="point_it" value="" class="fText" style="width:200px;" />
                        </td>
                    </tr>                                        
                    <tr>
                        <th scope="row">설명</th>
                        <td colspan="3">
                        	<input type="text" id="contents" name="contents" value="" class="fText" style="width:600px;" />
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


<script src="/Common/js/_w-meta-1.4.0.js"></script>
<script src="/Admin/adm_cmn/DI/base-di.js?aa"></script>
<script src="/Admin/adm_cmn/DI/base-form-di.js?a"></script>
<script src="/Admin/adm_mod/POT/DI/point-form-di.js"></script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelFormAjax       = _W.Meta.Bind.BindModelFormAjax;
    var PointFormDI           = _W.Meta.Bind.PointFormDI;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelFormAjax(new PointFormDI(), true, ItemDOM);

    e.baseUrl = "/Admin/adm_mod/POT/Point_Master.C.asp";                 // 생성 및 설정
    e.first.items["listURL"].value = "Point_Lst.asp";
    e.baseAjaxSetup.type = "POST";

    e.addItem("cmd", "", [], "bind");                               // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");

    e.read.outputOption = 3;

    e.read.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "READ"; 
        e.read.bind.items["pot_id"].value = ParamGet2JSON(location.href).pot_id;
    };
    e.update.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "UPDATE"; };
    e.create.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "CREATE"; };
    e.delete.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };
    //--------------------------------------------------------------
    $(document).ready(function () {
        e.init();
    });
</script>

</body>
</html>            