<%
    ' 기능

    Class KakaoAuto_Cls

        Private m_oXHR
        Private m_sClientKey

        '---------------------------------------------------------------------------
        ' 생성자
        '---------------------------------------------------------------------------
		Private Sub Class_Initialize()
            
            Set m_oXHR          = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")

            m_sClientKey        = "4a585c741b622758b01088b59f80e24c"      '실결제
        
        End Sub

        '---------------------------------------------------------------------------
        ' 소멸자
        '---------------------------------------------------------------------------
        Private Sub Class_Terminate()
        End Sub

        '---------------------------------------------------------------------------
        ' 프로퍼티 설정
        '---------------------------------------------------------------------------


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
        Public Function GetToken(ByRef r_Status, p_token)
            Dim url, resultText
            
            resultText = ""

            url = "https://kapi.kakao.com/v2/user/me"

            m_oXHR.open "POST", url, false 
            m_oXHR.setRequestHeader "Authorization", "Bearer " + p_token
            m_oXHR.setRequestHeader "Content-Type", "application/json"     'JSON 으로 전달
            m_oXHR.send 

            r_Status = m_oXHR.Status
            
            If m_oXHR.Status = 200 Then
                resultText = m_oXHR.ResponseText 
            End If

            GetToken = resultText
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Read
        ' Description 	: 결제 조회
        '---------------------------------------------------------------------------
    '     Public Function Read(ByRef r_Status, p_paymentKey)
    '         Dim url, resultText
            
    '         resultText = ""
    '         url = m_sBaseUrl & p_paymentKey

    '         m_oXHR.open "GET", url
    '         m_oXHR.setRequestHeader "Authorization", "Basic " + m_sSecretKey
    '         ' m_oXHR.setRequestHeader "Content-Type", "application/json"     'JSON 으로 전달
    '         m_oXHR.send

    '         r_Status = m_oXHR.Status
            
    '         If m_oXHR.Status = 200 Then
    '             resultText = m_oXHR.ResponseText 
    '         End If

    '         Approval = resultText
    '     End Function

    End Class
%>