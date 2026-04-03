// Elementos del DOM
const selectionGrid = document.getElementById('selection-grid');
const frequencyList = document.getElementById('frequency-list');
const resultCard = document.getElementById('result-card');
const balanceEl = document.getElementById('balance');
const hitsEl = document.getElementById('hits');
const msgBox = document.getElementById('msg-box');
const selectedCardDisplay = document.getElementById('selected-card-display');
const draw1Btn = document.getElementById('draw-1');
const draw20Btn = document.getElementById('draw-20');

// Estado del juego
let balance = 1000;
let hits = 0;
let selectedCard = null;
let cardFrequencies = Array(21).fill(0); // 1-20
let lastSeen = Array(21).fill(0); // Para calcular multiplicadores
let totalDraws = 0;

// Inicializar selección
function initSelection() {
    selectionGrid.innerHTML = '';
    for (let i = 1; i <= 20; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn-card';
        btn.innerText = i;
        btn.onclick = () => selectCard(i);
        
        // Multiplicador visual si no ha salido en los últimos 10 tiros
        const idleTime = totalDraws - lastSeen[i];
        if (totalDraws > 10 && idleTime > 8) {
            const tag = document.createElement('span');
            tag.className = 'multiplier-tag';
            tag.innerText = idleTime > 15 ? 'x3' : 'x2';
            btn.appendChild(tag);
        }
        
        selectionGrid.appendChild(btn);
    }
}

function selectCard(num) {
    selectedCard = num;
    selectedCardDisplay.innerText = num;
    draw1Btn.disabled = false;
    draw20Btn.disabled = false;
    
    // Actualizar visual de botones
    document.querySelectorAll('.btn-card').forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.innerText) === num) btn.classList.add('selected');
    });
    msgBox.innerText = `Has elegido la carta ${num}. ¿Crees que la suerte está de tu lado?`;
}

function updateFrequencies() {
    frequencyList.innerHTML = '';
    for (let i = 1; i <= 20; i++) {
        const item = document.createElement('div');
        item.className = 'freq-item';
        item.innerHTML = `<span class="freq-num">${i}:</span> ${cardFrequencies[i]}`;
        frequencyList.appendChild(item);
    }
}

function drawCard(isAuto = false) {
    if (balance < 10 && !isAuto) {
        msgBox.innerText = "¡Te has quedado sin fichas!";
        return;
    }

    const result = Math.floor(Math.random() * 20) + 1;
    totalDraws++;
    cardFrequencies[result]++;
    lastSeen[result] = totalDraws;

    if (!isAuto) {
        // Animación solo para tiro individual
        resultCard.classList.remove('hidden');
        resultCard.innerText = result;
        // Reiniciar animación
        resultCard.style.animation = 'none';
        resultCard.offsetHeight; 
        resultCard.style.animation = null;

        if (result === selectedCard) {
            // Calcular premio con multiplicador ficticio
            const idleTime = (totalDraws - 1) - lastSeen[selectedCard];
            let multiplier = 1;
            if (idleTime > 15) multiplier = 3;
            else if (idleTime > 8) multiplier = 2;
            
            const win = 10 * multiplier;
            balance += win;
            hits++;
            msgBox.innerHTML = `¡ACIERTO! Salió el ${result}. <span class="profit">+${win} fichas.</span>`;
        } else {
            balance -= 10;
            msgBox.innerHTML = `Salió el ${result}. <span class="loss">-10 fichas.</span>`;
        }
        updateUI();
    }
    return result;
}

function updateUI() {
    balanceEl.innerText = balance;
    hitsEl.innerText = hits;
    updateFrequencies();
    initSelection(); // Re-renderizar para actualizar multiplicadores visuales
}

draw1Btn.onclick = () => drawCard();

draw20Btn.onclick = () => {
    draw20Btn.disabled = true;
    draw1Btn.disabled = true;
    msgBox.innerText = "Robando 20 cartas rápidamente...";
    
    let count = 0;
    const interval = setInterval(() => {
        const res = drawCard(true);
        if (res === selectedCard) {
            balance += 10;
            hits++;
        } else {
            balance -= 10;
        }
        updateUI();
        count++;
        if (count >= 20) {
            clearInterval(interval);
            draw20Btn.disabled = false;
            draw1Btn.disabled = false;
            msgBox.innerText = "20 robos completados. Observa que las frecuencias no son iguales, pero el azar no favorece a nadie.";
        }
    }, 100);
};

// Inicio
initSelection();
updateFrequencies();