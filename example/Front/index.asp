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
<!--#include virtual="/Module/PRT/PRT_DispPrt.Cls.asp"-->
<%	

    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim dsp_id          : dsp_id        = Request("dsp_id")
    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim i
	
    Dim cDispPrt : Set cDispPrt = New PRT_DispPrt_Cls

%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/main.css?ts=1604047110" />
</head>

<body class="body-main body-index pc"  >
    <div class="top_area" style="height: 0px;">
        <div id="popupCode_layer_34" style="z-index: 100; position: absolute; top: 0px; left: 0px; width: 100%; display: none;">
        
            <div class="pc_top_banner">
                <div class="pc_top_banner_in">
                    <div class="pc_top_banner_content">
                        <p style="text-align: center;" align="center"><a href="https://고산촌.kr/main/html.php?htmid=promotion/e210104/event.html&amp;nac_inbc=195&amp;nac_inbs=pc_201211_%EC%97%B0%EB%A7%90%EA%B2%B0%EC%82%B0"><!--<img src="/data/editor/design/201231/top_banner_155447.jpg">--></a></p>
                    </div>
                    <div class="pc_top_banner_ctrl">
                        <a href="#test_banner_close" class="pc_top_banner_close" onclick="gd_hide_top_popup('2','popupCode_layer_34');">
                            <!--<img src="/data/skin/front/lady2019_C/img/common/layer/btn_layer_close_w.png" alt="">-->
                        </a>
                        <a href="#test_banner_today" class="pc_top_banner_today">
                            <label><input type="checkbox" id="todayUnSee_popupCode_layer_34" class="checkbox" onclick="gd_hide_top_popup('1','popupCode_layer_34', this);"> 오늘 하루 보이지 않음</label>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- //top_area -->

    <div id="warp" >
        <div id="header_warp">
<!--#include virtual="/Front/PC/include/Header.I.asp"-->
        </div>
         <!-- //header_warp -->

        <div id="container">

            <div id="contents">
                <div id="sub_content">
                    <div class="esocontainer">
                        <div class="esomainslider">
                            <div style="width:1240px; height:450px; overflow:hidden;"><style type="text/css">
                                    .slider-wrap .slick-slide {
                                        overflow:hidden;
                                    }
                                
                                    .slider-banner-4146068877{
                                    width:100%;
                                    }
                                    .slider-banner-4146068877 img{
                                        max-width: 100%;
                                    }
                                
                                    .body-main #wrap .slider-banner-4146068877 img{max-width:none;}
                                
                                    .slider-banner-4146068877 .slick-prev{
                                        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
                                        background:#ffffff\0/IE8;
                                    }
                                    .slider-banner-4146068877 .slick-next{
                                        background-image:   url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
                                        background:#ffffff\0/IE8;
                                    }
                                
                                    .slider-banner-4146068877  .slick-dots li button{
                                        width:8px;
                                        height:8px;
                                        border-radius:100%;
                                        background:#999999;
                                    }
                                    .slider-banner-4146068877 .slick-dots li.slick-active button{
                                        background:#ffffff;
                                    }
                                </style>
                    
                                <div class="slider-wrap slider-banner-4146068877 slick-initialized slick-slider slick-dotted" role="toolbar">
                                    <div aria-live="polite" class="slick-list" style="height: 390px;">
                                        <div class="slick-track" style="opacity: 1; width: 30000px;" role="listbox">
                                            
                                            <div class="slick-slide" data-slick-index="0" aria-hidden="true" style="position: relative; left: 0px; top: 0px; z-index: 998; opacity: 0; transition: opacity 300ms ease 0s;" tabindex="-1" role="option" aria-describedby="slick-slide00">
                                            <a href="#" tabindex="-1"><img src="/Front/PC/img/title/Main_title.jpg" alt="고산촌 한우"></a>
                                            </div>
                                            <div class="slick-slide slick-current slick-active" data-slick-index="1" aria-hidden="false" style="position: relative; left: -1240px; top: 0px; z-index: 999; opacity: 1;" tabindex="-1" role="option" aria-describedby="slick-slide01">
                                            
                                            <a href="#" tabindex="0"><img src="/Front/PC/img/title/visual_sub1_4.jpg" alt="고산촌 한우"></a>
                                            <!--
                                            <a href="#" tabindex="0"><img src="/Front/PC/img/title/Main_title.jpg" alt="고산촌 한우" title="고산촌 한우"></a>
                                            
                                            </div><div class="slick-slide" data-slick-index="2" aria-hidden="true" style="position: relative; left: -2480px; top: 0px; z-index: 998; opacity: 0; transition: opacity 300ms ease 0s;" tabindex="-1" role="option" aria-describedby="slick-slide02">
                                            <a href="#" tabindex="-1"><img src="Front/PC/img/banner.jpg" alt="딱봐도 예뻐! 인테리어 완성템" title="딱봐도 예뻐! 인테리어 완성템"></a>
                                            </div><div class="slick-slide" data-slick-index="3" aria-hidden="true" style="position: relative; left: -3720px; top: 0px; z-index: 998; opacity: 0; transition: opacity 300ms ease 0s;" tabindex="-1" role="option" aria-describedby="slick-slide03">
                                            <a href="#" tabindex="-1"><img src="/data/skin/front/lady2019_C/img/banner/slider_4146068877/86065aa8ad3e69fac28437ba915e370e_27302.jpg" alt="소파맛집 up to 57%할인" title="소파맛집 up to 57%할인"></a>
                                            </div><div class="slick-slide" data-slick-index="4" aria-hidden="true" style="position: relative; left: -4960px; top: 0px; z-index: 998; opacity: 0; transition: opacity 300ms ease 0s;" tabindex="-1" role="option" aria-describedby="slick-slide04">
                                            <a href="#" tabindex="-1"><img src="/data/skin/front/lady2019_C/img/banner/slider_4146068877/b5a4bb1aeb13bf40b8e8fda8e8382a72_76529.jpg" alt="옷장 베스트만봐!" title="옷장 베스트만봐!"></a>
                                            </div><div class="slick-slide" data-slick-index="5" aria-hidden="true" style="position: relative; left: -6200px; top: 0px; z-index: 998; opacity: 0; transition: opacity 300ms ease 0s;" tabindex="-1" role="option" aria-describedby="slick-slide05">
                                            <a href="#" tabindex="-1"><img src="/data/skin/front/lady2019_C/img/banner/slider_4146068877/d7fc9c93e7670c36cc9eaa9fc0e49915_16284.jpg" alt="1월 포토리뷰 이벤트" title="1월 포토리뷰 이벤트"></a>
                                            -->
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="slick-dots" style="display: block;" role="tablist" >
                                        <li aria-hidden="true" role="presentation" aria-selected="true" aria-controls="navigation00" id="slick-slide00" class="slick-active"><a href="/Front/PC/info/company.asp">고산촌 소개</a></li>
                                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation01" id="slick-slide01" class=""><a href="/Front/PC/info/missCow.asp">고산촌 미스코리우란? </a></li>
                                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation02" id="slick-slide02" class=""><a href="/Front/PC/shop/display.asp?dsp_id=3">명품 한우 구이(스테이크)</a></li>
                                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation03" id="slick-slide03" class=""><a href="/Front/PC/shop/display.asp?dsp_id=10">미경산 한우 특수부위</a></li>
                                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation04" id="slick-slide04" class=""><a href="/Front/PC/shop/displayMissCow.asp?dsp_id=2">명품 미경산 한우</a></li>
                                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation04" id="slick-slide04" class=""><a href="/Front/PC/info/map.asp">찾아오시는길</a></li>
                                    </ul>
                                </div>
                                <!--
                                <script src="/data/skin/front/lady2019_C/js/slider/slick/slick.js" type="text/javascript" charset="utf-8"></script>
                                -->
                                <script type="text/javascript">
                                    // $(document).ready(function(){
                                    //     $('.slider-banner-4146068877').not('.slick-initialized').slick({
                                    //         autoplay: true,
                                    //         dots: true,
                                    //         arrows: false,
                                    //         infinite: true,
                                    //         autoplaySpeed :3000,
                                    //         speed:300,
                                    //         slidesToShow: 1,
                                    //         fade: true,
                                    //         centerMode:true,
                                    //         variableWidth: true,
                                    //         adaptiveHeight: true,
                                    //         draggable : false
                                    //     });
                                    // });
                                </script>
                            </div>
                        </div>
                        <!-- //esomainslider -->           
                    </div>         
                    <!-- //esocontainer -->       




                    <style>

                        .best_bg {width:100%; background:#f7f7f7; padding:0 0 50px; margin:20px 0 70px;}
                        .best_bg > .main_goods_cont {min-width:1200px !important;}
                        .best_bg .goods_tab_box ul li {background:#fff; width:24% !important; margin-right:1.3%; box-shadow:5px 5px 10px #eee;}
                        .best_bg .goods_tab_box ul li:nth-child(4n) {margin-right:0;}
                        .best_bg .goods_tab_box .item_money_box .item_price {color:#333;}
                        .best_bg .item_icon_box {position:absolute; top:240px; left:25px;}
                        
                        .item_hl_tab_type .goods_tab_tit li {position:relative;}
                        .item_hl_tab_type .goods_tab_tit li a {border:0; padding:0; line-height:55px;}
                        .item_hl_tab_type .goods_tab_tit li:first-child a {padding-left:15px;}
                        .item_hl_tab_type .goods_tab_tit li em {position:absolute; top:50%; margin-top:-7px; left:50%; margin-left:-35px;}
                        .item_hl_tab_type .goods_tab_tit li.on a {border:0; background:#458e98; color:#fff; font-size:15px; font-weight:normal; line-height:60px; margin-top:-2.5px; box-shadow:5px 5px 10px hsla(0, 0%, 0%, 0.1);}
                        
                        .middle_event {width:100%; margin:100px 0 70px; background:url('/data/skin/front/lady2019_C/img/main/main_middle_event_bg.jpg') repeat-x;}
                        .middle_event_in {width:1240px; margin:0 auto;}
                        
                        .event_con .event_title {text-align:center; font-size:32px; line-height:50px; letter-spacing:-1px; padding:40px 0 60px;}	
                        .event_con {position:relative;}
                        .event_con .btn_more {position:absolute; top:55px; left:50%; margin-left:560px;}
                        .event_con .btn_more a {display:inline-block; color:#333; border:1px solid #eee; padding:0 8px; transition:0.5s all ease}
                        .event_con .btn_more a:hover {background:#eee; color:#333;}
                        
                        .event_con .event_list .ev_li {display:inline-block; position:relative; margin-right:12px; margin-bottom:40px;}
                        .event_con .event_list .ev_li .icon_wrap {position:absolute; width:96%; left:2%; top:-2px; z-index:100; height:29px; text-align:left;}
                        .event_con .event_list .ev_li em {display:inline-block; width:55px; height:29px;}
                        .event_con .event_list .ev_li em.icon_promotion {background:url('http://oheimev.diskn.com/event/godomall/main/event_icon_promotion.png') no-repeat;}
                        .event_con .event_list .ev_li em.icon_gift {background:url('http://oheimev.diskn.com/event/godomall/main/event_icon_gift.png') no-repeat;}
                        .event_con .event_list .ev_li em.icon_new {background:url('http://oheimev.diskn.com/event/godomall/main/event_icon_new.png') no-repeat;}
                        .event_con .event_list .ev_li em.icon_coupon {background:url('http://oheimev.diskn.com/event/godomall/main/event_icon_coupon.png') no-repeat;}
                        .event_con .event_list .ev_li em.icon_influencer {background:url('http://oheimev.diskn.com/event/godomall/main/event_icon_influencer.png') no-repeat;}
                        .event_con .event_list .ev_li em.icon_review {background:url('http://oheimev.diskn.com/event/godomall/main/event_icon_review.png') no-repeat;}
                        .event_con .event_list .ev_li em.icon_sale {background:url('http://oheimev.diskn.com/event/godomall/main/event_icon_sale.png') no-repeat;}
                        .event_con .event_list .ev_li a:hover img {transform:scale(1.03);}
                        .event_con .event_list .ev_li a img {transition:0.5s all ease;}
                        .event_con .event_list .ev_li .ev_img {width:405px; overflow:hidden;}
                        
                        .event_con .event_list p {text-align:center; letter-spacing:-0.5px}
                        .event_con .event_list .ev_img {position:relative;}
                        .event_con .event_list .ev_img span {position:absolute; right:0; bottom:0; background:hsla(0, 0%, 0%, 0.4); z-index:900; color:#fff; padding:0 10px;}
                        .event_con .event_list .ev_tit {font-size:21px; font-weight:bold; margin-top:13px; line-height:1.5;}
                        .event_con .event_list .ev_txt {font-size:16px; color:#949494; margin-top:5px; height:2.3em; line-height:1.3;}
                        
                        .event_con .slick-prev {left:-50px; background:url('/data/skin/front/lady2019_C/img/common/btn/btn_horizontal_prev3.png') no-repeat center center; opacity:0.4;}
                        .event_con .slick-next {right:-50px; background:url('/data/skin/front/lady2019_C/img/common/btn/btn_horizontal_next3.png') no-repeat center center; opacity:0.4;}
                        .event_con button:hover {opacity:1;}
                        .event_con button.slick-disabled {opacity:0.2; cursor:auto;}
                        .event_con .slick-slider .slick-list {padding-top:5px;}
                        
                    </style>
                    <div class="main_goods_cont">

                        <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
                        <style type="text/css">
                            .rolling_panel { position: relative; width: 820px; height: 330px; margin: 0; padding: 0; border: 0px solid #c7c7c7; overflow: hidden; }
                            .rolling_panel ul { position: absolute; margin: 5px; padding: 0; list-style: none; }
                            .rolling_panel ul li { float: left; width: 810px; height: 320px;}

                            .dot {
                                cursor: pointer;
                                height: 15px;
                                width: 15px;
                                margin: 0 2px;
                                background-color: #bbb;
                                border-radius: 50%;
                                display: inline-block;
                                transition: background-color 0.6s ease;
                            }
                            .active {
                                background-color: #717171;
                            }
                                
                            }
                        </style>
                        <div style="height: 340px;display:none;" id="s-area-roll">
                            <div style="width: 810px;height: 320px;position: relative;float: left;">
                                <div class="rolling_panel">
                                    <ul id="s-area-list-roll">
                                        <!--
                                        <li row_count="1"><img src="https://firebasestorage.googleapis.com/v0/b/jyg-custom-seoul-app/o/events%2Fassets%2Ftemplete_assets%2F2021-03-spring-banner-pc.png?alt=media" ></li>
                                        <li row_count="2"><img src="https://firebasestorage.googleapis.com/v0/b/jyg-custom-seoul-app/o/events%2Fassets%2Ftemplete_assets%2F2021-03-spring-banner-pc.png?alt=media" ></li>
                                        <li row_count="3"><img src="https://firebasestorage.googleapis.com/v0/b/jyg-custom-seoul-app/o/events%2Fassets%2Ftemplete_assets%2F2021-03-spring-banner-pc.png?alt=media" ></li>
                                        <li row_count="4"><img src="https://firebasestorage.googleapis.com/v0/b/jyg-custom-seoul-app/o/events%2Fassets%2Ftemplete_assets%2F2021-03-spring-banner-pc.png?alt=media" ></li>
                                        -->
                                    </ul>
                                </div>
                                <script id="s-temp-list-roll" type="text/x-handlebars-template">
                                    {{#rows}}
                                        <li row_count="{{row_count}}"><a href="{{pcLink}}"><img src="{{pcUrl}}" ></a></li>
                                    {{/rows}} 
                                </script>

                                <div style="text-align:center" id="s-area-list-roll-page">
                                    <!--
                                    <span class="dot" row_count="2" onclick="currentSlide(2)"></span> 
                                    <span class="dot" row_count="3" onclick="currentSlide(3)"></span> 
                                    <span class="dot" row_count="4" onclick="currentSlide(4)"></span>
                                    -->
                                </div>
                                <script id="s-temp-list-roll-page" type="text/x-handlebars-template">
                                    {{#rows}}
                                        <span class="dot" row_count="{{row_count}}"></span> 
                                    {{/rows}} 
                                </script>

                                <a href="javascript:void(0)" id="prev"><span id="index-event__prev" style="cursor: pointer;position: absolute;top: calc(50% - 30px);left: 0;"><img data-v-0c46c4df="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuugiOydtOyWtF8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiCgkgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMzYgNjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM2IDYwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2NsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Qxe29wYWNpdHk6MC41O2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTt9Cgkuc3Qye2ZpbGw6I0Q4RDhEODt9Cjwvc3R5bGU+CjxnPgoJPGRlZnM+CgkJPHJlY3QgaWQ9IlNWR0lEXzFfIiB3aWR0aD0iMzYiIGhlaWdodD0iNjAiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MCI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8zXyIgeD0iLTExNDQiIHk9Ii05OTIiIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjMyMTQiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCQk8cmVjdCB4PSItNSIgeT0iLTUiIGNsYXNzPSJzdDEiIHdpZHRoPSI0NiIgaGVpZ2h0PSI3MCIvPgoJPC9nPgo8L2c+CjxnPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE0LDM5LjdjLTAuMywwLTAuNS0wLjEtMC43LTAuM2MtMC40LTAuNC0wLjQtMSwwLjEtMS40bDguMi03LjZsLTguMi03LjZjLTAuNC0wLjQtMC40LTEtMC4xLTEuNAoJCWMwLjQtMC40LDEtMC40LDEuNC0wLjFsOSw4LjRjMC4yLDAuMiwwLjMsMC41LDAuMywwLjdzLTAuMSwwLjUtMC4zLDAuN2wtOSw4LjRDMTQuNSwzOS42LDE0LjIsMzkuNywxNCwzOS43eiIvPgo8L2c+Cjwvc3ZnPgo=" width="36px" height="60px" style="transform: rotateY(180deg);"></span></a>
                                <a href="javascript:void(0)" id="next"><span id="index-event__next" style="cursor: pointer;position: absolute;right: 0;top: calc(50% - 30px);"><img data-v-0c46c4df="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuugiOydtOyWtF8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiCgkgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMzYgNjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM2IDYwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2NsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Qxe29wYWNpdHk6MC41O2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTt9Cgkuc3Qye2ZpbGw6I0Q4RDhEODt9Cjwvc3R5bGU+CjxnPgoJPGRlZnM+CgkJPHJlY3QgaWQ9IlNWR0lEXzFfIiB3aWR0aD0iMzYiIGhlaWdodD0iNjAiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MCI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8zXyIgeD0iLTExNDQiIHk9Ii05OTIiIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjMyMTQiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCQk8cmVjdCB4PSItNSIgeT0iLTUiIGNsYXNzPSJzdDEiIHdpZHRoPSI0NiIgaGVpZ2h0PSI3MCIvPgoJPC9nPgo8L2c+CjxnPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE0LDM5LjdjLTAuMywwLTAuNS0wLjEtMC43LTAuM2MtMC40LTAuNC0wLjQtMSwwLjEtMS40bDguMi03LjZsLTguMi03LjZjLTAuNC0wLjQtMC40LTEtMC4xLTEuNAoJCWMwLjQtMC40LDEtMC40LDEuNC0wLjFsOSw4LjRjMC4yLDAuMiwwLjMsMC41LDAuMywwLjdzLTAuMSwwLjUtMC4zLDAuN2wtOSw4LjRDMTQuNSwzOS42LDE0LjIsMzkuNywxNCwzOS43eiIvPgo8L2c+Cjwvc3ZnPgo=" width="36px" height="60px"></span></a>
                                
                            </div>
                            <img data-v-0c46c4df="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAAB7FBMVEUAAAC75fe75fe75few3fK75fe75fe75fe75fcAbKO75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fcAbKO75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fe75fdFjrm75fe75fe75fe75fe75fe75fcAbKMAbKMAbKMAbKNipswAbKO75fcAbKP///8AdKcAAABke4QxPUKJqLZrrc86jLmOxeFRk7yw3fKCsc620uPB2efw9fknf6/H2+lro8VwsNLU5O4ngrLj7fUWeq17rMs6h7RcmsBCkb1wipSix9au1udmqM0Ab6UAdKiWt8Z7t9cMd6kMDxCZzeek1e2Zv9c1ireEvtwZHiEshbRUnMXQ4e2oyNxyp8g/irUbfK5Mkbq55fdHlL8lLjGKttHg6/Naocj7/f6ixdpgpMtjnsOQx+J2tdVNmMIhfa1XanNKW2P2+vy04fStzN+TvNW91uap2e8+TFPt8/ja6PGyz+EIdqny9/qNuNNzstMzhLIugbCewtlfnMJ9maTn8Pah0uucz+mGtNB9r81Sm8SVyuWRyONjfVemAAAARHRSTlMA/AQLCK/xzvmwQk4iELXhjZEcKPVwVNLRfmklxqCWgnqGSOWndh+kozkr39xkPhXr1G67YDHu/ue5nrrT7dGOYuvYJWI22LYAABf6SURBVHja7NrZTxNBHMDx2d4C5WiRlFtUBEQQ7zOev9/yooK1FFEqfbAGItIgKtbIIYkkBUrEA5Hg/Y9a2lIKS9vd2dl2Fvw8NenbN539zc6U8MXkbK84WV/XVFxjPVZy9qwNACxnO44dO2GtMV8sbWwrbHeayH87KCpoa2iqOQ8ynK9pamgrKCL/xdnbq+pqLKCYpaauqt1O9jRjwQFzK6jSaj5QYCR70fGKMqsATAjWsorjZC8xtDdYgTFrQ7uB7AmONrMFNGExtznILuesdIGmXJVOsmtVH3BBDrgOVJNdyNFohZyxNu6ytWwoLBYgp4Tiwt0zU4oaDkEeHGrYFW8rhopTAuSJcKpC7z9De2Mr5FVro57f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" width="320px" height="320px" class="index-freshplan__img" style="float: right">
                        </div>
                        <script type="text/javascript">
                            // $(document).ready(


                            function rolling() {

                                

                                var $panel = $(".rolling_panel").find("ul");
                
                                var itemWidth = $panel.children().outerWidth(); // 아이템 가로 길이
                                var itemLength = $panel.children().length;      // 아이템 수
                                
                                var __index = itemLength;

                
                                // Auto 롤링 아이디
                                var rollingId;
                
                                auto();
                
                                // 배너 마우스 오버 이벤트
                                $panel.mouseover(function() {
                                    clearInterval(rollingId);
                                });
                
                                // 배너 마우스 아웃 이벤트
                                $panel.mouseout(function() {
                                    auto();
                                });
                
                                // 이전 이벤트
                                $("#prev").on("click", prev);
                
                                $("#prev").mouseover(function(e) {
                                    clearInterval(rollingId);
                                });
                
                                $("#prev").mouseout(auto);
                
                                // 다음 이벤트
                                $("#next").on("click", next);
                
                                $("#next").mouseover(function(e) {
                                    clearInterval(rollingId);
                                });
                
                                $("#next").mouseout(auto);
                
                                function auto() {
                
                                    // 2초마다 start 호출
                                    rollingId = setInterval(function() {
                                        start();
                                    }, 2000);
                                }
                
                                // 첫 dot 서냍ㄱ
                                $(".dot[row_count=1]").css("background", "red");

                                function start() {
                                    $panel.css("width", itemWidth * itemLength);
                                    $panel.animate({"left": - itemWidth + "px"}, function() {
                
                                        // 첫번째 아이템을 마지막에 추가하기
                                        $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
                
                                        // 첫번째 아이템을 삭제하기
                                        $(this).find("li:first").remove();
                
                                        // 좌측 패널 수치 초기화
                                        $(this).css("left", 0);
                                        
                                        // 페이지 표시
                                        __index++  
                                        var row_count = (__index % itemLength) + 1;
                                        $(".dot").css("background", "#bbb");
                                        $(".dot[row_count="+ row_count +"]").css("background", "red");
                                    });
                                }
                
                                // 이전 이벤트 실행
                                function prev(e) {
                                        $panel.css("left", - itemWidth);
                                        $panel.prepend("<li>" + $panel.find("li:last").html() + "</li>");
                                        $panel.animate({"left": "0px"}, function() {
                                        $(this).find("li:last").remove();
                                        $('#prev').attr('disabled', false);

                                        // 페이지 표시
                                        __index--;
                                        var row_count = (__index % itemLength) + 1;
                                        $(".dot").css("background", "#bbb");
                                        $(".dot[row_count="+ row_count +"]").css("background", "red");
                                    });

                                }
                
                                // 다음 이벤트 실행
                                function next(e) {
                                    $panel.animate({"left": - itemWidth + "px"}, function() {
                                        $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
                                        $(this).find("li:first").remove();
                                        $(this).css("left", 0);
                                        __index++;
                                        var row_count = (__index % itemLength) + 1;
                                        $(".dot").css("background", "#bbb");
                                        $(".dot[row_count="+ row_count +"]").css("background", "red");
                                    });
                                }
                            }
                            // );
                        </script>
                        
                        <br />

                        <div class="esotitle" style="margin-bottom:20px;padding-top:0px;"><a href="/Front/PC/shop/economy.asp?dsp_id=8"><img src="/Front/PC/img/title/new_title_2.jpg"></a></div>
                        <!-- <div class="esotitle" style="margin-bottom:20px;"> New Product</div> -->

                        <div class="goods_list">
                            <!-- //goods_list_tit -->
                            <div class="goods_list_cont">
                                <div class="item_gallery_type">
                                    <ul id="s-area-list-eco" style="height: 280px;">
                                    </ul>
                                    <script id="s-temp-list-eco" type="text/x-handlebars-template">
                                        {{#rows}} 
                                        <li style="width:20%;">
                                            <div class="item_cont">
                                                <div class="item_photo_box" data-image-list="/data/goods/18/03/10//1000002417/1000002417_list_015.jpg" data-image-main="/data/goods/18/03/10//1000002417/1000002417_main_042.png" data-image-detail="/data/goods/18/03/10//1000002417/1000002417_detail_042.jpg" data-image-magnify="/data/goods/18/03/10//1000002417/1000002417_magnify_034.jpg" data-image-add3="/data/goods/18/03/10//1000002417/1000002417_add3_082.jpg">
                                                    <a href="./shop/product.asp?prt_id={{prt_id}}">
                                                        <img src="{{fileName}}" width="600" alt="{{prtName}}" title="{{prtName}}" class="middle"   style="border-radius:15px">
                                                    </a>
                                                </div>
                                                <!-- //item_photo_box -->
                                                <div class="item_info_cont">
                                                    <div class="item_tit_box">
                                                        <a href="/shop/product.asp?prt_id={{prt_id}}">
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
                                                    <div class="review_count" style="color:#555;"><a href="../goods/goods_view.php?goodsNo=1000002417#reviews" class="crema-product-reviews-count" data-product-code="1000002417" data-format="리뷰 {{{count}}}" data-hide-if-zero="1">{{optName}}</a></div>
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

                    </div>
                    <!-- //main_goods_cont -->       

                    <div class="best_bg" style="margin: 10px 0 10px;padding: 0 0 10px;">

                        <div class="main_goods_cont" style="margin-bottom: 0px;">
                            <div class="esotitle">프리미엄 명품 한우(미경산)</div>
                            <div>
                                <div class="goods_list main_wrap_70">
                                    <div class="goods_list_tit">
                                        <h3>BEST</h3>
                                        <div class="btn_goods_more">
                                            <a href="../goods/goods_main.php?sno=70" class="btn_goods_view_more">+ more</a>
                                        </div>
                                    </div>
                                    <div class="goods_list_cont goods_content_70">
                                <div class="tab_goods_70 item_hl_tab_type">
                                    
                                    <div class="goods_tab_tit">
                                        <ul id="s-area-disp"></ul>
                                        <script id="s-temp-disp" type="text/x-handlebars-template">
                                            {{#rows}} 
                                            <li class="category" id="display_{{dsp_id}}" style="width:20%;"><a href="javascript:miss.fn.procList({{dsp_id}});">{{dspName}}</a></li>
                                            {{/rows}} 
                                        </script>

                                    </div>
                                    
                                    <!-- //goods_tab_tit -->
                                    <div class="goods_tab_cont">
                                        <div class="goods_tab_box on">
                                            <ul id="s-area-list-miss">
                                            </ul>
                                            <script id="s-temp-list-miss" type="text/x-handlebars-template">
                                                {{#rows}}
                                                <li style="width:25%;">
                                                    <div class="item_cont" style="min-height: 320px;">
                                                        <div class="item_photo_box" data-image-list="/data/goods/19/12/50//1000003926/register_list_06.jpg" data-image-main="/data/goods/19/12/50//1000003926/1000003926_main_034.gif" data-image-detail="/data/goods/19/12/50//1000003926/register_detail_067.jpg" data-image-magnify="/data/goods/19/12/50//1000003926/register_magnify_061.jpg" data-image-add3="/data/goods/19/12/50//1000003926/1000003926_add3_090.jpg" data-image-add4="/data/goods/19/12/50//1000003926/1000003926_add4_055.gif" style="">
                                                            <a href="/Front/PC/shop/product.asp?prt_id={{prt_id}}" alt="{{prtName}}">
                                                                <img src="{{fileName}}" width="600" alt="{{prtName}}" title="{{prtName}}" class="middle">
                                                            </a>
                                                        </div>
                                                        <!-- //item_photo_box -->
                                                        <div class="item_info_cont">
                                                            <div class="item_icon_box">
                                                                <!--<img src="/Front/PC/img/goods_icon_order.gif" alt="주문폭주" title="주문폭주" class="middle"> <img src="/Front/PC/img/hot_icon.png" alt="인기상품" title="인기상품" class="middle"> -->
                                                            </div>
                                                            <!-- //item_icon_box -->
                                
                                                            <div class="item_tit_box">
                                                                <a href="/Front/PC/shop/product.asp?prt_id={{prt_id}}">
                                                                    <strong class="item_name">{{prtName}}</strong>
                                                                </a>
                                                            </div>
                                                            <!-- //item_tit_box -->
                                                            <div class="item_money_box">
                                                                <span style="color:#888; text-decoration:line-through">{{comma_num sell_mn}}원 </span>
                                                                <strong class="item_price">
                                                                    <span style="">{{comma_num discount_mn}}원 </span>
                                                                </strong>
                                                                <!--br/>
                                                                <strong class="item_sale coupon_price" style="display:none;"></strong>
                                                                <span class="sale_price" style="display:none;">799000.00</span>
                                                                <span class="itemGoodsNo" style="display:none;">1000003926</span-->
                                                            </div>
                                                            <!-- //item_money_box -->
                                                            <!-- //item_number_box -->
                                                            
                                                    
                                                            <!-- 상품후기갯수 -->
                                                            <div class="review_count" style="left: 25px;"><a href="/Front/PC/shop/product.asp?prt_id={{prt_id}}" class="crema-product-reviews-count" data-product-code="1000003926" data-format="리뷰 {{{count}}}" data-hide-if-zero="1">{{optName}}</a></div>
                                                            <!-- //상품후기갯수 -->
                                                        </div>
                                                        <!-- //item_info_cont -->
                                                    </div>
                                                    <!-- //item_cont -->
                                                </li>
                                                {{/rows}} 
                                            </script>    
                                        </div>
                                        
                                    </div>
                                    <!-- //goods_tab_cont -->
                                </div>
                                
                                <!-- //item_vl_tab_type -->
                                <script type="text/javascript">
                                    <!--
                                //     $(document).ready(function() {
                                //         $('.tab_goods_70 .goods_tab_tit li').click(function(e){
                                //             e.preventDefault();
                                //             $(this).addClass('on').siblings().removeClass('on');	//탭버튼에 on클래스 주기
                                // //                if ($('.tab_goods_70 .goods_tab_cont > .goods_tab_box').eq($(this).index()).length == 0) {
                                // //                    $('.tab_goods_70 .goods_tab_cont > .goods_tab_box').removeClass('on');
                                // //                }
                                //             $('.tab_goods_70 .goods_tab_cont > .goods_tab_box').eq($(this).index()).addClass('on').siblings().removeClass('on');	//해당 탭 내용 열고 나머지 닫기
                                //         });
                                //     });
                                    //-->
                                
                                
                                </script>
                                    </div>
                                </div>
                    
                    
                            <script type="text/javascript">
                                <!--
                                // var keyValue70 = '70';
                                // var key70 = {
                                //     html: 'html' + keyValue70,
                                //     page: 'page' + keyValue70
                                // };
                                // var gdStorage70 = loadSession(key70.html);
                                // var page70 = loadSession(key70.page);
                                // $(document).ready(function() {
                                //     if (gdStorage70) {
                                //         $('.goods_content_70').html(gdStorage70);
                                //         if (page70) {
                                //             $('.main_wrap_70 .btn_goods_view_down_more').attr('data-page',page70);
                                //         }
                                //     }
                                //     $('.main_wrap_70 .btn_goods_view_down_more').on('click', function(e){
                                //         gd_get_list_70($(this).data('page'));
                                //     });
                                // });
                            
                                // function gd_get_list_70(page) {
                                //     $.get('../goods/goods_main.php', {'mode' : 'get_main', 'more' : page, 'sno' : '70', 'groupSno' : ''}, function (data) {
                                //         $(".goods_content_70").html(data);
                                //         saveSession(key70.html, data);
                                //         if (parseInt(page) + 1 > 1) {
                                //             $('.main_wrap_70 .btn_goods_view_down_more').hide();
                                //         } else {
                                //             saveSession(key70.page, parseInt(page)+1);
                                //             $('.main_wrap_70 .btn_goods_view_down_more').data('page', parseInt(page) + 1);
                                //         }
                                //     });
                                // }
                                //-->
                            </script>
                    
                            </div>
                        </div>
                    </div>
                    <!-- //best_bg -->
<script>

    // function showDisplay(p_dsp_id) {

    //     //--------------------------------------------------------------
    //     // 1. 네임스페이스 정의 및 생성
    //     var bm;

    //     bm          = new _W.Meta.Bind.BindModelAjax();
    //     bm.list     = new _W.Meta.Bind.BindCommandLookupAjax(bm, bm._baseEntity);
        
    //     //--------------------------------------------------------------    
    //     // 2. 객체 설정 (등록)
    //     bm.list.url     = "/Front/frt_mod/PRT/DisplayProduct.C.asp";

    //     //--------------------------------------------------------------    
    //     // 3. 아이템 등록 및 설정(추가)
    //     bm.addItem("cmd", "LIST", [], "bind");
    //     bm.addItem("doctype", "JSON", [], "bind");
    //     bm.addItem("dsp_id", p_dsp_id, [],  ["valid", "bind"]);

    //     //--------------------------------------------------------------    
    //     // 4. 콜백 함수 구현
    //     bm.list.cbOutput   = function(p_entity) {          // create
    //         var template = Handlebars.compile( $("#prt-list-template").html() ); 
    //         $('#prt-list-body').html("");
    //         $('#prt-list-body').append( template(p_entity.table) );
    //     };

    //     bm.list.execute();
    // }

    // showDisplay(2);
</script>

                    <div class="main_goods_cont">
                        <div class="brand_2020" style="margin: 10px auto 10px;">
                            <p class="brand_tit">고산촌 둘러보기</p>
                    
                            <img src="/Front/PC/img/title/brand.jpg" usemap="#Map_brand_2020">
                    
                            <map name="Map_brand_2020" id="Map_brand_2020">
                            <!--
                            <area shape="rect" coords="0,0,480,424" href="http://고산촌.kr/main/html.php?htmid=brand/kitchen/index.html&amp;nac_inbc=180&amp;nac_inbs=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B4%80%20pc%20-%2020201117%20%EB%A0%88%EC%9D%B4%EB%94%94%ED%82%A4%EC%B9%9C" title="고산촌키친">
                            <area shape="rect" coords="482,0,817,424" href="http://고산촌.kr/main/html.php?htmid=brand/mattue/index.html&amp;nac_inbc=181&amp;nac_inbs=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B4%80%20pc%20-%2020201117%20%EB%A7%A4%ED%8A%9C" title="매튜">
                            <area shape="rect" coords="819,0,1239,210" href="http://고산촌.kr/main/html.php?htmid=brand/scandic/index.html&amp;nac_inbc=183&amp;nac_inbs=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B4%80%20pc%20-%2020201117%20%EC%8A%A4%EC%B9%B8%EB%94%952" title="스칸딕">
                            <area shape="rect" coords="819,213,1238,424" href="http://고산촌.kr/main/html.php?htmid=brand/signature/index.html&amp;nac_inbc=184&amp;nac_inbs=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B4%80%20pc%20-%2020201117%20%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B2%98" title="시그니처">
                            <area shape="rect" coords="0,425,818,642" href="http://고산촌.kr/main/html.php?htmid=brand/forthehome/index.html&amp;nac_inbc=185&amp;nac_inbs=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B4%80%20pc%20-%2020201117%20%ED%8F%AC%EB%8D%94%ED%99%88" title="포더홈">
                            <area shape="rect" coords="0,644,818,858" href="http://고산촌.kr/main/html.php?htmid=brand/idenew/index.html&amp;nac_inbc=186&amp;nac_inbs=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B4%80%20pc%20-%2020201117%20%EC%95%84%EC%9D%B4%EB%8D%B0%EB%89%B4" title="아이데뉴">
                            <area shape="rect" coords="819,426,1237,856" href="http://고산촌.kr/main/html.php?htmid=brand/lab/index.html&amp;nac_inbc=187&amp;nac_inbs=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B4%80%20pc%20-%2020201117%20lab" title="랩">
                            -->
                            </map>
                        </div>
                    </div>                
                    <!-- //main_goods_cont -->

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

<!-- 팝업 -->
<%
    ' 로그 방문자 기록
    Server.Execute "/Front/frt_mod/DGN/DGn_Popup_A.E.asp"
%>

<!-- //팝업 -->


<script>
    function selectCategory(p_dsp_id) {
        $(".category").removeClass("on");
        $("#display_"+ p_dsp_id).addClass("on");
    }  
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-display-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-display-prt-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/DGN/Service/design-rolling-image-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var eco = new _W.BindModelAjax(new ProductDisplayPrtService("-eco"));
	var display = new _W.BindModelAjax(new ProductDisplayService());
	var miss = new _W.BindModelAjax(new ProductDisplayPrtService("-miss"));
    var roll = new _W.BindModelAjax(new DesignRollingImageService("-roll"));
    // Promise(동기화) 정의
    var d1 = $.Deferred();
    var d2 = $.Deferred();

	isLog = true;

    // 속성 설정
    eco.items["dsp_id"].value   = "8";
    display.items["dsp_id"].value  = "2";
    miss.items["dsp_id"].value   = "12";
    roll.items["roll_idx"].value    = "1";

    // 콜백 등록
    roll.list.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        var p_entity = p_result.table;
        if (row_total > 0) {
            $("#s-area-roll").show();
            var template    = Handlebars.compile( $("#s-temp-list-roll-page").html() ); 
            $("#s-area-list-roll-page").html(template(p_entity));
            rolling();  // 롤링 시작
        }
    };
    // 콜백 등록 : Promise(동기화)
    display.sub.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (row_total > 0) d1.resolve(p_result);
        else d1.reject(new Error("카테고리 로딩이 실패하였습니다."));
    }
    miss.list.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (row_total > 0) d2.resolve(p_result);
        else d2.reject(new Error("진열상품 로딩이 실패하였습니다."));
    };
    miss.items['dsp_id'].onChanged = function(nVal) {
        selectCategory(miss.items["dsp_id"].value);
    };
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        eco.init();
        display.init();
        miss.init();
        roll.init();
        // 호출
        roll.fn.procList();
        eco.fn.procList();
        display.fn.procSubList();
        miss.fn.procList();
        // 비동기 호출
        $.when(d1, d2).done(function (v1, v2) {
            selectCategory(miss.items["dsp_id"].value);
        }).fail(function(error) {
            alert(error);
            console.log(error);
        });
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
