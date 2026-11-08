# UMES Inscripciones

Proyecto final de Programación Web de Luis (`Luissss012`) y Daniel (`danielaragonumes`).

Aplicación para gestionar estudiantes e inscripciones universitarias con Angular 20 y Angular Material.

## Estado actual

La versión actual contiene navegación entre las pantallas iniciales de estudiantes, inscripciones y respaldo, los modelos TypeScript, los catálogos JSON y servicios para lectura y persistencia local. Los formularios y la gestión de registros están pendientes de implementación.

## Requisitos

- Node.js 20.19 o superior de la rama 20. Entorno utilizado: 20.20.2.
- npm. Versión utilizada: 10.8.2.

## Instalación y ejecución

Desde la carpeta del proyecto:

```bash
npm ci
npm start
```

Abrir http://localhost:4200. Para detener el servidor, presionar Ctrl+C.

## Compilación

```bash
npm run build
```

Los archivos compilados se generan en dist/.

## Estructura

- src/main.ts: inicio de la aplicación.
- src/app/app.ts: componente principal.
- src/app/app.html: cabecera, menú y espacio para la pantalla seleccionada.
- src/app/app.css: estilos del componente principal.
- src/app/app.config.ts: configuración general.
- src/app/app.routes.ts: rutas de estudiantes, inscripciones y respaldo.
- src/app/pages/: componentes de las tres pantallas.
- src/styles.css: estilos globales. El tema CSS precompilado de Material se carga desde angular.json.
- src/app/services/: lectura de catálogos y persistencia local.
- src/app/models/: interfaces de estudiantes, teléfonos, cursos, inscripciones y opciones.
- public/assets/catalogos/: catálogos JSON de lectura inicial.
- docs/: documentación del proyecto.

## Datos y respaldos

AlmacenamientoService permite consultar y guardar estudiantes e inscripciones bajo la clave umes-inscripciones de localStorage, en un objeto con version: 1. CatalogosService lee los ocho catálogos con HttpClient. Todavía no hay formularios conectados a estos servicios ni importación/exportación de respaldos.

## Catálogos académicos

Se incluyen dos carreras de la Universidad Mesoamericana y cuatro cursos de ejemplo por carrera. Las fuentes, sedes y valores de ejemplo están descritos en [Catálogos](docs/CATALOGOS.md).

## Navegación

- /estudiantes: pantalla inicial de estudiantes.
- /inscripciones: pantalla inicial de inscripciones.
- /respaldo: pantalla inicial de respaldos.

La raíz y las rutas desconocidas redirigen a /estudiantes. Los enlaces utilizan RouterLink para cambiar de sección sin recargar toda la página. Las pantallas muestran su propósito y estado de desarrollo; todavía no incluyen acciones de gestión.
