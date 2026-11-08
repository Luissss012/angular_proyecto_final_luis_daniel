/** Datos de un número de contacto. No es un componente visual. */
export interface Telefono {
  // Texto para conservar prefijos, ceros iniciales y separadores.
  numero: string;
  // Valor del catálogo tipos-contacto: Móvil, Casa, Trabajo u Otro.
  tipo: string;
  // true indica que este número está activo; false lo conserva como inactivo.
  activo: boolean;
}
