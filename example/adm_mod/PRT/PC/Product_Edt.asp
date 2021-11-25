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
<!--#include virtual="/Admin/adm_cmn/include/Seller_Global_Define.I.asp"-->
<% 
	' Option Explicit	        '변수선언 필수
'	On Error Resume Next 
	Response.buffer = True	
	Response.expires = 0
%>
<% session.codepage = 65001 %>
<% Response.CharSet = "utf-8" %>
<%	

	Dim topPath
	topPath = "/A-Back/CMN-UI/"	
	
	
	Dim sto_idx, admin_id, admin_idx, admin_nm 
	sto_idx 	= Request.Cookies("LGC")("STO_IDX")
	admin_idx	= Request.Cookies("LGC")("ADMIN_IDX")
	admin_id	= Request.Cookies("LGC")("ADMIN_ID")
	admin_nm	= Request.Cookies("LGC")("ADMIN_NM")
	
%>
<% 
	Server.Execute "/Seller/LoginCheck.E.asp"
%>
<!DOCTYPE html>
<html>

<head>
<!--#include virtual="/Seller/include/Head_Common.I.asp"-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		

    <script src="/Common/js/common.js?a"></script>
	<script src="/Admin/adm_cmn/js/admin_common.js?v2"></script>
</head>

<body>

    <!-- NAVBAR-->
<!--#include virtual="/Seller/include/Nav.I.asp"-->

    <!-- TESTIMONIAL -->
    <section id="testimonial">
        <div class="container">

            <h2>상품 세부 정보</h2>
            <p>수정시 관리자에게 문의바랍니다.</p>

            <form onsubmit="return false">
            <input type="hidden" id="account_idx" name="account_idx" value="" /> 
            </form>

            <style>
                .input-group-prepend { width: 16%;}
                .input-group-prepend span { width: 100%;}
            </style>

            <div class="input-group mb-1">
                <div class="input-group-prepend ">
                    <span class="input-group-text">상품명</span>
                </div>
                <div class="form-control" >
                    <input type="text" class="form-control" id="m-prtName">
                </div>
            </div>

            <div class="input-group mb-1">
                <div class="input-group-prepend ">
                    <span class="input-group-text">이미지</span>
                </div>
                <div class="form-control" >
                    <table class="table">   
                        <thead class="thead-light">
                            <tr>
                                <th>이미지</th>
                                <th>파일명</th>
                                <th>정렬</th>
                                <th>위치</th>
                                <th>처리</th>
                            </tr>
                        </thead>
                        <tbody class="center" id="s-area-photo">
                            <tr><td colspan='5' align='center'>자료가 없습니다.</td></tr>
                        </tbody>
                        <script id="s-temp-photo" type="text/x-handlebars-template">
                            {{#rows}}
                            <tr class="">
                                <td>
                                    <a href="{{fileName}}" target="_blank"><img src="{{fileName}}" style="width:50px" class="rounded" style="width:40px" /></a>
                                </td>
                                <td>
                                    <input type="hidden" name="s-img_idx" row_count="{{row_count}}" value="{{img_idx}}"  />
                                    <input type="text" class="form-control mb-1" name="s-fileName" row_count="{{row_count}}" value="{{fileName}}"  />
                                </td>
                                <td><input type='text' class="form-control mb-1" name="s-rank_it"  row_count="{{row_count}}" value='{{rank_it}}' /></td>
                                <td>
                                    <select name="s-position_cd" row_count="{{row_count}}" class="form-control" value="{{position_cd}}" >
                                        <option value="B" {{selected position_cd "B"}}>대표이미지(상세)</option>
                                        <option value="M" {{selected position_cd "M"}}>중간이미지(목록)</option>
                                        <option value="S" {{selected position_cd "S"}}>작은이미지(목록)</option>
                                        <option value="E" {{selected position_cd "E"}}>기타이미지</option>
                                        
                                    </select>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-outline-primary" onClick="photo.fn.procUpdate('{{row_count}}');">수정</button>
                                    <button type="button" class="btn btn-outline-danger" onClick="photo.fn.procDelete('{{row_count}}');">삭제</button>
                                </td>
                            </tr>
                            {{/rows}} 
                        </script>      

                        <!--
                        <tbody>
                            <tr>
                                <td><img src="http://jns9778.cafe24.com/Upload/Main/M-131-1.jpg" class="rounded" style="width:40px"></td>
                                <td><input type="text" class="form-control mb-1" ></td>
                                <td><input type="text" class="form-control mb-1" ></td>
                                <td>
                                    <div class="form-group">
                                        <select class="form-control" id="sel1" name="sellist1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-outline-primary">수정</button>
                                    <button type="button" class="btn btn-outline-danger">삭제</button>
                                </td>
                            </tr>
                        </tbody>
                        -->
                    </table>
                    <div class="input-group mb-1">
                        <input type="text" class="form-control" placeholder="파일경로를 입력하세요" id="m-fileName">
                        <input type="text" class="form-control" placeholder="정렬 순서를 입력하세요." id="m-rank_it" value="99" >
                        <select class="form-control" id="m-position_cd" >
                            <option value="B" selected>대표이미지(상세)</option>
                            <option value="M">중간이미지</option>
                            <option value="S">작은이미지</option>
                            <option value="E">기타이미지</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-secondary" id="btn_Insert_Photo">등록</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="input-group mb-1" id="s-area-upload-1" style="display:none;">
                <div class="input-group-prepend ">
                    <span class="input-group-text">파일 업로드-1</span>
                </div>
                <div class="form-control" >
                    <table class="table">   
                        <thead class="thead-light">
                            <tr>
                                <th>이미지</th>
                                <th>원본이름</th>
                                <th>경로</th>
                                <th>처리</th>
                            </tr>
                        </thead>

                        <tbody id="s-area-img-1"></tbody>
                        <script id="s-temp-img-1" type="text/x-handlebars-template">
                            {{#rows}}
                            <tr>
                                <td><img src="{{filNam}}" class="rounded" style="width:40px"></td>
                                <td>{{orgName}}</td>
                                <td>{{imgUrl}} </td>
                                <td>
                                    <button type="button" class="btn btn-outline-danger" onClick="img1.fn.procDelete('{{img_idx}}', '{{file_idx}}')">파일 삭제</button>
                                </td>
                            </tr>
                            {{/rows}} 
                        </script>      

                    </table>
                    <div class="input-group mb-1">
                        <form method="post" enctype="multipart/form-data" id="fileUploadForm-1">
                            <input type="file" class="form-control" placeholder="파일을 선택해주세요." id="m-upfile-1"> 
                        </form>

                        <div class="input-group-append">
                            <button class="btn btn-secondary" id="btn_Upload_1">이미지 업로드</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div class="input-group mb-1">
                <div class="input-group-prepend ">
                    <span class="input-group-text">상태 (필수)</span>
                </div>
                <div class="form-control" >
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-state_cd" value="SS" /> 판매
                        </label> 
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-state_cd" value="DS"/> 재고없음
                        </label> 
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-state_cd" value="DH" /> 판매중지(전시중단)
                        </label> 
                    </div>
                </div>
            </div>

            <div class="input-group mb-1">
                <div class="input-group-prepend ">
                    <span class="input-group-text">상품종류 (필수)</span>
                </div>
                <div class="form-control" >
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="m-kind_cd" value="XXX"/> 판매
                        </label> 
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-kind_cd" value="NEW" /> 판매
                        </label> 
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-kind_cd" value="POP" /> 판매
                        </label> 
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-kind_cd" value="REC" /> 추천상품
                        </label> 
                    </div>
                </div>
                <div class="input-group-prepend ">
                    <span class="input-group-text">재고수</span>
                </div>
                <div class="form-control" >
                    <input type="text" class="form-control"  id="m-stock_it">
                </div>
            </div>

            <div class="input-group mb-1">
                <div class="input-group-prepend ">
                    <span class="input-group-text">키워드 </span>
                </div>
                <div class="form-control" >
                    <input type="text" class="form-control" id="m-keyword">
                </div>
            </div>

            <div class="input-group mb-1">
                <div class="input-group-prepend ">
                    <span class="input-group-text">배송방식 (필수) </span>
                </div>
                <div class="form-control" >
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-method_cd" value="EACH" /> 개별배송
                        </label> 
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-method_cd" value="FREE" /> 무료
                        </label> 
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input"  name="m-method_cd" value="BASE" /> 상점기준
                        </label> 
                    </div>
                </div>
                <div class="input-group-prepend ">
                    <span class="input-group-text">개별배송비 </span>
                </div>
                <div class="form-control" >
                    <input type="text" class="form-control" id="m-deli_mn" placeholder="개별배송방식일 경우 입력하세요.">
                    
                </div>
                
            </div>

            <ul class="nav nav-tabs mb-1">
                <li class="nav-item">
                    <a class="nav-link active" href="#">
                        옵션 및 판매가
                    </a>
                </li>
            </ul>
            <div class="input-group mb-1">
                <div class="form-control" >
                    <table class="table">   
                        <thead class="thead-light">
                            <tr>
                                <th>기본여부</th>
                                <th>옵션명</th>
                                <th>판매가</th>
                                <th>할인가</th>
                                <th>지급포인트</th>
                                <th style="width: 200px;">처리</th>
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
                                    <input type="checkbox" class="form-check-input" name="s-default_yn" row_count="{{row_count}}"  {{check_yn default_yn}}>
                                </td>			            	
                                <td>
                                    <input type="text" class="form-control mb-1" name="s-optName" row_count="{{row_count}}" value="{{optName}}"  />
                                </td>
                                <td>
                                    <input type="text" class="form-control mb-1" name="s-sell_mn" row_count="{{row_count}}" value="{{sell_mn}}"   />
                                </td>
                                <td class="txtCode">
                                    <input type="text" class="form-control mb-1" name="s-discount_mn" row_count="{{row_count}}" value="{{discount_mn}}"   />
                                </td>
                                <td>
                                    <input type="text" class="form-control mb-1" name="s-point_it" row_count="{{row_count}}" value="{{point_it}}"   />
                                </td>                                    
                                <td>
                                    <button type="button" class="btn btn-outline-primary" onclick="opt.fn.procUpdate('{{row_count}}');">수정</button>
                                    <button type="button" class="btn btn-outline-danger" onclick="opt.fn.procDelete('{{row_count}}');">삭제</button>

                                </td>
                            </tr>
                            {{/rows}} 
                        </script>   
                        <thead>
                            <tr>
                                <td><input type="checkbox" class="form-check-input" id="m-default_yn" value="Y"></td>
                                <td><input type="text" class="form-control mb-1" placeholder="옵션명.." id="m-optName" ></td>
                                <td><input type="text" class="form-control mb-1" placeholder="숫자로 입력.." id="m-sell_mn"></td>
                                <td><input type="text" class="form-control mb-1" placeholder="판매가보다 작게.." id="m-discount_mn"></td>
                                <td><input type="text" class="form-control mb-1" placeholder="숫자로 입력" id="m-point_it"></td>
                                <td>
                                    <button type="button" class="btn btn-secondary" id="btn_Insert_Opt">등록</button>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

            <div class="input-group mb-1">
                <div class="form-control" >
                    <label for="comment">상품설명</label>
                    <textarea class="form-control" rows="5" id="m-contents"></textarea>
                </div>
            </div>

            <div class="input-group mb-1" id="s-area-upload-2" style="display:none;">
                <div class="input-group-prepend ">
                    <span class="input-group-text">파일 업로드-2</span>
                </div>
                <div class="form-control" >
                    <table class="table">   
                        <thead class="thead-light">
                            <tr>
                                <th>이미지</th>
                                <th>원본이름</th>
                                <th>경로</th>
                                <th>처리</th>
                            </tr>
                        </thead>

                        <tbody id="s-area-img-2"></tbody>
                        <script id="s-temp-img-2" type="text/x-handlebars-template">
                            {{#rows}}
                            <tr>
                                <td><img src="{{filNam}}" class="rounded" style="width:40px"></td>
                                <td>{{orgName}}</td>
                                <td>{{imgUrl}} </td>
                                <td>
                                    <button type="button" class="btn btn-outline-danger" onClick="img2.fn.procDelete('{{img_idx}}', '{{file_idx}}')">파일 삭제</button>
                                </td>
                            </tr>
                            {{/rows}} 
                        </script>      

                    </table>
                    <div class="input-group mb-1">
                        <form method="post" enctype="multipart/form-data" id="fileUploadForm-2">
                            <input type="file" class="form-control" placeholder="파일을 선택해주세요." id="m-upfile-2"> 
                        </form>

                        <div class="input-group-append">
                            <button class="btn btn-secondary" id="btn_Upload_2">이미지 업로드</button>
                        </div>
                        
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-dark" id="btn_Update">상품정보 수정</button>


            <br>
            <br>
                        
            <a class="btn btn-outline-secondary btn-lg" id="btn_List">목록 이동</a>
                                
        </div>
        <div class="mLoading typeStatic">
    	    <p>처리중입니다. 잠시만 기다려 주세요.</p>
	        <img src="http://img.echosting.cafe24.com/suio/ico_loading.gif" alt="" />
	    </div>
        <div id="part_Overlay" class="w3-overlay w3-animate-opacity" style="cursor:pointer;z-index:90;"></div>            

    </section>


    <!-- FOOTER -->
<!--#include virtual="/Seller/include/Footer.I.asp"-->


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
<script src="/Admin/adm_cmn/Service/base-bs-page-svc.js?<%=g_iRandomID%>"></script>
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

<!--#include virtual="/Admin/adm_cmn/include/Admin_Global_Tail.I.asp"-->
