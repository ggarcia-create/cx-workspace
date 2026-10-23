# CX Workspace · Tauri 0.10.0

Aplicación de Customer Experience para Windows x64 y macOS 13.5 o posterior, Apple Silicon / Intel. Tauri administra las ventanas, diálogos y actualizaciones; un proceso Node incluido conserva el motor de negocio existente. No requiere instalar Node en los equipos de los usuarios.

## Compilar

Requiere Node 24, pnpm 10, Rust y las herramientas de compilación de Tauri para cada sistema. `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm start` o `pnpm build:mac` / `pnpm build:win`. El script de preparación incluye únicamente los archivos de interfaz y empaqueta el motor en un recurso separado. Los datos y las claves privadas nunca se incluyen.

## Acceso y datos

Google y correo utilizan Supabase (`xngzkjvddpgkrmkjovpf`), validando el usuario y sus permisos en `cx-api`. Las cuentas nuevas esperan aprobación. «Recordar sesión en este equipo» conserva el acceso cifrado con AES-256-GCM; la clave se protege en el llavero de macOS o el administrador de credenciales de Windows. No se guardan contraseñas. Cerrar sesión elimina el acceso guardado de este equipo. Permitir `http://127.0.0.1:*/callback` en Supabase para completar Google mediante PKCE. La autenticación final debe probarse interactivamente con una cuenta autorizada.

La carpeta de datos sigue siendo `Application Support/cx-workspace` en Mac y `%APPDATA%/cx-workspace` en Windows. La importación explícita solo transmite expedientes y ventas; no contraseñas. No usar simultáneamente Electron y Tauri para editar la misma base local.

## Actualizaciones y GitHub

El workflow genera tres instaladores y paquetes con firma Tauri, y reúne `latest.json` en un borrador de release. Solo se publica una versión cuando los tres trabajos terminan correctamente y se valida el acceso. Para cada actualización: incrementar las versiones de package.json, Cargo.toml, tauri.conf.json e interfaz; actualizar Cargo.lock; enviar tag `vX.Y.Z` o ejecutar el workflow. Revisar el borrador y publicarlo para que los clientes lo reciban.

GitHub necesita `TAURI_SIGNING_PRIVATE_KEY`. La clave pública está en tauri.conf.json. La privada debe conservarse fuera del repositorio y respaldarse: perderla impide actualizar instalaciones existentes. No cambiarla sin plan de rotación. No se requieren secretos de Apple para la firma ad hoc configurada, pero no equivale a notarización ni elimina avisos de Gatekeeper.

Se comprueba al iniciar y cada seis horas, se descarga automáticamente, se verifica la firma y se instala al cerrar o mediante el botón de actualizar. La migración inicial desde Electron se instala manualmente.

Los informes generales o por área se generan como PDF directamente y se guardan con el diálogo nativo. El mismo motor genera los adjuntos enviados desde el servidor. CSV respeta el periodo y área seleccionados. Ver supabase/CONFIGURACION.md para configurar el remitente SMTP de reportes.

## Flujo y análisis

Los expedientes nuevos se capturan en la pestaña «Carga rápida» del respaldo verificado de Google Sheets. CX Workspace valida cada fila, muestra su folio y módulo de destino, y pide confirmación antes de crear el expediente. Al completarse, limpia solo los datos de captura y registra el folio en «Historial de cargas»; las fórmulas, validaciones y formato quedan listos para la siguiente tanda. Las filas que requieren corrección permanecen en la hoja.

Los cambios nuevos esperan en Devoluciones en proceso la confirmación de recepción y cambio efectuado. Al terminar Reparación, los expedientes de devoluciones y cambios se archivan directamente; solo los expedientes de servicio pasan a Calidad. Calidad conserva únicamente la lista de equipos en servicio. La versión 3 del esquema migra devoluciones que antes estaban en Calidad a Reparación como archivadas y deja los servicios en Calidad. La captura de un servicio permite marcar si el equipo tiene contraseña; solo usuarios con permiso de edición en Reparación o Calidad pueden consultarla.

El dashboard enlaza motivo, problema/componente y falla específica. Los pasteles usan porcentajes de menciones para que sumen 100 %; cada detalle muestra además el porcentaje de expedientes del grupo y su importe. Las fallas adicionales se incluyen sin duplicar un expediente dentro del mismo problema. Los reportes incluyen los cuatro KPI y conservan la base global de ventas de todos los meses.

## Catálogo unificado y área responsable

Los registros nuevos usan «Producto no funciona o presenta daños», con selección múltiple de síntomas. BIOS y acceso a Windows son categorías separadas; bisagras y estructura se incluyen en Estética / estado físico. Los motivos anteriores se conservan y agrupan juntos en filtros y análisis. El área responsable es obligatoria al crear o editar registros de cualquier fecha; no se inventa un área para expedientes históricos.
