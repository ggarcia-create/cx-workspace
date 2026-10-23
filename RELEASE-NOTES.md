# CX Workspace 0.10.14

- Botón “Sincronizar desde Sheets” en la aplicación y enlace desde la hoja para abrir la carga rápida.
- El enlace enfoca la aplicación abierta o inicia CX Workspace y muestra la revisión de destinos.
- Se conservan la validación previa y la confirmación antes de agregar y limpiar filas. El módulo de carga desde Sheets permanece disponible.

# CX Workspace 0.10.13

- La captura de expedientes se realiza desde “Carga rápida” en Google Sheets; el formulario manual fue retirado.
- CX Workspace permite revisar campos, folios previstos y destino por fila antes de confirmar la sincronización.
- Las filas importadas se limpian para la siguiente carga; los folios definitivos y pedidos quedan en “Historial de cargas”.
- Devoluciones y cambios pendientes permanecen en Devoluciones · En proceso. Una devolución solo pasa a Reparación cuando se confirma su llegada; los cambios esperan confirmación de ejecución.

# CX Workspace 0.10.12

- Calidad ahora gestiona únicamente equipos registrados como Servicio.
- Cuando Reparación termina una devolución o cambio, el expediente se archiva en Reparación; ya no aparece en Calidad.
- Los expedientes antiguos de devoluciones ubicados en Calidad se migran a Reparación como archivados.
- El formulario de Servicio permite indicar si el equipo tiene contraseña y capturarla de forma opcional. Solo los usuarios con permisos de edición de Reparación o Calidad pueden verla.

# CX Workspace 0.10.11

- Conversaciones y comentarios dentro de cada expediente.
- Notificaciones dirigidas a uno o varios usuarios con acceso de lectura al módulo.
- Los comentarios se conservan junto con el expediente en el almacenamiento histórico.
