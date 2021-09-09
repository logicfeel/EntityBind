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
                            <h2>이벤트</h2>
                        </div>
                        <!--게시판 주소 -->
                        <div class="esotitleline">
                        </div>

                        <!--게시판 주소 -->
                        <div class="board_zone_cont">
                            <div class="board_zone_list" align="center">
                                <table class="board_list_table" style="width:100%" "="">
                                    <colgroup>
                                        <col style="width:6%">
                                        <col style="width:37%;">
                                        <col style="width:12%">
                                        <col style="width:15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>날짜</th>
                                        <th>작성자</th>
                                        <!--<th>조회</th>-->
                                    </tr>
                                    </thead>
                                    <tbody id="s-area-list">
                                    </tbody>
                                    <script id="s-temp-list" type="text/x-handlebars-template">
                                        {{#rows}} 
                                        <tr data-sno="3" data-auth="y" style="height:10px">
                                            <td>
                                                {{row_count}}
                                            </td>
                                            <td class="board_tit">
                                                
                                                <a href="javascript:evt.fn.moveView({{evt_idx}})">
                                                    {{title}}
                                                    <img src="/Front/PC/img/icon_board_hot.png" alt="인기글">
                                                </a>
                                            </td>
                                            <td>  {{create_dt}} </td>
                                            <td> {{writer}} </td>
                                            <!--<td> 765 </td>-->
                                        </tr>
                                        {{/rows}} 
                                    </script>                                    

                                </table>

                                <!--<div class="pagination" id="CPage"><ul><li class="on"><span>1</span></li></ul></div>-->
                                <div class="pagination" id="s-area-page"></div>
                                <!-- //pagination -->

                                <div class="board_search_box">

                                        <input type="hidden" name="bdId" value="notice">
                                        <input type="hidden" name="memNo" value="">
                                        <input type="hidden" name="noheader" value="">

                                        <select class="chosen-select" name="searchField" style="display:;">
                                            <option value="subject">제목</option>
                                            <option value="contents">내용</option>
                                            <option value="writerNm">작성자</option>
                                        </select>

                                        <input type="text" id="m-keyword" class="text" name="searchWord" value="">
                                        <button id="btn_Search" class="btn_board_search"><em>검색</em></button>

                                </div>
                                <!-- //board_search_box -->

                            </div>
                            <!-- //board_zone_list -->


                        </div>
                        <!-- //board_zone_cont -->
                    </div>
                    <!-- //board_zone_sec -->

                    <form id="frmWritePassword">
                        <div id="lyPassword" class="dn layer_wrap password_layer" style="height: 226px">
                            <div class="layer_wrap_cont">
                                <div class="ly_tit">
                                    <h4>비밀번호 인증</h4>
                                </div>
                                <div class="ly_cont">
                                    <div class="scroll_box">
                                        <p>비밀번호를 입력해 주세요.</p>
                                        <input type="password" name="writerPw" class="text">
                                    </div>
                                    <!-- // -->
                                    <div class="btn_center_box">
                                        <button type="button" class="btn_ly_password js_submit"><strong>확인</strong></button>
                                    </div>
                                </div>
                                <!-- //ly_cont -->
                                <!--<a href="#close" class="ly_close layer_close"><img src="/data/skin/front/lady2019_C/img/common/layer/btn_layer_close.png" alt="닫기"></a> -->
                            </div>
                            <!-- //layer_wrap_cont -->
                        </div>
                        <!-- //layer_wrap -->
                    </form>

                    <div id="layerDim" class="dn">&nbsp;</div>
                    <!-- <script type="text/javascript" src="/data/skin/front/lady2019_C/js/gd_board_list.js" charset="utf-8"></script> -->
                    <script>
                        $(document).ready(function () {
                            $('img.js_image_load').error(function () {
                                        $(this).css('background', 'url("/data/skin/front/lady2019_C/board/skin/default/img/etc/noimg.png") no-repeat center center');
                                        $(this).attr('src', '/data/skin/front/lady2019_C/img/etc/blank.gif');
                                    })
                                    .each(function () {
                                        $(this).attr("src", $(this).attr("src"));
                                    })
                        });
                    </script>
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
<script src="/Front/frt_mod/BOD/Service/board-event-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var evt = new _W.BindModelAjax(new BoardEventService());
    
    this.isLog = true;  // 디버깅 모드
	
	// 속성 설정
	evt.prop["__viewUrl"] = "event_Viw.asp";
	evt.prop['__isGetLoad'] = false;

	// 이벤트 바인딩
	$('#btn_Search').click(evt.fn.searchList);
    //--------------------------------------------------------------
	$(document).ready(function () {
        evt.init();
		evt.fn.procList();
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