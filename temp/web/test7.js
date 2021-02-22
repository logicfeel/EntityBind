


function AAA() {
    this.A = "AA"
}
function BBB() {
    this.A = "AA"
    return "D"
}


var a = new AAA();
var b = new BBB();


console.log(a.A);