import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

/** Pantalla inicial: verifica la integración de Angular Material.
 * La navegación y los módulos funcionales se incorporan en próximas entregas.
 */
@Component({
  selector: 'app-root',
  imports: [MatCardModule, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
