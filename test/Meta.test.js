/**
 * @namespace _W.Test.Meta 메인 테스크 
 * 
 * 서버 실행
 *  - npx http-server                 : 서버 실행  (npx http-server -p 원하는 포트번호)  
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Test           = global._W.Test || {};
    
    //==============================================================
    // 2. 변수 선언
    var errorCnt = 0;
    var tasks = [];  //{ns:..., file:.... }
    var result, task;
    var isCallback      = false;
    var CLEAR           = false;
    var totalTaskCnt = 0;
    var totalFileCnt = 0;
    
    /* 단순 로그 보기 */
    // CLEAR = true;
    // global.isCallback = isCallback;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        require('../src/object-implement'); // _implements() : 폴리필
    }
    
    //==============================================================
    // 3. 모듈 등록
    tasks.push({ns: '_W.Test.Object_implement'      , file: './Common.Object.implement.test.js'});
    tasks.push({ns: '_W.Test.Observer'              , file: './Common.Observer.test.js'});
    tasks.push({ns: '_W.Test.Util'                  , file: './Common.Util.test.js'});
    tasks.push({ns: '_W.Test.ArrayCollection'       , file: './Collection.ArrayCollection.test.js'});
    tasks.push({ns: '_W.Test.PropertyCollection'    , file: './Collection.PropertyCollection.test.js'});
    tasks.push({ns: '_W.Test.MetaObject_Sub'        , file: './Meta.MetaObject-Sub.test.js'});
    tasks.push({ns: '_W.Test.MetaElement_Sub'       , file: './Meta.MetaElement-Sub.test.js'});
    tasks.push({ns: '_W.Test.ComplexElement_Sub'    , file: './Meta.ComplexElement-Sub.test.js'});
    tasks.push({ns: '_W.Test.EntityTable'           , file: './Meta.Entity.EntityTable.test.js'});
    tasks.push({ns: '_W.Test.EntityView'            , file: './Meta.Entity.EntityView.test.js'});
    tasks.push({ns: '_W.Test.ItemCollection'        , file: './Meta.Entity.ItemCollection.test.js'});
    tasks.push({ns: '_W.Test.Item'                  , file: './Meta.Entity.Item.test.js'});
    tasks.push({ns: '_W.Test.ItemDOM'               , file: './Meta.Entity.ItemDOM.test.js'});
    tasks.push({ns: '_W.Test.Row'                   , file: './Meta.Entity.Row.test.js'});
    tasks.push({ns: '_W.Test.BindCommandAjax'       , file: './Meta.Bind.BindCommandAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindCommandEditAjax'   , file: './Meta.Bind.BindCommandEditAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindCommandLookupAjax' , file: './Meta.Bind.BindCommandLookupAjax.test.js'});
    tasks.push({ns: '_W.Test.BindModelAjax'         , file: './Meta.Bind.BindModelAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindModelReadAjax'     , file: './Meta.Bind.BindModelReadAjax.test.js'});
    // tasks.push({ns: '_W.Test.BindModelDI'           , file: './Meta.Bind.BindModelDI.test.js'});
    tasks.push({ns: '_W.Test.DOM_Node'              , file: './Etc.DOM-Node.test.js'});

    //==============================================================
    // 4. 테스트 본문 :: run()
    function run() {
        
        for (var i = 0; i < tasks.length; i++) {
            task = typeof module === 'object' ?  tasks[i].file : tasks[i].ns;
            console.log('===========================================================================');
            console.log('단위 테스트 %s : %s', i, task);
            
            if (typeof module === 'object' && typeof module.exports === 'object') {     
                task = tasks[i].file;
                tasks[i].result = require(tasks[i].file);
            } else {
                task = tasks[i].ns;
                tasks[i].result = eval(tasks[i].ns + '.run()');
            }
        }
        
        if (CLEAR) console.clear();

        console.log('***************************************************************************');
        console.log('통합 테스트 결과');
        console.log('***************************************************************************');
        for (var i = 0; i < tasks.length; i++) {            

            task = typeof module === 'object' ?  tasks[i].file : tasks[i].ns;
            
            totalTaskCnt += typeof tasks[i].result.taskCnt === 'number' ? tasks[i].result.taskCnt : 0; // 전체 태스크 갯수
            totalFileCnt++;

            if (tasks[i].result.errorCnt === 0) {
                console.log('No: %s, file: %s, task [ %s EA ] = Success', totalFileCnt, task, tasks[i].result.taskCnt);
            } else {
                console.warn('No: %s, file : %s, ERR_COUNT: [ %s EA ] = Warning', totalFileCnt, task, tasks[i].result.errorCnt);
                errorCnt++;
            }
            console.log('___________________________________________________________________________');
        }
        console.log('Total: file [ %s EA ], task [ %s EA ] = Success', totalFileCnt, totalTaskCnt);

        return errorCnt;
    }
    
    //==============================================================
    // 5. 결과 : 에러 카운터 ('0'이면 정상)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = run();
    } else {
        global._W.Test.Meta = {run: run};
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));