const output = document.getElementById('output');
const promptText = document.getElementById('prompt-text');
const inputContainer = document.getElementById('input-container');
const input = document.getElementById('tree-input');
const userInputDisplay = document.getElementById('user-input-display');
const display = document.getElementById('tree-display');

// 1. Эффект печати текста
async function typeWriter(text, element, speed = 40) {
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await new Promise(res => setTimeout(res, speed));
    }
}

// 2. Инициализация терминала
async function init() {
    await typeWriter("C:\\SYSTEM\\2026> LOADING_HOLIDAY_PROTOCOL...", output);
    await new Promise(res => setTimeout(res, 600));
    
    inputContainer.style.display = "flex";
    await typeWriter("ENTER TREE HEIGHT: ", promptText);
    input.focus();
}

// 3. Синхронизация ввода и курсора
input.addEventListener('input', () => {
    userInputDisplay.textContent = input.value;
});

// 4. Обработка Enter
input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const h = parseInt(input.value);
        display.innerHTML = '';
        if (isNaN(h) || h < 1 || h > 20) {
            input.value = '';
            userInputDisplay.textContent = '';
            const errorMsg = document.createElement('div');
            errorMsg.style.color = '#ff3333'; 
            display.appendChild(errorMsg);
            await typeWriter("ERROR: INVALID_HEIGHT. RANGE_REQUIRED: 1-20", errorMsg, 30);
            return;
        }
        input.value = '';
        userInputDisplay.textContent = '';
        
        const loadingMsg = document.createElement('div');
        display.appendChild(loadingMsg);
        await typeWriter("GENERATING_HOLIDAY_TREE...", loadingMsg, 30);
        
        await new Promise(res => setTimeout(res, 500));
        display.innerHTML = '';
        await drawTree(h);
    }
});

// 5. Функция создания цветной звезды
function getStar() {
    const r = Math.random();
    if (r > 0.8) return `<span class="star-1">*</span>`;
    if (r > 0.6) return `<span class="star-2">*</span>`;
    if (r > 0.4) return `<span class="star-3">*</span>`;
    return `<span class="star-default">*</span>`;
}

// 6. Анимация елки
async function drawTree(h) {
    const topStar = document.createElement('div');
    topStar.innerHTML = '<span class="star-2">★</span>'; 
    display.appendChild(topStar);
    await new Promise(res => setTimeout(res, 200));

    for (let i = 1; i <= h; i++) {
        let row = document.createElement('div');
        let content = '';
        for (let j = 0; j < (2 * i - 1); j++) {
            content += getStar();
        }
        row.innerHTML = content;
        display.appendChild(row);
        await new Promise(res => setTimeout(res, 70));
    }

    const trunk = document.createElement('div');
    trunk.innerHTML = '<span class="trunk">| |</span>';
    display.appendChild(trunk);
}


// Фокус при клике
document.addEventListener('click', () => input.focus());
window.onload = init;