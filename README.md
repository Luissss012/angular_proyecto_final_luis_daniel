# UMES Inscripciones

Proyecto final de Programación Web de Luis (`Luissss012`) y Daniel (`LeinaD002`).

## Estado actual

Primera entrega: base Angular 20 y Angular Material. Todavía no incluye gestión de estudiantes, inscripciones o respaldos. El alcance incremental está en [la planificación](docs/PLANIFICACION.md).

## Requisitos e instalación

Se utilizó Node.js 20.20.2 y npm 10.8.2. Usar Node 20.19 o superior de la rama 20.

Desde la carpeta que contiene package.json:

```bash
npm ci
npm start
```

Abrir http://localhost:4200. Para detener el servidor, presionar Ctrl+C.

## Compilar

```bash
npm run build
```

La salida se genera dentro de dist/. No se suben dist/ ni node_modules/ al repositorio.

## Estructura inicial

- src/main.ts: arranca Angular con el componente principal y la configuración.
- src/app/app.ts: componente principal y componentes Material que utiliza.
- src/app/app.html: contenido visible de la pantalla inicial.
- src/app/app.css: estilos propios del componente.
- src/app/app.config.ts: proveedores generales de Angular.
- src/app/app.routes.ts: rutas; se definirán en la tercera entrega.
- src/styles.css: tema Material y estilos globales.
- public/: recursos estáticos que se sirven directamente.
- package-lock.json: versiones resueltas para instalaciones reproducibles con npm ci.

## Cómo estudiar y personalizar esta entrega

Leer src/main.ts y seguir la referencia a App. Cambiar el título y el texto de presentación en app.html, guardar y observar la actualización en el navegador. Elegir juntos una paleta legible antes de cambiar el tema. Revisar el resultado en teléfono y ejecutar el build después de modificar.

Los comentarios explican decisiones o puntos de entrada; no es necesario comentar cada etiqueta. Documentar solo las verificaciones realmente realizadas. Las instrucciones de importación/exportación se agregarán cuando esas funciones existan.

## Estilo de implementación

Se sigue el material de clase: componentes standalone, pages/, interfaces, binding, rutas directas, HTML semántico y CSS básico con Flexbox. Material y Reactive Forms se mantienen por ser requisitos de la entrega. Evitaremos capas y librerías adicionales. El tema de Material es un CSS precompilado y los estilos propios están en archivos .css.
