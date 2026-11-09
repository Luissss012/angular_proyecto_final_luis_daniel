import { Curso } from './curso';
import { OpcionCatalogo } from './opcion-catalogo';

/** Opciones estáticas con las que se comprueban los datos del respaldo. */
export interface CatalogosRespaldo {
  cursos: Curso[];
  carreras: OpcionCatalogo[];
  generos: OpcionCatalogo[];
  tiposContacto: OpcionCatalogo[];
  periodos: OpcionCatalogo[];
  jornadas: OpcionCatalogo[];
  modalidades: OpcionCatalogo[];
  estados: OpcionCatalogo[];
}
