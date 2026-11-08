import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

/** Componente raíz que presenta la cabecera y el contenido inicial. */
@Component({
  selector: 'app-root',
  // Componentes Material utilizados por la plantilla.
  imports: [MatCardModule, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
