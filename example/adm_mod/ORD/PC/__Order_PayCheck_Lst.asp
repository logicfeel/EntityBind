<% @CODEPAGE="65001" language="VBScript" %>
<%
'******************************************************************************
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
'   확인
'   http://rtwgs4.cafe24.com/Admin/pc/mod/sto/account_Frm.asp?cmd=INSERT
'
'******************************************************************************
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Define.I.asp"-->
<%	


	
%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="copyright" content="Copyright(c) White Lab Inc. All Rights Reserved." />
    <title>OnStory Admin</title>
    <link rel="stylesheet" type="text/css" href="/css/suio.css" media="screen" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/css/layout.css" media="screen" charset="utf-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		
    <script src="/Common/js/jquery.xml2json.js"></script>
	<script src="/Common/js/common.js?a"></script>
	<script src="/Admin/adm_cmn/js/admin_common.js?v2"></script>
    
</head>
<body>

<div style="width:1020px">   


    <form id="frm_default" name="frm_default" method="post">
                
	<!--###############  검색 조건 Block ###############-->

	<div class="section" id="QA_profile1">
  		<div>&nbsp;</div>
        <div>&nbsp;</div>                        
        <div class="optionArea">
            <div class="mOption" style="display: block;">
                <table border="1" summary="">
                    <caption>회원정보 조회</caption>
                    <colgroup>
                        <col style="width:154px;*width:135px;" />
                        <col style="width:auto;" />
                        <col style="width:154px;*width:135px;" />
                        <col style="width:auto;" />
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">주문자명,수령인,연락처</th>
                        <td>
                            <input type="text" id="name_corp_tel_hp" name="name_corp_tel_hp" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">결제방식</th>
                        <td>
                            <label class="gLabel"><input type="checkbox" id="dealType_P" name="dealType_cd" value="P" class="fChk" checked> 무통장</label>
                            <label class="gLabel"><input type="checkbox" id="dealType_C" name="dealType_cd" value="C" class="fChk" checked> 주문실패</label>
                        </td>                        
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
		<!--###############  검색 버튼 Block ###############-->
		<div class="mButton gCenter">
		    <a href="#none" id="btn_Search" class="btnSearch"><span>검색</span></a>
		    <a href="#none" id="btn_Reset" class="btnSearch reset"><span>초기화</span></a>
		</div>

    </div>

	<!--###############  검색 결과 Block ###############-->
	<div class="section" id="QA_level2">
	    <div class="mState">
	        <div class="gLeft">
	            <p class="total">검색결과 <strong id="totalView">0</strong>건</p>
	            <strong class="icoStatus positive"></strong> 무통장
	            <span class="icoMobile">기업회원</span> PG
            </div>
	        <div class="gRight">
	            <select id="listCnt" name="listCnt" class="fSelect">
	                <option value="10" selected>10개씩보기</option>
	                <option value="20">20개씩보기</option>
	                <option value="30">30개씩보기</option>
	                <option value="50">50개씩보기</option>
	                <option value="100">100개씩보기</option>
	            </select>
	        </div>
	    </div>
	    <div class="mCtrl typeHeader">
	        <div class="gLeft">
<!--
	            <a href="#none" id="btn_Insert" class="btnCtrl eBatchExposure"><span>무통장 입금확인</span></a>
                <a href="#none" id="btn_Update" class="btnCtrl eBatchExposure"><span>정상처리(무통장)</span></a>
	            <a href="#none" id="btn_Delete" class="btnNormal"><span><em class="icoDel"></em> 주문 삭제</span></a>
-->
	        </div>
	        <div class="gRight">
                <a href="#none" id="btn_Excel" title="새창 열림" class="btnNormal"><span><em class="icoXls"></em> 엑셀다운로드<em class="icoLink"></em></span></a>
            </div>
	    </div>
	    <div class="mBoard gCellNarrow">
	        <table border="1" summary="" class="eChkColor">
		        <caption>목록</caption>
		        <!--###############  제목 크기 Block ###############-->
		        <colgroup>
		            <col class="chk">
		            <col style="width:120px">
                    <col style="width:80px">
		            <col style="width:130px">
					<col style="width:120px">
		            <col style="width:auto">
		            <col style="width:80px">
	            	<col style="width:80px">
		            <col style="width:80px">
		        </colgroup>
		        <!--###############  검색 제목 Block ###############-->
		        <thead>
		            <tr>
		                <th scope="col"><input id="btn_allChk" type="checkbox" name="Allselect" class="allChk"></th>
		                <th scope="col">
		                    <strong>주문일자</strong>
                        </th>
		                <th scope="col">
		                    <strong>주문자</strong>
		                </th>
						<th scope="col">
		                    <strong>수령인</strong>
		                </th>
		                <th scope="col">
		                    <strong>주문 연락처</strong>
		                </th>
		                <th scope="col">
		                    <strong>상품명</strong>
		                </th>
		                <th scope="col">
		                    <strong>결제상태</strong>
		                </th>
						<th scope="col">
		                    <strong>주문상태</strong>
		                </th>
		                <th scope="col">
		                    <strong>주문금액</strong>
		                </th>
		            </tr>
		        </thead>
				
				<!--###############  검색 본문 Block ###############-->
                <tbody class="center" id="list-body">
				<script id="list-template" type="text/x-handlebars-template">
                    {{#rows}}
			        
					<tr class="">
			            <td><input name="chk_idx" type="checkbox" class="rowChk _product_no" value="" is_display="F" is_selling="F"></td>
						<td>{{create_dt}}</td>			            	
			            <td><a href="javascript:goForm('{{ord_id}}');">{{bold orderName}}</a></td>
			            <td>{{deli_info}}</td>
			            <td>{{orderTel}}</td>
						<td>{{code_br prt_info "||"}}</td>
						<td style="color:red;">{{pay_state}}</td>
						<td class="txtCode">
                            <!--<strong class="icoStatus positive"></strong>-->{{ord_state}}
                        </td>
						<td>{{comma_num order_mn}}</td>
				    </tr>
                    {{/rows}} 
				</script> 					
					<tr><td colspan='9' align='center'>자료가 없습니다.</td></tr>
				</tbody>

			</table>
			<!--###############  검색 없음 Block ###############-->
<!--
	        <p class="empty" style="display:block;">검색된 자료가 없습니다.</p>
-->
	    </div>
	    
	    <!--###############  페이지 Block ###############-->
	    <div id="CPage" class="mPaginate">

	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>이전</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>1</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>다음</span></a>

	    </div>
	</div>

	<!--###############  처리중 Block ###############-->
	<div class="mLoading typeStatic">
	    <p>처리중입니다. 잠시만 기다려 주세요.</p>
	    <img src="http://img.echosting.cafe24.com/suio/ico_loading.gif" alt="" />
	</div>
	
	<!--###############  페이지 Block ###############-->
	<!-- 도움말 영역 -->

	<!-- //도움말 영역 -->
    </form>
    <!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">-->
<style>
	.w3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:20}    
	.w3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}
	.w3-animate-opacity{animation:opac 0.8s}@keyframes opac{from{opacity:0} to{opacity:1}}
	.w3-animate-top{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}
	.w3-animate-left{position:relative;animation:animateleft 0.4s}@keyframes animateleft{from{left:-300px;opacity:0} to{left:0;opacity:1}}
	.w3-animate-right{position:relative;animation:animateright 0.4s}@keyframes animateright{from{right:-300px;opacity:0} to{right:0;opacity:1}}
	.w3-animate-bottom{position:relative;animation:animatebottom 0.4s}@keyframes animatebottom{from{bottom:-300px;opacity:0} to{bottom:0;opacity:1}}
	.w3-animate-zoom {animation:animatezoom 0.6s}@keyframes animatezoom{from{transform:scale(0)} to{transform:scale(1)}}
	.w3-animate-input{transition:width 0.4s ease-in-out}.w3-animate-input:focus{width:100%!important}
	.w3-opacity,.w3-hover-opacity:hover{opacity:0.60}.w3-opacity-off,.w3-hover-opacity-off:hover{opacity:1}
</style>
	<div id="part_Overlay" class="w3-overlay w3-animate-opacity" style="cursor:pointer;z-index:90;"></div>

</div>        


<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.5.0.js?<%=g_iRandomID%>"></script>
<script src="/Common/js/page-view.js??<%=g_iRandomID%>"></script>
<script src="/Module/base/base-admin-svc.js?<%=g_iRandomID%>"></script>
<script src="/Module/ORD/Service/order-list-svc.js?<%=g_iRandomID%>"></script>
<script>
	//--------------------------------------------------------------
	// 1. 네임스페이스 정의 및 생성
	var BindModelAjax   = _W.Meta.Bind.BindModelAjax;
	var ItemDOM         = _W.Meta.Entity.ItemDOM;

	var bm              = new BindModelAjax(ItemDOM);
    var service         = new OrderListService(bm);
    
    bm.setService(service, true);

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
	bm.baseUrl = "/Admin/adm_mod/ORD/Order.C.asp";
    bm.prop["__isGetLoad"] = false;						    // GetLoad 방식
    bm.prop["__listURL"] = "Order_PayCheck_Lst.asp";
    bm.items["state_cd"].value = "PW";

	//--------------------------------------------------------------    
	// 6. 외부 호출 함수 구현
	function goForm(p_idx) {								// **요약가능** NoticeListDI.goForm() 정적 메소드로 가능 
		var url = bm.prop["__listURL"];
		location.href = "order_Edt.asp?mode=EDIT&ord_id=" + p_idx + "&rtnURL=" + url;
	}
		
	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
		bm.init();

        bm.list.execute();
	});

</script>

</body>
</html>            