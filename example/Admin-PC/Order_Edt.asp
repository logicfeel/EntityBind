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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/bod/notice_Frm.asp?cmd=INSERT
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

    <!-- 폼 내용 -->
    <div class="section" id="QA_profile1">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div class="optionArea">
            <div class="mOption" style="display: block;">
                <table border="1" summary="">
                <caption>주문 조회</caption>
                <colgroup>
                    <col style="width:154px;*width:135px;" />
                    <col style="width:auto;" />
                    <col style="width:154px;*width:135px;" />
                    <col style="width:auto;" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">주문자 상태</th>
                        <td>
                            <p id="m-ord_state" style="color: cornflowerblue;"></p>
                        </td>
                        <th scope="row">회원ID</th>
                        <td>
                            <p id="m-meb_id"></p>
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">주문자명</th>
                        <td>
                            <input type="text" id="m-orderName" name=""  class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">주문번호</th>
                        <td>
                            <p id="m-ord_id"></p>
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">주문자 연락처</th>
                        <td>
                            <input type="text" id="m-orderTel" name="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">이메일</th>
                        <td>
                            <input type="text" id="m-email" name="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">관리자 메모</th>
                        <td colspan="3">
                        	<input type="text" id="m-ord_memo" name="" class="fText" style="width:600px;" />
                        </td>
                    </tr>                                    
                    </tbody>
                </table>
            </div>
            <!-- 버튼 -->
            <div class="mButton gCenter">
                <a id="s-btn_PC" class="btnNormal" style="color:red; display:none;"><span>주문취소</span></a>
                <a id="s-btn_update" class="btnCtrl" style="display:none;"><span>주문자정보 수정</span></a>
            </div> 
        </div>
    </div>

    <div class="section" id="QA_profile1">
        <div class="optionArea">
            <div class="mOption" style="display: block;">
                <table border="1" summary="">
                <caption>주문 조회</caption>
                <colgroup>
                    <col style="width:154px;*width:135px;" />
                    <col style="width:auto;" />
                    <col style="width:154px;*width:135px;" />
                    <col style="width:auto;" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">결제상태</th>
                        <td>
                            <p id="m-pay_state" style="color: cornflowerblue;">[입금대기]</p>
                            
                        </td>                        
                        <th scope="row">주문금액</th>
                        <td>
                            <p id="m-order_mn">1000원</p>
                        </td>
                    </tr>                                        
                    <tr>
                        <th scope="row">실결제액</th>
                        <td>
                            <p id="m-pay_mn"></p>
                            
                        </td>
                        <th scope="row">포인트 사용액</th>
                        <td>
                            <p id="m-usePoint_it"></p>
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">결제 메모(환불계좌 등)</th>
                        <td colspan="3">
                            <input type="text" id="m-pay_memo" name="" class="fText" style="width:600px;" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">결제방식</th>
                        <td colspan="3">
                            <p id="m-pay_method"></p>
                        </td>
                    </tr>
                    <tr id ="area_bank_info">
                        <th scope="row">입금계좌</th>
                        <td>
                            <p id="m-bak_info"></p>
                        </td>
                        <th scope="row">입금자명</th>
                        <td>
                            <input type="text" id="m-depositor" name=""  class="fText" style="width:200px;" />
                        </td>                        
                    </tr>                                        
                    </tbody>
                </table>
            </div>
            <!-- 버튼 -->
            <div class="mButton gCenter">
                <a id="s-btn_RF" class="btnNormal" style="color:red; display:none;"><span>환불완료</span></a>
                <a id="s-btn_PF" class="btnNormal" style="display:none;"><span>결제완료(승인)</span></a>
                <a id="s-btn_pay" class="btnCtrl" style="display:none;"> <span>결제정보 수정</span></a>
            </div> 
            <!-- // 버튼 -->            
        </div>

    </div>

    <div class="section" id="s-area-list"></div>   

    <script id="s-temp-list" type="text/x-handlebars-template">
        {{#rows}}
        <div class="optionArea">
            <div class="mOption" style="display: block;">
                <table border="1" summary="">
                <caption>주문 조회</caption>
                <colgroup>
                    <col style="width:154px;*width:135px;" />
                    <col style="width:auto;" />
                    <col style="width:154px;*width:135px;" />
                    <col style="width:auto;" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">상품정보</th>
                        <td colspan="3">
                            <table border="1" summary="">
                                <caption>주문 조회</caption>
                                <colgroup>
                                    <col style="width:154px;*width:135px;" />
                                    <col style="width:auto;" />
                                    <col style="width:154px;*width:135px;" />
                                    <col style="width:auto;" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="row">순번</th>
                                        <th scope="row">상품명</th>
                                        <th scope="row">옵션</th>
                                        <th scope="row">수량</th>
                                        <th scope="row">금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {{#each product}}
                                    <tr>
                                        <td scope="row">{{row_count}}</td>
                                        <td scope="row">{{prtName}}</td>
                                        <td scope="row">{{optName}}</td>
                                        <td scope="row">{{qty_it}}개</td>
                                        <td scope="row">{{comma_num buy_mn}} 원</td>
                                    </tr>
                                    {{/each}}
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">배송상태</th>
                        <td>
                            <p id="bak_info" style="color: cornflowerblue;">{{deli_state}}</p>
                        </td>
                        <th scope="row">배송요청일</th>
                        <td>
                            <p id="bak_info">{{request_dt}}</p>
                        </td>                        
                    </tr> 
                    <tr>
                        <th scope="row">받는사람</th>
                        <td>
                            <input type="text" name="m-recipient" deli_idx="{{deli_idx}}" value="{{recipient}}" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">연락처</th>
                        <td>
                            <input type="text" name="m-tel" deli_idx="{{deli_idx}}" value="{{tel}}" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">주소</th>
                        <td colspan="3">
                            <input type="text" name="m-zipcode" deli_idx="{{deli_idx}}" value="{{zipcode}}" class="fText" style="width:60px;" readonly />
                            <a name="s-btn_zip" deli_idx="{{deli_idx}}" class="btnNormal"><span>우편번호</span></a>
                            <br /><br />
                            <input type="text" name="m-addr1" deli_idx="{{deli_idx}}" value="{{addr1}}" class="fText" style="width:600px;" readonly />
                            <br /><br />
                            <input type="text" name="m-addr2" deli_idx="{{deli_idx}}" value="{{addr2}}" class="fText" style="width:600px;" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">배송메모</th>
                        <td>
                            <input type="text" name="m-deli_memo" deli_idx="{{deli_idx}}" value="{{deli_memo}}" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">발송일자(송장기준)</th>
                        <td>
                            <p id="send_dt">{{send_dt}}</p>
                        </td>                        
                    </tr> 
                    <tr name="s-area_invoice" deli_idx="{{deli_idx}}" style="display:none;">
                        <th scope="row">택배사</th>
                        <td>
                            <select name="m-dco_idx" deli_idx="{{deli_idx}}" class="fSelect">
                            {{#each corp}}
                                <option value="{{dco_idx}}">{{corpName}}</option>
                            {{/each}}
                                <!--<option value="2">우체국택배</option>-->
                            </select>
                        </td>
                        <th scope="row">송장번호</th>
                        <td>
                            <input type="text" name="m-invoice" deli_idx="{{deli_idx}}" value="{{invoice}}" class="fText" style="width:200px;" />
                            <a id="btn_Check" class="btnBubble " href="{{checkURL}}{{invoice}}" target="_blank"><span>배송추적</span></a>
                        </td>                        
                    </tr>                                        
                    </tbody>
                </table>
            </div>
            <!-- 버튼 -->
            <div class="mButton gCenter">
                <a name="s-btn_RW" deli_idx="{{deli_idx}}" class="btnNormal" style="color:red; display:none;"><span>취소(환불대기)</span></a>
                <a name="s-btn_TW" deli_idx="{{deli_idx}}" class="btnNormal" style="color:red; display:none;"><span>취소(반품대기)</span></a>
                <a name="s-btn_TF" deli_idx="{{deli_idx}}" class="btnNormal" style="color:blue; display:none;"><span>반품완료</span></a>
                <a name="s-btn_DK" deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송확인 =></span></a>
                <a name="s-btn_DR" deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송준비 =></span></a>
                <a name="s-btn_DS" deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송발송 =></span></a>
                <a name="s-btn_DF" deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송완료</span></a>
                <a name="s-btn_deli" deli_idx="{{deli_idx}}" class="btnCtrl" ><span>배송정보 수정</span></a>
            </div> 
            <!-- // 버튼 -->            
        </div>
        {{/rows}} 
    </script> 	
         
    <div class="section">
        <div class="mButton gCenter">
            <a id="btn_List" class="btnSearch reset"><span>목록</span></a>
        </div> 
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

<!-- 우편번호 팝업창 -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
    function popupPostCode(p_zip, p_addr1, p_addr2) {
        new daum.Postcode({
            oncomplete: function(data) {
                $(p_zip).val(data.zonecode);
                $(p_addr1).val(data.address);
                // $('#' + p_zip)val(data.zonecode);
            }
        }).open();
    }
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/ORD/Service/order-manager-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var ord = new _W.BindModelAjax(new OrderManagerService());
	
    this.isLog = true;  // 디버깅 모드

	// 속성 설정
    ord.items["ord_id"].value = getParamsToJSON(location.href).ord_id;
    ord.cbPostcode = popupPostCode;

	// 이벤트 바인딩
	$('#btn_List').click(ord.fn.moveList);

    //--------------------------------------------------------------
	$(document).ready(function () {
        ord.init();
		ord.fn.loadExecute();
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>


</body>
</html>            