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
<!--#include virtual="/Module/PRT/PRT.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim sto_id          : sto_id        = Request("sto_id")
    Dim prtName         : prtName       = Request("prtName")
    Dim type_cd         : type_cd       = Request("type_cd")
    Dim state_cd        : state_cd      = Request("state_cd")
    Dim stock_it        : stock_it      = Request("stock_it")
    Dim brd_idx         : brd_idx       = Request("brd_idx")
    Dim recommRange     : recommRange   = Request("recommRange")
    Dim kind_cd         : kind_cd       = Request("kind_cd")
    Dim begin_dt        : begin_dt      = Request("begin_dt")
    Dim close_dt        : close_dt      = Request("close_dt")
    Dim contents        : contents      = Request("contents")
    Dim method_cd       : method_cd     = Request("method_cd")
    Dim default_cd      : default_cd    = Request("default_cd")
    Dim choice_bt       : choice_bt     = Request("choice_bt")
    Dim deli_mn         : deli_mn       = Request("deli_mn")
    Dim under_mn        : under_mn      = Request("under_mn")
    Dim underBase_mn    : underBase_mn  = Request("underBase_mn")
    Dim prt_id          : prt_id        = Request("prt_id")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cProduct, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cProduct = New PRT_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then

        iMsgCode = -1000
        ' 필수값 검사
        If Len(sto_id) > 0 and Len(prtName) > 0 and Len(type_cd) > 0 Then
            ' 프로퍼티 <필수>
            cProduct.Sto_id             = sto_id
            cProduct.PrtName            = prtName
            cProduct.Type_cd            = type_cd
            ' 프로퍼티 <선택>
            If Len(state_cd) > 0        Then cProduct.State_cd  = state_cd
            If Len(stock_it) > 0        Then cProduct.Stock_it  = stock_it
            If Len(brd_idx) > 0         Then cProduct.Brd_idx  = brd_idx
            If Len(recommRange) > 0     Then cProduct.RecommRange  = recommRange
            If Len(keyword) > 0         Then cProduct.Keyword  = keyword
            If Len(kind_cd) > 0         Then cProduct.Kind_cd  = kind_cd
            If Len(begin_dt) > 0        Then cProduct.Begin_dt  = begin_dt
            If Not IsEmpty(close_dt)  Then cProduct.Close_dt  = close_dt
            If Len(contents) > 0        Then cProduct.Contents  = contents
            If Len(method_cd) > 0       Then cProduct.Method_cd  = method_cd
            If Len(default_cd) > 0      Then cProduct.Default_cd  = default_cd
            If Len(choice_bt) > 0       Then cProduct.Choice_bt  = choice_bt
            If Len(deli_mn) > 0         Then cProduct.Deli_mn  = deli_mn
            If Len(under_mn) > 0        Then cProduct.Under_mn  = under_mn
            If Len(underBase_mn) > 0    Then cProduct.UnderBase_mn  = underBase_mn
            ' 프로퍼티 <옵션>
            cProduct.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cProduct.CreateXml(iReturn)
            Case "JSON"
                strContent = cProduct.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cProduct.CreateDic(iReturn)        
            Case else
                Set oRs = cProduct.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then

        iMsgCode = -2000
        ' 필수값 검사
        If Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cProduct.Prt_id        = prt_id
            ' 프로퍼티 <옵션>
            cProduct.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cProduct.ReadXml(iReturn)
            Case "JSON"
                strContent = cProduct.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cProduct.ReadDic(iReturn)        
            Case else
                Set oRs = cProduct.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then

        iMsgCode = -3000
        ' 필수값 검사
        If Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cProduct.Prt_id             = prt_id
            ' 프로퍼티 <선택>
            If Len(prtName) > 0         Then cProduct.PrtName  = prtName
            If Len(state_cd) > 0        Then cProduct.State_cd  = state_cd
            If Len(stock_it) > 0        Then cProduct.Stock_it  = stock_it
            If Len(brd_idx) > 0         Then cProduct.Brd_idx  = brd_idx
            If Len(recommRange) > 0     Then cProduct.RecommRange  = recommRange
            If Not IsEmpty(keyword)     Then cProduct.Keyword  = keyword        'REVIEW:: 이렇게 해야 들어감
            If Not IsEmpty(kind_cd)     Then cProduct.Kind_cd  = kind_cd        'REVIEW:: 이렇게 해야 들어감
            If Len(begin_dt) > 0        Then cProduct.Begin_dt  = begin_dt
            If Len(close_dt) > 0        Then cProduct.Close_dt  = close_dt
            If Len(contents) > 0        Then cProduct.Contents  = contents
            If Len(method_cd) > 0       Then cProduct.Method_cd  = method_cd
            If Len(default_cd) > 0      Then cProduct.Default_cd  = default_cd
            If Len(choice_bt) > 0       Then cProduct.Choice_bt  = choice_bt
            If Len(deli_mn) > 0         Then cProduct.Deli_mn  = deli_mn
            If Len(under_mn) > 0        Then cProduct.Under_mn  = under_mn
            If Len(underBase_mn) > 0    Then cProduct.UnderBase_mn  = underBase_mn
            ' 프로퍼티 <옵션>
            cProduct.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cProduct.UpdateXml(iReturn)
            Case "JSON"
                strContent = cProduct.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cProduct.UpdateDic(iReturn)        
            Case else
                Set oRs = cProduct.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then

        iMsgCode = -4000
        ' 필수값 검사
        If Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cProduct.Prt_id        = prt_id

            Select Case UCase(doctype)
            Case "XML"
                strContent = cProduct.DeleteXml(iReturn)
            Case "JSON"
                strContent = cProduct.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cProduct.DeleteDic(iReturn)        
            Case else
                Set oRs = cProduct.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "LIST" Then

        iMsgCode = -5000
        ' 프로퍼티 설정
        If Len(keyword) > 0     Then cProduct.Keyword        = keyword
        If Len(page_size) > 0   Then cProduct.Page_size      = page_size
        If Len(page_count) > 0  Then cProduct.Page_count     = page_count
        If Len(sort_cd) > 0     Then cProduct.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cProduct.MsgCode        = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cProduct.ListXml(iReturn, iRowTotal)
        Case "JSON"
            strContent = cProduct.ListJson(iReturn, iRowTotal)
        Case "DIC"
            Set oDic = cProduct.ListDic(iReturn, iRowTotal)
        Case else
            Set oRs = cProduct.List(iReturn, iRowTotal)
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
    Set cProduct = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->