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
	
	'$$ entity_items : U    (U)가 포함적이기 때문에 U 만 받으면됨  (*isInside 제외 됨)
	Dim  sto_id, ntc_idx
	sto_id			= Request("sto_id")
	ntc_idx			= Request("ntc_idx")	        	

	Dim title, noticeType_cd, writer, content
  	title			= Request("title")	        	
  	noticeType_cd	= Request("noticeType_cd")	        	
  	writer			= Request("writer")	        	 
  	content			= Request("content")	        	

	'########## Request 필수사항 검사 ##########
	if len(cmd) <= 0 then
		Response.Write "<root totalCnt='0' return='5'></root>"
        Response.End 
	end if

	if cmd = "INSERT" OR cmd = "UPDATE" then
		'$$ entity_valid : U + I  교집합
		if len(title) <= 0 OR len(writer) <= 0 OR len(noticeType_cd) <= 0 then
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

	if cmd = "SELECT" then

		'$$ entity_model_sp : SELECT
		Dim paramInfo_S(1)

		paramInfo_S(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")						
		paramInfo_S(1) = DBCls.MakeParam("@ntc_idx", adInteger, adParamInput, 0, ntc_idx)

		Set rs = DBCls.ExecSPReturnRS("M03_SP_Notice_RX", paramInfo_S, Nothing)

		if not rs.EOF then
			Response.Write "<root totalCnt='1'>"
            Response.Write rs(0)
			Response.Write "</root>"
		else
		    Response.Write "<root totalCnt='0'></root>"
		End	if		


    elseif cmd = "INSERT" then

		'$$ entity_model_sp : INSERT
    	Dim paramInfo_I(5)

		paramInfo_I(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")						
		paramInfo_I(1) = DBCls.MakeParam("@sto_id", adChar, adParamInput, 6, sto_id)
		paramInfo_I(2) = DBCls.MakeParam("@title", adVarChar, adParamInput, 100, title)
    	paramInfo_I(3) = DBCls.MakeParam("@writer", adVarChar, adParamInput, 20, writer)
        paramInfo_I(4) = DBCls.MakeParam("@content", adVarChar, adParamInput, 2000, content)
        paramInfo_I(5) = DBCls.MakeParam("@noticeType_cd", adVarChar, adParamInput, 1, noticeType_cd)

		Set rs = DBCls.ExecSPReturnRS("M03_SP_Notice_C", paramInfo_I, Nothing)

        Response.Write "<root return='" & DBCls.GetValue(paramInfo_I, "RETURN_VALUE") & "'></root>"
        
    elseif cmd = "UPDATE" then

		'$$ entity_model_sp : UPDATE
		Dim paramInfo_U(5)
		
		paramInfo_U(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")						
		paramInfo_U(1) = DBCls.MakeParam("@ntc_idx", adInteger, adParamInput, 0, ntc_idx)
		paramInfo_U(2) = DBCls.MakeParam("@title", adVarChar, adParamInput, 100, title)
    	paramInfo_U(3) = DBCls.MakeParam("@writer", adVarChar, adParamInput, 20, writer)
        paramInfo_U(4) = DBCls.MakeParam("@content", adVarChar, adParamInput, 2000, content)
        paramInfo_U(5) = DBCls.MakeParam("@noticeType_cd", adVarChar, adParamInput, 1, noticeType_cd)

		Set rs = DBCls.ExecSPReturnRS("M03_SP_Notice_U", paramInfo_U, Nothing)

        Response.Write "<root return='" & DBCls.GetValue(paramInfo_U, "RETURN_VALUE") & "'></root>"

    elseif cmd = "DELETE" then

		'$$ entity_model_sp : UPDATE
		Dim paramInfo_D(1)

		paramInfo_D(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")						
		paramInfo_D(1) = DBCls.MakeParam("@ntc_idx", adInteger, adParamInput, 0, ntc_idx)

		Set rs = DBCls.ExecSPReturnRS("M03_SP_Notice_D", paramInfo_D, Nothing)
			
        Response.Write "<root return='" & DBCls.GetValue(paramInfo_D, "RETURN_VALUE") & "'></root>"

    end if
		
	DBCls.Dispose
	Set DBCls = Nothing
    
'$$ 아래부분 필요시 컨텍스트에 별도 분기 삽입

%>

<!--#include virtual="/api/Naver_Cls.asp"-->
<%

if cmd = "INSERT" OR cmd = "UPDATE" then
	Dim objSyndi : Set objSyndi = New NaverSyndi_Class
	Dim r 
	Call objSyndi.Send(ntc_idx, 1)
	Set objSMS = Nothing
	
end if	
%>

<%
'	Call AspErrorMsg(Err)
%>