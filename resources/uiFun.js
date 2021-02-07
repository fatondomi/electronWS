//ui functions


let navBar = document.getElementById("navbarList");
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('C:/Users/ASUS/Documents/electronWS/resources/pasurohuedheti.db');

let tables = [];
let tableSelected = "familjet";

function setupPage()
{
    db.serialize(function() {
        db.each("SELECT tablename FROM tables", function(err, row) {

            if(err){ console.log("populating navbar with tables failed\n"+err); return;}
            
            tables.push(row.tablename);
            populateNavbarWithTable(row.tablename);
        });
        
        populateTableWithQuery("SELECT * FROM "+tableSelected);
    });

    let runBtn = document.getElementById("runBtn");
    runBtn.addEventListener("click",runBtnClicked);
}

function populateNavbarWithTable(tableNameStr)
{
    let newLi = document.createElement("li");
    newLi.classList.add("nav-item");
    newLi.classList.add("active");
    newLi.style.cursor = "pointer";
    
    let newA = document.createElement("a");
    newA.classList.add("nav-link");
    newA.appendChild(document.createTextNode(tableNameStr));
    newA.onclick = ()=>{populateTableWithQuery("SELECT * FROM "+tableNameStr)};
    
    newLi.appendChild(newA);
    navBar.appendChild(newLi);
}

function populateTableWithQuery(queryStr)
{
    let propsFilled = false;
    let tableBody = document.getElementById("mainTableBody");
    let tableHead = document.getElementById("mainTableHead");

    db.each(queryStr, function(err, row) {

        if(err){ console.log("populating table with query failed\n"+err); return;}

        if(!propsFilled)
        {
            while(tableHead.firstChild){ tableHead.removeChild(tableHead.firstChild); }
            while(tableBody.firstChild){ tableBody.removeChild(tableBody.firstChild); }

            let newRow = document.createElement("tr");
            
            for(let key in row)
            {
                let newHead = document.createElement("th");
                newHead.scope = "col";
                newHead.innerHTML = key;

                newRow.appendChild(newHead);
            }

            tableHead.appendChild(newRow);

            propsFilled = true;
        }
        
        let newRow = document.createElement("tr");

        for(let key in row)
        {
            let newData = document.createElement("td");

            newData.innerHTML = row[key];

            newRow.appendChild(newData);
        }

        tableBody.appendChild(newRow);
    });
}

function runBtnClicked()
{
    let queryInput = document.getElementById("queryBox").value;
    populateTableWithQuery(queryInput);
}
//db.run("CREATE TABLE tables (id INTEGER PRIMARY KEY,tablename TEXT)");
//db.run("INSERT INTO tables VALUES(NULL,\"familjet\")");
//db.run("INSERT INTO tables VALUES(NULL,\"aktivitetet\")");

/*
db.each("SELECT * FROM familjet", function(err, row) {
    console.log(row.emriplote)
});
db.run("CREATE TABLE familjet (id INTEGER NOT NULL PRIMARY KEY,"+
"emriplote TEXT NOT NULL,"+
"contact TEXT,"+
"kategoria TEXT,"+
"nrpersonal INTEGER,"+
"info TEXT,"+
"vendi TEXT,"+
"gmap TEXT)")


db.run("CREATE TABLE aktivitetet (id INTEGER NOT NULL PRIMARY KEY,"+
"perfituesi TEXT NOT NULL,"+
"nrfamiljes INTEGER NOT NULL,"+
"donatori TEXT,"+
"nrdonatorit INTEGER,"+
"donacioni TEXT,"+
"data TEXT)")

db.run("INSERT INTO familjet VALUES(NULL,\"faton domi\","+
"\"049130557\",\"e lehte\",1176035338,\"student i fim\","+
"\"Prishtine\",\"42.66319732709566, 21.164458228221527\")");
*/

/*
var myObj = {
    name:"faton",
    surname:"domi"
}
// printon for key = name we have prop = faton
for(let key in myObj)
{
    console.log("for key = "+key+" we have prop = "+myObj[key])
} 
*/