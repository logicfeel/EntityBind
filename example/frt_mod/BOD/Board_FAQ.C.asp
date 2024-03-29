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
<!--#include virtual="/Module/BOD/BOD_FAQ.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim question        : question      = Request("question")
    Dim answer          : answer        = Request("answer")
    Dim typeCode        : typeCode      = Request("typeCode")
    Dim rank_it         : rank_it       = Request("rank_it")
    Dim faq_idx         : faq_idx       = Request("faq_idx")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cFAQ, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cFAQ = New BOD_FAQ_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 프로퍼티 <선택>
        If Len(keyword) > 0     Then cFAQ.Keyword        = keyword
        If Len(page_size) > 0   Then cFAQ.Page_size      = page_size
        If Len(page_count) > 0  Then cFAQ.Page_count     = page_count
        If Len(sort_cd) > 0     Then cFAQ.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cFAQ.MsgCode        = iMsgCode

        Select Case UCase(doctype)
            Case "XML"
                strContent = cFAQ.ListXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cFAQ.ListJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cFAQ.ListDic(iReturn, iRowTotal)        
            Case else
                Set oRs = cFAQ.List(iReturn, iRowTotal)
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
    Set cFAQ = Nothing
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->