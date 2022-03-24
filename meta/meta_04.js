// 메타 - 템플릿

class Automation {
    constructor(){

    }
}

class MetaModel {
    _instance = null;
    constructor() {
        this.abc = "A";
        this.aaa = "B"
    }
    static getInstance() {
        if (typeof this._instance === 'undefined') {
            this._instance = new MetaModel();
        }
        return this._instance;
    }
}

class AutoTemplate {
    onwer = null;

    constructor(onwer) {
        // 타입 검사후
        this.onwer = onwer;
    }
}


var a = new AutoTemplate();
a.model = MetaModel.getInstance();
a.compile(); // 템플릿 생성


console.log(1);