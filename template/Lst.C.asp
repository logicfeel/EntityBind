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
    'On Error Resume Next 
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
	
	Dim  selPage, listCnt, sto_id
	selPage			= Request("selPage")
	listCnt			= Request("listCnt")	        	
	sto_id			= Request("sto_id")	        	

	'param = "?cmd=SELECT&selPage=1&listCnt=10&sto_id=S00001"
	'########## Request 필수사항 검사 ##########
	if len(cmd) <= 0 then
		Response.Write "<root totalCnt='0'>1</root>"
	end if
%>
<!-- #include virtual="/A-CMN/DBUtils_Cls.asp" -->
<!-- #include virtual="/A-Back/CMN/ModuleCMN_Fnc.asp" -->
<%
	'########## DB Process ##########
	Dim strSQL, strSqlOrderby, DBCls, rs
	Set DBCls = new DBUtils_cls

	' $$ entity_model_sp : LIST
	if cmd = "SELECT" then

		Dim paramInfo_S(4)
		paramInfo_S(0) = DBCls.MakeParam("RETURN_VALUE", adInteger, adParamReturnValue, , "")	
		paramInfo_S(1) = DBCls.MakeParam("@sto_id", adChar, adParamInput, 6, sto_id)
		paramInfo_S(2) = DBCls.MakeParam("@selPage", adInteger, adParamInput, 0, selPage)
		paramInfo_S(3) = DBCls.MakeParam("@lineCnt", adInteger, adParamInput, 0, listCnt)
		paramInfo_S(4) = DBCls.MakeParam("@listCnt",adInteger,adParamOutput, 0,0)

		Set rs = DBCls.ExecSPReturnRS("M03_SP_NoticeList_RX", paramInfo_S, Nothing)
			
		if not rs.EOF then
			Response.Write "<root totalCnt="""& DBCls.GetValue(paramInfo_S, "@listCnt") & """>"
			Response.Write rs(0)
			Response.Write "</root>"
		else
			Response.Write "<root totalCnt='0'></root>"
		end	if		
%>
<%
	end if
	
	DBCls.Dispose
	Set DBCls = Nothing
%>
<%
'	Call AspErrorMsg(Err)
%>




