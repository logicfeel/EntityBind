
class Statement {
    constructor(reg) {
        this.reg = reg;
        this._arr = [];

        this.stmt = {
            add: (name, obj) => {
                this.stmt[name] = obj; 
                // this._arr.push(obj);
            },
            callback: null
        },
        this.callback = null;
    }
}

class RegExpParser {
    constructor(){}
}

class AspParser extends RegExpParser {
    
    constructor() {
        super();

        var func = new Statement(/(Sub|Function)\s+(\w+)/ig);

        // operation
        func.callback = (list) => {

            var funcs = [];
            var funcName = '';
            var func;

            for (var i = 0; i.list.length; i++) {
                funcName = list[i].group[2];    // 2번째 그룹
                func = new Operation(funcName);
                // params
                for (var ii = 0; ii < list[i].stmt['param'].length; ii++ ) {
                    // 타입 검사 필요
                    func.attr.add(list[i].stmt['param'][ii]);
                }
            }
        }

        // param
        func.stmt.add('param', /(\w+)/);

        func.stmt['param'].callback = (list) => {
            
            var params = [];
            var paramName = '';

            for (var i = 0; i.list.length; i++) {
                paramName = list[i].group[1];
                params.push(new Parameter(paramName));
            }
            return params;
        };

        // 조건문 블럭
        // 구문구조를 파악후 이름을 비교할지
        // 전체 이름에서 파일에서 찾을지
        
        // 네임스페이스 조회
        var scope = this.namespace.getFullDefine(".");  // 전체 정의 명칭 가져오기
        var namespace = this.namespace.getNamespace(".");   // 전체 네임스페이스 목록 가져옴, "." 접두사

        var ref = [];
        
        for (var i = 0; fullnames.length > 0; i++) {
            var func_ref = new Statement(/fullnames)/ig);

        }
        
        // alias 처리 : namespace 추가 확장
        this.REF.stmt['import'].callback = (list) => {
            
            names = list[i].group[1];    // 1번째 그룹, 네임스페이스명

            for (var i = 0; i.list.length; i++) {
                
                //  배열형 네임스페이스에서  import 이름과 비교
                if (fullnames.indexOf(list[i].group[1]) > 0 ) {
                    //스코프 추가
                    scope.add(namespace.getAlias("MySystem"));
                }
            }
        };

        // 정의 참조 부분을 추가한다.
        for (var i = 0; i < scope.length; i++) {
            this.REF.stmt.add('alias', scope);
        }
       
        // import
        func.stmt.add('import', /(imporg)/ig);


        this.EXT = /asp|inc/i;
        this.META = func;   // 마타로 해석되는 부분
        this.DEPEND = '';   // 의존성 을 해석하는 부분
    }
    
}

/**
 * 전체 이름을 가져온 후 파악하는 방법
 *  - 파싱된 메타는 구조를 추출함
 *  - 참조로 사용하는 것은 : 클래스 + 함수 + (구조체 등)
 *  - using 사용안한 경우
 *      + 전체 이름을 기준으로 가져온다.
 *      + 가져온 이름은 독립사용의 주체만 : 클래스 + 함수
 *      + [확장] 하위로도 사용할 수 있도록 구성함
 *      + 참조는 파싱의 방식은 블럭방식이 아니도 단독 방식이다.
 *  - 참조 검색 방식
 *      + /depend + /src 의 메타정의를 가져온다.
 *      + 언어별 네임스페이스에 등록한다.
 *      + /src 폴더의 파일별(파서별)로 참조파서를 진행한다.
 *          * java, c++ 의 경우는 ..
 *      + 네임스페이스는 소스의 전역 | 구역별 해석 방식이 달라야 한다.
 * 
 *  - 완성되면 구조를 어디에서 참조하는지 구조가 완성된다.
 *      + 함수 | 클래스의 사용 위치를 찾을 수 있다.
 *  - task 'relation' 태스크를 분리할 필요성이 생긴다. 작업비용이 증가하므로,
 * 
 *  - 다양한 방식을 수용할 수 있어야 한다.
 */
var parser = {
    namespace: {
        class: "Class1"
    }
}

/**
 *  - use | using | import 를 사용 한다는 것은 이름 공간이 확장을 의미한다.
 *      + 기존에 4개의 이름 공간이 있다면
 *      + use 를 사용하면 하위 이름이 재등록된다.
 *  - 
 */
var scope = {
    global: {
        MySystem: ''
    }
}



var str =`
-------------------------------------
' 목록 : String 객체(XML)
Public Function ListXml(ByRef r_Return, ByRef r_RowTotal)
    Dim str
    Dim oRs
    
    Xml_yn = "Y"
    Set oRs = List(r_Return, r_RowTotal)
    str = ""
    str = str & "<table return='" & r_Return & "' row_total='" & iRowTotal & "'>"
    If oRs.State = adStateOpen Then str = str & oRs(0)
    str = str & "</table>"

    ListXml = str
End Function

'-------------------------------------
' 목록 : String 객체(JSON)
Public Function ListJson(ByRef r_Return, ByRef r_RowTotal)
    Dim str, oJson
    Dim oRs, strJson : strJson = ""

    Set oRs = List(r_Return, r_RowTotal)

    If oRs.State = adStateOpen Then 
        Set oJson = m_cDBMgr.CRsToJson(oRs)
        strJson = toJSON(oJson)
    End If
    
    str = ""
    str = str & "{"
    str = str & "  ""table"": {"
    str = str & "    ""return"": """ & r_Return & """ "
    str = str & "    , ""row_total"": " & r_RowTotal & " "
    If Len(strJson) > 0 Then str = str & "    , ""rows"": " & strJson
    str = str & "  }"
    str = str & "}"
    
    ListJson = str
End Function
`;
var a = new AspParser();

var regex1 = a.META.reg;
var array1;

while ((array1 = regex1.exec(str)) !== null) {
    console.log(`내용 "${array1[2]}". Next starts at lastIndex: ${regex1.lastIndex}.`);
    // expected output: "Found foo. Next starts at 9."
    // expected output: "Found foo. Next starts at 19."
  }

console.log(1);