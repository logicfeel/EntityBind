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
                   file: ['List.asp', 'View.asp'],
                   list: [
                       {
                           name: 'Control',
                           link: 'sub',
                           file: ['prt-adm-svc.js', 'prt-frt-svc.js'],
                           list: [
                               {
                                   name: 'Server',
                                   link: 'sub',
                                   file: ['prt.Cls.asp', 'prt.adm.C.asp', 'prt.frt.C.asp'],
                                   list: [
                                       {
                                           name: 'DB_PRT',   
                                           type: 'instance', /** 인스턴스 */
                                           link: 'sub',
                                           file: ['prt_table.sql', 'prt_crudl.sql'],
                                           list: [
                                               {
                                                   name: 'DB_STO',
                                                   link: 'super',
                                                   file: ['sto_table.sql', 'sto_crudl.sql'],
                                               }
                                           ]
                                       },
                                       {
                                           name: 'Cmn_Server<NPM_NAME>',    /** NPM 이름 표시 */
                                           link: 'super',
                                           file: ['frt_g_define.i.asp', 'adm_g_define.i.asp'],
                                           ref: ['View']
                                       }
                                   ]
                               },
                               {
                                   name: 'Cmn_svc',
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
                           name: 'Cmn_Server',
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

