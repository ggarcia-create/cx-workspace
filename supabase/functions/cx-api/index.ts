// @ts-nocheck
const catalogRoot={};
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
 root.claimComponents=api;
})(catalogRoot);

const claimComponents=catalogRoot.claimComponents;
import {scryptSync,randomBytes,timingSafeEqual,randomUUID} from 'node:crypto';
const modules=['dashboard','registros','devoluciones','reparacion','calidad','facturacion','configuracion'];
const locations={devoluciones:['Devoluciones en proceso','Retiros','Devoluciones cerradas'],reparacion:['Expedientes • Reparación / Devoluciones','Expedientes • Reparación / Cambio de equipo','Expedientes • Reparación / Equipos en servicio'],calidad:['Expedientes • Calidad / Devoluciones','Expedientes • Calidad / Cambio de equipo','Expedientes • Calidad / Equipos en servicio'],facturacion:['Facturas pendientes','Facturas creadas']};
const routes=[['devoluciones',0,'En proceso de devolución'],['devoluciones',0,'En proceso de devolución'],['reparacion',2,'Reparación'],['devoluciones',2,'Reembolso parcial']];
function createBusinessStore(initialState,actorId){

 let data=structuredClone(initialState);

 // Preserve the purchase amount while normalizing partial-refund records from older versions.
 data.records=data.records.map(r=>r.type===3&&Number.isSafeInteger(r.refund)?{...r,orderTotal:r.orderTotal??r.quantity*r.price,total:r.refund}:r);
 data.notifications=data.notifications||[];data.monthlySales=data.monthlySales||[];let session=actorId;const attempts=new Map();
 function persist(next){data=structuredClone(next);}
 const publicUser=u=>({id:u.id,name:u.name,username:u.username,role:u.role,permissions:u.permissions,active:u.active,mustChangePassword:u.mustChangePassword});
 function password(value){if(typeof value!=='string'||value.length<8||value.length>128)throw Error('La contraseña debe tener entre 8 y 128 caracteres.');const salt=randomBytes(16).toString('hex');return {salt,hash:scryptSync(value,salt,64).toString('hex')};}
 function verify(value,u){if(typeof value!=='string'||value.length>128)return false;return timingSafeEqual(scryptSync(value,u.salt,64),Buffer.from(u.hash,'hex'));}
 function actor(){const u=data.users.find(u=>u.id===session&&u.active);if(!u)throw Error('Inicia sesión para continuar.');if(u.mustChangePassword)throw Error('Cambia tu contraseña inicial para continuar.');return u;}
 function allowed(u,module,action){return u.role==='admin'||Boolean(u.permissions?.[module]?.view&&(action==='view'||u.permissions[module].edit));}
 function authorize(module,action='view'){const u=actor();if(!allowed(u,module,action))throw Error('No tienes permiso para esta acción.');return u;}
 function admin(){const u=actor();if(u.role!=='admin')throw Error('Solo el administrador puede realizar esta acción.');return u;}
 function log(next,u,action,id){next.audit.push({at:new Date().toISOString(),userId:u.id,action,id});}
 function userInput(input){const username=String(input.username||'').trim().toLowerCase();const name=String(input.name||'').trim();if(!/^[a-z0-9._-]{3,50}$/.test(username)||!name||name.length>100)throw Error('Indica un nombre y un usuario válido de 3 a 50 caracteres (letras, números, punto, guion).');if(!['admin','agent','viewer','technician','intake','quality'].includes(input.role))throw Error('Selecciona un rol válido.');const permissions=Object.fromEntries(modules.map(m=>[m,{view:Boolean(input.permissions?.[m]?.view),edit:input.role!=='viewer'&&Boolean(input.permissions?.[m]?.view&&input.permissions?.[m]?.edit)}]));return {username,name,role:input.role,permissions};}
 function recordInput(input,legacy=false){
 const t=Number(input.type),baseRoute=routes[t],receivedOnRegistration=!legacy&&input.receivedOnRegistration===true;if(receivedOnRegistration&&![0,1].includes(t))throw Error('La recepción directa solo aplica a devoluciones y cambios de equipo.');const route=receivedOnRegistration?['reparacion',t===1?1:0,'Reparación']:baseRoute;if(!route)throw Error('Tipo de registro inválido.');
 const text=(v,max,required=true)=>{const s=String(v??'').trim();if((required&&!s)||s.length>max)throw Error('Revisa los campos obligatorios del registro.');return s;};
 const quantity=Number(input.quantity),price=Number(input.price);if(!Number.isInteger(quantity)||quantity<1||quantity>1000000||!Number.isSafeInteger(price)||price<1||price>10000000000)throw Error('Cantidad o precio inválidos.');
 const total=quantity*price;if(!Number.isSafeInteger(total))throw Error('Total inválido.');
 const date=text(input.date,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw Error('Fecha inválida.');
 const contact=text(input.contact,50);if(!['Mercado Libre','Shopify','Coppel','Walmart','Amazon'].includes(contact))throw Error('Medio de contacto inválido.');
 const specifics=v=>{const values=Array.isArray(v.specificReasons)?[...new Set(v.specificReasons.map(x=>text(x,2000)))]:[text(v.specificReason,2100)];if(!values.length||values.length>30)throw Error('Selecciona entre 1 y 30 fallas específicas.');return values;};
 const specificReasons=specifics(input);
 const responsibleArea=text(input.responsibleArea,100,!legacy)||null;if(responsibleArea&&!['Empaque - Logística','Ecommerce - Marketing','Cliente','Acondicionamiento','Paquetería'].includes(responsibleArea))throw Error('Selecciona un área responsable válida.');
 const additionalFaults=Array.isArray(input.additionalFaults)?input.additionalFaults.map(f=>({reason:text(f.reason,1000),specificReasons:specifics(f),specificReason:text(specifics(f).join(' · '),10000),component:text(f.component,100,false)||null})):[];if(additionalFaults.length>50)throw Error('Máximo 50 fallas adicionales.');
 let refund=null,percentage=null,refundMode=null;if(t===3){refundMode=input.refundMode;if(refundMode==='percentage'){percentage=Number(input.percentage);if(!Number.isFinite(percentage)||percentage<=0||percentage>100)throw Error('Porcentaje inválido.');refund=Math.round(total*percentage/100);}else if(refundMode==='manual'){refund=Number(input.refund);}else throw Error('Método de reembolso inválido.');if(!Number.isSafeInteger(refund)||refund<1||refund>total)throw Error('El reembolso debe ser positivo y no superar el total.');}
 const component=text(input.component,100,false)||null;
 for(const f of [{reason:input.reason,component,specificReasons},...additionalFaults]){if(f.component){const reported=claimComponents.isReported(f.reason,date)&&(!legacy||input.claimClassification==='reported-problem'||claimComponents.reportedCategories().includes(f.component)),options=reported?claimComponents.reportedSpecifics(f.component):claimComponents.specifics(f.reason,f.component);if(f.specificReasons.some(value=>!options.includes(value)&&!(options.includes('Otro')&&value.startsWith('Otro: '))))throw Error('Revisa el componente y la falla específica.');}}
 if(!legacy){for(const f of [{reason:input.reason,component},...additionalFaults])if(claimComponents.isReported(f.reason,date)&&!f.component)throw Error('Selecciona el problema reportado por el cliente.');for(const f of additionalFaults)if(claimComponents.isReported(f.reason,date))f.claimClassification='reported-problem';}
 let productUrl=null;if(input.productUrl){const raw=text(input.productUrl,2048,false);let url;try{url=new URL(raw);}catch{throw Error('Enlace del producto inválido.');}if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error('Enlace del producto inválido.');productUrl=url.href;}
 const serial=text(input.serial,150,receivedOnRegistration);const receivedOutcome=receivedOnRegistration&&t===0?input.receivedOutcome:null;if(receivedOnRegistration&&t===0&&!['buyer','rematech'].includes(receivedOutcome))throw Error('Selecciona la resolución del reclamo: Reembolso al comprador o Cerrado a favor de Rematech.');
 return {type:t,claimClassification:!legacy&&claimComponents.isReported(input.reason,date)?'reported-problem':null,receivedOutcome,responsibleArea,specificReasons,receivedOnRegistration,date,order:text(input.order,100),product:text(input.product,300),productUrl,component,serial,quantity,price,contact,reason:text(input.reason,1000),specificReason:text(specificReasons.join(' · '),10000),customerReason:text(input.customerReason,3000,!legacy),additionalFaults,resolution:route[2],total:t===3?refund:total,orderTotal:total,module:route[0],index:route[1],tag:t===1?'Devolución para cambio':null,refund,percentage,refundMode};
 }
 const api={
 faultReportData(input){authorize('dashboard');if(!input||!/^\d{4}-\d{2}-\d{2}$/.test(input.from)||!/^\d{4}-\d{2}-\d{2}$/.test(input.to)||input.from>input.to)throw Error('Selecciona un rango de fechas válido.');return structuredClone(data.records.filter(r=>r.date>=input.from&&r.date<=input.to));},
 dashboardData(){authorize('dashboard');return {records:structuredClone(data.records),monthlySales:structuredClone(data.monthlySales)};},
 listMonthlySales(){authorize('configuracion');return structuredClone(data.monthlySales);},
 saveMonthlySales(input){const u=authorize('configuracion','edit');if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(String(input.month))||Number(input.month.slice(0,4))<2000||Number(input.month.slice(0,4))>2100)throw Error('Selecciona un mes válido.');const channels=['Shopify','Mercado Libre','Amazon','Coppel','Walmart'];const totals=Object.fromEntries(channels.map(c=>{const value=input.totals?.[c];if(!Number.isSafeInteger(value)||value<0||value>1000000000000)throw Error('Revisa los totales de ventas.');return [c,value];}));const next=structuredClone(data),existing=next.monthlySales.find(r=>r.month===input.month);const entry={month:input.month,totals,updatedAt:new Date().toISOString(),updatedBy:u.name};if(existing)Object.assign(existing,entry);else next.monthlySales.push({...entry,createdAt:entry.updatedAt});log(next,u,'monthly-sales-save',input.month);persist(next);return this.listMonthlySales();},
 status(){return {setupRequired:!data.users.length};},
 setup(input){if(data.users.length)throw Error('La cuenta administradora ya está configurada.');const fields=userInput({...input,role:'admin'});const u={...fields,id:randomUUID(),...password(input.password),active:true,mustChangePassword:false};persist({...data,users:[u]});session=u.id;return publicUser(u);},
 login(input){const key=String(input.username||'').trim().toLowerCase();const a=attempts.get(key)||{count:0,until:0};if(a.until>Date.now())throw Error('Demasiados intentos. Espera un minuto.');const u=data.users.find(u=>u.username===key&&u.active);if(!u||!verify(input.password,u)){a.count++;if(a.count>=5){a.until=Date.now()+60000;a.count=0;}attempts.set(key,a);throw Error('Usuario o contraseña incorrectos.');}attempts.delete(key);session=u.id;return publicUser(u);},
 logout(){session=null;return true;},
 changePassword(input){const u=data.users.find(u=>u.id===session&&u.active);if(!u||!verify(input.currentPassword,u))throw Error('Contraseña actual incorrecta.');if(input.currentPassword===input.password)throw Error('Elige una contraseña diferente.');const next=structuredClone(data),target=next.users.find(x=>x.id===u.id);Object.assign(target,password(input.password),{mustChangePassword:false});log(next,u,'password-change',u.id);persist(next);return publicUser(target);},
 listRecords(){const u=actor();return data.records.filter(r=>allowed(u,r.module,'view')).map(r=>({...r,location:(locations[r.module]?.[r.index]||r.module)+(r.archived?' · Archivado':'')}));},
 saveRecords(input){const u=authorize('registros','edit');if(!Array.isArray(input)||!input.length||input.length>100)throw Error('Agrega entre 1 y 100 registros por lote.');const entries=input.map((item,i)=>{try{if(item.editId)throw Error('Solo se pueden agregar registros nuevos.');const r=recordInput(item);authorize(r.module,'edit');return r;}catch(err){throw Error('Registro '+(i+1)+': '+err.message);}});const next=structuredClone(data);for(const r of entries){const id=randomUUID();next.records.unshift({...r,id,expedientNumber:next.nextNumber++,createdAt:new Date().toISOString(),...(r.receivedOnRegistration?{receipt:{receivedAt:new Date().toISOString(),receivedBy:u.id},...(r.type===0?{closure:{outcome:r.receivedOutcome,fullAction:null,withdrawalNumber:null,closedAt:new Date().toISOString(),closedBy:u.id}}:{}),...(r.type===1?{returnMitigated:true}:{})}:{})});log(next,u,'record-create',id);}persist(next);return this.listRecords();},
 saveRecord(input){const u=authorize('registros','edit');const r=recordInput(input);authorize(r.module,'edit');const next=structuredClone(data);if(input.editId){throw Error('La información general del expediente es de solo lectura.');}else{const id=randomUUID();next.records.unshift({...r,id,expedientNumber:next.nextNumber++,createdAt:new Date().toISOString(),...(r.receivedOnRegistration?{receipt:{receivedAt:new Date().toISOString(),receivedBy:u.id},...(r.type===0?{closure:{outcome:r.receivedOutcome,fullAction:null,withdrawalNumber:null,closedAt:new Date().toISOString(),closedBy:u.id}}:{}),...(r.type===1?{returnMitigated:true}:{})}:{})});log(next,u,'record-create',id);}persist(next);return this.listRecords();},
 confirmReceipt(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==1)throw Error('La recepción solo se confirma en Retiros.');const u=authorize('devoluciones','edit');if(input.receivedHere!==true)throw Error('Confirma que el equipo ya fue recibido.');if(old.receipt)return this.listRecords();const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.receipt={receivedAt:new Date().toISOString(),receivedBy:u.id};log(next,u,'equipment-received',r.id);persist(next);return this.listRecords();},
 receiveExchange(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.type!==1||old.module!=='devoluciones'||old.index!==0)throw Error('Solo se pueden recibir cambios de equipo en Devoluciones en proceso.');const u=authorize('devoluciones','edit');authorize('reparacion','edit');if(input.receivedHere!==true)throw Error('Confirma que el equipo ya está aquí.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id),at=new Date().toISOString();r.receipt={receivedAt:at,receivedBy:u.id};r.returnMitigated=true;r.module='reparacion';r.index=1;r.resolution='Reparación';r.updatedAt=at;log(next,u,'exchange-received-and-sent-to-repair',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 receiveAndSend(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==1)throw Error('Solo se pueden enviar equipos desde Retiros.');const u=authorize('devoluciones','edit');authorize('reparacion','edit');if(input.receivedHere!==true)throw Error('Confirma que el equipo ya fue recibido.');const serial=String(input.serial||'').trim();if(!serial||serial.length>150)throw Error('Indica un número de serie / SN de hasta 150 caracteres.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id),at=new Date().toISOString();r.receipt=r.receipt||{receivedAt:at,receivedBy:u.id};r.serial=serial;r.module='reparacion';r.index=r.type===1?1:0;r.resolution='Reparación';r.updatedAt=at;log(next,u,'receive-and-send-to-repair',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 saveIdentifier(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==1||!old.receipt)throw Error('El número de serie o barcode solo se modifica en Retiros después de recibir el equipo.');const u=authorize('devoluciones','edit');const serial=String(input.serial||'').trim();if(!serial||serial.length>150)throw Error('Indica un número de serie o barcode de hasta 150 caracteres.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.serial=serial;r.updatedAt=new Date().toISOString();log(next,u,'identifier-update',r.id);persist(next);return this.listRecords();},
 listTechnicians(){authorize('reparacion');return data.users.filter(u=>u.active&&u.role==='technician').map(u=>({id:u.id,name:u.name}));},
 listNotifications(){const u=admin();return data.notifications.map(n=>({...n,read:!!n.readBy?.includes(u.id)})).reverse();},
 readNotification(id){const u=admin();const next=structuredClone(data),n=next.notifications.find(n=>n.id===id);if(!n)throw Error('Notificación no encontrada.');n.readBy=[...new Set([...(n.readBy||[]),u.id])];persist(next);return this.listNotifications();},
 saveRepair(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='reparacion')throw Error('El equipo debe estar en el área de reparación para capturar estos datos.');const u=authorize('reparacion','edit');if(!['admin','technician'].includes(u.role))throw Error('La información técnica requiere el rol Reparación / Técnico.');const technician=data.users.find(t=>t.active&&t.role==='technician'&&t.id===(u.role==='technician'?u.id:input.technicianId));if(!technician)throw Error('Selecciona un usuario activo con rol Reparación / Técnico.');const text=(v,max)=>{const value=String(v||'').trim();if(value.length>max)throw Error('El texto excede la longitud permitida.');return value;};const failedComponents=Array.isArray(input.failedComponents)?[...new Set(input.failedComponents)]:[];const components=['Pantalla','Teclado','Batería','Cargador','RAM','SSD / Disco duro','Tarjeta madre','Procesador','Wi-Fi / Bluetooth','Puertos USB / HDMI','Cámara / Micrófono','Bocinas','Ventilador / Refrigeración','Carcasa / Bisagras','Otro'];if(failedComponents.some(c=>!components.includes(c)))throw Error('Componente inválido.');const repair={technician:technician.name,technicianId:technician.id,failedComponents,receivedDate:text(input.receivedDate,10),diagnosis:text(input.diagnosis,3000),work:text(input.work,3000),parts:text(input.parts,2000),result:text(input.result,100),notes:text(input.notes,3000),updatedAt:new Date().toISOString(),updatedBy:u.id};if(!repair.diagnosis)throw Error('Indica el diagnóstico.');if(repair.receivedDate&&(!/^\d{4}-\d{2}-\d{2}$/.test(repair.receivedDate)||new Date(repair.receivedDate+'T12:00:00Z').toISOString().slice(0,10)!==repair.receivedDate))throw Error('Fecha de ingreso inválida.');if(!['En diagnóstico','Cambio de equipo','Se requiere pza','No reparable','No entra en garantía','Reparado'].includes(repair.result))throw Error('Resultado de reparación inválido.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.repair=repair;r.updatedAt=repair.updatedAt;if(repair.result==='Reparado'){r.module='calidad';r.resolution='Pendiente de validación de Calidad';r.sentToQualityAt=repair.updatedAt;log(next,u,'send-to-quality',r.id);}else if(repair.result==='Cambio de equipo'){r.index=1;r.resolution='Cambio de equipo';log(next,u,'repair-equipment-change',r.id);}else r.resolution=repair.result==='En diagnóstico'?'Reparación · En diagnóstico':repair.result;
 if(repair.result!=='En diagnóstico'){next.notifications.push({id:randomUUID(),recordId:r.id,expedientNumber:r.expedientNumber,order:r.order,technician:technician.name,result:repair.result,createdAt:repair.updatedAt,readBy:[]});}log(next,u,'repair-update',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 validateQuality(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='calidad'||old.archived)throw Error('Solo se pueden validar expedientes pendientes en Calidad.');const u=authorize('calidad','edit');if(!['approved','rejected'].includes(input.result))throw Error('Selecciona el resultado de la validación.');const notes=String(input.notes||'').trim();if(notes.length>3000)throw Error('Máximo 3000 caracteres en observaciones.');if(input.result==='approved'&&input.functioning!==true)throw Error('Confirma que probaste el equipo y funciona correctamente.');if(input.result==='rejected'&&!notes)throw Error('Describe las fallas encontradas para devolver el equipo a Reparación.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id),at=new Date().toISOString();const validation={result:input.result,notes,functioning:input.functioning===true,validatedAt:at,validatedBy:u.id,reviewer:u.name};r.quality=validation;r.qualityHistory=[...(r.qualityHistory||[]),validation];r.updatedAt=at;if(input.result==='approved'){r.archived=true;r.archivedAt=at;r.resolution='Archivado · Calidad aprobada';}else{r.module='reparacion';r.resolution='Reparación · No aprobado en Calidad';r.repair={...r.repair,result:'En diagnóstico'};}log(next,u,input.result==='approved'?'quality-approve-and-archive':'quality-return-to-repair',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 closeReturn(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==0||old.type!==0)throw Error('Solo se puede cerrar una devolución en proceso.');const u=authorize('devoluciones','edit');if(!['rematech','buyer'].includes(input.outcome))throw Error('Selecciona el resultado del cierre.');let withdrawal=null,index=2,resolution='Cerrado a favor de Rematech',fullAction=null;if(input.outcome==='buyer'){if(!['withdrawal','return'].includes(input.fullAction))throw Error('Selecciona Retiro Full o Regreso a Full.');fullAction=input.fullAction;if(fullAction==='withdrawal'){withdrawal=String(input.withdrawalNumber||'').trim();if(!withdrawal||withdrawal.length>100)throw Error('Indica el número de retiro.');index=1;resolution='Cerrado con reembolso al comprador · Retiro Full';}else resolution='Cerrado con reembolso al comprador · Regreso a Full';}const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.index=index;r.resolution=resolution;r.closure={outcome:input.outcome,fullAction,withdrawalNumber:withdrawal,closedAt:new Date().toISOString(),closedBy:u.id};r.updatedAt=r.closure.closedAt;log(next,u,'return-close',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 deleteRecord(id){const u=admin();const old=data.records.find(r=>r.id===id);if(!old)throw Error('El expediente ya no existe.');const next=structuredClone(data);next.records=next.records.filter(r=>r.id!==id);log(next,u,'record-delete',id);persist(next);return this.listRecords();},
 migrateRecords(rows){const u=admin();if(data.migrated)return this.listRecords();if(!Array.isArray(rows)||rows.length>10000)throw Error('Registros anteriores inválidos.');const normalized=rows.map((row,i)=>({...recordInput(row,true),id:typeof row.id==='string'?row.id:randomUUID(),expedientNumber:rows.length-i}));if(new Set(normalized.map(r=>r.id)).size!==normalized.length)throw Error('Hay identificadores duplicados en los registros anteriores.');const next=structuredClone(data);next.records=[...normalized,...next.records];next.nextNumber=Math.max(next.nextNumber,normalized.length+1);next.migrated=true;log(next,u,'legacy-import',String(rows.length));persist(next);return this.listRecords();},
 listUsers(){admin();return data.users.map(publicUser);},
 saveUser(input){const u=admin(),fields=userInput(input);if(data.users.some(x=>x.username===fields.username&&x.id!==input.id))throw Error('Ese nombre de usuario ya existe.');const next=structuredClone(data);let target;if(input.id){target=next.users.find(x=>x.id===input.id);if(!target)throw Error('Usuario no encontrado.');if(target.id===u.id&&(fields.role!=='admin'||input.active===false))throw Error('No puedes quitarte el acceso de administrador.');Object.assign(target,fields,{active:input.active!==false});if(input.password){Object.assign(target,password(input.password),{mustChangePassword:true});}}else{target={...fields,id:randomUUID(),...password(input.password),active:true,mustChangePassword:true};next.users.push(target);}log(next,u,'user-save',target.id);persist(next);return this.listUsers();}
 };return {api,getState:()=>data};
}


import {createClient} from 'npm:@supabase/supabase-js@2.117.3';
const readMethods=new Set(['listRecords','listMonthlySales','dashboardData','faultReportData','listTechnicians','listNotifications']);
const writeMethods=new Set(['saveRecord','saveRecords','deleteRecord','saveRepair','readNotification','validateQuality','confirmReceipt','receiveAndSend','receiveExchange','saveIdentifier','closeReturn','saveMonthlySales']);
const userShape=p=>({id:p.id,name:p.name,username:p.email,role:p.role,permissions:p.permissions,active:p.active&&p.approved,mustChangePassword:false,pending:!p.approved});
const reply=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
Deno.serve(async req=>{
 try{
 if(req.method!=='POST')return reply({error:'Método no permitido'},405);
 const token=req.headers.get('Authorization');if(!token?.startsWith('Bearer '))return reply({error:'Inicia sesión.'},401);
 const url=Deno.env.get('SUPABASE_URL'),anon=Deno.env.get('SUPABASE_ANON_KEY'),secret=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 const auth=createClient(url,anon,{global:{headers:{Authorization:token}},auth:{persistSession:false}});
 const {data:authData,error:authError}=await auth.auth.getUser();if(authError||!authData.user)return reply({error:'Sesión inválida.'},401);
 const service=createClient(url,secret,{auth:{persistSession:false}}),body=await req.json(),{method,input}=body;
 const fetchProfiles=async()=>{const {data,error}=await service.from('cx_profiles').select('*');if(error)throw Error('No se pudo leer la configuración de usuarios.');return data;};
 let profiles=await fetchProfiles(),profile=profiles.find(p=>p.id===authData.user.id);if(!profile)return reply({error:'No se encontró el perfil.'},403);
 if(method==='getProfile')return reply({result:userShape(profile)});
 if(!profile.approved||!profile.active)return reply({error:'Tu cuenta está pendiente de autorización del administrador.'},403);
 if(method==='listUsers'){if(profile.role!=='admin')return reply({error:'Solo el administrador puede gestionar usuarios.'},403);return reply({result:profiles.map(userShape)});}
 if(method==='saveUser'){
 if(profile.role!=='admin')return reply({error:'Solo el administrador puede gestionar usuarios.'},403);
 if(!input?.id)throw Error('El usuario debe registrarse primero; después puedes asignarle rol y permisos.');
 if(input.id===profile.id&&(input.role!=='admin'||input.active===false))throw Error('No puedes quitarte el acceso de administrador.');
 const user=profiles.find(p=>p.id===input.id);if(!user)throw Error('Usuario no encontrado.');
 const business=createBusinessStore({users:profiles.map(userShape),records:[],audit:[],notifications:[],monthlySales:[],nextNumber:1},profile.id);
 // Use the established role and permission validator without storing Supabase passwords.
 business.api.saveUser({id:user.id,username:'cloud-'+user.id,name:input.name,role:input.role,permissions:input.permissions,active:input.active!==false});
 const normalized=business.getState().users.find(u=>u.id===user.id);
 const {error}=await service.from('cx_profiles').update({name:normalized.name,role:normalized.role,permissions:normalized.permissions,approved:true,active:input.active!==false,updated_at:new Date().toISOString()}).eq('id',user.id);if(error)throw Error('No se pudo guardar el usuario.');return reply({result:(await fetchProfiles()).map(userShape)});
 }
 if(!readMethods.has(method)&&!writeMethods.has(method)&&method!=='importLocalData')return reply({error:'Acción no disponible.'},400);
 for(let attempt=0;attempt<4;attempt++){
 profiles=await fetchProfiles();profile=profiles.find(p=>p.id===authData.user.id);if(!profile?.active||!profile.approved)return reply({error:'Tu cuenta no tiene acceso.'},403);
 const {data:workspace,error}=await service.from('cx_workspace').select('*').eq('id',1).single();if(error)throw Error('No se pudo cargar el espacio compartido.');
 const state={...workspace.state,users:profiles.map(userShape)},business=createBusinessStore(state,profile.id);let result;
 if(method==='importLocalData'){
 if(profile.role!=='admin')return reply({error:'Solo el administrador puede importar datos.'},403);
 if(state.records.length)throw Error('La importación inicial solo está disponible cuando el espacio compartido está vacío.');
 if(!Array.isArray(input?.records)||input.records.length>10000)throw Error('Archivo de expedientes inválido.');
 business.api.migrateRecords(input.records.map(r=>({...r,responsibleArea:r.responsibleArea==='Paquetería - Logística'?'Empaque - Logística':r.responsibleArea})));
 const next=business.getState(),original=new Map(input.records.map(r=>[r.id,r]));
 next.records=next.records.map(r=>{const old=original.get(r.id)||{};const metadata={};for(const k of ['receipt','closure','repair','quality','qualityHistory','archived','archivedAt','createdAt','updatedAt','returnMitigated','sentToQualityAt','receivedOutcome','claimClassification'])if(old[k]!==undefined)metadata[k]=old[k];return {...r,...metadata,module:old.module||r.module,index:Number.isInteger(old.index)?old.index:r.index,resolution:old.resolution||r.resolution,expedientNumber:Number.isInteger(old.expedientNumber)?old.expedientNumber:r.expedientNumber};});
 if(new Set(next.records.map(r=>r.expedientNumber)).size!==next.records.length)throw Error('Hay números de expediente duplicados.');
 next.nextNumber=Math.max(1,...next.records.map(r=>r.expedientNumber+1));
 for(const sale of input.monthlySales||[])business.api.saveMonthlySales(sale);
 result={imported:next.records.length};
 }else result=business.api[method](input);
 if(readMethods.has(method))return reply({result});
 const next=business.getState();next.users=[];
 const {data:committed,error:commitError}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:next,actor_id:profile.id,expected_profile_updated:profile.updated_at});if(commitError)throw Error('No se pudieron guardar los cambios.');if(committed)return reply({result});
 }
 return reply({error:'Otro usuario actualizó los datos. Intenta nuevamente.'},409);
 }catch(error){return reply({error:error.message||'No se pudo completar la acción.'},400);}
});
