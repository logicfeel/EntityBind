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

	
    ' 기본값 지정
    If Len(returnUrl) = 0 Then
        returnUrl = "/Front/PC/member/mypage.asp"
    End If
    
    ' 로그인 검사
	If (SSID <> SID) or Len(MEB_IDX) = 0 Then
		Response.Redirect "/Front/PC/member/login.asp?cmd=MYPAGE&returnUrl=" & returnUrl
	End If

%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/mypage.css?ts=1604047111" />

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
                        <em><a href="#" class="local_home">HOME</a> &gt; 마이페이지</em>
                    </div>
                </div>
                
                <div id="sub_content">

                    <div class="content">
                        <div class="mypage_main">

                            <!-- 마이페이지 회원 요약정보 -->
                            <div class="mypage_top_info">
                        <div class="mypage_top_txt">
                            <div class="grade_txt">
                                <!--
                                <p>안녕하세요<%=Session("MEB_NAME")%>님의</p><p> 회원등급은 <span>Family등급</span> 입니다.
                                -->
                                
                                <p>안녕하세요<span><%=Session("MEB_NAME")%>님</span></p>
                                <p> 감사합니다. </p>
                                
                                </p><div class="btn_layer">
                                    <!--
                                    <span class="btn_gray_list"><a href="#lyGrade" class="btn_gray_small"><em>등급혜택보기</em></a></span>
                                    -->

                                    <!-- N : 회원등급혜택 레이어 시작 -->
                                    <div id="lyGrade" class="layer_area" style="display:none;">
                                        <div class="ly_wrap grade_layer">
                                            <div class="ly_tit">
                                                <strong>등급혜택 안내</strong>
                                            </div>
                                            <div class="ly_cont">
                                                <div class="grade_list">
                                                    <dl>
                                                        <dt>회원 등급</dt>
                                                        <dd>Family등급</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>추가 할인</dt>
                                                        <dd><strong>0원이상 구매시 상품 판매금액의 0.0% 추가 할인</strong></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>중복 할인</dt>
                                                        <dd><strong>0원이상 구매시 상품 판매금액의 0.0% 추가 할인</strong></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>추가  적립</dt>
                                                        <dd>1,000원이상 구매 시 구매금액당 0.0% 추가 적립</dd>
                                                    </dl>
                                                </div>
                                            </div>
                                            <!-- //ly_cont -->
                                            <a href="#lyGrade" class="ly_close"><img src="/data/skin/front/lady2019_C/img/common/layer/btn_layer_close.png" alt="닫기"></a>
                                        </div>
                                        <!-- //ly_wrap -->
                                    </div>
                                    <!-- N : 회원등급혜택 레이어 끝 -->

                                </div>
                            </div>
                            <!-- //grade_txt -->
                        </div>
                        <!-- //mypage_top_txt -->

                        <div class="mypage_top_wallet">
                            <ul>
                                <li>
                                    <!--<a href="../mypage/coupon.php">-->
                                    <span><img src="/Front/PC/img/icon_coupon.png" alt=""></span>
                                    <span><em>쿠폰</em><strong>0</strong>장</span>
                                    </a>
                                </li>
                                <li>
                                    <!--<a href="../mypage/mileage.php">-->
                                    <span><img src="/Front/PC/img/icon_mileage.png" alt=""></span>
                                    <span><em>포인트</em><strong id="s-txt-total">0</strong>포인트</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- //mypage_top_wallet -->

                    </div>
                    <!-- //mypage_top_info -->

                            <!--// 마이페이지 회원 요약정보 -->


                            <div class="mypage_order_info">
                                <div class="mypage_zone_tit">
                                    <h3>진행 중인 주문<span>최근 30일 내에 진행중인 주문정보입니다.</span></h3>
                                </div>
                                <div class="mypage_order_info_cont">
                                    <ol>
                                        <li class="">
                                            <b>입금대기</b>
                                            <strong id="m-state_PW">0</strong>
                                        </li>
                                        <li class="">
                                            <b>결제완료</b>
                                            <strong id="m-state_PF">0</strong>
                                        </li>
                                        <li class="">
                                            <b>배송확인</b>
                                            <strong id="m-state_DK">0</strong>
                                        </li>
                                        <li class="">
                                            <b>상품준비중</b>
                                            <strong id="m-state_DR">0</strong>
                                        </li>
                                        <li class="">
                                            <b>배송중</b>
                                            <strong id="m-state_DS">0</strong>
                                        </li>
                                        <li class="">
                                            <b>배송완료</b>
                                            <strong id="m-state_DF">0</strong>
                                        </li>
                                    </ol>
                                    <div class="order_case_list">
                                        <ul>
                                            <li>
                                                <b>• 취소</b>
                                                <span id="m-state_PC">0</span>건
                                            </li>
                                            <li>
                                                <b>• 환불</b>
                                                <span id="m-state_RF">0</span>건
                                            </li>
                                            <li>
                                                <b>• 반품</b>
                                                <span id="m-state_TF">0</span>건
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- //mypage_order_info_cont -->
                            </div>
                            <!-- //mypage_order_info -->

                            <div class="mypage_lately_info">
                                <div class="mypage_zone_tit">
                                    <h3>최근 주문 정보<span>최근 30일 내에 주문하신 내역입니다.</span></h3>
                                </div>

                                <div class="mypage_lately_info_cont">
                                    <!-- 주문상품 리스트 -->
                                    <div class="mypage_table_type">
                                        <table>
                                            <colgroup>
                                                <col style="width:15%"> <!-- 날짜/주문번호 -->
                                                <col>					<!-- 상품명/옵션 -->
                                                <col style="width:15%"> <!-- 상품금액/수량 -->
                                                <col style="width:15%"> <!-- 주문상태 -->
                                                <col style="width:15%"> <!-- 확인/리뷰 -->
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>날짜/주문번호</th>
                                                <th>상품명/옵션/수량</th>
                                                <th>주문금액</th>
                                                <th>주문상태</th>
                                                <th>
                                                    확인/한줄평
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody id="s-area-list"></tbody>
                                            <script id="s-temp-list" type="text/x-handlebars-template">
                                                {{#rows}} 
                                                <tr class="" data-order-no="2101051438435599" data-order-goodsno="140243" data-order-status="f2" data-order-userhandlesno="0">
                                                    <td rowspan="1" class="order_day_num">
                                                        <em>{{create_dt}}</em>
                                                        <!-- <a href="../mypage/order_view.php?orderNo=2101051438435599" target="_blank" class="order_num_link"><span>{{ord_id}}</span></a>-->
                                                        <span class="order_num_link"><a href="order_viw.asp?ord_id={{ord_id}}">{{ord_id}}</a></span>
                                                        <div class="btn_claim">
                                                        </div>
                                                    </td>
                                                    <td class="td_left">
                                                        <div class="pick_add_cont">
                                                            <span class="pick_add_img">
                                                                <img src="/Front/PC/img/prt.jpg" width="50" class="middle"></a>
                                                            </span>
                                                            <div class="pick_add_info">
                                                                {{prt_info}}
                                                                <!--<a href="../goods/goods_view.php?goodsNo=1000002403"><em>{{prt_info}}</em></a>-->
                                                                <!--
                                                                <span class="text_type_cont">
                                                                    규격 : 1++ (600g)
                                                                </span>
                                                                -->
                                                            </div>
                                                        </div>
                                                        <!-- //pick_add_info -->
                                                    </td>
                                                    <td><strong>{{comma_num order_mn}}원</strong></td>
                                                    <td>
                                                        <em>
                                                                결제 : {{pay_state}}
                                                        </em>
                                                        <div class="btn_gray_list">
                                                            <div>배송 : {{deli_state}}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                    {{#if opinion}}
                                                        <button class="s-btn_opinion review_form__submit js-review-form-submit" name="s-btn-op_view" row_count="{{row_count}}" type="button" >
                                                            <span class="review_form__submit_title_icon fa fa-check-circle-o"></span>
                                                            <span class="review_form__post_review_label">확인</span>
                                                        </button>
                                                    {{else}}
                                                        <button class="s-btn_opinion review_form__submit js-review-form-submit" name="s-btn-opinion" row_count="{{row_count}}" type="button" data-disable-with="저장 중...">
                                                            <span class="review_form__submit_title_icon fa fa-check-circle-o"></span>
                                                            <span class="review_form__post_review_label">한줄평 쓰기</span>
                                                        </button>
                                                    {{/if}}
                                                    </td>
                                                </tr>
                                                <tr style="display:none;" id="area_opinion_{{row_count}}" name="s-area-opinion" row_count="{{row_count}}">
                                                    <td>
                                                        <input type="hidden" id="ord_id_{{row_count}}" name="m-ord_id" row_count="{{row_count}}" value="{{ord_id}}">
                                                        <select id="grade_cd_{{row_count}}" name="m-grade_cd" row_count="{{row_count}}" class="chosen-select" >
                                                        <option value="5">★★★★★</option>
                                                        <option value="4">★★★★</option>
                                                        <option value="3">★★★</option>
                                                        <option value="2">★★</option>
                                                        <option value="1">★</option>
                                                        </select>
                                                    </td>
                                                    <td colspan="3">
                                                        <input type="text" id="contents_{{row_count}}" row_count="{{row_count}}" name="m-contents" value="" class="ignore" style="width:600px;">
                                                    </td>
                                                    <td>
                                                        <a href="#" class="s-btn-create" name="s-btn-create" row_count="{{row_count}}">한줄평 등록하기</a>
                                                    </td>
                                                </tr>
                                                <tr style="display:none;" name="s-area-op_view" row_count="{{row_count}}">
                                                    <td>
                                                    {{grade_mark grade_cd}}
                                                    </td>
                                                    <td colspan="3">
                                                    {{contents}}
                                                    </td>
                                                    <td>
                                                        <!--
                                                        <a href="#" class="s-btn-create" name="s-btn-update" row_count="{{row_count}}">한줄평 수정</a>
                                                        -->
                                                    </td>
                                                </tr>
                                                {{/rows}} 
                                            </script>

                                        </table>
                                    </div>
                                    <!--// 주문상품 리스트 -->
                                </div>
                                <!-- //mypage_lately_info_cont -->
                                <!--<a href="orderInfo.asp" class="btn_board_more">+ more</a>-->
                            </div>
          

                            <div id="activationInfo" class="mypage_lately_info" style="margin-top:50px;"></div>
                            <!-- //mypage_lately_info -->

                        </div>
                        <!-- //mypage_main -->

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

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/POT/Service/point-member-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/ORD/Service/order-user-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var order = new _W.BindModelAjax(new OrderUserService());
    var point = new _W.BindModelAjax(new PointMemberService());

    var meb_idx     = "<%=MEB_IDX%>";
    
    isLog = true;
    
    // 속성 설정
    order.items["page_size"].value = 0;	// 모두 보기

    // 콜백 등록 : member
    order.list.onExecuted = function(p_cmd, p_result) {
	    $('[name=s-btn-opinion]').click(order.fn.formOpinion);
	    $('[name=s-btn-op_view]').click(order.fn.viewOpinion);
	    $('[name=s-btn-create]').click(order.fn.procCreateOpinion);
    }; 

	// 이벤트 바인딩
	// $('#btn_Create').click(pot.fn.procCreate);   // REVIEW! onExecuted 다음에 이벤트 바인딩 검토
    
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        point.init();
        order.init();

        point.fn.procRead(meb_idx);
        order.fn.procReadState(meb_idx);
        order.fn.procList();
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