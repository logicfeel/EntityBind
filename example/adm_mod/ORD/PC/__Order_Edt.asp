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
                            <p id="ord_state" style="color: cornflowerblue;">주문완료</p>
                        </td>
                        <th scope="row">회원ID</th>
                        <td>
                            <p id="meb_id">logicfeel</p>
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">주문자명</th>
                        <td>
                            <input type="text" id="orderName" name=""  class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">주문번호</th>
                        <td>
                            <p id="ord_id">afsdasfdsdf</p>
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">주문자 연락처</th>
                        <td>
                            <input type="text" id="orderTel" name="" class="fText" style="width:200px;" />
                        </td>
                        <th scope="row">이메일</th>
                        <td>
                            <input type="text" id="email" name="" class="fText" style="width:200px;" />
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">관리자 메모</th>
                        <td colspan="3">
                        	<input type="text" id="ord_memo" name="" class="fText" style="width:600px;" />
                        </td>
                    </tr>                                    
                    </tbody>
                </table>
            </div>
            <!-- 버튼 -->
            <div class="mButton gCenter">
                <a id="btn_Update_PC" class="btnNormal" style="color:red; display:none;"><span>주문취소</span></a>
                <a id="btn_Update_ord" class="btnCtrl"><span>주문자정보 수정</span></a>
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
                            <p id="pay_state" style="color: cornflowerblue;">[입금대기]</p>
                            
                        </td>                        
                        <th scope="row">주문금액</th>
                        <td>
                            <p id="order_mn">1000원</p>
                        </td>
                    </tr>                                        
                    <tr>
                        <th scope="row">실결제액</th>
                        <td>
                            <p id="pay_mn">20000원</p>
                            
                        </td>
                        <th scope="row">포인트 사용액</th>
                        <td>
                            <p id="usePoint_it">20000원</p>
                        </td>                        
                    </tr>                                        
                    <tr>
                        <th scope="row">결제 메모(환불계좌 등)</th>
                        <td colspan="3">
                            <input type="text" id="pay_memo" name="" class="fText" style="width:600px;" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">결제방식</th>
                        <td colspan="3">
                            <p id="pay_method">무통장</p>
                        </td>
                    </tr>
                    <tr id ="area_bank_info">
                        <th scope="row">입금계좌</th>
                        <td>
                            <p id="bak_info">전북은행 232-232332-23232  송미령</p>
                        </td>
                        <th scope="row">입금자명</th>
                        <td>
                            <input type="text" id="depositor" name=""  class="fText" style="width:200px;" />
                        </td>                        
                    </tr>                                        
                    </tbody>
                </table>
            </div>
            <!-- 버튼 -->
            <div class="mButton gCenter">
                <a id="btn_Update_RF" class="btnNormal" style="color:red; display:none;"><span>환불완료</span></a>
                <a id="btn_Update_PF" class="btnNormal" style="display:none;"><span>결제완료(승인)</span></a>
                <a id="btn_Update_pay" class="btnCtrl"><span>결제정보 수정</span></a>
            </div> 
            <!-- // 버튼 -->            
        </div>

    </div>

    <div class="section" id="list-body">
        <script id="list-template" type="text/x-handlebars-template">
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
                                <input type="text" id="recipient_{{deli_idx}}" name="" value="{{recipient}}" class="fText" style="width:200px;" />
                            </td>
                            <th scope="row">연락처</th>
                            <td>
                                <input type="text" id="tel_{{deli_idx}}" name="" value="{{tel}}" class="fText" style="width:200px;" />
                            </td>                        
                        </tr>                                        
                        <tr>
                            <th scope="row">주소</th>
                            <td colspan="3">
                                <input type="text" id="zipcode_{{deli_idx}}" name="zipcode" value="{{zipcode}}" class="fText" style="width:60px;" readonly />
                                <a id="btn_Zipcode_{{deli_idx}}" class="btnNormal"><span>우편번호</span></a>
                                <br /><br />
                                <input type="text" id="addr1_{{deli_idx}}" name="addr1" value="{{addr1}}" class="fText" style="width:600px;" readonly />
                                <br /><br />
                                <input type="text" id="addr2_{{deli_idx}}" name="addr2" value="{{addr2}}" class="fText" style="width:600px;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">배송메모</th>
                            <td>
                                <input type="text" id="deli_memo_{{deli_idx}}" name="" value="{{deli_memo}}" class="fText" style="width:200px;" />
                            </td>
                            <th scope="row">발송일자(송장기준)</th>
                            <td>
                                <p id="send_dt">{{send_dt}}</p>
                            </td>                        
                        </tr> 
                        <tr id="area_invoice_{{deli_idx}}" style="display:none;">
                            <th scope="row">택배사</th>
                            <td>
                                <select id="dco_idx_{{deli_idx}}" name="listCnt" class="fSelect">
                                {{#each corp}}
                                    <option value="{{dco_idx}}">{{corpName}}</option>
                                {{/each}}
                                    <!--<option value="2">우체국택배</option>-->
                                </select>
                            </td>
                            <th scope="row">송장번호</th>
                            <td>
                                <input type="text" id="invoice_{{deli_idx}}" name="" value="{{invoice}}" class="fText" style="width:200px;" />
                                <a id="btn_Check" class="btnBubble " href="{{checkURL}}{{invoice}}" target="_blank"><span>배송추적</span></a>
                            </td>                        
                        </tr>                                        
                        </tbody>
                    </table>
                </div>
                <!-- 버튼 -->
                <div class="mButton gCenter">
                    <a id="btn_Update_RW_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnNormal" style="color:red; display:none;"><span>취소(환불대기)</span></a>
                    <a id="btn_Update_TW_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnNormal" style="color:red; display:none;"><span>취소(반품대기)</span></a>
                    <a id="btn_Update_TF_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnNormal" style="color:blue; display:none;"><span>반품완료</span></a>
                    <a id="btn_Update_DK_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송확인 =></span></a>
                    <a id="btn_Update_DR_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송준비 =></span></a>
                    <a id="btn_Update_DS_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송발송 =></span></a>
                    <a id="btn_Update_DF_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnNormal" style="display:none;"><span>배송완료</span></a>
                    <a id="btn_Update_deli_{{deli_idx}}" data-deli_idx="{{deli_idx}}" class="btnCtrl" ><span>배송정보 수정</span></a>
                </div> 
                <!-- // 버튼 -->            
            </div>
            {{/rows}} 
        </script> 	

    </div>            
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

<!--
		<div class="mButton gCenter">
		    <a id="btn_Insert" class="btnNormal"><span>삭제</span></a>
		    <a id="btn_Update" class="btnCtrl"><span>주문정보 수정ㅇ</span></a>
		    <a id="btn_Delete" class="btnDate"><span>삭제</span></a>
            <a id="btn_Delete" class="btnGeneral"><span>삭제1</span></a>
            <a id="btn_Delete" class="btnStrong"><span>삭제2</span></a>
            <a id="btn_Delete" class="btnSubmit"><span>삭제3</span></a>
            <a id="btn_Delete" class="btnEm"><span>삭제4</span></a>
            <a id="btn_Delete" class="btnBubble "><span>삭제5</span></a>
            <a id="btn_Delete" class="btnToggle"><span>삭제6</span></a>
            <a id="btn_Delete" class="btnSorting"><span>삭제7</span></a>
		    <a id="btn_List" class="btnEm reset"><span>목록</span></a>
		    <a id="btn_Reset" class="btnSearch reset"><span>초기화</span></a>
		</div> 
-->


<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.5.0.js?<%=g_iRandomID%>"></script>
<script src="/Module/base/base-admin-svc.js?<%=g_iRandomID%>"></script>
<script>
	//--------------------------------------------------------------
	// 1. 네임스페이스 정의 및 생성
	var BindModelAjax   		= _W.Meta.Bind.BindModelAjax;
    var ItemDOM                 = _W.Meta.Entity.ItemDOM;
    var BindCommandEditAjax     = _W.Meta.Bind.BindCommandEditAjax;
    var BindCommandLookupAjax   = _W.Meta.Bind.BindCommandLookupAjax;

	var bm              		= new BindModelAjax(ItemDOM);
    var service                 = new BaseService(bm);
    var deliData = {};          // 배송정보 임시데이터
    var corpData = {};          // 택배사정보 임시데이터

    bm.setService(service);

    bm.read     				= new BindCommandLookupAjax(bm, bm._baseEntity);
    bm.read_pay    				= new BindCommandLookupAjax(bm, bm._baseEntity);
    bm.list_deli   				= new BindCommandLookupAjax(bm, bm._baseEntity);
    bm.list_prt    				= new BindCommandLookupAjax(bm, bm._baseEntity);
    bm.list_corp   				= new BindCommandLookupAjax(bm, bm._baseEntity);
    bm.update    				= new BindCommandEditAjax(bm, bm._baseEntity);
    bm.update_state				= new BindCommandEditAjax(bm, bm._baseEntity);
    bm.update_deli 				= new BindCommandEditAjax(bm, bm._baseEntity);
    bm.update_pay  				= new BindCommandEditAjax(bm, bm._baseEntity);

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
    bm.baseUrl = "/Admin/adm_mod/ORD/Order.C.asp";
    // bm.baseAjaxSetup.type = "POST";

    bm.read.outputOption = 3;
    bm.read_pay.outputOption = 3;

    $("#ord_id").text( getParamsToJSON(location.href).ord_id );        

    //--------------------------------------------------------------    
    // 3. 아이템 등록 및 설정(추가)
    bm.addItem("cmd", "", [], "bind");                               // 전역 아이템 추가
    bm.addItem("ord_id", $("#ord_id").text(), [], ["valid", "bind"]);
    // 주문
    bm.read.addItem("ord_state_cd", "output");

    bm.read.add(new ItemDOM("ord_state",   null, { 
        setter: function(val) { return $("#ord_state").text(val); }
    }), "output");
    
    bm.read.add(new ItemDOM("meb_id",   null, { 
        setter: function(val) { return $("#meb_id").text(val); }
    }), "output");    

    bm.read.add(new ItemDOM("orderName",   null, { 
        getter: function() { return $("#orderName").val(); },
        setter: function(val) { return $("#orderName").val(val); }
    }), "output");
    bm.update.setItem("orderName", ["valid", "bind"]);

    bm.read.add(new ItemDOM("orderTel",   null, { 
        getter: function() { return $("#orderTel").val(); },
        setter: function(val) { return $("#orderTel").val(val); }
    }), "output");
    bm.update.setItem("orderTel", ["bind"]);

    bm.read.add(new ItemDOM("email",   null, { 
        getter: function() { return $("#email").val(); },
        setter: function(val) { return $("#email").val(val); }
    }), "output");
    bm.update.setItem("email", ["bind"]);

    bm.read.add(new ItemDOM("ord_memo",   null, { 
        getter: function() { return $("#ord_memo").val(); },
        setter: function(val) { return $("#ord_memo").val(val); }
    }), "output");
    bm.update.setItem("ord_memo", ["bind"]);

    bm.read.add(new ItemDOM("order_mn",   null, { 
        setter: function(val) { return $("#order_mn").text( numberWithCommas(val)  + " 원"); }
    }), "output");
    // 결제
    bm.read_pay.addItem("pay_state_cd", "output");

    bm.read_pay.add(new ItemDOM("pay_mn",   null, { 
        setter: function(val) { return $("#pay_mn").text( numberWithCommas(val)  + " 원"); }
    }), "output");
    bm.read_pay.add(new ItemDOM("pay_state",   null, { 
        setter: function(val) { return $("#pay_state").text(val); }
    }), "output");

    bm.read_pay.add(new ItemDOM("usePoint_it",   null, { 
        setter: function(val) { return $("#usePoint_it").text( numberWithCommas(val) + " 원"); }
    }), "output");

    bm.read_pay.add(new ItemDOM("pay_method",   null, { 
        setter: function(val) { return $("#pay_method").text(val); }
    }), "output");

    bm.read_pay.add(new ItemDOM("bak_info",   null, { 
        setter: function(val) { return $("#bak_info").text(val); }
    }), "output");

    bm.read_pay.add(new ItemDOM("depositor",   null, { 
        getter: function() { return $("#depositor").val(); },
        setter: function(val) { return $("#depositor").val(val); }
    }), "output");
    bm.update_pay.setItem("depositor", ["valid", "bind"]);

    bm.read_pay.add(new ItemDOM("pay_memo",   null, { 
        getter: function() { return $("#pay_memo").val(); },
        setter: function(val) { return $("#pay_memo").val(val); }
    }), "output");
    bm.update_pay.setItem("pay_memo", ["bind"]);
    // 배송
    bm.addItem("deli_idx", "", [], ["valid", "bind"]);
    
    bm.update_deli.add(new ItemDOM("recipient",  null, { 
        constraints: [{ regex: /./, msg: "받는사람(수령인) 입력해주세요.", code: 150, return: true}],
        isNotNull: true
    }), ["valid", "bind"]);
    
    bm.update_deli.add(new ItemDOM("tel",  null, { 
        constraints: [{ regex: /./, msg: "받는사람 연락처를 입력해주세요.", code: 150, return: true}],
        isNotNull: true
    }), ["valid", "bind"]);

    bm.update_deli.add(new ItemDOM("zipcode",  null, { 
        constraints: [{ regex: /./, msg: "우편번호를 입력해주세요.", code: 150, return: true}],
        isNotNull: true
    }), ["valid", "bind"]);

    bm.update_deli.add(new ItemDOM("addr1",  null, { 
        constraints: [{ regex: /./, msg: "주소를 입력해주세요.", code: 150, return: true}],
        isNotNull: true
    }), ["valid", "bind"]);

    bm.update_deli.add(new ItemDOM("addr2",  null, { 
        constraints: [{ regex: /./, msg: "세부 주소를 입력해주세요.", code: 150, return: true}],
        isNotNull: true
    }), ["valid", "bind"]);

    bm.update_deli.addItem("deli_memo", "", ["bind"]);

    bm.add(new ItemDOM("dco_idx",  null, { 
        constraints: [{ regex: /./, msg: "택배사를 선택해 주세요.", code: 150, return: true}],
        isNotNull: true
    }), ["update_deli"], ["bind"]);

    bm.add(new ItemDOM("invoice",  null, { 
        constraints: [{ regex: /./, msg: "송장번호를 입력해주세요.", code: 150, return: true}],
        isNotNull: true
    }), ["update_deli"], ["bind"]);

    //--------------------------------------------------------------    
    // 4. 콜백 함수 구현    
    // onExecute
    bm.read.onExecute           = function(p_bindCommand) { bm.items["cmd"].value = "READ"; };
    bm.read_pay.onExecute       = function(p_bindCommand) { bm.items["cmd"].value = "READ_PAY"; };
    bm.list_deli.onExecute      = function(p_bindCommand) { bm.items["cmd"].value = "LIST_DELI"; };
    bm.list_prt.onExecute       = function(p_bindCommand) { bm.items["cmd"].value = "LIST_PRT"; };
    bm.list_corp.onExecute      = function(p_bindCommand) { bm.items["cmd"].value = "LIST_CORP"; };
    bm.update.onExecute         = function(p_bindCommand) { bm.items["cmd"].value = "UPDATE"; };
    bm.update_pay.onExecute     = function(p_bindCommand) { bm.items["cmd"].value = "UPDATE_PAY"; };
    bm.update_deli.onExecute    = function(p_bindCommand) { bm.items["cmd"].value = "UPDATE_DELI"; };
    bm.update_state.onExecute   = function(p_bindCommand) { 
        var deli_idx, invoice; 

        if (bm.items["cmd"].value === "UPDATE_DS") {
            bm.update_state.setItem(["dco_idx", "invoice"], ["valid", "bind"]);
            deli_idx = bm.items["deli_idx"].value;
            bm.items["dco_idx"].value = $("#dco_idx_" + deli_idx).val() === null ? "" : $("#dco_idx_" + deli_idx).val() ;
            bm.items["invoice"].value = $("#invoice_" + deli_idx).val();
        } else {
            bm.update_state.release(["invoice", "dco_idx"]); // 아이템 해제
        }
    };
    // cbOutput
    var template    = Handlebars.compile( $("#list-template").html() ); 

    Handlebars.registerHelper('comma_num', function (p_nmber) {
        return numberWithCommas(p_nmber);
    });

    bm.list_prt.cbOutput   = function(p_entity) {
        var row_total = p_entity.table["row_total"];
        var deli_idx;
        // 데이터 구성
        for (var i = 0; i < deliData.rows.length; i++) {
            deliData.rows[i].product = [];
            deli_idx = deliData.rows[i].deli_idx;
            deliData.rows[i].corp = corpData.rows;

            for(var ii = 0; ii < p_entity.table.rows.length; ii++) {
                if (deli_idx === p_entity.table.rows[ii].deli_idx) {
                    deliData.rows[i].product.push(p_entity.table.rows[ii]);
                }
            }
        }
        $("#list-body").html("");
        $("#list-body").append( template(deliData) );
    };
    // cbEnd
    bm.list_deli.cbEnd  = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];

        if (entity["return"] < 0) return alert("배송지 조회 처리가 실패 하였습니다. Code : " + entity["return"]);
        
        deliData = entity;
        bm.list_corp.execute();  // 체인형식으로 연결
    };
    bm.list_corp.cbEnd  = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];

        if (entity["return"] < 0) return alert("택배사 조회 처리가 실패 하였습니다. Code : " + entity["return"]);
        
        corpData = entity;
        bm.list_prt.execute();  // 체인형식으로 연결
    };
    bm.list_prt.cbEnd  = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];
        var deli_idx;
        var deli_state_cd;
        var ord_state_cd = bm.items["ord_state_cd"].value;
        var pay_state_cd = bm.items["pay_state_cd"].value;

        if (entity["return"] < 0) return alert("상품 조회 처리가 실패 하였습니다. Code : " + entity["return"]);
        
        for (var i = 0; i < deliData.rows.length; i++) {
            deli_idx        = deliData.rows[i].deli_idx;
            deli_state_cd   = deliData.rows[i].state_cd;
            
            if (["DW", "DK", "DR"].indexOf(deli_state_cd) > -1 && pay_state_cd === "PF") _setButton("Update_RW", deli_idx , "주문을 취소하고 환불대기 처리하시겠습니까? \n동일 주문에 대한 모든 배송지 상태가 변경됩니다.");
            if (["DR", "DS", "DF"].indexOf(deli_state_cd) > -1 && ord_state_cd == "OF") _setButton("Update_TW", deli_idx, "주문을 취소하고 반품대기 처리하시겠습니까? \n동일 주문에 대한 모든 배송지 상태가 변경됩니다.");
            if (["TW"].indexOf(deli_state_cd) > -1 && ord_state_cd == "CT") _setButton("Update_TF", deli_idx);
            if (["DW"].indexOf(deli_state_cd) > -1  && pay_state_cd === "PF" && ord_state_cd == "OF") _setButton("Update_DK", deli_idx);
            if (["DK"].indexOf(deli_state_cd) > -1  && pay_state_cd === "PF" && ord_state_cd == "OF") _setButton("Update_DR", deli_idx);
            if (["DK", "DR"].indexOf(deli_state_cd) > -1  && pay_state_cd === "PF" && ord_state_cd == "OF") _setButton("Update_DS", deli_idx);
            if (["DS"].indexOf(deli_state_cd) > -1 && pay_state_cd === "PF" && ord_state_cd == "OF") _setButton("Update_DF", deli_idx, "배송완료 처리하겠습니까.?");
            // 우편번호 검색
            $("#btn_Zipcode_" + deli_idx).click(function(e){
                popupPostCode('zipcode_'+deli_idx, 'addr1_'+deli_idx , 'addr2'+deli_idx);
            });
            // 배송정보 수정 버튼
            $("#btn_Update_deli_" + deli_idx).click(function () {
                bm.items["cmd"].value = "UPDATE_DELI";
                bm.items["deli_idx"].value = deli_idx;

                bm.items["recipient"].value     = $("#recipient_" + deli_idx).val();
                bm.items["tel"].value           = $("#tel_" + deli_idx).val();
                bm.items["zipcode"].value       = $("#zipcode_" + deli_idx).val();
                bm.items["addr1"].value         = $("#addr1_" + deli_idx).val();
                bm.items["addr2"].value         = $("#addr2_" + deli_idx).val();
                bm.items["deli_memo"].value     = $("#deli_memo_" + deli_idx).val();
                bm.items["dco_idx"].value       = $("#dco_idx_" + deli_idx).val() === null ? "" : $("#dco_idx_" + deli_idx).val() ;
                bm.items["invoice"].value       = $("#invoice_" + deli_idx).val();
                
                if (confirm("배송정보를 수정하시겠습니까?")) bm.update_deli.execute();
            });
            if (["DW"].indexOf(deli_state_cd) < 0) $("#area_invoice_" + deli_idx).css("display", "");

            // 송장번호 적용  (핸들바 사용이 복잡하여 우회)
            $("#dco_idx_" + deli_idx).val(deliData.rows[i].dco_idx);
        }
    };
    bm.update.cbEnd  = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];

        if (entity["return"] < 0) return alert("주문번호 수정 처리가 실패 하였습니다. Code : " + entity["return"]);

        bm.read.execute();  // 체인형식으로 연결
    };
    bm.update_state.cbEnd  = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];

        if (entity["return"] < 0) return alert("처리가 실패 하였습니다. Code : " + entity["return"]);

        load();
    };
    bm.update_pay.cbEnd  = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];

        if (entity["return"] < 0) return alert("결제정보 수정 처리가 실패 하였습니다. Code : " + entity["return"]);

        bm.read_pay.execute();
    };
    bm.update_deli.cbEnd  = function(p_res) {
        var entity = p_res["table"] || p_res["entity"] || p_res["tables"] || p_res["entities"];

        if (entity["return"] < 0) return alert("배송정보 수정 처리가 실패 하였습니다. Code : " + entity["return"]);

        bm.list_deli.execute();
    };
    // onExecuted
    bm.read.onExecuted = function(p_bindCommand) { 
        if (bm.items["ord_state_cd"].value === "OW" || bm.items["ord_state_cd"].value === "") {
             $("#btn_Update_PC").css("display", "");
        } else {
            $("#btn_Update_PC").css("display", "none");
        }
    };
    bm.read_pay.onExecuted = function(p_bindCommand) { 
        if (bm.items["pay_state_cd"].value === "PW") {
             $("#btn_Update_PF").css("display", "");
        } else {
            $("#btn_Update_PF").css("display", "none");
        }
        if (bm.items["pay_state_cd"].value === "RW") {
             $("#btn_Update_RF").css("display", "");
        } else {
            $("#btn_Update_RF").css("display", "none");
        }
    };

    //--------------------------------------------------------------    
    // 5. 이벤트 등록
    $("#btn_List").click(function () {
        var rtnURL = getParamsToJSON(location.href).rtnURL;
        
        if (typeof rtnURL === "undefined" || rtnURL.length === 0) {
            rtnURL = "Order_All_Lst.asp";
        }
        location.href = rtnURL;
    });
    $("#btn_Update_ord").click(function () {
        if (confirm("주문정보를 수정 하시겠습니까 ?")) {
            bm.update.execute();
        }
    });
    $("#btn_Update_PC").click(function () {
        if (confirm("삭제 하시겠습니까 ?")) {
            bm.items["cmd"].value = "UPDATE_PC";
            bm.update_state.execute();
        }
    });
    $("#btn_Update_RF").click(function () {
        if (confirm("환불(무통장입금/PG취소) 처리 하시겠습니까 ?")) {
            bm.items["cmd"].value = "UPDATE_RF";
            bm.update_state.execute();
        }
    });
    $("#btn_Update_PF").click(function () {
        if (confirm("결제완료(입금/승인) 처리 하시겠습니까 ?")) {
            bm.items["cmd"].value = "UPDATE_PF";
            bm.update_state.execute();
        }
    });
    $("#btn_Update_pay").click(function () {
        if (confirm("결제정보를 수정 하시겠습니까 ?")) {
            bm.items["cmd"].value = "UPDATE_PAY";
            bm.update_pay.execute();
        }
    });
    //--------------------------------------------------------------    
    // 6. 외부 호출 함수 구현
    function load() {
        bm.read.execute();
        bm.read_pay.execute();
        bm.list_deli.execute();
    }
    // 버튼 등록
    function _setButton(p_name, p_idx, p_msg) {
        var selector = "#btn_" + p_name + "_" + p_idx;

        $(selector).css("display", "");
        $(selector).click(function () {
            var deli_idx = p_idx;
            // 배송 발송시 제약조건 추가
            bm.items["deli_idx"].value = deli_idx;
            bm.items["cmd"].value = p_name.toUpperCase();
            if (typeof p_msg === "string" && confirm(p_msg)) {
                bm.update_state.execute();
            } else if (typeof p_msg === "undefined"){
                bm.update_state.execute();
            }
        });
    }
	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
    $(document).ready(function () {
        load();
    });

    // 디버깅용
    // bm.read.cbOutput  = function (pp) {
    //     console.log('read.cbOutput');
    // };

    // bm.read.cbBind  = function (pp) {
    //     console.log('read.bind');
    // };
    // bm.read_pay.cbBind  = function (pp) {
    //     console.log('read.bind');
    // };
    // bm.list_deli.cbBind  = function (pp) {
    //     console.log('read.bind');
    // };
    // bm.list_prt.cbBind  = function (pp) {
    //     console.log('read.bind');
    // };
    // bm.update.cbBind  = function (pp) {
    //     console.log('read.bind');
    // };
    bm.update_state.cbBind  = function (pp) {
        console.log('update_state.bind');
    };
    // bm.update_deli.cbBind  = function (pp) {
    //     console.log('update_deli.bind');
    // };
    // bm.update_pay.cbBind  = function (pp) {
    //     console.log('update_pay.bind');
    // };
</script>
<!-- 우편번호 팝업창 -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
    function popupPostCode(p_zip, p_addr1, p_addr2) {
        new daum.Postcode({
            oncomplete: function(data) {
                $('#' + p_zip).val(data.zonecode);
                $('#' + p_addr1).val(data.address);
                // $('#' + p_zip)val(data.zonecode);
            }
        }).open();
    }
</script>
</body>
</html>            