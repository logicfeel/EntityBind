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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/prt/product_Frm.asp?cmd=INSERT
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
                        <th scope="row">상품명 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                        	<input type="text" id="prtName" name="prtName" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>
                   <tr>
                        <th scope="row">상품타입 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                            <input id="type_DE" type="radio" name="type_cd" value="DE" checked class="fChk" /> 배송상품</label> 
                            <input id="type_RE" type="radio" name="type_cd" value="RE" class="fChk" /> 렌탈상품 </label> 
                        </td>                        
                    </tr>                    
                    <tr  id="CImage">
                        <th scope="row">이미지</th>
                        <td colspan="3">
                            <table border="1" summary="" class="eChkColor">
                                <caption>목록</caption>
                                <!--###############  제목 크기 Block ###############-->
                                <colgroup>
                                    <col style="width:50%">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                </colgroup>
                                <!--###############  검색 제목 Block ###############-->
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <strong>파일명</strong>
                                        </th>
                                        <th scope="col">
                                            <strong>위치</strong>
                                        </th>
                                        <th scope="col">
                                            <strong>순번</strong>
                                        </th>
                                        <th scope="col">
                                            <strong>처리</strong> 
                                        </th>
                                    </tr>
                                </thead>                        
                                <tbody class="center" id="CImage_List">
                                    <tr><td colspan='4' align='center'>자료가 없습니다.</td></tr>
                                </tbody>
                                <tfoot class="center" id="CForm">
                                    <tr class="">
                                        <td>
                                            <input type="text" id="fileName" value="" class="fText"style="width:90%;" />
                                        </td>
                                        <td>
                                            <select id="position_cd" class="fSelect">
                                                <option value="B" selected>대표이미지(상세)</option>
                                                <option value="M">중간이미지(목록)</option>
                                                <option value="S">작은이미지(목록)</option>
                                                <option value="E">기타이미지</option>
                                            </select>
                                        </td>			            	
                                        <td>
                                            <input type="text" id="rank_it" name="rank_it" value="99" class="fText" style="width:50px;" />
                                        </td>
                                        <td>
                                            <p id="btn_Insert_Image" class="btnNormal"><span>등록</span></p>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>                            

                        </td>
                    </tr>                    
                    <tr>
                        <th scope="row">상품상태 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                            <input id="state_SS" type="radio" name="state_cd" value="SS" checked class="fChk" /> 판매 </label> 
                            <input id="state_RS" type="radio" name="state_cd" value="RS" class="fChk" /> 예약판매</label> 
                            <input id="state_DS" type="radio" name="state_cd" value="DS" class="fChk" /> 재고없음</label> 
                            <input id="state_DH" type="radio" name="state_cd" value="DH" class="fChk" /> 판매중지(전시중지)</label> 
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">판매시작일 </th>
                        <td>
                            <input type="text" id="begin_dt" name="begin_dt" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">판매종료일 </th>
                        <td>
                            <input type="text" id="close_dt" name="close_dt" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
                    <tr>
                        <th scope="row">상품종류 </th>
                        <td>
                            <input id="kind_XXX" type="radio" name="kind_cd" value="XXX" checked class="fChk" /> 기본</label> 
                            <input id="kind_NEW" type="radio" name="kind_cd" value="NEW" class="fChk" /> 신상품</label> 
                            <input id="kind_POP" type="radio" name="kind_cd" value="POP" class="fChk" /> 인기상품</label> 
                            <input id="kind_REC" type="radio" name="kind_cd" value="REC" class="fChk" /> 추천상품</label> 
                        </td>
                        <th scope="row">재고수 </th>
                        <td>
                            <input type="text" id="stock_it" name="stock_it" value="999" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
<!--
                    <tr>
                        <th scope="row">브랜드</th>
                        <td colspan="3">
                            <select name="cars" size="1">
                            <option value="volvo">타이니러브</option>
                            <option value="saab">잉글리시나</option>
                            <option value="fiat">비엔케이</option>
                            <option value="audi">베이비존</option>
                            </select>                                 
                        </td>
                    </tr> 
-->
                     <tr>
                        <th scope="row">키워드 </th>
                        <td>
                            <input type="text" id="keyword" name="keyword" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">추천개월수 </th>
                        <td>
                            <input type="text" id="recommRange" name="recommRange" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>

                    <tr id="COption">
                        <th scope="row">옵션가격</th>
                        <td colspan="3">
                            <table border="1" summary="" class="eChkColor">
                                <caption>목록</caption>
                                <!--###############  제목 크기 Block ###############-->
                                <colgroup>
                                    <col class="chk">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                </colgroup>
                                <!--###############  검색 제목 Block ###############-->
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <strong>기본유무</strong>
                                        </th>
                                        <th scope="col">
                                            <strong>옵션명</strong>
                                        </th>
                                        <th scope="col">
                                            <strong>판매가</strong>
                                        </th>
                                        <th scope="col">
                                            <strong>할인가</strong>
                                        </th>
                                        <th scope="col">
                                            <strong>지급포인트</strong>
                                        </th>                        
                                        <th scope="col">
                                            <strong>처리</strong> 
                                        </th>
                                    </tr>
                                </thead>                        
                                <tbody class="center" id="COption_List">
                                    <tr><td colspan='6' align='center'>자료가 없습니다.</td></tr>
                                </tbody>
                                <tfoot class="center" id="CForm">
                                    <tr class="">
                                        <td>
                                            <input id="default_yn" type="checkbox" name="Allselect" class="allChk" value="Y">
                                        </td>			            	
                                        <td>
                                            <input type="text" id="optName" name="optName" value="" class="fText" style="width:80px;" />
                                        </td>
                                        <td>
                                            <input type="text" id="sell_mn" name="sell_mn" value="" class="fText" style="width:50px;" />
                                        </td>
                                        <td class="txtCode">
                                            <input type="text" id="discount_mn" name="discount_mn" value="0" class="fText" style="width:50px;" />
                                        </td>
                                        <td>
                                            <input type="text" id="point_it" name="point_it" value="0" class="fText" style="width:50px;" />
                                        </td>
                                        <td>
                                        <p id="btn_Insert_Option" class="btnNormal"><span>등록</span></p>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>                            
                        </td>
                    </tr>                                        
                    <tr>
                        <th scope="row">상품설명</th>
                        <td colspan="3">
                        	<!--<input type="textarea" id="contents" name="contents" value="" style="width:600px;height:300px;word-break:break-all;" />-->
                            <textarea id="contents"  class="fTextarea" style="width:100%; height:500px"></textarea>
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

<!-- 네이버 웹에디터 -->
<script type="text/javascript" src="/nhn_editor/js/service/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript">
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "contents",      // textarea id
        sSkinURI: "/nhn_editor/SmartEditor2Skin.html",
        fCreator: "createSEditor2"
    });
</script>


<script src="/Common/js/_w-meta-1.4.0.js?aaa"></script>
<script src="/Admin/adm_cmn/DI/base-di.js?aaaa"></script>
<script src="/Admin/adm_cmn/DI/base-form-di.js?aaaa"></script>
<script src="/Admin/adm_cmn/DI/base-list-form-di.js?aaaaa"></script>
<script src="/Admin/adm_mod/PRT/DI/product-form-di.js?aa"></script>
<script>
    // #######################################################################################################
    // 1. 네임스페이스 정의 및 생성
    var BindModelFormAjax       = _W.Meta.Bind.BindModelFormAjax;
    var ProductFormDI           = _W.Meta.Bind.ProductFormDI;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    
    var e = new BindModelFormAjax(new ProductFormDI(), true, ItemDOM);

    //--------------------------------------------------------------    
    // 2. 객체 설정 (등록)
    e.baseUrl = "/Admin/adm_mod/PRT/Product.C.asp";                 // 생성 및 설정
    e.first.items["listURL"].value = "Product_Lst.asp";
    e.baseAjaxSetup.type = "POST";
    e.read.outputOption = 3;

    //--------------------------------------------------------------    
    // 3. 아이템 등록 및 설정(추가)
    e.addItem("cmd", "", [], "bind");                               // 전역 아이템 추가
    e.addItem("doctype", "JSON", [], "bind");
    
    //--------------------------------------------------------------    
    // 4. 콜백 함수 구현
    e.read.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "READ"; 
        e.read.bind.items["prt_id"].value = ParamGet2JSON(location.href).prt_id;
    };
    e.update.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "UPDATE"; 
        oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    e.create.onExecute = function(p_bindCommand) { 
        this.bind.items["cmd"].value = "CREATE"; 
        oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    e.delete.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };

    e.read.cbEnd   = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
        var result = entity["return"];

        if (result < 0) {
            alert("조회 처리가 실패 하였습니다. Result Code : " + result);
        } else {
            opt.list.execute();     // 가격옵션 목록 불러오기
            img.list.execute();     // 가격옵션 목록 불러오기
        }
    };
    e.create.cbEnd   = function(p_res) {     // create
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
        var result = entity["return"];

        if (result >= 0) { 
            alert("정상 등록되었습니다.");
            location.href = "?mode=EDIT&prt_id=" +  result;
        } else {
            alert("등록 처리가 실패 하였습니다. Result Code : " + result);
        }
    };
    // #######################################################################################################
    // 1. 네임스페이스 정의 및 생성
    var BindModelListAjax       = _W.Meta.Bind.BindModelListAjax;
    var BindCommandEditAjax     = _W.Meta.Bind.BindCommandEditAjax;
    var BaseListFormDI          = _W.Meta.Bind.BaseListFormDI;
    
    var img                     = new BindModelListAjax(new BaseListFormDI());  // 의존성 주입함

    img.update = new BindCommandEditAjax(img, img._baseEntity);
    img.delete = new BindCommandEditAjax(img, img._baseEntity);
    img.create = new BindCommandEditAjax(img, img._baseEntity);
    
    //--------------------------------------------------------------    
    // 2. 객체 설정 (등록)
    img.baseUrl = "/Admin/adm_mod/PRT/Image.C.asp";

    //--------------------------------------------------------------    
    // 3. 아이템 등록 및 설정(추가)
    img.addItem("cmd", "", [], "bind");
    img.addItem("doctype", "JSON", [], "bind");    
    img.addItem("prt_id", "", ["create", "list"], ["valid", "bind"]);
    img.addItem("page_size", "0", ["list"], "bind");
    img.addItem("img_idx", "",      ["update", "delete", "update"], ["valid", "bind"]);
    img.addItem("fileName", "",     ["create", "update"], ["valid", "bind"]);
    img.addItem("position_cd", "",  ["create", "update"], ["valid", "bind"]);
    img.addItem("rank_it", "",      ["create", "update"], ["bind"]);

    img.first.items["fileName"].isNotNull = true;
    img.first.items["position_cd"].isNotNull = true;

    //--------------------------------------------------------------    
    // 4. 콜백 함수 구현
    img.onExecute = function(p_bindCommand) { 
        this.first.items["prt_id"].value = e.first.items["prt_id"].value; 
    };

    img.create.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "CREATE"; };
    img.update.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "UPDATE"; };
    img.delete.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };
    img.list.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "LIST"; };

    img.update.onExecuted = function(p_bindCommand) { img.list.execute(); };
    img.delete.onExecuted = function(p_bindCommand) { img.list.execute(); };
    img.create.onExecuted = function(p_bindCommand) { 
        img.list.execute(); 
    };
    
    img.list.cbOutput = function(p_entity) {
        var entity      = this.output;
        var strHtml;
        var idx;

        $("#CImage_List").html("");
        if (entity.rows.count === 0) {
            $("#CImage_List").append("<tr><td colspan='4' align='center'>자료가 없습니다.</td></tr>");
        } else {
            var checked;
            for (var i = 0; i < entity.rows.count; i++) {
                idx = entity.rows[i].img_idx;

                strHtml = "";
                strHtml = strHtml + "<tr>";
                strHtml = strHtml + "<td><input type='text' id='fileName_"+ idx +"' value='"+ entity.rows[i].fileName +"' class='fText' style='width:90%;' /></td>";
                strHtml = strHtml + "<td><select id='position_cd_"+ idx +"' class='fSelect'>";
                strHtml = strHtml + "<option value='B' ";
                if (entity.rows[i].position_cd === "B" ) strHtml = strHtml + "selected"; 
                strHtml = strHtml + " >대표이미지(상세)</option>";
                strHtml = strHtml + "<option value='M' ";
                 if (entity.rows[i].position_cd === "M" ) strHtml = strHtml + "selected";
                 strHtml = strHtml + ">중간이미지(목록)</option>";
                strHtml = strHtml + "<option value='S' ";
                 if (entity.rows[i].position_cd === "S" ) strHtml = strHtml + "selected";
                 strHtml = strHtml + ">작은이미지(목록)</option>";
                strHtml = strHtml + "<option value='E' ";
                if (entity.rows[i].position_cd === "E" ) strHtml = strHtml + "selected";
                strHtml = strHtml + ">기타이미지</option>";
                strHtml = strHtml + "</select></td>";
                strHtml = strHtml + "<td><input type='text' id='rank_it_"+ idx +"' value='"+ entity.rows[i].rank_it +"' class='fText' style='width:50px;' /></td>";
                strHtml = strHtml + "<td>";
                strHtml = strHtml + " <p id='btn_Update_Image' onClick=\"updateImage('"+ idx +"');\" class='btnNormal'><span> 수정 </span></p>&nbsp; ";
                strHtml = strHtml + " <p id='btn_Delete_Image' onClick=\"deleteImage('"+ idx +"');\" class='btnNormal'><span> 삭제 </span></p> ";
                strHtml = strHtml + "</td>";
                strHtml = strHtml + "</tr>";
                $("#CImage_List").append(strHtml); 
            }
        }
    };

    img.create.onExecuted = function(p_cmd, p_res) {
        var entity, result;
        if (typeof p_res !== "undefined" ) {
            entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
            result = entity["return"];
            if (result >= 0) { 
                // 입력폼 초기화
                $("#fileName").val("");
            }
        }   
    };

    //--------------------------------------------------------------    
    // 5. 이벤트 등록    
    $("#btn_Insert_Image").click(function () {
        img.first.items["fileName"].value = $("#fileName").val();
        img.first.items["position_cd"].value =  $("#position_cd option:selected").val();
        img.first.items["rank_it"].value = $("#rank_it").val();
        img.create.execute();
    });
    
    //--------------------------------------------------------------    
    // 6. 외부 호출 함수 구현 
    function updateImage(p_img_idx) {
        img.first.items["fileName"].value = $("#fileName_" + p_img_idx).val();
        img.first.items["position_cd"].value = $("#position_cd_" + p_img_idx).val();
        img.first.items["rank_it"].value = $("#rank_it_" + p_img_idx).val();
        img.first.items["img_idx"].value = p_img_idx;
        img.update.execute();
    }
    function deleteImage(p_img_idx) {
        img.first.items["img_idx"].value = p_img_idx;
        img.delete.execute();
    }    

    // img.update.cbBind = function(a) {          // delete
    //     console.log(22);
    // };
    
    // #######################################################################################################
    // 1. 네임스페이스 정의 및 생성
    var BindModelListAjax       = _W.Meta.Bind.BindModelListAjax;
    var BindCommandEditAjax     = _W.Meta.Bind.BindCommandEditAjax;
    var BaseListFormDI          = _W.Meta.Bind.BaseListFormDI;
    
    var opt                     = new BindModelListAjax(new BaseListFormDI());

    opt.update = new BindCommandEditAjax(opt, opt._baseEntity);
    opt.delete = new BindCommandEditAjax(opt, opt._baseEntity);
    opt.create = new BindCommandEditAjax(opt, opt._baseEntity);
    
    //--------------------------------------------------------------    
    // 2. 객체 설정 (등록)
    opt.baseUrl = "/Admin/adm_mod/PRT/Option.C.asp";

    //--------------------------------------------------------------    
    // 3. 아이템 등록 및 설정(추가)
    opt.addItem("cmd", "", [], "bind");
    opt.addItem("doctype", "JSON", [], "bind");    
    // opt.addItem("prt_id", "", ["update", "delete"], ["valid", "bind"]);
    opt.addItem("prt_id", "", [], "bind");
    opt.addItem("page_size", "", ["list"], "bind");
    opt.addItem("opt_idx", "",      ["delete", "update"], ["valid", "bind"]);
    opt.addItem("default_yn", "",   ["create", "update"], ["bind"]);
    opt.addItem("optName", "",      ["create", "update"], ["valid", "bind"]);
    opt.addItem("sell_mn", "",      ["create", "update"], ["valid", "bind"]);
    opt.addItem("discount_mn", "",  ["create", "update"], ["bind"]);
    opt.addItem("point_it", "",     ["create", "update"], ["bind"]);

    opt.first.items["optName"].isNotNull = true;
    opt.first.items["sell_mn"].isNotNull = true;

    //--------------------------------------------------------------    
    // 4. 콜백 함수 구현

    opt.onExecute = function(p_bindCommand) { 
        this.first.items["prt_id"].value = e.first.items["prt_id"].value; 
    };

    opt.create.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "CREATE"; };
    opt.update.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "UPDATE"; };
    opt.delete.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "DELETE"; };
    opt.list.onExecute = function(p_bindCommand) { this.bind.items["cmd"].value = "LIST"; };

    opt.update.onExecuted = function(p_bindCommand) { opt.list.execute(); };
    opt.delete.onExecuted = function(p_bindCommand) { opt.list.execute(); };
    opt.create.onExecuted = function(p_bindCommand) { opt.list.execute(); };
    
    opt.list.cbOutput = function(p_entity) {
        var entity      = this.output;
        var strHtml;
        var idx;
        $("#COption_List").html("");
        if (entity.rows.count === 0) {
            $("#COption_List").append("<tr><td colspan='6' align='center'>자료가 없습니다.</td></tr>");
        } else {
            var checked;
            for (var i = 0; i < entity.rows.count; i++) {
                idx = entity.rows[i].opt_idx;
                checked = entity.rows[i].default_yn === "Y" ? "checked" : "";
                strHtml = "";
                strHtml = strHtml + "<tr>";
                strHtml = strHtml + "<td><input id='default_yn_"+ idx +"' type='checkbox' "+ checked +" value='Y'></td>";
                strHtml = strHtml + "<td><input type='text' id='optName_"+ idx +"' name='optName' value='"+ entity.rows[i].optName +"' class='fText' style='width:80px;' /></td>";
                strHtml = strHtml + "<td><input type='text' id='sell_mn_"+ idx +"' name='sell_mn' value='"+ entity.rows[i].sell_mn +"' class='fText' style='width:50px;' /></td>";
                strHtml = strHtml + "<td><input type='text' id='discount_mn_"+ idx +"' name='discount_mn' value='"+ entity.rows[i].discount_mn +"' class='fText' style='width:50px;' /></td>";
                strHtml = strHtml + "<td><input type='text' id='point_it_"+ idx +"' name='point_it' value='"+ entity.rows[i].point_it +"' class='fText' style='width:50px;' /></td>";
                strHtml = strHtml + "<td>";
                strHtml = strHtml + " <p id='btn_Update_Option' onClick=\"updateOption('"+ idx +"');\" class='btnNormal'><span> 수정 </span></p>&nbsp; ";
                strHtml = strHtml + " <p id='btn_Delete_Option' onClick=\"deleteOption('"+ idx +"');\" class='btnNormal'><span> 삭제 </span></p> ";
                strHtml = strHtml + "</td>";
                strHtml = strHtml + "</tr>";
                $("#COption_List").append(strHtml); 
            }
        }
    };
    opt.create.onExecuted = function(p_cmd, p_res) {
        var entity, result;
        if (typeof p_res !== "undefined" ) {
            entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
            result = entity["return"];
            if (result >= 0) { 
                 // 입력폼 초기화
                 $("input:checkbox[id=default_yn]").prop("checked", false);
                $("#optName").val("");
                $("#sell_mn").val("");
                $("#discount_mn").val("0");
                $("#point_it").val("0");     
            }
        }   
    };

    //--------------------------------------------------------------    
    // 5. 이벤트 등록    
    $("#btn_Insert_Option").click(function () {
        opt.first.items["default_yn"].value =  $("input:checkbox[id=default_yn]").is(":checked") ? "Y" : "N";
        opt.first.items["optName"].value = $("#optName").val();
        opt.first.items["sell_mn"].value = $("#sell_mn").val();
        opt.first.items["discount_mn"].value = $("#discount_mn").val();
        opt.first.items["point_it"].value = $("#point_it").val();
        opt.create.execute();
    });
    
    //--------------------------------------------------------------    
    // 6. 외부 호출 함수 구현 
    function updateOption(p_opt_idx) {
        opt.first.items["default_yn"].value = $("input:checkbox[id=default_yn_"+ p_opt_idx+"]").is(":checked") ? "Y" : "N";
        opt.first.items["optName"].value = $("#optName_" + p_opt_idx).val();
        opt.first.items["sell_mn"].value = $("#sell_mn_" + p_opt_idx).val();
        opt.first.items["discount_mn"].value = $("#discount_mn_" + p_opt_idx).val();
        opt.first.items["point_it"].value = $("#point_it_" + p_opt_idx).val();
        opt.first.items["opt_idx"].value = p_opt_idx;
        opt.update.execute();
    }
    function deleteOption(p_opt_idx) {
        opt.first.items["opt_idx"].value = p_opt_idx;
        opt.delete.execute();
    }
    //--------------------------------------------------------------
    // 0. 준비완료 후 실행 정의
    $(document).ready(function () {
        if (e.prop["mode"] === "CREATE") {
            $("#CImage").hide();
            $("#COption").hide();
        } else {
            $("#CImage").show();
            $("#COption").show();
            $("input:radio[name=type_cd]").prop("disabled", "true");
        }
        e.init();
        img.init();
        opt.init();
    });

</script>

</body>
</html>