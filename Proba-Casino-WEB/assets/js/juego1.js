// Elementos del DOM
const coin = document.getElementById('coin');
const toss1Btn = document.getElementById('toss-1');
const toss20Btn = document.getElementById('toss-20');
const resetBtn = document.getElementById('reset');
const headsBtn = document.getElementById('btn-heads');
const tailsBtn = document.getElementById('btn-tails');
const historyList = document.getElementById('history-list');
const educationalMsg = document.getElementById('educational-msg');

// Estadísticas
const statWins = document.getElementById('stat-wins');
const statHeads = document.getElementById('stat-heads');
const statTails = document.getElementById('stat-tails');
const barHeads = document.getElementById('bar-heads');
const barTails = document.getElementById('bar-tails');

let headsCount = 0;
let tailsCount = 0;
let winsCount = 0;
let totalCount = 0;
let userSelection = 'heads'; // Por defecto Cara

// Cambiar selección del usuario
headsBtn.addEventListener('click', () => {
    userSelection = 'heads';
    headsBtn.classList.add('active');
    tailsBtn.classList.remove('active');
});

tailsBtn.addEventListener('click', () => {
    userSelection = 'tails';
    tailsBtn.classList.add('active');
    headsBtn.classList.remove('active');
});

// Función de lanzamiento
function tossCoin() {
    return Math.random() < 0.5 ? 'heads' : 'tails';
}

// Actualizar Interfaz
function updateStats() {
    totalCount = headsCount + tailsCount;
    statHeads.innerText = headsCount;
    statTails.innerText = tailsCount;
    statWins.innerText = winsCount;

    if (totalCount > 0) {
        const headsPerc = (headsCount / totalCount) * 100;
        const tailsPerc = (tailsCount / totalCount) * 100;
        barHeads.style.width = headsPerc + '%';
        barTails.style.width = tailsPerc + '%';
    }

    // Mensaje educativo dinámico
    if (totalCount % 5 === 0 && totalCount > 0) {
        educationalMsg.innerText = `Llevas ${totalCount} lanzamientos. Observa cómo, a largo plazo, los porcentajes tienden a equilibrarse al 50%. Cada tiro es INDEPENDIENTE.`;
    }
}

function addToHistory(result) {
    if (historyList.querySelector('.empty-msg')) {
        historyList.innerHTML = '';
    }
    const item = document.createElement('div');
    item.className = `history-item ${result === 'heads' ? 'h-heads' : 'h-tails'}`;
    item.innerText = result === 'heads' ? 'C' : 'X';
    historyList.prepend(item); // Mostrar el más reciente primero
}

// Lógica de Lanzar 1 vez
toss1Btn.addEventListener('click', () => {
    toss1Btn.disabled = true;
    const result = tossCoin();
    
    // Animación
    coin.classList.remove('flip-heads', 'flip-tails');
    void coin.offsetWidth; // Trigger reflow
    coin.classList.add(result === 'heads' ? 'flip-heads' : 'flip-tails');

    setTimeout(() => {
        if (result === 'heads') headsCount++;
        else tailsCount++;

        if (result === userSelection) winsCount++;

        addToHistory(result);
        updateStats();
        toss1Btn.disabled = false;
    }, 2000); // Coincide con la duración de la animación CSS
});

// Lógica de Lanzar 20 veces (Simulación rápida)
toss20Btn.addEventListener('click', () => {
    toss20Btn.disabled = true;
    educationalMsg.innerText = "Simulando 20 lanzamientos rápidos...";

    let count = 0;
    const interval = setInterval(() => {
        const result = tossCoin();
        if (result === 'heads') headsCount++;
        else tailsCount++;
        
        // En simulación rápida, asumimos que el usuario mantiene su elección
        if (result === userSelection) winsCount++;

        addToHistory(result);
        updateStats();

        count++;
        if (count >= 20) {
            clearInterval(interval);
            toss20Btn.disabled = false;
            educationalMsg.innerText = "Simulación completada. Fíjate que aunque haya rachas, la probabilidad no cambia.";
        }
    }, 100);
});

// Reiniciar
resetBtn.addEventListener('click', () => {
    headsCount = 0;
    tailsCount = 0;
    winsCount = 0;
    totalCount = 0;
    historyList.innerHTML = '<p class="empty-msg">No hay lanzamientos aún</p>';
    updateStats();
    barHeads.style.width = '50%';
    barTails.style.width = '50%';
    educationalMsg.innerText = "Simulador reiniciado. ¡Prueba de nuevo!";
    coin.style.transform = "rotateY(0)";
    coin.classList.remove('flip-heads', 'flip-tails');
});