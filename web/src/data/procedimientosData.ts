export type Procedimiento = {
  id: string
  title: string
  systemKey: string // vincula con el sistema, ej: 'mec'
  description: string
  url: string
  youtubeId: string
  steps: string[]
}

export const procedimientosData: Procedimiento[] = [
  {
    id: 'correa_distribucion_ap',
    title: 'Cambio de Correa de Distribución y Accesorios',
    systemKey: 'mec',
    description: 'Guía tutorial detallada para el cambio de la correa de distribución y la correa de accesorios auxiliar en el motor Volkswagen 1.6 Audi AP del Gol.',
    url: 'https://www.youtube.com/watch?v=OHyJE579Wkk',
    youtubeId: 'OHyJE579Wkk',
    steps: [
      'Puesta a punto: Identificación de marcas PMS (flecha en engranaje y referencia OT en la culata).',
      'Desmontaje de poleas de accesorios, tensores y tapas protectoras plásticas.',
      'Alineación correcta del cigüeñal, árbol auxiliar y engranaje del árbol de levas.',
      'Instalación de la correa nueva y calibración de la tensión con el tensor móvil.'
    ]
  },
  {
    id: 'puesta_punto_distribucion',
    title: 'Puesta a Punto de Distribución y Sincronización',
    systemKey: 'mec',
    description: 'Procedimiento complementario para verificar la puesta a punto y marcas de sincronización de la distribución, asegurando el correcto encendido del motor.',
    url: 'https://www.youtube.com/watch?v=-ivDrPQm_4M',
    youtubeId: '-ivDrPQm_4M',
    steps: [
      'Calibración de cilindro 1 en Punto Muerto Superior (PMS).',
      'Verificación visual de la marca OT en el árbol de levas.',
      'Alineamiento de la puesta a punto para evitar interferencia valvular y fallas de encendido.'
    ]
  },
  {
    id: 'cambio_embrague_g1',
    title: 'Cambio de Embrague VW Gol G1',
    systemKey: 'mec',
    description: 'Desarmado paso a paso para reemplazar el kit de embrague en el Volkswagen Gol, incluyendo el centrado del disco y la prensa.',
    url: 'https://www.youtube.com/watch?v=irIezMBrTTM',
    youtubeId: 'irIezMBrTTM',
    steps: [
      'Retiro de semiejes y desmontaje de la caja de cambios desde abajo.',
      'Extracción del plato de presión y el disco de embrague desgastados.',
      'Limpieza del volante de inercia y control de retenes de aceite.',
      'Instalación del kit nuevo usando un centrador de embrague para alinear estriados.'
    ]
  },
  {
    id: 'cambio_embrague_pasos',
    title: 'Cambio de Embrague paso a paso (Parte 1 de 3)',
    systemKey: 'mec',
    description: 'Tutorial detallado del proceso inicial para descolgar la transmisión y liberar el embrague en plataformas clásicas de Volkswagen (Gol, Senda, Gacel).',
    url: 'https://www.youtube.com/watch?v=4N3KBn2wjto',
    youtubeId: '4N3KBn2wjto',
    steps: [
      'Desconexión del cable de embrague, varillaje de cambios y motor de arranque.',
      'Extracción de bulones del cárter de embrague que unen la caja al bloque de motor.',
      'Soporte seguro del motor y caja para realizar el retiro manual.'
    ]
  }
]
