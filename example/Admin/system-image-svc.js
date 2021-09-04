(function(global) {

    'use strict';
   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var util;
    var BindCommandAjax;

    if (typeof module !== 'object') {                   // Web
        util                = global._W.Common.Util;
        BindCommandAjax     = global._W.Meta.Bind.BindCommandAjax;
    } else if (typeof module.exports === 'object'){     // node
        util                = require('util');
        BindCommandAjax     = require('./bind-command-ajax');
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof BaseService === 'undefined') throw new Error('[BaseService] module load fail...');
    if (typeof BindCommandAjax === 'undefined') throw new Error('[BindCommandAjax] module load fail...');
    if (typeof Handlebars === 'undefined') throw new Error('[Handlebars] module load fail...'); // 전역에 선언됨

    //==============================================================
    // 4. 모듈 구현    
    var SystemImageService  = (function (_super) {
        /**
         * IMarshal 인터페이스는 IObject를 상속함
         * @constructs _W.Service.Admin.SystemImageService
         * @extends _W.Service.Admin.BaseService
         * @param {String} p_suffix 셀렉터 접미사
         */
        function SystemImageService(p_suffix) {
            _super.call(this);

            var _SUFF       = p_suffix || '';  // 접미사
            var _this       = this;
            var _template   = null;

            /**
             * 기본 콜백 경로
             * @type {String}
             */
            this.baseUrl = '/Admin/adm_mod/SYS/System_Image.C.asp';

            /**
             * prop 속성 설정
             * @type {Object.<String, Item | String | Boolean | Number>}
             */
            this.prop = {
                // inner
                // view
                _temp_list:     { selector: { key: '#s-temp-img'+ _SUFF,        type: 'html' } },
                _area_list:     { selector: { key: '#s-area-img'+ _SUFF,        type: 'html' } },
                _form:          { selector: { key: '#fileUploadForm'+ _SUFF,    type: 'none' } },
                // bind
                cmd:            '',
                upfile:         {
                    selector: { key: '#m-upfile'+ _SUFF,                        type: 'value' },
                    isNotNull: true,
                },
                suffix:         '',
                prefix:         '',
                position_cd:    '',
                pos_idx:        '',
                sub_idx:        '',
                img_idx:        '',
                file_idx:       '',
                imgName:        '',
                orgName:        '',
                imgPath:        '',
                imgUrl:         '',
                width_it:       '',
                height_it:      '',
                size_it:        '',
                page_size:      0,      // 전체 보기
                page_count:     '',
                sort_cd:        '',
            };

            /**
             * cbBaseBind 기본 바인딩 명령
             * @param {*} p_ajaxSetup 
             * @param {*} p_command 
             */
            this.cbBaseBind  = function (p_ajaxSetup, p_command) {
                if (global.isLog) console.log("[Service] <%s> cbBaseBind()", this.name);
                // !! 중요 !!
                // multipart/form-data 방식으로 변환
                var form = $('#fileUploadForm'+ _SUFF)[0];
                var data = new FormData(form);
                var value;
        
                for (var i = 0; i < p_command.bind.items.count; i++) {
                    value = p_command.bind.items[i].value === null ? '' : p_command.bind.items[i].value;
                    data.append(p_command.bind.items[i].name, value);
                }
                p_ajaxSetup.data = data;
                p_ajaxSetup.enctype = 'multipart/form-data';
                p_ajaxSetup.processData = false;
                p_ajaxSetup.contentType = false;
                p_ajaxSetup.type = 'POST';
            };

            /**
             * 명령들
             * @type {Object.<String, BindCommandAjax>}
             */
            this.command = {
                create:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'CREATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('등록 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        
                        alert('이미지가 업로드되었습니다.');
                        _this.bindModel.items['upfile'].value = '';  // 초기화
                        _this.bindModel.list.execute();
                    },
                },
                read:       {
                    outputOption: 3,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'READ'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('조회 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                    }
                },
                update:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'UPDATE'; },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('수정 처리가 실패 하였습니다. Code : ' + p_entity['return']);
                        alert('수정 처리가 되었습니다.');
                        _this.bindModel.read.execute();
                    }
                },
                delete:     {
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'DELETE'; },
                    cbValid: function(p_valid) { return confirm('삭제 하시겠습니까.?'); },
                    cbEnd: function(p_entity) {
                        if (p_entity['return'] < 0) return alert('삭제 처리가 실패 하였습니다. Result Code : ' + p_entity['return']);
                        alert('삭제 되었습니다.');
                        _this.bindModel.list.execute();
                    }
                },
                list:       {
                    outputOption: 1,
                    onExecute: function(p_bindCommand) { _this.bindModel.items['cmd'].value = 'LIST'; },
                    cbOutput: function(p_result) {
                        if (global.isLog) console.log("[Service] list.cbOutput() : 목록출력");

                        var entity = p_result['table'];
                        var row_total = entity['row_total'];

                        if (_template === null) {
                            _template = Handlebars.compile( _this.bindModel.items['_temp_list'].value ); 
                        }
                        _this.bindModel.items['_area_list'].value        = _template(entity);
                    },
                    cbEnd: function(p_result) {
                        if (p_result['return'] < 0) return alert('목록조회 처리가 실패 하였습니다. Code : ' + p_result['return']);
                    }
                },
            };


            /**
             * 속성의 매핑
             * @type {Object}
             */
            this.mapping = {
                cmd:            { Array:    'bind' },
                upfile:         { create:   ['valid', 'bind'] },          
                suffix:         { create:   ['bind'] },          
                prefix:         { create:   ['bind'] },          
                position_cd:    { create:   'bind',     read:   'bind',     list:       'bind' },
                pos_idx:        { create:   'bind',     read:   'bind',     list:       'bind' },
                sub_idx:        { create:   'bind',     read:   'bind',     list:       'bind' },
                img_idx:        { read:     'bind',     update: 'bind',     list:       'bind',     delete:     'bind' },
                file_idx:       { read:     'bind',     update: 'bind',     delete:     'bind' },
                imgName:        { read:     'output',   update: 'bind' },
                orgName:        { read:     'output',   update: 'bind' },
                imgPath:        { read:     'output',   update: 'bind' },
                imgUrl:         { read:     'output',   update: 'bind' },
                width_it:       { read:     'output',   update: 'bind' },
                height_it:      { read:     'output',   update: 'bind' },
                size_it:        { read:     'output',   update: 'bind' },
                page_size:      { list:     'bind' },
                page_count:     { list:     'bind' },
                sort_cd:        { list:     'bind' },
            };

            this.fn = {

                procRead: function (p_evt_idx) { 
                    _this.bindModel.items['evt_idx'].value = ParamGet2JSON(location.href).evt_idx;
                    _this.bindModel.read.execute(); 
                },
                procCreate: function () { 
                    _this.bindModel.create.execute(); 
                },
                procUpdate: function () { 
                    _this.bindModel.update.execute(); 
                },
                procDelete: function (p_img_idx, p_file_idx) {
                    _this.bindModel.items['img_idx'].value = p_img_idx;
                    _this.bindModel.items['file_idx'].value = p_file_idx;
                    _this.bindModel.delete.execute();
                },
                procList: function () { 
                    _this.bindModel.list.execute(); 
                },
            };
        }
        util.inherits(SystemImageService, _super);

        return SystemImageService;
    
    }(BaseService));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // module.exports = BaseService;
    } else {
        global.SystemImageService = SystemImageService;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));