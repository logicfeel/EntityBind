

//var _W;

var _global = {};

(function (_W) {
    var VElementd = /** @class */ (function () {
        function VElementd() {
        }
        VElementd.prototype.getGUID = function () { return ""; };
        ;
        VElementd.prototype.getObject = function () { return {}; };
        ;
        return VElementd;
    }());
    // //var a = new VElementd();

    // var Meta = /** @class */ (function () {
    //     function Meta() {
    //     }
    //     Meta.prototype.getGUID = function () {
    //         return "";
    //     };
    //     Meta.prototype.getObject = function () {
    //         return {};
    //     };
    //     return Meta;
    // }());


})(_W || (_W = {}));

/**
 * @interface
 */
function IAbc() {}
IAbc.prototype.getABC = function() {
    // 예외 처리
};

/**
 * 어떤 기능이 있을지는 알지요
 * @class
 * @implements {IAbc}
 * @extends {String}
 */
function Abc() {
}
// 상속 함수 등록

/**
 * 멤버 이빈다..
 * @method
 * @virtual
 */
Abc.prototype.getABC = function() {
    //
};

var a = new Abc();


a.getABC()

//_W.Meta