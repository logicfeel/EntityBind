
function IBindModel() {
    this.prop;
    this.mode;
    this.preRegister;
    this.cbValid;
    this.preReady;
}

// IBindModel 상속
function IBindModelForm() {
    this.prop = {};
    this.mode = {};
    this.preRegister = function() {};
    this.cbValid = function() {};
    this.preReady = function() {};

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
    bm.prop = {abc: "aaa"};
    bm.mode.modify = function() {
        console.log("modify...");
    }
    
    // 내부함수는 이렇게 사용함
    getBBB = function() {
        console.log("getBBB...");    
    }

    bm.cbValid = function() {
        console.log("cbValid...");

        console.log("prop = " + bm.prop.abc);
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
    
    this.prop = bindmodel.prop;
    this.cbValid = bindmodel.cbValid;
    this.mode = bindmodel.mode;
    this.getAAA = bindmodel.getAAA;
}


//----------------------------------

var d = new PageDI();

// var a = new Ajax(PageDI());
var a = new Ajax(new PageDI());
a.prop.abc = "bbb";
a.mode.modify();

a.cbValid();
a.getAAA();

console.log("-End");