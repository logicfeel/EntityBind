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
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Define.I.asp"-->
<!--#include virtual="/Module/BOD/BOD_Notice.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim title           : title         = Request("title")
    Dim state_cd        : state_cd      = Request("state_cd")
    Dim top_yn          : top_yn        = Request("top_yn")
    Dim popup_yn        : popup_yn      = Request("popup_yn")
    Dim writer          : writer        = Request("writer")
    Dim contents        : contents      = Request("contents")
    Dim ntc_idx         : ntc_idx       = Request("ntc_idx")
    Dim division_yn     : division_yn   = Request("division_yn")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cNotice, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0


    Set cNotice = New BOD_Notice_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(title) > 0 Then
            ' 프로퍼티 <필수>
            cNotice.Title               = title
            ' 프로퍼티 <선택>
            If Len(state_cd) > 0        Then cNotice.State_cd   = state_cd
            If Len(top_yn) > 0          Then cNotice.Top_yn     = top_yn
            If Len(popup_yn) > 0        Then cNotice.Popup_yn   = popup_yn
            If Len(writer) > 0          Then cNotice.Writer     = writer
            If Len(contents) > 0        Then cNotice.Contents   = contents
            ' 프로퍼티 <옵션>
            cNotice.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cNotice.CreateXml(iReturn)
            Case "JSON"
                strContent = cNotice.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cNotice.CreateDic(iReturn)        
            Case else
                Set oRs = cNotice.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(ntc_idx) > 0 Then
            ' 프로퍼티 <필수>
            cNotice.Ntc_idx        = ntc_idx
            ' 프로퍼티 <옵션>
            cNotice.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cNotice.ReadXml(iReturn)
            Case "JSON"
                strContent = cNotice.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cNotice.ReadDic(iReturn)        
            Case else
                Set oRs = cNotice.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(ntc_idx) > 0 Then
            ' 프로퍼티 <필수>
            cNotice.Ntc_idx        = ntc_idx
            ' 프로퍼티 <선택>
            If Len(title) > 0           Then cNotice.Title      = title
            If Len(state_cd) > 0        Then cNotice.State_cd   = state_cd
            If Len(top_yn) > 0          Then cNotice.Top_yn     = top_yn
            If Len(popup_yn) > 0        Then cNotice.Popup_yn   = popup_yn
            If Len(writer) > 0          Then cNotice.Writer     = writer
            If Len(contents) > 0        Then cNotice.Contents   = contents
            ' 프로퍼티 <옵션>
            cNotice.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
            Case "XML"
                strContent = cNotice.UpdateXml(iReturn)
            Case "JSON"
                strContent = cNotice.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cNotice.UpdateDic(iReturn)        
            Case else
                Set oRs = cNotice.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(ntc_idx) > 0 Then
            ' 프로퍼티 <필수>
            cNotice.Ntc_idx        = ntc_idx
            ' 프로퍼티 <옵션>
            cNotice.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cNotice.DeleteXml(iReturn)
            Case "JSON"
                strContent = cNotice.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cNotice.DeleteDic(iReturn)        
            Case else
                Set oRs = cNotice.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then

        iMsgCode = -5000
        ' 프로퍼티 <선택>
        If Len(state_cd) > 0    Then cNotice.State_cd       = state_cd
        If Len(division_yn) > 0 Then cNotice.Division_yn    = division_yn
        If Len(top_yn) > 0          Then cNotice.Top_yn     = top_yn
        If Len(popup_yn) > 0        Then cNotice.Popup_yn   = popup_yn
        If Len(keyword) > 0     Then cNotice.Keyword        = keyword
        If Len(page_size) > 0   Then cNotice.Page_size      = page_size
        If Len(page_count) > 0  Then cNotice.Page_count     = page_count
        If Len(sort_cd) > 0     Then cNotice.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cNotice.MsgCode        = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cNotice.ListXml(iReturn, iRowTotal)
        Case "JSON"
            strContent = cNotice.ListJson(iReturn, iRowTotal)
        Case "DIC"
            Set oDic = cNotice.ListDic(iReturn, iRowTotal)        
        Case else
            Set oRs = cNotice.List(iReturn, iRowTotal)
        End Select
    
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
    Set cNotice = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->