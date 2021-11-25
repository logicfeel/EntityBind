 <%
'---------------------------------------------------------------------------
	' Name 			: SMS 구문 완성
	' Description 	: 
	' Return		: String
	' Parameter
	' - iType : 컨텍스트 타입
	'	+ 0 : 주문완료(사용자) 컨텍스트
	'	+ 1 : 주문완료(관리자) 컨텍스트
	'	+ 2 : 
	'	+ 3 : 
	'	+ 4 : 
	'	+ 5 : 
	' - sOrd 	: 주문번호
	' - sName 	: 주문자명
	' - sPay 	: 결제금액
	' - sMethod : 결제방식
	'---------------------------------------------------------------------------
	Function CxtSmsOrder(iType, sOrd, sName, sPay, sMethod)

		Dim MSG(5) 
		Dim aContext(3)
		Dim MSG_Send
		
		MSG(0) = "[미스코리우] 주문번호: {0}  {1}님 감사합니다. 금액: {2} {3}"
		MSG(1) = "[미스코리우] 주문번호: {0}, {1}, {2}, {3}"
		MSG(2) = ""
		MSG(3) = ""
		MSG(4) = ""
		MSG(5) = ""

		aContext(0) = sOrd
		aContext(1) = sName
		aContext(2) = sPay
		aContext(3) = sMethod

		MSG_Send = MSG(iType)
		MSG_Send = Replace(MSG_Send, "{0}", aContext(0))
		MSG_Send = Replace(MSG_Send, "{1}", aContext(1))
		MSG_Send = Replace(MSG_Send, "{2}", aContext(2))
		MSG_Send = Replace(MSG_Send, "{3}", aContext(3))

		CxtSmsOrder = MSG_Send
	End Function
%>
