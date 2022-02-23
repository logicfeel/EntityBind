
// 1단계 정의 파싱
var Auto = {
    depend: ['../A/AA.asp', '../B/BB.asp'],
    source: ['aaa.asp', 'bbb.asp']
};
var Parser = {
    namespace: Namespace,
    Ext: /(.asp|.inc)/gi,
    create: function() {
        this.stmt.add('func', /(Function|Sub)/gi);

        this.namespace = '네임스페이스 설정';
    }
};
var Namespace = {
    MySystem: [
        {
            funcname: 'create'
        },
        {
            funcname: 'list'
        },
    ]
};
var DefRelation = [
    {
        filename: '../A/AA.asp',
        namespace: Namespace.MySystem[0], // 객체
        index: 10,
        lastIndex: 14,
        nextindex: 20
    },
    {
        filename: 'aaa.asp',
        namespace: Namespace.MySystem[1], // 객체
        index: 100,
        lastIndex: 140,
        nextindex: 200
    },
];

// 2단계 참조 파싱
var Parser = {
    namespace: Namespace,
    Ext: /(.asp|.inc)/gi,
    scope: {
      globalScope: 0,   // 전체를 가져오기 필수, 파일별로 로딩하는 부분
      localScope: 1  
    },
    create: function() {
        // scope 구성
        this.stmt.add('import', /(import)/gi);
        this.stmt['import'].callback = (list) => {

            var fullnames = this.namesapce.getNamespace();
            
            //  배열형 네임스페이스에서  import 이름과 비교
            if (fullnames.indexOf(list[i].group[1]) > 0 ) {
                //스코프 추가
                scope.add(namespace.getAlias("MySystem"));
            }

            // 참조 찾기
            for (var i = 0; i < this.scope.length; i++) {
                if (source[0].indexOf(this.scope[i]) > 0) {
                    // RefRelation 등록
                }
            }
            

        };
        
        // php, c++ 의 선택적으로 추가하는 경우
        this.stmt.add('inlcude', /(inlcude)/gi);    
        this.stmt['inlcude'].callback = (list) => {
            //...
        }
    }
};

var RefRelation = [
    {
        filename: 'bbb.asp',
        namespace: Namespace.MySystem[0],   // 'A/AA.asp' 객체 1번째 참조
        index: 1000,
        lastIndex: 1400,
    },
    {
        filename: 'bbb.asp',
        namespace: Namespace.MySystem[0],   // 'A/AA.asp' 객체 2번째 참조
        index: 2000,
        lastIndex: 2400,
    },
    {
        filename: 'bbb.asp',
        namespace: Namespace.MySystem[1],   // 'aaa.asp' 객체
        index: 3000,
        lastIndex: 3400,
    }
];