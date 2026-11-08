# UMES Inscripciones

Proyecto final de Programación Web de Luis (`Luissss012`) y Daniel (`danielaragonumes`).

Aplicación para gestionar estudiantes e inscripciones universitarias con Angular 20 y Angular Material.

## Estado actual

La versión actual contiene la pantalla de presentación, los modelos TypeScript y los catálogos JSON iniciales. Los formularios y la gestión de registros están pendientes de implementación.

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
- src/app/app.html: pantalla de presentación.
- src/app/app.css: estilos del componente principal.
- src/app/app.config.ts: configuración general.
- src/app/app.routes.ts: configuración de rutas, actualmente sin páginas adicionales.
- src/styles.css: estilos globales. El tema CSS precompilado de Material se carga desde angular.json.
- src/app/models/: interfaces de estudiantes, teléfonos, cursos, inscripciones y opciones.
- public/assets/catalogos/: catálogos JSON de lectura inicial.
- docs/: documentación del proyecto.

## Datos y respaldos

La persistencia en localStorage y la importación/exportación JSON se incorporarán en las siguientes versiones. Esta versión inicial todavía no almacena registros.

## Catálogos académicos

Se incluyen dos carreras de la Universidad Mesoamericana y cuatro cursos de ejemplo por carrera. Las fuentes, sedes y valores de ejemplo están descritos en [Catálogos](docs/CATALOGOS.md).
