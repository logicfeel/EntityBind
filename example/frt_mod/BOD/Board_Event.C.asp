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
<!--#include virtual="/Module/BOD/BOD_Event.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim title           : title         = Request("title")
    Dim writer          : writer        = Request("writer")
    Dim begin_dt        : begin_dt      = Request("begin_dt")
    Dim close_dt        : close_dt      = Request("close_dt")
    Dim contents        : contents      = Request("contents")
    Dim active_yn       : active_yn     = Request("active_yn")
    Dim evt_idx         : evt_idx       = Request("evt_idx")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Dim cEvent      : Set cEvent = New BOD_Event_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(evt_idx) > 0  Then
            ' 프로퍼티 <필수>
            cEvent.Evt_idx      = evt_idx
            ' 프로퍼티 <옵션>
            cEvent.MsgCode      = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cEvent.ReadXml(iReturn)
                Case "JSON"
                    strContent = cEvent.ReadJson(iReturn)
                Case "DIC"
                    Set oDic = cEvent.ReadDic(iReturn)        
                Case else
                    Set oRs = cEvent.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
         
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 필수값 검사
        If True Then
            ' 프로퍼티 <선택>
            cEvent.Active_yn = "Y"  '활성화된 목록
            If Len(keyword) > 0     Then cEvent.Keyword        = keyword
            If Len(page_size) > 0   Then cEvent.Page_size      = page_size
            If Len(page_count) > 0  Then cEvent.Page_count     = page_count
            If Len(sort_cd) > 0     Then cEvent.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cEvent.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cEvent.ListXml(iReturn, iRowTotal)
                Case "JSON"
                    strContent = cEvent.ListJson(iReturn, iRowTotal)
                Case "DIC"
                    Set oDic = cEvent.ListDic(iReturn, iRowTotal)        
                Case else
                    Set oRs = cEvent.List(iReturn, iRowTotal)
            End Select
        Else
            iReturn = iMsgCode
        End If

    Else
        iReturn = -10000
    End If


    '-------------------------------------------------
    ' 출력
    If doctype = "XML" Then

        If iReturn < 0 and IsEmpty(strContent) Then 
            strContent = "<table return='" & iReturn & "'/>"
        End If
        Response.ContentType = "text/xml"  
        Response.Write "<?xml version='1.0' encoding='UTF-8'?>"
        Response.Write strContent

    ElseIf doctype = "JSON" Then

        If iReturn < 0 and IsEmpty(strContent) Then 
            strContent = "{ ""table"": { ""return"": " & iReturn & " } }"
        End If
        Response.ContentType = "application/json"
        Response.Write strContent

    Else
        Response.Write iReturn      '결과값만 출력 (필요시 하단에 구현)
    End If

    '객체 해제
    Set oRs = Nothing
    Set oDic = Nothing
    Set cEvent = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->