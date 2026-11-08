/** Datos de un curso disponible en el catálogo JSON. */
export interface Curso {
  // Referencia que se guarda en cursoIds de una inscripción.
  id: string;
  // Código visible para identificar el curso en los listados.
  codigo: string;
  nombre: string;
  // Valor académico del curso; las fuentes están documentadas en CATALOGOS.md.
  creditos: number;
  // Relación con carreras.json para mostrar cursos de una misma carrera.
  carreraId: string;
}
