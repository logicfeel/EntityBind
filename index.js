//----------
var BaseCollection = require("./src/collection-base");
var ArrayCollection = require("./src/collection-array");
var PropertyCollection = require("./src/collection-property");
var MetaObject = require("./src/meta-object");
var MetaElement = require("./src/meta-element");
var Observer = require("./src/observer");

module.exports = {
    BaseCollection: BaseCollection,
    ArrayCollection: ArrayCollection,
    PropertyCollection: PropertyCollection,
    MetaObject: MetaObject,
    MetaElement: MetaElement,
    Observer: Observer,
    Common: {
        Interface: null,
        Collection: null,
        Meta: {
            Entity: null,
            Bind: null,
            Data: null,
        }
    }
}
