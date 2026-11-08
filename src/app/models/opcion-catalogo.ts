/** Estructura común para carreras, períodos y demás opciones de selección. */
export interface OpcionCatalogo {
  // Valor que identifica la opción y que puede guardarse en los registros.
  id: string;
  // Texto que se presenta en el control de selección.
  nombre: string;
}
