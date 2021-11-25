 <%
'##############################################################################
' FILENAME      : 
'------------------------------------------------------------------------------
' PROGRAM NAME  : SMS 클래스 (카페24 / ASP)
' VERSION		: ProtoType Ver 0.1.0
' AUTHOR        : 
' DESCRIPTION   : 
' HISTORY       :
'------------------------------------------------------------------------------
' DATE        NAME        DESCRIPTION
'------------------------------------------------------------------------------
'	Name : 이름
' 종속관계 : UC_Include.inc

'##############################################################################

' 화원가입 접수완료 SMS 메세지
Public Const MSG_JOIN_RECEIPT   	= "대출세상 회원 접수완료. 관리자 승인 후 이용가능합니다." 
' 화원가입 승인완료 SMS 메세지 {0}: 아이디
Public Const MSG_JOIN_COMPLETE   	= "대출세상 승인 완료 [ID:{0}]로그인 후 이용가능합니다." 
' 실시간문의 인증번호 {0} : 인증번호
Public Const MSG_REAL_CERT   		= "대출세상 실시간문의 인증번호 [{0}]" 
' 실시간문의 상담등록 {0} : 업체명
Public Const MSG_REAL_JOIN   		= "대출세상 문의글에 {0}에서 상담요청하셨습니다." 
' 실시간문의 상담등록 {0} : 업체명
Public Const MSG_JOIN_ADMIN   		= "대출세상 {0}이 회원가입접수 하였습니다. [승인요청]" 


Class SMS_Cls 

'==============================================================================
'* 지역 변수
'------------------------------------------------
'* 공통 영역
Private m_ServerXmlHttp

Private m_sms_url 
Private m_user_id	    
Private m_secure	    
Private m_encoderurl  
Private m_subject     
Private m_msg	        
Private m_rphone	    
Private m_sphone1
Private m_sphone2
Private m_sphone3
Private m_rdate
Private m_reserveTime
Private m_mode
Private m_rtime
Private m_returnurl
Private m_testflag
Private m_destination
Private m_repeatFlag
Private m_repeatNum
Private m_repeatTime
Private m_actionFlag
Private m_nointeractive

Private m_resultMsg
Private m_MsgCount
Private m_ResultCode
Private m_ManagerHp

' Get/Set : testflag
Public Property Get Testflag()	 							
 	Testflag = m_testflag
End Property
Public Property Let testflag(p_Arg)					
	m_testflag = p_Arg
End Property

' Get : resultMsg
Public Property Get ResultMsg()	 					
 	ResultMsg = m_resultMsg
End Property 
' Get : resultMsg
Public Property Get MsgCount()	 					
 	MsgCount = m_MsgCount
End Property
' Get : ResultCode
Public Property Get ResultCode()	 					
 	ResultCode = m_ResultCode
End Property
' Get : ManagerHp
Public Property Get ManagerHp()	 					
 	ManagerHp = m_ManagerHp
End Property

'==============================================================================
'* 함수

'------------------------------------------------
' Description
'				생성자
'------------------------------------------------
Private Sub Class_Initialize()
	Set m_ServerXmlHttp = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")

	' m_sms_url 	= "https://sslsms.cafe24.com/sms_sender.php" 	' SMS 요청 URL
	m_sms_url 	= "https://sslsms.cafe24.com/sms_sender.php" 	' SMS 요청 URL 신규

	m_user_id	= "jnsglobal9778"   							' SMS 아이디
	m_secure	= "d4c3aecf43530a00beaf805e3f6a8aa5"  			' 인증키

	m_ManagerHp	= "010-4788-8113"

'	m_sphone1	= "010"											' 발신번호
'	m_sphone2	= "4110"
'	m_sphone3	= "8464"

	m_sphone1	= "063"										' 발신번호 (발신번호 관리에서 등록된 번호중 선택)
	m_sphone2	= "227"
	m_sphone3	= "9777"	
	
	m_testflag	= "N"
'	response.Write "SSs"	
End Sub
    
'------------------------------------------------
' Description
'				소멸자
'------------------------------------------------
Private Sub Class_Terminate
	Set m_ServerXmlHttp = Nothing
'response.Write "[close ServerXmlHttp]"	
End Sub


' SMS (단문) 발송
Public Function SMS_Send(a_phone, a_msg)
	Dim send_result
	Dim PostData
	Dim TextResponse

	PostData = "user_id=" & m_user_id
	PostData = PostData & "&secure=" & m_secure
	PostData = PostData & "&sphone1=" & m_sphone1
	PostData = PostData & "&sphone2=" & m_sphone2
	PostData = PostData & "&sphone3=" & m_sphone3
	PostData = PostData & "&rphone=" & a_phone
	PostData = PostData & "&msg=" & a_msg
	PostData = PostData & "&testflag=" & m_testflag

' response.Write PostData
' response.End
	
	m_ServerXmlHttp.open "POST", m_sms_url
	m_ServerXmlHttp.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
	m_ServerXmlHttp.setRequestHeader "Content-Length", Len(PostData)
	m_ServerXmlHttp.send PostData
	
	If m_ServerXmlHttp.status = 200 Then
	    TextResponse = m_ServerXmlHttp.responseText
		Result(TextResponse)
		send_result = True
	Else
	    ' 접속오류
	    send_result = False
	End If


	SMS_Send = send_result
End Function

'메세지 결과 설정
Public Sub Result(a_result)
    Dim tmpResult   : tmpResult  = a_result
    Dim rMsg    : rMsg	=  split(tmpResult , ",")
    Dim Result  : Result	=  rMsg (0)
    Dim Count   : Count	=  rMsg (1)
    Dim alert   : alert  = ""
    SELECT CASE Result
        CASE "Test Success!"
            alert = "테스트성공 "
            alert = alert & " 잔여건수는 "+ Count+"건 입니다."
        CASE "success"
            alert = "문자 정상적으로 전송되었습니다."
            alert = alert & " 잔여건수 "+ Count+"건 "
        CASE "reserved"
            alert = "예약되었습니다."
            alert = alert & " 잔여건수는 "+ Count+"건 입니다."
        CASE "3205"
            alert = "잘못된 번호형식입니다."
		CASE "0044"
            alert = "스팸문자는 보낼 수 없습니다."
        CASE Else
            alert = "[Error]"+Result
    END Select

    m_ResultCode = Result
    m_MsgCount 	= Count
    m_resultMsg = alert
    
End Sub



End Class
%>      
