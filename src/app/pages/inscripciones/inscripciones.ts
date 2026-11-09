import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { Curso } from '../../models/curso';
import { Inscripcion } from '../../models/inscripcion';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Estudiante } from '../../models/estudiante';
import { OpcionCatalogo } from '../../models/opcion-catalogo';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { CatalogosService } from '../../services/catalogos.service';

/** Selección de estudiante, período y cursos mediante un formulario reactivo. */
@Component({
  selector: 'app-inscripciones',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule,
    MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatTableModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css',
})
export class Inscripciones implements OnInit {
  registrosInscripciones: Inscripcion[] = [];
  detalleInscripcion: Inscripcion | null = null;
  errorListado = '';
  columnas = ['estudiante', 'periodo', 'cursos', 'estado', 'acciones'];
  filtros = new FormGroup({
    estudianteId: new FormControl('', { nonNullable: true }),
    periodoId: new FormControl('', { nonNullable: true }),
    estado: new FormControl('', { nonNullable: true }),
  });
  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  carreras: OpcionCatalogo[] = [];
  periodos: OpcionCatalogo[] = [];
  jornadas: OpcionCatalogo[] = [];
  modalidades: OpcionCatalogo[] = [];
  estados: OpcionCatalogo[] = [];
  errorEstudiantes = '';
  erroresCatalogos: string[] = [];
  errorSeleccion = '';
  mensaje = '';

  formulario = new FormGroup({
    estudianteId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    periodoId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    // Una inscripción conserva ids de cursos, no copias de los objetos completos.
    cursoIds: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
    jornada: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    modalidad: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl('Registrada', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private catalogos: CatalogosService, private almacenamiento: AlmacenamientoService,
    private inscripciones: InscripcionesService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.cargarCatalogos();
    this.cargarInscripciones();
  }

  cargarEstudiantes(): void {
    this.errorEstudiantes = '';
    try {
      this.estudiantes = this.almacenamiento.obtenerEstudiantes();
    } catch (error) {
      this.errorEstudiantes = error instanceof Error ? error.message : 'No se pudieron cargar los estudiantes.';
    }
  }

  cargarCatalogos(): void {
    this.erroresCatalogos = [];
    this.catalogos.obtenerCursos().subscribe({
      next: datos => this.cursos = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los cursos.'),
    });
    this.catalogos.obtenerCarreras().subscribe({
      next: datos => this.carreras = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar las carreras.'),
    });
    this.catalogos.obtenerPeriodos().subscribe({
      next: datos => this.periodos = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los períodos.'),
    });
    this.catalogos.obtenerJornadas().subscribe({
      next: datos => this.jornadas = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar las jornadas.'),
    });
    this.catalogos.obtenerModalidades().subscribe({
      next: datos => this.modalidades = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar las modalidades.'),
    });
    this.catalogos.obtenerEstados().subscribe({
      next: datos => this.estados = datos,
      error: () => this.erroresCatalogos.push('No se pudieron cargar los estados.'),
    });
  }

  cargarInscripciones(): void {
    this.errorListado = '';
    try {
      this.registrosInscripciones = this.almacenamiento.obtenerInscripciones();
    } catch (error) {
      this.errorListado = error instanceof Error ? error.message : 'No se pudo cargar el listado de inscripciones.';
    }
  }

  get inscripcionesFiltradas(): Inscripcion[] {
    const filtros = this.filtros.getRawValue();
    // Los filtros se combinan; una opción vacía significa todas las opciones.
    return this.registrosInscripciones.filter(inscripcion =>
      (!filtros.estudianteId || inscripcion.estudianteId === filtros.estudianteId) &&
      (!filtros.periodoId || inscripcion.periodoId === filtros.periodoId) &&
      (!filtros.estado || inscripcion.estado === filtros.estado));
  }

  nombreEstudiante(id: string): string {
    const estudiante = this.estudiantes.find(registro => registro.id === id);
    return estudiante ? estudiante.codigo + ' · ' + estudiante.nombres + ' ' + estudiante.apellidos : id;
  }

  nombresCursos(ids: string[]): string {
    // Resolver los nombres desde el catálogo sin copiarlos dentro de la inscripción.
    return ids.map(id => this.cursos.find(curso => curso.id === id)?.nombre ?? id).join(', ');
  }

  creditosInscripcion(inscripcion: Inscripcion): number {
    return inscripcion.cursoIds.reduce((total, id) =>
      total + (this.cursos.find(curso => curso.id === id)?.creditos ?? 0), 0);
  }

  verDetalle(inscripcion: Inscripcion): void {
    this.errorListado = '';
    try {
      const actual = this.almacenamiento.obtenerInscripciones().find(registro => registro.id === inscripcion.id);
      if (!actual) throw new Error('La inscripción ya no existe. Actualiza el listado.');
      this.detalleInscripcion = actual;
    } catch (error) {
      this.detalleInscripcion = null;
      this.errorListado = error instanceof Error ? error.message : 'No se pudo consultar la inscripción.';
    }
  }

  get estudianteSeleccionado(): Estudiante | undefined {
    return this.estudiantes.find(estudiante => estudiante.id === this.formulario.controls.estudianteId.value);
  }

  get cursosDisponibles(): Curso[] {
    const estudiante = this.estudianteSeleccionado;
    return estudiante ? this.cursos.filter(curso => curso.carreraId === estudiante.carreraId) : [];
  }

  get carreraSeleccionada(): string {
    return this.carreras.find(carrera => carrera.id === this.estudianteSeleccionado?.carreraId)?.nombre ?? '';
  }

  get totalCreditos(): number {
    return this.cursosDisponibles
      .filter(curso => this.formulario.controls.cursoIds.value.includes(curso.id))
      .reduce((total, curso) => total + curso.creditos, 0);
  }

  get catalogosListos(): boolean {
    return this.erroresCatalogos.length === 0 && this.cursos.length > 0 && this.carreras.length > 0 &&
      this.periodos.length > 0 && this.jornadas.length > 0 && this.modalidades.length > 0 && this.estados.length > 0;
  }

  cambiarEstudiante(): void {
    // No conservar cursos del estudiante anterior, aunque pertenezca a otra carrera.
    this.formulario.controls.cursoIds.reset();
    this.mensaje = '';
    this.errorSeleccion = '';
  }

  seleccionarCurso(id: string, marcado: boolean): void {
    const control = this.formulario.controls.cursoIds;
    if (marcado && this.cursosDisponibles.some(curso => curso.id === id)) {
      if (!control.value.includes(id)) control.setValue([...control.value, id]);
    } else {
      control.setValue(control.value.filter(cursoId => cursoId !== id));
    }
    control.markAsTouched();
    this.mensaje = '';
    this.errorSeleccion = '';
  }

  validarSeleccion(): boolean {
    this.mensaje = '';
    this.errorSeleccion = '';
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid || !this.catalogosListos || this.errorEstudiantes) return false;
    const valores = this.formulario.getRawValue();
    // Comprobar también los valores recibidos por el código, no solo por los controles.
    if (!this.estudianteSeleccionado ||
        !this.periodos.some(periodo => periodo.id === valores.periodoId) ||
        !this.jornadas.some(jornada => jornada.id === valores.jornada) ||
        !this.modalidades.some(modalidad => modalidad.id === valores.modalidad) ||
        !this.estados.some(estado => estado.id === valores.estado) ||
        valores.cursoIds.some(id => !this.cursosDisponibles.some(curso => curso.id === id)) ||
        new Set(valores.cursoIds).size !== valores.cursoIds.length) {
      this.errorSeleccion = 'Revisa las opciones y selecciona cursos válidos de la carrera del estudiante, sin repetirlos.';
      return false;
    }
    return true;
  }

  guardarInscripcion(): void {
    if (!this.validarSeleccion()) return;
    const valores = this.formulario.getRawValue();
    try {
      const inscripcion: Inscripcion = {
        id: crypto.randomUUID(),
        estudianteId: valores.estudianteId,
        periodoId: valores.periodoId,
        cursoIds: valores.cursoIds,
        jornada: valores.jornada,
        modalidad: valores.modalidad,
        estado: valores.estado,
      };
      this.inscripciones.registrar(inscripcion, {
        cursos: this.cursos, periodos: this.periodos, jornadas: this.jornadas,
        modalidades: this.modalidades, estados: this.estados,
      });
      // Conservar el formulario si hay un error; limpiarlo solo después del guardado.
      this.limpiarFormulario();
      this.detalleInscripcion = null;
      this.cargarInscripciones();
      this.mensaje = 'Inscripción registrada correctamente.';
    } catch (error) {
      this.errorSeleccion = error instanceof Error ? error.message : 'No se pudo guardar la inscripción.';
    }
  }

  limpiarFormulario(): void {
    this.formulario.reset();
    this.mensaje = '';
    this.errorSeleccion = '';
  }
}
