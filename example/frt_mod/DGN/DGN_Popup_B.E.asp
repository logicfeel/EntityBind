<% @CODEPAGE="65001" language="VBScript" %>
<%
'******************************************************************************
' FILENAME      : 
'------------------------------------------------------------------------------
' PROGRAM NAME  : 
' AUTHOR        : 로직
' DESCRIPTION   :
' HISTORY
'------------------------------------------------------------------------------
' DATE        NAME        DESCRIPTION
'------------------------------------------------------------------------------
'
'   확인
'   /admin/adm_mod/sto/Account.C.asp?cmd=LIST&doctype=xml
'
'******************************************************************************
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Define.I.asp"-->
<!--#include virtual="/Module/DGN/DGN_Popup.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim strContent

    Dim cAccount, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Dim cPopup      : Set cPopup = New DGN_Popup_Cls

    cPopup.type_cd = "M"
    Set oDic = cPopup.ListActiveDic(iReturn, iRowTotal)        
    

%>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<% 
    Dim i 
    Dim pop_idx, contents, title, xPosition_cd, yPosition_cd

    For i = 0 To oDic.Count -1

    pop_idx = oDic.Item(i)("pop_idx")   '키
    contents = oDic.Item(i)("contents")   '키
    title = oDic.Item(i)("title")   '키
    xPosition_cd = oDic.Item(i)("xPosition_cd")   '키
    yPosition_cd = oDic.Item(i)("yPosition_cd")   '키

    ' pop_idx = "1"
%>
<style>
    .layerPopup<%=pop_idx%> {display:none; }
    .layerPopup<%=pop_idx%>:before {display:block; z-index: 200; content:""; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,.5);}

    .layerPopup<%=pop_idx%> .layerBox {position:fixed; z-index: 1000; left:50%; top:50%; transform:translate(-50%, -50%); padding:0px; background:#fff; border-radius:6px;}

    .layerPopup<%=pop_idx%> .layerBox .title {margin-bottom:10px; padding-bottom:10px; font-weight:600; border-bottom:1px solid #d9d9d9;}
    .layerPopup<%=pop_idx%> .layerBox .cont {margin-bottom:5px;}
    .layerPopup<%=pop_idx%> .layerBox p {line-height:20px; font-size:13px;}

    .layerPopup<%=pop_idx%> .layerBox .btnClose {display:inline-block; right:30px; bottom:5px; padding:6px 12px; color:#444; font-size:12px; text-decoration:underline;}
    .layerPopup<%=pop_idx%> .layerBox .btnTodayHide {font-size:13px; font-weight:600; text-decoration:underline; padding:6px 30px; }
</style>
<!-- layer popup content -->
<div class="layerPopup<%=pop_idx%>">
    <div class="layerBox">
      
        <div class="cont">
            <%=contents%>
        </div>
        <div style="text-align: center;">
            <a href="javascript:;" class="btnTodayHide">오늘 하루 보지 않기</a>
            <a href="javascrfipt:;" class="btnClose">닫기</a>
        </div>
    </div>
</div>
<script>
(function () {
    var $layerPopup = document.querySelector('.layerPopup<%=pop_idx%>');
    var $btnLayerPopupClose = document.querySelector('.layerPopup<%=pop_idx%> .btnClose');
    var $btnLayerPopupTodayHide = document.querySelector('.layerPopup<%=pop_idx%> .btnTodayHide');

    //최초 레이어팝업 노출
    layerPopupShow();

    //레이어팝업 닫기 버튼 클릭
    $btnLayerPopupClose.addEventListener('click', function(){
        layerPopupHide(0);
    });

    //레이어팝업 오늘 하루 보지 않기 버튼 클릭
    $btnLayerPopupTodayHide.addEventListener('click', function(){
        layerPopupHide(1);
    });

    //레이어팝업 노출
    function layerPopupShow(){
        if ($.cookie('popupCookie<%=pop_idx%>') === undefined) $layerPopup.style.display = 'block'
    }
    //레이어팝업 비노출
    function layerPopupHide(state){
        $layerPopup.style.display = 'none'
        if(state === 1){
            //cookie처리
            if($.cookie('popupCookie<%=pop_idx%>') === undefined) {
                //쿠키가 없는 경우 testCookie 쿠키를 추가
                $.cookie('popupCookie<%=pop_idx%>', 'Y', { expires: 1, path: '/' });
            }     
        }
    }
}());    
</script>
<%
    Next
%> 

<%
	
    ' Dim QUERY_STRING    : QUERY_STRING = Request.ServerVariables("QUERY_STRING") 
    ' If Len(QUERY_STRING) > 0 Then QUERY_STRING = "?" &  QUERY_STRING

	' cVisit.Client_id    = Session.SessionID     ' 세션ID
	' cVisit.Ip           = Request.ServerVariables("REMOTE_ADDR")
	' cVisit.Referer      = Request.ServerVariables("HTTP_REFERER")
	' cVisit.Url          = Request.ServerVariables("URL") & QUERY_STRING
	' cVisit.Agent        = Request.ServerVariables("HTTP_USER_AGENT")
	' cVisit.Meb_idx      = Session("MEB_IDX")    ' 회원idx
	' Call cVisit.Create(iReturn)



    '객체 해제
    Set oRs = Nothing
    Set oDic = Nothing
    Set cAccount = Nothing
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->