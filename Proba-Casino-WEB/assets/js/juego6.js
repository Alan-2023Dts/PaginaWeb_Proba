const lootBox = document.getElementById('loot-box');
const lootboxMessage = document.getElementById('lootbox-message');
const buyDeck1 = document.getElementById('buy-deck-1');
const buyDeck10 = document.getElementById('buy-deck-10');
const resetGameBtn = document.getElementById('reset-game');
const cardsGrid = document.getElementById('cards-grid');
const legendaryModal = document.getElementById('legendary-modal');
const legendarySummary = document.getElementById('legendary-summary');
const legendaryClose = document.getElementById('legendary-close');
const particlesContainer = document.getElementById('particles-container');

const chipsAmount = document.getElementById('chips-amount');
const decksBought = document.getElementById('decks-bought');
const cardsOpened = document.getElementById('cards-opened');
const cardsCapacity = document.getElementById('cards-capacity');
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const rarityCommon = document.getElementById('rarity-common');
const rarityRare = document.getElementById('rarity-rare');
const rarityEpic = document.getElementById('rarity-epic');
const rarityLegendary = document.getElementById('rarity-legendary');
const accumulatedProbability = document.getElementById('accumulated-probability');
const legendaryOdds = document.getElementById('legendary-odds');

const resultChips = document.getElementById('result-chips');
const resultCards = document.getElementById('result-cards');
const resultLegendary = document.getElementById('result-legendary');
const resultProbability = document.getElementById('result-probability');

const FICHAS_INICIALES = 1000;
const COSTO_MAZO_1 = 10;
const COSTO_MAZO_10 = 90;
const CARTAS_POR_MAZO = 10;
const MAX_CARTAS_VISIBLES = 60;
const PROBABILIDADES = {
    comun: 0.70,
    raro: 0.20,
    epico: 0.09,
    legendario: 0.01,
};

const state = {
    chips: FICHAS_INICIALES,
    decksBought: 0,
    cardsOpened: 0,
    cardsCapacity: 0,
    counters: {
        comun: 0,
        raro: 0,
        epico: 0,
        legendario: 0,
    },
    recentCards: [],
    isOpening: false,
};

function drawRarity() {
    const roll = Math.random();

    if (roll < PROBABILIDADES.legendario) {
        return 'legendario';
    }
    if (roll < PROBABILIDADES.legendario + PROBABILIDADES.epico) {
        return 'epico';
    }
    if (roll < PROBABILIDADES.legendario + PROBABILIDADES.epico + PROBABILIDADES.raro) {
        return 'raro';
    }
    return 'comun';
}

function rarityLabel(rarity) {
    switch (rarity) {
        case 'legendario':
            return 'Legendario';
        case 'epico':
            return 'Épico';
        case 'raro':
            return 'Raro';
        default:
            return 'Común';
    }
}

function rarityIcon(rarity) {
    switch (rarity) {
        case 'legendario':
            return '✨';
        case 'epico':
            return '💎';
        case 'raro':
            return '🔷';
        default:
            return '◼';
    }
}

function accumulatedLegendaryProbability(totalCards) {
    if (totalCards === 0) {
        return 0;
    }

    return (1 - Math.pow(1 - PROBABILIDADES.legendario, totalCards)) * 100;
}

function setMessage(text) {
    lootboxMessage.textContent = text;
}

function updateButtons() {
    const canBuy1 = !state.isOpening && state.chips >= COSTO_MAZO_1;
    const canBuy10 = !state.isOpening && state.chips >= COSTO_MAZO_10;

    buyDeck1.disabled = !canBuy1;
    buyDeck10.disabled = !canBuy10;
}

function updateStats() {
    chipsAmount.textContent = state.chips;
    decksBought.textContent = state.decksBought;
    cardsOpened.textContent = state.cardsOpened;
    cardsCapacity.textContent = state.cardsCapacity;

    const progress = state.cardsCapacity === 0 ? 0 : (state.cardsOpened / state.cardsCapacity) * 100;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
    progressLabel.textContent = state.cardsCapacity === 0
        ? '0/0 cartas compradas'
        : `${state.cardsOpened}/${state.cardsCapacity} cartas reveladas`;

    rarityCommon.textContent = state.counters.comun;
    rarityRare.textContent = state.counters.raro;
    rarityEpic.textContent = state.counters.epico;
    rarityLegendary.textContent = state.counters.legendario;

    const accumulated = accumulatedLegendaryProbability(state.cardsOpened);
    accumulatedProbability.textContent = `${accumulated.toFixed(2)}%`;
    legendaryOdds.textContent = state.cardsOpened === 0
        ? 'Aún no hay cartas abiertas'
        : `Con ${state.cardsOpened} cartas, la probabilidad acumulada es ${accumulated.toFixed(2)}%`;

    resultChips.textContent = state.chips;
    resultCards.textContent = state.cardsOpened;
    resultLegendary.textContent = state.counters.legendario;
    resultProbability.textContent = `${accumulated.toFixed(2)}%`;
}

function renderCard(rarity) {
    const emptyMessage = cardsGrid.querySelector('.empty-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }

    const card = document.createElement('article');
    card.className = `card ${rarity} reveal`;
    card.innerHTML = `
        <div class="card-inner">
            <span class="card-rarity">${rarityLabel(rarity)}</span>
            <span class="card-icon">${rarityIcon(rarity)}</span>
            <span class="card-rarity">Carta #${state.cardsOpened}</span>
        </div>
    `;

    cardsGrid.prepend(card);

    if (cardsGrid.children.length > MAX_CARTAS_VISIBLES) {
        cardsGrid.lastElementChild.remove();
    }
}

function refreshVisibleCards() {
    cardsGrid.innerHTML = '';

    if (state.recentCards.length === 0) {
        cardsGrid.innerHTML = '<p class="empty-message">Aún no has abierto ningún mazo.</p>';
        return;
    }

    state.recentCards.forEach((rarity) => {
        const card = document.createElement('article');
        card.className = `card ${rarity}`;
        card.innerHTML = `
            <div class="card-inner">
                <span class="card-rarity">${rarityLabel(rarity)}</span>
                <span class="card-icon">${rarityIcon(rarity)}</span>
                <span class="card-rarity">Historial</span>
            </div>
        `;
        cardsGrid.appendChild(card);
    });
}

function createParticles() {
    const colors = ['#FFD700', '#FFB703', '#FF8C00', '#FFF3B0'];

    for (let index = 0; index < 60; index += 1) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = '-10px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 0.45}s`;
        particle.style.animationDuration = `${2 + Math.random() * 1.5}s`;
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 4200);
    }
}

function showLegendaryReward(legendaryCount, batchCards) {
    const totalProbability = accumulatedLegendaryProbability(state.cardsOpened).toFixed(2);
    legendarySummary.innerHTML = `
        <p>Se revelaron <strong>${legendaryCount}</strong> carta${legendaryCount > 1 ? 's' : ''} legendaria${legendaryCount > 1 ? 's' : ''} en este mazo.</p>
        <p>Cartas abiertas en esta compra: <strong>${batchCards}</strong></p>
        <p>Total de cartas abiertas: <strong>${state.cardsOpened}</strong></p>
        <p>Probabilidad acumulada actual: <strong>${totalProbability}%</strong></p>
    `;

    legendaryModal.classList.remove('hidden');
    legendaryModal.setAttribute('aria-hidden', 'false');
    createParticles();
}

function finalizePurchase(legendaryCount, batchCards) {
    state.isOpening = false;
    lootBox.classList.remove('opening');

    if (legendaryCount > 0) {
        lootBox.classList.add('legendary-hit');
        setMessage(`¡Encontraste ${legendaryCount} legendario${legendaryCount > 1 ? 's' : ''}! Aun así, la probabilidad individual no cambió.`);
        showLegendaryReward(legendaryCount, batchCards);
        setTimeout(() => {
            lootBox.classList.remove('legendary-hit');
        }, 2400);
    } else {
        setMessage('Compra otro mazo si quieres seguir probando la probabilidad acumulada.');
    }

    updateStats();
    updateButtons();
}

function openDeck(quantity) {
    if (state.isOpening) {
        return;
    }

    const cost = quantity === 10 ? COSTO_MAZO_10 : COSTO_MAZO_1;
    const batchCards = quantity * CARTAS_POR_MAZO;

    if (state.chips < cost) {
        setMessage(`Necesitas ${cost} fichas para comprar ${quantity === 10 ? '10 mazos' : '1 mazo'}.`);
        updateButtons();
        return;
    }

    state.isOpening = true;
    state.chips -= cost;
    state.decksBought += quantity;
    state.cardsCapacity += batchCards;
    lootBox.classList.add('opening');
    setMessage(`Abriendo ${quantity === 10 ? '10 mazos' : '1 mazo'}...`);
    updateStats();
    updateButtons();

    let revealed = 0;
    let legendaryCount = 0;
    const intervalDelay = quantity === 10 ? 28 : 55;

    const timer = setInterval(() => {
        const rarity = drawRarity();

        state.cardsOpened += 1;
        state.counters[rarity] += 1;
        state.recentCards.unshift(rarity);
        state.recentCards = state.recentCards.slice(0, MAX_CARTAS_VISIBLES);
        renderCard(rarity);

        if (rarity === 'legendario') {
            legendaryCount += 1;
        }

        revealed += 1;
        updateStats();

        if (revealed >= batchCards) {
            clearInterval(timer);
            finalizePurchase(legendaryCount, batchCards);
        }
    }, intervalDelay);
}

function resetGame() {
    state.chips = FICHAS_INICIALES;
    state.decksBought = 0;
    state.cardsOpened = 0;
    state.cardsCapacity = 0;
    state.isOpening = false;
    state.counters = {
        comun: 0,
        raro: 0,
        epico: 0,
        legendario: 0,
    };
    state.recentCards = [];

    lootBox.classList.remove('opening', 'legendary-hit');
    legendaryModal.classList.add('hidden');
    legendaryModal.setAttribute('aria-hidden', 'true');
    particlesContainer.innerHTML = '';
    cardsGrid.innerHTML = '<p class="empty-message">Aún no has abierto ningún mazo.</p>';
    setMessage('Compra un mazo para abrir cartas y ver la distribución de rarezas.');
    updateStats();
    updateButtons();
}

buyDeck1.addEventListener('click', () => openDeck(1));
buyDeck10.addEventListener('click', () => openDeck(10));
resetGameBtn.addEventListener('click', resetGame);
legendaryClose.addEventListener('click', () => {
    legendaryModal.classList.add('hidden');
    legendaryModal.setAttribute('aria-hidden', 'true');
});

legendaryModal.addEventListener('click', (event) => {
    if (event.target === legendaryModal) {
        legendaryModal.classList.add('hidden');
        legendaryModal.setAttribute('aria-hidden', 'true');
    }
});

updateStats();
updateButtons();
