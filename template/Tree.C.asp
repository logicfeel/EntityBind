<?xml version="1.0" encoding="UTF-8"?>
<%
'##############################################################################
' FILENAME      : 
'------------------------------------------------------------------------------
' PROGRAM NAME  : 
' AUTHOR        : 김영호
' DESCRIPTION   : 
' HISTORY       :
'------------------------------------------------------------------------------
' DATE        NAME        DESCRIPTION
'------------------------------------------------------------------------------
' 
'##############################################################################
%>
<% 
'	On Error Resume Next 
%>
<% session.codepage = 65001 %>
<% Response.CharSet = "utf-8" %>
<% 
	Server.Execute "/A-Back/CMN/LoginCheck_Inc.asp"
%>
<%
	'########## 쿠키 값 | 기본정보 설정 ##########
	Dim reg_id, CK_l_sto_id
	reg_id			= request.Cookies("EC")("CK_ID")	'관리자 ID
	CK_l_sto_id	= Request.Cookies("EM")("L_STO_ID")

	if Len(reg_id) <= 0 then
		reg_id = "SYSTEM"
	end if

	'########## Request 값 | 기본값 세팅 ##########
	Dim cmd 
	cmd				= Request("cmd")
	
	Dim  dsp_idx, listCnt, selPage
	dsp_idx			= Request("dsp_idx")
	listCnt			= Request("listCnt")	        	
	selPage			= Request("selPage")	   
	

	Dim mp_idx_Arr, rankNum, area_cd, searchText
  	mp_idx_Arr		= Request("mp_idx_Arr")	        	
  	rankNum			= Request("rankNum")	        	 
  	
  	area_cd			= Trim(Request("area_cd"))	        	 
  	searchText		= Trim(Request("searchText"))	        	 


	'########## Request 필수사항 검사 ##########
	if len(cmd) <= 0 then
		Response.Write "<root totalCnt='0' return='5'></root>"
        Response.End 
	end if

	        	
	if cmd	= "SHOW" then
		if len(dsp_idx) <= 0 then
			Response.Write "<root totalCnt='0'  return='5'></root>"
	        Response.End 
		end if
	elseif cmd = "SET" then
		if len(dsp_idx) <= 0 OR len(mp_idx_Arr) <= 0 OR len(rankNum) <= 0 then
			Response.Write "<root totalCnt='0'  return='15'></root>"
	        Response.End 
		end if
	elseif cmd = "DEL" then
		if len(dsp_idx) <= 0 OR len(mp_idx_Arr) <= 0  then
			Response.Write "<root totalCnt='0'  return='5'></root>"
	        Response.End 
		end if
	end if

%>
<!-- #include virtual="/A-CMN/DBUtils_Cls.asp" -->
<!-- #include virtual="/A-Back/CMN/ModuleCMN_Fnc.asp" -->
<%
	'########## DB Process ##########
	Dim strSQL, strSqlOrderby, DBCls, rs
	Set DBCls = new DBUtils_cls
  
	if cmd = "TREE" then

'		Dim paramInfo_S(1)
'
'		paramInfo_S(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")						
'		paramInfo_S(1) = DBCls.MakeParam("@likb_idx", adInteger, adParamInput, 0, likb_idx)
'
'		Set rs = DBCls.ExecSPReturnRS("M05_SP_DisplayTree_RX", paramInfo_S, Nothing)
'
'		if not rs.EOF then
'			Response.Write "<root totalCnt='1'>"
'            Response.Write rs(0)
'			Response.Write "</root>"
'		else
'		    Response.Write "<root totalCnt='0'></root>"
'		End	if		


		Dim paramInfo_T(2)
		paramInfo_T(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")	
		paramInfo_T(1) = DBCls.MakeParam("@dsp_idx", adChar, adParamInput, 1, 0)
		paramInfo_T(2) = DBCls.MakeParam("@listCnt",adInteger,adParamOutput, 0,0)

		Set rs = DBCls.ExecSPReturnRS("M05_SP_DisplayTree_RX", paramInfo_T, Nothing)
			
		if not rs.EOF then
			Response.Write "<root totalCnt="""& DBCls.GetValue(paramInfo_T, "@listCnt") & """>"
			Response.Write rs(0)
			Response.Write "</root>"
		else
			Response.Write "<root totalCnt='0'></root>"
		end	if
		
		

    elseif cmd = "SHOW" then

		Dim paramInfo_S(2)
		paramInfo_S(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")	
		paramInfo_S(1) = DBCls.MakeParam("@dsp_idx", adInteger, adParamInput, 0, dsp_idx)
		paramInfo_S(2) = DBCls.MakeParam("@listCnt",adInteger,adParamOutput, 0,0)

		Set rs = DBCls.ExecSPReturnRS("M05_SP_DspPrtAll_RX", paramInfo_S, Nothing)
			
		if not rs.EOF then
			Response.Write "<root totalCnt="""& DBCls.GetValue(paramInfo_S, "@listCnt") & """>"
			Response.Write rs(0)
			Response.Write "</root>"
		else
			Response.Write "<root totalCnt='0'></root>"
		end	if    	
    	

    elseif cmd = "PRT" then

		Dim paramInfo_P(5)
		paramInfo_P(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")	
		paramInfo_P(1) = DBCls.MakeParam("@selPage", adInteger, adParamInput, 0, selPage)
		paramInfo_P(2) = DBCls.MakeParam("@lineCnt", adInteger, adParamInput, 0, listCnt)
		paramInfo_P(3) = DBCls.MakeParam("@listCnt",adInteger,adParamOutput, 0,0)
		paramInfo_P(4) = DBCls.MakeParam("@area_cd", adChar, adParamInput, 3, area_cd)
		paramInfo_P(5) = DBCls.MakeParam("@searchText", adVarChar, adParamInput, 20, searchText)

		Set rs = DBCls.ExecSPReturnRS("M05_SP_LoanPrtList_RX", paramInfo_P, Nothing)
			
		if not rs.EOF then
			Response.Write "<root totalCnt="""& DBCls.GetValue(paramInfo_P, "@listCnt") & """>"
			Response.Write rs(0)
			Response.Write "</root>"
		else
			Response.Write "<root totalCnt='0'></root>"
		end	if	

    elseif cmd = "SET" then

    	Dim paramInfo_DS(3)

		paramInfo_DS(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")						
		paramInfo_DS(1) = DBCls.MakeParam("@dsp_idx", adInteger, adParamInput, 50, dsp_idx)
		paramInfo_DS(2) = DBCls.MakeParam("@mp_idx_Arr", adVarChar, adParamInput, 1000, mp_idx_Arr)
		paramInfo_DS(3) = DBCls.MakeParam("@rankNum", adInteger, adParamInput, 0, rankNum)

		Set rs = DBCls.ExecSPReturnRS("M05_SP_DspPrt_C", paramInfo_DS, Nothing)

        Response.Write "<root return='" & DBCls.GetValue(paramInfo_DS, "RETURN_VALUE") & "'></root>"

    elseif cmd = "DEL" then

    	Dim paramInfo_DD(2)

		paramInfo_DD(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")						
		paramInfo_DD(1) = DBCls.MakeParam("@dsp_idx", adInteger, adParamInput, 50, dsp_idx)
		paramInfo_DD(2) = DBCls.MakeParam("@mp_idx_Arr", adVarChar, adParamInput, 1000, mp_idx_Arr)

		Set rs = DBCls.ExecSPReturnRS("M05_SP_DspPrt_D", paramInfo_DD, Nothing)

        Response.Write "<root return='" & DBCls.GetValue(paramInfo_DD, "RETURN_VALUE") & "'></root>"


    end if
		
	DBCls.Dispose
	Set DBCls = Nothing
    
%>

<%
'	Call AspErrorMsg(Err)
%>

