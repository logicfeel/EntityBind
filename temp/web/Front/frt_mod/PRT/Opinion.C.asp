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
<!--#include virtual="/Module/PRT/PRT_Opinion.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim prt_id          : prt_id        = Request("prt_id")
    Dim grade_cd        : grade_cd      = Request("grade_cd")
    Dim ord_id          : ord_id        = Request("ord_id")
    Dim contents        : contents      = Request("contents")
    Dim opi_idx         : opi_idx       = Request("opi_idx")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")


    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cOpinion, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cOpinion = New PRT_Opinion_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------`
    ' cmd 분기 처리    
    If cmd = "CREATE_ORDER" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(ord_id) > 0 and Len(grade_cd) Then
            ' 프로퍼티 <필수>
            cOpinion.Ord_id         = ord_id
            cOpinion.Grade_cd       = grade_cd
            ' 프로퍼티 <선택>
            If Len(contents) > 0    Then cOpinion.Contents      = contents
            ' 프로퍼티 <옵션>
            cOpinion.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOpinion.CreateOrderXml(iReturn)
            Case "JSON"
                strContent = cOpinion.CreateOrderJson(iReturn)
            Case "DIC"
                Set oDic = cOpinion.CreateOrderDic(iReturn)        
            Case else
                Set oRs = cOpinion.CreateOrder(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If

    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(prt_id) > 0 and Len(opi_idx) Then
            ' 프로퍼티 <필수>
            cOpinion.Prt_id         = prt_id
            cOpinion.Opi_idx       = opi_idx
            ' 프로퍼티 <선택>
            If Len(ord_id) > 0      Then cOpinion.Ord_id        = ord_id
            If Len(contents) > 0    Then cOpinion.Contents      = contents
            If Len(grade_cd) > 0    Then cOpinion.Grade_cd      = grade_cd

            ' 프로퍼티 <옵션>
            cOpinion.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOpinion.UpdateXml(iReturn)
            Case "JSON"
                strContent = cOpinion.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cOpinion.UpdateDic(iReturn)        
            Case else
                Set oRs = cOpinion.Update(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If        

    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(prt_id) > 0 and Len(opi_idx) Then
            ' 프로퍼티 <필수>
            cOpinion.Prt_id         = prt_id
            cOpinion.Opi_idx       = opi_idx
            ' 프로퍼티 <옵션>
            cOpinion.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cOpinion.DeleteXml(iReturn)
            Case "JSON"
                strContent = cOpinion.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cOpinion.DeleteDic(iReturn)        
            Case else
                Set oRs = cOpinion.Delete(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If       

    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000

        ' 프로퍼티 <선택>
        If Len(prt_id) > 0      Then cOpinion.Prt_id        = prt_id
        If Len(keyword) > 0     Then cOpinion.Keyword        = keyword
        If Len(page_size) > 0   Then cOpinion.Page_size      = page_size
        If Len(page_count) > 0  Then cOpinion.Page_count     = page_count
        If Len(sort_cd) > 0     Then cOpinion.Sort_cd        = sort_cd

        ' 프로퍼티 <옵션>
        cOpinion.MsgCode        = iMsgCode

        Select Case UCase(doctype)
            Case "XML"
                strContent = cOpinion.ListXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cOpinion.ListJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cOpinion.ListDic(iReturn, iRowTotal)        
            Case else
                Set oRs = cOpinion.List(iReturn, iRowTotal)
        End Select
      

    Else
        iReturn = -10000
    End If


    '-------------------------------------------------
    ' 출력
    If doctype = "XML" Then

        If iReturn < 0 and IsEmpty(strContent) Then 
            strContent = "<table return='" & iReturn & "'/></table>"
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
    Set cOpinion = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->