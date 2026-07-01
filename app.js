const words = [
    {"id": 1, "word": "trên", "meaning": "上面"}, {"id": 2, "word": "trong", "meaning": "里面"},
    {"id": 3, "word": "xong", "meaning": "完、完成"}, {"id": 4, "word": "học viên", "meaning": "学员"},
    {"id": 5, "word": "bài bao nhiêu", "meaning": "第几课"}, {"id": 6, "word": "lớp", "meaning": "班级"},
    {"id": 7, "word": "Thái Lan", "meaning": "泰国"}, {"id": 8, "word": "cố gắng", "meaning": "努力"},
    {"id": 9, "word": "dưới", "meaning": "下面"}, {"id": 10, "word": "ngoài", "meaning": "外面"},
    {"id": 11, "word": "giữa", "meaning": "中间"}, {"id": 12, "word": "trước", "meaning": "前面"},
    {"id": 13, "word": "sau", "meaning": "后面"}, {"id": 14, "word": "bên cạnh", "meaning": "旁边"},
    {"id": 15, "word": "gần", "meaning": "附近"}
];

let wordQueue = [...words].sort(() => Math.random() - 0.5);
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');

function loadQuestion() {
    if (wordQueue.length === 0) {
        alert("Tuyệt vời! Bạn đã hoàn thành bài học.");
        wordQueue = [...words].sort(() => Math.random() - 0.5);
    }
    
    const current = wordQueue[0];
    questionEl.innerText = `Từ "${current.word}" có nghĩa là gì?`;
    
    let options = [current.meaning];
    while(options.length < 4) {
        let rand = words[Math.floor(Math.random() * words.length)].meaning;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);
    
    optionsEl.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, current.meaning, btn);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btn) {
    if (selected === correct) {
        btn.style.backgroundColor = "#4CAF50";
        setTimeout(() => {
            wordQueue.shift();
            loadQuestion();
        }, 500);
    } else {
        btn.style.backgroundColor = "#f44336";
        alert('Sai rồi! Thử lại câu này sau nhé.');
        let failedWord = wordQueue.shift();
        wordQueue.push(failedWord);
        loadQuestion();
    }
}

loadQuestion();