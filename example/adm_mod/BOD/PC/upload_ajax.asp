<% @CODEPAGE="65001" language="VBScript" %>
<!DOCTYPE html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="copyright" content="Copyright(c) White Lab Inc. All Rights Reserved." />
    <title>OnStory Admin</title>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>		

	<script language="javascript" src="/Common/js/jquery.xml2json.js"></script>
	<script language="javascript" src="/Common/js/common.js?v1"></script>
	<script language="javascript" src="/Admin/adm_cmn/js/admin_common.js?v2"></script>
</head>
<body>



upload test 
<p>[파일경로: <b>sssss.jpg</b> ]  <button>삭제</button></p>


<form method="post" enctype="multipart/form-data" id="fileUploadForm">
    <input type="file" name="upfile" id="upfile">
</form>

<button id="btn_create">전송ajax</button>


<script src="/Common/js/_w-meta-1.5.1.js?v2"></script>
<script>
    //--------------------------------------------------------------
	// 1. 생성 및 서비스 설정
    var image              = new BindModelAjax();
    
    image.create = new BindCommandEditAjax(image);
    
    image.baseUrl = "/Admin/adm_mod/SYS/System_Image.C.asp";
    // image.create.ajaxSetup.enctype = "multipart/form-data";

	//--------------------------------------------------------------    
	// 2. 객체 설정 (등록)
    
    //--------------------------------------------------------------    
    // 3. 아이템 등록 및 설정(추가)
    image.addItem("cmd", "CREATE", [], "bind");
    image.addItem("position_cd", "Product", [], ["bind"]);
    image.addItem("pos_idx", "5", [], ["bind"]);
    image.addItem("upfile", "", [], ["bind"]);


    //--------------------------------------------------------------    
	// 6. 외부 호출 함수 구현
	// function goForm(p_idx) {								// **요약가능** imageListDI.goForm() 정적 메소드로 가능 
	// 	var url = image.prop["__frmURL"];
	// 	location.href = url + "?mode=EDIT&ntc_idx=" + p_idx;
    // }

    $("#btn_create").click(function () {
        image.items["upfile"].value = $("#upfile").val();
        image.create.execute();
    });
	//--------------------------------------------------------------
	// 0. 준비완료 후 실행 정의
	$(document).ready(function () {
		image.init();
        // image.list.execute();
	});
    
    image.cbBaseBind  = function (p_ajaxSetup, p_command) {
        console.log('create.cbBaseBind');
        // !! 중요 !!
        // multipart/form-data 방식으로 변환
        var form = $('#fileUploadForm')[0];
        var data = new FormData(form);

        for (var i = 0; i < p_command.bind.items.count; i++) {
            data.append(p_command.bind.items[i].name, p_command.bind.items[i].value);
        }
        p_ajaxSetup.data = data;
        p_ajaxSetup.enctype = "multipart/form-data";
        p_ajaxSetup.processData = false;
        p_ajaxSetup.contentType = false;
        p_ajaxSetup.type = "POST";
    };

    image.create.cbBind  = function (p_ajaxSetup) {
        console.log('create.bind');
    };

    image.create.cbEnd  = function (p_entity) {
        console.log('create.cbEnd');

        // 성공시 조회 호출함
        // image.read.execute(); 
    };

    image.cbError  = function (pp, ppp, pppp) {
        console.log('cbError');
    };

</script>
</body>
</html>