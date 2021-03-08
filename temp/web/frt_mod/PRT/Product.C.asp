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
<!--#include virtual="/Module/PRT/PRT.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim prt_id          : prt_id        = Request("prt_id")

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

    Dim cProduct    : Set cProduct = New PRT_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정
    
    '-------------------------------------------------`
    ' cmd 분기 처리    
    If cmd = "READ" Then
        
        iMsgCode = -2000

        If Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cProduct.Prt_id         = prt_id
            ' 프로퍼티 <옵션>
            cProduct.MsgCode        = iMsgCode

            Select Case UCase(doctype)
                Case "XML"
                    strContent = cProduct.ReadXml(iReturn)
                Case "JSON"
                    strContent = cProduct.ReadJson(iReturn)
                Case "DIC"
                    Set oDic = cProduct.ReadDic(iReturn)        
                Case else
                    Set oRs = cProduct.Read(iReturn)
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
    Set cProduct = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->