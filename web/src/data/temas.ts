import type { Tema } from '../types'

// Seed inicial basada en guía_temas_pendientes.html (temas principales)
// A futuro: podés ampliar agregando más secciones y conceptos.
export const temas: Tema[] = [
  {
    key: 'tren_delantero',
    icon: '🔩',
    titulo: 'Tren delantero completo',
    shortLabel: 'Tren delantero',
    subtitulo: 'Todo lo que sostiene la rueda',
    prioridad: 'Alta',
    color: '#534AB7',
    body:
      'Los "fierros atados a la rueda" que mencionás. Incluye: mangueta (porta-rueda), rótulas (superior e inferior), buje de rueda y rodamiento, brazos de suspensión, bieletas estabilizadoras y silent blocks. Cada uno tiene un rol y un síntoma de falla distinto. Este es uno de los temas más útiles para inspeccionar un auto usado.',
    tags: ['se repara', 'se cambia', 'ruidos', 'inspección visual'],
  },
  {
    key: 'amortiguadores_resortes',
    icon: '📍',
    titulo: 'Amortiguadores y resortes',
    shortLabel: 'Suspensión',
    subtitulo: 'Suspensión completa',
    prioridad: 'Alta',
    color: '#185FA5',
    body:
      'Cómo funcionan el amortiguador y el resorte juntos, qué pasa cuando el amortiguador falla (rebote, derrape), cómo detectarlo (test del empuje), los diferentes tipos (telescópico, McPherson) y cuándo se cambian. También los silent blocks y bieletas que son las piezas de goma que se gastan primero.',
    tags: ['se cambia', 'diagnóstico fácil', 'ruidos'],
  },
  {
    key: 'frenos',
    icon: '🛑',
    titulo: 'Sistema de frenos completo',
    shortLabel: 'Frenos',
    subtitulo: 'Discos, pastillas, tambores, líquido',
    prioridad: 'Alta',
    color: '#A32D2D',
    body:
      'Cómo funciona el circuito hidráulico de frenos, diferencia entre discos y tambores, cuándo cambiar pastillas vs discos, cómo saber si los frenos están bien (pedal duro, pedal blando, vibración, ruido metálico). El líquido de frenos y por qué se cambia cada 2 años aunque no se use.',
    tags: ['se repara', 'se cambia', 'seguridad crítica'],
  },
  {
    key: 'homocineticas',
    icon: '🔄',
    titulo: 'Juntas homocinéticas',
    shortLabel: 'Homocinéticas',
    subtitulo: 'Extremos de los semiejes',
    prioridad: 'Media',
    color: '#BA7517',
    body:
      'Las "bolitas" que están en los extremos de los semiejes. Permiten que la rueda gire y se mueva con la suspensión al mismo tiempo. Se cubren con un fuelle de goma (bota) — cuando la bota se rompe, la grasa sale y la junta se seca y rompe. Detectarlas es fácil: ruido de "crack crack" al doblar.',
    tags: ['ruidos', 'diagnóstico fácil', 'se cambia'],
  },
  {
    key: 'retenes',
    icon: '💧',
    titulo: 'Retenes y juntas',
    shortLabel: 'Retenes',
    subtitulo: 'Todo lo que sella y evita pérdidas',
    prioridad: 'Media',
    color: '#0F6E56',
    body:
      'Retén de cigüeñal delantero y trasero, retén de la caja de cambios, junta de culata y retenes de válvulas. Cuándo cambiarlos, cómo detectar pérdidas (manchas en el piso, nivel que baja) y qué pasa si los ignorás. La mayoría son baratos pero laboriosos.',
    tags: ['pérdidas', 'diagnóstico visual', 'se cambia'],
  },
  {
    key: 'ruidos',
    icon: '🔊',
    titulo: 'Diagnóstico por ruidos',
    shortLabel: 'Ruidos',
    subtitulo: 'Qué dice cada ruido',
    prioridad: 'Alta',
    color: '#854F0B',
    body:
      'Guía práctica de ruidos: golpe en badenes (silent block/rótula), crack al doblar (homocinética), squeak metálico al frenar (pastillas), tick tick en frío (colector escape o válvulas), zumbido que sube con velocidad (rodamiento), golpe seco al acelerar (cruceta o diferencial). Cada ruido tiene una causa específica.',
    tags: ['diagnóstico', 'muy práctico', 'inspección'],
  },
  {
    key: 'direccion',
    icon: '⚡',
    titulo: 'Dirección completa',
    shortLabel: 'Dirección',
    subtitulo: 'Hidráulica vs eléctrica',
    prioridad: 'Media',
    color: '#3B6D11',
    body:
      'Cómo funciona la dirección hidráulica (bomba, cremallera, líquido) y la eléctrica (motor eléctrico en la columna). Qué hacer si el volante vibra, si hay juego excesivo o si la dirección tira para un lado. La cremallera es una pieza cara — cómo detectarla antes de que sea urgente.',
    tags: ['se repara', 'diagnóstico', 'ruidos'],
  },
  {
    key: 'diagnostico_motor',
    icon: '🌡',
    titulo: 'Diagnóstico general del motor',
    shortLabel: 'Diagnóstico motor',
    subtitulo: 'Test de compresión y más',
    prioridad: 'Alta',
    color: '#534AB7',
    body:
      'Cómo hacer un test de compresión paso a paso, qué significan los valores, el test de estanqueidad, cómo leer códigos OBD-II con scanner y una inspección completa antes de comprar un auto usado. Incluye checklist del Gol Trend.',
    tags: ['muy práctico', 'compra de auto', 'diagnóstico'],
  },
  {
    key: 'mantenimiento',
    icon: '🔧',
    titulo: 'Mantenimiento preventivo',
    shortLabel: 'Preventivo',
    subtitulo: 'Qué cambiar y cada cuánto',
    prioridad: 'Alta',
    color: '#888780',
    body:
      'Plan del Gol Trend 1.6 MSI: aceite cada 10.000 km, correa distribución a los 60.000, bujías, filtros (aire, nafta, habitáculo), líquido de frenos cada 2 años, refrigerante y líquido de caja. Qué podés hacer vos solo vs qué necesita taller.',
    tags: ['muy práctico', 'ahorra plata', 'preventivo'],
  },
  {
    key: 'cableado_obd',
    icon: '🪝',
    titulo: 'Cableado avanzado y OBD',
    shortLabel: 'OBD',
    subtitulo: 'Scanner, códigos de error',
    prioridad: 'Media',
    color: '#534AB7',
    body:
      'Cómo conectar un OBD-II, qué son los códigos P0XXX, cómo leerlos e interpretarlos. Qué sensores fallan más (MAF, MAP, lambda, temperatura) y cómo hacer un diagnóstico eléctrico básico con multímetro.',
    tags: ['diagnóstico', 'scanner', 'eléctrico'],
  },
]

