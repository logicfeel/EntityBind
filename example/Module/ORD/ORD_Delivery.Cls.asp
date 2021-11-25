<%
    Class ORD_Delivery_Cls

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

        Public Property Let Deli_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("deli_idx") = m_cDBMgr.MakeParam("@deli_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Recipient(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("recipient") = m_cDBMgr.MakeParam("@recipient", adVarWChar, adParamInput, 10, p_Value)
            End if
        End Property

        Public Property Let Method_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("method_cd") = m_cDBMgr.MakeParam("@method_cd", adChar, adParamInput, 3, p_Value)
            End if
        End Property

        Public Property Let Choice_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("choice_cd") = m_cDBMgr.MakeParam("@choice_cd", adChar, adParamInput, 5, p_Value)
            End if
        End Property

        Public Property Let Zipcode(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("zipcode") = m_cDBMgr.MakeParam("@zipcode", adVarChar, adParamInput, 7, p_Value)
            End if
        End Property

        Public Property Let Addr1(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("addr1") = m_cDBMgr.MakeParam("@addr1", adVarWChar, adParamInput, 50, p_Value)
            End if
        End Property

        Public Property Let Addr2(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("addr2") = m_cDBMgr.MakeParam("@addr2", adVarWChar, adParamInput, 50, p_Value)
            End if
        End Property

        Public Property Let Tel(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("tel") = m_cDBMgr.MakeParam("@tel", adVarChar, adParamInput, 15, p_Value)
            End if
        End Property

        Public Property Let Memo(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("memo") = m_cDBMgr.MakeParam("@memo", adVarWChar, adParamInput, 50, p_Value)
            End if
        End Property

        Public Property Let Request_dt(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("request_dt") = m_cDBMgr.MakeParam("@request_dt", adDBTimeStamp, adParamInput, 19, p_Value)
            End if
        End Property

        Public Property Let Send_dt(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("send_dt") = m_cDBMgr.MakeParam("@send_dt", adDBTimeStamp, adParamInput, 19, p_Value)
            End if
        End Property

        Public Property Let Dco_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("dco_idx") = m_cDBMgr.MakeParam("@dco_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Invoice(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("invoice") = m_cDBMgr.MakeParam("@invoice", adVarChar, adParamInput, 20, p_Value)
            End if
        End Property

        Public Property Let Ord_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ord_id") = m_cDBMgr.MakeParam("@ord_id", adVarChar, adParamInput, 14, p_Value)
            End if
        End Property

        Public Property Let State_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("state_cd") = m_cDBMgr.MakeParam("@state_cd", adChar, adParamInput, 2, p_Value)
            End if
        End Property

        Public Property Let Keyword(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("keyword") = m_cDBMgr.MakeParam("@keyword", adVarWChar, adParamInput, 100, p_Value)
            End if
        End Property
        
        Public Property Let Page_count(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("page_count") = m_cDBMgr.MakeParam("@page_count", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Page_size(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("page_size") = m_cDBMgr.MakeParam("@page_size", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Sort_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("sort_cd") = m_cDBMgr.MakeParam("@sort_cd", adInteger, adParamInput, 0, p_Value)
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
            m_oDicParams.Add "deli_idx",        m_cDBMgr.MakeParam("@deli_idx",         adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "recipient",       m_cDBMgr.MakeParam("@recipient",        adVarWChar,     adParamInput,       10,     Null)
            m_oDicParams.Add "method_cd",       m_cDBMgr.MakeParam("@method_cd",        adChar,         adParamInput,       3,      Null)
            m_oDicParams.Add "choice_cd",       m_cDBMgr.MakeParam("@choice_cd",        adChar,         adParamInput,       5,      Null)
            m_oDicParams.Add "zipcode",         m_cDBMgr.MakeParam("@zipcode",          adVarChar,      adParamInput,       7,      Null)
            m_oDicParams.Add "addr1",           m_cDBMgr.MakeParam("@addr1",            adVarWChar,     adParamInput,       50,     Null)
            m_oDicParams.Add "addr2",           m_cDBMgr.MakeParam("@addr2",            adVarWChar,     adParamInput,       50,     Null)
            m_oDicParams.Add "tel",             m_cDBMgr.MakeParam("@tel",              adVarChar,      adParamInput,       15,     Null)
            m_oDicParams.Add "memo",            m_cDBMgr.MakeParam("@memo",             adVarWChar,     adParamInput,       50,     Null)
            m_oDicParams.Add "request_dt",      m_cDBMgr.MakeParam("@request_dt",       adDBTimeStamp,  adParamInput,       19,     Null)
            m_oDicParams.Add "send_dt",         m_cDBMgr.MakeParam("@send_dt",          adDBTimeStamp,  adParamInput,       19,      Null)
            m_oDicParams.Add "dco_idx",         m_cDBMgr.MakeParam("@dco_idx",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "invoice",         m_cDBMgr.MakeParam("@invoice",          adVarChar,      adParamInput,       20,      Null)
            m_oDicParams.Add "ord_id",          m_cDBMgr.MakeParam("@ord_id",           adVarChar,      adParamOutput,      14,     0)
            m_oDicParams.Add "state_cd",        m_cDBMgr.MakeParam("@state_cd",         adChar,         adParamInput,       2,      Null)
            
            m_oDicParams.Add "keyword",         m_cDBMgr.MakeParam("@keyword",          adVarWChar,     adParamInput,       100,    Null)
            m_oDicParams.Add "page_size",       m_cDBMgr.MakeParam("@page_size",        adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "page_count",      m_cDBMgr.MakeParam("@page_count",       adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "sort_cd",         m_cDBMgr.MakeParam("@sort_cd",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "row_total",       m_cDBMgr.MakeParam("@row_total",        adInteger,      adParamOutput,      1,      0)
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

            arrKey = Array("RETURN_VALUE", "deli_idx", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_Delivery_SP_R", arrParams, Nothing)
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

            arrKey = Array("RETURN_VALUE", "deli_idx", "recipient", "method_cd", "choice_cd", "zipcode", _
                            "addr1", "addr2", "tel", "memo", "request_dt", "send_dt", "dco_idx", "invoice")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_Delivery_SP_U", arrParams, Nothing)
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

		'---------------------------------------------------------------------------
        ' Name 			: List
		' Description 	: 목록
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function List(ByRef r_Return, ByRef r_RowTotal)
            Dim arrKey, arrParams
            Dim oRs
			
            arrKey = Array("RETURN_VALUE", "ord_id", "state_cd", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_Delivery_SP_L", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set List = oRs
        End Function

		'-------------------------------------
		' 목록 : Dictionary
        Public Function ListDic(ByRef r_Result, ByRef r_RowTotal)
            Dim oDic
            
            Set oDic = m_cDBMgr.CRsToDictionary(List(r_Result, r_RowTotal))
            
            Set ListDic = oDic      ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
        Public Function ListXml(ByRef r_Result)
            Dim strXml, oRs
            Dim iRowTotal : iRowTotal = 0
            
            Xml_yn = "Y"    '지역속성
            Set oRs = List(r_Result, iRowTotal)
			strXml = ""
            strXml = strXml & "<table return='" & r_Result & "' row_total='" & iRowTotal & "'>"
            strXml = strXml & oRs(0)
			strXml = strXml & "</table>"

            ListXml = strXml        ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
		Public Function ListJson(ByRef r_Result)
            Dim strJson, oJson, iRowTotal
            
            Set oJson = m_cDBMgr.CRsToJson(List(r_Result, iRowTotal))
			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & ", "
            strJson = strJson & "    ""row_total"": " & iRowTotal & ", "
            strJson = strJson & "    ""rows"": " & toJSON(oJson)
            strJson = strJson & "  }"
            strJson = strJson & "}"

            ListJson = strJson   ' Return
        End Function

    End Class

' REVIEW::
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>