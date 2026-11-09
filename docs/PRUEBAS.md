# Demostración de respaldos y comprobación funcional

## Ejemplos

- `ejemplos/respaldo-valido.json`: un estudiante ficticio con un teléfono y una inscripción coherente.
- `ejemplos/respaldo-invalido.json`: la misma inscripción contiene un curso inexistente. Debe rechazarse sin cambiar los datos actuales.

Ambos archivos se analizaron con el validador del proyecto. El válido se acepta y el inválido se rechaza. No contienen datos personales reales.

## Pasos para demostrar en el navegador

1. Registrar un estudiante ficticio y una inscripción; anotar el código y período.
2. Abrir Respaldo y pulsar Exportar datos. Conservar el archivo descargado.
3. Elegir ese archivo para importar. Verificar las cantidades y pulsar Cancelar. Consultar que los registros sigan iguales.
4. Elegir nuevamente el archivo y confirmar el reemplazo. Verificar el mensaje y abrir los listados mediante los enlaces. Recargar y revisar las relaciones y los teléfonos.
5. Elegir respaldo-invalido.json. Debe informar que el curso es inválido y conservar los registros anteriores.
6. Probar un archivo que contenga solo `{`. Debe informar JSON inválido y conservar los datos.
7. Intentar repetir estudiante/período; debe rechazarlo. Editar una inscripción existente debe conservar su id.
8. Cancelar una inscripción y recargar: debe seguir listada como Cancelada. Intentar eliminar su estudiante debe quedar bloqueado.

Seleccionar y confirmar un ejemplo válido reemplaza todos los registros actuales. Exportar primero el estado que se desee conservar.

## Ejecución automatizada

`npm run verificar` ejecuta el recorrido integrado y los casos inválidos sobre memoria. No completa por sí solo la revisión visual o la demostración de descarga real del navegador. Los resultados ejecutados y pendientes figuran en VERIFICACIONES.md.
