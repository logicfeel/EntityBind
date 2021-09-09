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

%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/board.css?ts=<%=g_iRandomID%>" />

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


                    <div class="content">

                        <div class="board_zone_sec">
                            <div class="board_zone_tit">
                                <h2>공지사항</h2>
                            </div>
                            <div class="board_zone_cont">
                                <div class="board_zone_view">

                                    <div class="board_view_tit">
                                        <h3 id="m-title">
                                            로딩중
                                        </h3>
                                    </div>
                                    <div class="board_view_info">
                                        <span class="view_info_idip">
                                            <strong id="m-writer">로딩중</strong>
                                        </span>
                                        <span class="view_info_day">
                                            <em id="m-create_dt">로딩중</em>
                                        </span>
                                        <span class="view_info_hits">
                                        <!--<strong>조회수</strong> 817                </span>-->
                                    </div>
                                    <!-- //board_view_info -->


                                    <div class="board_view_content">

                                        <div class="view_goods_select">


                                        </div>
                                        <!-- //view_goods_select -->

                                        <div class="seem_cont">
                                            <div style="margin:10px 0 10px 0" id="m-contents">
                                            로딩중
                                            </div>
                                        </div>
                                        <!-- //seem_cont -->


                                    </div>
                                    <!-- //board_view_content -->


                                    <div class="board_view_comment">

                                        <div class="view_comment js_comment_area" data-bdId="notice" data-sno="3">

                                        </div>

                                    </div>
                                    <!-- //board_view_comment -->

                                </div>
                                <!-- //board_zone_view -->

                                <div class="btn_right_box">
                                    <a class="btn_board_list" id="btn_List"><strong>목록</strong></a>        
                                </div>
                            </div>
                        </div>

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
<script src="/Front/frt_mod/BOD/Service/board-notice-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var ntc = new _W.BindModelAjax(new BoardNoticeService());
	
    this.isLog = true;  // 디버깅 모드
	
    // 속성 설정 : ntc
	ntc.prop["__listUrl"] = "notice.asp";

	// 이벤트 바인딩 : ntc
	$('#btn_List').click(ntc.fn.moveList);      // 목록 이동

    //--------------------------------------------------------------
	$(document).ready(function () {
        ntc.init();
        ntc.fn.procRead();
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