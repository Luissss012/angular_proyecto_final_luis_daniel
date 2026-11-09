import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Estudiante } from '../../models/estudiante';
import { OpcionCatalogo } from '../../models/opcion-catalogo';
import { CatalogosService } from '../../services/catalogos.service';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { fechaNacimientoValida, noSoloEspacios, numeroTelefonoValido, minimoTexto } from '../../validators/estudiante.validators';

/** Registro y búsqueda de estudiantes con persistencia mediante un servicio. */
@Component({
  selector: 'app-estudiantes',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatTableModule],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css',
})
export class Estudiantes implements OnInit {
  estudiantes: Estudiante[] = [];
  busqueda = new FormControl('', { nonNullable: true });
  columnas = ['codigo', 'nombres', 'apellidos', 'carrera', 'correo', 'acciones'];
  estudianteEnEdicionId: string | null = null;
  detalle: Estudiante | null = null;
  pendienteEliminar: Estudiante | null = null;
  errorOperacion = '';
  mensajeOperacion = '';
  errorListado = '';
  carreras: OpcionCatalogo[] = [];
  generos: OpcionCatalogo[] = [];
  tiposContacto: OpcionCatalogo[] = [];
  errorCarreras = '';
  errorGeneros = '';
  errorTiposContacto = '';
  errorAlmacenamiento = '';
  mensaje = '';
  hoy = this.obtenerHoy();

  // Cada control representa un campo; nonNullable mantiene valores de tipo texto.
  formulario = new FormGroup({
    codigo: new FormControl('', { nonNullable: true, updateOn: 'blur',
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20),
        Validators.pattern(/^[A-Za-z0-9-]+$/)] }),
    nombres: new FormControl('', { nonNullable: true,
      validators: [Validators.required, noSoloEspacios, minimoTexto(2), Validators.maxLength(60)] }),
    apellidos: new FormControl('', { nonNullable: true,
      validators: [Validators.required, noSoloEspacios, minimoTexto(2), Validators.maxLength(60)] }),
    fechaNacimiento: new FormControl('', { nonNullable: true,
      validators: [Validators.required, fechaNacimientoValida] }),
    genero: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl('', { nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(100)] }),
    direccion: new FormControl('', { nonNullable: true,
      validators: [Validators.required, noSoloEspacios, minimoTexto(5), Validators.maxLength(150)] }),
    municipio: new FormControl('', { nonNullable: true,
      validators: [Validators.required, noSoloEspacios, minimoTexto(2), Validators.maxLength(60)] }),
    carreraId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    // FormArray permite agregar o quitar grupos de controles de teléfono.
    telefonos: new FormArray([this.crearTelefono()]),
  });

  constructor(private catalogos: CatalogosService, private almacenamiento: AlmacenamientoService) {}

  ngOnInit(): void {
    // Se agrega después de que Angular haya proporcionado los servicios.
    this.formulario.controls.codigo.addValidators(control => {
      if (!control.value) {
        return null;
      }
      try {
        this.errorAlmacenamiento = '';
        return this.almacenamiento.existeCodigoEstudiantil(control.value, this.estudianteEnEdicionId) ? { codigoRepetido: true } : null;
      } catch (error) {
        this.errorAlmacenamiento = error instanceof Error ? error.message : 'No se pudo consultar el código.';
        return { almacenamiento: true };
      }
    });
    this.cargarCatalogos();
    this.cargarEstudiantes();
  }

  // Devuelve el arreglo para recorrerlo en HTML y modificar sus filas.
  get telefonos() {
    return this.formulario.controls.telefonos;
  }

  crearTelefono() {
    return new FormGroup({
      numero: new FormControl('', { nonNullable: true,
        validators: [Validators.required, numeroTelefonoValido] }),
      tipo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      activo: new FormControl(true, { nonNullable: true }),
    });
  }

  agregarTelefono(): void {
    this.telefonos.push(this.crearTelefono());
    this.mensaje = '';
  }

  quitarTelefono(indice: number): void {
    this.telefonos.removeAt(indice);
    this.mensaje = '';
  }

  cargarCatalogos(): void {
    this.errorCarreras = '';
    this.errorGeneros = '';
    this.errorTiposContacto = '';
    this.catalogos.obtenerCarreras().subscribe({
      next: opciones => this.carreras = opciones,
      error: () => this.errorCarreras = 'No se pudo cargar la lista de carreras.',
    });
    this.catalogos.obtenerGeneros().subscribe({
      next: opciones => this.generos = opciones,
      error: () => this.errorGeneros = 'No se pudo cargar la lista de géneros.',
    });
    this.catalogos.obtenerTiposContacto().subscribe({
      next: opciones => this.tiposContacto = opciones,
      error: () => this.errorTiposContacto = 'No se pudo cargar la lista de tipos de contacto.',
    });
  }

  cargarEstudiantes(): void {
    this.errorListado = '';
    try {
      this.estudiantes = this.almacenamiento.obtenerEstudiantes();
    } catch (error) {
      this.errorListado = error instanceof Error ? error.message : 'No se pudo cargar el listado.';
    }
  }

  // La búsqueda no modifica los registros: devuelve solo las coincidencias.
  get estudiantesFiltrados(): Estudiante[] {
    const texto = this.busqueda.value.trim().toLowerCase();
    return this.estudiantes.filter(estudiante =>
      estudiante.codigo.toLowerCase().includes(texto) ||
      (estudiante.nombres + ' ' + estudiante.apellidos).toLowerCase().includes(texto));
  }

  nombreCarrera(carreraId: string): string {
    const carrera = this.carreras.find(opcion => opcion.id === carreraId);
    return carrera ? carrera.nombre : carreraId;
  }

  verDetalle(estudiante: Estudiante): void {
    this.errorOperacion = '';
    this.mensajeOperacion = '';
    this.pendienteEliminar = null;
    try {
      // Consultar el servicio evita mostrar una copia antigua del listado.
      this.detalle = this.almacenamiento.obtenerEstudiante(estudiante.id);
    } catch (error) {
      this.errorOperacion = error instanceof Error ? error.message : 'No se pudo consultar el estudiante.';
    }
  }

  editarEstudiante(estudiante: Estudiante): void {
    this.errorOperacion = '';
    this.mensajeOperacion = '';
    try {
      const actual = this.almacenamiento.obtenerEstudiante(estudiante.id);
      this.limpiarFormulario();
      // Fijar el id antes de validar el código para no detectarse como duplicado.
      this.estudianteEnEdicionId = actual.id;
      this.telefonos.clear();
      for (const telefono of actual.telefonos) {
        const grupo = this.crearTelefono();
        grupo.setValue(telefono);
        this.telefonos.push(grupo);
      }
      this.formulario.patchValue(actual);
      this.formulario.markAsPristine();
      this.formulario.markAsUntouched();
      this.detalle = null;
      this.pendienteEliminar = null;
    } catch (error) {
      this.errorOperacion = error instanceof Error ? error.message : 'No se pudo cargar la edición.';
    }
  }

  solicitarEliminacion(estudiante: Estudiante): void {
    this.errorOperacion = '';
    this.mensajeOperacion = '';
    this.detalle = null;
    this.pendienteEliminar = estudiante;
  }

  cancelarEliminacion(): void {
    this.pendienteEliminar = null;
    this.errorOperacion = '';
  }

  confirmarEliminacion(): void {
    if (!this.pendienteEliminar) return;
    const id = this.pendienteEliminar.id;
    try {
      this.almacenamiento.eliminarEstudiante(id);
      if (this.estudianteEnEdicionId === id) this.limpiarFormulario();
      this.pendienteEliminar = null;
      this.detalle = null;
      this.errorOperacion = '';
      this.cargarEstudiantes();
      this.mensajeOperacion = 'Estudiante eliminado correctamente.';
    } catch (error) {
      this.errorOperacion = error instanceof Error ? error.message : 'No se pudo eliminar el estudiante.';
    }
  }

  guardarEstudiante(): void {
    this.mensaje = '';
    // Reconsulta el código por si el almacenamiento cambió desde la última revisión.
    this.formulario.controls.codigo.updateValueAndValidity();
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid || this.carreras.length === 0 || this.generos.length === 0 ||
        (this.telefonos.length > 0 && this.tiposContacto.length === 0)) {
      return;
    }
    const valores = this.formulario.getRawValue();
    // Comprobar que las selecciones aún pertenecen a los catálogos cargados.
    if (!this.carreras.some(carrera => carrera.id === valores.carreraId) ||
        !this.generos.some(genero => genero.id === valores.genero) ||
        valores.telefonos.some(telefono => !this.tiposContacto.some(tipo => tipo.id === telefono.tipo))) {
      this.errorAlmacenamiento = 'Selecciona opciones válidas en carrera, género y tipos de contacto.';
      return;
    }
    try {
      const estudiante: Estudiante = {
        // El id interno permanece independiente del código estudiantil visible.
        id: this.estudianteEnEdicionId ?? crypto.randomUUID(),
        codigo: valores.codigo.trim().toUpperCase(),
        nombres: valores.nombres.trim(),
        apellidos: valores.apellidos.trim(),
        fechaNacimiento: valores.fechaNacimiento,
        genero: valores.genero,
        correo: valores.correo.trim(),
        direccion: valores.direccion.trim(),
        municipio: valores.municipio.trim(),
        carreraId: valores.carreraId,
        telefonos: valores.telefonos.map(telefono => ({
          numero: telefono.numero.trim(), tipo: telefono.tipo, activo: telefono.activo,
        })),
      };
      const editando = this.estudianteEnEdicionId !== null;
      if (editando) {
        this.almacenamiento.actualizarEstudiante(estudiante);
      } else {
        this.almacenamiento.agregarEstudiante(estudiante);
      }
      this.detalle = null;
      this.pendienteEliminar = null;
      // Solo limpiar y mostrar éxito después de que el servicio termine de guardar.
      this.limpiarFormulario();
      this.cargarEstudiantes();
      this.mensaje = editando ? 'Estudiante actualizado correctamente.' : 'Estudiante registrado correctamente.';
    } catch (error) {
      this.errorAlmacenamiento = error instanceof Error ? error.message : 'No se pudo guardar el estudiante.';
    }
  }

  limpiarFormulario(): void {
    this.estudianteEnEdicionId = null;
    // reset no elimina filas del FormArray; reconstruimos una sola fila inicial.
    this.telefonos.clear();
    this.telefonos.push(this.crearTelefono());
    this.formulario.reset();
    this.errorAlmacenamiento = '';
    this.mensaje = '';
  }

  // Devuelve un mensaje junto al campo cuando ya fue tocado o revisado.
  errorCampo(nombre: string): string {
    const campo = this.formulario.get(nombre);
    if (!campo || !campo.touched || !campo.errors) {
      return '';
    }
    if (campo.hasError('required')) return 'Este campo es obligatorio.';
    if (campo.hasError('soloEspacios')) return 'Escribe un dato, no solo espacios.';
    if (campo.hasError('minlength')) return 'Mínimo ' + campo.getError('minlength').requiredLength + ' caracteres.';
    if (campo.hasError('maxlength')) return 'Máximo ' + campo.getError('maxlength').requiredLength + ' caracteres.';
    if (campo.hasError('email')) return 'Escribe un correo válido.';
    if (campo.hasError('numeroTelefono')) return 'Usa de 8 a 15 dígitos; puedes incluir + al inicio, espacios, guiones y paréntesis.';
    if (campo.hasError('pattern')) return 'Usa solo letras, números y guiones, sin espacios.';
    if (campo.hasError('fechaInvalida')) return 'Selecciona una fecha válida.';
    if (campo.hasError('fechaFutura')) return 'La fecha de nacimiento no puede ser futura.';
    if (campo.hasError('codigoRepetido')) return 'Este código estudiantil ya está registrado.';
    if (campo.hasError('almacenamiento')) return 'No se pudo comprobar si el código está disponible.';
    return 'Revisa este campo.';
  }

  private obtenerHoy(): string {
    const fecha = new Date();
    // Fecha local para evitar diferencias de día respecto de UTC.
    return fecha.getFullYear() + '-' + String(fecha.getMonth() + 1).padStart(2, '0') +
      '-' + String(fecha.getDate()).padStart(2, '0');
  }
}
