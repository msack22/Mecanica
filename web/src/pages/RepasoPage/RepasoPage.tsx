import { ConceptMap } from './components/ConceptMap'
import { RepasoSidebar } from './components/RepasoSidebar'
import { temas } from '../../data/temas'
import styles from './repasoPage.module.css'

export function RepasoPage() {
  return (
    <div className={styles.page}>
      <div className={styles.topTitle}>
        <h1 className={styles.h1}>Material de repaso</h1>
        <div className={styles.subtitle}>Elegí un concepto para repasar</div>
      </div>

      <div className={styles.layout}>
        <aside className={styles.left}>
          <ConceptMap temas={temas} />
        </aside>

        <main className={styles.right}>
          <RepasoSidebar temas={temas} />
        </main>
      </div>
    </div>
  )
}

