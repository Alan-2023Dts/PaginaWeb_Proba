# Juego 5: ¿La suerte mejora con más intentos?

## Especificación del Proyecto

### Rol
Actúa como diseñador web y desarrollador full-stack especializado en experiencias educativas interactivas.

### Contexto
Estamos creando una página web para el juego "¿La suerte mejora con más intentos?", cuyo objetivo es enseñar los conceptos de probabilidad repetida y frecuencia esperada mediante una simulación tipo tómbola.

---

## Tarea: Diseño y Desarrollo

### Frontend (UI/UX)

#### Elementos Visuales
- **Visual principal**: Una tómbola o sistema de premio raro con animación
- **Barra de progreso**: Muestra cuántos intentos se han realizado
- **Contador de intentos**: Indica el número de tiros hasta obtener el premio o agotar fichas
- **Animación de recompensa**: Aparece cuando el usuario obtiene el premio
- **Sistema de fichas**: El usuario inicia con 1000 fichas, cada intento cuesta 10 fichas
- **Indicador de probabilidad**: Muestra que cada intento tiene un 5% de probabilidad de éxito
- **Pantalla de resultados**: Evidencia que muchos intentos no garantizan obtener el premio

---

### Backend (Lógica y Procesamiento)

#### Funcionalidades Core
- **Motor de probabilidad**: Calcula el resultado de cada intento con un 5% de probabilidad de éxito
- **Gestión de fichas**: Resta 10 fichas por intento y actualiza el saldo del usuario
- **Registro de intentos**: Guarda cuántos tiros se han hecho y si se obtuvo el premio
- **Sistema de resultados**: Determina si el usuario gana o pierde fichas y muestra estadísticas finales
- **Configuración dinámica**: Permite ajustar parámetros como número inicial de fichas o costo por intento (opcional)
- **Persistencia opcional**: Almacenar resultados de partidas en una base de datos (ej. MongoDB, PostgreSQL)

---

## Restricciones

### Técnicas
- El diseño debe ser **web responsive**, optimizado para navegadores modernos
- Integración en entornos como Visual Studio Code

### Diseño Visual
- **Psicología del color**:
  - **Dorados**: Para premio
  - **Azules**: Para intentos
  - **Rojos**: Para fichas perdidas

### Stack Tecnológico Recomendado
- **Frontend**: React, Vue o Svelte con animaciones fluidas
- **Backend**: Node.js con Express para la API de probabilidad y gestión de fichas
- **Base de datos**: MongoDB o PostgreSQL si se requiere persistencia

---

## Formato Esperado

### Estructura de Secciones

1. **Inicio**
   - Explicación breve del mito y objetivo del juego

2. **Simulación**
   - Tómbola interactiva con barra de progreso
   - Contador de intentos
   - Animación de premio

3. **Resultados**
   - Fichas restantes
   - Intentos realizados
   - Evidencia de que no hay garantía de éxito

4. **Conceptos**
   - Explicación interactiva de probabilidad repetida
   - Frecuencia esperada

---

## Parámetros del Juego

| Parámetro | Valor |
|-----------|-------|
| Fichas iniciales | 1000 |
| Costo por intento | 10 fichas |
| Probabilidad de éxito | 5% (1/20) |
| Intentos máximos | 100 (hasta agotar fichas) |

---

## Objetivo Educativo

Demostrar que:
- Más intentos NO garantizan obtener el premio
- La probabilidad se mantiene constante en cada intento (5%)
- La frecuencia esperada es un promedio estadístico, no una garantía
- Comprender la diferencia entre expectativa matemática y resultado real

---

## Implementación Completada

### ✅ Archivos Creados

1. **juego5.html** (8,532 bytes)
   - Estructura HTML completa con tómbola 3D
   - Panel de estadísticas en tiempo real
   - Modal de fin de juego
   - Sección educativa con 4 conceptos clave

2. **assets/css/juego5.css** (15,441 bytes)
   - Tómbola 3D con perspectiva CSS
   - Animaciones de rotación y rebote
   - Efectos de confetti para premios
   - Diseño responsive para móviles
   - Paleta de colores: Dorado (#FFD700), Azul (#4169E1), Rojo (#DC143C)

3. **assets/js/juego5.js** (13,097 bytes)
   - Motor de probabilidad (5% real con Math.random)
   - Gestión de fichas (1000 iniciales, -10 por intento, +100 por premio)
   - Función girar individual (2s de animación)
   - Función girar múltiple (10 intentos rápidos a 100ms)
   - Sistema de estadísticas dinámicas
   - Modal de fin de juego con análisis personalizado

### 🎯 Características Implementadas

**Funcionalidades Core:**
- ✅ Probabilidad fija del 5% en cada intento
- ✅ Sistema de fichas con validación
- ✅ Animaciones fluidas (tómbola 3D + bola rebotando)
- ✅ Confetti dorado al ganar premio
- ✅ Estadísticas en tiempo real:
  - Fichas restantes
  - Intentos realizados
  - Premios ganados
  - Balance neto
  - Barra de progreso (0-100%)
  - Frecuencia esperada vs real
- ✅ Mensajes educativos dinámicos cada 10 intentos
- ✅ Modal de fin de juego con análisis personalizado

**Diseño Visual:**
- ✅ Tómbola 3D con 4 caras rotativas
- ✅ Bola dorada con efecto glow
- ✅ Badge de probabilidad fijo (5%)
- ✅ Colores según psicología: dorado (premio), azul (intentos), rojo (pérdidas)
- ✅ Responsive design para móviles < 768px

**Interactividad:**
- ✅ Botón "Girar Tómbola" (1 intento)
- ✅ Botón "Girar 10 veces" (simulación rápida)
- ✅ Botón "Reiniciar" (reset completo)
- ✅ Prevención de clicks múltiples durante animación

**Educación:**
- ✅ Sección con 4 conceptos clave
- ✅ Explicación matemática del valor esperado (-4.5 fichas)
- ✅ Desmitificación: "Más intentos ≠ Garantía"

### 🧪 Validación Realizada

- ✅ 19 IDs HTML validados y sincronizados con JavaScript
- ✅ Todas las clases CSS definidas
- ✅ Event listeners conectados correctamente
- ✅ Sin errores de sintaxis (HTML, CSS, JS)
- ✅ Integrado en index.html (card activa)
- ✅ Navegación consistente con otros juegos

### 📐 Stack Tecnológico Final

**Frontend:**
- HTML5 con estructura semántica
- CSS3 con animaciones 3D, gradientes y perspectiva
- JavaScript Vanilla (sin frameworks)

**Diseño:**
- Google Fonts: Montserrat (body) + Playfair Display (headings)
- Variables CSS globales desde style.css
- Diseño responsive con media queries

**Compatibilidad:**
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Optimizado para GitHub Pages
- Sin dependencias externas (npm/node)
