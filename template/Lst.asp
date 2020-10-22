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
' 	On Error Resume Next 
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
    <title>공지사항</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
 
</head>
<body>

<div class="container">

  <h2>공지사항</h2>
  <p>"화이트연구소.Net,  화이트연구소.kr   화이트연구소.com"</p>
  <p align="right"><button type="button" id="btn_Insert" class="btn btn-info">등록</button></p>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>순번</th>
        <th>제목</th>
        <th>공지타입</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
      </tr>
    </thead> 
    <tbody id="CList">
      <tr>
        <td>1</td>
        <td><a href="Notice_Frm.asp">공지제목입니다.</a></td>
        <td>기본</td>
        <td>관리자</td>
        <td>2016-10-10</td>
        <td>12</td>
      </tr>
      <tr>
        <td>1</td>
        <td>공지제목입니다.</td>
        <td>기본</td>
        <td>관리자</td>
        <td>2016-10-10</td>
        <td>12</td>
      </tr>
      <tr>
        <td>1</td>
        <td>공지제목입니다.</td>
        <td>기본</td>
        <td>관리자</td>
        <td>2016-10-10</td>
        <td>12</td>
      </tr>
      <tr>
        <td colspan="6" align="center">자료가 없습니다.</td>
      </tr>

    </tbody>
  </table>
  

  <div class="center-block" style="width: 450px;padding:15px;">
  <center>
  <ul class="pagination" id="CPage"></ul>
	</center>
	</div>
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
<script src="/A-Back/CMN/Paging.js"></script>
<script src="/A-Back/CMN/ModuleCommon.js"></script>
<script type="text/javascript">
<!--

	
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
	    Main.Model = [];
	    Main.listCnt = 10; 							// 리스트 페이지 수
	    Main.selPage = 1; 							// 선택 페이지 수
	    Main.sto_id = "S00001";						// 상점코드
	    Main.idx 	= "ntc_idx";					// 일련번호
	    Main.ListBindUrl = "Notice_Lst.C.asp";
	    Main.link = {};
	    Main.link.frmUrl = "Notice_Frm.asp";
//	    Main.link.frmParams = {};
//	    Main.link.frmParams = { sto_id: "", admin_id: "" };
	    Paging.Init(Main.listCnt, 5, false, false); // 페이징 초기화
	
	    // 이벤트 등록
	    Main.Event_Reg();
	
	    Main.M_ListBind(1); 						// 게시물 1 페이지
	}
	
	// 이벤트 등록
	Main.Event_Reg = function () {
	    $("#btn_Insert").click(function () {
	        Main.C_GoForm("INSERT", "");
	    });
	}
	
	// 화면 이동
	Main.C_GoForm = function (cmd, idx) {

	    var params = "";
	    params = params + "&sto_id="+ Main.sto_id ;
	    params = params + "&" + Main.idx + "=" + idx;
	    
    
	    if (cmd == "UPDATE")
	    	location.href = Main.link.frmUrl + "?cmd=UPDATE" + params;	    
	    else if (cmd == "INSERT")
	    	location.href = Main.link.frmUrl + "?cmd=INSERT" + params;
	}

	// 모델 리스트 바인딩 : Ajax
	Main.M_ListBind = function (selPage) {
        try {	    
		    Main.selPage = selPage;

		    $.ajax({
	            type: 'POST',
	            url: Main.ListBindUrl,
	            data:
				{
				    cmd			: "SELECT",
				    selPage		: Main.selPage,
				    listCnt		: Main.listCnt,
				    sto_id		: Main.sto_id
				},
		        async : false, 	// 동기로 임시로 처리(멀티요청)
		        success : function (result) {
		            //alert("Data: " + result);
		            if (result != null) {
		                Main.Model = $.xml2json(result);
		            }
		            Main.V_ListBind();
		        }  
		    });
        } catch (e) { JsErrorMessage(e); }	    
	}
		 
	// 뷰 리스트 바인딩
	Main.V_ListBind = function () {
	
	    $("#CList").html("");
	
	    if (typeof (Main.Model.db) == "undefined" || Main.Model.totalCnt == "0") {
	        $("#CList").append("<tr><td colspan='6' align='center'>자료가 없습니다.</td></tr>");
	        return;
	    }
	
	    // 개시물 번호 = 전체 갯수 - ((현재페이지 -1) * 리스트수 )
	    var numCnt = Main.Model.totalCnt - ((Main.selPage - 1) * Main.listCnt);
	    var forRow = SingleRow2Arr(Main.Model.db.row);
	
	    for (var i = 0, num = numCnt; i < forRow.length; i++, num--) {

	        var strHtml = "";
	        strHtml = strHtml + "<tr>";
	        strHtml = strHtml + "<td>" + num + "</td>";
	        strHtml = strHtml + "<td>  <a href=\"javascript:Main.C_GoForm('UPDATE','" + forRow[i].ntc_idx + "');\"\">" + forRow[i].title + "</a></td>";
	        strHtml = strHtml + "<td>" + Main.C_NoticeType(forRow[i].noticeType_cd) + "</td>";
	        // strHtml = strHtml + "<td>" + forRow[i].writer + "</td>";
	        strHtml = strHtml + "<td>" + forRow[i]['writer'].value + "</td>";
	        strHtml = strHtml + "<td>" + forRow[i].create_dt.substring(0,10) + "</td>";
	        strHtml = strHtml + "<td>" + forRow[i].cnt + "</td>";
	        strHtml = strHtml + "<td></td>";
	        $("#CList").append(strHtml); 
	    }

	    Paging.V_PageBind(Main.Model.totalCnt, Main.selPage);	// 페이지 바인딩
	}
	
	// 뷰 리스트 바인딩
	Main.C_NoticeType = function (flag) {
		var tmp = "";
		if (flag == "{Not}")
			tmp = "";
		else if (flag == "B")
			tmp = "일반";
		else if (flag == "T")
			tmp = "상위공지";
		else
			tmp = flag;
		return tmp;	
	}

-->
</script>

</body>
</html>
<%
	Call AspErrorMsg(Err)
%>
