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
<script src="/Common/js/_w-meta-1.4.0.test.js"></script>

<script>
    // #######################################################################################################
    // 특정 기능을 수행하는 화면을 Frm, Edit 기능을 기준으로 
    var util                    = _W.Common.Util;
    var IBindModelForm          = _W.Interface.IBindModelForm;

    function BaseFormDI() {
        IBindModelForm.call(this);

        var params = ParamGet2JSON(location.href);          // admin_common.js

        this.attr["mode"]       = params.mode;
        this.attr["listURL"]    = "";

        this.cbFail = function(p_result, p_item) {          // 전역 실패 콜백
            console.warn("실패 :: Value=\"%s\", Code=\"%s\", Message=\"%s\" ", p_result.value, p_result.code, p_result.msg);
            Msg("ALERT", "실패", p_result.msg);
            if (typeof p_item.selector[0] === "string") $(p_item.selector[0]).focus();
        };
        this.cbError = function(p_msg, p_status) {          // 전역 오류 콜백
            console.warn("오류 :: Status=\"%s\" , Message=\"%s\" ", p_status, p_msg);
            Msg("ALERT", "오류", p_msg);
        };
        this.onExecute = function(p_bindCommand) {          // 실행시 이벤트 등록
            console.log("onExecute 이벤트. ");
            $('.mLoading').show();
        };
        this.onExecuted = function(p_bindCommand) {         // 실행끝 이벤트 등록
            console.log("onExecuted 이벤트.. ");
            $('.mLoading').hide();
        };

    }
    util.inherits(BaseFormDI, IBindModelForm);
    // 정적 메소드
    BaseFormDI.createMode = function() {
            $("#btn_Update").hide();
            $("#btn_Delete").hide();
            $("#btn_Insert").show();
            $("#btn_Reset").show();
    };
    BaseFormDI.editMode = function() {
            $("#adm_id").attr("readonly", "");
            $("#btn_Insert").hide();
            $("#btn_Update").show();
            $("#btn_Delete").show();
            $("#btn_Reset").hide();
    };
    // 가상 메소드
    BaseFormDI.prototype.cbRegister = function() {
        console.log("cbRegister : 이벤트 및 설정 등록 ");

        var _this = this;   // jqeury 함수 내부에서 this 접근시 사용

        this.delete.cbValid = function() {          // delete
            return confirm("삭제 하시겠습니까 ?");
        };
        this.delete.cbEnd = function(p_result) {
            location.href = _this.first.items["listURL"].value;
        };    
        this.update.cbValid = function() {          // update
            return confirm("수정 하시겠습니까 ?");
        };
        this.update.cbEnd = function() {
            return confirm("정상 수정 되었습니다.");
        };
        this.create.cbEnd   = function() {          // create
            alert("정상 등록되었습니다.");
            location.href = this._baseEntity.items["listURL"].value;
        };
        
        $("#btn_Update").click(function () {
            _this.update.execute();
        });
        $("#btn_Insert").click(function () {
            _this.create.execute();
        });
        $("#btn_Delete").click(function () {
            _this.delete.execute();
        });
        $("#btn_List").click(function () {
            location.href = _this.first.items["listURL"].value;
        });
        $("#btn_Reset").click(function () {
            $("form").each(function() {
                this.reset();
            });
        });
    };
    BaseFormDI.prototype.cbCheck = function() {   // 2.검사
        console.log("cbCheck : 화면 유효성 검사 ");

        if (typeof this.attr.mode === "undefined" || this.attr.mode === "") {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(cmd)", "A");
            return false;
        }
        if (!(this.attr.mode === "CREATE" || this.attr.mode == "EDIT")) {
            Msg("ALERT", "접근경로", "잘못된 접근경로입니다.(INSERT/UPDATE)", "A");
            return false;
        }
        return true;
    };
    BaseFormDI.prototype.cbReady = function() {
        console.log("cbReady : 준비완료 ");
        
        if (this.attr.mode === "CREATE") {
            BaseFormDI.createMode();
        } else if (this.attr.mode === "EDIT") {
            BaseFormDI.editMode();
        }    
    };
</script>
<script>
    // #######################################################################################################
    // 특정 비즈니스를 담당하는 기능 (Account_Frm)
    var util                    = _W.Common.Util;
    var BaseFormDI              = BaseFormDI;

    function AccountFormDI() {
        BaseFormDI.call(this);

        // 업무 속성
        this.attr["acc_idx"] = {caption: "일련번호", value: ""};
        this.attr["sto_id"] = "S00001";
        this.attr["adm_id"] = {
            caption: "관리자ID",
            selector: "#adm_id",
            getter: function() { return $("#adm_id").val(); },
            setter: function(val) { $("#adm_id").val(val); }
        };
        this.attr["passwd"] = {
            caption: "비밀번호",
            selector: "#passwd",
            getter: function() { return $("#passwd").val(); },
            setter: function(val) { $("#passwd").val(val); }
        };
        this.attr["admName"] = {
            caption: "관리자명", 
            selector: "#admName",
            getter: function() { return $("#admName").val(); },
            setter: function(val) { $("#admName").val(val); }
        };
        this.attr["use_yn"] = {
            caption: "사용유무", 
            selector: ["input[name=using_yn]", "#using_Y", "#using_N"],
            getter: function() { return $("input[name=using_yn]:checked").val(); },
            setter: function(val) { 
                if (val === "Y" ) $("#using_Y").attr("checked", "checked");
                else $("#using_N").attr("checked", "checked");
            }
        };
    }
    util.inherits(AccountFormDI, BaseFormDI);
    // 데코레이션 메소드
    AccountFormDI.prototype.cbRegister = function() {
        BaseFormDI.prototype.cbRegister.call(this);
    };
    AccountFormDI.prototype.cbCheck = function() {
        if (BaseFormDI.prototype.cbCheck.call(this)) {
            if (this.checkSelector()) {                             // 선택자 검사
                console.log("cbCheck : 선택자 검사 => 'Success' ");
                return true;
            }
        }
        return false;    
    };
    AccountFormDI.prototype.cbReady = function() {
        BaseFormDI.prototype.cbReady.call(this);
        if (this.attr.mode === "EDIT")  this.read.execute();        // 수정모드 시 실행(execute)
    };
</script>
<script>
    // #######################################################################################################
    // 모델(SP) 기능에 맞는  설정  (Account_SP_CRUDL)
    var BindModelFormAjax       = _W.Meta.Bind.BindModelFormAjax;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var e = new BindModelFormAjax(new AccountFormDI(), true, ItemDOM);

    e.baseUrl = "/admin/adm_mod/sto/Account.C.asp";                 // 생성 및 설정
    e.first.items["listURL"].value = "Account_Lst.D.asp";
    e.baseAjaxSetup.type = "POST";

    e.addItem("cmd", "", [], "bind");                               // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");

    e.read.setItem(["acc_idx"], ["valid", "bind"]);
    e.read.setItem(["adm_id", "admName", "use_yn", "passwd"], "output");
    e.read.outputOption = 3;
    e.read.bind.items["acc_idx"].value = ParamGet2JSON(location.href).acc_idx;
    e.read.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "READ"; };

    e.update.setItem(["acc_idx", "adm_id" ], "valid");
    e.update.setItem(["acc_idx", "admName", "use_yn", "passwd"], "bind");
    e.update.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "UPDATE"; };

    e.create.setItem(["sto_id", "adm_id", "admName", "passwd", "use_yn"], ["valid", "bind"]);
    e.create.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "CREATE"; };

    e.delete.setItem(["acc_idx"], ["valid", "bind"]);
    e.delete.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };
    //--------------------------------------------------------------
    $(document).ready(function () {
        e.init();
    });
</script>
</body>
</html>