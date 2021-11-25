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
<!--#include virtual="/Module/ORD/ORD_User.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim meb_idx         : meb_idx       = Request("meb_idx")
    Dim ord_id          : ord_id        = Request("ord_id")
    Dim orderTel        : orderTel      = Request("orderTel")
    Dim orderName       : orderName     = Request("orderName")

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

    Dim cOrderUser  : Set cOrderUser = New ORD_User_Cls
    Dim cOrder      : Set cOrder = New ORD_Cls


    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "READ_STATE" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(meb_idx) > 0 Then
            ' 프로퍼티 <필수>
            cOrderUser.Meb_idx        = meb_idx
            ' 프로퍼티 <옵션>
            cOrderUser.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cOrderUser.ReadStateXml(iReturn)
                Case "JSON"
                    strContent = cOrderUser.ReadStateJson(iReturn)
                Case "DIC"
                    Set oDic = cOrderUser.ReadStateDic(iReturn)        
                Case else
                    Set oRs = cOrderUser.ReadState(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    
    ElseIf cmd = "READ" Then

        iMsgCode = -2100
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id        = ord_id
            cOrder.OrderName     = orderName
            ' 프로퍼티 <옵션>
            cOrder.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cOrder.ReadXml(iReturn)
                Case "JSON"
                    strContent = cOrder.ReadJson(iReturn)
                Case "DIC"
                    Set oDic = cOrder.ReadDic(iReturn)        
                Case else
                    Set oRs = cOrder.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If 

    ElseIf cmd = "LIST" Then

        iMsgCode = -5000
        ' 필수값 검사
        If True Then
            ' 프로퍼티 <필수>
            ' cOrderUser.Meb_idx        = meb_idx
            ' 프로퍼티 <선택>
            If Len(meb_idx) > 0      Then cOrderUser.Meb_idx        = meb_idx

            If Len(ord_id) > 0      Then cOrderUser.Ord_id          = ord_id
            If Len(orderTel) > 0    Then cOrderUser.OrderTel        = orderTel
            If Len(orderName) > 0   Then cOrderUser.OrderName      = orderName
            If Len(page_size) > 0   Then cOrderUser.Page_size      = page_size
            If Len(page_count) > 0  Then cOrderUser.Page_count     = page_count
            If Len(sort_cd) > 0     Then cOrderUser.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cOrderUser.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cOrderUser.ListXml(iReturn, iRowTotal)
                Case "JSON"
                    strContent = cOrderUser.ListJson(iReturn, iRowTotal)
                Case "DIC"
                    Set oDic = cOrderUser.ListDic(iReturn, iRowTotal)        
                Case else
                    Set oRs = cOrderUser.List(iReturn, iRowTotal)
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
    Set cOrderUser = Nothing
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->