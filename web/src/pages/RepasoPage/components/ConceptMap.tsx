import type { Tema } from '../../../types'
import styles from './conceptMap.module.css'

type Props = {
  temas: Tema[]
}

export function ConceptMap({ temas }: Props) {
  // El mapa solo es visual por ahora; el sidebar tiene controles.
  // Si luego querés, conectamos clicks del mapa a setActiveKey.
  return (
    <div className={styles.wrap}>
      <svg width="100%" viewBox="0 0 680 440" className={styles.svg}>
        <rect x="270" y="175" width="140" height="90" rx="10" fill="var(--color-background-secondary)" stroke="var(--color-border-secondary)" strokeWidth="1.5" />
        <text x="340" y="214" textAnchor="middle" fontSize="13" fontWeight="500" fill="var(--color-text-primary)">Motor</text>
        <text x="340" y="232" textAnchor="middle" fontSize="10" fill="var(--color-text-tertiary)">4 cilindros</text>
        <text x="340" y="248" textAnchor="middle" fontSize="9" fill="var(--color-text-tertiary)">pistones · bielas · cigüeñal</text>

        <MapNode x={260} y={30} w={160} h={52} stroke="#0F6E56" label="🔧" sub="ciclo 4 tiempos · válvulas · levas" />
        <MapNode x={470} y={80} w={180} h={52} stroke="#BA7517" label="⛽" sub="tanque · bomba · inyectores · ECU" />
        <MapNode x={470} y={190} w={180} h={52} stroke="#185FA5" label="💧" sub="radiador · termostato · bomba agua" />
        <MapNode x={470} y={300} w={180} h={52} stroke="#854F0B" label="🛢" sub="cárter · bomba aceite · filtro · aros" />
        <MapNode x={30} y={80} w={180} h={52} stroke="#534AB7" label="⚡" sub="batería · bobina · alternador · ECU" />
        <MapNode x={30} y={190} w={180} h={52} stroke="#3B6D11" label="⚙️" sub="embrague · caja · semiejes · ruedas" />
        <MapNode x={30} y={300} w={180} h={52} stroke="#5F5E5A" label="💨" sub="colector · catalizador · silenciadores" />
        <MapNode x={260} y={380} w={160} h={52} stroke="#888780" label="👁" sub="cárter · escape · semiejes · frenos" />
      </svg>
      <div className={styles.legend}>React renderiza el contenido. El mapa queda como guía visual (se puede hacer clickeable luego).</div>
    </div>
  )
}

function MapNode({ x, y, w, h, stroke, label, sub }: { x: number; y: number; w: number; h: number; stroke: string; label: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="var(--color-background-secondary)" stroke={stroke} strokeWidth={1} />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" fontSize="12" fontWeight="500" fill={stroke}>{label}</text>
      <text x={x + w / 2} y={y + 40} textAnchor="middle" fontSize="9" fill="var(--color-text-secondary)">{sub}</text>
    </g>
  )
}

