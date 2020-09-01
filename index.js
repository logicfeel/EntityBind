
/**
 * 
 * [ ] BaseCollection.js : BaseCollection
 * 
 * CodeType.js : CodeType, CodeValue, CodeTable, CodeTableCollection
 * 
 * [ ] Items.js : Item, ItemCollection
 * 
 * [ ] BindCommands.js : BindCommand, InternalCommand, ViewCommand
 *
 * [ ] UpdateCmd.js : UpdateCmd
 * [ ] CreateCmd.js : CreateCmd
 * [ ] DeleteCmd.js : DeleteCmd
 * [ ] ListCmd.js : ListCmd
 * [ ] ReadCmd.js : ReadCmd
 * 
 * [ ] BindModel.js : BindModel
 * 
 * [ ] ListModel.js : ListModel
 * [ ] FormModel.js : FormModel
 * [ ] ReadDelModel.js : ReadDeleteModel
 * 
 * 나중에 하나로 묶어서 사용
 * BindModule.1.0.js
 *  
 */


(function(G) {

    function aaa() {
        console.log('aaa');    
    }
    console.log('inner');

    bbb();

}(this));


//(function(G) {

    function bbb() {
        console.log('bbb');    
    }
    console.log('inner2');

//}(this));

//*********************************/
// IIFE 사용시 순서가 중요함 로딩과 관련있음
console.log('test');


