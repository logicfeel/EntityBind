<%
    Class LOG_Visit_Cls

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

        Public Property Let Client_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("client_id") = m_cDBMgr.MakeParam("@client_id", adVarChar, adParamInput, 20, p_Value)
            End if
        End Property

        Public Property Let Ip(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ip") = m_cDBMgr.MakeParam("@ip", adVarChar, adParamInput, 30, p_Value)
            End if
        End Property

        Public Property Let Referer(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("referer") = m_cDBMgr.MakeParam("@referer", adVarChar, adParamInput, 200, p_Value)
            End if
        End Property

        Public Property Let Url(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("url") = m_cDBMgr.MakeParam("@url", adVarChar, adParamInput, 200, p_Value)
            End if
        End Property

        Public Property Let Agent(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("agent") = m_cDBMgr.MakeParam("@agent", adVarChar, adParamInput, 200, p_Value)
            End if
        End Property

        Public Property Let Meb_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("meb_idx") = m_cDBMgr.MakeParam("@meb_idx", adInteger, adParamInput, 0, p_Value)
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
            m_oDicParams.Add "RETURN_VALUE",    m_cDBMgr.MakeParam("RETURN_VALUE",      adInteger,  adParamReturnValue, ,   "")
            m_oDicParams.Add "client_id",       m_cDBMgr.MakeParam("@client_id",        adVarChar,  adParamInput,    20,    Null)
            m_oDicParams.Add "ip",              m_cDBMgr.MakeParam("@ip",               adVarChar,  adParamInput,    30,    Null)
            m_oDicParams.Add "referer",         m_cDBMgr.MakeParam("@referer",          adVarChar,  adParamInput,    200,   Null)
            m_oDicParams.Add "url",             m_cDBMgr.MakeParam("@url",              adVarChar,  adParamInput,    200,   Null)
            m_oDicParams.Add "agent",           m_cDBMgr.MakeParam("@agent",            adVarChar,  adParamInput,    200,   Null)
            m_oDicParams.Add "meb_idx",         m_cDBMgr.MakeParam("@meb_idx",          adInteger,  adParamInput,    0,     Null)

            
            m_oDicParams.Add "keyword",         m_cDBMgr.MakeParam("@keyword",          adVarWChar, adParamInput,    100,    Null)
            m_oDicParams.Add "page_size",       m_cDBMgr.MakeParam("@page_size",        adInteger,  adParamInput,    0,      Null)
            m_oDicParams.Add "page_count",      m_cDBMgr.MakeParam("@page_count",       adInteger,  adParamInput,    0,      Null)
            m_oDicParams.Add "sort_cd",         m_cDBMgr.MakeParam("@sort_cd",          adInteger,  adParamInput,    0,      Null)
            m_oDicParams.Add "row_total",       m_cDBMgr.MakeParam("@row_total",        adInteger,  adParamOutput,   1,      0)
            m_oDicParams.Add "xml_yn",          m_cDBMgr.MakeParam("@xml_yn",           adChar,     adParamInput,    1,      Null)
            m_oDicParams.Add "msgSave_yn",      m_cDBMgr.MakeParam("@msgSave_yn",       adChar,     adParamInput,    1,      Null)
            m_oDicParams.Add "msg_Print_yn",    m_cDBMgr.MakeParam("@msg_Print_yn",     adChar,     adParamInput,    1,      Null)
        End Sub

		'---------------------------------------------------------------------------
		' Name 			: Create
        ' Description 	: 등록
		'---------------------------------------------------------------------------
        Public Function Create(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "client_id", "ip", "referer", "url", "agent", "meb_idx")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("LOG_Visit_SP_C", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Create = null
        End Function
		
        '-------------------------------------
		' 목록 : Dictionary
        Public Function CreateDic(ByRef r_Return)
            Dim oDic
            
            Call Create(r_Return)

            CreateDic = null
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
        Public Function CreateXml(ByRef r_Return)
            Dim str
            
            Call Create(r_Return)
            str = "<table return='" & r_Return & "'></table>"

            CreateXml = str
        End Function

		'-------------------------------------
		' 목록 : String 객체(JSON)
		Public Function CreateJson(ByRef r_Return)
            Dim str, oJson
            
            Call Create(r_Return)
			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"

            CreateJson = str
        End Function


		'---------------------------------------------------------------------------
        ' Name 			: List
		' Description 	: 목록
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function List(ByRef r_Return, ByRef r_RowTotal)
            Dim arrKey, arrParams
            Dim oRs
			
            arrKey = Array("RETURN_VALUE", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("LOG_Visit_SP_L", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set List = oRs
        End Function

		'-------------------------------------
		' 목록 : Dictionary
        ' TODO:: 멀티레코드로 변경 필요
        Public Function ListDic(ByRef r_Return, ByRef r_RowTotal)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(List(r_Return, r_RowTotal))

            Set ListDic = oDic      ' Return
        End Function

        '-------------------------------------
		' 목록 : String 객체(XML)
        Public Function ListXml(ByRef r_Return, ByRef r_RowTotal)
            Dim str
            Dim oRs
            
            Xml_yn = "Y"
            Set oRs = List(r_Return, r_RowTotal)
			str = ""
            str = str & "<table return='" & r_Return & "' row_total='" & iRowTotal & "'>"
            If oRs.State = adStateOpen Then str = str & oRs(0)
			str = str & "</table>"

            ListXml = str
        End Function

		'-------------------------------------
		' 목록 : String 객체(JSON)
		Public Function ListJson(ByRef r_Return, ByRef r_RowTotal)
            Dim str, oJson
            Dim oRs, strJson : strJson = ""

            Set oRs = List(r_Return, r_RowTotal)

            If oRs.State = adStateOpen Then 
                Set oJson = m_cDBMgr.CRsToJson(oRs)
                strJson = toJSON(oJson)
            End If
			
            str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": """ & r_Return & """ "
            str = str & "    , ""row_total"": " & r_RowTotal & " "
            If Len(strJson) > 0 Then str = str & "    , ""rows"": " & strJson
            str = str & "  }"
            str = str & "}"
            
            ListJson = str
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: ListStats
		' Description 	: 목록
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function ListStats(ByRef r_Return, ByRef r_RowTotal)
            Dim arrKey, arrParams
            Dim oRs
			
            arrKey = Array("RETURN_VALUE", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("LOG_Visit_SP_Stats_L", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set ListStats = oRs
        End Function

		'-------------------------------------
		' 목록 : Dictionary
        ' TODO:: 멀티레코드로 변경 필요
        Public Function ListStatsDic(ByRef r_Return, ByRef r_RowTotal)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(ListStats(r_Return, r_RowTotal))

            Set ListStatsDic = oDic      ' Return
        End Function

        '-------------------------------------
		' 목록 : String 객체(XML)
        Public Function ListStatsXml(ByRef r_Return, ByRef r_RowTotal)
            Dim str
            Dim oRs
            
            Xml_yn = "Y"
            Set oRs = ListStats(r_Return, r_RowTotal)
			str = ""
            str = str & "<table return='" & r_Return & "' row_total='" & iRowTotal & "'>"
            If oRs.State = adStateOpen Then str = str & oRs(0)
			str = str & "</table>"

            ListStatsXml = str
        End Function

		'-------------------------------------
		' 목록 : String 객체(JSON)
		Public Function ListStatsJson(ByRef r_Return, ByRef r_RowTotal)
            Dim str, oJson
            Dim oRs, strJson : strJson = ""

            Set oRs = ListStats(r_Return, r_RowTotal)

            If oRs.State = adStateOpen Then 
                Set oJson = m_cDBMgr.CRsToJson(oRs)
                strJson = toJSON(oJson)
            End If
			
            str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": """ & r_Return & """ "
            str = str & "    , ""row_total"": " & r_RowTotal & " "
            If Len(strJson) > 0 Then str = str & "    , ""rows"": " & strJson
            str = str & "  }"
            str = str & "}"
            
            ListStatsJson = str
        End Function
    End Class

' REVIEW::
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>