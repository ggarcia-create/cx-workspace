# CX Workspace · Tauri 0.9.1

Aplicación de Customer Experience para Windows x64 y macOS Apple Silicon / Intel. Tauri administra las ventanas, diálogos y actualizaciones; un proceso Node incluido conserva el motor de negocio existente. No requiere instalar Node en los equipos de los usuarios.

## Compilar

Requiere Node 24, pnpm 10, Rust y las herramientas de compilación de Tauri para cada sistema. `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm start` o `pnpm build:mac` / `pnpm build:win`. El script de preparación incluye únicamente los archivos de interfaz y empaqueta el motor en un recurso separado. Los datos y las claves privadas nunca se incluyen.

## Acceso y datos

Google y correo utilizan Supabase (`xngzkjvddpgkrmkjovpf`), validando el usuario y sus permisos en `cx-api`. Las cuentas nuevas esperan aprobación. La sesión se mantiene en memoria, sin tokens en texto plano en disco. Permitir `http://127.0.0.1:*/callback` en Supabase para completar Google mediante PKCE. La autenticación final debe probarse interactivamente con una cuenta autorizada.

La carpeta de datos sigue siendo `Application Support/cx-workspace` en Mac y `%APPDATA%/cx-workspace` en Windows. La importación explícita solo transmite expedientes y ventas; no contraseñas. No usar simultáneamente Electron y Tauri para editar la misma base local.

## Actualizaciones y GitHub

El workflow genera tres instaladores y paquetes con firma Tauri, y reúne `latest.json` en un borrador de release. Solo se publica una versión cuando los tres trabajos terminan correctamente y se valida el acceso. Para cada actualización: incrementar las versiones de package.json, Cargo.toml, tauri.conf.json e interfaz; actualizar Cargo.lock; enviar tag `vX.Y.Z` o ejecutar el workflow. Revisar el borrador y publicarlo para que los clientes lo reciban.

GitHub necesita `TAURI_SIGNING_PRIVATE_KEY`. La clave pública está en tauri.conf.json. La privada debe conservarse fuera del repositorio y respaldarse: perderla impide actualizar instalaciones existentes. No cambiarla sin plan de rotación. No se requieren secretos de Apple para la firma ad hoc configurada, pero no equivale a notarización ni elimina avisos de Gatekeeper.

Se comprueba al iniciar y cada seis horas, se descarga automáticamente, se verifica la firma y se instala al cerrar o mediante el botón de actualizar. La migración inicial desde Electron se instala manualmente.

Los informes PDF mantienen el HTML y CSS originales y abren el diálogo nativo de impresión para guardar como PDF. CSV sigue usando Guardar archivo.
