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
<!--#include virtual="/Module/PRT/PRT_DispPrt.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim dsp_id          : dsp_id        = Request("dsp_id")
    Dim prt_id          : prt_id        = Request("prt_id")
    Dim rank_it         : rank_it       = Request("rank_it")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cDispPrt, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cDispPrt = New PRT_DispPrt_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then

        iMsgCode = -1000
        ' 필수값 검사
        If Len(dsp_id) > 0 and Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cDispPrt.Dsp_id             = dsp_id
            cDispPrt.Prt_id             = prt_id
            ' 프로퍼티 <선택>
            If Len(rank_it) > 0         Then cDispPrt.Rank_it  = rank_it
            ' 프로퍼티 <옵션>
            cDispPrt.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDispPrt.CreateXml(iReturn)
            Case "JSON"
                strContent = cDispPrt.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cDispPrt.CreateDic(iReturn)        
            Case else
                Set oRs = cDispPrt.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(dsp_id) > 0 and Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cDispPrt.Dsp_id             = dsp_id
            cDispPrt.Prt_id             = prt_id
            ' 프로퍼티 <선택>
            If Len(rank_it) > 0         Then cDispPrt.Rank_it  = rank_it
            ' 프로퍼티 <옵션>
            cDispPrt.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDispPrt.UpdateXml(iReturn)
            Case "JSON"
                strContent = cDispPrt.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cDispPrt.UpdateDic(iReturn)        
            Case else
                Set oRs = cDispPrt.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then

        iMsgCode = -4000
        ' 필수값 검사
        If Len(dsp_id) > 0 and Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cDispPrt.Dsp_id             = dsp_id
            cDispPrt.Prt_id             = prt_id
            ' 프로퍼티 <옵션>
            cDispPrt.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDispPrt.DeleteXml(iReturn)
            Case "JSON"
                strContent = cDispPrt.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cDispPrt.DeleteDic(iReturn)        
            Case else
                Set oRs = cDispPrt.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then

        iMsgCode = -5000
        ' 필수값 검사
        If Len(dsp_id) > 0 Then
            ' 프로퍼티 <필수>
            cDispPrt.Dsp_id              = dsp_id
            ' 프로퍼티 <선택>
            If Len(keyword) > 0     Then cDispPrt.Keyword        = keyword
            If Len(page_size) > 0   Then cDispPrt.Page_size      = page_size
            If Len(page_count) > 0  Then cDispPrt.Page_count     = page_count
            If Len(sort_cd) > 0     Then cDispPrt.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cDispPrt.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cDispPrt.ListXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cDispPrt.ListJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cDispPrt.ListDic(iReturn, iRowTotal)        
            Case else
                Set oRs = cDispPrt.List(iReturn, iRowTotal)
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
    Set cDispPrt = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->