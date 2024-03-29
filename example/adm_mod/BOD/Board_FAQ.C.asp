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

' __ADD__ : attr 추가위치 : BOD_FAQ_Cls (item + attr) 추가개념
' 	// 추가 위치
' 	// each-meta-extend : 메타의 확장 부분만 반복
'   // union-meta-extend : 메타 그룹 목록의 합집합으로 만듬
' 	// mssql , oracle, mysql 별로 헬퍼를 관리함

' {{#each-meta-extend  (union-meta-extend meta.group.all.sp) }}
    ' Dim {{asp-val-name param}}      : {{asp-val-name param}}     = Request("{{param}} ")
' {{/each-meta-extend}} 

    Dim strContent

    Dim cFAQ, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cFAQ = New BOD_FAQ_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(question) > 0 Then
            ' 프로퍼티 <필수>
            cFAQ.Question               = question
            ' 프로퍼티 <선택>
            If Len(answer) > 0          Then cFAQ.Answer    = answer
            If Len(typeCode) > 0        Then cFAQ.TypeCode  = typeCode
            If Len(rank_it) > 0         Then cFAQ.Rank_it   = rank_it
            
        ' {{#each-meta-extend meta.sp.create.params }}
        ' If Len({{param}}) > 0         Then cFAQ.{{pascal-name param}}   = {{param}}
        ' {{/each-meta-extend}}

            ' 프로퍼티 <옵션>
            cFAQ.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cFAQ.CreateXml(iReturn)
            Case "JSON"
                strContent = cFAQ.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cFAQ.CreateDic(iReturn)        
            Case else
                Set oRs = cFAQ.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(faq_idx) > 0 Then
            ' 프로퍼티 <필수>
            cFAQ.Faq_idx        = faq_idx
            ' 프로퍼티 <옵션>
            cFAQ.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cFAQ.ReadXml(iReturn)
            Case "JSON"
                strContent = cFAQ.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cFAQ.ReadDic(iReturn)        
            Case else
                Set oRs = cFAQ.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(faq_idx) > 0 Then
            ' 프로퍼티 <필수>
            cFAQ.Faq_idx        = faq_idx
            ' 프로퍼티 <선택>
            If Len(question) > 0        Then cFAQ.Question  = question
            If Len(answer) > 0          Then cFAQ.Answer    = answer
            If Len(typeCode) > 0        Then cFAQ.TypeCode  = typeCode
            If Len(rank_it) > 0         Then cFAQ.Rank_it   = rank_it
            
        ' {{#each-meta-extend meta.sp.update.params }}
        ' If Len({{param}}) > 0         Then cFAQ.{{pascal-name param}}   = {{param}}
        ' {{/each-meta-extend}}

            ' 프로퍼티 <옵션>
            cFAQ.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
            Case "XML"
                strContent = cFAQ.UpdateXml(iReturn)
            Case "JSON"
                strContent = cFAQ.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cFAQ.UpdateDic(iReturn)        
            Case else
                Set oRs = cFAQ.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(faq_idx) > 0 Then
            ' 프로퍼티 <필수>
            cFAQ.Faq_idx        = faq_idx
            ' 프로퍼티 <옵션>
            cFAQ.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cFAQ.DeleteXml(iReturn)
            Case "JSON"
                strContent = cFAQ.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cFAQ.DeleteDic(iReturn)        
            Case else
                Set oRs = cFAQ.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then
        
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
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->