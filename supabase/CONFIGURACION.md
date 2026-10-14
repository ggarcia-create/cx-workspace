# Preparación de CX Workspace compartido

Proyecto: `xngzkjvddpgkrmkjovpf`. Repositorio: `ggarcia-create/cx-workspace`.

Las tablas y la función `cx-api` están preparadas. La clave pública se incluye en la app; las claves privilegiadas permanecen en Supabase. No añadir contraseñas, certificados ni expedientes al repositorio.

## Acceso

1. Configurar SMTP propio para enviar verificación y recuperación a cualquier usuario. Las plantillas de confirmación y recuperación deben mostrar `{{ .Token }}`. Mantener confirmación de correo activada.
2. Configurar Google OAuth en Supabase con las credenciales del proyecto Google Cloud. Callback de Google: `https://xngzkjvddpgkrmkjovpf.supabase.co/auth/v1/callback`. Añadir a las URLs permitidas de Supabase `http://127.0.0.1:*/callback`, usado con PKCE por la aplicación de escritorio.
3. La función verifica cada token con `auth.getUser()` y aplica los permisos. La opción de gateway «Verify JWT with legacy secret» debe ajustarse para los tokens actuales tras autorización del propietario.
4. Registrar y verificar la cuenta del administrador. Asignar únicamente a esa cuenta `role=admin`, `approved=true` en `cx_profiles`. Nunca aprobar automáticamente al primer usuario registrado.
5. Probar cuenta pendiente, aprobación, edición, revocación, Google, OTP y recuperación antes de activar `enabled` en `cloud-config.json`.
6. El administrador puede importar los expedientes y ventas locales una sola vez al espacio vacío. Se conservan los archivos locales; no se importan sus contraseñas.

## Publicación

Los tags `v<versión>` generan un borrador de release con Mac universal (DMG y ZIP), Windows x64 (EXE), metadatos y archivos para actualizaciones. Revisar ambos sistemas antes de publicar el borrador.

Mac necesita certificado Developer ID y notarización para distribución y actualizaciones. Configurar los secretos del workflow directamente en GitHub. Windows sin certificado puede mostrar aviso de editor desconocido; no describirlo como firmado.

La app consulta GitHub al abrir y cada seis horas, descarga la actualización y la instala al cerrar. Cambiar archivos no publica una actualización: incrementar versión, generar tag, revisar y publicar el release.
