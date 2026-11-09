// Pruebas aisladas: usan memoria y no acceden a los registros reales del navegador.
import ts from 'typescript';
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Transpilar las clases con TypeScript instalado; no requiere herramientas adicionales.
const salida = path.resolve('.angular/cache/pruebas');
function preparar(carpeta) {
  for (const entrada of readdirSync(carpeta, { withFileTypes: true })) {
    const origen = path.join(carpeta, entrada.name);
    if (entrada.isDirectory()) { preparar(origen); continue; }
    if (!entrada.name.endsWith('.ts') || entrada.name.endsWith('.spec.ts')) continue;
    const destino = path.join(salida, path.relative('src', origen)).replace(/\.ts$/, '.mjs');
    const resultado = ts.transpileModule(readFileSync(origen, 'utf8'), {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022,
        experimentalDecorators: true },
    }).outputText.replace(/from (['"])(\.[^'"]+)\1/g, (texto, comilla, ruta) =>
      'from ' + comilla + ruta + '.mjs' + comilla);
    mkdirSync(path.dirname(destino), { recursive: true });
    writeFileSync(destino, resultado);
  }
}
preparar('src');
const cargar = ruta => import(pathToFileURL(path.join(salida, ruta)).href);
const { AlmacenamientoService } = await cargar('app/services/almacenamiento.service.mjs');
const { RespaldoService } = await cargar('app/services/respaldo.service.mjs');
const { Respaldo } = await cargar('app/pages/respaldo/respaldo.mjs');
const { InscripcionesService } = await cargar('app/services/inscripciones.service.mjs');
const { Estudiantes } = await cargar('app/pages/estudiantes/estudiantes.mjs');
const { Inscripciones } = await cargar('app/pages/inscripciones/inscripciones.mjs');

import '@angular/compiler';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { of, throwError } from 'rxjs';
const memoria=new Map();let falla=false,escrituras=0;
globalThis.localStorage={getItem:k=>memoria.get(k)??null,setItem:(k,v)=>{if(falla)throw Error('Cuota');escrituras++;memoria.set(k,v);}};
const leer=n=>JSON.parse(readFileSync('public/assets/catalogos/'+n+'.json','utf8'));
const listas={cursos:leer('cursos'),carreras:leer('carreras'),generos:leer('generos'),tiposContacto:leer('tipos-contacto'),periodos:leer('periodos'),jornadas:leer('jornadas'),modalidades:leer('modalidades'),estados:leer('estados')};
const catalogos={};for(const [m,n] of [['obtenerCursos','cursos'],['obtenerCarreras','carreras'],['obtenerGeneros','generos'],['obtenerTiposContacto','tipos-contacto'],['obtenerPeriodos','periodos'],['obtenerJornadas','jornadas'],['obtenerModalidades','modalidades'],['obtenerEstados','estados']])catalogos[m]=()=>of(leer(n));
const store=new AlmacenamientoService();const servicio=new RespaldoService(store);
const estudiante={id:'EST-1',codigo:'EST-001',nombres:'Ana',apellidos:'Prueba',fechaNacimiento:'2000-02-29',genero:'Otro',correo:'ana@example.com',direccion:'Calle ejemplo',municipio:'Xela',carreraId:'SIS',telefonos:[{numero:'+502 5555-1234',tipo:'Móvil',activo:false}]};
const inscripcion={id:'INS-1',estudianteId:'EST-1',periodoId:'2026-2',cursoIds:['SIS-WEB'],jornada:'Nocturna',modalidad:'Presencial',estado:'Cancelada'};
store.agregarEstudiante(estudiante);store.guardarInscripciones([inscripcion]);
const base={version:1,estudiantes:[estudiante],inscripciones:[inscripcion]};
assert.deepEqual(servicio.validarContenido(servicio.crearContenido(),listas),base);
const antes=memoria.get('umes-inscripciones');const contador=escrituras;
for(const valor of ['{','null','[]','{}',JSON.stringify({...base,version:'1'}),JSON.stringify({...base,estudiantes:{}})]){
 assert.throws(()=>servicio.validarContenido(valor,listas));assert.equal(memoria.get('umes-inscripciones'),antes);
}
const mutaciones=[d=>d.estudiantes.push({...estudiante}),d=>d.estudiantes.push({...estudiante,id:'OTRO',codigo:'est-001'}),d=>d.estudiantes[0].nombres=' ',d=>d.estudiantes[0].correo='mal',d=>d.estudiantes[0].fechaNacimiento='2026-02-30',d=>d.estudiantes[0].fechaNacimiento='2999-01-01',d=>d.estudiantes[0].carreraId='NO',d=>d.estudiantes[0].genero='NO',d=>d.estudiantes[0].telefonos={},d=>d.estudiantes[0].telefonos[0].activo='false',d=>d.estudiantes[0].telefonos[0].numero='123',d=>d.estudiantes[0].telefonos[0].tipo='NO',d=>d.inscripciones[0].estudianteId='NO',d=>d.estudiantes=[],d=>d.inscripciones[0].cursoIds=['NO'],d=>d.inscripciones[0].cursoIds=['ADM-ADM'],d=>d.inscripciones[0].cursoIds=['SIS-WEB','SIS-WEB'],d=>d.inscripciones[0].cursoIds=[],d=>d.inscripciones[0].periodoId='NO',d=>d.inscripciones[0].jornada='NO',d=>d.inscripciones[0].modalidad='NO',d=>d.inscripciones[0].estado='NO',d=>d.inscripciones.push({...inscripcion,id:'OTRO'}),d=>d.inscripciones.push({...inscripcion,periodoId:'2026-1'})];
for(const mutar of mutaciones){const copia=structuredClone(base);mutar(copia);assert.throws(()=>servicio.importar(copia,listas));assert.equal(memoria.get('umes-inscripciones'),antes);}
assert.equal(escrituras,contador);
const pagina=new Respaldo(servicio,catalogos);pagina.ngOnInit();assert.equal(pagina.catalogosListos,true);
const evento=texto=>({target:{files:[{name:'prueba.json',text:async()=>texto}],value:'prueba.json'}});
await pagina.seleccionarArchivo(evento(JSON.stringify(base)));assert.ok(pagina.pendiente);assert.equal(escrituras,contador);
pagina.cancelarImportacion();assert.equal(pagina.pendiente,null);assert.equal(escrituras,contador);
await pagina.seleccionarArchivo(evento('{'));assert.equal(pagina.pendiente,null);assert.ok(pagina.error);assert.equal(escrituras,contador);
await pagina.seleccionarArchivo({target:{files:[{name:'prueba.json',text:async()=>{throw Error('Lectura');}}],value:'x'}});assert.match(pagina.error,/leer/);
const nuevos={...base,estudiantes:[{...estudiante,id:'NUEVO',codigo:'EST-999'}],inscripciones:[{...inscripcion,estudianteId:'NUEVO'}]};
await pagina.seleccionarArchivo(evento(JSON.stringify(nuevos)));falla=true;pagina.confirmarImportacion();falla=false;
assert.ok(pagina.error);assert.equal(memoria.get('umes-inscripciones'),antes);assert.ok(pagina.pendiente);
pagina.confirmarImportacion();assert.match(pagina.mensaje,/Importación correcta/);assert.equal(pagina.pendiente,null);assert.deepEqual(new AlmacenamientoService().obtenerDatos(),nuevos);
// Recuperar desde un respaldo no depende de poder leer el estado anterior dañado.
memoria.set('umes-inscripciones','dañado');servicio.importar(base,listas);assert.deepEqual(store.obtenerDatos(),base);
servicio.importar({version:1,estudiantes:[],inscripciones:[]},listas);assert.deepEqual(store.obtenerDatos(),{version:1,estudiantes:[],inscripciones:[]});
const sinCatalogos=new Respaldo(servicio,{...catalogos,obtenerCursos:()=>throwError(()=>Error('Red'))});sinCatalogos.ngOnInit();assert.equal(sinCatalogos.catalogosListos,false);
console.log('Correcto: exportar/importar, 30+ casos de estructura y reglas, relaciones internas nuevas, confirmación/cancelación sin cambios, archivo ilegible, cuota agotada, reemplazo único, recarga, respaldo vacío y recuperación de datos dañados.');
// Flujo integrado de estudiantes e inscripciones con las clases reales.
store.agregarEstudiante(estudiante);
const alumnos = new Estudiantes(catalogos, store);
alumnos.ngOnInit();
alumnos.editarEstudiante(estudiante);
alumnos.formulario.controls.nombres.setValue(' a ');
assert.equal(alumnos.formulario.controls.nombres.hasError('minlength'), true);
alumnos.formulario.controls.nombres.setValue('Ana María');
alumnos.guardarEstudiante();
assert.equal(store.obtenerEstudiante('EST-1').nombres, 'Ana María');
assert.equal(store.obtenerEstudiantes().length, 1);
assert.equal(store.obtenerEstudiante('EST-1').id, 'EST-1');
alumnos.busqueda.setValue('ANA');
assert.equal(alumnos.estudiantesFiltrados.length, 1);
const inscripciones = new InscripcionesService(store);
inscripciones.registrar(inscripcion, listas);
assert.throws(() => inscripciones.registrar({ ...inscripcion, id: 'OTRO' }, listas), /ya tiene/);
assert.throws(() => inscripciones.actualizar({ ...inscripcion, cursoIds: ['ADM-ADM'] }, listas), /carrera/);
inscripciones.actualizar({ ...inscripcion, cursoIds: ['SIS-BD'] }, listas);
inscripciones.cancelar(inscripcion.id, listas);
assert.equal(store.obtenerInscripciones().length, 1);
assert.equal(store.obtenerInscripciones()[0].estado, 'Cancelada');
assert.deepEqual(store.obtenerInscripciones()[0].cursoIds, ['SIS-BD']);
assert.throws(() => store.eliminarEstudiante(estudiante.id), /inscripciones/);
const pantallaInscripciones = new Inscripciones(catalogos, store, inscripciones);
pantallaInscripciones.ngOnInit();
pantallaInscripciones.filtros.patchValue({ estado: 'Aprobada' });
assert.equal(pantallaInscripciones.inscripcionesFiltradas.length, 0);
pantallaInscripciones.filtros.patchValue({ estado: 'Cancelada', estudianteId: estudiante.id, periodoId: '2026-2' });
assert.equal(pantallaInscripciones.inscripcionesFiltradas.length, 1);
assert.match(pantallaInscripciones.nombresCursos(['SIS-BD']), /Bases de datos/);
const respaldoFinal = servicio.crearContenido();
servicio.importar(servicio.validarContenido(respaldoFinal, listas), listas);
assert.equal(new AlmacenamientoService().obtenerInscripciones()[0].estado, 'Cancelada');
store.guardarInscripciones([]);
alumnos.solicitarEliminacion(estudiante);
alumnos.cancelarEliminacion();
assert.equal(store.obtenerEstudiantes().length, 1);
alumnos.solicitarEliminacion(estudiante);
alumnos.confirmarEliminacion();
assert.equal(store.obtenerEstudiantes().length, 0);
console.log('Correcto: edición y búsqueda, mínimo sin espacios, id estable, duplicados, cancelar sin borrar, filtros, exportar/importar y eliminación confirmada protegida.');
