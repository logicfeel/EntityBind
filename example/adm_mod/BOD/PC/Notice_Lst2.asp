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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/bod/notice_Lst.asp#none
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
    <title>Admin</title>
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
                        <th scope="row">상위공지 여부 </th>
                        <td>
                            <label class="gLabel"><input type="radio" name="real_type" value="A" checked class="fChk" /> 일반</label>
                            <label class="gLabel"><input type="radio" name="real_type" value="R" class="fChk" /> 상위공지</label>
                        </td>
                        <th scope="row">팝업 여부 </th>
                        <td>
                            <label class="gLabel"><input type="radio" name="real_type" value="A" checked class="fChk" /> 팝업</label>
                            <label class="gLabel"><input type="radio" name="real_type" value="R" class="fChk" /> 상위공지</label>
                        </td>

                    </tr>
                    <tr>
                        <th scope="row">제목</th>
                        <td  colspan="3">
                            <input type="text" id="keyword" name="name_corp_tel_hp" value="" class="fText" style="width:200px;" />
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
                <a href="#none" id="btn_Insert" class="btnNormal"><span> 등록</span></a>
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
		            <col class="date">
                    <col style="width:auto">
		            <col style="width:auto">
		            <col style="width:auto">
		            <col style="width:auto">
		        </colgroup>
		        <!--###############  검색 제목 Block ###############-->
		        <thead>
		            <tr>
		                <th scope="col"><strong>순번</strong></th>
		                <th scope="col"><strong>작성일자</strong></th>
                        <th scope="col"><strong>제목</strong></th>
		                <th scope="col"><strong>작성자</strong></th>
		                <th scope="col"><strong>상위공지여부</strong></th>
		                <th scope="col"><strong>팝엽여부</strong></th>
                        <th scope="col"><strong>처리</strong></th>
		            </tr>
		        </thead>
				
				<!--###############  검색 본문 Block ###############-->
				<tbody class="center" id="notice-list-body">

                <script id="notice-list-template" type="text/x-handlebars-template">
                    {{#rows}}
                    <tr class="">
                            <td>{{row_count}}</td>
                            <td>{{date_cut create_dt}}</td>			            	
                            <td>{{title}}</td>
                            <td>{{writer}}</td>
                            <td>{{top_yn}}</td>
                            <td>{{popup_yn}}</td>
                            <td><a href="javascript:goForm('{{ntc_idx}}');" class='btnNormal'><span> 조회</span></a></td>
                        </tr>
                    {{/rows}} 
                </script>           
                    <!--###############  검색 없음 Block ###############-->
					<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>
				</tbody>
			
			</table>

	    </div>
	    
	    <!--###############  페이지 Block ###############-->
	    <div id="CPage" class="mPaginate">
<!--
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>이전</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>1</span></a>
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
<script src="/Common/js/_w-meta-1.4.0.js?aaaa"></script>
<script src="/Common/js/page-view.js?aa"></script>
<script src="/Admin/adm_cmn/DI/base-di.js?a"></script>
<!--<script src="/Admin/adm_mod/BOD/DI/notice-list-page-di.js?aaaaaa"></script>-->
<script src="/Module/BOD/DI/notice-list-page-di.js?aaaaaa"></script>
<script>
	//--------------------------------------------------------------
	// 1. 네임스페이스 정의 및 생성
	var BindModelListAjax       = _W.Meta.Bind.BindModelListAjax;
	var NoticeListDI            = _W.Meta.Bind.NoticeListDI;
	var ItemDOM                 = _W.Meta.Entity.ItemDOM;

</script>

<script>

	var bm = new BindModelListAjax(new NoticeListDI(), true, ItemDOM);

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
	bm.baseUrl = "/Admin/adm_mod/BOD/Notice.C.asp";         // **요약가능** : 기본경로 설정
	bm.prop["__frmURL"] = "Notice_Frm.asp";
	bm.prop["__isGetLoad"] = false;						    // GetLoad 방식

	//--------------------------------------------------------------    
	// 3. 아이템 등록 및 설정(추가)
	bm.addItem("cmd", "LIST", [], "bind");                  // **요약가능** : 전역 아이템에 추가

	//--------------------------------------------------------------    
	// 6. 외부 호출 함수 구현
	function goForm(p_idx) {								// **요약가능** NoticeListDI.goForm() 정적 메소드로 가능 
		var url = bm.prop["__frmURL"];
		location.href = url + "?mode=EDIT&ntc_idx=" + p_idx;
	}
		
	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
		bm.init();
	});

</script>



</body>
</html>            