
function loadDB(){
    return JSON.parse(localStorage.getItem("db") || "{}");
}

function saveDB(db){
    localStorage.setItem("db", JSON.stringify(db));
}

function createUser(name){

    const db = loadDB();

    if(!db[name]){
        db[name] = {
            stats:{correct:0,total:0},
            records:[]
        };
    }

    saveDB(db);
}

function addRecord(user, correct){

    const db = loadDB();

    db[user].stats.total++;

    if(correct) db[user].stats.correct++;

    db[user].records.push({
        correct,
        time: Date.now()
    });

    saveDB(db);
}