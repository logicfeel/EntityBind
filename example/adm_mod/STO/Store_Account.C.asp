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
<!--#include virtual="/Module/STO/STO_Account.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim acc_idx         : acc_idx       = Request("acc_idx")
    Dim admName         : admName       = Request("admName")
    Dim use_yn          : use_yn        = Request("use_yn")
    Dim sto_id          : sto_id        = Request("sto_id")
    Dim adm_id          : adm_id        = Request("adm_id")
    Dim passwd          : passwd        = Request("passwd")
    Dim memo            : memo          = Request("memo")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cAccount, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cAccount = New STO_Account_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then

        iMsgCode = -1000
        ' 필수값 검사
        If Len(sto_id) > 0 or Len(adm_id) > 0 or Len(passwd) > 0 or Len(admName) > 0 Then
            ' 프로퍼티 <필수>
            cAccount.Sto_id         = "S00001"
            cAccount.Adm_id         = adm_id
            cAccount.Passwd         = passwd
            cAccount.AdmName        = admName
            ' 프로퍼티 <선택>
            If Len(use_yn) > 0 Then cAccount.Use_yn  = use_yn
            ' 프로퍼티 <옵션>
            cAccount.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cAccount.CreateXml(iReturn)
            Case "JSON"
                strContent = cAccount.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cAccount.CreateDic(iReturn)        
            Case else
                Set oRs = cAccount.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then

        iMsgCode = -2000
        ' 필수값 검사
        If Len(acc_idx) > 0 Then
            ' 프로퍼티 <필수>
            cAccount.Acc_idx        = acc_idx
            ' 프로퍼티 <옵션>
            cAccount.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
            Case "XML"
                strContent = cAccount.ReadXml(iReturn)
            Case "JSON"
                strContent = cAccount.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cAccount.ReadDic(iReturn)        
            Case else
                Set oRs = cAccount.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then

        iMsgCode = -3000
        ' 필수값 검사
        If Len(acc_idx) > 0 Then
            ' 프로퍼티 <필수>
            cAccount.Acc_idx        = acc_idx
            ' 프로퍼티 <선택>
            If Len(passwd) > 0  Then cAccount.Passwd         = passwd
            If Len(admName) > 0 Then cAccount.AdmName        = admName
            If Len(use_yn) > 0  Then cAccount.Use_yn         = use_yn
            ' 프로퍼티 <옵션>
            cAccount.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cAccount.UpdateXml(iReturn)
            Case "JSON"
                strContent = cAccount.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cAccount.UpdateDic(iReturn)        
            Case else
                Set oRs = cAccount.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then

        iMsgCode = -4000
        ' 필수값 검사
        If Len(acc_idx) > 0 Then
            ' 프로퍼티 <필수>
            cAccount.Acc_idx        = acc_idx
            ' 프로퍼티 <옵션>
            cAccount.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cAccount.DeleteXml(iReturn)
            Case "JSON"
                strContent = cAccount.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cAccount.DeleteDic(iReturn)        
            Case else
                Set oRs = cAccount.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then

        iMsgCode = -5000
        ' 프로퍼티 설정
        If Len(keyword) > 0     Then cAccount.Keyword        = keyword
        If Len(page_size) > 0   Then cAccount.Page_size      = page_size
        If Len(page_count) > 0  Then cAccount.Page_count     = page_count
        If Len(sort_cd) > 0     Then cAccount.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cAccount.MsgCode        = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cAccount.ListXml(iReturn, iRowTotal)
        Case "JSON"
            strContent = cAccount.ListJson(iReturn, iRowTotal)
        Case "DIC"
            Set oDic = cAccount.ListDic(iReturn, iRowTotal)        
        Case else
            Set oRs = cAccount.List(iReturn, iRowTotal)
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
        Response.Write iReturn
    End If

    '객체 해제
    Set oRs = Nothing
    Set oDic = Nothing
    Set cAccount = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->