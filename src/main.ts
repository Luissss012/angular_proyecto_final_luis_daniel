import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Inicia el componente raíz con los proveedores generales de la aplicación.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
