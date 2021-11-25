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
<!--#include virtual="/Module/DGN/DGN_RollingImage.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim roll_idx        : roll_idx      = Request("roll_idx")
    Dim title           : title         = Request("title")
    Dim pcUrl           : pcUrl         = Request("pcUrl")
    Dim mUrl            : mUrl          = Request("mUrl")
    Dim pcLink          : pcLink        = Request("pcLink")
    Dim mLink           : mLink         = Request("mLink")
    Dim active_yn       : active_yn     = Request("active_yn")
    Dim img_idx         : img_idx       = Request("img_idx")

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

    Dim cRoll      : Set cRoll = New BOD_RollingImage_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(roll_idx) > 0  and Len(img_idx) > 0 Then
            ' 프로퍼티 <필수>
            cRoll.Roll_idx     = roll_idx
            cRoll.Img_idx      = img_idx
            ' 프로퍼티 <옵션>
            cRoll.MsgCode      = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cRoll.ReadXml(iReturn)
                Case "JSON"
                    strContent = cRoll.ReadJson(iReturn)
                Case "DIC"
                    Set oDic = cRoll.ReadDic(iReturn)        
                Case else
                    Set oRs = cRoll.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 필수값 검사
        If  Len(roll_idx) > 0 Then
            ' 프로퍼티 <필수>
            cRoll.Roll_idx     = roll_idx
            cRoll.Active_yn      = "Y"
            ' 프로퍼티 <선택>
            If Len(keyword) > 0     Then cRoll.Keyword        = keyword
            If Len(page_size) > 0   Then cRoll.Page_size      = page_size
            If Len(page_count) > 0  Then cRoll.Page_count     = page_count
            If Len(sort_cd) > 0     Then cRoll.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cRoll.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cRoll.ListXml(iReturn, iRowTotal)
                Case "JSON"
                    strContent = cRoll.ListJson(iReturn, iRowTotal)
                Case "DIC"
                    Set oDic = cRoll.ListDic(iReturn, iRowTotal)        
                Case else
                    Set oRs = cRoll.List(iReturn, iRowTotal)
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
    Set cRoll = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->