import type { SystemCategory } from '../types'
import styles from './overviewMap.module.css'

type Props = {
  systems: SystemCategory[]
  onSelectSystem: (key: string) => void
  hoveredSystem: string | null
  onHoverSystem: (key: string | null) => void
}

export function OverviewMap({ systems, onSelectSystem, hoveredSystem, onHoverSystem }: Props) {
  // Mapa de nodos para dibujar líneas y rectángulos interactivos
  const nodes = [
    {
      key: 'mec',
      x: 260,
      y: 30,
      w: 160,
      h: 52,
      lineX1: 340,
      lineY1: 82,
      lineX2: 340,
      lineY2: 175,
    },
    {
      key: 'comb',
      x: 470,
      y: 80,
      w: 180,
      h: 52,
      lineX1: 470,
      lineY1: 106,
      lineX2: 410,
      lineY2: 210,
    },
    {
      key: 'ref',
      x: 470,
      y: 190,
      w: 180,
      h: 52,
      lineX1: 470,
      lineY1: 216,
      lineX2: 410,
      lineY2: 216,
    },
    {
      key: 'lub',
      x: 470,
      y: 300,
      w: 180,
      h: 52,
      lineX1: 470,
      lineY1: 326,
      lineX2: 410,
      lineY2: 250,
    },
    {
      key: 'ele',
      x: 30,
      y: 80,
      w: 180,
      h: 52,
      lineX1: 210,
      lineY1: 106,
      lineX2: 270,
      lineY2: 200,
    },
    {
      key: 'trans',
      x: 30,
      y: 190,
      w: 180,
      h: 52,
      lineX1: 210,
      lineY1: 216,
      lineX2: 270,
      lineY2: 216,
    },
    {
      key: 'esc',
      x: 30,
      y: 300,
      w: 180,
      h: 52,
      lineX1: 210,
      lineY1: 326,
      lineX2: 270,
      lineY2: 250,
    },
    {
      key: 'abajo',
      x: 260,
      y: 380,
      w: 160,
      h: 52,
      lineX1: 340,
      lineY1: 380,
      lineX2: 340,
      lineY2: 265,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.mapWrapper}>
        <svg viewBox="0 0 680 440" className={styles.svg}>
          {/* Definiciones para filtros de brillo (glow) */}
          <defs>
            {systems.map((sys) => (
              <filter id={`glow-${sys.key}`} key={sys.key} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            ))}
          </defs>

          {/* Centro: Motor */}
          <g className={styles.centerNode}>
            <rect
              x="270"
              y="175"
              width="140"
              height="90"
              rx="12"
              className={styles.centerRect}
            />
            <text x="340" y="212" textAnchor="middle" className={styles.centerTitle}>
              Motor
            </text>
            <text x="340" y="230" textAnchor="middle" className={styles.centerSub}>
              1.6 MSI EA111
            </text>
            <text x="340" y="246" textAnchor="middle" className={styles.centerDesc}>
              pistones · bielas · cigüeñal
            </text>
          </g>

          {/* Líneas de conexión interactivas */}
          {nodes.map((node) => {
            const sys = systems.find((s) => s.key === node.key)
            if (!sys) return null
            const isHovered = hoveredSystem === node.key

            return (
              <line
                key={`line-${node.key}`}
                x1={node.lineX1}
                y1={node.lineY1}
                x2={node.lineX2}
                y2={node.lineY2}
                stroke={isHovered ? sys.color : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isHovered ? 2 : 1}
                strokeDasharray={isHovered ? 'none' : '4 4'}
                className={styles.connectorLine}
                style={{
                  transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                }}
              />
            )
          })}

          {/* Nodos del mapa conceptual */}
          {nodes.map((node) => {
            const sys = systems.find((s) => s.key === node.key)
            if (!sys) return null
            const isHovered = hoveredSystem === node.key

            return (
              <g
                key={`node-${node.key}`}
                className={`${styles.nodeG} ${isHovered ? styles.activeG : ''}`}
                onClick={() => onSelectSystem(node.key)}
                onMouseEnter={() => onHoverSystem(node.key)}
                onMouseLeave={() => onHoverSystem(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow de fondo cuando está hovered */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="10"
                  fill="none"
                  stroke={sys.color}
                  strokeWidth="3"
                  opacity={isHovered ? 0.6 : 0}
                  filter={`url(#glow-${sys.key})`}
                  className={styles.glowRect}
                />

                {/* Rectángulo de fondo */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="10"
                  fill="rgba(17, 22, 34, 0.85)"
                  stroke={isHovered ? sys.color : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={isHovered ? 1.5 : 1}
                  className={styles.nodeRect}
                />

                {/* Texto del nodo */}
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 23}
                  textAnchor="middle"
                  fill={sys.color}
                  className={styles.nodeTitle}
                >
                  {sys.icon} {sys.label}
                </text>
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 39}
                  textAnchor="middle"
                  fill="var(--color-text-secondary)"
                  className={styles.nodeSub}
                >
                  {sys.topics[0]?.title ?? 'Ver temas'}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Grid de Tarjetas de Sistemas para navegación accesible y táctil */}
      <div className={styles.cardsGrid}>
        {systems.map((sys) => {
          const isHovered = hoveredSystem === sys.key
          return (
            <div
              key={sys.key}
              className={`${styles.systemCard} ${isHovered ? styles.cardHovered : ''}`}
              style={{
                borderColor: isHovered ? sys.color : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isHovered ? `0 0 15px -3px ${sys.color}33` : 'none',
              }}
              onClick={() => onSelectSystem(sys.key)}
              onMouseEnter={() => onHoverSystem(sys.key)}
              onMouseLeave={() => onHoverSystem(null)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon} style={{ background: `${sys.color}15`, color: sys.color }}>
                  {sys.icon}
                </span>
                <h3 className={styles.cardTitle} style={{ color: sys.color }}>
                  {sys.label}
                </h3>
              </div>
              <p className={styles.cardDesc}>{sys.hint}</p>
              <div className={styles.cardFooter}>
                <span className={styles.topicsCount}>
                  {sys.topics.length} {sys.topics.length === 1 ? 'tema' : 'temas'}
                </span>
                <span className={styles.enterBtn} style={{ color: sys.color }}>
                  Explorar →
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
