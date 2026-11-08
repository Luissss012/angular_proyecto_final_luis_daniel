# Plan de desarrollo y entregas por commit

Proyecto: sistema de gestión de inscripciones universitarias.
Integrantes: Luis (`Luissss012`) y Daniel (`LeinaD002`).
Repositorio: `angular_proyecto_final_luis_daniel`.
Entrega: 8 de noviembre de 2026, 23:59, hora de Guatemala.

## Objetivo y criterio de trabajo

Entregar una aplicación Angular 20 con Angular Material, formularios reactivos, catálogos JSON, estudiantes e inscripciones persistidos mediante servicios en localStorage, y respaldos JSON validados.

Se planifican 16 commits de desarrollo, alternando Luis y Daniel. Cada commit debe contener un cambio real, comprobado y comprendido por quien lo registra. No se debe construir primero toda la aplicación y luego fragmentar su historial, alterar fechas ni cambiar autores para aparentar participación. La asistencia de IA debe ajustarse a lo permitido por el docente; el documento del curso advierte que un proyecto generado íntegramente por IA puede ser anulado. Una modificación cosmética no sustituye comprender y desarrollar la funcionalidad.

El plan es una previsión: los arreglos adicionales se registran en nuevos commits. No se requieren esperas artificiales. La revisión y el estudio forman parte del trabajo y deben suceder antes del commit correspondiente.

## Alcance obligatorio

- Estudiantes: crear, listar, buscar, consultar, editar y eliminar con confirmación; código único; nombres, apellidos, nacimiento, género, correo y dirección. Agregar carrera y contacto de emergencia como datos pertinentes.
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

## Criterio de implementación según el material de clase

Se revisaron las 21 diapositivas de Angular 20, la guía HTML/CSS y la guía Flexbox proporcionadas por Luis. Los ejemplos son referencias didácticas, no instrucciones para agregar sus aplicaciones de ejemplo al proyecto.

- Seguir la estructura de clase: app.ts, app.html, app.routes.ts, app.config.ts y pages/ para las pantallas. Usar carpetas models/ y services/ directamente bajo app/ para los requisitos del proyecto, sin capas core/features/shared innecesarias.
- Componentes standalone, interfaces TypeScript, propiedades y métodos sencillos, comparaciones ===, interpolación, property binding y event binding.
- Rutas directas con component, RouterLink y RouterOutlet como en las diapositivas; evitar carga diferida y guards sin necesidad.
- Recorrer arreglos con @for y track por id; usar condiciones sencillas para mensajes. Signals están presentados en clase y pueden usarse cuando aporten claridad, sin montar un sistema de estado avanzado.
- HTML semántico, etiquetas visibles, encabezados ordenados y controles con tipos apropiados.
- CSS en archivos separados: colores, fuentes, padding, margin, border y box-sizing. Flexbox con display, flex-direction, flex-wrap y gap para acomodar campos y botones.
- No usar clamp(), unidades dvh, CSS Grid, animaciones, librerías de estado ni abstracciones genéricas para esta aplicación.
- Mantener Angular Material porque lo exige el proyecto. Usar un tema CSS precompilado de Material y archivos .css propios; no escribir Sass ni SCSS.
- La diapositiva de ngModel es un ejemplo de clase, pero el proyecto exige Reactive Forms. Usar FormGroup, FormControl, FormArray y Validators con explicación paso a paso. No sustituirlos por ngModel en los formularios de captura/edición.
- Servicios, carga de JSON y formularios reactivos figuran como próximos temas en la presentación, sin desarrollo detallado. Son necesarios para la entrega y se explicarán como conceptos adicionales; no afirmar que estos archivos ya los enseñan completos.
- Mantener todas las validaciones, persistencia y comprobaciones de importación obligatorias. Simplificar el código no significa omitir reglas o aceptar datos inválidos.

## Organización sugerida del código

- src/app/pages/estudiantes/: pantallas de estudiantes.
- src/app/pages/inscripciones/: pantallas de inscripciones.
- src/app/pages/respaldo/: importación y exportación.
- src/app/models/: interfaces de datos.
- src/app/services/: catálogos, almacenamiento y reglas del dominio.
- src/app/validators/: solo validadores que deban reutilizarse.
- public/assets/catalogos/: catálogos JSON.
- docs/: planificación, explicaciones y verificaciones.

## Entregas por commit

Cada fila define lo que debe estar en el repositorio después del commit y lo que debe comprobarse antes de subirlo. Todos los commits deben conservar los archivos de etapas anteriores y mantener la aplicación compilable.

| Nº | Autor y mensaje sugerido | Entrega y archivos principales | Comprobación antes de subir |
|---|---|---|---|
| 1 | Luis — `chore: iniciar Angular 20 y Material` | Proyecto generado, Material configurado, package.json, lockfile, configuración Angular, gitignore y README inicial con comandos. Guardar este plan en docs/PLANIFICACION.md. | Instalación y ejecución local; comprobar versión 20. No subir node_modules, dist, credenciales ni archivos locales del editor. |
| 2 | Daniel — `feat: definir modelos y catalogos` | Interfaces TypeScript y JSON de todos los catálogos; cursos con créditos y relación académica. | JSON válido, ids únicos y relaciones coherentes; explicar la diferencia entre id y código estudiantil. |
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

## Documentación del código y preparación de la defensa

- Documentar interfaces y el significado de los campos que puedan resultar ambiguos.
- En servicios públicos, explicar propósito, entradas, resultado y errores relevantes.
- Explicar por qué se verifica unicidad, cómo se preservan referencias y por qué se valida toda la importación antes de persistir.
- Documentar FormArray y validadores personalizados donde ayude a entender el flujo.
- Evitar comentarios que solo repiten una línea de código o afirmaciones que no correspondan al comportamiento real.
- Después de cada turno, ambos deben poder localizar los archivos cambiados, explicar el recorrido desde formulario a servicio y mostrar un caso válido y otro inválido.
- Antes de registrar una adaptación sugerida por IA, ejecutarla, revisar el diff y explicar su efecto. Elegir cambios funcionales o de diseño útiles en vez de cambios destinados a disimular el origen.

## Trabajo desde una computadora y ejecución de Git

Ambos trabajarán juntos desde la computadora de Luis. Daniel ha autorizado usar su cuenta para registrar sus aportes y realizará personalmente el inicio de sesión cuando sea necesario. El asistente podrá ejecutar los comandos de commit y push por encargo de ambos, después de la revisión del bloque correspondiente. La alternancia propuesta es Luis en los commits impares y Daniel en los pares, con atribución acorde con su participación real.

Luis crea el repositorio e invita a LeinaD002 como colaborador; Daniel acepta. Se usa un único clon y una rama main. No es necesario crear dos copias del proyecto en la misma computadora.

Antes del primer commit se verifican los nombres y correos asociados a GitHub de ambos integrantes; pueden utilizar sus direcciones noreply. El usuario de GitHub no sustituye al correo de autoría. La identidad de autor/committer de Git y la cuenta autenticada para push son configuraciones distintas: cambiar una no cambia automáticamente la otra. Configurar la identidad para cada operación sin modificar la configuración global de otros proyectos. Si ambos contribuyen a una entrega, considerar un trailer Co-authored-by con el correo autorizado del otro integrante.

Para cada turno: revisar git status y git diff; ejecutar las comprobaciones aplicables; seleccionar solo los archivos de esa entrega; comprobar la identidad; crear el commit y revisar su resumen. Si se solicita que el push se haga también con la cuenta del responsable del turno, verificar y cambiar la autenticación antes de subir. Daniel o Luis completan personalmente cualquier inicio de sesión requerido. No incluir credenciales en archivos, comandos registrados o mensajes del chat.

Un push puede transportar dos commits y conservar sus autores. Esto no convierte al usuario que ejecuta el push en autor de ambos. Para simplificar la revisión se recomienda subir cada commit al terminar su bloque; también se pueden subir dos ya revisados juntos. La fecha de cada commit corresponde al momento real en que se registra.

No crear un README automático en GitHub si el proyecto local ya tendrá su commit inicial. Evitar squash o reescrituras que eliminen la progresión necesaria para la evaluación. No usar force push salvo que exista una necesidad concreta revisada previamente.

## Ciclo de implementación, estudio y personalización

1. Implementar únicamente el alcance del siguiente commit, con documentación útil y sin adelantar en secreto las funcionalidades de los siguientes.
2. Explicar los archivos modificados, el flujo de datos y las decisiones principales con un ejemplo válido y uno inválido.
3. Luis y Daniel revisan el bloque y plantean sus dudas o cambios mediante prompts. Pueden dedicar una sesión de estudio por cada dos entregas, pero cada commit requiere una revisión previa de su propio contenido.
4. Aplicar los cambios elegidos y explicar su efecto. Revisar el diff final para comprobar que los comentarios siguen siendo correctos.
5. Ejecutar las comprobaciones de la tabla; registrar resultados reales, sin afirmar pruebas no ejecutadas.
6. Crear el commit con el responsable correspondiente y subirlo según el flujo acordado. No registrar automáticamente las 16 entregas sin la intervención prevista de ambos.
7. Después de cada pareja de commits, ambos repasan también el trabajo del otro antes de avanzar.

Las pausas se destinan al estudio y a decisiones reales. No se establecen fechas falsas ni esperas para simular un proceso de desarrollo. Los prompts siguientes son propuestas: deben expresar cambios que ustedes entiendan y deseen incorporar.

## Prompts de revisión y adaptación por commit

| Commit | Prompt sugerido antes de registrar el cambio | Qué deben poder explicar |
|---|---|---|
| 1 | «Explícanos cómo arranca Angular y qué archivos necesitamos. Ajusta el título a UMES Inscripciones y documenta los comandos que verificamos en esta computadora». | Para qué sirven package.json, el lockfile y la configuración de Angular; cómo iniciar el proyecto. |
| 2 | «Muéstranos una inscripción relacionada por ids. Adaptemos los cursos y períodos a ejemplos que conozcamos, conservando créditos e identificadores coherentes». | Diferencia entre entidad, identificador y dato mostrado; por qué no duplicar estudiantes dentro de inscripciones. |
| 3 | «Queremos menú lateral en escritorio y navegación compacta en teléfono. Explícanos las rutas y ajusta etiquetas y colores para mantener buena lectura». | Qué hace el router y cómo cambia la navegación según el ancho. |
| 4 | «Explícanos la lectura y escritura de localStorage. Mejora el mensaje cuando el almacenamiento contiene datos dañados sin sobrescribirlos silenciosamente». | Diferencia entre JSON de catálogo y estado local; errores de almacenamiento. |
| 5 | «Revisemos las reglas campo por campo. Ajusta los mensajes a nuestro vocabulario y explica cómo se detecta un código duplicado al crear y editar». | Reactive Forms, validadores y diferencia entre crear y editar. |
| 6 | «Explícanos FormArray. Mostremos número, tipo y activo en cada fila y mejoremos cómo agregar o quitar un contacto desde el teléfono». | Cómo se representa el arreglo de objetos y cómo se valida cada elemento. |
| 7 | «Queremos buscar por código, nombre y apellido ignorando mayúsculas. Explícanos cómo llega un estudiante del formulario a la tabla y al almacenamiento». | Guardado, actualización de vista y búsqueda; comprobar persistencia. |
| 8 | «Aclara la confirmación de eliminación mostrando el nombre. Explícanos por qué debemos bloquearla si hay inscripciones y conservar el id al editar». | Integridad de relaciones y unicidad durante edición. |
| 9 | «Mostremos los créditos de cada curso y el total seleccionado. Explícanos qué ocurre con los cursos al cambiar de carrera». | Selección múltiple, campos relacionados y prevención de selecciones incompatibles. |
| 10 | «Recorramos las reglas del servicio con ejemplos inválidos. Mejora los mensajes de inscripción duplicada y referencias inexistentes». | Por qué las reglas también deben estar en servicios y no solo en botones o campos. |
| 11 | «Queremos filtros combinables y un botón para limpiarlos. Explícanos cómo se resuelven los nombres desde los ids guardados». | Filtros y consulta de relaciones sin duplicación de datos. |
| 12 | «Al cancelar queremos una advertencia clara y conservar la inscripción visible con su estado. Explícanos las reglas que se vuelven a comprobar al editar». | Cancelación frente a eliminación y validación de cambios. |
| 13 | «Incluye fecha y hora en el nombre del respaldo y explica cada propiedad del JSON. Demostremos una exportación sin registros y otra con relaciones». | Versión del formato y contenido necesario para recuperar datos. |
| 14 | «Antes de reemplazar, muestra cuántos estudiantes e inscripciones se importarán. Explícanos cómo evitamos modificar datos cuando falla una validación». | Orden de lectura, validación, confirmación y persistencia; referencias dentro del respaldo nuevo. |
| 15 | «Revisemos el flujo en móvil y los casos de error. Corrige los problemas que encontremos y documenta exactamente qué comprobamos». | Causa y solución de cada hallazgo, con evidencia reproducible. |
| 16 | «Revisemos el README como si otra persona clonara el proyecto. Ajusta instrucciones a los comandos realmente usados y agrega preguntas para practicar la defensa». | Instalación, arquitectura, limitaciones y funcionamiento completo. |

## Registro breve de cada entrega

Completar en docs/PRUEBAS.md o en una bitácora del repositorio, sin incluir secretos ni datos personales reales:

- Número y hash del commit, responsable y participantes de la revisión.
- Funcionalidad entregada y archivos principales.
- Prompt o decisión de adaptación que realmente se aplicó, si hubo alguno.
- Comandos y escenarios comprobados; resultado y limitaciones pendientes.
- Explicación breve de una decisión que ambos comprendieron.

## Tiempo disponible y prioridad

Al redactar este plan eran aproximadamente las 14:44 de Guatemala del 8 de noviembre: quedaban unas 9 horas y 15 minutos hasta el cierre. Ocho rondas de dos commits a una hora por ronda consumirían ocho horas y dejarían poco margen para instalación, errores y entrega. El cálculo no garantiza que el desarrollo pueda completarse a ese ritmo.

Usar hitos terminados y comprendidos para avanzar, sin esperar una hora solo por cumplir un intervalo. Hacer una revisión de tiempo después de los commits 4, 8 y 12. Priorizar los requisitos obligatorios y reservar el último tramo para integración, README y envío del enlace. No agregar login, backend, importación por mezcla, despliegue o paneles estadísticos salvo que sobre tiempo y todo lo obligatorio funcione.

## Checklist de entrega

- [ ] Angular 20 y Angular Material; formularios reactivos.
- [ ] CRUD de estudiantes con filtros, teléfonos como objetos y validaciones.
- [ ] Catálogos JSON relacionados y cursos completos.
- [ ] Inscripciones con consulta, edición, cancelación y filtros.
- [ ] Servicios para lógica y localStorage; persistencia comprobada.
- [ ] Exportación y posterior importación del respaldo.
- [ ] Importación inválida y cancelación conservan los datos anteriores.
- [ ] Relaciones, duplicados y valores de catálogo validados al guardar e importar.
- [ ] Interfaz revisada en escritorio, tableta y teléfono.
- [ ] Build correcto e instalación verificada desde un clon limpio.
- [ ] Al menos 15 commits progresivos; objetivo de 16 con participación real de ambos.
- [ ] Repositorio con nombre exigido, accesible al docente y sin secretos.
- [ ] README y registro de pruebas completos.
- [ ] Ambos pueden explicar toda la aplicación y realizar cambios pequeños.
- [ ] Enviar únicamente el enlace del repositorio antes de las 23:59.
