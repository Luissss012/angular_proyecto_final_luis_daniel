import { Estudiante } from './estudiante';
import { Inscripcion } from './inscripcion';

/** Las dos colecciones se guardan juntas para conservar sus relaciones. */
export interface DatosGuardados {
  version: number;
  estudiantes: Estudiante[];
  inscripciones: Inscripcion[];
}
