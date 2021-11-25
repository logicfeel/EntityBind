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
<!--#include virtual="/Module/PRT/PRT_QnA.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim prt_id          : prt_id        = Request("prt_id")
    Dim title           : title         = Request("title")
    Dim writer          : writer        = Request("writer")
    Dim contents        : contents      = Request("contents")
    Dim meb_idx         : meb_idx       = Request("meb_idx")
    Dim passwd          : passwd        = Request("passwd")
    Dim open_yn         : open_yn       = Request("open_yn")
    Dim answer          : answer        = Request("answer")
    Dim state_cd        : state_cd      = Request("state_cd")
    Dim qna_idx         : qna_idx       = Request("qna_idx")

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

    Dim cQnA      : Set cQnA = New PRT_QnA_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then

        iMsgCode = -1000
        ' 필수값 검사
        If Len(prt_id) > 0 and Len(title) > 0  Then
            ' 프로퍼티 <필수>
            cQnA.Rrt_id     = prt_id
            cQnA.Title      = title
            ' 프로퍼티 <선택>
            If Len(writer) > 0          Then cQnA.Writer  = writer
            If Len(contents) > 0        Then cQnA.Contents  = contents
            If Len(meb_idx) > 0         Then cQnA.Meb_idx  = meb_idx
            If Len(passwd) > 0          Then cQnA.Passwd  = passwd
            If Len(open_yn) > 0         Then cQnA.Open_yn  = open_yn
            If Len(answer) > 0          Then cQnA.Answer  = answer
            If Len(state_cd) > 0        Then cQnA.State_cd  = state_cd
            ' 프로퍼티 <옵션>
            cQnA.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cQnA.CreateXml(iReturn)
                Case "JSON"
                    strContent = cQnA.CreateJson(iReturn)
                Case "DIC"
                    Set oDic = cQnA.CreateDic(iReturn)        
                Case else
                    Set oRs = cQnA.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(qna_idx) > 0  Then
            ' 프로퍼티 <필수>
            cQnA.Qna_idx      = qna_idx
            ' 프로퍼티 <옵션>
            cQnA.MsgCode      = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cQnA.ReadXml(iReturn)
                Case "JSON"
                    strContent = cQnA.ReadJson(iReturn)
                Case "DIC"
                    Set oDic = cQnA.ReadDic(iReturn)        
                Case else
                    Set oRs = cQnA.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(qna_idx) > 0  Then
            ' 프로퍼티 <필수>
            cQnA.Qna_idx      = qna_idx
            ' 프로퍼티 <선택>
            If Len(title) > 0           Then cQnA.Title  = title
            If Len(writer) > 0          Then cQnA.Writer  = writer
            If Len(contents) > 0        Then cQnA.Contents  = contents
            If Len(meb_idx) > 0         Then cQnA.Meb_idx  = meb_idx
            If Len(passwd) > 0          Then cQnA.Passwd  = passwd
            If Len(open_yn) > 0         Then cQnA.Open_yn  = open_yn
            If Len(answer) > 0          Then cQnA.Answer  = answer
            If Len(state_cd) > 0        Then cQnA.State_cd  = state_cd
            ' 프로퍼티 <옵션>
            cQnA.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
                Case "XML"
                    strContent = cQnA.UpdateXml(iReturn)
                Case "JSON"
                    strContent = cQnA.UpdateJson(iReturn)
                Case "DIC"
                    Set oDic = cQnA.UpdateDic(iReturn)        
                Case else
                    Set oRs = cQnA.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(qna_idx) > 0  Then
            ' 프로퍼티 <필수>
            cQnA.Qna_idx      = qna_idx
            ' 프로퍼티 <옵션>
            cQnA.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cQnA.DeleteXml(iReturn)
                Case "JSON"
                    strContent = cQnA.DeleteJson(iReturn)
                Case "DIC"
                    Set oDic = cQnA.DeleteDic(iReturn)        
                Case else
                    Set oRs = cQnA.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 필수값 검사
        If True Then
            ' 프로퍼티 <선택>
            If Len(prt_id) > 0      Then cQnA.Prt_id        = prt_id
            If Len(meb_idx) > 0     Then cQnA.Meb_idx       = meb_idx
            If Len(keyword) > 0     Then cQnA.Keyword       = keyword
            If Len(page_size) > 0   Then cQnA.Page_size     = page_size
            If Len(page_count) > 0  Then cQnA.Page_count    = page_count
            If Len(sort_cd) > 0     Then cQnA.Sort_cd       = sort_cd
            ' 프로퍼티 <옵션>
            cQnA.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cQnA.ListXml(iReturn, iRowTotal)
                Case "JSON"
                    strContent = cQnA.ListJson(iReturn, iRowTotal)
                Case "DIC"
                    Set oDic = cQnA.ListDic(iReturn, iRowTotal)        
                Case else
                    Set oRs = cQnA.List(iReturn, iRowTotal)
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
    Set cQnA = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->