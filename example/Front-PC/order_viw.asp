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

	
    ' ' 기본값 지정
    ' If Len(returnUrl) = 0 Then
    '     returnUrl = "/Front/M/member/mypage.asp"
    ' End If
    
    ' ' 로그인 검사
	' If (SSID <> SID) or Len(MEB_IDX) = 0 Then
	' 	Response.Redirect "/Front/M/member/login.asp?cmd=MYPAGE&returnUrl=" & returnUrl
	' End If

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
                                <p><%=Session("MEB_NAME")%>님의</p><p> 회원등급은 <span>Family등급</span> 입니다.
                                </p><div class="btn_layer">
                                    <span class="btn_gray_list"><a href="#lyGrade" class="btn_gray_small"><em>등급혜택보기</em></a></span>

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
                                            <a href="#lyGrade" class="ly_close"><!--<img src="/data/skin/front/lady2019_C/img/common/layer/btn_layer_close.png" alt="닫기">--></a>
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


                            <div class="mypage_lately_info">
                                <div class="mypage_zone_tit">
                                    <h3>주문/배송 상세
                                    <strong class="order_num_view"></strong>
                                    </h3>
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
                                                        <span class="order_num_link">{{ord_id}}</span>
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
                                                        완료
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

                        
                        <div class="order_view_info">



            <div class="orderer_info">
                <div class="mypage_zone_tit">
                    <h4>주문자 정보</h4>
                </div>

                <div class="mypage_table_type">
                    <table class="table_left">
                        <colgroup>
                            <col style="width:15%;">
                            <col style="width:85%;">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">주문자 정보</th>
                            <td id="m-orderName"></td>
                        </tr>
                        <tr>
                            <th scope="row">주문자연락처</th>
                            <td id="m-orderTel">                                
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">이메일</th>
                            <td id="m-email"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- //orderer_info -->

            <div class="delivery_info">
                <div class="mypage_zone_tit">
                    <h4>배송지 정보</h4>
                </div>

                <div class="mypage_table_type">
                    <table class="table_left">
                        <colgroup>
                            <col style="width:15%;">
                            <col style="width:85%;">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">배송자 정보</th>
                            <td id="m-recipient"></td>
                        </tr>
                        <tr>
                            <th scope="row">주소</th>
                            <td id="m-addr">
                                
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">연락처</th>
                            <td id="m-tel">
                                
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">남기실 말씀</th>
                            <td id="m-memo"></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <!-- //delivery_info -->

            <!-- //addition_info -->

            <div class="payment_info">
                <div class="mypage_zone_tit">
                    <h4>결제정보</h4>
                </div>

                <div class="mypage_table_type">
                    <table class="table_left">
                        <colgroup>
                            <col style="width:15%;">
                            <col style="width:85%;">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">상품 합계 금액</th>
                            <td ><span id="m-order_mn">0</span>원</td>
                        </tr>
                        <tr>
                            <th scope="row">배송비</th>
                            <td>
                                <span id="m-deli_mn">0</span>원
                            </td>
                        </tr>
                        <!--
                        <tr>
                            <th scope="row">할인혜택</th>
                            <td>
                                <div class="discount_benefit">
                                    <dl>
                                        <dt>상품</dt>
                                        <dd>(-) 0원</dd>
                                    </dl>
                                    <dl>
                                        <dt>총 할인</dt>
                                        <dd>0원</dd>
                                    </dl>
                                </div>
                            </td>
                        </tr>
                        -->
                        <tr>
                            <th scope="row">할인혜택</th>
                            <td>
                                <div class="discount_benefit">
                                    <dl>
                                        <dt>포인트 사용</dt>
                                        <dd>(-) <span id="m-usePoint_it">0</span>원</dd>
                                    </dl>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">실 결제 금액</th>
                            <td><strong class="total_pay_money" id="m-pay_mn">0</strong>원
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">결제수단</th>
                            <td>
                                <div class="pay_with_list">
                                    <strong id="m-pay_method"></strong>
                                    <ul>
                                        <li id="m-bank_info"></li>
                                    </ul>

                                </div>
                            </td>
                        </tr>



                        </tbody>
                    </table>
                </div>
            </div>
            <!-- //payment_info -->


        </div>



                        
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
    var ord_id = getParamsToJSON(location.href).ord_id;
    
    isLog = true;
    
    // 속성 설정 : order
    order.items["meb_idx"].value = meb_idx;
    order.items["ord_id"].value = ord_id;

    // 콜백 등록 : member
    order.read.onExecuted = function(p_cmd, p_result) {
        var entity = p_result['table'];
        var row = entity["rows"][0];
        
        $("#m-orderName").text(row["orderName"]);
        $("#m-orderTel").text(row["orderTel"]);
        $("#m-email").text(row["email"]);
        $("#m-recipient").text(row["recipient"]);
        $("#m-addr").text(row["addr1"] + row["addr2"] );
        $("#m-tel").text(row["tel"]);
        $("#m-memo").text(row["memo"]);
        $("#m-order_mn").text(numberWithCommas(row["order_mn"]));
        $("#m-deli_mn").text(row["deli_mn"]);
        $("#m-pay_mn").text(numberWithCommas(row["pay_mn"]));
        $("#m-usePoint_it").text(numberWithCommas(row["usePoint_it"]));
        $("#m-pay_method").text(row["pay_method"]);
        $("#m-bank_info").text(row["bak_info"]);
    }; 

	// 이벤트 바인딩
	// $('#btn_Create').click(pot.fn.procCreate);   // REVIEW! onExecuted 다음에 이벤트 바인딩 검토
    
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        point.init();
        order.init();
        // point
        point.fn.procRead(meb_idx);
        // order
        order.fn.procList();
        order.fn.procRead();
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