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
<!--#include virtual="/Module/ORD/TossPay.Cls.asp"-->
<!--#include virtual="/Common/include/encode.Fnc.asp"-->
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

    Dim cCart    : Set cCart = New ORD_Cart_Cls
    Dim cTossPay    : Set cTossPay = New TossPay_Cls    ' PG 전송

    If Len(CRT_IDX) = 0 Then    'CRT_IDX 값 생성 또는 얻기
        cCart.Client_id = SSID
        cCart.Meb_idx = MEB_IDX
        Call cCart.CreateId(CRT_IDX)
        
        If CRT_IDX <= 0 Then   
            ' 에러 메세지 출력        
        Else
            Session("CRT_IDX") = CRT_IDX
        End If

    End If

%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/order.css?ts=1604047110" />

    <script src="https://js.tosspayments.com/v1"></script>
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
                        <em><a href="#" class="local_home">HOME</a> &gt; 주문서 작성 / 결제</em>
                    </div>
                </div>

                <div id="sub_content">

                    <div class="content_box">
                        <form id="frmOrder" name="frmOrder" action="" method="post" target="ifrmProcess" novalidate="novalidate">
                        </form>
<!--
                            <input type="hidden" name="csrfToken" value="MTYwOTgyNDQ1MjQyNzkyNjUxNTE0MzI5OTUxMTAyMTc2NDUwMzAwNDQ3">
                            <input type="hidden" name="orderChannelFl" value="shop">
                            <input type="hidden" name="orderCountryCode" value="">
                            <input type="hidden" name="orderZipcode" value="">
                            <input type="hidden" name="orderZonecode" value="">
                            <input type="hidden" name="orderState" value="">
                            <input type="hidden" name="orderCity" value="">
                            <input type="hidden" name="orderAddress" value="">
                            <input type="hidden" name="orderAddressSub" value="">
                            <input type="hidden" name="orderPhonePrefixCode" value="kr">
                            <input type="hidden" name="orderPhonePrefix" value="82">
                            <input type="hidden" name="orderCellPhonePrefixCode" value="kr">
                            <input type="hidden" name="orderCellPhonePrefix" value="82">
                            <input type="hidden" name="receiverCountryCode" value="kr">
                            <input type="hidden" name="receiverPhonePrefixCode" value="kr">
                            <input type="hidden" name="receiverPhonePrefix" value="82">
                            <input type="hidden" name="receiverCellPhonePrefixCode" value="kr">
                            <input type="hidden" name="receiverCellPhonePrefix" value="82">
                            <input type="hidden" name="receiverState" value="">
                            <input type="hidden" name="receiverCity" value="">
                            <input type="hidden" name="chooseMileageCoupon" value="n">
                            <input type="hidden" name="chooseCouponMemberUseType" value="coupon">
                            <input type="hidden" name="totalCouponGoodsDcPrice" value="0">
                            <input type="hidden" name="totalCouponGoodsMileage" value="0">
                            <input type="hidden" name="totalMemberDcPrice" value="0">
                            <input type="hidden" name="totalMemberBankDcPrice" value="0">
                            <input type="hidden" name="totalMemberOverlapDcPrice" value="0">
                            <input type="hidden" name="deliveryFree" value="n">
                            <input type="hidden" name="totalDeliveryFreePrice" value="">
                            <input type="hidden" name="cartGoodsCnt" value="1">
                            <input type="hidden" name="cartAddGoodsCnt" value="0">
                            <input type="hidden" name="productCouponChangeLimitType" value="n">
                            <input type="hidden" name="resetMemberBankDcPrice" value="">
                            <input type="hidden" name="deliveryVisit" value="n">
                            <input type="hidden" name="returnUrl" value="/order/order.php">
-->
                        <input type="hidden" id="m-crt_idx" value="<%=CRT_IDX%>">
                        <input type="hidden" id="m-order_mn" value="0">
                        <input type="hidden" id="m-pay_mn" value="0">
                        <input type="hidden" id="m-choice_cd" value="010000">  <!-- 배송방식 -->
                     <!--<input type="hidden" id="pay_method_cd" value="P">--> <!-- 결제방식 -->
                    
                        <input type="hidden" id="m-meb_id-meb" value="">
                        <input type="hidden" id="m-mebName-meb" value="">
                        <input type="hidden" id="m-email-meb" value="">
                        <input type="hidden" id="m-hp-meb" value="">
                        <input type="hidden" id="m-zipcode-meb" value="">
                        <input type="hidden" id="m-addr1-meb" value="">
                        <input type="hidden" id="m-addr2-meb" value="">

                            <div class="order_wrap">
                                <div class="order_tit">
                                    <h2>주문서작성/결제</h2>
                                    <ol>
                                        <li><span>01</span> 장바구니 <span><!--<img src="/data/skin/front/lady2019_C/img/member/icon_join_step_off.png" alt="">--></span></li>
                                        <li class="page_on"><span>02</span> 주문서작성/결제<span><!--<img src="/data/skin/front/lady2019_C/img/member/icon_join_step_on.png" alt="">--></span></li>
                                        <li><span>03</span> 주문완료</li>
                                    </ol>
                                </div>
                                <!-- //order_tit -->
                                
                                <div class="order_banner"></div>

                                <div class="order_cont">

                                    <div class="cart_cont_list">
                                        <div class="order_cart_tit">
                                            <h3>주문상세내역</h3>
                                        </div>
                                        <!-- //order_cart_tit -->

                                        <div class="order_table_type">
                                            <!-- 장바구니 상품리스트 시작 -->
                                            <table>
                                                <colgroup>
                                                    <col>					<!-- 상품명/옵션 -->
                                                    <col style="width:5%">  <!-- 수량 -->
                                                    <col style="width:10%"> <!-- 상품금액 -->
                                                    <col style="width:13%"> <!-- 할인/적립 -->
                                                    <col style="width:10%"> <!-- 합계금액 -->
                                                    <col style="width:10%"> <!-- 배송비 -->
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>상품/옵션 정보</th>
                                                    <th>수량</th>
                                                    <th>상품금액</th>
                                                    <th>할인/적립</th>
                                                    <th>합계금액</th>
                                                    <th>배송비</th>
                                                </tr>
                                                </thead>
                                                <tbody id="s-area-list">
                                                </tbody>
                                                <script id="s-temp-list" type="text/x-handlebars-template">
                                                    {{#rows}} 
                                                    <tr class="order-goods-layout" data-goodsno="1000002403">
                                                        <td class="td_left">
                                                            
                                                            <input type="hidden" name="cartPrt" value="288226">

                                                            <input type="hidden" name="cartSno[]" value="288226">
                                                            <input type="hidden" name="memberDcInfo[1000002403][16597]" value="">
                                                            <input type="hidden" name="priceInfo[1000002403][16597]" value="{&quot;fixedPrice&quot;:&quot;599000.00&quot;,&quot;costPrice&quot;:&quot;379000.00&quot;,&quot;baseGoodsPrice&quot;:&quot;199000.00&quot;,&quot;baseOptionPrice&quot;:&quot;0.00&quot;,&quot;baseOptionTextPrice&quot;:0,&quot;goodsPrice&quot;:&quot;199000.00&quot;,&quot;optionPrice&quot;:&quot;0.00&quot;,&quot;optionCostPrice&quot;:&quot;0.00&quot;,&quot;optionTextPrice&quot;:0,&quot;goodsPriceSum&quot;:199000,&quot;optionPriceSum&quot;:0,&quot;optionTextPriceSum&quot;:0,&quot;addGoodsPriceSum&quot;:0,&quot;addGoodsVat&quot;:{&quot;supply&quot;:0,&quot;tax&quot;:0},&quot;goodsDcPrice&quot;:0,&quot;memberDcPrice&quot;:0,&quot;memberOverlapDcPrice&quot;:null,&quot;couponGoodsDcPrice&quot;:0,&quot;goodsDeliveryPrice&quot;:0,&quot;timeSalePrice&quot;:null,&quot;goodsCnt&quot;:&quot;1&quot;,&quot;goodsMemberDcPrice&quot;:0,&quot;goodsMemberOverlapDcPrice&quot;:null,&quot;goodsCouponGoodsDcPrice&quot;:0,&quot;addGoodsMemberDcPrice&quot;:0,&quot;addGoodsMemberOverlapDcPrice&quot;:0,&quot;addGoodsCouponGoodsDcPrice&quot;:0,&quot;goodsPriceSubtotal&quot;:199000,&quot;goodsVat&quot;:{&quot;supply&quot;:180910,&quot;tax&quot;:&quot;18090&quot;}}">
                                                            <input type="hidden" name="mileageInfo[1000002403][16597]" value="{&quot;goodsMileage&quot;:0,&quot;memberMileage&quot;:0,&quot;couponGoodsMileage&quot;:0,&quot;goodsGoodsMileage&quot;:0,&quot;goodsMemberMileage&quot;:0,&quot;goodsCouponGoodsMileage&quot;:0,&quot;addGoodsGoodsMileage&quot;:0,&quot;addGoodsMemberMileage&quot;:0,&quot;addGoodsCouponGoodsMileage&quot;:0,&quot;goodsCnt&quot;:&quot;1&quot;}">
                                                            <input type="hidden" class="delivery-method-fl" value="etc">
                                                            <input type="hidden" class="visit-address-use-fl" value="n">
                                                            <input type="hidden" class="delivery-method-visit-area" value="서울특별시 서초구 고무래로 6-6 (선경빌딩) 301호">
                                                            <div class="pick_add_cont">
                                                                <span class="pick_add_img">
                                                                    <a href="../shop/product.asp?prt_id={{prt_id}}"><img src="/Front/PC/img/prt.jpg" width="40" alt="{{prtName}}" title="{{prtName}}" class="middle"></a>
                                                                </span>
                                                                <div class="pick_add_info">


                                                                    <em><a href="../shop/product.asp?prt_id={{prt_id}}">{{prtName}}</a></em>

                                                                    <!-- //icon_pick_list -->

                                                                    <div class="pick_option_box">
                                                                        <span class="text_type_cont">규격 : {{optName}} </span>
                                                                    </div>

                                                                    <div class="pick_option_box">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- //pick_add_cont -->

                                                            <!-- //pick_add_list -->

                                                        </td>
                                                        <td class="td_order_amount">
                                                            <div class="order_goods_num">
                                                                <strong>{{qty_it}}개</strong>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <strong class="order_sum_txt price">{{comma_num discount_mn}}원</strong>
                                                        </td>
                                                        <td class="td_benefit">
                                                            <ul class="benefit_list">
                                                                {{comma_num point_it}}점
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <strong class="order_sum_txt">{{sum_prt}}원</strong>
                                                        </td>
                                                        <td class="td_delivery">
                                                            <strong class="order_sum_txt">{{comma_num deli_mn}}원</strong>
                                                            <p class="add_currency">{{method_msg method_cd}}</p>
                                                        </td>
                                                    </tr>
                                                    {{/rows}}
                                                </script>

                                            </table>
                                            <!-- 장바구니 상품리스트 끝 -->
                                        </div>

                                    </div>
                                    <!-- //cart_cont_list -->

                                    <div class="btn_left_box">
                                        <a href="./cart.php" class="shop_go_link"><em>&lt; 장바구니 가기</em></a>
                                    </div>

                                    <div class="price_sum">
                                        <div class="price_sum_cont">
                                            <div class="price_sum_list">
                                                <dl>
                                                    <dt>총 <strong id="s-cartCount">0</strong> 개의 상품금액 </dt>
                                                    <dd><strong id="s-prdouctTotal">0</strong>원</dd>
                                                </dl>
                                                <span><img src="/Front/PC/img/order_price_plus.png" alt="더하기"></span>
                                                <dl>
                                                    <dt>배송비</dt>
                                                    <dd><strong id="s-deliveryTotal">0</strong>원</dd>
                                                </dl>
                                                <span><img src="/Front/PC/img/order_price_total.png" alt="합계"></span>
                                                <dl class="price_total">
                                                    <dt>합계</dt>
                                                    <dd><strong id="s-cartTotal">0</strong>원
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <!-- //price_sum_cont -->
                                    </div>
                                    <!-- //price_sum -->
                                    <!-- 주문 간단 가입 시작 -->            
                                    <input type="hidden" name="simpleJoin" value="">


                                    <!-- 주문 간단 가입 끝 -->            
                                                    

                                    <div class="order_view_info">


                                        <div class="order_info">
                                            <div class="order_zone_tit">
                                                <h4>주문자 정보</h4>
                                            </div>

                                            <div class="order_table_type">
                                                <table class="table_left">
                                                    <colgroup>
                                                        <col style="width:15%;">
                                                        <col style="width:85%;">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th scope="row"><span class="important">주문하시는 분</span></th>
                                                        <td><input type="text" id="m-orderName" name="orderName"  value=""  maxlength="20">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><span class="important">휴대폰 번호</span></th>
                                                        <td>
                                                            <input type="text" id="m-orderTel" name="orderCellPhone" value="" maxlength="20">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">이메일</span></th>
                                                        <td class="member_email">
                                                            <input type="text" id="m-email" name="orderEmail" value="">

                                                            <select id="emailDomain" class="chosen-select">
                                                                <option value="">직접입력</option>
                                                                <option value="@gmail.com">gmail.com</option>
                                                                <option value="@naver.com">naver.com</option>
                                                                <option value="@hanmail.net">hanmail.net</option>
                                                                <option value="@daum.net">daum.net</option>
                                                                <option value="@nate.com">nate.com</option>
                                                                <option value="@hotmail.com">hotmail.com</option>
                                                                <option value="@icloud.com">icloud.com</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- //order_info -->

                                        <div class="delivery_info">
                                            <div class="order_zone_tit">
                                                <h4>배송정보</h4>
                                            </div>

                                            <div class="order_table_type shipping_info">
                                                <table class="table_left shipping_info_table">
                                                    <colgroup>
                                                        <col style="width:15%;">
                                                        <col style="width:85%;">
                                                    </colgroup>
                                                    <tbody>

                                                    <tr>
                                                        <th scope="row">배송지 확인</th>
                                                        <td>
                                                            <div class="form_element">
                                                                <ul>
                                                                    <li>
                                                                        <input type="radio" name="shipping" id="shippingNew">
                                                                        <label for="shippingNew" class="choice_s on">직접 입력</label>
                                                                    </li>
                                                                    <li>
                                                                        <input type="radio" name="shipping" id="shippingSameCheck">
                                                                        <label for="shippingSameCheck" class="choice_s">회원정보와 동일</label>
                                                                    </li>
                                                                </ul>
                                                                <!--
                                                                <span class="btn_gray_list"><a href="#myShippingListLayer" class="btn_gray_small btn_open_layer js_shipping"><span>배송지 관리</span></a></span>
                                                                -->
                                                                <input type="hidden" class="shipping-delivery-visit" value="n">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><span class="important">받으실분</span></th>
                                                        <td><input type="text" id="m-recipient" name="receiverName" data-pattern="gdEngKor" maxlength="20" value="" ></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><span class="important">받으실 곳</span></th>
                                                        <td class="member_address">
                                                            <div class="address_postcode">
                                                                <input type="text" id="m-zipcode" value="" name="receiverZonecode" readonly="readonly">
                                                                <input type="hidden" name="receiverZipcode">
                                                                <span id="receiverZipcodeText" class="old_post_code"></span>
                                                                <button type="button" id="m-btn_zipcode" class="btn_post_search">우편번호검색</button>
                                                            </div>
                                                            <div class="address_input">
                                                                <input type="text" id="m-addr1" value="" name="receiverAddress" readonly="readonly">
                                                                <input type="text" id="m-addr2" value="" name="receiverAddressSub">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><span class="important">받는분 연락처</span></th>
                                                        <td>
                                                            <input type="text" id="m-tel" value="" name="receiverPhone">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">남기실 말씀</th>
                                                        <td class="td_last_say"><input type="text" id="m-memo" name="orderMemo"></td>
                                                    </tr>
                                                    <tr id="memberinfoApplyTr">
                                                        <th scope="row">회원정보 반영</th>
                                                        <td>
                                                            <div class="form_element">
                                                                <div id="memberinfoApplyTr1" class="member_info_delivery">
                                                                    <input type="checkbox" id="reflectApplyDelivery" name="reflectApplyDelivery" value="y">
                                                                    <label for="reflectApplyDelivery" class="check_s"><em>나의 배송지에 추가합니다.</em></label>
                                                                </div>
                                                                <div id="memberinfoApplyTr2" class="member_info_apply">
                                                                    <input type="checkbox" id="reflectApplyMember" name="reflectApplyMember" value="y">
                                                                    <label for="reflectApplyMember" class="check_s">위 내용을 회원정보에 반영합니다. <span>(주소/전화번호/휴대폰번호)</span></label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr class="orderVisitTr dn">
                                                        <th scope="row">방문수령 정보</th>
                                                        <td>
                                                            <div class="table1">
                                                                <table>
                                                                    <colgroup>
                                                                        <col style="width:150px;">
                                                                        <col>
                                                                    </colgroup>
                                                                    <tbody>
                                                                    <tr>
                                                                        <th scope="row">방문 수령지 주소</th>
                                                                        <td>
                                                                            <span class="delivery-method-visit-area-txt"></span>
                                                                            <input type="hidden" name="visitAddress" value="">

                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row"><span class="important">방문자 정보</span></th>
                                                                        <td>
                                                                            방문자명 <input type="text" name="visitName" value="" class="text"> 방문자연락처 <input type="text" name="visitPhone" value="" class="text">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">메모</th>
                                                                        <td class="td_last_say">
                                                                            <input type="text" name="visitMemo" maxlength="250">
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- //delivery_info -->

                                        <!-- //addition_info -->

                                        <div class="payment_info">
                                            <div class="order_zone_tit">
                                                <h4>결제정보</h4>
                                            </div>

                                            <div class="order_table_type">
                                                <table class="table_left">
                                                    <colgroup>
                                                        <col style="width:15%;">
                                                        <col style="width:85%;">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th scope="row">상품 합계 금액</th>
                                                        <td>
                                                            <strong id="totalGoodsPrice2" class="order_payment_sum">0</strong>원
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">배송비</th>
                                                        <td>
                                                            <span id="totalDeliveryCharge">0</span>원
                                                            <span class="multi_shipping_text"></span>
                                                        </td>
                                                    </tr>
                                                    <tr id="rowDeliveryInsuranceFee" class="dn">
                                                        <th scope="row">해외배송 보험료</th>
                                                        <td>
                                                            <span id="deliveryInsuranceFee">0</span>원
                                                            <input type="hidden" name="deliveryInsuranceFee" value="0">
                                                        </td>
                                                    </tr>
                                                    <tr id="rowDeliverAreaCharge" class="dn">
                                                        <th scope="row">지역별 배송비</th>
                                                        <td>
                                                            <span id="deliveryAreaCharge">0</span>원
                                                            <input type="hidden" name="totalDeliveryCharge" value="0">
                                                            <input type="hidden" name="deliveryAreaCharge" value="0">
                                                        </td>
                                                    </tr>
                                                    <tr id="s-area-point" style="display:none;">
                                                        <th scope="row">포인트 사용</th>
                                                        <td>
                                                            <ul class="order_benefit_list">
                                                                <li class="order_benefit_sale">
                                                                    보유 포인트 : <strong><b class="total-member-dc-price-without-member" id="s-txt-total">0</b>원</strong> (사용 최소금액 3,000점)
                                                                </li>
                                                                <li class="order_benefit_sale">
                                                                    <input type="number" id="s-usePoint_it" value="0" name="receiverPhone"><button type="button" style="margin: 0 0 0 5px;padding: 5px 10px 5px 10px;border: 1px solid #989898;" onclick="usePoint()">적용</button>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <!--
                                                    <tr>
                                                        <th scope="row">쿠폰 사용</th>
                                                        <td>
                                                            <input type="hidden" name="couponApplyOrderNo" value="">
                                                            <input type="hidden" name="totalCouponOrderDcPrice" value="">
                                                            <input type="hidden" name="totalCouponOrderPrice" value="">
                                                            <input type="hidden" name="totalCouponOrderMileage" value="">
                                                            <input type="hidden" name="totalCouponDeliveryDcPrice" value="">
                                                            <input type="hidden" name="totalCouponDeliveryPrice" value="">
                                                            <ul class="order_benefit_list order_coupon_benefits  dn">
                                                                <li class="order_benefit_sale">
                                                                    <em>
                                                                        주문할인 : <strong>(-) <b id="useDisplayCouponDcPrice">0</b>원</strong>
                                                                    </em>
                                                                </li>
                                                                <li class="order_benefit_sale">
                                                                    <em>
                                                                        배송비할인 : <strong>(-) <b id="useDisplayCouponDelivery">0</b>원</strong>
                                                                    </em>
                                                                </li>
                                                                <li class="order_benefit_mileage js_mileage">
                                                                    <em>
                                                                        적립 포인트 : <strong>(+) <b id="useDisplayCouponMileage">0</b>포인트</strong>
                                                                    </em>
                                                                </li>
                                                            </ul>
                                                            <span class="btn_gray_list">
                                                                <button type="button" href="#couponOrderApplyLayer" class="btn_gray_mid btn_open_layer"><span>쿠폰 조회 및 적용</span></button>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <th scope="row">포인트 사용</th>
                                                        <td>
                                                            <div class="order_money_use">
                                                                <b><input type="text" name="useMileage" onblur="gd_mileage_use_check('y', 'y', 'y', 'y');" disabled="disabled"> 포인트</b>
                                                                <div class="form_element">
                                                                    <input type="checkbox" id="useMileageAll" onclick="gd_mileage_use_all();" disabled="disabled">
                                                                    <label for="useMileageAll" class="check_s">전액 사용하기</label>
                                                                    <span class="money_use_sum">(보유 포인트 : 0 포인트)</span>
                                                                </div>
                                                                <em class="money_use_txt js-mileageInfoArea"></em>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    -->
                                                    <tr>
                                                        <th scope="row">최종 결제 금액</th>
                                                        <td>
                                                            <input type="hidden" name="settlePrice" value="199000">
                                                            <input type="hidden" name="overseasSettlePrice" value="0">
                                                            <input type="hidden" name="overseasSettleCurrency" value="KRW">
                                                            <strong id="totalSettlePrice2" class="order_payment_sum">0</strong>원

                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- //payment_info -->

                                        <div class="payment_progress">
                                            <div class="order_zone_tit">
                                                <h4>결제수단 선택 / 결제</h4>
                                                <p class="js_pay_content">※ 고객님은 안전거래를 위해 현금으로 결제시 저희 쇼핑몰에서 가입한 구매안전서비스인 "토스"의 구매안전(에스크로)서비스를 이용하실 수 있습니다.</p>
                                            </div>

                                            <div class="payment_progress_list">
                                                <div class="js_pay_content">
                                                    <!-- N : 페이코결제 시작 -->
                                                    <!-- N : 페이코결제 끝 -->

                                                    <!-- N : 일반결제 시작 -->
                                                    <div id="settlekind_general" class="general_payment">
                                                        <dl>
                                                            <dt>일반결제</dt>
                                                            <dd>
                                                                <div class="form_element">
                                                                    <ul class="payment_progress_select">
                                                                        <li id="settlekindType_pc">
                                                                            <input type="radio" id="method_P" name="m-method_cd" value="P">
                                                                            <label for="method_P" class="choice_s">신용카드</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>

                                                                <!-- 신용카드 컨텐츠 -->
                                                                <div class="card" id="settlekind_general_pc" style="display: block;"></div>
                                                                <!-- //신용카드 컨텐츠 -->

                                                            </dd>
                                                        </dl>
                                                    </div>
                                                    <!-- //general_payment -->
                                                    <!-- N : 일반결제 끝 -->

                                                    <!-- N : 에스크로결제 시작 -->
                                                    <div id="settlekind_escrow" class="escrow_payment">
                                                        <dl>
                                                            <dt>에스크로결제</dt>
                                                            <dd>
                                                                <div class="form_element">
                                                                    <ul class="payment_progress_select">
                                                                        <li>
                                                                            <input type="radio" id="method_B" name="m-method_cd" value="B">
                                                                            <label for="method_B" class="choice_s">무통장 입금</label>
          

                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                    <!-- //escrow_payment -->
                                                    <!-- N : 에스크로결제 끝 -->

                                        <div id="bank_info" class="order_info" style="display:none ;">
                                            <div class="order_zone_tit">
                                                <h4>계좌 정보</h4>
                                            </div>

                                            <div class="order_table_type">
                                                <table class="table_left">
                                                    <colgroup>
                                                        <col style="width:15%;">
                                                        <col style="width:85%;">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th scope="row"><span class="important">입금 계좌 선택</span></span></th>
                                                        <td class="member_email">
                                                            <select id="m-bak_idx" class="chosen-select" style="width: 350px;font-size: medium;">
                                                                <option value="">-- 계좌 선택 --</option>
                                                                <!--<option value="1">우리은행 1005-603-234576  예금주> 송미령</option>-->
                                                                <option value="2">전북은행 523-21-0515569 예금주> 송미령</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><span class="important" onclick="orderPG()">입금명</span></span></th>
                                                        <td class="member_email">
                                                            <input type="text" id="m-depositor" name="depositor" value="" maxlength="10" style="width: 100px;">
                                                        </td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                                </div>


                                                <div id="receiptSelect" class="cash_tax_get" style="display: ;">
                                                </div>


                                                <!-- N : 현금영수증/계산서 발행 시작 -->
                                                <div id="receiptSelect" class="cash_tax_get" style="display: none;">
                                                    <dl>
                                                        <dt>현금영수증/계산서 발행</dt>
                                                        <dd>
                                                            <div class="form_element">
                                                                <ul class="payment_progress_select">
                                                                    <li id="nonReceiptView">
                                                                        <input type="radio" id="receiptNon" name="receiptFl" value="n" onclick="gd_receipt_display();">
                                                                        <label for="receiptNon" class="choice_s on">
                                                                            <div class="cash_receipt_non" style="display: none;">신청안함</div>
                                                                            <div class="cash_receipt_pg">현금영수증 (※ 결제창에서 신청)</div>
                                                                        </label>
                                                                    </li>
                                                                    <li id="taxReceiptView">
                                                                        <input type="radio" id="receiptTax" name="receiptFl" value="t" onclick="gd_receipt_display();">
                                                                        <label for="receiptTax" class="choice_s">세금계산서</label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </dd>
                                                    </dl>


                                                    <!-- N : 세금 계산서 -->
                                                    <div id="tax_info" class="tax_invoice_box js_receipt dn">
                                                        <div class="order_table_type">
                                                            <table summary="세금계산서 입력폼입니다." class="table_left">
                                                                <colgroup>
                                                                    <col style="width:15%;">
                                                                    <col style="width:35%;">
                                                                    <col style="width:15%;">
                                                                    <col style="width:35%;">
                                                                </colgroup>
                                                                <tbody>
                                                                <tr>
                                                                    <th scope="row">사업자번호</th>
                                                                    <td colspan="3"><input type="text" name="taxBusiNo" placeholder="- 없이 입력하세요" value="" maxlength="10"></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">회사명</th>
                                                                    <td><input type="text" name="taxCompany" value="" maxlength="50" data-pattern="gdMemberNmGlobal"></td>
                                                                    <th scope="row">대표자명</th>
                                                                    <td><input type="text" name="taxCeoNm" value=""></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">업태</th>
                                                                    <td><input type="text" name="taxService" value=""></td>
                                                                    <th scope="row">종목</th>
                                                                    <td><input type="text" name="taxItem" value=""></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">사업장주소</th>
                                                                    <td colspan="3" class="member_address">
                                                                        <div class="address_postcode">
                                                                            <input type="text" name="taxZonecode" value="" readonly="readonly">
                                                                            <input type="hidden" name="taxZipcode" value="">
                                                                            <span id="taxrZipcodeText" class="old_post_code"></span>
                                                                            <button type="button" onclick="gd_postcode_search('taxZonecode', 'taxAddress', 'taxZipcode');" class="btn_post_search">우편번호검색</button>
                                                                        </div>
                                                                        <div class="address_input">
                                                                            <input type="text" name="taxAddress" value="">
                                                                            <input type="text" name="taxAddressSub" value="">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <!-- //tax_invoice_box -->

                                                </div>
                                                <!-- //cash_tax_get -->
                                                <!-- N : 현금영수증/계산서 발행 끝-->

                                            </div>
                                            <!-- //payment_progress_list -->
                                            <div class="payment_final">
                                                <div class="payment_final_total">
                                                    <dl>
                                                        <dt>최종 결제 금액</dt>
                                                        <dd><span><strong id="totalSettlePrice3">0</strong>원</span></dd>
                                                    </dl>

                                                </div>
                                                <div class="payment_final_check">
                                                    <div class="form_element">
                                                        <input type="checkbox" id="termAgree_orderCheck" class="require">
                                                        <label for="termAgree_orderCheck" class="check_s"><em><b>(필수)</b> 구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.</em></label>
                                                    </div>
                                                </div>
                                                <div class="btn_center_box">
                                                    <button class="btn_order_buy order-buy" id="btn_Pay"><em>결제하기</em></button>
                                                </div>
                                            </div>
                                            <!-- //payment_final -->

                                        </div>
                                        <!-- //payment_progress -->

                                    </div>
                                    <!-- //order_view_info -->
                                </div>
                                <!-- //order_cont -->
                            </div>
                            <!-- //order_wrap -->
                        
                        <!--</form>  앞으로 이동--->
                    </div>
                    <!-- //content_box -->


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
    $('#m-btn_zipcode').click(function(e){
        popupPostCode('m-zipcode', 'm-addr1', 'm-addr2');
    });
    // 토글버튼
    $('input[name=reflectApplyDelivery]:checkbox').click(function(e){
        $(this).next('label').toggleClass('on');
    });
    $('input[name=reflectApplyMember]:checkbox').click(function(e){
        $(this).next('label').toggleClass('on');
    });
    $('input[id=termAgree_orderCheck]:checkbox').click(function(e){
        $(this).next('label').toggleClass('on');
    });
    // 배송지 선택
    $('input[name=shipping]:radio').click(function(e){
        switch ($(this).prop('id')) {
            // 신규 배송지
            case 'shippingNew':

                $("#m-recipient").val("");
                $("#m-zipcode").val("");
                $("#m-addr1").val("");
                $("#m-addr2").val("");
                $("#m-tel").val("");
                break;
                
            // 주문자정보와 동일
            case 'shippingSameCheck':
                $("#m-recipient").val( $("#m-mebName-meb").val() );
                $("#m-zipcode").val( $("#m-zipcode-meb").val() );
                $("#m-addr1").val( $("#m-addr1-meb").val() );
                $("#m-addr2").val( $("#m-addr2-meb").val() );
                $("#m-tel").val( $("#m-hp-meb").val() );
                break;
        }
        var radio_name = $(this).prop('name');
        $('input[name='+radio_name+']:radio').next('label').removeClass('on');  // 전체 초기화
        $(this).next('label').addClass('on');                                   // 선택 활성화
    });
    // 결제 방식
    $('input[name=m-method_cd]:radio').click(function(e){
        switch ($(this).prop('id')) {
            // 신용카드
            case 'method_P':
                $("#bank_info").css("display", "none");
                break;
            // 무통장
            case 'method_B':
                $("#bank_info").css("display", "block");
                break;
        }
        var radio_name = $(this).prop('name');
        $('input[name='+radio_name+']:radio').next('label').removeClass('on');  // 전체 초기화
        $(this).next('label').addClass('on');                                   // 선택 활성화
    });        
</script>    


<!-- PG 연결 -->
<script>
    // 성공시
    var clientKey = '<%=cTossPay.ClientKey%>';
    var tossPayments = TossPayments(clientKey);

    function orderPG(p_ord_id){
        tossPayments.requestPayment('카드', {
        // amount: $("#m-order_mn").val(),
        amount: order.items["pay_mn"].value,
        orderId: p_ord_id,
        orderName: '고산촌 한우',
        customerName: '고산촌',
        successUrl: window.location.origin + '/Front/PC/order/finish.asp',
        failUrl: window.location.origin + '/Front/PC/order/fail.asp',
        });
    }
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
<script src="/Front/frt_mod/ORD/Service/order-cart-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/ORD/Service/order-register-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/MEB/Service/member-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/POT/Service/point-member-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var cart = new _W.BindModelAjax(new OrderCartService());
	var order = new _W.BindModelAjax(new OrderRegisterService());
	var member = new _W.BindModelAjax(new MemberService("-meb"));
	var point = new _W.BindModelAjax(new PointMemberService());
    
    var meb_idx         = "<%=Session("MEB_IDX")%>";
    
    isLog = true;
    
    // 속성 설정
    cart.items["crt_idx"].value = "<%=CRT_IDX%>";
    cart.items["state_cd"].value = "R";            // 장바구니 (R: 주문대기)

    // 콜백 등록 : cart
    cart.list.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        cart.fn.viewSum(cart.list.output);  // 엔티티 합계

        if (p_result["return"] >= 0) {
            var _cartTotal = cart.items["_cartTotal"].value;
            var _productTotal = cart.items["_productTotal"].value;
            var _orderTotal = cart.items["_orderTotal"].value;
            var _deliveryTotal = cart.items["_deliveryTotal"].value;

            order.items["order_mn"].value = _orderTotal;
            order.items["pay_mn"].value = _orderTotal;

            $("#totalDeliveryCharge").html(numberWithCommas(_deliveryTotal));
            $("#totalGoodsPrice2").html(numberWithCommas(_productTotal));
            $("#totalSettlePrice2").html(numberWithCommas(_cartTotal));
            $("#totalSettlePrice3").html(numberWithCommas(_cartTotal));
        }
    };
    // 콜백 등록 : order
    order.create.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        var pay_method_cd = order.items["pay_method_cd"].value;
        if (p_result["return"] >= 0) {
            // 테스트용
            // location.href = "finish.asp?orderId=" + order.items["ord_id"].value + "&paymentKey=afdasfasfdadf&amount=" + $("#order_mn").val();            
            if (pay_method_cd === "P") {
                // 임시 주문등록 완료 후 PG 결제창 띄우기
                orderPG(ord_id);      
            }
        }
    };
    // 콜백 등록 : order
    order.finish.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (p_result["return"] >= 0) {
            location.href = "finish.asp?orderId=" + order.items["ord_id"].value + "&amount=" + order.items["pay_mn"].value;
        }
    };
    // 콜백 등록 : member
    member.read.onExecuted = function(p_cmd, p_result) {
        if (p_result["return"] >= 0) {
            order.items["orderName"].value  = member.items["mebName"].value;
            order.items["orderTel"].value   = member.items["hp"].value;
            order.items["email"].value      = member.items["email"].value;
            order.items["depositor"].value  = member.items["mebName"].value;
        }
    };    

    // 사용자 함수
    function usePoint() {
        var usePoint = Number($("#s-usePoint_it").val());
        var total_it = Number(point.items["total_it"].value);
        var order_mn = Number(order.items["order_mn"].value);

        if (usePoint > total_it) return alert('포인트가 부족합니다. ');
        if (usePoint < 3000) return alert('3,000점 이상 부터 사용가능합니다.');
        if (order_mn < usePoint) return alert("사용할 포인트가 사용금액보다 큽니다.");

        order_mn = order_mn - usePoint;

        order.items["usePoint_it"].value = usePoint;
        order.items["pay_mn"].value = order_mn;
        $("#totalSettlePrice2").html(numberWithCommas(order_mn));
        $("#totalSettlePrice3").html(numberWithCommas(order_mn));
    }

	// 이벤트 바인딩
	$('#btn_Pay').click(order.fn.procCreate);

    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        cart.init();
        order.init();
        // 회원
        if (meb_idx.length > 0 ) {
            $("#s-area-point").show();
            member.init();
            point.init();

            member.fn.procRead(meb_idx);
            point.fn.procRead(meb_idx);
        }
        cart.fn.procList();
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