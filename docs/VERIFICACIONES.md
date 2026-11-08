# Verificaciones de la entrega 1

Realizadas el 8 de noviembre de 2026 por el asistente:

- Instalación de dependencias mediante Angular CLI y npm: correcta.
- Angular CLI 20.3.42; Angular Material y CDK 20.2.14.
- npm run build: compilación de producción correcta.
- npm start -- --host 127.0.0.1: servidor iniciado correctamente.
- Petición HTTP a http://127.0.0.1:4200/: correcta, con título y elemento app-root esperados.

Pendiente: revisión visual en navegador por Luis y Daniel en escritorio y teléfono; adaptaciones elegidas y revisión conjunta del código. La petición HTTP no sustituye una prueba visual ni de interacción. No se ejecutaron pruebas automatizadas de navegador.

Git: Luis revisó la explicación y la pantalla inicial y autorizó registrar y subir esta entrega. Se comprobará la publicación en GitHub después de crear el commit.

## Ajuste al material de clase

Se volvió a ejecutar npm run build después de simplificar el CSS, agregar encabezados semánticos y quitar las fuentes externas: correcto. Sigue pendiente la revisión visual de Luis y Daniel.

## Conversión a CSS

Se reemplazaron los archivos propios .scss por .css, se cargó el tema CSS precompilado azure-blue de Material y se configuró Angular CLI para generar componentes con CSS. npm run build: correcto después de la conversión. Se reinició el servidor para cargar la nueva configuración.
