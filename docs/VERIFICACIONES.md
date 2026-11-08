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

No se ejecutaron pruebas automatizadas de navegador. La comprobación HTTP no verifica distribución visual ni interacción. Los formularios y los respaldos todavía no están implementados y no se consideran verificados. La persistencia se comprobó de forma aislada como se detalla a continuación.

## Navegación inicial

- npm run build: correcto con los componentes Estudiantes, Inscripciones y Respaldo.
- git diff --check: correcto.
- Rutas configuradas: /estudiantes, /inscripciones y /respaldo; raíz y comodín redirigen a estudiantes.
- Menú con RouterLink, indicador de ruta activa y Flexbox con flex-wrap.
- Interacción, recarga de rutas, historial del navegador y distribución móvil: pendientes de comprobación manual. No se ejecutó una prueba de navegador por falta de permiso de acceso.

## Servicios de catálogos y almacenamiento

- npm run build: correcto.
- Comprobaciones aisladas con almacenamiento en memoria: inicio vacío sin escritura, persistencia entre instancias, cambios no guardados sin efecto, conservación de ambas colecciones, bloqueo de referencias inexistentes y códigos duplicados.
- JSON dañado, versión incompatible y campos incompletos: rechazan lectura y escritura sin reemplazar el contenido existente.
- Fallas simuladas de acceso y cuota de almacenamiento: comunican el error y conservan el valor anterior.
- HttpClient simulado: los ocho métodos solicitan las rutas JSON correspondientes y devuelven su resultado observable. No equivale a una prueba de peticiones reales en navegador.
- No se modificaron datos reales del navegador. La integración con formularios y los mensajes en pantalla sigue pendiente.
