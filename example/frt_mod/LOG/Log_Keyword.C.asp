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
<!--#include virtual="/Module/LOG/LOG_Keyword.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim position_cd     : position_cd   = Request("position_cd")
    Dim vst_idx         : vst_idx       = Request("vst_idx")
    Dim start_dt        : start_dt      = Request("start_dt")
    Dim end_dt          : end_dt        = Request("end_dt")

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

    Dim cKeyword        : Set cKeyword = New LOG_Keyword_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(keyword) > 0 Then
            ' 프로퍼티 <필수>
            cKeyword.Keyword               = keyword
            ' 프로퍼티 <선택>
            If Len(position_cd) > 0     Then cKeyword.Position_cd   = position_cd
            If Len(vst_idx) > 0         Then cKeyword.Vst_idx       = vst_idx
            ' 프로퍼티 <옵션>
            cKeyword.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cKeyword.CreateXml(iReturn)
                Case "JSON"
                    strContent = cKeyword.CreateJson(iReturn)
                Case "DIC"
                    Set oDic = cKeyword.CreateDic(iReturn)        
                Case else
                    Set oRs = cKeyword.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "STATS" Then
        
        iMsgCode = -6000
        If True Then
            ' 프로퍼티 <선택>
            If Len(start_dt) > 0    Then cKeyword.Start_dt          = start_dt
            If Len(end_dt) > 0      Then cKeyword.End_dt            = end_dt
            If Len(page_size) > 0   Then cKeyword.Page_size         = page_size
            If Len(page_count) > 0  Then cKeyword.Page_count        = page_count
            If Len(sort_cd) > 0     Then cKeyword.Sort_cd           = sort_cd
            ' 프로퍼티 <옵션>
            cKeyword.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cKeyword.StatsXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cKeyword.StatsJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cKeyword.StatsDic(iReturn, iRowTotal)        
            Case else
                Set oRs = cKeyword.Stats(iReturn, iRowTotal)
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
    Set cKeyword = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->