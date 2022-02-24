const { ConsoleLogger } = require("typedoc/dist/lib/utils");

var str1 =
`-------------------------------------
' 목록 : String 객체(XML)
Public Function ListXml(ByRef r_Return, ByRef r_RowTotal)
    Dim str
    Dim oRs
    
    str = ListJson(sss)

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

    str = ListJson(sss)

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
End Function`;
// +++++++++++++++++++++++++++++++++++
// 실행 과정
class Automation {
    constructor() {
        this.parser = [];
        this.src = [];
        //---------------

        this.parser.push(new AspParser());

        var f = new Source('aa.asp');
        f.content = str1;
        this.src.push(f);
    }
    parsing(strArr) {
        console.log('Automation.parsin()');
        // this.parser[0].view();
        // 대상 파일을 찾아내야함
        // this.parser[0].parsing(strArr);
        this.parser[0].parsing(this.src);
    }
}

class RegExpParser {
    constructor() {
        this.DEF = [];
        
    }
}
 class Statement {
     constructor() {
        this.reg = null;
     }
}

class MetaFunction {
    constructor(p_name) {
        this.name = p_name;
    }
}

class Namespace {
    constructor() {
        this._sub = [];
        this._meta = [];
    }
    add(nm) {
        this._sub.push(nm);
    }
    addDefine(meta) {
        this._meta.push(meta);
    }
}

class DefineInfo {
    constructor(source) {
        this.source = source;
    }
}

class Source {
    constructor(filepath) {
        this.filename = filepath;
        this.define = [];
        this.ref = [];
    }
}

class AspParser extends RegExpParser {
    constructor() {
        super();

        // --------------
        // 정의부 파서
        var s1 = new Statement();
        this.DEF.push(s1);
        this.DEF[0].reg = /(?:Sub|Function)\s+(\w+)/g;
        this.DEF[0].callback = (list, src) => {
            console.log('Sub.callback().. ');
            
            var ns = new Namespace();
            for(var i = 0; i < list.length; i++) {
                ns.addDefine(list[i].group[1]);
                // 정의 부분 추가
                src.define.push({ 
                    filename: src.filename,
                    index: list[i].group.index,
                    lastIndex: list[i].lastIndex,
                    namespace: list[i].group[1],
                    blockLastIndex: list[i].blockLastIndex
                });
            }
            this.namespace = ns;

        };

        // 네임스페이스 영역
        this.namespace = null;

        this.SCOPE = {};

        
        // ##################################################
        var s2 = new Statement();
        this.REF = [];
        this.REF.push(s2);        
        this.REF[0].reg = "Function(<NS>)";

        // 전역으로 검색하는 부분

        // 지역으로 검색하는 부분

        this.REF[0].callback = (list, src) => {
            console.log('Sub.callback().. ');
            
            // var ns = new Namespace();
            // for(var i = 0; i < list.length; i++) {
            //     ns.addDefine(list[i].group[2]);
            //     // 정의 부분 추가
            //     src.define.push({ 
            //         filename: src.filename,
            //         lastIndex: list[i].lastIndex,
            //         namespace: list[i].group[2]
            //     });
            // }
        }
        // ##################################################
    }
    view() {
        console.log('AspParser.view()');

    }
    // 상위에서 정의
    parsing(strArr) {
        // 정의부 파싱 - 내부
        this.parsingDefine(strArr);
        
        // 정의부 파싱 - 외부
        // TODO::

        // 참조부 파싱
        this.parsingReference(strArr);
    }
    // 상위에서 정의
    parsingDefine(strArr) {
        // TODO:: 파일별롤 실행햐야함
        var group;
        var reg = this.DEF[0].reg;
        var list = [];

        while(group = reg.exec(strArr[0].content)) {
            list.push({
                group: group,
                index: group.index,
                lastIndex: reg.lastIndex,
                blockLastIndex: reg.lastIndex
            });
            // 블럭의 마지막 인덱스 삽입
            if (list.length > 1) {
                list[list.length - 2].blockLastIndex = group.index - 1
            }
            // strArr[0].define.push({ lastIndex: reg.lastIndex })
            console.log(`내용 "${group[1]}". lastIndex: ${reg.lastIndex}.`);
        }
        // 마지막 처리
        if (list.length > 1) {
            list[list.length - 1].blockLastIndex = strArr[0].content.length
        }

        // 콜백 호출
        this.DEF[0].callback.call(this, list, strArr[0]);

    }
    // parsingReference(strArr) {
    //     var idx = 0;

    //     for (var i = 0; i < this.namespace._meta.length; i++) {
            
            
    //         idx = strArr[0].content.indexOf(this.namespace._meta[i], idx);
    //         while(idx > 0) {
    //             idx = strArr[0].content.indexOf(this.namespace._meta[i], idx + 1);
    //             if (idx > 0) {
    //                 console.log(`idx : ${idx}, name : ${this.namespace._meta[i]} `);

    //                 strArr[0].ref.push({
    //                     index: idx,
    //                     namespace: this.namespace._meta[i]
    //                 });
    //             }
    //         }
    //         console.log('parss..'); 
    //     }

    // }
    parsingReference(strArr) {
        
        var lastIdx = 0;
        var reg;
        var group;

        for (var i = 0; i < this.namespace._meta.length; i++) {
            
            reg = RegExp(this.namespace._meta[i], 'gi');
            
            while(group = reg.exec(strArr[0].content)) {
                lastIdx = reg.lastIndex;
                if (reg.lastIndex > 0) {
                    console.log(`lastIdx : ${lastIdx}, name : ${this.namespace._meta[i]} `);

                    strArr[0].ref.push({
                        lastIdx: reg.lastIndex,
                        namespace: this.namespace._meta[i]
                    });
                }
            }

        }

    }
    
}

// ##################################

var files =[];
files.push(str1);

var a = new Automation();
a.parsing();
// a.parsing(files);

// a = "ABC"
// var r = RegExp(a+ "b");

console.log('-End-')