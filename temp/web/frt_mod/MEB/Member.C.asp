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
<!--#include virtual="/Module/MEB/MEB.Cls.asp"-->
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
    
    Dim mebName         : mebName       = Request("mebName")
    Dim sto_id          : sto_id        = Request("sto_id")
    Dim state_cd        : state_cd      = Request("state_cd")
    Dim meb_id          : meb_id        = Request("meb_id")
    Dim passwd          : passwd        = Request("passwd")
    Dim newPasswd       : newPasswd     = Request("newPasswd")
    Dim nickname        : nickname      = Request("nickname")
    Dim email           : email         = Request("email")
    Dim zipcode         : zipcode       = Request("zipcode")
    Dim addr1           : addr1         = Request("addr1")
    Dim addr2           : addr2         = Request("addr2")
    Dim tel             : tel           = Request("tel")
    Dim hp              : hp            = Request("hp")
    Dim join_cd         : join_cd       = Request("join_cd")
    Dim joinComment     : joinComment   = Request("joinComment")
    Dim meb_idx         : meb_idx       = Request("meb_idx")
    Dim memo            : memo          = Request("memo")

    Dim msgSave_yn      : msgSave_yn    = Request("msgSave_yn")
    Dim msg_Print_yn    : msg_Print_yn  = Request("msg_Print_yn")

    Dim strContent

    Dim cMember, oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cMember = New MEB_Cls

    If Len(doctype) = 0 Then doctype = "JSON"   '기본값 설정

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "CREATE" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(mebName) > 0 and Len(sto_id) > 0 and Len(meb_id) > 0 and Len(passwd) > 0 Then
            ' 프로퍼티 <필수>
            cMember.MebName        = mebName
            cMember.Sto_id         = sto_id
            cMember.Meb_id         = meb_id
            cMember.Passwd         = passwd
            ' 프로퍼티 <선택>
            If Len(state_cd) > 0    Then cMember.State_cd  = state_cd
            If Len(nickname) > 0    Then cMember.Nickname  = nickname
            If Len(email) > 0       Then cMember.Email  = email
            If Len(zipcode) > 0     Then cMember.Zipcode  = zipcode
            If Len(addr1) > 0       Then cMember.Addr1  = addr1
            If Len(addr2) > 0       Then cMember.Addr2  = addr2
            If Len(tel) > 0         Then cMember.Tel  = tel
            If Len(hp) > 0          Then cMember.Hp  = hp
            If Len(join_cd) > 0     Then cMember.Join_cd  = join_cd
            If Len(joinComment) > 0 Then cMember.JoinComment  = joinComment
            ' 프로퍼티 <옵션>
            cMember.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cMember.CreateXml(iReturn)
            Case "JSON"
                strContent = cMember.CreateJson(iReturn)
            Case "DIC"
                Set oDic = cMember.CreateDic(iReturn)        
            Case else
                Set oRs = cMember.Create(iReturn)
            End Select        
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "READ" Then

        iMsgCode = -2000
        ' 필수값 검사
        If Len(meb_idx) > 0 Then
            ' 프로퍼티 <필수>
            cMember.Meb_idx        = meb_idx
            ' 프로퍼티 <옵션>
            cMember.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cMember.ReadXml(iReturn)
            Case "JSON"
                strContent = cMember.ReadJson(iReturn)
            Case "DIC"
                Set oDic = cMember.ReadDic(iReturn)        
            Case else
                Set oRs = cMember.Read(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If    
    ElseIf cmd = "UPDATE" Then
        
        iMsgCode = -3000
        ' 필수값 검사
        If Len(meb_idx) > 0 Then
            ' 프로퍼티 <필수>
            cMember.Meb_idx        = meb_idx
            ' 프로퍼티 <선택>
            If Len(mebName) > 0     Then cMember.MebName  = mebName
            If Len(state_cd) > 0    Then cMember.State_cd  = state_cd
            If Len(meb_id) > 0      Then cMember.Meb_id  = meb_id
            If Len(newPasswd) > 0   Then cMember.Passwd  = newPasswd
            If Len(nickname) > 0    Then cMember.Nickname  = nickname
            If Len(email) > 0       Then cMember.Email  = email
            If Len(zipcode) > 0     Then cMember.Zipcode  = zipcode
            If Len(addr1) > 0       Then cMember.Addr1  = addr1
            If Len(addr2) > 0       Then cMember.Addr2  = addr2
            If Len(tel) > 0         Then cMember.Tel  = tel
            If Len(hp) > 0          Then cMember.Hp  = hp
            If Len(join_cd) > 0     Then cMember.Join_cd  = join_cd
            If Len(joinComment) > 0 Then cMember.JoinComment  = joinComment
            If Len(memo) > 0        Then cMember.Memo  = memo
            ' 프로퍼티 <옵션>
            cMember.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cMember.UpdateXml(iReturn)
            Case "JSON"
                strContent = cMember.UpdateJson(iReturn)
            Case "DIC"
                Set oDic = cMember.UpdateDic(iReturn)        
            Case else
                Set oRs = cMember.Update(iReturn)
            End Select
        Else
            iReturn = iMsgCode
        End If
    ElseIf cmd = "DELETE" Then
        
        iMsgCode = -4000
        ' 필수값 검사
        If Len(meb_idx) > 0 Then
            ' 프로퍼티 <필수>
            cMember.Meb_idx        = meb_idx
            ' 프로퍼티 <옵션>
            cMember.MsgCode        = iMsgCode

            Select Case UCase(doctype)
            Case "XML"
                strContent = cMember.DeleteXml(iReturn)
            Case "JSON"
                strContent = cMember.DeleteJson(iReturn)
            Case "DIC"
                Set oDic = cMember.DeleteDic(iReturn)        
            Case else
                Set oRs = cMember.Delete(iReturn)
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
    Set cMember = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->