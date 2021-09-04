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
'
'******************************************************************************
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Define.I.asp"-->
<%	
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim SSID            : SSID 		= Session.SessionID
    Dim MEB_IDX         : MEB_IDX 	= Session("MEB_IDX")
    Dim CRT_IDX         : CRT_IDX 	= Session("CRT_IDX")
	Dim SID				: SID 		= Session("SID")

    Dim returnUrl       : returnUrl = Request("returnUrl")
    Dim cmd         	: cmd       = Request("cmd")

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim i

	If Len(returnUrl) = 0 Then returnUrl = "/Front/M/"

	If (SSID = SID) and MEB_IDX Then
		Response.Redirect returnUrl
	End If

%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/member.css?ts=1604047110" />

</head>
<!-- 
Session("MEB_IDX") : <%=Session("MEB_IDX") %>
Session("SID") : <%=Session("SID") %>
Session("MEB_NAME") : <%=Session("MEB_NAME") %>
Session("MEB_ID"):<%=Session("MEB_ID")%>,
-->
<body class="body-main body-index pc"  >
    <div id="warp">
        <div id="header_warp">
<!--#include virtual="/Front/PC/include/Header.I.asp"-->
        </div>
         <!-- //header_warp -->

        <div id="container">
            <div id="contents">
        
                <div class="location_wrap">
                    <div class="location_cont">
                        <em><a href="#" class="local_home">HOME</a> &gt; 아이디 찾기</em>
                    </div>
                </div>
                
                <div id="sub_content">

                    <div class="content_box">
                        <div class="member_wrap">
                            <div class="member_tit">
                                <h2>아이디 찾기</h2>
                            </div>
                            <!-- //member_tit -->
                            <div class="member_cont">

                                    <div class="member_login_box" style="display:;">
                                        <h3>회원 아이디 찾기</h3>
                                        <div class="login_input_sec">
                                            <div>
                                                <input type="text" id="m-mebName" name="mebName" value="" placeholder="이름" required="true" aria-required="true">
                                                <input type="text" id="m-email" name="email" value="" placeholder="가입이메일주소" required="true" aria-required="true">
                                            </div>
                                            <button id="btn_FindID" type="btn_member_id" style="background: #3e3d3c;border: 1px solid #3e3d3c;">아이디 찾기</button>
                                        </div>
                                    </div>
                                    <p class="find_msg" style="color:red;display:none;">회원정보를 찾을 수 없습니다.</p>

                                    <!-- //login_box -->
                                    <!--
                                    <div class="member_sns_login">
                                        <a href="#" class="btn_naver_login js_btn_naver_login esobtngrayM" data-naver-url="https://socialmember.godo.co.kr/NaverLogin/naver_api.php?mode=login&amp;response_type=code&amp;client_id=mS8WRP_SiSDfR3yrHq3H&amp;redirect_uri=https%3A%2F%2Fwww.lady.co.kr%2Fmain%2Fhtml.php%3Fhtmid%3Dpromotion%2Fe210104%2Fevent.html%26nac_inbc%3D195%26nac_inbs%3Dpc_201211_%25EC%2597%25B0%25EB%25A7%2590%25EA%25B2%25B0%25EC%2582%25B0&amp;state=61e6f1aea4dcfad7afa78a932a20eade">네이버 아이디 로그인</a>
                                        <a href="#" class="btn_kakao_login js_btn_kakao_login esobtngrayM" data-kakao-type="login" data-return-url="https://www.lady.co.kr/main/html.php?htmid=promotion/e210104/event.html&amp;nac_inbc=195&amp;nac_inbs=pc_201211_%EC%97%B0%EB%A7%90%EA%B2%B0%EC%82%B0"> <i class="fa fa-comment"></i> 카카오 아이디 로그인</a>
                                    </div>
                                    -->
                                    <div class="find_id_sec"  style="display:none;">
	                                    <div class="find_complete_box"><p>회원님의 아이디는 <br><strong id="meb_id"></strong> 입니다</p></div>
                                    </div>


                                    <div class="btn_login_box">
                                        <ul>
                                            <li><button id="btnJoinMember" class="btn_member_white">회원가입</button></li>
                                            <li><button id="btnFindPwd" class="btn_member_white">비밀번호 찾기</button></li>
                                            <li><button id="btnLogin" class="btn_member_white" style="background: #ed1b23;border: 1px solid #ed1b23;color: #fff;">로그인 하기</button></li>
                                        </ul>
                                    </div>
                                    <!-- //btn_login_box -->

                                <!-- //nonmember_join_box -->
                                
                            </div>
                            <!-- //member_cont -->
                        </div>
                        <!-- //member_wrap -->
                    </div>


                </div>
                <!-- //sub_content -->
            </div>
        </div>
         <!-- //container -->

        <div id="footer_wrap">
<!--#include virtual="/Front/PC/include/Footer.I.asp"-->
        </div>
        <!-- //footer_wrap --> 
    </div>

<script>

    // 회원 가입
    $('#btnJoinMember').click(function() {
        location.href = "/Front/PC/member/join.asp";
    });
    $('#btnLogin').click(function() {
        location.href = "/Front/PC/member/login.asp";
    });
    $('#btnFindPwd').click(function() {
        location.href = "/Front/PC/member/find_passwd.asp";
    });

</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/MEB/Service/member-account-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var acc = new _W.BindModelAjax(new MemberAccountService());

    isLog = true;
    
    // 콜백 등록  
    acc.find_id.onExecuted  = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (p_result["return"] < 0) {   // 없음
            $(".find_msg").show();
        } else {
            $(".find_msg").hide();
            $(".member_login_box").hide();
            $(".find_id_sec").show();
            $("#meb_id").text(acc.items["txt_meb_id"].value);
        }
    };

	// 이벤트 바인딩
	$('#btn_FindID').click(acc.fn.procReadID);
    //--------------------------------------------------------------
	$(document).ready(function () {
        acc.init();
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>


</body>
</html>
<%
    Set oRs = Nothing
    Set oDic = Nothing
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->