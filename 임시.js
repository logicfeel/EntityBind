













function BindModelRead() {

}


/**
 * DOM 고통 영역
 */
function BindModelDOM() {
    this.first = {};
    this.read = {};
};
BindModelDOM.prototype.init = function() {};


//=======================================

function Loader() {
    this.property;
    this.event;    
    this.bindModel = new BindModelDOM();
}


/////////////

function Mode() {
    this.name;
    this.master = new Loader();
}
Mode.prototype.validMode = function() {
};

Mode.prototype.process = function() {
    this.master.bindModel.read.execute(this.callback);
};

// 처리 회신
Mode.prototype.callback = function(p_entityView) {

};











