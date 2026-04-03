# Juego 4: Contagio en el Salón

## Prompt de Desarrollo

**Rol:** Actúa como diseñador web y desarrollador full-stack especializado en experiencias educativas interactivas.

**Contexto:** Estamos creando una página web para el juego "Contagio en el salón", cuyo objetivo es enseñar probabilidad condicional y eventos dependientes mediante una simulación visual del contagio entre personas.

## Tarea: Diseña y desarrolla la página web con las siguientes características:

### Frontend (UI/UX)

- Mapa visual con figuras animadas (personitas) que representan a los participantes.
- Una persona inicia contagiada.
- En cada ronda las figuras se mueven y pueden contagiarse entre sí.
- El usuario selecciona quién cree que se contagiará en la siguiente ronda.
- Panel de configuración para ajustar:
  - Probabilidad de contagio.
  - Número de contactos por ronda.
- Pantalla de resultados con fichas ganadas/perdidas y evolución del contagio.
- Sección educativa con explicación de los conceptos de probabilidad condicional y eventos dependientes.

### Backend (lógica y procesamiento)

- **Motor de simulación:** calcula contagios aleatorios basados en probabilidad y número de contactos.
- **Gestión de rondas:** actualiza el estado de cada persona (sano/contagiado) en cada turno.
- **Sistema de puntuación:** suma o resta fichas según si el usuario acertó o falló su predicción.
- **Configuración dinámica:** recibe parámetros del frontend (probabilidad, número de contactos) y ajusta la simulación.
- **Persistencia opcional:** guardar resultados de partidas en una base de datos (ej. MongoDB, PostgreSQL).

### Restricciones:

- El diseño debe ser web responsive, optimizado para navegadores modernos.
- Usa una psicología del color que comunique alerta y aprendizaje (rojos/naranjas para contagio, verdes para sanos, azules para información).
- **Tecnologías recomendadas:**
  - Frontend: React, Vue o Svelte con animaciones fluidas.
  - Backend: Node.js con Express para la API de simulación.
  - Base de datos: MongoDB o PostgreSQL si se requiere persistencia.
  - Integración en entornos como Visual Studio Code.

### Formato esperado:

Página web con secciones:

1. **Inicio:** explicación breve del mito y objetivo del juego.
2. **Simulación:** mapa visual interactivo y panel de configuración.
3. **Resultados:** fichas ganadas/perdidas y evolución del contagio.
4. **Conceptos:** explicación interactiva de probabilidad condicional y eventos dependientes.

---

## Notas de Implementación

- Mantener consistencia con los juegos anteriores (juego1.html, juego2.html, juego3.html)
- Integrar con el sistema de navegación existente en index.html
- Usar la estructura de assets existente para mantener organización
