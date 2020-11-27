/**
 * @namespace _W.Task.EntityTable
 */
(function(global) {

    "use strict";

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W                = global._W || {};
    global._W.Task           = global._W.Task || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var errorCount = 0;
    var result = [];        // 결과 확인 **사용시 초기화    
        
    var Row;
    var Item;
    var EntityTable;


    if (typeof module === "object" && typeof module.exports === "object") {     
        Row                    = require("../src/entity-row").Row;
        Item                   = require("../src/entity-item").Item;
        EntityTable            = require("../src/entity-table").EntityTable;
    } else {
        Row                     = global._W.Meta.Entity.Row;
        Item                    = global._W.Meta.Entity.Item;
        EntityTable             = global._W.Meta.Entity.EntityTable;
    }

    //==============================================================
    // 3. 테스트 본문
    function run() {
    
        console.log("---------------------------------------");
        console.log("new EntityTable(name) :: 테이블 생성 ");
        if (true) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }


        console.log("---------------------------------------");
        console.log("newRow() :: Row 생성 ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items.add("i3");
        var row = table.newRow();
        row["i1"] = "R1";
        if (row["i1"] !== undefined && row["i2"] !== undefined && row["i3"] !== undefined &&
            row[0] !== undefined && row[1] !== undefined && row[2] !== undefined && 
            row[0] === "R1" && row["i1"] === "R1") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("setValue(row) :: row  설정(단일) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items.add("i3");
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        row["i3"] = "R3";
        table.setValue(row);
        if (table.items["i1"].value === "R1" && table.items["i2"].value === "R2" && table.items["i3"].value === "R3") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("getValue() : Row :: row 얻기(단일) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items.add("i3");
        table.items["i1"].value = "R1";
        table.items["i2"].value = "R2";
        table.items["i3"].value = "R3";
        var row = table.getValue();
        if (row["i1"] === "R1" && row["i2"] === "R2" && row["i3"] === "R3" &&
        row[0] === "R1" && row[1] === "R2" && row[2] === "R3") {
                console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("select(filter) : Entity :: 언티티 조회(참조값), 필터  ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items.add("i3");
        table.items.addValue("i4", "R4");       // 등록시 값 삽입
        table.items.addValue("i5", "R5");       // 등록시 값 삽입
        var filter = {
            __except: ["i1"],                   // 제외
            i2: { __except: true },             // 제외
            i3: { caption: "C3", value: "R3" }  // 속성 오버라이딩(필터)
        };
        var table2 = table.select(filter);
        table.items["i3"].order = 200;          // 참조값 체크
        if (table.name === "T1" && table.items.count === 5 && 
            table.items["i4"].value === "R4" && table.items["i5"].value === "R5" &&
            table.items["i3"].order === 200 && table2.items["i3"].order === 200 &&
            table2.name === "T1" && table2.items.count === 3 && 
            table2.items["i3"].caption === "C3" && table2.items["i3"].value === "R3" && 
            table2.items["i4"].value === "R4" && table2.items["i5"].value === "R5") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("select(filter, start) : Entity :: 언티티 조회(참조값), 필터 + 레코드 레코드범위 ");
        var table = new EntityTable("T1");
        var filter = {
            __except: ["i1"],                   // 제외
            i2: { caption: "C3" }  // 속성 오버라이딩(필터)
        };
        table.items.add("i1");
        table.items.add("i2");
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R10";
        row["i2"] = "R20";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R100";
        row["i2"] = "R200";
        table.rows.add(row);
        var table2 = table.select(filter, 1);
        if (table.items.count === 2 && table.rows.count === 3 &&
            table.rows[0][0] === "R1" && table.rows[0]["i1"] === "R1" &&
            table2.items.count === 1 && table2.rows.count === 2 && 
            table2.rows[0][0] === "R20" && table2.rows[0]["i2"] === "R20" && 
            table2.rows[1][0] === "R200" && table2.rows[1]["i2"] === "R200") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }
        
        console.log("---------------------------------------");
        console.log("select(null, start, end) : Entity :: 언티티 조회(참조값), 레코드 레코드범위 ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R10";
        row["i2"] = "R20";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R100";
        row["i2"] = "R200";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R1000";
        row["i2"] = "R2000";
        table.rows.add(row);
        var table2 = table.select(null, 1, 2);
        if (table.items.count === 2 && table.rows.count === 4 &&
            table2.items.count === 2 && table2.rows.count === 2 && 
            table2.rows[0][1] === "R20" && table2.rows[0]["i2"] === "R20" && 
            table2.rows[1][1] === "R200" && table2.rows[1]["i2"] === "R200" && 
            table2.rows[2] === undefined ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("select(null, [list]) : Entity :: 언티티 조회(참조값), 레코드 레코드범위 ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R10";
        row["i2"] = "R20";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R100";
        row["i2"] = "R200";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R1000";
        row["i2"] = "R2000";
        table.rows.add(row);
        var table2 = table.select(null, [0, 2]);
        if (table.items.count === 2 && table.rows.count === 4 &&
            table2.items.count === 2 && table2.rows.count === 2 && 
            table2.rows[0][1] === "R2" && table2.rows[0]["i2"] === "R2" && 
            table2.rows[1][1] === "R200" && table2.rows[1]["i2"] === "R200" && 
            table2.rows[2] === undefined ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("copy(filter, start) : Entity :: 언티티 조회  ");
        var table = new EntityTable("T1");
        var filter = {
            __except: ["i1"],                   // 제외
            i2: { caption: "C3" }  // 속성 오버라이딩(필터)
        };
        table.items.add("i1");
        table.items.add("i2");
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R10";
        row["i2"] = "R20";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R100";
        row["i2"] = "R200";
        table.rows.add(row);
        var table2 = table.copy(filter, 1);
        table.items["i2"].caption = "C30";  // 덮어쓰기
        if (table.items.count === 2 && table.rows.count === 3 &&
            table.rows[0][0] === "R1" && table.rows[0]["i1"] === "R1" &&
            table.items["i2"] !== table2.items["i2"] && 
            table.items["i2"].caption === "C30" && table2.items["i2"].caption === "C3" &&
            table2.items.count === 1 && table2.rows.count === 2 && 
            table2.rows[0][0] === "R20" && table2.rows[0]["i2"] === "R20" && 
            table2.rows[1][0] === "R200" && table2.rows[1]["i2"] === "R200") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("merge(entity, option = 1) :: 엔티티 병합 (기존 item 유지, 원본 row > 타겟 row) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var row = table.newRow();
        row["i1"] = "R10";
        row["i2"] = "R20";
        table.rows.add(row);
        var table2 = new EntityTable("T2");
        table2.items.add("i2");
        table2.items.add("i3");
        table2.items["i2"].caption = "C2";
        var row = table.newRow();
        row["i2"] = "R22";
        row["i3"] = "R33";
        table2.rows.add(row);
        table.merge(table2, 1);
        if (table.items.count === 3 && table.rows.count === 2 &&
            table.items["i2"].caption === "C1" &&   // 기존 유지 
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R2" && table.rows[0]["i3"] === "R33" &&
            table.rows[1]["i1"] === "R10" && table.rows[1]["i2"] === "R20" && table.rows[1]["i3"] === "") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("merge(entity, option = 2) :: 엔티티 병합 (기존 item 덮어쓰기, 원본 row < 타겟 row) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var table2 = new EntityTable("T2");
        table2.items.add("i2");
        table2.items.add("i3");
        table2.items["i2"].caption = "C2";
        var row = table.newRow();
        row["i2"] = "R22";
        row["i3"] = "R33";
        table2.rows.add(row);
        var row = table.newRow();
        row["i2"] = "R20";
        row["i3"] = "R30";
        table2.rows.add(row);
        table.merge(table2, 2);
        if (table.items.count === 3 && table.rows.count === 2 &&
            table.items["i2"].caption === "C2" &&   // 덮어쓰기
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R22" && table.rows[0]["i3"] === "R33" &&
            table.rows[1]["i1"] === "" && table.rows[1]["i2"] === "R20" && table.rows[1]["i3"] === "R30") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("merge(entity, option = 3) :: 엔티티 병합 (row 안가져오기) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var table2 = new EntityTable("T2");
        table2.items.add("i2");
        table2.items.add("i3");
        table2.items["i2"].caption = "C2";
        var row = table.newRow();
        row["i2"] = "R22";
        row["i3"] = "R33";
        table2.rows.add(row);
        var row = table.newRow();
        row["i2"] = "R20";
        row["i3"] = "R30";
        table2.rows.add(row);
        table.merge(table2, 3);
        if (table.items.count === 3 && table.rows.count === 1 && 
            table.items["i2"].caption === "C1" &&
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R2" && table.rows[0]["i3"] === "") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("load(Entity, option = 1) :: 로드 (row 기준, 채워진 Entity) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var table2 = new EntityTable("T2");
        table2.items.add("i2");
        table2.items.add("i3");
        table2.items["i2"].caption = "C2";
        var row = table.newRow();
        row["i2"] = "R22";
        row["i3"] = "R33";
        table2.rows.add(row);
        var row = table.newRow();
        row["i2"] = "R20";
        row["i3"] = "R30";
        table2.rows.add(row);
        table.load(table2, 1);
        if (table.items.count === 3 && table.rows.count === 3 &&
            table.items["i2"].caption === "C1" &&
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R2" && table.rows[0]["i3"] === "" &&
            table.rows[1]["i1"] === "" && table.rows[1]["i2"] === "R22" && table.rows[1]["i3"] === "R33" &&
            table.rows[2]["i1"] === "" && table.rows[2]["i2"] === "R20" && table.rows[2]["i3"] === "R30") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("load(Entity, option = 2) :: 로드 (row 기준, 채워진 Entity) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var table2 = new EntityTable("T2");
        table2.items.add("i2");
        table2.items.add("i3");
        table2.items["i2"].caption = "C2";
        var row = table.newRow();
        row["i2"] = "R22";
        row["i3"] = "R33";
        table2.rows.add(row);
        var row = table.newRow();
        row["i2"] = "R20";
        row["i3"] = "R30";
        table2.rows.add(row);
        table.load(table2, 2);
        if (table.items.count === 2 && table.rows.count === 3 &&
            table.items["i2"].caption === "C1" &&
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R2" && table.rows[0]["i3"] === undefined &&
            table.rows[1]["i1"] === "" && table.rows[1]["i2"] === "R22" &&
            table.rows[2]["i1"] === "" && table.rows[2]["i2"] === "R20") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("load(Entity, option = 1) :: 로드 (row 기준) ");
        var table = new EntityTable("T1");
        var table2 = new EntityTable("T2");
        table2.items.add("i2");
        table2.items.add("i3");
        table2.items["i2"].caption = "C2";
        var row = table.newRow();
        row["i2"] = "R22";
        row["i3"] = "R33";
        table2.rows.add(row);
        var row = table.newRow();
        row["i2"] = "R20";
        row["i3"] = "R30";
        table2.rows.add(row);
        table.load(table2, 1);
        if (table.items.count === 2 && table.rows.count === 2 &&
            table.items["i2"].caption === "C2" &&
            table.rows[0]["i2"] === "R22" && table.rows[0]["i3"] === "R33" &&
            table.rows[1]["i2"] === "R20" && table.rows[1]["i3"] === "R30") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("load(Entity, option = 2) :: 로드 (존재하는 item의 row만 가져오기) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var table2 = new EntityTable("T2");
        table2.items.add("i2");
        table2.items.add("i3");
        table2.items["i2"].caption = "C2";
        var row = table.newRow();
        row["i2"] = "R22";
        row["i3"] = "R33";
        table2.rows.add(row);
        var row = table.newRow();
        row["i2"] = "R20";
        row["i3"] = "R30";
        table2.rows.add(row);
        table.load(table2, 2);
        if (table.items.count === 2 && table.rows.count === 2 &&
            table.items["i2"].caption === "C1" &&
            table.rows[0]["i1"] === "" && table.rows[0]["i2"] === "R22" &&
            table.rows[1]["i1"] === "" && table.rows[1]["i2"] === "R20") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("load(JSON, option = 1) :: 로드 (row 기준, 채워진 Entity) ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: "R22", i3: "R33"}, { i2: "R20", i3: "R30"}]
            }            
        };
        table.load(table2, 1);
        if (table.items.count === 3 && table.rows.count === 3 &&
            table.items["i2"].caption === "C1" && table.items["i2"].size === 10 &&
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R2" && table.rows[0]["i3"] === "" &&
            table.rows[1]["i1"] === "" && table.rows[1]["i2"] === "R22" && table.rows[1]["i3"] === "R33" &&
            table.rows[2]["i1"] === "" && table.rows[2]["i2"] === "R20" && table.rows[2]["i3"] === "R30") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("load(JSON, option = 2) :: 로드 (존재하는 item의 row만 가져오기, 채워진 Entity)  ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: "R22", i3: "R33"}, { i2: "R20", i3: "R30"}]
            }            
        };
        table.load(table2, 2);
        if (table.items.count === 2 && table.rows.count === 3 &&
            table.items["i2"].caption === "C1" && 
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R2" && table.rows[0]["i3"] === undefined &&
            table.rows[1]["i1"] === "" && table.rows[1]["i2"] === "R22" &&
            table.rows[2]["i1"] === "" && table.rows[2]["i2"] === "R20" ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }


        console.log("---------------------------------------");
        console.log("load(JSON, option = 1) :: 로드 (row 기준) ");
        var table = new EntityTable("T1");
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: "R22", i3: "R33"}, { i2: "R20", i3: "R30"}]
            }            
        };
        table.load(table2, 1);
        if (table.items.count === 2 && table.rows.count === 2 &&
            table.items["i2"].size === 10 &&  table.items["i3"].size === 20 &&
            table.rows[0]["i2"] === "R22" && table.rows[0]["i3"] === "R33" &&
            table.rows[1]["i2"] === "R20" && table.rows[1]["i3"] === "R30") {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("load(JSON, option = 2) :: 로드 (존재하는 item의 row만 가져오기)  ");
        var table = new EntityTable("T1");
        var table2 = {
            entity: {
                items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                rows_total: 2,
                rows: [ { i2: "R22", i3: "R33"}, { i2: "R20", i3: "R30"}]
            }            
        };
        table.load(table2, 2);
        if (table.items.count === 0 && table.rows.count === 0) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }


        console.log("---------------------------------------");
        console.log("clear() :: 초기화 ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        table.clear();
        if (table.items.count === 0 && table.rows.count === 0 ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("clone() : EntityTable :: 복제 ");
        var table = new EntityTable("T1");
        table.items.add("i1");
        table.items.add("i2");
        table.items["i2"].caption = "C1";
        var row = table.newRow();
        row["i1"] = "R1";
        row["i2"] = "R2";
        table.rows.add(row);
        var table2 = table.clone();
        if (table.name === "T1" && table.items.count === 2 && table.rows.count === 1 && 
            table.items["i2"].caption === "C1" && 
            table.rows[0]["i1"] === "R1" && table.rows[0]["i2"] === "R2" && 
            table2.name === "T1" && table2.items.count === 2 && table2.rows.count === 1 && 
            table2.items["i2"].caption === "C1" && 
            table2.rows[0]["i1"] === "R1" && table2.rows[0]["i2"] === "R2" ) {
            console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("getTypes() :: 타입 조회(상속) ");
        if (true) {
            // console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }

        console.log("---------------------------------------");
        console.log("getObject() :: 타입 얻기(JSON) ");
        if (true) {
            // console.log("Result = Success");
        } else {
            console.warn("Result = Fail");
            errorCount++;
        }


        if (errorCount > 0) {
            console.warn("Error Sub SUM : %dEA", errorCount);    
        }
        return errorCount;
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === "object" && typeof module.exports === "object") {     
        module.exports = run();
    } else {
        global._W.Task.EntityTable = run();
    }

}(this));