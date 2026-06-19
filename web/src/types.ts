export type TopicColor = 'verde' | 'azul' | 'naranja' | 'rojo' | 'violeta' | 'gris'

export type Tag =
  | 'se repara'
  | 'se cambia'
  | 'ruidos'
  | 'inspección visual'
  | 'diagnóstico'
  | 'diagnóstico fácil'
  | 'diagnóstico visual'
  | 'inspección'
  | 'muy práctico'
  | 'compra de auto'
  | 'seguridad crítica'
  | 'pérdidas'
  | 'preventivo'
  | 'ahorra plata'
  | 'scanner'
  | 'eléctrico'
  | 'potenciación'

export type TopicWidget =
  | 'ciclo_4_tiempos'
  | 'motor_niveles'
  | 'conexiones_internas'
  | 'aros_piston_detalle'
  | 'aros_piston_separacion'
  | 'ciguenal_arbol_levas'
  | 'sincronizacion_correa'
  | 'bloqueo_poleas'
  | 'colores_humo'
  | 'sistema_escape'
  | 'cambio_disco_embrague'
  | 'tren_delantero'
  | 'diagnostico_ruidos'
  | 'vista_desde_abajo'
  | 'cableado_electrico'
  | 'mono_vs_multipunto'
  | 'potencia_opciones'
  | 'lift_camino_tierra'
  | 'circuito_refrigeracion'
  | 'circuito_lubricacion'
  | 'obd2_scanner'
  | 'retenes_juntas'
  | 'bujes_cojinetes'
  | 'sistema_frenos'
  | 'ubicacion_frenos'

export type ConceptItem = {
  c: TopicColor
  t: string
}

export type ConceptSection = {
  title: string
  items: ConceptItem[]
}

export type Tema = {
  key: string
  title: string
  subtitle: string
  widget?: TopicWidget
  body?: string
  tip?: string
  warning?: string
  tags?: Tag[]
  recorridos?: ConceptSection[]
  imageUrl?: string // URL of the real-world component image
}

export type SystemCategory = {
  key: string
  label: string
  icon: string
  hint: string
  color: string
  topics: Tema[]
}
