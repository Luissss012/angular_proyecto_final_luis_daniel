import { AbstractControl, ValidationErrors } from '@angular/forms';

/** required no rechaza espacios; este validador sí comprueba el texto recortado. */
export function noSoloEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (typeof valor === 'string' && valor.length > 0 && valor.trim().length === 0) {
    return { soloEspacios: true };
  }
  return null;
}

/** Comprueba una fecha real AAAA-MM-DD y evita nacimientos en el futuro. */
export function fechaNacimientoValida(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) {
    return null; // El campo vacío lo comprueba Validators.required.
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return { fechaInvalida: true };
  }
  const partes = valor.split('-').map(Number);
  const fecha = new Date(0);
  fecha.setFullYear(partes[0], partes[1] - 1, partes[2]);
  fecha.setHours(0, 0, 0, 0);
  if (partes[0] < 1 || fecha.getFullYear() !== partes[0] ||
      fecha.getMonth() !== partes[1] - 1 || fecha.getDate() !== partes[2]) {
    return { fechaInvalida: true };
  }
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return fecha > hoy ? { fechaFutura: true } : null;
}

/** Acepta números locales o internacionales sin convertirlos a cantidades. */
export function numeroTelefonoValido(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) {
    return null; // El campo vacío se controla con required.
  }
  if (typeof valor !== 'string' || !/^\+?[0-9][0-9 ()-]*$/.test(valor)) {
    return { numeroTelefono: true };
  }
  // Los separadores no cuentan como dígitos del número de contacto.
  const digitos = valor.replace(/\D/g, '');
  return digitos.length >= 8 && digitos.length <= 15 ? null : { numeroTelefono: true };
}
