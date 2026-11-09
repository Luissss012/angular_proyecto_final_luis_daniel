import { Curso } from './curso';
import { OpcionCatalogo } from './opcion-catalogo';

/** Catálogos de lectura utilizados para comprobar las referencias de una inscripción. */
export interface CatalogosInscripcion {
  cursos: Curso[];
  periodos: OpcionCatalogo[];
  jornadas: OpcionCatalogo[];
  modalidades: OpcionCatalogo[];
  estados: OpcionCatalogo[];
}
