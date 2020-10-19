



















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
    
    bm.cbValid = function() {
        console.log("cbValid...");        
    };
    return bm;
}


function Ajax( bindmodel ) {

    
    this.attr = bindmodel.attr;
    this.cbValid = bindmodel.cbValid;
    this.mode = bindmodel.mode;
}


//----------------------------------


// var a = new Ajax(PageDI());
var a = new Ajax(new PageDI());

a.mode.modify();
a.cbValid();

console.log("-End");