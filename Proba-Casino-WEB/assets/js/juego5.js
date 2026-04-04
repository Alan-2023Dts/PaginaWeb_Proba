// ========================================
// JUEGO 5: ¿LA SUERTE MEJORA CON MÁS INTENTOS?
// Tómbola con probabilidad del 5%
// ========================================

// ==================== ELEMENTOS DEL DOM ====================
const tombola = document.getElementById('tombola');
const tombolaInner = tombola.querySelector('.tombola-inner');
const ball = document.getElementById('ball');
const resultMessage = document.getElementById('result-message');
const educationalMsg = document.getElementById('educational-msg');

// Botones
const btnGirar = document.getElementById('btn-girar');
const btnGirar10 = document.getElementById('btn-girar-10');
const btnReset = document.getElementById('btn-reset');

// Estadísticas
const statFichas = document.getElementById('stat-fichas');
const statIntentos = document.getElementById('stat-intentos');
const statPremios = document.getElementById('stat-premios');
const statBalance = document.getElementById('stat-balance');
const progressFill = document.getElementById('progress-fill');
const freqEsperada = document.getElementById('freq-esperada');
const freqReal = document.getElementById('freq-real');

// Modal
const modal = document.getElementById('game-over-modal');
const modalStats = document.getElementById('modal-stats');
const modalMessageText = document.getElementById('modal-message-text');
const modalClose = document.getElementById('modal-close');

// Confetti container
const confettiContainer = document.getElementById('confetti-container');

// ==================== VARIABLES DE ESTADO ====================
const FICHAS_INICIALES = 1000;
const COSTO_INTENTO = 10;
const PREMIO = 100;
const PROBABILIDAD = 0.05; // 5%
const MAX_INTENTOS = 100;

let fichas = FICHAS_INICIALES;
let intentos = 0;
let premiosGanados = 0;
let estaGirando = false;

// ==================== FUNCIONES PRINCIPALES ====================

// Calcular si gana (5% de probabilidad)
function calcularResultado() {
    return Math.random() < PROBABILIDAD;
}

// Actualizar todas las estadísticas en pantalla
function actualizarEstadisticas() {
    // Actualizar fichas
    statFichas.textContent = fichas;
    
    // Cambiar color según fichas restantes
    const fichasCard = document.querySelector('.stat-fichas');
    if (fichas < 100) {
        fichasCard.classList.add('low-balance');
    } else {
        fichasCard.classList.remove('low-balance');
    }
    
    // Actualizar intentos
    statIntentos.textContent = intentos;
    
    // Actualizar barra de progreso
    const progreso = (intentos / MAX_INTENTOS) * 100;
    progressFill.style.width = Math.min(progreso, 100) + '%';
    
    // Actualizar premios ganados
    statPremios.textContent = premiosGanados;
    
    // Actualizar balance (ganancia/pérdida neta)
    const balance = fichas - FICHAS_INICIALES;
    statBalance.textContent = balance > 0 ? `+${balance}` : balance;
    
    // Cambiar color del balance
    statBalance.classList.remove('positive', 'negative');
    if (balance > 0) {
        statBalance.classList.add('positive');
    } else if (balance < 0) {
        statBalance.classList.add('negative');
    }
    
    // Actualizar frecuencia esperada vs real
    const esperada = Math.round(intentos * PROBABILIDAD);
    freqEsperada.textContent = esperada;
    freqReal.textContent = premiosGanados;
    
    // Mensaje educativo dinámico
    if (intentos > 0 && intentos % 10 === 0) {
        const diferencia = premiosGanados - esperada;
        if (diferencia > 0) {
            educationalMsg.textContent = `Has tenido ${diferencia} premio(s) más de lo esperado. ¡Pero recuerda! Esto no significa que la probabilidad haya cambiado. Sigue siendo 5% por intento.`;
        } else if (diferencia < 0) {
            educationalMsg.textContent = `Has tenido ${Math.abs(diferencia)} premio(s) menos de lo esperado. Esto es completamente normal. La probabilidad sigue siendo 5% en cada intento.`;
        } else {
            educationalMsg.textContent = `Tus premios coinciden exactamente con lo esperado. Pero recuerda: esto es solo una coincidencia, no una regla.`;
        }
    }
}

// Mostrar mensaje de resultado
function mostrarResultado(gano) {
    resultMessage.classList.remove('show', 'win', 'lose');
    
    setTimeout(() => {
        if (gano) {
            resultMessage.textContent = '🎉 ¡PREMIO GANADO! +100 fichas';
            resultMessage.classList.add('show', 'win');
        } else {
            resultMessage.textContent = '😞 Sin premio. Intenta de nuevo';
            resultMessage.classList.add('show', 'lose');
        }
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            resultMessage.classList.remove('show');
        }, 3000);
    }, 100);
}

// Animación de premio ganado con confetti
function mostrarPremio() {
    // Añadir clase de premio a tómbola
    tombola.classList.add('premio-ganado');
    
    // Crear confetti
    crearConfetti();
    
    // Remover clase después de 2 segundos
    setTimeout(() => {
        tombola.classList.remove('premio-ganado');
    }, 2000);
}

// Crear efecto confetti
function crearConfetti() {
    const colores = ['#FFD700', '#FFA500', '#FF8C00', '#FFED4E', '#FFF700'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remover confetti después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Girar tómbola (1 intento)
function girarTombola() {
    // Validar que tenga fichas suficientes
    if (fichas < COSTO_INTENTO) {
        mostrarGameOver();
        return;
    }
    
    // Prevenir clicks múltiples
    if (estaGirando) return;
    
    estaGirando = true;
    btnGirar.disabled = true;
    btnGirar10.disabled = true;
    
    // Restar fichas
    fichas -= COSTO_INTENTO;
    intentos++;
    
    // Añadir animaciones
    tombolaInner.classList.add('spinning');
    ball.classList.add('bouncing');
    
    // Calcular resultado después de 2 segundos (duración de animación)
    setTimeout(() => {
        const gano = calcularResultado();
        
        if (gano) {
            fichas += PREMIO;
            premiosGanados++;
            mostrarResultado(true);
            mostrarPremio();
        } else {
            mostrarResultado(false);
        }
        
        // Actualizar estadísticas
        actualizarEstadisticas();
        
        // Remover animaciones
        tombolaInner.classList.remove('spinning');
        ball.classList.remove('bouncing');
        
        // Habilitar botones
        estaGirando = false;
        
        // Verificar si aún tiene fichas
        if (fichas >= COSTO_INTENTO) {
            btnGirar.disabled = false;
            btnGirar10.disabled = false;
        } else {
            mostrarGameOver();
        }
    }, 2000);
}

// Girar múltiples veces (simulación rápida)
function girarMultiple(cantidad) {
    if (fichas < COSTO_INTENTO) {
        mostrarGameOver();
        return;
    }
    
    if (estaGirando) return;
    
    estaGirando = true;
    btnGirar.disabled = true;
    btnGirar10.disabled = true;
    
    let contador = 0;
    let premiosEnRafaga = 0;
    
    const intervalo = setInterval(() => {
        // Verificar si tiene fichas
        if (fichas < COSTO_INTENTO) {
            clearInterval(intervalo);
            estaGirando = false;
            mostrarGameOver();
            return;
        }
        
        // Realizar intento
        fichas -= COSTO_INTENTO;
        intentos++;
        
        const gano = calcularResultado();
        
        if (gano) {
            fichas += PREMIO;
            premiosGanados++;
            premiosEnRafaga++;
        }
        
        // Actualizar estadísticas
        actualizarEstadisticas();
        
        // Animación visual rápida
        tombolaInner.style.transform = `rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * 360}deg)`;
        
        contador++;
        
        // Terminar después de la cantidad especificada o si se quedan sin fichas
        if (contador >= cantidad || fichas < COSTO_INTENTO) {
            clearInterval(intervalo);
            
            // Resetear transformación
            tombolaInner.style.transform = '';
            
            // Mostrar mensaje de resumen
            if (premiosEnRafaga > 0) {
                resultMessage.textContent = `🎉 ¡${premiosEnRafaga} premio(s) ganado(s) en ${contador} intentos!`;
                resultMessage.classList.add('show', 'win');
                mostrarPremio();
            } else {
                resultMessage.textContent = `😞 Sin premios en ${contador} intentos. Sigue intentando.`;
                resultMessage.classList.add('show', 'lose');
            }
            
            setTimeout(() => {
                resultMessage.classList.remove('show');
            }, 3000);
            
            estaGirando = false;
            
            // Habilitar botones si aún tiene fichas
            if (fichas >= COSTO_INTENTO) {
                btnGirar.disabled = false;
                btnGirar10.disabled = false;
            } else {
                mostrarGameOver();
            }
        }
    }, 100); // 100ms por intento (simulación rápida)
}

// Mostrar modal de fin de juego
function mostrarGameOver() {
    // Llenar estadísticas del modal
    const balanceFinal = fichas - FICHAS_INICIALES;
    const porcentajeReal = intentos > 0 ? ((premiosGanados / intentos) * 100).toFixed(2) : 0;
    
    modalStats.innerHTML = `
        <p><strong>Intentos realizados:</strong> ${intentos}</p>
        <p><strong>Premios ganados:</strong> ${premiosGanados}</p>
        <p><strong>Fichas finales:</strong> ${fichas}</p>
        <p><strong>Balance:</strong> <span class="${balanceFinal >= 0 ? 'positive' : 'negative'}">${balanceFinal >= 0 ? '+' : ''}${balanceFinal}</span></p>
        <p><strong>Porcentaje de éxito:</strong> ${porcentajeReal}% (esperado: 5%)</p>
    `;
    
    // Mensaje educativo personalizado
    if (balanceFinal > 0) {
        modalMessageText.textContent = `¡Felicidades! Tuviste suerte esta vez y terminaste con más fichas. Pero recuerda: matemáticamente, el juego favorece a la casa con un valor esperado de -4.5 fichas por intento.`;
    } else if (balanceFinal < 0) {
        modalMessageText.textContent = `Como era de esperarse matemáticamente, perdiste fichas. El valor esperado es de -4.5 fichas por intento, lo que significa que la casa siempre tiene ventaja a largo plazo.`;
    } else {
        modalMessageText.textContent = `Increíble, terminaste exactamente donde empezaste. Esto es raro, pero demuestra la naturaleza aleatoria del juego.`;
    }
    
    // Mostrar modal
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    
    // Deshabilitar botones
    btnGirar.disabled = true;
    btnGirar10.disabled = true;
}

// Reiniciar juego
function reiniciar() {
    // Resetear variables
    fichas = FICHAS_INICIALES;
    intentos = 0;
    premiosGanados = 0;
    estaGirando = false;
    
    // Actualizar interfaz
    actualizarEstadisticas();
    
    // Limpiar mensajes
    resultMessage.classList.remove('show', 'win', 'lose');
    resultMessage.textContent = '';
    
    educationalMsg.textContent = 'Cada intento cuesta 10 fichas. La probabilidad de ganar siempre es 5%, sin importar cuántas veces intentes.';
    
    // Habilitar botones
    btnGirar.disabled = false;
    btnGirar10.disabled = false;
    
    // Ocultar modal
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    
    // Resetear transformación de tómbola
    tombolaInner.style.transform = '';
    tombolaInner.classList.remove('spinning');
    ball.classList.remove('bouncing');
    tombola.classList.remove('premio-ganado');
}

// ==================== EVENT LISTENERS ====================
btnGirar.addEventListener('click', girarTombola);
btnGirar10.addEventListener('click', () => girarMultiple(10));
btnReset.addEventListener('click', reiniciar);
modalClose.addEventListener('click', reiniciar);

// Cerrar modal al hacer click fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        reiniciar();
    }
});

// ==================== INICIALIZACIÓN ====================
// Actualizar estadísticas iniciales
actualizarEstadisticas();
