
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
<!--#include virtual="/Module/ORD/ORD_Cart.Cls.asp"-->
<%	
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim SSID            : SSID = Session.SessionID
    Dim MEB_IDX         : MEB_IDX = Session("MEB_IDX")
    Dim CRT_IDX         : CRT_IDX = Session("CRT_IDX")

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim i

%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/mypage.css?ts=1604047111" />
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/member.css?ts=1604047110" />
    
</head>

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
                        <em><a href="#" class="local_home">HOME</a> &gt; 마이페이지 &gt; 내정보수정</em>
                    </div>
                </div>
                
                <div id="sub_content">
                
                    <div class="content">
    
                        <div class="mypage_cont">

                            <div class="my_page">

                                <div class="mypage_zone_tit">
                                    <h2>회원정보 변경</h2>
                                </div>

                                <div class="join_base_wrap">

                                    <div class="member_cont">
                                        <form id="formJoin" name="formJoin" method="post" novalidate="novalidate">
                                            <input type="hidden" name="memNo" value="51521">
                                            <input type="hidden" name="memberFl" value="personal">
                                            <input type="hidden" name="dupeinfo" value="">
                                            <input type="hidden" name="rncheck" value="none">
                                            <input type="hidden" name="mode" value="modify">

                                            <!-- 회원가입/정보 기본정보 --><div class="base_info_box">
                        <h3>기본정보</h3>
                        <span class="important">표시는 반드시 입력하셔야 하는 항목입니다.</span>
                        <div class="base_info_sec">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <colgroup>
                                    <col width="25%">
                                    <col width="75%">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th><span class="important">아이디</span></th>
                                    <td>
                                        <input type="hidden" id="m-meb_id" value="">
                                        <p id="s-txt-meb_id"></p>
                                    </td>

                                </tr>
                                <tr class="">
                                    <th><span class="important">비밀번호</span></th>
                                    <td class="member_password">
                                        <div class="btn_common_box">
                                            <span class="btn_gray_list"><a id="btn_passwd" class="btn_gray_mid"><em>비밀번호 설정</em></a></span>
                                            <span class="btn_gray_list"><a id="btn_passwdHelp" class="btn_gray_mid"><em>비밀번호 도움말</em></a></span>
                                        </div>

                                        <div id="lyMemberPw" class="layer_area" style="display:none;">
                                            <div class="ly_wrap pw_advice_layer">
                                                <div class="ly_tit">
                                                    <strong>비밀번호 도움말</strong>
                                                </div>
                                                <div class="ly_cont">
                                                    <div class="pw_advice_list">
                                                        <ul>
                                                            <li>영문대소문자는 구분이 되며, 한가지 문자로만 입력은 위험합니다.</li>
                                                            <li><strong>사용가능 특수문자 :</strong> <strong class="fc_red">!@#$%^&amp;*()_+-=`~</strong></li>
                                                            <li>ID/주민번호/생일/전화번호 등의 개인정보와 통상 사용 순서대로의 3자 이상 연속 사용은 피해주세요.
                                                                <br>비밀번호는 주기적으로 바꾸어 사용하시는 것이 안전합니다.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <!-- //ly_cont -->
                                                <a href="#close" class="ly_close" id="btn_passwdHelp_close"><img src="/Front/PC/img/btn_layer_close.png" alt="닫기"></a>
                                            </div>
                                            <!-- //ly_wrap -->
                                        </div>
                                        <!-- //layer_area -->

                                        <div id="memberNewPw" class="member_pw_change" style="display:none;">
                                            <dl class=" dn ">
                                                <dt>현재 비밀번호</dt>
                                                <dd>
                                                    <div class="member_warning">
                                                        <input type="password" id="currentPassword" name="oldMemPw">
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>새 비밀번호</dt>
                                                <dd>
                                                    <div class="member_warning">
                                                        <input type="password" id="m-newPasswd"  name="memPw">
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>새 비밀번호 확인</dt>
                                                <dd>
                                                    <div class="member_warning">
                                                        <input type="password" id="m-newPasswd2"  name="memPwRe">
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                        <!-- //member_pw_change -->
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="important">이름</span></th>
                                    <td>
                                        <div class="member_warning">
                                            <input type="text" id="m-mebName" name="memNm" data-pattern="gdMemberNmGlobal" value="" maxlength="30">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="important">이메일</span></th>
                                    <td class="member_email">
                                        <div class="member_warning">
                                            <input type="text" id="email" style="display:none;">
                                            <input type="text" id="m-email">
                                            <select id="emailDomain" name="emailDomain" class="chosen-select">
                                                <option value="self">직접입력</option>
                                                <option value="@gmail.com">gmail.com</option>
                                                <option value="@naver.com">naver.com</option>
                                                <option value="@hanmail.net">hanmail.net</option>
                                                <option value="@daum.net">daum.net</option>
                                                <option value="@nate.com">nate.com</option>
                                                <option value="@hotmail.com">hotmail.com</option>
                                                <option value="@icloud.com">icloud.com</option>
                                            </select>
                                        </div>
                                        <div class="member_warning js_email"></div>
                                        <div class="form_element">
                                            <input type="checkbox" id="maillingFl" name="maillingFl" value="y">
                                            <label for="maillingFl" class="check_s ">정보/이벤트 메일 수신에 동의합니다.</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="important">휴대폰번호</span></th>
                                    <td class="member_address">
                                        <div class="address_postcode">
                                            <input type="text" id="m-hp" name="cellPhone" maxlength="12" placeholder="- 없이 입력하세요." data-pattern="gdNum" value="">
                                        </div>
                                        <div class="form_element">
                                            <input type="checkbox" id="hp_yn" name="smsFl" value="y">
                                            <label for="hp_yn" class="check_s ">정보/이벤트 SMS 수신에 동의합니다.</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>주소</span></th>
                                    <td class="member_address">
                                        <div class="address_postcode">
                                            <div class="member_warning">
                                                <input type="text" id="m-zipcode" name="comZonecode" readonly="readonly" value="" class="ignore"> <button type="button" id="btn_zipcode" class="btn_post_search">우편번호검색</button>
                                            </div>
                                            <input type="hidden" name="comZipcode" value="" class="ignore">
                                        </div>
                                        <div class="address_input">
                                            <div class="member_warning">
                                                <input type="text" id="m-addr1" name="comAddress" readonly="readonly" value="" class="ignore">
                                            </div>
                                            <div class="member_warning js_com_address_sub">
                                                <input type="text" id="m-addr2" name="comAddressSub" value="" class="ignore">
                                            </div>
                                        </div>
                                    </td>
                                </tr>                                                                
                                </tbody>
                            </table>
                        </div>
                        <!-- //base_info_sec -->
                    </div>
                    <!-- //base_info_box --><!-- 회원가입/정보 기본정보 -->
                                            <!-- 회원가입/정보 사업자정보 --><!-- 회원가입/정보 사업자정보 -->
                                            <!-- 회원가입/정보 부가정보 --><div class="addition_info_box">
                        
                        <!--<h3>부가 정보</h3>-->
                        <div class="addition_info_sec" style="display:none;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <colgroup>
                                    <col width="25%">
                                    <col width="75%">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th><span>추천인 아이디</span></th>
                                    <td>
                                        <div class="member_warning">
                                            <input type="text" id="recommId" name="recommId" value="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="important">휴면회원 방지기간</span></th>
                                    <td>
                                        <div class="member_warning">
                                            <div class="form_element">
                                                <ul>
                                                    <li>
                                                        <input type="radio" id="expirationFl1" name="expirationFl" value="1" checked="checked">
                                                        <label for="expirationFl1" class="choice_s on">1년</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="expirationFl3" name="expirationFl" value="3">
                                                        <label for="expirationFl3" class="choice_s ">3년</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="expirationFl5" name="expirationFl" value="5">
                                                        <label for="expirationFl5" class="choice_s ">5년</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="expirationFl0" name="expirationFl" value="999">
                                                        <label for="expirationFl0" class="choice_s ">탈퇴 시</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- //member_warning -->
                                        
                                        <!-- 평생회원 이벤트 안내문구 -->
                                        <div class="member_warning_info dn">
                                            <div class="info_title">평생회원 이벤트</div>
                                            <div class="info_text">
                                                휴면회원 방지기간을 ‘탈퇴 시’로 변경하시면,<br>
                                                휴면회원으로 전환되지 않으며 고객님의 정보가 탈퇴 시까지 안전하게 보관됩니다.<br>
                                            </div>
                                        </div>
                                        <!-- 평생회원 이벤트 안내문구 -->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- //addition_info_sec -->
                    </div>
                    <!-- //addition_info_box -->


                    <!-- 회원가입/정보 부가정보 -->

                                            <div class="btn_center_box">
                                                <button type="button" class="btn_member_cancel" onclick="location.href='/'">취소</button>
                                                <button type="button" id="btn_Update" class="btn_comfirm js_btn_join" value="정보수정">정보수정</button>
                                            </div>
                                            <!-- //btn_center_box -->
                                        </form>
                                    </div>
                                    <!-- //member_cont -->
                                </div>
                                <!-- //join_base_wrap -->

                            </div>
                            <!-- //my_page -->

                        </div>
                        <!-- //mypage_cont -->

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


<!-- 화면 이벤트 -->
<script>
    // 이메일 주소 삽입
    $("#emailDomain").change(function () {
        var email = $("#m-email").val();
        $("#m-email").val(email + this.value);
    });
    // 우편번호 검색
    $('#btn_zipcode').click(function(e){
        popupPostCode('m-zipcode', 'm-addr1', 'm-addr2');
    });
    // 하위 체크박스
    $('input[id=maillingFl]:checkbox').click(function(e){
        $(this).next('label').toggleClass('on');
    });
    $('input[id=hp_yn]:checkbox').click(function(e){
        $(this).next('label').toggleClass('on');
    });
    // 비밀번호 도움말
    $('#btn_passwd').click(function(e){
        $("#memberNewPw").css("display", "");
    });
    $('#btn_passwdHelp').click(function(e){
        $("#lyMemberPw").css("display", "");
    });
    $('#btn_passwdHelp_close').click(function(e){
        $("#lyMemberPw").css("display", "none");
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

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/MEB/Service/member-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var meb = new _W.BindModelAjax(new MemberService());

    var meb_idx     = "<%=Session("MEB_IDX")%>";
    
    isLog = true;
    
    // 속성 설정
    meb.items["meb_idx"].value = meb_idx;

	// 이벤트 바인딩
	$('#btn_Update').click(meb.fn.procUpdate);
    //--------------------------------------------------------------
	$(document).ready(function () {
        meb.init();
        meb.fn.procRead();
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>


</body>
</html>