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
