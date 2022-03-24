
class Singleton {
    static instance
    constructor() {
        this.id = 1;
        this.text = "hello";
    }
    static getInstance(){
        const coClass = this;
        if (!coClass.instance) coClass.instance = new coClass();
        return coClass.instance;        
    }
}
class Sub1 extends Singleton {
    static instance
    constructor() {
        super();

        this.abc = "!"
    }
    // static getInstance(){
    //     const coClass = this;
    //     if (!coClass.instance) coClass.instance = new this();
    //     return coClass.instance;        
    // }

}


class Sub2 extends Singleton {
    static instance
    constructor() {
        super();
        this.ab2 = "!!"
        this.count = 1
    }
    // static getInstance(){
    //     const coClass = this;
    //     if (!coClass.instance) coClass.instance = new coClass();
    //     return coClass.instance;        
    // }
}


const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
const singleton3 = Sub1.getInstance();
const singleton4 = Sub2.getInstance();
const singleton5 = Sub2.getInstance();
// singleton2.id++;
singleton5.count++;
singleton5.id++;

console.log("Singleton 1,2 class true = ", singleton1 === singleton2);
console.log("Singleton 1,3 class false = ", singleton1 === singleton3);
console.log("Singleton 3,4 class false = ", singleton3 === singleton4);
console.log("Singleton 4,5 class true = ", singleton4 === singleton5);

console.log("Singleton instanceof class true = ", singleton3 instanceof Singleton);
console.log("Sub2 instanceof class false = ", singleton3 instanceof Sub2);
console.log("Sub2 instanceof class true = ", singleton4 instanceof Sub2);

console.log(1)