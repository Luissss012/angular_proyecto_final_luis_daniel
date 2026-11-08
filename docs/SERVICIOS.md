# Servicios de datos

## CatalogosService

Lee los ocho JSON de assets/catalogos con HttpClient. Cada método devuelve un Observable: el componente debe suscribirse para recibir los datos o el error de la petición. provideHttpClient en app.config.ts habilita este cliente. El tipo de la respuesta no sustituye una validación de datos externos.

## AlmacenamientoService

Utiliza una única clave, umes-inscripciones, con version: 1, estudiantes e inscripciones. obtenerEstudiantes y obtenerInscripciones leen el estado guardado. guardarEstudiantes conserva las inscripciones y guardarInscripciones conserva los estudiantes. Cada lectura convierte nuevamente el JSON, por lo que modificar el arreglo devuelto no modifica el almacenamiento hasta guardar.

Si la clave no existe, devuelve colecciones vacías sin escribirlas. JSON dañado, versión incompatible, campos de tipos incorrectos, identificadores duplicados o referencias a estudiantes inexistentes producen errores. Los datos dañados no se reemplazan automáticamente. Las fallas de acceso o escritura también producen errores que los futuros componentes deberán mostrar al usuario.

La comprobación estructural no es la validación completa de formularios o respaldos: quedan pendientes formatos de correo, fechas, teléfonos, longitudes, valores de catálogo, cursos válidos, compatibilidad de carrera y reglas de inscripción. Estas reglas se incorporarán en sus entregas correspondientes antes de habilitar las operaciones en pantalla. El servicio todavía no expone una operación de importación.

Las pantallas actuales no están conectadas a los servicios. No hay backend ni sincronización entre navegadores.
