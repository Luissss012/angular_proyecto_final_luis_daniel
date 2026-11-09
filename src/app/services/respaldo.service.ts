import { Injectable } from '@angular/core';
import { AlmacenamientoService } from './almacenamiento.service';

/** Genera un respaldo versionado sin modificar los registros del navegador. */
@Injectable({ providedIn: 'root' })
export class RespaldoService {
  constructor(private almacenamiento: AlmacenamientoService) {}

  crearContenido(): string {
    // Incluye version, estudiantes e inscripciones; los catálogos no se exportan.
    const datos = this.almacenamiento.obtenerDatos();
    return JSON.stringify(datos, null, 2);
  }

  exportar(): string {
    const contenido = this.crearContenido();
    const archivo = new Blob([contenido], { type: 'application/json' });
    const direccion = URL.createObjectURL(archivo);
    const enlace = document.createElement('a');
    const nombre = this.nombreArchivo();
    enlace.href = direccion;
    enlace.download = nombre;
    try {
      // El enlace temporal permite descargar el archivo sin enviarlo a un servidor.
      document.body.appendChild(enlace);
      enlace.click();
    } finally {
      enlace.remove();
      // Dar tiempo al navegador para iniciar la descarga antes de liberar la URL.
      setTimeout(() => URL.revokeObjectURL(direccion), 1000);
    }
    return nombre;
  }

  private nombreArchivo(): string {
    const fecha = new Date();
    const dia = fecha.getFullYear() + '-' + String(fecha.getMonth() + 1).padStart(2, '0') +
      '-' + String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0') + '-' +
      String(fecha.getMinutes()).padStart(2, '0') + '-' + String(fecha.getSeconds()).padStart(2, '0');
    return 'umes_respaldo_' + dia + '_' + hora + '.json';
  }
}
