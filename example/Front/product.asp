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
<!--#include virtual="/Module/PRT/PRT.Cls.asp"-->
<!--#include virtual="/Module/PRT/PRT_Option.Cls.asp"-->
<!--#include virtual="/Module/PRT/PRT_Image.Cls.asp"-->
<!--#include virtual="/Module/PRT/PRT_Opinion.Cls.asp"-->
<%	
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim SSID            : SSID = Session.SessionID
    Dim MEB_IDX         : MEB_IDX = Session("MEB_IDX")
    Dim CRT_IDX         : CRT_IDX = Session("CRT_IDX")

    Dim dsp_id          : dsp_id  = Request("dsp_id")
    Dim prt_id          : prt_id  = Request("prt_id")

'TODO:: 테스트용
'  prt_id = "43"

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim i
    
%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/goods.css?ts=1604047110w" />
    <script src="/Common/js/_w-meta-1.4.0.js?a=123"></script>
</head>

<body class="body-main body-index pc"  >
    <div id="warp">
        <div id="header_warp">
<!--#include virtual="/Front/PC/include/Header.I.asp"-->
        </div>
         <!-- //header_warp -->

        <div id="container">
            <div id="contents">
                <div id="sub_content">

<script type="text/javascript">

    function change_image(p_path) {
        
        var str = "<img src=\""+ p_path +"\" width=\"600\" alt=\"고산촌한우\" title=\"고산촌 한우\" class=\"middle\"  />";

        $('#mainImage').html(str);
    } 
</script>

<%
    Dim displayOptionkey, optionSno, optionName, optionSellCodeValue, optionDeliveryCodeValue, optionStock
    Dim optionPrice, displayAddGoodsKey, optionIndex, addGoodsGroup, addGoodsimge, addGoodsName, addGoodsStockFl
    Dim addGoodsStock, addGoodsPrice
%>

                    <script type="text/html" id="optionTemplate">
                        <tbody id="option_display_item_<%=displayOptionkey%>">
                            <tr class="check optionKey_<%=optionSno%>">
                                <td class="cart_prdt_name">
                                    <input type="hidden" name="goodsNo[]" value="1000002403" />
                                    <input type="hidden" name="optionSno[]" value="<%=optionSno%>" />
                                    <input type="hidden" name="goodsPriceSum[]" value="0" />
                                    <input type="hidden" name="addGoodsPriceSum[]" value="0" />
                                    <input type="hidden" name="displayOptionkey[]" value="<%=displayOptionkey%>" />
                                    <input type="hidden" name="couponApplyNo[]" value="" />
                                    <input type="hidden" name="couponSalePriceSum[]" value="" />
                                    <input type="hidden" name="couponAddPriceSum[]" value="" />
                                    <div class="cart_tit_box">
                                        <strong class="cart_tit">
                                            <span><%=optionName%></span>
                                            <span><%=optionSellCodeValue%><%=optionDeliveryCodeValue%></span>
                                            <span class="cart_btn_box">
                                                <button type="button" class="btn_alert_login"><img src="/data/skin/front/lady2019_C/img/common/btn/btn_coupon_apply.png" alt="쿠폰적용"/></button>
                                            </span>
                                            <span id="option_text_display_<%=displayOptionkey%>"></span>
                                        </strong>
                                    </div>
                                </td>
                                <td>
                                    <span class="count">
                                        <span class="goods_qty">
                                            <input type="text" class="text goodsCnt_<%=displayOptionkey%>" title="수량" name="goodsCnt[]" value="1" data-value="1" data-stock="<%=optionStock%>" data-key="<%=displayOptionkey%>" onchange="goodsViewController.input_count_change(this, '1');return false;" />
                                            <span>
                                                <button type="button" class="up goods_cnt" title="증가"  value="up^|^<%=displayOptionkey%>">증가</button>
                                                <button type="button" class="down goods_cnt" title="감소"  value="dn^|^<%=displayOptionkey%>">감소</button>
                                            </span>
                                        </span>
                                    </span>
                                </td>
                                <td class="item_choice_price">
                                    <input type="hidden" name="option_price_<%=displayOptionkey%>" value="<%=optionPrice%>" />
                                    <input type="hidden" name="optionPriceSum[]" value="0" />
                                    <strong class="option_price_display_<%=displayOptionkey%>"><%=optionPrice%></strong>원
                                </td>
                                <td>
                                    <button type="button" class="delete_goods" data-key="option_display_item_<%=displayOptionkey%>"><img src="/data/skin/front/lady2019_C/img/icon/shop_cart/ico_cart_del.png" alt="삭제"/></button>
                                </td>
                            </tr>
                        </tbody>
                    </script>
                    <script type="text/html" id="addGoodsTemplate">
                        <tr id="add_goods_display_item_<%=displayOptionkey%>_<%=displayAddGoodsKey%>" class="check item_choice_divide">
                            <td class="cart_prdt_name">
                                <div class="cart_tit_box">
                                    <input type="hidden" name="addGoodsNo[<%=optionIndex%>][]" value="<%=optionSno%>" data-group="<%=addGoodsGroup%>" />
                                    <strong class="item_choice_tit">
                                        <em class="item_choice_photo"><%=addGoodsimge%></em><span><%=addGoodsName%></span>
                                    </strong>
                                </div>
                            </td>
                            <td>
                                <span class="count">
                                    <span class="goods_qty">
                                        <input type="text" name="addGoodsCnt[<%=optionIndex%>][]" class="text addGoodsCnt_<%=displayOptionkey%>_<%=displayAddGoodsKey%>" title="수량" value="1"  data-key="<%=displayOptionkey%>||<%=displayAddGoodsKey%>"  data-value="1" data-stock-fl="<%=addGoodsStockFl%>"  data-stock="<%=addGoodsStock%>" onchange="goodsViewController.input_count_change(this);return false;">
                                        <span>
                                            <button type="button" class="up add_goods_cnt" title="증가"  value="up^|^<%=displayOptionkey%>||<%=displayAddGoodsKey%>">증가</button>
                                            <button type="button" class="down add_goods_cnt" title="감소" value="dn^|^<%=displayOptionkey%>||<%=displayAddGoodsKey%>">감소</button>
                                        </span>
                                    </span>
                                </span>
                            </td>
                            <td class="item_choice_price">
                                <input type="hidden" name="add_goods_price_<%=displayOptionkey%>_<%=displayAddGoodsKey%>" value="<%=addGoodsPrice%>" />
                                <input type="hidden" name="add_goods_total_price[<%=optionIndex%>][]" value="" />
                                <strong class="add_goods_price_display_<%=displayOptionkey%>_<%=displayAddGoodsKey%>"></strong>원
                            </td>
                            <td>
                                <button type="button" class="delete_add_goods" data-key="<%=displayOptionkey%>-<%=displayAddGoodsKey%>"><img src="/data/skin/front/lady2019_C/img/icon/shop_cart/ico_cart_del.png" alt="삭제"/></button>
                            </td>
                        </tr>
                    </script>

                    <div class="content_box">
                        <div class="location_wrap">
                            <div class="location_cont">
                                <em><a href="#" class="local_home">HOME</a></em>
                                <span>&nbsp;&gt;&nbsp;</span>
                                <div class="location_select">
                                    <div class="location_tit"><a href="#"><span>한우</span></a></div>
                                    <ul style="display:none;">
                                        <li><a href="./goods_list.php?cateCd=002"><span>한우 제품</span></a></li>
                                        <li><a href="./goods_list.php?cateCd=008"><span>한우 </span></a></li>
                                        <li><a href="./goods_list.php?cateCd=012"><span>한우 </span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- //location_wrap -->
                        <!-- 상품 상단 --> 
                        <div class="item_photo_info_sec">
                            <div class="item_photo_view_box">
                                <div class="item_photo_view" style="position:relative;">
                                    <div style="position:absolute; top:10px; left:10px; z-index:99;">
                                    </div>
                                    <div class="item_photo_big">
                                        <span class="img_photo_big"><a href="#lyZoom" id="mainImage" class="zoom_layer_open btn_open_layer"><img id="m-fileName" idsrc="" width="1000" alt="고산촌한우" title="고산촌한우" class="middle"></a></span>
                                        <!--<a href="#lyZoom" class="btn_zoom zoom_layer_open btn_open_layer"><img src="/data/skin/front/lady2019_C/img/icon/goods_icon/icon_zoom.png" alt=""></a>-->
                                    </div>
                                    <div id="testZoom" style="display:none">
                                    <!--<img src="/data/goods/18/03/10//1000002403/1000002403_magnify_251.jpg" width="600" alt="고산촌한우" title="고산촌한우" class="middle">-->
                                    </div>
                                    <!-- //item_photo_big -->
                                    <div class="item_photo_slide">
                                        <!--<button type="button" class="slick_goods_prev slick-arrow slick-hidden" aria-disabled="true" tabindex="-1"><img src="/data/skin/front/lady2019_C/img/icon/shop_cart/btn_slide_prev.png" alt="이전 상품 이미지"></button>-->
                                        <ul class="slider_wrap slider_goods_nav slick-initialized slick-slider">
                                            <div aria-live="polite" class="slick-list draggable">
                                                <div id="s-area-photo" class="slick-track" style="opacity: 1; width: 500px; transform: translate3d(0px, 0px, 0px);" role="listbox">
                                                </div>
                                                <script id="s-temp-photo" type="text/x-handlebars-template">
                                                    {{#rows}} 
                                                    <li class="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide00" style="width: 100px;">
                                                        <a href="javascript:change_image('{{fileName}}');" tabindex="0"><img src="{{fileName}}" width="68" alt="고산촌 한우" title="고산촌 한우" class="middle"></a>
                                                    </li>
                                                    {{/rows}} 
                                                </script> 

                                            </div>
                                        </ul>
                                        <!--<button type="button" class="slick_goods_next slick-arrow slick-hidden" aria-disabled="true" tabindex="-1"><img src="/data/skin/front/lady2019_C/img/icon/shop_cart/btn_slide_next.png" alt="다음 상품 이미지"></button>-->
                                    </div>
                                    <!-- //item_photo_slide -->

                                </div>
                                <!-- //item_photo_view -->
                            </div>
                            <!-- //item_photo_view_box -->

                            <form name="frmView" id="frmView" method="post">
<!--
                                <input type="hidden" name="mode" value="cartIn">
                                <input type="hidden" name="scmNo" value="1">
                                <input type="hidden" name="cartMode" value="">
                                <input type="hidden" name="set_goods_price" value="199000">
                                <input type="hidden" id="set_goods_fixedPrice" name="set_goods_fixedPrice" value="599000.00">
                                <input type="hidden" name="set_goods_mileage" value="0">
                                <input type="hidden" name="set_goods_stock" value="58572">
                                <input type="hidden" name="set_coupon_dc_price" value="199000.00">
                                <input type="hidden" id="set_goods_total_price" name="set_goods_total_price" value="0">
                                <input type="hidden" id="set_option_price" name="set_option_price" value="0">
                                <input type="hidden" id="set_option_text_price" name="set_option_text_price" value="0">
                                <input type="hidden" id="set_add_goods_price" name="set_add_goods_price" value="0">
                                <input type="hidden" name="set_total_price" value="199000">
                                <input type="hidden" name="mileageFl" value="c">
                                <input type="hidden" name="mileageGoods" value="0.00">
                                <input type="hidden" name="mileageGoodsUnit" value="percent">
                                <input type="hidden" name="goodsDiscountFl" value="n">
                                <input type="hidden" name="goodsDiscount" value="0.00">
                                <input type="hidden" name="goodsDiscountUnit" value="percent">
                                <input type="hidden" name="taxFreeFl" value="t">
                                <input type="hidden" name="taxPercent" value="10.0">
                                <input type="hidden" name="scmNo" value="1">
                                <input type="hidden" name="brandCd" value="001">
                                <input type="hidden" name="cateCd" value="008">
                                <input type="hidden" id="set_dc_price" value="0">
                                <input type="hidden" id="goodsOptionCnt" value="1">
                                <input type="hidden" name="optionFl" value="y">
                                <input type="hidden" name="goodsDeliveryFl" value="n">
                                <input type="hidden" name="sameGoodsDeliveryFl" value="n">
                                <input type="hidden" name="useBundleGoods" value="1">
-->
                            <div class="item_info_box">
                                <!-- //time_sale -->
                                <div class="item_tit_detail_cont">
                                    <div class="item_detail_tit">
                                        <h2 style="font-size: x-large;" id="m-prtName"></h2>
                                        <div class="btn_layer btn_qa_share_box">
                                            <!-- <span class="btn_gray_list target_sns_share"><a href="#lySns" class="btn_gray_mid"><em>공유</em></a></span> -->
                                            <span class="target_sns_share"><a href="#lySns"><img src="/Front/PC/img/icon_sns.png"></a></span>
                                        </div>
                                        <!-- //btn_qa_share_box -->
                                    </div>
                                    <div class="item_detail_list">

                                        <dl>
                                            <dt>정가</dt>
                                            <dd>
                                                <del><span id="s-txt-sell" style="font-size: x-large;">0</span>원 </del>
                                            </dd>
                                        </dl>
                                        <dl class="item_price">
                                            <dt>판매가</dt>
                                            <dd>
                                                <strong><strong id="s-txt-discount">0</strong></strong>원
                                                <strong class="item_apply">( -원)</strong>
                                                <span id="s-state_info" style="color:red"></span>
                                                <!--
                                                <span style="color:red">재고없음</span>
                                                -->
                                                <!-- 글로벌 참조 화폐 임시 적용 -->
                                            </dd>
                                        </dl>


                                        <dl class="item_discount_mileage dn">
                                            <dt>구매혜택</dt>
                                            <dd>
                                                <span class="item_discount">할인 : <strong class="total_benefit_price"></strong> <strong class="benefit_price item_apply"></strong></span>
                                                <span class="item_mileage">적립 포인트 : <strong class="total_benefit_mileage"></strong> <strong class="benefit_mileage item_apply"></strong></span>
                                            </dd>
                                        </dl>

                                        <dl class="item_price priceView">
                                            <dt>규격</dt>
                                            <dd>
                                                <strong id="m-optName"></strong>
                                            </dd>
                                        </dl>

                                        <dl>
                                            <dt>포인트</dt>
                                            <dd><span id="s-txt_point_it">0</span>점</dd>
                                        </dl>
                                        <dl class="item_delivery">
                                            <dt>배송비</dt>
                                            <dd>
                                                <!-- <strong>0원</strong> -->
                                                <div class="delivery-detail">
                                                    <span id="s-txt_deli_mn">0</span>원 
                                                    (<span class="js-deliveryMethodVisitArea" id="s-txt_deli_msg"></span>)
                                                </div>
                                            </dd>
                                        </dl>
                                        
                                        <div class="item_add_option_box">
                                            <input type="hidden" name="optionSnoInput" value="">
                                            <input type="hidden" name="optionCntInput" value="2">
                                            <dl>
                                                <dt>규격</dt>
                                                <dd>
                                                    <select id="s-area-option" name="optionNo_0" class="chosen-select" style="font-size:20px;">
                                                        <option value="">=규격 선택=</option>
                                                    </select>
                                                    <script id="s-temp-option" type="text/x-handlebars-template">
                                                        <option value="">=규격 선택=</option>
                                                        {{#rows}} 
                                                        <option value="{{row_count}}"> 
                                                            {{row_count}}번: {{optName}}, {{comma_num discount_mn}}원
                                                            </option>
                                                        {{/rows}} 
                                                    </script>
                                                    <!--
                                                    <div class="chosen-container chosen-container-single" style="width: 488px;" title=""><a class="chosen-single">
                                                        <span>=사이즈 선택=</span><div><b></b></div></a>
                                                        <div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off"></div><ul class="chosen-results"></ul></div>
                                                    </div>
                                                    -->
                                                </dd>
                                            </dl>
                                            <div id="iconImage_0" class="option_icon"></div>
                                            <div id="iconImage_1" class="option_icon"></div>
                                        </div>
                                        <!-- //item_add_option_box -->
                                    </div>
                                    <!-- //item_detail_list -->

                                    <div class="option_total_display_area item_choice_list">
                                        <table class="option_display_area" border="0" cellpadding="0" cellspacing="0">
                                            <colgroup>
                                                <col width="*">
                                                <col width="80px">
                                                <col width="80px">
                                                <col width="40px">
                                            </colgroup>
                                            <tbody id="s-area-option-vlew">
                                            </tbody>
                                            <script id="s-temp-option-view" type="text/x-handlebars-template">
                                                <tr name="s-option" row_count="{{row_count}}">
                                                    <td class="cart_prdt_name">
                                                        <div class="cart_tit_box">
                                                            <strong class="cart_tit">
                                                                <span>{{optName}}</span>
                                                                <span>(판매가 : {{comma_num discount_mn}} 원)</span>
                                                                <span class="cart_btn_box">
                                                                <del>정가: {{comma_num sell_mn}}원</del>
                                                                
                                                                </span>
                                                            </strong>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="count">
                                                            <span class="goods_qty">
                                                                <input type="text" readonly class="text goodsCnt_" title="수량" name="s-qty" row_count="{{row_count}}"  value="1" onchange="prt.fn.editQty(this, '1');" />
                                                                <span>
                                                                    <button type="button" onclick="prt.fn.plusQty({{row_count}})" class="up goods_cnt" title="증가"  value="">증가</button>
                                                                    <button type="button" onclick="prt.fn.minusQty({{row_count}})" class="down goods_cnt" title="감소"  value="">감소</button>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </td>"
                                                <td class="item_choice_price">
                                                    <strong class="option_price_display_" name="s-productSum" row_count="{{row_count}}">{{comma_num discount_mn}}</strong>원
                                                </td>
                                                <td>
                                                    <button type="button" class="delete_goods" onclick="prt.fn.removeOption({{row_count}})"><img src="/Front/PC/img/ico_cart_del.png" alt="삭제"/></button>
                                                </td>
                                                </tr>    
                                            </script>                                            

                                        </table>
                                        <div class="item_price_cont">
                                            <div class="end_price item_tatal_box" style="display:">
                                                <dl class="total_goods">
                                                    <dt>총 상품금액</dt>
                                                    <dd><strong id="s-txt-sellTotal" class="goods_total_price">0</strong>원</dd>
                                                </dl>
                                                <dl class="total_discount">
                                                    <dt>총 할인금액</dt>
                                                    <dd><strong id="s-txt-decountTotal" class="total_benefit_price">0</strong>원</dd>
                                                </dl>
                                                <dl class="total_amount">
                                                    <dt>총 합계금액</dt>
                                                    <dd><strong id="s-txt-productTotal" class="total_price">0</strong>원</dd>
                                                </dl>
                                            </div>
                                            <!-- //item_tatal_box -->
                                        </div>
                                        <!-- //item_price_cont -->
                                    </div>
                                    <div class="btn_choice_box">
                                        <div><!-- N:재입고 알림이 있을 때는 restock 클래스를 div에 같이 넣어주세요 -->
                                            <button id="btn_Cart" type="button" class="btn_add_cart">장바구니</button>
                                            <!--<button id="wishBtn" type="button" class="btn_add_wish" onclick="alret('준비중입니다.');">찜하기</button>-->
                                            <button id="btn_Order" type="button" class="btn_add_order">바로 구매</button>
                                        </div>
                                    </div>
                                    <!-- //btn_choice_box -->

                                </div>
                                <!-- //item_tit_detail_cont -->
                            </div>
                            <!-- //item_info_box -->
                            <input type="hidden" name="deliveryCollectFl" value="pre"></form>
                        </div>
                        <!-- //item_photo_info_sec -->
                        <!-- //상품 상단 끝 -->


                        <!-- 상품상세 -->

                        <div class="item_goods_sec">

                            <div id="detail">
                                <div class="item_goods_tab">
                                    <ul style="padding: 0;">
                                        
                                        <li class="on"><a href="#detail">상품상세정보</a></li>
                                        <!--<li><a href="#delivery">배송안내</a></li>
                                        <li><a href="#exchange">교환 및 반품안내</a></li>-->
                                        <li><a href="#deliveryQna">배송/교환/AS문의</a></li>
                                        <li><a href="#qna">상품문의 ( <strong class="qna-totalView crema-product-reviews-count">0</strong> )</a></li>
                                        <li><a href="#reviews">상품후기 ( <strong id="" class="opinion-totalView crema-product-reviews-count" data-product-code="1000002403" data-format="({{{count}}})">0</strong> )</a></li>
                                        <!--<li><a href="#qna">상품문의 <strong>(265)</strong></a></li>-->
                                    </ul>
                                </div>
                                <!-- //item_goods_tab -->
 
                                <div class="detail_cont">
                                    <h3>상품상세정보</h3>
                                    <div class="detail_explain_box">
                                        <div class="image-manual"><!-- 이미지 --></div>
                                        <div class="txt-manual">

                                            <div id="m-contents" style="margin: 0px; padding: 0px; width: 100%; text-align: center;">

                                            </div>

                                            <!-------------------공통 START----------------------------->

                                            
                                            <br/>
                                            
                                            <div style="text-align: center;">
                                                <iframe width="1100" height="680" src="https://www.youtube.com/embed/espvl0fsjFA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            </div>

                                            <br/>
                                            <!--
                                            <div><img src="/Front/PC/img/product/E-06-01.jpg"></div>
                                            <div><img src="/Front/PC/img/product/E-06-02.jpg"></div>
                                            <div><img src="/Front/PC/img/product/E-07-01.jpg"></div>
                                            <div><img src="/Front/PC/img/product/E-08-01.jpg"></div>
                                            -->
                                            <!-------------------공통 END----------------------------->


                                        </div>
                                        <!-- 상품상세 공통정보 관리를 상세정보 상단에 노출-->
                                            
                                    </div>
                                    <!--
                                    <h3>상품필수 정보</h3>
                                    <div class="detail_info_box">
                                        <div class="datail_table">
                                            <table class="left_table_type">
                                                <colgroup>
                                                    <col>
                                                    <col>
                                                </colgroup>
                                                <tbody>
                                                <tr>
                                                    <th style="width:20%">생산자</th>
                                                    <td colspan="3" style="width:80%">고산촌</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">원산지</th>
                                                    <td colspan="3" style="width:80%">한우 (국내산)</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">제도연월</th>
                                                    <td colspan="3" style="width:80%">제품 포장에 표기</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">유통기한</th>
                                                    <td colspan="3" style="width:80%">가공일로부터 4일, 매번 포장일이 달라 포장일 기재가 어렵습니다. 당사(판매원) 고객센터 (1566-0542)로 문의 바랍니다. / 신선식품 특성상 3일이내 드시지 않을 경우 냉동 보관, 신선식품으로 별도의 유통기한이 없어 품질유지기한 기재가 어렵습니다.</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">농산물 표시사항</th>
                                                    <td colspan="3" style="width:80%">해당사항 없음</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">축산물 표시사항</th>
                                                    <td colspan="3" style="width:80%">등급표시, 쇠고기이력제有</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">수산물 표시사항</th>
                                                    <td colspan="3" style="width:80%">해당사항 없음</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">수입신고 필 유무</th>
                                                    <td colspan="3" style="width:80%">해당사항 없음</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">상품구성</th>
                                                    <td colspan="3" style="width:80%">한우 상품 규격  </td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">보관방법 또는 취급방법</th>
                                                    <td colspan="3" style="width:80%">-2~5℃ 냉장보관 (유통기한 : 가공일로부터 4일, 신선식품 특성상 3일이내 드시지 않을 경우 냉동 보관) / 소시지: -18˚C 이하 냉동보관</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">A/S 책임자와 전화번호</th>
                                                    <td colspan="3" style="width:80%">제이엔에스 글로벌 / 063-227-9778, 070-8831-9777 (위탁운영센터) </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    -->
                                    <!-- //detail_info_box -->

                                </div>
                                <!-- //detail_cont -->
                            </div>
                            <!-- //#detail -->
                            
                            <div id="deliveryQna">
                                <div class="item_goods_tab">
                                    <ul style="padding: 0;">
                                        <li><a href="#detail">상품상세정보</a></li>
                                        <!--<li><a href="#delivery">배송안내</a></li>
                                        <li><a href="#exchange">교환 및 반품안내</a></li>-->
                                        <li class="on"><a href="#deliveryQna">배송/교환/AS문의</a></li>
                                        <li><a href="#qna">상품문의 ( <strong class="qna-totalView crema-product-reviews-count">0</strong> )</a></li>
                                        <li ><a href="#reviews">상품후기 ( <strong class="opinion-totalView crema-product-reviews-count" data-product-code="1000002403" data-format="({{{count}}})">0</strong> )</a></li>
                                        <!--<li><a href="#qna">상품문의 <strong>(265)</strong></a></li>-->
                                    </ul>
                                </div>
                                <!-- //item_goods_tab -->
 
                                <div class="detail_cont">
                                    <h3>배송정보</h3>
                                    <div class="detail_explain_box">

                                        <!-------------------공통 START----------------------------->
                                        <div style="text-align: center;">
                                            <img src="/Front/PC/img/product/E-10-01-1.jpg">
                                        </div>
                                        <!--<div><img src="/Front/PC/img/product/E-10-01.jpg"></div>-->

                                        <!-------------------공통 END----------------------------->
                                            
                                    </div>
                                    <!--
                                    <h3>상품필수 정보</h3>
                                    <div class="detail_info_box">
                                        <div class="datail_table">
                                            <table class="left_table_type">
                                                <colgroup>
                                                    <col>
                                                    <col>
                                                </colgroup>
                                                <tbody>
                                                <tr>
                                                    <th style="width:20%">생산자</th>
                                                    <td colspan="3" style="width:80%">고산촌</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">원산지</th>
                                                    <td colspan="3" style="width:80%">한우 (국내산)</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">제도연월</th>
                                                    <td colspan="3" style="width:80%">제품 포장에 표기</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">유통기한</th>
                                                    <td colspan="3" style="width:80%">가공일로부터 4일, 매번 포장일이 달라 포장일 기재가 어렵습니다. 당사(판매원) 고객센터 (1566-0542)로 문의 바랍니다. / 신선식품 특성상 3일이내 드시지 않을 경우 냉동 보관, 신선식품으로 별도의 유통기한이 없어 품질유지기한 기재가 어렵습니다.</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">농산물 표시사항</th>
                                                    <td colspan="3" style="width:80%">해당사항 없음</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">축산물 표시사항</th>
                                                    <td colspan="3" style="width:80%">등급표시, 쇠고기이력제有</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">수산물 표시사항</th>
                                                    <td colspan="3" style="width:80%">해당사항 없음</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">수입신고 필 유무</th>
                                                    <td colspan="3" style="width:80%">해당사항 없음</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">상품구성</th>
                                                    <td colspan="3" style="width:80%">한우 상품 규격  </td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">보관방법 또는 취급방법</th>
                                                    <td colspan="3" style="width:80%">-2~5℃ 냉장보관 (유통기한 : 가공일로부터 4일, 신선식품 특성상 3일이내 드시지 않을 경우 냉동 보관) / 소시지: -18˚C 이하 냉동보관</td>
                                                </tr>
                                                <tr>
                                                    <th style="width:20%">A/S 책임자와 전화번호</th>
                                                    <td colspan="3" style="width:80%">제이엔에스 글로벌 / 063-227-9778, 070-8831-9777 (위탁운영센터) </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    -->
                                    <!-- //detail_info_box -->

                                </div>
                                <!-- //detail_cont -->
                            </div>
                            <!-- //#deliveryQna -->



                            <div id="qna">
                                <div class="item_goods_tab">
                                    <ul>
                                        <li><a href="#detail">상품상세정보</a></li>
                                        <!--<li><a href="#delivery">배송안내</a></li>
                                        <li><a href="#exchange">교환 및 반품안내</a></li>-->
                                        <li><a href="#deliveryQna">배송/교환/AS문의</a></li>
                                        <li class="on"><a href="#qna">상품문의 ( <strong class="qna-totalView crema-product-reviews-count">0</strong> )</a></li>
                                        <li><a href="#reviews">상품후기 ( <strong class="opinion-totalView crema-product-reviews-count" data-product-code="1000002403" data-format="({{{count}}})">0</strong> )</a></li>
                                        <!--<li><a href="#qna">상품문의 <strong>(265)</strong></a></li>-->
                                    </ul>
                                </div>
                                <!-- //item_goods_tab -->
                                <div class="qna_cont">
                                    <h3>상품Q&amp;A</h3>
                                    <div id="ajax-goods-goodsqa-list">
                                        <div class="qna_table">
                                            <table class="qna_table_type">
                                                <colgroup>
                                                    <col width="5%">
                                                    <col>
                                                    <col width="13%">
                                                    <col width="13%">
                                                    <col width="13%">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>번호</th>
                                                        <th>제목</th>
                                                        <th>작성자</th>
                                                        <th>작성일</th>
                                                        <th>진행상황</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="s-area-list-qna">
                                                </tbody>

                                                <script id="s-temp-list-qna" type="text/x-handlebars-template">
                                                    {{#rows}}

                                                    <tr class="js_data_row" data-bdid="goodsqa" data-sno="11656" data-auth="y">
                                                        <td>347</td>
                                                        <td class="board_tit">
                                                            <a href="javascript:showQnaDetail('{{row_count}}')" class="js_btn_view">
                                                                
                                                                {{title}}
                                                            </a>
                                                        </td>
                                                        <td>{{writer}}</td>
                                                        <td>{{create_dt}}</td>
                                                        <td>{{state_mark state_cd}}</td>
                                                    </tr>
                                                    <tr class="js_detail" data-bdid="goodsqa" row_count="{{row_count}}" data-sno="11656" data-auth="y" style="display:none;"><td colspan="5" class="qna_new_box">
                                                        <div class="board_cont">
                                                            <div class="board_view">
                                                                <dl class="qna_box">
                                                                    <dt>
                                                                        <span class="icon_qna"><img src="/Front/PC/img/icon_qna_q.png" alt="질문제목"></span>
                                                                        <strong>{{title}}</strong>
                                                                        {{html_safe contents}}
                                                                        <div class="btn_view_qna_box">
                                                                        </div>
                                                                        <!-- //btn_view_qna_box -->
                                                                    </dt>
                                                                    {{#if answer}}
                                                                    <dd>
                                                                        <span class="icon_qna"><img src="/Front/PC/img/icon_qna_a.png" alt="답변"></span>
                                                                        {{html_safe answer}}
                                                                    </dd>
                                                                    {{/if}}
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </td></tr>
                                                    
                                                    <!--

                                                    <tr class="">
                                                        <td>{{row_count}}</td>
                                                        <td>{{create_dt}}</td>
                                                        <td>{{prtName}}</td>
                                                        <td>{{title}}</td>
                                                        <td>{{writer}}</td>
                                                        <td>{{open_yn}}</td>
                                                        <td>{{state_mark state_cd}}</td>
                                                        <td><a href="javascript:view('{{qna_idx}}');" class='btnNormal'><span> 조회</span></a></td>
                                                    </tr>
                                                    -->
                                                    {{/rows}} 
                                                </script>   

                                            </table>
                                        </div>
                                        
                                        <div id="s-area-page-qna" class="mPaginate"></div>

                                    </div>
                                    <div class="btn_qna_box">
                                        <!--
                                        <a href="../board/list.php?bdId=goodsqa" class="btn_qna_more">상품문의 전체보기</a>
                                        -->
                                        <a href="javascript:createQnA()" class="btn_qna_write">상품문의 글쓰기</a>
                                    </div>
                                    <!-- //btn_qna_box -->
                                </div>
                                <!-- //qna_cont -->
                            </div>


                            <div id="reviews">
                                <div class="item_goods_tab">
                                    <ul>
                                        <li><a href="#detail">상품상세정보</a></li>
                                        <!--<li><a href="#delivery">배송안내</a></li>
                                        <li><a href="#exchange">교환 및 반품안내</a></li>-->
                                        <li><a href="#deliveryQna">배송/교환/AS문의</a></li>
                                        <li><a href="#qna">상품문의 ( <strong class="qna-totalView crema-product-reviews-count">0</strong> )</a></li>
                                        <li class="on"><a href="#reviews">상품후기 ( <strong class="opinion-totalView crema-product-reviews-count" data-product-code="1000002403" data-format="({{{count}}})">0</strong> )</a></li>
                                        <!--<li><a href="#qna">상품문의 <strong>(265)</strong></a></li>-->
                                    </ul>
                                </div>

                                <div id="esotextreview" class="crema-hide crema-applied" style="display: ;"></div>
                                <div class="reviews_cont crema-hide crema-applied" style="display: ;">
                                    <!--<h3>상품후기</h3>-->
                                    <div id="ajax-goods-goodsreview-list"><div class="reviews_table">
                        
                                        <table class="reviews_table_type">
                                            <colgroup>
                                                <col width="13%">
                                                <col>
                                                <col width="13%">
                                                <col width="13%">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>평점</th>
                                                    <th>제목</th>
                                                    <th>작성자</th>
                                                    <th>작성일</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody id="s-area-list-opinion">
                                            </tbody>
                                            <script id="s-temp-list-opinion" type="text/x-handlebars-template">
                                                {{#rows}} 
                                                <tr class="js_data_row goodsCd}" data-brandcd="001" data-goodscd="" data-bdid="goodsreview" data-sno="4592" data-auth="y" data-notice="n">
                                                    <td><span class="rating_star"><span style="width:100%;">별</span></span> {{grade_mark grade_cd}}</td>
                                                    <td class="board_tit">
                                                            {{contents}}
                                                    </td>
                                                    <td>{{orderName}} </td>
                                                    <td> {{date_cut create_dt}}</td>
                                                </tr>
                                                {{/rows}} 
                                            </script> 

                                        </table>
                                    </div>
                                    <div class="pagination" id="s-area-page-opinion"></div>
                                    
                                    <!--
                                    <div class="pagination"><ul><li class="on"><span>1</span></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=2&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">2</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=3&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">3</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=4&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">4</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=5&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">5</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=6&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">6</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=7&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">7</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=8&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">8</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=9&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">9</a></li><li><a href="javascript:goGoodsAjaxPage('goodsreview','page=10&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')">10</a></li><li class="btn_page btn_page_next"><a href="javascript:goGoodsAjaxPage('goodsreview','page=11&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')"><img src="/admin/gd_share/img/icon_arrow_page_r.png" class="img-page-arrow">다음</a></li><li class="btn_page btn_page_last"><a href="javascript:goGoodsAjaxPage('goodsreview','page=13&amp;bdId=goodsreview&amp;goodsNo=1000002403&amp;gboard=y&amp;_=1609817740920')"><img src="/admin/gd_share/img/icon_arrow_page_rr.png" class="img-page-arrow">맨뒤</a></li></ul></div></div>
                                    -->
                                    <div class="btn_reviews_box" style="display:none">
                                        <a href="../board/list.php?bdId=goodsreview" class="btn_reviews_more">상품후기 전체보기</a>
                                        <a href="javascript:gd_open_write_popup('goodsreview', '1000002403')" class="btn_reviews_write">상품후기 글쓰기</a>
                                    </div>
                                    <!-- //btn_reviews_box -->
                                </div>
                                <a href="javascript:gd_open_write_popup('goodsreview', '1000002403')" class="btn_reviews_write1 crema-hide crema-applied" style="display: none;">상품후기 글쓰기</a>

                                <div class="btn_reviews_text">올려주신 글 &amp; 사진의 상업적/비상업적 권리는 고산촌에 있으며, 고산촌의 마케팅 자료로 활용될 수 있습니다.</div>
                                <!-- //reviews_cont -->
                            </div>
                            <!-- //#reviews -->


                        </div>
                        <!-- //item_goods_sec -->
                        <!-- //상품상세 끝 -->
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

<!--
<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.5.1.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/js/page-view.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/Service/base-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/__product-opinion-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/ORD/Service/order-cart-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/__product-qna-svc.js?<%=g_iRandomID%>"></script>
<script>
    // var prt_id = getParamsToJSON(location.href).prt_id;
    var prt_id = "<%=prt_id%>";
</script>

<script>
    //--------------------------------------------------------------
	// 1. 생성 및 서비스 설정
    var product          = new BindModelAjax();
    var cart             = new BindModelAjax();
    var opinion          = new BindModelAjax();
    var qna              = new BindModelAjax();

    var client_id       = "<%=SSID%>";
    var meb_idx         = "<%=MEB_IDX%>";

    product.setService(new ProductService(product));
    cart.setService(new OrderCartService(cart));
    opinion.setService(new ProductOpinionService(opinion));
    qna.setService(new ProductQnaService(qna, "-qna"));
	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
    product.items["prt_id"].value   = prt_id;
    cart.items["meb_idx"].value     = meb_idx;
    cart.items["client_id"].value   = client_id;
    opinion.items["prt_id"].value   = prt_id;
    opinion.prop["__isGetLoad"]     = false;
    opinion.prop["__isGetLoad"]     = false;
    qna.items["prt_id"].value	    = prt_id;
    //--------------------------------------------------------------    
    // 4. 콜백 함수 구현
    cart.create.cbEnd   = function(p_entity, p_status, p_xhr) {
        var state_cd = cart.items["state_cd"].value;
        if (p_entity["return"] >= 0) { 
            if (state_cd === "P") location.href = "/Front/PC/order/cart.asp";
            if (state_cd === "R") location.href = "/Front/PC/member/login.asp?cmd=ORDER&returnUrl=/Front/PC/order/order.asp";
        } else {
            alert("등록 실패 하였습니다. Result Code : " + result);
        }
    };
    opinion.list.cbEnd = function(p_entity, p_status, p_xhr) { 
        var row_total   = p_entity["row_total"];
        $(".opinion-totalView").text(row_total);   // 후기갯수
    };
    qna.list.cbEnd = function(p_entity, p_status, p_xhr) { 
        var row_total   = p_entity["row_total"];
        $(".qna-totalView").text(row_total);   // 후기갯수
    };
    //--------------------------------------------------------------    
	// 6. 외부 호출 함수 구현
    function orderCart(p_state_cd) {
        var state_cd = p_state_cd ? p_state_cd : "P";
        var arr_prt_opt_qty = [];        // 1&1&1|1&2&10'
        var cartInfo = product.cartInfo;
        var state_code = product.items['state_cd'].value;   // REVIEW: 이름변경 필요
        
        if (state_code !== "SS") {
            if (state_code === "DS") return alert('재고가 없는상품은 구매할 수 없습니다.');
            else return alert('팬매중인 상품이 아닙니다.)');
        }

        for(var prop in cartInfo) {
            if (cartInfo.hasOwnProperty(prop)) {
                arr_prt_opt_qty.push(cartInfo[prop].prt_id  + "&" + cartInfo[prop].opt_idx + "&" + cartInfo[prop].qty_it);
            }
        }
        if (arr_prt_opt_qty.length === 0) {
            return alert('선택한 상품이 없습니다.');
        }
        cart.items["state_cd"].value     = state_cd;
        cart.items["arr_prt_opt_qty"].value = arr_prt_opt_qty.join('|');
        cart.create.execute();
    }

    function createQnA() {
        var url="product_QnA_Reg.asp?prt_id="+prt_id;
        window.open(url,'qna','width=850,height=800,left=300,scrollbars=yes');
    }
    function showQnaDetail(p_row_count) {
        $(".js_detail[row_count="+ p_row_count +"]").toggle();
    }

    //--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
		product.init();
        cart.init();
        opinion.init();
		qna.init();

        product.read.execute();
        product.list_option.execute();
        product.list_image.execute();
        opinion.list.execute();
        qna.list.execute();
	});

    // qna.list.cbBind = function(a) {
    //     console.log(1);
    // }

</script>        
-->

<script>
    function createQnA() {
        var url="product_QnA_Reg.asp?prt_id="+prt_id;
        window.open(url,'qna','width=850,height=800,left=300,scrollbars=yes');
    }
    function showQnaDetail(p_row_count) {
        $(".js_detail[row_count="+ p_row_count +"]").toggle();
    }
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-detail-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-opinion-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/ORD/Service/order-cart-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-qna-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var prt = new _W.BindModelAjax(new ProductDetailService());
	var opinion = new _W.BindModelAjax(new ProductOpinionService());
	var qna = new _W.BindModelAjax(new ProductQnaService("-qna"));
	var cart = new _W.BindModelAjax(new OrderCartService());
    
    // var prt_id = "<%=prt_id%>";
    var prt_id      = getParamsToJSON(location.href).prt_id;
    var client_id   = "<%=SSID%>";
    var meb_idx     = "<%=MEB_IDX%>";

    isLog = true;
    // 속성 설정 : prt
    prt.items["prt_id"].value   = prt_id;
    // 속성 설정 : opinion
    opinion.items["prt_id"].value   = prt_id;
    opinion.prop["__isGetLoad"]     = false;
    // 속성 설정 : qna
    qna.items["prt_id"].value	    = prt_id;
    // 속성 설정 : cart
    cart.items["meb_idx"].value     = meb_idx;
    cart.items["client_id"].value   = client_id;
    cart.cartInfo = prt.cartInfo;   // prt 와 연결
    
    // 콜백 등록 : opinion
    opinion.list.onExecuted  = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        $(".opinion-totalView").text(row_total);   // 후기갯수
    };   
    // 콜백 등록 : qna
    qna.list.onExecuted  = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        $(".qna-totalView").text(row_total);
    };
    // 콜백 등록 : prt
    prt.read.onExecuted  = function(p_cmd, p_result) {
        var state_code = prt.items['state_cd'].value;
        var msg = "";
        if (state_code === 'SS') { 
            $('#btn_Order').click(cart.fn.procOrder);
            $('#btn_Cart').click(cart.fn.procCart);
        } else {
            msg = (state_code === "DS") ? '재고가 없는상품은 구매할 수 없습니다.' : '팬매중인 상품이 아닙니다.';
            $('#btn_Order').click(function() {
                alert(msg);
            });
            $('#btn_Cart').click(function() {
                alert(msg);
            });
        }
    };    
    // 콜백 등록 : cart
    cart.create.onExecuted  = function(p_cmd, p_result) {
        var state_cd = cart.items["state_cd"].value;
        if (p_result["return"] >= 0) { 
            if (state_cd === "P") location.href = "/Front/PC/order/cart.asp";
            if (state_cd === "R") location.href = "/Front/PC/member/login.asp?cmd=ORDER&returnUrl=/Front/PC/order/order.asp";
        } else {
            alert("등록 실패 하였습니다. Result Code : " + result);
        }
    };

	// 이벤트 바인딩
	$('#s-area-option').change(prt.fn.addOption);
    
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        prt.init();
        opinion.init();
		qna.init();
        // prt
        prt.fn.procRead();
        prt.fn.procOptionList();
        prt.fn.procPhotoList();
        // opinion
        opinion.fn.procList();
        // qna
        qna.fn.procList();
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