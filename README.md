# UMES Inscripciones

Proyecto final de Programación Web de Luis (`Luissss012`) y Daniel (`danielaragonumes`). Aplicación Angular 20 con Angular Material, Reactive Forms y CSS básico.

## Requisitos

- Node.js 20.19 o superior de la rama 20. Entorno verificado: 20.20.2.
- npm. Entorno verificado: 10.8.2.
- Navegador moderno con JavaScript y localStorage habilitados.

## Instalación y ejecución

```bash
git clone https://github.com/Luissss012/angular_proyecto_final_luis_daniel.git
cd angular_proyecto_final_luis_daniel
npm ci
npm start
```

Abrir http://localhost:4200. Detener el servidor con Ctrl+C. El puerto puede configurarse con `npm start -- --port 4300`; cambiar de puerto también cambia el almacenamiento disponible para esa dirección.

## Funcionalidades

- Estudiantes: crear, buscar por código/nombre/apellido, consultar detalle, editar y eliminar con confirmación.
- Contactos: agregar y quitar teléfonos, indicar tipo y cambiar el estado activo individualmente.
- Inscripciones: registrar, consultar, filtrar por estudiante/período/estado, editar y cancelar con confirmación.
- Cursos filtrados por carrera, con créditos visibles y referencias por identificadores.
- Persistencia local y exportación/importación de un respaldo JSON versionado.

## Reglas principales

- El código estudiantil es único, sin distinguir mayúsculas. Los identificadores internos permanecen estables al editar.
- Los datos personales son obligatorios; se validan longitudes, espacios, correo y nacimiento real no futuro. Carrera y municipio complementan los campos mínimos.
- Cada teléfono agregado requiere número y tipo; admite de 8 a 15 dígitos y separadores habituales. El estado activo es booleano. Puede quitarse una fila completa si no se desea conservarla.
- Una inscripción por estudiante y período, incluso si está cancelada. Para corregirla se edita el registro existente.
- Cada inscripción requiere uno o más cursos válidos de la carrera del estudiante, sin repetidos.
- No se puede eliminar un estudiante con inscripciones ni cambiar su carrera mientras las tenga.
- Cancelar una inscripción conserva sus datos. La edición permite cambiar su estado.

## Estructura

- `src/main.ts`: inicio de Angular.
- `src/app/app.*`: cabecera y navegación común.
- `src/app/app.routes.ts`: rutas directas; raíz y direcciones desconocidas redirigen a estudiantes.
- `src/app/pages/`: estudiantes, inscripciones y respaldo, con TS, HTML y CSS separados.
- `src/app/models/`: interfaces de datos; no son componentes visuales.
- `src/app/services/`: catálogos, almacenamiento, reglas de inscripción y respaldos.
- `src/app/validators/`: validadores de campos y del respaldo completo.
- `public/assets/catalogos/`: ocho catálogos JSON de lectura inicial.
- `scripts/verificar.mjs`: comprobaciones aisladas con almacenamiento en memoria.
- `docs/`: fuentes académicas, estructura y verificaciones.

## Persistencia y respaldos

Los servicios guardan un objeto en localStorage bajo la clave `umes-inscripciones`. No hay backend ni base de datos remota. Los datos no se comparten automáticamente entre computadoras, perfiles o navegadores; al borrar los datos del sitio se pierden los registros locales.

El formato es:

```json
{
  "version": 1,
  "estudiantes": [],
  "inscripciones": []
}
```

Los estudiantes incluyen sus teléfonos. Las inscripciones contienen `estudianteId`, `periodoId` y `cursoIds`, sin duplicar entidades completas. Los catálogos estáticos no se exportan.

**Exportar:** abrir Respaldo y pulsar Exportar datos. Se solicita la descarga de `umes_respaldo_FECHA_HORA.json` sin modificar los datos actuales.

**Importar:** seleccionar el JSON en Respaldo. La aplicación valida sintaxis, versión, colecciones, campos, tipos, longitudes, catálogos, duplicados y relaciones dentro del archivo nuevo. Si es válido, muestra cantidades y advierte que reemplazará todos los registros. Pulsar Confirmar reemplazo para aplicar, o Cancelar para conservar el estado actual. La escritura se realiza en una única operación después de validar; un archivo inválido no escribe cambios. Un fallo de almacenamiento muestra un error.

Después de importar, los enlaces Ver estudiantes y Ver inscripciones abren los listados con los datos nuevos. Si hay otra pestaña abierta, recargarla para consultar el estado actualizado. No se implementó importación por mezcla.

## Compilación y comprobaciones

```bash
npm run verificar
npm run build
```

`verificar` comprueba reglas, CRUD, filtros y respaldos con datos ficticios en memoria; no modifica los registros del navegador. `build` comprueba TypeScript y las plantillas y genera `dist/umes-inscripciones/browser/`.

La compilación puede mostrar una advertencia porque el paquete inicial supera el umbral de 500 kB al incluir Material; no es un error de compilación. El límite de error permanece en 1 MB.

Las comprobaciones ejecutadas y las verificaciones manuales pendientes están en [Verificaciones](docs/VERIFICACIONES.md). Los pasos para demostrar exportación, importación válida e inválida están en [Pruebas](docs/PRUEBAS.md).

## Catálogos académicos

Se incluyen dos carreras y cuatro cursos por carrera. Los nombres se basan en pénsums publicados por la Universidad Mesoamericana. Los códigos son internos del proyecto y los créditos de Sistemas son valores de ejemplo. Las sedes y fuentes están en [Catálogos](docs/CATALOGOS.md).
