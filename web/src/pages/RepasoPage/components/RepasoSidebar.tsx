import { useMemo, useState } from 'react'
import type { Tema, TopicKind } from '../../../types'
import { TagPills } from './TagPills'
import styles from './repasoSidebar.module.css'

type Props = {
  temas: Tema[]
}

export function RepasoSidebar({ temas }: Props) {
  const [activeKey, setActiveKey] = useState<TopicKind>(temas[0]?.key ?? 'ciclo')

  const activeTema = useMemo(() => temas.find((t) => t.key === activeKey) ?? temas[0], [activeKey, temas])

  if (!activeTema) return null

  return (
    <section className={styles.panel}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{activeTema.icon} {activeTema.titulo}</div>
        <div className={styles.prioridad}>{activeTema.prioridad}</div>
      </div>
      <div className={styles.subtitulo}>{activeTema.subtitulo}</div>

      <div className={styles.body}>{activeTema.body}</div>
      <div className={styles.tagsWrap}>
        <TagPills tags={activeTema.tags} />
      </div>

      <div className={styles.sectionTitle}>Para practicar</div>
      <div className={styles.practice}>
        {activeTema.recorridos?.map((r) => (
          <div key={r.title} className={styles.practiceItem}>
            <div className={styles.practiceTitle}>{r.title}</div>
            {r.items.map((it, idx) => (
              <div key={idx} className={`${styles.item} ${styles[it.c]}`}>{it.t}</div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.hint}>Tip: si no te sale con tus palabras, volvés al mapa y elegís otro concepto del circuito.</div>

      <div className={styles.selector}>
        <div className={styles.selectorLabel}>Cambiar concepto</div>
        <div className={styles.selectorButtons}>
          {temas.map((t) => (
            <button
              key={t.key}
              className={`${styles.selBtn} ${t.key === activeKey ? styles.selBtnActive : ''}`}
              onClick={() => setActiveKey(t.key)}
            >
              {t.icon} {t.shortLabel}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

