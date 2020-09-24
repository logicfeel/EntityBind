
/**
 * asfdas
 * @interface
 */
interface _AAA {
    /**
     * 무슨맴버입니다.1
     * @member
     * @param name dd
     */
    _a1(name: string): void;
}

/**
 * asfdas
 * @interface
 */
interface _AAA2 {
    /**
     * 무슨맴버입니다.2
     * @member
     * @param name dd
     */
    _a2(name: string): void;
}

declare namespace gobal {


/**
 * 클래스 AAA
 * @class
 */
export interface AAA extends _AAA, _AAA2{
    
    /**
     * d.ts
     * @method a1 멤버벰버
     * @param name 이름이요
     */
    a1(name: string): void;
}

/**
 * 클래스 BBB
 * @class
 */
export interface BBB {
    
    /**
     * d.ts
     * @method 멤버벰버
     * @param name 이름이요
     */
    b1(name: string): void;
}


/**
 * asfdasdfasf
 * @class 
 */
export interface CCC extends AAA {

    /**
     * d.ts
     * @method c1 파라메터임
     * @param name 이름이요
     */
    c1(name: string): void;
}


}