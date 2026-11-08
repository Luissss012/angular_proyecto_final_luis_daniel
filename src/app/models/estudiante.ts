import { Telefono } from './telefono';

/** Datos personales y de contacto de un estudiante. */
export interface Estudiante {
  // Referencia interna estable utilizada por las inscripciones.
  id: string;
  // Código estudiantil único; se distingue del identificador interno.
  codigo: string;
  nombres: string;
  apellidos: string;
  // Formato AAAA-MM-DD, compatible con el valor de un input date.
  fechaNacimiento: string;
  // Valor del catálogo de géneros.
  genero: string;
  correo: string;
  direccion: string;
  municipio: string;
  // Identificador de carreras.json, utilizado para filtrar los cursos.
  carreraId: string;
  // Cada contacto tiene su propio número, tipo y estado activo.
  telefonos: Telefono[];
}
