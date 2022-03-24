// 클로저 함수로 구현
// const Singleton = (function () {
//     let instance;
  
//     function setInstance() {
//       instance = {
//         id: 1,
//         text: "hello"
//       };
//     }
  
//     return {
//       getInstance() {
//         if (!instance) {
//           setInstance();
//         }
//         return instance;
//       }
//     };
//   })();
  

// class Singleton {
//     constructor() {
//         this.id = 1;
//         this.text = "hello";
//     }
// }


// class Singleton {
//     instance = null
//     constructor() {
//     if (this.instance) return this.instance;
//     this.id = 1;
//     this.text = "hello";
//     this.instance = this;
//   }
// }


// class Singleton {
// 	static instance
//   constructor() {
//     if (Singleton.instance) return Singleton.instance;
//     this.id = 1;
//     this.text = "hello";
//     Singleton.instance = this;
//   }
// }

// class Sub1 extends Singleton {
//     constructor() {
//         super();
//         this.abc = "!"
//     }
// }
// class Sub2 extends Singleton {
//     constructor() {
//         super();
//         this.ab2 = "!!"
//     }
// }
let instance1
class Singleton {
    constructor() {
        if (instance1 && this.__proto__.constructor.name === 'Singleton') return instance1;
        this.id = 1;
        this.text = "hello";
        
        instance1 = this;
    }
}
let instance2
class Sub1 extends Singleton {
    constructor() {
        super();
        if (instance2 && this.__proto__.constructor.name === 'Sub1') return instance2;

        this.abc = "!"
       
        instance2 = this;
    }
}
// let instance3
// class Sub2 extends Singleton {
//     constructor() {
//         super();
//         if (instance3 && this.__proto__.constructor.name === 'Sub2') return instance3;

//         this.ab2 = "!!"
        
//         instance3 = this;
//     }
// }

class Sub2 extends Singleton {
    static instance3
    constructor() {
        super();
        if (Sub2.instance3 && this.__proto__.constructor.name === 'Sub2') return Sub2.instance3;

        this.ab2 = "!!"
        
        Sub2.instance3 = this;
    }
}


const singleton1 = new Singleton();
const singleton2 = new Singleton();
const singleton3 = new Sub1();
const singleton4 = new Sub2();
const singleton5 = new Sub2();
singleton2.id++;

console.log("Singleton 1,2 class true = ", singleton1 === singleton2);
console.log("Singleton 1,3 class false = ", singleton1 === singleton3);
console.log("Singleton 3,4 class false = ", singleton3 === singleton4);
console.log("Singleton 4,5 class true = ", singleton4 === singleton5);

console.log("Singleton instanceof class true = ", singleton3 instanceof Singleton);
console.log("Sub2 instanceof class false = ", singleton3 instanceof Sub2);
console.log("Sub2 instanceof class true = ", singleton4 instanceof Sub2);

console.log(1)