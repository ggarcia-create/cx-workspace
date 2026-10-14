CX Workspace 0.9.1 cambia a Tauri para distribuir instaladores de Windows y Mac y recibir actualizaciones firmadas desde GitHub.

- Inicio con Google y acceso al espacio compartido de Supabase. Las cuentas nuevas requieren aprobación del administrador.
- Conserva el motor de expedientes, reparación, calidad, ventas, reportes y permisos.
- Busca actualizaciones al abrir y cada seis horas. Descarga y verifica la firma; aplica al cerrar o desde Actualizaciones.
- Instaladores para Mac Apple Silicon, Mac Intel y Windows x64.
- Los datos locales de Electron se conservan en su carpeta original. Un administrador puede importarlos una vez desde la cuenta al espacio compartido vacío.
- Las sesiones de Google permanecen en memoria y se cierran al salir; no se guardan tokens sin cifrar.
- Los informes PDF usan la ventana de impresión del sistema: elegir Guardar como PDF.

Primera instalación: sustituir manualmente la aplicación anterior por este instalador. Las actualizaciones posteriores utilizarán Tauri. Mac usa firma ad hoc, sin notarización de Apple; pueden aparecer avisos del sistema al instalar.

Borrador para validar Google con una cuenta autorizada y revisar los instaladores antes de marcar esta versión como pública.
