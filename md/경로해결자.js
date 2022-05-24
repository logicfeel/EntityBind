const path = require('path');


class ReferResolver {
    constructor() {
        this.paths = [];
    }

    getRelative(ff) {
        console.log('대상파일:' + ff)
        for(let i = 0; i < this.paths.length; i++) {
            console.log(this.paths[i])
            console.log(path.relative(path.dirname(ff), this.paths[i]))
        }
    }

}
path.relative("/Users", "/Users/daleseo/test.txt")

let r = new ReferResolver();
r.paths.push('/aaa/bbb/ccc/ccc.asp');
r.paths.push('/aaa/bbb/bbb.asp');
r.paths.push('/aaa/aaa.asp');
r.paths.push('/src/src.asp');

r.getRelative('/src/bbb.asp');
console.log('-------')
r.getRelative('/src/ccc/ccc.asp');

console.log(1)

