// ===================================
// JUEGO 4: CONTAGIO EN EL SALÓN
// Motor de simulación de contagio
// ===================================

// Estado del juego
const gameState = {
    people: [],
    round: 0,
    balance: 1000,
    hits: 0,
    misses: 0,
    selectedPersonId: null,
    isSimulationRunning: false,
    config: {
        contagionProb: 50,
        contactCount: 2,
        peopleCount: 10
    },
    history: []
};

// Clase Persona
class Person {
    constructor(id, x, y, isInfected = false) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.isInfected = isInfected;
        this.element = null;
        this.velocityX = (Math.random() - 0.5) * 2;
        this.velocityY = (Math.random() - 0.5) * 2;
    }

    render(container) {
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.className = 'person';
            this.element.dataset.personId = this.id;
            container.appendChild(this.element);

            // Event listener para seleccionar persona
            this.element.addEventListener('click', () => {
                if (!this.isInfected && gameState.isSimulationRunning) {
                    selectPerson(this.id);
                }
            });
        }

        this.updateClass();
        this.updatePosition();
    }

    updateClass() {
        if (!this.element) return;
        
        this.element.className = 'person';
        
        if (this.isInfected) {
            this.element.classList.add('infected');
        } else {
            this.element.classList.add('healthy');
        }

        if (this.id === gameState.selectedPersonId) {
            this.element.classList.add('selected');
        }
    }

    updatePosition() {
        if (!this.element) return;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    move(containerWidth, containerHeight) {
        const personSize = 40;
        
        // Actualizar posición
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Rebotar en los bordes
        if (this.x <= 0 || this.x >= containerWidth - personSize) {
            this.velocityX *= -1;
            this.x = Math.max(0, Math.min(containerWidth - personSize, this.x));
        }

        if (this.y <= 0 || this.y >= containerHeight - personSize) {
            this.velocityY *= -1;
            this.y = Math.max(0, Math.min(containerHeight - personSize, this.y));
        }

        this.updatePosition();
    }

    distance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setupControls();
    updateUI();
});

// Configurar controles
function setupControls() {
    // Sliders de configuración
    const probSlider = document.getElementById('contagion-prob');
    const contactSlider = document.getElementById('contact-count');
    const peopleSlider = document.getElementById('people-count');

    probSlider.addEventListener('input', (e) => {
        gameState.config.contagionProb = parseInt(e.target.value);
        document.getElementById('prob-value').textContent = `${e.target.value}%`;
    });

    contactSlider.addEventListener('input', (e) => {
        gameState.config.contactCount = parseInt(e.target.value);
        document.getElementById('contact-value').textContent = e.target.value;
    });

    peopleSlider.addEventListener('input', (e) => {
        gameState.config.peopleCount = parseInt(e.target.value);
        document.getElementById('people-value').textContent = e.target.value;
    });

    // Botones
    document.getElementById('start-btn').addEventListener('click', startSimulation);
    document.getElementById('next-round-btn').addEventListener('click', nextRound);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
}

// Iniciar simulación
function startSimulation() {
    const room = document.getElementById('room-canvas');
    const roomWidth = room.offsetWidth;
    const roomHeight = room.offsetHeight;
    const personSize = 40;

    // Limpiar personas existentes
    room.innerHTML = '';
    gameState.people = [];
    gameState.round = 0;
    gameState.selectedPersonId = null;

    // Crear personas
    for (let i = 0; i < gameState.config.peopleCount; i++) {
        const x = Math.random() * (roomWidth - personSize);
        const y = Math.random() * (roomHeight - personSize);
        const isInfected = (i === 0); // Primera persona contagiada
        const person = new Person(i, x, y, isInfected);
        person.render(room);
        gameState.people.push(person);
    }

    gameState.isSimulationRunning = true;
    document.getElementById('start-btn').disabled = true;
    document.getElementById('next-round-btn').disabled = false;

    // Iniciar animación de movimiento
    startMovement();

    updateUI();
    showMessage('¡Simulación iniciada! Selecciona una persona sana para predecir quién se contagiará.', 'info');
}

// Movimiento continuo
let movementInterval;
function startMovement() {
    if (movementInterval) clearInterval(movementInterval);
    
    const room = document.getElementById('room-canvas');
    const roomWidth = room.offsetWidth;
    const roomHeight = room.offsetHeight;

    movementInterval = setInterval(() => {
        if (gameState.isSimulationRunning) {
            gameState.people.forEach(person => {
                person.move(roomWidth, roomHeight);
            });
        }
    }, 50);
}

// Seleccionar persona para predicción
function selectPerson(personId) {
    const person = gameState.people.find(p => p.id === personId);
    
    if (!person || person.isInfected) {
        showMessage('Solo puedes seleccionar personas sanas.', 'warning');
        return;
    }

    gameState.selectedPersonId = personId;
    
    // Actualizar clases
    gameState.people.forEach(p => p.updateClass());
    
    // Actualizar display
    document.getElementById('selected-person').textContent = `Persona #${personId}`;
    showMessage(`Has seleccionado a la Persona #${personId}. ¡Haz clic en "Siguiente Ronda" para ver si aciertas!`, 'success');
}

// Siguiente ronda
function nextRound() {
    if (!gameState.isSimulationRunning) return;

    gameState.round++;

    // Pausar movimiento temporalmente
    const room = document.getElementById('room-canvas');
    
    // Simular contagios
    const newInfections = simulateContagion();
    
    // Verificar predicción
    const selectedPerson = gameState.people.find(p => p.id === gameState.selectedPersonId);
    let roundResult = {
        round: gameState.round,
        prediction: gameState.selectedPersonId,
        newInfections: newInfections.map(p => p.id),
        correct: false,
        reward: 0
    };

    if (gameState.selectedPersonId !== null && selectedPerson) {
        if (newInfections.some(p => p.id === gameState.selectedPersonId)) {
            // ¡Acierto!
            gameState.hits++;
            gameState.balance += 100;
            roundResult.correct = true;
            roundResult.reward = 100;
            showMessage('¡Correcto! ¡Has ganado 100 fichas! 🎉', 'success');
        } else {
            // Fallo
            gameState.misses++;
            gameState.balance -= 50;
            roundResult.reward = -50;
            showMessage('Incorrecto. Has perdido 50 fichas. 😔', 'error');
        }
    } else {
        roundResult.prediction = null;
    }

    // Aplicar contagios con animación
    newInfections.forEach(person => {
        person.isInfected = true;
        person.element.classList.add('just-infected');
        setTimeout(() => {
            person.updateClass();
            person.element.classList.remove('just-infected');
        }, 800);
    });

    // Guardar en historial
    gameState.history.unshift(roundResult);

    // Resetear selección
    gameState.selectedPersonId = null;

    // Verificar fin del juego
    const allInfected = gameState.people.every(p => p.isInfected);
    if (allInfected) {
        endSimulation();
        return;
    }

    updateUI();
}

// Simular contagio basado en probabilidad y contactos
function simulateContagion() {
    const infected = gameState.people.filter(p => p.isInfected);
    const healthy = gameState.people.filter(p => !p.isInfected);
    const newInfections = [];
    const contactThreshold = 80; // Distancia para considerar "contacto"

    healthy.forEach(healthyPerson => {
        let contactCount = 0;

        // Contar contactos con infectados
        infected.forEach(infectedPerson => {
            const distance = healthyPerson.distance(infectedPerson);
            if (distance < contactThreshold) {
                contactCount++;
            }
        });

        // Si hay contactos y cumple con el límite de contactos configurado
        if (contactCount > 0 && contactCount <= gameState.config.contactCount) {
            // Aplicar probabilidad de contagio
            const random = Math.random() * 100;
            if (random < gameState.config.contagionProb) {
                newInfections.push(healthyPerson);
            }
        }
    });

    return newInfections;
}

// Finalizar simulación
function endSimulation() {
    gameState.isSimulationRunning = false;
    document.getElementById('next-round-btn').disabled = true;
    
    clearInterval(movementInterval);

    const finalBalance = gameState.balance;
    const profit = finalBalance - 1000;
    
    let message = `¡Simulación terminada! Todas las personas están contagiadas. `;
    if (profit > 0) {
        message += `¡Ganaste ${profit} fichas! 🎊`;
    } else if (profit < 0) {
        message += `Perdiste ${Math.abs(profit)} fichas. 😢`;
    } else {
        message += `Quedaste igual. 😐`;
    }

    showMessage(message, 'info');
    updateUI();
}

// Reiniciar juego
function resetGame() {
    clearInterval(movementInterval);
    
    const room = document.getElementById('room-canvas');
    room.innerHTML = '';
    
    gameState.people = [];
    gameState.round = 0;
    gameState.balance = 1000;
    gameState.hits = 0;
    gameState.misses = 0;
    gameState.selectedPersonId = null;
    gameState.isSimulationRunning = false;
    gameState.history = [];

    document.getElementById('start-btn').disabled = false;
    document.getElementById('next-round-btn').disabled = true;

    updateUI();
    showMessage('Juego reiniciado. Configura los parámetros y da clic en "Iniciar Simulación".', 'info');
}

// Actualizar interfaz
function updateUI() {
    document.getElementById('balance').textContent = gameState.balance;
    document.getElementById('round-count').textContent = gameState.round;
    document.getElementById('hits').textContent = gameState.hits;
    document.getElementById('misses').textContent = gameState.misses;

    const infectedCount = gameState.people.filter(p => p.isInfected).length;
    document.getElementById('infected-count').textContent = infectedCount;

    // Actualizar selección
    if (gameState.selectedPersonId === null) {
        document.getElementById('selected-person').textContent = 'Ninguna seleccionada';
    }

    // Actualizar historial
    updateHistory();
}

// Actualizar historial de rondas
function updateHistory() {
    const historyContainer = document.getElementById('round-history');
    historyContainer.innerHTML = '';

    if (gameState.history.length === 0) {
        historyContainer.innerHTML = '<p style="color: #94a3b8; text-align: center;">No hay historial aún.</p>';
        return;
    }

    gameState.history.forEach(record => {
        const item = document.createElement('div');
        item.className = 'round-item';
        
        if (record.prediction === null) {
            item.classList.add('no-prediction');
        } else if (record.correct) {
            item.classList.add('correct');
        } else {
            item.classList.add('incorrect');
        }

        let predictionText = record.prediction !== null ? 
            `Predicción: Persona #${record.prediction}` : 
            'Sin predicción';
        
        let resultText = record.correct ? 
            `✅ ¡Correcto! +${record.reward} fichas` : 
            `❌ Incorrecto ${record.reward} fichas`;

        if (record.prediction === null) {
            resultText = 'No se hizo predicción';
        }

        item.innerHTML = `
            <div class="round-title">Ronda ${record.round}</div>
            <div class="round-details">
                ${predictionText}<br>
                Nuevos contagios: ${record.newInfections.length > 0 ? 
                    record.newInfections.map(id => `#${id}`).join(', ') : 
                    'Ninguno'}<br>
                ${resultText}
            </div>
        `;

        historyContainer.appendChild(item);
    });
}

// Mostrar mensaje
function showMessage(text, type = 'info') {
    const msgBox = document.getElementById('msg-box');
    msgBox.textContent = text;
    
    // Remover clases previas
    msgBox.className = 'info-bubble';
    
    // Añadir clase según tipo
    if (type === 'success') {
        msgBox.style.background = 'rgba(16, 185, 129, 0.2)';
        msgBox.style.borderColor = '#10b981';
    } else if (type === 'error') {
        msgBox.style.background = 'rgba(239, 68, 68, 0.2)';
        msgBox.style.borderColor = '#ef4444';
    } else if (type === 'warning') {
        msgBox.style.background = 'rgba(251, 191, 36, 0.2)';
        msgBox.style.borderColor = '#fbbf24';
    } else {
        msgBox.style.background = '';
        msgBox.style.borderColor = '';
    }
}
