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
    </form>

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
                        	<input type="text" id="m-prtName" name="prtName" value="" class="fText" style="width:600px;" />
                        </td>
                    </tr>
                   <tr>
                        <th scope="row">상품타입 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                            <input readonly id="type_DE" type="radio" name="m-type_cd" value="DE" checked class="fChk" /> 배송상품</label> 
                            <input readonly id="type_RE" type="radio" name="m-type_cd" value="RE" class="fChk" /> 렌탈상품 </label> 
                        </td>                        
                    </tr>                    
                    <tr  id="area-photo">
                        <th scope="row">이미지</th>
                        <td colspan="3">
                            <table border="1" summary="" class="eChkColor">
                                <caption>목록</caption>
                                <!--###############  제목 크기 Block ###############-->
                                <colgroup>
                                    <col style="width:120px">
                                    <col style="width:40%">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                    <col style="width:auto">
                                </colgroup>
                                <!--###############  검색 제목 Block ###############-->
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <strong>이미지</strong>
                                        </th>
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
                                <tbody class="center" id="s-area-photo">
                                    <tr><td colspan='5' align='center'>자료가 없습니다.</td></tr>
                                </tbody>

                                <script id="s-temp-photo" type="text/x-handlebars-template">
                                    {{#rows}}
                                    <tr class="">
                                        <td>
                                            <a href="{{fileName}}" target="_blank"><img src="{{fileName}}" style="width:50px"/></a>
                                        </td>
                                        <td>
                                            <input type="hidden" name="s-img_idx" row_count="{{row_count}}" value="{{img_idx}}"  />
                                            <input type="text" name="s-fileName" row_count="{{row_count}}" value="{{fileName}}" class="fText" style="width:90%;" />
                                        </td>
                                        <td>
                                            <select name="s-position_cd" row_count="{{row_count}}" class="fSelect" value="{{position_cd}}" >
                                                <option value="B" {{selected position_cd "B"}}>대표이미지(상세)</option>
                                                <option value="M" {{selected position_cd "M"}}>중간이미지(목록)</option>
                                                <option value="S" {{selected position_cd "S"}}>작은이미지(목록)</option>
                                                <option value="E" {{selected position_cd "E"}}>기타이미지</option>
                                                
                                            </select>
                                        </td>
                                        <td><input type='text' name="s-rank_it"  row_count="{{row_count}}" value='{{rank_it}}' class='fText' style='width:50px;' /></td>
                                        <td>
                                            <p onClick="photo.fn.procUpdate('{{row_count}}');" class='btnNormal'><span> 수정 </span></p>&nbsp;
                                            <p onClick="photo.fn.procDelete('{{row_count}}');" class='btnNormal'><span> 삭제 </span></p> 
                                        </td>
                                    </tr>
                                    {{/rows}} 
                                </script>      

                                <tfoot class="center" id="CForm">
                                    <tr class="">
                                        <td  colspan="2">
                                            <input type="text" id="m-fileName" value="" class="fText"style="width:90%;" />
                                        </td>
                                        <td>
                                            <select id="m-position_cd" class="fSelect">
                                                <option value="B" selected>대표이미지(상세)</option>
                                                <option value="M">중간이미지</option>
                                                <option value="S">작은이미지</option>
                                                <option value="E">기타이미지</option>
                                            </select>
                                        </td>			            	
                                        <td>
                                            <input type="text" id="m-rank_it" name="rank_it" value="99" class="fText" style="width:50px;" />
                                        </td>
                                        <td>
                                            <p id="btn_Insert_Photo" class="btnNormal"><span>등록</span></p>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>                            

                        </td>
                    </tr>                    
                    <tr id="s-area-upload-1" style="display:none;">
                        <th scope="row">파일업로드 </th>
                        <td  colspan="3">
                            <table>
                                <thead>
                                <tr>
                                    <th>원본이름</th>
                                    <th>경로</th>
                                    <th>처리</th>
                                </tr>
                                </thead>
                                <tbody id="s-area-img-1">
                                </tbody>
                                <script id="s-temp-img-1" type="text/x-handlebars-template">
                                    {{#rows}}
                                    <tr>
                                        <td>{{orgName}}</td>
                                        <td>{{imgUrl}} </td>
                                        <td><a id="" onClick="img1.fn.procDelete('{{img_idx}}', '{{file_idx}}')" class="btnNormal" style="color:red;"><span>삭제</span></a> </td>
                                    </tr>
                                    {{/rows}} 
                                </script>           

                            </table>
                            <div ></div>

                            
                            <br/>
                            <form method="post" enctype="multipart/form-data" id="fileUploadForm-1">
                                <input type="file" name="upfile" id="m-upfile-1"> 
                                <a id="btn_Upload_1" class="btnCtrl"><span>파일 업로드</span></a>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">상품상태 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                            <input id="state_SS" type="radio" name="m-state_cd" value="SS" class="fChk" /> 판매 </label> 
                            <!--<input id="state_RS" type="radio" name="m-state_cd" value="RS" class="fChk" /> 예약판매</label> -->
                            <input id="state_DS" type="radio" name="m-state_cd" value="DS" class="fChk" /> 재고없음</label> 
                            <input id="state_DH" type="radio" name="m-state_cd" value="DH" class="fChk" /> 판매중지(전시중지)</label> 
                        </td>                        
                    </tr>
                    <!--                                        
                    <tr>
                        <th scope="row">판매시작일 </th>
                        <td>
                            <input type="text" id="m-begin_dt" name="" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">판매종료일 </th>
                        <td>
                            <input type="text" id="m-close_dt" name="" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
                    -->
                    <tr>
                        <th scope="row">상품종류 <strong class="icoRequired">필수</strong></th>
                        <td>
                            <input id="kind_XXX" type="radio" name="m-kind_cd" value="XXX" class="fChk" /> 기본</label> 
                            <input id="kind_NEW" type="radio" name="m-kind_cd" value="NEW" class="fChk" /> 신상품</label> 
                            <input id="kind_POP" type="radio" name="m-kind_cd" value="POP" class="fChk" /> 인기상품</label> 
                            <input id="kind_REC" type="radio" name="m-kind_cd" value="REC" class="fChk" /> 추천상품</label> 
                        </td>
                        <th scope="row">재고수 </th>
                        <td>
                            <input type="text" id="m-stock_it" name="stock_it" value="999" class="fText" style="width:200px;" />
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
                            <input type="text" id="m-keyword" name="" value="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">추천개월수 </th>
                        <td>
                            <input type="text" id="m-recommRange" name="" value="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>
                    <tr>
                        <th scope="row">배송비 방식 <strong class="icoRequired">필수</strong></th>
                        <td colspan="3">
                            <input type="radio" name="m-method_cd" value="EACH" class="fChk" /> 개별배송</label> 
                            <input type="radio" name="m-method_cd" value="FREE" class="fChk" /> 무료</label> 
                            <input type="radio" name="m-method_cd" value="BASE" class="fChk" /> 상점기준</label> 
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">개별배송비</th>
                        <td colspan="3">
                            <input type="text" id="m-deli_mn" name="" value="" class="fText" style="width:200px;" />원
                            (개별 배송비 지정시)
                        </td>
                    </tr>

                    <tr id="area-option">
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
                                <tbody class="center" id="s-area-option">
                                    <tr><td colspan='6' align='center'>자료가 없습니다.</td></tr>
                                </tbody>
                                <script id="s-temp-option" type="text/x-handlebars-template">
                                    {{#rows}}
                                    <tr class="">
                                        <td>
                                            <input type="hidden" name="s-opt_idx" row_count="{{row_count}}" value="{{opt_idx}}"  />
                                            <input type="checkbox" name="s-default_yn" row_count="{{row_count}}" class="allChk" {{check_yn default_yn}}>
                                        </td>			            	
                                        <td>
                                            <input type="text" name="s-optName" row_count="{{row_count}}" value="{{optName}}" class="fText" style="width:80px;" />
                                        </td>
                                        <td>
                                            <input type="text" name="s-sell_mn" row_count="{{row_count}}" value="{{sell_mn}}" class="fText" style="width:50px;" />
                                        </td>
                                        <td class="txtCode">
                                            <input type="text" name="s-discount_mn" row_count="{{row_count}}" value="{{discount_mn}}" class="fText" style="width:50px;" />
                                        </td>
                                        <td>
                                            <input type="text" name="s-point_it" row_count="{{row_count}}" value="{{point_it}}" class="fText" style="width:50px;" />
                                        </td>                                    
                                        <td>
                                            <p onClick="opt.fn.procUpdate('{{row_count}}');" class='btnNormal'><span> 수정 </span></p>&nbsp;
                                            <p onClick="opt.fn.procDelete('{{row_count}}');" class='btnNormal'><span> 삭제 </span></p> 
                                        </td>
                                    </tr>
                                    {{/rows}} 
                                </script>      

                                <tfoot class="center" id="CForm">
                                    <tr class="">
                                        <td>
                                            <input id="m-default_yn" type="checkbox" name="Allselect" class="allChk" value="Y">
                                        </td>			            	
                                        <td>
                                            <input type="text" id="m-optName" name="optName" value="" class="fText" style="width:80px;" />
                                        </td>
                                        <td>
                                            <input type="text" id="m-sell_mn" name="sell_mn" value="" class="fText" style="width:50px;" />
                                        </td>
                                        <td class="txtCode">
                                            <input type="text" id="m-discount_mn" name="discount_mn" value="0" class="fText" style="width:50px;" />
                                        </td>
                                        <td>
                                            <input type="text" id="m-point_it" name="point_it" value="0" class="fText" style="width:50px;" />
                                        </td>
                                        <td>
                                        <p id="btn_Insert_Opt" class="btnNormal"><span>등록</span></p>
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
                            <textarea id="m-contents"  class="fTextarea" style="width:100%; height:500px"></textarea>
                        </td>
                    </tr>
                    <tr id="s-area-upload-2" style="display:none;">
                        <th scope="row">파일업로드 </th>
                        <td  colspan="3">
                            <table>
                                <thead>
                                <tr>
                                    <th>원본이름</th>
                                    <th>경로</th>
                                    <th>처리</th>
                                </tr>
                                </thead>
                                <tbody id="s-area-img-2">
                                </tbody>
                                <script id="s-temp-img-2" type="text/x-handlebars-template">
                                    {{#rows}}
                                    <tr>
                                        <td>{{orgName}}</td>
                                        <td>{{imgUrl}} </td>
                                        <td><a id="" onClick="img2.fn.procDelete('{{img_idx}}', '{{file_idx}}')" class="btnNormal" style="color:red;"><span>삭제</span></a> </td>
                                    </tr>
                                    {{/rows}} 
                                </script>           

                            </table>
                            <div ></div>
                            
                            <br/>
                            <form method="post" enctype="multipart/form-data" id="fileUploadForm-2">
                                <input type="file" name="upfile" id="m-upfile-2"> 
                                <a id="btn_Upload_2" class="btnCtrl"><span>파일 업로드</span></a>
                            </form>
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
		    <!--
            <a id="btn_Reset" class="btnSearch reset"><span>초기화</span></a>
            -->
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

</div>         

<!-- 네이버 웹에디터 -->
<script type="text/javascript" src="/nhn_editor/js/service/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript">
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "m-contents",      // textarea id
        sSkinURI: "/nhn_editor/SmartEditor2Skin.html",
        fCreator: "createSEditor2"
    });
</script>

<script>
    function setEditMode(pIsEdit) {
        if (pIsEdit) {
            $('#btn_Insert').hide();
            $('#btn_Update').show();
            $('#btn_Delete').show();
            $('#btn_Reset').hide();
            $('#area_create').show();
            $("#s-area-upload-1").show();
            $("#s-area-upload-2").show();
            $("#area-photo").show();
            $("#area-option").show();
            $("[name=m-type_cd]").prop("disabled", true);
        }  else {
            $('#btn_Update').hide();
            $('#btn_Delete').hide();
            $('#btn_Insert').show();
            $('#btn_Reset').show();
            $('#area_create').hide();
            $("#s-area-upload-1").hide();
            $("#s-area-upload-2").hide();
            $("#area-photo").hide();
            $("#area-option").hide();
        }
    }
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/PRT/Service/product-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/PRT/Service/product-photo-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/PRT/Service/product-option-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/SYS/Service/system-image-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var prt = new _W.BindModelAjax(new ProductService());
    var photo = new _W.BindModelAjax(new ProductPhotoService());
    var opt = new _W.BindModelAjax(new ProductOptionService());
    var img1 = new _W.BindModelAjax(new SystemImageService('-1'));  // 복수 선택자, 접미사 사용
    var img2 = new _W.BindModelAjax(new SystemImageService('-2'));  // 복수 선택자, 접미사 사용

    this.isLog = true;  // 디버깅 모드
	
    // 속성 설정 : prt
	prt.prop["__listUrl"] = "Product_Lst.asp";
    prt.prop["__mode"] = getParamsToJSON(location.href).mode;

    // 콜백 등록 : prt
    prt.create.onExecute = function(p_bindCommand) { 
        oEditors.getById["m-contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    prt.update.onExecute = function(p_bindCommand) { 
        oEditors.getById["m-contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    // 콜백 등록 : img2
    img2.create.onExecuted = function(p_bindCommand, p_result) { 
        var sHTML;
        if (typeof p_result !== 'undefined') {
            sHTML = "<div><img src='" + p_result.table["imgurl"] + "'></div>";
            oEditors.getById["m-contents"].exec("PASTE_HTML", [sHTML]);
        }
    };

	// 이벤트 바인딩 : prt
    $('#btn_Insert').click(prt.fn.procCreate);  // 수정
	$('#btn_Update').click(prt.fn.procUpdate);  // 수정
	$('#btn_Delete').click(prt.fn.procDelete);  // 삭제
	$('#btn_List').click(prt.fn.moveList);      // 목록 이동
	$('#btn_Reset').click(prt.fn.resetForm);    // 입력폼 초기화
    // 이벤트 바인딩 : photo
	$('#btn_Insert_Photo').click(photo.fn.procCreate);  // 포토 등록
    // 이벤트 바인딩 : opt
	$('#btn_Insert_Opt').click(opt.fn.procCreate);      // 옵션 등록
    // 이벤트 바인딩 : img1
    $('#btn_Upload_1').click(img1.fn.procCreate);  // 이미지 업로드(등록) : 포토
    // 이벤트 바인딩 : img2
    $('#btn_Upload_2').click(img2.fn.procCreate);  // 이미지 업로드(등록) : 내용
    
    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        prt.init();
        photo.init();
        opt.init();
        img1.init();
        img2.init();

        if (prt.prop["__mode"] === "EDIT") {

            var  prt_id = getParamsToJSON(location.href).prt_id;
            // 수정 모드
            setEditMode(true);
            // prt
            prt.items["prt_id"].value = prt_id;
            prt.fn.procRead();
            // photo
            photo.items["prt_id"].value = prt_id;
            photo.fn.procList();
            // opt
            opt.items["prt_id"].value = prt_id;
            opt.fn.procList();
            // img1
            img1.items["position_cd"].value = "Main";
            img1.items["prefix"].value = "M-";
            img1.items["pos_idx"].value = prt_id;      // image 키 등록
            img1.fn.procList();
            // img2
            img2.items["position_cd"].value = "Product";
            img2.items["prefix"].value = "PRT-";
            img2.items["pos_idx"].value = prt_id;      // image 키 등록
            img2.fn.procList();
        }  else {
            // 등록 모드
            setEditMode(false);
        }
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>

</body>
</html>
