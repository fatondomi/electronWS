//ui functions

let tables = ["familjet","aktivitetet"];
const navBar = document.getElementById("navbar");

function populateNavbarWithTables()
{
    let newLi;
    let newA;

    for(tableName in tables)
    {
        newLi = document.createElement("li");
        newLi.classList.add("nav-item active");

        newA = document.createElement("a");
        newA.classList.add("nav-link");
        newA.appendChild(document.createTextNode(tableName));
        newA.onclick = tableClicked();

        newLi.appendChild(newA);
        navBar.appendChid(newLi)
        console.log("u krijua")
    }
}

function tableClicked(e)
{
    console.log("table clicked was "+e.target.innerText);
}


document.addEventListener("DOMContentLoaded",(e)=>{populateNavbarWithTables();})