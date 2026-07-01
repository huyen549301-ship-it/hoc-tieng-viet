let allWords = [];

async function loadData() {
    const response = await fetch('data.json');
    allWords = await response.json();
    console.log("Dữ liệu đã tải:", allWords);
}

// Gọi loadData ngay khi chạy
loadData();

let wordQueue = [];
let totalAttempts = 0;

function startLesson(lessonId) {
    if (allWords.length === 0) {
        alert("Đang tải dữ liệu, vui lòng đợi 1 giây rồi bấm lại!");
        return;
    }
    // Lọc theo ID
    wordQueue = allWords.filter(w => w.lesson_id === lessonId).sort(() => Math.random() - 0.5);
    
    if(wordQueue.length === 0) { 
        alert("Bài học này chưa có từ vựng nào!"); 
        return; 
    }
    
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    totalAttempts = 0;
    loadQuestion();
}
// ... (các hàm còn lại giữ nguyên)

let wordQueue = [];
let totalAttempts = 0;

function startLesson(lessonId) {
    // Lọc từ vựng theo bài
    wordQueue = allWords.filter(w => w.lesson_id === lessonId).sort(() => Math.random() - 0.5);
    if(wordQueue.length === 0) { alert("Bài học chưa có dữ liệu!"); return; }
    
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    totalAttempts = 0;
    loadQuestion();
}

function loadQuestion() {
    if (wordQueue.length === 0) {
        showResult();
        return;
    }
    
    const current = wordQueue[0];
    document.getElementById('question').innerText = `Từ "${current.word}" nghĩa là gì?`;
    
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
        btn.onclick = () => checkAnswer(opt, current.meaning, btn);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btn) {
    totalAttempts++;
    if (selected === correct) {
        btn.style.backgroundColor = "#4CAF50";
        setTimeout(() => { wordQueue.shift(); loadQuestion(); }, 500);
    } else {
        btn.style.backgroundColor = "#f44336";
        setTimeout(() => { btn.style.backgroundColor = "#007bff"; }, 500);
    }
}

function showResult() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Hoàn thành!</h2>
            <button onclick="location.reload()">Quay lại chọn bài</button>
        </div>
    `;
    document.body.appendChild(modal);
}
