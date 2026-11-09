# Servicios de datos

## CatalogosService

Lee los ocho JSON de assets/catalogos con HttpClient. Cada método devuelve un Observable y la pantalla se suscribe al resultado o error. provideHttpClient en app.config.ts habilita las peticiones. Los archivos estáticos no se modifican desde la aplicación.

## AlmacenamientoService

Concentra el acceso a localStorage bajo una clave única, umes-inscripciones. obtenerDatos devuelve version, estudiantes e inscripciones en una sola lectura. Las operaciones de alta, edición y eliminación leen el estado vigente, comprueban la estructura y persisten el conjunto sin borrar previamente el estado anterior. Las consultas devuelven objetos obtenidos de JSON, no referencias compartidas al almacenamiento.

Comprueba identificadores y códigos únicos, tipos básicos y relaciones con estudiantes. Bloquea la eliminación de estudiantes con inscripciones. reemplazarDatos permite escribir un respaldo completo ya validado, incluso cuando el estado anterior está dañado. Las fallas de lectura y escritura producen errores comprensibles.

## InscripcionesService

Aplica al crear y editar las reglas de estudiante existente, período/jornada/modalidad/estado del catálogo, cursos existentes compatibles con la carrera, cursos no repetidos y unicidad por estudiante/período. Editar excluye al propio registro al buscar duplicados. Cancelar cambia el estado a Cancelada mediante la misma validación y conserva el identificador y los cursos.

## RespaldoService y validadores

crearContenido serializa una lectura coherente. exportar genera un Blob JSON y una descarga local; no transmite datos a un servidor. validarContenido analiza JSON y llama a validarRespaldo, que revisa todo el conjunto sin escribir. importar repite la validación antes de reemplazar el estado con una sola escritura.

La pantalla mantiene el archivo validado pendiente y pide confirmación explícita. Cancelar descarta esa selección sin modificar registros. Las referencias se verifican contra los estudiantes incluidos en el respaldo nuevo, no contra los anteriores.
