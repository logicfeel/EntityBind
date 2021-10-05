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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/prt/product_Lst.asp#none
'
'******************************************************************************
%>
<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Define.I.asp"-->
<%	


	
%><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="copyright" content="Copyright(c) White Lab Inc. All Rights Reserved." />
    <title>OnStory Admin</title>
    <link rel="stylesheet" type="text/css" href="/css/suio.css" media="screen" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/css/layout.css" media="screen" charset="utf-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		
    
    <script language="javascript" src="/Common//JS/jquery.xml2json.js"></script>
	<script language="javascript" src="/Common/JS/Common.js"></script>
	<script language="javascript" src="/Admin/adm_cmn/js/admin_common.js?v2"></script>

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
                        <th scope="row">상품명, 키워드</th>
                        <td colspan="3">
                            <input type="text" id="m-keyword"  value="" class="fText" style="width:200px;" />
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
	            <p class="total">검색결과 <strong id="s-txt-sumPrtCnt">0</strong>건</p>
	            <!--
                <strong class="icoStatus positive"></strong> 무통장
	            <span class="icoMobile">기업회원</span> PG
                -->
            </div>
	        <div class="gRight">
	            <select  id="sel_Pagesize" name="m-page_size_prt" class="fSelect">
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
                <a href="#none" id="btn_Show" class="btnCtrl eBatchExposure"><span>진열설정</span></a>
	        </div>
	        <div class="gRight">
                검색결과
            </div>
	    </div>
	    <div class="mBoard gCellNarrow">
	        <table border="1" summary="" class="eChkColor">
		        <caption>목록</caption>
		        <!--###############  제목 크기 Block ###############-->
		        <colgroup>
		            <col class="chk">
		            <col class="date">
                    <col style="width:auto">
		            <col style="width:auto">
		            <col style="width:auto">
	            	<col style="width:auto">
		            <col style="width:auto">
		        </colgroup>
		        <!--###############  검색 제목 Block ###############-->
		        <thead>
		            <tr>
		                <th scope="col"><input id="btn_allChk" type="checkbox" name="Allselect" class="allChk"></th>
		                <th scope="col">
		                    <strong>순번</strong>
                        </th>
		                <th scope="col">
		                    <strong>상품종류</strong>
		                </th>
                        <th scope="col">
		                    <strong>상품명(브랜드)</strong>
		                </th>
		                <th scope="col">
		                    <strong>상품옵션</strong>
		                </th>
                        <th scope="col">
		                    <strong>판매가(기본)</strong>
		                </th>                        
		                <th scope="col">
		                    <strong>판매상태</strong> 
		                </th>
		            </tr>
		        </thead>
                <tbody class="center" id="s-area-prt">
					<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>
				</tbody>
				<script id="s-temp-prt" type="text/x-handlebars-template">
                    {{#rows}}
                    <tr class="">
                        <td><input name='s-show_prt_id' type='checkbox' class='rowChk _product_no' value='{{prt_id}}'></td>
                        <td>{{row_count}}</td>
                        <td>{{type_code type_cd}}</td>
                        <td>{{prtName}}</td>
                        <td>{{default_opt}}</td>
						<td>{{kind_code kind_cd}}</td>
						<td>{{state_code state_cd}}</td>
                    </tr>
                    {{/rows}} 
                </script>
			
			</table>
			<!--###############  검색 없음 Block ###############-->
<!--
	        <p class="empty" style="display:block;">검색된 자료가 없습니다.</p>
--> 
	    </div>
	    
	    <!--###############  페이지 Block ###############-->
	    <div id="s-area-page-prt" class="mPaginate"></div>
	</div>

<div class="section" id="QA_level2">
	    <div class="mState">
	        <div class="gLeft">
	            <p class="total">검색결과 <strong id="s-txt-sumCnt">0</strong>건</p>
	                    </div>
	        <div class="gRight">
	            <select name="m-dsp_id"class="fSelect">
	                <option value="1" selected>=== 카테고리선택 ===</option>
	            </select>
	        </div>
	    </div>
	    <div class="mCtrl typeHeader">
	        <div class="gLeft">
                <a href="#none" id="btn_Hide" class="btnNormal"><span><em class="icoDel"></em> 선택 진열 삭제</span></a>
	        </div>
	        <div class="gRight">
                진열된 카테고리를 선택해 주세요.
            </div>
	    </div>
	    <div class="mBoard gCellNarrow">
	        <table border="1" summary="" class="eChkColor">
		        <caption>목록</caption>
		        <!--###############  제목 크기 Block ###############-->
		        <colgroup>
		            <col class="chk">
		            <col class="date">
                    <col style="width:auto">
		            <col style="width:auto">
		            <col style="width:auto">
	            	<col style="width:auto">
		            <col style="width:auto">
		        </colgroup>
		        <!--###############  검색 제목 Block ###############-->
		        <thead>
		            <tr>
		                <th scope="col"><input id="btn_allChk" type="checkbox" name="Allselect" class="allChk"></th>
		                <th scope="col">
		                    <strong>순번</strong>
                        </th>
                        <th scope="col">
		                    <strong>상품명(브랜드)</strong>
		                </th>
		                <th scope="col">
		                    <strong>상품옵션</strong>
		                </th>
                        <th scope="col">
		                    <strong>판매가(기본)</strong>
		                </th>                        
                        <th scope="col">
		                    <strong>진열순서</strong>
		                </th>
		                <th scope="col">
		                    <strong>처리</strong> 
		                </th>
		            </tr>
		        </thead>
				
                <tbody class="center" id="s-area-list">
					<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>
				</tbody>
				<script id="s-temp-list" type="text/x-handlebars-template">
                    {{#rows}}
                    <tr class="">
                        <td>
                            <input type="hidden" name="s-prt_id" row_count="{{row_count}}" value="{{prt_id}}"  />
                            <input name='s-hide_prt_id' type='checkbox' class='rowChk _product_no' value='{{prt_id}}'>
						</td>
                        <td>{{row_count}}</td>
                        <td>{{prtName}}</td>
                        <td>{{default_opt}}</td>
						<td>{{state_code state_cd}}</td>
                        <td><input type="text" name="s-rank_it" row_count="{{row_count}}" value="{{rank_it}}" class="fText" style="width:50px;" /></td>
                        <td><p onClick="dspPrt.fn.procUpdate('{{row_count}}');" class='btnNormal'><span> 수정 </span></p>&nbsp;</td>
                    </tr>
                    {{/rows}} 
                </script>    
			
			</table>
			<!--###############  검색 없음 Block ###############-->
<!--
	        <p class="empty" style="display:block;">검색된 자료가 없습니다.</p>
--> 
	    </div>
	    
	    <!--###############  페이지 Block ###############-->
	    <div id="CPage2" class="mPaginate">
<!--
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>이전</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>1</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>2</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>다음</span></a>
-->
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
<script src="/Common/js/_w-meta-1.6.0.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/PRT/Service/product-display-prt-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var dspPrt = new _W.BindModelAjax(new ProductDisplayPrtService());

    // 속성 설정
	dspPrt.isLog = true;
    dspPrt.bindCount = 0;

    // 이벤트 바인딩
	$('#btn_Search').click(dspPrt.fn.searchPrtList);            // 상품 검색
	$('#btn_Reset').click(dspPrt.fn.resetForm);                 // 입력폼 초기화
    $('#sel_Pagesize').change(dspPrt.fn.changePagesize);        // 상품 페이지 크기 변경
	$('select[name=m-dsp_id').change(dspPrt.fn.changeDspId);    // 진열카테고리 선택
    $('#btn_Show').click(dspPrt.fn.showProduct);                // 진열 설정
    $('#btn_Hide').click(dspPrt.fn.hideProduct);                // 진열 해제
    
    //--------------------------------------------------------------
	$(document).ready(function () {
        dspPrt.init();
		dspPrt.fn.procPrtList();
		dspPrt.fn.procDisplayList();
    });
	console.log("______________ $.ready()");
</script>


</body>
</html>            