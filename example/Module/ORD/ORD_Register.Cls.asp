<%
    Class ORD_Reg_Cls

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

        Public Property Let Ord_id_Out(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ord_id_Out") = m_cDBMgr.MakeParam("@ord_id", adVarChar, adParamOutput, 14, p_Value)
            End if
        End Property

        Public Property Let Crt_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("crt_idx") = m_cDBMgr.MakeParam("@crt_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Order_mn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("order_mn") = m_cDBMgr.MakeParam("@order_mn", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let OrderName(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("orderName") = m_cDBMgr.MakeParam("@orderName", adVarWChar, adParamInput, 10, p_Value)
            End if
        End Property

        Public Property Let Email(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("email") = m_cDBMgr.MakeParam("@email", adVarChar, adParamInput, 100, p_Value)
            End if
        End Property

        Public Property Let OrderTel(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("orderTel") = m_cDBMgr.MakeParam("@orderTel", adVarChar, adParamInput, 15, p_Value)
            End if
        End Property

        Public Property Let Recipient(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("recipient") = m_cDBMgr.MakeParam("@recipient", adVarWChar, adParamInput, 10, p_Value)
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

        Public Property Let Pay_mn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("pay_mn") = m_cDBMgr.MakeParam("@pay_mn", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Pay_method_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("pay_method_cd") = m_cDBMgr.MakeParam("@pay_method_cd", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let UsePoint_it(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("usePoint_it") = m_cDBMgr.MakeParam("@usePoint_it", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Bak_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("bak_idx") = m_cDBMgr.MakeParam("@bak_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Depositor(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("depositor") = m_cDBMgr.MakeParam("@depositor", adVarWChar, adParamInput, 10, p_Value)
            End if
        End Property

        Public Property Let Ord_id(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("ord_id") = m_cDBMgr.MakeParam("@ord_id", adVarChar, adParamInput, 14, p_Value)
            End if
        End Property

        Public Property Let Pg_yn(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("pg_yn") = m_cDBMgr.MakeParam("@pg_yn", adChar, adParamInput, 1, p_Value)
            End if
        End Property

        Public Property Let State_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("state_cd") = m_cDBMgr.MakeParam("@state_cd", adChar, adParamInput, 2, p_Value)
            End if
        End Property

        Public Property Let PaymentKey(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("paymentKey") = m_cDBMgr.MakeParam("@paymentKey", adVarChar, adParamInput, 100, p_Value)
            End if
        End Property
        
        Public Property Let Amount(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("amount") = m_cDBMgr.MakeParam("@amount", adInteger, adParamInput, 0, p_Value)
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
            m_oDicParams.Add "ord_id_Out",      m_cDBMgr.MakeParam("@ord_id",           adVarChar,      adParamOutput,      14,     0)
            m_oDicParams.Add "crt_idx",         m_cDBMgr.MakeParam("@crt_idx",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "order_mn",        m_cDBMgr.MakeParam("@order_mn",         adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "orderName",       m_cDBMgr.MakeParam("@orderName",        adVarWChar,     adParamInput,       10,     Null)
            m_oDicParams.Add "email",           m_cDBMgr.MakeParam("@email",            adVarChar,      adParamInput,       100,    Null)
            m_oDicParams.Add "orderTel",        m_cDBMgr.MakeParam("@orderTel",         adVarChar,      adParamInput,       15,     Null)
            m_oDicParams.Add "recipient",       m_cDBMgr.MakeParam("@recipient",        adVarWChar,     adParamInput,       10,     Null)
            m_oDicParams.Add "choice_cd",        m_cDBMgr.MakeParam("@choice_cd",       adChar,         adParamInput,       5,      Null)
            m_oDicParams.Add "zipcode",         m_cDBMgr.MakeParam("@zipcode",          adVarChar,      adParamInput,       7,      Null)
            m_oDicParams.Add "addr1",           m_cDBMgr.MakeParam("@addr1",            adVarWChar,     adParamInput,       50,     Null)
            m_oDicParams.Add "addr2",           m_cDBMgr.MakeParam("@addr2",            adVarWChar,     adParamInput,       50,     Null)
            m_oDicParams.Add "tel",             m_cDBMgr.MakeParam("@tel",              adVarChar,      adParamInput,       15,     Null)
            m_oDicParams.Add "memo",            m_cDBMgr.MakeParam("@memo",             adVarWChar,     adParamInput,       50,     Null)
            m_oDicParams.Add "request_dt",      m_cDBMgr.MakeParam("@request_dt",       adDBTimeStamp,  adParamInput,       19,     Null)
            m_oDicParams.Add "pay_mn",          m_cDBMgr.MakeParam("@pay_mn",           adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "pay_method_cd",   m_cDBMgr.MakeParam("@pay_method_cd",    adChar,         adParamInput,       1,      Null)
            m_oDicParams.Add "usePoint_it",     m_cDBMgr.MakeParam("@usePoint_it",      adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "bak_idx",         m_cDBMgr.MakeParam("@bak_idx",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "depositor",       m_cDBMgr.MakeParam("@depositor",        adVarWChar,     adParamInput,       10,     Null)
            m_oDicParams.Add "ord_id",          m_cDBMgr.MakeParam("@ord_id",           adVarChar,      adParamOutput,      14,     0)
            m_oDicParams.Add "pg_yn",           m_cDBMgr.MakeParam("@pg_yn",            adChar,         adParamInput,       1,      Null)
            m_oDicParams.Add "state_cd",        m_cDBMgr.MakeParam("@state_cd",         adChar,         adParamInput,       2,      Null)
            m_oDicParams.Add "amount",          m_cDBMgr.MakeParam("@amount",           adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "paymentKey",      m_cDBMgr.MakeParam("@paymentKey",       adVarChar,      adParamInput,       100,      Null)

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
		' Name 			: Create
        ' Description 	: 등록
		'---------------------------------------------------------------------------
        Public Function Create(ByRef r_Return, ByRef r_O_id)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "ord_id_Out", "crt_idx", "order_mn", "orderName", "email", "orderTel",_
                            "recipient", "choice_cd", "zipcode", "addr1", "addr2", "tel", "memo", "request_dt",_
                            "pay_mn", "pay_method_cd", "usePoint_it", "bak_idx", "depositor")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSpRs("ORD_SP_C", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_O_id = m_cDBMgr.GetValue(arrParams, "@ord_id") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode
            
            Create = null
        End Function
		
        '-------------------------------------
		' 목록 : Dictionary
        Public Function CreateDic(ByRef r_Return, ByRef r_O_id)
            Dim oDic
            
            Call Create(r_Return, r_O_id)

            CreateDic = null
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
        Public Function CreateXml(ByRef r_Return, ByRef r_O_id)
            Dim str, oJson
            
            Call Create(r_Return, r_O_id)
            str = "<table return='" & r_Return & "'></table>"
            
            CreateXml = str
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
		Public Function CreateJson(ByRef r_Return, ByRef r_O_id)
            Dim str, oJson
            
            Call Create(r_Return, r_O_id)
			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "    , ""ord_id"": " & r_O_id & " "
            str = str & "  }"
            str = str & "}"

            CreateJson = str   ' Return
        End Function        


        '---------------------------------------------------------------------------
        ' Name 			: Finish
        ' Description 	: 수정
        '---------------------------------------------------------------------------
        Public Function Finish(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "ord_id", "pg_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSpRs("ORD_SP_Finish_U", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            Finish = null
        End Function

		'-------------------------------------
		' 수정 : Dictionary
        Public Function FinishDic(ByRef r_Return)
            Dim oDic
            
            Call Finish(r_Return)

            FinishDic = null      ' Return
        End Function

		'-------------------------------------
		' 수정 : String 객체(XML)
        Public Function FinishXml(ByRef r_Return)
            Dim str, oRs
            
            Call Finish(r_Return)
            str = "<table return='" & r_Return & "'></table>"

            FinishXml = str
        End Function

		'-------------------------------------
		' 수정 : String 객체(XML)
		Public Function FinishJson(ByRef r_Return)
            Dim str, oJson
            
            Call Finish(r_Return)
			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"

            FinishJson = str
        End Function         

        '---------------------------------------------------------------------------
        ' Name 			: TossFinish
        ' Description 	: 수정   (내부적으로 업데이트 처리함)
        '---------------------------------------------------------------------------
        Public Function TossFinish(ByRef r_Return)
            Dim arrKey, arrParams

            arrKey = Array("RETURN_VALUE", "ord_id", "paymentKey", "amount", "memo")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSpRs("ORD_SP_TossFinish_U", arrParams, Nothing)
            r_Return = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Return < 0 Then r_Return = r_Return + m_iMsgCode

            TossFinish = null
        End Function 

		'-------------------------------------
		' 수정 : Dictionary
        Public Function TossFinishDic(ByRef r_Return)
            Dim oDic
            
            Call TossFinish(r_Return)

            TossFinishDic = null      ' Return
        End Function

		'-------------------------------------
		' 수정 : String 객체(XML)
        Public Function TossFinishXml(ByRef r_Return)
            Dim str, oRs
            
            Call TossFinish(r_Return)
            str = "<table return='" & r_Return & "'></table>"

            TossFinishXml = str
        End Function

		'-------------------------------------
		' 수정 : String 객체(XML)
		Public Function TossFinishJson(ByRef r_Return)
            Dim str, oJson
            
            Call TossFinish(r_Return)
			str = ""
            str = str & "{"
            str = str & "  ""table"": {"
            str = str & "    ""return"": " & r_Return & " "
            str = str & "  }"
            str = str & "}"

            TossFinishJson = str
        End Function         

		'---------------------------------------------------------------------------
        ' Name 			: List
		' Description 	: 목록 : 실패  !! TODO:: 테스트 해야함
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function List(ByRef r_Return, ByRef r_RowTotal)
            Dim arrKey, arrParams
            Dim oRs

            arrKey = Array("RETURN_VALUE", "state_cd", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_Fail_L", arrParams, Nothing)
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