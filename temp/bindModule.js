"use strict";
// 타입스크립트로 구조 만드는데 사용
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseCollection = /** @class */ (function () {
    function BaseCollection() {
    }
    Object.defineProperty(BaseCollection.prototype, "count", {
        get: function () {
            return this._items.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCollection.prototype, "onAdd", {
        set: function (func) {
            this._onAdd = func;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCollection.prototype, "onRemove", {
        set: function (func) {
            this._onRemove = func;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCollection.prototype, "onClear", {
        set: function (func) {
            this._onClear = func;
        },
        enumerable: false,
        configurable: true
    });
    // 이벤트 경우에 따라 추가함
    // onAdd, onRemove, onClear
    BaseCollection.prototype.add = function (obj) { };
    BaseCollection.prototype.remove = function (obj) { };
    BaseCollection.prototype.removeAt = function (index) { };
    BaseCollection.prototype.clear = function () { };
    BaseCollection.prototype.indexOf = function (obj) { }; // TODO:: 확인필요
    BaseCollection.prototype.contains = function (name) { };
    return BaseCollection;
}());
/***
 * @alias : 아이템
 */
var Item = /** @class */ (function () {
    function Item() {
    }
    Object.defineProperty(Item.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "defaultValue", {
        get: function () {
            return this._defaultValue;
        },
        set: function (value) {
            this._defaultValue = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "caption", {
        get: function () {
            return this._caption;
        },
        set: function (name) {
            this._caption = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "codeType", {
        get: function () {
            return this._codeType;
        },
        set: function (codeType) {
            this._codeType = codeType;
        },
        enumerable: false,
        configurable: true
    });
    return Item;
}());
var ItemCollection = /** @class */ (function (_super) {
    __extends(ItemCollection, _super);
    function ItemCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemCollection;
}(BaseCollection));
