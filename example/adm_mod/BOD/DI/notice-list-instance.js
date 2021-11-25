//--------------------------------------------------------------
// 1. 네임스페이스 정의 및 생성

var BindModelListAjax       = _W.Meta.Bind.BindModelListAjax;
var NoticeListDI            = _W.Meta.Bind.NoticeListDI;
var ItemDOM                 = _W.Meta.Entity.ItemDOM;

var template                = Handlebars.compile( $("#notice-list-template").html() );

var page                    = new PageView("page", 5);
var di                      = new NoticeListDI();

// 의존성주입 객체 설정 :: 전처리
// di.prop["keyword"].selector = di.prop["__keyword_id"];
// di.prop["keyword"].getter = function() { return $(di.prop["__keyword_id"]).val(); };
di.prop["keyword"].setter = function(val) { $(di.prop["__keyword_id"]).val(val); };

di.prop["page_size"].getter = function() { return page.page_size; };
di.prop["page_size"].setter = function(val) { page.page_size = val; };

di.prop["page_count"].getter = function() { return page.page_count; };
di.prop["page_count"].setter = function(val) { page.page_count = val; };

// 제약조건 등록 [**선택사항**]
// di.prop["btn_Search"] = {selector: "#btn_Search"};

var bm = new BindModelListAjax(di, true, ItemDOM);

//--------------------------------------------------------------    
// 2. 객체 설정 (등록)
bm.baseUrl = "/Admin/adm_mod/BOD/Notice.C.asp";         // 생성 및 설정
bm.prop["__frmURL"] = "Notice_Frm.asp";
bm.first.items["regURL"].value = "Notice_Frm.asp";

// 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
$("#keyword").val( decodeURI(getArgs("" /*서버측값*/, ParamGet2JSON(location.href).keyword )) );
page.page_count = Number( getArgs("" /*서버측값*/, ParamGet2JSON(location.href).page_count, page.page_count) );

// page 콜백 함수 설정 (방식)
// page.callback = bm.list.execute.bind(bm.list);       // 1) 콜백 방식
// page.callback = goPage;                              // 2-1) GET 방식     
page.callback = page.goPage.bind(bm.list.bind);         // 2-2) GET 방식 (bind)    

// 제약조건 등록 [**선택사항**]
bm.prop["btn_Search"] = {selector: "#btn_Search"};

bm.prop["__key3"] = "#keyword";

//--------------------------------------------------------------    
// 3. 아이템 등록 및 설정(추가)
bm.addItem("cmd", "LIST", [], "bind");                   // 전역 아이템 추가
bm.addItem("doctype", "JSON", [], "bind");

//--------------------------------------------------------------    
// 4. 콜백 함수 구현
bm.list.cbOutput   = function(p_entity) {
    var row_total   = p_entity.table["row_total"];
    $("#totalView").html(row_total);
    $("#notice-list-body").html("");
    $('#notice-list-body').append( template(p_entity.table) );
    $("#CPage").html(page.parser(row_total));
};

//--------------------------------------------------------------    
// 5. 이벤트 등록
$("#btn_Search").click(function () {
    page.page_count = 1;
    bm.list.execute();
});
$("#btn_Reset").click(function () {
    $("form").each(function() {
        this.reset();
    });
});
$("#btn_Insert").click(function () {
    var regURL = bm.first.items["regURL"].value;
    location.href = regURL + "?mode=CREATE";
});    
$("#page_size").change(function () {
    page.page_size = $("#page_size").val();
    page.page_count = 1;
    bm.list.execute();
});

//--------------------------------------------------------------    
// 6. 외부 호출 함수 구현
Handlebars.registerHelper('cut', function (p_date) {
    return p_date.substring(0, 10);
});

bm.list.cbBind = function(pp) {
    console.log(11);
}