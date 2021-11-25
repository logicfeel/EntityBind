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
<!--#include virtual="/Module/POT/POT_MebPoint.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim meb_idx         : meb_idx       = Request("meb_idx")
    Dim point_it        : point_it      = Request("point_it")
    Dim base_mn         : base_mn       = Request("base_mn")
    Dim minus_yn        : minus_yn      = Request("minus_yn")
    Dim pot_it          : pot_it        = Request("pot_it")
    Dim identifier      : identifier    = Request("identifier")
    Dim ord_id          : ord_id        = Request("ord_id")
    Dim caption         : caption       = Request("caption")
    Dim mp_idx          : mp_idx        = Request("mp_idx")
    Dim pot_id          : pot_id        = Request("pot_id")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cMebPoint, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cMebPoint = New POT_MebPoint_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(meb_idx) > 0 and Len(pot_id) Then
            ' 프로퍼티 <필수>
            cMebPoint.Meb_idx       = meb_idx
            cMebPoint.Pot_id        = pot_id
            cMebPoint.Point_id      = point_id
            cMebPoint.Minus_yn      = minus_yn
            ' 프로퍼티 <선택>
            If Len(ord_id) > 0      Then cMebPoint.Ord_id  = ord_id
            If Len(caption) > 0     Then cMebPoint.Caption  = caption
            ' 프로퍼티 <옵션>
            cMebPoint.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cMebPoint.CreateXml(iReturn)
            Case "JSON"
                strContent = cMebPoint.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cMebPoint.CreateDic(iReturn)        
            Case else
                Set oRs = cMebPoint.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(mp_idx) > 0 Then
            ' 프로퍼티 <필수>
            cMebPoint.Mp_idx        = mp_idx
            ' 프로퍼티 <옵션>
            cMebPoint.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cMebPoint.ReadXml(iReturn)
            Case "JSON"
                strContent = cMebPoint.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cMebPoint.ReadDic(iReturn)        
            Case else
                Set oRs = cMebPoint.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 프로퍼티 설정
        If Len(pot_id) > 0      Then cMebPoint.Pot_id         = pot_id
        If Len(minus_yn) > 0    Then cMebPoint.Minus_yn       = minus_yn
        If Len(keyword) > 0     Then cMebPoint.Keyword        = keyword
        If Len(page_size) > 0   Then cMebPoint.Page_size      = page_size
        If Len(page_count) > 0  Then cMebPoint.Page_count     = page_count
        If Len(sort_cd) > 0     Then cMebPoint.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cMebPoint.MsgCode        = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cMebPoint.ListXml(iReturn, iRowTotal)
        Case "JSON"
            strContent = cMebPoint.ListJson(iReturn, iRowTotal)
        Case "DIC"
            Set oDic = cMebPoint.ListDic(iReturn, iRowTotal)        
        Case else
            Set oRs = cMebPoint.List(iReturn, iRowTotal)
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
    Set cMebPoint = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->