/**
 * 구조만 나열, sub, mod, super 분리
 */
var projectA = {
    mod: {
        PRT: {
            mod: {
                View: {
                    sub: {
                        Control: {
                            sub: {
                                Server: {
                                    sub: {
                                        DB_PRT: {
                                            super: {
                                                DB_STO: {}
                                            }
                                        }
                                    },
                                    super: {
                                        Cmn_Server: {}
                                    }
                                }
                            },
                            super: {
                                Cmn_svc: {
                                    super: {
                                        Cmn_js: {}
                                    }
                                }
                            }
                        }
                    },
                    super: {
                        Cmn_Server: {type: 'refer'}
                    }
                }
            }
        },
        MEB: {}
    }
};


 /**
 * 파일 나열, 순차배열, 타입
 */
  var projectA = {
    name: 'Project_A',
    list: [
       {
           name: 'PRT',
           link: 'mod',
           list: [
               {
                   name: 'View',
                   link: 'mod',
                   list: [
                       {
                           name: 'Control',
                           link: 'sub',
                           list: [
                               {
                                   name: 'Server',
                                   link: 'sub',
                                   list: [
                                       {
                                           name: 'DB_PRT',
                                           type: 'instace', /** 기본타입은 static */
                                           link: 'sub',
                                           list: [
                                               {
                                                   name: 'DB_STO',
                                                   link: 'super'
                                               }
                                           ]
                                       },
                                       {
                                           name: 'Cmn_Server<NPM_NAME>',    /** NPM 이름 표시 */
                                           link: 'super',
                                           ref: ['View']
                                       }
                                   ]
                               },
                               {
                                   name: 'Cmn_svc',
                                   link: 'super',
                                   list: [
                                       {
                                           name: 'Cmn_js',
                                           link: 'super'
                                       }
                                   ]
                               }
                           ]
                       },
                       {
                           name: 'Cmn_Server',
                           link: 'super', 
                           refer: true, /** REVIEW */
                       }
                   ]
               }
           ]
       },
       {
          name: 'MEB',
          link: 'mod',
      },
   ]
};


/**
 * 구조만 나열, 순차배열, 타입
 * > auto map -all 
 * 전체 맵구조 출력
 * 맵구조를 통해서 하위으 오버라이딩 할 것을 선택하거나
 * 파일로 표현할때는 참조를 표시하고, 객체로 실시간 확인할때는 하위맵 모두 나열함
 */
 var MAP = {
    name: 'Project_A',
    list: [
       {
           name: 'PRT',
           link: 'mod',
           list: [
               {
                   name: 'NPM_name.View',
                   link: 'mod',
                   interface: ['NPM_name.IClass'],   /** 인터페이스 구현 정보 */
                   file: ['List.asp', 'View.asp'],
                   list: [
                       {
                           extend: 'NPM_Name<BaseAuto>',   /** 부모 auto 객체 형식으로 상위 표현 */
                           name: 'Control',
                           link: 'super',
                           file: ['prt-adm-svc.js', 'prt-frt-svc.js'],
                           list: [
                               {
                                   name: 'Server',
                                   link: 'sub',
                                   file: ['prt.Cls.asp', 'prt.adm.C.asp', 'prt.frt.C.asp'],
                                   list: [
                                       {
                                           name: 'DB_PRT',
                                           /** 셋중 방식 선택 : 인스턴스 | static | instance */
                                           static: false,   
                                           instance: true,  
                                           type: 'instance',
                                           link: 'sub',
                                           file: ['prt_table.sql', 'prt_crudl.sql'],
                                           list: [
                                               {
                                                   name: 'DB_STO',
                                                   link: 'super',
                                                   top: true,   /** 최상위 모듈, 비의존 모듈 */
                                                   file: ['sto_table.sql', 'sto_crudl.sql'],
                                               }
                                           ]
                                       },
                                       {
                                           name: 'NPM_Name<Cmn_Server>',    /** NPM 이름 표시 */
                                           link: 'super',
                                           file: ['frt_g_define.i.asp', 'adm_g_define.i.asp'],
                                           ref: ['NPM_name<View>']
                                       }
                                   ]
                               },
                               {
                                   name: 'NPM_Name.Cmn_sv>',    /** 이름규칙은 구조파익후 적당한걸로 선택 */
                                   link: 'super',
                                   file: ['base-svc.js', '_w-meta1.6.js'],
                                   list: [
                                       {
                                           name: 'Cmn_js',
                                           link: 'super',
                                           file: ['jquery.js', 'common.js']
                                       }
                                   ]
                               }
                           ]
                       },
                       {
                           name: 'NPM_Name<Cmn_Server>',
                           link: 'super', 
                           refer: true, /** 기본값 : false */
                       }
                   ]
               }
           ]
       },
       {
          name: 'MEB',
          link: 'mod',
      },
   ]
};

