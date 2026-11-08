import { Routes } from '@angular/router';
import { Estudiantes } from './pages/estudiantes/estudiantes';
import { Inscripciones } from './pages/inscripciones/inscripciones';
import { Respaldo } from './pages/respaldo/respaldo';

// Angular muestra en router-outlet el componente correspondiente a la dirección.
export const routes: Routes = [
  // pathMatch full evita que esta redirección se aplique a las demás direcciones.
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'estudiantes', component: Estudiantes, title: 'Estudiantes · UMES' },
  { path: 'inscripciones', component: Inscripciones, title: 'Inscripciones · UMES' },
  { path: 'respaldo', component: Respaldo, title: 'Respaldo · UMES' },
  // La ruta comodín va al final y recupera direcciones que no existen.
  { path: '**', redirectTo: 'estudiantes' },
];
