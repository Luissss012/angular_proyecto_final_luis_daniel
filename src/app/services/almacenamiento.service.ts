import { Injectable } from '@angular/core';
import { DatosGuardados } from '../models/datos-guardados';
import { Estudiante } from '../models/estudiante';
import { Inscripcion } from '../models/inscripcion';

/** Centraliza el acceso a localStorage para que los componentes no lo utilicen. */
@Injectable({ providedIn: 'root' })
export class AlmacenamientoService {
  private readonly clave = 'umes-inscripciones';

  obtenerEstudiantes(): Estudiante[] {
    return this.leerDatos().estudiantes;
  }

  // La comparación usa el mismo criterio de unicidad que el guardado.
  existeCodigoEstudiantil(codigo: string, excluirId: string | null = null): boolean {
    const codigoBuscado = codigo.trim().toUpperCase();
    return this.obtenerEstudiantes().some(estudiante =>
      estudiante.id !== excluirId && estudiante.codigo.trim().toUpperCase() === codigoBuscado);
  }

  obtenerInscripciones(): Inscripcion[] {
    return this.leerDatos().inscripciones;
  }

  agregarEstudiante(estudiante: Estudiante): void {
    // Leer el estado actual evita reemplazar registros con una lista desactualizada.
    const datos = this.leerDatos();
    datos.estudiantes.push(estudiante);
    // validarDatos comprueba códigos e identificadores únicos antes de escribir.
    this.guardarDatos(datos);
  }

  obtenerEstudiante(id: string): Estudiante {
    const estudiante = this.obtenerEstudiantes().find(registro => registro.id === id);
    if (!estudiante) throw new Error('El estudiante ya no existe. Actualiza el listado.');
    return estudiante;
  }

  actualizarEstudiante(estudiante: Estudiante): void {
    const datos = this.leerDatos();
    const indice = datos.estudiantes.findIndex(registro => registro.id === estudiante.id);
    if (indice === -1) throw new Error('El estudiante ya no existe. Actualiza el listado.');
    // Cambiar carrera con inscripciones podría dejar cursos de otra carrera asociados.
    if (datos.estudiantes[indice].carreraId !== estudiante.carreraId &&
        datos.inscripciones.some(inscripcion => inscripcion.estudianteId === estudiante.id)) {
      throw new Error('No se puede cambiar la carrera de un estudiante con inscripciones.');
    }
    datos.estudiantes[indice] = estudiante;
    this.guardarDatos(datos);
  }

  eliminarEstudiante(id: string): void {
    const datos = this.leerDatos();
    if (!datos.estudiantes.some(estudiante => estudiante.id === id)) {
      throw new Error('El estudiante ya no existe. Actualiza el listado.');
    }
    // La protección se aplica en el servicio, aunque la pantalla pida confirmación.
    if (datos.inscripciones.some(inscripcion => inscripcion.estudianteId === id)) {
      throw new Error('No se puede eliminar este estudiante porque tiene inscripciones.');
    }
    datos.estudiantes = datos.estudiantes.filter(estudiante => estudiante.id !== id);
    this.guardarDatos(datos);
  }

  guardarEstudiantes(estudiantes: Estudiante[]): void {
    const datos = this.leerDatos();
    datos.estudiantes = estudiantes;
    this.guardarDatos(datos);
  }

  guardarInscripciones(inscripciones: Inscripcion[]): void {
    const datos = this.leerDatos();
    datos.inscripciones = inscripciones;
    this.guardarDatos(datos);
  }

  private leerDatos(): DatosGuardados {
    let texto: string | null;
    try {
      texto = localStorage.getItem(this.clave);
    } catch {
      throw new Error('No se pudo acceder al almacenamiento del navegador.');
    }

    // La primera visita comienza vacía, sin sobrescribir nada en el navegador.
    if (texto === null) {
      return { version: 1, estudiantes: [], inscripciones: [] };
    }

    let datos: DatosGuardados;
    try {
      datos = JSON.parse(texto);
    } catch {
      throw new Error('Los datos guardados no son JSON válido. No se han modificado.');
    }

    // Una interfaz no valida JSON; también hay que comprobar los datos al leerlos.
    this.validarDatos(datos);
    return datos;
  }

  private guardarDatos(datos: DatosGuardados): void {
    this.validarDatos(datos);
    try {
      // Un único setItem guarda ambas colecciones; si falla, se informa el error.
      localStorage.setItem(this.clave, JSON.stringify(datos));
    } catch {
      throw new Error('No se pudieron guardar los datos. El almacenamiento puede estar lleno o bloqueado.');
    }
  }

  private validarDatos(datos: DatosGuardados): void {
    if (!datos || datos.version !== 1 || !Array.isArray(datos.estudiantes) ||
        !Array.isArray(datos.inscripciones)) {
      throw new Error('El formato o la versión de los datos guardados no es compatible.');
    }

    const estudianteIds: string[] = [];
    const codigos: string[] = [];
    for (const estudiante of datos.estudiantes) {
      if (!estudiante || !this.esTexto(estudiante.id) || !this.esTexto(estudiante.codigo) ||
          !this.esTexto(estudiante.nombres) || !this.esTexto(estudiante.apellidos) ||
          !this.esTexto(estudiante.fechaNacimiento) || !this.esTexto(estudiante.genero) ||
          !this.esTexto(estudiante.correo) || !this.esTexto(estudiante.direccion) ||
          !this.esTexto(estudiante.municipio) || !this.esTexto(estudiante.carreraId) ||
          !Array.isArray(estudiante.telefonos)) {
        throw new Error('Un estudiante guardado tiene campos incompletos o tipos incorrectos.');
      }
      // Comparar códigos normalizados evita distinguir espacios o mayúsculas.
      const codigo = estudiante.codigo.trim().toUpperCase();
      if (estudianteIds.includes(estudiante.id) || codigos.includes(codigo)) {
        throw new Error('Hay estudiantes con identificadores o códigos repetidos.');
      }
      estudianteIds.push(estudiante.id);
      codigos.push(codigo);

      for (const telefono of estudiante.telefonos) {
        if (!telefono || !this.esTexto(telefono.numero) || !this.esTexto(telefono.tipo) ||
            typeof telefono.activo !== 'boolean') {
          throw new Error('Un teléfono guardado tiene datos incorrectos.');
        }
      }
    }

    const inscripcionIds: string[] = [];
    for (const inscripcion of datos.inscripciones) {
      if (!inscripcion || !this.esTexto(inscripcion.id) ||
          !this.esTexto(inscripcion.estudianteId) || !this.esTexto(inscripcion.periodoId) ||
          !this.esTexto(inscripcion.jornada) || !this.esTexto(inscripcion.modalidad) ||
          !this.esTexto(inscripcion.estado) || !Array.isArray(inscripcion.cursoIds) ||
          inscripcion.cursoIds.length === 0 ||
          !inscripcion.cursoIds.every(cursoId => this.esTexto(cursoId))) {
        throw new Error('Una inscripción guardada tiene campos incompletos o tipos incorrectos.');
      }
      if (inscripcionIds.includes(inscripcion.id)) {
        throw new Error('Hay inscripciones con identificadores repetidos.');
      }
      inscripcionIds.push(inscripcion.id);
      // Esta comprobación también impide eliminar estudiantes con inscripciones.
      if (!estudianteIds.includes(inscripcion.estudianteId)) {
        throw new Error('Una inscripción hace referencia a un estudiante inexistente.');
      }
    }
  }

  private esTexto(valor: unknown): boolean {
    return typeof valor === 'string' && valor.trim().length > 0;
  }
}
