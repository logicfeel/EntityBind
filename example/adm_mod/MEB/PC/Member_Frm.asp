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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/meb/member_Frm.asp?cmd=INSERT
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

<div style="width:950px">   
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
                        <th scope="row">아이디 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="meb_id" name="meb_id" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">비밀번호 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="password" id="passwd" name="passwd" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
                    <tr>
                        <th scope="row">대화명 </th>
                        <td colspan="3">
                            <input type="text" id="nickname" name="nickname" value="" class="fText" style="width:200px;" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">이름 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="mebName" name="mebName" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">상태 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input id="state_W" type="radio" name="state_cd" value="W" checked class="fChk" /> 대기</label> 
                            <input id="state_A" type="radio" name="state_cd" value="A" class="fChk" /> 정상</label> 
                            <input id="state_S" type="radio" name="state_cd" value="S" class="fChk" /> 중지</label> 
                            <input id="state_O" type="radio" name="state_cd" value="O" class="fChk" /> 탈퇴</label> 
                        </td>                        
                    </tr>                                                            
                    <tr>
                        <th scope="row">핸드폰 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="hp" name="hp" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">연락처 </th>
                        <td>
                            <input type="text" id="tel" name="tel" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>                                        
                    
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                        	<input type="text" id="zipcode" name="zipcode" value="" class="fText" style="width:60px;" />
                            <a id="btn_zipcode" class="btnNormal"><span>우편번호</span></a>
                            <br /><br />
                            <input type="text" id="addr1" name="addr1" value="" class="fText" style="width:600px;" />
                            <br /><br />
                            <input type="text" id="addr2" name="addr2" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">가입의견 </th>
                        <td>
                            <input type="text" id="joinComment" name="joinComment" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">가입경로 </th>
                        <td>
                            네이버
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">관리자 메모</th>
                        <td colspan="3">
                            <input type="textarea" id="memo" name="memo" value="" class="fText" style="width:600px;" />
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
<script src="/Admin/adm_mod/MEB/DI/member-form-di.js"></script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelFormAjax       = _W.Meta.Bind.BindModelFormAjax;
    var MemberFormDI           = _W.Meta.Bind.MemberFormDI;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelFormAjax(new MemberFormDI(), true, ItemDOM);

    e.baseUrl = "/Admin/adm_mod/MEB/Member.C.asp";                 // 생성 및 설정
    e.first.items["listURL"].value = "Member_Lst.asp";
    e.baseAjaxSetup.type = "POST";

    e.addItem("cmd", "", [], "bind");                               // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");

    e.read.outputOption = 3;
 
    e.read.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "READ"; 
        e.read.bind.items["meb_idx"].value = ParamGet2JSON(location.href).meb_idx;
    };
    e.update.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "UPDATE"; };
    e.create.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "CREATE"; };
    e.delete.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };

    // 우편번호 검색
    $('#btn_zipcode').click(function(e){
        popupPostCode('zipcode', 'addr1', 'addr2');
    });
    //--------------------------------------------------------------
    $(document).ready(function () {
        e.init();
    });
</script>
<!-- 우편번호 팝업창 -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
    function popupPostCode(p_zip, p_addr1, p_addr2) {
        new daum.Postcode({
            oncomplete: function(data) {
                $('#' + p_zip).val(data.zonecode);
                $('#' + p_addr1).val(data.address);
                // $('#' + p_zip)val(data.zonecode);
            }
        }).open();
    }
</script>

</body>
</html>            