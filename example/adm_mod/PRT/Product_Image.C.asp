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
<!--#include virtual="/Module/PRT/PRT_Image.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))
    Dim doctype         : doctype       = UCase(Request("doctype"))

    Dim prt_id          : prt_id        = Request("prt_id")
    Dim fileName        : fileName      = Request("fileName")
    Dim position_cd     : position_cd   = Request("position_cd")
    Dim rank_it         : rank_it       = Request("rank_it")
    Dim img_idx        : img_idx        = Request("img_idx")

    Dim keyword         : keyword       = Request("keyword")
    Dim sort_cd         : sort_cd       = Request("sort_cd")
    Dim page_size       : page_size     = Request("page_size")
    Dim page_count      : page_count    = Request("page_count")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cImage, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cImage = New PRT_Image_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then

        iMsgCode = -1000
        ' 필수값 검사
        If Len(prt_id) > 0 or Len(fileName) > 0 Then
            ' 프로퍼티 <필수>
            cImage.Prt_id             = prt_id
            cImage.FileName            = fileName
            ' 프로퍼티 <선택>
            If Len(position_cd) > 0     Then cImage.Position_cd  = position_cd
            If Len(rank_it) > 0         Then cImage.Rank_it  = rank_it
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cImage.CreateXml(iReturn)
            Case "JSON"
                strContent = cImage.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cImage.CreateDic(iReturn)        
            Case else
                Set oRs = cImage.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then
        
        iMsgCode = -2000
        ' 필수값 검사
        If Len(img_idx) > 0 Then
            ' 프로퍼티 <필수>
            cImage.Img_idx        = img_idx
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cImage.ReadXml(iReturn)
            Case "JSON"
                strContent = cImage.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cImage.ReadDic(iReturn)        
            Case else
                Set oRs = cImage.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(img_idx) > 0 Then
            ' 프로퍼티 <필수>
            cImage.Img_idx        = img_idx
            ' 프로퍼티 <선택>
            If Len(fileName) > 0        Then cImage.FileName  = fileName
            If Len(position_cd) > 0     Then cImage.Position_cd  = position_cd
            If Len(rank_it) > 0         Then cImage.Rank_it  = rank_it
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode
            
            Select Case UCase(doctype)
            Case "XML"
                strContent = cImage.UpdateXml(iReturn)
            Case "JSON"
                strContent = cImage.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cImage.UpdateDic(iReturn)        
            Case else
                Set oRs = cImage.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(img_idx) > 0 Then
            ' 프로퍼티 <필수>
            cImage.Img_idx        = img_idx
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cImage.DeleteXml(iReturn)
            Case "JSON"
                strContent = cImage.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cImage.DeleteDic(iReturn)        
            Case else
                Set oRs = cImage.Delete(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If      
    ElseIf cmd = "LIST" Then
        
        iMsgCode = -5000
        ' 필수값 검사
        If Len(prt_id) > 0 Then
            ' 프로퍼티 <필수>
            cImage.Prt_id              = prt_id
            ' 프로퍼티 <선택>
            If Len(keyword) > 0     Then cImage.Keyword        = keyword
            If Len(page_size) > 0   Then cImage.Page_size      = page_size
            If Len(page_count) > 0  Then cImage.Page_count     = page_count
            If Len(sort_cd) > 0     Then cImage.Sort_cd        = sort_cd
            ' 프로퍼티 <옵션>
            cImage.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cImage.ListXml(iReturn, iRowTotal)
            Case "JSON"
                strContent = cImage.ListJson(iReturn, iRowTotal)
            Case "DIC"
                Set oDic = cImage.ListDic(iReturn, iRowTotal)        
            Case else
                Set oRs = cImage.List(iReturn, iRowTotal)
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
    Set cImage = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->