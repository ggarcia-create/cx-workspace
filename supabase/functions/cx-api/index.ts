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
const locations={devoluciones:['Devoluciones en proceso','Retiros','Devoluciones cerradas'],reparacion:['Expedientes • Reparación / Devoluciones','Expedientes • Reparación / Equipos en servicio'],calidad:['Expedientes • Calidad / Devoluciones','Expedientes • Calidad / Equipos en servicio'],facturacion:['Facturas pendientes','Facturas creadas']};
const routes=[['devoluciones',0,'En proceso de devolución'],['devoluciones',0,'En proceso de devolución'],['reparacion',1,'Reparación'],['devoluciones',2,'Reembolso parcial']];
function normalizeWorkflowState(state){
 if((state.workflowVersion||1)>=2)return state;
 state.records=state.records.map(r=>['reparacion','calidad'].includes(r.module)?{...r,index:r.index===2?1:0}:r);
 state.workflowVersion=2;
 return state;
}
function createBusinessStore(initialState,actorId){

 let data=structuredClone(initialState);

 normalizeWorkflowState(data);
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
 const t=Number(input.type),baseRoute=routes[t],receivedOnRegistration=!legacy&&input.receivedOnRegistration===true;if(receivedOnRegistration&&![0,1].includes(t))throw Error('La recepción directa solo aplica a devoluciones y cambios de equipo.');const route=receivedOnRegistration&&t===0?['reparacion',0,'Reparación']:baseRoute;if(!route)throw Error('Tipo de registro inválido.');
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
 faultReportData(input){authorize('dashboard');const validDate=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d+'T12:00:00Z'))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;if(!input||!validDate(input.from)||!validDate(input.to)||input.from>input.to)throw Error('Selecciona un rango de fechas válido.');if(input.area&&!['Empaque - Logística','Ecommerce - Marketing','Cliente','Acondicionamiento','Paquetería','Sin área asignada'].includes(input.area))throw Error('Selecciona un área válida.');return structuredClone(data.records.filter(r=>r.date>=input.from&&r.date<=input.to&&(!input.area||(r.responsibleArea||'Sin área asignada')===input.area)));},
 dashboardData(){authorize('dashboard');return {records:structuredClone(data.records),monthlySales:structuredClone(data.monthlySales)};},
 listMonthlySales(){authorize('configuracion');return structuredClone(data.monthlySales);},
 saveMonthlySales(input){const u=authorize('configuracion','edit');if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(String(input.month))||Number(input.month.slice(0,4))<2000||Number(input.month.slice(0,4))>2100)throw Error('Selecciona un mes válido.');const channels=['Shopify','Mercado Libre','Amazon','Coppel','Walmart'];const totals=Object.fromEntries(channels.map(c=>{const value=input.totals?.[c];if(!Number.isSafeInteger(value)||value<0||value>1000000000000)throw Error('Revisa los totales de ventas.');return [c,value];}));const next=structuredClone(data),existing=next.monthlySales.find(r=>r.month===input.month);const entry={month:input.month,totals,updatedAt:new Date().toISOString(),updatedBy:u.name};if(existing)Object.assign(existing,entry);else next.monthlySales.push({...entry,createdAt:entry.updatedAt});log(next,u,'monthly-sales-save',input.month);persist(next);return this.listMonthlySales();},
 status(){return {setupRequired:!data.users.length};},
 setup(input){if(data.users.length)throw Error('La cuenta administradora ya está configurada.');const fields=userInput({...input,role:'admin'});const u={...fields,id:randomUUID(),...password(input.password),active:true,mustChangePassword:false};persist({...data,users:[u]});session=u.id;return publicUser(u);},
 login(input){const key=String(input.username||'').trim().toLowerCase();const a=attempts.get(key)||{count:0,until:0};if(a.until>Date.now())throw Error('Demasiados intentos. Espera un minuto.');const u=data.users.find(u=>u.username===key&&u.active);if(!u||!verify(input.password,u)){a.count++;if(a.count>=5){a.until=Date.now()+60000;a.count=0;}attempts.set(key,a);throw Error('Usuario o contraseña incorrectos.');}attempts.delete(key);session=u.id;return publicUser(u);},
 logout(){session=null;return true;},
 changePassword(input){const u=data.users.find(u=>u.id===session&&u.active);if(!u||!verify(input.currentPassword,u))throw Error('Contraseña actual incorrecta.');if(input.currentPassword===input.password)throw Error('Elige una contraseña diferente.');const next=structuredClone(data),target=next.users.find(x=>x.id===u.id);Object.assign(target,password(input.password),{mustChangePassword:false});log(next,u,'password-change',u.id);persist(next);return publicUser(target);},
 listRecords(){const u=actor();return data.records.filter(r=>allowed(u,r.module,'view')).map(r=>({...r,location:(locations[r.module]?.[r.index]||r.module)+(r.archived?' · Archivado':'')}));},
 saveRecords(input){const u=authorize('registros','edit');if(!Array.isArray(input)||!input.length||input.length>100)throw Error('Agrega entre 1 y 100 registros por lote.');const entries=input.map((item,i)=>{try{if(item.editId)throw Error('Solo se pueden agregar registros nuevos.');const r=recordInput(item);authorize(r.module,'edit');return r;}catch(err){throw Error('Registro '+(i+1)+': '+err.message);}});const next=structuredClone(data);for(const r of entries){const id=randomUUID();next.records.unshift({...r,id,expedientNumber:next.nextNumber++,createdAt:new Date().toISOString(),...(r.receivedOnRegistration?{receipt:{receivedAt:new Date().toISOString(),receivedBy:u.id},...(r.type===0?{closure:{outcome:r.receivedOutcome,fullAction:null,withdrawalNumber:null,closedAt:new Date().toISOString(),closedBy:u.id}}:{}),}:{})});log(next,u,'record-create',id);}persist(next);return this.listRecords();},
 saveRecord(input){const u=authorize('registros','edit');const r=recordInput(input);authorize(r.module,'edit');const next=structuredClone(data);if(input.editId){throw Error('La información general del expediente es de solo lectura.');}else{const id=randomUUID();next.records.unshift({...r,id,expedientNumber:next.nextNumber++,createdAt:new Date().toISOString(),...(r.receivedOnRegistration?{receipt:{receivedAt:new Date().toISOString(),receivedBy:u.id},...(r.type===0?{closure:{outcome:r.receivedOutcome,fullAction:null,withdrawalNumber:null,closedAt:new Date().toISOString(),closedBy:u.id}}:{}),}:{})});log(next,u,'record-create',id);}persist(next);return this.listRecords();},
 confirmReceipt(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==1)throw Error('La recepción solo se confirma en Retiros.');const u=authorize('devoluciones','edit');if(input.receivedHere!==true)throw Error('Confirma que el equipo ya fue recibido.');if(old.receipt)return this.listRecords();const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.receipt={receivedAt:new Date().toISOString(),receivedBy:u.id};log(next,u,'equipment-received',r.id);persist(next);return this.listRecords();},
 receiveExchange(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.type!==1||old.module!=='devoluciones'||old.index!==0)throw Error('Solo se pueden recibir cambios de equipo en Devoluciones en proceso.');const u=authorize('devoluciones','edit');authorize('reparacion','edit');if(input.receivedHere!==true)throw Error('Confirma que el equipo ya está aquí.');if(input.exchangeCompleted!==true)throw Error('Confirma que se efectuó el cambio de equipo.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id),at=new Date().toISOString();r.receipt={receivedAt:at,receivedBy:u.id};r.returnMitigated=true;r.exchange={completedAt:at,completedBy:u.id};r.module='reparacion';r.index=0;r.resolution='Reparación';r.updatedAt=at;log(next,u,'exchange-received-and-sent-to-repair',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 receiveAndSend(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==1)throw Error('Solo se pueden enviar equipos desde Retiros.');const u=authorize('devoluciones','edit');authorize('reparacion','edit');if(input.receivedHere!==true)throw Error('Confirma que el equipo ya fue recibido.');const serial=String(input.serial||'').trim();if(!serial||serial.length>150)throw Error('Indica un número de serie / SN de hasta 150 caracteres.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id),at=new Date().toISOString();r.receipt=r.receipt||{receivedAt:at,receivedBy:u.id};r.serial=serial;r.module=r.type===1?'devoluciones':'reparacion';r.index=0;r.resolution=r.type===1?'Cambio de equipo pendiente de confirmar':'Reparación';r.updatedAt=at;log(next,u,'receive-and-send-to-repair',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 saveIdentifier(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==1||!old.receipt)throw Error('El número de serie o barcode solo se modifica en Retiros después de recibir el equipo.');const u=authorize('devoluciones','edit');const serial=String(input.serial||'').trim();if(!serial||serial.length>150)throw Error('Indica un número de serie o barcode de hasta 150 caracteres.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.serial=serial;r.updatedAt=new Date().toISOString();log(next,u,'identifier-update',r.id);persist(next);return this.listRecords();},
 listTechnicians(){authorize('reparacion');return data.users.filter(u=>u.active&&u.role==='technician').map(u=>({id:u.id,name:u.name}));},
 listNotifications(){const u=admin();return data.notifications.map(n=>({...n,read:!!n.readBy?.includes(u.id)})).reverse();},
 readNotification(id){const u=admin();const next=structuredClone(data),n=next.notifications.find(n=>n.id===id);if(!n)throw Error('Notificación no encontrada.');n.readBy=[...new Set([...(n.readBy||[]),u.id])];persist(next);return this.listNotifications();},
 saveRepair(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='reparacion')throw Error('El equipo debe estar en el área de reparación para capturar estos datos.');const u=authorize('reparacion','edit');if(!['admin','technician'].includes(u.role))throw Error('La información técnica requiere el rol Reparación / Técnico.');const technician=data.users.find(t=>t.active&&t.role==='technician'&&t.id===(u.role==='technician'?u.id:input.technicianId));if(!technician)throw Error('Selecciona un usuario activo con rol Reparación / Técnico.');const text=(v,max)=>{const value=String(v||'').trim();if(value.length>max)throw Error('El texto excede la longitud permitida.');return value;};const failedComponents=Array.isArray(input.failedComponents)?[...new Set(input.failedComponents)]:[];const components=['Pantalla','Teclado','Batería','Cargador','RAM','SSD / Disco duro','Tarjeta madre','Procesador','Wi-Fi / Bluetooth','Puertos USB / HDMI','Cámara / Micrófono','Bocinas','Ventilador / Refrigeración','Carcasa / Bisagras','Otro'];if(failedComponents.some(c=>!components.includes(c)))throw Error('Componente inválido.');const repair={technician:technician.name,technicianId:technician.id,failedComponents,receivedDate:text(input.receivedDate,10),diagnosis:text(input.diagnosis,3000),work:text(input.work,3000),parts:text(input.parts,2000),result:text(input.result,100),notes:text(input.notes,3000),updatedAt:new Date().toISOString(),updatedBy:u.id};if(!repair.diagnosis)throw Error('Indica el diagnóstico.');if(repair.receivedDate&&(!/^\d{4}-\d{2}-\d{2}$/.test(repair.receivedDate)||new Date(repair.receivedDate+'T12:00:00Z').toISOString().slice(0,10)!==repair.receivedDate))throw Error('Fecha de ingreso inválida.');if(!['En diagnóstico','Cambio de equipo','Se requiere pza','No reparable','No entra en garantía','Reparado'].includes(repair.result))throw Error('Resultado de reparación inválido.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.repair=repair;r.updatedAt=repair.updatedAt;if(repair.result==='Reparado'){r.module='calidad';r.resolution='Pendiente de validación de Calidad';r.sentToQualityAt=repair.updatedAt;log(next,u,'send-to-quality',r.id);}else if(repair.result==='Cambio de equipo'){r.originalType??=r.type;r.type=1;r.tag='Devolución para cambio';r.returnMitigated=false;r.module='devoluciones';r.index=0;r.resolution='Cambio de equipo pendiente de confirmar';log(next,u,'repair-equipment-change',r.id);}else r.resolution=repair.result==='En diagnóstico'?'Reparación · En diagnóstico':repair.result;
 if(repair.result!=='En diagnóstico'){next.notifications.push({id:randomUUID(),recordId:r.id,expedientNumber:r.expedientNumber,order:r.order,technician:technician.name,result:repair.result,createdAt:repair.updatedAt,readBy:[]});}log(next,u,'repair-update',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 validateQuality(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='calidad'||old.archived)throw Error('Solo se pueden validar expedientes pendientes en Calidad.');const u=authorize('calidad','edit');if(!['approved','rejected'].includes(input.result))throw Error('Selecciona el resultado de la validación.');const notes=String(input.notes||'').trim();if(notes.length>3000)throw Error('Máximo 3000 caracteres en observaciones.');if(input.result==='approved'&&input.functioning!==true)throw Error('Confirma que probaste el equipo y funciona correctamente.');if(input.result==='rejected'&&!notes)throw Error('Describe las fallas encontradas para devolver el equipo a Reparación.');const next=structuredClone(data),r=next.records.find(r=>r.id===old.id),at=new Date().toISOString();const validation={result:input.result,notes,functioning:input.functioning===true,validatedAt:at,validatedBy:u.id,reviewer:u.name};r.quality=validation;r.qualityHistory=[...(r.qualityHistory||[]),validation];r.updatedAt=at;if(input.result==='approved'){r.archived=true;r.archivedAt=at;r.resolution='Archivado · Calidad aprobada';}else{r.module='reparacion';r.resolution='Reparación · No aprobado en Calidad';r.repair={...r.repair,result:'En diagnóstico'};}log(next,u,input.result==='approved'?'quality-approve-and-archive':'quality-return-to-repair',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 closeReturn(input){const old=data.records.find(r=>r.id===input.id);if(!old||old.module!=='devoluciones'||old.index!==0||old.type!==0)throw Error('Solo se puede cerrar una devolución en proceso.');const u=authorize('devoluciones','edit');if(!['rematech','buyer'].includes(input.outcome))throw Error('Selecciona el resultado del cierre.');let withdrawal=null,index=2,resolution='Cerrado a favor de Rematech',fullAction=null;if(input.outcome==='buyer'){if(!['withdrawal','return'].includes(input.fullAction))throw Error('Selecciona Retiro Full o Regreso a Full.');fullAction=input.fullAction;if(fullAction==='withdrawal'){withdrawal=String(input.withdrawalNumber||'').trim();if(!withdrawal||withdrawal.length>100)throw Error('Indica el número de retiro.');index=1;resolution='Cerrado con reembolso al comprador · Retiro Full';}else resolution='Cerrado con reembolso al comprador · Regreso a Full';}const next=structuredClone(data),r=next.records.find(r=>r.id===old.id);r.index=index;r.resolution=resolution;r.closure={outcome:input.outcome,fullAction,withdrawalNumber:withdrawal,closedAt:new Date().toISOString(),closedBy:u.id};r.updatedAt=r.closure.closedAt;log(next,u,'return-close',r.id);persist(next);return {records:this.listRecords(),module:r.module,index:r.index};},
 deleteRecord(id){const u=admin();const old=data.records.find(r=>r.id===id);if(!old)throw Error('El expediente ya no existe.');const next=structuredClone(data);next.records=next.records.filter(r=>r.id!==id);log(next,u,'record-delete',id);persist(next);return this.listRecords();},
 migrateRecords(rows){const u=admin();if(data.migrated)return this.listRecords();if(!Array.isArray(rows)||rows.length>10000)throw Error('Registros anteriores inválidos.');const normalized=rows.map((row,i)=>({...recordInput(row,true),id:typeof row.id==='string'?row.id:randomUUID(),expedientNumber:rows.length-i}));if(new Set(normalized.map(r=>r.id)).size!==normalized.length)throw Error('Hay identificadores duplicados en los registros anteriores.');const next=structuredClone(data);next.records=[...normalized,...next.records];next.nextNumber=Math.max(next.nextNumber,normalized.length+1);next.migrated=true;log(next,u,'legacy-import',String(rows.length));persist(next);return this.listRecords();},
 listUsers(){admin();return data.users.map(publicUser);},
 saveUser(input){const u=admin(),fields=userInput(input);if(data.users.some(x=>x.username===fields.username&&x.id!==input.id))throw Error('Ese nombre de usuario ya existe.');const next=structuredClone(data);let target;if(input.id){target=next.users.find(x=>x.id===input.id);if(!target)throw Error('Usuario no encontrado.');if(target.id===u.id&&(fields.role!=='admin'||input.active===false))throw Error('No puedes quitarte el acceso de administrador.');Object.assign(target,fields,{active:input.active!==false});if(input.password){Object.assign(target,password(input.password),{mustChangePassword:true});}}else{target={...fields,id:randomUUID(),...password(input.password),active:true,mustChangePassword:true};next.users.push(target);}log(next,u,'user-save',target.id);persist(next);return this.listUsers();}
 };return {api,getState:()=>data};
}


const sharedReportRoot={};
(function(root){
 const clean=v=>String(v??'').normalize('NFC').replace(/\s+/g,' ').trim();
 const key=v=>clean(v).toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const reasons=['Producto no funciona o presenta daños','Arrepentimiento','Producto diferente'];
 function reason(v){const k=key(v);if(/arrep|no lo quiere/.test(k))return reasons[1];if(/diferente|no corresponde/.test(k))return reasons[2];if(/no funcion|no enciende|falla funcional|danad|producto dano|roto/.test(k))return reasons[0];return clean(v)||'Sin motivo informado';}
 const sale=r=>Number.isSafeInteger(r.orderTotal)?r.orderTotal:(Number(r.quantity)||0)*(Number(r.price)||0);
 const executed=r=>r.type===3||r.closure?.outcome==='buyer'||(r.module==='devoluciones'&&r.index===0&&r.resolution==='En proceso de devolución');
 const executedAmount=r=>r.type===3?(Number(r.refund)||0):sale(r);
 function faults(r){return [r,...(r.additionalFaults||[])].map(f=>({reason:reason(f.reason),component:clean(f.component),specifics:[...new Set((Array.isArray(f.specificReasons)&&f.specificReasons.length?f.specificReasons:[f.specificReason]).map(clean).filter(Boolean))]}));}
 function groups(rows,values){const map=new Map();for(const r of rows){const unique=new Map(values(r).map(v=>[key(v),clean(v)||'Sin información']));for(const [k,label] of unique){if(!map.has(k))map.set(k,{label,count:0,total:0});const item=map.get(k);item.count++;item.total+=sale(r);}}return [...map.values()].sort((a,b)=>b.count-a.count||b.total-a.total||a.label.localeCompare(b.label));}
 function drilldown(rows,selectedReason='',component=''){
  const normalized=selectedReason?reason(selectedReason):'';
  const selectedRows=normalized?rows.filter(r=>faults(r).some(f=>f.reason===normalized)):rows;
  const matching=r=>faults(r).filter(f=>!normalized||f.reason===normalized);
  const components=groups(selectedRows,r=>matching(r).flatMap(f=>f.reason===reasons[0]?[f.component||'Sin problema reportado']:f.specifics.length?f.specifics:['Sin motivo específico']));
  const componentRows=component?selectedRows.filter(r=>matching(r).some(f=>f.reason===reasons[0]?key(f.component||'Sin problema reportado')===key(component):f.specifics.some(s=>key(s)===key(component)))):[];
  const specifics=normalized===reasons[0]&&component?groups(componentRows,r=>matching(r).filter(f=>key(f.component||'Sin problema reportado')===key(component)).flatMap(f=>f.specifics.length?f.specifics:['Sin falla específica'])):[];
  return {reasons:groups(rows,r=>faults(r).map(f=>f.reason)),components,specifics,selectedRows,componentRows};
 }
 const api={clean,key,reasons,reason,sale,executed,executedAmount,faults,groups,drilldown};root.claimAnalytics=api;
})(sharedReportRoot);

(function(root){
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clean=v=>String(v??'').normalize('NFC').replace(/\s+/g,' ').trim();
 const pct=(n,d)=>d?(100*n/d).toLocaleString('es-MX',{maximumFractionDigits:1})+' %':'0 %';
 const money=n=>'$ '+(n/100).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2});
 const colors=['#173b62','#e4a83d','#4b9d90','#8974ba','#d07872','#8b9cab'];
 function productModel(value){const raw=clean(value),v=raw.replace(/think\s*pad/ig,'ThinkPad').replace(/think\s*centre/ig,'ThinkCentre').replace(/elite\s*book/ig,'EliteBook').replace(/elite\s*desk/ig,'EliteDesk');let m;
 if(m=v.match(/\bdell\s+(latitude|precision|optiplex|vostro|inspiron)\s*[- ]?([0-9]{3,5}[a-z]?)(?![a-z0-9])/i))return 'Dell '+({latitude:'Latitude',precision:'Precision',optiplex:'OptiPlex',vostro:'Vostro',inspiron:'Inspiron'}[m[1].toLowerCase()])+' '+m[2].toUpperCase();
 if(m=v.match(/\b(?:hp|hewlett[- ]packard)\s+(elitebook|elitedesk|probook|prodesk|zbook|z[0-9]+)\s*([a-z0-9]*[0-9][a-z0-9]*)(?:\s*(g[0-9]{1,2}))?/i))return 'HP '+({elitebook:'EliteBook',elitedesk:'EliteDesk',probook:'ProBook',prodesk:'ProDesk',zbook:'ZBook'}[m[1].toLowerCase()]||m[1].toUpperCase())+' '+m[2].toUpperCase().replace(/G([0-9]+)$/,' G$1')+(m[3]?' '+m[3].toUpperCase():'');
 if(m=v.match(/\blenovo\s+(thinkpad|thinkcentre|thinkstation|ideapad|yoga|legion)\s*([a-z]*[0-9][a-z0-9]*)(?:\s*(?:gen|generacion)\s*([0-9]+))?/i))return 'Lenovo '+({thinkpad:'ThinkPad',thinkcentre:'ThinkCentre',thinkstation:'ThinkStation',ideapad:'IdeaPad',yoga:'Yoga',legion:'Legion'}[m[1].toLowerCase()])+' '+m[2].toUpperCase().replace(/GEN([0-9]+)$/,' Gen $1')+(m[3]?' Gen '+m[3]:'');
 if(m=v.match(/\b(macbook\s+(?:pro|air))\b.*?\b(a[0-9]{4})\b/i))return 'Apple '+m[1].replace(/macbook/i,'MacBook').replace(/pro/i,'Pro').replace(/air/i,'Air')+' '+m[2].toUpperCase();
 if(m=v.match(/\b(asus|acer|msi|samsung|toshiba|dynabook)\s+(vivobook|zenbook|tuf|rog|aspire|swift|travelmate|nitro|predator|satellite|portege|tecra|galaxy\s*book)\s+([a-z0-9-]*[0-9][a-z0-9-]*)/i))return m[1].toUpperCase()+' '+m[2].replace(/\b\w/g,c=>c.toUpperCase())+' '+m[3].toUpperCase();
 return raw||'Equipo sin identificar';
 }
 const analytics=root.claimAnalytics;
 const areaNames=['Empaque - Logística','Ecommerce - Marketing','Cliente','Acondicionamiento','Paquetería','Sin área asignada'];
 const scopeName=f=>f.mode==='area'?(f.area||'Todas las áreas'):'General';
 const subject=f=>`Reporte de devoluciones - ${scopeName(f)} - ${f.from} al ${f.to}`;
 const filename=f=>`Reporte-devoluciones-${scopeName(f).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'-')}-${f.from}-${f.to}.pdf`;
 function analyze(records,filter,monthlySales=[]){
  const rows=records.filter(r=>r.date>=filter.from&&r.date<=filter.to&&(!filter.area||(r.responsibleArea||'Sin área asignada')===filter.area));
  const reasons=analytics.drilldown(rows).reasons,areas=analytics.groups(rows,r=>[r.responsibleArea||'Sin área asignada']),channels=analytics.groups(rows,r=>[r.contact||'Sin canal']),products=analytics.groups(rows,r=>[productModel(r.product)]);
  const hierarchy=analytics.drilldown(rows,analytics.reasons[0]);
  const faults=analytics.groups(rows,r=>analytics.faults(r).filter(f=>f.reason===analytics.reasons[0]).flatMap(f=>(f.specifics.length?f.specifics:['Sin detalle']).map(v=>[f.component,v].filter(Boolean).join(' - '))));
  const sections=analytics.reasons.map(label=>{const d=analytics.drilldown(rows,label);return {label,count:d.selectedRows.length,items:d.components,specifics:analytics.groups(d.selectedRows,r=>analytics.faults(r).filter(f=>f.reason===label).flatMap(f=>f.specifics.map(v=>[f.component,v].filter(Boolean).join(' - '))))};});
  const typeCounts=[0,1,2,3].map(type=>rows.filter(r=>r.type===type).length),total=rows.reduce((sum,r)=>sum+analytics.sale(r),0),executed=rows.filter(analytics.executed),executedTotal=executed.reduce((sum,r)=>sum+analytics.executedAmount(r),0);
  const sales=monthlySales.reduce((sum,m)=>sum+Object.values(m.totals||{}).reduce((a,b)=>a+Number(b||0),0),0),buyer=rows.filter(r=>r.closure?.outcome==='buyer'),favor=rows.filter(r=>r.closure?.outcome==='rematech'),findings=[];
  if(rows.length){findings.push(`${rows.length} expedientes del periodo, por ${money(total)} de venta asociada.`);if(reasons[0])findings.push(`${reasons[0].label} concentra ${reasons[0].count} expedientes (${pct(reasons[0].count,rows.length)}).`);if(hierarchy.components[0])findings.push(`El problema técnico más reportado es ${hierarchy.components[0].label}: ${hierarchy.components[0].count} expedientes.`);if(products[0])findings.push(`${products[0].label} es el modelo con más reclamos: ${products[0].count} (${pct(products[0].count,rows.length)}).`);}else findings.push('No hay expedientes registrados dentro del periodo y área seleccionados.');
  return {rows,reasons,areas,channels,products,faults,components:hierarchy.components,sections,total,buyer,favor,findings,filter:{...filter},sales,executedTotal,typeCounts};
 }
 function pages(records,filter,monthlySales=[]){
  const overview=analyze(records,filter,monthlySales);
  if(filter.mode==='area'&&!filter.area)return [overview,...areaNames.filter(area=>records.some(r=>r.date>=filter.from&&r.date<=filter.to&&(r.responsibleArea||'Sin área asignada')===area)).map(area=>analyze(records,{...filter,area},monthlySales))];
  return [overview];
 }
 function bars(items,total){if(!items.length)return '<p class="report-empty">Sin datos para esta gráfica.</p>';const chosen=items.slice(0,5),max=chosen[0].count;return `<svg class="report-bars" viewBox="0 0 440 ${chosen.length*45+5}" aria-label="Distribución por número de expedientes">${chosen.map((i,n)=>`<text x="0" y="${n*45+13}">${esc(i.label.length>52?i.label.slice(0,49)+'...':i.label)}</text><rect x="0" y="${n*45+21}" width="${320*i.count/max}" height="13" rx="4" fill="${colors[n%colors.length]}"/><text x="330" y="${n*45+32}">${i.count} · ${pct(i.count,total)}</text>`).join('')}</svg>`;}
 function donut(items,total){if(!total)return '<p class="report-empty">Sin datos para esta gráfica.</p>';let offset=0;const mentions=items.reduce((s,i)=>s+i.count,0),length=2*Math.PI*65;return `<div class="report-donut"><svg viewBox="0 0 180 180" aria-label="Motivos de reclamo">${items.map((i,n)=>{const l=i.count/mentions*length,s=`<circle cx="90" cy="90" r="65" fill="none" stroke="${colors[n%colors.length]}" stroke-width="26" stroke-dasharray="${l} ${length}" stroke-dashoffset="${-offset}" transform="rotate(-90 90 90)"/>`;offset+=l;return s;}).join('')}<text x="90" y="89" text-anchor="middle" class="report-donut-number">${total}</text><text x="90" y="109" text-anchor="middle">expedientes</text></svg><ul>${items.map((i,n)=>`<li><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="${colors[n%colors.length]}"/></svg><span>${esc(i.label)}<b>${i.count} · ${pct(i.count,mentions)}</b></span></li>`).join('')}</ul></div>`;}
 function header(a,detail=false){return `<header class="report-heading"><div><span>REMATECH · CUSTOMER EXPERIENCE</span><h1>Reporte de devoluciones · ${esc(scopeName(a.filter))}</h1><p>${esc(a.filter.from)} al ${esc(a.filter.to)} · ${detail?'Detalle de los problemas reportados':'Todos los tipos de expediente'}</p></div><strong>CX</strong></header>`;}
 function kpis(a){return `<div class="report-kpis">${[['Total de reclamos',money(a.total)],['Reclamos ejecutados',money(a.executedTotal)],['% de reclamos',a.sales?pct(a.total,a.sales):'—'],['% de reclamos ejecutados',a.sales?pct(a.executedTotal,a.sales):'—']].map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join('')}</div>`;}
 function renderOne(a){const n=a.rows.length;return `<section class="report-page">${header(a)}${kpis(a)}<section class="report-summary"><h2>Resumen del periodo</h2><p><strong>${n} expedientes:</strong> ${a.typeCounts[0]} devoluciones · ${a.typeCounts[1]} cambios · ${a.typeCounts[2]} servicios · ${a.typeCounts[3]} reembolsos parciales.</p><ul>${a.findings.slice(1,3).map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section><div class="report-grid"><section><h2>Motivos de reclamo</h2>${donut(a.reasons,n)}<p>Motivos principales y adicionales; porcentaje de las menciones, con títulos equivalentes normalizados.</p></section><section><h2>Problema reportado por el cliente</h2>${bars(a.components,n)}<p>Producto no funciona o presenta daños. Se incluyen problemas adicionales sin duplicar un expediente dentro de cada problema.</p></section><section><h2>Reclamos por canal</h2>${bars(a.channels,n)}<p>Distribución del periodo por número de expedientes.</p></section><section><h2>Áreas responsables</h2>${bars(a.areas,n)}<p>La asignación del área no demuestra la causa técnica.</p></section></div><div class="report-grid report-lower"><section><h2>Equipos con más reclamos</h2><table><thead><tr><th>Marca, línea y modelo</th><th>Exp.</th><th>%</th></tr></thead><tbody>${a.products.slice(0,5).map(i=>`<tr><td>${esc(i.label)}</td><td>${i.count}</td><td>${pct(i.count,n)}</td></tr>`).join('')||'<tr><td colspan="3">Sin datos</td></tr>'}</tbody></table><p>Mismo modelo agrupado aunque cambie la configuración.</p></section><section><h2>Concentración y seguimiento</h2>${a.findings.slice(2,4).map(t=>`<p>${esc(t)}</p>`).join('')}<p>Contrastar el síntoma del cliente con Reparación y Calidad antes de atribuir una causa.</p></section></div>${method(a)}<footer>Fuente: CX Workspace · Importes en MXN · Página de resumen</footer></section><section class="report-page report-detail">${header(a,true)}<p>Problemas observados en ${n} expedientes. Una misma persona puede reportar varias fallas en un equipo.</p>${a.sections.map(section=>`<section class="report-reason"><h2>${esc(section.label)} · ${section.count} expedientes</h2><div class="report-grid"><div><h3>${section.label===analytics.reasons[0]?'Problemas / componentes reportados':'Motivos específicos reportados'}</h3>${bars(section.items,section.count)}</div><div><h3>${section.label===analytics.reasons[0]?'Fallas específicas más frecuentes':'Comportamiento del motivo'}</h3>${section.label===analytics.reasons[0]?bars(section.specifics,section.count):`<p>${section.items[0]?esc(`El motivo más frecuente es «${section.items[0].label}»: ${section.items[0].count} expedientes (${pct(section.items[0].count,section.count)}).`):'No hay casos de este motivo en el periodo.'}</p><p>Los motivos de arrepentimiento o diferencias con lo anunciado se muestran por separado de las fallas técnicas.</p>`}</div></div></section>`).join('')}<footer>Se incluyen fallas adicionales. Cada problema o detalle se cuenta una vez por expediente; los porcentajes pueden coexistir.</footer></section>`;}
 function method(a){return `<section class="report-method"><p><strong>Criterios:</strong> se incluyen devoluciones, cambios, servicios y reembolsos parciales. Reclamos = venta original; ejecutados = devoluciones en proceso, cierres con reembolso y monto del reembolso parcial. Base de ventas: ${money(a.sales)}, todos los meses registrados, sin recortarla por fecha ni área. ${a.sales?'':'Sin ventas: porcentajes no calculables.'} Los problemas son síntomas reportados, no diagnósticos confirmados.</p></section>`;}
 function render(a){return `<article class="executive-report compact-report">${(Array.isArray(a)?a:[a]).map(renderOne).join('')}</article>`;}
 const api={analyze,render,pages,scopeName,subject,filename,productModel,areaNames};root.returnReport=api;
})(sharedReportRoot);

const returnReport=sharedReportRoot.returnReport;
import * as pdfLib from 'npm:pdf-lib@1.17.1';
const {PDFDocument,StandardFonts,rgb}=pdfLib;
const reportPdfColors=['#173b62','#e4a83d','#4b9d90','#8974ba','#d07872','#8b9cab'];
const pdfColor=hex=>rgb(...hex.replace('#','').match(/../g).map(s=>parseInt(s,16)/255));
const pdfText=value=>String(value??'').normalize('NFC').replace(/[\u2010-\u2015]/g,'-').replace(/\u2026/g,'...').replace(/[^\x20-\x7e\xa0-\xff\n]/g,'');
const pdfMoney=n=>'$ '+(n/100).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2});
const pdfPct=(n,d)=>d?(100*n/d).toLocaleString('es-MX',{maximumFractionDigits:1})+' %':'0 %';
async function createReportPDF(analyses){
 const doc=await PDFDocument.create();doc.setTitle('Reporte de devoluciones - Rematech');doc.setAuthor('Rematech - CX Workspace');
 const regular=await doc.embedFont(StandardFonts.Helvetica),bold=await doc.embedFont(StandardFonts.HelveticaBold),W=595.28,H=841.89,margin=30,inner=W-margin*2;
 function text(page,value,x,top,size=9,options={}){page.drawText(pdfText(value),{x,y:H-top-size,font:options.bold?bold:regular,size,color:pdfColor(options.color||'#18364e')});}
 function wrap(value,width,size=9,isBold=false){const font=isBold?bold:regular,lines=[];for(const paragraph of pdfText(value).split('\n')){let line='';for(const word of paragraph.split(/\s+/)){if(font.widthOfTextAtSize((line?line+' ':'')+word,size)>width&&line){lines.push(line);line='';}if(font.widthOfTextAtSize(word,size)>width){for(const c of word){if(font.widthOfTextAtSize(line+c,size)>width){lines.push(line);line='';}line+=c;}}else line+=(line?' ':'')+word;}lines.push(line);}return lines;}
 function paragraph(page,value,x,top,width,size=8.5,lineHeight=11){let y=top;for(const line of wrap(value,width,size)){text(page,line,x,y,size);y+=lineHeight;}return y;}
 function box(page,x,top,width,height,color='#ffffff',border='#dfe7ee'){page.drawRectangle({x,y:H-top-height,width,height,color:pdfColor(color),borderColor:pdfColor(border),borderWidth:.6});}
 function heading(page,title,x,top,width){text(page,title,x,top,10,{bold:true,color:'#173b62'});page.drawLine({start:{x,y:H-top-17},end:{x:x+width,y:H-top-17},color:pdfColor('#e4a83d'),thickness:2});}
 function header(page,a,detail){box(page,margin,27,inner,69,'#173b62','#173b62');text(page,'REMATECH  |  CUSTOMER EXPERIENCE',margin+14,37,8,{color:'#ffffff'});text(page,'Reporte de devoluciones',margin+14,51,21,{bold:true,color:'#ffffff'});const scope=a.filter.mode==='area'?(a.filter.area||'Todas las áreas'):'General';text(page,`${scope}  |  ${a.filter.from} al ${a.filter.to}`,margin+14,78,9,{color:'#ffffff'});if(detail)text(page,'DETALLE DE PROBLEMAS REPORTADOS',margin,110,10,{bold:true});}
 function foot(page,index){page.drawLine({start:{x:margin,y:32},end:{x:W-margin,y:32},color:pdfColor('#dfe7ee'),thickness:.5});text(page,'CX Workspace | Fecha del registro | MXN | Síntomas del cliente, no diagnóstico confirmado',margin,H-26,7);text(page,String(index),W-margin-12,H-26,7);}
 function ranking(page,items,total,x,top,width,height=160,maxItems=5){
  if(!items.length){paragraph(page,'Sin datos para esta selección.',x,top,width);return;}
  const chosen=items.slice(0,maxItems),max=Math.max(1,...chosen.map(i=>i.count)),rowHeight=height/Math.max(maxItems,chosen.length);
  chosen.forEach((item,n)=>{const t=top+n*rowHeight,lines=wrap(item.label,width-60,8).slice(0,2);for(let i=0;i<lines.length;i++)text(page,lines[i],x,t+i*9,8);const y=t+lines.length*9+2;box(page,x,y,width-62,5,'#edf3f9','#edf3f9');box(page,x,y,(width-62)*item.count/max,5,reportPdfColors[n%6],reportPdfColors[n%6]);text(page,`${item.count} | ${pdfPct(item.count,total)}`,x+width-55,t+5,8,{bold:true});});
 }
 function pie(page,items,total,x,top,width){
  if(!total){paragraph(page,'Sin expedientes en el periodo.',x,top,width);return;}
  const mentions=items.reduce((sum,i)=>sum+i.count,0),radius=45,cx=x+50,cy=top+53;let angle=-Math.PI/2;
  items.forEach((item,n)=>{const end=angle+item.count/mentions*2*Math.PI,points=[];for(let a=angle;a<end;a+=.06)points.push([Math.cos(a)*radius,Math.sin(a)*radius]);points.push([Math.cos(end)*radius,Math.sin(end)*radius]);const path='M0 0 '+points.map(([px,py])=>`L${px} ${py}`).join(' ')+' Z';page.drawSvgPath(path,{x:cx,y:H-cy,color:pdfColor(reportPdfColors[n%6])});angle=end;});
  let y=top+4;items.slice(0,5).forEach((item,n)=>{box(page,x+108,y+2,6,6,reportPdfColors[n%6],reportPdfColors[n%6]);y=paragraph(page,item.label,x+120,y,width-120,8,10);text(page,`${item.count} exp. | ${pdfPct(item.count,mentions)}`,x+120,y+2,8,{bold:true});y+=25;});
 }
 let number=0;
 for(const a of analyses){
  let page=doc.addPage([W,H]);header(page,a,false);const n=a.rows.length,gap=8,kw=(inner-gap*3)/4,values=[['Total de reclamos',pdfMoney(a.total)],['Reclamos ejecutados',pdfMoney(a.executedTotal)],['% de reclamos',a.sales?pdfPct(a.total,a.sales):'Sin base'],['% reclamos ejecutados',a.sales?pdfPct(a.executedTotal,a.sales):'Sin base']];
  values.forEach(([label,value],i)=>{const x=margin+i*(kw+gap);box(page,x,110,kw,54,'#edf3f9','#edf3f9');box(page,x,110,kw,3,'#e4a83d','#e4a83d');text(page,label,x+8,121,8);const size=Math.min(15,(kw-16)/Math.max(1,bold.widthOfTextAtSize(pdfText(value),1)));text(page,value,x+8,139,size,{bold:true});});
  box(page,margin,175,inner,76,'#fcf8ef','#fcf8ef');text(page,'Resumen del periodo',margin+10,184,10,{bold:true});paragraph(page,`${n} expedientes: ${a.typeCounts[0]} devoluciones, ${a.typeCounts[1]} cambios, ${a.typeCounts[2]} servicios y ${a.typeCounts[3]} reembolsos parciales.`,margin+10,201,inner-20,8.5,11);paragraph(page,a.findings[1]||a.findings[0],margin+10,225,inner-20,8.5,11);
  const panelW=(inner-12)/2;box(page,margin,263,panelW,172);heading(page,'Motivos de reclamo',margin+10,273,panelW-20);pie(page,a.reasons,n,margin+10,299,panelW-20);
  box(page,margin+panelW+12,263,panelW,172);heading(page,'Problemas técnicos reportados',margin+panelW+22,273,panelW-20);ranking(page,a.components,n,margin+panelW+22,301,panelW-20,119,4);
  box(page,margin,447,panelW,159);heading(page,'Reclamos por canal',margin+10,457,panelW-20);ranking(page,a.channels,n,margin+10,483,panelW-20,111,5);
  box(page,margin+panelW+12,447,panelW,159);heading(page,'Áreas responsables',margin+panelW+22,457,panelW-20);ranking(page,a.areas,n,margin+panelW+22,483,panelW-20,111,6);
  box(page,margin,618,panelW,116);heading(page,'Modelos con más reclamos',margin+10,628,panelW-20);ranking(page,a.products,n,margin+10,654,panelW-20,69,3);
  box(page,margin+panelW+12,618,panelW,116);heading(page,'Concentración y seguimiento',margin+panelW+22,628,panelW-20);paragraph(page,a.findings.slice(2,4).join(' ')||'Sin casos para priorizar en este periodo.',margin+panelW+22,654,panelW-20,8.2,11);
  paragraph(page,`Base de ventas: ${pdfMoney(a.sales)}, todos los meses, sin recorte por fecha ni área. Reclamos: venta original. Ejecutados: devoluciones en proceso, reembolso al comprador y monto del reembolso parcial. Motivos: % de menciones principales y adicionales. Los gráficos muestran los principales grupos; los detalles completos están en el CSV.`,margin,745,inner,7.3,10);foot(page,++number);
  page=doc.addPage([W,H]);header(page,a,true);paragraph(page,'Incluye motivos principales y fallas adicionales. Cada problema o detalle se cuenta una sola vez por expediente; sus porcentajes pueden coexistir.',margin,129,inner,8.5,11);
  a.sections.forEach((section,i)=>{const t=169+i*202;box(page,margin,t,inner,190);heading(page,`${section.label} | ${section.count} expedientes`,margin+10,t+10,inner-20);const left=margin+10,right=margin+panelW+22;
   if(i===0){text(page,'Problema / componente',left,t+36,9,{bold:true});ranking(page,section.items,section.count,left,t+55,panelW-20,120,4);text(page,'Falla específica',right,t+36,9,{bold:true});ranking(page,section.specifics,section.count,right,t+55,panelW-20,120,4);}else{text(page,'Motivos específicos del cliente',left,t+36,9,{bold:true});ranking(page,section.items,section.count,left,t+55,panelW-20,120,4);const top=section.items[0];paragraph(page,top?`El motivo más frecuente es ${top.label}: ${top.count} expedientes (${pdfPct(top.count,section.count)}).`:'No hay casos de este motivo en el periodo seleccionado.',right,t+55,panelW-20,9,13);paragraph(page,'Se distingue de los problemas técnicos para evitar mezclar inconformidades con fallas del equipo.',right,t+116,panelW-20,8.5,12);}
  });foot(page,++number);
 }
 return doc.save();
}


function validateReportMail(input){
 if(!input||! /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.requestId||''))throw Error('Solicitud de envío inválida.');
 const filter=input.filter;if(!filter||!['general','area'].includes(filter.mode)||filter.mode==='general'&&filter.area)throw Error('Selecciona un reporte general o por área.');
 if(!Array.isArray(input.recipients)||input.recipients.length<1||input.recipients.length>20)throw Error('Agrega entre 1 y 20 destinatarios.');
 const recipients=[...new Set(input.recipients.map(v=>{if(typeof v!=='string')throw Error('Correo inválido.');const s=v.trim().toLowerCase();if(s.length>254||! /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(s))throw Error('Revisa los correos de los destinatarios.');return s;}))];
 return {requestId:input.requestId,filter:{mode:filter.mode,area:filter.area||'',from:filter.from,to:filter.to},recipients};
}
function reportMailAccess(profile){return profile?.active&&profile.approved&&(profile.role==='admin'||profile.permissions?.dashboard?.view&&profile.permissions?.dashboard?.edit);}


import {Buffer} from 'node:buffer';
import nodemailer from 'npm:nodemailer@7.0.11';
const reportMailConfig=()=>({host:Deno.env.get('REPORT_SMTP_HOST')||'smtp.gmail.com',user:Deno.env.get('REPORT_SMTP_USER')||'',password:Deno.env.get('REPORT_SMTP_PASSWORD')||''});
function reportMailStatus(profile){if(profile.role!=='admin'&&!profile.permissions?.dashboard?.view)throw Error('No tienes permiso para consultar reportes.');const c=reportMailConfig();return {configured:!!(c.user&&c.password),sender:c.user||null};}
async function deliverReport(service,profile,rawInput,fetchProfiles){
 if(!reportMailAccess(profile))throw Error('Necesitas permiso de edición de Dashboard para enviar reportes.');
 const input=validateReportMail(rawInput),config=reportMailConfig();if(!config.user||!config.password)throw Error('El administrador debe configurar el remitente de reportes en el servidor.');
 const fingerprint=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify({filter:input.filter,recipients:input.recipients.slice().sort()}))))).map(n=>n.toString(16).padStart(2,'0')).join('');
 let analyses,entry,actor=profile;
 for(let attempt=0;attempt<4;attempt++){
  actor=(await fetchProfiles()).find(p=>p.id===profile.id);if(!reportMailAccess(actor))throw Error('Tu cuenta ya no tiene permiso para enviar reportes.');
  const {data:workspace,error}=await service.from('cx_workspace').select('*').eq('id',1).single();if(error)throw Error('No se pudo cargar el reporte.');
  const business=createBusinessStore({...workspace.state,users:[userShape(actor)]},actor.id),rows=business.api.faultReportData(input.filter),state=business.getState();
  const previous=(state.reportDeliveries||[]).find(e=>e.id===input.requestId);if(previous){if(previous.userId!==actor.id||previous.fingerprint!==fingerprint)throw Error('Esta solicitud ya se utilizó para otro envío.');if(previous.status==='sent')return {acceptedCount:previous.acceptedCount,rejectedCount:previous.rejectedCount};throw Error('Esta solicitud ya fue procesada. Revisa el correo antes de iniciar otro envío.');}
  const recent=(state.reportDeliveries||[]).filter(e=>e.userId===actor.id&&Date.parse(e.at)>Date.now()-600000);if(recent.length>=5)throw Error('Espera unos minutos antes de enviar más reportes.');
  entry={id:input.requestId,userId:actor.id,at:new Date().toISOString(),fingerprint,status:'sending'};
  state.reportDeliveries=[...(state.reportDeliveries||[]),entry];state.users=[];
  const {data:committed,error:commitError}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:state,actor_id:actor.id,expected_profile_updated:actor.updated_at});if(commitError)throw Error('No se pudo preparar el envío.');if(committed){analyses=returnReport.pages(rows,input.filter,state.monthlySales||[]);break;}
 }
 if(!analyses)throw Error('Otro usuario actualizó los datos. Vuelve a preparar el reporte.');
 const finalize=async values=>{for(let attempt=0;attempt<4;attempt++){const current=(await fetchProfiles()).find(p=>p.id===actor.id);if(!current?.active||!current.approved)return;const {data:workspace,error}=await service.from('cx_workspace').select('*').eq('id',1).single();if(error)return;const state=workspace.state,target=(state.reportDeliveries||[]).find(e=>e.id===entry.id);if(!target)return;Object.assign(target,values);const {data:ok}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:state,actor_id:current.id,expected_profile_updated:current.updated_at});if(ok)return;}};
 let transport;
 try{
  const current=(await fetchProfiles()).find(p=>p.id===actor.id);if(!reportMailAccess(current))throw Object.assign(Error('Revocado'),{code:'EAUTH'});
  const pdf=await createReportPDF(analyses);
  transport=nodemailer.createTransport({host:config.host,port:465,secure:true,auth:{user:config.user,pass:config.password},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:20000,disableFileAccess:true,disableUrlAccess:true});
  const sent=await transport.sendMail({from:{name:'Rematech - CX Workspace',address:config.user},bcc:input.recipients,messageId:`<${input.requestId}@cx-workspace.rematech.mx>`,subject:returnReport.subject(input.filter),text:`Se adjunta el reporte de devoluciones ${returnReport.scopeName(input.filter)} del ${input.filter.from} al ${input.filter.to}.\nGenerado desde CX Workspace.`,attachments:[{filename:returnReport.filename(input.filter),content:Buffer.from(pdf),contentType:'application/pdf'}]});
  const result={acceptedCount:sent.accepted?.length||0,rejectedCount:sent.rejected?.length||0};await finalize({status:'sent',...result});return result;
 }catch(error){const certain=['EAUTH','EENVELOPE'].includes(error.code);await finalize({status:certain?'failed':'unknown'});throw Error(certain?'El servidor de correo rechazó el envío. Revisa la configuración del remitente y los destinatarios.':'No se recibió confirmación del correo. Revisa si llegó antes de iniciar un nuevo envío para evitar duplicados.');}finally{transport?.close();}
}

import {createClient} from 'npm:@supabase/supabase-js@2.117.3';
const readMethods=new Set(['listRecords','listMonthlySales','dashboardData','faultReportData','listTechnicians','listNotifications']);
const writeMethods=new Set(['saveRecord','saveRecords','deleteRecord','saveRepair','readNotification','validateQuality','confirmReceipt','receiveAndSend','receiveExchange','saveIdentifier','closeReturn','saveMonthlySales']);
// Keep older installed clients readable while they receive the new navigation.
function legacyWorkflowResult(value,input){
 const convert=r=>{if(!r||!['reparacion','calidad'].includes(r.module))return r;const index=r.type===2?2:r.type===1?1:0;return {...r,index,location:`Expedientes • ${r.module==='calidad'?'Calidad':'Reparación'} / ${index===2?'Equipos en servicio':index===1?'Cambio de equipo':'Devoluciones'}${r.archived?' · Archivado':''}`};};
 if(Array.isArray(value))return value.map(convert);
 if(value&&Array.isArray(value.records)){const target=value.records.find(r=>r.id===input?.id),result={...value,records:value.records.map(convert)};if(target&&Number.isInteger(value.index))result.index=convert(target).index;return result;}
 return value;
}
const userShape=p=>({id:p.id,name:p.name,username:p.email,role:p.role,permissions:p.permissions,active:p.active&&p.approved,mustChangePassword:false,pending:!p.approved});
const reply=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
Deno.serve(async req=>{
 try{
 if(req.method!=='POST')return reply({error:'Método no permitido'},405);
 const token=req.headers.get('Authorization');if(!token?.startsWith('Bearer '))return reply({error:'Inicia sesión.'},401);
 const url=Deno.env.get('SUPABASE_URL'),anon=Deno.env.get('SUPABASE_ANON_KEY'),secret=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 const auth=createClient(url,anon,{global:{headers:{Authorization:token}},auth:{persistSession:false}});
 const {data:authData,error:authError}=await auth.auth.getUser();if(authError||!authData.user)return reply({error:'Sesión inválida.'},401);
 const service=createClient(url,secret,{auth:{persistSession:false}}),body=await req.json(),{method,input,clientVersion}=body;const [clientMajor,clientMinor]=String(clientVersion||'0.0').split('.').map(Number),modernClient=clientMajor>0||clientMinor>=10;
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
 if(method==='reportMailStatus')return reply({result:reportMailStatus(profile)});
 if(method==='sendFaultReport')return reply({result:await deliverReport(service,profile,input,fetchProfiles)});
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
 next.records=next.records.map(r=>{const old=original.get(r.id)||{};const metadata={};for(const k of ['receipt','closure','repair','quality','qualityHistory','archived','archivedAt','createdAt','updatedAt','returnMitigated','sentToQualityAt','receivedOutcome','claimClassification','exchange','originalType'])if(old[k]!==undefined)metadata[k]=old[k];return {...r,...metadata,module:old.module||r.module,index:Number.isInteger(old.index)?old.index:r.index,resolution:old.resolution||r.resolution,expedientNumber:Number.isInteger(old.expedientNumber)?old.expedientNumber:r.expedientNumber};});
 next.records=normalizeWorkflowState({records:next.records,workflowVersion:input.workflowVersion||1}).records;next.workflowVersion=2;
 if(new Set(next.records.map(r=>r.expedientNumber)).size!==next.records.length)throw Error('Hay números de expediente duplicados.');
 next.nextNumber=Math.max(1,...next.records.map(r=>r.expedientNumber+1));
 for(const sale of input.monthlySales||[])business.api.saveMonthlySales(sale);
 result={imported:next.records.length};
 }else result=business.api[method](input);
 if(readMethods.has(method))return reply({result:modernClient?result:legacyWorkflowResult(result,input)});
 const next=business.getState();next.users=[];
 const {data:committed,error:commitError}=await service.rpc('cx_commit_state',{expected_version:workspace.version,next_state:next,actor_id:profile.id,expected_profile_updated:profile.updated_at});if(commitError)throw Error('No se pudieron guardar los cambios.');if(committed)return reply({result:modernClient?result:legacyWorkflowResult(result,input)});
 }
 return reply({error:'Otro usuario actualizó los datos. Intenta nuevamente.'},409);
 }catch(error){return reply({error:error.message||'No se pudo completar la acción.'},400);}
});
