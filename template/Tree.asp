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
'	Option Explicit	        '변수선언 필수
'	On Error Resume Next 
%>
<% session.codepage = 65001 %>
<% Response.CharSet = "utf-8" %>
<% 
	Server.Execute "/A-Back/CMN/LoginCheck_Inc.asp"
%>

<!-- #include virtual="/A-Back/CMN/ModuleCMN_Fnc.asp" -->
<!DOCTYPE html>
<html>
<head>
    <title>광고 진열 설정</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="/A-CMN/jquery.xml2json.js"></script>
    <script src="/A-CMN/Common.js"></script>



</head>
<body>

<form id="frm_default" class="form-horizontal" role="form">

<div class="container">
  <h2>광고 진열 설정</h2>
  <p>"화이트연구소.Net,  화이트연구소.kr   화이트연구소.com"</p>
  
	<div class="row">
	  <div class="col-sm-3">.col-sm-3
	  	
	  	<div class="dtree" id="dtree"></div>
	  	
	  </div>
	  <div class="col-sm-4">.col-sm-4

		<div class="list-group">
		  <li href="#" class="list-group-item list-group-item-success"><h4>진열된광고</h4></a>
		</div> 
				
		<div class="list-group" id="display_list">
		  <a href="#" class="list-group-item">First item</a>
		  <a href="#" class="list-group-item">
		  	<input type="checkbox" value=""> Second item<br />
		  	&nbsp;&nbsp;&nbsp;[ 123캐피탈 ]
		  </a>
		  <a href="#" class="list-group-item">Third item</a>
		</div>
	  
	  </div>
	  <div class="col-sm-1">.m-1

		<div class="list-group">
		  <li href="#" class="list-group-item "><h4>Set</h4></a>
		</div> 
   		
        <a href="#" class="btn btn-info btn-sm" id="btn_Cancel">
          <span class="glyphicon glyphicon-hand-right"></span> 해지
        </a>	  
        <div><br /></div>
        <a href="#" class="btn btn-info btn-sm" id="btn_Set">
          <span class="glyphicon glyphicon-hand-left"></span> 설정
        </a>	          
	  </div>
	  <div class="col-sm-4">.col-sm-4


		<div class="list-group">
		  <li href="#" class="list-group-item list-group-item-warning"><h4>광고목록</h4></a>

		    <div class="form-group col-sm-6">
						  <select class="form-control" name="area_cd" id="area_cd" >
						    <option value="">=전체=</option>
						    <option value="A01">전국</option>
						    <option value="A02">서울</option>
						    <option value="A03">경기</option>
						    <option value="A04">인천</option>
						    <option value="A05">대전</option>
						    <option value="A06">대구</option>
						    <option value="A07">부산</option>
						    <option value="A08">광주</option>
						    <option value="A09">울산</option>
						    <option value="A10">강원</option>
						    <option value="A11">충북</option>
						    <option value="A12">충남</option>
						    <option value="A13">전북</option>
						    <option value="A14">전남</option>
						    <option value="A15">경북</option>
						    <option value="A16">경남</option>
						    <option value="A17">제주</option>
						  </select>
		    </div>

		    <div class="input-group col-sm-6">
			  <input name="searchText" id="searchText"  type="text" class="form-control" placeholder="제목">
			    <span class="input-group-btn">
			    <button class="btn btn-default" type="button" id="btn_Search">
			    <span class="glyphicon glyphicon-search"></span>
			    </button>
			    </span>
		     </div>

		</div>  		

		<div class="list-group" id="product_list">
		  <a href="#" class="list-group-item">First item</a>
		  <a href="#" class="list-group-item">Second item<br />(aasdf)</a>
		  <a href="#" class="list-group-item">Third item</a>
		</div>
	  
	  	<div class="center-block">
			<center>
			<ul class="pagination" id="CPage"></ul>
			</center>
		</div>
	</div>

</form>

<div class="container">
<br />
<br /><br /><br />
</div>
<div class="container">
  <h4><span class="glyphicon glyphicon-volume-up"></span> 도움말</h4>
  <div class="well col-sm-10">- <span class="glyphicon glyphicon-paperclip"></span> 은 필수 입력 사항입니다.</div>
</div>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


<script src="/A-CMN/jquery.xml2json.js"></script>
<script src="/A-Back/CMN/ModuleCommon.js"></script>
<script src="js/dtree.js"></script>
<script src="/A-Back/CMN/TreePaging.js"></script>

<script type="text/javascript">

	var show_Tree = new dTree('show_Tree');		 
		
	$(document).ajaxError(function (event, xhr, options, exc) {
	    if (xhr.status != 200) {
	        var msg = "";
	        msg = msg + "# options.data : " + options.data + " , ";
	        msg = msg + "# options.url : " + options.url + " , ";
	        msg = msg + "# options.contentType : " + options.contextType + " , ";
	        msg = msg + "# xhr.status : " + xhr.status + " , ";
	        msg = msg + "# xhr.statusText : " + xhr.statusText + " , ";
	        msg = msg + "# xhr.responseText : " + xhr.responseText + " , ";
	
	        Msg("MODAL", "ajaxError", msg, "");
	    }
	});
	
	$(document).ready(function () {
	    Main.Init();
	});

	
	//**********************************************************************
	// Main 템플릿
	
	var Main = {};
	
	// Main 템플릿 초기화
	Main.Init = function () {
	    Main.TreeModel = [];
	    Main.ShowModel = [];
	    Main.PrtModel = [];
		Main.ListBindUrl = "DspPrt_Tree.C.asp";
	    Main.prtListCnt = 10;						// 리스트 페이지 수
	    Main.prtSelPage = 1; 						// 선택 페이지 수
	    Main.dsp_idx 	= "";						// 일련번호
		Main.Form = $("#frm_default")[0];
		
		$("#display_list").html("");
		$("#product_list").html("");
		
	    Paging.Init(Main.prtListCnt, 5, false, false); // 페이징 초기화
	
	    // 이벤트 등록
	    Main.Event_Reg();
	
	    Main.M_TreeBind();
	    
	    Main.M_PrtBind(1);
	}
	
	// 이벤트 등록
	Main.Event_Reg = function () {

	    $("#btn_Set").click(function () {
	        Main.C_SetDisplay();
	        
	    });
   	    $("#btn_Cancel").click(function () {
	        Main.C_CancelDisplay();
	    });
	    
	    // 2016-06-16 오전 9:45:04 검색 추가
	    $("#btn_Search").click(function () {
	        Main.M_PrtBind(1);
	    });
	    
	}

	//----------------------------------------
	// Valid 입력값 유효성 검사

    Main.Valid_Set = function(){
        // 입력값 유효성 검사
        try{

			if(Main.dsp_idx == ""){
	            alert('진열카테고리를 선택해주세요.');
	            return false;		
			}else if($("input[type='checkbox'][name=arr_mp_idx]:checked").length == 0){
	            alert('진열할 상품을 선택해 주세요.');
	            return false;		
            }else{
	            return true;
            }
		} catch (e) {JsErrorMessage(e); }        
    }

    Main.Valid_Cancel = function(){
        // 입력값 유효성 검사
        try{
			if(Main.dsp_idx == ""){
	            alert('진열카테고리를 선택해주세요.');
	            return false;		            
			}else if($("input[type='checkbox'][name=arr_show_mp_idx]:checked").length == 0){
	            alert('해지할 상품을 선택해 주세요.');
	            return false;		
            }else{
	            return true;
            }
		} catch (e) {JsErrorMessage(e); }        
    }
        
    
/*	
	// 화면 이동
	Main.C_GoForm = function (cmd, idx) {

	    var params = "";
//	    params = params + "&sto_id="+ Main.sto_id ;
	    params = params + "&" + Main.idx + "=" + idx;
	    
	    if (cmd == "UPDATE")
	    	location.href = Main.link.frmUrl + "?cmd=UPDATE" + params;	    
	    else if (cmd == "INSERT")
	    	location.href = Main.link.frmUrl + "?cmd=INSERT" + params;
	}
*/

	// 모델 리스트 바인딩 : Ajax
	Main.M_TreeBind = function () {
        try {	    
		    $.ajax({
	            type: 'POST',
	            url: Main.ListBindUrl,
	            data:
				{
				    cmd			: "TREE"
				},
		        async : false, 	// 동기로 임시로 처리(멀티요청)
		        success : function (result) {
		            //alert("Data: " + result);
		            if (result != null) {
		                Main.TreeModel = $.xml2json(result);
		            }
		            Main.V_TreeBind();
		        }  
		    });
        } catch (e) { JsErrorMessage(e); }	    
	}

	Main.M_ShowBind = function () {
        
        if (Main.dsp_idx == ""){
        	alert('카테고리를 선택하세요.');
        	return;
        }
        
        try {	    
		    $.ajax({
	            type: 'POST',
	            url: Main.ListBindUrl,
	            data:
				{
				    cmd			: "SHOW",
				    dsp_idx		: Main.dsp_idx
				},
		        async : false, 	// 동기로 임시로 처리(멀티요청)
		        success : function (result) {
		            //alert("Data: " + result);
		            if (result != null) {
		                Main.ShowModel = $.xml2json(result);
		            }
		            Main.V_ShowBind();
		        }  
		    });
        } catch (e) { JsErrorMessage(e); }	    
	}
	
	Main.M_PrtBind = function (selPage) {
        try {	    
		    Main.prtSelPage = selPage;
		    $.ajax({
	            type: 'POST',
	            url: Main.ListBindUrl,
	            data:
				{
				    cmd			: "PRT",
				    selPage		: Main.prtSelPage,
				    area_cd		: $("#area_cd").val(),
				    searchText	: $("#searchText").val(),
				    listCnt		: Main.prtListCnt				    
				},
		        async : false, 	// 동기로 임시로 처리(멀티요청)
		        success : function (result) {
		            //alert("Data: " + result);
		            if (result != null) {
		                Main.PrtModel = $.xml2json(result);
		            }
		            Main.V_PrtBind();
		        }  
		    });
        } catch (e) { JsErrorMessage(e); }	    
	}


	//----------------------------------------
	// 모델 처리

    Main.M_Set = function () {
		try {
			var arrStr = [];
			for(i = 0 ; $("input[type='checkbox'][name=arr_mp_idx]:checked").length > i ; i++)
				arrStr[i]= $("input[type='checkbox'][name=arr_mp_idx]:checked")[i].value;

	        $.post(
	        	Main.ListBindUrl,
		        {
		            cmd				: "SET",
		            dsp_idx			: Main.dsp_idx,
		            mp_idx_Arr		: String(arrStr.valueOf()),
		            rankNum			: 99
		        },
		        function (data, status) {
					var result = $.xml2json(data);
					Main.C_StatusMsg(result, status);
		        	if(status = "success" && result.return == "0")
		        		Main.M_ShowBind();
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}                     
	}
	

    Main.M_Del = function () {
		try {
			var arrStr = [];
			for(i = 0 ; $("input[type='checkbox'][name=arr_show_mp_idx]:checked").length > i ; i++)
				arrStr[i]= $("input[type='checkbox'][name=arr_show_mp_idx]:checked")[i].value;

	        $.post(
	        	Main.ListBindUrl,
		        {
		            cmd				: "DEL",
		            dsp_idx			: Main.dsp_idx,
		            mp_idx_Arr		: String(arrStr.valueOf())
		        },
		        function (data, status) {
					var result = $.xml2json(data);
					Main.C_StatusMsg(result, status);
		        	if(status = "success" && result.return == "0")
		        		Main.M_ShowBind();
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}                     
	}
	
	

	// 뷰 리스트 바인딩
	Main.V_TreeBind = function () {
	
		$("#dtree").html("");
	
	    if (typeof (Main.TreeModel.db) == "undefined" || Main.TreeModel.totalCnt == "0") {
	        $("#dtree").append("자료가 없습니다.");
	        return;
	    }
		
	    var forRow = SingleRow2Arr(Main.TreeModel.db.row);
	    for (var i = 0; i < forRow.length; i++) {

			if (forRow[i].parent_idx == "0") show_Tree.add( forRow[i].dsp_idx,-1, forRow[i].name);
			
			show_Tree.add( forRow[i].dsp_idx, forRow[i].parent_idx, forRow[i].name, 'javascript:Main.C_SelTree('+forRow[i].dsp_idx+')');
	    }
		$("#dtree").html(show_Tree.toString());	
	}
	
	

	Main.V_ShowBind = function () {

		$("#display_list").html("");
	
	    if (typeof (Main.ShowModel.db) == "undefined" || Main.ShowModel.totalCnt == "0") {
	        $("#display_list").append("자료가 없습니다.");
	        return;
	    }
		
	    var forRow = SingleRow2Arr(Main.ShowModel.db.row);
	    for (var i = 0; i < forRow.length; i++) {

	        var strHtml = "";
	        strHtml = strHtml + "<a href=\"#\" class=\"list-group-item\">";
	        strHtml = strHtml + "<input name=\"arr_show_mp_idx\" type=\"checkbox\" value=\""+forRow[i].mp_idx +"\"> ";
	        strHtml = strHtml + forRow[i].prtName ;
	        strHtml = strHtml + "&nbsp;&nbsp;&nbsp;<p style='color: #009900;'>[" + forRow[i].name + "] : "+forRow[i].display_dt.substring(0,10) + "</p>";
	        strHtml = strHtml + "</a>";
	        $("#display_list").append(strHtml); 
	    }
		
	}
	
	Main.V_PrtBind = function () {

	    $("#product_list").html("");
	
	    if (typeof (Main.PrtModel.db) == "undefined" || Main.PrtModel.totalCnt == "0") {
	        $("#product_list").append("자료가 없습니다.");
	        return;
	    }
	
	    // 개시물 번호 = 전체 갯수 - ((현재페이지 -1) * 리스트수 )
	    var numCnt = Main.PrtModel.totalCnt - ((Main.prtSelPage - 1) * Main.prtListCnt);
	    var forRow = SingleRow2Arr(Main.PrtModel.db.row);
	
	    for (var i = 0, num = numCnt; i < forRow.length; i++, num--) {

	        var strHtml = "";
	        strHtml = strHtml + "<a href=\"#\" class=\"list-group-item\">";
	        strHtml = strHtml + "<input name=\"arr_mp_idx\" type=\"checkbox\" value=\""+forRow[i].mp_idx +"\"> ";
	        strHtml = strHtml + forRow[i].prtName + "";
	        strHtml = strHtml + "&nbsp;&nbsp;&nbsp;<p style='color: #cc9900;'>[" + forRow[i].corpName + "]";
	        strHtml = strHtml + "-" + Main.C_AreaType(forRow[i].area_cd) + "</p>";
	        strHtml = strHtml + "</a>";
	        $("#product_list").append(strHtml); 
	    }

	    Paging.V_PageBind(Main.PrtModel.totalCnt, Main.prtSelPage);	// 페이지 바인딩
	    
/*
		$("#dtree").html("");
	
	    if (typeof (Main.Model.db) == "undefined" || Main.Model.totalCnt == "0") {
	        $("#CList").append("자료가 없습니다.");
	        return;
	    }
		
	    var forRow = SingleRow2Arr(Main.Model.db.row);
	    for (var i = 0; i < forRow.length; i++) {

			if (forRow[i].parent_idx == "0") show_Tree.add( forRow[i].dsp_idx,-1, forRow[i].name);
			
			show_Tree.add( forRow[i].dsp_idx, forRow[i].parent_idx, forRow[i].name, 'javascript:Main.C_SelTree('+forRow[i].dsp_idx+')');
	    }
		$("#dtree").html(show_Tree.toString());	
*/		
			
	}	
	
	Main.C_SelTree = function(dsp_idx){
		Main.dsp_idx = dsp_idx;
		Main.M_ShowBind();
		
	}
	
	Main.C_SetDisplay = function(){
        if (Main.Valid_Set()){
            Main.M_Set();
            Main.C_CheckBoxInit();
        }
		//alert(1); //Main.M_Insert();		
	}

	Main.C_CancelDisplay = function(){
        if (Main.Valid_Cancel()){                       
            Main.M_Del();
            Main.C_CheckBoxInit();
        }
        //alert(2); //Main.M_Insert();
	}
	
	Main.C_CheckBoxInit = function(){
		for(i = 0 ; $("input[type='checkbox'][name=arr_mp_idx]").length > i ; i++)
			$("input[type='checkbox'][name=arr_mp_idx]").removeAttr('checked');
			for(i = 0 ; $("input[type='checkbox'][name=arr_show_mp_idx]").length > i ; i++)
			$("input[type='checkbox'][name=arr_show_mp_idx]").removeAttr('checked');
	}

	// 뷰 리스트 바인딩 : 지역
	Main.C_AreaType = function (flag) {
		var tmp = "";
		if (flag == "A01")
			tmp = "전국";
		else if (flag == "A02")
			tmp = "서울";
		else if (flag == "A03")
			tmp = "경기";
		else if (flag == "A04")
			tmp = "인천";
		else if (flag == "A05")
			tmp = "대전";
		else if (flag == "A06")
			tmp = "대구";
		else if (flag == "A07")
			tmp = "부산";			
		else if (flag == "A08")
			tmp = "광주";												
		else if (flag == "A09")
			tmp = "울산";
		else if (flag == "A10")
			tmp = "강원";
		else if (flag == "A11")
			tmp = "충북";
		else if (flag == "A12")
			tmp = "충남";
		else if (flag == "A13")
			tmp = "전북";
		else if (flag == "A14")
			tmp = "전남";
		else if (flag == "A15")
			tmp = "경북";
		else if (flag == "A16")
			tmp = "경남";
		else if (flag == "A17")
			tmp = "제주";
		else
			tmp = flag;
		return tmp;	
	}
	
/*	
	// 뷰 리스트 바인딩 : FAQ
	Main.C_FaqType = function (flag) {
		var tmp = "";
		if (flag == "F1")
			tmp = "고객";
		else if (flag == "F2")
			tmp = "기업회원";
		else
			tmp = flag;
		return tmp;	
	}
*/	

	//----------------------------------------
	// 기타
	Main.C_StatusMsg = function(result, status) {


		if(status = "success" && result.return == "0")
			alert("정상 처리 되었습니다.");
		else if(status = "success")
			alert("DB 처리 오류가 발생하다. 오류코드:" + result.return);            	
		else if(status = "error")
			alert("ajax 처리중 오류가 발생하다.");
		else if(status = "timeout")
			alert("네트워크 접속 오류가 발생하다.");
		else
			alert("Data: " + data + "\nStatus: " + status);
	}
	
	
	
	
</script>

</body>
</html>
<%
	Call AspErrorMsg(Err)
%>
