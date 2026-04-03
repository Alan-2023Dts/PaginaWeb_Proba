// Configuración de la Ruleta
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const balanceEl = document.getElementById('balance');
const currentTotalEl = document.getElementById('current-total');
const profitLossEl = document.getElementById('profit-loss');
const msgBox = document.getElementById('msg-box');
const resultsHistory = document.getElementById('results-history');
const betAmountSelect = document.getElementById('bet-amount');

// Botones de colores
const btnRed = document.getElementById('bet-red');
const btnBlack = document.getElementById('bet-black');
const btnGreen = document.getElementById('bet-green');
const retireBtn = document.getElementById('retire-btn');

let balance = 100;
const initialBalance = 100;
let selectedColor = null;
let isSpinning = false;
let currentRotation = 0;

// Mapeo de la ruleta (37 espacios: 0-36)
// Colores: 0=Verde, Rojos=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36], Negros=[Resto]
const reds = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

// Selección de color
[btnRed, btnBlack, btnGreen].forEach(btn => {
    btn.addEventListener('click', () => {
        if (isSpinning) return;
        
        // Limpiar selección previa
        btnRed.classList.remove('selected');
        btnBlack.classList.remove('selected');
        btnGreen.classList.remove('selected');
        
        // Marcar nuevo
        btn.classList.add('selected');
        selectedColor = btn.id.replace('bet-', '');
        spinBtn.disabled = false;
        msgBox.innerText = `Has seleccionado ${selectedColor.toUpperCase()}. ¡Dale a girar!`;
    });
});

function getResultColor(number) {
    if (number === 0) return 'green';
    return reds.includes(number) ? 'red' : 'black';
}

function updateUI() {
    balanceEl.innerText = balance;
    currentTotalEl.innerText = balance;
    
    const diff = balance - initialBalance;
    profitLossEl.innerText = (diff > 0 ? '+' : '') + diff;
    profitLossEl.className = diff >= 0 ? 'profit' : 'loss';

    if (balance <= -1000) {
        msgBox.innerHTML = "<strong style='color: #f00'>¡DEUDA MÁXIMA ALCANZADA!</strong> El casino ha cerrado tu línea de crédito. Has perdido todo y más.";
        spinBtn.disabled = true;
    }
}

spinBtn.addEventListener('click', () => {
    if (isSpinning || !selectedColor) return;
    
    const betAmount = parseInt(betAmountSelect.value);
    isSpinning = true;
    spinBtn.disabled = true;
    msgBox.innerText = "La ruleta está girando...";

    // Generar resultado (0-36)
    const resultNumber = Math.floor(Math.random() * 37);
    const resultColor = getResultColor(resultNumber);

    // Calcular rotación
    // Cada número ocupa 360/37 = ~9.72 grados
    // Para simplificar la animación visual, giramos varias vueltas + offset
    const extraDegrees = (resultNumber * (360 / 37));
    currentRotation += (360 * 5) + (360 - (currentRotation % 360)) + extraDegrees;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        
        // Procesar resultado
        if (resultColor === selectedColor) {
            const winAmount = betAmount; // Paga 2x (devuelve apuesta + gana lo mismo)
            balance += winAmount;
            msgBox.innerHTML = `¡Cayó el ${resultNumber} (${resultColor.toUpperCase()})! <span class='profit'>Ganaste ${winAmount} fichas.</span>`;
        } else {
            balance -= betAmount;
            msgBox.innerHTML = `Cayó el ${resultNumber} (${resultColor.toUpperCase()}). <span class='loss'>Perdiste ${betAmount} fichas.</span>`;
        }

        // Agregar al historial
        const dot = document.createElement('div');
        dot.className = `res-item res-${resultColor}`;
        dot.innerText = resultNumber;
        resultsHistory.prepend(dot);

        updateUI();
        if (balance > -1000) spinBtn.disabled = false;
    }, 4000);
});

retireBtn.addEventListener('click', () => {
    const diff = balance - initialBalance;
    if (diff > 0) {
        alert(`Te retiras con una ganancia de ${diff} fichas. ¡Tuviste suerte esta vez!`);
    } else if (diff < 0) {
        alert(`Te retiras con una pérdida de ${Math.abs(diff)} fichas. La casa siempre gana a largo plazo.`);
    } else {
        alert("Te retiras tal como viniste. Ni ganaste ni perdiste.");
    }
    window.location.href = "index.html";
});