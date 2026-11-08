import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

/** Pantalla de estudiantes seleccionada mediante las rutas. */
@Component({
  selector: 'app-estudiantes',
  imports: [MatCardModule],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css',
})
export class Estudiantes {}
