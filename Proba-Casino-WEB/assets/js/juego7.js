const rouletteWheel = document.getElementById('roulette-wheel');
const btnSpin = document.getElementById('btn-spin');
const btnReset = document.getElementById('btn-reset');
const selectedNumberEl = document.getElementById('selected-number');
const resultBanner = document.getElementById('result-banner');
const historyList = document.getElementById('history-list');
const frequencyChartCanvas = document.getElementById('frequency-chart');
const frequencyTable = document.getElementById('frequency-table');

const chipsAmountEl = document.getElementById('chips-amount');
const spinCountEl = document.getElementById('spin-count');
const hitCountEl = document.getElementById('hit-count');
const missCountEl = document.getElementById('miss-count');
const hitRateEl = document.getElementById('hit-rate');
const latestResultEl = document.getElementById('latest-result');
const historyCountEl = document.getElementById('history-count');
const summaryHitsEl = document.getElementById('summary-hits');
const summaryMissesEl = document.getElementById('summary-misses');

const numberButtons = Array.from(document.querySelectorAll('.number-btn'));

const STARTING_CHIPS = 1000;
const TICKET_COST = 10;
const MAX_HISTORY = 30;

const state = {
    chips: STARTING_CHIPS,
    spins: 0,
    hits: 0,
    misses: 0,
    selected: null,
    currentRotation: 0,
    history: [],
    frequency: Array.from({ length: 10 }, () => 0),
    spinning: false,
};

let frequencyChart = null;

function getRelativeFrequency(count) {
    if (state.spins === 0) {
        return 0;
    }

    return (count / state.spins) * 100;
}

function setBanner(text, type = 'neutral') {
    resultBanner.textContent = text;
    resultBanner.classList.remove('hit', 'miss', 'neutral');
    resultBanner.classList.add(type);
}

function selectNumber(number) {
    state.selected = number;
    selectedNumberEl.textContent = number;

    numberButtons.forEach((button) => {
        button.classList.toggle('selected', Number(button.dataset.number) === number);
    });

    btnSpin.disabled = state.spinning || state.chips < TICKET_COST;
    setBanner(`Has elegido el número ${number}. Ahora gira y comprueba si el resultado cambia por el intento anterior.`, 'neutral');
}

function updateButtons() {
    btnSpin.disabled = state.spinning || state.selected === null || state.chips < TICKET_COST;
}

function updateStats() {
    chipsAmountEl.textContent = state.chips;
    spinCountEl.textContent = state.spins;
    hitCountEl.textContent = state.hits;
    missCountEl.textContent = state.misses;

    const hitRate = state.spins === 0 ? 0 : (state.hits / state.spins) * 100;
    hitRateEl.textContent = `${hitRate.toFixed(2)}%`;

    latestResultEl.textContent = state.history[0]?.number ?? '-';
    historyCountEl.textContent = state.history.length;
    summaryHitsEl.textContent = state.hits;
    summaryMissesEl.textContent = state.misses;
}

function updateHistory() {
    historyList.innerHTML = '';

    if (state.history.length === 0) {
        historyList.innerHTML = '<span class="history-placeholder">Todavía no has girado la ruleta.</span>';
        return;
    }

    state.history.forEach((entry) => {
        const pill = document.createElement('div');
        pill.className = `history-item ${entry.hit ? 'hit' : 'miss'}`;
        pill.innerHTML = `
            <span class="number-chip">${entry.number}</span>
            <span>${entry.hit ? 'Acierto' : 'Fallo'}</span>
        `;
        historyList.appendChild(pill);
    });
}

function updateFrequencyTable() {
    frequencyTable.innerHTML = '';

    for (let index = 0; index < 10; index += 1) {
        const number = index + 1;
        const count = state.frequency[index];
        const percentage = getRelativeFrequency(count);

        const row = document.createElement('div');
        row.className = 'freq-row';
        row.innerHTML = `
            <strong>${number}</strong>
            <div class="freq-bar" aria-hidden="true">
                <div class="freq-bar-fill" style="width: ${Math.min(percentage, 100)}%"></div>
            </div>
            <span>${count} (${percentage.toFixed(1)}%)</span>
        `;

        frequencyTable.appendChild(row);
    }
}

function updateChart() {
    if (!window.Chart) {
        return;
    }

    const labels = Array.from({ length: 10 }, (_, index) => `${index + 1}`);
    const values = state.frequency.map((count) => (state.spins === 0 ? 0 : +(count / state.spins * 100).toFixed(2)));

    if (!frequencyChart) {
        frequencyChart = new Chart(frequencyChartCanvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Frecuencia relativa (%)',
                    data: values,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: [
                        '#60a5fa',
                        '#38bdf8',
                        '#22c55e',
                        '#06b6d4',
                        '#93c5fd',
                        '#4f46e5',
                        '#3b82f6',
                        '#14b8a6',
                        '#0ea5e9',
                        '#2563eb',
                    ],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e1dd',
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#e0e1dd',
                        },
                        grid: {
                            color: 'rgba(255,255,255,0.06)',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#e0e1dd',
                            callback: (value) => `${value}%`,
                        },
                        grid: {
                            color: 'rgba(255,255,255,0.06)',
                        },
                    },
                },
            },
        });
        return;
    }

    frequencyChart.data.datasets[0].data = values;
    frequencyChart.update();
}

function refreshDashboard() {
    updateStats();
    updateHistory();
    updateFrequencyTable();
    updateChart();
    updateButtons();
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function rotateWheelTo(number) {
    const segmentAngle = 360 / 10;
    const targetAngle = 360 * 4 + ((10 - number) * segmentAngle) + (segmentAngle / 2);
    state.currentRotation += targetAngle;
    rouletteWheel.style.transform = `rotate(${state.currentRotation}deg)`;
}

function spin() {
    if (state.spinning || state.selected === null || state.chips < TICKET_COST) {
        return;
    }

    state.spinning = true;
    state.chips -= TICKET_COST;
    state.spins += 1;
    rouletteWheel.classList.add('spinning');
    setBanner('La ruleta está girando...', 'neutral');
    updateButtons();
    refreshDashboard();

    const result = getRandomNumber();
    rotateWheelTo(result);

    setTimeout(() => {
        const hit = result === state.selected;

        state.frequency[result - 1] += 1;
        if (hit) {
            state.chips += 10;
            state.hits += 1;
        } else {
            state.misses += 1;
        }

        state.history.unshift({ number: result, hit });
        state.history = state.history.slice(0, MAX_HISTORY);

        setBanner(
            hit
                ? `¡Acierto! Salió el ${result}. Recuperaste tus 10 fichas.`
                : `Salió el ${result}. El tiro fue independiente y perdiste 10 fichas.`,
            hit ? 'hit' : 'miss'
        );

        rouletteWheel.classList.remove('spinning');
        state.spinning = false;
        refreshDashboard();
        updateButtons();
    }, 1800);
}

function resetGame() {
    state.chips = STARTING_CHIPS;
    state.spins = 0;
    state.hits = 0;
    state.misses = 0;
    state.selected = null;
    state.currentRotation = 0;
    state.history = [];
    state.frequency = Array.from({ length: 10 }, () => 0);
    state.spinning = false;

    rouletteWheel.style.transform = 'rotate(0deg)';
    rouletteWheel.classList.remove('spinning');
    selectedNumberEl.textContent = '-';
    numberButtons.forEach((button) => button.classList.remove('selected'));
    setBanner('Elige un número y comprueba que cada tiro es independiente.', 'neutral');
    refreshDashboard();
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (state.spinning) {
            return;
        }

        selectNumber(Number(button.dataset.number));
    });
});

btnSpin.addEventListener('click', spin);
btnReset.addEventListener('click', resetGame);

refreshDashboard();
updateButtons();
setBanner('Elige un número y comprueba que cada tiro es independiente.', 'neutral');
