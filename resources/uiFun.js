//ui functions

let tables = ["familjet","aktivitetet"];

function populateNavbarWithTables()
{
    let navBar = document.getElementById("navbar");

    for(tableIndex in tables)
    {
        let newLi;
        let newA;

        newLi = document.createElement("li");
        newLi.classList.add("nav-item");
        newLi.classList.add("active");
        newLi.style.cursor = "pointer";

        newA = document.createElement("a");
        newA.classList.add("nav-link");
        newA.appendChild(document.createTextNode(tables[tableIndex]));
        newA.onclick = tableClicked;

        newLi.appendChild(newA);
        navBar.appendChild(newLi)
        console.log("u krijua "+tables[tableIndex])
    }
}

function tableClicked()
{
    console.log("table clicked");
}
