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
    Dim dsp_id          : dsp_id        = Request("dsp_id")


    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim i

%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/goods.css?ts=1604047110" />
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
                    <div id="bannerSearch" style="margin-bottom:30px;text-align:center;">
                        <img src="/Front/PC/img/title/visual_sub1_5_1.jpg" alt="고산촌 한우">
                    </div>
                    <!--
                    <div id="bannerSearch" style="margin-bottom:30px;text-align:center;"></div>
                    -->
                    <div class="content">

                        <div class="sub">
                            
                        </div>

                        <div class="main_visual">
                            <div class="esobest_menu">
                                <div class="esotitle" id="m-dspName" style="padding-top:10px;">__</div>
                                <div class="esotitlesub" style="margin:0;" id="m-subName">
                                    프리미엄 명품 고산촌 미경산 한우
                                </div>
                                <div class="" id="area_category">
                                    <ul class="esoalt">
                                        <li>
                                            <essomenu class="">   
                                            <div>
                                                <ul class="esotabtabs-c" id="s-area-disp">
                                                </ul>
                                                W<script id="s-temp-disp" type="text/x-handlebars-template">
                                                    {{#rows}} 
                                                    <li rel="esotab1-c"><a href="?dsp_id={{dsp_id}}">{{dspName}}</a></li>
                                                    {{/rows}} 
                                                </script>

                                            </div>
                                            </essomenu>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div id="bannerSearch" style="margin-bottom:30px;text-align:center;"></div>

                        <div class="goods_search_cont">
                            
                            <div class="goods_pick_list">
                                <div class="pick_list_box">
                                    <ul class="pick_list">
                                        <li>
                                            <input type="radio" id="sort1" class="radio" name="btn_Sort" value="0">
                                            <label for="sort1" class="on" >추천순</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="sort2" class="radio" name="btn_Sort" value="1">
                                            <label for="sort2" >판매인기순</label>
                                        </li>
                                        <!-- <li>
                                            <input type="radio" id="sort3" class="radio" name="sort" value="price_asc">
                                            <label for="sort3">낮은가격순</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="sort4" class="radio" name="sort" value="price_dsc">
                                            <label for="sort4">높은가격순</label>
                                        </li -->
                                        <li>
                                            <input type="radio" id="sort5" class="radio" name="btn_Sort" value="2">
                                            <label for="sort5" >상품평순</label>
                                        </li>
                                        <!-- <li>
                                            <input type="radio" id="sort6" class="radio" name="sort" value="date">
                                            <label for="sort6">등록일순</label>
                                        </li-->
                                    </ul>
                                    <div class="choice_num_view">
                                        <select class="chosen-select" id="sel_Pagesize" name="m-page_size">
                                            <option value="8"> 8개씩 보기</option>
                                            <option value="12" selected> 12개씩 보기 </option>
                                            <option value="16"> 16개씩 보기 </option>
                                            <option value="40"> 40개씩 보기 </option>
                                        </select>
                                        <!-- <div class="chosen-container chosen-container-single chosen-container-single-nosearch" style="width: 120px;" title=""><a class="chosen-single"><span>20개씩보기</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" readonly=""></div><ul class="chosen-results"></ul></div></div> -->
                                    </div>
                                    <!-- //choice_num_view -->
                                </div>
                                <!-- //pick_list_box -->
                            </div>
                            <!-- //goods_pick_list -->

                            <div class="goods_list">
                                <!-- //goods_list_tit -->
                                <div class="goods_list_cont">
                                    <div class="item_gallery_type">
                                        <ul id="s-area-list"></ul>
                                        <script id="s-temp-list" type="text/x-handlebars-template">
                                            {{#rows}} 
                                            <li style="width:25%;">
                                                <div class="item_cont">
                                                    <div class="item_photo_box" data-image-list="/data/goods/18/03/10//1000002417/1000002417_list_015.jpg" data-image-main="/data/goods/18/03/10//1000002417/1000002417_main_042.png" data-image-detail="/data/goods/18/03/10//1000002417/1000002417_detail_042.jpg" data-image-magnify="/data/goods/18/03/10//1000002417/1000002417_magnify_034.jpg" data-image-add3="/data/goods/18/03/10//1000002417/1000002417_add3_082.jpg">
                                                        <a href="product.asp?prt_id={{prt_id}}">
                                                            <img src="{{fileName}}" width="600" alt="{{prtName}}" title="{{prtName}}" class="middle">
                                                        </a>
                                                    </div>
                                                    <!-- //item_photo_box -->
                                                    <div class="item_info_cont">
                                                        <div class="item_tit_box">
                                                            <a href="product.asp?prt_id={{prt_id}}">
                                                                <strong class="item_name">{{prtName}}</strong>
                                                            </a>
                                                        </div>
                                                        <!-- //item_tit_box -->

                                                        <div class="item_money_box">
                                                            
                                                            <span class="fixed_price" style="color:#888; ">
                                                            <em style="text-decoration:line-through;">{{comma_num sell_mn}}원 </em>
                                                            </span>
                                                            <strong class="item_price">

                                                                <span style="">{{comma_num discount_mn}}원 </span>

                                                            </strong>
                                                            <strong class="item_sale coupon_price"></strong>
                                                            <span class="sale_price" style="display:none;"></span>
                                                        </div>
                                                        <!-- //item_money_box -->



                                                        <!-- //item_number_box -->
                                                        <div class="item_icon_box">
                                                            
                                                        </div>
                                                        <!-- //item_icon_box -->
                                                        
                                                        <!-- 상품후기갯수. -->
                                                        <div class="review_count" style="color:#555;">
                                                            <a href="../goods/goods_view.php?goodsNo=1000002417#reviews" class="crema-product-reviews-count" data-product-code="1000002417" data-format="리뷰 {{{count}}}" data-hide-if-zero="1">{{optName}}</a>
                                                            <span style="color:red">{{state_info}}</span>
                                                        </div>
                                                        <!-- //상품후기갯수 -->
                                                    </div>
                                                    <!-- //item_info_cont -->
                                                </div>
                                                <!-- //item_cont -->
                                            </li>
                                            {{/rows}} 
                                        </script>
                                    </div>
                                    <!-- //item_gallery_type -->
                                </div>
                                <!-- //goods_list_cont -->
                            </div>
                            <!-- //goods_list -->

                            <div class="pagination" id="s-area-page"></div>

                            <!-- //pagination -->

                        </div>
                        <!-- //goods_search_cont -->

                    </div>
                    <!-- //content -->

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
<script src="/Front/frt_mod/PRT/Service/product-display-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-display-prt-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var dspPrt = new _W.BindModelAjax(new ProductDisplayPrtService());
	var display = new _W.BindModelAjax(new ProductDisplayService());
    
    var dsp_id      = getParamsToJSON(location.href).dsp_id;
	
    isLog = true;
    // 속성 설정 : dspPrt
    dspPrt.items["dsp_id"].value = dsp_id;
	// 속성 설정 : display
    display.items["dsp_id"].value = dsp_id;

    // 콜백 등록 : dspPrt
    display.sub.onExecuted  = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (row_total === 0) $("#area_category").css("display", "none");
    };    

	// 이벤트 바인딩
	$('#sel_Pagesize').change(dspPrt.fn.changePagesize);
    $('[name=btn_Sort]').click(dspPrt.fn.procSortList);
    
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        dspPrt.init();
        display.init();
        // dspPrt
        dspPrt.fn.procList();
        // display
        display.fn.procRead();
        display.fn.procSubList();

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