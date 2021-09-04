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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/ord/order_lst.asp#none
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
                        <th scope="row">주문상태 </th>
                        <td colspan="3">
                            <label class="gLabel"><input type="radio" name="m-state_cd" value="" checked class="fChk" /> 전체</label>
                            <label class="gLabel"><input type="radio" name="m-state_cd" value="PW" class="fChk" /> 결제대기</label>
                            <label class="gLabel"><input type="radio" name="m-state_cd" value="PF" class="fChk" /> 주문완료</label>
							<label class="gLabel"><input type="radio" name="m-state_cd" value="RW" class="fChk" /> 환불대기</label>
							<label class="gLabel"><input type="radio" name="m-state_cd" value="RF" class="fChk" /> 환불완료</label>
                            <label class="gLabel"><input type="radio" name="m-state_cd" value="OC" class="fChk" /> 주문취소</label>
                            <label class="gLabel"><input type="radio" name="m-state_cd" value="CR" class="fChk" /> 취소요청</label>
                           	<label class="gLabel"><input type="radio" name="m-state_cd" value="CW" class="fChk" /> 반품대기</label>
                            <label class="gLabel"><input type="radio" name="m-state_cd" value="CT" class="fChk" /> 취소대기</label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주문자명,수령인,연락처</th>
                        <td>
                            <input type="text" id="m-keyword" name="name_corp_tel_hp" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">결제방식</th>
                        <td>
							<label class="gLabel"><input type="checkbox" id="pay_method_B" name="m-pay_method" value="B" class="fChk" checked> 무통장</label>
                            <label class="gLabel"><input type="checkbox" id="pay_method_P" name="m-pay_method" value="P" class="fChk" checked> PG</label>
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
	            <p class="total">검색결과 <strong id="s-txt-sumCnt">0</strong>건</p>
	            <strong class="icoStatus positive"></strong> 무통장
	            <span class="icoMobile">기업회원</span> PG
            </div>
	        <div class="gRight">
	            <select id="sel_Pagesize" name="m-page_size" class="fSelect">
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
                <a href="#none" id="btn_Update" class="btnCtrl eBatchExposure"><span>주문실패 정상처리</span></a>
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
		            <col style="width:60px">
	            	<col style="width:60px">
		            <col style="width:100px">
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
				<tbody class="center" id="s-area-list">
    				<tr><td colspan='9' align='center'>자료가 없습니다.</td></tr>
				</tbody>

				<script id="s-temp-list" type="text/x-handlebars-template">
                    {{#rows}}
					<tr class="">
			            <td><input name="chk_idx" type="checkbox" class="rowChk _product_no" value="" is_display="F" is_selling="F"></td>
						<td>{{create_dt}}</td>			            	
			            <td><a href="javascript:ord.fn.moveEdit('{{ord_id}}');">{{bold orderName}}</a></td>
			            <td>{{deli_info}}</td>
			            <td>{{orderTel}}</td>
						<td>{{code_br prt_info "||"}}</td>
						<td>{{pay_state}}</td>
						<td class="txtCode">
                            <!--<strong class="icoStatus positive"></strong>-->{{ord_state}}
                        </td>
						<td>{{pay_view pay_method_cd}} {{comma_num order_mn}}</td>
				    </tr>
                    {{/rows}} 
				</script> 					
			
			</table>
			<!--###############  검색 없음 Block ###############-->

	    </div>
	    
	    <!--###############  페이지 Block ###############-->
	    <div id="s-area-page" class="mPaginate"></div>

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

<!--
<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.5.0.js?<%=g_iRandomID%>"></script>
<script src="/Common/js/page-view.js??<%=g_iRandomID%>"></script>
<script src="/Module/base/base-admin-svc.js?<%=g_iRandomID%>"></script>
<script>
	//--------------------------------------------------------------
	// 1. 네임스페이스 정의 및 생성
	var BindModelAjax   		= _W.Meta.Bind.BindModelAjax;
	var ItemDOM        			= _W.Meta.Entity.ItemDOM;
    var BindCommandEditAjax     = _W.Meta.Bind.BindCommandEditAjax;
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;

    var page 					= new PageView("page", 10);
	var bm              		= new BindModelAjax(ItemDOM);
    var service                 = new BaseService(bm);

    bm.setService(service);

    bm.list     				= new BindCommandLookupAjax(bm, bm._baseEntity);

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
	bm.baseUrl = "/Admin/adm_mod/ORD/Order.C.asp";
	bm.prop["__frmURL"] = "Order_Frm.asp";
	bm.prop["__isGetLoad"] = false;						    // GetLoad 방식

	// 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
	$("#keyword").val( decodeURI(getArgs("" /*서버측값*/, getParamsToJSON(location.href).keyword )) );        
	page.page_count = Number( getArgs("" /*서버측값*/, getParamsToJSON(location.href).page_count, page.page_count) );

	//page.callback = page.goPage.bind(bm.list.bind);         // 2-2) GET 방식 (bind)
	page.callback = bm.list.execute.bind(bm.list);      // 1) 콜백 방식

	//--------------------------------------------------------------    
	// 3. 아이템 등록 및 설정(추가)
	bm.addItem("cmd", "LIST", [], "bind");                  // **요약가능** : 전역 아이템에 추가
	
    bm.list.add(new ItemDOM("state_cd",     null, { getter: function() { return $("input[name='state_cd']:checked").val(); } }), "bind");
	bm.list.add(new ItemDOM("keyword",      null, { getter: function() { return $("#keyword").val(); } }), "bind");
    bm.list.add(new ItemDOM("page_size",    null, { getter: function() { return page.page_size; } }), "bind");
    bm.list.add(new ItemDOM("page_count",   null, { getter: function() { return page.page_count; } }), "bind");
    bm.list.add(new ItemDOM("sort_cd",      null, ""), "bind");

	//--------------------------------------------------------------    
    // 4. 콜백 함수 구현
	var template                = Handlebars.compile( $("#list-template").html() );
    
    Handlebars.registerHelper('date_cut', function (p_date) {
		return p_date.substring(0, 10);
    });
    Handlebars.registerHelper('comma_num', function (p_nmber) {
        return numberWithCommas(p_nmber) + " 원";
    });
    Handlebars.registerHelper('code_br', function (p_text, p_code) {
        return new Handlebars.SafeString(p_text.replace(p_code, '<br>'));
    });
    Handlebars.registerHelper("bold", function(text) {
    var result = "<b>" + Handlebars.escapeExpression(text) + "</b>";
    return new Handlebars.SafeString(result);
    });
    // cbOutput    
    bm.list.cbOutput  = function(p_entity) {
		var row_total   = p_entity.table["row_total"];

		$("#totalView").html(row_total);
		$("#list-body").html("");
		$('#list-body').append( template(p_entity.table) );
		$("#CPage").html(page.parser(row_total));
	};
	//--------------------------------------------------------------    
	// 5. 이벤트 등록
	$("#btn_Search").click(function () {
		page.page_count = 1;
		bm.list.execute();
	});
	$("#btn_Reset").click(function () {
		$("form").each(function() {
			this.reset();
		});
	});
	$("#page_size").change(function () {
		page.page_size = $("#page_size").val();
		page.page_count = 1;
		bm.list.execute();
	});
	//--------------------------------------------------------------    
	// 6. 외부 호출 함수 구현
	function goForm(p_idx) {
		var url = "Order_Edt.asp";
		location.href = url + "?mode=EDIT&rtnURL=Order_All_Lst.asp&ord_id=" + p_idx;
	}
		
	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
		bm.init();
        
        bm.list.execute();
	});

	// 디버깅용
	// bm.list.cbBind = function(p_a) {
    //     console.log('list.cbBind')
	// };
	// bm.cbError = function(p_a) {
    //     console.log('list.cbError')
    // };
</script>
-->

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/ORD/Service/order-list-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var ord = new _W.BindModelAjax(new OrderListService());
	
    this.isLog = true;  // 디버깅 모드

	// 속성 설정
	ord.prop["__listUrl"] = "order_All_Lst.asp";
	ord.prop["__formUrl"] = "order_Edt.asp";
	ord.prop['__isGetLoad'] = false;
    ord.items["cmd"].value = "LIST";

	// 이벤트 바인딩
	$('#btn_Search').click(ord.fn.searchList);
	$('#sel_Pagesize').change(ord.fn.changePagesize);
	$('#btn_Reset').click(ord.fn.resetForm);
    //--------------------------------------------------------------
	$(document).ready(function () {
        ord.init();
		ord.fn.procList();
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>


</body>
</html>            