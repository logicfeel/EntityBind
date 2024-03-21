
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
