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
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/member.css?ts=<%=g_iRandomID%>" />

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
                        <em><a href="#" class="local_home">HOME</a> &gt; 회원가입 &gt; 정보입력</em>
                    </div>
                </div>

                <div id="sub_content">

                    <div class="content_box">
                        <div class="join_base_wrap">
                            <div class="member_tit">
                                <h2>회원가입</h2>
                                <ol>
                                    <li><span>01</span> 약관동의<span><!--<img src="/data/skin/front/lady2019_C/img/member/icon_join_step_off.png" alt="">--></span></li>
                                    <li class="page_on"><span>02</span> 정보입력<span><!--<img src="/data/skin/front/lady2019_C/img/member/icon_join_step_on.png" alt="">--></span></li>
                                    <li><span>03</span> 가입완료</li>
                                </ol>
                            </div>
                            <!-- //member_tit -->
                            <div class="member_cont">
                                <form id="formJoin" name="formJoin" action="" method="post" novalidate="novalidate">
                                    <input type="hidden" name="rncheck" value="none">
                                    <input type="hidden" name="dupeinfo" value="">
                                    <input type="hidden" name="pakey" value="">
                                    <input type="hidden" name="foreigner" value="">
                                    <input type="hidden" name="adultFl" value="">
                                    <input type="hidden" name="mode" value="join">

                                    <input type="hidden" id="m-checkMeb_id" value="">
<!--
                                    <div class="join_type_box">
                                        <h3>회원종류</h3>
                                        <div class="type_select_sec">
                                            <div class="form_element">
                                                <ul>
                                                    <li>
                                                        <input type="radio" id="memberFlDefault" name="memberFl" class="ignore" value="personal" checked="checked">
                                                        <label for="memberFlDefault" class="choice_s on">개인회원</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="memberFlBusiness" name="memberFl" class="ignore" value="business">
                                                        <label for="memberFlBusiness" class="choice_s">사업자회원</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        //type_select_sec
                                    </div>
                                    //join_type_box
--->
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
                                        <div class="member_warning">
                                            <input type="text" id="m-meb_id" name="memId" data-pattern="gdMemberId" style="width: 180px;">
                                            <button type="button" id="btn_Overlap" style="height: 31px;margin: 0 0 0 5px;padding: 0px 10px;border: 1px solid #989898;">아이디 중복검사</button>
                                            <div id="memId-error" class="text_pass" style=""></div>
                                        </div>
                                    </td>

                                </tr>
                                <tr class="">
                                    <th><span class="important">비밀번호</span></th>
                                    <td class="member_password">
                                        <div class="member_warning">
                                            <input type="password" id="m-passwd" name="memPw" autocomplete="off" placeholder="">
                                            <div id="newPassword-error" class="text_warning" style="">6~16자 영문 대 소문자, 숫자를 사용하세요.</div>                                            
                                        </div>
                                    </td>
                                </tr>
                                <tr class="">
                                    <th><span class="important">비밀번호 확인</span></th>
                                    <td>
                                        <div class="member_warning">
                                            <input type="password" id="m-passwd2" class="check-id" name="memPwRe" autocomplete="off">
                                        </div>
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
                                            <input type="text" name="email" id="m-email" value="" tabindex="-1">
                                            <select id="emailDomain" name="emailDomain" class="chosen-select">
                                                <option value="">직접입력</option>
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
                                    <!-- 회원가입/정보 사업자정보 --><div class="business_info_box dn">
                        <h3>사업자 정보</h3>
                        <div class="business_info_sec">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <colgroup>
                                    <col width="25%">
                                    <col width="75%">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th><span class="important">상호</span></th>
                                    <td>
                                        <div class="member_warning">
                                            <input type="text" name="company" value="" maxlength="50" data-pattern="gdMemberNmGlobal" class="ignore">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="important">사업자번호</span></th>
                                    <td>
                                        <div class="member_warning">
                                            <input type="text" name="busiNo" id="busiNo" data-pattern="gdNum" maxlength="10" placeholder="- -없이 입력하세요." value="" data-overlap-businofl="y" data-charlen="10" data-oldbusino="" class="ignore">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>대표자명</span></th>
                                    <td>
                                        <div class="member_warning">
                                            <input type="text" name="ceo" value="" maxlength="20" data-pattern="gdEngKor" class="ignore">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="important">주소</span></th>
                                    <td class="member_address">
                                        <div class="address_postcode">
                                            <div class="member_warning">
                                                <input type="text" name="comZonecode" readonly="readonly" value="" class="ignore"> <button type="button" id="btnCompanyPostcode" class="btn_post_search">우편번호검색</button>
                                            </div>
                                            <input type="hidden" name="comZipcode" value="" class="ignore">
                                        </div>
                                        <div class="address_input">
                                            <div class="member_warning">
                                                <input type="text" name="comAddress" readonly="readonly" value="" class="ignore">
                                            </div>
                                            <div class="member_warning js_com_address_sub">
                                                <input type="text" name="comAddressSub" value="" class="ignore">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- //business_info_sec -->
                    </div>
                    <!-- //business_info_box -->
                    <!-- 회원가입/정보 사업자정보 -->

                    <!-- 회원가입/정보 부가정보 -->
<!--
                    <div class="addition_info_box">
                        <h3>부가 정보</h3>
                        <div class="addition_info_sec">
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
                                                        <input type="radio" id="expirationFl1" name="expirationFl" value="1">
                                                        <label for="expirationFl1" class="choice_s ">1년</label>
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
                                        //member_warning
                                        

                                        <div class="member_warning_info dn">
                                            <div class="info_title">평생회원 이벤트</div>
                                            <div class="info_text">
                                                휴면회원 방지기간을 ‘탈퇴 시’로 변경하시면,<br>
                                                휴면회원으로 전환되지 않으며 고객님의 정보가 탈퇴 시까지 안전하게 보관됩니다.<br>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        //addition_info_sec
                    </div>
                    //addition_info_box
-->
                    <!-- 회원가입/정보 부가정보 -->


                                    <div class="btn_center_box">
                                        <button type="button" id="btn_Cancel" class="btn_member_cancel" onclick="location.href='/'">취소</button>
                                        <button type="button" id="btn_Create" class="btn_comfirm js_btn_join" value="회원가입">회원가입</button>
                                    </div>
                                    <!-- //btn_center_box -->
                                </form>
                            </div>
                            <!-- //member_cont -->
                        </div>
                        <!-- //join_base_wrap -->
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
    
    isLog = true;
    
    // 속성 설정
    meb.prop["__finishURL"] = "finish.asp";

    // 콜백 등록 : dspPrt
    meb.overlap.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (p_result["return"] < 0) {
            return $("#memId-error").html("");
        }
        $("#memId-error").html("사용가능한 아이디입니다.");
    };
    // 콜백 등록 : dspPrt
    meb.create.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (p_result["return"] >= 0) {
                location.href = meb.prop["__finishURL"] + "?meb_idx=" + p_result["return"] + "&mebName=" + meb.items["mebName"].value;
        }
    };
    
	// 이벤트 바인딩
	$('#btn_Create').click(meb.fn.procCreate);
	$('#btn_Overlap').click(meb.fn.procOverlap);
    
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        meb.init();
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>

</body>
</html>