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
<!--#include virtual="/Module/ORD/ORD.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD_Master.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD_Delivery.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD_Pay.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD_Product.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD_User.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))
    ' 조회 
    Dim ord_id          : ord_id        = Request("ord_id")
    Dim deli_idx        : deli_idx      = Request("deli_idx")
    ' 주문정보
    Dim orderName       : orderName     = Request("orderName")
    Dim orderTel        : orderTel      = Request("orderTel")
    Dim email           : email         = Request("email")
    Dim ord_memo        : ord_memo      = Request("ord_memo")
    ' 결제정보
    Dim depositor       : depositor     = Request("depositor")
    Dim pay_memo        : pay_memo      = Request("pay_memo")
    ' 배송정보
    Dim recipient       : recipient     = Request("recipient")
    Dim tel             : tel           = Request("tel")
    Dim zipcode         : zipcode       = Request("zipcode")
    Dim addr1           : addr1         = Request("addr1")
    Dim addr2           : addr2         = Request("addr2")
    Dim deli_memo       : deli_memo     = Request("deli_memo")
    Dim dco_idx         : dco_idx       = Request("dco_idx")
    Dim invoice         : invoice       = Request("invoice")
    ' 목록 
    Dim state_cd        : state_cd      = Request("state_cd")
    Dim pay_method      : pay_method    = Request("pay_method")
    Dim state_arr       : state_arr     = Request("state_arr")
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

    Dim cOrder, cMaster, cPay, cDeliery, cProduct
    
    Set cOrder      = New ORD_Cls
    Set cMaster     = New ORD_Master_Cls
    Set cPay        = New ORD_Pay_Cls
    Set cDeliery    = New ORD_Delivery_Cls
    Set cProduct    = New ORD_Product_Cls
    
    Dim cOrderUser  : Set cOrderUser = New ORD_User_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "READ" Then

        iMsgCode = -2000
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cMaster.Ord_id           = ord_id
            ' 프로퍼티 <옵션>
            cMaster.MsgCode          = iMsgCode
            Select Case UCase(doctype)
            Case "XML"
                strContent = cMaster.ReadXml(Nothing)
            Case "JSON"
                strContent = cMaster.ReadJson(Nothing)
            Case "DIC"
                Set oDic = cMaster.ReadDic(iReturn)        
            Case else
                Set oRs = cMaster.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If   

    ElseIf cmd = "READ_PAY" Then

        iMsgCode = -2100
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cPay.Ord_id           = ord_id
            ' 프로퍼티 <옵션>
            cPay.MsgCode          = iMsgCode
            Select Case UCase(doctype)
            Case "XML"
                strContent = cPay.ReadXml(Nothing)
            Case "JSON"
                strContent = cPay.ReadJson(Nothing)
            Case "DIC"
                Set oDic = cPay.ReadDic(iReturn)        
            Case else
                Set oRs = cPay.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    

    ElseIf cmd = "READ_STATE" Then
        
        iMsgCode = -2000
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

    ElseIf cmd = "UPDATE" Then

        iMsgCode = -3000
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cMaster.Ord_id        = ord_id
            ' 프로퍼티 <선택>
            If Len(orderName) > 0   Then cMaster.OrderName  = orderName
            If Len(orderTel) > 0    Then cMaster.OrderTel   = orderTel
            If Len(email) > 0       Then cMaster.Email      = email
            If Len(ord_memo) > 0    Then cMaster.Memo       = ord_memo
            ' 프로퍼티 <옵션>
            cMaster.MsgCode          = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cMaster.UpdateXml(Nothing)
                Case "JSON"
                    strContent = cMaster.UpdateJson(Nothing)
                Case "DIC"
                    Set oDic = cMaster.UpdateDic(iReturn)        
                Case else
                    Set oRs = cMaster.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_PAY" Then   '결제정보 수정

        iMsgCode = -3100
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cPay.Ord_id        = ord_id
            ' 프로퍼티 <선택>
            If Len(pay_memo) > 0   Then cPay.Memo  = pay_memo
            If Len(depositor) > 0   Then cPay.Depositor  = depositor
            ' 프로퍼티 <옵션>
            cPay.MsgCode          = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cPay.UpdateXml(Nothing)
                Case "JSON"
                    strContent = cPay.UpdateJson(Nothing)
                Case "DIC"
                    Set oDic = cPay.UpdateDic(iReturn)        
                Case else
                    Set oRs = cPay.Update(iReturn)
            End Select

        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_DELI" Then   '배송정보 수정

        iMsgCode = -3100
        ' 필수값 검사
        If Len(deli_idx) > 0 and  Len(recipient) > 0 and Len(tel) > 0 Then
            ' 프로퍼티 <필수>
            cDeliery.Deli_idx      = deli_idx
            cDeliery.Recipient      = recipient
            cDeliery.Tel            = tel
            ' 프로퍼티 <선택>
            If Len(zipcode) > 0     Then cDeliery.Zipcode  = zipcode
            If Len(addr1) > 0       Then cDeliery.Addr1  = addr1
            If Len(addr2) > 0       Then cDeliery.Addr2  = addr2
            If Len(deli_memo) > 0   Then cDeliery.Memo  = deli_memo
            If Len(dco_idx) > 0     Then cDeliery.Dco_idx  = dco_idx
            If Len(invoice) > 0     Then cDeliery.Invoice  = invoice
            ' 프로퍼티 <옵션>
            cDeliery.MsgCode          = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cDeliery.UpdateXml(Nothing)
                Case "JSON"
                    strContent = cDeliery.UpdateJson(Nothing)
                Case "DIC"
                    Set oDic = cDeliery.UpdateDic(iReturn)        
                Case else
                    Set oRs = cDeliery.Update(iReturn)
            End Select

        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_PC" Then   '결제취소(주문취소)

        iMsgCode = -3100
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id        = ord_id
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Cancel(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_RW" Then   '환불대기

        iMsgCode = -3200
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id        = ord_id
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_ForRefund(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_RF" Then   '환불완료

        iMsgCode = -3200
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id        = ord_id
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Refund(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_TW" Then   ' 반품대기

        iMsgCode = -3200
        ' 필수값 검사
        If Len(ord_id) > 0 and Len(deli_idx) > 0  Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id           = ord_id
            cOrder.Deli_idx         = deli_idx
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_ForReturn(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_TF" Then   ' 반품완료(환불대기)

        iMsgCode = -3200
        ' 필수값 검사
        If Len(ord_id) > 0 and Len(deli_idx) > 0  Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id           = ord_id
            cOrder.Deli_idx         = deli_idx
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Return(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If


    ElseIf cmd = "UPDATE_PF" Then   ' 결제승인(주문완료)

        iMsgCode = -3300
        ' 필수값 검사
        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id        = ord_id
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Approval(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_DK" Then   '배송확인

        iMsgCode = -3400
        ' 필수값 검사
        If Len(ord_id) > 0 and Len(deli_idx) > 0  Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id           = ord_id
            cOrder.Deli_idx         = deli_idx
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Deli_Check(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE_DR" Then   '배송준비

        iMsgCode = -3500
        ' 필수값 검사
        If Len(ord_id) > 0 and Len(deli_idx) > 0  Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id           = ord_id
            cOrder.Deli_idx         = deli_idx
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Deli_Ready(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If
    
    ElseIf cmd = "UPDATE_DS" Then   '배송발송

        iMsgCode = -3600
        ' 필수값 검사
        If Len(ord_id) > 0 and Len(deli_idx) > 0  Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id           = ord_id
            cOrder.Deli_idx         = deli_idx
            ' 프로퍼티 <선택>
            If Len(dco_idx) > 0     Then cOrder.Dco_idx  = dco_idx
            If Len(invoice) > 0     Then cOrder.Invoice  = invoice
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Deli_Send(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If        

    ElseIf cmd = "UPDATE_DF" Then   '배송완료

        iMsgCode = -3600
        ' 필수값 검사
        If Len(ord_id) > 0 and Len(deli_idx) > 0  Then
            ' 프로퍼티 <필수>
            cOrder.Ord_id           = ord_id
            cOrder.Deli_idx         = deli_idx
            ' 프로퍼티 <옵션>
            cOrder.MsgCode          = iMsgCode

            strContent = cOrder.Update_Deli_Finish(iReturn, UCase(doctype))
        Else
            iReturn = iMsgCode
        End If        

    ElseIf cmd = "DELETE" Then

        iMsgCode = -4000
        ' ' 필수값 검사
        ' If Len(img_idx) > 0 Then
        '     ' 프로퍼티 <필수>
        '     cOrder.Img_idx        = img_idx

        '     Select Case UCase(doctype)
        '     Case "XML"
        '         strContent = cOrder.DeleteXml(Nothing)
        '     Case "JSON"
        '         strContent = cOrder.DeleteJson(Nothing)
        '     Case "DIC"
        '         Set oDic = cOrder.DeleteDic(iReturn)        
        '     Case else
        '         Set oRs = cOrder.Delete(iReturn)
        '     End Select
        ' Else
        '     iReturn = -4000
        ' End If      
    ElseIf cmd = "LIST" Then

        iMsgCode = -5000

        ' 프로퍼티 <선택>
        
        If Len(pay_method) > 0  Then cOrder.Pay_method     = pay_method
        If Len(state_cd) > 0    Then cOrder.State_cd       = state_cd
        If Len(keyword) > 0     Then cOrder.Keyword        = keyword
        If Len(page_size) > 0   Then cOrder.Page_size      = page_size
        If Len(page_count) > 0  Then cOrder.Page_count     = page_count
        If Len(sort_cd) > 0     Then cOrder.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cOrder.MsgCode          = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cOrder.ListXml(Nothing)
        Case "JSON"
            strContent = cOrder.ListJson(Nothing)
        Case "DIC"
            Set oDic = cOrder.ListDic(iReturn, Nothing)        
        Case else
            Set oRs = cOrder.List(iReturn, Nothing)
        End Select

    ElseIf cmd = "LIST_PAY" Then    '입금확인 목록

        iMsgCode = -5000

        ' 프로퍼티 <선택>
        
        cOrder.State_cd       = "PW"
        If Len(pay_method) > 0  Then cOrder.Pay_method     = pay_method
        If Len(keyword) > 0     Then cOrder.Keyword        = keyword
        If Len(page_size) > 0   Then cOrder.Page_size      = page_size
        If Len(page_count) > 0  Then cOrder.Page_count     = page_count
        If Len(sort_cd) > 0     Then cOrder.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cOrder.MsgCode          = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cOrder.ListXml(Nothing)
        Case "JSON"
            strContent = cOrder.ListJson(Nothing)
        Case "DIC"
            Set oDic = cOrder.ListDic(iReturn, Nothing)        
        Case else
            Set oRs = cOrder.List(iReturn, Nothing)
        End Select

    ElseIf cmd = "LIST_FLOW" Then   ' REVIEW:: 아래 LIST_DELI 이름 혼선!!! 위치 또는 이름 변경 필요

        iMsgCode = -5000

        ' 프로퍼티 <선택>
        If Len(state_cd) > 0    Then cOrder.State_cd       = state_cd
        If Len(pay_method) > 0  Then cOrder.Pay_method     = pay_method
        If Len(state_arr) > 0   Then cOrder.State_arr      = state_arr
        If Len(keyword) > 0     Then cOrder.Keyword        = keyword
        If Len(page_size) > 0   Then cOrder.Page_size      = page_size
        If Len(page_count) > 0  Then cOrder.Page_count     = page_count
        If Len(sort_cd) > 0     Then cOrder.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cOrder.MsgCode          = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cOrder.ListFlowXml(Nothing)
        Case "JSON"
            strContent = cOrder.ListFlowJson(Nothing)
        Case "DIC"
            Set oDic = cOrder.ListFlowDic(iReturn, Nothing)        
        Case else
            Set oRs = cOrder.ListFlow(iReturn, Nothing)
        End Select        

    ElseIf cmd = "LIST_REFUND" Then    '환불대기 목록

        iMsgCode = -5000

        ' 프로퍼티 <선택>
        
        cOrder.State_cd       = "RW"
        If Len(pay_method) > 0  Then cOrder.Pay_method     = pay_method
        If Len(keyword) > 0     Then cOrder.Keyword        = keyword
        If Len(page_size) > 0   Then cOrder.Page_size      = page_size
        If Len(page_count) > 0  Then cOrder.Page_count     = page_count
        If Len(sort_cd) > 0     Then cOrder.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cOrder.MsgCode          = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cOrder.ListXml(Nothing)
        Case "JSON"
            strContent = cOrder.ListJson(Nothing)
        Case "DIC"
            Set oDic = cOrder.ListDic(iReturn, Nothing)        
        Case else
            Set oRs = cOrder.List(iReturn, Nothing)
        End Select

    ElseIf cmd = "LIST_FAIL" Then 

        iMsgCode = -5000

        ' 프로퍼티 <선택>
        If Len(state_cd) > 0    Then cOrder.State_cd        = state_cd
        If Len(keyword) > 0     Then cOrder.Keyword        = keyword
        If Len(page_size) > 0   Then cOrder.Page_size      = page_size
        If Len(page_count) > 0  Then cOrder.Page_count     = page_count
        If Len(sort_cd) > 0     Then cOrder.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cOrder.MsgCode          = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cOrder.ListFailXml(Nothing)
        Case "JSON"
            strContent = cOrder.ListFailJson(Nothing)
        Case "DIC"
            Set oDic = cOrder.ListFailDic(iReturn, Nothing)        
        Case else
            Set oRs = cOrder.ListFail(iReturn, Nothing)
        End Select        


    ElseIf cmd = "LIST_DELI" Then

        iMsgCode = -5100

        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cDeliery.Ord_id         = ord_id
            ' 프로퍼티 <옵션>
            cDeliery.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDeliery.ListXml(Nothing)
            Case "JSON"
                strContent = cDeliery.ListJson(Nothing)
            Case "DIC"
                Set oDic = cDeliery.ListDic(iReturn, Nothing)        
            Case else
                Set oRs = cDeliery.List(iReturn, Nothing)
            End Select
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "LIST_PRT" Then

        iMsgCode = -5200

        If Len(ord_id) > 0 Then
            ' 프로퍼티 <필수>
            cProduct.Ord_id        = ord_id
            If Len(deli_idx) > 0             Then cOrder.Deli_idx         = deli_idx
            ' 프로퍼티 <옵션>
            cProduct.MsgCode       = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cProduct.ListXml(Nothing)
            Case "JSON"
                strContent = cProduct.ListJson(Nothing)
            Case "DIC"
                Set oDic = cProduct.ListDic(iReturn, Nothing)        
            Case else
                Set oRs = cProduct.List(iReturn, Nothing)
            End Select
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "LIST_CORP" Then

        iMsgCode = -5300

        ' 프로퍼티 <옵션>
        cOrder.MsgCode       = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cOrder.ListCorpXml(Nothing)
        Case "JSON"
            strContent = cOrder.ListCorpJson(Nothing)
        Case "DIC"
            Set oDic = cOrder.ListCorpDic(iReturn, Nothing)        
        Case else
            Set oRs = cOrder.ListCorp(iReturn, Nothing)
        End Select

    Else
        iReturn = -10000
    End If


    '-------------------------------------------------
    ' 출력
    If doctype = "XML" Then

        If iReturn < 0 and IsEmpty(strContent) Then 
            'iReturn = iReturn + iMsgCode
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
        ''''''''''''''''''''''''''
        'REVIEW:: Dic, RS 구현영역
        'Dim gIdx1
        'For gIdx1 = 0 To oDic.Count - 1 
            'Response.Write " adm_id: " & oDic(gIdx1)("adm_id")
            'Response.Write " admName: " & oDic(gIdx1)("admName")
            'Response.Write " <br/>"
        'Next
    End If


    '객체 해제
    Set oRs = Nothing
    Set oDic = Nothing
    Set cOrder = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->