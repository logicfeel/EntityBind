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
                            <input type="text" id="name_corp_tel_hp" name="name_corp_tel_hp" value="" class="fText" style="width:200px;" />
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
	            <select id="page_size" name="listCnt" class="fSelect">
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
				
				<!--###############  검색 본문 Block ###############-->
				<tbody class="center" id="CList">
<!--
			        <tr class="">
			            <td><input name="chk_idx" type="checkbox" class="rowChk _product_no" value="" is_display="F" is_selling="F"></td>
						<td>2017-09-01</td>			            	
			            <td>기본상품</td>
			            <td>기본상품</td>
			            <td class="txtCode">
			            	<strong class="icoStatus positive"></strong> 
			            </td>
			            <td>010-222-2222</td>
			            <td>010-222-2222</td>
				    </tr>
				    
-->
					<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>
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
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>2</span></a>
	        <a href="#none" onclick="moveMember(1)" class="btnNormal"><span>다음</span></a>

	    </div>
	</div>

<div class="section" id="QA_level2">
	    <div class="mState">
	        <div class="gLeft">
	            <p class="total">검색결과 <strong id="totalView2">0</strong>건</p>
	                    </div>
	        <div class="gRight">
	            <select id="displayList" name="displayList" class="fSelect">
	                <option value="" selected>=== 카테고리선택 ===</option>
	            </select>
	        </div>
	    </div>
	    <div class="mCtrl typeHeader">
	        <div class="gLeft">
                <a href="#none" id="btn_Hidden" class="btnNormal"><span><em class="icoDel"></em> 선택 진열 삭제</span></a>
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
				
				<!--###############  검색 본문 Block ###############-->
				<tbody class="center" id="CProduct">
<!--
			        <tr class="">
			            <td><input name="chk_idx" type="checkbox" class="rowChk _product_no" value="" is_display="F" is_selling="F"></td>
						<td>2017-09-01</td>			            	
			            <td>기본상품</td>
			            <td>기본상품</td>
			            <td class="txtCode">
			            	<strong class="icoStatus positive"></strong> 
			            </td>
			            <td>010-222-2222</td>
			            <td>010-222-2222</td>
				    </tr>
				    
-->
					<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>
				</tbody>
			
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

<script src="/Common/js/page-view.js?a"></script>
<script src="/Common/js/_w-meta-1.4.0.js"></script>
<script>
    // #######################################################################################################
    //--------------------------------------------------------------
    // 1. 네임스페이스 정의 및 생성
    var BindModelAjax           = _W.Meta.Bind.BindModelAjax;
    var ProductListDelDI        = _W.Meta.Bind.ProductListDelDI;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var BindCommandEditAjax     = _W.Meta.Bind.BindCommandEditAjax;
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;

    var page    = new PageView("page", 10);                         // REVIEW:: 위치 검토 필요
    var page2   = new PageView("page2", 100);                         // REVIEW:: 위치 검토 필요
    var bm      = new BindModelAjax();
    var bm2      = new BindModelAjax();

    bm.list     = new BindCommandLookupAjax(bm, bm._baseEntity);      // 검색
    bm.display  = new BindCommandLookupAjax(bm, bm._baseEntity);      // 진열 카테고리 목록
    bm.show     = new BindCommandEditAjax(bm, bm._baseEntity);        // 진열 설정
    bm.hidden   = new BindCommandEditAjax(bm, bm._baseEntity);        // 진열 해제
    
    bm2.product  = new BindCommandLookupAjax(bm2, bm2._baseEntity);      // 진열된 상품목록

    //--------------------------------------------------------------    
    // 2. 객체 설정 (등록)
    bm.baseAjaxSetup.type = "POST";

    bm.list.url     = "/Admin/adm_mod/PRT/Product.C.asp";
    bm.display.url  = "/Admin/adm_mod/PRT/Display.C.asp";
    bm.show.url     = "/Admin/adm_mod/PRT/DisplayProduct.C.asp";
    bm.hidden.url   = "/Admin/adm_mod/PRT/DisplayProduct.C.asp";
    
    bm2.product.url  = "/Admin/adm_mod/PRT/DisplayProduct.C.asp";
        
    page.callback = bm.list.execute.bind(bm.list);
    page2.callback = bm2.product.execute.bind(bm2.product);
    // page2.page_size = 100;
    //--------------------------------------------------------------    
    // 3. 아이템 등록 및 설정(추가)
    bm.addItem("cmd", "", [], "bind");
    bm.addItem("doctype", "JSON", [], "bind");

    bm2.addItem("cmd", "", [], "bind");
    bm2.addItem("doctype", "JSON", [], "bind");

    // 페이징 수정  21-06-15
    // bm.add(new ItemDOM("keyword",      null, { getter: function() { return $("#name_corp_tel_hp").val(); } }), ['list', 'product'], "bind");
    // bm.add(new ItemDOM("page_size",    null, { getter: function() { return page.page_size; } }), ['list', 'product'], "bind");
    // bm.add(new ItemDOM("page_count",   null, { getter: function() { return page.page_count; } }), ['list', 'product'], "bind");
    // bm.add(new ItemDOM("sort_cd",      null, ""), ['list', 'product'], "bind");

    bm.list.add(new ItemDOM("keyword",      null, { getter: function() { return $("#name_corp_tel_hp").val(); } }), "bind");
    bm.list.add(new ItemDOM("page_size",    null, { getter: function() { return page.page_size; } }), "bind");
    bm.list.add(new ItemDOM("page_count",   null, { getter: function() { return page.page_count; } }), "bind");
    bm.list.add(new ItemDOM("sort_cd",      null, ""), "bind");

    bm.addItem("dsp_id", "1",   ["display", "show", "hidden"],              ["valid", "bind"]);
    bm.addItem("prt_id", "",    ["show", "hidden"],                         ["valid", "bind"]);
        
    bm2.product.add(new ItemDOM("page_size",    null, { getter: function() { return page2.page_size; } }), "bind");
    bm2.product.add(new ItemDOM("page_count",   null, { getter: function() { return page2.page_count; } }), "bind");
    bm2.addItem("dsp_id", "1",   ["product"],   ["valid", "bind"]);

    //--------------------------------------------------------------    
    // 4. 콜백 함수 구현
    bm.list.onExecute       = function(p_bindCommand) { this.bind.items["cmd"].value = "LIST"; };
    bm.display.onExecute    = function(p_bindCommand) { this.bind.items["cmd"].value = "LIST"; };
    bm.show.onExecute       = function(p_bindCommand) { this.bind.items["cmd"].value = "CREATE"; };
    bm.hidden.onExecute     = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };
    bm2.product.onExecute    = function(p_bindCommand) { this.bind.items["cmd"].value = "LIST"; };

    bm.list.cbOutput = function(p_entity) {
        var entity      = this.output;
        var row_total   = p_entity.table["row_total"];
        var numCount    = row_total - ((page.page_count - 1) * page.page_size);     // 개시물 번호 = 전체 갯수 - ((현재페이지 -1) * 리스트수 )
        var strHtml;

        $("#CList").html("");
        $("#totalView").text(row_total);

        if (entity.rows.count === 0) {
            $("#CList").append("<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>");
        } else {
            for (var i = 0, num = numCount; i < entity.rows.count; i++, num--) {
                strHtml = "";
                strHtml = strHtml + "<tr>";
                strHtml = strHtml + "<td><input name='chk_idx_show' type='checkbox' class='rowChk _product_no' value='" + entity.rows[i].prt_id + "'></td>";
                strHtml = strHtml + "<td>" + num + "</td>";
                strHtml = strHtml + "<td>" + getTypeCode(entity.rows[i].type_cd) + "</td>";
                strHtml = strHtml + "<td>" + entity.rows[i].prtName + "</td>";
                strHtml = strHtml + "<td>" + getKindCode(entity.rows[i].kind_cd) + "</td>";
                strHtml = strHtml + "<td>" + entity.rows[i].default_opt + "</td>";
                strHtml = strHtml + "<td>" + getStateCode(entity.rows[i].state_cd) + "</td>";
                strHtml = strHtml + "</tr>";
                $("#CList").append(strHtml); 
            }
            $("#CPage").html(page.parser(row_total));   // 필수 항목만 받음
        }
    };
    bm.display.cbOutput = function(p_entity) {
        var entity      = this.output;
        for(var i = 0; i < entity.rows.count; i++){
            $("#displayList").append('<option value="' + entity.rows[i].dsp_id + '">' + entity.rows[i].dspNames.replace(/,/g, ' > ') + '</option');
        }
    };
    bm2.product.cbOutput = function(p_entity) {
        var entity      = this.output;
        var row_total   = p_entity.table["row_total"];
        var numCount    = row_total - ((page2.page_count - 1) * page2.page_size);     // 개시물 번호 = 전체 갯수 - ((현재페이지 -1) * 리스트수 )
        var strHtml;

        $("#CProduct").html("");
        $("#totalView2").text(row_total);

        if (entity.rows.count === 0) {
            $("#CProduct").append("<tr><td colspan='7' align='center'>자료가 없습니다.</td></tr>");
        } else {
            for (var i = 0, num = numCount; i < entity.rows.count; i++, num--) {
                strHtml = "";
                strHtml = strHtml + "<tr>";
                strHtml = strHtml + "<td><input name='chk_idx_hidden' type='checkbox' class='rowChk _product_no' value='" + entity.rows[i].prt_id + "'></td>";
                strHtml = strHtml + "<td>" + num + "</td>";
                strHtml = strHtml + "<td>" + getTypeCode(entity.rows[i].type_cd) + "</td>";
                strHtml = strHtml + "<td>" + entity.rows[i].prtName + "</td>";
                strHtml = strHtml + "<td>" + getKindCode(entity.rows[i].kind_cd) + "</td>";
                strHtml = strHtml + "<td>" + entity.rows[i].default_opt + "</td>";
                strHtml = strHtml + "<td>" + getStateCode(entity.rows[i].state_cd) + "</td>";
                strHtml = strHtml + "</tr>";
                $("#CProduct").append(strHtml); 
            }
            // $("#CPage2").html(page2.parser(row_total));   // 필수 항목만 받음
        }
    };

    bm.show.onExecuted       = function(p_bindCommand) { 
        console.log('show executed');
        bm2.product.execute(); 
    };
    bm.hidden.onExecuted     = function(p_bindCommand) { 
        console.log('hidden executed');
        bm2.product.execute(); 
    };

    //--------------------------------------------------------------    
    // 5. 이벤트 등록
    $("#page_size").change(function () {
        var page_size = $("#page_size").val();
        page.page_size = page_size;
        page.page_count = 1;
        bm.list.execute();
    });
    $("#btn_Search").click(function () { bm.list.execute(); });
    $("#btn_Reset").click(function () { $("form").each(function() { this.reset(); }); });
    $("#displayList").change(function () { 
        var dsp_id = $("#displayList").val();
        bm.first.items["dsp_id"].value = dsp_id;
        bm2.first.items["dsp_id"].value = dsp_id;
        if (dsp_id.length === 0 ) {
            $("#CProduct").html("");
        } else {
            bm2.product.execute();
        }
    });
    $("#btn_Show").click(function () {
        if (confirm("진열 하시겠습니까 ?")) {
            if ($("input:checkbox[name='chk_idx_show']:checked").length <= 0) {
                alert("선택된 항목이 없습니다.");
                return;
            }
            if( bm.first.items["dsp_id"].value === "") {
                alert("진열할 커테고리를 선택해 주세요.");
                return;
            }

            $("input:checkbox[name='chk_idx_show']").each(function() {
                if(this.checked){   //checked 처리된 항목의 값
                    bm._baseEntity.items["prt_id"].value = this.value;
                    bm.show.execute();
                }
            });
        }
    });
    $("#btn_Hidden").click(function () {
        if (confirm("진열 해제 하시겠습니까 ?")) {
            if ($("input:checkbox[name='chk_idx_hidden']:checked").length <= 0) {
                alert("선택된 항목이 없습니다.");
                return;
            }
            $("input:checkbox[name='chk_idx_hidden']").each(function() {
                if(this.checked){   //checked 처리된 항목의 값
                    bm._baseEntity.items["prt_id"].value = this.value;
                    bm.hidden.execute();
                }
            });
        }
    });


    bm.display.cbBind = function(p_a) {
        console.log(11)
    };
    bm2.product.cbBind = function(p_a) {
        console.log(22)
    };
    //--------------------------------------------------------------    
    // 6. 외부 호출 함수 구현 
    getTypeCode = function(flag) {
        if (flag === "DE") return "배송";
        else return "기타";
    };
    getKindCode = function(flag) {
        if (flag === "NE") return "신상";
        if (flag === "RE") return "추천";
        if (flag === "PO") return "인기";
        return ""
    };
    getStateCode = function(flag) {
        if (flag === "SS") return "판매";
        if (flag === "RS") return "예약";
        if (flag === "DS") return "재고없음";
        if (flag === "DH") return "판매중지(전시중지)";
        return ""
    };
    //--------------------------------------------------------------
    // 0. 준비완료 후 실행 정의
    $(document).ready(function () {
        bm.list.execute();
        bm.display.execute();
    });
</script>

</body>
</html>            