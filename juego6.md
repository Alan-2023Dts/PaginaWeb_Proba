# Juego 6: Loot Box Simulator

## Especificación del Proyecto

### Rol
Actúa como diseñador web y desarrollador full-stack especializado en simuladores educativos y juegos probabilísticos.

### Contexto
Estamos creando una página web para el juego "Loot box simulator", cuyo objetivo es demostrar que comprar muchas cajas no garantiza obtener un objeto legendario, enseñando conceptos de probabilidad acumulada y eventos independientes.

---

## Tarea: Diseño y Desarrollo

### Frontend (UI/UX)

#### Elementos Visuales
- **Visual principal**: Sistema de cajas animadas que se abren tipo "gacha" o tómbola
- **Opciones de compra**: 
  - 1 mazo (10 cartas por 10 fichas)
  - 10 mazos (100 cartas por 90 fichas) - descuento de 10 fichas
- **Barra de progreso**: Muestra cuántas cartas han salido de los mazos comprados
- **Contador de intentos**: Indica cuántos mazos se han comprado y cuántas cartas han salido
- **Animación de recompensa**: Aparece al conseguir una carta legendaria
- **Sistema de rarezas**: Las cartas posibles son:
  - **Común**: 70% (gris)
  - **Raro**: 20% (verde)
  - **Épico**: 9% (azul/morado)
  - **Legendario**: 1% (dorado)
- **Sistema de fichas**: El usuario inicia con 1000 fichas
- **Pantalla de resultados**: Fichas restantes, cartas obtenidas, evidencia de que no está garantizado

---

### Backend (Lógica y Procesamiento)

#### Funcionalidades Core
- **Motor de probabilidad**: Calcula el resultado de cada carta según probabilidades definidas
- **Gestión de fichas**: 
  - 1 mazo (10 cartas): 10 fichas
  - 10 mazos (100 cartas): 90 fichas (10% descuento)
- **Registro de intentos**: Guarda cuántos mazos se han comprado y cuántas cartas reveladas
- **Sistema de rarezas**: Asigna automáticamente la categoría (común, raro, épico, legendario)
- **Resultados acumulados**: Estadísticas de cartas obtenidas y probabilidad acumulada
- **Persistencia opcional**: Almacenar partidas (MongoDB, PostgreSQL)

---

## Restricciones

### Técnicas
- El diseño debe ser **web responsive**, optimizado para navegadores modernos
- Integración en entornos como Visual Studio Code

### Diseño Visual
- **Psicología del color**:
  - **Dorado**: Legendario (oro brillante)
  - **Azul/Morado**: Épico (púrpura vibrante)
  - **Verde**: Raro (esmeralda)
  - **Gris**: Común (plateado opaco)

### Stack Tecnológico Recomendado
- **Frontend**: HTML5 + CSS3 + JavaScript Vanilla (consistente con proyecto)
- **Animaciones**: CSS keyframes y transitions
- **Sin frameworks**: Mantener arquitectura del proyecto
- **Base de datos**: Opcional (localStorage para persistencia local)

---

## Formato Esperado

### Estructura de Secciones

1. **Inicio**
   - Explicación breve del mito y objetivo del juego
   - "Comprar más cajas NO garantiza el legendario"

2. **Simulación**
   - Cajas animadas con opciones de compra
   - Barra de progreso
   - Revelación de cartas con animación

3. **Resultados**
   - Fichas restantes
   - Cartas obtenidas por rareza
   - Estadísticas de rarezas

4. **Conceptos**
   - Explicación de probabilidad acumulada
   - Eventos independientes
   - Falacia del jugador aplicada a loot boxes

---

## Parámetros del Juego

| Parámetro | Valor |
|-----------|-------|
| Fichas iniciales | 1000 |
| Costo 1 mazo (10 cartas) | 10 fichas |
| Costo 10 mazos (100 cartas) | 90 fichas |
| Cartas por mazo | 10 |
| **Probabilidades de Rareza** | |
| Común | 70% |
| Raro | 20% |
| Épico | 9% |
| Legendario | 1% |

---

## Objetivo Educativo

Demostrar que:
- Comprar muchas cajas NO garantiza obtener el legendario
- Cada carta tiene probabilidad independiente (1% siempre)
- La probabilidad acumulada aumenta, pero nunca llega a 100%
- El sistema de "descuento" (10 mazos por 90 fichas) no mejora las probabilidades
- Comprender la diferencia entre probabilidad individual y acumulada
- Entender cómo funcionan los sistemas de "gacha" y loot boxes en videojuegos

---

## Implementación Completada

### ✅ Archivos Creados

1. **juego6.html** (12,978 bytes)
   - Loot box 3D animada
   - Botones de compra (1 mazo / 10 mazos con descuento)
   - Grid para visualización de cartas
   - Panel de estadísticas por rareza
   - Tabla de probabilidades esperadas
   - Crítica ética al sistema de loot boxes

2. **assets/css/juego6.css** (16,816 bytes)
   - 4 estilos de rareza (común, raro, épico, legendario)
   - Animaciones: flip de cartas, apertura de caja, partículas
   - Modal legendario espectacular con efectos dorados
   - Diseño responsive para móviles
   - 9 animaciones @keyframes

3. **assets/js/juego6.js** (10,451 bytes)
   - Motor de probabilidad con distribución correcta (70%/20%/9%/1%)
   - Sistema de compra (1 mazo: 10 fichas, 10 mazos: 90 fichas)
   - Cálculo de probabilidad acumulada: P = 1 - (0.99)^n
   - Generación dinámica de cartas con animaciones
   - Modal especial al obtener legendario
   - Efecto de partículas doradas (100 partículas)

### 🎯 Características Implementadas

**Sistema de Rarezas:**
- ✅ Común (70%): Gris #9E9E9E
- ✅ Raro (20%): Verde #4CAF50
- ✅ Épico (9%): Púrpura #9C27B0
- ✅ Legendario (1%): Dorado #FFD700

**Sistema de Compra:**
- ✅ 1 mazo (10 cartas): 10 fichas
- ✅ 10 mazos (100 cartas): 90 fichas (descuento 10%)
- ✅ Validación de fichas antes de compra
- ✅ Prevención de clicks múltiples

**Animaciones:**
- ✅ Apertura de loot box con tapa levantándose
- ✅ Flip 3D de cartas al revelarlas
- ✅ Glow pulsante para cartas legendarias
- ✅ Partículas doradas cayendo (efecto lluvia)
- ✅ Modal legendario con animación espectacular

**Estadísticas:**
- ✅ Fichas restantes (con warning si < 100)
- ✅ Mazos comprados
- ✅ Cartas totales con barra de progreso
- ✅ Contadores por rareza (común, raro, épico, legendario)
- ✅ Probabilidad acumulada dinámica
- ✅ Cálculo en tiempo real

**Educación:**
- ✅ 4 conceptos clave explicados
- ✅ Tabla de probabilidades esperadas (10 a 1000 cartas)
- ✅ Fórmula matemática visible
- ✅ Crítica ética al sistema de loot boxes
- ✅ Explicación de eventos independientes

### 🧪 Validación Realizada

**Validación Automática:**
- ✅ 19 IDs HTML verificados y sincronizados con JavaScript
- ✅ Todas las clases CSS definidas
- ✅ Lógica de probabilidad matemáticamente correcta (100% distribuido)
- ✅ Fórmula de probabilidad acumulada validada
- ✅ Event listeners correctamente conectados
- ✅ Variables CSS del sistema utilizadas
- ✅ 9 animaciones @keyframes definidas
- ✅ Card en index.html activa (sin clase "disabled")
- ✅ Responsive design implementado

**Resultado:** ✅ 100% validado - Sin errores encontrados

### 📐 Stack Tecnológico Final

**Frontend:**
- HTML5 con estructura semántica
- CSS3 con animaciones 3D, gradientes y efectos
- JavaScript Vanilla (sin frameworks)

**Características Técnicas:**
- Variables CSS para colores de rarezas
- Transform 3D para efectos visuales
- Probabilidad acumulada: P(n) = 1 - (0.99)^n
- Grid adaptativo para cartas
- Modal con backdrop blur

**Compatibilidad:**
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsive para móviles < 768px
- Sin dependencias externas

### ⚠️ Mensaje Educativo

El juego incluye una sección crítica que explica:
- Los loot boxes usan mecanismos psicológicos similares al juego de azar
- Pueden llevar a gastos excesivos sin garantía de recompensa
- Son problemáticos cuando se dirigen a menores de edad
- Varios países han regulado o prohibido este sistema
- La probabilidad acumulada crea "falsa esperanza"

---

## Notas de Implementación

### Cálculo de Probabilidad Acumulada

Para **n** intentos con probabilidad **p** = 0.01 (1%):
```
P(al menos 1 legendario en n cartas) = 1 - (1 - p)^n
P(al menos 1 en 100 cartas) = 1 - (0.99)^100 ≈ 63.4%
```

**Importante**: Esto NO significa que "cada 100 cartas sale 1 legendario garantizado".

### Animaciones Sugeridas

1. **Apertura de caja**: Rotación 3D + scale
2. **Revelación de carta**: Flip animation
3. **Carta legendaria**: Glow dorado + partículas brillantes
4. **Compra múltiple**: Animación en secuencia rápida

### Paleta de Colores Específica

- **Común**: #9E9E9E (gris medio)
- **Raro**: #4CAF50 (verde Material Design)
- **Épico**: #9C27B0 (púrpura Material Design)
- **Legendario**: #FFD700 (dorado puro)

---

## Comparación con Juego 5

| Aspecto | Juego 5 (Tómbola) | Juego 6 (Loot Box) |
|---------|-------------------|---------------------|
| Probabilidad objetivo | 5% | 1% (legendario) |
| Sistema de compra | Individual (1 intento) | Mazos (10 o 100 cartas) |
| Costo | 10 fichas/intento | 10 fichas/mazo, 90/10 mazos |
| Rarezas | N/A (solo ganar/perder) | 4 niveles de rareza |
| Mensaje educativo | Frecuencia esperada | Probabilidad acumulada |
| Complejidad | Media | Alta (múltiples rarezas) |
