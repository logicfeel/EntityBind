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
<!--#include virtual="/Module/PRT/PRT_Display.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim dspName         : dspName       = Request("dspName")
    Dim parent_id       : parent_id     = Request("parent_id")
    Dim rank_it         : rank_it       = Request("rank_it")
    Dim dsp_id          : dsp_id        = Request("dsp_id")
    Dim delimiter       : delimiter     = Request("delimiter")
    
    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cDisplay, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cDisplay = New PRT_Display_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(dspName) > 0 Then
            ' 프로퍼티 <필수>
            cDisplay.DspName             = dspName
            ' 프로퍼티 <선택>
            If Len(parent_id) > 0       Then cDisplay.Parent_id  = parent_id
            If Len(rank_it) > 0         Then cDisplay.Rank_it  = rank_it
            ' 프로퍼티 <옵션>
            cDisplay.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDisplay.CreateXml(iReturn)
            Case "JSON"
                strContent = cDisplay.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cDisplay.CreateDic(iReturn)        
            Case else
                Set oRs = cDisplay.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(dsp_id) > 0 Then
            ' 프로퍼티 <필수>
            cDisplay.Dsp_id        = dsp_id
            ' 프로퍼티 <옵션>
            cDisplay.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDisplay.ReadXml(iReturn)
            Case "JSON"
                strContent = cDisplay.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cDisplay.ReadDic(iReturn)        
            Case else
                Set oRs = cDisplay.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(dsp_id) > 0 Then
            ' 프로퍼티 <필수>
            cDisplay.Dsp_id             = dsp_id
            ' 프로퍼티 <선택>
            If Len(dspName) > 0         Then cDisplay.DspName  = dspName
            If Len(parent_id) > 0       Then cDisplay.Parent_id  = parent_id
            If Len(rank_it) > 0         Then cDisplay.Rank_it  = rank_it
            ' 프로퍼티 <옵션>
            cDisplay.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDisplay.UpdateXml(iReturn)
            Case "JSON"
                strContent = cDisplay.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cDisplay.UpdateDic(iReturn)        
            Case else
                Set oRs = cDisplay.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(dsp_id) > 0 Then
            ' 프로퍼티 <필수>
            cDisplay.Dsp_id             = dsp_id
            ' 프로퍼티 <옵션>
            cDisplay.MsgCode            = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDisplay.DeleteXml(iReturn)
            Case "JSON"
                strContent = cDisplay.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cDisplay.DeleteDic(iReturn)        
            Case else
                Set oRs = cDisplay.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 필수값 검사
        If Len(dsp_id) > 0 Then
            ' 프로퍼티 <필수>
            cDisplay.Dsp_id             = dsp_id
            ' 프로퍼티 <선택>
            If Len(delimiter) > 0       Then cDisplay.Delimiter  = delimiter
            ' 프로퍼티 <옵션>
            cDisplay.MsgCode            = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDisplay.ListXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cDisplay.ListJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cDisplay.ListDic(iReturn, iRowTotal)        
            Case else
                Set oRs = cDisplay.List(iReturn, iRowTotal)
            End Select
        Else
            iReturn = iMsgCode
        End If        
    ElseIf cmd = "TREE" Then
        
        iMsgCode = -6000
        ' 필수값 검사
        If Len(dsp_id) > 0 Then
            ' 프로퍼티 <필수>
            cDisplay.Dsp_id             = dsp_id
            ' 프로퍼티 <옵션>
            cDisplay.MsgCode            = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDisplay.TreeXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cDisplay.TreeJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cDisplay.TreeDic(iReturn, iRowTotal)        
            Case else
                Set oRs = cDisplay.Tree(iReturn, iRowTotal)
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
    Set cDisplay = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->