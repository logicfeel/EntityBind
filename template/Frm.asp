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
    <title>관리자 목록</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="/A-CMN/jquery.xml2json.js"></script>
    <script src="/A-CMN/Common.js"></script>

</head>
<body>

<div class="container">
  <!-- $$ pages.설정값.설명  -->
  <h2>공지사항</h2>
  <p>"화이트연구소.Net,  화이트연구소.kr   화이트연구소.com"</p>

    <form id="frm_default" class="form-horizontal" role="form">
	
	<input type=hidden id="ntc_idx" name="ntc_idx" value="" />
    <input type=hidden id="sto_id" name="sto_id" value="" />
    <input type=hidden id="state_cd" name="state_cd" value="" />

    <div class="form-group">
      <label class="col-sm-2 control-label"><span class="glyphicon glyphicon-paperclip"></span> 제목</label>
      <div class="col-sm-8">
        <input class="form-control" name="title" id="title" type="text" value="" placeholder="제목을 입력해 주세요." maxlength="50" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label"><span class="glyphicon glyphicon-paperclip"></span> 작성자</label>
      <div class="col-sm-4">
        <input class="form-control" name="writer" id="writer" type="text" value=""  maxlength="10"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">내용</label>
      <div class="col-sm-8">
         <textarea class="form-control" rows="10" name="content" id="content"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label"><span class="glyphicon glyphicon-paperclip"></span> 공지타입</label>
      <div class="col-sm-8">
        <label class="radio-inline"><input type="radio" name="noticeType_cd" id="noticeType_B" value="B">기본</label>
        <label class="radio-inline"><input type="radio" name="noticeType_cd" id="noticeType_T" value="T">상위</label>
      </div>
    </div>
		<div class="form-group">
	    <div id="create_dt_area"  class="form-group">
	      <label class="col-sm-2 control-label">등록일자</label>
	      <div class="col-sm-4">
	        <input class="form-control" name="create_dt" id="create_dt" type="text" value="" />
	      </div>
	    </div>
  	</div>
    <br />
	<div class="form-group">
		<div class="control-label col-sm-10">
	    
	    <!-- $$ pages.설정값.플래그=기능설정  -->
	    <button type="button" id="btn_List" class="btn btn-default">목록</button>
	    <button type="button" id="btn_Insert" class="btn btn-info">등록</button>
	    <button type="button" id="btn_Update" class="btn btn-info">수정</button>
	    <button type="button" id="btn_Delete" class="btn btn-danger">삭제</button>
		</div>
	</div>

    </form>
</div>

<div class="container">
  <h4><span class="glyphicon glyphicon-volume-up"></span> 도움말</h4>
  <!-- $$ pages.설정값.설명  -->
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
<script type="text/javascript">
	
	$(document).ajaxError(function (event, xhr, options, exc) {
	  if (xhr.status != 200){
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

    //************** Main   템플릿  ************************
    var Main = {};


	//<!-- $$ pages.설정값.플래그=기능설정 ** 전반적으로 이용됨 -->

    //----------------------------------------
    // 메인 초기화
    Main.Init = function () {
		
		// $$ commom. 설정값
		
        Main.ListURL = "Notice_Lst.asp";
        Main.Form = $("#frm_default")[0];
        Main.FormBindUrl = "Notice_Frm.C.asp";

        // Get 로딩
        Main.Params = ParamGet2JSON(location.href);

        // 입력값 검사
        Main.ParamsValid();

        // 버튼 모드 설정
        Main.Mode_Button(Main.Params.cmd);

        // 버튼 이벤트 등록
        Main.Event_Reg();

        if (Main.Params.cmd == "INSERT")
            this.Mode_Insert();
        else if (Main.Params.cmd == "UPDATE")
            this.Mode_Update();

        //Main.Message("MODAL", "접근경로", "접근이 실패하였습니다.");
        //Main.Message("ALERT", "접근경로", "접근이 실패하였습니다.", "");
    }

    //----------------------------------------
    // 처리 버튼 이벤트 
    Main.Event_Reg = function () {
        
        //<!-- $$ pages.설정값.플래그=기능설정  -->
        $("#btn_List").click(function () {
            location.href = Main.ListURL;
        });
        $("#btn_Insert").click(function () {
            Main.Proc_Insert();
        });
        $("#btn_Update").click(function () {
            Main.Proc_Update();
        });
        $("#btn_Delete").click(function () {
            Main.Proc_Delete();
        });

    }
    
	//----------------------------------------
    // cmd 확인 * 필수  : INSERT / UPDATE
    Main.ParamsValid = function () {

        if (typeof (Main.Params) == "undefined" || typeof (Main.Params.cmd) == "undefined" || Main.Params.cmd == "") {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(cmd)", "B");
            return;
        }

        if (!(Main.Params.cmd == "INSERT" || Main.Params.cmd == "UPDATE")) {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(INSERT/UPDATE)", "B");
            return;
        }

		// $$ PK 로 처리
        if (Main.Params.cmd == "UPDATE"
    			&& typeof (Main.Params.ntc_idx) == "undefined" && Main.Params.ntc_idx == ""
    			&& typeof (Main.Params.sto_id) == "undefined" && Main.Params.sto_id == ""
    			) {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(admin_id, sto_id)", "B");
            return;
        }

        if (Main.Params.cmd == "INSERT"
    			&& typeof (Main.Params.sto_id) == "undefined" && Main.Params.sto_id == "") {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(admin_id, sto_id)", "B");
            return;
        }
        
    }

	//----------------------------------------
	// 회면 모드 설정

    // 등록 모드
    Main.Mode_Insert = function () {
        $("#sto_id").val(Main.Params.sto_id);
        $("#create_dt_area").hide();
    }

    // 수정 모드
    Main.Mode_Update = function () {
        // admin_id 수정 금지 
        $("#create_dt").attr("readonly", "")
        // 데이터 가져옴
        this.M_ViewBind(Main.Params.ntc_idx, Main.Params.sto_id);
    }

    // 버튼 모드
    Main.Mode_Button = function (cmd) {

        //$("#btn_List").hide();    // 목록은 기본 보기임
        $("#btn_Insert").hide();
        $("#btn_Update").hide();
        $("#btn_Delete").hide();

        if (cmd == "INSERT") {
            $("#btn_Insert").show();
        } else if (cmd == "UPDATE") {
            $("#btn_Update").show();
            $("#btn_Delete").show();
        }
    }
    

	//----------------------------------------
	// Valid 입력값 유효성 검사

    Main.Valid_Insert = function(){
        // 입력값 유효성 검사
        
        // $$ vI 
        try{
            var frm = Main.Form;
            if(isNull(frm.sto_id, '상점코드')){
	            return false;
            }else if(isNull(frm.title, '제목')){
	            return false;		
            }else if(isNull(frm.writer, '작성자')){
	            return false;		
            }else if(isNull(frm.noticeType_cd, '공지타입')){
	            return false;		
            }else{
	            return true;
            }
		} catch (e) {JsErrorMessage(e); }        
    }

    Main.Valid_Update = function(){
        // 입력값 유효성 검사
        
        // $$ vU 
        try{
            var frm = Main.Form;
            if(isNull(frm.sto_id, '상점코드')){
	            return false;
            }else if(isNull(frm.ntc_idx, '일련번호')){
	            return false;			            
            }else if(isNull(frm.title, '제목')){
	            return false;		
            }else if(isNull(frm.writer, '작성자')){
	            return false;		
            }else if(isNull(frm.noticeType_cd, '공지타입')){
	            return false;		
            }else{
	            return true;
            }
		} catch (e) {JsErrorMessage(e); }        
    }

    Main.Valid_Delete = function(){
        // 입력값 유효성 검사
        
        // $$ PK 
        try{
            
            if (confirm('삭제하시겠습니까?')){

                var frm = Main.Form;
                if(isNull(frm.sto_id, '상점코드')){
	                return false;
                }else if(isNull(frm.ntc_idx, '일련번호')){
	                return false;		
                }else{
	                return true;
                }
            }
		} catch (e) {JsErrorMessage(e); }        
    }

	//----------------------------------------
	// Proc 처리 모드
    
    //<!-- $$ pages.설정값.플래그=기능설정  -->
    
    Main.Proc_Insert = function () {
        if (Main.Valid_Insert())                       
            Main.M_Insert();
    }
                
    Main.Proc_Update = function () {
        if (Main.Valid_Update())                       
            Main.M_Update();
    }

    Main.Proc_Delete = function () {
        if (Main.Valid_Delete())                       
            Main.M_Delete();
    }

	//----------------------------------------
	// 뷰 바인딩

    // 모델 뷰 바인딩 : Ajax
    
    // $$ PK
    Main.M_ViewBind = function (ntc_idx, sto_id) {
		try {
	        $.ajax({
	            type : 'POST',
	            url : Main.FormBindUrl,
	            data :
				{
				    cmd			: "SELECT",
				    ntc_idx		: ntc_idx,
				    sto_id		: sto_id
				},
	            async : false, 	// 동기로 임시로 처리(멀티요청)
	            success	: function (result) {
	                //alert("Data: " + result);
	                if (result != null) {
	                    Main.Model = $.xml2json(result);
	                }
	                Main.V_ViewBind();
	            }
	        });
        } catch (e) {JsErrorMessage(e); }        
    }

    // 뷰 바인딩
    Main.V_ViewBind = function () {
		try {
	        //$("#CList").html("");
	        if (typeof (Main.Model.db) == "undefined") {
	            Msg("MODAL", "자료없음", "자료가 존재하지 않습니다.", "");
	            return;
	        }
	        $("#sto_id").val(Main.Model.db.row.sto_id);
	        $("#ntc_idx").val(Main.Model.db.row.ntc_idx);
	        $("#state_cd").val(Main.Model.db.row.state_cd);
   	        $("#title").val(Main.Model.db.row.title);
	        $("#writer").val(Main.Model.db.row.writer);
	        $("#content").val(Main.Model.db.row.content);
	        if (Main.Model.db.row.noticeType_cd == "B")
	            $("#noticeType_B").attr("checked", "checked");
	        else if (Main.Model.db.row.noticeType_cd == "T")
	            $("#noticeType_T").attr("checked", "checked");
			
	        $("#create_dt").val(Main.Model.db.row.create_dt);
        
        } catch (e) {JsErrorMessage(e); }        
    }

	//----------------------------------------
	// 모델 처리

	// $$ C
    Main.M_Insert = function () {
		try {
	        $.post(Main.FormBindUrl,
		        {
		            cmd				: "INSERT",
		            sto_id			: $("#sto_id").val(),
		            title			: $("#title").val(),
		            writer			: $("#writer").val(),
		            content			: $("#content").val(),
		            noticeType_cd	: $("input[type='radio'][name=noticeType_cd]:checked").val()
		        },
		        function (data, status) {
					var result = $.xml2json(data);
					Main.C_StatusMsg(result, status);
		        	if(status = "success" && result.return == "0")
		        		location.href = Main.ListURL;
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}                     
	}
	
	// $$ U
    Main.M_Update = function () {
		try {
	        $.post(Main.FormBindUrl,
		        {
		            cmd				: "UPDATE",
		            ntc_idx			: $("#ntc_idx").val(),
		            sto_id			: $("#sto_id").val(),
		            title			: $("#title").val(),
		            writer			: $("#writer").val(),
		            content			: $("#content").val(),
		            noticeType_cd	: $("input[type='radio'][name=noticeType_cd]:checked").val()
		        },
		        function (data, status) {
		        	var result = $.xml2json(data);
					Main.C_StatusMsg(result, status);
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}        
	}

	// $$ PK
    Main.M_Delete = function () {
		try {
	        $.post(Main.FormBindUrl,
		        {
		            cmd			: "DELETE",
		            ntc_idx		: $("#ntc_idx").val()
		        },
		        function (data, status) {
		        	var result = $.xml2json(data);
					Main.C_StatusMsg(result, status);
		        	if(status = "success" && result.return == "0")
		        		location.href = Main.ListURL;
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}              
	}

	
	//----------------------------------------
	// 기타
	Main.C_StatusMsg = function(result, status) {

		// $$ Code

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