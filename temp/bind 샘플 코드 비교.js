
/**
 * 서비스 객체를 사용한 경우
 */
class NewSevice{
    command = {
        create: {
            onExecute(p_bindModel, p_bindCommand) { 
                p_bindModel.columns['cmd'].value = 'LISt';
                p_bindModel.fn.moveList();  // 개선함
            }
        }
    }
    fn = {
        procDisplayList: function () { 
            _this.bindModel.command.list_display.execute(); 
            _this.bm.command.list_display.execute(); 
        }
    }
}

// 기본 설정
var board = new BindModelAjax();
board.baseUrl = '../Boad.C.asp';

// ###############################
// 1. 아이템 추가 후 커맨드에 매핑 설정
board.items.add('phone' , '');
board.items.add('tel' , '010');
board.setMapping({  // 매핑 설정
    phone: {'read': ['bind']},
    tel: {'read': ['valid', 'bind']}
});
// 2. 컬럼 추가 및 커맨드에 동시 등록 (아이템 생략)
board.addColumn(new HTMLColumn('phone'), 'read', ['bind']); // POINT: read 자동 등록됨
board.addColumnValue('tel', '010', 'read', ['valid', 'bind']);
// 3. 컬렉션에 컬럼 추가 >> 커맨드 추가 >> 컬럼 설정
board.colums.add('phone');
board.columns.addValue('tel', '');
board.addCommand('read');
board.command['read'].setColumn('phone', 'bind')
board.command['read'].setColumn('tel', ['valid', 'bind'])

// ###############################
// 커맨드별 콜백 설정
board.command['read'].onExecute = ()=>{};
board.cmd['read'].onExecuted = ()=>{}; // alias 을 통한 접

// 서비스 객체를 통한 설정
var board = new BindModelAjax({
    baseUrl: '../Boad.C.asp',       // 객체 속성 설정
    items: {
        keyword: ''
    },

    command: {
        read: {
           outputOption: 3,
           columns: {
                name: 'tel', 
                value: '010..',
                entity: ['vaild', 'bind']
           },
           onExecute: function(p_bindCommand) { bm.items['cmd'].value = 'READ'; };
        }
    },
    prop: { 
        __pageSize: 10, // 내부용
        keyword: '',
        sort_cd: '',
    },
    mapping: {
        keyword: { Array: 'bind' }
        sord_cd: { list: ['valid', 'bind'] }
    },    
    preRegister: function(p_this) { // 전처리
        /* 내용 */
    },
});

// 준비 및 실행
$(function () {
    board.init();           // 초기화
    board.read.execute();   // 읽기
});