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
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/mypage.css?ts=1604047110" />
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
                        <em><a href="#" class="local_home">HOME</a> &gt; 마이페이지 &gt; 주문목록 / 배송조회</em>
                    </div>
                </div>
                
                <div id="sub_content">

                    <div class="content">
                        <div class="mypage_cont">

                            <!-- 마이페이지 회원 요약정보 -->
                            <div class="mypage_top_info">
                                <div class="mypage_top_txt">
                                    <div class="grade_txt">
                                        <p>로직님의</p><p> 회원등급은 <span>Family등급</span> 입니다.
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
                                            <a href="../mypage/coupon.php">
                                            <span><img src="/Front/PC/img/icon_coupon.png" alt=""></span>
                                            <span><em>쿠폰</em><strong>1</strong>장</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="../mypage/mileage.php">
                                            <span><img src="/Front/PC/img/icon_mileage.png" alt=""></span>
                                            <span><em>포인트</em><strong>0</strong>포인트</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- //mypage_top_wallet -->

                            </div>
                            <!-- //mypage_top_info -->

                            <!-- 마이페이지 회원 요약정보 -->
                            <div class="mypage_lately_info">
                                <div class="mypage_zone_tit">
                                    <h3>주문목록/배송조회</h3>
                                </div>

                                <div class="date_check_box">
                                    <form method="get" name="frmDateSearch">
                                        <h3> 조회기간 </h3>
                                        <div class="date_check_list" data-target-name="wDate[]">
                                            <button type="button" data-value="0">오늘</button>
                                            <button type="button" data-value="7" class="on">7일</button>
                                            <button type="button" data-value="15">15일</button>
                                            <button type="button" data-value="30">1개월</button>
                                            <button type="button" data-value="90">3개월</button>
                                            <button type="button" class="oneYear" data-value="365">1년</button>
                                        </div>
                                        <!-- //date_check_list -->
                                        <div class="date_check_calendar">
                                            <input type="text" id="picker2" name="wDate[]" class="anniversary js_datepicker" value="2020-12-29"> ~ <input type="text" name="wDate[]" class="anniversary js_datepicker" value="2021-01-05">
                                        </div>
                                        <!-- //date_check_calendar -->

                                        <button type="submit" class="btn_date_check"><em>조회</em></button>
                                    </form>
                                </div>
                                <!-- //date_check_box -->

                                <div class="mypage_lately_info_cont">
                                    <span class="pick_list_num">
                                        주문목록 / 배송조회 내역 총 <strong>1</strong> 건
                                    </span>
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
                                                <th>상품명/옵션</th>
                                                <th>상품금액/수량</th>
                                                <th>주문상태</th>
                                                <th>
                                                    확인/리뷰
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            <tr class="" data-order-no="2101051438435599" data-order-goodsno="140243" data-order-status="f2" data-order-userhandlesno="0">
                                                <td rowspan="1" class="order_day_num">
                                                    <em>2021/01/05</em>
                                                    <a href="../mypage/order_view.php?orderNo=2101051438435599" class="order_num_link"><span>2101051438435599</span></a>
                                                    <div class="btn_claim">
                                                    </div>
                                                </td>
                                                <td class="td_left">
                                                    <div class="pick_add_cont">
                                                        <span class="pick_add_img">
                                                            <a href="../goods/goods_view.php?goodsNo=1000002403"><img src="/Front/PC/img/prt.jpg" width="50" alt="★원목침대BEST★ 스칸딕 핀란드 원목침대 SS/Q" title="★원목침대BEST★ 스칸딕 핀란드 원목침대 SS/Q" class="middle"></a>
                                                        </span>
                                                        <div class="pick_add_info">

                                                            <a href="../goods/goods_view.php?goodsNo=1000002403"><em>★원목침대BEST★ 스칸딕 핀란드 원목침대 SS/Q</em></a>

                                                            <span class="text_type_cont">
                                                                사이즈 : 01 SS프레임_매트제외
                                                            </span>
                                                            <span class="text_type_cont">
                                                                색상 : 퓨어워시
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <!-- //pick_add_info -->
                                                </td>
                                                <td><strong>199,000원</strong> / 1개</td>
                                                <td>
                                                    <em>

                                                            고객결제중단

                                                    </em>
                                                    <div class="btn_gray_list">
                                                        <div>(★필독! 화물직접배송이며 지역별 일정금액 차등배송비 부과됨(하단페이지 참조))</div>
                                                    </div>
                                                </td>
                                                <td>



                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--// 주문상품 리스트 -->
                                </div>
                                <!-- //mypage_lately_info_cont -->
                            </div>
                            <!-- //mypage_lately_info -->

                            <div class="pagination">
                                <div class="pagination"><ul><li class="on"><span>1</span></li></ul></div>
                            </div>
                            <!-- //pagination -->

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
</body>
</html>