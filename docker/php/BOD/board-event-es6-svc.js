
import BaseService from './base-svc.js';
    
class BoardEventService extends BaseService {
    
    constructor(p_suffix = '') {
        super(p_suffix);

        var _SUFF       = p_suffix;  // 접미사
        var _this       = this;
        var _template   = null;

        /**
         * 기본 콜백 경로
         * @type {String}
         */
        // this.baseUrl = '/BOD/board_event.callback.php';
        this.url = '/BOD/board_event.callback.php?cmd=LIST';

        /**
         * prop 속성
         * @type {Object.<String, Item | String | Boolean | Number>}
         */            
        this.items = {
            // inner
            __isGetLoad:    true,
            __listUrl:      '',
            __formUrl:      '',
            __mode:         '',
            // view
            _temp_list:     { selector: { key: '#s-temp-list'+ _SUFF,       type: 'html' } },
            _area_list:     { selector: { key: '#s-area-list'+ _SUFF,       type: 'html' } },
            _area_page:     { selector: { key: '#s-area-page'+ _SUFF,       type: 'html' } },
            _txt_sumCnt:    { selector: { key: '#s-txt-sumCnt'+ _SUFF,      type: 'text' } },
            // bind
            cmd:            '',
            keyword:        { selector: { key: '#m-keyword'+ _SUFF,         type: 'value' } },
            page_size:      {
                selector: { key: 'select[name=m-page_size]'+ _SUFF,         type: 'value' },
                // getter: () => { return page.page_size; },
                // setter: (val) => { page.page_size = val; },
            },
            page_count:     {   /** 값을 외부에서 관리함! */
                // getter: () => { return page.page_count; },
                // setter: (val) => { return page.page_count = val; }
            },              
            sort_cd:        '',
            evt_idx:        '',
            title:          { 
                selector: { key: '#m-title'+ _SUFF,        type: 'value' },
                isNotNull: true,
            },
            writer:         { selector: { key: '#m-writer'+ _SUFF,       type: 'value' } },
            begin_dt:       { selector: { key: '#m-begin_dt'+ _SUFF,     type: 'value' } },
            close_dt:       { selector: { key: '#m-close_dt'+ _SUFF,     type: 'value' } },
            contents:       { selector: { key: '#m-contents'+ _SUFF,     type: 'value' } },
            active_yn:      { 
                selector: { key: 'input[name=m-active_yn'+_SUFF+'][type=radio]',  type: 'none' },
                setFilter(val) { 
                    $('input[name=m-active_yn'+_SUFF+'][value='+ val + ']').prop('checked', true);
                },
                getFilter(val) {
                    return $('input[name=m-active_yn'+_SUFF+']:checked').val();
                },
                isNotNull: true,
            },
        };

        /**
         * 명령들
         * @type {Object.<String, BindCommandAjax>}
         */
        this.command = {
            create:     {
                onExecute(p_bindCommand) { _this.bindModel.cols['cmd'].value = 'CREATE'; },
                cbEnd(p_entity) {
                    if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    _this.bindModel.fn.moveList();  // 개선함
                },
            },
            read:       {
                outputOption: 'VIEW',
                onExecute(p_bindCommand) { _this.bindModel.cols['cmd'].value = 'READ'; },
                cbEnd(p_entity) {
                    if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                }
            },
            update:     {
                onExecute(p_bindCommand) { _this.bindModel.cols['cmd'].value = 'UPDATE'; },
                cbEnd(p_entity) {
                    if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    alert('수정 처리가 되었습니다.');
                    _this.bindModel.read.execute();
                }
            },
            delete:     {
                onExecute(p_bindCommand) { _this.bindModel.cols['cmd'].value = 'DELETE'; },
                cbValid(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                cbEnd(p_entity) {
                    if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                    _this.bindModel.fn.moveList();  // 개선함
                }
            },
            list:       {
                outputOption: 'ALL',
                onExecute(p_bindCommand) { 
                    _this.bindModel.cols['cmd'].value = 'LIST'; 
                },
                cbResult(aa, bb, cc) {
                    console.log("cbResult", aa, bb, cc);
                },
                cbOutput(outs, cmd, res) {
                    var row_total   = outs[0].rows.count;

                    if (_template === null) {
                        _template = Handlebars.compile( _this.bindModel.cols['_temp_list'].value ); 
                    }
                    _this.bindModel.cols['_txt_sumCnt'].value  = row_total;
                    _this.bindModel.cols['_area_list'].value   = _template(outs[0].rows);
                    // _this.bindModel.cols['_area_page'].value   = page.parser(row_total);
                }
                // cbOutput(p_result) {
                //     // if (global.isLog) console.log("[Service] list.cbOutput() : 목록출력");

                //     var entity = p_result['table'];
                //     var row_total   = entity['row_total'];

                //     if (_template === null) {
                //         _template = Handlebars.compile( _this.bindModel.cols['_temp_list'].value ); 
                //     }
                //     _this.bindModel.cols['_txt_sumCnt'].value  = row_total;
                //     _this.bindModel.cols['_area_list'].value   = _template(entity);
                //     _this.bindModel.cols['_area_page'].value   = page.parser(row_total);
                // },
                // cbEnd(status, cmd, res) {
                //     if (!res) {
                //         alert('목록조회 처리가 실패 하였습니다.');
                //     }
                // }
                // cbEnd(p_result) {
                //     if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                // }
            },
        }

        /**
         * 속성의 매핑
         * @type {Object}
         */
        this.mapping = {
            _temp_list:     { list:     'misc' },    // 묶음의 용도
            _area_list:     { list:     'misc' },    // 묶음의 용도
            _area_page:     { list:     'misc' },    // 묶음의 용도
            _txt_sumCnt:    { list:     'misc' },    // 묶음의 용도
            cmd:            { $all:     'bind' },
            keyword:        { list:     'bind' },
            page_size:      { list:     'bind' },
            page_count:     { list:     'bind' },
            sort_cd:        { list:     'bind' },
            evt_idx:        { read:     'bind',     delete:     'bind',            update:  'bind' },
            title:          { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], },
            writer:         { read:     'output',   create:     'bind',            update:  'bind' },
            begin_dt:       { read:     'output',   create:     'bind',            update:  'bind' },
            close_dt:       { read:     'output',   create:     'bind',            update:  'bind' },
            contents:       { read:     'output',   create:     'bind',            update:  'bind' },
            active_yn:      { read:     'output',   create:     ['valid', 'bind'], update:  ['valid', 'bind'], },
        };

        /**
         * 공개 함수
         * @type {Object.<String, Function>}
         */
        this.fn = {
            searchList() {
                _this.bindModel.items['page_count'].value = 1;
                _this.bindModel.list.execute();
            },
            changePagesize(e) {
                _this.bindModel.items['page_size'].value = this.value;
                _this.bindModel.items['page_count'].value = 1;
                _this.bindModel.list.execute();
            },
            resetForm() { 
                $('form').each( () => {
                    this.reset();
                });
            },
            moveList() {
                var url = _this.bindModel.items['__listUrl'];
                location.href = url;
            },
            moveEdit(p_evt_idx) {
                var url = _this.bindModel.items['__formUrl'];
                location.href = url +'?mode=EDIT&evt_idx='+ p_evt_idx;
            },
            moveForm() {
                var url = _this.bindModel.items['__formUrl'];
                location.href = url;
            },
            procRead(p_evt_idx) { 
                _this.bindModel.items['evt_idx'].value = ParamGet2JSON(location.href).evt_idx;
                _this.bindModel.read.execute(); 
            },
            procCreate() { 
                _this.bindModel.cmd.create.execute(); 
            },
            procUpdate() { 
                _this.bindModel.cmd.update.execute(); 
            },
            procDelete() { 
                _this.bindModel.cmd.delete.execute(); 
            },
            procList() { 
                _this.bindModel.cmd.list.execute(); 
            },
        };
    }

    preRegister(p_bindModel) {
        super.preRegister(p_bindModel);

        // if (global.isLog) console.log("[Service] preRegister() : 사전등록 ");
        
        // 초기값 설정 : 서버측 > 파라메터 > 내부(기본값)
        // p_bindModel.items['keyword'].value = decodeURI(getArgs('', getParamsToJSON(location.href).keyword ));
        // p_bindModel.items['page_count'].value  = Number( getArgs('', getParamsToJSON(location.href).page_count, page.page_count) );
        
        // page 콜백 함수 설정 (방식)
        if (p_bindModel.items['__isGetLoad'] === true) {
            // page.callback = page.goPage.bind(p_bindModel.list.bind);            // 2-1) GET 방식
        } else {
            // page.callback = p_bindModel.list.execute.bind(p_bindModel.list);    // 1) 콜백 방식
        }
    }
}

export { BoardEventService as default, BoardEventService };