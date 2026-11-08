import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

/** Pantalla de respaldo de datos seleccionada mediante las rutas. */
@Component({
  selector: 'app-respaldo',
  imports: [MatCardModule],
  templateUrl: './respaldo.html',
  styleUrl: './respaldo.css',
})
export class Respaldo {}
