
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

        this.EXT = /asp|inc/i;
        this.META = func;   // 마타로 해석되는 부분
        this.DEPEND = '';   // 의존성 을 해석하는 부분
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