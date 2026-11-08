import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

/** Pantalla de inscripciones seleccionada mediante las rutas. */
@Component({
  selector: 'app-inscripciones',
  imports: [MatCardModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css',
})
export class Inscripciones {}
