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
                                    <span><em>포인트</em><strong id="total_it">0</strong>포인트</span>
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
                                            <strong id="state_PW">0</strong>
                                        </li>
                                        <li class="">
                                            <b>결제완료</b>
                                            <strong id="state_PF">0</strong>
                                        </li>
                                        <li class="">
                                            <b>배송확인</b>
                                            <strong id="state_DK">0</strong>
                                        </li>
                                        <li class="">
                                            <b>상품준비중</b>
                                            <strong id="state_DR">0</strong>
                                        </li>
                                        <li class="">
                                            <b>배송중</b>
                                            <strong id="state_DS">0</strong>
                                        </li>
                                        <li class="">
                                            <b>배송완료</b>
                                            <strong id="state_DF">0</strong>
                                        </li>
                                    </ol>
                                    <div class="order_case_list">
                                        <ul>
                                            <li>
                                                <b>• 취소</b>
                                                <span id="state_PC">0</span>
                                            </li>
                                            <li>
                                                <b>• 환불</b>
                                                <span id="state_RF">0</span>
                                            </li>
                                            <li>
                                                <b>• 반품</b>
                                                <span id="state_TF">0</span>
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
                                            <tbody id="list-body">
                                                <script id="list-template" type="text/x-handlebars-template">
                                                    {{#rows}} 
                                                    <tr class="" data-order-no="2101051438435599" data-order-goodsno="140243" data-order-status="f2" data-order-userhandlesno="0">
                                                        <td rowspan="1" class="order_day_num">
                                                            <em>{{date_cut create_dt}}</em>
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
                                                        <td></td>
                                                    </tr>
                                                {{/rows}} 
                                            </script>  
                                            </tbody>
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
<script src="/Common/js/_w-meta-1.5.0.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/js/page-view.js?<%=g_iRandomID%>"></script>
<script src="/Module/base/base-front-svc.js?<%=g_iRandomID%>"></script>
<script src="/Module/MEB/Service/member-mypage-svc.js?<%=g_iRandomID%>"></script>
<script>
    //--------------------------------------------------------------
	// 1. 네임스페이스 정의 및 생성
	var BindModelAjax   = _W.Meta.Bind.BindModelAjax;
	var ItemDOM         = _W.Meta.Entity.ItemDOM;

    var bm              = new BindModelAjax(ItemDOM);
    var service         = new MemberMypageService(bm);
    
    bm.setService(service, true);

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
    bm.items["meb_idx"].value = "<%=MEB_IDX%>";
    bm.read_state.outputOption = 3;
    bm.read_point.outputOption = 3;
    
	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
		bm.init();
        
        bm.read_point.execute();
        bm.read_state.execute();
        bm.list_order.execute();        
	});
</script>    
</body>
</html>
<%
    Set oRs = Nothing
    Set oDic = Nothing
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->