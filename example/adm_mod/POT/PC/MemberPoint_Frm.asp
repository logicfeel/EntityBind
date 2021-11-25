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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/pot/memberPoint_Frm.asp?cmd=INSERT
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
    <link rel="stylesheet" type="text/css" href="/Admin/PC/css/suio.css" media="screen" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/Admin/PC/css/layout.css" media="screen" charset="utf-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		

	<script language="javascript" src="/Common/js/jquery.xml2json.js"></script>
	<script language="javascript" src="/Common/js/common.js?v1"></script>
	<script language="javascript" src="/Admin/adm_cmn/js/admin_common.js?v2"></script>
</head>
<body>

<div style="width:1020px">   
    <form id="frm_default" name="frm_default" method="post">
	<input type="hidden" id="account_idx" name="account_idx" value="" /> 
    <!-- 폼 내용 -->
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
                        <th scope="row">아이디 조회<strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="account_id" name="account_id" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">이름 </th>
                        <td>
                            홍길동
                        </td>                        
                    </tr>
                    <tr>
                        <th scope="row">포인트명 <strong class="icoRequired"></strong></th>
                        <td>
                            <select name="cars" size="1">
                            <option value="volvo">회원추천</option>
                            <option value="saab">재구매</option>
                            <option value="fiat">할인</option>
                            <option value="audi">VIP회원</option>
                            </select>                            
                        </td>
                        <th scope="row">지급/회수여부</th>
                        <td>
                            <input id="using_Y" type="radio" name="using_yn" value="Y" checked class="fChk" /> 지급(+)</label> 
                            <input id="using_N" type="radio" name="using_yn" value="N" class="fChk" /> 회수(-)</label> 
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">관리 메모</th>
                        <td colspan="3">
                        	<input type="text" id="memo" name="memo" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
		<!-- 버튼 -->
		<div class="mButton gCenter">
		    <a id="btn_Insert" class="btnSubmit"><span>등록</span></a>
		    <a id="btn_Update" class="btnSubmit"><span>수정</span></a>
		    <a id="btn_Delete" class="btnSubmit"><span>삭제</span></a>
		    <a id="btn_List" class="btnSearch reset"><span>목록</span></a>
		    <a id="btn_Reset" class="btnSearch reset"><span>초기화</span></a>
		</div>
        <!-- // 버튼 -->
    </div>
    <!-- // 폼 내용 -->
	<!-- 처리중 -->
	<div class="mLoading typeStatic">
	    <p>처리중입니다. 잠시만 기다려 주세요.</p>
	    <img src="http://img.echosting.cafe24.com/suio/ico_loading.gif" alt="" />
	</div>
	<!-- // 처리중 -->

    <!--###############  페이지 Block ###############-->
	<!-- 도움말 영역 -->

	<!-- // 도움말 영역 -->
    </form>
</div>        

<script>    
<!--


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
    //----------------------------------------
    $(document).ready(function () {
        Main.Init();
    });

//	Msg("ALERT", "ajaxError", msg, "");

    //----------------------------------------
    // 메인 초기화
    //----------------------------------------
    Main.Init = function () {
		
		// 값 설정
		Main.Form 			= $("#frm_default")[0];
        Main.callbackURL 	= "Account_Frm.C.asp";
        Main.ListURL 		= "Account_Lst.asp";

		// Get 로딩
        Main.Params = ParamGet2JSON(location.href);

        // 입력값 검사
        Main.ParamsValid();

        // 입력값 검사
        Main.Mode_Button(Main.Params.cmd);
        
        // 이벤트 등록
        Main.Event_Reg();


        if (Main.Params.cmd == "INSERT")
            this.Mode_Insert();
        else if (Main.Params.cmd == "UPDATE")
            this.Mode_Update();
                    
    };

    //----------------------------------------
    // 처리 버튼 이벤트 
    //----------------------------------------
    Main.Event_Reg = function () {
        $("#btn_Insert").click(function () {
            Main.Proc_Insert();
        });
        $("#btn_Update").click(function () {
            Main.Proc_Update();
        });
        $("#btn_Delete").click(function () {
            Main.Proc_Delete();
        });
        $("#btn_List").click(function () {
            location.href = Main.ListURL;
        });
        $("#btn_Addr").click(function () {
            zipCode_Pop();
        });
        $("#btn_Reset").click(function () {
            Main.Form.reset();
        });
        
    };

	//----------------------------------------
	// 진행현황 표시
    Main.loading = function (isBool) {
        if (isBool) {                       
            $('.mLoading').show();
        } else {
        	$('.mLoading').hide();
        }
    };
    
	//----------------------------------------
    // cmd 확인 * 필수  : INSERT / UPDATE
    //----------------------------------------
    Main.ParamsValid = function () {

        if (typeof (Main.Params) == "undefined" || typeof (Main.Params.cmd) == "undefined" || Main.Params.cmd == "") {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(cmd)", "B");
            return;
        }

        if (!(Main.Params.cmd == "INSERT" || Main.Params.cmd == "UPDATE")) {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(INSERT/UPDATE)", "B");
            return;
        }

        if (Main.Params.cmd == "UPDATE"
    			&& typeof (Main.Params.account_idx) == "undefined" && Main.Params.account_idx == "") {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(account_idx)", "B");
            return;
        }
    }    

	//----------------------------------------
	// 회면 모드 설정
	//----------------------------------------
    // 등록 모드
    Main.Mode_Insert = function () {
//        $("#sto_id").val(Main.Params.sto_id);
//        $("#create_dt_area").hide();
    };

    // 수정 모드
    Main.Mode_Update = function () {
        // admin_id 수정 금지 
        $("#account_id").prop("readonly", "")
        $("#account_id").prop("readonly", "")
        $("#account_id").prop("readonly", "")
        // 데이터 가져옴
        this.M_ViewBind(Main.Params.account_idx);
    }

    // 버튼 모드
    Main.Mode_Button = function (cmd) {

        //$("#btn_List").hide();    // 목록은 기본 보기임
        $("#btn_Insert").hide();
        $("#btn_Update").hide();
        $("#btn_Delete").hide();
		$("#btn_Reset").hide();
		
        if (cmd == "INSERT") {
            $("#btn_Insert").show();
            $("#btn_Reset").show();
        } else if (cmd == "UPDATE") {
            $("#btn_Update").show();
            $("#btn_Delete").show();
        }
    }
    
	//----------------------------------------
	// Valid 입력값 유효성 검사
	//----------------------------------------
    Main.Valid_Insert = function(){
        // 입력값 유효성 검사
        try{
            var frm = Main.Form;
            if(isNull(frm.level_cd, '계정 타입')){
	            return false;
            }else if(isNull(frm.account_id, '아이디')){
	            return false;
			}else if(isNull(frm.admName, '이름')){
	            return false;
			}else if(isNull(frm.passwd, '비밀번호')){
	            return false;	            	            
            }else{
	            return true;
            }
		} catch (e) {JsErrorMessage(e); }        
    };

    Main.Valid_Update = function(){
        // 입력값 유효성 검사
        try{
            var frm = Main.Form;
			if(isNull(frm.account_idx, '일련번호')){
	            return false;			            
			}else if(isNull(frm.admName, '이름')){
	            return false;
			}else if(isNull(frm.passwd, '비밀번호')){
	            return false;		
            }else{
	            return true;
            }
		} catch (e) {JsErrorMessage(e); }        
    };

    Main.Valid_Delete = function(){
        // 입력값 유효성 검사
        try{
            
            if (confirm('삭제하시겠습니까?')){

                var frm = Main.Form;
                if(isNull(frm.account_idx, '일련번호')){
	                return false;
                }else{
	                return true;
                }
            }
		} catch (e) {JsErrorMessage(e); }        
    };

	//----------------------------------------
	// Proc 처리 모드
	//----------------------------------------
    Main.Proc_Insert = function () {
        if (Main.Valid_Insert())                       
            Main.M_Insert();
    };
                
    Main.Proc_Update = function () {
        if (Main.Valid_Update())                       
            Main.M_Update();
    };

    Main.Proc_Delete = function () {
        if (Main.Valid_Delete())                       
            Main.M_Delete();
    };
    
    

	//----------------------------------------
	// 뷰 바인딩
	//----------------------------------------
    // 모델 뷰 바인딩 : Ajax
    Main.M_ViewBind = function (account_idx) {
		try {
	        Main.loading(true);
	        $.ajax({
	            type : 'POST',
	            url : Main.callbackURL,
	            data :
                {
                    cmd			: "SELECT",
                    account_idx	: account_idx
                },
	            async : false, 	// 동기로 임시로 처리(멀티요청)
	            success	: function (result) {
	                //alert("DatWa: " + result);
	                if (result != null) {
	                    Main.Model = $.xml2json(result);
	                }
	                Main.V_ViewBind();
	                Main.loading(false);
	            }
	        });
        } catch (e) {JsErrorMessage(e); } 
    }

    // 뷰 바인딩
    Main.V_ViewBind = function () {
		try {
	        //$("#CList").html("");
	        if (typeof (Main.Model.db) == "undefined") {
	            Msg("ALERT", "자료없음", "자료가 존재하지 않습니다.", "");
	            return;
	        }
	        $("#account_idx").val(Main.Model.db.row.account_idx);
	        $("#account_id").val(Main.Model.db.row.account_id);
	        $("#admName").val(Main.Model.db.row.admName);
   	        $("#passwd").val(Main.Model.db.row.passwd);
	        if (Main.Model.db.row.using_yn == "Y")
	            $("#using_Y").prop("checked", "checked");
	        else if (Main.Model.db.row.dealType_cd == "N")
	            $("#using_N").prop("checked", "checked");
			$("#memo").val(Main.Model.db.row.memo);
        	
        } catch (e) {JsErrorMessage(e); }        
    };

	//----------------------------------------
	// 모델 처리
	//----------------------------------------	
    Main.M_Insert = function () {
		try {
	        Main.loading(true);
	        $.post(Main.callbackURL,
		        {
		            cmd				: "INSERT",
		            level_cd		: $("input[type='radio'][name=level_cd]:checked").val(),
		            account_id		: $("#account_id").val(),
		            admName			: $("#admName").val(),
		            passwd			: $("#passwd").val(),
		            using_yn		: $("input[type='radio'][name=using_yn]:checked").val(),
		            memo			: $("#memo").val()
		        },
		        function (data, status) {
							var result = $.xml2json(data);
							Main.C_StatusMsg(result, status);
		        	if(status = "success" && Number(result.return) >= 0)
		        		location.href = Main.ListURL;
		        	Main.loading(false);
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}                     
	};
	
	
    Main.M_Update = function () {
		try {
			Main.loading(true);
	        $.post(Main.callbackURL,
		        {
		            cmd				: "UPDATE",
		            account_idx		: $("#account_idx").val(),
		            admName			: $("#admName").val(),
		            passwd			: $("#passwd").val(),
		            using_yn		: $("input[type='radio'][name=using_yn]:checked").val(),
		            memo			: $("#memo").val()

		        },
		        function (data, status) {
		        	var result = $.xml2json(data);
							Main.C_StatusMsg(result, status);
							Main.loading(false);
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}        
	};

    Main.M_Delete = function () {
		try {
			Main.loading(true);
	        $.post(Main.callbackURL,
		        {
		            cmd			: "DELETE",
		            account_idx	: $("#account_idx").val()
		        },
		        function (data, status) {
		        	var result = $.xml2json(data);
							Main.C_StatusMsg(result, status);
		        	if(status = "success" && Number(result.return) >= 0)
		        		location.href = Main.ListURL;
		        	Main.loading(false);
		        },
		        "xml"
		        );
        } catch (e) {JsErrorMessage(e);}              
	};

	
	//----------------------------------------
	// 기타
	//----------------------------------------	
	Main.C_StatusMsg = function(result, status) {


		if(status = "success" && Number(result.return) >= 0)
			alert("정상 처리 되었습니다.");
		else if(status = "success")
			alert("DB 처리 오류가 발생하다. 오류코드:" + result.return);            	
		else if(status = "error")
			alert("ajax 처리중 오류가 발생하다.");
		else if(status = "timeout")
			alert("네트워크 접속 오류가 발생하다.");
		else
			alert("Data: " + data + "\nStatus: " + status);
	};




// ************** CRUD 템플릿  ************************
var CRUDL = {
    Mode: {
        create: null,
        read: null,
        edit: null,
        list: null
    },
    Process: {              // 공통
        create: null,       // 공통
        read: null,         // 공통
        update: null,       // 공통
        delete: null,       // 공통
        list: null          // 공통
    },
    Valid: {
        create: null,
        read: null,
        update: null,
        delete: null,
        list: null
    },
    Model: {
        create: null,
        read: null,
        update: null,
        delete: null,
        list: null
    },
    Callback: {             // 공통
        create: null,       // 공통
        read: null,         // 공통
        update: null,       // 공통
        delete: null,       // 공통
        list: null          // 공통
    },
    Bind: {
        read: null,     
        list: null          // 직접구현해야함
    },
    LinkURL: {              // 공통
        create: null,       // 공통
        read: null,         // 공통
        update: null,       // 공통
        list: null,         // 공통
    }
    init: null,             // 공통 + 오버라이딩
    callbackMsg: null,      // 공통
    regEvent: null,
    accessCheck: null,      // 하위 : List, Form 
    loading: null,          // 하위 : List, Form 

    Model: null,
    Prop: {                 // 공통
        Form: null,
        ModelURL: null,
        LinkURL: {C: null, R: null, U: null, L: null}
        Items: [    // TODO::
            {
                formElem: Object,
                id: String,
                caption: String,
                Valid: {C: true, R: true, U: true, D: true, L: true}
                Model: {C: true, R: true, U: true, D: true, L: true}
                Bind: {R: true, L: true}
            }
        ]
    }
};


// ************** // CRUD 템플릿  ************************
-->
</script>
</body>
</html>            