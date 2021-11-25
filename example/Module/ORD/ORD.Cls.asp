<%
    Class ORD_Cls

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

        Public Property Let Deli_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("deli_idx") = m_cDBMgr.MakeParam("@deli_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let Meb_idx(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("meb_idx") = m_cDBMgr.MakeParam("@meb_idx", adInteger, adParamInput, 0, p_Value)
            End if
        End Property

        Public Property Let State_cd(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("state_cd") = m_cDBMgr.MakeParam("@state_cd", adChar, adParamInput, 2, p_Value)
            End if
        End Property

    Public Property Let State_arr(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("state_arr") = m_cDBMgr.MakeParam("@state_arr", adVarChar, adParamInput, 50, p_Value)
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

        Public Property Let Pay_method(p_Value) 
            If Not IsEmpty(p_Value) Then
                m_oDicParams("pay_method") = m_cDBMgr.MakeParam("@pay_method", adVarChar, adParamInput, 5, p_Value)
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
            m_oDicParams.Add "ord_id",          m_cDBMgr.MakeParam("@ord_id",           adVarChar,      adParamInput,       14,     Null)
            m_oDicParams.Add "deli_idx",        m_cDBMgr.MakeParam("@deli_idx",         adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "meb_idx",         m_cDBMgr.MakeParam("@meb_idx",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "state_cd",        m_cDBMgr.MakeParam("@state_cd",         adChar,         adParamInput,       2,      Null)
            m_oDicParams.Add "state_arr",       m_cDBMgr.MakeParam("@state_arr",        adVarChar,      adParamInput,       50,     Null)
            m_oDicParams.Add "dco_idx",         m_cDBMgr.MakeParam("@dco_idx",          adInteger,      adParamInput,       0,      Null)
            m_oDicParams.Add "invoice",         m_cDBMgr.MakeParam("@invoice",          adVarChar,      adParamInput,       20,     Null)
            m_oDicParams.Add "pay_method",      m_cDBMgr.MakeParam("@pay_method",       adVarChar,      adParamInput,       5,      Null)

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
            arrKey = Array("RETURN_VALUE", "ord_id", "orderName", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_R", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            
            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Set Read = oRs          'Return  
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
        ' Name 			: ReturnXml, ReturnJson
        ' Description 	: 내부
        '---------------------------------------------------------------------------
        '-------------------------------------
		' 조회 : ReturnXml
        Private Function ReturnXml(r_Result)
            Dim strXml
            
            strXml = "<table return='" & r_Result & "'></table>"
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
        ' Name 			: Update_Cancel  
        ' Description 	: 수정
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Cancel(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Cancel_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
                Case "XML"
                    Update_Cancel = ReturnXml(r_Result)
                Case "JSON"
                    Update_Cancel = ReturnJson(r_Result)
                Case else
                    Update_Cancel = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_Approval  
        ' Description 	: 수정
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Approval(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Approval_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
                Case "XML"
                    Update_Approval = ReturnXml(r_Result)
                Case "JSON"
                    Update_Approval = ReturnJson(r_Result)
                Case else
                    Update_Approval = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_ForRefund  
        ' Description 	: 환불대기  
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_ForRefund(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs
            Dim iReturn : iReturn = r_Result

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id", "deli_idx")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_ForRefund_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
                Case "XML"
                    Update_ForRefund = ReturnXml(r_Result)
                Case "JSON"
                    Update_ForRefund = ReturnJson(r_Result)
                Case else
                    Update_ForRefund = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_Refund  
        ' Description 	: 환불완료  
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Refund(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs
            Dim iReturn : iReturn = r_Result

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Refund_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
                Case "XML"
                    Update_Refund = ReturnXml(r_Result)
                Case "JSON"
                    Update_Refund = ReturnJson(r_Result)
                Case else
                    Update_Refund = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_ForReturn  
        ' Description 	: 반품대기  
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_ForReturn(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs
            Dim iReturn : iReturn = r_Result

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id", "deli_idx")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_ForReturn_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
                Case "XML"
                    Update_ForReturn = ReturnXml(r_Result)
                Case "JSON"
                    Update_ForReturn = ReturnJson(r_Result)
                Case else
                    Update_ForReturn = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_Return  
        ' Description 	: 반품완료(환불대기)  
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Return(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id", "deli_idx")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Return_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
                Case "XML"
                    Update_Return = ReturnXml(r_Result)
                Case "JSON"
                    Update_Return = ReturnJson(r_Result)
                Case else
                    Update_Return = r_Result
            End Select        
        End Function




        '---------------------------------------------------------------------------
        ' Name 			: Update_Deli_Check  
        ' Description 	: 수정
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Deli_Check(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "deli_idx", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Deli_Check_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
            Case "XML"
                Update_Deli_Check = ReturnXml(r_Result)
            Case "JSON"
                Update_Deli_Check = ReturnJson(r_Result)
            Case else
                Update_Deli_Check = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_Deli_Ready  
        ' Description 	: 수정
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Deli_Ready(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "deli_idx", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Deli_Ready_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
            Case "XML"
                Update_Deli_Ready = ReturnXml(r_Result)
            Case "JSON"
                Update_Deli_Ready = ReturnJson(r_Result)
            Case else
                Update_Deli_Ready = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_Deli_Send  
        ' Description 	: 수정
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Deli_Send(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "deli_idx", "ord_id", "dco_idx", "invoice")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Deli_Send_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
            Case "XML"
                Update_Deli_Send = ReturnXml(r_Result)
            Case "JSON"
                Update_Deli_Send = ReturnJson(r_Result)
            Case else
                Update_Deli_Send = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_Deli_Finish  
        ' Description 	: 수정
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Deli_Finish(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "deli_idx", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Deli_Finish_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
            Case "XML"
                Update_Deli_Finish = ReturnXml(r_Result)
            Case "JSON"
                Update_Deli_Finish = ReturnJson(r_Result)
            Case else
                Update_Deli_Finish = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: Update_Pay_Finish  
        ' Description 	: 수정
        ' Parameter     : p_Type "XML", "JSON"
        '---------------------------------------------------------------------------
        Public Function Update_Pay_Finish(ByRef r_Result, p_Type)
            Dim arrKey, arrParams, oRs

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Call m_cDBMgr.ExecuteSp("ORD_SP_Pay_Finish_U", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Select Case UCase(p_Type)
            Case "XML"
                Update_Pay_Finish = ReturnXml(r_Result)
            Case "JSON"
                Update_Pay_Finish = ReturnJson(r_Result)
            Case else
                Update_Pay_Finish = r_Result
            End Select        
        End Function

        '---------------------------------------------------------------------------
		' Name 			: Delete (TODO:: 개발해야함!!)
        ' Description 	: 삭제
        '---------------------------------------------------------------------------
        Public Function Delete(ByRef r_Result)
            Dim arrKey, arrParams, oRs, iReturn

            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "ord_id")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)

            Call m_cDBMgr.ExecuteSpRs("ORD_SP_D", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode

            Delete = ""           'Return        
        End Function
        
        '-------------------------------------
		' 삭제 : Dictionary
        Public Function DeleteDic(ByRef r_Result)
            Dim oDic

            Call Delete(r_Result)

            DeleteDic = null      ' Return
        End Function

		'-------------------------------------
		' 삭제 : String 객체(XML)
        Public Function DeleteXml(ByRef r_Result)
            Dim strXml, oRs
            
            Call Delete(r_Result)
            strXml = "<table return='" & r_Result & "'></table>"

            DeleteXml = strXml        ' Return
        End Function

		'-------------------------------------
		' 삭제 : String 객체(XML)
		Public Function DeleteJson(ByRef r_Result)
            Dim strJson, oJson
            
            Call Delete(r_Result)

			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & " "
            strJson = strJson & "  }"
            strJson = strJson & "}"

            DeleteJson = strJson   ' Return
        End Function 

		'---------------------------------------------------------------------------
        ' Name 			: List
		' Description 	: 목록 (전체주문 목록-주문번호기준)
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function List(ByRef r_Result, ByRef r_RowTotal)
            Dim arrKey, arrParams, oRs
            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "state_cd", "pay_method", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_All_L", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode
            
            Set List = oRs           'Return
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

        '---------------------------------------------------------------------------
        ' Name 			: ListFlow
		' Description 	: 목록
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function ListFlow(ByRef r_Result, ByRef r_RowTotal)
            Dim arrKey, arrParams, oRs
            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "pay_method", "state_arr", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_Deli_L", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode
            
            Set ListFlow = oRs           'Return
        End Function

		'-------------------------------------
		' 목록 : Dictionary
        Public Function ListFlowDic(ByRef r_Result, ByRef r_RowTotal)
            Dim oDic
            
            Set oDic = m_cDBMgr.CRsToDictionary(ListFlow(r_Result, r_RowTotal))
            
            Set ListFlowDic = oDic      ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
        Public Function ListFlowXml(ByRef r_Result)
            Dim strXml, oRs
            Dim iRowTotal : iRowTotal = 0
            
            Xml_yn = "Y"    '지역속성
            Set oRs = ListFlow(r_Result, iRowTotal)
			strXml = ""
            strXml = strXml & "<table return='" & r_Result & "' row_total='" & iRowTotal & "'>"
            strXml = strXml & oRs(0)
			strXml = strXml & "</table>"

            ListFlowXml = strXml        ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
		Public Function ListFlowJson(ByRef r_Result)
            Dim strJson, oJson, iRowTotal
            
            Set oJson = m_cDBMgr.CRsToJson(ListFlow(r_Result, iRowTotal))
			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & ", "
            strJson = strJson & "    ""row_total"": " & iRowTotal & ", "
            strJson = strJson & "    ""rows"": " & toJSON(oJson)
            strJson = strJson & "  }"
            strJson = strJson & "}"

            ListFlowJson = strJson   ' Return
        End Function

        '---------------------------------------------------------------------------
        ' Name 			: ListFail
		' Description 	: 목록
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function ListFail(ByRef r_Result, ByRef r_RowTotal)
            Dim arrKey, arrParams, oRs
            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "state_cd", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_SP_Fail_L", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode
            
            Set ListFail = oRs           'Return
        End Function

		'-------------------------------------
		' 목록 : Dictionary
        Public Function ListFailDic(ByRef r_Result, ByRef r_RowTotal)
            Dim oDic
            
            Set oDic = m_cDBMgr.CRsToDictionary(ListFail(r_Result, r_RowTotal))
            
            Set ListFailDic = oDic      ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
        Public Function ListFailXml(ByRef r_Result)
            Dim strXml, oRs
            Dim iRowTotal : iRowTotal = 0
            
            Xml_yn = "Y"    '지역속성
            Set oRs = ListFail(r_Result, iRowTotal)
			strXml = ""
            strXml = strXml & "<table return='" & r_Result & "' row_total='" & iRowTotal & "'>"
            strXml = strXml & oRs(0)
			strXml = strXml & "</table>"

            ListFailXml = strXml        ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
		Public Function ListFailJson(ByRef r_Result)
            Dim strJson, oJson, iRowTotal
            
            Set oJson = m_cDBMgr.CRsToJson(ListFail(r_Result, iRowTotal))
			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & ", "
            strJson = strJson & "    ""row_total"": " & iRowTotal & ", "
            strJson = strJson & "    ""rows"": " & toJSON(oJson)
            strJson = strJson & "  }"
            strJson = strJson & "}"

            ListFailJson = strJson   ' Return
        End Function



        '---------------------------------------------------------------------------
        ' Name 			: ListCorp
		' Description 	: 목록 (전체주문 목록-주문번호기준)
		' Return		: RecordSet 객체
		'---------------------------------------------------------------------------
        Public Function ListCorp(ByRef r_Result, ByRef r_RowTotal)
            Dim arrKey, arrParams, oRs
            ' 파라메터 구성
            arrKey = Array("RETURN_VALUE", "keyword", "page_size", "page_count", "sort_cd", "row_total", "xml_yn")
            arrParams = m_cDBMgr.GetDicToArrayParams(m_oDicParams, arrKey)
            Set oRs = m_cDBMgr.ExecuteSpRs("ORD_DeliCorp_SP_L", arrParams, Nothing)
            r_Result = m_cDBMgr.GetValue(arrParams, "RETURN_VALUE") 
            r_RowTotal = m_cDBMgr.GetValue(arrParams, "@row_total") 

            If m_iMsgCode <> 0 and r_Result < 0 Then r_Result = r_Result + m_iMsgCode
            
            Set ListCorp = oRs           'Return
        End Function

		'-------------------------------------
		' 목록 : Dictionary
        Public Function ListCorpDic(ByRef r_Result, ByRef r_RowTotal)
            Dim oDic
            
            Set oDic = m_cDBMgr.CRsToDictionary(ListCorp(r_Result, r_RowTotal))
            
            Set ListCorpDic = oDic      ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
        Public Function ListCorpXml(ByRef r_Result)
            Dim strXml, oRs
            Dim iRowTotal : iRowTotal = 0
            
            Xml_yn = "Y"    '지역속성
            Set oRs = ListCorp(r_Result, iRowTotal)
			strXml = ""
            strXml = strXml & "<table return='" & r_Result & "' row_total='" & iRowTotal & "'>"
            strXml = strXml & oRs(0)
			strXml = strXml & "</table>"

            ListCorpXml = strXml        ' Return
        End Function

		'-------------------------------------
		' 목록 : String 객체(XML)
		Public Function ListCorpJson(ByRef r_Result)
            Dim strJson, oJson, iRowTotal
            
            Set oJson = m_cDBMgr.CRsToJson(ListCorp(r_Result, iRowTotal))
			strJson = ""
            strJson = strJson & "{"
            strJson = strJson & "  ""table"": {"
            strJson = strJson & "    ""return"": " & r_Result & ", "
            strJson = strJson & "    ""row_total"": " & iRowTotal & ", "
            strJson = strJson & "    ""rows"": " & toJSON(oJson)
            strJson = strJson & "  }"
            strJson = strJson & "}"

            ListCorpJson = strJson   ' Return
        End Function      

    End Class

' 이슈사항
' 전달값에 따라서 호출되는 param 정보(배열)이 달라짐
' 방법1> 파라메터 전달방식
' - 공백일 경우 문제점
' - 필수값의 경우
' - 필수값은 파라메터
%>