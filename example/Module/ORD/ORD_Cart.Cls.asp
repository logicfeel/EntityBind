<%
    Class ORD_Cart_Cls

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

        Public Property Let Meb_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("meb_idx") = m_cDBMgr.MakeParam("@meb_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Arr_prt_opt_qty(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("arr_prt_opt_qty") = m_cDBMgr.MakeParam("@arr_prt_opt_qty", adVarChar, adParamInput, 8000, p_Value)
            End if
        End Property

        Public Property Let State_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("state_cd") = m_cDBMgr.MakeParam("@state_cd", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let Crt_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("crt_idx") = m_cDBMgr.MakeParam("@crt_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Prt_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("prt_id") = m_cDBMgr.MakeParam("@prt_id", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Opt_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("opt_idx") = m_cDBMgr.MakeParam("@opt_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Qty_it(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("qty_it") = m_cDBMgr.MakeParam("@qty_it", adUnsignedTinyInt, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Ord_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ord_id") = m_cDBMgr.MakeParam("@ord_id", adVarChar, adParamInput, 14, p_Value)
            End if
        End Property

        Public Property Let Del_yn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("del_yn") = m_cDBMgr.MakeParam("@del_yn", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let Edit_crt_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("edit_crt_idx") = m_cDBMgr.MakeParam("@edit_crt_idx", adInteger, adParamInput, 0, p_Value)
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
            m_oDicParams.Add "RETURN_VALUE",    m_cDBMgr.MakeParam("RETURN_VALUE",      adInteger,  adParamReturnValue, ,       "")
            m_oDicParams.Add "client_id",       m_cDBMgr.MakeParam("@client_id",        adVarChar,  adParamInput,       20,     Null)
            m_oDicParams.Add "meb_idx",         m_cDBMgr.MakeParam("@meb_idx",          adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "arr_prt_opt_qty", m_cDBMgr.MakeParam("@arr_prt_opt_qty",  adVarChar,  adParamInput,       8000,   Null)
            m_oDicParams.Add "state_cd",        m_cDBMgr.MakeParam("@state_cd",         adChar,     adParamInput,       1,      Null)
            m_oDicParams.Add "crt_idx",         m_cDBMgr.MakeParam("@crt_idx",          adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "prt_id",          m_cDBMgr.MakeParam("@prt_id",           adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "opt_idx",         m_cDBMgr.MakeParam("@opt_idx",          adInteger,  adParamInput,       0,      Null)
            m_oDicParams.Add "qty_it",          m_cDBMgr.MakeParam("@qty_it",           adUnsignedTinyInt, adParamInput, 0,     Null)
            m_oDicParams.Add "ord_id",          m_cDBMgr.MakeParam("@ord_id",           adVarChar,  adParamInput,       14,     Null)
            m_oDicParams.Add "del_yn",          m_cDBMgr.MakeParam("@del_yn",           adChar,     adParamInput,       1,      Null)
            m_oDicParams.Add "edit_crt_idx",    m_cDBMgr.MakeParam("@edit_crt_idx",     adInteger,  adParamInput,       0,      Null)
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

            arrKey = Array("RETURN_VALUE", "client_id", "meb_idx", "arr_prt_opt_qty", "state_cd")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_Cart_SP_Prts_C", arrParams, Nothing)
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
        Public Function CreateId(ByRef r_Return)
            Dim arrKey, arrParams

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "client_id", "meb_idx", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_Cart_SP_C", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            CreateId = null
        End Function

		'-------------------------------------
		' 조회 : Dictionary
        Public Function CreateIdDic(ByRef r_Return)
            Dim oDic
            
            Call m_cDBMgr.CRsToDictionary(CreateId(r_Return))

            CreateIdDic = null
        End Function

		'-------------------------------------
		' 조회 : String 객체(XML)
        Public Function CreateIdXml(ByRef r_Return)
            Dim str
            
            str = "<table return='" & r_Return & "'></table>"
            
            CreateIdXml = str
        End Function

		'-------------------------------------
		' 조회 : String 객체(JSON)
		Public Function CreateIdJson(ByRef r_Return)
            Dim str, oJson

            Call CreateId(r_Return)

            str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"
            
            CreateIdJson = str
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update
        ' Description 	: 수정
        '---------------------------------------------------------------------------
        Public Function Update(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "crt_idx", "arr_prt_opt_qty", "state_cd")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_Cart_SP_Prts_U", arrParams, Nothing)
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
        ' Name 			: Order
        ' Description 	: 주문준비
        '---------------------------------------------------------------------------
        Public Function Order(ByRef r_Return)
            Dim arrKey, arrParams

            State_cd = "R"
            arrKey = Array("RETURN_VALUE", "crt_idx", "state_cd", "arr_prt_opt_qty")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSpRs("ORD_Cart_SP_Prts_U", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Order = null
        End Function

		'-------------------------------------
		' 수정 : Dictionary
        Public Function OrderDic(ByRef r_Return)
            Dim oDic
            
            Call Order(r_Return)

            OrderDic = null
        End Function

		'-------------------------------------
		' 수정 : String 객체(XML)
        Public Function OrderXml(ByRef r_Return)
            Dim str, oRs
            
            Call Order(r_Return)
            str = "<table return='" & r_Return & "'></table>"
            
            OrderXml = str
        End Function

		'-------------------------------------
		' 수정 : String 객체(JSON)
		Public Function OrderJson(ByRef r_Return)
            Dim str, oJson
            
            Call Order(r_Return)
			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"

            OrderJson = str
        End Function  

        '---------------------------------------------------------------------------
        ' Name 			: Reset
        ' Description 	: 초기화
        '---------------------------------------------------------------------------
        Public Function Reset(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "crt_idx")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_Cart_SP_Init_U", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Reset = null
        End Function

		'-------------------------------------
		' 수정 : Dictionary
        Public Function ResetDic(ByRef r_Return)
            Dim oDic
            
            Call Reset(r_Return)

            ResetDic = null
        End Function

		'-------------------------------------
		' 수정 : String 객체(XML)
        Public Function ResetXml(ByRef r_Return)
            Dim str, oRs
            
            Call Reset(r_Return)
            str = "<table return='" & r_Return & "'></table>"

            ResetXml = str
        End Function

		'-------------------------------------
		' 수정 : String 객체(JSON)
		Public Function ResetJson(ByRef r_Return)
            Dim str, oJson
            
            Call Reset(r_Return)
			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"

            ResetJson = str
        End Function        

        '---------------------------------------------------------------------------
		' Name 			: Delete
        ' Description 	: 삭제
        '---------------------------------------------------------------------------
        Public Function Delete(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "crt_idx", "arr_prt_opt_qty")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSpRs("ORD_Cart_SP_Prts_D", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Delete = null
        End Function
        
        '-------------------------------------
		' 삭제 : Dictionary
        Public Function DeleteDic(ByRef r_Return)
            Dim oDic
            
            Call Delete(r_Return)

            DeleteDic = null
        End Function

		'-------------------------------------
		' 삭제 : String 객체(XML)
        Public Function DeleteXml(ByRef r_Return)
            Dim str
            
            Call Delete(r_Return)
            str = "<table return='" & r_Return & "'></table>"

            DeleteXml = str
        End Function

		'-------------------------------------
		' 삭제 : String 객체(JSON)
		Public Function DeleteJson(ByRef r_Return)
            Dim str, oJson
            
            Call Delete(r_Return)

			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"

            DeleteJson = str
        End Function


		'---------------------------------------------------------------------------
        ' Name 			: List
		' Description 	: 목록
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function List(ByRef r_Return, ByRef r_RowTotal)
            Dim arrKey, arrParams
            Dim oRs
			
            arrKey = Array("RETURN_VALUE", "crt_idx", "state_cd", "keyword", "page_size",_
                            "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_Cart_SP_Prts_L", arrParams, Nothing)
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