# Preparación de CX Workspace compartido

Proyecto: `xngzkjvddpgkrmkjovpf`. Repositorio: `ggarcia-create/cx-workspace`.

Las tablas y la función `cx-api` están preparadas. La clave pública se incluye en la app; las claves privilegiadas permanecen en Supabase. No añadir contraseñas, certificados ni expedientes al repositorio.

## Acceso

1. Configurar SMTP propio para enviar verificación y recuperación a cualquier usuario. Las plantillas de confirmación y recuperación deben mostrar `{{ .Token }}`. Mantener confirmación de correo activada.
2. Configurar Google OAuth en Supabase con las credenciales del proyecto Google Cloud. Callback de Google: `https://xngzkjvddpgkrmkjovpf.supabase.co/auth/v1/callback`. Añadir a las URLs permitidas de Supabase `http://127.0.0.1:*/callback`, usado con PKCE por la aplicación de escritorio.
3. La función verifica cada token con `auth.getUser()` y aplica los permisos. La opción de gateway «Verify JWT with legacy secret» debe ajustarse para los tokens actuales tras autorización del propietario.
4. Registrar y verificar la cuenta del administrador. Asignar únicamente a esa cuenta `role=admin`, `approved=true` en `cx_profiles`. Nunca aprobar automáticamente al primer usuario registrado.
5. El cliente Tauri tiene el espacio compartido activado. Google está habilitado y el retorno local está registrado. Antes de publicar, completar la prueba interactiva de Google con la cuenta administradora y verificar sus permisos. Las pruebas automatizadas de cuentas pendientes, aprobación y revocación ya cubren el servidor; SMTP/OTP deben verificarse por separado.
6. El administrador puede importar los expedientes y ventas locales una sola vez al espacio vacío. Se conservan los archivos locales; no se importan sus contraseñas.

## Publicación

Los tags `v<versión>` generan un borrador de release con Mac Apple Silicon e Intel (DMG y paquetes TAR.GZ), Windows x64 (EXE), firmas Tauri y latest.json para actualizaciones. Revisar ambos sistemas antes de publicar el borrador.

Las actualizaciones usan la clave privada de Tauri guardada como secreto TAURI_SIGNING_PRIVATE_KEY en GitHub. Mac usa firma ad hoc con permiso JIT para Node, sin notarización de Apple. Mac y Windows pueden mostrar avisos de editor no verificado al instalar; no describir los instaladores como notarizados o firmados por Apple.

La app consulta GitHub al abrir y cada seis horas, descarga la actualización y la instala al cerrar. Cambiar archivos no publica una actualización: incrementar versión, generar tag, revisar y publicar el release.
