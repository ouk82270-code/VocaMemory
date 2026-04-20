
function drawCharts(){

    const db = loadDB();
    const users = Object.keys(db);

    const rate = users.map(u=>{
        let s = db[u].stats;
        return s.total ? (s.correct/s.total*100) : 0;
    });

    new Chart(document.getElementById("chart1"),{
        type:"bar",
        data:{
            labels:users,
            datasets:[{label:"正確率",data:rate}]
        }
    });

    const t=[],y=[];

    for(let i=0;i<=10;i++){
        t.push(i);
        y.push(Math.exp(-0.4*i));
    }

    new Chart(document.getElementById("chart2"),{
        type:"line",
        data:{
            labels:t,
            datasets:[{label:"記憶曲線",data:y}]
        }
    });
}