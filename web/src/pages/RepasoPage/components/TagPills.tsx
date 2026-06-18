import type { Tag } from '../../../types'
import styles from './tagPills.module.css'

type Props = {
  tags: Tag[]
}

const tagColors: Record<string, { bg: string; color: string; border: string }> = {
  'se repara': { bg: 'rgba(29,158,117,0.14)', color: '#1D9E75', border: 'rgba(29,158,117,0.35)' },
  'se cambia': { bg: 'rgba(186,117,23,0.14)', color: '#BA7517', border: 'rgba(186,117,23,0.35)' },
  'ruidos': { bg: 'rgba(83,74,183,0.14)', color: '#534AB7', border: 'rgba(83,74,183,0.35)' },
  'diagnóstico': { bg: 'rgba(24,95,165,0.14)', color: '#185FA5', border: 'rgba(24,95,165,0.35)' },
  'diagnóstico fácil': { bg: 'rgba(24,95,165,0.14)', color: '#185FA5', border: 'rgba(24,95,165,0.35)' },
  'inspección visual': { bg: 'rgba(59,109,17,0.14)', color: '#3B6D11', border: 'rgba(59,109,17,0.35)' },
  'inspección': { bg: 'rgba(59,109,17,0.14)', color: '#3B6D11', border: 'rgba(59,109,17,0.35)' },
  'muy práctico': { bg: 'rgba(226,75,74,0.12)', color: '#E24B4A', border: 'rgba(226,75,74,0.35)' },
  'compra de auto': { bg: 'rgba(226,75,74,0.12)', color: '#E24B4A', border: 'rgba(226,75,74,0.35)' },
  'seguridad crítica': { bg: 'rgba(226,75,74,0.12)', color: '#E24B4A', border: 'rgba(226,75,74,0.35)' },
  'pérdidas': { bg: 'rgba(133,79,11,0.14)', color: '#854F0B', border: 'rgba(133,79,11,0.35)' },
  'diagnóstico visual': { bg: 'rgba(24,95,165,0.14)', color: '#185FA5', border: 'rgba(24,95,165,0.35)' },
  'preventivoativo': { bg: 'rgba(136,135,128,0.14)', color: '#888780', border: 'rgba(136,135,128,0.35)' },
  'preventivo': { bg: 'rgba(136,135,128,0.14)', color: '#888780', border: 'rgba(136,135,128,0.35)' },
  'ahorra plata': { bg: 'rgba(29,158,117,0.14)', color: '#1D9E75', border: 'rgba(29,158,117,0.35)' },
  'scanner': { bg: 'rgba(83,74,183,0.14)', color: '#534AB7', border: 'rgba(83,74,183,0.35)' },
  'eléctrico': { bg: 'rgba(83,74,183,0.14)', color: '#534AB7', border: 'rgba(83,74,183,0.35)' },
}

export function TagPills({ tags }: Props) {
  return (
    <div className={styles.wrap}>
      {tags.map((tag) => {
        const c = tagColors[tag] ?? { bg: 'rgba(136,135,128,0.14)', color: '#888780', border: 'rgba(136,135,128,0.35)' }
        return (
          <span key={tag} className={styles.pill} style={{ background: c.bg, color: c.color, borderColor: c.border }}>
            {tag}
          </span>
        )
      })}
    </div>
  )
}

