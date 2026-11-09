# Plan de desarrollo

Proyecto: UMES Inscripciones.
Integrantes: Luis (`Luissss012`) y Daniel (`danielaragonumes`).
Entrega: 8 de noviembre de 2026, 23:59, hora de Guatemala.

## Objetivo

Gestionar estudiantes e inscripciones universitarias con Angular 20, Angular Material, formularios reactivos, catálogos JSON y almacenamiento local. El alcance se divide en 16 entregas funcionales. Las correcciones adicionales se registran por separado.

## Alcance obligatorio

- Estudiantes: crear, listar, buscar, consultar, editar y eliminar con confirmación; código único; nombres, apellidos, nacimiento, género, correo y dirección. Agregar únicamente carrera y municipio como datos adicionales.
- Teléfonos: arreglo de objetos con número, tipo y activo; formulario con FormArray para agregar, quitar y cambiar el estado individual.
- Catálogos JSON: cursos, períodos, géneros, jornadas, modalidades y estados. Cada curso contiene id, código, nombre, créditos y carreraId o areaId. No se requiere carreras.json.
- Inscripciones: estudianteId, periodoId y cursoIds; alta, consulta, edición, cancelación y filtros por estudiante, período y estado.
- Persistencia exclusiva mediante servicios; conservar datos al recargar. Los JSON de catálogos son de lectura inicial.
- Exportación de un único JSON con versión, estudiantes e inscripciones; no es necesario exportar los catálogos.
- Importación con validación completa de sintaxis, estructura, tipos, campos, duplicados y relaciones antes de modificar el almacenamiento; reemplazo con advertencia y confirmación.
- Interfaz responsive, errores cerca de cada campo y bloqueo de formularios inválidos.
- README con instalación, ejecución, arquitectura, reglas, funcionamiento de respaldos y pruebas.

## Reglas propuestas para implementar

1. Separar el id interno estable del código estudiantil editable; el código debe ser único incluso al editar o importar.
2. Una inscripción por estudiante y período, incluso si está cancelada; permitir editar o reactivar el registro existente con una acción explícita si se implementa dicha transición.
3. Exigir uno o más cursos válidos sin repetidos y compatibles con la carrera seleccionada. No agregar límites de créditos sin acordarlos primero.
4. Bloquear la eliminación de estudiantes con inscripciones para conservar referencias.
5. Cancelar conserva el registro; no equivale a borrarlo.
6. Validar períodos, estados y demás valores de catálogo al guardar e importar.
7. Rechazar valores compuestos solo por espacios, fechas de nacimiento futuras, correos inválidos y teléfonos con formato o longitud irrazonables. Documentar los límites concretos antes de implementar.
8. La importación reemplaza el conjunto completo solo después de validarlo y confirmar. Preferir una única clave con versión, estudiantes e inscripciones para evitar reemplazos parciales entre claves.
9. Manejar fallos de lectura/escritura de localStorage con mensajes comprensibles y sin informar éxito cuando el guardado falla.

## Implementación

- Componentes standalone y rutas directas con RouterLink y RouterOutlet.
- Interfaces TypeScript para describir datos; servicios para acceso a catálogos, persistencia y reglas de negocio.
- HTML semántico, CSS básico y Flexbox. Tema CSS precompilado de Angular Material.
- Formularios reactivos con FormGroup, FormControl, FormArray y Validators.
- Sin backend, autenticación, librerías de estado, animaciones ni paneles adicionales.

## Estructura prevista

- src/app/pages/: pantallas de estudiantes, inscripciones y respaldos.
- src/app/models/: interfaces de datos.
- src/app/services/: catálogos, almacenamiento y reglas del dominio.
- src/app/validators/: validadores reutilizables cuando sean necesarios.
- public/assets/catalogos/: archivos JSON de lectura inicial.
- docs/: alcance, estructura, fuentes de catálogos y verificaciones.

## Entregas por commit

Cada fila define lo que debe estar en el repositorio después del commit y lo que debe comprobarse antes de subirlo. Todos los commits deben conservar los archivos de etapas anteriores y mantener la aplicación compilable.

| Nº | Autor y mensaje sugerido | Entrega y archivos principales | Comprobación antes de subir |
|---|---|---|---|
| 1 | Luis — `chore: iniciar Angular 20 y Material` | Proyecto generado, Material configurado, package.json, lockfile, configuración Angular, gitignore y README inicial con comandos. Guardar este plan en docs/PLANIFICACION.md. | Instalación y ejecución local; comprobar versión 20. No subir node_modules, dist, credenciales ni archivos locales del editor. |
| 2 | Daniel — `feat: definir modelos y catalogos` | Interfaces TypeScript y JSON de todos los catálogos; cursos con créditos y relación académica. | JSON válido, ids únicos y relaciones coherentes; distinguir id interno y código estudiantil. |
| 3 | Luis — `feat: agregar navegacion responsive` | Rutas, contenedor principal, navegación Material y pantallas iniciales para estudiantes, inscripciones y respaldos. | Navegación sin errores, ruta desconocida controlada y menú utilizable en móvil. |
| 4 | Daniel — `feat: agregar servicios de datos locales` | Servicios para leer catálogos y almacenar el estado versionado; métodos tipados para consultar y actualizar datos; manejo de almacenamiento vacío o inválido. | Recarga conserva un estado válido; almacenamiento vacío inicializa correctamente; componentes no acceden directamente a localStorage. |
| 5 | Luis — `feat: crear formulario reactivo de estudiante` | Formulario personal con campos mínimos, datos adicionales, validadores y errores visibles. Servicio con la consulta necesaria para detectar código repetido. | Rechazar espacios, correo inválido, fecha futura y código duplicado; no permitir guardar datos inválidos. |
| 6 | Daniel — `feat: agregar contactos dinamicos` | FormArray de teléfonos con número, tipo y activo; controles para agregar/quitar y validación de cada contacto. | Varios teléfonos se representan como objetos; activar uno no modifica los demás; errores junto al teléfono correspondiente. |
| 7 | Luis — `feat: guardar y buscar estudiantes` | Alta conectada al servicio, listado Material, búsqueda y estados vacío/éxito/error. | Crear, encontrar por código o nombre y recuperar el registro tras recargar. |
| 8 | Daniel — `feat: consultar editar y eliminar estudiantes` | Detalle, edición con datos precargados, confirmación de eliminación y protección de relaciones en el servicio. | Editar conserva id y valida unicidad; cancelar confirmación conserva el estudiante; verificar bloqueo cuando existan inscripciones. |
| 9 | Luis — `feat: crear formulario de inscripcion` | Formulario reactivo de estudiante, período, carrera/área, cursos, jornada, modalidad y estado; selección múltiple de cursos filtrados. | Mostrar catálogos; limpiar o validar cursos incompatibles al cambiar selección académica; exigir estudiante y al menos un curso. |
| 10 | Daniel — `feat: validar y guardar inscripciones` | Servicio con reglas de negocio, validación de referencias, prevención de duplicados por estudiante/período y persistencia. | Rechazar ids inexistentes y cursos repetidos; guardar ids sin duplicar entidades; recargar conserva la inscripción. |
| 11 | Luis — `feat: listar y consultar inscripciones` | Tabla, detalle y filtros por estudiante, período y estado; nombres resueltos desde registros y catálogos. | Filtros combinables, resultados vacíos comprensibles y relaciones visibles correctamente. |
| 12 | Daniel — `feat: editar y cancelar inscripciones` | Edición precargada, reglas aplicadas también a cambios y cancelación confirmada que conserva el registro. | Cancelación persiste al recargar; edición no evade duplicados ni permite referencias inválidas. |
| 13 | Luis — `feat: exportar respaldo versionado` | Servicio de exportación y acción de descarga; formato con version, estudiantes e inscripciones. | Archivo descargado se puede analizar como JSON; incluye registros y relaciones actuales; exportar vacío funciona. |
| 14 | Daniel — `feat: importar respaldo validado` | Selector de archivo, validación completa reutilizable, advertencia de reemplazo, confirmación, guardado y actualización de listados. | Probar respaldo válido, JSON roto, tipos incorrectos, versión incompatible, duplicados y referencias inexistentes. Un error o cancelar no cambia ningún dato. |
| 15 | Luis — `fix: corregir hallazgos de integracion` | Correcciones reales derivadas de revisión integral y ajustes responsive/accesibilidad necesarios; registrar escenarios y resultados en docs/PRUEBAS.md. Si no hay defectos, usar un mensaje de pruebas que describa el trabajo real. | Flujo completo de estudiante a inscripción; borrado protegido; errores de campos; móvil; persistencia; exportar e importar; build de producción. |
| 16 | Daniel — `docs: completar guia y verificaciones` | README final: requisitos, instalación reproducible, ejecución, estructura, reglas, formato de respaldo, limitaciones y contribuciones reales. Completar registro de pruebas de exportación, importación válida e inválida. | Clonar en carpeta limpia, instalar con lockfile y ejecutar siguiendo únicamente el README; confirmar acceso del docente y aportes de ambas cuentas. |

## Checklist de entrega

- [x] Angular 20 y Angular Material; formularios reactivos.
- [x] CRUD de estudiantes con filtros, teléfonos como objetos y validaciones.
- [x] Catálogos JSON relacionados y cursos completos.
- [x] Inscripciones con consulta, edición, cancelación y filtros.
- [x] Servicios para lógica y localStorage; persistencia comprobada.
- [x] Exportación y posterior importación del respaldo.
- [x] Importación inválida y cancelación conservan los datos anteriores.
- [x] Relaciones, duplicados y valores de catálogo validados al guardar e importar.
- [ ] Interfaz revisada en escritorio, tableta y teléfono.
- [x] Build correcto e instalación verificada desde un clon limpio.
- [x] Al menos 15 commits progresivos; objetivo de 16 con participación real de ambos.
- [x] Repositorio con nombre exigido, accesible al docente y sin secretos.
- [x] README y registro de pruebas completos.
- [ ] Ambos pueden explicar toda la aplicación y realizar cambios pequeños.
- [ ] Enviar únicamente el enlace del repositorio antes de las 23:59.

## Cierre de implementación

Las 16 entregas de implementación y documentación se completaron. Existe además un commit de corrección inicial del README. Las pruebas automatizadas se ejecutan con npm run verificar; las comprobaciones visuales y la demostración de descarga real pendientes se detallan en VERIFICACIONES.md. La planificación no constituye evidencia de que esas comprobaciones manuales ya se hayan realizado.
