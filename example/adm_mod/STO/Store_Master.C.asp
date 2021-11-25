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
<!--#include virtual="/Module/STO/STO_Master.Cls.asp"-->
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

    Dim sto_id          : sto_id        = Request("sto_id")
    Dim stoName         : stoName       = Request("stoName")
    Dim sto_code        : sto_code      = Request("sto_code")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cStore, oDic, oRs
    Dim iReturn : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cStore = New STO_Master_Cls
    
    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        iMsgCode = -1000
        ' 필수값 검사
        If Len(stoName) > 0 or Len(adm_id) > 0 or Len(passwd) > 0 or Len(stoName) > 0 Then
            ' 프로퍼티 <필수>
            cStore.StoName        = stoName
            ' 프로퍼티 <선택>
            If Len(sto_code) > 0 Then cStore.Sto_code  = sto_code
            ' 프로퍼티 <옵션>
            cStore.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cStore.CreateXml(iReturn, sto_id)
            Case "JSON"
                strContent = cStore.CreateJson(iReturn, sto_id)
            Case "DIC"
                Set oDic = cStore.CreateDic(iReturn, sto_id)        
            Case else
                Set oRs = cStore.Create(iReturn, sto_id)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        iMsgCode = -2000
        ' 필수값 검사
        If Len(sto_id) > 0 Then
            ' 프로퍼티 <필수>
            cStore.Sto_id        = sto_id
            ' 프로퍼티 <옵션>
            cStore.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cStore.ReadXml(iReturn)
            Case "JSON"
                strContent = cStore.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cStore.ReadDic(iReturn)        
            Case else
                Set oRs = cStore.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        iMsgCode = -3000
        ' 필수값 검사
        If Len(sto_id) > 0 Then
            ' 프로퍼티 <필수>
            cStore.Sto_id        = sto_id
            ' 프로퍼티 <선택>
            If Len(stoName) > 0  Then cStore.StoName         = stoName
            ' 프로퍼티 <옵션>
            cStore.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cStore.UpdateXml(iReturn)
            Case "JSON"
                strContent = cStore.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cStore.UpdateDic(iReturn)        
            Case else
                Set oRs = cStore.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        iMsgCode = -4000
        ' 필수값 검사
        If Len(sto_id) > 0 Then
            ' 프로퍼티 <필수>
            cStore.Sto_id        = sto_id
            ' 프로퍼티 <옵션>
            cStore.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cStore.DeleteXml(iReturn)
            Case "JSON"
                strContent = cStore.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cStore.DeleteDic(iReturn)        
            Case else
                Set oRs = cStore.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then
        iMsgCode = -5000
        ' 프로퍼티 설정
        If Len(keyword) > 0     Then cStore.Keyword        = keyword
        If Len(page_size) > 0   Then cStore.Page_size      = page_size
        If Len(page_count) > 0  Then cStore.Page_count     = page_count
        If Len(sort_cd) > 0     Then cStore.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cStore.MsgCode        = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cStore.ListXml(iReturn, iRowTotal)
        Case "JSON"
            strContent = cStore.ListJson(iReturn, iRowTotal)
        Case "DIC"
            Set oDic = cStore.ListDic(iReturn, iRowTotal)        
        Case else
            Set oRs = cStore.List(iReturn, iRowTotal)
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
    Set cStore = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->