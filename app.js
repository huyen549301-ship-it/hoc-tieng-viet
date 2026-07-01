let allWords = [];

// Tải dữ liệu từ file json
async function loadData() {
    try {
        const response = await fetch('data.json');
        allWords = await response.json();
    } catch (e) { alert("Không tải được data.json"); }
}
loadData();

let wordQueue = [];

function startLesson(lessonId) {
    if (allWords.length === 0) { alert("Đang tải dữ liệu..."); return; }
    
    // Lọc từ vựng
    wordQueue = allWords.filter(w => w.lesson_id === lessonId).sort(() => Math.random() - 0.5);
    
    if(wordQueue.length === 0) { alert("Bài này chưa có từ!"); return; }
    
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    if (wordQueue.length === 0) {
        alert("Hoàn thành bài!");
        location.reload();
        return;
    }
    const current = wordQueue[0];
    document.getElementById('question').innerText = `Từ "${current.word}" có nghĩa là gì?`;
    
    let options = [current.meaning];
    while(options.length < 4) {
        let rand = allWords[Math.floor(Math.random() * allWords.length)].meaning;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);
    
    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === current.meaning) {
                wordQueue.shift();
                loadQuestion();
            } else {
                alert("Sai rồi, thử lại!");
            }
        };
        optionsEl.appendChild(btn);
    });
}
