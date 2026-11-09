# Verificaciones finales

Fecha: 8 de noviembre de 2026, hora de Guatemala.

## Comprobaciones automatizadas ejecutadas

- `npm run verificar`: correcto. Usa las clases reales con almacenamiento en memoria y catálogos del repositorio.
- Más de 30 escenarios de sintaxis, estructura, tipos, campos, fechas, correo, teléfonos, duplicados y relaciones de respaldos.
- Crear, editar y consultar estudiantes con identificador estable; búsqueda sin distinguir mayúsculas y validación de longitud sin contar espacios exteriores.
- Inscripciones: alta, edición, duplicados, cursos de otra carrera y cancelación conservando datos.
- Filtros combinados y resolución de nombres desde identificadores.
- Exportar y validar/importar nuevamente; respaldo vacío; referencias dentro del archivo nuevo.
- Archivo ilegible, JSON dañado, versión incompatible, datos inválidos, cancelación y falla simulada de cuota sin sobrescribir el estado anterior.
- Persistencia comprobada mediante nuevas instancias del servicio sobre el mismo almacenamiento de prueba.
- `npm run build`: correcto. Comprueba TypeScript y las plantillas Angular.
- `git diff --check`: correcto antes de registrar los cambios.
- Clon local limpio sin node_modules: npm ci, npm run verificar y npm run build terminaron correctamente.
- Los ejemplos JSON documentados se comprobaron con validarRespaldo: el válido se acepta y el de curso inexistente se rechaza.

## Alcance de las pruebas

Las pruebas usan memoria y archivos ficticios, no los datos reales del navegador. La lectura de archivo se simula con la misma interfaz asíncrona usada por el componente. En la entrega de exportación también se comprobó el Blob y el enlace con APIs de descarga simuladas.

No se ejecutaron pruebas automatizadas de navegador ni una descarga real mediante automatización: el permiso de acceso a localhost estaba bloqueado. No se afirma haber verificado visualmente todos los tamaños de pantalla. La comprobación HTTP inicial tampoco sustituye estas pruebas.

## Revisión manual pendiente

- Navegar entre las tres secciones, recargar rutas y usar Atrás/Adelante.
- Revisar formularios y tablas en escritorio, tableta y teléfono, incluido el desplazamiento horizontal.
- Confirmar descarga real y ubicación del archivo exportado.
- Ejecutar los escenarios de demostración de PRUEBAS.md en el navegador.

## Advertencia conocida

La compilación de producción muestra una advertencia de tamaño: aproximadamente 706 kB iniciales frente al umbral de aviso de 500 kB. Compila correctamente y permanece bajo el límite de error de 1 MB. No se elevaron los límites para ocultar la advertencia.
