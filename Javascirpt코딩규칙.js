// 최상위 : 엄격모드
'use strict';

/**
 * JS 용도 
 *  - WEB 전용
 *  - NodeJS 전용
 *  - WEB + NodeJS 혼합
 * 
 */

//==============================================
// WEB JS 기준

// 상속

// 함수 사용
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// 전역선언에 대한 네임스페이스 선언



// 네임스페이스는 직접 접근하지 않고 상위에 선언후 사용
var W  = W || {};
var BaseCollectoin = W.BaseCollectoin;