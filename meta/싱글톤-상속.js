

let instance
class Super {
    constructor(){
        this.n ='super'
    }
    static getInstance() {
        if (!instance) {
            instance = new this
        }
        return instance;
    }
}

class Sub extends Super {
    constructor() {
        this.n2 = 'Sub..'
    }
}


let i = Super.getInstance();
let i2 = Sub.getInstance();


console.log(1)

