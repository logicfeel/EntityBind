
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


function PageDI() {
    var bm = new IBindModelForm();
    bm.attr = {abc: "aaa"};
    bm.mode.modify = function() {
        console.log("modify...");
    }
    
    // 내부함수는 이렇게 사용함
    getBBB = function() {
        console.log("getBBB...");    
    }

    bm.cbValid = function() {
        console.log("cbValid...");

        console.log("attr = " + bm.attr.abc);
        getBBB();        
    };
    // this.getAAA();

    return bm;
}
PageDI.prototype.getAAA = function() {
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

var d = new PageDI();

// var a = new Ajax(PageDI());
var a = new Ajax(new PageDI());
a.attr.abc = "bbb";
a.mode.modify();

a.cbValid();
a.getAAA();

console.log("-End");