<%
    ' 기능
    '   - 결제승인 : paymentKey, orderId, amount
    '   - 주문조회 : paymentKey
    '  필요시 추가!!
    '   - 결제취소 : paymentKey, cancelReason(취소사유) , 부분취소가능
    '  나중에 추가!!
    '   - 입금콜백 : secret, status, orderId (가상계좌 입금 사용시, *별도의 콜백 URL 필요!!)
    '   - 빌링(자동결제)

    Class TossPay_Cls

        Private m_oXHR
        Private m_sClientKey
        Private m_sSecretKey
        Private m_sBaseUrl

        ' Private m_sPaymentKey
        ' Private m_sOrderId
        ' Private m_sAmount

        '---------------------------------------------------------------------------
        ' 생성자
        '---------------------------------------------------------------------------
		Private Sub Class_Initialize()
            
            Set m_oXHR          = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")

            ' Const clientKey     = "test_ck_N5OWRapdA8dBLd77PRnVo1zEqZKL"    '테스트
            ' Const secretKey     = "test_sk_O6BYq7GWPVvXBNGyjoa8NE5vbo1d"    '테스트

            Const clientKey     = "live_ck_Z0RnYX2w532yLkvJOgk8NeyqApQE"      '실결제
            Const secretKey     = "live_sk_oeqRGgYO1r5l1kXdBM4VQnN2Eyaz"      '실결제

            m_sClientKey        = clientKey
            m_sSecretKey        = BASE64_ENCODE(secretKey & ":")
            m_sBaseUrl          = "https://api.tosspayments.com/v1/payments/"
            
            ' m_sPaymentKey       = ""
            ' m_sOrderId          = ""
            ' m_sAmount           = "0"
        End Sub

        '---------------------------------------------------------------------------
        ' 소멸자
        '---------------------------------------------------------------------------
        Private Sub Class_Terminate()
        End Sub

        '---------------------------------------------------------------------------
        ' 프로퍼티 설정
        '---------------------------------------------------------------------------

        ' Public Property Let PaymentKey(p_Value) 
        '     If Not IsEmpty(p_Value) Then
        '         m_sPaymentKey = p_Value
        '     End if
        ' End Property

        Public Property Get ClientKey()	 					
            ClientKey = m_sClientKey
        End Property 

        '---------------------------------------------------------------------------
        ' 초기화
        '---------------------------------------------------------------------------
		Private Sub Init()
        End Sub

        '---------------------------------------------------------------------------
        ' Name 			: 
        ' Description 	: 결제 승인
        ' Return		: 
        '---------------------------------------------------------------------------
        Public Function Approval(ByRef r_Status, p_paymentKey, p_sData)
            Dim url, resultText
            
            resultText = ""
            url = m_sBaseUrl & p_paymentKey

            m_oXHR.open "POST", url, false 
            m_oXHR.setRequestHeader "Authorization", "Basic " + m_sSecretKey
            m_oXHR.setRequestHeader "Content-Type", "application/json"     'JSON 으로 전달
            m_oXHR.send p_sData

            r_Status = m_oXHR.Status
            
            If m_oXHR.Status = 200 Then
                resultText = m_oXHR.ResponseText 
            End If

            Approval = resultText
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Read
        ' Description 	: 결제 조회
        '---------------------------------------------------------------------------
        Public Function Read(ByRef r_Status, p_paymentKey)
            Dim url, resultText
            
            resultText = ""
            url = m_sBaseUrl & p_paymentKey

            m_oXHR.open "GET", url
            m_oXHR.setRequestHeader "Authorization", "Basic " + m_sSecretKey
            ' m_oXHR.setRequestHeader "Content-Type", "application/json"     'JSON 으로 전달
            m_oXHR.send

            r_Status = m_oXHR.Status
            
            If m_oXHR.Status = 200 Then
                resultText = m_oXHR.ResponseText 
            End If

            Approval = resultText
        End Function

    End Class

' REVIEW::
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>