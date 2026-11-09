import { Injectable } from '@angular/core';
import { CatalogosInscripcion } from '../models/catalogos-inscripcion';
import { Inscripcion } from '../models/inscripcion';
import { AlmacenamientoService } from './almacenamiento.service';

/** Reglas de negocio de las inscripciones, separadas de la pantalla. */
@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  constructor(private almacenamiento: AlmacenamientoService) {}

  registrar(inscripcion: Inscripcion, catalogos: CatalogosInscripcion): void {
    this.guardar(inscripcion, catalogos, false);
  }

  actualizar(inscripcion: Inscripcion, catalogos: CatalogosInscripcion): void {
    this.guardar(inscripcion, catalogos, true);
  }

  cancelar(id: string, catalogos: CatalogosInscripcion): void {
    const actual = this.almacenamiento.obtenerInscripciones().find(registro => registro.id === id);
    if (!actual) throw new Error('La inscripción ya no existe. Actualiza el listado.');
    // Cambiar el estado conserva el id, estudiante, período y todos los cursos.
    actual.estado = 'Cancelada';
    this.actualizar(actual, catalogos);
  }

  private guardar(inscripcion: Inscripcion, catalogos: CatalogosInscripcion, editando: boolean): void {
    // Leer el estado vigente: un estudiante pudo cambiar desde que se abrió el formulario.
    const estudiantes = this.almacenamiento.obtenerEstudiantes();
    const inscripciones = this.almacenamiento.obtenerInscripciones();
    const indice = inscripciones.findIndex(registro => registro.id === inscripcion.id);
    if (editando && indice === -1) throw new Error('La inscripción ya no existe. Actualiza el listado.');
    const estudiante = estudiantes.find(registro => registro.id === inscripcion.estudianteId);
    if (!estudiante) throw new Error('El estudiante seleccionado ya no existe. Actualiza la lista.');
    if (!catalogos.periodos.some(periodo => periodo.id === inscripcion.periodoId)) {
      throw new Error('El período académico no existe.');
    }
    if (!catalogos.jornadas.some(jornada => jornada.id === inscripcion.jornada) ||
        !catalogos.modalidades.some(modalidad => modalidad.id === inscripcion.modalidad) ||
        !catalogos.estados.some(estado => estado.id === inscripcion.estado)) {
      throw new Error('La jornada, modalidad o estado no pertenece a los catálogos.');
    }
    if (!Array.isArray(inscripcion.cursoIds) || inscripcion.cursoIds.length === 0) {
      throw new Error('Selecciona al menos un curso.');
    }
    const seleccionados: string[] = [];
    for (const id of inscripcion.cursoIds) {
      if (seleccionados.includes(id)) throw new Error('No se puede seleccionar un curso repetido.');
      seleccionados.push(id);
      const curso = catalogos.cursos.find(registro => registro.id === id);
      if (!curso) throw new Error('Uno de los cursos seleccionados no existe.');
      if (curso.carreraId !== estudiante.carreraId) {
        throw new Error('Todos los cursos deben pertenecer a la carrera del estudiante.');
      }
    }
    // La regla también incluye inscripciones canceladas para conservar un registro por período.
    if (inscripciones.some(registro => (!editando || registro.id !== inscripcion.id) &&
        registro.estudianteId === inscripcion.estudianteId &&
        registro.periodoId === inscripcion.periodoId)) {
      throw new Error('Este estudiante ya tiene una inscripción para el período seleccionado.');
    }
    // Se guardan solo identificadores. El almacenamiento valida y escribe el conjunto completo.
    if (editando) {
      inscripciones[indice] = inscripcion;
    } else {
      inscripciones.push(inscripcion);
    }
    this.almacenamiento.guardarInscripciones(inscripciones);
  }
}
