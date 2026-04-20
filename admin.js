
function show(page){

    document.getElementById("users").style.display = "none";
    document.getElementById("stats").style.display = "none";

    document.getElementById(page).style.display = "block";
}

function refreshUsers(){

    const db = loadDB();
    const sel = document.getElementById("userSelect");

    sel.innerHTML = "";

    Object.keys(db).forEach(u=>{
        let opt = document.createElement("option");
        opt.value = u;
        opt.innerText = u;
        sel.appendChild(opt);
    });
}

function deleteUser(){

    const u = document.getElementById("userSelect").value;

    const db = loadDB();
    delete db[u];

    saveDB(db);

    refreshUsers();
}

window.onload = function(){
    refreshUsers();
    show("users");
    drawCharts();
};