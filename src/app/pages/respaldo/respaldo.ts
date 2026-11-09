import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatosGuardados } from '../../models/datos-guardados';
import { CatalogosRespaldo } from '../../models/catalogos-respaldo';
import { CatalogosService } from '../../services/catalogos.service';
import { RespaldoService } from '../../services/respaldo.service';

/** Valida el archivo completo antes de ofrecer el reemplazo confirmado. */
@Component({
  selector: 'app-respaldo',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './respaldo.html',
  styleUrl: './respaldo.css',
})
export class Respaldo implements OnInit {
  mensaje = '';
  error = '';
  erroresCatalogos: string[] = [];
  leyendo = false;
  pendiente: DatosGuardados | null = null;
  nombreArchivo = '';
  catalogos: CatalogosRespaldo = {
    cursos: [], carreras: [], generos: [], tiposContacto: [],
    periodos: [], jornadas: [], modalidades: [], estados: [],
  };

  constructor(private respaldo: RespaldoService, private servicioCatalogos: CatalogosService) {}

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  cargarCatalogos(): void {
    this.erroresCatalogos = [];
    this.servicioCatalogos.obtenerCursos().subscribe({ next: datos => this.catalogos.cursos = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los cursos.') });
    this.servicioCatalogos.obtenerCarreras().subscribe({ next: datos => this.catalogos.carreras = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar las carreras.') });
    this.servicioCatalogos.obtenerGeneros().subscribe({ next: datos => this.catalogos.generos = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los géneros.') });
    this.servicioCatalogos.obtenerTiposContacto().subscribe({ next: datos => this.catalogos.tiposContacto = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los tipos de contacto.') });
    this.servicioCatalogos.obtenerPeriodos().subscribe({ next: datos => this.catalogos.periodos = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los períodos.') });
    this.servicioCatalogos.obtenerJornadas().subscribe({ next: datos => this.catalogos.jornadas = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar las jornadas.') });
    this.servicioCatalogos.obtenerModalidades().subscribe({ next: datos => this.catalogos.modalidades = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar las modalidades.') });
    this.servicioCatalogos.obtenerEstados().subscribe({ next: datos => this.catalogos.estados = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los estados.') });
  }

  get catalogosListos(): boolean {
    return this.erroresCatalogos.length === 0 && this.catalogos.cursos.length > 0 &&
      this.catalogos.carreras.length > 0 && this.catalogos.generos.length > 0 &&
      this.catalogos.tiposContacto.length > 0 && this.catalogos.periodos.length > 0 &&
      this.catalogos.jornadas.length > 0 && this.catalogos.modalidades.length > 0 && this.catalogos.estados.length > 0;
  }

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

  async seleccionarArchivo(evento: Event): Promise<void> {
    const entrada = evento.target as HTMLInputElement;
    const archivo = entrada.files?.[0];
    this.pendiente = null;
    this.mensaje = '';
    this.error = '';
    this.nombreArchivo = '';
    if (!archivo || !this.catalogosListos) return;
    this.leyendo = true;
    try {
      let texto: string;
      try {
        texto = await archivo.text();
      } catch {
        throw new Error('No se pudo leer el archivo seleccionado.');
      }
      this.pendiente = this.respaldo.validarContenido(texto, this.catalogos);
      this.nombreArchivo = archivo.name;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'No se pudo validar el archivo.';
    } finally {
      this.leyendo = false;
      entrada.value = ''; // Permite volver a seleccionar el mismo archivo.
    }
  }

  cancelarImportacion(): void {
    this.pendiente = null;
    this.nombreArchivo = '';
    this.error = '';
  }

  confirmarImportacion(): void {
    if (!this.pendiente || !this.catalogosListos) return;
    this.error = '';
    this.mensaje = '';
    try {
      const estudiantes = this.pendiente.estudiantes.length;
      const inscripciones = this.pendiente.inscripciones.length;
      this.respaldo.importar(this.pendiente, this.catalogos);
      this.pendiente = null;
      this.nombreArchivo = '';
      this.mensaje = 'Importación correcta: ' + estudiantes + ' estudiantes y ' + inscripciones + ' inscripciones.';
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'No se pudieron reemplazar los datos.';
    }
  }
}
