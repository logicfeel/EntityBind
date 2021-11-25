<%
    Class ORD_User_Cls

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

        Public Property Let Meb_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("meb_idx") = m_cDBMgr.MakeParam("@meb_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Ord_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ord_id") = m_cDBMgr.MakeParam("@ord_id", adVarChar, adParamInput, 14, p_Value)
            End if
        End Property

        Public Property Let OrderTel(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("orderTel") = m_cDBMgr.MakeParam("@orderTel", adVarChar, adParamInput, 15, p_Value)
            End if
        End Property

        Public Property Let OrderName(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("orderName") = m_cDBMgr.MakeParam("@orderName", adVarWChar, adParamInput, 10, p_Value)
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
            m_oDicParams.Add "meb_idx",         m_cDBMgr.MakeParam("@meb_idx",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "ord_id",          m_cDBMgr.MakeParam("@ord_id",           adVarChar,      adParamInput,       14,     Null)
            m_oDicParams.Add "orderTel",        m_cDBMgr.MakeParam("@orderTel",         adVarChar,      adParamInput,       15,     Null)
            m_oDicParams.Add "orderName",       m_cDBMgr.MakeParam("@orderName",        adVarWChar,     adParamInput,       10,     Null)

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
        ' Description 	: 조회 : (TODO:: 개발해야함!!)
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function Read(ByRef r_Result)
            Dim arrKey, arrParams, oRs
            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_R", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            
            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Set Read = oRs          'Return  
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function ReadDic(ByRef r_Result)
            Dim oDic
            
            Set oDic = m_cDBMgr.CRsToDictionary(Read(r_Result))
            Set ReadDic = oDic      ' Return
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function ReadXml(ByRef r_Result)
            Dim strXml, oRs
            
            Xml_yn = "Y"
            Set oRs = Read(r_Result)
			strXml = ""
            strXml = strXml & "<table return='" & r_Result & "'>"
            strXml = strXml & oRs(0)
			strXml = strXml & "</table>"
            Xml_yn = "N"
            ReadXml = strXml        ' Return
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
		Public Function ReadJson(ByRef r_Result)
            Dim strJson, oJson
            
            Set oJson = m_cDBMgr.CRsToJson(Read(r_Result))
			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & ", "
            strJson = strJson & "    ""rows"": " & toJSON(oJson)
            strJson = strJson & "  }"
            strJson = strJson & "}"
            ReadJson = strJson   ' Return
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: ReadState
        ' Description 	: 조회 : (TODO:: 개발해야함!!)
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function ReadState(ByRef r_Result)
            Dim arrKey, arrParams, oRs
            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "meb_idx", "ord_id", "orderTel", "orderName", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_State_R", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            
            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Set ReadState = oRs          'Return  
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function ReadStateDic(ByRef r_Result)
            Dim oDic
            
            Set oDic = m_cDBMgr.CRsToDictionary(ReadState(r_Result))
            Set ReadStateDic = oDic      ' Return
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function ReadStateXml(ByRef r_Result)
            Dim strXml, oRs
            
            Xml_yn = "Y"
            Set oRs = ReadState(r_Result)
			strXml = ""
            strXml = strXml & "<table return='" & r_Result & "'>"
            strXml = strXml & oRs(0)
			strXml = strXml & "</table>"
            Xml_yn = "N"
            ReadStateXml = strXml        ' Return
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
		Public Function ReadStateJson(ByRef r_Result)
            Dim strJson, oJson
            
            Set oJson = m_cDBMgr.CRsToJson(ReadState(r_Result))
			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & ", "
            strJson = strJson & "    ""rows"": " & toJSON(oJson)
            strJson = strJson & "  }"
            strJson = strJson & "}"
            ReadStateJson = strJson   ' Return
        End Function


        '---------------------------------------------------------------------------
        ' Name 			: ReturnXml, ReturnJson
        ' Description 	: 내부
        '---------------------------------------------------------------------------
        '-------------------------------------
		' 조회 : ReturnXml
        Private Function ReturnXml(r_Result)
            Dim strXml
            
            strXml = "<table returns='" & r_Result & "'></table>"
            ReturnXml = strXml        ' Return
        End Function
        '-------------------------------------
        ' 조회 :ReturnJson
        Private Function ReturnJson(r_Result)
            Dim strJson
            
			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & " "
            strJson = strJson & "  }"
            strJson = strJson & "}"
            ReturnJson = strJson   ' Return
        End Function         


        '---------------------------------------------------------------------------
        ' Name 			: List
		' Description 	: 목록 (회원기준)
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function List(ByRef r_Result, ByRef r_RowTotal)
            Dim arrKey, arrParams, oRs
            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "meb_idx", "ord_id", "orderTel", "orderName", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_User_L", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode
            
            Set List = oRs           'Return
        End Function

		'-------------------------------------
		' 목록 : Dictionary
        Public Function ListDic(ByRef r_Return, ByRef r_RowTotal)
            Dim oDic
            Dim oRs
            
            Set oDic = m_cDBMgr.CRsToDictionary(List(r_Return, r_RowTotal))

            Set ListDic = oDic
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

    End Class

' 이슈사항
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>