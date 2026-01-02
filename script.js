const input = document.getElementById('tree-input');
const display = document.getElementById('tree-display');

input.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        const h = parseInt(this.value);
        if (isNaN(h) || h < 1) return;
        
        this.value = '';
        display.innerHTML = ''; // Очищаем перед новой елкой
        
        await drawTreeAnimated(h);
    }
});

// Функция для создания цветной звездочки
function getColoredStar() {
    const chance = Math.random();
    if (chance > 0.7) { // 30% шанс, что звездочка будет цветной
        const colorId = Math.floor(Math.random() * 3) + 1;
        return `<span class="star-${colorId}">*</span>`;
    }
    return `<span class="star-default">*</span>`;
}

async function drawTreeAnimated(h) {
    for (let i = 1; i <= h; i++) {
        let row = document.createElement('div');
        let starsStr = '';
        
        for (let j = 0; j < (2 * i - 1); j++) {
            starsStr += getColoredStar();
        }
        
        row.innerHTML = starsStr;
        display.appendChild(row);
        
        // Задержка 100мс для эффекта печати
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Рисуем ствол
    const trunk = document.createElement('div');
    trunk.innerHTML = '<span class="trunk">| |</span>';
    display.appendChild(trunk);
}

// Автофокус на инпут при клике
document.addEventListener('click', () => input.focus());