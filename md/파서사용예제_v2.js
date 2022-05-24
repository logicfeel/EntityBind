
var s1 = new Stmt()

s1.regex = 'a'
s1.callback = () => {}


class Grammar {}

class ConGrammar extends Grammar {
    constructor() {
        var e1;

        this.start = e1;
        
        e1 = new Expression();
        e1.regex = /<?php/;
        e1.action = (list) => {};
        e1.end = /?>/;

        e1.sub = [
            {
                regex: /function/,
                action: () => {},
                sub: [
                    {
                        regex: /sub2/,
                        action: () => {}
                    }
                ]
            },
            {
                regex: /include/,
                action: () => {}
            }
        ];
    }
}