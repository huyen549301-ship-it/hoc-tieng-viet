let allWords = [];

// 1. Tải dữ liệu ngay khi khởi động
async function loadData() {
    try {
        const response = await fetch('data.json');
        allWords = await response.json();
    } catch (error) {
        alert("Lỗi tải dữ liệu: " + error.message);
    }
}
loadData();

let wordQueue = [];
let totalAttempts = 0;

// 2. Hàm bắt đầu bài học
function startLesson(lessonId) {
    if (allWords.length === 0) {
        alert("Đang tải dữ liệu, vui lòng đợi 1 giây rồi bấm lại!");
        return;
    }
    
    // Lọc từ vựng theo ID
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

// 3. Hàm hiển thị câu hỏi
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

// 4. Hàm kiểm tra đáp án
function checkAnswer(selected, correct, btn) {
    totalAttempts++;
    if (selected === correct) {
        btn.style.backgroundColor = "#4CAF50";
        setTimeout(() => { 
            wordQueue.shift(); 
            loadQuestion(); 
        }, 500);
    } else {
        btn.style.backgroundColor = "#f44336";
        setTimeout(() => { btn.style.backgroundColor = "#007bff"; }, 500);
    }
}

// 5. Hàm kết quả
function showResult() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>Hoàn thành!</h2>
        <button onclick="location.reload()">Quay lại chọn bài</button>
    `;
}
