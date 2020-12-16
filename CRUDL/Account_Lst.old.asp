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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/bod/faq_Lst.asp#none
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
    
	<script language="javascript" src="/Common//JS/jquery.xml2json.js"></script>
	<script language="javascript" src="/Common/JS/Common.js"></script>
	<script language="javascript" src="/A-Back/CMN/JS/BackCommon.js"></script>
    
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
                        <th scope="row">관리자명, ID(admin).</th>
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
                <a href="#none" id="btn_Delete" class="btnNormal"><span><em class="icoDel"></em> 삭제</span></a>
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
		            <col class="date">
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
		                    <strong>구분</strong>
                        </th>
		                <th scope="col">
		                    <strong>아이디</strong>
		                </th>
                        <th scope="col">
		                    <strong>이름</strong>
		                </th>
                        <th scope="col">
		                    <strong>상태</strong>
		                </th>
		                <th scope="col">
		                    <strong>등록일자</strong>
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
					<tr><td colspan='6' align='center'>자료가 없습니다.</td></tr>
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

<script src="/A-Back/CMN/JS/Paging.js"></script>
<script>    
<!--

    // 중복클릭 방지를 위한 로딩바 실행
//$('.mLoading').show();
//	document.getElementById("part_Overlay").style.display = "block";
//	document.getElementById("part_Overlay").style.display = "none";

    
	//************** ajax 에러 처리  ************************
	$(document).ajaxError(function (event, xhr, options, exc) {
	  if (xhr.status != 200){
	    var msg = "";
	    msg = msg + "# options.data : " + options.data + " , ";
	    msg = msg + "# options.url : " + options.url + " , ";
	    msg = msg + "# options.contentType : " + options.contextType + " , ";
	    msg = msg + "# xhr.status : " + xhr.status + " , ";
	    msg = msg + "# xhr.statusText : " + xhr.statusText + " , ";
	    msg = msg + "# xhr.responseText : " + xhr.responseText + " , ";
	
	    Msg("ALERT", "ajaxError", msg, "");
	  }
	});

	//************** Main   템플릿  ************************
    var Main = {};

    //----------------------------------------
    // 메인 로딩
    $(document).ready(function () {
        Main.Init();
        Paging.Init(Main.listCnt, 5, false, false);
    });

    //----------------------------------------
    // 메인 초기화
    Main.Init = function () {
		
		// 값 설정
	    Main.Model = [];
	    Main.listCnt = $("#listCnt").val();			// 리스트 페이지 수
	    Main.selPage = 1; 							// 선택 페이지 수
		Main.Form 			= $("#frm_default")[0];
        Main.callbackURL 	= "/admin/adm_mod/sto/Account.C.asp";
        Main.frmURL 		= "Dealer_Frm.asp";

        // 이벤트 등록
        Main.Event_Reg();
        
        // 초기로딩
        Main.Proc_Select();
    };

    //----------------------------------------
    // 처리 버튼 이벤트 
    Main.Event_Reg = function () {
        
        $("#btn_Search").click(function () {
            Main.Proc_Select(1);
        });
        $("#btn_Reset").click(function () {
            Main.Form.reset();
        });
        $("#listCnt").change(function () {
            Main.listCnt = $("#listCnt").val();
            Main.selPage = 1;
            Paging.Init(Main.listCnt, 5, false, false);
            Main.Proc_Select();
        });
        $("#btn_Insert").click(function () {
            Main.C_GoForm("INSERT", "");
        });
        $("#btn_Delete").click(function () {
            // TODO:
            alert('준비중입니다.');
        });
        $("#btn_Excel").click(function () {
            alert('준비중입니다.');
            // TODO:
        });
        $("#btn_allChk").click(function () {
            // TODO:
        });

    };

	// 화면 이동
	Main.C_GoForm = function (cmd, idx) {

	    var params = "";
	    params = params + "&deal_idx=" + idx;
	    
	    if (cmd == "UPDATE")
	    	location.href = Main.frmURL + "?cmd=UPDATE" + params;	    
	    else if (cmd == "INSERT")
	    	location.href = Main.frmURL + "?cmd=INSERT" + params;
	}
	
	//----------------------------------------
	// 진행현황 표시
    Main.loading = function (isBool) {
        if (isBool) {                       
            $('.mLoading').show();
//            document.getElementById("part_Overlay").style.display = "block";
        } else {
        	$('.mLoading').hide();
//        	document.getElementById("part_Overlay").style.display = "none";
        }
    };
    
	//----------------------------------------
	// Proc 처리 모드
    Main.Proc_Select = function (selPage) {

			// if (Main.Valid_Select())                       
            
            if (typeof selPage === "number") Main.selPage = selPage;
            
            Main.loading(true);		// 로딩중 메세지
            Main.M_Select();
            
    };


	//----------------------------------------
	// Valid 입력값 유효성 검사
//    Main.Valid_Select = function(){
//        // 입력값 유효성 검사
//        try{
//            var frm = Main.Form;
//            if(isNull(frm.admin_id, '아이디')){
//	            return false;
//            }else if(isNull(frm.passwd, '비밀번호')){
//	            return false;		
//            }else{
//	            return true;
//            }
//		} catch (e) {JsErrorMessage(e); }        
//    };
    

	//----------------------------------------
	// 콜백  처리
    Main.M_Select = function () {
		try {
	        
	        $.post(Main.callbackURL,
		        {
		            cmd					: "LIST",
		            doctype				: "XML",
		            selPage				: Main.selPage,
		            lineCnt				: Main.listCnt,
		            real_type			: $("input[type='radio'][name=real_type]:checked").val(),
		            name_corp_tel_hp	: $("#name_corp_tel_hp").val(),
		            dealType_C			: $("#dealType_C:checked").map(function(){return this.value;}).get()[0],
		            dealType_P			: $("#dealType_P:checked").map(function(){return this.value;}).get()[0]
		        },
		        function (data, status) {
					var result = $.xml2json(data);
					Main.C_StatusMsg(result, status);
					if (result != null) Main.Model.db = result;
		            Main.V_ListBind();
		            $('.mLoading').hide();
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}
	};


	
	//----------------------------------------
	// 뷰 리스트 바인딩
	Main.V_ListBind = function () {
	
	    $("#CList").html("");
		$("#totalView").text(Main.Model.row_total);
	
	    if (typeof (Main.Model.db) == "undefined" || Main.Model.db.row_total == "0") {
	        $("#CList").append("<tr><td colspan='6' align='center'>자료가 없습니다.</td></tr>");
	        return;
	    }
	
		
	    // 개시물 번호 = 전체 갯수 - ((현재페이지 -1) * 리스트수 )
	    var numCnt = Main.Model.db.row_total - ((Main.selPage - 1) * Main.listCnt);
	    var forRow = SingleRow2Arr(Main.Model.db.row);
	
	    for (var i = 0, num = numCnt; i < forRow.length; i++, num--) {

	        var strHtml = "";
	        strHtml = strHtml + "<tr>";
	        strHtml = strHtml + "<td><input name='chk_idx' type='checkbox' class='rowChk _product_no' value=''></td>";
			strHtml = strHtml + "<td>" + forRow[i].acc_idx + "</td>";
	        strHtml = strHtml + "<td><a href=\"javascript:Main.C_GoForm('UPDATE','" + forRow[i].acc_idx + "');\"\">" + forRow[i].adm_id + "</a></td>";
	        strHtml = strHtml + "<td>" + forRow[i].admName + "</td>";
	        strHtml = strHtml + "<td>" + forRow[i].use_yn + "</td>";
	        strHtml = strHtml + "<td>" + forRow[i].create_dt.substring(0, 10) + "</td>";
	        
	        strHtml = strHtml + "</tr>";
	        $("#CList").append(strHtml); 
	    }

	    Paging.V_PageBind(Main.Model.db.row_total, Main.selPage, Main.Proc_Select);	// 페이지 바인딩

//		$('.mLoading').hide();
	}

	//----------------------------------------
	// 뷰 리스트 바인딩 : FAQ
	Main.dealType = function(flag) {
		var tmp = "";
		if (flag === "C")
			tmp = "<strong class='icoStatus positive'></strong>";
		else if (flag === "P")
			tmp = "<span class='icoMobile'>개인</span>";
		else
			tmp = flag;
		return tmp;	
	};

	
	//----------------------------------------
	// 오류메세지 
	Main.C_StatusMsg = function(result, status) {

		if(status === "success" && Number(result.return) < 0)
			alert("DB 처리 오류가 발생하다. 오류코드:" + result.return);            	
		else if(status === "error")
			alert("ajax 처리중 오류가 발생하다..");
		else if(status === "timeout")
			alert("네트워크 접속 오류가 발생하다.");
	};



	//**********************************************************************    
-->
</script>
</body>
</html>            