<%
    Class ORD_Pay_Cls

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

        Public Property Let Ord_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ord_id") = m_cDBMgr.MakeParam("@ord_id", adVarChar, adParamInput, 14, p_Value)
            End if
        End Property

        Public Property Let Method_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("method_cd") = m_cDBMgr.MakeParam("@method_cd", adChar, adParamInput, 3, p_Value)
            End if
        End Property

        Public Property Let Depositor(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("depositor") = m_cDBMgr.MakeParam("@depositor", adVarWChar, adParamInput, 10, p_Value)
            End if
        End Property

        Public Property Let Memo(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("memo") = m_cDBMgr.MakeParam("@memo", adVarWChar, adParamInput, 50, p_Value)
            End if
        End Property

        Public Property Let Bak_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("bak_idx") = m_cDBMgr.MakeParam("@bak_idx", adInteger, adParamInput, 0, p_Value)
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
            m_oDicParams.Add "RETURN_VALUE",    m_cDBMgr.MakeParam("RETURN_VALUE",      adInteger,      adParamReturnValue, ,       "")
            m_oDicParams.Add "ord_id",          m_cDBMgr.MakeParam("@ord_id",           adVarChar,      adParamOutput,      14,     0)
            m_oDicParams.Add "method_cd",       m_cDBMgr.MakeParam("@method_cd",        adChar,         adParamInput,       3,      Null)
            m_oDicParams.Add "depositor",       m_cDBMgr.MakeParam("@depositor",        adVarWChar,     adParamInput,       10,     Null)
            m_oDicParams.Add "memo",            m_cDBMgr.MakeParam("@memo",             adVarWChar,     adParamInput,       50,     Null)
            m_oDicParams.Add "bak_idx",         m_cDBMgr.MakeParam("@bak_idx",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "xml_yn",          m_cDBMgr.MakeParam("@xml_yn",           adChar,         adParamInput,       1,      Null)
            m_oDicParams.Add "msgSave_yn",      m_cDBMgr.MakeParam("@msgSave_yn",       adChar,         adParamInput,       1,      Null)
            m_oDicParams.Add "msg_Print_yn",    m_cDBMgr.MakeParam("@msg_Print_yn",     adChar,         adParamInput,       1,      Null)
        End Sub

        '---------------------------------------------------------------------------
        ' Name 			: Read
        ' Description 	: 조회
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function Read(ByRef r_Return)
            Dim arrKey, arrParams
            Dim oRs

            arrKey = Array("RETURN_VALUE", "ord_id", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_Pay_SP_R", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set Read = oRs
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function ReadDic(ByRef r_Return)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(Read(r_Return))

            Set ReadDic = oDic
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function ReadXml(ByRef r_Return)
            Dim str
            Dim oRs
            
            Xml_yn = "Y"            ' 속성 설정
            Set oRs = Read(r_Return)
			str = ""
            str = str & "<table return='" & r_Return & "' >"
            If oRs.State = adStateOpen  Then str = str & oRs(0)
			str = str & "</table>"

            ReadXml = str
        End Function

		'-------------------------------------
		' 조회 : String 객체(JSON)
		Public Function ReadJson(ByRef r_Return)
            Dim str, oJson
            Dim oRs, strJson : strJson = ""

            Set oRs = Read(r_Return)

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
            
            ReadJson = str
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update
        ' Description 	: 수정
        '---------------------------------------------------------------------------
        Public Function Update(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "ord_id", "method_cd", "depositor", "memo", "bak_idx")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_Pay_SP_U", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Update = null
        End Function

		'-------------------------------------
		' 수정 : Dictionary
        Public Function UpdateDic(ByRef r_Return)
            Dim oDic
            
            Call Update(r_Return)
            
            UpdateDic = null
        End Function

		'-------------------------------------
		' 수정 : String 객체(XML)
        Public Function UpdateXml(ByRef r_Return)
            Dim str
            
            Call Update(r_Return)
            str = "<table return='" & r_Return & "'></table>"

            UpdateXml = str
        End Function

		'-------------------------------------
		' 수정 : String 객체(JSON)
		Public Function UpdateJson(ByRef r_Return)
            Dim str, oJson
            
            Call Update(r_Return)
			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"

            UpdateJson = str
        End Function    

    End Class
    
' REVIEW::
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>