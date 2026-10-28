export const SHEET_INTAKE = {
  name: 'Carga rápida',
  firstDataRow: 2,
  maxRows: 100,
  columns: {
    key: 0, type: 1, date: 2, order: 3, product: 4, productUrl: 5, serial: 6,
    contact: 7, quantity: 8, price: 9, responsibleArea: 10, received: 11,
    receivedOutcome: 12, reason: 13, component: 14, specificReason: 15,
    customerReason: 16, extra1Reason: 17, extra1Component: 18,
    extra1Specific: 19, extra2Reason: 20, extra2Component: 21,
    extra2Specific: 22, hasPassword: 23, devicePassword: 24,
    refundMethod: 25, percentage: 26, manualRefund: 27, total: 28,
    destination: 29, status: 30, folio: 31,
    extra3Reason: 32, extra3Component: 33, extra3Specific: 34,
    extra4Reason: 35, extra4Component: 36, extra4Specific: 37,
    selected: 38,
  },
};

export const HISTORICAL_CUTOFF_DATE = '2026-08-31';

const cell = (row, name) => row[SHEET_INTAKE.columns[name]];
const clean = value => String(value ?? '').trim();

export function sheetDate(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(Date.UTC(1899, 11, 30) + Math.round(value) * 86400000).toISOString().slice(0, 10);
  }
  const text = clean(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  return '';
}

export function mapSheetRecord(row, sourceImportKey) {
  const types = new Map([['Devolución', 0], ['Cambio de equipo', 1], ['Servicio', 2], ['Reembolso parcial', 3]]);
  const typeName = clean(cell(row, 'type'));
  const type = types.get(typeName);
  if (type === undefined) throw Error('Selecciona un tipo de registro válido.');

  const receivedLabel = clean(cell(row, 'received'));
  if (receivedLabel && !['Sí', 'No'].includes(receivedLabel)) throw Error('Selecciona Sí o No en “Equipo ya recibido”.');
  if (receivedLabel === 'Sí' && type > 1) throw Error('“Equipo ya recibido” solo aplica a devoluciones y cambios.');
  const receivedOnRegistration = receivedLabel === 'Sí';
  const refundMethod = clean(cell(row, 'refundMethod'));
  const additionalFaults = [];
  for (const suffix of ['1', '2', '3', '4']) {
    const reason = clean(cell(row, `extra${suffix}Reason`));
    const component = clean(cell(row, `extra${suffix}Component`));
    const specificReason = clean(cell(row, `extra${suffix}Specific`));
    if (reason || component || specificReason) {
      additionalFaults.push({ reason, component: component || null, specificReason, specificReasons: specificReason ? [specificReason] : [] });
    }
  }

  const price = Number(cell(row, 'price'));
  const quantity = Number(cell(row, 'quantity'));
  const percentage = Number(cell(row, 'percentage'));
  const manualRefund = Number(cell(row, 'manualRefund'));
  const hasPassword = clean(cell(row, 'hasPassword'));
  if (hasPassword && !['Sí', 'No'].includes(hasPassword)) throw Error('Selecciona Sí o No en “¿Tiene contraseña?”.');

  return {
    sourceImportKey,
    type,
    date: sheetDate(cell(row, 'date')),
    order: clean(cell(row, 'order')),
    product: clean(cell(row, 'product')),
    productUrl: clean(cell(row, 'productUrl')) || null,
    serial: clean(cell(row, 'serial')),
    contact: clean(cell(row, 'contact')),
    quantity,
    price: Math.round(price * 100),
    responsibleArea: clean(cell(row, 'responsibleArea')),
    receivedOnRegistration,
    receivedOutcome: clean(cell(row, 'receivedOutcome')) === 'Reembolso al comprador' ? 'buyer'
      : clean(cell(row, 'receivedOutcome')) === 'Cerrado a favor de Rematech' ? 'rematech' : null,
    reason: clean(cell(row, 'reason')),
    component: clean(cell(row, 'component')) || null,
    specificReason: clean(cell(row, 'specificReason')),
    specificReasons: clean(cell(row, 'specificReason')) ? [clean(cell(row, 'specificReason'))] : [],
    customerReason: clean(cell(row, 'customerReason')),
    additionalFaults,
    deviceHasPassword: type === 2 && hasPassword === 'Sí',
    devicePassword: type === 2 && hasPassword === 'Sí' ? clean(cell(row, 'devicePassword')) : '',
    refundMode: type === 3 ? (refundMethod === 'Porcentaje' ? 'percentage' : refundMethod === 'Monto manual' ? 'manual' : null) : null,
    percentage: type === 3 && refundMethod === 'Porcentaje' ? percentage : null,
    refund: type === 3 && refundMethod === 'Monto manual' ? Math.round(manualRefund * 100) : null,
  };
}

export function rowHasInput(row) {
  const ignored = new Set(['key', 'contact', 'quantity', 'total', 'destination', 'status', 'folio', 'selected']);
  return Object.keys(SHEET_INTAKE.columns).some(name => !ignored.has(name) && clean(cell(row, name)) !== '');
}

export function rowSelected(row) {
  const value = cell(row, 'selected');
  return value === true || ['TRUE', 'VERDADERO', 'SI', 'SÍ', '1'].includes(clean(value).toLocaleUpperCase('es-MX'));
}

export function routeSheetRecord(record) {
  if (record.date && record.date <= HISTORICAL_CUTOFF_DATE) {
    return ['Histórico en Sheets', 'No se envía a módulos activos'];
  }
  const routes = [
    ['Devoluciones', 'En proceso'],
    ['Devoluciones', record.receivedOnRegistration ? 'En proceso · Confirmar cambio' : 'En proceso · Pendiente de llegada y confirmación'],
    ['Reparación', 'Equipos en servicio'],
    ['Devoluciones', 'Cerradas'],
  ];
  if (record.type === 0 && record.receivedOnRegistration) return ['Reparación', 'Expedientes · Devoluciones'];
  if (record.type === 1 && record.receivedOnRegistration) return ['Devoluciones', 'En proceso · Cambio recibido; confirmar ejecución'];
  return routes[record.type] || ['Sin destino', ''];
}

