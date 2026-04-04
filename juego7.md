# Juego 7: ¿Qué número saldrá?

## Especificación del Proyecto

### Rol
Actúa como diseñador web y desarrollador full-stack especializado en simuladores educativos de probabilidad.

### Contexto
Estamos creando una página web para el juego "¿Qué número saldrá?", cuyo objetivo es mostrar que los números en una ruleta son aleatorios y que los patrones percibidos no existen. El juego enseña los conceptos de aleatoriedad y frecuencia relativa.

---

## Tarea: Diseño y Desarrollo

### Frontend (UI/UX)

#### Elementos Visuales
- **Visual principal**: Ruleta animada con números del 1 al 10
- **Interacción**: El jugador predice qué número saldrá en el siguiente tiro
- **Gráfico de resultados**: Muestra los números obtenidos tras cada tiro
- **Historial**:
  - Números que han salido
  - Veces que el usuario acertó
  - Veces que el usuario falló
- **Sistema de fichas**:
  - El usuario inicia con 1000 fichas
  - Cada tiro cuesta 10 fichas
  - Cada acierto devuelve 10 fichas
  - Cada error resta 10 fichas
- **Pantalla de resultados**: Evidencia que no existen patrones garantizados en la ruleta

---

### Backend (Lógica y Procesamiento)

#### Funcionalidades Core
- **Motor de aleatoriedad**: Genera un número aleatorio entre 1 y 10 en cada tiro
- **Gestión de fichas**: Resta o suma fichas según el resultado del intento
- **Registro de historial**: Guarda los números obtenidos, aciertos y errores del usuario
- **Sistema de estadísticas**: Calcula frecuencia relativa de cada número y muestra la distribución
- **Persistencia opcional**: Almacenar partidas y resultados en una base de datos (ej. MongoDB, PostgreSQL)

---

## Restricciones

### Técnicas
- El diseño debe ser **web responsive**, optimizado para navegadores modernos
- Integración en entornos como Visual Studio Code

### Diseño Visual
- **Psicología del color**:
  - **Rojos**: Para fallos
  - **Verdes**: Para aciertos
  - **Azules**: Para números

### Stack Tecnológico Recomendado
- **Frontend**: HTML5 + CSS3 + JavaScript Vanilla
- **Animaciones**: CSS keyframes, transitions y Chart.js para visualizaciones
- **Sin frameworks**: Mantener la estructura general del proyecto
- **Base de datos**: Opcional (localStorage para persistencia local)

---

## Formato Esperado

### Estructura de Secciones

1. **Inicio**
   - Explicación breve del mito y objetivo del juego

2. **Simulación**
   - Ruleta animada
   - Predicción del jugador
   - Sistema de fichas

3. **Resultados**
   - Historial de números
   - Aciertos y fallos
   - Gráfico de frecuencia relativa

4. **Conceptos**
   - Explicación de aleatoriedad
   - Frecuencia relativa
   - Ilusión de patrones en secuencias cortas

---

## Parámetros del Juego

| Parámetro | Valor |
|-----------|-------|
| Fichas iniciales | 1000 |
| Costo por tiro | 10 fichas |
| Acierto | +10 fichas |
| Error | -10 fichas |
| Probabilidad por número | 10% |
| Números posibles | 1 al 10 |

---

## Objetivo Educativo

Demostrar que:
- Cada tiro es independiente
- No existe un patrón garantizado en una secuencia aleatoria
- La frecuencia relativa describe tendencias, no certezas
- El resultado anterior no cambia la probabilidad del siguiente

---

## Implementación Completada

### ✅ Archivos Creados

1. **juego7.html**
   - Ruleta visual con números del 1 al 10
   - Selector de predicción
   - Sistema de fichas y resultados
   - Sección educativa con conceptos clave
   - Área de gráficos y frecuencia relativa

2. **assets/css/juego7.css**
   - Estilos responsive para el layout del juego
   - Animación de ruleta
   - Estados visuales para aciertos y fallos
   - Paneles para historial, estadísticas y gráficos

3. **assets/js/juego7.js**
   - Motor de aleatoriedad 1–10
   - Gestión de fichas y resultados
   - Historial de tiros y aciertos/fallos
   - Cálculo de frecuencia relativa
   - Integración con Chart.js para el gráfico

### 🎯 Características Implementadas

**Funcionalidades Core:**
- ✅ Ruleta de números del 1 al 10
- ✅ Predicción del jugador antes de cada tiro
- ✅ Sistema de fichas con costo y devolución por resultado
- ✅ Historial visual de resultados
- ✅ Contador de aciertos y fallos
- ✅ Gráfico de frecuencia relativa

**Diseño Visual:**
- ✅ Psicología del color aplicada
- ✅ Animaciones fluidas para la ruleta
- ✅ Layout responsive para móviles y escritorio
- ✅ Secciones educativas y de resultados

**Educación:**
- ✅ Aleatoriedad explicada de forma visual
- ✅ Frecuencia relativa mostrada en tiempo real
- ✅ Mensaje educativo sobre patrones ilusorios

### 🧪 Validación Realizada

- ✅ Estructura HTML alineada con el proyecto
- ✅ IDs sincronizados con JavaScript
- ✅ Estilos CSS ajustados al sistema visual general
- ✅ Juego integrado en `index.html`
- ✅ Sin conflictos con los demás juegos

### 📐 Stack Tecnológico Final

**Frontend:**
- HTML5 con estructura semántica
- CSS3 con animaciones y diseño responsive
- JavaScript Vanilla con Chart.js

**Compatibilidad:**
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Optimizado para GitHub Pages
- Sin dependencias innecesarias

