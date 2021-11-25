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
<!--#include virtual="/Module/PRT/PRT_Option.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim prt_id          : prt_id        = Request("prt_id")
    Dim optName         : optName       = Request("optName")
    Dim sell_mn         : sell_mn       = Request("sell_mn")
    Dim discount_mn     : discount_mn   = Request("discount_mn")
    Dim point_it        : point_it      = Request("point_it")
    Dim default_yn      : default_yn    = Request("default_yn")
    Dim opt_idx         : opt_idx       = Request("opt_idx")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cOption, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cOption = New PRT_Option_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(prt_id) > 0 and Len(optName) > 0 and Len(sell_mn) > 0 Then
            ' 프로퍼티 <필수>
            cOption.Prt_id             = prt_id
            cOption.OptName            = optName
            cOption.Sell_mn            = sell_mn
            ' 프로퍼티 <선택>
            If Len(discount_mn) > 0     Then cOption.Discount_mn  = discount_mn
            If Len(point_it) > 0        Then cOption.Point_it  = point_it
            If Len(default_yn) > 0      Then cOption.Default_yn  = default_yn
            ' 프로퍼티 <옵션>
            cOption.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOption.CreateXml(iReturn)
            Case "JSON"
                strContent = cOption.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cOption.CreateDic(iReturn)        
            Case else
                Set oRs = cOption.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(prt_id) > 0 and Len(opt_idx) > 0 Then
            ' 프로퍼티 <필수>
            cOption.Prt_id              = prt_id
            cOption.Opt_idx             = opt_idx
            ' 프로퍼티 <옵션>
            cOption.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOption.ReadXml(iReturn)
            Case "JSON"
                strContent = cOption.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cOption.ReadDic(iReturn)        
            Case else
                Set oRs = cOption.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(prt_id) > 0 and Len(opt_idx) > 0 Then
            ' 프로퍼티 <필수>
            cOption.Prt_id              = prt_id
            cOption.Opt_idx             = opt_idx
            ' 프로퍼티 <선택>
            If Len(optName) > 0         Then cOption.OptName  = optName
            If Len(sell_mn) > 0         Then cOption.Sell_mn  = sell_mn
            If Len(discount_mn) > 0     Then cOption.Discount_mn  = discount_mn
            If Len(point_it) > 0        Then cOption.Point_it  = point_it
            If Len(default_yn) > 0      Then cOption.Default_yn  = default_yn
            ' 프로퍼티 <옵션>
            cOption.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOption.UpdateXml(iReturn)
            Case "JSON"
                strContent = cOption.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cOption.UpdateDic(iReturn)        
            Case else
                Set oRs = cOption.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(prt_id) > 0 and Len(opt_idx) > 0 Then
            ' 프로퍼티 <필수>
            cOption.Prt_id              = prt_id
            cOption.Opt_idx             = opt_idx
            ' 프로퍼티 <옵션>
            cOption.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOption.DeleteXml(iReturn)
            Case "JSON"
                strContent = cOption.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cOption.DeleteDic(iReturn)        
            Case else
                Set oRs = cOption.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then

        iMsgCode = -5000
        ' 필수값 검사
        If Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cOption.Prt_id              = prt_id
            ' 프로퍼티 <선택>
            If Len(keyword) > 0     Then cOption.Keyword        = keyword
            If Len(page_size) > 0   Then cOption.Page_size      = page_size
            If Len(page_count) > 0  Then cOption.Page_count     = page_count
            If Len(sort_cd) > 0     Then cOption.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cOption.MsgCode        = iMsgCode
cOption.Page_size      = "0"
            Select Case UCase(doctype)
            Case "XML"
                strContent = cOption.ListXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cOption.ListJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cOption.ListDic(iReturn, iRowTotal)
            Case else
                Set oRs = cOption.List(iReturn, iRowTotal)
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
    Set cOption = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->