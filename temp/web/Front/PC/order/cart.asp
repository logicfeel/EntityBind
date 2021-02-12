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

    Dim cCart    : Set cCart = New ORD_Cart_Cls

    If Len(CRT_IDX) = 0 or Len(MEB_IDX) Then    'CRT_IDX 값 생성 또는 얻기
        cCart.Client_id = SSID
        cCart.Meb_idx = MEB_IDX
        Call cCart.CreateId(CRT_IDX)
        
        If CRT_IDX <= 0 Then   ' 에러 메세지 출력        
            
        Else
            Session("CRT_IDX") = CRT_IDX
        End If

    End If
    Session("LOGIC_IDX") = "1234"
%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/order.css?ts=<%=g_iRandomID%>" />
</head>
<!-- 
## 디버깅 ##
Session.SessionID : <%= SSID %>
Session("MEB_IDX") : <%=Session("MEB_IDX") %>
Session("SID") : <%=Session("SID") %>
Session("MEB_NAME") : <%=Session("MEB_NAME") %>
Session("MEB_ID"):<%=Session("MEB_ID")%>
Session("CRT_IDX"):<%=CRT_IDX%>
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
                        <em><a href="#" class="local_home">HOME</a> &gt; 장바구니</em>
                    </div>
                </div>

                <div id="sub_content">


                    <div class="content_box">
                        <div class="order_wrap">
                            <div class="order_tit">
                                <h2>장바구니</h2>
                                <ol>
                                    <li class="page_on"><span>01</span> 장바구니 <span><img src="/Front/PC/img/icon_join_step_on.png" alt=""></span></li>
                                    <li><span>02</span> 주문서작성/결제<span><img src="/data/skin/front/lady2019_C/img/member/icon_join_step_off.png" alt=""></span></li>
                                    <li><span>03</span> 주문완료</li>
                                </ol>
                            </div>
                            <!-- //order_tit -->
                            <div class="order_banner"></div>

                            <div class="cart_cont">

                                <form id="frmCart" name="frmCart" method="post" target="ifrmProcess">
<!--
                                    <input type="hidden" name="mode" value="">
                                    <input type="hidden" name="cart[cartSno]" value="">
                                    <input type="hidden" name="cart[goodsNo]" value="">
                                    <input type="hidden" name="cart[goodsCnt]" value="">
                                    <input type="hidden" name="cart[addGoodsNo]" value="">
                                    <input type="hidden" name="cart[addGoodsCnt]" value="">
                                    <input type="hidden" name="cart[couponApplyNo]" value="">
                                    <input type="hidden" name="useBundleGoods" value="1">
-->
                                    <!-- 장바구니 상품리스트 시작 -->

                                    <div class="cart_cont_list">
                                        <div class="order_cart_tit">
                                        </div>
                                        <!-- //order_cart_tit -->

                                        <div class="order_table_type">
                                            <table>
                                                <colgroup>
                                                    <col style="width:3%">  <!-- 체크박스 -->
                                                    <col>					<!-- 상품명/옵션 -->
                                                    <col style="width:5%">  <!-- 수량 -->
                                                    <col style="width:10%"> <!-- 상품금액 -->
                                                    <col style="width:13%"> <!-- 할인/적립 -->
                                                    <col style="width:10%"> <!-- 합계금액 -->
                                                    <col style="width:10%"> <!-- 배송비 -->
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>
                                                        <div class="form_element">
                                                            <input type="checkbox" id="allCheck" class="gd_select_all_goods" checked="checked">
                                                            <label for="allCheck" class="check_s on"></label>
                                                        </div>
                                                    </th>
                                                    <th>상품/옵션 정보</th>
                                                    <th>수량</th>
                                                    <th>상품금액</th>
                                                    <th>할인/적립</th>
                                                    <th>합계금액</th>
                                                    <th>배송비</th>
                                                </tr>
                                                </thead>
                                                <tbody id="cart-list-body">

                                                <script id="cart-list-template" type="text/x-handlebars-template">
                                                    {{#rows}} 
                                                    <tr>
                                                        <td class="td_chk">
                                                            <div class="form_element">
                                                                <input type="checkbox" id="cartSno_{{row_count}}" name="cartPrt" value="{{prt_id}}&{{opt_idx}}&{{qty_it}}" checked="checked" data-qty_it="{{qty_it}}" data-discount_mn="{{discount_mn}}">
                                                                <label for="cartSno_{{row_count}}" class="check_s on"></label>
                                                            </div>
                                                        </td>
                                                        <td class="td_left">
                                                            <div class="pick_add_cont">
                                                                <span class="pick_add_img">
                                                                    <a href="./"><img src="/Front/PC/img/prt.jpg" width="40" alt="{{prtName}}" title="{{prtName}}" class="middle"></a>
                                                                </span>
                                                                <div class="pick_add_info">

                                                                    <!--
                                                                    <div id="coupon_apply_288226" class="pick_btn_box">
                                                                        <a href="#" class="btn_alert_login"><img src="/Front/PC/img/btn_coupon_apply.png" alt="쿠폰적용"></a>
                                                                    </div>
                                                                    -->

                                                                    <em><a href="./">{{prtName}}</a></em>

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
                                                                <!--
                                                                <div class="btn_gray_list">
                                                                    <a href="#optionViewLayer" class="btn_gray_small btn_open_layer" data-goodsno="1000002403" data-sno="288226"><span>옵션/수량변경</span></a>
                                                                </div>
                                                                -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <strong class="order_sum_txt price">{{comma_num discount_mn}}원</strong>
                                                            <p class="add_currency"></p>
                                                        </td>
                                                        <td class="td_benefit">
                                                                <ul class="benefit_list">
                                                                </ul>
                                                        </td>
                                                        <td>
                                                            <strong class="order_sum_txt">{{sum_prt}}원</strong>
                                                            <p class="add_currency"></p>
                                                        </td>
                                                        <td class="td_delivery">
                                                            0원
                                                        </td>
                                                    </tr>
                                                    {{/rows}}
                                                </script>

                                                </tbody>


                                            </table>
                                        </div>

                                    </div>
                                    <!-- //cart_cont_list -->
                                    <!-- 장바구니 상품리스트 끝 -->


                                </form>

                                <div class="btn_left_box">
                                    <a href="./" class="shop_go_link"><em>&lt; 쇼핑 계속하기</em></a>
                                </div>

                                <div class="price_sum">
                                    <div class="price_sum_cont">
                                        <div class="price_sum_list">
                                            <dl>
                                                <dt>총 <strong id="totalGoodsCnt"></strong> 개의 상품금액 </dt>
                                                <dd><strong id="totalGoodsPrice"></strong>원</dd>
                                            </dl>
                                            <span><img src="/Front/PC/img/order_price_plus.png" alt="더하기"></span>
                                            <dl>
                                                <dt>배송비</dt>
                                                <dd><strong id="totalDeliveryCharge"></strong>원</dd>
                                            </dl>
                                            <span><img src="/Front/PC/img/order_price_total.png" alt="합계"></span>
                                            <dl class="price_total">
                                                <dt>합계</dt>
                                                <dd><strong id="totalSettlePrice"></strong>원
                                                </dd>
                                            </dl>
                                        </div>
                                        <em id="deliveryChargeText" class="tobe_mileage"></em>
                                    </div>
                                    <!-- //price_sum_cont -->
                                </div>
                                <!-- //price_sum -->

                                <div class="btn_order_box">
                                    <span class="btn_left_box">
                                        <button type="button" id="btn_deleteCheck" class="btn_order_choice_del">선택 상품 삭제</button>
                                        <!--<button type="button" class="btn_order_choice_wish" onclick="gd_cart_process('cartToWish');">선택 상품 찜</button>-->
                                    </span>
                                    <span class="btn_right_box">
                                        <button type="button" id="btn_orderCheck" class="btn_order_choice_buy">선택 상품 주문</button>
                                        <button type="button" id="btn_orderAll" class="btn_order_whole_buy">전체 상품 주문</button>
                                    </span>
                                </div>
                                <!-- //btn_order_box -->

                                <em class="chk_none">주문서 작성단계에서 할인 적용을 하실 수 있습니다.</em>
                                
                            </div>
                            <!-- //cart_cont -->
                        </div>
                        <!-- //order_wrap -->
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

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.5.0.js?<%=g_iRandomID%>"></script>
<script src="/Module/base/base-front-svc.js?<%=g_iRandomID%>"></script>
<script src="/Module/ORD/Service/cart-list-edit-svc.js?<%=g_iRandomID%>"></script>
<script>
    //--------------------------------------------------------------
	// 1. 네임스페이스 정의 및 생성
	var BindModelAjax   = _W.Meta.Bind.BindModelAjax;
	var ItemDOM         = _W.Meta.Entity.ItemDOM;

    var bm              = new BindModelAjax(ItemDOM);
    var service         = new CartListEditService(bm);

    bm.setService(service, true);
	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
	bm.baseUrl = "/Front/frt_mod/ORD/Cart.C.asp";
    bm.prop["__orderURL"] = "order.asp";
    bm.items["crt_idx"].value = "<%=CRT_IDX%>";
	//--------------------------------------------------------------    
	// 3. 아이템 등록 및 설정(추가)
	bm.addItem("cmd", "", [], "bind");                  // **요약가능** : 전역 아이템에 추가
    //--------------------------------------------------------------    
    // 4. 콜백 함수 구현
    // cbEnd (오버라이딩)
    bm.list.cbEnd = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];

        if (entity["return"] < 0) return alert("조회 처리가 실패 하였습니다. Code : " + entity["return"]);

        //--------------------------------------------------------------    
        // 5. 이벤트 등록
        $('input[name=cartPrt]:checkbox').click(function(e){
                viewCheckPrtSum(entity);
        });
        // 초기 선택 상품합계 보기
        viewCheckPrtSum(entity);
    };
    //--------------------------------------------------------------    
    // 6. 외부 호출 함수 구현 
    // 상품합계 보기
    function viewCheckPrtSum(p_entity) {    
        var row_total = 0
        var total_deli_mn = 0, total_qty_mn = 0, total_prt_mn = 0;

        $('input:checkbox[name=cartPrt]').each(function() {
            if(this.checked){   //checked 처리된 항목의 값
                total_prt_mn += Number($(this).attr("data-discount_mn")) * Number($(this).attr("data-qty_it"));
                total_qty_mn += Number($(this).attr("data-qty_it"));
            }
        });

        // 상품수 쿠키 저장
        setCookie("CART_CNT", total_qty_mn);       

        $("#totalGoodsCnt").html(total_qty_mn);
        $("#totalDeliveryCharge").html(total_deli_mn);
        $("#totalGoodsPrice").html(numberWithCommas(total_prt_mn));
        $("#totalSettlePrice").html(numberWithCommas(total_prt_mn + total_deli_mn));
    }
    //--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
        bm.init();
	});
</script>

<script>
    // 전체 선택/해제
    $('input[id=allCheck]:checkbox').click(function(e){
        $(this).next('label').toggleClass('on');

        if ($(this).is(":checked") === true) {
            $('input[name=cartPrt]:checkbox').prop('checked', true);    // 체크박스 처리
            $('input[name=cartPrt]:checkbox').next('label').addClass("on"); // 라벨 처리
        } else {
            $('input[name=cartPrt]:checkbox').prop('checked', false); 
            $('input[name=cartPrt]:checkbox').next('label').removeClass("on");
        }
        
        viewCheckPrtSum(); // 선택됨 상품 합계
    });

</script>
</body>
</html>
<%
    Set oRs = Nothing
    Set oDic = Nothing
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->