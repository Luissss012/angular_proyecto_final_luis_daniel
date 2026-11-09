import { FormControl, Validators } from '@angular/forms';
import { DatosGuardados } from '../models/datos-guardados';
import { CatalogosRespaldo } from '../models/catalogos-respaldo';
import { Inscripcion } from '../models/inscripcion';
import { fechaNacimientoValida, numeroTelefonoValido } from './estudiante.validators';

function comprobarTexto(valor: unknown, campo: string, minimo = 1, maximo = 150): void {
  if (typeof valor !== 'string' || valor.trim().length < minimo || valor.length > maximo) {
    throw new Error(campo + ': texto obligatorio de ' + minimo + ' a ' + maximo + ' caracteres.');
  }
}

/** Revisa el conjunto completo sin leer ni escribir localStorage. */
export function validarRespaldo(contenido: unknown, catalogos: CatalogosRespaldo): DatosGuardados {
  if (!contenido || typeof contenido !== 'object' || Array.isArray(contenido)) {
    throw new Error('El respaldo debe ser un objeto JSON.');
  }
  // La conversión permite recorrer los campos; cada uno se comprueba a continuación.
  const datos = contenido as DatosGuardados;
  if (datos.version !== 1 || !Array.isArray(datos.estudiantes) || !Array.isArray(datos.inscripciones)) {
    throw new Error('El archivo debe incluir version: 1 y arreglos de estudiantes e inscripciones.');
  }
  const ids: string[] = [];
  const codigos: string[] = [];
  for (let i = 0; i < datos.estudiantes.length; i++) {
    const estudiante = datos.estudiantes[i];
    const campo = 'Estudiante ' + (i + 1);
    if (!estudiante || typeof estudiante !== 'object' || Array.isArray(estudiante)) {
      throw new Error(campo + ': registro inválido.');
    }
    comprobarTexto(estudiante.id, campo + ', id');
    comprobarTexto(estudiante.codigo, campo + ', código', 3, 20);
    comprobarTexto(estudiante.nombres, campo + ', nombres', 2, 60);
    comprobarTexto(estudiante.apellidos, campo + ', apellidos', 2, 60);
    comprobarTexto(estudiante.direccion, campo + ', dirección', 5, 150);
    comprobarTexto(estudiante.municipio, campo + ', municipio', 2, 60);
    comprobarTexto(estudiante.correo, campo + ', correo', 1, 100);
    comprobarTexto(estudiante.fechaNacimiento, campo + ', nacimiento', 10, 10);
    if (!/^[A-Za-z0-9-]+$/.test(estudiante.codigo)) throw new Error(campo + ': código inválido.');
    if (Validators.email(new FormControl(estudiante.correo))) throw new Error(campo + ': correo inválido.');
    if (fechaNacimientoValida(new FormControl(estudiante.fechaNacimiento))) {
      throw new Error(campo + ': fecha de nacimiento inválida o futura.');
    }
    if (!catalogos.carreras.some(opcion => opcion.id === estudiante.carreraId) ||
        !catalogos.generos.some(opcion => opcion.id === estudiante.genero)) {
      throw new Error(campo + ': carrera o género inexistente.');
    }
    const codigo = estudiante.codigo.toUpperCase();
    if (ids.includes(estudiante.id) || codigos.includes(codigo)) throw new Error(campo + ': id o código repetido.');
    ids.push(estudiante.id);
    codigos.push(codigo);
    if (!Array.isArray(estudiante.telefonos)) throw new Error(campo + ': teléfonos debe ser un arreglo.');
    for (const telefono of estudiante.telefonos) {
      if (!telefono || typeof telefono !== 'object' || Array.isArray(telefono)) {
        throw new Error(campo + ': teléfono inválido.');
      }
      comprobarTexto(telefono.numero, campo + ', teléfono', 1, 30);
      if (numeroTelefonoValido(new FormControl(telefono.numero)) || typeof telefono.activo !== 'boolean' ||
          !catalogos.tiposContacto.some(opcion => opcion.id === telefono.tipo)) {
        throw new Error(campo + ': número, tipo o estado activo del teléfono inválido.');
      }
    }
  }

  const revisadas: Inscripcion[] = [];
  for (let i = 0; i < datos.inscripciones.length; i++) {
    const inscripcion = datos.inscripciones[i];
    const campo = 'Inscripción ' + (i + 1);
    if (!inscripcion || typeof inscripcion !== 'object' || Array.isArray(inscripcion)) {
      throw new Error(campo + ': registro inválido.');
    }
    comprobarTexto(inscripcion.id, campo + ', id');
    const estudiante = datos.estudiantes.find(registro => registro.id === inscripcion.estudianteId);
    // Buscar dentro del archivo nuevo, nunca entre los estudiantes actuales del navegador.
    if (!estudiante) throw new Error(campo + ': estudiante inexistente en el respaldo.');
    if (!catalogos.periodos.some(opcion => opcion.id === inscripcion.periodoId) ||
        !catalogos.jornadas.some(opcion => opcion.id === inscripcion.jornada) ||
        !catalogos.modalidades.some(opcion => opcion.id === inscripcion.modalidad) ||
        !catalogos.estados.some(opcion => opcion.id === inscripcion.estado)) {
      throw new Error(campo + ': período, jornada, modalidad o estado inexistente.');
    }
    if (!Array.isArray(inscripcion.cursoIds) || inscripcion.cursoIds.length === 0) {
      throw new Error(campo + ': selecciona al menos un curso.');
    }
    const cursos: string[] = [];
    for (const id of inscripcion.cursoIds) {
      const curso = catalogos.cursos.find(registro => registro.id === id);
      if (typeof id !== 'string' || !curso || curso.carreraId !== estudiante.carreraId || cursos.includes(id)) {
        throw new Error(campo + ': curso inexistente, repetido o de otra carrera.');
      }
      cursos.push(id);
    }
    if (revisadas.some(registro => registro.id === inscripcion.id ||
        (registro.estudianteId === inscripcion.estudianteId && registro.periodoId === inscripcion.periodoId))) {
      throw new Error(campo + ': id repetido o inscripción duplicada por estudiante y período.');
    }
    revisadas.push(inscripcion);
  }
  return datos;
}
