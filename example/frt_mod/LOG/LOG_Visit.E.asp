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
<!--#include virtual="/Module/LOG/LOG_Visit.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cAccount, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Dim cVisit    : Set cVisit = New LOG_Visit_Cls
	
    Dim QUERY_STRING    : QUERY_STRING = Request.ServerVariables("QUERY_STRING") 
    If Len(QUERY_STRING) > 0 Then QUERY_STRING = "?" &  QUERY_STRING

	cVisit.Client_id    = Session.SessionID     ' 세션ID
	cVisit.Ip           = Request.ServerVariables("REMOTE_ADDR")
	cVisit.Referer      = Request.ServerVariables("HTTP_REFERER")
	cVisit.Url          = Request.ServerVariables("URL") & QUERY_STRING
	cVisit.Agent        = Request.ServerVariables("HTTP_USER_AGENT")
	cVisit.Meb_idx      = Session("MEB_IDX")    ' 회원idx
	Call cVisit.Create(iReturn)



    '객체 해제
    Set oRs = Nothing
    Set oDic = Nothing
    Set cAccount = Nothing
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->