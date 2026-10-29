# CX Workspace 0.10.26

- Se crean los instaladores macOS con un empaquetado de disco de instalación independiente.
- Los expedientes de meses archivados en Sheets quedan fuera del trabajo activo y en consulta de solo lectura.

# CX Workspace 0.10.25

- La lectura fallida del histórico no altera el estado activo; los históricos cerrados se mantienen intactos.

# CX Workspace 0.10.24

- Los expedientes históricos también se bloquean en el servicio, para que no puedan moverse ni modificarse.
- La validación confirma el modo de solo lectura de los históricos.

# CX Workspace 0.10.23

- La app identifica como históricos los expedientes de meses anteriores, aunque la API aún no devuelva la marca histórica.
- Los históricos no aparecen como trabajo activo y quedan en modo de consulta desde la búsqueda.

# CX Workspace 0.10.22

- Los expedientes históricos sin fecha válida no bloquean la carga de otros registros; solo se marcan con periodos archivados reconocidos.

# CX Workspace 0.10.21

- Los expedientes de meses archivados en Sheets se identifican como históricos y cerrados.
- Los históricos dejan de aparecer como trabajo activo y no generan pendientes operativos.
- Se conservan para consulta y análisis, en modo de solo lectura; no se duplican ni se alteran sus importes.

# CX Workspace 0.10.20

- La carga desde Sheets lee hasta la fila 999, incluidas las filas nuevas posteriores a la 101.
- La detección automática consulta primero las casillas marcadas para reducir lecturas innecesarias.

# CX Workspace 0.10.19

- Cambiar entre «Bandeja» y «Recibidos» mantiene abierto el panel de notificaciones.
- «Marcar todo como leído» conserva compatibilidad con el servicio compartido mientras se actualiza.
- Los errores de lectura aparecen dentro del panel sin borrar su contenido.

# CX Workspace 0.10.18

- Notificaciones divididas entre «Bandeja» para comentarios dirigidos y «Recibidos» para movimientos operativos.
- «Marcar todo como leído» se aplica a la bandeja visible y respeta el destinatario.
- Los movimientos hacia Reparación y Calidad notifican a usuarios activos con permiso para ver el módulo correspondiente.
- Menos consultas de notificaciones en segundo plano; leer o marcar notificaciones no vuelve a cargar el histórico completo.

# CX Workspace 0.10.17

- Las cargas con fecha del 31 de agosto de 2026 o anterior se identifican como históricas, se guardan en Sheets y no se envían a los módulos activos.
- Desde el 1 de septiembre de 2026, la carga conserva su destino normal según el tipo y la recepción del equipo.
- La guía de captura y la vista previa indican la regla de fecha para reducir errores al importar históricos.

# CX Workspace 0.10.16

- Al marcar filas en “Carga rápida”, CX Workspace actualiza automáticamente “Revisión de la carga” mientras está abierto con sesión de administrador. La carga solo se agrega después de la confirmación del administrador.
- “Carga desde Sheets” ahora solo aparece y funciona para Administradores; se rechazan también cuentas con permisos antiguos de Ingresos.
- La columna AM de “Carga rápida” contiene casillas para seleccionar qué filas se revisarán y sincronizarán. Las demás permanecen intactas.
- La revisión de CX Workspace muestra únicamente las filas seleccionadas y conserva la confirmación previa a la importación.
