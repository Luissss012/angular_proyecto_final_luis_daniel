import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RespaldoService } from '../../services/respaldo.service';

/** Acciones de respaldo; el servicio concentra el acceso y la preparación de datos. */
@Component({
  selector: 'app-respaldo',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './respaldo.html',
  styleUrl: './respaldo.css',
})
export class Respaldo {
  mensaje = '';
  error = '';

  constructor(private respaldo: RespaldoService) {}

  exportarDatos(): void {
    this.mensaje = '';
    this.error = '';
    try {
      const nombre = this.respaldo.exportar();
      this.mensaje = 'Se inició la descarga de ' + nombre;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'No se pudo generar el respaldo.';
    }
  }
}
