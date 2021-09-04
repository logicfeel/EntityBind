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
'   http://rtwgs4.cafe24.com/Admin/pc/mod/bod/faq_Lst.asp#none
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
    <link rel="stylesheet" type="text/css" href="/css/suio.css" media="screen" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/css/layout.css" media="screen" charset="utf-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		
    
    <script language="javascript" src="/Common//JS/jquery.xml2json.js"></script>
	<script language="javascript" src="/Common/JS/Common.js"></script>
	<script language="javascript" src="/Admin/adm_cmn/js/admin_common.js?v2"></script>
    
</head>
<body>

<div style="width:1020px">   


    <form id="frm_default" name="frm_default" method="post">
                
	<!--###############  검색 조건 Block ###############-->

	<div class="section" id="QA_profile1">
  		<div>&nbsp;</div>
        <div>&nbsp;</div>                        
        <!--
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
                        <th scope="row">질문</th>
                        <td colspan="3">
                            <input type="text" id="name_corp_tel_hp" name="name_corp_tel_hp" value="" class="fText" style="width:200px;" />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        -->
		<!--###############  검색 버튼 Block ###############-->
		<!--
        <div class="mButton gCenter">
		    <a href="#none" id="btn_Search" class="btnSearch"><span>검색</span></a>
		    <a href="#none" id="btn_Reset" class="btnSearch reset"><span>초기화</span></a>
		</div>
        -->

    </div>

	

	<!--###############  처리중 Block ###############-->
	<div class="mLoading typeStatic">
	    <p>처리중입니다. 잠시만 기다려 주세요.</p>
	    <img src="http://img.echosting.cafe24.com/suio/ico_loading.gif" alt="" />
	</div>
	
	<!--###############  페이지 Block ###############-->
	<!-- 도움말 영역 -->

	<!-- //도움말 영역 -->
    </form>
    <!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">-->
<style>
	.w3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:20}    
	.w3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}
	.w3-animate-opacity{animation:opac 0.8s}@keyframes opac{from{opacity:0} to{opacity:1}}
	.w3-animate-top{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}
	.w3-animate-left{position:relative;animation:animateleft 0.4s}@keyframes animateleft{from{left:-300px;opacity:0} to{left:0;opacity:1}}
	.w3-animate-right{position:relative;animation:animateright 0.4s}@keyframes animateright{from{right:-300px;opacity:0} to{right:0;opacity:1}}
	.w3-animate-bottom{position:relative;animation:animatebottom 0.4s}@keyframes animatebottom{from{bottom:-300px;opacity:0} to{bottom:0;opacity:1}}
	.w3-animate-zoom {animation:animatezoom 0.6s}@keyframes animatezoom{from{transform:scale(0)} to{transform:scale(1)}}
	.w3-animate-input{transition:width 0.4s ease-in-out}.w3-animate-input:focus{width:100%!important}
	.w3-opacity,.w3-hover-opacity:hover{opacity:0.60}.w3-opacity-off,.w3-hover-opacity-off:hover{opacity:1}
</style>
	<div id="part_Overlay" class="w3-overlay w3-animate-opacity" style="cursor:pointer;z-index:90;"></div>





<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

<div id="chartdiv"></div>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>


</div>        


<script>

    function chart(p_date) {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        for (var i = 0; p_date.length > i; i++) {
            chart.data.push(p_date[i]);

        }


        // Create axes
        var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
        xAxis.renderer.minGridDistance = 40;

        // Create value axis
        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueX = "row_count";
        series1.dataFields.valueY = "cnt";
        series1.dataFields.value = "row_count";
        series1.strokeWidth = 2;

        var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
        series1.heatRules.push({
        target: bullet1.circle,
        min: 5,
        max: 20,
        property: "radius"
        });

        bullet1.tooltipText = "{create_dt}, 방문자:[bold]{valueY}[/]";

        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueX = "row_count";
        series2.dataFields.valueY = "view_it";
        series2.dataFields.value = "row_count";
        series2.strokeWidth = 2;

        var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
        series2.heatRules.push({
        target: bullet2.circle,
        min: 5,
        max: 20,
        property: "radius"
        });

        bullet2.tooltipText = "{create_dt} 페이지뷰 :[bold]{valueY}[/]";

        bullet2.clickable = function() {alert(1)};

        //scrollbars
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();
    }

</script>

<!--
직접 사용 방법
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var visit = new _W.BindModelAjax(new BaseService());

    this.isLog = true;  // 디버깅 모드

	// 속성 설정
    visit.baseUrl = "/Admin/adm_mod/LOG/Log_Visit.C.asp";
    visit.addCommand('stats', 1);
    visit.addItem("cmd", "STATS", [], "bind");

    // 콜백 : onExecuted 로 변경
    visit.stats.cbOutput = function(p_result) {
        var entity = p_result['table'];
        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
        chart(entity.rows);  
    };
    //--------------------------------------------------------------
	$(document).ready(function () {
        visit.init();
        visit.stats.execute();
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>
-->

<script src="/Common/js/handlebars.js"></script>
<script src="/Common/js/_w-meta-1.6.1.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_cmn/Service/base-page-svc.js?<%=g_iRandomID%>"></script>
<script src="/Admin/adm_mod/LOG/Service/log-visit-svc.js?<%=g_iRandomID%>"></script>
<script>
	// #######################################################################################################
	var visit = new _W.BindModelAjax(new LogVisitService());
	
    this.isLog = true;  // 디버깅 모드

    // 콜백 : onExecuted 로 변경
    visit.stats.onExecuted = function(p_cmd, p_result) {
        var entity = p_result['table'];
        if (p_result['return'] >= 0) {
            chart(entity.rows);  
        }
    };

    //--------------------------------------------------------------
	$(document).ready(function () {
        visit.init();
		visit.fn.procStats();
    });
	if (this.isLog) console.log("______________ $.ready()");
</script>
 

</body>
</html>            