# Juego 4: ¿La suerte mejora con más intentos?

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
