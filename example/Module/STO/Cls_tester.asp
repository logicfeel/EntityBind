<% @CODEPAGE="65001" language="VBScript" %>
<% 
	Option Explicit
'	On Error Resume Next 
    session.codepage = 65001 
    Response.CharSet = "utf-8" 
	Response.buffer = True	 
	Response.expires = 0 

	Dim rootPath
	rootPath = "/"
%>
<!-- #include file="STO_Account.Cls.asp" -->
<%
    Dim sto_acc

    Set sto_acc = New STO_Account_Cls

    Dim abc
    abc = sto_acc.Read("aa", "SS")

    ' asp 는 파
    ' 에러남
    'abc = sto_acc.Read("aa")
    'sto_acc.Read("aa", "bb")


    sto_acc.Read "aa", "BBB"

    Dim r
    r = sto_acc.List()
    Response.Write ", r=" & r


    sto_acc.sto_id = "Out.."

    r = sto_acc.Update()
    Response.Write ", r=" & r

    Response.Write "<br/>"

    sto_acc.Delete(Empty)
    sto_acc.Delete(Null)
    sto_acc.Delete("")

    Dim nulltest
    
    'nulltest = null
    'nulltest = Empty
    nulltest = Request("abc")
    'nulltest = "S"

    IF IsNull(nulltest) then
        Response.Write "dim = null <br/>"
    End if
    
    IF IsEmpty(nulltest) then
        Response.Write "dim = IsEmpty <br/>"
    End if    

    IF nulltest = "" then
        Response.Write "dim = '' <br/>" 
    End if

    Dim a

    a=Array("5a",10,15,20 )
    response.write(a(0))


'-----------------------------------------    
' 전역 설정 사용 부분 
    Dim g_DBMgr : g_DBMgr = Nothing
    
    g_DBMgr.sto_id = "S00001"
    g_DBMgr.sto_id = "S00001"


'-----------------------------------------
' 콜백 지역설정 사용 부분

    Dim sto_Account
    
    sto_Account = New STO_Account_Cls
    
    sto_Account.Sto_id = "S00001"
    sto_Account.Atm_id = "logicfeel"

    sto_Account.Create()


    'Dim DBManager = 

%>

클래스 테스트.