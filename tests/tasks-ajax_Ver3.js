
function IBindModel() {
    this.attrs;
    this.mode;
    this.cbRegister;
    this.cbValid;
    this.cbResume;
}

// IBindModel 상속
function IBindModelForm() {
    this.attrs = {};
    this.mode = {};
    this.cbRegister = function() {};
    this.cbValid = function() {};
    this.cbResume = function() {};

    this.create;
    this.read;
    this.update;
    this.delete;
}
IBindModelForm.prototype.mode = function() {
    // 구현해야함
}

// IBindModelForm 구현한다고 가정함
function ViewDI() {
    // var bm = new IBindModelForm();
    this.attrs = {abc: "aaa"};
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

        console.log("attrs = " + this.attrs.abc);
        getBBB();        
    };
    // this.getAAA();
}
ViewDI.prototype.getAAA = function() {
    console.log("getAAA...");
};

// ===============================
function Ajax( bindmodel ) {
    
    this.attrs = bindmodel.attrs;
    this.cbValid = bindmodel.cbValid;
    this.mode = bindmodel.mode;
    this.getAAA = bindmodel.getAAA;
}


//----------------------------------

var d = new ViewDI();

// var a = new Ajax(PageDI());
var a = new Ajax(new ViewDI());

a.mode.modify();
a.cbValid();
a.attrs.abc = "bbb";
a.cbValid();
a.getAAA();

console.log("-End");