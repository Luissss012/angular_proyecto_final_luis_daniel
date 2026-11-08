import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { OpcionCatalogo } from '../models/opcion-catalogo';

/** Lee los archivos JSON públicos; no modifica los catálogos. */
@Injectable({ providedIn: 'root' })
export class CatalogosService {
  private readonly ruta = 'assets/catalogos/';

  // Angular entrega una instancia de HttpClient al crear este servicio.
  constructor(private http: HttpClient) {}

  // La petición se ejecuta cuando el componente se suscribe al resultado.
  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.ruta + 'cursos.json');
  }

  obtenerCarreras(): Observable<OpcionCatalogo[]> {
    return this.http.get<OpcionCatalogo[]>(this.ruta + 'carreras.json');
  }

  obtenerPeriodos(): Observable<OpcionCatalogo[]> {
    return this.http.get<OpcionCatalogo[]>(this.ruta + 'periodos.json');
  }

  obtenerGeneros(): Observable<OpcionCatalogo[]> {
    return this.http.get<OpcionCatalogo[]>(this.ruta + 'generos.json');
  }

  obtenerJornadas(): Observable<OpcionCatalogo[]> {
    return this.http.get<OpcionCatalogo[]>(this.ruta + 'jornadas.json');
  }

  obtenerModalidades(): Observable<OpcionCatalogo[]> {
    return this.http.get<OpcionCatalogo[]>(this.ruta + 'modalidades.json');
  }

  obtenerEstados(): Observable<OpcionCatalogo[]> {
    return this.http.get<OpcionCatalogo[]>(this.ruta + 'estados.json');
  }

  obtenerTiposContacto(): Observable<OpcionCatalogo[]> {
    return this.http.get<OpcionCatalogo[]>(this.ruta + 'tipos-contacto.json');
  }
}
