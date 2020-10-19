
function IBindModel() {
    this.attr;
    this.mode;
    this.cbRegister;
    this.cbValid;
    this.cbReady;
}

// IBindModel 상속
function IBindModelForm() {
    this.attr = {};
    this.mode = {};
    this.cbRegister = function() {};
    this.cbValid = function() {};
    this.cbReady = function() {};

    this.create;
    this.read;
    this.update;
    this.delete;
}
IBindModelForm.prototype.mode = function() {
    // 구현해야함
}

// IBindModelForm 구현한다고 가정함
// 상속보다는 구현을 우선으로 함
// 이유는 ViewDI 간의 상속관계가 있을 수 있으므로..
function ViewDI() {
    // var bm = new IBindModelForm();
    this.attr = {abc: "aaa"};
    this.mode = {};
    this.mode.modify = function() {
        console.log("modify...");
    }
    
    // 내부함수는 이렇게 사용함
    getBBB = function() {
        console.log("getBBB...");    
    }

    this.cbValid = function() {
        console.log("cbValid...");

        console.log("attr = " + this.attr.abc);
        getBBB();        
    };
    // this.getAAA();
}
ViewDI.prototype.getAAA = function() {
    console.log("getAAA...");
};

// ===============================
function Ajax( bindmodel ) {
    
    this.attr = bindmodel.attr;
    this.cbValid = bindmodel.cbValid;
    this.mode = bindmodel.mode;
    this.getAAA = bindmodel.getAAA;
}


//----------------------------------

// var d = new ViewDI();

// var a = new Ajax(PageDI());
/**
 * 의존성 주입 방식으로..
 * 동일한 인터페이스를 상속한 자식끼라 가능한 방식임
 */
var a = new Ajax(new ViewDI());

a.mode.modify();
a.cbValid();
a.attr.abc = "bbb";
a.cbValid();
a.getAAA();

console.log("-End");