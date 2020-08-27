
// 타입스크립트로 구조 만드는데 사용

abstract class BaseCollection<T> {

    private _items: Array<T>;
    private _count: number;
    private _onAdd: Function;
    private _onRemove: Function;
    private _onClear: Function;

    get count() {
        return this._items.length;
    }

    set onAdd(func: Function) {
        this._onAdd = func;
    }
    set onRemove(func: Function) {
        this._onRemove = func;
    }
    set onClear(func: Function) {
        this._onClear = func;
    }
    // 이벤트 경우에 따라 추가함
    // onAdd, onRemove, onClear

    add(obj: string | T) {}
    remove(obj: string | T) {}
    removeAt(index: number) {}
    clear() {}
    indexOf(obj: number | T) : any {}       // TODO:: 확인필요
    contains(name: string) {}
}

/***
 * @alias : 아이템
 */
class Item {
    
    private _name: string;
    private _defaultValue: any;
    private _caption: string;
    private _codeType: any;    // 추후 확장

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }

    set defaultValue(value: any) {
        this._defaultValue = value;
    }
    get defaultValue(): any {
        return this._defaultValue;
    }

    set caption(name: string) {
        this._caption = name;
    }
    get caption(): string {
        return this._caption;
    }

    set codeType(codeType: any) {
        this._codeType = codeType;
    }
    get codeType(): any {
        return this._codeType;
    }


}

class ItemCollection extends  BaseCollection<Item> {

}