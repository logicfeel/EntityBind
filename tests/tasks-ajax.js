



















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


function PageDI() {
    var bm = new IBindModelForm();
    bm.attrs = {abc: "aaa"};
    bm.mode.modify = function() {
        console.log("modify...");
    }
    
    bm.cbValid = function() {
        console.log("cbValid...");        
    };
    return bm;
}


function Ajax( bindmodel ) {

    
    this.attrs = bindmodel.attrs;
    this.cbValid = bindmodel.cbValid;
    this.mode = bindmodel.mode;
}


//----------------------------------


// var a = new Ajax(PageDI());
var a = new Ajax(new PageDI());

a.mode.modify();
a.cbValid();

console.log("-End");