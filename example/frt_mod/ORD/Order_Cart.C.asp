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
<!--#include virtual="/Module/ORD/ORD_Cart.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd               = UCase(Request("cmd"))
    Dim doctype         : doctype           = UCase(Request("doctype"))

    Dim client_id       : client_id         = Request("client_id")
    Dim meb_idx         : meb_idx           = Request("meb_idx")
    Dim arr_prt_opt_qty : arr_prt_opt_qty   = Request("arr_prt_opt_qty")
    Dim state_cd        : state_cd          = Request("state_cd")
    Dim crt_idx         : crt_idx           = Request("crt_idx")
    Dim prt_id          : prt_id            = Request("prt_id")
    Dim opt_idx         : opt_idx           = Request("opt_idx")
    Dim qty_it          : qty_it            = Request("qty_it")
    Dim ord_id          : ord_id            = Request("ord_id")
    Dim del_yn          : del_yn            = Request("del_yn")
    Dim edit_crt_idx    : edit_crt_idx      = Request("edit_crt_idx")

    Dim keyword         : keyword           = Request("keyword")
    Dim sort_cd         : sort_cd           = Request("sort_cd")
    Dim page_size       : page_size         = Request("page_size")
    Dim page_count      : page_count        = Request("page_count")

    Dim msgSave_yn      : msgSave_yn        = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn      = Request("msg_Print_yn")

    Dim strContent

    Dim cCart, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cCart = New ORD_Cart_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(arr_prt_opt_qty) > 0 and (Len(client_id) > 0 or Len(meb_idx) > 0) Then
            ' 프로퍼티 <필수>
            cCart.Arr_prt_opt_qty       = arr_prt_opt_qty
            ' 프로퍼티 <선택>
            If Len(client_id) > 0       Then cCart.Client_id    = client_id
            If Len(meb_idx) > 0         Then cCart.Meb_idx      = meb_idx
            If Len(state_cd) > 0        Then cCart.State_cd     = state_cd
            ' 프로퍼티 <옵션>
            cCart.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cCart.CreateXml(iReturn)
                Case "JSON"
                    strContent = cCart.CreateJson(iReturn)
                Case "DIC"
                    Set oDic = cCart.CreateDic(iReturn)        
                Case else
                    Set oRs = cCart.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(crt_idx) > 0 and Len(arr_prt_opt_qty) > 0 Then
            ' 프로퍼티 <필수>
            cCart.Crt_idx               = crt_idx
            cCart.Arr_prt_opt_qty       = arr_prt_opt_qty
            ' 프로퍼티 <선택>
            If Len(state_cd) > 0        Then cCart.State_cd     = state_cd
            ' 프로퍼티 <옵션>
            cCart.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
                Case "XML"
                    strContent = cCart.UpdateXml(iReturn)
                Case "JSON"
                    strContent = cCart.UpdateJson(iReturn)
                Case "DIC"
                    Set oDic = cCart.UpdateDic(iReturn)        
                Case else
                    Set oRs = cCart.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(crt_idx) > 0 and Len(arr_prt_opt_qty) > 0 Then
            ' 프로퍼티 <필수>
            cCart.Crt_idx               = crt_idx
            cCart.Arr_prt_opt_qty       = arr_prt_opt_qty
            ' 프로퍼티 <옵션>
            cCart.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cCart.DeleteXml(iReturn)
                Case "JSON"
                    strContent = cCart.DeleteJson(iReturn)
                Case "DIC"
                    Set oDic = cCart.DeleteDic(iReturn)        
                Case else
                    Set oRs = cCart.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then

        iMsgCode = -5000
        ' 필수값 검사
        If Len(crt_idx) > 0 and Len(state_cd) > 0 Then
            ' 프로퍼티 <필수>
            cCart.Crt_idx               = crt_idx
            cCart.State_cd              = state_cd
            ' 프로퍼티 <선택>
            If Len(keyword) > 0     Then cCart.Keyword        = keyword
            If Len(page_size) > 0   Then cCart.Page_size      = page_size
            If Len(page_count) > 0  Then cCart.Page_count     = page_count
            If Len(sort_cd) > 0     Then cCart.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cCart.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cCart.ListXml(iReturn, iRowTotal)
                Case "JSON"
                    strContent = cCart.ListJson(iReturn, iRowTotal)
                Case "DIC"
                    Set oDic = cCart.ListDic(iReturn, iRowTotal)        
                Case else
                    Set oRs = cCart.List(iReturn, iRowTotal)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "ORDER" Then
        
        iMsgCode = -11000
        ' 필수값 검사
        If Len(crt_idx) > 0 and Len(arr_prt_opt_qty) > 0 Then
            ' 프로퍼티 <필수>
            cCart.Crt_idx               = crt_idx
            cCart.Arr_prt_opt_qty       = arr_prt_opt_qty
            ' 프로퍼티 <옵션>
            cCart.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
                Case "XML"
                    strContent = cCart.OrderXml(iReturn)
                Case "JSON"
                    strContent = cCart.OrderJson(iReturn)
                Case "DIC"
                    Set oDic = cCart.OrderDic(iReturn)        
                Case else
                    Set oRs = cCart.Order(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "RESET" Then
        
        iMsgCode = -12000
        ' 필수값 검사
        If Len(crt_idx) > 0 Then
            ' 프로퍼티 <필수>
            cCart.Crt_idx               = crt_idx
            ' 프로퍼티 <옵션>
            cCart.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
                Case "XML"
                    strContent = cCart.ResetXml(iReturn)
                Case "JSON"
                    strContent = cCart.ResetJson(iReturn)
                Case "DIC"
                    Set oDic = cCart.ResetDic(iReturn)        
                Case else
                    Set oRs = cCart.Reset(iReturn)
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
    Set cCart = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->