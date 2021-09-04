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
<!--#include virtual="/Module/ORD/ORD_Reg.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD_Pay.Cls.asp"-->
<!--#include virtual="/Module/ORD/ORD_PG_Toss.Cls.asp"-->
<!--#include virtual="/Module/ORD/TossPay.Cls.asp"-->
<!--#include virtual="/Common/include/encode.Fnc.asp"-->

<%	
    '-------------------------------------------------
    ' 변수 선언 및 초기화
    Dim orderId     : orderId = Request("orderId")
    Dim paymentKey  : paymentKey = Request("paymentKey")
    Dim amount      : amount = Request("amount")
    Dim memo        : memo = Request("memo")

    Dim oDic, oRs
    Dim iReturn     : iReturn = 0
    Dim iRowTotal   : iRowTotal = 0
    Dim iMsgCode    : iMsgCode = 0
    Dim i


    
    ' Dim clientKey   : clientKey = "test_sk_O6BYq7GWPVvXBNGyjoa8NE5vbo1d"    '테스크 시크릿키
    ' Dim e_clientKey : e_clientKey = BASE64_ENCODE(clientKey & ":")
    
    ' Dim url         : url = "https://api.tosspayments.com/v1/payments/" & paymentKey
    ' '  Dim url         : url = "https://api.tosspayments.com/v1/payments/" & paymentKey & "?orderId=" & orderId & "&amount=" & amount
    ' ' Dim url         : url = "http://jns9778.cafe24.com/Front/frt_mod/PRT/Opinion.C.asp?cmd=LIST&page_size=1"
    ' ' Dim url         : url = "http://jns9778.cafe24.com/Front/frt_mod/PRT/Opinion.C.asp"
    ' ' Dim url         : url = "http://jns9778.cafe24.com/Front/PC/order/asp_json_request.asp"

    ' Function postFormData(url, data) 
    '     ' Dim xhr : Set xhr = CreateObject("Microsoft.XMLHTTP")
    '     ' Dim xhr : Set xhr = Server.CreateObject("MSXML2.ServerXMLHTTP.3.0") 
    '     Dim xhr : Set xhr = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")
    '     xhr.open "POST", url, false 
    '     xhr.setRequestHeader "Authorization", "Basic " + e_clientKey
    '     ' 1> 객체 전달방식 (JSON)
    '     xhr.setRequestHeader "Content-Type", "application/json"
    '     ' 2> 일반 전달방식
    '     ' xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
    '     ' xhr.setRequestHeader "Content-Length", Len(data)
    '     xhr.send data
    '     If xhr.Status = 200 Then
    '         postFormData = xhr.ResponseText 
    '     Else 
    '         Err.Raise 1001, "postFormData", "Post to " & url & " failed with " & xhr.Status 
    '         'Response.Redirect "fail.asp?ord_id=" & orderId
    '     End If 
    ' End Function 



    ' Dim resp
    ' Dim postData

    ' ' postData =  "{ ""cmd"":""LIST"",""page_size"":1 }"
    ' postData =  "{ ""orderId"":""" + orderId +""",""amount"":"+ amount +" }"
    ' ' resp = postFormData(url, "cmd=LIST")
    ' ' resp = postFormData(url, "cmd=LIST&page_size=1")
    
    


    ' 1. PG 결제의 경우
    IF Len(paymentKey) > 0 Then 

        Dim cPay        : Set cPay = New ORD_Pay_Cls        ' 주문상태 조회
        Dim cPG         : Set cPG = New ORD_PG_Toss_Cls     ' PG 등록
        Dim cTossPay    : Set cTossPay = New TossPay_Cls    ' PG 전송
        Dim cOrder      : Set cOrder = New ORD_Reg_Cls      ' 주문 완료

        ' 2. 주문상태 검사 (중복 방지!!)
        cPay.Ord_id = orderId
        Dim oPay  : Set oPay = cPay.ReadDic(iReturn)
        
        ' 실패시
        If iReturn < 0 Then 
            memo = "주문정보없음실패"
            Response.Redirect "fail.asp?orderId=" & orderId & "&amount=" & amount & "&paymentKey=" & paymentKey & "&memo=" & memo
        End if

        If oPay.Count > 0 and Trim(oPay.Item(0)("state_cd")) = "" Then

            ' 3. PG 등록   : PG에는 등록되었는데 주문에 없는 경우는 실패 주문으로 확인!!
            cPG.Ord_id      = orderId
            cPG.PaymentKey  = paymentKey
            cPG.Amount      = amount
            cPG.Memo        = "주문완료"

            Call cPG.Create(iReturn)

            If iReturn < 0 Then 
                memo = "PG정보DB등록실패"
                Response.Redirect "fail.asp?orderId=" & orderId & "&amount=" & amount & "&paymentKey=" & paymentKey & "&memo=" & memo
            End If
            

            ' 4. PG 결제승인 전달
            Dim strJSON : strJSON =  "{ ""orderId"":""" + orderId +""",""amount"":"+ amount +" }"
            Dim resultText
            resultText = cTossPay.Approval(iReturn, paymentKey, strJSON)


            ' 5. 결과 수신
            If iReturn <> 200 Then
                memo = "PG승인실패:" & iReturn 
                Response.Redirect "fail.asp?orderId=" & orderId & "&amount=" & amount & "&paymentKey=" & paymentKey & "&memo=" & memo
            End If

            ' 5-1 성공시
            cOrder.Ord_id   = orderId
            cOrder.Pg_yn    = "Y"
            Call cOrder.Finish(iReturn)

            ' 5-2 실패시 (결제실패 화면으로 이동)
            If iReturn < 0 Then
                memo = "주문상태변경실패"
                Response.Redirect "fail.asp?ord_id=" & orderId & "&memo=" & memo
            End If

        End If

    End If



%><!doctype html>
<html>
<head>
<!--#include virtual="/Front/PC/include/HeadTag.I.asp"-->
    <link type="text/css" rel="stylesheet" href="/Front/PC/css/order.css?ts=1604047110" />
</head>
<!--

-------------------------

--------------
참조
{"mId":"tvivarepublica","paymentKey":"qXJxNkgDKzOEP59LybZ8B7xYjOakn36GYo7pRe10BMQwla2v","orderId":"20210216174257","currency":"KRW","method":"카드","totalAmount":4800,"balanceAmount":4800,"status":"DONE","requestedAt":"2021-02-16T17:42:57+09:00","approvedAt":"2021-02-16T17:43:27+09:00","useEscrow":false,"card":{"company":"삼성","number":"942084******2745","installmentPlanMonths":0,"isInterestFree":false,"approveNo":"00000000","useCardPoint":false,"cardType":"신용","ownerType":"개인","acquireStatus":"READY","receiptUrl":"https://merchants.tosspayments.com/web/serve/merchant/test_ck_N5OWRapdA8dBLd77PRnVo1zEqZKL/receipt/qXJxNkgDKzOEP59LybZ8B7xYjOakn36GYo7pRe10BMQwla2v"},"virtualAccount":null,"mobilePhone":null,"giftCertificate":null,"cashReceipt":null,"discount":null,"cancels":null,"secret":"ps_Lex6BJGQOVDZLJgLyga8W4w2zNbg","useDiscount":false,"discountAmount":0,"useCashReceipt":false}

-->
<body class="body-main body-index pc"  >
    <div id="warp">
        <div id="header_warp">
<!--#include virtual="/Front/PC/include/Header.I.asp"-->
        </div>
         <!-- //header_warp -->

        <div id="container">

            <div id="contents">

                <div class="location_wrap">
                    <div class="location_cont">
                        <em><a href="#" class="local_home">HOME</a> &gt; 주문완료</em>
                    </div>
                </div>

                <div id="sub_content">

                    <div class="content_box">
                        <div class="order_wrap">
                            <div class="order_tit">
                                <h2>주문완료</h2>
                                <ol>
                                    <li><span>01</span> 장바구니 <span><!--<img src="/data/skin/front/lady2019_C/img/member/icon_join_step_off.png" alt="">--></span></li>
                                    <li><span>02</span> 주문서작성/결제<span><!--<img src="/data/skin/front/lady2019_C/img/member/icon_join_step_off.png" alt="">--></span></li>
                                    <li class="page_on"><span>03</span> 주문완료</li>
                                </ol>
                            </div>
                            <!-- //member_tit -->

                            <div class="order_cont">
                                <div class="order_end">

                                    <!-- 결제 실패 -->
                                    <div class="order_end_completion">
                                        <span><img src="/Front/PC/img/order_end_completion.png" alt=""></span>
                                        <p>
                                            <strong>주문이 완료되었습니다. </strong><br><em>무통장 입금은 입금확인후 배송처리됩니다.</em>
                                        </p>
                                    </div>

                                    <div class="order_zone_tit">
                                        <h4>주문요약정보</h4>
                                    </div>

                                    <div class="order_table_type">
                                        <table class="table_left">
                                            <colgroup>
                                                <col style="width:15%;">
                                                <col style="width:85%;">
                                            </colgroup>
                                            <tbody>
                                            <tr>
                                                <th>결제수단</th>
                                                <td><div class="pay_with_list">
                                                    <strong id="lbl_pay_method">신용카드</strong>
                                                    <ul>
                                                        <li></li>
                                                        <li>결제금액 : <strong id="lbl_amount" class="deposit_money">199,000</strong>원</li>
                                                    </ul>
                                                </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>주문번호</th>
                                                <td > <strong id="lbl_ord_id" class="deposit_money">0</strong></td>
                                            </tr>
                                            <tr style="display:none;">
                                                <th>결제실패사유</th>
                                                <td>고객님의 결제 중단에 의해서 주문이 취소 되었습니다.</td>
                                            </tr>
                                        </tbody></table>
                                    </div>
                                </div>
                                <!-- //order_end -->
                                <div class="btn_center_box">
                                    <a href="/" class="btn_order_end_ok"><em>확인</em></a>
                                </div>
                                <br/>

                            </div>
                            <!-- //order_cont -->
                        </div>
                        <!-- //order_wrap -->
                    </div>
                    <!-- //content_box -->


                </div>
                <!-- //sub_content -->
            </div>
        </div>
         <!-- //container -->

        <div id="footer_wrap">
<!--#include virtual="/Front/PC/include/Footer.I.asp"-->
        </div>
        <!-- //footer_wrap --> 
    </div>

<script>
    var amount = getParamsToJSON(location.href).amount;
    var ord_id = getParamsToJSON(location.href).orderId;
    var paymentKey = getParamsToJSON(location.href).paymentKey;

    $("#lbl_amount").text(numberWithCommas(amount));
    $("#lbl_ord_id").text(ord_id);

    if (typeof paymentKey === "undefined")  $("#lbl_pay_method").text("무통장");
    else  $("#lbl_pay_method").text("신용카드");

</script>    
</body>
</html>