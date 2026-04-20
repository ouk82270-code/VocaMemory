
let user = "";
let current = null;
let answered = false;

// 登入
function login(){

    const name = document.getElementById("nameInput").value.trim();
    if(!name) return;

    user = name;
    localStorage.setItem("currentUser", user);

    // ✔ 管理員流程（關鍵修正）
    if(user === "ouk"){

        const pw = prompt("請輸入密碼");

        if(pw === "ouk"){
            window.location.href = "admin.html";
            return;
        } else {
            alert("密碼錯誤");
            return;
        }
    }

    createUser(user);

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("userInfo").innerText =
        "使用者：" + user;

    nextWord();
}

// 出題
function nextWord(){

    const lesson = document.getElementById("lesson").value;
    const vocab = vocabData[lesson];

    current = vocab[Math.floor(Math.random() * vocab.length)];

    document.getElementById("question").innerText =
        current.pos + " " + current.meaning;

    document.getElementById("answerInput").value = "";
    document.getElementById("result").innerText = "";

    answered = false;
}

// 作答
function submit(){

    if(answered) return;

    const input = document.getElementById("answerInput").value.trim();

    const correct = input === current.word;

    addRecord(user, correct);

    document.getElementById("result").innerText =
        correct ? "正確" : "錯誤，答案：" + current.word;

    answered = true;
}

// 下一題
function nextWord(){

    const lesson = document.getElementById("lesson").value;
    const vocab = vocabData[lesson];

    current = vocab[Math.floor(Math.random() * vocab.length)];

    document.getElementById("question").innerText =
        current.pos + " " + current.meaning;

    document.getElementById("answerInput").value = "";
    document.getElementById("result").innerText = "";

    answered = false;
}

// 後台入口（備用）
function goAdmin(){

    const name = localStorage.getItem("currentUser");

    if(name !== "ouk"){
        alert("沒有權限");
        return;
    }

    const pw = prompt("請輸入密碼");

    if(pw === "ouk"){
        window.location.href = "admin.html";
    }
}

// 登出
function logout(){
    localStorage.removeItem("currentUser");
    location.reload();
}

// 自動登入
window.onload = function(){

    const saved = localStorage.getItem("currentUser");

    if(saved && saved !== "ouk"){

        user = saved;

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";

        document.getElementById("userInfo").innerText =
            "使用者：" + user;

        nextWord();
    }
};