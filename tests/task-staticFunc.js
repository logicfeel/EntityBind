const { Item } = require("../src/entity-item");

// 화면 인터페이스
function IBinder() {
    this.mode   = {};
    this.attr  = {};
    this.cbRegister;
    this.cbValid;
    this.cbReady;   // 이부분은 혼선을 피하기 위해서 인터페이스에서 빼는거 적당할듯 => 덮어써서 자용하면됨 (자동화의 이득)
}

function Page() {
    // -------------------------------------
    // 선언부
    this.mode = {edit: null, create: null};                 // 화면과 의존성이 높음 , * mode : 방식
    this.attr = {                                          // idx 같이 고유 명칭이므로 의존성이 높음
        cmd: "INSERT",
        idx: 1,                 // 확인필요
        addr: $("#addr").val()  // 이런식으로 참조를 등록해 두면
    };                                
ㄴ
    // -------------------------------------
    // 구현부
    this.mode.edit = function() {                   // 화면과 의존성이 높음
        // ...
    };

    this.mode.create = function() {                 // 화면과 의존성이 높음
        // ...
    };

    this.cbValid = function(bindModel) {            // 화면의 검사이므로 화면의존성 높음
        // 재개, 준비완료 검사
    };

    /**
     * 설계팁!!
     *      - 일반적인(read, update,...)을 사용하는 Page에서는 구현해도 상관이 없음
     *      - 진열설정 같은 툭수한 페이지의 경우에는 bm 에서 오버라이딩하여 사용함
     * 
     * @param {*} bindModel 
     */
    this.cbRegister = function(bindModel) {
        // 요소 이벤트 등록 : jquery 을 이용하여 등록
        $("#btn_Insert").click(function () {
            binderModel.read.execute();             // read 를 알고 있음
        });
        
        bindModel.onFail = function(msg, code) {        // bindModel 에 의존성이 있음 => 외부로 빼야함
            // 오류 이벤드 등록
        };
    };
    //====================================
    // 의존성이 섞여 있는 부분
    this.cbReady = function(bindModel) {           // 의존성이 섞여 있음 !!! => 파라메터로 해결, 선택적으로 사용
        // 재개(대기) 
        // cmd 모드에 따라 즉시 호출도 포함함
        bindModel.read.execute();
    };
    

    this.pageView = function(p_entity) {};  // 화면과 의존성이 높음

}

var p = new Page();
function BindModelFormAjax() {}

//--------------------------------------
new bm = new BindModelFormAjax(p);
bm.read.cbView = this.pageView;             // 이부분은 자동화 보다는 사용자화 하는게 맞을듯함
bm.cbReady = function() {                  // 의존성이 섞여 있음 !!! => 파라메터로 해결
    // 시작시 처리할 부분이 있으면 추가함
};
bm.cbRegister = function() {                // read, 이런 부분을 모를 경우 오버라이딩함

}

Item("addr");
addr.refValue = bm.attr["addr"];           // 상단에 참조를 정의해두면 이런식으로 쉽게 사용함


console.log("-End");


