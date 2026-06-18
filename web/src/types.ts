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
  | 'preventivoativo'

export type TopicKind =
  | 'tren_delantero'
  | 'amortiguadores_resortes'
  | 'frenos'
  | 'homocineticas'
  | 'retenes'
  | 'ruidos'
  | 'direccion'
  | 'diagnostico_motor'
  | 'mantenimiento'
  | 'cableado_obd'

export type ConceptItem = {
  c: TopicColor
  t: string
}

export type ConceptSection = {
  title: string
  items: ConceptItem[]
}

export type Tema = {
  key: TopicKind
  icon: string
  titulo: string
  shortLabel: string
  subtitulo: string
  prioridad: 'Alta' | 'Media'
  color: string
  body: string
  tags: Tag[]
  recorridos?: ConceptSection[]
}

