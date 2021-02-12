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
<!--#include virtual="/Module/ORD/ORD_Reg.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd               = UCase(Request("cmd"))
    Dim doctype         : doctype           = UCase(Request("doctype"))

    Dim crt_idx         : crt_idx           = Request("crt_idx")
    Dim order_mn        : order_mn          = Request("order_mn")
    Dim orderName       : orderName         = Request("orderName")
    Dim email           : email             = Request("email")
    Dim orderTel        : orderTel          = Request("orderTel")
    Dim recipient       : recipient         = Request("recipient")
    Dim choice_cd       : choice_cd         = Request("choice_cd")
    Dim zipcode         : zipcode           = Request("zipcode")
    Dim addr1           : addr1             = Request("addr1")
    Dim addr2           : addr2             = Request("addr2")
    Dim tel             : tel               = Request("tel")
    Dim memo            : memo              = Request("memo")
    Dim request_dt      : request_dt        = Request("request_dt")
    Dim pay_mn          : pay_mn            = Request("pay_mn")
    Dim pay_method_cd   : pay_method_cd     = Request("pay_method_cd")
    Dim usePoint_it     : usePoint_it       = Request("usePoint_it")
    Dim bak_idx         : bak_idx           = Request("bak_idx")
    Dim depositor       : depositor         = Request("depositor")
    Dim ord_id          : ord_id            = Request("ord_id")
    Dim pg_yn           : pg_yn             = Request("pg_yn")
    Dim state_cd        : state_cd          = Request("state_cd")

    Dim keyword         : keyword           = Request("keyword")
    Dim sort_cd         : sort_cd           = Request("sort_cd")
    Dim page_size       : page_size         = Request("page_size")
    Dim page_count      : page_count        = Request("page_count")

    Dim msgSave_yn      : msgSave_yn        = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn      = Request("msg_Print_yn")

    Dim strContent

    Dim cOrder, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim o_id

    Set cOrder = New ORD_Reg_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(crt_idx) > 0 and Len(order_mn) > 0 and Len(orderName) > 0 and Len(recipient) > 0 _
            and Len(choice_cd) > 0 and Len(pay_mn) > 0 and Len(pay_method_cd) > 0 Then
            ' 프로퍼티 <필수>
            cOrder.Crt_idx              = crt_idx
            cOrder.Order_mn             = order_mn
            cOrder.OrderName            = orderName
            cOrder.Recipient            = recipient
            cOrder.Choice_cd            = choice_cd
            cOrder.Pay_mn               = pay_mn
            cOrder.Pay_method_cd        = pay_method_cd
            ' 프로퍼티 <선택>
            If Len(email) > 0           Then cOrder.Email       = email
            If Len(orderTel) > 0        Then cOrder.OrderTel    = orderTel
            If Len(tel) > 0             Then cOrder.Tel         = tel
            
            If Len(zipcode) > 0         Then cOrder.Zipcode     = zipcode
            If Len(addr1) > 0           Then cOrder.Addr1       = addr1
            If Len(addr2) > 0           Then cOrder.Addr2       = addr2
            If Len(tel) > 0             Then cOrder.Tel         = tel
            If Len(memo) > 0            Then cOrder.Memo        = memo
            If Len(request_dt) > 0      Then cOrder.Request_dt  = request_dt
            If Len(usePoint_it) > 0     Then cOrder.UsePoint_it = usePoint_it
            If Len(bak_idx) > 0         Then cOrder.Bak_idx     = bak_idx
            If Len(depositor) > 0       Then cOrder.Depositor   = depositor
            ' 프로퍼티 <옵션>
            cOrder.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOrder.CreateXml(iReturn, o_id)
            Case "JSON"
                strContent = cOrder.CreateJson(iReturn, o_id)
            Case "DIC"
                Set oDic = cOrder.CreateDic(iReturn, o_id)
            Case else
                Set oRs = cOrder.Create(iReturn, o_id)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "FINISH" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id           = ord_id
            ' 프로퍼티 <선택>       
            If Len(pg_yn) > 0        Then cOrder.Pg_yn     = pg_yn
            ' 프로퍼티 <옵션>
            cOrder.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
            Case "XML"
                strContent = cOrder.FinishXml(iReturn)
            Case "JSON"
                strContent = cOrder.FinishJson(iReturn)
            Case "DIC"
                Set oDic = cOrder.FinishDic(iReturn)        
            Case else
                Set oRs = cOrder.Finish(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 프로퍼티 <선택>
        If Len(state_cd) > 0    Then cOrder.State_cd       = state_cd
        If Len(keyword) > 0     Then cOrder.Keyword        = keyword
        If Len(page_size) > 0   Then cOrder.Page_size      = page_size
        If Len(page_count) > 0  Then cOrder.Page_count     = page_count
        If Len(sort_cd) > 0     Then cOrder.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cOrder.MsgCode        = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cOrder.ListXml(iReturn, iRowTotal)
        Case "JSON"
            strContent = cOrder.ListJson(iReturn, iRowTotal)
        Case "DIC"
            Set oDic = cOrder.ListDic(iReturn, iRowTotal)        
        Case else
            Set oRs = cOrder.List(iReturn, iRowTotal)
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
    Set cOrder = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->