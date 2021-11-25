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
<!--#include virtual="/Module/POT/POT_Master.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim identifier      : identifier    = Request("identifier")
    Dim pointName       : pointName     = Request("pointName")
    Dim method_cd       : method_cd     = Request("method_cd")
    Dim point_it        : point_it      = Request("point_it")
    Dim percent_it      : percent_it    = Request("percent_it")
    Dim use_yn          : use_yn        = Request("use_yn")
    Dim contents        : contents      = Request("contents")
    Dim pot_id          : pot_id        = Request("pot_id")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cPoint, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cPoint = New POT_Master_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(identifier) > 0 or Len(pointName) > 0 or Len(method_cd) > 0 Then
            ' 프로퍼티 <필수>
            cPoint.Identifier       = identifier
            cPoint.PointName        = pointName
            cPoint.Method_cd        = method_cd
            ' 프로퍼티 <선택>
            If Len(point_it) > 0    Then cPoint.Point_it  = point_it
            If Len(percent_it) > 0  Then cPoint.Percent_it  = percent_it
            If Len(use_yn) > 0      Then cPoint.Use_yn  = use_yn
            If Len(contents) > 0    Then cPoint.Contents  = contents
            ' 프로퍼티 <옵션>
            cPoint.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cPoint.CreateXml(iReturn)
            Case "JSON"
                strContent = cPoint.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cPoint.CreateDic(iReturn)        
            Case else
                Set oRs = cPoint.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(pot_id) > 0 Then
            ' 프로퍼티 <필수>
            cPoint.Pot_id        = pot_id
            ' 프로퍼티 <옵션>
            cPoint.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cPoint.ReadXml(iReturn)
            Case "JSON"
                strContent = cPoint.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cPoint.ReadDic(iReturn)        
            Case else
                Set oRs = cPoint.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(pot_id) > 0 Then
            ' 프로퍼티 <필수>
            cPoint.Pot_id        = pot_id
            ' 프로퍼티 <선택>
            If Len(identifier) > 0  Then cPoint.Identifier  = identifier
            If Len(pointName) > 0   Then cPoint.PointName  = pointName
            If Len(method_cd) > 0   Then cPoint.Method_cd  = method_cd
            If Len(point_it) > 0    Then cPoint.Point_it  = point_it
            If Len(percent_it) > 0  Then cPoint.Percent_it  = percent_it
            If Len(use_yn) > 0      Then cPoint.Use_yn  = use_yn
            If Len(contents) > 0    Then cPoint.Contents  = contents
            ' 프로퍼티 <옵션>
            cPoint.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cPoint.UpdateXml(iReturn)
            Case "JSON"
                strContent = cPoint.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cPoint.UpdateDic(iReturn)        
            Case else
                Set oRs = cPoint.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(pot_id) > 0 Then
            ' 프로퍼티 <필수>
            cPoint.Pot_id        = pot_id
            ' 프로퍼티 <옵션>
            cPoint.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cPoint.DeleteXml(iReturn)
            Case "JSON"
                strContent = cPoint.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cPoint.DeleteDic(iReturn)        
            Case else
                Set oRs = cPoint.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 프로퍼티 설정
        If Len(keyword) > 0     Then cPoint.Keyword        = keyword
        If Len(page_size) > 0   Then cPoint.Page_size      = page_size
        If Len(page_count) > 0  Then cPoint.Page_count     = page_count
        If Len(sort_cd) > 0     Then cPoint.Sort_cd        = sort_cd
        ' 프로퍼티 <옵션>
        cPoint.MsgCode        = iMsgCode

        Select Case UCase(doctype)
        Case "XML"
            strContent = cPoint.ListXml(iReturn, iRowTotal)
        Case "JSON"
            strContent = cPoint.ListJson(iReturn, iRowTotal)
        Case "DIC"
            Set oDic = cPoint.ListDic(iReturn, iRowTotal)        
        Case else
            Set oRs = cPoint.List(iReturn, iRowTotal)
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
    Set cPoint = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->