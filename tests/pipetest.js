function createParson() {
    var firstName = "";
    var lastName = "";
    var age = 0;
    
    return {
        setFiltName: function(fn) {
            firstName = fn;
            return this;
        },
        setlastName: function(ln) {
            lastName = ln;
            return this;
        },
        setAge: function(a) {
            age = a;
            return this;
        },
        toString: function() {
            return [firstName, lastName, age].join(' ');
        }
    }
}

var a = createParson()
    .setFiltName("Kim")
    //.setlastName("Neo")
    .setAge(40)
    .toString();

console.log(a);

// ##########################################