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
<!--#include virtual="/Module/STO/STO_Account.Cls.asp"-->
<%
    'On Error Resume Next 
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim cmd             : cmd           = UCase(Request("cmd"))

    Dim adm_id          : adm_id        = Request("adm_id")
    Dim passwd          : passwd        = Request("passwd")
    Dim state_cd        : state_cd      = Request("state_cd")
    Dim acc_idx         : acc_idx       = Request("acc_idx")
    Dim returnURL       : returnURL     = Request("returnURL")

    Dim cAccount, oDic, oRs 
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0

    Set cAccount = New STO_Account_Cls

    '-------------------------------------------------
    ' cmd 분기 처리    
    If cmd = "LOGIN" Then
        
        iMsgCode = -1000
        ' 필수값 검사
        If Len(adm_id) > 0 and Len(adm_id) > 0  Then
            ' 프로퍼티 <필수>
            cAccount.Adm_id         = adm_id
            cAccount.Passwd         = passwd
            ' 프로퍼티 <선택>
            If Len(state_cd) > 0    Then cMember.State_cd  = state_cd            
            ' 프로퍼티 <옵션>
            cAccount.MsgCode        = iMsgCode

            ' Set oRs = cAccount.Check(iReturn)

            Set oDic = cAccount.LoginDic(iReturn)

            If  iReturn >= 0  Then
                ' 세션 설정
                Session("SID")      = Session.SessionID

                Session("ACC_IDX")  = oDic.Item(0)("acc_idx")
                Session("ADM_ID")   = oDic.Item(0)("adm_id")
                Session("ADM_NAME") = oDic.Item(0)("admName")
                Session("USE_YN")   = oDic.Item(0)("use_yn")
            End if

        Else
            iReturn = iMsgCode
        End If
    
    ElseIf cmd = "LOGOUT" Then

        '전체 조회해서 삭제
        Session.Contents.RemoveAll()

    Else
        iReturn = -10000
    End If


    '-------------------------------------------------
    If iReturn >= 0 Then
        If Len(returnURL) = 0 Then returnURL = "/Admin"  '기본경로
        Response.Redirect returnURL
    ElseIf iReturn = -10000 Then 
        Response.Write "<script>"
        Response.Write "alert('잘못된 접근입니다..');"
        Response.Write "history.back();"
        Response.Write "</script>"    
    Else 
        Response.Write "<script>"
        Response.Write "alert('로그인 실패하였습니다."& iReturn &"');"
        Response.Write "history.back();"
        Response.Write "</script>"
    End If


    '객체 해제
    Set oRs = Nothing
    Set oDic = Nothing
    Set cAccount = Nothing
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->