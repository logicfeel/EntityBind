<%
Session.CodePage = 65001
Response.Charset = "UTF-8"
%>
<!--#include virtual="/Module/SYS/SMS.Cls.asp"-->
<!--#include virtual="/Module/SYS/SMS_Fnc.asp"-->
 
<%
 	Dim oSms : Set oSms = New SMS_Cls
 	Dim bResult
	Dim str : str = CxtSmsOrder(0, "433443", "김영호", "10,000원", "[무통장]") 

 	oSms.testflag = "Y"
	bResult = oSms.SMS_Send("01047888113", str)


	Session("SMS_SEND_YN") = ""
	If Session("SMS_SEND_YN") <> "Y" Then
		response.Write oSms.resultMsg
		response.Write bResult
		Session("SMS_SEND_YN") = "Y"
		
	 End If
 	Set oSms = Nothing
%>
<br/>
사이트 카운터:<%= application("count")%>  <br />
사이트 접속자수:<%= application("visit")%>  <br />

<%
' 	Dim oSms : Set oSms = New SMS_Class
'' 	oSms.testflag = "Y"
' 	Dim r : r = oSms.SMS_Send("010-4788-8113", Replace(MSG_REAL_JOIN,"{0}", "영크래딧"))
' 	Set oSms = Nothing
%>

<%
	Dim MSG_OrderUser 	: MSG_OrderUser = "[미스코리우] 주문번호: {0}  {1}님 주문 감사합니다. 결제금액: {2}"
	Dim MSG_OrderAdmin 	: MSG_OrderAdmin = "[미스코리우] 주문번호: {0}, {1}, {2}, {3}"

	Dim aContext(3)
	Dim MSG_Send

	aContext(0) = "121221211"
	aContext(1) = "김영호"
	aContext(2) = "10,000원"
	aContext(3) = "무통장"

	MSG_Send = MSG_OrderUser
	' MSG_Send = MSG_OrderAdmin
	MSG_Send = Replace(MSG_Send, "{0}", aContext(0))
	MSG_Send = Replace(MSG_Send, "{1}", aContext(1))
	MSG_Send = Replace(MSG_Send, "{2}", aContext(2))
	MSG_Send = Replace(MSG_Send, "{3}", aContext(3))

	

	

%> 
<h2>주문완료시 : PG결제</h2>
<h3><%=str%></h3>

<h3>[미스코리우] 주문번호: {123123213123}  {회원님} 주문 감사합니다. 결제금액: 10,000원</h3>

<h2>주문완료시 : 무통장</h2>
<h3>[미스코리우] 주문번호: {123123213123}  {회원님} 주문 감사합니다.  결제금액: 10,000원
전북은행 232322-2323-232 예금주>송미령</h3>


 -End-
