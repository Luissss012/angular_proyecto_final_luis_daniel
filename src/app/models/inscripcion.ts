/** Relación entre un estudiante, un período y los cursos seleccionados. */
export interface Inscripcion {
  id: string;
  // Identificador de un estudiante existente; no copia sus datos personales.
  estudianteId: string;
  // Identificador de una opción de periodos.json.
  periodoId: string;
  // Identificadores de cursos existentes, sin duplicar sus datos completos.
  cursoIds: string[];
  // Valores de los catálogos de jornadas, modalidades y estados.
  jornada: string;
  modalidad: string;
  estado: string;
}
