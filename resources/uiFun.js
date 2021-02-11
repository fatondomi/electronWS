//ui functions


let navBar = document.getElementById("navbarList");
let queryBox = document.getElementById("queryBox");

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(process.execPath.split("node_modules")[0].replace("\\","/")+"resources/pasurohuedheti.db");

let tables = [];
let tableSelected = "familjet";

let altDown = false;
let templateSwitchCounter = 0;
let templateSwitchKeyCode = 0;
let curentTemplates = [];

let previousQueries = [];
let previousQueryIndex = 0;

function setupPage()
{
    db.serialize(function() {
        db.each("SELECT tablename FROM tables", function(err, row) {

            if(err){ console.log("populating navbar with tables failed\n"+err); return;}
            
            tables.push(row.tablename);
            populateNavbarWithTable(row.tablename);
        });
        
        populateTableWithQuery("SELECT * FROM "+tableSelected+" ORDER BY 1 DESC");
    });

    let runBtn = document.getElementById("runBtn");
    runBtn.addEventListener("click",runBtnClicked);

    document.onkeydown = onKeyDownInQBox;
    document.onkeyup = onKeyUpInQBox;
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
    newA.onclick = ()=>{populateTableWithQuery("SELECT * FROM "+tableNameStr+" ORDER BY 1 DESC")};
    
    newLi.appendChild(newA);
    navBar.appendChild(newLi);
}

function populateTableWithQuery(queryStr)
{
    let propsFilled = false;
    let tableBody = document.getElementById("mainTableBody");
    let tableHead = document.getElementById("mainTableHead");

    db.each(queryStr, function(err, row) {

        if(err){ showErrorOnTable(err); return;}

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
    populateTableWithQuery(queryBox.value);
    previousQueries.push(queryBox.value);
    previousQueryIndex = previousQueries.length;
}

function showErrorOnTable(errStr)
{
    let tableBody = document.getElementById("mainTableBody");
    let tableHead = document.getElementById("mainTableHead");

    while(tableHead.firstChild){ tableHead.removeChild(tableHead.firstChild); }
    while(tableBody.firstChild){ tableBody.removeChild(tableBody.firstChild); }

    let newRow = document.createElement("tr");
    
    let newHead = document.createElement("th");
    newHead.scope = "col";
    newHead.innerHTML = " Query ERROR ";
    newRow.appendChild(newHead); 

    tableHead.appendChild(newRow);

    let newRow2 = document.createElement("tr");
    
    let newData = document.createElement("td");
    newData.innerHTML = errStr;

    newRow2.appendChild(newData);

    tableBody.appendChild(newRow2);
}

function onKeyDownInQBox(e)
{
    if(e.altKey && !altDown) {
        altDown = true;
        console.log("alt is down");
        previousQueryIndex = previousQueries.length;
        //db.run("select template from ")
    }
}

function onKeyUpInQBox(e)
{
    onKeyPressInQBox(e);
    if(!e.altKey && altDown) {
        altDown = false;
        console.log("alt is up");
        templateSwitchCounter = 0;
        templateSwitchKeyCode = 0;
    }
}

function onKeyPressInQBox(event)
{
    if(altDown)
    {
        if(templateSwitchKeyCode != event.keycode)
        {
            templateSwitchCounter = 0
            templateSwitchKeyCode = event.keycode
        }

        if(event.keycode == 83)
        {//go through select templates 83-S
            
        }
        else if(event.keycode == 73)
        {//go through insert templates 73-I

        }
        else if(event.keycode == 85)
        {//go through update templates 85-U

        }
        else if(event.keycode == 68)
        {//go through delete templates 68-D

        }
        else if(event.keycode == 67)
        {//go through create templates 68-C

        }
        else if(event.keycode == 65)
        {//go through alter templates 65-A

        }

        if(event.keyCode == 13)
        {
            runBtnClicked();
            return;
        }
        else if(event.keyCode == 38 && previousQueries.length > 0)
        {//up arrow
            previousQueryIndex = (previousQueryIndex < 1)? 0 : previousQueryIndex - 1;
            queryBox.value = previousQueries[previousQueryIndex];
            return;
        }
        else if(event.keyCode == 40 && previousQueries.length > 0)
        {//down arrow
            previousQueryIndex = (previousQueryIndex > previousQueries.length - 2)? previousQueries.length - 1 : previousQueryIndex + 1;
            queryBox.value = previousQueries[previousQueryIndex];
            return;
        }
    }

    if(event.keyCode == 116)
    {
        runBtnClicked();
        return;
    }
    else if(event.keyCode == 112 && previousQueries.length > 0)
    {//up arrow
        previousQueryIndex = (previousQueryIndex < 1)? 0 : previousQueryIndex - 1;
        queryBox.value = previousQueries[previousQueryIndex];
        return;
    }
    else if(event.keyCode == 113 && previousQueries.length > 0)
    {//down arrow
        previousQueryIndex = (previousQueryIndex > previousQueries.length - 2)? previousQueries.length - 1 : previousQueryIndex + 1;
        queryBox.value = previousQueries[previousQueryIndex];
        return;
    }
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