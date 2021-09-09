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
'
'******************************************************************************
%>
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Define.I.asp"-->
<%	
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim SSID            : SSID = Session.SessionID
    Dim MEB_IDX         : MEB_IDX = Session("MEB_IDX")
    Dim MEB_NAME        : MEB_NAME = Session("MEB_NAME")
    Dim STATE_CD        : STATE_CD = Session("STATE_CD")

'TODO:: 테스트용
'  prt_id = "43"

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim i
    
%>
<!doctype html>
<html>
<head>
    <!--
    <%=SSID%>
    <%=MEB_NAME%>
    <%=MEB_IDX%>
    -->
    <title>고산촌 문의글 쓰기</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <link type="text/css" rel="stylesheet" href="/Front/PC/css/reset.css?ts=<%=g_iRandomID%>">
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/common.css?ts=<%=g_iRandomID%>">
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/common_layer.css?ts=<%=g_iRandomID%>">
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/layout.css?ts=<%=g_iRandomID%>">
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/list.css?ts=<%=g_iRandomID%>">
	<link type="text/css" rel="stylesheet" href="/Front/PC/css/button.css?ts=<%=g_iRandomID%>">
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/board.css?ts=<%=g_iRandomID%>" />
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/chosen.css?ts=<%=g_iRandomID%>" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		
    <script src="/Common/js/jquery.xml2json.js"></script>
	<script src="/Common/js/common.js?<%=g_iRandomID%>"></script>
    
    <script type="text/javascript" src="/Front/PC/js/gd_ui.js?ts=<%=g_iRandomID%>"></script>
    <!--
    <script type="text/javascript">
        var json_locale_data = "var json_locale_data = {\"domain\":\"messages\",\"locale_data\":{\"messages\":{\"\":{\"lang\":\"ATF\",\"plural-forms\":\"nplurals=1; plural=0\"}}}}"
    </script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/gd_gettext.js?ts=1583407824"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/jquery/jquery.min.js?ts=1592267268"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/underscore/underscore-min.js?ts=1583407832"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/jquery/validation/jquery.validate.min.js?ts=1583407913"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/jquery/validation/additional-methods.min.js?ts=1583407913"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/numeral/numeral.min.js?ts=1583407832"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/global/accounting.min.js?ts=1583407832"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/global/money.min.js?ts=1583407832"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/jquery/chosen/chosen.jquery.min.js?ts=1583407913"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/jquery/placeholder/placeholders.jquery.min.js?ts=1583407913"></script>
    <![if gt IE 8]>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/copyclipboard/clipboard.min.js?ts=1583407832"></script>
    <![endif]>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/jquery/vticker/jquery.vticker.js?ts=1583407913"></script>
    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/gd_ui.js?ts=1592359252"></script>

	<script type="text/javascript" src="/data/skin/front/lady2019_C/js/ld_code.js?ts=1613321101"></script>

    <script type="text/javascript">
        // 고도몰5 통화정책
        var gdCurrencyDecimal = 0;
        var gdCurrencyDecimalFormat = '0';
        var gdCurrencyCode = 'KRW';
        var gdCurrencyAddDecimal = 0;
        var gdCurrencyAddDecimalFormat = '';
        var gdCurrencyAddCode = '';
        var gdLocale = 'ko';
        var gdCurrencySymbol = '';
        var gdCurrencyString = '원';

        // 환율변환 정책
        fx.base = "KRW";
        fx.settings = {
            from : "KRW",
            to : gdCurrencyCode
        };
        fx.rates = {
            "KRW" : 1,
            "USD" : 0,
            "CNY" : 0,
            "JPY" : 0,
            "EUR" : 0,
        }
    </script>

    <script type="text/javascript" src="/data/skin/front/lady2019_C/js/gd_common.js?ts=1617177536"></script>

    -->
    

    <style type="text/css">
        body {
        }

        /* body > #wrap > #header_warp : 상단 영역 */
        #header_warp {
        }

        /* body > #wrap > #container : 메인 영역 */
        #container {
        }

        /* body > #wrap > #footer_wrap : 하단 영역 */
        #footer_wrap {
        }
    </style>


</head>

<body class="body-board body-popup-goods-board-write pc"  >
<div class="board_write_popup">
    <div class="ly_tit"><h4>상품문의 쓰기</h4></div>
    <div class="ly_cont">
        <form name="frmWrite" id="frmWrite" action="../board/board_ps.php" method="post" enctype="multipart/form-data">
            <input type="hidden" name="gboard" value="y">
            <input type="hidden" name="windowType" value="popup">
            <input type="hidden" name="bdId" value="goodsqa">
            <input type="hidden" name="sno" value="">
            <input type="hidden" name="mode" value="write">
            <input type="hidden" name="goodsNo" value="1000003144">
            <input type="hidden" name="returnUrl" value="bdId=goodsqa&goodsNo=1000003144&orderGoodsNo=0">

            <div class="scroll_box">
                <div class="top_item_photo_info">
                    <!--
                    <div class="item_photo_box">
                        <img src="/data/goods/19/04/16//1000003144/1000003144_detail_053.gif" width="600" alt="[스칸딕 정품] 레이디가구 스칸딕 데이베드/침대세트" title="[스칸딕 정품] 레이디가구 스칸딕 데이베드/침대세트" class="middle"  />
                    </div>
                    -->
                    <!-- //item_photo_view -->
                    <div class="item_info_box">
                        <h5 id="m-prtName-pop">.</h5>
                    </div>
                </div>
                <!-- //top_item_photo_info -->
                <div class="board_write_box">
                    <table class="board_write_table">
                        <colgroup>
                            <col style="width:15%" />
                            <col style="width:85%" />
                        </colgroup>
                        <tbody>
                        <!--
                        <tr>
                            <th scope="row">말머리</th>
                            <td>
                                <div class="category_select">
                                    <select class=" chosen-select" id="category" name="category" style="width:127px;"><option value="상품"  >상품</option></select>
                                </div>
                            </td>
                        </tr>
                        -->
                        <tr>
                            <th scope="row">작성자</th>
                            <td>
                                <input type="text" id="m-writer" name="writerNm" value="" title="작성자 입력"/>
                            </td>
                        </tr>
                        <tr id="area_passwd">
                            <th scope="row">비밀번호</th>
                            <td>
                                <input type="password" id="m-passwd" name="writerPw" title="비밀번호 입력"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">제목</th>
                            <td>
                                <input type="text" id="m-title" name="subject" class="write_title" placeholder="제목 입력" value=""/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">내용</th>
                            <td class="wirte_editor">
                                <div class="form_element">
                                </div>
                                <textarea title="내용 입력" id="m-contents" style="width:100%; min-width:510px;" name="contents" cols="50" rows="3"></textarea>
                            </td>
                        </tr>
                        <!--
                        <tr>
                            <th scope="row">파일</th>
                            <td id="uploadBox">
                                <div class="file_upload_sec">
                                    <label for="attach"><input type="text" class="file_text" title="파일 첨부하기" readonly="readonly" /></label>
                                    <div class="btn_upload_box">
                                        <button type="button" class="btn_upload" title="찾아보기"><em>찾아보기</em></button>
                                        <input type="file" id="attach" name="upfiles[]" class="file" title="찾아보기" />
                                        <span class="btn_gray_list"><button type="button" id="addUploadBtn" class="btn_gray_big"><span>+ 추가</span></button></span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">자동등록방지</th>
                            <td>
                                <div class="capcha">
                                    <div class="capcha_img">
                                        <img src="../board/captcha.php?ch=1617583940" align="absmiddle" id="captchaImg"/>
                                    </div>
                                    <div class="capcha_txt">
                                        <p>보이는 순서대로 <br/>숫자 및 문자를 모두 입력해 주세요.</p>
                                        <input type="text" name="captchaKey" maxlength="5" onKeyUp="javascript:this.value=this.value.toUpperCase();" onfocus="this.select()" label="자동등록방지문자">
                                        <span class="btn_gray_list">
                                                <button type="button" class="btn_gray_small" onclick="gd_reload_captcha()">
                                                    <span><img src="/data/skin/front/lady2019_C/img/etc/icon_reset.png" alt="" class="va-m"> 이미지 새로고침</span>
                                                </button>
                                            </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        -->
                        </tbody>
                    </table>
                </div>
                <!-- //board_wirte_box -->
                <div class="board_wirte_agree">
                    <div class="board_commen_agree">
                        <div class="form_element">
                            <h5>비회원 개인정보 수집동의</h5>
                            <div class="textarea_box">
                                <div class="textarea_txt">
                                - 수집항목: 이름, 전화번호, 이메일주소<br />
                                - 수집/이용목적: 게시글 접수 및 결과 회신<br />
                                - 이용기간: 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. <br />
                                            단, 관계법령의 규정에 의하여 보전할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다.<br />
                                그 밖의 사항은 (주) 제이엔에스글로벌 개인정보처리방침을 준수합니다.
                                </div>
                            </div>
                            <!-- //textarea_box -->
                            <div class="agree_choice_box">
                                <input type="checkbox" id="qnaPrivacyAgree" name="private" value="y" />
                                <label for="qnaPrivacyAgree">위 내용에 동의합니다.</label>
                                <!--
                                <a href="../service/private.php" target="_blank" class="link_agree_go">전체보기&gt;</a>
                                -->
                            </div>
                        </div>
                    </div>
                    <!-- //board_commen_agree -->
                </div>
                <!-- //board_wirte_agree -->
            </div>
            <!-- //scroll_box -->
        </form>
        <div class="btn_center_box">
            <a href="javascript:window.close()"><button class="btn_ly_cancel"><strong>취소</strong></button></a>
            <a href="#" id="btn_Create" class="btn_ly_write_ok"><strong>등록</strong></a>
        </div>
    </div>
    <!-- //ly_cont -->
</div>
<!-- //layer_wrap_cont -->
<!-- 네이버 웹에디터 -->
<script type="text/javascript" src="/nhn_editor/js/service/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript">
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "m-contents",        // textarea id
        sSkinURI: "/nhn_editor/SmartEditor2Skin.html",
        fCreator: "createSEditor2",
        fOnAppLoad : function(){
        //예제 코드
        //oEditors.getById["content"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
            // var sHTML = '<span style="color:#FF0000;">저장</span>';
            // oEditors.getById["answer"].exec("PASTE_HTML", [sHTML]);
        },        
    });
</script>

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-qna-svc.js?<%=g_iRandomID%>"></script>
<script src="/Front/frt_mod/PRT/Service/product-detail-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var qna = new _W.BindModelAjax(new ProductQnaService());
	var prt = new _W.BindModelAjax(new ProductDetailService("-pop"));
    
    var prt_id =  getParamsToJSON(location.href).prt_id;
    
    isLog = true;
    
    // 속성 설정 : prt
    prt.items["prt_id"].value = prt_id;
    // 속성 설정 : qna
    qna.items["prt_id"].value = prt_id;
    qna.items["writer"].value = "<%=MEB_NAME%>";
    qna.items["meb_idx"].value = "<%=MEB_IDX%>";

    // 콜백 등록 : dspPrt
    qna.create.onExecute = function(p_cmd) {
        oEditors.getById["m-contents"].exec("UPDATE_CONTENTS_FIELD", []);   // nhn 웹데이터
    };
    qna.create.onExecuted = function(p_cmd, p_result) {
        var row_total = p_result.row_total || p_result.table.row_total || 0;
        if (p_result["return"] < 0) {
            return alert("등록 처리가 실패 하였습니다. Code : " + p_result["return"]);
        } else {
            alert('문의가 등록되었습니다.');
            opener.location.reload();
            window.close();
        }
    };

	// 이벤트 바인딩
	$('#btn_Create').click(qna.fn.procCreate);

    //--------------------------------------------------------------
	$(document).ready(function () {
        // 초기화
        qna.init();
        prt.init();

        prt.fn.procRead();

        if (qna.items["meb_idx"].value > 0 ) $("#area_passwd").hide();

    });
	if (this.isLog) console.log("______________ $.ready()");
</script>


</body>
</html>    
<!--#include virtual="/Front/frt_cmn/include/Front_Global_Tail.I.asp"-->