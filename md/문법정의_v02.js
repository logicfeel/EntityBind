

class Root extends Parser {
    
    constructor() {
        // 제외 블럭
        this.SKIP_BLOCK = [
            {
                syntax: {           // syntax 가 객체인 경우 (블럭주석)
                    reg: /\*/,
                    end: /\*\//,
                },
                callback: function(g) {
                    // g
                }
            },
            {
                syntax: /\/\/.+/,     // syntax 가 정규식인 경우   (한줄주석)
                /**
                 * 
                 * @param {*} group 정규식 group 캡처 번호
                 * @param {*} terminal 문자열 터미널 결과 배열
                 * @param {*} content 블럭정규식 블럭 내용
                 */
                callback: function(g, t, c) {
                    /**
                     * - 정규식 일때
                     *  + g[0...1] : group 번호화 같음
                     * - 문자열 일때
                     *  + 터미널 번호와 일치함, 0 부터
                     * - 객체 일때
                     *  + g
                     */

                    // 결과를 재해석 하고 싶을때
                }
            }
        ];
        // 터미널 정의
        this.terminal = {
            skip_block: {
                syntax: "/* <any> */"
            },
            any: {
                syntax: /\s\w/
            },
            compilation_unit: {
                syntax: "<func_unit> | <class_unut>",
                callback: function(groups) {
                    // 정의 및 생성
                }
            },
            func_unit: {
                syntax: "function <func_name> \( <params> \)",
                callback: function(g) {
                    var name = g[0];    // <func_name>을 가르킴
                    var o = new Operation(name);
                    o.params = g[1];    // 파라메터 설정
                    return o;
                }
            },
            func_name: {
                syntax: /[a-z]+/,
                callback: function(g) {
                    return g[0];    // 전체 리턴
                }
            },
            params: {
                /**
                 * 표현방식은 가장 자연스러움
                 * 공백처리는 안됨 (종료문자에 처리해야함) !!
                 */
                syntax: " '(' ( <func_name> [, <func_name>] )* ')' ",   // 예약어 : {수량}[생략]<표시자> |선택 에 대한 표기법 필요
                syntax: " ' ( <func_name> [, <func_name>] )* ' ",       // 예약어 ' 컴마 사용시
                syntax: " sub ( <func_name> [, <func_name>] )* end ",   // 일반문자
                /**
                 * 특수기호로 사용할 경우
                 * 유력 !!
                 */
                syntax: " (<func_name> [, <func_name>] )*  ",     // 예약어 ( ) 사용시
                syntax: " \( ( <func_name> [, <func_name>] )* \) ",     // 예약어 ( ) 사용시
                syntax: " \[ ( <func_name> [, <func_name>] )* \] ",     // 예약어 [ ] 사용시
                syntax: " ' ( <func_name> [, <func_name>] )* ' ",       // 컴마 사용시
                syntax: " sub ( <func_name> [, <func_name>] )* end ",   // 일반문자

                syntax: "  ( <func_name> [, <func_name>] )* ' ", // 예약어 : 컴마를 표현할려면
                // ' " 기호에 대한 표현법 필요
                callback: function(g) {
                    var p = new Params();
                    for(var i=0; i < g.length; i++)
                        p.add(new Parameter(g[0]));
                    return p;
                }
            }
        }

    }
    
}
