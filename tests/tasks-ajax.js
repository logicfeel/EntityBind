



















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
    
    bm.cbValid = function() {
        console.log("cbValid...");        
    };
    return bm;
}


function Ajax( bindmodel ) {

    
    this.prop = bindmodel.prop;
    this.cbValid = bindmodel.cbValid;
    this.mode = bindmodel.mode;
}


//----------------------------------


// var a = new Ajax(PageDI());
var a = new Ajax(new PageDI());

a.mode.modify();
a.cbValid();

console.log("-End");