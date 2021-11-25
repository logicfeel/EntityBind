<%
    Class POT_MebPoint_Cls

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

        Public Property Let Point_it(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("point_it") = m_cDBMgr.MakeParam("@point_it", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Base_mn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("base_mn") = m_cDBMgr.MakeParam("@base_mn", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Minus_yn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("minus_yn") = m_cDBMgr.MakeParam("@minus_yn", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let Pot_it(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("pot_it") = m_cDBMgr.MakeParam("@po_it", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Identifier(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("identifier") = m_cDBMgr.MakeParam("@identifier", adVarChar, adParamInput, 20, p_Value)
            End if
        End Property

        Public Property Let Ord_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ord_id") = m_cDBMgr.MakeParam("@ord_id", adVarChar, adParamInput, 20, p_Value)
            End if
        End Property

        Public Property Let Caption(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("caption") = m_cDBMgr.MakeParam("@caption", adVarWChar, adParamInput, 30, p_Value)
            End if
        End Property

        Public Property Let Mp_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("mp_idx") = m_cDBMgr.MakeParam("@mp_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Pot_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("pot_id") = m_cDBMgr.MakeParam("@pot_id", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Keyword(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("keyword") = m_cDBMgr.MakeParam("@keyword", adVarWChar, adParamInput, 100, p_Value)
            End if
        End Property

        Public Property Let Page_size(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("page_size") = m_cDBMgr.MakeParam("@page_size", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Page_count(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("page_count") = m_cDBMgr.MakeParam("@page_count", adInteger, adParamInput, 0, p_Value)
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
            m_oDicParams.Add "RETURN_VALUE",    m_cDBMgr.MakeParam("RETURN_VALUE",      adInteger,  adParamReturnValue, ,       "")
            m_oDicParams.Add "meb_idx",         m_cDBMgr.MakeParam("@meb_idx",          adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "point_it",        m_cDBMgr.MakeParam("@point_it",         adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "base_mn",         m_cDBMgr.MakeParam("@base_mn",          adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "minus_yn",        m_cDBMgr.MakeParam("@minus_yn",         adChar,     adParamInput,       1,      Null)
            m_oDicParams.Add "pot_it",          m_cDBMgr.MakeParam("@pot_it",           adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "identifier",      m_cDBMgr.MakeParam("@identifier",       adVarChar,  adParamInput,       20,     Null)
            m_oDicParams.Add "ord_id",          m_cDBMgr.MakeParam("@ord_id",           adVarChar,  adParamInput,       20,     Null)
            m_oDicParams.Add "caption",         m_cDBMgr.MakeParam("@caption",          adVarWChar, adParamInput,       30,     Null)
            m_oDicParams.Add "mp_idx",          m_cDBMgr.MakeParam("@mp_idx",           adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "pot_id",          m_cDBMgr.MakeParam("@pot_id",           adInteger,  adParamInput,       0,      Null)
            
            m_oDicParams.Add "keyword",         m_cDBMgr.MakeParam("@keyword",          adVarWChar, adParamInput,       100,    Null)
            m_oDicParams.Add "page_size",       m_cDBMgr.MakeParam("@page_size",        adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "page_count",      m_cDBMgr.MakeParam("@page_count",       adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "sort_cd",         m_cDBMgr.MakeParam("@sort_cd",          adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "row_total",       m_cDBMgr.MakeParam("@row_total",        adInteger,  adParamOutput,      1,      0)
            m_oDicParams.Add "xml_yn",          m_cDBMgr.MakeParam("@xml_yn",           adChar,     adParamInput,       1,      Null)
            m_oDicParams.Add "msgSave_yn",      m_cDBMgr.MakeParam("@msgSave_yn",       adChar,     adParamInput,       1,      Null)
            m_oDicParams.Add "msg_Print_yn",    m_cDBMgr.MakeParam("@msg_Print_yn",     adChar,     adParamInput,       1,      Null)
        End Sub

		'---------------------------------------------------------------------------
		' Name 			: Create
        ' Description 	: 등록
		'---------------------------------------------------------------------------
        Public Function Create(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "meb_idx", "point_it", "base_mn", "minus_yn", "pot_it", "identifier", "ord_id", "caption")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("POT_MebPoint_SP_C", arrParams, Nothing)
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
        ' Name 			: Read
        ' Description 	: 조회
        ' Return		: RecordSet 객체   
        '---------------------------------------------------------------------------
        Public Function Read(ByRef r_Return)
            Dim arrKey, arrParams
            Dim oRs

            arrKey = Array("RETURN_VALUE", "mp_idx", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("POT_MebPoint_SP_R", arrParams, Nothing)
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
        ' Name 			: List
		' Description 	: 목록
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function List(ByRef r_Return, ByRef r_RowTotal)
            Dim arrKey, arrParams
            Dim oRs

            arrKey = Array("RETURN_VALUE", "minus_yn", "pot_id", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("POT_MebPoint_SP_L", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Set List = oRs
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

' REVIEW::
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>