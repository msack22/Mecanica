import { useState } from 'react'
import styles from './hotspotImage.module.css'

export type Hotspot = {
  id: string
  x: number // percentage from left (0-100)
  y: number // percentage from top (0-100)
  title: string
  desc: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

type Props = {
  src: string
  alt: string
  hotspots: Hotspot[]
}

export function HotspotImage({ src, alt, hotspots }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.image} />
      
      {hotspots.map((spot) => {
        const isActive = activeId === spot.id
        const placementClass = styles[spot.placement || 'top']

        return (
          <div
            key={spot.id}
            className={styles.hotspotWrapper}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onMouseEnter={() => setActiveId(spot.id)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() => setActiveId(isActive ? null : spot.id)}
          >
            <button
              className={`${styles.pin} ${isActive ? styles.pinActive : ''}`}
              aria-label={`Ver detalle de ${spot.title}`}
            >
              <span className={styles.pulse}></span>
            </button>

            {isActive && (
              <div className={`${styles.tooltip} ${placementClass}`}>
                <div className={styles.tooltipArrow}></div>
                <div className={styles.tooltipContent}>
                  <div className={styles.tooltipTitle}>{spot.title}</div>
                  <div className={styles.tooltipDesc}>{spot.desc}</div>
                </div>
              </div>
            )}
          </div>
        )
      })}
      
      <div className={styles.hint}>
        💡 Pasá el mouse o tocá los círculos brillantes para identificar cada pieza real.
      </div>
    </div>
  )
}
