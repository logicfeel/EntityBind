/**
 * 모듈 테스트
 */
//===============================================
// 선언
var EntityTable         = require("../src/entity-table").EntityTable;

var obj_i_m             = require("./jsons/sample_item_multi.json");
var obj_i_s             = require("./jsons/sample_item_single.json");
var obj_r_m             = require("./jsons/sample_row_multi.json");
var obj_r_s             = require("./jsons/sample_row_single.json");
var obj_e_m             = require("./jsons/sample_entity_multi.json");
var obj_e_s             = require("./jsons/sample_entity_single.json");

var i_s = new EntityTable();
var i_m = new EntityTable();


var r_s = new EntityTable();
var r_m = new EntityTable();

var e_s = new EntityTable();
var e_m = new EntityTable();




//===============================================
// 테스크 1
// load 테스트
console.log("---------------------------------------");
console.log("일반 load(option=1)");
i_s.load(obj_i_s);
console.log("i_s.itmes.count   1       ==> " + i_s.items.count);

i_m.load(obj_i_m);
console.log("i_m.itmes.count   3       ==> " + i_m.items.count);

r_s.load(obj_r_s);
console.log("r_s.itmes.count   10      ==> " + r_s.items.count);
console.log("r_s.rows.count    1       ==> " + r_s.rows.count);

r_m.load(obj_r_m);
console.log("r_m.itmes.count   9       ==> " + r_m.items.count);
console.log("r_m.rows.count    2       ==> " + r_m.rows.count);

e_s.load(obj_e_s);
console.log("e_s.itmes.count   3       ==> " + e_s.items.count);

// e_m.load(obj_e_m);
// console.log("   오류    ==> " + e_m.items.count);

console.log("---------------------------------------");
console.log("일반 load(option=2)");
i_s.load(obj_i_s, 2);
console.log("i_s.itmes.count   1       ==> " + i_s.items.count);

i_m.load(obj_i_m, 2);
console.log("i_m.itmes.count   3       ==> " + i_m.items.count);

r_s.load(obj_r_s, 3);
console.log("r_s.itmes.count   10      ==> " + r_s.items.count);
console.log("r_s.rows.count    2       ==> " + r_s.rows.count);

r_m.load(obj_r_m, 2);
console.log("r_m.itmes.count   9       ==> " + r_m.items.count);
console.log("r_m.rows.count    4       ==> " + r_m.rows.count);

e_s.load(obj_e_s, 2);
console.log("e_s.itmes.count   3       ==> " + e_s.items.count);

console.log("---------------------------------------");
console.log("병합 load");
console.log("전 .itmes.count   1      ==> " + i_s.items.count);
i_s.load(obj_i_m);
console.log("후 .itmes.count   3      ==> " + i_s.items.count);
console.log(i_s.items.list);


console.log("---------------------------------------");
console.log("병합 load (option = 2) ");
console.log("admid, passwd, create_dt");
console.log("전");
console.log("i_m.itmes.count   3       ==> " + i_m.items.count);
console.log("i_m.rows.count    0       ==> " + i_m.rows.count);
i_m.load(obj_r_s, 2);
console.log("후");
console.log("i_m.itmes.count   3       ==> " + i_m.items.count);
console.log("i_m.rows.count    1       ==> " + i_m.rows.count);
console.log("i_m.rows[0]['admid']    X ==> " + i_m.rows[0]['admid']);
console.log("i_m.rows[0]['passwd']   O ==> " + i_m.rows[0]['passwd'] );
console.log("i_m.rows[0]['create_dt']O ==> " + i_m.rows[0]['create_dt']);


console.log("-End-");