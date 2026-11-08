# Estructura inicial de la aplicación

## Inicio

index.html contiene app-root. main.ts inicia el componente App y aplica los proveedores de app.config.ts. App utiliza app.html como plantilla y app.css como hoja de estilos. app.routes.ts relaciona las direcciones con los componentes de pages/.

## Presentación

App utiliza MatToolbarModule para la cabecera y MatButtonModule para los enlaces. Las pantallas de pages/ utilizan MatCardModule para su contenido. El tema azure-blue de Material se carga como CSS precompilado desde angular.json. Los estilos locales usan CSS básico y no requieren SCSS.

## Modelos y componentes

Un modelo describe la estructura de datos mediante una interfaz TypeScript. No dibuja contenido ni necesita HTML o CSS. Por eso los archivos de models/ solo tienen extensión .ts.

Un componente representa una parte de la interfaz: su .ts define la clase, su .html contiene la plantilla y su .css define los estilos. Los componentes implementados son App, Estudiantes, Inscripciones y Respaldo.

Telefono describe numero, tipo y activo. Estudiante contiene telefonos como un arreglo de objetos Telefono. Los controles para editar ese arreglo pertenecerán al formulario de estudiantes.

Las interfaces se comprueban al compilar y no validan por sí mismas datos externos. La validación de archivos importados se realizará en tiempo de ejecución antes de persistir cambios.
