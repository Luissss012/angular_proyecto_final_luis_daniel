# Catálogos académicos de ejemplo

El catálogo contiene dos carreras y ocho cursos. Es una selección para demostrar la aplicación, no una oferta oficial de inscripción. No incluye prerrequisitos, horarios ni el pénsum completo. Las jornadas, modalidades, períodos y estados son opciones del proyecto, no una afirmación de disponibilidad institucional para esas carreras.

## Fuentes consultadas el 8 de noviembre de 2026

### Ingeniería en Sistemas, Informática y Ciencias de la Computación

Sede de referencia: Quetzaltenango.

- [Página oficial de la carrera](https://www.umes.edu.gt/ingenier%C3%ADa-en-sistemas-quetzaltenango).
- [Folleto con pénsum enlazado por la universidad](https://www.umes.edu.gt/_files/ugd/9726ef_a2966e25414a41db88a998bb5ea2e1e6.pdf), segunda página.
- Selección: Programación web, Bases de datos I, Redes I y Sistemas operativos.
- El folleto consultado no indica créditos. Los cuatro créditos de cada curso son valores de ejemplo para la aplicación y no se presentan como créditos oficiales.

### Licenciatura en Administración de Empresas

Sede de referencia: UMES Verapaz.

- [Pénsums oficiales publicados por la sede](https://umesverapaz.edu.gt/licenciatura/), sección Administración de Empresas.
- Selección del primer semestre: Administración I (3 créditos), Introducción a la Economía (2), Técnicas de Investigación (2) y Sociología General (2).

## Identificadores

Los códigos SIS101–SIS104 y ADM101–ADM104 y los ids son definidos por el proyecto, no son códigos oficiales de la universidad. carreraId vale SIS o ADM y debe corresponder a carreras.json. Los ids de cursos y sus códigos son campos separados aunque ambos sean únicos.

## Datos de estudiantes

Se conservan los campos mínimos del enunciado y el arreglo de teléfonos con número, tipo y activo. Solo se añaden municipio y carreraId como datos de captura. id es la referencia interna estable y codigo es el código estudiantil único. Las inscripciones guardan estudianteId, periodoId y cursoIds para relacionar datos sin duplicarlos.

Las interfaces describen los tipos durante la compilación; no validan archivos JSON en tiempo de ejecución. Esa validación se implementará en los servicios y en la importación.
