interface IMetaObject {
    getGUID(): string;
}
interface IMarshal extends IMetaObject {
    getObject(): Object;
}

declare class MetaElement implements IMarshal {
    getGUID(): string;
    getObject(): {};
}


declare function VElement(): void;

//declare var MetaElement: _MetaElement;




declare var abcd : {aa: string, aaa: number};

declare namespace myLib {
    class VElement {
        getGUID(): string;
        getObject(): {};
    }
}


