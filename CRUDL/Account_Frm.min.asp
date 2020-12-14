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

%><!DOCTYPE html>
<html>
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
	<input type="hidden" id="acc_idx" name="acc_idx" value="" /> 
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
                        <th scope="row">아이디 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="adm_id" name="adm_id" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">이름 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="text" id="admName" name="admName" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
                    <tr>
                        <th scope="row">비밀번호 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input type="password" id="passwd" name="passwd" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">사용유무</th>
                        <td>
                            <input id="using_Y" type="radio" name="using_yn" value="Y" class="fChk" /> 사용</label> 
                            <input id="using_N" type="radio" name="using_yn" value="N" class="fChk" /> 중지</label> 
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">메모</th>
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
</script>
<script src="/Common/js/_w-meta-1.4.0.js?aaaaaaa"></script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelFormAjax       = _W.Meta.Bind.BindModelFormAjax;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelFormAjax();
    var params = ParamGet2JSON(location.href);
    var listURL = "Account_Lst.min.asp";

    e.baseUrl = "/admin/adm_mod/sto/Account.C.asp";
    e.baseAjaxSetup.type = "POST";

    e.addItem("cmd", "", ["create", "read", "update", "delete"],  ["valid", "bind"]);
    e.addItem("doctype", "JSON", [], "bind");
    e.addItem("sto_id", "S00001", [], ["valid", "bind"]);
    e.addItem("acc_idx", ParamGet2JSON(location.href).acc_idx, ["read", "update", "delete"], ["valid", "bind"]);
    e.add(new ItemDOM("adm_id", null, { 
            selector: "#adm_id",
            getter: function() { return $("#adm_id").val(); },
            setter: function(val) { $("#adm_id").val(val); }
        }), ["create", "update"], ["valid", "bind"]
    );
    e.add(new ItemDOM("passwd", null, { 
            selector: "#passwd",
            getter: function() { return $("#passwd").val(); },
            setter: function(val) { $("#passwd").val(val); }
        }), ["create", "update"], ["valid", "bind"]
    );
    e.add(new ItemDOM("admName", null, { 
            selector: "#admName",
            getter: function() { return $("#admName").val(); },
            setter: function(val) { $("#admName").val(val); }
        }), ["create", "update"], ["valid", "bind"]
    );
    e.add(new ItemDOM("use_yn", null, { 
            selector: ["input[name=using_yn]", "#using_Y", "#using_N"],
            getter: function() { return $("input[name=using_yn]:checked").val(); },
            setter: function(val) { 
                if (val === "Y" ) $("#using_Y").attr("checked", "checked");
                else $("#using_N").attr("checked", "checked");
            }
        }), ["create", "update"], ["valid", "bind"]
    );
    
    e.read.outputOption = 3;
    e.read.setItem(["adm_id", "admName", "use_yn", "passwd"], "output");

    e.read.onExecute = function(p_bindCommand) { e.read.bind.items["cmd"].value = "READ"; };
    e.update.onExecute = function(p_bindCommand) { e.update.bind.items["cmd"].value = "UPDATE"; };
    e.create.onExecute = function(p_bindCommand) { e.create.bind.items["cmd"].value = "CREATE"; };
    e.delete.onExecute = function(p_bindCommand) { e.delete.bind.items["cmd"].value = "DELETE"; };

    e.delete.cbValid = function() { return confirm("삭제 하시겠습니까 ?"); };
    e.delete.cbEnd = function(p_result) { location.href = listURL; };    
    e.update.cbValid = function() { return confirm("수정 하시겠습니까 ?"); };
    e.update.cbEnd = function() { return confirm("정상 수정 되었습니다."); };
    e.create.cbEnd = function() { location.href = listURL; };
    
    $("#btn_Update").click(function () { e.update.execute(); });
    $("#btn_Insert").click(function () { e.create.execute(); });
    $("#btn_Delete").click(function () { e.delete.execute(); });
    $("#btn_List").click(function () { location.href = listURL; });
    $("#btn_Reset").click(function () { $("form").each(function() { this.reset(); }); });

    if (params.mode === "CREATE") {
            $("#btn_Update").hide();
            $("#btn_Delete").hide();
            $("#btn_Insert").show();
            $("#btn_Reset").show();
    } else if (params.mode === "EDIT") {
            $("#adm_id").attr("readonly", "");
            $("#btn_Insert").hide();
            $("#btn_Update").show();
            $("#btn_Delete").show();
            $("#btn_Reset").hide();
    } else {
        Msg("ALERT", "오류", "mode 가 없습니다.");
    }

    $(document).ready(function () {
        if (params.mode === "EDIT") e.read.execute();
    });
</script>
</body>
</html>