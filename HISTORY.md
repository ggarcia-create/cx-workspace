# CX Workspace · v0.8.5

Decoraciones automáticas según la fecha local: Halloween del 1 al 31 de octubre; Día de Muertos del 1 al 3 de noviembre; Navidad del 4 de noviembre al 6 de enero. El resto del año usa el diseño habitual. Configuración / Apariencia permite elegir Automático, Sin decoraciones o una temporada manual; la preferencia se guarda en este equipo. Se revisa la fecha al abrir, al recuperar el foco y cada minuto, sin recargar formularios. Navidad usa nieve y regalos pequeños, sin luces; la nieve ocupa un margen reservado. Los adornos de Halloween y Día de Muertos no reciben clics y reservan espacio dentro del encabezado de las tarjetas. No se modifican expedientes, cuentas ni datos de negocio.

Aplicación de escritorio local para Customer Experience.

## Acceso y usuarios

En el primer inicio se crea la cuenta administradora con nombre, usuario y contraseña elegidos por la persona responsable. No hay contraseña administradora predeterminada. Desde el menú de la cuenta, el administrador abre **Usuarios y permisos** para crear cuentas, asignar contraseñas iniciales, cambiar roles y permisos, restablecer contraseñas o desactivar cuentas. Cada usuario debe cambiar su contraseña inicial antes de acceder.

Roles: Administrador, Agente CX y Consulta. Los permisos Ver y Editar se asignan a Registros, Devoluciones, Reparación y Facturación. Consulta no puede editar. Crear o modificar expedientes requiere edición de Registros y del módulo de destino. Solo Administrador puede eliminar expedientes, con confirmación, y gestionar cuentas.

Los permisos se verifican en el proceso principal, además de ocultar acciones en la interfaz. Las contraseñas se almacenan con sal y hash scrypt. La sesión termina al cerrar la aplicación o cerrar sesión.

## Registros y expedientes

Los cuatro formularios incluyen datos del pedido, motivo de reclamo y motivo específico dependiente. Se añade un campo obligatorio con el motivo específico en palabras del cliente y la posibilidad de agregar varias fallas, cada una con motivo y falla específica u Otro. Se pueden quitar fallas del formulario antes de guardar.

Total automático: cantidad × precio unitario. Resolución y destino automáticos:

- Devolución → Devoluciones / En proceso.
- Cambio de equipo → Devoluciones / En proceso, etiqueta Devolución para cambio.
- Servicio → Reparación / Equipos en servicio.
- Reembolso parcial → Devoluciones / Cerradas; porcentaje o monto manual con cálculo automático.

Las listas usan tarjetas, búsqueda, filtros, detalle y edición según permisos. Los expedientes anteriores se importan al primer acceso administrador. Sus campos nuevos se muestran como Sin especificar y se completan al editarlos. La eliminación queda registrada internamente y no puede deshacerse.

## Datos locales

Cuentas y expedientes se guardan en `cx-data-v1.json` en la carpeta de datos de la aplicación. Los usuarios de esta instalación comparten los expedientes según permisos. No hay servidor ni sincronización entre computadoras. Los permisos de la aplicación no sustituyen los del sistema operativo para proteger estos archivos. Conservar la carpeta de datos es necesario para mantener registros y cuentas.

La vista de navegador indica que se debe usar la aplicación de escritorio para acceder.

## Instaladores

Mac universal, Intel y Apple Silicon: `dist/CX-Workspace-0.5.0-mac-universal.dmg`, sin firma ni notarización Apple. Windows aún no se ha compilado.

Para desarrollo, con Node.js y npm: `npm install`, `npm start`, y `npm run build:mac` en Mac o `npm run build:win` en Windows.

## Seguimiento técnico y cierre

El detalle del expediente incluye Ubicación, Información general para consulta del técnico e Información de reparación (técnico responsable, fecha de ingreso, diagnóstico, trabajos, componentes, resultado y observaciones). La ubicación es una etiqueta automática derivada del módulo y submódulo, sin campo manual. Retiros corresponde a Devoluciones / Con retiro y los expedientes técnicos indican Expedientes • Reparación con su sección. La captura de reparación requiere permiso de edición del módulo; los datos técnicos solo pueden registrarse en Reparación.

Una devolución en proceso puede cerrarse a favor de Rematech y pasar a Cerradas, o con reembolso al comprador: Retiro Full exige número de retiro y pasa a Con retiro; Regreso a Full pasa a Cerradas. El cierre registra resultado, responsable y fecha. Editar los datos generales conserva el estado y destino del expediente. El traslado de una devolución al área de Reparación aún no tiene un flujo definido; los expedientes de Servicio ya se crean en esa área.

La versión 0.3.2 usa pestañas superiores: Ubicación (incluye gestión del cierre y recepción), Información general e Información de reparación. La información general no admite edición tras el registro, incluso para administradores. Solo el número de serie/barcode se puede actualizar, con permiso de edición de Devoluciones, en Retiros tras confirmar recepción física. Estas reglas también se verifican en el proceso principal.

Información general usa tarjetas para Datos del pedido, Detalles del reclamo y Resolución y total. El relato del cliente se destaca con un fondo crema tenue; el diseño se adapta al ancho de ventana y conserva las restricciones de edición.

En v0.5.0, marcar la recepción física en Retiros muestra el número de serie / SN y Guardar y enviar a Expedientes • Devoluciones. La operación guarda SN, recepción y traslado a Reparación / Devoluciones en una sola escritura; requiere permiso de edición de Devoluciones y Reparación.

## Calidad (v0.5.0)
Calidad replica los tres submódulos de Reparación. Guardar y enviar a Calidad requiere resultado técnico Reparado y permiso de edición de Reparación; conserva el submódulo. Calidad consulta los datos técnicos sin modificarlos. Aprobar exige confirmar pruebas satisfactorias y archiva el expediente; rechazar requiere observaciones y lo devuelve al mismo submódulo de Reparación. El selector Pendientes / Archivados permite consultar los expedientes archivados. Permisos de Calidad independientes, gestionados por el administrador. Validaciones con usuario, fecha e historial persistido.

## Reparación / Técnico (v0.5.0)
Nuevo rol técnico, con acceso de edición a Reparación. Identidad del técnico determinada por la sesión; el administrador puede seleccionar un técnico activo. Otros roles no pueden registrar diagnósticos. Casillas para componentes con fallas. Al guardar: Cambio de equipo mueve a Reparación / Cambio de equipo; Reparado envía automáticamente a Calidad; Se requiere pza, No reparable y No entra en garantía permanecen en Reparación. Los cinco resultados notifican a todos los administradores en la campana, con lectura individual persistida. Notificaciones locales a esta instalación, sin correo ni sincronización remota.

## Configuración (v0.6.0)
La barra lateral incluye Configuración al final. Ventas manuales captura fecha, canal, pedido, equipo y precio sin IVA, calcula Total con IVA 16% y deja el registro listo para conectar a Facturación. Usuarios y permisos abre el administrador de cuentas.

El nombre del producto conserva automáticamente enlaces HTTP/HTTPS incluidos en el HTML del portapapeles al pegar una celda de Sheets. Si solo llega texto, permanece texto. El enlace se conserva en el expediente y se abre en el navegador externo.

Los reclamos por daño o falta de funcionamiento se capturan como motivo → componente → falla específica, incluyendo fallas adicionales.

Configuración: registro persistente de totales mensuales por Shopify, Mercado Libre, Amazon, Coppel y Walmart, acumulado anual e historial. Gestión de usuarios con búsqueda, alta, roles y permisos.

Registros: modos 1 por 1 y carga masiva. Cada lote admite hasta 100 formularios; se revisa antes de guardar, conserva las rutas y se guarda completo en una sola operación. Los registros de la lista todavía no son expedientes guardados.

En reembolsos parciales, Total corresponde al reembolso calculado; Total del pedido conserva el importe de venta. También se normalizan los expedientes de versiones anteriores.

Cambio de equipo: confirmación de recepción física desde Devoluciones en proceso y envío directo a Reparación / Expedientes • Cambio de equipo, sin resultado de cierre.

Dashboard: ventas registradas de todos los meses, independientes del filtro de fechas. El canal filtra la base de ventas y los expedientes. El periodo filtra los reclamos y reclamos ejecutados. Los reembolsos parciales usan el reembolso calculado en ejecutados y el importe de venta en reclamos totales. Gráficas interactivas y selección de motivo para consultar fallas específicas.

Dashboard: histórico con línea y área azul, dona por canal, columnas de motivos y barras horizontales de fallas, con paleta coordinada y datos interactivos.

La barra superior permanece visible al desplazarse. El buscador global consulta expedientes autorizados por pedido, serie/barcode, producto y número de expediente, y abre su ubicación actual.

Recepción directa al registrar: las devoluciones y cambios de equipo ya recibidos pueden enviarse directamente a su submódulo de Reparación, en captura individual o masiva. La lista masiva permite aplicar la opción a todos y completar series/SN pendientes antes del guardado atómico.

Desde ingresos con fecha 1 de octubre de 2026: área responsable obligatoria. Fallas específicas de selección múltiple mediante casillas, también en fallas adicionales; catálogo ampliado de componentes y fallas. Expedientes anteriores mantienen sus datos. El Dashboard desglosa cada falla seleccionada.

Temporalidades: los adornos aprobados se muestran mediante recortes CSS de las imágenes originales, en la esquina inferior derecha. No cambian el diseño ni reciben clics. Se ocultan al coincidir con tarjetas o controles. Fechas: Halloween 1–31 octubre, Día de Muertos 1–3 noviembre, Navidad 4 noviembre–6 enero. Selección automática o manual en Configuración → Apariencia.
