let allWords = [];
let wordQueue = [];
let totalAttempts = 0;
let correctAttempts = 0;

// 1. Tải dữ liệu
async function loadData() {
    try {
        const response = await fetch('data.json');
        allWords = await response.json();
    } catch (e) { alert("Lỗi tải file data.json"); }
}
loadData();

// 2. Bắt đầu bài học
function startLesson(lessonId) {
    wordQueue = allWords.filter(w => w.lesson_id === lessonId).sort(() => Math.random() - 0.5);
    if(wordQueue.length === 0) { alert("Bài học chưa có dữ liệu!"); return; }
    
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    totalAttempts = 0;
    correctAttempts = 0;
    loadQuestion();
}

// 3. Tải câu hỏi
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

// 4. Kiểm tra đáp án (Nếu sai, đưa từ đó xuống cuối danh sách)
function checkAnswer(selected, correct, btn) {
    totalAttempts++;
    if (selected === correct) {
        correctAttempts++;
        btn.style.backgroundColor = "#4CAF50"; // Màu xanh
        // Trả lời đúng: Xóa từ khỏi hàng đợi và tải câu tiếp theo
        setTimeout(() => { 
            wordQueue.shift(); 
            loadQuestion(); 
        }, 500);
    } else {
        btn.style.backgroundColor = "#f44336"; // Màu đỏ
        // Trả lời sai: Đưa từ hiện tại xuống cuối hàng đợi
        const wrongWord = wordQueue.shift(); 
        wordQueue.push(wrongWord); 
        
        setTimeout(() => { 
            btn.style.backgroundColor = "#007bff"; 
            loadQuestion(); // Tải lại câu tiếp theo (lúc này từ sai đã nằm ở cuối)
        }, 500);
    }
}

// 5. Hiển thị bảng kết quả
function showResult() {
    const percent = Math.round((correctAttempts / totalAttempts) * 100);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Hoàn thành!</h2>
            <p>Khả năng ghi nhớ: <b>${percent}%</b></p>
            <button onclick="location.reload()">Quay lại chọn bài</button>
        </div>
    `;
    document.body.appendChild(modal);
}
