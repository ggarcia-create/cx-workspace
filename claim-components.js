(function(root){
 const catalog={
 'Estética':[['Rayaduras','Golpes o abolladuras','Desgaste visible','Manchas','Pintura deteriorada','Detalles estéticos no informados'],[]],
 'Pantalla':[['Estrellada o rota','Rayada','Manchas o daño por presión','Marco dañado'],['Sin imagen','Líneas en la imagen','Parpadea','Píxeles muertos','Manchas en la imagen','Brillo bajo o sin iluminación','Colores incorrectos','Pantalla táctil no responde']],
 'Teclado':[['Teclas rotas o faltantes','Teclas hundidas','Daño por líquido'],['No responde','Algunas teclas no funcionan','Escribe caracteres incorrectos','Teclas se repiten','Retroiluminación no funciona']],
 'Touchpad':[['Superficie rota o rayada','Botones dañados'],['No responde','Cursor se mueve solo','Clic no funciona','Gestos no funcionan']],
 'Carcasa / chasis':[['Golpeada','Rota o agrietada','Rayada','Tapa deformada','Tornillos faltantes'],['Piezas sueltas','No cierra correctamente']],
 'Bisagras':[['Rotas','Desprendidas','Soportes quebrados'],['Flojas','Atoradas','No sostienen la pantalla']],
 'Batería':[['Hinchada','Golpeada','Conector dañado'],['No carga','No retiene carga','Se descarga rápidamente','No es detectada','Equipo se apaga sin cargador']],
 'Cargador / cable':[['Cable roto','Conector doblado o roto','Adaptador golpeado'],['No suministra energía','Carga intermitente','Se calienta demasiado','No es reconocido']],
 'RAM':[['Módulo dañado','Contactos dañados'],['No detectada','Errores de memoria','Pantallazos azules','Equipo no inicia con el módulo']],
 'SSD / disco duro':[['Unidad golpeada','Conector dañado'],['No detectado','No inicia el sistema','Lectura o escritura con errores','Lento o se congela','Ruidos anormales']],
 'Tarjeta madre':[['Daño por líquido','Componentes quemados','Conector o pistas dañados'],['No enciende','Se apaga solo','No reconoce componentes','Cortocircuito','No completa el arranque']],
 'Procesador':[['Pines o contactos dañados','Daño físico'],['Sobrecalentamiento','Rendimiento anormal','Equipo se congela','No completa el arranque']],
 'Puertos / conectores':[['Puerto roto','Pines doblados','Conector flojo'],['USB no funciona','HDMI no da imagen','Puerto de carga no funciona','Audio no funciona','Ethernet no funciona']],
 'Wi-Fi / Bluetooth':[['Antena o cable dañado','Módulo dañado'],['No detecta redes','Se desconecta','Velocidad baja','Bluetooth no detecta dispositivos','No conecta dispositivos']],
 'Cámara / micrófono':[['Lente rota','Cable o módulo dañado'],['Cámara sin imagen','Imagen borrosa','Micrófono no capta audio','Audio con ruido']],
 'Bocinas':[['Bocina rota','Cable dañado'],['Sin sonido','Sonido distorsionado','Volumen bajo','Solo funciona una bocina']],
 'Ventilador / refrigeración':[['Aspas rotas','Disipador golpeado'],['Ventilador no gira','Ruido excesivo','Sobrecalentamiento','Se apaga por temperatura']],
 'Sistema operativo': [[],['No inicia','Error al arrancar','Se congela','Reinicios constantes','Controladores no funcionan','Activación incorrecta']],
 'Otro':[['Otro'],['Otro']]
 };
 Object.assign(catalog,{
 'Tarjeta gráfica / GPU':[['Tarjeta golpeada','Conector PCIe dañado','Ventiladores rotos','Daño por líquido'],['Sin imagen','Artefactos gráficos','Falla bajo carga','Sobrecalentamiento','No detectada','Controlador se reinicia','Salidas de video no funcionan']],
 'Fuente de poder':[['Carcasa golpeada','Cableado roto','Conectores quemados'],['No enciende','Voltaje inestable','Se apaga bajo carga','Ruido eléctrico','Ventilador no funciona','Olor a quemado']],
 'Monitor externo':[['Pantalla estrellada','Base rota','Marco golpeado','Cable dañado'],['Sin imagen','No enciende','Líneas en pantalla','Resolución incorrecta','Colores incorrectos','Imagen intermitente','Puertos no funcionan']],
 'Mouse':[['Botones rotos','Cable roto','Carcasa dañada'],['No detectado','Clic doble involuntario','Rueda no funciona','Sensor no responde','Conexión intermitente']],
 'Unidad óptica':[['Bandeja rota','Frente dañado'],['No lee discos','No graba discos','Bandeja no abre','No detectada','Ruido excesivo']],
 'Lector de tarjetas':[['Pines doblados','Ranura rota'],['No reconoce tarjetas','Lectura intermitente','Errores de escritura']],
 'Dock / estación de conexión':[['Conector roto','Carcasa dañada','Cable cortado'],['No detecta el equipo','No carga','USB no funcionan','Video no funciona','Red no funciona','Desconexión intermitente']],
 'Cables / adaptadores':[['Cable cortado','Conector doblado','Aislamiento dañado','Adaptador roto'],['No transmite señal','Conexión intermitente','No carga','No compatible','Se calienta']],
 'Botón de encendido':[['Botón hundido','Botón roto'],['No responde','Respuesta intermitente','Se activa solo']],
 'Audio / conector de audífonos':[['Jack roto','Conector flojo'],['Sin sonido en audífonos','Micrófono externo no funciona','Ruido o interferencia','No detecta audífonos']],
 'Antenas / cables internos':[['Cable cortado','Conector desprendido','Antena rota'],['Señal débil','Conexión intermitente','No hay señal']],
 'Pila CMOS / BIOS / firmware':[ ['Pila sulfatada','Portapila roto'],['Pierde fecha y hora','No guarda configuración','Error de BIOS','No arranca','Firmware desactualizado','Contraseña de BIOS']],
 'Accesorios / empaque':[['Empaque golpeado','Protección insuficiente','Accesorio roto','Accesorio faltante'],['Accesorio no compatible','Accesorio no funciona','Accesorio incorrecto']],
 'Sensores / lector de huellas':[['Sensor rayado','Sensor roto'],['No reconoce huellas','No detectado','Sensor de luz no responde','Sensor de tapa no funciona']]
 });
 catalog.RAM[1].push('Capacidad incorrecta','Frecuencia incorrecta','No compatible','Errores bajo carga');catalog['Wi-Fi / Bluetooth'][1].push('No detecta módulo','Alcance reducido','Bluetooth se desconecta');catalog['Puertos / conectores'][1].push('USB-C no da video','DisplayPort no funciona','Thunderbolt no funciona','Conector serial no funciona');
 catalog.Pantalla[0].push('Cristal desprendido','Presión o fuga de luz','Recubrimiento deteriorado');catalog.Pantalla[1].push('Imagen duplicada','Imagen invertida','Fuga de luz','Zonas oscuras','Pantalla se apaga sola','Imagen congelada','Resolución no ajusta','Falla al conectar cargador');
 catalog.Teclado[1].push('Teclas pegadas','Teclas duras','Fila de teclas no funciona','Bloque numérico no funciona');
 catalog['Batería'][1].push('Carga solo hasta cierto porcentaje','Porcentaje incorrecto','Se calienta','Carga intermitente');
 catalog['SSD / disco duro'][1].push('Capacidad no corresponde','Sectores dañados','Salud deteriorada','Archivos corruptos');
 catalog['Sistema operativo'][1].push('Licencia no válida','Programas no abren','Actualizaciones fallan','Sistema lento','Virus o software no deseado','Idioma incorrecto','Falta software anunciado');
 const reasons=['El producto llegó dañado','El producto no funciona'];
 const legacyReported={
 'Encendido / arranque':['No enciende','Encienden luces o teclado, pero no muestra imagen','Se queda en el logotipo','Windows no inicia','Se reinicia constantemente','Se apaga solo'],
 'Batería / carga / cargador':['Conectado, pero no carga','Enciende el LED, pero no carga','Solo funciona conectado','La batería dura poco','No reconoce el cargador','Cargador dañado o incompleto'],
 'Pantalla / imagen':['Sin imagen','Líneas horizontales o verticales','Parpadea','Manchas o puntos','Imagen distorsionada','Brillo muy bajo','Pantalla estrellada','Falla la función táctil'],
 'Teclado / touchpad':['Algunas teclas no responden','Teclado completo no funciona','Escribe caracteres incorrectos','Touchpad no responde','Clics no funcionan'],
 'Sonido / micrófono / cámara':['No se escucha','Sonido distorsionado','Micrófono no funciona','Cámara sin imagen','Cámara no detectada'],
 'Conexiones / puertos':['No conecta a Wi-Fi','Se desconecta','Bluetooth no funciona','USB no reconoce dispositivos','HDMI no muestra imagen','Ethernet no conecta'],
 'Rendimiento / sistema':['Equipo lento','Se congela','Pantalla azul','Mensaje de error','Aplicaciones no abren','No permite iniciar sesión'],
 'Temperatura / ruido':['Se calienta demasiado','Ventilador hace mucho ruido','Ruido extraño','Se apaga al calentarse'],
 'Estética / estado físico':['Rayones','Golpes','Carcasa rota','Bisagras dañadas','Piezas sueltas','Desgaste excesivo','Suciedad'],
 'Sin contexto suficiente':['El cliente solo indica “no funciona”','No describe la falla','No hay contexto del cliente o del reclamo','Evidencia insuficiente'],
 'Otro problema':['Otro']
 };
 const reported={
 "Encendido": [
  "No enciende",
  "No muestra luces ni actividad",
  "Intenta encender y se apaga",
  "Encendido intermitente",
  "Botón de encendido no responde",
  "Solo enciende después de varios intentos",
  "Encienden luces o teclado, pero no muestra imagen",
  "Emite pitidos o luces de diagnóstico"
 ],
 "Arranque": [
  "Se queda en el logotipo",
  "Windows no inicia",
  "No encuentra dispositivo de arranque",
  "Entra directamente al BIOS",
  "Reinicios durante el arranque",
  "Pantalla negra después del logotipo",
  "Se queda preparando reparación automática",
  "Sistema operativo no encontrado"
 ],
 "Batería": [
  "Hinchada",
  "No retiene carga",
  "No funciona sin cargador",
  "Duración muy corta",
  "Batería no detectada",
  "Porcentaje de carga incorrecto",
  "Se apaga aunque indica carga",
  "Conectada, pero no carga",
  "Carga intermitente",
  "No carga hasta el 100 %",
  "Se descarga estando apagado",
  "Batería dañada físicamente"
 ],
 "Cargador y alimentación": [
  "Cargador roto",
  "Cable dañado",
  "No entrega energía",
  "Cargador no reconocido",
  "Potencia incorrecta",
  "Carga intermitente",
  "Conector flojo",
  "Conector de carga roto",
  "Se calienta demasiado",
  "Enciende el LED, pero no carga",
  "Cargador incompleto",
  "Cargador no compatible"
 ],
 "Pantalla e imagen": [
  "Pantalla estrellada",
  "Líneas horizontales",
  "Líneas verticales",
  "Manchas o puntos",
  "Parpadeo",
  "Sin imagen",
  "Brillo muy bajo",
  "Zonas oscuras",
  "Imagen distorsionada",
  "Fuga de luz",
  "Pantalla se apaga sola",
  "Táctil sin respuesta",
  "Cristal o marco desprendido",
  "Imagen con colores incorrectos",
  "Rayones en pantalla"
 ],
 "Teclado": [
  "Teclas faltantes",
  "Teclas rotas o desprendidas",
  "Algunas teclas no responden",
  "Teclado completo no funciona",
  "Escribe solo",
  "Escribe caracteres incorrectos",
  "Teclas se quedan presionadas",
  "Retroiluminación no funciona",
  "Teclado intermitente",
  "Teclas duras o pegadas"
 ],
 "Touchpad y apuntador": [
  "No responde",
  "Cursor errático",
  "Clic izquierdo no funciona",
  "Clic derecho no funciona",
  "Superficie rota",
  "Botones hundidos",
  "Gestos no funcionan",
  "Funcionamiento intermitente"
 ],
 "Estética / estado físico": [
  "Muchos rayones",
  "Golpes",
  "Abolladuras",
  "Grietas",
  "Carcasa rota",
  "Equipo maltratado",
  "Desgaste excesivo",
  "Pintura desprendida",
  "Suciedad excesiva",
  "Piezas sueltas",
  "Piezas faltantes",
  "Gomas faltantes",
  "Tornillos faltantes",
  "Separación de carcasa",
  "Bisagra rota",
  "Bisagra floja",
  "Bisagra muy dura",
  "Tapa no sostiene su posición",
  "Anclajes desprendidos",
  "Señales de corrosión",
  "Etiquetas o residuos de adhesivo"
 ],
 "Audio y micrófono": [
  "Sin sonido",
  "Sonido distorsionado",
  "Volumen muy bajo",
  "Una bocina no funciona",
  "Micrófono no detectado",
  "Micrófono sin respuesta",
  "Conector de audio sin respuesta",
  "Audio intermitente",
  "Ruido o interferencia"
 ],
 "Cámara": [
  "No detectada",
  "Sin imagen",
  "Imagen borrosa",
  "Funcionamiento intermitente",
  "Lente dañado",
  "Imagen oscura",
  "Obturador o tapa dañada"
 ],
 "Conectividad": [
  "No detecta redes Wi-Fi",
  "Wi-Fi no conecta",
  "Señal Wi-Fi débil",
  "Wi-Fi se desconecta",
  "Bluetooth no detectado",
  "Bluetooth no vincula dispositivos",
  "Bluetooth se desconecta",
  "Ethernet no conecta",
  "Conexión de red intermitente"
 ],
 "Puertos": [
  "USB sin respuesta",
  "USB-C no carga",
  "USB-C no muestra imagen",
  "HDMI sin imagen",
  "DisplayPort sin imagen",
  "Puerto flojo",
  "Puerto roto",
  "Puerto con obstrucción",
  "Lector de tarjetas sin respuesta",
  "Thunderbolt no funciona"
 ],
 "Rendimiento y estabilidad": [
  "Equipo lento",
  "Se congela",
  "Pantalla azul",
  "Aplicaciones se cierran",
  "Reinicios durante el uso",
  "Apagados durante el uso",
  "Falla al abrir varias aplicaciones",
  "Falla intermitente bajo carga",
  "Sistema deja de responder"
 ],
 "Temperatura y ventilación": [
  "Sobrecalentamiento",
  "Ventilador no funciona",
  "Ruido excesivo del ventilador",
  "Vibración",
  "Apagado al calentarse",
  "Rejillas obstruidas",
  "Ventilador funciona constantemente",
  "Ruido extraño"
 ],
 "Almacenamiento": [
  "Disco no detectado",
  "Errores de lectura",
  "Errores de escritura",
  "Archivos corruptos",
  "Ruidos del disco",
  "Capacidad utilizable menor a la esperada",
  "Disco se desconecta",
  "No permite guardar archivos",
  "Advertencia de salud del disco"
 ],
 "Memoria RAM": [
  "Memoria no detectada",
  "Capacidad detectada incorrecta",
  "Errores en prueba de memoria",
  "Falla al usar aplicaciones exigentes",
  "Módulo o ranura con daño visible"
 ],
 "Sistema y programas": [
  "Windows sin activar",
  "Licencia inválida",
  "Controladores faltantes",
  "Actualizaciones fallidas",
  "Aplicaciones no abren",
  "Idioma incorrecto",
  "Programa anunciado faltante",
  "Errores del sistema operativo",
  "Sistema operativo dañado"
 ],
 "Acceso a Windows y cuentas": [
  "Contraseña de Windows caducada",
  "Contraseña de Windows desconocida",
  "Cuenta de Windows bloqueada",
  "PIN no disponible",
  "Solicita recuperación de BitLocker",
  "Equipo vinculado a una organización",
  "No permite agregar una cuenta",
  "Bloqueo de acceso sin identificar"
 ],
 "BIOS y firmware": [
  "BIOS bloqueado con contraseña",
  "Pierde fecha y hora",
  "No guarda configuración",
  "Error de BIOS",
  "Actualización de firmware fallida",
  "No detecta dispositivos desde BIOS",
  "Configuración de firmware incorrecta"
 ],
 "Sin contexto suficiente": [
  "El cliente solo indica “no funciona”",
  "No describe la falla",
  "No hay contexto del cliente o del reclamo",
  "Evidencia insuficiente",
  "Información contradictoria"
 ],
 "Otro problema": [
  "Otro"
 ]
};
 const unifiedReason='Producto no funciona o presenta daños';
 const normalizeReason=r=>[...reasons,unifiedReason].includes(r)?unifiedReason:r;
 const isReported=(r,date)=>r===unifiedReason||(r==='El producto no funciona'&&date>='2026-10-01');
 const api={unifiedReason,normalizeReason,isReported,reportedCategories:()=>Object.keys(reported),reportedSpecifics:c=>(reported[c]||legacyReported[c])?[...new Set([...(reported[c]||[]),...(legacyReported[c]||[]),...(c==='Otro problema'?[]:['Otro'])])]:[],isComponentReason:r=>reasons.includes(r)||r===unifiedReason,components:r=>Object.keys(catalog).filter(c=>catalog[c][reasons.indexOf(r)]?.length).sort((a,b)=>(a==='Otro')-(b==='Otro')),specifics:(r,c)=>catalog[c]?.[reasons.indexOf(r)]?.concat(c==='Otro'?[]:['Otro'])||[]};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.claimComponents=api;
})(globalThis);
