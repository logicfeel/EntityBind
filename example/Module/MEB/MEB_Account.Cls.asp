<%
    Class MEB_Account_Cls

        Private m_cDBMgr
        Private m_oDicParams
        Private m_iMsgCode

        '---------------------------------------------------------------------------
        ' 생성자
        '---------------------------------------------------------------------------
		Private Sub Class_Initialize()
            If IsObject(g_cDBMgr) Then
                Set m_cDBMgr = g_cDBMgr     '전역변수 있으면 초기화
            End If
            m_cDBMgr.NamedParameters = True
            Set m_oDicParams = Server.CreateObject("Scripting.Dictionary")
            m_iMsgCode = 0
            Init()  '초기화 (전달파라메터)
        End Sub

        '---------------------------------------------------------------------------
        ' 소멸자
        '---------------------------------------------------------------------------
        Private Sub Class_Terminate()
        End Sub

        '---------------------------------------------------------------------------
        ' 프로퍼티 설정
        '---------------------------------------------------------------------------
        Public Property Let CDBMgr(p_cDBMgr) 
            If IsObject(p_cDBMgr) Then
                m_cDBMgr = p_cDBMgr
            End if
        End Property

        Public Property Let Meb_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("meb_id") = m_cDBMgr.MakeParam("@meb_id", adVarChar, adParamInput, 20, p_Value)
            End if
        End Property

        Public Property Let Passwd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("passwd") = m_cDBMgr.MakeParam("@passwd", adVarChar, adParamInput, 20, p_Value)
            End if
        End Property

        Public Property Let MebName(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("mebName") = m_cDBMgr.MakeParam("@mebName", adVarWChar, adParamInput, 10, p_Value)
            End if
        End Property

        Public Property Let Email(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("email") = m_cDBMgr.MakeParam("@email", adVarChar, adParamInput, 100, p_Value)
            End if
        End Property

        Public Property Let State_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("state_cd") = m_cDBMgr.MakeParam("@state_cd", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let Xml_yn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("xml_yn") = m_cDBMgr.MakeParam("@xml_yn", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let MsgSave_yn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("msgSave_yn") = m_cDBMgr.MakeParam("@msgSave_yn", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let Msg_Print_yn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("msg_Print_yn") = m_cDBMgr.MakeParam("@msg_Print_yn", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let MsgCode(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_iMsgCode =  p_Value
            End if
        End Property

        '---------------------------------------------------------------------------
        ' 초기화
        '---------------------------------------------------------------------------
		Private Sub Init()
            m_oDicParams.Add "RETURN_VALUE", m_cDBMgr.MakeParam("RETURN_VALUE",  adInteger,  adParamReturnValue, ,  "")
            m_oDicParams.Add "meb_id",       m_cDBMgr.MakeParam("@meb_id",       adVarChar,  adParamInput,    20,   Null)
            m_oDicParams.Add "passwd",       m_cDBMgr.MakeParam("@passwd",       adVarChar,  adParamInput,    20,   Null)
            m_oDicParams.Add "mebName",      m_cDBMgr.MakeParam("@mebName",      adVarWChar, adParamInput,    10,   Null)
            m_oDicParams.Add "email",        m_cDBMgr.MakeParam("@email",        adVarChar,  adParamInput,    100,  Null)

            m_oDicParams.Add "state_cd",     m_cDBMgr.MakeParam("@state_cd",     adChar,     adParamInput,    1,    Null)

            m_oDicParams.Add "xml_yn",       m_cDBMgr.MakeParam("@xml_yn",       adChar,     adParamInput,    1,    Null)
            m_oDicParams.Add "msgSave_yn",   m_cDBMgr.MakeParam("@msgSave_yn",   adChar,     adParamInput,    1,    Null)
            m_oDicParams.Add "msg_Print_yn", m_cDBMgr.MakeParam("@msg_Print_yn", adChar,     adParamInput,    1,    Null)
        End Sub

		

        '---------------------------------------------------------------------------
        ' Name 			: Read
        ' Description 	: 조회
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function Overlap(ByRef r_Return)
            Dim arrKey, arrParams
            Dim oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "meb_id", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("MEB_Account_SP_Overlap_R", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set Overlap = oRs
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function OverlapDic(ByRef r_Return)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(Overlap(r_Return))

            Set OverlapDic = oDic
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function OverlapXml(ByRef r_Return)
            Dim str
            Dim oRs
            
            Xml_yn = "Y"            ' 속성 설정
            Set oRs = Overlap(r_Return)
			str = ""
            str = str & "<table return='" & r_Return & "' >"
            If oRs.State = adStateOpen  Then str = str & oRs(0)
			str = str & "</table>"

            OverlapXml = str
        End Function

		'-------------------------------------
		' 조회 : String 객체(JSON)
		Public Function OverlapJson(ByRef r_Return)
            Dim str, oJson
            Dim oRs, strJson : strJson = ""

            Set oRs = Overlap(r_Return)

            If oRs.State = adStateOpen  Then ' 1
                Set oJson = m_cDBMgr.CRsToJson(oRs)
                strJson = toJSON(oJson)
            End If
			
            str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": """ & r_Return & """ "
            If Len(strJson) > 0 Then str = str & ",    ""rows"": " & strJson
            str = str & "  }"
            str = str & "}"
            
            OverlapJson = str
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Check
        ' Description 	: 로그인 검사
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function Check(ByRef r_Return)
            Dim arrKey, arrParams
            Dim oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "meb_id", "passwd", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("MEB_Account_SP_Check_R", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set Check = oRs
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function CheckDic(ByRef r_Return)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(Check(r_Return))

            Set CheckDic = oDic
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function CheckXml(ByRef r_Return)
            Dim str
            Dim oRs
            
            Xml_yn = "Y"            ' 속성 설정
            Set oRs = Check(r_Return)
			str = ""
            str = str & "<table return='" & r_Return & "' >"
            If oRs.State = adStateOpen  Then str = str & oRs(0)
			str = str & "</table>"

            CheckXml = str
        End Function

		'-------------------------------------
		' 조회 : String 객체(JSON)
		Public Function CheckJson(ByRef r_Return)
            Dim str, oJson
            Dim oRs, strJson : strJson = ""

            Set oRs = Check(r_Return)

            If oRs.State = adStateOpen  Then ' 1
                Set oJson = m_cDBMgr.CRsToJson(oRs)
                strJson = toJSON(oJson)
            End If
			
            str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": """ & r_Return & """ "
            If Len(strJson) > 0 Then str = str & ",    ""rows"": " & strJson
            str = str & "  }"
            str = str & "}"
            
            CheckJson = str
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: FindId
        ' Description 	: 로그인 검사
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function FindId(ByRef r_Return)
            Dim arrKey, arrParams
            Dim oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "mebName", "email", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("MEB_Account_SP_FindId_R", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set FindId = oRs
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function FindIdDic(ByRef r_Return)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(FindId(r_Return))

            Set FindIdDic = oDic
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function FindIdXml(ByRef r_Return)
            Dim str
            Dim oRs
            
            Xml_yn = "Y"            ' 속성 설정
            Set oRs = FindId(r_Return)
			str = ""
            str = str & "<table return='" & r_Return & "' >"
            If oRs.State = adStateOpen  Then str = str & oRs(0)
			str = str & "</table>"

            FindIdXml = str
        End Function

		'-------------------------------------
		' 조회 : String 객체(JSON)
		Public Function FindIdJson(ByRef r_Return)
            Dim str, oJson
            Dim oRs, strJson : strJson = ""

            Set oRs = FindId(r_Return)

            If oRs.State = adStateOpen  Then ' 1
                Set oJson = m_cDBMgr.CRsToJson(oRs)
                strJson = toJSON(oJson)
            End If
			
            str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": """ & r_Return & """ "
            If Len(strJson) > 0 Then str = str & ",    ""rows"": " & strJson
            str = str & "  }"
            str = str & "}"
            
            FindIdJson = str
        End Function


        '---------------------------------------------------------------------------
        ' Name 			: FindPasswd
        ' Description 	: 로그인 검사
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function FindPasswd(ByRef r_Return)
            Dim arrKey, arrParams
            Dim oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "meb_id", "mebName", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("MEB_Account_SP_FindPasswd_R", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set FindPasswd = oRs
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function FindPasswdDic(ByRef r_Return)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(FindPasswd(r_Return))

            Set FindPasswdDic = oDic
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function FindPasswdXml(ByRef r_Return)
            Dim str
            Dim oRs
            
            Xml_yn = "Y"            ' 속성 설정
            Set oRs = FindPasswd(r_Return)
			str = ""
            str = str & "<table return='" & r_Return & "' >"
            If oRs.State = adStateOpen  Then str = str & oRs(0)
			str = str & "</table>"

            FindPasswdXml = str
        End Function

		'-------------------------------------
		' 조회 : String 객체(JSON)
		Public Function FindPasswdJson(ByRef r_Return)
            Dim str, oJson
            Dim oRs, strJson : strJson = ""

            Set oRs = FindPasswd(r_Return)

            If oRs.State = adStateOpen  Then ' 1
                Set oJson = m_cDBMgr.CRsToJson(oRs)
                strJson = toJSON(oJson)
            End If
			
            str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": """ & r_Return & """ "
            If Len(strJson) > 0 Then str = str & ",    ""rows"": " & strJson
            str = str & "  }"
            str = str & "}"
            
            FindPasswdJson = str
        End Function

    End Class

' REVIEW::
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>