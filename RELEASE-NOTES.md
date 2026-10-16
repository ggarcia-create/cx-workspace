# CX Workspace 0.10.9

- Buscar actualizaciones disponible antes de iniciar sesión, en cuentas pendientes y al fallar el arranque del acceso.
- La consulta inicial de la sesión guardada deja de bloquear la pantalla de entrada si tarda en responder.
- Recuperación del arranque con Volver a intentar, sin tener que cerrar la aplicación.
- Las cuentas pendientes muestran el correo utilizado para identificar la cuenta correcta.
- Mantiene la aprobación y los permisos asignados por el administrador; actualizar no concede acceso a los módulos.

- Las cuentas nuevas inician sesión en la interfaz sin módulos ni datos. El administrador habilita qué pueden ver y editar. Los permisos existentes se conservan.
- Permite guardar permisos de cuentas identificadas por correo, sin aplicarles la validación de usuario local.
