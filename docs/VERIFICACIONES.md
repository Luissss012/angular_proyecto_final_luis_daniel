# Verificaciones

Fecha: 8 de noviembre de 2026.

| Comprobación | Resultado |
|---|---|
| Instalación de dependencias con npm | Correcta |
| Compilación de producción con npm run build | Correcta |
| Inicio del servidor con npm start | Correcto |
| Petición HTTP local con título y app-root | Correcta |
| Compilación TypeScript de los modelos | Correcta |
| Sintaxis JSON de los ocho catálogos | Correcta |
| Identificadores y códigos de curso únicos | Correctos |
| Referencias de cursos a carreras | Correctas |
| Dos carreras con cuatro cursos cada una | Correcto |

No se ejecutaron pruebas automatizadas de navegador. La comprobación HTTP no verifica distribución visual ni interacción. Los formularios, la persistencia y los respaldos todavía no están implementados y no se consideran verificados.

## Navegación inicial

- npm run build: correcto con los componentes Estudiantes, Inscripciones y Respaldo.
- git diff --check: correcto.
- Rutas configuradas: /estudiantes, /inscripciones y /respaldo; raíz y comodín redirigen a estudiantes.
- Menú con RouterLink, indicador de ruta activa y Flexbox con flex-wrap.
- Interacción, recarga de rutas, historial del navegador y distribución móvil: pendientes de comprobación manual. No se ejecutó una prueba de navegador por falta de permiso de acceso.
